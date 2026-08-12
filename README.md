# Lord of the Code — La Sintaxis Ancestral

![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Phaser](https://img.shields.io/badge/Phaser%204-EE3B24?style=for-the-badge&logo=phaser&logoColor=white)
![PHP](https://img.shields.io/badge/PHP%208.5-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Monaco](https://img.shields.io/badge/Monaco%20Editor-5C2D91?style=for-the-badge&logo=visualstudio&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

> **Juega a un RPG 2D y aprende POO en PHP de verdad: cada acertijo se ejecuta en el navegador con php-wasm.**

RPG 2D educativo inspirado en **La Comunidad del Anillo** para aprender
**Programación Orientada a Objetos en PHP**: el jugador recorre el mapa y
resuelve acertijos de POO que se ejecutan y validan de verdad en el navegador.

Incluye un **estudio de sprites LPC** que compone los personajes que alimentan
el juego.

| Ruta | Qué es |
|------|--------|
| `/` | **El juego** — mapa Phaser, Monaco y evaluador PHP |
| `/studio` | **Estudio de sprites** — paperdoll LPC, exporta PNG + JSON |

## Progresión RPG

Los acertijos de código de un capítulo no están abiertos desde el principio:
hay que **ganarse la experiencia** venciendo a los enemigos secundarios que
pueblan el mapa. Cada combate es por turnos y de opción múltiple, y sus
preguntas versan sobre lo mismo que pedirá el reto de código — pelear ES
estudiar.

| Paso | Qué desbloquea |
|---|---|
| Vencer enemigos normales (⚔) | Experiencia hasta llegar al `xpParaRetos` del capítulo |
| Alcanzar ese umbral | Se abren los retos de código del capítulo |
| Resolver todos los retos | Se abre el jefe (☠) |
| Vencer al jefe | Recompensa (un aliado jugable) + salto automático al capítulo siguiente |

En combate, cada acierto quita un punto de vida al enemigo y cada fallo te
quita a ti `damage`. Tu vida máxima crece con el nivel (`3 + nivel`), así que
subir de nivel se traduce en margen de error. Perder no penaliza: se reintenta.

Al caer un jefe aparece una pantalla de **recompensa**: un personaje secundario
del episodio (Sam, Merry, Aragorn, Pippin, Gimli…) se suma a la Comunidad como **héroe
jugable**, y el botón continúa directo al capítulo siguiente. Los héroes
desbloqueados se eligen desde 🦸 Héroe y con ellos se recorre el mapa.

**La experiencia no se guarda**: se deriva de los nodos de combate marcados
como completados ([lib/game/rpg.ts](lib/game/rpg.ts)). Así no puede
desincronizarse del progreso real, no se puede farmear repitiendo un enemigo ya
vencido, y las partidas anteriores al combate siguen siendo válidas sin
migración — un capítulo que ya estaba terminado desbloquea el siguiente aunque
su jefe no existiera entonces.

Los libros de práctica (9–14) no tienen combate ni bloqueo: son un anexo de
entrenamiento siempre disponible.

`pnpm check:balance` comprueba que la campaña es **superable**: que la puerta de
experiencia de cada capítulo se pueda alcanzar venciendo sólo a sus enemigos
normales (la del jefe no cuenta, porque está detrás de los retos) y que todo
capítulo bloqueado dependa de uno que sí tenga jefe. Es un fallo que ni
TypeScript ni el build detectan — deja el capítulo encallado — y ya cazó uno.

## Controles

**Escritorio:** `WASD` o flechas para moverse, `E` para interactuar con el
marcador que tengas al lado.

**Móvil:** un **joystick analógico** y el botón `E`, que aparecen solos en
dispositivos de puntero grueso. El joystick es de dirección libre y la velocidad
es proporcional a cuánto inclines el pomo, con zona muerta central.

La ventana de juego se mide en TILES, no en píxeles: en un móvil el lienzo baja
a unos 370 px, así que mostrar los 22×14 tiles del escritorio dejaría cada tile
a 16 px — la mitad de su tamaño real, con los personajes ilegibles. En pantalla
estrecha se muestran 13 columnas y entre 9 y 14 filas según la altura
disponible, de modo que cada tile se dibuja a ~28 px. Como la cámara sigue a
Frodo, ver menos mapa de golpe no quita juego.

Los compañeros de la Comunidad caminan sobre el rastro del jugador, los PNJ
ambientales deambulan por su cuenta y los de los nodos giran hacia ti al
acercarte.

## Stack

- **Next.js 15** (App Router) + **React 19** + **Tailwind CSS 4**
- **Phaser 4** para el mapa/movimiento 2D
- **@monaco-editor/react** (motor VS Code) para escribir PHP
- **php-wasm** — PHP real compilado a WebAssembly, ejecutándose en el navegador
  (sin backend, sin sandbox que administrar)
- **HTML5 Canvas** para el compositing de capas LPC (paperdoll)

## Arranque

```bash
pnpm install       # postinstall vendoriza php-wasm -> public/php-wasm/
pnpm dev           # http://localhost:3000
```

Los assets LPC (`public/lpc`, `public/tiles`) **sí están versionados**: el build
no debe depender de descargas externas. Se regeneran con `pnpm fetch:lpc` y
`pnpm fetch:tiles` si quieres ampliar el catálogo.

`public/php-wasm` son 17 MB que se copian desde la dependencia, así que no se
versiona: el script `build` lo regenera antes de compilar.

## Despliegue

Todas las rutas son estáticas y **no hace falta ninguna cabecera especial**
(este build de php-wasm no usa `SharedArrayBuffer`, así que no necesita
COOP/COEP). Vale cualquier hosting de Next.js:

```bash
# Vercel: importa el repo y despliega; no hay nada que configurar.
# Si prefieres la CLI:
pnpm dlx vercel
```

Para un hosting estático (GitHub Pages, S3, Netlify) añade
`output: "export"` en `next.config.mjs` — y `basePath` con el nombre del repo si
lo sirves desde un subdirectorio.

### Licencias de assets

Los assets LPC son **CC-BY-SA 3.0 / GPL 3.0** — conserva la atribución al
distribuir tu juego:

- Personajes: [Universal LPC Character Generator](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator) (ver su `CREDITS.csv`).
- Terreno: [OpenGameArt/LiberatedPixelCup](https://github.com/OpenGameArt/LiberatedPixelCup) — tiles de Lanea Zimmerman (Sharm) y otros.

## Arquitectura del juego

| Ruta | Rol |
|------|-----|
| [lib/game/types.ts](lib/game/types.ts) | `Chapter`, `MapNode`, `PooChallenge`, `TestCase`, `Scenery`. |
| [lib/game/evaluator.ts](lib/game/evaluator.ts) | **Evaluador PHP en el navegador** (php-wasm). |
| [lib/game/sheet.ts](lib/game/sheet.ts) | Puente LPC→Phaser: compone un preset y lo entrega como textura. |
| [lib/game/progress.ts](lib/game/progress.ts) | Progreso en `localStorage` (versionado, SSR-safe, tolerante a fallos). |
| [components/game/ChapterSelect.tsx](components/game/ChapterSelect.tsx) | Pantalla de capítulos con progreso y reinicio. |
| [data/chapters.ts](data/chapters.ts) | Campaña: capítulos, nodos, lore, `starter_code` y `test_cases`. |
| [components/game/GameCanvas.tsx](components/game/GameCanvas.tsx) | Escena Phaser: tilemap, decoración con depth-sorting, PNJ y jugador. |
| [components/game/ChallengeModal.tsx](components/game/ChallengeModal.tsx) | Monaco + ejecución + resultados de tests. |
| [scripts/fetch-tiles.mjs](scripts/fetch-tiles.mjs) | Descarga y recorta los tiles de terreno LPC (32px). |

### Cómo se evalúa el PHP del jugador

`runChallenge()` construye un script: `support_code` + código del jugador +
`$__sut = <sut>` + un `echo` con marcadores por cada `test_case`
(`json_encode($__sut->{input})`), cada uno envuelto en `try/catch`. Luego compara
contra `JSON.stringify(expected)`.

El evaluador **muestra los avisos de PHP** (Warning/Notice) junto al test que los provocó: p. ej. llamar a un método sin paréntesis produce «Undefined property» y el jugador lo ve, en vez de un desconcertante «esperado X · obtuvo Y». El `support_code` de cada reto se muestra en un panel «Código de apoyo» para que se sepa qué clases auxiliares existen.

Un `test_case` puede marcarse como **`raw: true`**: entonces `input` se evalúa
como expresión PHP completa (con `$sut` disponible) en vez de anteponer
`$sut->`. Es lo que permite comprobar efectos indirectos como un `__destruct`.

Tres detalles que importan:

- `json_encode` se llama con `JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES`
  para que produzca lo mismo que `JSON.stringify`; si no, cualquier texto
  esperado con tildes fallaría (`raíces` ≠ `raíces`).

- Se **reutiliza una sola instancia** de PHP y se llama `refresh()` (~12 ms) antes
  de cada intento; sin eso PHP lanza *"Cannot redeclare class"* al segundo envío.
- El runtime se carga con `import(/* webpackIgnore */ '/php-wasm/PhpWeb.mjs')`
  desde `public/`, fijando **la versión 8.5** (la que vendoriza el script; el
  default de la librería es 8.4 y su `.wasm` no está copiado).

### Progreso y campaña

El progreso se guarda en `localStorage` bajo `lotc:progress:v1` con la forma
`{ version, completed: { "<capítulo>": [nodeId…] }, lastChapter }`. El esquema
está versionado: si cambia, se descarta lo guardado en vez de romper la partida,
y cualquier fallo (modo privado, cuota llena) degrada a progreso en memoria.

Además de `completed` y `lastChapter`, guarda el **código escrito** en cada nodo
y las **estadísticas** por nodo (tiempo, intentos, pistas usadas), que alimentan
la pantalla de 📊 Estadísticas.

`CAMPAIGN` en [data/chapters.ts](data/chapters.ts) describe la campaña y
`CHAPTERS` contiene los **jugables** (con mapa y nodos). Añadir un capítulo es
escribir su `Chapter` y sumarlo a ambos.

### La campaña — 16 capítulos en 6 libros

| Libro | Cap. | Tema |
|---|---|---|
| **I · La Comunidad** | 1–8 | Clases y visibilidad · constructores y destructores · herencia y `parent::` · estáticos y constantes · `readonly` · interfaces y polimorfismo · abstractas y traits · excepciones y Factory |
| **II · El Arquitecto** | 9 | Los cinco principios **SOLID** |
| **III · Los Acertijos** | 10, 11, 13 | Algoritmos cronometrados: hash maps, dos punteros, pilas, ventana deslizante, memoización, DFS, árboles, criba |
| **IV · Lógica** | 12 | Test de razonamiento: secuencias, proporciones, probabilidad |
| **V · Calentamiento** | 14 | Los clásicos fáciles para empezar en frío |
| **VI · Las Dos Torres** | 15, 16 | **Enums** (PHP 8.1) y máquinas de estado · **generadores e iteradores** |

Cada capítulo mezcla cuatro tipos de nodo: **pergaminos** (📜, teoría que se
lee), **combates** (⚔ / ☠ el jefe, por turnos y de opción múltiple), **retos**
(se escribe PHP y se ejecuta contra los tests) y **enigmas** (🜛, opción
múltiple con explicación).

### Escenario

El repo de personajes LPC **no trae terreno**. Los tiles vienen de
`OpenGameArt/LiberatedPixelCup` (Sharm): de cada hoja de transición 3×6 se
recorta la **celda central** (tile sólido) para césped, camino y agua; el árbol
se compone de copa + tronco, y la casa se ensambla del atlas de construcción
(tejado de pizarra + fachada de ladrillo + puerta).

Cada capítulo elige su bioma (`grass`, `snow`, `lava`, `stone`, `gold`…). Ojo con
un detalle que costó descubrir: la celda central del bloque Wang de LPC es un
**relleno liso**, así que repetirla dejaba el suelo como un color plano — de ahí
que todos los escenarios parecieran iguales. Los tiles se recortan de la fila 5,
que guarda las variantes con detalle (mota de hierba, oleaje).

La decoración se ordena por profundidad usando los pies del sprite, así el
jugador pasa por delante o por detrás de los árboles. Cada objeto aporta un
**cuerpo de colisión sólo en su base** (tronco, roca, cimiento), de modo que la
copa y el tejado quedan transitables por detrás.

> Nota: LPC no incluye un *smial* hobbit (puerta redonda en una loma), así que
> "Bolsón Cerrado" es una casa de la Comarca ensamblada con piezas reales del
> tileset.

## Arquitectura del estudio de sprites

| Ruta | Rol |
|------|-----|
| [scripts/fetch-lpc.mjs](scripts/fetch-lpc.mjs) | **Fuente de verdad.** Lee los `sheet_definitions/*.json` de LPC, deriva `zPos` y rutas, descarga el subset curado y genera `public/lpc/manifest.json`. |
| [lib/lpc/types.ts](lib/lpc/types.ts) | Tipos del manifest/selección/capas. |
| [lib/lpc/animations.ts](lib/lpc/animations.ts) | Layout de filas/frames de la hoja universal LPC. |
| [lib/lpc/loader.ts](lib/lpc/loader.ts) | Carga async con caché + resolución de capas ordenadas por `zPos`. |
| [lib/lpc/compositor.ts](lib/lpc/compositor.ts) | Apilado en Canvas: hoja completa y frame a frame. |
| [lib/lpc/export.ts](lib/lpc/export.ts) | PNG (`toDataURL`) + JSON de metadatos del brief. |
| [components/](components/) | `CharacterCanvas`, `LayerPicker`, `ExportPanel`. |
| [data/challenges.ts](data/challenges.ts) | Catálogo de acertijos POO en PHP. |

### Orden de capas (Z-index)

No está hardcodeado: se lee el `zPos` de cada `sheet_definition`. Orden efectivo:
`cuerpo(10) → pantalón(20) → botas(25) → torso/armadura(≤60) → escudo(110) →
ojos(105) → pelo(120) → casco(≤130) → arma(140)`.

### Compositing de hojas de distinto tamaño

Las capas LPC son spritesheets que comparten origen (0,0) y orden de filas, pero
distinta altura (832×1344 clásica vs. 832×2944 extendida) y a veces distinto
ancho. El canvas se dimensiona al máximo y cada capa se dibuja en (0,0): las
hojas cortas cubren solo las primeras animaciones. Sin desalineación.

**Opciones multicapa:** una opción puede aportar varios PNG con su propio zPos
(báculos y espadas con parte trasera `background` z9 detrás del cuerpo + `fg`
z140 delante; capas con `behind` z5). El loader las expande y el compositor las
ordena por zPos.

**Hojas OVERSIZE:** las armas que se blanden (cimitarra, arco en walk, oversize
de thrust) usan hojas más anchas que 832px con otra grilla; `fetch-lpc.mjs` las
detecta por ancho y las descarta (no son apilables en la grilla de 64px). Se
conservan las hojas ≤832 (incluidas las `child` de 768px/12-col, que alinean en
la animación de caminar).

### Elenco — Episodio 1 (Moria)

`data/presets.ts` define 18 personajes agrupados por facción, cada uno resuelto
contra el manifest por `(categoría, variante)` y ligado a un acertijo POO:

- **La Comunidad:** Aragorn (Herencia), Gandalf (Clases Abstractas), Frodo
  (Encapsulamiento), Sam (Composición), Merry (Parámetros), Pippin
  (Constructores), Gimli (Static), Legolas (Interfaces), Boromir (Excepciones).
- **La Sombra:** Orco (Herencia), Trasgo (Colecciones), Uruk-hai (Polimorfismo),
  Gollum (Estado), Troll (Método abstracto), Balrog (Singleton).

Estatura: hobbits usan cuerpo `child` (descalzos, ropa child de 768px); trasgo y
Gollum usan `teen`; troll y Balrog usan `muscular` (torso desnudo). El resto,
adulto. Gimli va en cuerpo adulto (una barba LPC sobre cuerpo `child` parece un
niño con barba).

## Formato de exportación

```json
{
  "id": "golem_guardia_moria",
  "sprite_url": "data:image/png;base64,...",
  "layer_config": { "body": "male_olive", "torso": "chainmail_gray", "weapon": "longsword" },
  "poo_challenge": {
    "topic": "Herencia / Clases Abstractas",
    "prompt": "Crea una clase GolemGuardia que herede de GolemAbstracto...",
    "code_template": "<?php\n\nclass GolemGuardia extends GolemAbstracto { }"
  }
}
```

## Extender el catálogo

Añade una línea al `SLOTS` de [scripts/fetch-lpc.mjs](scripts/fetch-lpc.mjs)
(nuevo `def` o más `variants`) y ejecuta `pnpm fetch:lpc`. La UI se reconstruye
sola desde el `manifest.json`.

<!-- Agrega capturas en docs/screenshots/ -->

---

## Desarrollado por Francisco Javier Laguna

Full-stack developer · React · Vue · .NET · PHP

[GitHub](https://github.com/jlaguna553) · [LinkedIn](https://www.linkedin.com/in/francisco-javier-laguna-mondrag%C3%B3n-80a798154/) · [CV Online](https://cv-online.jlaguna553.workers.dev/v/xrdcnyej)
