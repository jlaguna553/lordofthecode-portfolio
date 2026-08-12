/**
 * Tipos del RPG educativo "La Sintaxis Ancestral".
 * El esquema de desafío sigue el brief (sección 4): lore + reto POO + test_cases.
 *
 * Los textos de contenido son `Localized<string>`: aceptan un string (idioma
 * base) o un objeto {es,en}. Se resuelven en la UI con `tc()`.
 */
import type { Localized } from "@/lib/i18n/core";

/** Un caso de prueba: se evalúa `$sut->{input}` y se compara con `expected`. */
export interface TestCase {
  /** Expresión aplicada al objeto bajo prueba, p. ej. "susurrarPalabra('Mellon')". */
  input: string;
  /** Valor esperado (se compara vía json_encode en PHP). */
  expected: unknown;
  /** Descripción legible para la UI. */
  description?: Localized<string>;
  /**
   * Si es true, `input` es una expresión PHP completa que se evalúa tal cual
   * (con `$__sut` disponible) en vez de anteponer `$__sut->`. Necesario para
   * comprobar efectos indirectos, como lo que hace un `__destruct`.
   */
  raw?: boolean;
}

export interface PooChallenge {
  /**
   * Lenguaje del reto. Por defecto "php" (La Comunidad del Anillo); los
   * capítulos de Las Dos Torres usan "python". Determina el evaluador y la
   * sintaxis de starter_code, support_code y test_cases.
   */
  lang?:
    | "php"
    | "python"
    | "javascript"
    | "typescript"
    | "go"
    | "react"
    | "sql"
    | "vue"
    | "aws"
    | "docker";
  topic: Localized<string>;
  instructions: Localized<string>;
  /** Código inicial que ve y edita el jugador. */
  starter_code: string;
  /**
   * Expresión PHP que construye el objeto bajo prueba, p. ej. "new Hobbit()".
   * Opcional: los retos de FUNCIÓN (algoritmos) no tienen objeto, y sus
   * test_cases usan `raw` para llamar directamente a la función del jugador.
   */
  sut?: string;
  /** Clases/funciones auxiliares inyectadas antes del código del jugador (ocultas). */
  support_code?: string;
  /**
   * Paquetes de Pyodide a cargar antes de ejecutar (sólo Python), p. ej.
   * ["numpy", "pandas"] para los retos de análisis de datos. Se cargan una vez
   * y quedan cacheados en la instancia de Pyodide.
   */
  packages?: string[];
  /** Pistas que el jugador puede pedir una a una si se atasca. */
  hints?: Localized<string>[];
  /**
   * Tiempo objetivo en segundos. Muestra un cronómetro en el reto (práctica
   * cronometrada estilo test técnico). No bloquea: sólo informa.
   */
  timeLimitSec?: number;
  test_cases: TestCase[];
  /**
   * Modo "bloques" para móvil (estilo Parsons): un conjunto de fragmentos de
   * código donde ALGUNOS forman la solución (en cierto orden) y otros son
   * distractores incorrectos. El jugador los ordena en vez de teclear; al
   * ejecutar, los bloques elegidos se unen y pasan por el MISMO evaluador —
   * el compilador y los tests siguen siendo el juez. Opcional: si falta, el
   * reto sólo ofrece el editor de texto.
   */
  blocks?: string[];
}

/** Una sección de un Pergamino: teoría, opcionalmente con código de ejemplo. */
export interface ScrollSection {
  heading?: Localized<string>;
  body: Localized<string>;
  code?: string;
}

/** Contenido didáctico de un Pergamino (se lee antes de los acertijos). */
export interface ScrollContent {
  /** Concepto que enseña, p. ej. "Single Responsibility". */
  topic: Localized<string>;
  sections: ScrollSection[];
  /** Frase para recordar / usar en una entrevista. */
  keyTakeaway?: Localized<string>;
}

interface BaseNode {
  node_id: string;
  title: Localized<string>;
  lore_intro: Localized<string>;
  /** Posición en tiles dentro del mapa del capítulo. */
  position: { x: number; y: number };
  /** id del preset/sprite LPC asociado (opcional). */
  spriteId?: string;
}

/** Nodo de acertijo: hay que escribir código y pasar los tests. */
export interface ChallengeNode extends BaseNode {
  kind?: "challenge";
  poo_challenge: PooChallenge;
  /**
   * Reto-JEFE (capstone) del capítulo: integra lo aprendido. Se desbloquea sólo
   * cuando el resto de retos del capítulo están resueltos, y resolverlo entrega
   * la recompensa y abre el capítulo siguiente. Reemplaza al jefe de combate en
   * las aventuras que orientan el jefe al lenguaje.
   */
  boss?: boolean;
  /** Recompensa por resolver el reto-jefe (héroe que se une). */
  reward?: Reward;
}

/** Una pregunta de combate: corta, de opción múltiple, sobre el tema del capítulo. */
export interface CombatQuestion {
  question: Localized<string>;
  options: Localized<string>[];
  correct: number;
  /** Por qué, para que fallar también enseñe. */
  explanation: Localized<string>;
}

/**
 * Un enemigo de combate por turnos. La vida se mide en ACIERTOS: cada respuesta
 * correcta le quita un punto. Cada fallo te quita `damage` a ti.
 */
export interface Enemy {
  name: Localized<string>;
  /** id de preset LPC (ver data/presets.ts). */
  spriteId: string;
  /** Aciertos necesarios para derrotarlo. */
  hp: number;
  /** Daño que te hace cada fallo. */
  damage: number;
  /** Experiencia que da al vencerlo. */
  xp: number;
  questions: CombatQuestion[];
  /**
   * Jefe de capítulo. Sólo se puede desafiar con todos los retos de código
   * resueltos, y derrotarlo desbloquea el capítulo siguiente.
   */
  boss?: boolean;
  /** Frase que suelta al empezar el combate. */
  taunt?: Localized<string>;
  /** Recompensa por derrotarlo (normalmente sólo la dan los jefes). */
  reward?: Reward;
}

/** Lo que se gana al derrotar a un jefe. */
export interface Reward {
  /** id de preset que pasa a ser jugable (ver data/presets.ts). */
  hero: string;
  /** Nombre visible del personaje desbloqueado. */
  name: Localized<string>;
  /** Por qué se une y qué aporta, para la pantalla de recompensa. */
  blurb: Localized<string>;
}

/** Nodo de combate: se vence respondiendo bien antes de quedarte sin vida. */
export interface BattleNode extends BaseNode {
  kind: "battle";
  enemy: Enemy;
}

/** Nodo de Pergamino: enseña el concepto; se completa al leerlo. */
export interface ScrollNode extends BaseNode {
  kind: "scroll";
  scroll: ScrollContent;
}

/** Una pregunta de opción múltiple (test de lógica/razonamiento). */
export interface QuizQuestion {
  question: Localized<string>;
  options: Localized<string>[];
  /** Índice de la opción correcta dentro de `options`. */
  correct: number;
  /** Por qué es esa: se muestra al responder. */
  explanation: Localized<string>;
}

export interface QuizContent {
  topic: Localized<string>;
  /** Tiempo objetivo para la tanda completa (informativo). */
  timeLimitSec?: number;
  questions: QuizQuestion[];
}

/** Nodo de acertijo lógico: se completa acertando todas las preguntas. */
export interface QuizNode extends BaseNode {
  kind: "quiz";
  quiz: QuizContent;
}

/**
 * Estantería de la Biblioteca: al abrirla se consulta el archivo (pergaminos
 * leídos o retos resueltos) filtrado por su pestaña. No se «completa».
 */
export interface ArchiveNode extends BaseNode {
  kind: "archive";
  tab: "scrolls" | "php" | "python";
}

/** Un nodo interactivo en el mapa (pergamino, acertijo, enigma, enemigo). */
export type MapNode =
  | ChallengeNode
  | ScrollNode
  | QuizNode
  | BattleNode
  | ArchiveNode;

/** Suelos disponibles: cada capítulo elige su bioma. */
export type GroundType =
  | "grass" // La Comarca
  | "grassDark" // Bosque Viejo
  | "dry" // caminos y tierras secas (Bree)
  | "stone" // salas de Khazad-dûm
  | "darkstone" // cavernas profundas
  | "lava" // el Daño de Durin
  | "snow" // el Paso de Caradhras
  | "ice" // aguas heladas
  | "gold"; // los bosques de Lothlórien

export type DecorType = "tree" | "pine" | "rock" | "house" | "mallorn";

/** Escenario decorativo del capítulo (tiles LPC de terreno). */
export interface Scenery {
  /** Suelo base del capítulo. Por defecto "grass". */
  ground?: GroundType;
  /** Filas (y en tiles) que son camino. */
  pathRows?: number[];
  /** Textura del camino. Por defecto "path" (tierra). */
  pathGround?: GroundType | "path";
  /** Charca/río/lago de lava rectangular (en tiles). */
  pond?: { x: number; y: number; w: number; h: number };
  /** Textura de la charca. Por defecto "water". */
  pondGround?: GroundType | "water";
  /** PNJ ambientales: dan vida al mapa, no se puede interactuar con ellos. */
  npcs?: {
    /** id de preset LPC (ver data/presets.ts). */
    spriteId: string;
    x: number;
    y: number;
    label?: Localized<string>;
  }[];
  /** Frases que suelta un compañero al pasar por un punto del mapa. */
  dialogues?: {
    x: number;
    y: number;
    /** id de preset del que habla (debe ir en `companions`). */
    speaker: string;
    /** Nombre visible. */
    name: Localized<string>;
    text: Localized<string>;
  }[];
  /** Objetos decorativos con ordenamiento por profundidad. */
  decor?: {
    type: DecorType;
    x: number;
    y: number;
    /** Rótulo opcional sobre el objeto (p. ej. "Bolsón Cerrado"). */
    label?: Localized<string>;
  }[];
}

export interface Chapter {
  chapter: number;
  title: Localized<string>;
  lore: Localized<string>;
  /** Tamaño del mapa en tiles [ancho, alto]. */
  mapSize: { cols: number; rows: number };
  /** Posición inicial del jugador (Frodo) en tiles. */
  spawn: { x: number; y: number };
  nodes: MapNode[];
  scenery?: Scenery;
  /**
   * Compañeros que siguen a Frodo en este capítulo, en orden de la fila
   * (ids de preset). Caminan sobre el rastro del jugador.
   */
  companions?: string[];
  /**
   * Experiencia que hay que ganar EN ESTE CAPÍTULO (venciendo a sus enemigos)
   * antes de poder abrir sus retos de código. Sin este campo, los retos están
   * abiertos desde el principio (así siguen los libros de práctica).
   */
  xpParaRetos?: number;
  /**
   * Capítulo cuyo jefe hay que derrotar para desbloquear éste. Sin este campo,
   * el capítulo está siempre disponible.
   */
  unlockedBy?: number;
}

/** Resultado de un test individual tras ejecutar el PHP del jugador. */
export interface TestResult {
  input: string;
  description?: Localized<string>;
  expected: string; // json
  got: string; // json o "<sin salida>"
  pass: boolean;
  /** Avisos de PHP emitidos durante este test (propiedad indefinida, etc.). */
  warning?: string;
}

/** Resultado global de una evaluación. */
export interface EvalResult {
  ok: boolean; // todos los tests pasaron
  results: TestResult[];
  /** Error de PHP (parse/fatal) si lo hubo. */
  phpError?: string;
  /** Salida cruda del jugador (echo/print fuera de los marcadores). */
  stdout?: string;
}
