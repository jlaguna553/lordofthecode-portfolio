"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/lib/game/types";
import { loc, type Lang } from "@/lib/i18n/core";
import { playSfx } from "@/lib/game/audio";

interface Props {
  chapter: Chapter;
  frodoUrl: string;
  cols: number;
  frameSize: number;
  /** Héroe que controla el jugador (el protagonista activo). */
  heroId?: string;
  /** Spritesheets de los PNJ que habitan los nodos, por spriteId. */
  nodeSheets?: Record<string, { url: string; cols: number; frameSize: number }>;
  completed: Set<string>;
  /** node_id -> motivo, para pintar con candado los nodos aún cerrados. */
  lockedNodes?: Record<string, string>;
  locked: boolean;
  /** Idioma actual, para resolver los textos localizados (Phaser no usa hooks). */
  lang: Lang;
  onEnterNode: (nodeId: string) => void;
}

const TILE = 32; // los tiles de terreno LPC son de 32px
const DIR_ROW = { up: 8, left: 9, down: 10, right: 11 } as const;

/** Suelos del juego -> clave de textura cargada en Phaser. */
const GROUND_TEX: Record<string, string> = {
  grass: "grass",
  grassDark: "grass_dark",
  dry: "ground_dry",
  stone: "stone",
  darkstone: "darkstone",
  lava: "lava",
  snow: "snow",
  ice: "ice",
  gold: "grass_gold",
  path: "path",
  water: "water",
};
const tex = (g: string | undefined, fallback: string) =>
  GROUND_TEX[g ?? ""] ?? fallback;

/** Decoración -> clave de textura (los nombres no siempre coinciden). */
const DECOR_TEX: Record<string, string> = {
  tree: "tree",
  pine: "pine",
  rock: "rock",
  house: "house",
  mallorn: "tree_gold",
};

export default function GameCanvas({
  chapter,
  frodoUrl,
  cols,
  frameSize,
  heroId = "frodo",
  nodeSheets = {},
  completed,
  lockedNodes = {},
  lang,
  locked,
  onEnterNode,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<unknown>(null);
  /**
   * Joystick táctil: vector normalizado (-1..1) que la escena lee cada frame.
   * Va en un ref y el pomo se mueve escribiendo el estilo a mano, para no
   * repintar React sesenta veces por segundo mientras arrastras el dedo.
   */
  const touchRef = useRef({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const enterRef = useRef(onEnterNode);
  const lockedNodesRef = useRef(lockedNodes);
  const completedRef = useRef(completed);
  const lockedRef = useRef(locked);
  enterRef.current = onEnterNode;
  completedRef.current = completed;
  lockedNodesRef.current = lockedNodes;
  lockedRef.current = locked;

  // Sólo mostramos el mando en pantallas de puntero grueso (móvil/tableta).
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        window.matchMedia?.("(pointer: coarse)").matches === true,
    );
  }, []);

  useEffect(() => {
    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let game: any;

    (async () => {
      const Phaser = (await import("phaser")).default;
      if (destroyed || !hostRef.current) return;

      const W = chapter.mapSize.cols * TILE;
      const H = chapter.mapSize.rows * TILE;

      /*
       * Ventana visible, en TILES. En un móvil el lienzo se encoge hasta unos
       * 370 px de ancho: con 22 tiles cada uno quedaría a 16 px, la mitad de su
       * tamaño real, y los personajes se vuelven ilegibles. Mostrando menos
       * tiles cada uno se dibuja más grande. La cámara sigue a Frodo, así que
       * ver menos mapa de golpe no quita nada de juego.
       */
      const pantallaEstrecha =
        typeof window !== "undefined" &&
        (window.matchMedia?.("(pointer: coarse)").matches === true ||
          window.innerWidth < 640);
      const altoPantalla =
        typeof window !== "undefined" ? window.innerHeight : 900;
      const COLS_VISTA = pantallaEstrecha ? 13 : 22;
      /*
       * Cuántas filas caben debajo de la cabecera y encima del mando. Los
       * cortes salen de medir el hueco real en un Pixel 5 (727), un iPhone 12
       * (664) y una pantalla baja de 600.
       */
      const FILAS_VISTA = pantallaEstrecha
        ? altoPantalla >= 860
          ? 14
          : altoPantalla >= 780
            ? 12
            : altoPantalla >= 700
              ? 11
              : altoPantalla >= 640
                ? 10
                : 9
        : 14;
      const VIEW_W = Math.min(W, COLS_VISTA * TILE);
      const VIEW_H = Math.min(H, FILAS_VISTA * TILE);
      const scenery = chapter.scenery ?? {};

      class MainScene extends Phaser.Scene {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        player!: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cursors!: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        keys!: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markers = new Map<string, any>();
        /** Nodo al alcance del jugador (para el indicador de interacción). */
        nearNode: string | null = null;
        /**
         * Nodos que se pueden REABRIR aunque estén completados (retos y
         * pergaminos): se ven en solo lectura. Las batallas y quizzes resueltos
         * no se reabren (no se re-pelean).
         */
        reabribles = new Set<string>(
          chapter.nodes
            .filter((n) => {
              const k = n.kind ?? "challenge";
              return k === "challenge" || k === "scroll";
            })
            .map((n) => n.node_id),
        );
        /** Compañeros que siguen al jugador, en orden de fila. */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        companions: { sprite: any; id: string; cols: number }[] = [];
        /**
         * Rastro de posiciones recientes del jugador. Cada compañero se planta
         * en un punto más atrás del rastro, así la fila sigue el mismo camino
         * (incluidos los rodeos) en vez de perseguir en línea recta.
         */
        trail: { x: number; y: number; dir: keyof typeof DIR_ROW }[] = [];
        lastDir: keyof typeof DIR_ROW = "down";
        /** Diálogos ya disparados (cada frase suena una sola vez). */
        saidDialogues = new Set<number>();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bubble!: any;
        /** Sprite sobre el que flota el bocadillo mientras está visible. */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bubbleTarget: any = null;
        /**
         * PNJ ambientales: deambulan despacio alrededor de donde nacieron, así
         * el mapa no parece un museo de figuras de cera.
         */
        errantes: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sprite: any;
          tex: string;
          ox: number;
          oy: number;
          tx: number;
          ty: number;
          /** ms que le quedan parado antes de elegir nuevo destino. */
          pausa: number;
        }[] = [];
        /** PNJ de los nodos: no se mueven, pero giran hacia quien se acerca. */
        vigilantes: { sprite: any; cols: number; mirada: number }[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prompt!: any;
        /** Último valor de `locked` aplicado al teclado (para togglear al cambiar). */
        keyboardLocked = false;

        /**
         * Phaser captura W/A/S/D, flechas y espacio con preventDefault(), lo que
         * impide escribirlas en el editor Monaco. Mientras el reto está abierto
         * soltamos la captura global para devolver el teclado al DOM.
         */
        setKeyboardLocked(locked: boolean) {
          const kb = this.input?.keyboard;
          if (!kb) return;
          if (locked) {
            kb.enabled = false;
            kb.disableGlobalCapture();
            kb.resetKeys?.();
          } else {
            kb.enabled = true;
            kb.enableGlobalCapture();
          }
        }

        /**
         * Da vida a los PNJ: los ambientales pasean despacio en torno a su
         * sitio y los de los nodos giran hacia Frodo cuando se acerca. Se
         * mueven a mano (sin cuerpo físico) porque no deben empujar a nadie.
         */
        animarPnj(delta: number) {
          const RADIO = TILE * 1.5;
          const VEL = 26 / 1000; // px por ms: un paseo, no una carrera

          for (const e of this.errantes) {
            const dx = e.tx - e.sprite.x;
            const dy = e.ty - e.sprite.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 2) {
              // Ha llegado: se para un rato y luego elige otro rincón.
              e.sprite.anims.stop();
              e.pausa -= delta;
              if (e.pausa <= 0) {
                e.tx = e.ox + Phaser.Math.Between(-RADIO, RADIO);
                e.ty = e.oy + Phaser.Math.Between(-RADIO, RADIO);
                e.pausa = Phaser.Math.Between(800, 3500);
              }
              continue;
            }

            const paso = Math.min(VEL * delta, dist);
            e.sprite.x += (dx / dist) * paso;
            e.sprite.y += (dy / dist) * paso;
            e.sprite.setDepth(e.sprite.y);
            const dir =
              Math.abs(dx) > Math.abs(dy)
                ? dx < 0
                  ? "left"
                  : "right"
                : dy < 0
                  ? "up"
                  : "down";
            e.sprite.anims.play(`walk-${dir}-${e.tex}`, true);
          }

          for (const v of this.vigilantes) {
            const dx = this.player.x - v.sprite.x;
            const dy = this.player.y - v.sprite.y;
            if (Math.hypot(dx, dy) < TILE * 4) {
              // Te mira de frente mientras rondas su nodo.
              const dir =
                Math.abs(dx) > Math.abs(dy)
                  ? dx < 0
                    ? "left"
                    : "right"
                  : dy < 0
                    ? "up"
                    : "down";
              v.sprite.setFrame(DIR_ROW[dir] * v.cols);
              v.mirada = 0;
            } else {
              // Lejos, echa un vistazo alrededor de vez en cuando.
              v.mirada -= delta;
              if (v.mirada <= 0) {
                const dirs = ["down", "left", "right", "up"] as const;
                v.sprite.setFrame(
                  DIR_ROW[dirs[Phaser.Math.Between(0, 3)]] * v.cols,
                );
                v.mirada = Phaser.Math.Between(1800, 5000);
              }
            }
          }
        }

        /** Entrar en el nodo que se tenga al alcance (tecla E o botón táctil). */
        interactuar() {
          if (lockedRef.current) return;
          const near = this.nearNode;
          // Abrible si está pendiente, o si está resuelto pero es reabrible
          // (reto/pergamino: se muestra en solo lectura).
          if (
            near &&
            (!completedRef.current.has(near) || this.reabribles.has(near))
          ) {
            playSfx("interact");
            enterRef.current(near);
          }
        }

        preload() {
          for (const key of [
            "grass", "path", "water", "tree", "rock", "house",
            "grass_dark", "ground_dry", "stone", "darkstone", "lava", "pine", "snow", "ice", "grass_gold", "tree_gold",
          ]) {
            this.load.image(key, `/tiles/${key}.png`);
          }
          this.load.spritesheet("frodo", frodoUrl, {
            frameWidth: frameSize,
            frameHeight: frameSize,
          });
          for (const [id, s] of Object.entries(nodeSheets)) {
            this.load.spritesheet(`npc-${id}`, s.url, {
              frameWidth: s.frameSize,
              frameHeight: s.frameSize,
            });
          }
        }

        create() {
          // --- Suelo base del bioma ---
          this.add
            .tileSprite(0, 0, W, H, tex(scenery.ground, "grass"))
            .setOrigin(0, 0)
            .setDepth(-1000);

          // --- Camino ---
          for (const row of scenery.pathRows ?? []) {
            this.add
              .tileSprite(0, row * TILE, W, TILE, tex(scenery.pathGround, "path"))
              .setOrigin(0, 0)
              .setDepth(-990);
          }

          // Cuerpos estáticos invisibles que bloquean el paso.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const blockers: any[] = [];
          const addBlock = (cx: number, cy: number, w: number, h: number) => {
            const z = this.add.zone(cx, cy, w, h);
            this.physics.add.existing(z, true); // true = cuerpo estático
            blockers.push(z);
          };

          // --- Estanque (bloquea) ---
          if (scenery.pond) {
            const { x, y, w, h } = scenery.pond;
            this.add
              .tileSprite(
                x * TILE, y * TILE, w * TILE, h * TILE,
                tex(scenery.pondGround, "water"),
              )
              .setOrigin(0, 0)
              .setDepth(-990);
            addBlock(
              x * TILE + (w * TILE) / 2,
              y * TILE + (h * TILE) / 2,
              w * TILE,
              h * TILE,
            );
          }

          // --- Decoración (árboles, rocas) con profundidad = pies ---
          for (const d of scenery.decor ?? []) {
            const px = d.x * TILE + TILE / 2;
            const py = d.y * TILE + TILE;
            const img = this.add
              .image(px, py, DECOR_TEX[d.type] ?? d.type)
              .setOrigin(0.5, 1);
            img.setDepth(py);

            if (d.label) {
              this.add
                .text(px, py - img.height - 6, loc(d.label, lang), {
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#ffe9a8",
                  backgroundColor: "#000000aa",
                })
                .setOrigin(0.5)
                .setPadding(3, 1, 3, 1)
                .setDepth(89000);
            }

            // Sólo la base bloquea (tronco / roca / cimiento); la copa y el
            // tejado son decorativos y se puede caminar por detrás de ellos.
            const [bw, bh] =
              d.type === "house"
                ? [92, 26]
                : d.type === "pine"
                  ? [34, 14]
                  : d.type === "tree" || d.type === "mallorn"
                    ? [26, 16]
                    : [28, 16];
            addBlock(px, py - bh / 2, bw, bh);
          }

          // --- Animaciones de caminar (jugador y cada compañero) ---
          const crearAnims = (tex: string, columnas: number) => {
            (Object.keys(DIR_ROW) as (keyof typeof DIR_ROW)[]).forEach((dir) => {
              const key = `walk-${dir}-${tex}`;
              if (this.anims.exists(key)) return;
              this.anims.create({
                key,
                frames: this.anims.generateFrameNumbers(tex, {
                  start: DIR_ROW[dir] * columnas,
                  end: DIR_ROW[dir] * columnas + 8,
                }),
                frameRate: 9,
                repeat: -1,
              });
            });
          };
          crearAnims("frodo", cols);

          // --- PNJ ambientales (Gollum acechando, gente del pueblo…) ---
          for (const npc of scenery.npcs ?? []) {
            const s = nodeSheets[npc.spriteId];
            if (!s) continue;
            const px = npc.x * TILE + TILE / 2;
            const feet = npc.y * TILE + TILE;
            const tex = `npc-${npc.spriteId}`;
            crearAnims(tex, s.cols);
            const sp = this.add
              .sprite(px, feet, tex, DIR_ROW.down * s.cols)
              .setOrigin(0.5, 1)
              .setDepth(feet);
            this.errantes.push({
              sprite: sp,
              tex,
              ox: px,
              oy: feet,
              tx: px,
              ty: feet,
              pausa: Phaser.Math.Between(200, 2500),
            });
            if (npc.label) {
              this.add
                .text(px, feet - 70, loc(npc.label, lang), {
                  fontFamily: "monospace",
                  fontSize: "10px",
                  color: "#cbd5e1",
                  backgroundColor: "#00000099",
                })
                .setOrigin(0.5)
                .setPadding(3, 1, 3, 1)
                .setDepth(88000);
            }
          }

          // --- Nodos (acertijos) ---
          for (const node of chapter.nodes) {
            const cx = node.position.x * TILE + TILE / 2;
            const cy = node.position.y * TILE + TILE / 2;

            // Cada tipo de nodo tiene su color: reto (oro), pergamino (azul),
            // enigma de lógica (violeta).
            const kind = node.kind ?? "challenge";
            // Jefe: combate con enemy.boss O reto-jefe (challenge con .boss).
            const esJefe =
              (node.kind === "battle" && node.enemy.boss) ||
              ((node.kind ?? "challenge") === "challenge" &&
                "boss" in node &&
                (node as { boss?: boolean }).boss === true);

            // PNJ del nodo (p. ej. el Jinete Negro), mirando al sur. El JEFE se
            // dibuja mucho más grande para que se note que es el jefe del nivel.
            const sheet = node.spriteId ? nodeSheets[node.spriteId] : undefined;
            if (sheet) {
              const feet = node.position.y * TILE + TILE;
              const sp = this.add
                .sprite(
                  cx,
                  feet,
                  `npc-${node.spriteId}`,
                  DIR_ROW.down * sheet.cols,
                )
                .setOrigin(0.5, 1)
                .setDepth(feet);
              if (esJefe) {
                sp.setScale(2.1);
                // Aura roja tenue bajo el jefe para reforzar su presencia.
                const aura = this.add
                  .circle(cx, feet - TILE * 0.5, TILE * 0.95, 0xf43f5e, 0.18)
                  .setDepth(feet - 1);
                this.tweens.add({
                  targets: aura,
                  scale: 1.25,
                  alpha: 0.08,
                  duration: 1400,
                  yoyo: true,
                  repeat: -1,
                });
              }
              this.vigilantes.push({
                sprite: sp,
                cols: sheet.cols,
                mirada: Phaser.Math.Between(0, 3000),
              });
            }
            const ESTILOS = {
              challenge: { color: 0xffd24a, text: "#ffe9a8", icon: "" },
              scroll: { color: 0x8ab4ff, text: "#cfe0ff", icon: "📜 " },
              quiz: { color: 0xc084fc, text: "#e9d5ff", icon: "🜛 " },
              battle: { color: 0xfb923c, text: "#fed7aa", icon: "⚔ " },
              archive: { color: 0x8ab4ff, text: "#cfe0ff", icon: "📚 " },
            } as const;
            const style = esJefe
              ? { color: 0xf43f5e, text: "#fecdd3", icon: "☠ " }
              : ESTILOS[kind];
            const ring = this.add.circle(0, 0, 15, style.color, 0.3);
            const dot = this.add.circle(0, 0, 6, style.color, 1);
            const cerrado = Boolean(lockedNodes[node.node_id]);
            const label = this.add
              .text(0, -30, (cerrado ? "🔒 " : style.icon) + loc(node.title, lang), {
                fontFamily: "monospace",
                fontSize: "11px",
                color: style.text,
                backgroundColor: "#000000aa",
              })
              .setOrigin(0.5)
              .setPadding(3, 1, 3, 1);
            const cont = this.add.container(cx, cy, [ring, dot, label]);
            cont.setDepth(90000);
            // Guardamos lo necesario para reconciliar el candado en update()
            // cuando el nodo se desbloquee (al ganar XP / resolver retos).
            cont.setData("locked", cerrado);
            cont.setData("icono", style.icon);
            cont.setData("titulo", loc(node.title, lang));
            if (cerrado) {
              // Apagado y quieto: se ve que está ahí, pero que aún no toca.
              cont.setAlpha(0.45);
            } else {
              this.tweens.add({
                targets: ring,
                scale: 1.6,
                alpha: 0,
                duration: 1200,
                repeat: -1,
              });
            }
            this.markers.set(node.node_id, cont);
          }

          // --- Frodo ---
          this.player = this.physics.add.sprite(
            chapter.spawn.x * TILE + TILE / 2,
            chapter.spawn.y * TILE + TILE / 2,
            "frodo",
            DIR_ROW.down * cols,
          );
          // El mundo físico es el MAPA, no la ventana visible: sin esto el
          // jugador queda encerrado en la primera pantalla de un mapa grande.
          this.physics.world.setBounds(0, 0, W, H);
          this.player.setCollideWorldBounds(true);
          // cuerpo de colisión más pequeño (pies), no todo el frame de 64px.
          this.player.body.setSize(frameSize * 0.4, frameSize * 0.3);
          this.player.body.setOffset(frameSize * 0.3, frameSize * 0.6);

          // El jugador choca con troncos, rocas y el estanque.
          this.physics.add.collider(this.player, blockers);

          // --- La Comunidad: compañeros en fila tras el protagonista ---
          // La comitiva es {Frodo} ∪ compañeros del capítulo. Quien controla el
          // jugador (heroId) NO se duplica como acompañante; si el protagonista
          // no es Frodo, Frodo pasa a seguirlo. Sin repetidos.
          const seguidores = ["frodo", ...(chapter.companions ?? [])].filter(
            (id, i, arr) => id !== heroId && arr.indexOf(id) === i,
          );
          for (const id of seguidores) {
            const s = nodeSheets[id];
            if (!s) continue;
            const tex = `npc-${id}`;
            crearAnims(tex, s.cols);
            const sp = this.add.sprite(
              this.player.x,
              this.player.y,
              tex,
              DIR_ROW.down * s.cols,
            );
            this.companions.push({ sprite: sp, id, cols: s.cols });
          }

          this.cursors = this.input.keyboard!.createCursorKeys();
          this.keys = this.input.keyboard!.addKeys("W,A,S,D,E");

          // Indicador de interacción que aparece sobre el nodo al alcance.
          this.prompt = this.add
            .text(0, 0, "  E  ·  interactuar  ", {
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#0b1120",
              backgroundColor: "#ffd24a",
            })
            .setOrigin(0.5)
            .setPadding(4, 2, 4, 2)
            .setDepth(95000)
            .setVisible(false);

          // Interacción por evento (no por polling): así no se pierde una
          // pulsación rápida que caiga entre dos frames.
          this.input.keyboard!.on("keydown-E", () => this.interactuar());
          // El botón del mando táctil emite este evento sobre el juego.
          this.game.events.on("lotc-action", this.interactuar, this);

          // Bocadillo de diálogo (uno reutilizable).
          this.bubble = this.add
            .text(0, 0, "", {
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#0b1120",
              backgroundColor: "#e2e8f0",
              wordWrap: { width: 200 },
              align: "center",
            })
            .setOrigin(0.5, 1)
            .setPadding(6, 4, 6, 4)
            .setDepth(96000)
            .setVisible(false);

          // Textura de 1 punto para las partículas de celebración.
          const gfx = this.make.graphics({ x: 0, y: 0 });
          gfx.fillStyle(0xffffff, 1);
          gfx.fillRect(0, 0, 4, 4);
          gfx.generateTexture("chispa", 4, 4);
          gfx.destroy();

          // La cámara sigue a Frodo dentro de los límites del mapa.
          this.cameras.main.setBounds(0, 0, W, H);
          this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
          this.cameras.main.fadeIn(450, 0, 0, 0);

          // Sonda de posición sólo en desarrollo (para pruebas automatizadas).
          if (process.env.NODE_ENV !== "production") {
            (window as unknown as Record<string, unknown>).__lotcPlayer = () => ({
              x: this.player.x,
              y: this.player.y,
              camX: this.cameras.main.scrollX,
              camY: this.cameras.main.scrollY,
              bubble: this.bubble.visible ? this.bubble.text : null,
            });
            // Posiciones y fotograma de los PNJ, para comprobar que se animan.
            (window as unknown as Record<string, unknown>).__lotcNpcs = () => ({
              errantes: this.errantes.map((e) => ({
                x: Math.round(e.sprite.x),
                y: Math.round(e.sprite.y),
                frame: e.sprite.frame.name,
              })),
              vigilantes: this.vigilantes.map((v) => ({
                frame: v.sprite.frame.name,
              })),
            });
            // Teleporte para pruebas automatizadas (tiles -> píxeles).
            (window as unknown as Record<string, unknown>).__lotcWarp = (
              tx: number,
              ty: number,
            ) => {
              this.player.setPosition(tx * TILE + TILE / 2, ty * TILE + TILE / 2);
            };
          }
        }

        update(_tiempo: number, delta: number) {
          const p = this.player;
          this.animarPnj(delta);
          p.setDepth(p.y + frameSize * 0.45); // profundidad por los pies

          for (const [id, cont] of this.markers) {
            // Reconcilia el candado: si un nodo estaba cerrado y ya se
            // desbloqueó (ganaste XP / resolviste los retos), quítale el 🔒,
            // devuélvele el brillo y arranca su pulso — sin recargar la escena.
            if (
              cont.getData("locked") === true &&
              !lockedNodesRef.current[id]
            ) {
              cont.setData("locked", false);
              cont.setAlpha(1);
              const label = cont.list[2] as Phaser.GameObjects.Text;
              label.setText(cont.getData("icono") + cont.getData("titulo"));
              this.tweens.add({
                targets: cont.list[0],
                scale: 1.6,
                alpha: 0,
                duration: 1200,
                repeat: -1,
              });
            }

            if (completedRef.current.has(id) && cont.getData("done") !== true) {
              cont.setData("done", true);
              cont.list[1].setFillStyle(0x4ade80);
              cont.list[0].setFillStyle(0x4ade80, 0.25);
              // Estallido de chispas al descifrar la runa.
              const em = this.add.particles(cont.x, cont.y, "chispa", {
                speed: { min: 40, max: 130 },
                angle: { min: 0, max: 360 },
                lifespan: 700,
                quantity: 24,
                scale: { start: 1.4, end: 0 },
                tint: [0x4ade80, 0xffd24a, 0xffffff],
                emitting: false,
              });
              em.setDepth(95000);
              em.explode(24);
              this.time.delayedCall(1200, () => em.destroy());
            }
          }

          // Suelta/recupera la captura de teclado al abrir o cerrar el reto.
          if (lockedRef.current !== this.keyboardLocked) {
            this.keyboardLocked = lockedRef.current;
            this.setKeyboardLocked(this.keyboardLocked);
          }

          if (lockedRef.current) {
            p.setVelocity(0);
            p.anims.stop();
            this.prompt?.setVisible(false);
            return;
          }

          const speed = 140;
          let vx = 0;
          let vy = 0;
          const c = this.cursors;
          const k = this.keys;
          const t = touchRef.current;

          if (t.x || t.y) {
            // El joystick manda: es analógico, así que inclinarlo poco camina
            // despacio. Se normaliza para que la diagonal no sea más rápida.
            const mag = Math.min(1, Math.hypot(t.x, t.y));
            const ang = Math.atan2(t.y, t.x);
            vx = Math.cos(ang) * speed * mag;
            vy = Math.sin(ang) * speed * mag;
          } else {
            if (c.left.isDown || k.A.isDown) vx = -speed;
            else if (c.right.isDown || k.D.isDown) vx = speed;
            if (c.up.isDown || k.W.isDown) vy = -speed;
            else if (c.down.isDown || k.S.isDown) vy = speed;
          }
          p.setVelocity(vx, vy);

          // La fila de sprites LPC se elige por el eje dominante.
          let dir: keyof typeof DIR_ROW | null = null;
          if (Math.abs(vx) > Math.abs(vy)) dir = vx < 0 ? "left" : "right";
          else if (vy !== 0) dir = vy < 0 ? "up" : "down";
          if (vx === 0 && vy === 0) dir = null;
          if (dir) {
            p.anims.play(`walk-${dir}-frodo`, true);
            this.lastDir = dir;
          } else {
            p.anims.stop();
          }

          // --- Rastro y seguimiento de la Comunidad ---
          if (this.companions.length) {
            const last = this.trail[0];
            // Sólo apuntamos el rastro cuando avanza de verdad; si no, la fila
            // se amontonaría al estar parado.
            if (!last || Phaser.Math.Distance.Between(last.x, last.y, p.x, p.y) > 5) {
              this.trail.unshift({ x: p.x, y: p.y, dir: this.lastDir });
              const necesario = (this.companions.length + 1) * 7 + 5;
              if (this.trail.length > necesario) this.trail.length = necesario;
            }
            const jugadorSeMueve = dir !== null;
            this.companions.forEach((c, i) => {
              const punto = this.trail[(i + 1) * 7];
              if (!punto) {
                // Aún no hay rastro suficiente: camina en fila tras el jugador,
                // animándose mientras el protagonista se mueve.
                c.sprite.setPosition(p.x, p.y + 6 * (i + 1));
                c.sprite.setDepth(c.sprite.y + frameSize * 0.45);
                if (jugadorSeMueve)
                  c.sprite.anims.play(`walk-${this.lastDir}-npc-${c.id}`, true);
                else c.sprite.anims.stop();
                return;
              }
              const seMueve =
                Phaser.Math.Distance.Between(
                  c.sprite.x,
                  c.sprite.y,
                  punto.x,
                  punto.y,
                ) > 1.5;
              c.sprite.setPosition(punto.x, punto.y);
              c.sprite.setDepth(punto.y + frameSize * 0.45);
              if (seMueve) c.sprite.anims.play(`walk-${punto.dir}-npc-${c.id}`, true);
              else c.sprite.anims.stop();
            });
          }

          // ¿Hay un nodo al alcance? Mostramos el indicador y esperamos a "E":
          // así el jugador decide cuándo entrar, en vez de ser absorbido al pasar.
          let near: string | null = null;
          let nearPos = { x: 0, y: 0 };
          for (const node of chapter.nodes) {
            const nx = node.position.x * TILE + TILE / 2;
            const ny = node.position.y * TILE + TILE / 2;
            if (Phaser.Math.Distance.Between(p.x, p.y, nx, ny) < TILE * 1.3) {
              near = node.node_id;
              nearPos = { x: nx, y: ny };
              break;
            }
          }
          this.nearNode = near;

          // Mostramos el indicador si el nodo está pendiente, o si está resuelto
          // pero se puede reabrir (reto/pergamino) para verlo en solo lectura.
          const alcanzable =
            near !== null &&
            (!completedRef.current.has(near) || this.reabribles.has(near));
          this.prompt.setVisible(alcanzable);
          if (alcanzable) this.prompt.setPosition(nearPos.x, nearPos.y - 52);

          // El bocadillo flota sobre quien habla, sin salirse de la cámara.
          if (this.bubble.visible && this.bubbleTarget) {
            const cam = this.cameras.main;
            const mitad = this.bubble.width / 2 + 4;
            this.bubble.setPosition(
              Phaser.Math.Clamp(
                this.bubbleTarget.x,
                cam.scrollX + mitad,
                cam.scrollX + cam.width - mitad,
              ),
              Math.max(this.bubbleTarget.y - 40, cam.scrollY + this.bubble.height + 4),
            );
          }

          // --- Diálogos de la Comunidad al pasar por ciertos puntos ---
          (scenery.dialogues ?? []).forEach((d, i) => {
            if (this.saidDialogues.has(i)) return;
            const dx = d.x * TILE + TILE / 2;
            const dy = d.y * TILE + TILE / 2;
            if (Phaser.Math.Distance.Between(p.x, p.y, dx, dy) > TILE * 1.6) return;
            this.saidDialogues.add(i);
            // El bocadillo sale sobre quien habla, si va en la fila.
            const quien = this.companions.find((c) => c.id === d.speaker);
            const src = quien ? quien.sprite : p;
            this.bubbleTarget = src;
            this.bubble.setText(`${loc(d.name, lang)}: ${loc(d.text, lang)}`).setVisible(true);
            this.time.delayedCall(4000, () => {
              this.bubble.setVisible(false);
              this.bubbleTarget = null;
            });
          });
        }
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        // FIT deja el lienzo a tamaño completo en escritorio y lo encoge para
        // que quepa entero en la pantalla de un móvil.
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
          width: VIEW_W,
          height: VIEW_H,
        },
        pixelArt: true,
        backgroundColor: "#2f5d3a",
        physics: { default: "arcade", arcade: { debug: false } },
        scene: MainScene,
      });
      gameRef.current = game;
    })();

    return () => {
      destroyed = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (game as any)?.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, frodoUrl, cols, frameSize, heroId, nodeSheets, lang]);

  // ---- Joystick analógico ----
  const RADIO = 46; // recorrido máximo del pomo, en píxeles

  /** Coloca el pomo y publica el vector que leerá la escena. */
  const moverPomo = (dx: number, dy: number) => {
    const dist = Math.hypot(dx, dy);
    const factor = dist > RADIO ? RADIO / dist : 1;
    const px = dx * factor;
    const py = dy * factor;
    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${px}px, ${py}px)`;
    }
    // Zona muerta: un dedo apoyado sin intención no debe mover a nadie.
    const mag = Math.hypot(px, py) / RADIO;
    if (mag < 0.18) {
      touchRef.current.x = 0;
      touchRef.current.y = 0;
    } else {
      touchRef.current.x = px / RADIO;
      touchRef.current.y = py / RADIO;
    }
  };

  const soltarPomo = () => {
    touchRef.current.x = 0;
    touchRef.current.y = 0;
    if (knobRef.current) knobRef.current.style.transform = "translate(0px, 0px)";
  };

  /** Desplazamiento del dedo respecto al centro de la base. */
  const desdeCentro = (e: React.PointerEvent) => {
    const r = baseRef.current?.getBoundingClientRect();
    if (!r) return { dx: 0, dy: 0 };
    return {
      dx: e.clientX - (r.left + r.width / 2),
      dy: e.clientY - (r.top + r.height / 2),
    };
  };

  return (
    <div className="mx-auto w-full max-w-[704px]">
      <div
        ref={hostRef}
        className="pixelated overflow-hidden rounded-xl ring-1 ring-white/10"
      />

      {isTouch && (
        <div className="mt-2 flex touch-none items-center justify-between gap-4 px-3 select-none">
          {/* Joystick: arrastra el pomo y Frodo va en esa dirección */}
          <div
            ref={baseRef}
            role="application"
            aria-label="joystick"
            className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-slate-800/70 ring-1 ring-white/15"
            onPointerDown={(e) => {
              e.preventDefault();
              e.currentTarget.setPointerCapture(e.pointerId);
              const { dx, dy } = desdeCentro(e);
              moverPomo(dx, dy);
            }}
            onPointerMove={(e) => {
              // Sólo mientras el dedo sigue apoyado sobre este elemento.
              if (e.buttons === 0 && e.pointerType === "mouse") return;
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
              const { dx, dy } = desdeCentro(e);
              moverPomo(dx, dy);
            }}
            onPointerUp={soltarPomo}
            onPointerCancel={soltarPomo}
            onLostPointerCapture={soltarPomo}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* guía de ejes, muy tenue */}
            <span className="pointer-events-none absolute h-px w-16 bg-white/10" />
            <span className="pointer-events-none absolute h-16 w-px bg-white/10" />
            <div
              ref={knobRef}
              className="pointer-events-none h-12 w-12 rounded-full bg-slate-500/90 ring-2 ring-white/30 transition-[background-color]"
            />
          </div>

          {/* Acción: el mismo efecto que la tecla E */}
          <button
            type="button"
            aria-label="interactuar"
            className="h-20 w-20 select-none rounded-full bg-amber-500 text-xl font-black text-slate-900 ring-2 ring-amber-300/50 active:bg-amber-300"
            onPointerDown={(e) => {
              e.preventDefault();
              (
                gameRef.current as { events?: { emit: (k: string) => void } } | null
              )?.events?.emit("lotc-action");
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            E
          </button>
        </div>
      )}
    </div>
  );
}
