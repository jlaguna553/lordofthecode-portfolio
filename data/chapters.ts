import type { Chapter } from "@/lib/game/types";

/**
 * Campaña "La Sintaxis Ancestral". Vertical slice: Capítulo 1.
 * Cada nodo es un acertijo de POO en PHP validado con test_cases (php-wasm).
 */

export const CHAPTER_1: Chapter = {
  chapter: 1,
  title: "Sombras en la Comarca",
  lore: "Frodo debe abandonar Bolsón Cerrado y cruzar la Comarca hacia Los Gamos, evadiendo a los Jinetes Negros que buscan el Anillo.",
  // El mapa desborda la pantalla a propósito: hay que recorrerlo para dar con
  // los enemigos que dan la experiencia necesaria para los acertijos.
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 9 },
  xpParaRetos: 65,
  scenery: {
    pathRows: [9],
    pond: { x: 16, y: 10, w: 5, h: 3 },
    npcs: [
      { spriteId: "merry", x: 6, y: 12, label: "Merry" },
      { spriteId: "pippin", x: 8, y: 12, label: "Pippin" },
    ],
    dialogues: [
      { x: 5, y: 9, speaker: "sam", name: "Sam",
        text: "Si doy un paso más, será el punto más lejos de casa en que haya estado." },
      { x: 13, y: 9, speaker: "sam", name: "Sam",
        text: "Señor Frodo… ese jinete no huele a nada bueno." },
    ],
    decor: [
      { type: "house", x: 2, y: 7, label: "Bolsón Cerrado" },
      { type: "tree", x: 6, y: 2 },
      { type: "tree", x: 9, y: 3 },
      { type: "tree", x: 12, y: 2 },
      { type: "tree", x: 18, y: 3 },
      { type: "tree", x: 20, y: 6 },
      { type: "tree", x: 5, y: 13 },
      { type: "tree", x: 8, y: 13 },
      { type: "tree", x: 13, y: 12 },
      { type: "rock", x: 5, y: 6 },
      { type: "rock", x: 11, y: 7 },
      { type: "rock", x: 8, y: 11 },
      { type: "rock", x: 15, y: 8 },
      // --- Los Gamos: la mitad este del mapa, abierta tras el estanque ---
      { type: "tree", x: 24, y: 3 },
      { type: "tree", x: 28, y: 2 },
      { type: "tree", x: 31, y: 5 },
      { type: "tree", x: 25, y: 13 },
      { type: "tree", x: 30, y: 16 },
      { type: "tree", x: 22, y: 17 },
      { type: "tree", x: 15, y: 17 },
      { type: "tree", x: 9, y: 16 },
      { type: "rock", x: 26, y: 7 },
      { type: "rock", x: 32, y: 11 },
      { type: "rock", x: 19, y: 15 },
      { type: "rock", x: 12, y: 18 },
      { type: "tree", x: 5, y: 21 },
      { type: "tree", x: 11, y: 23 },
      { type: "tree", x: 17, y: 22 },
      { type: "tree", x: 24, y: 21 },
      { type: "tree", x: 30, y: 23 },
      { type: "tree", x: 38, y: 20 },
      { type: "tree", x: 41, y: 14 },
      { type: "rock", x: 20, y: 23 },
      { type: "rock", x: 35, y: 17 },
      { type: "rock", x: 40, y: 22 },
      { type: "rock", x: 27, y: 19 },
    ],
  },
  companions: ["sam"],
  nodes: [
    // ---- Combates: entrenan clases, propiedades y visibilidad ----
    {
      node_id: "c1_espia",
      kind: "battle",
      title: "El husmeador del Camino Verde",
      lore_intro:
        "Un hombre flaco pregunta por «un tal Bolsón» a todo el que pasa. No lleva armas, pero lleva preguntas.",
      position: { x: 26, y: 5 },
      spriteId: "aldeano",
      enemy: {
        name: "Husmeador de Bree",
        spriteId: "aldeano",
        hp: 2,
        damage: 1,
        xp: 25,
        taunt: "«¿Bolsón, dice? Conozco a alguien muy interesado en ese apellido…»",
        questions: [
          {
            question:
              "«Dime, mediano: para guardar el nombre de tu amo dentro de una clase, ¿qué escribes?»",
            options: [
              "private string $nombre;",
              "private $nombre: string;",
              "var string nombre;",
              "let $nombre = '';",
            ],
            correct: 0,
            explanation:
              "En PHP la propiedad se declara como «visibilidad tipo $nombre;». El tipo va ANTES del $, al revés que en TypeScript. `var` existe pero está obsoleto desde PHP 7 (equivale a public) y `let` no es de PHP.",
          },
          {
            question:
              "Dentro de un método, ¿cómo lees una propiedad del propio objeto?",
            options: [
              "$this->nombre",
              "$this.nombre",
              "self::$nombre",
              "$nombre",
            ],
            correct: 0,
            explanation:
              "`$this->propiedad`, con flecha y SIN el signo dólar en el nombre (`$this->$nombre` significaría otra cosa: acceso dinámico por variable). El punto es concatenación en PHP, no acceso a miembro. `self::$nombre` es para propiedades estáticas, y `$nombre` a secas sería una variable local.",
          },
          {
            question:
              "Tienes `private $anillo;`. ¿Desde dónde se puede leer?",
            options: [
              "Sólo desde dentro de la propia clase",
              "Desde la clase y sus hijas",
              "Desde cualquier parte del programa",
              "Sólo desde fuera de la clase",
            ],
            correct: 0,
            explanation:
              "`private` es el cerrojo más estricto: ni siquiera las clases hijas lo ven. Si quieres que las hijas sí puedan, usa `protected`. Y `public` lo abre a todo el mundo. Empieza siempre por private y abre sólo lo que haga falta.",
          },
        ],
      },
    },
    {
      node_id: "c1_jinete_rastreador",
      kind: "battle",
      title: "El rastreador",
      lore_intro:
        "El caballo negro olfatea el suelo donde te detuviste. El jinete no tiene rostro, pero sabe que estás cerca.",
      position: { x: 30, y: 13 },
      spriteId: "nazgul",
      enemy: {
        name: "Jinete Negro rastreador",
        spriteId: "nazgul",
        hp: 3,
        damage: 1,
        xp: 25,
        taunt: "«Ssssiento el Anillo. Está muy cerca…»",
        questions: [
          {
            question: "¿Qué hace exactamente la palabra `new`?",
            options: [
              "Crea un objeto nuevo a partir de la clase y ejecuta su constructor",
              "Declara una clase",
              "Copia un objeto que ya existe",
              "Reserva memoria sin ejecutar nada",
            ],
            correct: 0,
            explanation:
              "La clase es el molde; `new` fabrica una pieza con ese molde y llama a `__construct()`. Para copiar un objeto existente se usa `clone` (y ojo: la copia es superficial, los objetos internos se comparten).",
          },
          {
            question:
              "¿Cuál de estas cosas NO puede hacer un método `private`?",
            options: [
              "Ser llamado desde otra clase, aunque sea hija",
              "Ser llamado desde otro método de su clase",
              "Devolver un valor",
              "Recibir parámetros",
            ],
            correct: 0,
            explanation:
              "La visibilidad no limita lo que el método hace, sólo desde DÓNDE se le puede llamar. Un private es invisible fuera de su propia clase — incluidas las hijas. Es la herramienta para que los detalles internos no se conviertan en contrato público.",
          },
          {
            question:
              "¿Por qué se considera mala práctica dejar todas las propiedades en `public`?",
            options: [
              "Cualquiera puede dejar el objeto en un estado imposible sin pasar por tus validaciones",
              "Porque es más lento",
              "Porque PHP lanza un aviso",
              "Porque consume más memoria",
            ],
            correct: 0,
            explanation:
              "El coste no es de rendimiento, es de control: con la propiedad pública nadie te garantiza que valga algo válido. Si el único camino para cambiarla es un método tuyo, ahí puedes validar, registrar o rechazar. Eso es encapsulamiento.",
          },
        ],
      },
    },
    {
      node_id: "c1_jefe_nazgul",
      kind: "battle",
      title: "El Jinete del Vado",
      lore_intro:
        "Cierra el paso al este. La hoja está desenvainada y el aire huele a frío. No hay rodeo posible: o pasas por encima, o vuelves a Bolsón Cerrado.",
      position: { x: 32, y: 9 },
      spriteId: "nazgul",
      enemy: {
        name: "El Jinete del Vado",
        spriteId: "nazgul",
        hp: 4,
        damage: 2,
        xp: 45,
        boss: true,
        taunt: "«El Anillo… ¡el Anillo va a Mordor, y tú con él!»",
        reward: {
          hero: "sam",
          name: "Samsagaz Gamyi",
          blurb:
            "El jardinero leal que juró no dejarte solo. Desde ahora puedes jugar con Sam.",
        },
        questions: [
          {
            question:
              "Una clase declara `private string $palabra = 'Mellon';` y un método `public function decir(): string { return $this->palabra; }`. ¿Qué imprime `echo (new Puerta())->decir();`?",
            options: [
              "Mellon",
              "Error: $palabra es privada",
              "Nada, cadena vacía",
              "El nombre de la propiedad",
            ],
            correct: 0,
            explanation:
              "`decir()` es público y vive DENTRO de la clase, así que ve la propiedad privada sin problema. Ése es el patrón: el dato se cierra y se expone una puerta controlada. El error saltaría con `(new Puerta())->palabra` desde fuera.",
          },
          {
            question:
              "¿Cuál es la diferencia entre `protected` y `private`?",
            options: [
              "protected lo heredan las clases hijas; private no",
              "protected es visible desde fuera; private no",
              "Son sinónimos",
              "private sólo aplica a métodos y protected sólo a propiedades",
            ],
            correct: 0,
            explanation:
              "Los dos cierran el acceso desde fuera. La diferencia está en la herencia: una clase hija puede usar los miembros `protected` de su padre, pero no los `private`. Usa protected cuando diseñes una clase pensada para extenderse.",
          },
          {
            question:
              "¿Qué devuelve `$a === $b` si `$a = new Hobbit(); $b = new Hobbit();`?",
            options: [
              "false: son dos objetos distintos aunque sean de la misma clase",
              "true: tienen los mismos valores",
              "Error: los objetos no se comparan con ===",
              "true: son de la misma clase",
            ],
            correct: 0,
            explanation:
              "Con objetos, `===` pregunta si son LA MISMA instancia, no si se parecen. `==` sí compara clase y valores de las propiedades. Confundirlos es una fuente clásica de bugs: dos objetos con idénticos datos son `==` pero nunca `===`.",
          },
          {
            question:
              "¿Para qué sirve el constructor `__construct()`?",
            options: [
              "Para dejar el objeto en un estado válido en el momento de nacer",
              "Para destruir el objeto al terminar",
              "Para declarar las propiedades",
              "Es opcional y no hace nada especial",
            ],
            correct: 0,
            explanation:
              "Se ejecuta solo al hacer `new` y es tu única oportunidad de exigir lo imprescindible. Si un Hobbit no puede existir sin nombre, pídelo en el constructor: así es imposible construir uno inválido, y te ahorras validar en todos los demás métodos.",
          },
        ],
      },
    },
    {
      node_id: "c1_perro_negro",
      kind: "battle",
      title: "Perro entre los setos",
      lore_intro:
        "En los campos del sur de Los Gamos, un perro grande y flaco gruñe desde la maleza. No es de ninguna granja de por aquí.",
      position: { x: 8, y: 22 },
      spriteId: "orco",
      enemy: {
        name: "Can del Nazgûl",
        spriteId: "orco",
        hp: 3,
        damage: 1,
        xp: 25,
        taunt: "El animal husmea el aire buscando el olor del Anillo.",
        questions: [
          {
            question:
              "¿Qué visibilidad usarías para una propiedad que sólo debe tocar la propia clase?",
            options: ["private", "public", "protected", "final"],
            correct: 0,
            explanation:
              "`private` es el cerrojo más estricto: ni las clases hijas la ven. Es el punto de partida recomendado — abres a `protected` o `public` sólo cuando aparece una necesidad real.",
          },
          {
            question:
              "Declaras `public function __construct(public string $nombre) {}`. ¿Qué visibilidad tendrá la propiedad `$nombre`?",
            options: ["public", "private", "protected", "ninguna: es sólo un parámetro"],
            correct: 0,
            explanation:
              "La promoción de propiedades usa la visibilidad que pongas ANTES del parámetro. Aquí `public`, así que `$obj->nombre` se lee desde fuera. Es azúcar sintáctico de PHP 8 que declara, recibe y asigna en un solo sitio.",
          },
          {
            question: "¿Qué es una instancia?",
            options: [
              "Un objeto concreto creado a partir de una clase",
              "El nombre técnico de una clase",
              "Un método que devuelve un objeto",
              "Una propiedad estática",
            ],
            correct: 0,
            explanation:
              "La clase es el molde; la instancia es cada objeto fabricado con ese molde por `new`. Dos instancias de la misma clase tienen las mismas propiedades pero valores independientes.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_clases",
      kind: "scroll",
      title: "El Pergamino de Bilbo",
      lore_intro:
        "Entre los papeles del viejo Bilbo hay un pergamino con su letra apretada: «Antes de contar una historia, di quién la protagoniza. Un molde primero; los personajes, después.»",
      position: { x: 6, y: 6 },
      scroll: {
        topic: "Clases, propiedades y visibilidad",
        sections: [
          {
            heading: "La clase es el molde; el objeto, la pieza",
            body: "Una CLASE describe qué datos tiene algo y qué sabe hacer. Un OBJETO es una copia concreta hecha con ese molde: cada uno con sus propios valores.\n\nCon `new` fabricas un objeto a partir de la clase.",
            code: `class Hobbit {
    public function __construct(private string $nombre) {}

    public function presentarse(): string {
        return "Soy {$this->nombre} de la Comarca";
    }
}

$frodo = new Hobbit('Frodo');   // un objeto
$sam   = new Hobbit('Sam');     // otro, independiente`,
          },
          {
            heading: "El constructor y la promoción de propiedades",
            body: "`__construct()` se ejecuta al crear el objeto y sirve para dejarlo en un estado válido desde el primer instante.\n\nEn PHP 8 puedes DECLARAR y ASIGNAR la propiedad en la propia firma del constructor: se llama promoción y ahorra media clase de código repetido.",
            code: `// Antiguo
class Hobbit {
    private string $nombre;
    public function __construct(string $nombre) {
        $this->nombre = $nombre;
    }
}

// PHP 8: lo mismo en una línea
class Hobbit {
    public function __construct(private string $nombre) {}
}`,
          },
          {
            heading: "public, private y protected",
            body: "`public` → lo toca cualquiera, desde fuera.\n`private` → sólo la propia clase.\n`protected` → la clase y sus hijas.\n\nPor defecto empieza en `private` y abre sólo lo que haga falta. Si todo es público, cualquier parte del programa puede dejar tu objeto en un estado imposible.",
            code: `class Hobbit {
    private int $nivelSigilo = 0;   // nadie lo toca desde fuera

    public function getNivelSigilo(): int {  // acceso controlado
        return $this->nivelSigilo;
    }
}`,
          },
        ],
        keyTakeaway:
          "Empieza todo en private y expón sólo lo necesario. El objeto debe proteger sus propios datos: eso es encapsulamiento.",
      },
    },
    {
      node_id: "sendero_comarca",
      title: "Preparar la Huida",
      lore_intro:
        "Antes de partir debes saber quién eres. Todo héroe empieza por definirse: crea la clase que representa a un hobbit de la Comarca.",
      position: { x: 9, y: 9 },
      poo_challenge: {
        topic: "Clases, propiedades y constructores",
        instructions:
          "Crea la clase Hobbit con un constructor que reciba $nombre (string) y guárdelo en una propiedad. Añade el método presentarse(): string que devuelva exactamente 'Soy {nombre} de la Comarca'.",
        sut: "new Hobbit('Frodo')",
        starter_code: "<?php\n\nclass Hobbit {\n\n}\n",
        hints: [
          "En PHP 8 puedes declarar y asignar la propiedad en el propio constructor: __construct(private string $nombre) {}",
          'Dentro de comillas dobles se interpola así: return "Soy {$this->nombre} de la Comarca";',
        ],
        test_cases: [
          {
            input: "presentarse()",
            expected: "Soy Frodo de la Comarca",
            description: "presentarse() se presenta con el nombre recibido",
          },
        ],
      },
    },
    {
      node_id: "halito_negro",
      title: "El Hálito Negro",
      lore_intro:
        "Un Jinete Negro olfatea el aire cerca del camino. Para pasar inadvertido debes controlar tu Sigilo — un estado privado que nadie puede manipular directamente desde fuera.",
      position: { x: 15, y: 5 },
      spriteId: "nazgul",
      poo_challenge: {
        topic: "Encapsulamiento (private) + getters/setters",
        instructions:
          "En la clase Hobbit protege la propiedad $nivelSigilo (private, empieza en 0). Añade: getNivelSigilo(): int; ocultarse(int $n): void que SUME sigilo sin pasar de 100; y esVisiblePara(Nazgul $n): bool que devuelva true solo si tu sigilo es MENOR que la percepción del Nazgûl.\n\nLa clase Nazgul ya existe (ver «Código de apoyo»): obtén su percepción con $n->getPercepcion() — con paréntesis, es un método.",
        sut: "new Hobbit()",
        support_code:
          "class Nazgul {\n    public function __construct(private int $percepcion = 50) {}\n    public function getPercepcion(): int { return $this->percepcion; }\n}",
        starter_code: "<?php\n\nclass Hobbit {\n\n}\n",
        hints: [
          "Declara la propiedad como private int $nivelSigilo = 0; para que nadie pueda tocarla desde fuera.",
          "ocultarse() debe SUMAR al sigilo actual, no reemplazarlo: min(100, $this->nivelSigilo + $n)",
          "esVisiblePara() compara tu sigilo con la percepción del Nazgûl: $this->nivelSigilo < $n->getPercepcion()",
        ],
        test_cases: [
          {
            input: "getNivelSigilo()",
            expected: 0,
            description: "El sigilo empieza en 0",
          },
          {
            input: "ocultarse(70)",
            expected: null,
            description: "ocultarse() no devuelve nada (void)",
          },
          {
            input: "getNivelSigilo()",
            expected: 70,
            description: "Tras ocultarse(70) el sigilo es 70",
          },
          {
            input: "ocultarse(50)",
            expected: null,
            description: "Sumar más sigilo…",
          },
          {
            input: "getNivelSigilo()",
            expected: 100,
            description: "…pero nunca supera 100 (70+50 → 100)",
          },
          {
            input: "esVisiblePara(new Nazgul(50))",
            expected: false,
            description: "Con sigilo 100 y percepción 50, NO te ve",
          },
          {
            input: "esVisiblePara(new Nazgul(120))",
            expected: true,
            description: "Un Nazgûl muy perceptivo (120) sí te ve",
          },
        ],
      },
    },
  ],
};

export const CHAPTER_2: Chapter = {
  chapter: 2,
  title: "El Bosque Viejo y los Túmulos",
  lore: "Más allá de la Cerca, los árboles del Bosque Viejo tienen voluntad propia y las nieblas de los Túmulos guardan a los muertos. Sólo el canto de Tom Bombadil deshace sus hechizos.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 7 },
  xpParaRetos: 85,
  unlockedBy: 1,
  scenery: {
    ground: "grassDark", // el Bosque Viejo es sombrío
    pathRows: [7],
    pond: { x: 3, y: 11, w: 6, h: 3 }, // el río Tornasauce
    decor: [
      { type: "pine", x: 6, y: 22 },
      { type: "pine", x: 13, y: 24 },
      { type: "pine", x: 21, y: 23 },
      { type: "pine", x: 28, y: 22 },
      { type: "pine", x: 36, y: 24 },
      { type: "tree", x: 41, y: 20 },
      { type: "rock", x: 17, y: 21 },
      { type: "rock", x: 32, y: 19 },
      { type: "rock", x: 39, y: 15 },
      // Coníferas densas al norte
      { type: "pine", x: 4, y: 3 },
      { type: "pine", x: 7, y: 2 },
      { type: "pine", x: 10, y: 4 },
      { type: "pine", x: 13, y: 2 },
      { type: "pine", x: 16, y: 3 },
      { type: "pine", x: 19, y: 2 },
      { type: "pine", x: 21, y: 5 },
      // El sauce: un frondoso entre coníferas, para que destaque
      { type: "tree", x: 9, y: 6, label: "Viejo Hombre Sauce" },
      // Bosque al sur
      { type: "pine", x: 12, y: 13 },
      { type: "pine", x: 16, y: 12 },
      { type: "pine", x: 20, y: 13 },
      // Piedras de los Túmulos
      { type: "rock", x: 14, y: 5 },
      { type: "rock", x: 16, y: 6 },
      { type: "rock", x: 13, y: 3 },
      { type: "rock", x: 6, y: 10 },
    ],
  },
  companions: ["sam", "merry", "pippin"],
  nodes: [
    // ---- Combates: constructores, métodos y destructores ----
    {
      node_id: "c2_raiz",
      kind: "battle",
      title: "La raíz que respira",
      lore_intro:
        "Una raíz gruesa se mueve cuando no la miras. El Bosque Viejo está despierto y no le gustan los visitantes.",
      position: { x: 25, y: 4 },
      spriteId: "tumulario",
      enemy: {
        name: "Raíz del Bosque Viejo",
        spriteId: "tumulario",
        hp: 3,
        damage: 1,
        xp: 30,
        taunt: "El sendero que acabas de cruzar ya no está donde lo dejaste.",
        questions: [
          {
            question: "¿Cuándo se ejecuta `__construct()`?",
            options: [
              "Al hacer `new`, antes de que nadie pueda usar el objeto",
              "La primera vez que se llama a un método",
              "Cuando se declara la clase",
              "Hay que llamarlo a mano tras crear el objeto",
            ],
            correct: 0,
            explanation:
              "PHP lo llama solo, y sólo una vez, justo al construir. Por eso es el sitio donde exigir lo imprescindible: si el objeto no puede existir sin cierto dato, pídelo ahí y ningún otro método tendrá que volver a comprobarlo.",
          },
          {
            question:
              "¿Qué hace la promoción de propiedades en el constructor?\n`public function __construct(private string $nombre) {}`",
            options: [
              "Declara la propiedad, la asigna y la deja privada, todo de una vez",
              "Sólo declara un parámetro; hay que asignarlo después",
              "Hace la propiedad pública",
              "Es sintaxis inválida",
            ],
            correct: 0,
            explanation:
              "Desde PHP 8, poner la visibilidad delante del parámetro declara la propiedad y hace el `$this->nombre = $nombre;` por ti. Ahorra la triple repetición (declaración, parámetro, asignación) que llenaba los constructores antiguos.",
          },
          {
            question: "¿Qué debe devolver un constructor?",
            options: [
              "Nada: no puede tener tipo de retorno",
              "El objeto creado",
              "true si todo fue bien",
              "$this",
            ],
            correct: 0,
            explanation:
              "`__construct` no devuelve nada y declararle un tipo de retorno es error fatal. El objeto lo entrega `new`, no el constructor. Si necesitas varias formas de construir, usa métodos estáticos con nombre (`Hobbit::desdeArray(...)`).",
          },
        ],
      },
    },
    {
      node_id: "c2_niebla",
      kind: "battle",
      title: "Niebla entre los túmulos",
      lore_intro:
        "La niebla se cierra y las piedras verticales aparecen donde antes había hierba. Algo te llama por tu nombre.",
      position: { x: 29, y: 15 },
      spriteId: "tumulario",
      enemy: {
        name: "Espectro de la niebla",
        spriteId: "tumulario",
        hp: 3,
        damage: 1,
        xp: 30,
        taunt: "«Fría sea la mano… frío el corazón bajo la piedra…»",
        questions: [
          {
            question: "¿Cuándo se ejecuta `__destruct()`?",
            options: [
              "Cuando ya no queda ninguna referencia al objeto, o al terminar el script",
              "Cuando escribes `delete $objeto`",
              "Inmediatamente después del constructor",
              "Nunca: PHP no tiene destructores",
            ],
            correct: 0,
            explanation:
              "PHP cuenta referencias: cuando la última desaparece (`unset()`, reasignación, salir de ámbito) llama al destructor. Sirve para soltar recursos — cerrar un fichero, liberar un bloqueo. No lo uses para lógica de negocio: no controlas el momento exacto.",
          },
          {
            question: "¿Qué hace `unset($hobbit);` si `$hobbit` es la única referencia?",
            options: [
              "Destruye el objeto y llama a su __destruct()",
              "Pone la variable a null pero el objeto sigue vivo",
              "Vacía las propiedades del objeto",
              "Da error si el objeto tiene destructor",
            ],
            correct: 0,
            explanation:
              "`unset()` quita ESA referencia. Si era la última, el objeto se destruye y su destructor se ejecuta ahí mismo. Si había otra variable apuntando al mismo objeto, no pasa nada: sigue vivo hasta que caiga la última.",
          },
          {
            question:
              "Un método declara `public function cantar(): void`. ¿Qué significa `void`?",
            options: [
              "Que no devuelve valor; un `return $algo;` dentro sería error",
              "Que devuelve null",
              "Que puede devolver cualquier cosa",
              "Que no recibe parámetros",
            ],
            correct: 0,
            explanation:
              "`void` promete que el método no entrega nada; se permite `return;` a secas para salir antes, pero no `return $x;`. Y ojo: llamarlo dentro de una expresión (`$y = $obj->cantar();`) te deja null, que casi nunca es lo que querías.",
          },
        ],
      },
    },
    {
      node_id: "c2_jefe_tumulario",
      kind: "battle",
      title: "El Tumulario",
      lore_intro:
        "Un brazo salido de la tierra arrastra a los hobbits hacia la cámara de piedra. Aquí termina la huida y empieza la prueba.",
      position: { x: 32, y: 9 },
      spriteId: "tumulario",
      enemy: {
        name: "El Tumulario",
        spriteId: "tumulario",
        hp: 4,
        damage: 2,
        xp: 55,
        boss: true,
        taunt: "«Aquí yaceréis hasta que el sol se apague y la luna muera.»",
        reward: {
          hero: "merry",
          name: "Meriadoc Brandigamo",
          blurb:
            "Espabilado y valiente bajo la broma. Merry se une a tus personajes jugables.",
        },
        questions: [
          {
            question:
              "¿Qué imprime?\n```\nclass A { public function __construct() { echo '1'; } public function __destruct() { echo '3'; } }\n$a = new A(); echo '2'; unset($a);\n```",
            options: ["123", "132", "213", "321"],
            correct: 0,
            explanation:
              "El constructor sale al hacer `new` (1), luego el echo suelto (2), y el destructor al soltar la última referencia con unset (3). Sin el `unset`, el 3 saldría igualmente, pero al final del script.",
          },
          {
            question:
              "¿Cuál es la diferencia entre un método y una función suelta?",
            options: [
              "El método pertenece a una clase y tiene acceso a `$this`",
              "El método no puede recibir parámetros",
              "La función no puede devolver valores",
              "Ninguna: son sinónimos",
            ],
            correct: 0,
            explanation:
              "Un método vive dentro de una clase y por eso puede leer y modificar el estado del objeto a través de `$this`. Esa es toda la diferencia relevante: la función opera sólo con lo que le pasas; el método, además, con lo que el objeto recuerda.",
          },
          {
            question:
              "Quieres que sea IMPOSIBLE crear un Hobbit sin nombre. ¿Dónde lo garantizas?",
            options: [
              "Exigiendo el nombre como parámetro obligatorio del constructor",
              "Comprobándolo en cada método que use el nombre",
              "Poniendo la propiedad como public para que se la asignen",
              "Documentándolo en un comentario",
            ],
            correct: 0,
            explanation:
              "Si el constructor lo exige, un Hobbit sin nombre no llega a existir: el error salta en el punto exacto donde está el fallo. Validar en cada método es repetir el trabajo y descubrirlo tarde; el comentario no lo comprueba nadie.",
          },
          {
            question:
              "¿Qué pasa si una clase hija define `__construct()` y NO llama a `parent::__construct()`?",
            options: [
              "El constructor del padre no se ejecuta y su inicialización se pierde",
              "PHP llama al del padre automáticamente antes",
              "Error fatal al instanciar",
              "Se ejecutan los dos, en orden padre→hijo",
            ],
            correct: 0,
            explanation:
              "A diferencia de otros lenguajes, PHP NO encadena constructores solo: el de la hija sustituye al del padre por completo. Si el padre inicializaba algo, tienes que llamar tú a `parent::__construct()`. Es una de las fuentes de bugs más silenciosas al heredar.",
          },
        ],
      },
    },
    {
      node_id: "c2_sauce",
      kind: "battle",
      title: "El Viejo Hombre-Sauce despierta",
      lore_intro:
        "En la ribera del Tornasauce, un sauce enorme mece las ramas sin que sople el viento. Da sueño sólo mirarlo — y ése es su método.",
      position: { x: 10, y: 23 },
      spriteId: "tumulario",
      enemy: {
        name: "Rama del Hombre-Sauce",
        spriteId: "tumulario",
        hp: 4,
        damage: 1,
        xp: 30,
        taunt: "«Dormíos… dormíos bajo mis raíces, pequeños…»",
        questions: [
          {
            question:
              "¿Puede un método llamar a OTRO método de la misma clase? ¿Cómo?",
            options: [
              "Sí, con $this->otroMetodo()",
              "No: cada método es independiente",
              "Sí, pero sólo si el otro es público",
              "Sí, con self::otroMetodo() siempre",
            ],
            correct: 0,
            explanation:
              "Dentro de un objeto, $this-> te da acceso a todos sus métodos, incluidos los privados. Es lo normal: partir una tarea grande en métodos pequeños que se llaman entre sí. self:: se reserva para lo estático.",
          },
          {
            question: "Un método sin `return` explícito, ¿qué devuelve?",
            options: ["null", "false", "0", "Una cadena vacía"],
            correct: 0,
            explanation:
              "Si un método termina sin return (o hace return; a secas), PHP devuelve null. Por eso conviene declarar : void cuando no debe devolver nada: documenta la intención y evita que alguien use su resultado por error.",
          },
          {
            question: "¿Qué diferencia hay entre un parámetro y una propiedad?",
            options: [
              "El parámetro vive sólo durante la llamada; la propiedad, mientras viva el objeto",
              "Ninguna: son dos nombres para lo mismo",
              "La propiedad no puede cambiar de valor",
              "El parámetro pertenece a la clase",
            ],
            correct: 0,
            explanation:
              "Un parámetro es una variable local que existe mientras se ejecuta el método y desaparece al terminar. Una propiedad es memoria del objeto: persiste entre llamadas. El constructor suele copiar parámetros a propiedades justo por eso.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_ciclo_vida",
      kind: "scroll",
      title: "El Pergamino del Camino",
      lore_intro:
        "Clavado en un poste junto a la Cerca, medio comido por la humedad, alguien dejó un aviso para los que entran al Bosque: «Todo lo que nace aquí, aquí termina. Y al terminar, deshace lo que ató.»",
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Ciclo de vida: constructores y destructores",
        sections: [
          {
            heading: "Nacer: __construct()",
            body: "Se ejecuta UNA vez, al crear el objeto. Su trabajo es dejarlo listo para usarse: recibir lo imprescindible y validarlo.\n\nSi un objeto puede existir en estado inválido, el constructor no está haciendo su trabajo.",
            code: `class HombreSauce {
    public function __construct(private int $fuerza) {}
}`,
          },
          {
            heading: "Morir: __destruct()",
            body: "PHP lo llama SOLO, sin que tú lo invoques, cuando ya nadie apunta al objeto: al salir de la función donde vive, al reasignar la variable o con `unset()`.\n\nSirve para deshacer lo que el objeto ató: cerrar un fichero, soltar una conexión… o romper un hechizo.",
            code: `class EfectoHechizo {
    public function __construct(private Personaje $objetivo) {}

    public function __destruct() {
        $this->objetivo->paralizado = false;  // se libera solo
    }
}`,
          },
          {
            heading: "El detalle que decide todo: el ámbito",
            body: "Una variable LOCAL muere al terminar el método → su destructor se dispara ahí mismo.\nSi guardas el objeto en una PROPIEDAD, sigue vivo mientras viva el dueño → el destructor NO se ejecuta.\n\nEsa diferencia es justo lo que hace que el canto de Tom funcione… o no.",
            code: `public function cantarConjuro(Personaje $p): void {
    $efecto = new EfectoHechizo($p);   // ✅ local: muere aquí y libera
    // $this->efecto = new EfectoHechizo($p);  // ❌ sobrevive: no libera
}`,
          },
        ],
        keyTakeaway:
          "El constructor deja el objeto válido; el destructor deshace lo que ató. Y quién guarda la referencia decide CUÁNDO muere.",
      },
    },
    {
      node_id: "viejo_hombre_sauce",
      title: "El Viejo Hombre Sauce",
      lore_intro:
        "Un sauce inmenso adormece a los hobbits y atrapa a Merry entre sus raíces. Para enfrentarlo primero hay que darle forma: todo objeto nace con un constructor.",
      position: { x: 7, y: 7 },
      poo_challenge: {
        topic: "Constructores y métodos",
        instructions:
          "Crea la clase HombreSauce con un constructor que reciba $fuerza (int) y la guarde. Añade getFuerza(): int y atrapar(string $nombre): string, que devuelva exactamente '{nombre} queda atrapado entre las raíces'.",
        sut: "new HombreSauce(80)",
        starter_code: "<?php\n\nclass HombreSauce {\n\n}\n",
        hints: [
          "__construct(private int $fuerza) {} declara la propiedad y la asigna de una vez.",
          'El texto debe coincidir exactamente: return "$nombre queda atrapado entre las raíces";',
        ],
        test_cases: [
          {
            input: "getFuerza()",
            expected: 80,
            description: "El constructor guarda la fuerza recibida",
          },
          {
            input: "atrapar('Merry')",
            expected: "Merry queda atrapado entre las raíces",
            description: "atrapar() usa el nombre recibido",
          },
        ],
      },
    },
    {
      node_id: "tumulo_espectro",
      title: "El Túmulo del Espectro",
      lore_intro:
        "Entre las piedras erguidas, un Tumulario susurra en la niebla. Su frío drena la vida de quien se acerque… pero nunca por debajo de cero.",
      position: { x: 15, y: 4 },
      spriteId: "tumulario",
      poo_challenge: {
        topic: "Métodos y lógica de estado",
        instructions:
          "Crea la clase Tumulario con un constructor que reciba $frio (int). Añade getFrio(): int y drenar(int $vida): int, que reste el frío a la vida devuelta, sin bajar nunca de 0.",
        sut: "new Tumulario(30)",
        starter_code: "<?php\n\nclass Tumulario {\n}\n",
        hints: [
          "Guarda el frío con __construct(private int $frio) {}",
          "Para que nunca baje de cero: return max(0, $vida - $this->frio);",
        ],
        test_cases: [
          { input: "getFrio()", expected: 30, description: "El frío del espectro" },
          {
            input: "drenar(100)",
            expected: 70,
            description: "Drena 30 puntos de vida",
          },
          {
            input: "drenar(20)",
            expected: 0,
            description: "La vida nunca baja de 0",
          },
        ],
      },
    },
    {
      node_id: "canto_bombadil",
      title: "El Canto de Tom Bombadil",
      lore_intro:
        "«¡Eh, vamos alegre dol!» Tom canta y el hechizo se deshace. En PHP, lo que se deshace al terminar su vida es un objeto: su DESTRUCTOR es el que libera a los prisioneros.",
      position: { x: 18, y: 10 },
      spriteId: "bombadil",
      poo_challenge: {
        topic: "Destructores (__destruct)",
        instructions:
          "Crea EfectoHechizo: su constructor recibe un Personaje y lo guarda; su destructor __destruct() debe liberarlo poniendo $paralizado = false. Luego, en TomBombadil añade cantarConjuro(Personaje $p): void que cree un EfectoHechizo en una variable LOCAL — al terminar el método el objeto se destruye y el canto libera al personaje.",
        sut: "new TomBombadil()",
        support_code:
          "class Personaje {\n    public bool $paralizado = true;\n    public function estaParalizado(): bool { return $this->paralizado; }\n}\n\nclass Prueba {\n    public static ?Personaje $victima = null;\n    public static function nueva(): Personaje {\n        self::$victima = new Personaje();\n        return self::$victima;\n    }\n}",
        starter_code: "<?php\n\nclass EfectoHechizo {\n\n}\n\nclass TomBombadil {\n}\n",
        hints: [
          "El constructor solo guarda la referencia: __construct(private Personaje $objetivo) {}",
          "El destructor se llama solo al morir el objeto: public function __destruct() { $this->objetivo->paralizado = false; }",
          "Clave: en cantarConjuro() guarda el efecto en una variable LOCAL ($efecto = new EfectoHechizo($p);). Si lo guardas como propiedad, el objeto no se destruye al salir del método y el hechizo no se rompe.",
        ],
        test_cases: [
          {
            input: "Prueba::nueva()->estaParalizado()",
            raw: true,
            expected: true,
            description: "El personaje empieza paralizado por el hechizo",
          },
          {
            input: "$sut->cantarConjuro(Prueba::$victima)",
            raw: true,
            expected: null,
            description: "Tom canta (el método no devuelve nada)",
          },
          {
            input: "Prueba::$victima->estaParalizado()",
            raw: true,
            expected: false,
            description:
              "Al acabar el método, el destructor liberó al personaje",
          },
        ],
      },
    },
  ],
};

export const CHAPTER_3: Chapter = {
  chapter: 3,
  title: "Bree y la Cima de los Vientos",
  lore: "En El Póney Pisador aguarda un montaraz encapuchado al que llaman Trancos. Tras él, el camino asciende hasta Amon Sûl, donde cinco Jinetes Negros esperan bajo las ruinas.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 9 },
  xpParaRetos: 105,
  unlockedBy: 2,
  scenery: {
    ground: "dry", // tierras pardas del camino del Este
    pathRows: [9],
    pathGround: "stone", // la Gran Carretera del Este, empedrada
    npcs: [
      { spriteId: "aldeano", x: 4, y: 12, label: "Vecino de Bree" },
      { spriteId: "aldeana", x: 10, y: 12 },
      { spriteId: "aldeano", x: 14, y: 13 },
    ],
    dialogues: [
      { x: 4, y: 9, speaker: "merry", name: "Merry",
        text: "En Bree hay más ojos que ventanas. No digáis vuestro nombre." },
      { x: 16, y: 9, speaker: "aragorn", name: "Trancos",
        text: "Amon Sûl está ahí arriba. Al descubierto, y los Nueve lo saben." },
    ],
    decor: [
      { type: "tree", x: 7, y: 22 },
      { type: "tree", x: 15, y: 24 },
      { type: "house", x: 22, y: 22, label: "Casa de Helechal" },
      { type: "tree", x: 30, y: 23 },
      { type: "tree", x: 38, y: 21 },
      { type: "rock", x: 26, y: 20 },
      { type: "rock", x: 34, y: 24 },
      { type: "rock", x: 41, y: 17 },
      // Bree: el pueblo
      { type: "house", x: 4, y: 7, label: "El Póney Pisador" },
      { type: "house", x: 9, y: 7 },
      { type: "tree", x: 10, y: 12 },
      { type: "tree", x: 12, y: 12 },
      { type: "tree", x: 2, y: 4 },
      { type: "tree", x: 13, y: 4 },
      // El camino hacia el este
      { type: "tree", x: 16, y: 12 },
      { type: "rock", x: 15, y: 7 },
      // Amon Sûl: las ruinas de la Cima de los Vientos
      { type: "rock", x: 18, y: 4 },
      { type: "rock", x: 20, y: 3 },
      { type: "rock", x: 22, y: 4 },
      { type: "rock", x: 18, y: 7 },
      { type: "rock", x: 22, y: 7 },
      { type: "rock", x: 21, y: 6 },
      { type: "tree", x: 23, y: 12 },
    ],
  },
  companions: ["sam", "merry", "pippin", "aragorn"],
  nodes: [
    // ---- Combates: herencia y sobrescritura ----
    {
      node_id: "c3_ferny",
      kind: "battle",
      title: "El vendido de Bree",
      lore_intro:
        "Bill Helechal escupe al suelo cuando pasas. Cobra en monedas de Isengard y no le importa a quién señale.",
      position: { x: 26, y: 4 },
      spriteId: "aldeano",
      enemy: {
        name: "Bill Helechal",
        spriteId: "aldeano",
        hp: 3,
        damage: 1,
        xp: 35,
        taunt: "«Cuatro medianos y un montaraz. Alguien pagará bien por saberlo.»",
        questions: [
          {
            question: "¿Qué hereda una clase hija de su padre?",
            options: [
              "Los miembros public y protected; los private no",
              "Absolutamente todo, incluidos los private",
              "Sólo los métodos, nunca las propiedades",
              "Sólo lo que declares con `use`",
            ],
            correct: 0,
            explanation:
              "`private` es privado de verdad: la hija no lo ve, aunque ocupe espacio en el objeto. Si diseñas una clase para que la extiendan, lo que quieras compartir con las hijas va en `protected`.",
          },
          {
            question:
              "¿Cuántas clases puede extender una clase en PHP?",
            options: [
              "Una sola",
              "Todas las que quieras, separadas por comas",
              "Hasta tres",
              "Ninguna: PHP no tiene herencia",
            ],
            correct: 0,
            explanation:
              "PHP tiene herencia SIMPLE: un solo `extends`. Para reunir comportamiento de varios sitios están los `interface` (contratos) y los `trait` (implementación reutilizable). Esa restricción es deliberada: la herencia múltiple genera ambigüedades difíciles de resolver.",
          },
          {
            question:
              "Al sobrescribir un método del padre, ¿qué NO puedes hacer?",
            options: [
              "Reducir su visibilidad (pasar de public a private)",
              "Cambiar el cuerpo por completo",
              "Ampliar la visibilidad (de protected a public)",
              "Llamar a la versión del padre desde dentro",
            ],
            correct: 0,
            explanation:
              "La hija puede abrir el acceso, nunca cerrarlo: si el padre prometía un método público, quien use la hija como si fuera el padre debe poder llamarlo. Es el principio de sustitución de Liskov aplicado por el propio lenguaje.",
          },
        ],
      },
    },
    {
      node_id: "c3_espia_nazgul",
      kind: "battle",
      title: "Sombra en el camino de Amon Sûl",
      lore_intro:
        "Uno de los Nueve se ha adelantado a los demás. Aún no ha dado la señal, y ésa es tu única ventaja.",
      position: { x: 31, y: 15 },
      spriteId: "nazgul",
      enemy: {
        name: "Nazgûl explorador",
        spriteId: "nazgul",
        hp: 4,
        damage: 1,
        xp: 40,
        taunt: "«No hay dónde esconderse en campo abierto, mediano.»",
        questions: [
          {
            question: "¿Qué hace exactamente `parent::__construct($x)`?",
            options: [
              "Ejecuta el constructor del padre desde el de la hija",
              "Crea un objeto nuevo de la clase padre",
              "Convierte el objeto en una instancia del padre",
              "Copia las propiedades del padre",
            ],
            correct: 0,
            explanation:
              "`parent::` no crea nada: ejecuta el método del padre sobre el objeto ACTUAL. Es lo que permite ampliar el comportamiento heredado en vez de reemplazarlo — la hija hace lo suyo y delega el resto.",
          },
          {
            question:
              "Una hija sobrescribe `atacar()` y quiere hacer lo mismo que el padre MÁS algo extra. ¿Cuál es la forma correcta?",
            options: [
              "Llamar a parent::atacar() dentro y añadir lo suyo",
              "Copiar y pegar el código del padre y añadirlo",
              "Declarar el método como abstract",
              "No se puede: hay que reescribirlo entero",
            ],
            correct: 0,
            explanation:
              "Copiar y pegar funciona hoy y se rompe el día que alguien toque al padre: tendrías dos versiones de la misma lógica divergiendo en silencio. `parent::atacar()` mantiene una sola fuente de verdad.",
          },
          {
            question:
              "`$x instanceof Personaje` con `$x = new Hobbit()` y `class Hobbit extends Personaje`. ¿Qué devuelve?",
            options: [
              "true: un Hobbit ES un Personaje",
              "false: sólo compara la clase exacta",
              "Error de tipos",
              "true sólo si Personaje es abstracta",
            ],
            correct: 0,
            explanation:
              "`instanceof` recorre toda la cadena de herencia y también las interfaces implementadas. Es lo que hace posible el polimorfismo: puedes tratar a un Hobbit como un Personaje en cualquier sitio que espere un Personaje.",
          },
        ],
      },
    },
    {
      node_id: "c3_jefe_reybrujo",
      kind: "battle",
      title: "El Rey Brujo en la cima",
      lore_intro:
        "Cinco sombras suben por la ladera de Amon Sûl. La del centro lleva corona. Trancos sostiene una antorcha en cada mano, pero esto lo tienes que resolver tú.",
      position: { x: 34, y: 9 },
      spriteId: "nazgul",
      enemy: {
        name: "El Rey Brujo",
        spriteId: "nazgul",
        hp: 5,
        damage: 2,
        xp: 70,
        boss: true,
        taunt: "«Ningún hombre vivo puede detenerme.»",
        reward: {
          hero: "aragorn",
          name: "Aragorn",
          blurb:
            "El Montaraz que os guió desde Bree. Trancos pasa a estar disponible como héroe.",
        },
        questions: [
          {
            question:
              "```\nclass A { public function saludo() { return 'A'; } }\nclass B extends A { public function saludo() { return parent::saludo() . 'B'; } }\necho (new B())->saludo();\n```",
            options: ["AB", "BA", "B", "A"],
            correct: 0,
            explanation:
              "`parent::saludo()` devuelve 'A' y la hija le concatena su 'B'. Ése es el patrón «extender, no reemplazar»: el padre aporta su parte y la hija la enriquece.",
          },
          {
            question: "¿Qué significa marcar una clase como `final`?",
            options: [
              "Que nadie puede extenderla",
              "Que no se puede instanciar",
              "Que sus métodos no se pueden llamar dos veces",
              "Que todas sus propiedades son readonly",
            ],
            correct: 0,
            explanation:
              "`final class` cierra la herencia; `final function` cierra sólo la sobrescritura de ese método. Es una decisión de diseño: si una clase no está pensada para extenderse, decirlo evita que alguien construya sobre suposiciones que no garantizas.",
          },
          {
            question:
              "El padre declara `public function golpe(int $fuerza): int`. ¿Puede la hija declarar `public function golpe(int $fuerza, string $arma): int`?",
            options: [
              "No: cambiar la firma obligatoria rompe el contrato del padre",
              "Sí, siempre",
              "Sí, pero sólo si el padre es abstracto",
              "Sí, si el parámetro extra va el primero",
            ],
            correct: 0,
            explanation:
              "Quien tenga un `A` y llame a `golpe(5)` debe funcionar aunque por dentro sea un `B`. Añadir un parámetro OBLIGATORIO rompe eso y PHP lo rechaza. Con valor por defecto (`string $arma = ''`) sí sería compatible.",
          },
          {
            question:
              "¿Cuándo es preferible la COMPOSICIÓN a la herencia?",
            options: [
              "Casi siempre: hereda sólo cuando hay un «es un» real y estable",
              "Nunca: la herencia siempre es mejor",
              "Sólo cuando no puedes modificar la clase padre",
              "Sólo en lenguajes sin herencia múltiple",
            ],
            correct: 0,
            explanation:
              "La herencia ata a la hija a los detalles internos del padre para siempre. La composición («tiene un») intercambia piezas sin tocar nada. La regla práctica: si dudas de si es «es un» o «tiene un», es «tiene un».",
          },
        ],
      },
    },
    {
      node_id: "c3_montaraz_falso",
      kind: "battle",
      title: "El que dice ser guía",
      lore_intro:
        "Al sur de Bree, un hombre embozado ofrece llevarte «por un atajo seguro». Cobra por adelantado y su acento no es de la comarca.",
      position: { x: 12, y: 23 },
      spriteId: "orco",
      enemy: {
        name: "Espía de Isengard",
        spriteId: "orco",
        hp: 4,
        damage: 1,
        xp: 35,
        taunt: "«El camino corto, medianos. Confiad en mí.»",
        questions: [
          {
            question:
              "`class B extends A {}`. Si `A` tiene un método protegido `paso()`, ¿puede `B` llamarlo?",
            options: [
              "Sí: protected es visible para las clases hijas",
              "No: protected es como private",
              "Sólo si B lo declara también",
              "Sólo desde el constructor",
            ],
            correct: 0,
            explanation:
              "`protected` está pensado exactamente para esto: compartir con las hijas lo que sigue oculto para el exterior. Es el punto medio entre `private` (ni las hijas) y `public` (todo el mundo).",
          },
          {
            question:
              "Al sobrescribir un método, ¿puedes cambiar el tipo de retorno por uno más específico?",
            options: [
              "Sí: covarianza. Puedes devolver un subtipo del tipo original",
              "No: debe ser idéntico",
              "Sí, cualquier tipo distinto",
              "Sólo si el método es estático",
            ],
            correct: 0,
            explanation:
              "PHP permite covarianza en el retorno: si el padre devuelve `Animal`, la hija puede devolver `Perro`. Al revés no — los parámetros admiten contravarianza. La regla de fondo es siempre la sustituibilidad: la hija debe poder usarse donde se esperaba al padre.",
          },
          {
            question: "¿Qué es una clase base o superclase?",
            options: [
              "La clase de la que otra hereda (el padre)",
              "La primera clase que se declara en el fichero",
              "Una clase que no se puede instanciar",
              "La clase con más métodos",
            ],
            correct: 0,
            explanation:
              "Superclase, clase base y clase padre son lo mismo: aquella de la que otra extiende. La que hereda es la subclase, clase derivada o hija. Es vocabulario que conviene reconocer en cualquier documentación.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_herencia",
      kind: "scroll",
      title: "El Pergamino de los Montaraces",
      lore_intro:
        "En un rincón del Póney Pisador, bajo una jarra, un pergamino con el emblema de la Estrella: «Un montaraz es un viajero. No repitas lo que ya sabe tu estirpe: hereda.»",
      position: { x: 3, y: 12 },
      scroll: {
        topic: "Herencia y sobrescritura",
        sections: [
          {
            heading: "extends: heredar es «ES UN»",
            body: "Una subclase recibe TODAS las propiedades y métodos del padre sin reescribirlos, y añade lo suyo.\n\nUsa herencia sólo cuando la frase «una X ES UNA Y» es cierta de verdad. Si sólo quieres reutilizar código suelto, lo que buscas es composición o un trait.",
            code: `class Viajero {
    public function viajar(string $destino): string { /* … */ }
}

class Montaraz extends Viajero {
    public function rastrear(string $rastro): string { /* … */ }
}
// Montaraz ya sabe viajar(): no hay que reescribirlo.`,
          },
          {
            heading: "protected: la puerta de la familia",
            body: "`private` esconde el dato incluso de las hijas. Si quieres que la subclase pueda usarlo, decláralo `protected`: visible para la clase y su descendencia, cerrado para el resto del mundo.",
            code: `class Viajero {
    public function __construct(protected string $nombre) {}
}

class Montaraz extends Viajero {
    public function rastrear(string $rastro): string {
        return "{$this->nombre} sigue el rastro";  // ✅ protected sí se ve
    }
}`,
          },
          {
            heading: "Sobrescribir sin tirar lo que había: parent::",
            body: "Redefinir un método en la hija SUSTITUYE al del padre. Si sólo quieres AMPLIARLO, llama al original con `parent::metodo()` y añade lo tuyo.\n\nAsí no duplicas la lógica del padre: si mañana cambia, tu hija hereda el cambio gratis.",
            code: `class HojaDeTumulo extends Arma {
    public function atacar(): int {
        return parent::atacar() * 2;   // reutiliza y amplía
        // return $this->danio * 2;    // ❌ duplica la lógica del padre
    }
}`,
          },
        ],
        keyTakeaway:
          "Hereda cuando hay parentesco real. Y al sobrescribir, pregúntate si debes reemplazar el método del padre o ampliarlo con parent::.",
      },
    },
    {
      node_id: "poney_pisador",
      title: "Trancos, el Montaraz",
      lore_intro:
        "Un hombre curtido observa desde el rincón más oscuro de la posada. Es un Montaraz: un viajero como cualquier otro… pero con habilidades que los demás no tienen. En POO, eso es HEREDAR.",
      position: { x: 6, y: 9 },
      spriteId: "aragorn",
      poo_challenge: {
        topic: "Herencia (extends)",
        instructions:
          "Crea la clase Montaraz que HEREDE de Viajero usando extends. NO redefinas viajar(): debe heredarse tal cual. Sólo añade el método rastrear(string $rastro): string que devuelva '{nombre} sigue el rastro de {rastro}'.",
        sut: "new Montaraz('Trancos')",
        support_code:
          "class Viajero {\n    public function __construct(protected string $nombre) {}\n    public function viajar(string $destino): string {\n        return \"{$this->nombre} viaja hacia {$destino}\";\n    }\n}",
        starter_code: "<?php\n\nclass Montaraz {\n\n}\n",
        hints: [
          "Para heredar: class Montaraz extends Viajero { … }",
          "$nombre es protected, así que la subclase puede usar $this->nombre directamente.",
          'rastrear() devuelve: return "{$this->nombre} sigue el rastro de {$rastro}";',
        ],
        test_cases: [
          {
            input: "viajar('Rivendel')",
            expected: "Trancos viaja hacia Rivendel",
            description: "viajar() se HEREDA de Viajero sin reescribirlo",
          },
          {
            input: "rastrear('los Nazgûl')",
            expected: "Trancos sigue el rastro de los Nazgûl",
            description: "rastrear() es el método propio del Montaraz",
          },
        ],
      },
    },
    {
      node_id: "hojas_de_tumulo",
      title: "Las Hojas de los Túmulos",
      lore_intro:
        "Tom Bombadil entregó a los hobbits dagas forjadas contra el Rey Brujo. Son armas normales… mejoradas. Sobrescribir un método no significa tirar el del padre: puedes reutilizarlo con parent::.",
      position: { x: 13, y: 6 },
      poo_challenge: {
        topic: "Sobrescritura y parent::",
        instructions:
          "Crea HojaDeTumulo que extienda Arma y SOBRESCRIBA atacar() para devolver el DOBLE del daño base. Debes reutilizar el cálculo del padre llamando a parent::atacar() en vez de leer $danio directamente.",
        sut: "new HojaDeTumulo(15)",
        support_code:
          "class Arma {\n    public static int $llamadasAlPadre = 0;\n    public function __construct(protected int $danio) {}\n    public function atacar(): int {\n        self::$llamadasAlPadre++;\n        return $this->danio;\n    }\n}",
        starter_code: "<?php\n\nclass HojaDeTumulo {\n}\n",
        hints: [
          "class HojaDeTumulo extends Arma { … }",
          "Dentro de atacar(), llama al padre así: return parent::atacar() * 2;",
          "Si lees $this->danio directamente en vez de usar parent::atacar(), la última prueba fallará.",
        ],
        test_cases: [
          {
            input: "atacar()",
            expected: 30,
            description: "La hoja duplica el daño base (15 → 30)",
          },
          {
            input: "(new HojaDeTumulo(7))->atacar()",
            raw: true,
            expected: 14,
            description: "Funciona con cualquier daño (7 → 14)",
          },
          {
            input: "Arma::$llamadasAlPadre > 0",
            raw: true,
            expected: true,
            description: "atacar() reutiliza el método del padre con parent::",
          },
        ],
      },
    },
    {
      node_id: "cima_de_los_vientos",
      title: "La Cima de los Vientos",
      lore_intro:
        "Cinco Jinetes Negros ascienden entre las ruinas de Amon Sûl. El acero común los atraviesa sin daño: son espectros. Sólo una hoja encantada puede herir lo que es invisible.",
      position: { x: 20, y: 5 },
      spriteId: "nazgul",
      poo_challenge: {
        topic: "Sobrescritura de comportamiento",
        instructions:
          "Un arma común no puede herir a un Espectro invisible (devuelve 0). Crea HojaEncantada que extienda Arma y sobrescriba golpear(Espectro $e): int para que devuelva SIEMPRE el daño completo, incluso si el espectro es invisible.",
        sut: "new HojaEncantada(20)",
        support_code:
          "class Espectro {\n    public bool $esInvisible = true;\n}\n\nclass Arma {\n    public function __construct(protected int $danio) {}\n    public function golpear(Espectro $e): int {\n        return $e->esInvisible ? 0 : $this->danio;\n    }\n}",
        starter_code: "<?php\n\nclass HojaEncantada {\n}\n",
        hints: [
          "class HojaEncantada extends Arma { … }",
          "$danio es protected: puedes devolverlo directamente con return $this->danio;",
          "Aquí NO conviene llamar a parent::golpear(): el padre devolvería 0 ante un espectro invisible.",
        ],
        test_cases: [
          {
            input: "golpear(new Espectro())",
            expected: 20,
            description: "La hoja encantada SÍ hiere al espectro invisible",
          },
          {
            input: "(new Arma(20))->golpear(new Espectro())",
            raw: true,
            expected: 0,
            description: "Un arma común sigue sin poder herirlo (padre intacto)",
          },
        ],
      },
    },
  ],
};

export const CHAPTER_4: Chapter = {
  chapter: 4,
  title: "Huida al Vado de Bruinen",
  lore: "Frodo, herido por la hoja de Morgul, huye a lomos de Asfaloth. Los Nueve galopan tras él hasta las aguas del Bruinen, donde el poder de Elrond aguarda para desbordar el río.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 7 },
  xpParaRetos: 120,
  unlockedBy: 3,
  scenery: {
    ground: "grass",
    pathRows: [7],
    pond: { x: 18, y: 0, w: 4, h: 14 }, // el río Bruinen, de norte a sur
    decor: [
      { type: "tree", x: 26, y: 2 },
      { type: "tree", x: 30, y: 6 },
      { type: "tree", x: 33, y: 3 },
      { type: "tree", x: 25, y: 17 },
      { type: "tree", x: 29, y: 12 },
      { type: "tree", x: 19, y: 16 },
      { type: "tree", x: 11, y: 17 },
      { type: "rock", x: 28, y: 8 },
      { type: "rock", x: 34, y: 13 },
      { type: "rock", x: 22, y: 12 },
      { type: "rock", x: 15, y: 18 },
      { type: "tree", x: 9, y: 22 },
      { type: "tree", x: 18, y: 24 },
      { type: "tree", x: 27, y: 22 },
      { type: "tree", x: 36, y: 23 },
      { type: "rock", x: 22, y: 21 },
      { type: "rock", x: 31, y: 24 },
      { type: "rock", x: 40, y: 19 },
      { type: "pine", x: 5, y: 3 },
      { type: "pine", x: 9, y: 2 },
      { type: "pine", x: 13, y: 3 },
      { type: "pine", x: 4, y: 12 },
      { type: "pine", x: 8, y: 13 },
      { type: "pine", x: 14, y: 12 },
      { type: "pine", x: 23, y: 4 },
      { type: "pine", x: 23, y: 11 },
      { type: "rock", x: 7, y: 9 },
      { type: "rock", x: 11, y: 5 },
      { type: "rock", x: 16, y: 10 },
      { type: "rock", x: 16, y: 4 },
    ],
  },
  companions: ["aragorn", "sam"],
  nodes: [
    // ---- Combates: estáticos, self:: y constantes de clase ----
    {
      node_id: "c4_jinete_rezagado",
      kind: "battle",
      title: "El rezagado del camino",
      lore_intro:
        "Uno de los Nueve se ha separado de la cacería. Nueve son siempre nueve: ni uno más, ni uno menos, y ese número no pertenece a ningún jinete en particular.",
      position: { x: 27, y: 4 },
      spriteId: "nazgul",
      enemy: {
        name: "Jinete rezagado",
        spriteId: "nazgul",
        hp: 3,
        damage: 1,
        xp: 40,
        taunt: "«Somos nueve. Siempre nueve.»",
        questions: [
          {
            question: "¿A quién pertenece una propiedad `static`?",
            options: [
              "A la clase: la comparten todas sus instancias",
              "A cada objeto, como cualquier otra propiedad",
              "Al primer objeto que se cree",
              "Al fichero donde está la clase",
            ],
            correct: 0,
            explanation:
              "Sólo hay UNA copia, viva mientras dure el script, y todos los objetos ven la misma. Por eso sirve para contar instancias o llevar un registro común — y por eso también es peligrosa: es estado global disfrazado.",
          },
          {
            question:
              "¿Cómo se lee una propiedad estática desde dentro de la propia clase?",
            options: [
              "self::$contador",
              "$this->contador",
              "self->contador",
              "static.contador",
            ],
            correct: 0,
            explanation:
              "Se accede con `::` y CONSERVANDO el `$`: `self::$contador`. Es justo al revés que en las propiedades normales, donde el `$` desaparece (`$this->contador`). Confundirlo es el error de sintaxis más habitual con estáticos.",
          },
          {
            question: "¿Y una constante de clase?",
            options: [
              "self::NOMBRE, sin signo dólar",
              "self::$NOMBRE",
              "$this->NOMBRE",
              "const::NOMBRE",
            ],
            correct: 0,
            explanation:
              "Las constantes no llevan `$` nunca, ni al declararlas (`const NUEVE = 9;`) ni al leerlas (`self::NUEVE`). Desde fuera se leen con el nombre de la clase: `Nazgul::NUEVE`.",
          },
        ],
      },
    },
    {
      node_id: "c4_lobo",
      kind: "battle",
      title: "El acecho en el bosque",
      lore_intro:
        "Algo corre en paralelo al camino, entre los troncos, sin dejarse ver del todo. Lleva un buen rato haciéndolo.",
      position: { x: 31, y: 15 },
      spriteId: "orco",
      enemy: {
        name: "Batidor de Angmar",
        spriteId: "orco",
        hp: 4,
        damage: 1,
        xp: 45,
        taunt: "«Mi señor sabrá por dónde vais antes de que crucéis el río.»",
        questions: [
          {
            question:
              "¿Cuál es la diferencia entre `self::` y `static::`?",
            options: [
              "self:: apunta a la clase donde está escrito; static:: a la clase real del objeto",
              "Son sinónimos",
              "self:: sólo funciona con constantes",
              "static:: sólo funciona en métodos estáticos",
            ],
            correct: 0,
            explanation:
              "`static::` es «resolución estática tardía»: mira la clase con la que REALMENTE se llamó, no dónde está el código. Si una hija sobrescribe un método y el padre usa `self::`, se ejecutará el del padre; con `static::`, el de la hija. Es lo que hace funcionar patrones como los factory heredables.",
          },
          {
            question:
              "Dentro de un método `static`, ¿puedes usar `$this`?",
            options: [
              "No: un método estático se llama sin objeto, así que no hay $this",
              "Sí, apunta al último objeto creado",
              "Sí, pero sólo para leer",
              "Sí, si la clase tiene al menos una instancia",
            ],
            correct: 0,
            explanation:
              "`Clase::metodo()` se llama sin ningún objeto de por medio, así que `$this` no existe y usarlo es error fatal. Si un método necesita el estado del objeto, no debería ser estático.",
          },
          {
            question:
              "¿Por qué se dice que abusar de los estáticos complica las pruebas?",
            options: [
              "Porque son estado global: no se pueden sustituir por un doble ni se reinician entre pruebas",
              "Porque son más lentos",
              "Porque no se pueden llamar desde otra clase",
              "Porque PHP los ejecuta en otro hilo",
            ],
            correct: 0,
            explanation:
              "Una dependencia que recibes por constructor la puedes cambiar por una falsa en un test. Una llamada estática está soldada al código: no hay dónde meter la mano. Además el valor sobrevive de un test al siguiente y aparecen fallos fantasma según el orden.",
          },
        ],
      },
    },
    {
      node_id: "c4_jefe_nueve",
      kind: "battle",
      title: "Los Nueve en el Vado",
      lore_intro:
        "Los nueve caballos entran en el agua a la vez. Detrás, Rivendel; delante, la corriente. Elrond ya ha empezado a cantar río arriba.",
      position: { x: 34, y: 9 },
      spriteId: "nazgul",
      enemy: {
        name: "Los Nueve",
        spriteId: "nazgul",
        hp: 5,
        damage: 2,
        xp: 85,
        boss: true,
        taunt: "«Entréganos el Anillo, mediano. ¡Ahora!»",
        reward: {
          hero: "pippin",
          name: "Peregrin Tuk",
          blurb:
            "Curioso hasta el peligro, y más resistente de lo que aparenta. Pippin se une.",
        },
        questions: [
          {
            question:
              "```\nclass N { public static int $vistos = 0;\n  public function __construct() { self::$vistos++; } }\nnew N(); new N(); new N();\necho N::$vistos;\n```",
            options: ["3", "1", "0", "Error: no se puede leer desde fuera"],
            correct: 0,
            explanation:
              "La propiedad estática es una sola para toda la clase, así que los tres constructores incrementan el MISMO contador. Es el uso clásico y legítimo de un estático: contar instancias. Y siendo `public` se lee desde fuera con `N::$vistos`.",
          },
          {
            question: "¿Se puede cambiar el valor de una `const` en tiempo de ejecución?",
            options: [
              "No: se fija al declararla y es inmutable",
              "Sí, con self::CONST = nuevo",
              "Sí, sólo dentro de la clase",
              "Sí, si la clase no es final",
            ],
            correct: 0,
            explanation:
              "Una constante de clase es inmutable por definición. Si el valor tiene que poder cambiar, no es una constante: usa una propiedad estática, o mejor una normal inyectada por constructor.",
          },
          {
            question:
              "¿Cuál es un buen uso de un método estático?",
            options: [
              "Un constructor con nombre: Fecha::desdeTexto('2026-07-22')",
              "Guardar la conexión a la base de datos para todo el programa",
              "Cualquier método que no use $this",
              "Reemplazar a las funciones sueltas",
            ],
            correct: 0,
            explanation:
              "Los constructores con nombre son ideales: crean y devuelven una instancia, expresan la intención mejor que un `new` con cinco argumentos, y no guardan estado global. Lo contrario es el singleton de conexión: estado compartido escondido, imposible de sustituir en un test.",
          },
          {
            question:
              "Una clase padre tiene `public static function crear(): static { return new static(); }`. ¿Qué devuelve `Hija::crear()`?",
            options: [
              "Una instancia de Hija",
              "Una instancia del padre",
              "Error: new static no existe",
              "null",
            ],
            correct: 0,
            explanation:
              "`new static()` usa resolución estática tardía: construye la clase con la que se hizo la llamada. Con `new self()` habrías obtenido siempre el padre. Es exactamente lo que permite escribir un factory una vez en el padre y que funcione en todas las hijas.",
          },
        ],
      },
    },
    {
      node_id: "c4_trasgo_montaraz",
      kind: "battle",
      title: "Emboscada junto al río",
      lore_intro:
        "Cerca ya del Bruinen, un trasgo montaraz salta desde las rocas. Lleva la marca del Ojo grabada en el escudo.",
      position: { x: 14, y: 23 },
      spriteId: "trasgo",
      enemy: {
        name: "Trasgo del Ojo",
        spriteId: "trasgo",
        hp: 4,
        damage: 2,
        xp: 40,
        taunt: "«¡El río no os salvará esta vez!»",
        questions: [
          {
            question:
              "Declaras `const VELOCIDAD = 5;` en una clase. ¿Cómo la lees desde FUERA?",
            options: [
              "Caballo::VELOCIDAD",
              "$caballo->VELOCIDAD",
              "Caballo::$VELOCIDAD",
              "$Caballo::VELOCIDAD",
            ],
            correct: 0,
            explanation:
              "Las constantes de clase se leen con `NombreClase::CONSTANTE`, sin `$` en ningún sitio. Desde dentro usarías `self::VELOCIDAD` o `static::VELOCIDAD`. Ponerle `$` la confundiría con una propiedad estática.",
          },
          {
            question:
              "¿Cuál es una ventaja de usar una constante frente a escribir el número 5 directamente en el código?",
            options: [
              "Un nombre explica qué significa y se cambia en un solo sitio",
              "Es más rápida en tiempo de ejecución",
              "Ocupa menos memoria",
              "Permite cambiarla mientras corre el programa",
            ],
            correct: 0,
            explanation:
              "El valor 5 suelto por el código es un «número mágico»: nadie sabe qué representa ni cuántas veces aparece. `VELOCIDAD_MAXIMA` se explica solo y se ajusta en un único punto. La constante no es más rápida — es más legible y mantenible.",
          },
          {
            question:
              "Un método estático `Contador::total()`. ¿Necesitas crear un objeto para llamarlo?",
            options: [
              "No: los estáticos se llaman sobre la clase, sin instancia",
              "Sí, siempre",
              "Sí, al menos uno debe existir",
              "Depende de si la clase es final",
            ],
            correct: 0,
            explanation:
              "Un método estático pertenece a la clase, no a ningún objeto: `Contador::total()` funciona sin haber hecho `new` nunca. Justo por eso dentro no tiene `$this`.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_estatico",
      kind: "scroll",
      title: "El Poder Compartido",
      lore_intro:
        "Antes de partir, Elrond te entrega un pergamino: «No siempre hace falta crear una cosa para usar su poder. Algunos poderes pertenecen a la estirpe entera, no a un solo individuo.»",
      position: { x: 5, y: 7 },
      scroll: {
        topic: "static, self:: y constantes de clase",
        sections: [
          {
            heading: "Lo que pertenece a la CLASE, no al objeto",
            body: "Una propiedad o método `static` pertenece a la clase entera, no a cada instancia. Se llama con `Clase::metodo()` — sin necesidad de hacer `new`.\n\nÚsalo para utilidades sin estado propio, contadores globales y fábricas.",
            code: `class RioBruinen {
    public static function desbordar(): string {
        return 'las aguas se alzan';
    }
}

// No hace falta instanciar un río:
echo RioBruinen::desbordar();`,
          },
          {
            heading: "Constantes de clase",
            body: "Un valor que nunca cambia y pertenece al concepto, no a un objeto. Se declara con `const` y se lee con `Clase::NOMBRE` o, desde dentro, con `self::NOMBRE`.",
            code: `class Montura {
    public const VELOCIDAD_MAXIMA = 120;

    public function galopar(int $deseada): int {
        return min(self::VELOCIDAD_MAXIMA, $deseada);
    }
}`,
          },
          {
            heading: "self:: frente a $this->",
            body: "`$this->` accede al objeto actual; `self::` accede a la clase. Dentro de un método estático NO existe `$this`, así que sólo puedes usar `self::` (o `static::`, que respeta la subclase — se llama late static binding).",
          },
        ],
        keyTakeaway:
          "Si el método no usa ningún dato del objeto, probablemente debería ser static. Ojo: el estado estático es global y complica los tests — úsalo con cabeza.",
      },
    },
    {
      node_id: "montura_asfaloth",
      title: "Asfaloth, el Corcel Élfico",
      lore_intro:
        "Glorfindel pone a Frodo sobre su caballo blanco. «¡Noro lim, Asfaloth!» Ningún corcel, por élfico que sea, supera su límite: eso es una constante.",
      position: { x: 9, y: 5 },
      spriteId: "legolas",
      poo_challenge: {
        topic: "Constantes de clase (const, self::)",
        instructions:
          "Crea la clase Asfaloth con una constante pública VELOCIDAD_MAXIMA = 120 y el método galopar(int $deseada): int, que devuelva la velocidad deseada SIN superar nunca la constante. Léela desde dentro con self::.",
        sut: "new Asfaloth()",
        starter_code: "<?php\n\nclass Asfaloth {\n\n}\n",
        hints: [
          "Una constante de clase se declara así: public const VELOCIDAD_MAXIMA = 120;",
          "Desde dentro de la clase se lee con self::VELOCIDAD_MAXIMA (nunca con $this->).",
          "Para no pasarte del límite: return min(self::VELOCIDAD_MAXIMA, $deseada);",
        ],
        test_cases: [
          {
            input: "galopar(90)",
            expected: 90,
            description: "Por debajo del límite, galopa a lo pedido",
          },
          {
            input: "galopar(200)",
            expected: 120,
            description: "Nunca supera VELOCIDAD_MAXIMA",
          },
          {
            input: "Asfaloth::VELOCIDAD_MAXIMA",
            raw: true,
            expected: 120,
            description: "La constante es pública y se lee sin instanciar",
          },
        ],
      },
    },
    {
      node_id: "recuento_de_los_nueve",
      title: "El Recuento de los Nueve",
      lore_intro:
        "Los Jinetes Negros son nueve, y el recuento no pertenece a ninguno en particular: pertenece a la Sombra entera. Un contador que viven todas las instancias a la vez es estado estático.",
      position: { x: 12, y: 10 },
      spriteId: "nazgul",
      poo_challenge: {
        topic: "Propiedades estáticas (self::$prop)",
        instructions:
          "Crea la clase Cacería con una propiedad estática privada $jinetes que empiece en 0, y dos métodos ESTÁTICOS: sumar(int $n): void, que la incremente, y total(): int, que la devuelva. Todo se llama con Cacería::… sin instanciar.",
        starter_code: "<?php\n\nclass Caceria {\n\n}\n",
        hints: [
          "Declara el estado compartido: private static int $jinetes = 0;",
          "Dentro de un método estático no hay $this: usa self::$jinetes += $n;",
          "Los métodos también deben ser static para poder llamarlos con Caceria::sumar(5).",
        ],
        test_cases: [
          {
            input: "Caceria::total()",
            expected: 0,
            description: "La cacería empieza sin jinetes contados",
          },
          {
            input: "Caceria::sumar(5)",
            expected: null,
            description: "Cinco jinetes en la Cima de los Vientos…",
          },
          {
            input: "Caceria::sumar(4)",
            expected: null,
            description: "…y los cuatro restantes se unen",
          },
          {
            input: "Caceria::total()",
            expected: 9,
            description: "El estado es compartido: son los Nueve",
          },
        ],
      },
    },
    {
      node_id: "vado_de_bruinen",
      title: "El Vado de Bruinen",
      lore_intro:
        "«¡Volved a la tierra de Mordor y no me sigáis!» Las aguas se alzan en caballos de espuma. No hace falta crear un río nuevo para desatar su furia: el poder es de la clase, no del objeto.",
      position: { x: 15, y: 7 },
      poo_challenge: {
        topic: "Métodos estáticos (Clase::metodo)",
        instructions:
          "Crea la clase RioBruinen con la constante FUERZA_CRECIDA = 50 y el método ESTÁTICO desbordar(array $jinetes): int. Recibe un array con la fuerza de cada jinete y devuelve cuántos son arrastrados: los que tengan fuerza MENOR que la crecida. No debe hacer falta instanciar la clase.",
        starter_code: "<?php\n\nclass RioBruinen {\n\n}\n",
        hints: [
          "El método debe ser estático: public static function desbordar(array $jinetes): int",
          "Dentro usa self::FUERZA_CRECIDA para comparar.",
          "Cuenta los que no resisten: return count(array_filter($jinetes, fn(int $f) => $f < self::FUERZA_CRECIDA));",
        ],
        test_cases: [
          {
            input: "RioBruinen::FUERZA_CRECIDA",
            expected: 50,
            description: "La fuerza de la crecida es una constante de clase",
          },
          {
            input: "RioBruinen::desbordar([10, 20, 80])",
            expected: 2,
            description: "Dos jinetes débiles son arrastrados; el fuerte resiste",
          },
          {
            input: "RioBruinen::desbordar([60, 70])",
            expected: 0,
            description: "Ninguno cede ante la crecida",
          },
          {
            input: "RioBruinen::desbordar([5, 5, 5, 5, 5, 5, 5, 5, 5])",
            expected: 9,
            description: "Los Nueve caballos son barridos por las aguas",
          },
        ],
      },
    },
    {
      node_id: "c4_runas_del_vado",
      title: "Las runas del Vado",
      lore_intro:
        "Grabados en la roca sobre Bruinen hay tres signos: aguas calmas, aguas crecidas, aguas desbordadas. Sólo tres estados posibles, y ni uno más — como un enum.",
      position: { x: 18, y: 11 },
      spriteId: "aragorn",
      poo_challenge: {
        topic: "Enums respaldados (const con superpoderes)",
        instructions:
          "Un enum es un conjunto CERRADO de valores con nombre: como las constantes de clase, pero convertidas en un tipo propio.\n\n" +
          "Declara el enum `Vado` respaldado por `string` con tres casos y sus valores exactos:\n" +
          "• `Calmo` = `'calmo'`\n• `Crecido` = `'crecido'`\n• `Desbordado` = `'desbordado'`\n\n" +
          "Añade:\n" +
          "• `esVadeable(): bool` — sólo el Vado Calmo se puede cruzar.\n" +
          "• `public static function segunCaudal(int $caudal): self` — devuelve `Calmo` si el caudal es menor que 30, `Crecido` si es menor que 70, y `Desbordado` en los demás casos. Usa `match (true)`.",
        starter_code: "<?php\n\nenum Vado: string\n{\n\n    public function esVadeable(): bool\n    {\n    }\n\n    public static function segunCaudal(int $caudal): self\n    {\n    }\n}\n",
        hints: [
          "Un enum respaldado declara el tipo tras el nombre y cada caso lleva valor: `case Calmo = 'calmo';`",
          "`esVadeable()` es una comparación de identidad: `return $this === Vado::Calmo;`",
          "`match (true)` evalúa condiciones: `$caudal < 30 => Vado::Calmo, $caudal < 70 => Vado::Crecido, default => Vado::Desbordado`.",
        ],
        test_cases: [
          { input: "Vado::from('crecido')->name", expected: "Crecido", description: "from() encuentra el caso por su valor", raw: true },
          { input: "Vado::Calmo->value", expected: "calmo", description: "El valor respaldado", raw: true },
          { input: "Vado::Calmo->esVadeable()", expected: true, description: "El Vado calmo se cruza", raw: true },
          { input: "Vado::Desbordado->esVadeable()", expected: false, description: "El desbordado, no", raw: true },
          { input: "Vado::segunCaudal(10)->name", expected: "Calmo", description: "Caudal bajo", raw: true },
          { input: "Vado::segunCaudal(50)->name", expected: "Crecido", description: "Caudal medio", raw: true },
          { input: "Vado::segunCaudal(200)->name", expected: "Desbordado", description: "El río contra los Nueve", raw: true },
          { input: "count(Vado::cases())", expected: 3, description: "El enum está cerrado en tres", raw: true },
        ],
      },
    },
  ],
};

export const CHAPTER_5: Chapter = {
  chapter: 5,
  title: "El Paso de Caradhras",
  lore: "La Montaña Cruel no quiere que la crucen. La nieve se amontona, el frío muerde y la voluntad de la Comunidad se agrieta. Hay estados que no deben poder alterarse desde fuera… y otros que no deben cambiar jamás.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 11 },
  xpParaRetos: 140,
  unlockedBy: 4,
  scenery: {
    ground: "snow",
    pathRows: [11],
    pathGround: "ice", // el sendero helado que asciende
    pond: { x: 9, y: 2, w: 6, h: 3 }, // un lago congelado en la cornisa
    pondGround: "ice",
    decor: [
      // la línea de árboles se queda abajo; arriba sólo roca desnuda
      { type: "pine", x: 10, y: 13 },
      { type: "pine", x: 17, y: 13 },
      { type: "pine", x: 22, y: 13 },
      { type: "rock", x: 5, y: 8 },
      { type: "rock", x: 8, y: 6 },
      { type: "rock", x: 12, y: 8 },
      { type: "rock", x: 15, y: 5 },
      { type: "rock", x: 17, y: 9 },
      { type: "rock", x: 20, y: 6 },
      { type: "rock", x: 22, y: 3 },
      { type: "rock", x: 6, y: 3 },
      { type: "rock", x: 19, y: 2 },
      // el ascenso continúa hacia el este y arriba: sólo roca y hielo
      { type: "rock", x: 26, y: 8 },
      { type: "rock", x: 29, y: 4 },
      { type: "rock", x: 31, y: 11 },
      { type: "rock", x: 34, y: 6 },
      { type: "rock", x: 37, y: 9 },
      { type: "rock", x: 39, y: 4 },
      { type: "rock", x: 41, y: 15 },
      { type: "rock", x: 28, y: 18 },
      { type: "rock", x: 35, y: 22 },
      { type: "rock", x: 24, y: 14 },
      { type: "pine", x: 30, y: 24 },
      { type: "pine", x: 38, y: 24 },
    ],
  },
  companions: ["gandalf", "aragorn", "boromir", "gimli", "legolas", "sam"],
  nodes: [
    // ---- Combates: encapsulamiento, readonly e invariantes ----
    {
      node_id: "c5_crebain",
      kind: "battle",
      title: "Los Crebain de Fangorn",
      lore_intro:
        "Una nube negra de cuervos cruza el cielo hacia el sur: los espías de Saruman. Boromir grita que os agachéis entre las rocas.",
      position: { x: 27, y: 5 },
      spriteId: "trasgo",
      enemy: {
        name: "Bandada de Crebain",
        spriteId: "trasgo",
        hp: 4,
        damage: 1,
        xp: 45,
        taunt: "Los cuervos giran en círculo, contando cabezas.",
        questions: [
          {
            question: "¿Qué garantiza una propiedad `readonly`?",
            options: [
              "Que se asigna una vez y ya no puede cambiar",
              "Que nadie de fuera puede leerla",
              "Que su valor es siempre null hasta el constructor",
              "Que es compartida por todas las instancias",
            ],
            correct: 0,
            explanation:
              "`readonly` (PHP 8.1) permite UNA asignación —normalmente en el constructor— y después cualquier intento de escribir lanza error. No afecta a la lectura: sirve para objetos inmutables, no para ocultar. Ocultar sigue siendo cosa de la visibilidad.",
          },
          {
            question:
              "¿Dónde se puede asignar por primera vez una propiedad readonly?",
            options: [
              "Desde dentro de la clase, típicamente en el constructor",
              "Desde cualquier parte, una sola vez",
              "Sólo en la declaración, con un valor literal",
              "En cualquier método público",
            ],
            correct: 0,
            explanation:
              "La primera asignación debe hacerse desde el ámbito de la propia clase (el constructor es lo habitual). Intentar `$obj->prop = x` desde fuera falla aunque nunca se hubiera asignado: readonly no es «write-once desde donde sea», es «write-once desde dentro».",
          },
          {
            question:
              "¿Puede una propiedad `readonly` tener también un tipo declarado?",
            options: [
              "Sí, y de hecho DEBE tenerlo",
              "No, son incompatibles",
              "Sólo si el tipo es un objeto",
              "Sólo si además es private",
            ],
            correct: 0,
            explanation:
              "readonly EXIGE un tipo: `public readonly int $edad;`. Una propiedad sin tipo no puede ser readonly. Combina bien con la promoción en el constructor: `public function __construct(public readonly int $edad) {}`.",
          },
        ],
      },
    },
    {
      node_id: "c5_lobo_nieve",
      kind: "battle",
      title: "Aullidos en la ventisca",
      lore_intro:
        "Entre la nieve que cae de lado, unos ojos amarillos siguen tu rastro. Los Huargos han olido a la Comunidad.",
      position: { x: 33, y: 20 },
      spriteId: "orco",
      enemy: {
        name: "Huargo de Hollin",
        spriteId: "orco",
        hp: 5,
        damage: 2,
        xp: 45,
        taunt: "«Carne fresca en la montaña. Hacía frío y hambre.»",
        questions: [
          {
            question:
              "Un `setEdad($n)` que rechaza edades negativas protege una…",
            options: [
              "invariante: una condición que el objeto mantiene siempre cierta",
              "constante de clase",
              "propiedad estática",
              "interfaz",
            ],
            correct: 0,
            explanation:
              "Una invariante es una regla que el objeto se compromete a no romper nunca: «la edad nunca es negativa», «el saldo nunca baja de cero». Validar en el setter (o en el constructor) es cómo se hace cumplir. Con la propiedad pública, esa promesa no existe.",
          },
          {
            question:
              "¿Por qué un setter con validación es mejor que una propiedad pública?",
            options: [
              "Centraliza la comprobación: es imposible dejar el objeto en un estado inválido",
              "Es más rápido de ejecutar",
              "Ocupa menos memoria",
              "Permite herencia múltiple",
            ],
            correct: 0,
            explanation:
              "Si el ÚNICO camino para cambiar el valor pasa por tu setter, ahí validas una vez y queda garantizado para siempre. Con la propiedad pública, cada punto del programa que la toque tendría que recordar validar — y alguno se olvidará.",
          },
          {
            question:
              "Quieres cambiar un dato de un objeto `readonly`. ¿Cuál es el patrón idiomático?",
            options: [
              "Devolver una copia nueva con el cambio (with...), sin tocar el original",
              "Quitar el readonly temporalmente",
              "Usar reflexión para forzar la escritura",
              "Convertirlo en propiedad estática",
            ],
            correct: 0,
            explanation:
              "Los objetos inmutables no se modifican: se crea otro. Un método `conEdad(int $n): static { return new static($n, ...); }` devuelve una copia con el cambio y deja intacto el original. Es el mismo patrón de `DateTimeImmutable`.",
          },
        ],
      },
    },
    {
      node_id: "c5_jefe_caradhras",
      kind: "battle",
      title: "La Voluntad de Caradhras",
      lore_intro:
        "No hay enemigo con rostro: es la montaña misma. Truenos sin nube, nieve que sepulta el sendero, piedras que caen solas. Alguien poderoso no quiere que crucéis.",
      position: { x: 40, y: 12 },
      spriteId: "balrog",
      enemy: {
        name: "La Ventisca de Caradhras",
        spriteId: "balrog",
        hp: 6,
        damage: 2,
        xp: 140,
        boss: true,
        taunt: "«Ni por arriba pasaréis. La montaña os rechaza.»",
        reward: {
          hero: "gimli",
          name: "Gimli hijo de Glóin",
          blurb:
            "El enano que prefiere la roca al hielo. Fuerte y terco: Gimli se une a tus héroes.",
        },
        questions: [
          {
            question:
              "```\nclass Temp {\n  public function __construct(public readonly int $grados) {}\n}\n$t = new Temp(-5);\n$t->grados = 0;\n```\n¿Qué ocurre en la última línea?",
            options: [
              "Error: no se puede modificar una propiedad readonly ya inicializada",
              "Se asigna 0 sin problema",
              "Se ignora en silencio",
              "Error: -5 no es válido",
            ],
            correct: 0,
            explanation:
              "La promoción ya inicializó `$grados` con -5 en el constructor. Cualquier escritura posterior —incluso al mismo valor— lanza «Cannot modify readonly property». Es justo la garantía que buscas: una vez creado, el objeto no cambia.",
          },
          {
            question:
              "Un constructor recibe un porcentaje y hace `if ($p < 0 || $p > 100) throw new InvalidArgumentException();`. ¿Qué consigue?",
            options: [
              "Que no exista ningún objeto con un porcentaje fuera de rango",
              "Que el porcentaje se ajuste solo al rango válido",
              "Que la propiedad sea readonly",
              "Que el método sea más rápido",
            ],
            correct: 0,
            explanation:
              "Validar en el constructor y lanzar si algo no cuadra hace IMPOSIBLE construir un objeto inválido: el error salta en el punto exacto del fallo, no tres capas más abajo. Es la base de los objetos de valor: si existe, es válido.",
          },
          {
            question:
              "¿Qué es un «objeto de valor» (value object)?",
            options: [
              "Un objeto pequeño e inmutable que representa un valor (Dinero, Fecha, Coordenada)",
              "Cualquier objeto con propiedades públicas",
              "Un objeto que sólo tiene métodos estáticos",
              "El objeto principal de la aplicación",
            ],
            correct: 0,
            explanation:
              "Un value object encapsula un concepto (un Dinero, un Email, una Temperatura) validándolo al crearlo y sin permitir cambios después. Dos son iguales si sus valores coinciden, no por identidad. `readonly` + validación en el constructor es exactamente la receta.",
          },
          {
            question:
              "¿Cuál es la diferencia entre `private` y `readonly`?",
            options: [
              "private controla QUIÉN accede; readonly controla CUÁNDO se puede escribir",
              "Son sinónimos",
              "readonly impide la lectura; private no",
              "private sólo aplica a métodos",
            ],
            correct: 0,
            explanation:
              "Son ejes distintos y combinables. `private` es visibilidad: desde dónde se ve. `readonly` es mutabilidad: cuántas veces se escribe. Una propiedad puede ser `private readonly` (oculta e inmutable) o `public readonly` (visible pero inmutable).",
          },
        ],
      },
    },
    {
      node_id: "c5_trasgo_montanes",
      kind: "battle",
      title: "El vigía de la cornisa",
      lore_intro:
        "Apostado tras un pilar de hielo, un trasgo montañés hace señales con un espejo hacia las cumbres. Lleva ahí toda la noche.",
      position: { x: 24, y: 22 },
      spriteId: "trasgo",
      enemy: {
        name: "Vigía de las cumbres",
        spriteId: "trasgo",
        hp: 4,
        damage: 1,
        xp: 50,
        taunt: "«Nadie cruza Caradhras sin que mi señor lo sepa.»",
        questions: [
          {
            question:
              "Declaras `public readonly array $items;` y en el constructor haces `$this->items = [];`. Luego `$this->items[] = 'x';` desde un método. ¿Funciona?",
            options: [
              "No: readonly impide modificar el array tras asignarlo, incluso añadir elementos",
              "Sí: readonly sólo protege la reasignación completa",
              "Sí, pero sólo desde el constructor",
              "Sí, siempre",
            ],
            correct: 0,
            explanation:
              "readonly protege la propiedad ENTERA: una vez asignado el array, no puedes reasignarlo ni mutarlo (ni `[]=`, ni `unset` de una clave). Para «cambiar» un array readonly creas uno nuevo y devuelves una copia del objeto. Es la inmutabilidad llevada al contenido, no sólo a la referencia.",
          },
          {
            question:
              "¿Qué pasa si un método intenta LEER una propiedad readonly?",
            options: [
              "Nada: leer siempre está permitido",
              "Error: readonly bloquea la lectura",
              "Devuelve null",
              "Sólo se puede leer una vez",
            ],
            correct: 0,
            explanation:
              "readonly no tiene nada que ver con la lectura, que es libre y tantas veces como quieras. Sólo limita la ESCRITURA a una vez, desde dentro de la clase. Quien confunde readonly con private busca la herramienta equivocada.",
          },
          {
            question:
              "¿Cuál es la ventaja de un objeto inmutable a la hora de razonar sobre el código?",
            options: [
              "Si lo pasas a otra función, sabes que no te lo van a cambiar por detrás",
              "Ocupa la mitad de memoria",
              "Se ejecuta en paralelo",
              "No necesita constructor",
            ],
            correct: 0,
            explanation:
              "Con un objeto mutable, cualquiera que reciba una referencia puede alterarlo y provocarte un bug a distancia. Uno inmutable es un dato de confianza: una vez creado, vale lo mismo para siempre y en todas partes. Menos cosas que vigilar.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_hielo",
      kind: "scroll",
      title: "El Pergamino del Hielo",
      lore_intro:
        "Gandalf resguarda un pergamino bajo su capa antes de que la ventisca lo arranque. «Lo que no debe cambiar, protégelo. Lo que cambia, vigílalo en la puerta.»",
      position: { x: 5, y: 11 },
      scroll: {
        topic: "Encapsulamiento avanzado e inmutabilidad",
        sections: [
          {
            heading: "El setter es la puerta, no un buzón",
            body: "Encapsular no es «poner la propiedad private y añadir un get/set para todo». Un setter existe para PROTEGER una invariante: si un valor no puede ser negativo, el setter lo rechaza.\n\nSi tu setter sólo asigna sin validar, la propiedad podría ser pública y daría igual.",
            code: `class Resistencia {
    private int $calor = 100;

    public function enfriar(int $grados): void {
        if ($grados < 0) {
            throw new InvalidArgumentException('El frío no puede ser negativo');
        }
        $this->calor = max(0, $this->calor - $grados);
    }
}`,
          },
          {
            heading: "readonly: lo que nace y no cambia (PHP 8.1)",
            body: "Una propiedad `readonly` sólo puede escribirse una vez, dentro del constructor. Después, cualquier intento de modificarla lanza un `Error`.\n\nEs la forma más limpia de crear objetos de valor seguros.",
            code: `class Provision {
    public function __construct(
        public readonly string $nombre,
        public readonly int $peso,
    ) {}
}

$p = new Provision('lembas', 5);
$p->peso = 99; // ❌ Error: Cannot modify readonly property`,
          },
          {
            heading: "Objetos inmutables: cambiar = crear otro",
            body: "Si un objeto no puede mutar, un «cambio» devuelve una instancia NUEVA y deja intacta la original. Es el patrón `with…()` y evita errores por estado compartido.",
            code: `public function conMas(int $grados): Temperatura {
    return new Temperatura($this->grados + $grados); // otra instancia
}`,
          },
        ],
        keyTakeaway:
          "Valida en la puerta (setters con invariantes) y usa readonly para lo que nunca debe cambiar. Un objeto que no puede quedar en estado inválido no necesita defensas por todas partes.",
      },
    },
    {
      node_id: "carga_de_bill",
      title: "La Carga de Bill el Poney",
      lore_intro:
        "Sam repasa los fardos que carga Bill. Una provisión es lo que es: su nombre y su peso no cambian a mitad del camino. Eso, en PHP, se llama readonly.",
      position: { x: 9, y: 8 },
      poo_challenge: {
        topic: "Propiedades readonly",
        instructions:
          "Crea la clase Provision con dos propiedades públicas de sólo lectura: $nombre (string) y $peso (int), asignadas en el constructor. Una vez creada, nadie debe poder modificarlas.",
        sut: "new Provision('lembas', 5)",
        starter_code: "<?php\n\nclass Provision {\n}\n",
        hints: [
          "Puedes promover y marcar de sólo lectura a la vez: public readonly string $nombre",
          "El constructor completo: __construct(public readonly string $nombre, public readonly int $peso) {}",
          "Una propiedad readonly sólo se escribe dentro del constructor; después lanza un Error.",
        ],
        test_cases: [
          {
            input: "nombre",
            expected: "lembas",
            description: "El nombre se lee sin problema",
          },
          {
            input: "peso",
            expected: 5,
            description: "El peso se lee sin problema",
          },
          {
            input:
              "(function() { $p = new Provision('cuerda', 2); try { $p->peso = 99; return false; } catch (\\Throwable $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "Modificarla después lanza un Error: es readonly",
          },
        ],
      },
    },
    {
      node_id: "resistencia_comunidad",
      title: "La Resistencia de la Comunidad",
      lore_intro:
        "El viento arrecia. Boromir abre paso entre la nieve, pero las fuerzas menguan. Vigila el calor de la Comunidad: que nadie pueda alterarlo desde fuera y que nunca caiga por debajo de cero.",
      position: { x: 14, y: 11 },
      poo_challenge: {
        topic: "Setters con validación e invariantes",
        instructions:
          "Crea ResistenciaComunidad con la constante UMBRAL = 20 y la propiedad PRIVADA $calor iniciada en 100. Añade: getCalor(): int; enfriar(int $grados): void, que reste sin bajar nunca de 0 y lance InvalidArgumentException si le pasan un número negativo; y estaCongelada(): bool, true cuando el calor sea menor o igual al UMBRAL.",
        sut: "new ResistenciaComunidad()",
        starter_code: "<?php\n\nclass ResistenciaComunidad {\n    public const UMBRAL = 20;\n\n}\n",
        hints: [
          "Guard clause al principio: if ($grados < 0) throw new InvalidArgumentException('...');",
          "Para no bajar de cero: $this->calor = max(0, $this->calor - $grados);",
          "estaCongelada() compara con la constante: return $this->calor <= self::UMBRAL;",
        ],
        test_cases: [
          {
            input: "getCalor()",
            expected: 100,
            description: "La Comunidad parte con el calor intacto",
          },
          {
            input: "estaCongelada()",
            expected: false,
            description: "Al principio nadie está congelado",
          },
          { input: "enfriar(50)", expected: null, description: "La ventisca muerde…" },
          { input: "getCalor()", expected: 50, description: "…y el calor baja a 50" },
          { input: "enfriar(40)", expected: null, description: "Sigue nevando…" },
          {
            input: "estaCongelada()",
            expected: true,
            description: "Con 10 de calor (≤ 20) la Comunidad se congela",
          },
          {
            input:
              "(function() { $r = new ResistenciaComunidad(); $r->enfriar(500); return $r->getCalor(); })()",
            raw: true,
            expected: 0,
            description: "El calor nunca baja de 0",
          },
          {
            input:
              "(function() { $r = new ResistenciaComunidad(); try { $r->enfriar(-5); return false; } catch (\\InvalidArgumentException $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "Un frío negativo es inválido: el setter lo rechaza",
          },
        ],
      },
    },
    {
      node_id: "temperatura_montana",
      title: "El Umbral de la Nieve",
      lore_intro:
        "«La montaña no negocia», murmura Aragorn mirando el termómetro de escarcha. Una medida no se altera: si el frío cambia, lo que tienes es OTRA medida.",
      position: { x: 20, y: 8 },
      poo_challenge: {
        topic: "Objetos de valor inmutables",
        instructions:
          "Crea la clase Temperatura con $grados readonly. El constructor debe lanzar InvalidArgumentException si los grados están fuera del rango -40..40. Añade conMas(int $g): Temperatura, que devuelva una INSTANCIA NUEVA con los grados sumados, dejando la original intacta.",
        sut: "new Temperatura(-10)",
        starter_code: "<?php\n\nclass Temperatura {\n\n}\n",
        hints: [
          "Valida dentro del constructor antes de nada: if ($grados < -40 || $grados > 40) throw new InvalidArgumentException('...');",
          "Como es readonly, conMas() no puede modificar: return new Temperatura($this->grados + $g);",
          "Ese patrón (devolver una instancia nueva) es lo que hace inmutable al objeto.",
        ],
        test_cases: [
          {
            input: "grados",
            expected: -10,
            description: "La temperatura de partida",
          },
          {
            input: "(new Temperatura(-10))->conMas(-5)->grados",
            raw: true,
            expected: -15,
            description: "conMas() devuelve una temperatura más fría",
          },
          {
            input:
              "(function() { $t = new Temperatura(-10); $t->conMas(-5); return $t->grados; })()",
            raw: true,
            expected: -10,
            description: "La ORIGINAL no cambia: eso es inmutabilidad",
          },
          {
            input:
              "(function() { try { new Temperatura(-100); return false; } catch (\\InvalidArgumentException $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "El constructor rechaza valores fuera de rango",
          },
        ],
      },
    },
  ],
};

export const CHAPTER_6: Chapter = {
  chapter: 6,
  title: "Las Minas de Moria",
  lore: "Khazad-dûm, el reino subterráneo de los Enanos, hoy tomado por los trasgos. Bajo la montaña sólo importa una cosa: qué CONTRATO cumple cada cosa, no de qué está hecha. Y en el puente aguarda el Daño de Durin.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 7 },
  xpParaRetos: 160,
  unlockedBy: 5,
  scenery: {
    ground: "darkstone", // las profundidades
    pathRows: [7],
    pathGround: "stone", // la calzada enana
    pond: { x: 17, y: 9, w: 6, h: 5 }, // el fuego del abismo
    pondGround: "lava",
    npcs: [
      { spriteId: "gollum", x: 12, y: 12, label: "¿…mi tesoro?" },
      { spriteId: "esqueleto", x: 6, y: 3, label: "Enano caído" },
      { spriteId: "esqueleto", x: 16, y: 11 },
      { spriteId: "esqueleto", x: 21, y: 3 },
      { spriteId: "esqueleto", x: 30, y: 18 },
      { spriteId: "esqueleto", x: 37, y: 4 },
      { spriteId: "esqueleto", x: 25, y: 9 },
    ],
    dialogues: [
      { x: 7, y: 7, speaker: "gimli", name: "Gimli",
        text: "¡Esto no es una mina… es una tumba!" },
      { x: 14, y: 7, speaker: "gandalf", name: "Gandalf",
        text: "Los tambores. Vienen de lo profundo." },
      { x: 18, y: 7, speaker: "gandalf", name: "Gandalf",
        text: "Un Balrog. Este enemigo os supera a todos. ¡Corred!" },
    ],
    decor: [
      { type: "rock", x: 4, y: 4 },
      { type: "rock", x: 7, y: 10 },
      { type: "rock", x: 10, y: 3 },
      { type: "rock", x: 11, y: 11 },
      { type: "rock", x: 15, y: 4 },
      { type: "rock", x: 15, y: 11 },
      { type: "rock", x: 20, y: 4 },
      { type: "rock", x: 22, y: 8 },
      { type: "rock", x: 6, y: 12 },
      { type: "rock", x: 13, y: 9 },
      // las galerías se hunden hacia el este, hacia el puente
      { type: "rock", x: 26, y: 6 },
      { type: "rock", x: 29, y: 11 },
      { type: "rock", x: 32, y: 4 },
      { type: "rock", x: 35, y: 9 },
      { type: "rock", x: 38, y: 13 },
      { type: "rock", x: 28, y: 16 },
      { type: "rock", x: 34, y: 23 },
      { type: "rock", x: 41, y: 18 },
      { type: "rock", x: 23, y: 13 },
      { type: "rock", x: 31, y: 24 },
    ],
  },
  companions: ["gandalf", "aragorn", "boromir", "gimli", "legolas", "sam"],
  nodes: [
    // ---- Combates: interfaces y polimorfismo ----
    {
      node_id: "c6_trasgo_explorador",
      kind: "battle",
      title: "Trasgos en la oscuridad",
      lore_intro:
        "Cientos de ojos amarillos brotan de las grietas de las columnas. El primero salta hacia ti con un alarido metálico.",
      position: { x: 27, y: 4 },
      spriteId: "trasgo",
      enemy: {
        name: "Trasgo explorador",
        spriteId: "trasgo",
        hp: 4,
        damage: 1,
        xp: 50,
        taunt: "«¡Carne! ¡Carne para los tambores!»",
        questions: [
          {
            question: "¿Qué es una interfaz en PHP?",
            options: [
              "Un contrato de métodos que una clase se compromete a implementar",
              "Una clase que no se puede instanciar pero tiene código",
              "Una propiedad compartida por varias clases",
              "Un tipo de método estático",
            ],
            correct: 0,
            explanation:
              "Una interfaz declara QUÉ métodos deben existir, sin decir CÓMO. No trae implementación (a diferencia de una clase abstracta). Quien la implementa se obliga a escribir todos sus métodos: es una promesa que el compilador hace cumplir.",
          },
          {
            question:
              "¿Con qué palabra clave una clase adopta una interfaz?",
            options: ["implements", "extends", "uses", "interface"],
            correct: 0,
            explanation:
              "`class Espada implements Arma`. `extends` es para heredar de una clase; `use` es para traits. Una clase puede `implements` varias interfaces a la vez (separadas por comas), aunque sólo pueda `extends` una clase.",
          },
          {
            question:
              "Si una clase declara `implements Arma` pero le falta un método de esa interfaz, ¿qué ocurre?",
            options: [
              "Error fatal: la clase no compila hasta implementarlo",
              "Se ejecuta, pero el método devuelve null",
              "Nada: la interfaz es sólo documentación",
              "PHP crea el método vacío automáticamente",
            ],
            correct: 0,
            explanation:
              "La interfaz es un contrato que PHP verifica al cargar la clase: si falta un método, es error fatal inmediato. Esa garantía es justo su valor — sabes que cualquier objeto de tipo `Arma` responde a todos los métodos de `Arma`, sin excepción.",
          },
        ],
      },
    },
    {
      node_id: "c6_trol_cavernas",
      kind: "battle",
      title: "El Trol de la Cámara",
      lore_intro:
        "La puerta de la Cámara de Mazarbul revienta y un trol de las cavernas mete el brazo, buscando a tientas. Huele mal y golpea peor.",
      position: { x: 33, y: 21 },
      spriteId: "troll",
      enemy: {
        name: "Trol de las cavernas",
        spriteId: "troll",
        hp: 6,
        damage: 2,
        xp: 55,
        taunt: "El trol gruñe y arrastra una cadena rota por el suelo de piedra.",
        questions: [
          {
            question: "¿Qué es el polimorfismo?",
            options: [
              "Tratar objetos de clases distintas de forma uniforme si comparten un tipo",
              "Que una clase tenga muchos métodos",
              "Heredar de varias clases a la vez",
              "Cambiar el tipo de una variable en ejecución",
            ],
            correct: 0,
            explanation:
              "Poli-morfismo = «muchas formas». Si Espada, Hacha y Arco implementan `Arma`, puedes guardarlos todos en un array de `Arma` y llamar `$a->golpe()` sin saber cuál es cada uno: cada objeto responde a su manera. El código que los usa no necesita cambiar cuando añades un arma nueva.",
          },
          {
            question:
              "Tienes `function atacar(Arma $a)`. ¿Qué objetos acepta?",
            options: [
              "Cualquiera cuya clase implemente la interfaz Arma",
              "Sólo objetos de una clase llamada exactamente Arma",
              "Cualquier objeto, Arma sólo documenta",
              "Sólo si Arma es una clase abstracta",
            ],
            correct: 0,
            explanation:
              "Declarar el parámetro con el tipo de la interfaz acepta CUALQUIER implementación: Espada, Hacha, lo que sea que cumpla el contrato `Arma`. Programas contra la interfaz, no contra la clase concreta — eso es lo que te deja añadir armas nuevas sin tocar `atacar()`.",
          },
          {
            question:
              "¿Por qué se dice «programa hacia una interfaz, no hacia una implementación»?",
            options: [
              "Para depender de lo que algo HACE, no de cómo está hecho: piezas intercambiables",
              "Porque las interfaces son más rápidas",
              "Porque así se usa menos memoria",
              "Porque las clases concretas no se pueden testear",
            ],
            correct: 0,
            explanation:
              "Si tu código sólo conoce la interfaz `Repositorio`, puedes cambiar la implementación (MySQL por memoria, real por falsa en un test) sin tocar nada más. Depender de la clase concreta te ata a sus detalles. Es la base de la D en SOLID.",
          },
        ],
      },
    },
    {
      node_id: "c6_capitan_trasgo",
      kind: "battle",
      title: "El capitán de la horda",
      lore_intro:
        "Un trasgo enorme, con armadura de placas robadas, ordena a los demás a golpe de látigo. Si cae él, la horda dudará.",
      position: { x: 24, y: 22 },
      spriteId: "orco",
      enemy: {
        name: "Capitán trasgo",
        spriteId: "orco",
        hp: 5,
        damage: 2,
        xp: 55,
        taunt: "«El Portador del Anillo es MÍO. ¡Rodeadlos!»",
        questions: [
          {
            question:
              "¿Puede una clase implementar VARIAS interfaces a la vez?",
            options: [
              "Sí: implements A, B, C — separadas por comas",
              "No: sólo una interfaz por clase",
              "Sí, pero sólo dos como máximo",
              "Sólo si las interfaces no comparten métodos",
            ],
            correct: 0,
            explanation:
              "Aquí está la diferencia clave con la herencia: `extends` admite UNA clase, pero `implements` admite tantas interfaces como quieras. Es la forma que tiene PHP de combinar contratos sin los problemas de la herencia múltiple.",
          },
          {
            question:
              "Una interfaz puede declarar constantes y firmas de métodos. ¿Puede incluir el CUERPO de un método?",
            options: [
              "No: sólo la firma; el cuerpo lo pone quien la implementa",
              "Sí, como una clase normal",
              "Sí, pero sólo métodos privados",
              "Sólo si el método es estático",
            ],
            correct: 0,
            explanation:
              "Una interfaz define el QUÉ, nunca el CÓMO: sus métodos no tienen cuerpo. Si necesitas compartir implementación entre clases, eso es trabajo de una clase abstracta o de un trait, no de una interfaz.",
          },
          {
            question:
              "`$x instanceof Arma`: ¿cuándo devuelve true?",
            options: [
              "Si la clase de $x implementa Arma (directa o heredada)",
              "Sólo si $x fue creado con new Arma",
              "Si $x tiene un método llamado arma()",
              "Nunca: instanceof no funciona con interfaces",
            ],
            correct: 0,
            explanation:
              "`instanceof` reconoce interfaces igual que clases: si la clase de `$x` (o algún ancestro) implementa `Arma`, es true. Por eso puedes filtrar una colección mixta quedándote sólo con lo que cumple cierto contrato.",
          },
        ],
      },
    },
    {
      node_id: "c6_jefe_balrog",
      kind: "battle",
      title: "El Daño de Durin",
      lore_intro:
        "El puente de Khazad-dûm, estrecho sobre el abismo sin fondo. Al otro lado, una sombra de fuego y sombra alza un látigo de llamas. Gandalf se planta en medio: «¡No podéis pasar!». Lo que decidas aquí, decídelo rápido.",
      position: { x: 40, y: 7 },
      spriteId: "balrog",
      enemy: {
        name: "El Balrog de Morgoth",
        spriteId: "balrog",
        hp: 7,
        damage: 3,
        xp: 175,
        boss: true,
        taunt: "Una columna de fuego y sombra llena el puente. El calor te seca los ojos.",
        reward: {
          hero: "legolas",
          name: "Legolas Hojaverde",
          blurb:
            "El arquero de la Comunidad, ojos que ven en la oscuridad de Moria. Legolas se une a tus héroes.",
        },
        questions: [
          {
            question:
              "```\ninterface Arma { public function golpe(): int; }\nclass Espada implements Arma { public function golpe(): int { return 10; } }\nclass Hacha  implements Arma { public function golpe(): int { return 15; } }\n$armas = [new Espada(), new Hacha()];\necho array_sum(array_map(fn(Arma $a) => $a->golpe(), $armas));\n```",
            options: ["25", "10", "15", "Error: tipos distintos en el array"],
            correct: 0,
            explanation:
              "Espada y Hacha son de clases distintas, pero AMBAS son `Arma`. El array las mezcla sin problema y `array_map` llama `golpe()` en cada una: 10 + 15 = 25. Eso es polimorfismo: un mismo código opera sobre formas distintas.",
          },
          {
            question:
              "Quieres añadir una `Lanza` al juego. Con un buen diseño de interfaces, ¿qué código existente hay que tocar?",
            options: [
              "Ninguno: creas Lanza implements Arma y ya funciona en todas partes",
              "Todos los sitios que reciben un Arma, para añadir el caso Lanza",
              "La interfaz Arma, para registrar la lanza",
              "El array de armas y cada bucle que lo recorre",
            ],
            correct: 0,
            explanation:
              "Ésa es la victoria de programar contra la interfaz: si `Lanza implements Arma`, todo lo que ya trabajaba con `Arma` la acepta sin cambios. Si tuvieras que tocar diez `switch` por tipo, tu diseño estaría pidiendo a gritos una interfaz.",
          },
          {
            question:
              "¿Cuál es la diferencia entre una interfaz y una clase abstracta?",
            options: [
              "La interfaz sólo declara firmas; la abstracta puede traer código y estado",
              "No hay diferencia práctica",
              "La interfaz puede instanciarse; la abstracta no",
              "La abstracta sólo tiene métodos estáticos",
            ],
            correct: 0,
            explanation:
              "La interfaz es un contrato puro, sin implementación, y una clase puede cumplir muchas. La abstracta puede aportar métodos ya escritos y propiedades, pero sólo se hereda UNA. Regla práctica: interfaz para «puede hacer X», abstracta para «es un tipo de Y con base común».",
          },
          {
            question:
              "Una interfaz `Contable` exige `contar(): int`. ¿Qué garantiza sobre un objeto de tipo `Contable`?",
            options: [
              "Que puedes llamar $obj->contar() y recibir un int, sea cual sea su clase",
              "Que el objeto tiene una propiedad $contador",
              "Que el objeto es inmutable",
              "Que hereda de una clase Contable",
            ],
            correct: 0,
            explanation:
              "El contrato garantiza el MÉTODO, no cómo lo cumpla cada clase. Uno contará elementos de un array, otro filas de una base de datos: a quien recibe el `Contable` le da igual. Confía en la firma, no en la implementación.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_contratos",
      kind: "scroll",
      title: "El Pergamino de los Contratos",
      lore_intro:
        "Ante las puertas cerradas, Gandalf despliega un pergamino cubierto de runas. «No preguntes de qué está hecha una cosa. Pregunta qué promete hacer.»",
      position: { x: 5, y: 10 },
      scroll: {
        topic: "Interfaces y polimorfismo",
        sections: [
          {
            heading: "Una interfaz es un CONTRATO",
            body: "Una interfaz declara QUÉ métodos debe tener una clase, sin decir cómo. Quien la implementa se compromete a cumplirlos.\n\nA diferencia de la herencia, una clase puede implementar VARIAS interfaces — no está atada a un único padre.",
            code: `interface Descifrable {
    public function susurrarPalabra(string $palabra): bool;
}

class PuertaDurin implements Descifrable {
    public function susurrarPalabra(string $palabra): bool {
        return strtolower($palabra) === 'mellon';
    }
}`,
          },
          {
            heading: "Polimorfismo: el mismo mensaje, distintas respuestas",
            body: "Si varias clases cumplen el mismo contrato, tu código puede tratarlas por igual sin saber cuál es cuál. Añadir un tipo nuevo NO obliga a tocar el código que las usa — es Open/Closed en acción.",
            code: `function danioTotal(array $enemigos): int {
    $suma = 0;
    foreach ($enemigos as $e) {
        $suma += $e->atacar(); // no importa si es Orco o Troll
    }
    return $suma;
}`,
          },
          {
            heading: "Interfaz o clase abstracta",
            body: "Interfaz = contrato puro, sin implementación ni estado; una clase puede implementar muchas.\nAbstracta = puede traer código y propiedades compartidas, pero sólo se hereda UNA.\n\nRegla práctica: usa interfaz para el «qué», abstracta para compartir el «cómo».",
          },
        ],
        keyTakeaway:
          "Programa contra la interfaz, no contra la implementación. Es la base del polimorfismo y de la inyección de dependencias.",
      },
    },
    {
      node_id: "puertas_de_durin",
      title: "Las Puertas de Durin",
      lore_intro:
        "Las runas de ithildin brillan bajo la luz de la luna: «Habla, amigo, y entra.» Gandalf lucha con hechizos de apertura… hasta que Merry hace la pregunta correcta. La puerta sólo promete una cosa: reconocer la palabra.",
      position: { x: 9, y: 7 },
      poo_challenge: {
        topic: "Interfaces (implements)",
        instructions:
          "Implementa la interfaz Descifrable en la clase PuertaDurin. El método susurrarPalabra(string $palabra): bool debe devolver true SOLO con la palabra élfica 'mellon' (amigo), sin distinguir mayúsculas.",
        sut: "new PuertaDurin()",
        support_code:
          "interface Descifrable {\n    public function susurrarPalabra(string $palabra): bool;\n}",
        starter_code: "<?php\n\nclass PuertaDurin {\n}\n",
        hints: [
          "Declara que cumples el contrato: class PuertaDurin implements Descifrable",
          "Para ignorar mayúsculas: strtolower($palabra) === 'mellon'",
          "Si el nombre o la firma del método no coinciden con la interfaz, PHP lanzará un error fatal.",
        ],
        test_cases: [
          {
            input: "susurrarPalabra('Mellon')",
            expected: true,
            description: "La palabra élfica abre la puerta",
          },
          {
            input: "susurrarPalabra('mellon')",
            expected: true,
            description: "No distingue mayúsculas",
          },
          {
            input: "susurrarPalabra('Amigo')",
            expected: false,
            description: "En castellano no funciona: hay que decirlo en élfico",
          },
          {
            input: "(new PuertaDurin()) instanceof Descifrable",
            raw: true,
            expected: true,
            description: "La clase debe IMPLEMENTAR el contrato Descifrable",
          },
        ],
      },
    },
    {
      node_id: "camara_mazarbul",
      title: "La Cámara de Mazarbul",
      lore_intro:
        "«Han tomado el puente y la segunda sala.» Tambores en lo profundo. Trasgos y un troll de las cavernas irrumpen a la vez: distintas criaturas, un mismo contrato — todas atacan.",
      position: { x: 13, y: 4 },
      spriteId: "troll",
      poo_challenge: {
        topic: "Polimorfismo",
        instructions:
          "Existe la interfaz Enemigo (nombre(): string y atacar(): int) y la clase Camara con el método estático danioTotal(). Crea DOS clases que implementen Enemigo: Trasgo, que se llame 'Trasgo' y ataque con 5, y Troll, que se llame 'Troll' y ataque con 20.",
        support_code:
          "interface Enemigo {\n    public function nombre(): string;\n    public function atacar(): int;\n}\n\nclass Camara {\n    /** @param Enemigo[] $horda */\n    public static function danioTotal(array $horda): int {\n        return array_sum(array_map(fn(Enemigo $e) => $e->atacar(), $horda));\n    }\n}",
        starter_code: "<?php\n\nclass Trasgo {\n}\n\nclass Troll {\n}\n",
        hints: [
          "Ambas deben declarar el contrato: class Trasgo implements Enemigo",
          "Cada una implementa los DOS métodos de la interfaz: nombre() y atacar().",
          "Fíjate en que Camara::danioTotal() no sabe si le pasas trasgos o trolls: eso es polimorfismo.",
        ],
        test_cases: [
          {
            input: "(new Trasgo())->nombre()",
            raw: true,
            expected: "Trasgo",
            description: "El trasgo se identifica",
          },
          {
            input: "(new Trasgo())->atacar()",
            raw: true,
            expected: 5,
            description: "El trasgo golpea flojo",
          },
          {
            input: "(new Troll())->atacar()",
            raw: true,
            expected: 20,
            description: "El troll golpea fuerte",
          },
          {
            input: "Camara::danioTotal([new Trasgo(), new Trasgo(), new Troll()])",
            raw: true,
            expected: 30,
            description:
              "La MISMA función suma la horda mezclada sin saber qué es cada uno",
          },
          {
            input: "(new Troll()) instanceof Enemigo",
            raw: true,
            expected: true,
            description: "Ambas cumplen el contrato Enemigo",
          },
        ],
      },
    },
    {
      node_id: "puente_khazad_dum",
      title: "El Puente de Khazad-dûm",
      lore_intro:
        "Una sombra con alas de oscuridad y una espada de llama. «¡Huid, insensatos!» Gandalf alza a Glamdring sobre el puente estrecho. Un comando mágico es un objeto: quien lo ejecuta no necesita saber qué hechizo es.",
      position: { x: 19, y: 7 },
      spriteId: "balrog",
      poo_challenge: {
        topic: "Interfaces · patrón Command",
        instructions:
          "Existen la interfaz ComandoMagico (lanzar(Puente $p): string), la clase Puente (con $roto) y Gandalf, que ejecuta cualquier comando. Crea PalabraDeMando, que implemente ComandoMagico: al lanzarse debe ROMPER el puente ($p->roto = true) y devolver exactamente '¡No puedes pasar!'.",
        sut: "new Gandalf()",
        support_code:
          "class Puente {\n    public bool $roto = false;\n}\n\ninterface ComandoMagico {\n    public function lanzar(Puente $p): string;\n}\n\nclass Gandalf {\n    public function ejecutar(ComandoMagico $hechizo, Puente $p): string {\n        return $hechizo->lanzar($p);\n    }\n}",
        starter_code: "<?php\n\nclass PalabraDeMando {\n}\n",
        hints: [
          "class PalabraDeMando implements ComandoMagico { … }",
          "Dentro de lanzar() modifica el puente recibido: $p->roto = true;",
          "Devuelve el texto EXACTO, con signos de apertura y cierre: return '¡No puedes pasar!';",
        ],
        test_cases: [
          {
            input: "ejecutar(new PalabraDeMando(), new Puente())",
            expected: "¡No puedes pasar!",
            description: "Gandalf ejecuta el comando sin saber cuál es",
          },
          {
            input:
              "(function() { $p = new Puente(); (new Gandalf())->ejecutar(new PalabraDeMando(), $p); return $p->roto; })()",
            raw: true,
            expected: true,
            description: "El puente se quiebra bajo el Balrog",
          },
          {
            input: "(new PalabraDeMando()) instanceof ComandoMagico",
            raw: true,
            expected: true,
            description: "El hechizo cumple el contrato ComandoMagico",
          },
        ],
      },
    },
    {
      node_id: "c6_galeria_de_mazarbul",
      title: "La galería sin fin",
      lore_intro:
        "Las salas de Khazad-dûm se encadenan una tras otra en la oscuridad. Quien lleve su registro debe poder recorrerlas con un simple foreach — eso es un iterador, y la interfaz que lo permite.",
      position: { x: 16, y: 10 },
      spriteId: "gimli",
      poo_challenge: {
        topic: "Generadores e IteratorAggregate",
        instructions:
          "Un generador produce valores de uno en uno con `yield`, sin construir la lista entera. Y un objeto se vuelve recorrible con foreach implementando la interfaz `IteratorAggregate`.\n\n" +
          "Escribe la clase `Galeria` que implemente `IteratorAggregate` y `Countable`, con las salas en una propiedad PRIVADA:\n" +
          "• `agregar(string $sala): static` — añade una sala y devuelve `$this` (interfaz fluida).\n" +
          "• `getIterator(): Generator` — rinde las salas en orden con `yield from`. Una línea.\n" +
          "• `count(): int` — cuántas salas hay.",
        starter_code: "<?php\n\nfinal class Galeria implements IteratorAggregate, Countable\n{\n    private array $salas = [];\n\n    public function agregar(string $sala): static\n    {\n    }\n\n    public function getIterator(): Generator\n    {\n    }\n\n    public function count(): int\n    {\n    }\n}\n",
        hints: [
          "La interfaz fluida es `return $this;` al final del método que modifica.",
          "`getIterator()` puede ser un generador: `yield from $this->salas;` y ya está.",
          "`Countable` hace que `count($objeto)` llame a tu método `count()`: devuelve `count($this->salas)`.",
        ],
        test_cases: [
          { input: "iterator_to_array((new Galeria())->agregar('Mazarbul')->agregar('Puente'), false)", expected: ["Mazarbul", "Puente"], description: "Se recorre en orden", raw: true },
          { input: "count((new Galeria())->agregar('Mazarbul')->agregar('Puente')->agregar('Escalera'))", expected: 3, description: "count() sobre el objeto", raw: true },
          { input: "count(new Galeria())", expected: 0, description: "Una galería vacía", raw: true },
          { input: "(new Galeria()) instanceof Traversable", expected: true, description: "Es recorrible de verdad", raw: true },
          { input: "(new Galeria())->agregar('x') instanceof Galeria", expected: true, description: "agregar() devuelve la galería (fluida)", raw: true },
          { input: "(new ReflectionMethod('Galeria', 'getIterator'))->isGenerator()", expected: true, description: "getIterator() es un generador, no un array", raw: true },
          { input: "(new ReflectionProperty('Galeria', 'salas'))->isPrivate()", expected: true, description: "Las salas son privadas", raw: true },
        ],
      },
    },
  ],
};

export const CHAPTER_7: Chapter = {
  chapter: 7,
  title: "El Espejo de Lothlórien",
  lore: "Bajo los mallorn dorados de Caras Galadhon, Galadriel muestra lo que fue, lo que es y lo que aún podría ser. Al partir entrega dones: distintos objetos que comparten un mismo poder élfico sin pertenecer a la misma estirpe.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 8 },
  xpParaRetos: 180,
  unlockedBy: 6,
  scenery: {
    ground: "gold",
    pathRows: [8],
    pathGround: "path",
    pond: { x: 10, y: 2, w: 5, h: 3 }, // la fuente del Espejo
    dialogues: [
      { x: 7, y: 8, speaker: "legolas", name: "Legolas",
        text: "Cantan lamentos por Gandalf. No tengo fuerzas para traducirlos." },
      { x: 16, y: 8, speaker: "gimli", name: "Gimli",
        text: "Pedí un cabello de oro de la Dama. Me dio tres." },
    ],
    decor: [
      { type: "mallorn", x: 4, y: 5 },
      { type: "mallorn", x: 8, y: 6 },
      { type: "mallorn", x: 17, y: 5 },
      { type: "mallorn", x: 21, y: 6 },
      { type: "mallorn", x: 6, y: 13 },
      { type: "mallorn", x: 12, y: 13 },
      { type: "mallorn", x: 19, y: 13 },
      { type: "mallorn", x: 23, y: 10 },
      { type: "rock", x: 8, y: 3 },
      { type: "rock", x: 16, y: 3 },
      { type: "rock", x: 14, y: 10 },
      // el bosque dorado se extiende hacia el Anduin, al este
      { type: "mallorn", x: 26, y: 6 },
      { type: "mallorn", x: 30, y: 4 },
      { type: "mallorn", x: 34, y: 6 },
      { type: "mallorn", x: 38, y: 5 },
      { type: "mallorn", x: 28, y: 12 },
      { type: "mallorn", x: 32, y: 11 },
      { type: "mallorn", x: 27, y: 18 },
      { type: "mallorn", x: 31, y: 24 },
      { type: "mallorn", x: 37, y: 22 },
      { type: "mallorn", x: 41, y: 14 },
      { type: "rock", x: 35, y: 16 },
      { type: "rock", x: 29, y: 9 },
      { type: "rock", x: 39, y: 19 },
    ],
  },
  companions: ["aragorn", "boromir", "gimli", "legolas", "sam"],
  nodes: [
    // ---- Combates: clases abstractas y traits ----
    {
      node_id: "c7_orco_explorador",
      kind: "battle",
      title: "Sombras entre los mallorn",
      lore_intro:
        "La luz dorada de Lórien no llega a todos los rincones. En la linde del bosque, un explorador de Isengard estudia el terreno.",
      position: { x: 27, y: 4 },
      spriteId: "orco",
      enemy: {
        name: "Explorador de Isengard",
        spriteId: "orco",
        hp: 5,
        damage: 1,
        xp: 55,
        taunt: "«El bosque de la bruja no os protegerá al salir.»",
        questions: [
          {
            question: "¿Qué es una clase `abstract`?",
            options: [
              "Una clase que no se puede instanciar, pensada para ser heredada",
              "Una clase sin propiedades",
              "Una clase que sólo tiene métodos estáticos",
              "Otro nombre para una interfaz",
            ],
            correct: 0,
            explanation:
              "Una clase abstracta define una base común pero prohíbe crearse directamente con `new`: sólo existe a través de sus hijas concretas. Sirve para reunir lo compartido (código y estado) y dejar que cada hija complete lo que falta.",
          },
          {
            question:
              "¿Qué pasa si intentas `new Personaje()` siendo Personaje una clase abstracta?",
            options: [
              "Error fatal: no se puede instanciar una clase abstracta",
              "Se crea un objeto con las propiedades a null",
              "Se crea, pero sin métodos",
              "PHP instancia la primera clase hija",
            ],
            correct: 0,
            explanation:
              "Instanciar una abstracta es error fatal: `Cannot instantiate abstract class Personaje`. Es intencional — la abstracta está incompleta a propósito. Instancias una hija concreta (Hobbit, Elfo) que rellene lo que la base dejó abierto.",
          },
          {
            question:
              "Un `abstract function golpe(): int;` dentro de una clase abstracta, ¿qué obliga?",
            options: [
              "A que toda hija concreta implemente golpe(), o será error",
              "A que la clase tenga una propiedad golpe",
              "A nada: es opcional",
              "A llamar a golpe() en el constructor",
            ],
            correct: 0,
            explanation:
              "Un método abstracto declara la firma sin cuerpo y obliga a cada hija concreta a implementarlo. Es como una casilla del contrato que la base deja en blanco: si la hija no la rellena, no compila. Combina base compartida (abstracta) con obligación de completar (abstract method).",
          },
        ],
      },
    },
    {
      node_id: "c7_trasgo_frontera",
      kind: "battle",
      title: "El acecho en la frontera",
      lore_intro:
        "Los Guardianes élficos vigilan el interior, pero la linde es larga. Un trasgo se ha colado entre las raíces doradas.",
      position: { x: 24, y: 22 },
      spriteId: "trasgo",
      enemy: {
        name: "Trasgo merodeador",
        spriteId: "trasgo",
        hp: 5,
        damage: 2,
        xp: 60,
        taunt: "«Oro… tantos árboles de oro… mi señor querrá todos.»",
        questions: [
          {
            question: "¿Qué es un `trait`?",
            options: [
              "Un bloque de métodos reutilizable que varias clases pueden incorporar",
              "Una interfaz con estado",
              "Una clase que no se puede heredar",
              "Una propiedad de tipo función",
            ],
            correct: 0,
            explanation:
              "Un trait es implementación reutilizable «horizontal»: métodos (y propiedades) que copias dentro de una clase con `use`. Resuelve el problema de compartir código entre clases que NO tienen una relación de herencia natural, sin recurrir a la herencia múltiple (que PHP no tiene).",
          },
          {
            question: "¿Cómo incorpora una clase un trait?",
            options: [
              "Con la palabra clave use dentro del cuerpo de la clase",
              "Con implements Trait",
              "Con extends Trait",
              "Con new Trait() en el constructor",
            ],
            correct: 0,
            explanation:
              "`use NombreTrait;` en la primera línea del cuerpo de la clase «pega» sus métodos como si estuvieran escritos ahí. No es herencia (`extends`) ni contrato (`implements`): es copia de código en tiempo de compilación.",
          },
          {
            question:
              "¿Cuántos traits puede usar una clase, y cuántas clases pueden usar el mismo trait?",
            options: [
              "Muchos traits por clase, y un trait en muchas clases",
              "Un trait por clase como máximo",
              "Un trait sólo puede usarse en una clase",
              "Depende de si la clase es abstracta",
            ],
            correct: 0,
            explanation:
              "Los traits son de muchos-a-muchos: una clase puede `use` varios, y un trait puede repartirse por muchas clases sin relación entre sí. Eso es justo lo que los hace útiles para comportamientos transversales (registrar, comparar, serializar) que no encajan en una jerarquía.",
          },
        ],
      },
    },
    {
      node_id: "c7_uruk_rastreador",
      kind: "battle",
      title: "El rastreador de Mano Blanca",
      lore_intro:
        "Más grande que un orco y sin miedo al sol, lleva la Mano Blanca pintada en la frente. Rastrea el olor de la Comunidad desde Moria.",
      position: { x: 33, y: 20 },
      spriteId: "uruk",
      enemy: {
        name: "Uruk-hai rastreador",
        spriteId: "uruk",
        hp: 6,
        damage: 2,
        xp: 65,
        taunt: "«Servimos a Saruman el Sabio, la Mano Blanca.»",
        questions: [
          {
            question:
              "¿Cuál es la diferencia principal entre un trait y una clase abstracta?",
            options: [
              "Del trait usas VARIOS y no crea jerarquía; de la abstracta heredas UNA y sí crea jerarquía (es-un)",
              "El trait no puede tener métodos",
              "La abstracta se puede instanciar; el trait no",
              "No hay diferencia",
            ],
            correct: 0,
            explanation:
              "Heredar de una abstracta afirma «es un»: un Hobbit ES un Personaje, y sólo puede tener un padre. Un trait no dice nada sobre identidad: sólo aporta métodos, y puedes combinar varios. Abstracta para el «qué es»; trait para el «qué sabe hacer, compartido».",
          },
          {
            question:
              "Dos traits que usa la misma clase definen un método con el MISMO nombre. ¿Qué ocurre?",
            options: [
              "Conflicto: hay que resolverlo con insteadof/as o es error fatal",
              "Gana el último trait declarado, en silencio",
              "Se ejecutan los dos, uno detrás de otro",
              "PHP los fusiona automáticamente",
            ],
            correct: 0,
            explanation:
              "PHP no adivina cuál quieres: un choque de nombres entre traits es error fatal salvo que lo resuelvas explícitamente con `insteadof` (elegir uno) y `as` (renombrar el otro). Prefiere el fallo ruidoso a una elección silenciosa que podría ser la equivocada.",
          },
          {
            question:
              "¿Puede una clase abstracta usar traits e implementar interfaces a la vez?",
            options: [
              "Sí: puede extenderse, usar traits e implementar interfaces simultáneamente",
              "No: abstracta y trait son incompatibles",
              "Sólo una de las tres cosas a la vez",
              "Sólo si no tiene métodos abstractos",
            ],
            correct: 0,
            explanation:
              "No se excluyen: una abstracta puede `extends` otra clase, `use` traits e `implements` interfaces todo junto. Cada mecanismo resuelve algo distinto — jerarquía, código compartido y contrato — y se combinan con naturalidad.",
          },
        ],
      },
    },
    {
      node_id: "c7_jefe_ugluk",
      kind: "battle",
      title: "Uglúk, capitán de Isengard",
      lore_intro:
        "En la última linde dorada, antes del Anduin, el capitán de la partida de caza se planta en el sendero. Trae órdenes de Saruman: coger a los medianos vivos. La Comunidad forma a tu espalda.",
      position: { x: 40, y: 8 },
      spriteId: "uruk",
      enemy: {
        name: "Uglúk de Isengard",
        spriteId: "uruk",
        hp: 7,
        damage: 3,
        xp: 190,
        boss: true,
        taunt: "«¡Los medianos, vivos! ¡Saruman los quiere enteros!»",
        reward: {
          hero: "boromir",
          name: "Boromir de Gondor",
          blurb:
            "El capitán de la Ciudad Blanca, escudo de la Comunidad pese a su carga. Boromir se une a tus héroes.",
        },
        questions: [
          {
            question:
              "```\nabstract class Personaje {\n  abstract public function nombre(): string;\n  public function saludo(): string { return 'Soy ' . $this->nombre(); }\n}\nclass Elfo extends Personaje {\n  public function nombre(): string { return 'Legolas'; }\n}\necho (new Elfo())->saludo();\n```",
            options: [
              "Soy Legolas",
              "Error: Personaje es abstracta",
              "Soy ",
              "Soy Elfo",
            ],
            correct: 0,
            explanation:
              "La abstracta aporta `saludo()` ya escrito, que llama al método abstracto `nombre()`. La hija Elfo rellena `nombre()`, así que `saludo()` funciona y devuelve «Soy Legolas». Es el patrón «método plantilla»: la base define el esqueleto, la hija completa los huecos.",
          },
          {
            question:
              "Necesitas que Espada y Hechizo compartan un método `registrarUso()` idéntico, pero no tienen ancestro común y no quieres uno artificial. ¿Qué usas?",
            options: [
              "Un trait con registrarUso(), que ambas hacen use",
              "Herencia: creo una clase padre común",
              "Copio y pego el método en las dos",
              "Una interfaz con el método",
            ],
            correct: 0,
            explanation:
              "El trait es exactamente para esto: compartir implementación entre clases sin parentesco, sin inventar una superclase forzada ni duplicar código. La interfaz sólo declararía la firma (tendrías que escribir el cuerpo dos veces); la herencia ataría clases que no son «la misma cosa».",
          },
          {
            question:
              "¿Puede una clase abstracta tener un constructor y propiedades con estado?",
            options: [
              "Sí: aporta a las hijas ese constructor y esas propiedades",
              "No: las abstractas no tienen estado",
              "Sólo propiedades estáticas",
              "Sólo si no tiene métodos abstractos",
            ],
            correct: 0,
            explanation:
              "Una abstracta es una clase de pleno derecho salvo por el `new` directo: tiene constructor, propiedades, métodos concretos y abstractos. Las hijas heredan todo eso y llaman a `parent::__construct()` como con cualquier padre. Es su ventaja sobre la interfaz, que no puede aportar estado.",
          },
          {
            question:
              "Regla práctica: ¿cuándo interfaz, cuándo abstracta, cuándo trait?",
            options: [
              "Interfaz = contrato (puede-hacer); abstracta = base con identidad (es-un); trait = código compartido sin jerarquía",
              "Da igual, los tres son intercambiables",
              "Interfaz para todo; los otros dos están obsoletos",
              "Trait para contratos, abstracta para código, interfaz para estado",
            ],
            correct: 0,
            explanation:
              "Interfaz cuando sólo importa QUE cumpla un contrato (Comparable, Contable). Abstracta cuando hay una relación «es-un» real con base común (Personaje → Hobbit). Trait cuando varias clases sin parentesco necesitan el MISMO código (registrar, serializar). No compiten: se combinan.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_dones",
      kind: "scroll",
      title: "El Pergamino de Galadriel",
      lore_intro:
        "«Te doy la luz de Eärendil», dice la Dama. Y con ella, un pergamino: «Hay parentesco y hay don. No los confundas: uno se hereda, el otro se comparte.»",
      position: { x: 3, y: 11 },
      scroll: {
        topic: "Clases abstractas y traits",
        sections: [
          {
            heading: "Clase abstracta: un padre incompleto",
            body: "No se puede instanciar: existe para ser heredada. Puede traer código y estado COMPARTIDOS, y obligar a las hijas a implementar ciertos métodos con `abstract`.\n\nSólo se hereda UNA. Úsala cuando las hijas son realmente de la misma familia y comparten implementación.",
            code: `abstract class ObjetoMagico {
    public function __construct(protected string $nombre) {}

    abstract public function usar(): string;   // cada hija lo resuelve

    public function describir(): string {      // código compartido
        return "Don de Galadriel: {$this->nombre}";
    }
}

new ObjetoMagico('x'); // ❌ Error: no se puede instanciar`,
          },
          {
            heading: "Trait: reuso HORIZONTAL",
            body: "Un trait es un bloque de métodos que puedes «pegar» en clases que NO tienen parentesco entre sí. Resuelve el reuso donde la herencia no llega, porque una clase puede usar muchos traits.",
            code: `trait CamuflajeElfico {
    public function ocultar(): string {
        return 'te fundes con el bosque';
    }
}

class CapaDeHobbit { use CamuflajeElfico; }
class Barca        { use CamuflajeElfico; }  // sin parentesco alguno`,
          },
          {
            heading: "¿Cuál elijo?",
            body: "Interfaz → el CONTRATO («qué promete»).\nAbstracta → la FAMILIA («qué comparte por parentesco»).\nTrait → la CAPACIDAD («qué sabe hacer, venga de donde venga»).\n\nOjo: abusar de traits suele ser señal de que faltaba composición.",
          },
        ],
        keyTakeaway:
          "Herencia para «es un», trait para «sabe hacer», interfaz para «promete que». Si dudas entre trait y herencia, pregúntate si de verdad hay parentesco.",
      },
    },
    {
      node_id: "frasco_de_galadriel",
      title: "El Frasco de Galadriel",
      lore_intro:
        "«Que sea para ti una luz en los lugares oscuros, cuando todas las demás se apaguen.» Todo don comparte una forma; sólo cambia cómo se usa.",
      position: { x: 9, y: 8 },
      poo_challenge: {
        topic: "Clases abstractas (abstract)",
        instructions:
          "La clase abstracta ObjetoMagico ya existe: guarda $nombre, comparte describir() y obliga a implementar usar(): string. Crea FrascoDeGaladriel, que la extienda y devuelva en usar() exactamente 'una luz en los lugares oscuros'.",
        sut: "new FrascoDeGaladriel('Frasco')",
        support_code:
          "abstract class ObjetoMagico {\n    public function __construct(protected string $nombre) {}\n    abstract public function usar(): string;\n    public function describir(): string {\n        return \"Don de Galadriel: {$this->nombre}\";\n    }\n}",
        starter_code: "<?php\n\nclass FrascoDeGaladriel {\n}\n",
        hints: [
          "class FrascoDeGaladriel extends ObjetoMagico { … }",
          "Sólo tienes que implementar usar(): describir() se hereda ya resuelto.",
          "Devuelve el texto exacto: return 'una luz en los lugares oscuros';",
        ],
        test_cases: [
          {
            input: "usar()",
            expected: "una luz en los lugares oscuros",
            description: "Cada don se usa a su manera",
          },
          {
            input: "describir()",
            expected: "Don de Galadriel: Frasco",
            description:
              "describir() se HEREDA: una abstracta sí puede traer código compartido",
          },
          {
            input:
              "(function() { try { new ObjetoMagico('x'); return false; } catch (\\Throwable $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "Una clase abstracta no se puede instanciar",
          },
        ],
      },
    },
    {
      node_id: "capas_elficas",
      title: "Las Capas Élficas",
      lore_intro:
        "Las capas de Lórien no son de la misma familia que las barcas… pero ambas saben esconderse a la vista de ojos enemigos. Eso no se hereda: se comparte.",
      position: { x: 14, y: 5 },
      poo_challenge: {
        topic: "Traits (reuso horizontal)",
        instructions:
          "Crea el trait CamuflajeElfico con el método ocultar(): string, que devuelva 'te fundes con el bosque'. Después crea DOS clases sin parentesco entre sí, CapaElfica y Barca, que USEN ese trait.",
        starter_code: "<?php\n\ntrait CamuflajeElfico {\n}\n\nclass CapaElfica {\n}\n\nclass Barca {\n}\n",
        hints: [
          "Dentro de una clase, incorporas el trait con: use CamuflajeElfico;",
          "El trait declara el método una sola vez y las dos clases lo obtienen.",
          "No copies el método en cada clase: la última prueba comprueba que realmente usaste un trait.",
        ],
        test_cases: [
          {
            input: "(new CapaElfica())->ocultar()",
            expected: "te fundes con el bosque",
            description: "La capa esconde a quien la lleva",
          },
          {
            input: "(new Barca())->ocultar()",
            expected: "te fundes con el bosque",
            description: "La barca también, sin heredar de la capa",
          },
          {
            input: "in_array('CamuflajeElfico', class_uses('CapaElfica'))",
            expected: true,
            description: "La capacidad viene de un TRAIT, no de copiar y pegar",
          },
          {
            input: "in_array('CamuflajeElfico', class_uses('Barca'))",
            expected: true,
            description: "El mismo trait, reutilizado horizontalmente",
          },
        ],
      },
    },
    {
      node_id: "dones_de_lorien",
      title: "Los Dones de la Dama",
      lore_intro:
        "Al alba, la Comunidad recibe sus regalos. Cada don es distinto, pero todos llevan la bendición de Lórien. Aquí se juntan las dos ideas: la familia que comparte forma, y el don que se pega a cualquiera.",
      position: { x: 20, y: 8 },
      poo_challenge: {
        topic: "Abstractas + traits combinados",
        instructions:
          "Existen la abstracta Don (exige poder(): int), el trait Bendecido (aporta bendicion(): int = 10) y Cofre::poderTotal(). Crea Frasco y Capa: ambas EXTIENDEN Don y USAN Bendecido. poder() debe devolver su base más la bendición: 5 para el Frasco (total 15) y 2 para la Capa (total 12).",
        support_code:
          "abstract class Don {\n    abstract public function poder(): int;\n}\n\ntrait Bendecido {\n    public function bendicion(): int { return 10; }\n}\n\nclass Cofre {\n    /** @param Don[] $dones */\n    public static function poderTotal(array $dones): int {\n        return array_sum(array_map(fn(Don $d) => $d->poder(), $dones));\n    }\n}",
        starter_code: "<?php\n\nclass Frasco {\n}\n\nclass Capa {\n}\n",
        hints: [
          "Se combinan así: class Frasco extends Don { use Bendecido; … }",
          "Dentro de poder() puedes llamar al método que aporta el trait: return 5 + $this->bendicion();",
          "Cofre::poderTotal() las trata a las dos como Don: eso es polimorfismo sobre una abstracta.",
        ],
        test_cases: [
          {
            input: "(new Frasco())->poder()",
            expected: 15,
            description: "5 propios + 10 de bendición",
          },
          {
            input: "(new Capa())->poder()",
            expected: 12,
            description: "2 propios + 10 de bendición",
          },
          {
            input: "Cofre::poderTotal([new Frasco(), new Capa()])",
            expected: 27,
            description: "El cofre las suma a ambas como Don",
          },
          {
            input:
              "(new Frasco()) instanceof Don && in_array('Bendecido', class_uses('Frasco'))",
            expected: true,
            description: "Hereda de Don Y usa el trait Bendecido",
          },
        ],
      },
    },
  ],
};

export const CHAPTER_8: Chapter = {
  chapter: 8,
  title: "La Disolución en Amon Hen",
  lore: "En Parth Galen, junto al Anduin, la Comunidad se quiebra. Boromir sucumbe al Anillo, los Uruk-hai bajan de Isengard y Frodo debe elegir. Cuando algo puede salir mal, dilo con una excepción; cuando algo hay que fabricar en serie, usa una fábrica.",
  mapSize: { cols: 44, rows: 26 },
  spawn: { x: 2, y: 8 },
  xpParaRetos: 200,
  unlockedBy: 7,
  scenery: {
    ground: "grass",
    pathRows: [4],
    pathGround: "stone", // la calzada arruinada que sube al Solio
    pond: { x: 0, y: 22, w: 44, h: 3 }, // el Anduin, de orilla a orilla
    npcs: [{ spriteId: "gollum", x: 3, y: 3, label: "¿…nos sigue?" }],
    dialogues: [
      { x: 8, y: 8, speaker: "aragorn", name: "Aragorn",
        text: "La Compañía se rompe. Ya ha empezado." },
      { x: 17, y: 8, speaker: "sam", name: "Sam",
        text: "Se lo prometí a Gandalf. «No lo pierdas de vista» — y no pienso hacerlo." },
    ],
    decor: [
      { type: "pine", x: 5, y: 2 },
      { type: "pine", x: 10, y: 2 },
      { type: "pine", x: 16, y: 2 },
      { type: "pine", x: 22, y: 2 },
      { type: "pine", x: 4, y: 12 },
      { type: "pine", x: 12, y: 13 },
      { type: "pine", x: 21, y: 12 },
      { type: "rock", x: 8, y: 6 },
      { type: "rock", x: 11, y: 5 },
      { type: "rock", x: 15, y: 6 },
      { type: "rock", x: 18, y: 5 },
      { type: "rock", x: 6, y: 6 },
      // la ladera del Solio sube hacia el este, hacia el bosque de Parth Galen
      { type: "pine", x: 27, y: 2 },
      { type: "pine", x: 32, y: 3 },
      { type: "pine", x: 37, y: 2 },
      { type: "pine", x: 41, y: 5 },
      { type: "pine", x: 29, y: 14 },
      { type: "pine", x: 35, y: 16 },
      { type: "pine", x: 24, y: 17 },
      { type: "pine", x: 39, y: 18 },
      { type: "rock", x: 30, y: 6 },
      { type: "rock", x: 34, y: 10 },
      { type: "rock", x: 38, y: 12 },
      { type: "rock", x: 26, y: 11 },
      { type: "rock", x: 42, y: 9 },
    ],
  },
  companions: ["aragorn", "gimli", "legolas", "sam"],
  nodes: [
    // ---- Combates: excepciones y patrón Factory ----
    {
      node_id: "c8_uruk_arquero",
      kind: "battle",
      title: "El primer disparo",
      lore_intro:
        "En lo alto de la ladera, un Uruk-hai tensa un arco negro. La Comunidad se dispersa entre los árboles; alguien tiene que cubrir la retirada.",
      position: { x: 27, y: 4 },
      spriteId: "uruk",
      enemy: {
        name: "Uruk-hai arquero",
        spriteId: "uruk",
        hp: 6,
        damage: 2,
        xp: 60,
        taunt: "Encaja una flecha negra y busca un blanco entre los árboles.",
        questions: [
          {
            question: "¿Qué hace `throw new RuntimeException('boom')`?",
            options: [
              "Lanza una excepción que interrumpe el flujo hasta que alguien la capture",
              "Escribe 'boom' y continúa",
              "Termina el programa en silencio",
              "Devuelve un objeto Exception sin más efecto",
            ],
            correct: 0,
            explanation:
              "`throw` corta la ejecución en seco: la función no devuelve, sino que «tira» la excepción hacia arriba por la pila de llamadas hasta que un `catch` compatible la recoge. Si nadie la captura, el programa muere con un error fatal.",
          },
          {
            question:
              "¿Por qué lanzar una excepción es mejor que devolver `false` cuando algo falla?",
            options: [
              "Un false se puede ignorar por accidente; una excepción obliga a tratarla o propaga el fallo",
              "Las excepciones son más rápidas",
              "false ocupa más memoria",
              "No hay diferencia real",
            ],
            correct: 0,
            explanation:
              "Un valor de error (`false`, `null`, `-1`) se pierde en cuanto quien llama olvida comprobarlo, y el fallo sigue adelante disfrazado. Una excepción no se puede ignorar sin querer: o la capturas, o detiene el programa donde está. El fallo se hace visible.",
          },
          {
            question:
              "¿De qué clase conviene que herede una excepción propia como `SigiloInsuficienteException`?",
            options: [
              "De Exception (o una subclase de la jerarquía estándar)",
              "De la clase donde ocurre el error",
              "De ninguna: basta con un string",
              "De stdClass",
            ],
            correct: 0,
            explanation:
              "Extender `Exception` (o `RuntimeException`, `LogicException`…) hace que tu excepción encaje en el sistema `try/catch` y puedas capturarla por su tipo. Crear tipos propios permite distinguir «esto es un fallo de sigilo» de «esto es otra cosa» en el catch.",
          },
        ],
      },
    },
    {
      node_id: "c8_orco_saqueador",
      kind: "battle",
      title: "Saqueadores en la ribera",
      lore_intro:
        "Bajan hacia los botes volcados, buscando medianos escondidos. Uno rebusca entre los petates con un hacha mellada.",
      position: { x: 24, y: 8 },
      spriteId: "orco",
      enemy: {
        name: "Orco saqueador",
        spriteId: "orco",
        hp: 6,
        damage: 2,
        xp: 70,
        taunt: "«¿Dónde se esconde el mediano? ¡El amo lo quiere!»",
        questions: [
          {
            question:
              "En un bloque `try { ... } catch (Exception $e) { ... }`, ¿cuándo se ejecuta el catch?",
            options: [
              "Sólo si dentro del try se lanza una excepción compatible",
              "Siempre, después del try",
              "Sólo si el try termina sin errores",
              "Nunca, si el try tiene return",
            ],
            correct: 0,
            explanation:
              "El `catch` es un plan B: sólo entra si el `try` lanza una excepción que encaje con su tipo. Si el try va bien, el catch se salta por completo. Para código que debe correr pase lo que pase (cerrar un fichero), está `finally`.",
          },
          {
            question:
              "¿Qué captura `catch (Throwable $e)` que NO captura `catch (Exception $e)`?",
            options: [
              "También los Error (errores internos de PHP, como TypeError)",
              "Nada: son equivalentes",
              "Sólo las excepciones propias",
              "Los warnings y notices",
            ],
            correct: 0,
            explanation:
              "En PHP, `Exception` y `Error` son ramas hermanas bajo la interfaz `Throwable`. `catch (Exception)` coge tus excepciones y las de librería; `catch (Throwable)` coge además los `Error` del motor (TypeError, DivisionByZeroError…). Los warnings no son throwables: no se capturan así.",
          },
          {
            question:
              "¿Cuál es el orden correcto de los catch cuando hay varios?",
            options: [
              "De la excepción más específica a la más general",
              "De la más general a la más específica",
              "El orden da igual",
              "Alfabético por nombre de clase",
            ],
            correct: 0,
            explanation:
              "PHP prueba los catch de arriba abajo y entra en el primero que encaje. Si pones `catch (Exception)` antes que `catch (RuntimeException)`, el general captura todo y el específico nunca se alcanza. Siempre de lo concreto a lo genérico.",
          },
        ],
      },
    },
    {
      node_id: "c8_uruk_espadachin",
      kind: "battle",
      title: "El acero de Isengard",
      lore_intro:
        "Un Uruk-hai enorme se abre paso con una cimitarra dentada. Boromir hace sonar el Cuerno de Gondor a lo lejos: la señal de que la lucha ya es de todos.",
      position: { x: 33, y: 9 },
      spriteId: "uruk",
      enemy: {
        name: "Uruk-hai espadachín",
        spriteId: "uruk",
        hp: 7,
        damage: 2,
        xp: 70,
        taunt: "«El Cuerno de Gondor no salvará a nadie hoy.»",
        questions: [
          {
            question: "¿Qué es el patrón Factory (fábrica)?",
            options: [
              "Un método/clase cuya tarea es CREAR objetos, centralizando el new",
              "Un objeto que fabrica copias de sí mismo",
              "Una clase que sólo tiene métodos estáticos",
              "Otro nombre para el constructor",
            ],
            correct: 0,
            explanation:
              "Una Factory encapsula la decisión de QUÉ objeto crear y CÓMO. En vez de esparcir `new EspadaOrca()` / `new EspadaElfica()` por todo el código, la fábrica decide y devuelve un `Arma`. El resto del programa pide sin saber los detalles de construcción.",
          },
          {
            question:
              "Una `ArmaFactory::crear('espada')` devuelve un objeto que implementa `Arma`. ¿Qué ventaja da?",
            options: [
              "Quien la usa recibe un Arma sin acoplarse a la clase concreta ni al new",
              "Es más rápida que new",
              "Evita tener que declarar las clases",
              "Permite herencia múltiple",
            ],
            correct: 0,
            explanation:
              "El código cliente depende sólo de la interfaz `Arma` y de la fábrica, no de `EspadaOrca` en concreto. Añadir un arma nueva es tocar la fábrica en un sitio, no cazar `new` por todo el proyecto. Centralizas la creación y desacoplas el uso.",
          },
          {
            question:
              "Le pides a la fábrica un tipo que no conoce: `crear('bazooka')`. ¿Qué debería hacer una buena fábrica?",
            options: [
              "Lanzar una excepción (p. ej. InvalidArgumentException)",
              "Devolver null y seguir",
              "Crear un objeto vacío",
              "Devolver el primer tipo que tenga",
            ],
            correct: 0,
            explanation:
              "Pedir algo imposible es un error del programador, y una fábrica honesta lo canta con una excepción en vez de devolver `null` (que estallará más tarde y más lejos) o un objeto cualquiera (que causará un bug silencioso). Aquí se cruzan los dos temas del capítulo: la fábrica crea, y ante lo inválido, lanza.",
          },
        ],
      },
    },
    {
      node_id: "c8_jefe_lurtz",
      kind: "battle",
      title: "Lurtz, el primero de los Uruk-hai",
      lore_intro:
        "Cae Boromir, atravesado, y el que disparó avanza hacia ti sin prisa. Lurtz, el primer Uruk-hai nacido del barro de Isengard, criado para una sola cosa: cazar. Éste es el último aliento de la Comunidad tal como era.",
      position: { x: 40, y: 7 },
      spriteId: "uruk",
      enemy: {
        name: "Lurtz de Isengard",
        spriteId: "uruk",
        hp: 8,
        damage: 3,
        xp: 210,
        boss: true,
        taunt: "«Buscad a los medianos. Matad a los demás.»",
        reward: {
          hero: "gandalf",
          name: "Gandalf el Blanco",
          blurb:
            "El que cayó en Moria y ha vuelto, ahora vestido de blanco. Con Gandalf, la Comunidad de héroes está completa.",
        },
        questions: [
          {
            question:
              "```\ntry {\n  throw new RuntimeException('caída');\n} catch (LogicException $e) {\n  echo 'A';\n} catch (RuntimeException $e) {\n  echo 'B';\n} finally {\n  echo 'C';\n}\n```",
            options: ["BC", "AC", "ABC", "C"],
            correct: 0,
            explanation:
              "La excepción es `RuntimeException`, así que el primer catch (LogicException) no encaja y se salta; el segundo sí, imprime 'B'. Y `finally` se ejecuta SIEMPRE, imprima o no algún catch: añade 'C'. Resultado: BC.",
          },
          {
            question:
              "¿Para qué sirve el bloque `finally`?",
            options: [
              "Para código que debe ejecutarse haya o no excepción (limpieza, cierre)",
              "Para capturar la excepción que los catch no cogieron",
              "Para relanzar la excepción",
              "Sólo se ejecuta si no hubo excepción",
            ],
            correct: 0,
            explanation:
              "`finally` es la garantía de limpieza: corre tanto si el try acaba bien como si salta una excepción (incluso si el catch relanza o hay un return). Es donde cierras el fichero, sueltas el candado o devuelves la conexión, sin duplicar ese código en cada rama.",
          },
          {
            question:
              "Una Factory decide qué crear según un parámetro. Si mañana añades un tipo nuevo, ¿qué principio SOLID te conviene respetar?",
            options: [
              "Abierto/Cerrado: extender la fábrica sin reescribir a quien la usa",
              "Ninguno: las fábricas no siguen SOLID",
              "Herencia múltiple",
              "Que todo sea estático",
            ],
            correct: 0,
            explanation:
              "El principio Abierto/Cerrado: el código debería estar abierto a extensión pero cerrado a modificación. Una buena fábrica te deja añadir un tipo tocándola a ella (o registrando el nuevo), sin que quien pide `Arma` cambie ni una línea. Lo verás a fondo en el Libro II (SOLID).",
          },
          {
            question:
              "Capturas una excepción, registras el error, pero no puedes resolverlo aquí. ¿Qué haces?",
            options: [
              "Relanzarla (throw) para que un nivel superior decida, quizá envuelta en otra",
              "Devolver null y seguir como si nada",
              "Ignorarla: ya la registraste",
              "Convertirla en un echo",
            ],
            correct: 0,
            explanation:
              "Tragarse una excepción que no sabes resolver esconde el fallo. El patrón correcto es registrar y RELANZAR (`throw`), o envolverla en una excepción de más alto nivel que dé contexto, para que quien pueda decidir lo haga. Capturar no obliga a resolver ahí mismo.",
          },
        ],
      },
    },
    {
      node_id: "pergamino_fallos",
      kind: "scroll",
      title: "El Pergamino de lo que Puede Fallar",
      lore_intro:
        "Aragorn deja caer un pergamino junto al fuego apagado. «Ninguna compañía sobrevive fingiendo que nada saldrá mal. Nómbralo, y podrás responder.»",
      position: { x: 4, y: 6 },
      scroll: {
        topic: "Excepciones y patrón Factory",
        sections: [
          {
            heading: "Una excepción NO es un valor de retorno",
            body: "Devolver `false` o `null` cuando algo falla obliga a quien llama a adivinar qué pasó. Una excepción nombra el error y lo propaga hasta quien sepa manejarlo.\n\nCrea excepciones propias extendiendo `Exception`: el tipo ya comunica el problema.",
            code: `class CorruptionException extends Exception {}

public function resistir(int $tentacion): string {
    if ($tentacion > 80) {
        throw new CorruptionException('El Anillo lo reclama');
    }
    return 'resiste';
}`,
          },
          {
            heading: "try / catch / finally",
            body: "Captura sólo lo que sabes manejar. `finally` se ejecuta pase lo que pase — ideal para liberar recursos.\n\nRegla de oro: NO te tragues las excepciones con un catch vacío. Un error silenciado es un error que aparecerá más tarde y peor.",
            code: `try {
    return $solio->mirar($conAnillo);
} catch (VisionException $e) {
    return 'te quitas el Anillo: ' . $e->getMessage();
} finally {
    $solio->cerrar(); // siempre
}`,
          },
          {
            heading: "Factory: crear sin acoplarse al new",
            body: "Una fábrica centraliza la creación de objetos. Quien la usa pide «un uruk» y recibe algo que cumple el contrato, sin conocer la clase concreta.\n\nSi mañana cambia la implementación, sólo se toca la fábrica — Open/Closed otra vez.",
            code: `class FabricaDeHuestes {
    public static function crear(string $tipo): Guerrero {
        return match ($tipo) {
            'orco' => new Orco(),
            'uruk' => new UrukHai(),
            default => throw new InvalidArgumentException("Tipo desconocido: $tipo"),
        };
    }
}`,
          },
        ],
        keyTakeaway:
          "Lanza excepciones específicas y captúralas donde puedas hacer algo útil. Y cuando el `new` se repite por todas partes, es hora de una fábrica.",
      },
    },
    {
      node_id: "tentacion_de_boromir",
      title: "La Tentación de Boromir",
      lore_intro:
        "«Podríamos usarlo… ¡Dámelo!» El Anillo susurra al orgullo de Gondor. Cuando la voluntad no basta, hay que declarar el fallo por su nombre.",
      position: { x: 9, y: 8 },
      spriteId: "boromir",
      poo_challenge: {
        topic: "Excepciones propias (throw)",
        instructions:
          "Crea la excepción CorruptionException, que extienda Exception. Después crea Boromir con resistir(int $tentacion): string, que devuelva 'resiste' si la tentación es 80 o menos, y LANCE una CorruptionException con el mensaje 'El Anillo lo reclama' si es mayor que 80.",
        sut: "new Boromir()",
        starter_code: "<?php\n\nclass CorruptionException extends Exception {\n}\n\nclass Boromir {\n}\n",
        hints: [
          "Guard clause: if ($tentacion > 80) { throw new CorruptionException('El Anillo lo reclama'); }",
          "El mensaje se pasa al constructor de la excepción y se lee con getMessage().",
          "Si no lo lanzas, la prueba que espera la excepción fallará.",
        ],
        test_cases: [
          {
            input: "resistir(50)",
            expected: "resiste",
            description: "Con poca tentación, Boromir aguanta",
          },
          {
            input:
              "(function() { try { (new Boromir())->resistir(95); return false; } catch (CorruptionException $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "Con tentación 95 sucumbe: lanza CorruptionException",
          },
          {
            input:
              "(function() { try { (new Boromir())->resistir(95); return ''; } catch (CorruptionException $e) { return $e->getMessage(); } })()",
            raw: true,
            expected: "El Anillo lo reclama",
            description: "La excepción lleva su mensaje",
          },
          {
            input: "(new CorruptionException('x')) instanceof Exception",
            raw: true,
            expected: true,
            description: "Debe EXTENDER Exception",
          },
        ],
      },
    },
    {
      node_id: "solio_de_la_vision",
      title: "El Solio de la Visión",
      lore_intro:
        "Frodo sube a Amon Hen y se pone el Anillo. Desde el Solio ve reinos… y también el Ojo se vuelve hacia él. Ver de más tiene un precio: hay que saber recogerlo.",
      position: { x: 14, y: 4 },
      poo_challenge: {
        topic: "try / catch",
        instructions:
          "El Solio ya existe: mirar(bool $conAnillo) devuelve la visión, pero LANZA VisionException si miras con el Anillo puesto. Crea la función observar(Solio $s, bool $conAnillo): string, que capture esa excepción y devuelva 'te quitas el Anillo: ' seguido del mensaje de la excepción.",
        support_code:
          "class VisionException extends Exception {}\n\nclass Solio {\n    public function mirar(bool $conAnillo): string {\n        if ($conAnillo) {\n            throw new VisionException('El Ojo te ve');\n        }\n        return 'ves las tierras de Rohan';\n    }\n}",
        starter_code: "<?php\n\nfunction observar(Solio $s, bool $conAnillo): string {\n}\n",
        hints: [
          "Envuelve la llamada: try { return $s->mirar($conAnillo); } catch (VisionException $e) { … }",
          "Dentro del catch, compón el texto: return 'te quitas el Anillo: ' . $e->getMessage();",
          "Captura VisionException en concreto, no un Throwable genérico: captura sólo lo que sabes manejar.",
        ],
        test_cases: [
          {
            input: "observar(new Solio(), false)",
            expected: "ves las tierras de Rohan",
            description: "Sin el Anillo, la visión es segura",
          },
          {
            input: "observar(new Solio(), true)",
            expected: "te quitas el Anillo: El Ojo te ve",
            description: "Con el Anillo, capturas la excepción y reaccionas",
          },
        ],
      },
    },
    {
      node_id: "hueste_de_isengard",
      title: "La Hueste de Isengard",
      lore_intro:
        "Bajan por centenares. Los orcos comunes temen el sol; los Uruk-hai de Saruman marchan bajo él sin pestañear. No los crees uno a uno: monta una fábrica.",
      position: { x: 19, y: 8 },
      spriteId: "uruk",
      poo_challenge: {
        topic: "Patrón Factory",
        instructions:
          "Existen la interfaz Guerrero y las clases Orco (resistencia al sol 0) y UrukHai (100). Crea FabricaDeHuestes con el método ESTÁTICO crear(string $tipo): Guerrero, que devuelva un Orco para 'orco', un UrukHai para 'uruk', y lance InvalidArgumentException con cualquier otro tipo.",
        support_code:
          "interface Guerrero {\n    public function resistenciaSol(): int;\n}\n\nclass Orco implements Guerrero {\n    public function resistenciaSol(): int { return 0; }\n}\n\nclass UrukHai implements Guerrero {\n    public function resistenciaSol(): int { return 100; }\n}",
        starter_code: "<?php\n\nclass FabricaDeHuestes {\n}\n",
        hints: [
          "En PHP 8 queda muy limpio con match: return match ($tipo) { 'orco' => new Orco(), … };",
          "El caso por defecto lanza: default => throw new InvalidArgumentException(\"Tipo desconocido: $tipo\"),",
          "Devuelve el tipo de la INTERFAZ (Guerrero): quien llama no necesita saber la clase concreta.",
        ],
        test_cases: [
          {
            input: "FabricaDeHuestes::crear('orco')->resistenciaSol()",
            expected: 0,
            description: "El orco común se abrasa al sol",
          },
          {
            input: "FabricaDeHuestes::crear('uruk')->resistenciaSol()",
            expected: 100,
            description: "El Uruk-hai marcha a plena luz del día",
          },
          {
            input: "FabricaDeHuestes::crear('uruk') instanceof Guerrero",
            expected: true,
            description: "La fábrica devuelve algo que cumple el contrato",
          },
          {
            input:
              "(function() { try { FabricaDeHuestes::crear('elfo'); return false; } catch (\\InvalidArgumentException $e) { return true; } })()",
            raw: true,
            expected: true,
            description: "Un tipo desconocido no se inventa: se rechaza",
          },
        ],
      },
    },
  ],
};

/**
 * LIBRO II · El Camino del Arquitecto.
 * Capítulo avanzado: los cinco principios SOLID, enseñados con Pergaminos
 * antes de cada prueba. Pensado también como repaso de entrevista técnica.
 */
export const CHAPTER_SOLID: Chapter = {
  chapter: 9,
  title: { es: "La Biblioteca de Rivendel", en: "The Library of Rivendell" },
  lore: {
    es: "Elrond abre los archivos de Imladris. Entre pergaminos élficos se guardan los cinco principios que sostienen todo código que perdura: SOLID. Estúdialos antes de enfrentarte a las pruebas.",
    en: "Elrond opens the archives of Imladris. Among Elvish scrolls are kept the five principles that hold up all code that endures: SOLID. Study them before you face the trials.",
  },
  mapSize: { cols: 24, rows: 16 },
  spawn: { x: 2, y: 12 },
  scenery: {
    ground: "stone", // las terrazas de piedra de Imladris
    pathRows: [12],
    pathGround: "dry",
    pond: { x: 18, y: 13, w: 5, h: 3 }, // las cascadas del Bruinen
    decor: [
      { type: "tree", x: 4, y: 9 },
      { type: "tree", x: 9, y: 9 },
      { type: "tree", x: 14, y: 9 },
      { type: "tree", x: 19, y: 9 },
      { type: "tree", x: 2, y: 15 },
      { type: "tree", x: 11, y: 15 },
      { type: "house", x: 21, y: 6, label: { es: "Casa de Elrond", en: "House of Elrond" } },
      { type: "rock", x: 7, y: 6 },
      { type: "rock", x: 16, y: 6 },
    ],
  },
  nodes: [
    // ---------- Los cinco pergaminos ----------
    {
      node_id: "solid_s",
      kind: "scroll",
      title: { es: "Responsabilidad Única", en: "Single Responsibility" },
      lore_intro: {
        es: "El primer pergamino está escrito con letra menuda y ordenada, como si su autor odiara mezclar asuntos.",
        en: "The first scroll is written in small, orderly script, as if its author hated mixing concerns.",
      },
      position: { x: 3, y: 12 },
      scroll: {
        topic: "S — Single Responsibility",
        sections: [
          {
            heading: { es: "Una clase, una razón para cambiar", en: "One class, one reason to change" },
            body: {
              es: "Cada clase debe tener una sola responsabilidad. Si puedes describir lo que hace usando la palabra «y», probablemente hace demasiado.\n\nSepara la lógica de negocio, la persistencia y la presentación.",
              en: "Each class should have a single responsibility. If you can describe what it does using the word \"and\", it probably does too much.\n\nSeparate business logic, persistence and presentation.",
            },
          },
          {
            heading: { es: "En la práctica", en: "In practice" },
            body: {
              es: "Una factura no debería saber guardarse a sí misma NI enviarse por correo. Eso son tres razones para cambiar en una sola clase.",
              en: "An invoice shouldn't know how to save itself NOR email itself. That's three reasons to change in a single class.",
            },
            code: `// ❌ Hace demasiado
class Factura {
    public function calcularTotal(): int { /* … */ }
    public function guardar(): void { /* SQL */ }
    public function enviarPorEmail(): void { /* SMTP */ }
}

// ✅ Una responsabilidad cada una
class Factura { public function calcularTotal(): int { /* … */ } }
class FacturaRepository { public function guardar(Factura $f): void {} }
class FacturaMailer { public function enviar(Factura $f): void {} }`,
          },
        ],
        keyTakeaway: {
          es: "Si tu clase cambia por motivos distintos (negocio, base de datos, formato), divídela.",
          en: "If your class changes for different reasons (business, database, format), split it.",
        },
      },
    },
    {
      node_id: "solid_o",
      kind: "scroll",
      title: { es: "Abierto/Cerrado", en: "Open/Closed" },
      lore_intro: {
        es: "El segundo pergamino tiene los bordes gastados: muchas manos lo consultaron antes de tocar código que ya funcionaba.",
        en: "The second scroll has worn edges: many hands consulted it before touching code that already worked.",
      },
      position: { x: 7, y: 14 },
      scroll: {
        topic: "O — Open/Closed",
        sections: [
          {
            heading: { es: "Abierto a extensión, cerrado a modificación", en: "Open to extension, closed to modification" },
            body: {
              es: "Deberías poder añadir comportamiento nuevo SIN editar el código existente. Cada vez que añades un `if` más a un `switch` gigante, estás violando este principio.\n\nLa herramienta habitual es una interfaz + una clase nueva por cada variante.",
              en: "You should be able to add new behavior WITHOUT editing existing code. Every time you add one more `if` to a giant `switch`, you're violating this principle.\n\nThe usual tool is an interface + a new class per variant.",
            },
          },
          {
            heading: { es: "En la práctica", en: "In practice" },
            body: {
              es: "Añadir un descuento nuevo debe ser crear una clase, no tocar el carrito.",
              en: "Adding a new discount should mean creating a class, not touching the cart.",
            },
            code: `interface Descuento {
    public function aplicar(int $total): int;
}

class ViernesNegro implements Descuento {
    public function aplicar(int $total): int { return (int)($total * 0.7); }
}

// Añadir otro descuento = otra clase. El carrito NO se toca.`,
          },
        ],
        keyTakeaway: {
          es: "Extiende con clases nuevas, no editando las que ya funcionan y están probadas.",
          en: "Extend with new classes, not by editing those that already work and are tested.",
        },
      },
    },
    {
      node_id: "solid_l",
      kind: "scroll",
      title: { es: "Sustitución de Liskov", en: "Liskov Substitution" },
      lore_intro: {
        es: "El tercer pergamino advierte sobre herencias engañosas: no todo lo que se parece puede ocupar el mismo lugar.",
        en: "The third scroll warns of deceptive inheritance: not everything that looks alike can take the same place.",
      },
      position: { x: 11, y: 12 },
      scroll: {
        topic: "L — Liskov Substitution",
        sections: [
          {
            heading: { es: "Una subclase debe poder sustituir a su base", en: "A subclass must be able to replace its base" },
            body: {
              es: "Si tu código espera un `Ave` y le das un `Pinguino`, no debe romperse. Cuando una subclase no puede cumplir el contrato del padre, el modelo está mal — no la subclase.",
              en: "If your code expects a `Bird` and you give it a `Penguin`, it must not break. When a subclass can't fulfill the parent's contract, the model is wrong — not the subclass.",
            },
          },
          {
            heading: { es: "El error clásico", en: "The classic mistake" },
            body: {
              es: "Si `Ave` obliga a `volar()`, el pingüino te obliga a lanzar una excepción o devolver algo falso. La solución no es un parche: es corregir la abstracción.",
              en: "If `Bird` forces `fly()`, the penguin forces you to throw an exception or return something false. The fix isn't a patch: it's correcting the abstraction.",
            },
            code: `// ❌ El pingüino no puede cumplir el contrato
abstract class Ave { abstract public function volar(): string; }

// ✅ Abstrae lo que TODAS comparten
abstract class Ave { abstract public function moverse(): string; }
class Aguila  extends Ave { public function moverse(): string { return 'vuela'; } }
class Pinguino extends Ave { public function moverse(): string { return 'nada'; } }`,
          },
        ],
        keyTakeaway: {
          es: "Si necesitas comprobar el tipo concreto antes de usar un objeto, tu jerarquía viola Liskov.",
          en: "If you need to check the concrete type before using an object, your hierarchy violates Liskov.",
        },
      },
    },
    {
      node_id: "solid_i",
      kind: "scroll",
      title: { es: "Segregación de Interfaces", en: "Interface Segregation" },
      lore_intro: {
        es: "El cuarto pergamino es en realidad varios pergaminos pequeños, atados juntos. El mensaje es el propio formato.",
        en: "The fourth scroll is really several small scrolls tied together. The message is the format itself.",
      },
      position: { x: 15, y: 14 },
      scroll: {
        topic: "I — Interface Segregation",
        sections: [
          {
            heading: { es: "Muchas interfaces pequeñas > una gorda", en: "Many small interfaces > one fat one" },
            body: {
              es: "Ningún cliente debería verse obligado a implementar métodos que no usa. Una interfaz enorme obliga a llenar clases de métodos vacíos o que lanzan excepciones.",
              en: "No client should be forced to implement methods it doesn't use. A huge interface forces you to fill classes with empty methods or ones that throw exceptions.",
            },
          },
          {
            heading: { es: "En la práctica", en: "In practice" },
            body: {
              es: "Divide por capacidad, no por entidad.",
              en: "Split by capability, not by entity.",
            },
            code: `// ❌ Interfaz gorda: un lector se ve obligado a implementar escribir()
interface Almacen {
    public function leer(string $id): string;
    public function escribir(string $id, string $v): void;
    public function borrar(string $id): void;
}

// ✅ Segregada por capacidad
interface Lector   { public function leer(string $id): string; }
interface Escritor { public function escribir(string $id, string $v): void; }`,
          },
        ],
        keyTakeaway: {
          es: "Si al implementar una interfaz dejas métodos vacíos, esa interfaz debería ser varias.",
          en: "If implementing an interface leaves you with empty methods, that interface should be several.",
        },
      },
    },
    {
      node_id: "solid_d",
      kind: "scroll",
      title: { es: "Inversión de Dependencias", en: "Dependency Inversion" },
      lore_intro: {
        es: "El último pergamino lleva el sello de los arquitectos. Es el que más veces citan en las entrevistas… y el corazón de Symfony.",
        en: "The last scroll bears the architects' seal. It's the one most cited in interviews… and the heart of Symfony.",
      },
      position: { x: 19, y: 12 },
      scroll: {
        topic: "D — Dependency Inversion",
        sections: [
          {
            heading: { es: "Depende de abstracciones, no de implementaciones", en: "Depend on abstractions, not implementations" },
            body: {
              es: "Una clase no debe crear sus dependencias con `new`: debe recibirlas desde fuera, tipadas como INTERFAZ. Eso reduce el acoplamiento y — lo más importante — hace el código testeable, porque puedes inyectar un mock.",
              en: "A class shouldn't create its dependencies with `new`: it should receive them from outside, typed as an INTERFACE. That reduces coupling and — most importantly — makes the code testable, because you can inject a mock.",
            },
          },
          {
            heading: { es: "En la práctica", en: "In practice" },
            body: {
              es: "Inyección por constructor: la base del contenedor de servicios de Symfony.",
              en: "Constructor injection: the basis of Symfony's service container.",
            },
            code: `// ❌ Acoplado a Stripe para siempre
class ServicioPedido {
    public function __construct() { $this->gateway = new StripeGateway(); }
}

// ✅ Recibe la abstracción
class ServicioPedido {
    public function __construct(private PasarelaPago $gateway) {}
}`,
          },
        ],
        keyTakeaway: {
          es: "«Para hacerlo testeable, inyecto la dependencia en vez de instanciarla.» — dilo así en la entrevista.",
          en: "\"To make it testable, I inject the dependency instead of instantiating it.\" — say it like that in the interview.",
        },
      },
    },

    // ---------- Las tres pruebas ----------
    {
      node_id: "prueba_open_closed",
      title: { es: "La Prueba del Herrero", en: "The Smith's Trial" },
      lore_intro: {
        es: "«Los enanos de Erebor no reforjan la espada cada vez que inventan una gema», dice Elrond. «Le añaden un engarce nuevo.» Extiende sin modificar.",
        en: "\"The dwarves of Erebor don't reforge the sword every time they invent a gem,\" says Elrond. \"They add a new setting.\" Extend without modifying.",
      },
      position: { x: 6, y: 5 },
      poo_challenge: {
        topic: "SOLID · Open/Closed",
        instructions: {
          es: "Ya existen la interfaz Descuento y la clase Carrito (que NO debes tocar). Crea DescuentoElfico, que implemente Descuento y aplique un 30% de rebaja: devuelve el 70% del total, redondeado a entero con (int).",
          en: "The interface Descuento and the class Carrito already exist (do NOT touch them). Create DescuentoElfico, which implements Descuento and applies a 30% discount: return 70% of the total, rounded to an integer with (int).",
        },
        sut: "new Carrito()",
        support_code:
          "interface Descuento {\n    public function aplicar(int $total): int;\n}\n\nclass Carrito {\n    public function total(int $base, Descuento $d): int {\n        return $d->aplicar($base);\n    }\n}",
        starter_code: "<?php\n\nclass DescuentoElfico {\n}\n",
        hints: [
          { es: "Para implementar un contrato: class DescuentoElfico implements Descuento { … }", en: "To implement a contract: class DescuentoElfico implements Descuento { … }" },
          { es: "El método debe llamarse igual que en la interfaz: aplicar(int $total): int", en: "The method must be named as in the interface: aplicar(int $total): int" },
          { es: "70% del total, redondeado: return (int)($total * 0.7);", en: "70% of the total, rounded: return (int)($total * 0.7);" },
        ],
        test_cases: [
          {
            input: "total(100, new DescuentoElfico())",
            expected: 70,
            description: { es: "El carrito usa el descuento sin conocerlo", en: "The cart uses the discount without knowing it" },
          },
          {
            input: "total(250, new DescuentoElfico())",
            expected: 175,
            description: { es: "Funciona con cualquier importe", en: "Works with any amount" },
          },
          {
            input: "(new DescuentoElfico()) instanceof Descuento",
            raw: true,
            expected: true,
            description: { es: "Debe IMPLEMENTAR la interfaz Descuento", en: "Must IMPLEMENT the Descuento interface" },
          },
        ],
      },
    },
    {
      node_id: "prueba_liskov",
      title: { es: "El Aviario de Elrond", en: "Elrond's Aviary" },
      lore_intro: {
        es: "En las jaulas hay un águila y un pingüino traído del lejano Sur. Ambos son aves… pero sólo uno vuela. Corrige la abstracción.",
        en: "In the cages are an eagle and a penguin brought from the far South. Both are birds… but only one flies. Correct the abstraction.",
      },
      position: { x: 12, y: 5 },
      poo_challenge: {
        topic: "SOLID · Liskov Substitution",
        instructions: {
          es: "La clase abstracta Ave exige moverse(): string (no volar(), que el pingüino no podría cumplir). Crea Aguila y Pinguino que hereden de Ave: el águila devuelve 'vuela' y el pingüino 'nada'. Así ambos son sustituibles donde se espera un Ave.",
          en: "The abstract class Ave requires moverse(): string (not volar(), which the penguin couldn't fulfill). Create Aguila and Pinguino that extend Ave: the eagle returns 'vuela' and the penguin 'nada'. That way both are substitutable where an Ave is expected.",
        },
        support_code:
          "abstract class Ave {\n    abstract public function moverse(): string;\n}",
        starter_code: "<?php\n\nclass Aguila {\n}\n\nclass Pinguino {\n}\n",
        hints: [
          { es: "Ambas deben heredar: class Aguila extends Ave { … }", en: "Both must extend: class Aguila extends Ave { … }" },
          { es: "Implementa moverse() en cada una devolviendo 'vuela' y 'nada'.", en: "Implement moverse() in each returning 'vuela' and 'nada'." },
          { es: "La clave de Liskov: las dos cumplen el MISMO contrato, así que el código que recibe un Ave funciona con cualquiera.", en: "The key to Liskov: both fulfill the SAME contract, so code receiving an Ave works with either." },
        ],
        test_cases: [
          {
            input: "(new Aguila())->moverse()",
            raw: true,
            expected: "vuela",
            description: { es: "El águila vuela", en: "The eagle flies" },
          },
          {
            input: "(new Pinguino())->moverse()",
            raw: true,
            expected: "nada",
            description: { es: "El pingüino nada (y no rompe nada)", en: "The penguin swims (and breaks nothing)" },
          },
          {
            input:
              "array_map(fn(Ave $a) => $a->moverse(), [new Aguila(), new Pinguino()])",
            raw: true,
            expected: ["vuela", "nada"],
            description: { es: "Ambas son sustituibles donde se espera un Ave — eso es Liskov", en: "Both are substitutable where an Ave is expected — that's Liskov" },
          },
        ],
      },
    },
    {
      node_id: "prueba_inversion",
      title: { es: "El Contrato del Concilio", en: "The Council's Contract" },
      lore_intro: {
        es: "«No jures lealtad a un hombre», advierte Gandalf, «sino a la causa.» No dependas de una implementación concreta: depende del contrato.",
        en: "\"Do not swear loyalty to a man,\" Gandalf warns, \"but to the cause.\" Don't depend on a concrete implementation: depend on the contract.",
      },
      position: { x: 18, y: 5 },
      poo_challenge: {
        topic: "SOLID · Dependency Inversion",
        instructions: {
          es: "Existen la interfaz Pasarela y una implementación PasarelaOro. Crea ServicioPedido que RECIBA una Pasarela por constructor (tipada como la interfaz, nunca con new dentro) y cuyo método pagar(int $monto): string delegue en ella.",
          en: "The interface Pasarela and an implementation PasarelaOro exist. Create ServicioPedido that RECEIVES a Pasarela via its constructor (typed as the interface, never with new inside) and whose method pagar(int $monto): string delegates to it.",
        },
        sut: "new ServicioPedido(new PasarelaOro())",
        support_code:
          "interface Pasarela {\n    public function cobrar(int $monto): string;\n}\n\nclass PasarelaOro implements Pasarela {\n    public function cobrar(int $monto): string {\n        return \"cobrado {$monto} en oro\";\n    }\n}\n\nclass PasarelaPlata implements Pasarela {\n    public function cobrar(int $monto): string {\n        return \"cobrado {$monto} en plata\";\n    }\n}",
        starter_code: "<?php\n\nclass ServicioPedido {\n\n}\n",
        hints: [
          { es: "Inyección por constructor: public function __construct(private Pasarela $pasarela) {}", en: "Constructor injection: public function __construct(private Pasarela $pasarela) {}" },
          { es: "Tipa el parámetro con la INTERFAZ (Pasarela), no con PasarelaOro.", en: "Type the parameter with the INTERFACE (Pasarela), not with PasarelaOro." },
          { es: "pagar() sólo delega: return $this->pasarela->cobrar($monto);", en: "pagar() just delegates: return $this->pasarela->cobrar($monto);" },
        ],
        test_cases: [
          {
            input: "pagar(50)",
            expected: "cobrado 50 en oro",
            description: { es: "Delega en la pasarela recibida", en: "Delegates to the received gateway" },
          },
          {
            input: "(new ServicioPedido(new PasarelaPlata()))->pagar(20)",
            raw: true,
            expected: "cobrado 20 en plata",
            description: { es: "La misma clase funciona con OTRA implementación: eso es invertir la dependencia", en: "The same class works with ANOTHER implementation: that's inverting the dependency" },
          },
        ],
      },
    },
  ],
};

/**
 * LIBRO III · Los Acertijos Antiguos.
 * Práctica cronometrada de algoritmos clásicos en PHP (estilo test técnico).
 * Cada reto es una FUNCIÓN suelta: no hay objeto, se llama directamente.
 */
export const CHAPTER_ALGOS: Chapter = {
  chapter: 10,
  title: { es: "La Cámara de los Enigmas", en: "The Chamber of Riddles" },
  lore: {
    es: "Bajo las raíces del mundo, los Enanos labraron una sala donde cada puerta guarda un acertijo distinto. Aquí no valen los conjuros: sólo el algoritmo correcto, y el reloj corre.",
    en: "Beneath the roots of the world, the Dwarves carved a hall where each door holds a different riddle. Spells are useless here: only the right algorithm, and the clock is ticking.",
  },
  mapSize: { cols: 24, rows: 14 },
  spawn: { x: 2, y: 7 },
  scenery: {
    ground: "stone",
    pathRows: [7],
    pathGround: "darkstone",
    pond: { x: 20, y: 10, w: 4, h: 4 },
    pondGround: "lava",
    decor: [
      { type: "rock", x: 5, y: 4 },
      { type: "rock", x: 9, y: 4 },
      { type: "rock", x: 13, y: 4 },
      { type: "rock", x: 17, y: 4 },
      { type: "rock", x: 5, y: 11 },
      { type: "rock", x: 9, y: 11 },
      { type: "rock", x: 13, y: 11 },
      { type: "rock", x: 17, y: 11 },
    ],
  },
  nodes: [
    {
      node_id: "pergamino_bigo",
      kind: "scroll",
      title: { es: "El Pergamino de los Órdenes", en: "The Scroll of Orders" },
      lore_intro: {
        es: "Una losa grabada en la entrada de la cámara. No dice cómo resolver los acertijos: dice cómo RECONOCERLOS.",
        en: "A slab carved at the chamber's entrance. It doesn't say how to solve the riddles: it says how to RECOGNIZE them.",
      },
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Big-O y los patrones de algoritmos",
        sections: [
          {
            heading: { es: "Complejidad: cómo crece el coste", en: "Complexity: how cost grows" },
            body: {
              es: "O(1) constante — acceso por índice, lookup en hash.\nO(log n) — búsqueda binaria sobre datos ordenados.\nO(n) — recorrer una vez.\nO(n log n) — ordenaciones eficientes.\nO(n²) — doble bucle anidado (evítalo si puedes).\nO(2ⁿ) — fuerza bruta recursiva.\n\nDi siempre la complejidad de TIEMPO y de ESPACIO al terminar.",
              en: "O(1) constant — index access, hash lookup.\nO(log n) — binary search over sorted data.\nO(n) — a single pass.\nO(n log n) — efficient sorts.\nO(n²) — nested double loop (avoid it if you can).\nO(2ⁿ) — recursive brute force.\n\nAlways state the TIME and SPACE complexity when you finish.",
            },
          },
          {
            heading: { es: "Los 7 patrones que resuelven casi todo", en: "The 7 patterns that solve almost everything" },
            body: {
              es: "Hash map → «¿visto antes / cuántas veces / duplicados?»\nDos punteros → array ordenado, trabajar desde los extremos.\nVentana deslizante → el mejor subarray/substring.\nBúsqueda binaria → ordenado, «encuentra el límite».\nRecursión / backtracking → combinaciones, permutaciones.\nBFS / DFS → grafo, árbol, grilla.\nProgramación dinámica → «mínimo/máximo/cuántas formas» con subproblemas.",
              en: "Hash map → \"seen before / how many times / duplicates?\"\nTwo pointers → sorted array, work from the ends.\nSliding window → the best subarray/substring.\nBinary search → sorted, \"find the boundary\".\nRecursion / backtracking → combinations, permutations.\nBFS / DFS → graph, tree, grid.\nDynamic programming → \"min/max/how many ways\" with subproblems.",
            },
          },
          {
            heading: { es: "Cómo narrarlo (cuenta tanto como el código)", en: "How to narrate it (it counts as much as the code)" },
            body: {
              es: "1. Reformula el enunciado y confirma los casos borde (vacío, negativos, duplicados).\n2. Di la fuerza bruta y su Big-O.\n3. Optimiza — casi siempre un hash map o dos punteros bajan de O(n²) a O(n).\n4. Codifica hablando.\n5. Prueba con un ejemplo pequeño.\n6. Cierra diciendo la complejidad final.",
              en: "1. Restate the problem and confirm the edge cases (empty, negatives, duplicates).\n2. State the brute force and its Big-O.\n3. Optimize — a hash map or two pointers almost always drops O(n²) to O(n).\n4. Code while talking.\n5. Test with a small example.\n6. Close by stating the final complexity.",
            },
          },
        ],
        keyTakeaway: {
          es: "Una solución correcta lenta vale más que una óptima sin terminar. Fuerza bruta primero si te bloqueas; optimiza después si queda tiempo.",
          en: "A correct slow solution beats an optimal unfinished one. Brute force first if you're stuck; optimize later if there's time.",
        },
      },
    },
    {
      node_id: "algo_two_sum",
      title: { es: "El Acertijo de los Dos Anillos", en: "The Riddle of the Two Rings" },
      lore_intro: {
        es: "Dos gemas de la colección suman exactamente el peso grabado en la puerta. Encuéntralas — pero sólo puedes recorrer el cofre una vez.",
        en: "Two gems from the collection add up to exactly the weight carved on the door. Find them — but you may only go through the chest once.",
      },
      position: { x: 7, y: 7 },
      poo_challenge: {
        topic: "Hash map · O(n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa twoSum(array $nums, int $target): array, que devuelva los ÍNDICES de los dos números que suman el objetivo. Hay exactamente una solución y no puedes usar el mismo elemento dos veces.",
          en: "Given an array of integers and a target, return the indices of the two numbers that add up to the target. Exactly one solution; you can't use the same element twice. Implement twoSum(array $nums, int $target): array.",
        },
        starter_code: "<?php\n\nfunction twoSum(array $nums, int $target): array {\n}\n",
        hints: [
          { es: "Guarda cada valor visto en un hash map valor => índice.", en: "Store each seen value in a hash map value => index." },
          { es: "Para cada número busca su complemento: $need = $target - $n; si ya lo viste, ahí está la pareja.", en: "For each number look for its complement: $need = $target - $n; if you've seen it, there's the pair." },
          { es: "isset($seen[$need]) es O(1): por eso el total queda en O(n) tiempo y O(n) espacio.", en: "isset($seen[$need]) is O(1): that's why the total is O(n) time and O(n) space." },
        ],
        test_cases: [
          { input: "twoSum([2, 7, 11, 15], 9)", expected: [0, 1], description: "2 + 7 = 9" },
          { input: "twoSum([3, 2, 4], 6)", expected: [1, 2], description: "2 + 4 = 6" },
          { input: "twoSum([3, 3], 6)", expected: [0, 1], description: { es: "Valores repetidos, índices distintos", en: "Repeated values, distinct indices" } },
        ],
      },
    },
    {
      node_id: "algo_palindromo",
      title: { es: "La Runa que se Lee al Revés", en: "The Rune Read Backwards" },
      lore_intro: {
        es: "La inscripción dice lo mismo empezando por cualquiera de sus extremos… si ignoras los adornos y no distingues el tamaño de las letras.",
        en: "The inscription reads the same from either end… if you ignore the flourishes and don't distinguish letter case.",
      },
      position: { x: 11, y: 7 },
      poo_challenge: {
        topic: "Dos punteros · O(n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa isPalindrome(string $s): bool. Devuelve true si la cadena es un palíndromo, contando sólo los caracteres alfanuméricos y sin distinguir mayúsculas.",
          en: "Return true if a string is a palindrome, considering only alphanumeric characters and ignoring case. Implement isPalindrome(string $s): bool.",
        },
        starter_code: "<?php\n\nfunction isPalindrome(string $s): bool {\n}\n",
        hints: [
          { es: "Normaliza primero: pásalo a minúsculas con strtolower().", en: "Normalize first: lowercase it with strtolower()." },
          { es: "Quita todo lo que no sea alfanumérico: preg_replace('/[^a-z0-9]/', '', $s)", en: "Strip everything non-alphanumeric: preg_replace('/[^a-z0-9]/', '', $s)" },
          { es: "Y compara con su reverso: return $s === strrev($s);", en: "And compare with its reverse: return $s === strrev($s);" },
        ],
        test_cases: [
          {
            input: "isPalindrome('A man, a plan, a canal: Panama')",
            expected: true,
            description: { es: "Ignorando comas, espacios y mayúsculas, sí lo es", en: "Ignoring commas, spaces and case, it is" },
          },
          { input: "isPalindrome('race a car')", expected: false, description: { es: "No lo es", en: "It isn't" } },
          { input: "isPalindrome('')", expected: true, description: { es: "La cadena vacía es palíndromo", en: "The empty string is a palindrome" } },
        ],
      },
    },
    {
      node_id: "algo_parentesis",
      title: { es: "Las Puertas Anidadas", en: "The Nested Gates" },
      lore_intro: {
        es: "Un pasillo de arcos que se abren y se cierran. Cada arco debe cerrarse con su pareja, y en el orden correcto: el último en abrirse es el primero en cerrarse.",
        en: "A corridor of arches that open and close. Each arch must close with its match, and in the right order: the last to open is the first to close.",
      },
      position: { x: 15, y: 7 },
      poo_challenge: {
        topic: "Pila (LIFO) · O(n)",
        timeLimitSec: 900,
        instructions: {
          es: "Implementa isValidParens(string $s): bool. Dada una cadena de ()[]{} , devuelve true si los símbolos están bien balanceados Y bien anidados.",
          en: "Given a string of ()[]{} , return true if every bracket is correctly opened and closed in order. Implement isValidParens(string $s): bool.",
        },
        starter_code: "<?php\n\nfunction isValidParens(string $s): bool {\n}\n",
        hints: [
          { es: "Usa un array como pila: $stack[] = $c para apilar, array_pop($stack) para sacar.", en: "Use an array as a stack: $stack[] = $c to push, array_pop($stack) to pop." },
          { es: "Ten un mapa de cierres a aperturas: [')' => '(', ']' => '[', '}' => '{']", en: "Keep a map of closers to openers: [')' => '(', ']' => '[', '}' => '{']" },
          { es: "Al cerrar, la cima debe ser la pareja correcta; y al final la pila debe quedar VACÍA.", en: "On closing, the top must be the right match; and at the end the stack must be EMPTY." },
        ],
        test_cases: [
          { input: "isValidParens('()[]{}')", expected: true, description: { es: "Todos cierran bien", en: "All close correctly" } },
          { input: "isValidParens('(]')", expected: false, description: { es: "Pareja incorrecta", en: "Wrong pair" } },
          { input: "isValidParens('([{}])')", expected: true, description: { es: "Bien anidados", en: "Properly nested" } },
          { input: "isValidParens('(')", expected: false, description: { es: "Queda uno sin cerrar", en: "One left unclosed" } },
        ],
      },
    },
    {
      node_id: "algo_binaria",
      title: { es: "El Índice de Mazarbul", en: "The Index of Mazarbul" },
      lore_intro: {
        es: "El libro está ordenado. Buscar página por página sería una locura: abre por la mitad y descarta media biblioteca en cada paso.",
        en: "The book is sorted. Searching page by page would be madness: open it in the middle and discard half the library each step.",
      },
      position: { x: 19, y: 7 },
      poo_challenge: {
        topic: "Búsqueda binaria · O(log n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa binarySearch(array $a, int $t): int sobre un array YA ordenado. Devuelve el índice, o -1 si no está.",
          en: "Given a sorted array and a target, return its index or -1 if not present. Implement binarySearch(array $a, int $t): int over an ALREADY sorted array.",
        },
        starter_code: "<?php\n\nfunction binarySearch(array $a, int $t): int {\n}\n",
        hints: [
          { es: "Empieza con $lo = 0 y $hi = count($a) - 1; el bucle va mientras $lo <= $hi.", en: "Start with $lo = 0 and $hi = count($a) - 1; loop while $lo <= $hi." },
          { es: "El medio con división entera: $mid = intdiv($lo + $hi, 2);", en: "The middle with integer division: $mid = intdiv($lo + $hi, 2);" },
          { es: "Si $a[$mid] < $t mueve $lo = $mid + 1; si no, $hi = $mid - 1. Cuidado con el <= del bucle.", en: "If $a[$mid] < $t move $lo = $mid + 1; otherwise $hi = $mid - 1. Mind the <= in the loop." },
        ],
        test_cases: [
          { input: "binarySearch([1, 3, 5, 7, 9], 7)", expected: 3, description: { es: "Está en el índice 3", en: "It's at index 3" } },
          { input: "binarySearch([1, 3, 5, 7, 9], 4)", expected: -1, description: { es: "No está", en: "Not present" } },
          { input: "binarySearch([], 1)", expected: -1, description: { es: "Array vacío: caso borde", en: "Empty array: edge case" } },
          { input: "binarySearch([5], 5)", expected: 0, description: { es: "Un solo elemento", en: "A single element" } },
        ],
      },
    },
    {
      node_id: "algo_monedas",
      title: { es: "El Tesoro de Thrór", en: "The Hoard of Thrór" },
      lore_intro: {
        es: "Debes pagar una cifra exacta con las monedas enanas disponibles, usando las MENOS posibles. Cada monto se apoya en montos ya resueltos: no recalcules lo que ya sabes.",
        en: "You must pay an exact sum with the available dwarven coins, using AS FEW as possible. Each amount builds on amounts already solved: don't recompute what you already know.",
      },
      position: { x: 12, y: 11 },
      poo_challenge: {
        topic: "Programación dinámica · O(monto × monedas)",
        timeLimitSec: 1500,
        instructions: {
          es: "Implementa coinChange(array $coins, int $amount): int — el mínimo número de monedas para formar el monto, o -1 si no se puede.",
          en: "Given coin denominations and an amount, return the fewest coins needed to make that amount, or -1 if impossible. Implement coinChange(array $coins, int $amount): int.",
        },
        starter_code: "<?php\n\nfunction coinChange(array $coins, int $amount): int {\n}\n",
        hints: [
          { es: "Crea el array dp de tamaño $amount + 1 lleno de un valor 'infinito' ($amount + 1), y dp[0] = 0.", en: "Create the dp array of size $amount + 1 filled with an 'infinite' value ($amount + 1), and dp[0] = 0." },
          { es: "Para cada monto $a, prueba cada moneda $c que quepa: $dp[$a] = min($dp[$a], $dp[$a - $c] + 1);", en: "For each amount $a, try each coin $c that fits: $dp[$a] = min($dp[$a], $dp[$a - $c] + 1);" },
          { es: "Al final, si dp[$amount] sigue siendo mayor que $amount es que no se podía: devuelve -1.", en: "At the end, if dp[$amount] is still greater than $amount it wasn't possible: return -1." },
        ],
        test_cases: [
          { input: "coinChange([1, 2, 5], 11)", expected: 3, description: "5 + 5 + 1 = 11" },
          { input: "coinChange([2], 3)", expected: -1, description: { es: "Imposible con monedas de 2", en: "Impossible with coins of 2" } },
          { input: "coinChange([1], 0)", expected: 0, description: { es: "Monto 0: cero monedas", en: "Amount 0: zero coins" } },
          { input: "coinChange([1, 3, 4], 6)", expected: 2, description: "3 + 3, no 4 + 1 + 1" },
        ],
      },
    },
  ],
};

/**
 * LIBRO III (continuación) · El Laberinto de los Ecos.
 * Segundo bloque de algoritmos: ventana deslizante, memoización, listas
 * enlazadas y recorrido en grilla — los patrones que faltaban.
 */
export const CHAPTER_ALGOS_2: Chapter = {
  chapter: 11,
  title: { es: "El Laberinto de los Ecos", en: "The Labyrinth of Echoes" },
  lore: {
    es: "Más hondo aún, un dédalo de galerías donde cada eco repite un problema distinto. Los Enanos grabaron el camino en oro: quien reconoce el patrón, sale; quien improvisa, se pierde.",
    en: "Deeper still, a maze of galleries where each echo repeats a different problem. The Dwarves carved the path in gold: whoever recognizes the pattern gets out; whoever improvises gets lost.",
  },
  mapSize: { cols: 24, rows: 14 },
  spawn: { x: 2, y: 7 },
  scenery: {
    ground: "darkstone",
    pathRows: [7],
    pathGround: "gold", // el camino de runas doradas
    pond: { x: 20, y: 11, w: 4, h: 3 },
    decor: [
      { type: "rock", x: 6, y: 4 },
      { type: "rock", x: 9, y: 11 },
      { type: "rock", x: 14, y: 4 },
      { type: "rock", x: 15, y: 12 },
      { type: "rock", x: 18, y: 6 },
      { type: "rock", x: 22, y: 4 },
      { type: "rock", x: 4, y: 12 },
    ],
  },
  nodes: [
    {
      node_id: "pergamino_estructuras",
      kind: "scroll",
      title: { es: "El Pergamino de las Estructuras", en: "The Scroll of Structures" },
      lore_intro: {
        es: "Una placa de bronce clavada a la roca. Es un índice: qué herramienta coger según lo que pida el eco.",
        en: "A bronze plate nailed to the rock. It's an index: which tool to grab depending on what the echo asks for.",
      },
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Estructuras de datos y cuándo usarlas",
        sections: [
          {
            heading: { es: "El array de PHP es dos cosas a la vez", en: "PHP's array is two things at once" },
            body: {
              es: "En PHP, `array` es lista Y tabla hash. Buscar por clave con `isset($a[$k])` es O(1) — por eso es el caballo de batalla.\n\nSi ves «¿existe / cuántas veces / visto antes?», la respuesta casi siempre es un hash map.",
              en: "In PHP, `array` is a list AND a hash table. Looking up by key with `isset($a[$k])` is O(1) — that's why it's the workhorse.\n\nIf you see \"does it exist / how many times / seen before?\", the answer is almost always a hash map.",
            },
          },
          {
            heading: { es: "Pila, cola y punteros", en: "Stack, queue and pointers" },
            body: {
              es: "Pila (LIFO): `$s[] = $x` para apilar, `array_pop($s)` para sacar. Sirve para anidamiento y para deshacer.\nCola (FIFO): `array_shift()` saca por delante — es la base de BFS.\nListas enlazadas: no hay índices, sólo referencias. Se recorren con tres punteros: anterior, actual y siguiente.",
              en: "Stack (LIFO): `$s[] = $x` to push, `array_pop($s)` to pop. Good for nesting and undo.\nQueue (FIFO): `array_shift()` takes from the front — the basis of BFS.\nLinked lists: no indices, only references. Walked with three pointers: previous, current and next.",
            },
            code: `// Invertir una lista enlazada: guarda, apunta atrás, avanza
$prev = null;
while ($head) {
    $next = $head->next;
    $head->next = $prev;
    $prev = $head;
    $head = $next;
}
return $prev;`,
          },
          {
            heading: { es: "Árboles y grillas: el mismo recorrido", en: "Trees and grids: the same traversal" },
            body: {
              es: "Un árbol y una grilla se recorren igual: visitas, marcas y sigues a los vecinos.\n\nDFS (en profundidad) se escribe solo con recursión. BFS (en anchura) necesita una cola y te da el camino más corto en grafos sin pesos.\n\nTruco clásico en grillas: al visitar una celda, **márcala** (por ejemplo poniéndola a '0') para no volver a contarla.",
              en: "A tree and a grid are traversed the same way: visit, mark, and follow the neighbors.\n\nDFS (depth-first) practically writes itself with recursion. BFS (breadth-first) needs a queue and gives you the shortest path in unweighted graphs.\n\nClassic grid trick: when you visit a cell, **mark it** (e.g. setting it to '0') so you don't count it again.",
            },
          },
          {
            heading: { es: "Memoización: no repitas trabajo", en: "Memoization: don't repeat work" },
            body: {
              es: "Si una recursión recalcula los mismos subproblemas, guarda el resultado en un array y reutilízalo. Eso convierte O(2ⁿ) en O(n).\n\nEs la puerta de entrada a la programación dinámica.",
              en: "If a recursion recomputes the same subproblems, store the result in an array and reuse it. That turns O(2ⁿ) into O(n).\n\nIt's the gateway to dynamic programming.",
            },
            code: `function fib(int $n, array &$memo = []): int {
    if ($n < 2) return $n;
    return $memo[$n] ??= fib($n-1, $memo) + fib($n-2, $memo);
}`,
          },
        ],
        keyTakeaway: {
          es: "Reconoce el patrón antes de escribir: conteo → hash; ordenado → dos punteros o binaria; mejor subarray → ventana; grafo/grilla → DFS/BFS; subproblemas repetidos → memoización.",
          en: "Recognize the pattern before you write: counting → hash; sorted → two pointers or binary; best subarray → window; graph/grid → DFS/BFS; repeated subproblems → memoization.",
        },
      },
    },
    {
      node_id: "algo_anagramas",
      title: { es: "Los Ecos Gemelos", en: "The Twin Echoes" },
      lore_intro: {
        es: "Varias inscripciones distintas resuenan igual: usan exactamente las mismas runas, sólo que en otro orden. Agrúpalas.",
        en: "Several different inscriptions resonate the same: they use exactly the same runes, only in another order. Group them.",
      },
      position: { x: 7, y: 7 },
      poo_challenge: {
        topic: "Hash map · O(n·k log k)",
        timeLimitSec: 1200,
        instructions: {
          es: "Implementa groupAnagrams(array $strs): array, que agrupe las palabras que son anagramas entre sí. El orden de los grupos no importa.",
          en: "Given an array of strings, group the anagrams together. Return a list of groups (order doesn't matter). Implement groupAnagrams(array $strs): array.",
        },
        starter_code: "<?php\n\nfunction groupAnagrams(array $strs): array {\n}\n",
        hints: [
          { es: "Dos anagramas comparten las MISMAS letras ordenadas: esa es la clave del grupo.", en: "Two anagrams share the SAME sorted letters: that's the group key." },
          { es: "Para construirla: $key = str_split($s); sort($key); $key = implode('', $key);", en: "To build it: $key = str_split($s); sort($key); $key = implode('', $key);" },
          { es: "Acumula en $map[$key][] = $s; y al final devuelve array_values($map).", en: "Accumulate in $map[$key][] = $s; and finally return array_values($map)." },
        ],
        test_cases: [
          {
            input:
              "count(groupAnagrams(['eat','tea','tan','ate','nat','bat']))",
            expected: 3,
            description: { es: "Salen tres grupos", en: "Three groups come out" },
          },
          {
            input:
              "(function() { $r = groupAnagrams(['eat','tea','tan','ate','nat','bat']); foreach ($r as &$g) { sort($g); } unset($g); usort($r, fn($a, $b) => $a[0] <=> $b[0]); return $r; })()",
            expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
            description: { es: "Los grupos correctos (normalizados para comparar)", en: "The correct groups (normalized for comparison)" },
          },
          {
            input: "groupAnagrams([])",
            expected: [],
            description: { es: "Lista vacía: caso borde", en: "Empty list: edge case" },
          },
        ],
      },
    },
    {
      node_id: "algo_ceros",
      title: { es: "Las Losas Huecas", en: "The Hollow Slabs" },
      lore_intro: {
        es: "En el suelo hay losas macizas y losas huecas. Empuja las huecas al fondo sin alterar el orden de las macizas — y hazlo sobre la marcha.",
        en: "On the floor there are solid slabs and hollow ones. Push the hollow ones to the back without altering the order of the solid ones — and do it in place.",
      },
      position: { x: 11, y: 4 },
      poo_challenge: {
        topic: "Dos punteros · O(n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa moveZeroes(array $nums): array — los ceros al final, conservando el orden relativo del resto de elementos.",
          en: "Move all zeroes to the end of the array while keeping the relative order of the non-zero elements. Implement moveZeroes(array $nums): array.",
        },
        starter_code: "<?php\n\nfunction moveZeroes(array $nums): array {\n}\n",
        hints: [
          { es: "Lleva un puntero de escritura $pos que empieza en 0.", en: "Keep a write pointer $pos starting at 0." },
          { es: "Recorre y copia hacia adelante sólo los distintos de cero: if ($n !== 0) $nums[$pos++] = $n;", en: "Iterate and copy forward only the non-zero ones: if ($n !== 0) $nums[$pos++] = $n;" },
          { es: "Al terminar, rellena de $pos hasta el final con ceros.", en: "When done, fill from $pos to the end with zeroes." },
        ],
        test_cases: [
          {
            input: "moveZeroes([0, 1, 0, 3, 12])",
            expected: [1, 3, 12, 0, 0],
            description: { es: "Se conserva el orden de los no-cero", en: "The order of the non-zeroes is preserved" },
          },
          {
            input: "moveZeroes([0, 0, 0])",
            expected: [0, 0, 0],
            description: { es: "Todos ceros", en: "All zeroes" },
          },
          {
            input: "moveZeroes([1, 2, 3])",
            expected: [1, 2, 3],
            description: { es: "Ningún cero: no cambia nada", en: "No zeroes: nothing changes" },
          },
        ],
      },
    },
    {
      node_id: "algo_ventana",
      title: { es: "La Galería sin Repeticiones", en: "The Gallery Without Repeats" },
      lore_intro: {
        es: "El pasillo más largo que puedes recorrer sin pisar dos veces la misma runa. Cuando te topes con una repetida, no vuelvas al principio: adelanta el inicio justo lo necesario.",
        en: "The longest corridor you can walk without stepping on the same rune twice. When you hit a repeat, don't go back to the start: move the start forward just enough.",
      },
      position: { x: 12, y: 10 },
      poo_challenge: {
        topic: "Ventana deslizante · O(n)",
        timeLimitSec: 1500,
        instructions: {
          es: "Implementa lengthOfLongestSubstring(string $s): int — la longitud del substring más largo sin caracteres repetidos.",
          en: "Return the length of the longest substring without repeating characters. Implement lengthOfLongestSubstring(string $s): int.",
        },
        starter_code: "<?php\n\nfunction lengthOfLongestSubstring(string $s): int {\n}\n",
        hints: [
          { es: "Guarda en un hash el ÚLTIMO índice visto de cada carácter.", en: "Store in a hash the LAST seen index of each character." },
          { es: "Si el carácter ya se vio dentro de la ventana actual, mueve el inicio: $start = $seen[$c] + 1;", en: "If the character was already seen within the current window, move the start: $start = $seen[$c] + 1;" },
          { es: "En cada paso, el mejor es max($best, $i - $start + 1).", en: "At each step, the best is max($best, $i - $start + 1)." },
        ],
        test_cases: [
          {
            input: "lengthOfLongestSubstring('abcabcbb')",
            expected: 3,
            description: { es: "'abc' mide 3", en: "'abc' is length 3" },
          },
          {
            input: "lengthOfLongestSubstring('bbbbb')",
            expected: 1,
            description: { es: "Todos iguales: 1", en: "All the same: 1" },
          },
          {
            input: "lengthOfLongestSubstring('pwwkew')",
            expected: 3,
            description: { es: "'wke' mide 3 (no 'pwke', que no es contiguo)", en: "'wke' is length 3 (not 'pwke', which isn't contiguous)" },
          },
          {
            input: "lengthOfLongestSubstring('')",
            expected: 0,
            description: { es: "Cadena vacía: caso borde", en: "Empty string: edge case" },
          },
        ],
      },
    },
    {
      node_id: "algo_fibonacci",
      title: { es: "La Espiral de Durin", en: "Durin's Spiral" },
      lore_intro: {
        es: "Una espiral tallada donde cada arco mide como los dos anteriores juntos. Calcularla desde cero cada vez es perderse: apunta lo que ya resolviste.",
        en: "A carved spiral where each arc measures as much as the two before it combined. Computing it from scratch each time is a trap: note down what you've already solved.",
      },
      position: { x: 16, y: 7 },
      poo_challenge: {
        topic: "Recursión + memoización · O(n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa fib(int $n, array &$memo = []): int — el n-ésimo Fibonacci, SIN recursión exponencial.",
          en: "Return the nth Fibonacci number efficiently. Implement fib(int $n, array &$memo = []): int, WITHOUT exponential recursion.",
        },
        starter_code: "<?php\n\nfunction fib(int $n, array &$memo = []): int {\n}\n",
        hints: [
          { es: "Casos base: si $n < 2, devuelve $n.", en: "Base cases: if $n < 2, return $n." },
          { es: "El operador ??= guarda y devuelve en una línea: return $memo[$n] ??= fib($n-1, $memo) + fib($n-2, $memo);", en: "The ??= operator stores and returns in one line: return $memo[$n] ??= fib($n-1, $memo) + fib($n-2, $memo);" },
          { es: "Sin memoizar sería O(2ⁿ): fib(30) haría más de un millón de llamadas repetidas.", en: "Without memoizing it'd be O(2ⁿ): fib(30) would make over a million repeated calls." },
        ],
        test_cases: [
          { input: "fib(0)", expected: 0, description: { es: "Caso base", en: "Base case" } },
          { input: "fib(1)", expected: 1, description: { es: "Caso base", en: "Base case" } },
          { input: "fib(10)", expected: 55, description: { es: "Décimo Fibonacci", en: "Tenth Fibonacci" } },
          {
            input: "fib(30)",
            expected: 832040,
            description: { es: "Con memo es instantáneo; sin memo, un millón de llamadas", en: "With memo it's instant; without memo, a million calls" },
          },
        ],
      },
    },
    {
      node_id: "algo_lista",
      title: { es: "La Cadena de Anillos", en: "The Chain of Rings" },
      lore_intro: {
        es: "Una cadena de eslabones donde cada uno sólo conoce al siguiente. Debes invertirla sin romperla: guarda el siguiente ANTES de cambiar el enlace, o perderás la cadena entera.",
        en: "A chain of links where each one only knows the next. You must reverse it without breaking it: save the next BEFORE changing the link, or you'll lose the whole chain.",
      },
      position: { x: 19, y: 4 },
      poo_challenge: {
        topic: "Listas enlazadas · O(n), O(1) espacio",
        timeLimitSec: 900,
        instructions: {
          es: "Implementa reverseList(?ListNode $head): ?ListNode. La clase ListNode ya existe (tiene $val y $next), junto a dos ayudantes para construir y volcar listas.",
          en: "Reverse a singly linked list and return the new head. Implement reverseList(?ListNode $head): ?ListNode. The ListNode class already exists (with $val and $next), plus two helpers to build and dump lists.",
        },
        support_code:
          "class ListNode {\n    public ?ListNode $next = null;\n    public function __construct(public int $val) {}\n}\n\nfunction listaDesde(array $vals): ?ListNode {\n    $head = null;\n    foreach (array_reverse($vals) as $v) {\n        $n = new ListNode($v);\n        $n->next = $head;\n        $head = $n;\n    }\n    return $head;\n}\n\nfunction listaAArray(?ListNode $h): array {\n    $out = [];\n    while ($h) { $out[] = $h->val; $h = $h->next; }\n    return $out;\n}",
        starter_code: "<?php\n\nfunction reverseList(?ListNode $head): ?ListNode {\n}\n",
        hints: [
          { es: "Empieza con $prev = null; y recorre mientras $head no sea null.", en: "Start with $prev = null; and loop while $head isn't null." },
          { es: "El orden importa: $next = $head->next; luego $head->next = $prev; luego avanza $prev = $head; $head = $next;", en: "Order matters: $next = $head->next; then $head->next = $prev; then advance $prev = $head; $head = $next;" },
          { es: "Al final, la nueva cabeza es $prev (cuando $head llegó a null).", en: "At the end, the new head is $prev (when $head reached null)." },
        ],
        test_cases: [
          {
            input: "listaAArray(reverseList(listaDesde([1, 2, 3, 4, 5])))",
            expected: [5, 4, 3, 2, 1],
            description: { es: "La cadena queda del revés", en: "The chain ends up reversed" },
          },
          {
            input: "listaAArray(reverseList(listaDesde([1])))",
            expected: [1],
            description: { es: "Un solo eslabón", en: "A single link" },
          },
          {
            input: "listaAArray(reverseList(null))",
            expected: [],
            description: { es: "Lista vacía: caso borde", en: "Empty list: edge case" },
          },
        ],
      },
    },
    {
      node_id: "algo_islas",
      title: { es: "Las Salas Aisladas", en: "The Isolated Halls" },
      lore_intro: {
        es: "El plano del laberinto marca roca ('1') y vacío ('0'). Cuenta cuántas salas independientes hay: dos trozos de roca son la misma sala si se tocan en horizontal o vertical.",
        en: "The maze map marks rock ('1') and void ('0'). Count how many independent halls there are: two pieces of rock are the same hall if they touch horizontally or vertically.",
      },
      position: { x: 21, y: 10 },
      poo_challenge: {
        topic: "DFS en grilla · O(filas·columnas)",
        timeLimitSec: 1500,
        instructions: {
          es: "Implementa numIslands(array $grid): int — cuenta las islas conectadas en 4 direcciones, siendo '1' tierra y '0' agua.",
          en: "Given a grid of '1' (land) and '0' (water), count the islands (land cells connected horizontally/vertically). Implement numIslands(array $grid): int.",
        },
        starter_code: "<?php\n\nfunction numIslands(array $grid): int {\n}\n",
        hints: [
          { es: "Recorre la grilla; cuando encuentres un '1', suma 1 al contador y lanza un DFS desde ahí.", en: "Walk the grid; when you find a '1', add 1 to the counter and launch a DFS from there." },
          { es: "El DFS marca la celda como '0' (visitada) y se llama a sí mismo en las 4 direcciones. Así no la recuentas.", en: "The DFS marks the cell as '0' (visited) and calls itself in the 4 directions. That way you don't recount it." },
          { es: "Con una closure recursiva necesitas capturar por referencia: function($r,$c) use (&$dfs, &$grid, $rows, $cols) { … }", en: "With a recursive closure you need to capture by reference: function($r,$c) use (&$dfs, &$grid, $rows, $cols) { … }" },
        ],
        test_cases: [
          {
            input:
              "numIslands([['1','1','0','0'],['1','1','0','0'],['0','0','1','0'],['0','0','0','1']])",
            expected: 3,
            description: { es: "Un bloque grande y dos celdas sueltas", en: "One big block and two loose cells" },
          },
          {
            input: "numIslands([['1','1','1'],['1','1','1']])",
            expected: 1,
            description: { es: "Todo conectado: una sola isla", en: "All connected: a single island" },
          },
          {
            input: "numIslands([['0','0'],['0','0']])",
            expected: 0,
            description: { es: "Sin tierra", en: "No land" },
          },
          {
            input: "numIslands([])",
            expected: 0,
            description: { es: "Grilla vacía: caso borde", en: "Empty grid: edge case" },
          },
        ],
      },
    },
  ],
};

/**
 * LIBRO IV · La Sala de los Espejos Helados.
 * Acertijos de lógica y razonamiento (el test de IQ también es cronometrado).
 * Nodos de tipo `quiz`: opción múltiple con explicación.
 */
export const CHAPTER_LOGICA: Chapter = {
  chapter: 12,
  title: { es: "La Sala de los Espejos Helados", en: "The Hall of Frozen Mirrors" },
  lore: {
    es: "Una cámara de hielo pulido donde los reflejos hacen preguntas. Aquí no se escribe código: se piensa. Y como en toda prueba de verdad, el reloj también cuenta.",
    en: "A chamber of polished ice where the reflections ask questions. Here you don't write code: you think. And as in any real test, the clock counts too.",
  },
  mapSize: { cols: 22, rows: 14 },
  spawn: { x: 2, y: 7 },
  scenery: {
    ground: "ice",
    pathRows: [7],
    pathGround: "stone",
    pond: { x: 17, y: 10, w: 4, h: 3 },
    decor: [
      { type: "rock", x: 5, y: 4 },
      { type: "rock", x: 10, y: 4 },
      { type: "rock", x: 15, y: 4 },
      { type: "rock", x: 20, y: 5 },
      { type: "rock", x: 6, y: 11 },
      { type: "rock", x: 13, y: 12 },
      { type: "rock", x: 3, y: 12 },
    ],
  },
  nodes: [
    {
      node_id: "pergamino_logica",
      kind: "scroll",
      title: { es: "El Pergamino del Reflejo", en: "The Scroll of Reflection" },
      lore_intro: {
        es: "Grabado en el marco del primer espejo: no da respuestas, da método.",
        en: "Carved on the frame of the first mirror: it gives no answers, it gives method.",
      },
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Cómo afrontar un test de lógica cronometrado",
        sections: [
          {
            heading: { es: "La respuesta intuitiva suele ser la trampa", en: "The intuitive answer is usually the trap" },
            body: {
              es: "Estos tests están diseñados para que la primera respuesta que se te ocurra sea la equivocada. Antes de contestar, comprueba tu intuición con un caso pequeño y concreto.\n\nSi una pregunta parece demasiado fácil, casi siempre hay un matiz escondido.",
              en: "These tests are designed so that the first answer that comes to mind is the wrong one. Before answering, check your intuition with a small, concrete case.\n\nIf a question seems too easy, there's almost always a hidden catch.",
            },
          },
          {
            heading: { es: "Secuencias: mira las DIFERENCIAS", en: "Sequences: look at the DIFFERENCES" },
            body: {
              es: "Ante una serie numérica, calcula la diferencia entre términos consecutivos. Si las diferencias forman a su vez un patrón, ya lo tienes.\n\nSi no, prueba con productos (n × algo), cuadrados, o una regla que describa el término anterior en palabras.",
              en: "Faced with a number series, compute the difference between consecutive terms. If the differences form a pattern of their own, you've got it.\n\nIf not, try products (n × something), squares, or a rule that describes the previous term in words.",
            },
          },
          {
            heading: { es: "Proporciones: busca la unidad", en: "Proportions: find the unit" },
            body: {
              es: "«Si 5 máquinas hacen 5 productos en 5 minutos…» — no escales a ciegas. Reduce primero a UNA unidad: ¿cuánto tarda UNA máquina en hacer UN producto?\n\nCon esa cifra, el resto sale solo.",
              en: "\"If 5 machines make 5 products in 5 minutes…\" — don't scale blindly. Reduce first to ONE unit: how long does ONE machine take to make ONE product?\n\nWith that figure, the rest follows.",
            },
          },
          {
            heading: { es: "Probabilidad condicionada: reduce el espacio", en: "Conditional probability: shrink the space" },
            body: {
              es: "Cuando te dan información («sabiendo que al menos una…»), el conjunto de casos posibles ENCOGE. Enumera los casos que quedan y cuenta cuántos cumplen. Con 2 o 3 elementos, escribirlos todos es más rápido y seguro que aplicar una fórmula de memoria.",
              en: "When you're given information (\"knowing that at least one…\"), the set of possible cases SHRINKS. Enumerate the remaining cases and count how many qualify. With 2 or 3 elements, writing them all out is faster and safer than applying a memorized formula.",
            },
          },
        ],
        keyTakeaway: {
          es: "Gestiona el reloj: si un enigma te atasca, márcalo y sigue; vuelve al final. Una respuesta reflexionada vale más que tres apresuradas.",
          en: "Manage the clock: if a riddle stalls you, flag it and move on; come back at the end. One considered answer beats three rushed ones.",
        },
      },
    },
    {
      node_id: "logica_secuencias",
      kind: "quiz",
      title: { es: "Las Runas Numéricas", en: "The Numeric Runes" },
      lore_intro: {
        es: "El primer espejo muestra una hilera de cifras que se repiten sin descanso. Falta la última.",
        en: "The first mirror shows a row of figures repeating without rest. The last one is missing.",
      },
      position: { x: 7, y: 7 },
      quiz: {
        topic: "Secuencias y patrones",
        timeLimitSec: 300,
        questions: [
          {
            question: { es: "2, 6, 12, 20, 30, ?  — ¿qué número sigue?", en: "2, 6, 12, 20, 30, ?  — which number comes next?" },
            options: ["36", "40", "42", "44"],
            correct: 2,
            explanation: {
              es: "Son n(n+1): 1·2=2, 2·3=6, 3·4=12, 4·5=20, 5·6=30 y 6·7=42. También se ve en las diferencias, que suben de dos en dos: 4, 6, 8, 10, 12.",
              en: "They're n(n+1): 1·2=2, 2·3=6, 3·4=12, 4·5=20, 5·6=30 and 6·7=42. You can also see it in the differences, rising by two: 4, 6, 8, 10, 12.",
            },
          },
          {
            question: { es: "1, 11, 21, 1211, 111221, ?  — ¿qué sigue?", en: "1, 11, 21, 1211, 111221, ?  — what comes next?" },
            options: ["112213", "312211", "122112", "111222"],
            correct: 1,
            explanation: {
              es: "Cada término DESCRIBE en voz alta el anterior. 111221 se lee «tres unos, dos doses, un uno» → 312211. Se llama secuencia look-and-say; no es aritmética, es descriptiva.",
              en: "Each term DESCRIBES the previous one aloud. 111221 reads \"three ones, two twos, one one\" → 312211. It's the look-and-say sequence; not arithmetic, but descriptive.",
            },
          },
          {
            question: { es: "3, 6, 11, 18, 27, ?  — ¿qué sigue?", en: "3, 6, 11, 18, 27, ?  — what comes next?" },
            options: ["36", "38", "40", "42"],
            correct: 1,
            explanation: {
              es: "Las diferencias son 3, 5, 7, 9 (impares consecutivos), así que la siguiente es 11: 27 + 11 = 38. Truco general: cuando el patrón no salta a la vista, calcula siempre las diferencias.",
              en: "The differences are 3, 5, 7, 9 (consecutive odd numbers), so the next is 11: 27 + 11 = 38. General trick: when the pattern isn't obvious, always compute the differences.",
            },
          },
        ],
      },
    },
    {
      node_id: "logica_proporciones",
      kind: "quiz",
      title: { es: "La Fragua de los Enanos", en: "The Dwarves' Forge" },
      lore_intro: {
        es: "El segundo espejo refleja una forja llena de yunques trabajando a la vez. Las cifras engañan si no reduces a la unidad.",
        en: "The second mirror reflects a forge full of anvils working at once. The figures deceive if you don't reduce to the unit.",
      },
      position: { x: 12, y: 10 },
      quiz: {
        topic: "Proporciones y razonamiento",
        timeLimitSec: 300,
        questions: [
          {
            question: {
              es: "Si 5 máquinas hacen 5 productos en 5 minutos, ¿cuánto tardan 100 máquinas en hacer 100 productos?",
              en: "If 5 machines make 5 products in 5 minutes, how long do 100 machines take to make 100 products?",
            },
            options: [
              { es: "5 minutos", en: "5 minutes" },
              { es: "20 minutos", en: "20 minutes" },
              { es: "100 minutos", en: "100 minutes" },
              { es: "1 minuto", en: "1 minute" },
            ],
            correct: 0,
            explanation: {
              es: "Reduce a la unidad: cada máquina hace 1 producto en 5 minutos. Entonces 100 máquinas trabajando EN PARALELO hacen 100 productos también en 5 minutos. La trampa es escalar el tiempo junto con las cantidades.",
              en: "Reduce to the unit: each machine makes 1 product in 5 minutes. So 100 machines working IN PARALLEL make 100 products in 5 minutes too. The trap is scaling time along with the quantities.",
            },
          },
          {
            question: {
              es: "Un bate y una pelota cuestan 1,10 € en total. El bate cuesta 1,00 € MÁS que la pelota. ¿Cuánto cuesta la pelota?",
              en: "A bat and a ball cost €1.10 in total. The bat costs €1.00 MORE than the ball. How much does the ball cost?",
            },
            options: [
              { es: "0,10 €", en: "€0.10" },
              { es: "0,05 €", en: "€0.05" },
              { es: "0,15 €", en: "€0.15" },
              { es: "1,00 €", en: "€1.00" },
            ],
            correct: 1,
            explanation: {
              es: "La respuesta intuitiva (0,10 €) falla: entonces el bate valdría 1,10 € y el total sería 1,20 €. Si la pelota vale x, el bate vale x+1, así que 2x+1 = 1,10 → x = 0,05 €. El bate cuesta 1,05 €.",
              en: "The intuitive answer (€0.10) fails: then the bat would be €1.10 and the total €1.20. If the ball is x, the bat is x+1, so 2x+1 = 1.10 → x = €0.05. The bat costs €1.05.",
            },
          },
          {
            question: {
              es: "En un estanque, los nenúfares duplican su superficie cada día y cubren el estanque entero el día 48. ¿Qué día cubrían la mitad?",
              en: "In a pond, the water lilies double their area every day and cover the whole pond on day 48. On which day did they cover half?",
            },
            options: [
              { es: "Día 24", en: "Day 24" },
              { es: "Día 47", en: "Day 47" },
              { es: "Día 32", en: "Day 32" },
              { es: "Día 46", en: "Day 46" },
            ],
            correct: 1,
            explanation: {
              es: "Si se duplican cada día, el día anterior a cubrirlo todo estaba justo a la mitad: día 47. Dividir 48 entre 2 sería tratar un crecimiento exponencial como si fuera lineal.",
              en: "If they double every day, the day before covering it all they were exactly at half: day 47. Dividing 48 by 2 would treat exponential growth as if it were linear.",
            },
          },
        ],
      },
    },
    {
      node_id: "logica_balanza",
      kind: "quiz",
      title: { es: "La Balanza de Mithril", en: "The Mithril Scales" },
      lore_intro: {
        es: "El último espejo muestra una balanza de platillos y unas monedas girando en el aire. Probabilidad y peso: los dos sitios donde más falla la intuición.",
        en: "The last mirror shows a pair of scales and some coins spinning in the air. Probability and weight: the two places where intuition fails most.",
      },
      position: { x: 17, y: 7 },
      quiz: {
        topic: "Probabilidad y estrategia",
        timeLimitSec: 420,
        questions: [
          {
            question: {
              es: "Lanzas dos monedas justas. Sabiendo que al menos una salió cara, ¿cuál es la probabilidad de que AMBAS sean cara?",
              en: "You flip two fair coins. Given that at least one came up heads, what's the probability that BOTH are heads?",
            },
            options: ["1/2", "1/3", "1/4", "2/3"],
            correct: 1,
            explanation: {
              es: "Los cuatro casos posibles son CC, CX, XC, XX. La condición «al menos una cara» elimina XX y deja tres: CC, CX, XC. Sólo uno cumple que ambas sean cara → 1/3, no 1/2. La información recibida encoge el espacio de casos.",
              en: "The four possible cases are HH, HT, TH, TT. The \"at least one heads\" condition eliminates TT and leaves three: HH, HT, TH. Only one has both heads → 1/3, not 1/2. The information received shrinks the space of cases.",
            },
          },
          {
            question: {
              es: "Tienes 9 bolas idénticas; una pesa un poco más. Con una balanza de platillos, ¿en cuántas pesadas GARANTIZAS encontrar la más pesada?",
              en: "You have 9 identical balls; one weighs slightly more. With a balance scale, in how many weighings can you GUARANTEE finding the heavier one?",
            },
            options: ["2", "3", "4", "8"],
            correct: 0,
            explanation: {
              es: "Dos. Divide en tres grupos de 3 y pesa dos grupos: si uno baja, la bola está ahí; si quedan iguales, está en el tercero. Segunda pesada: de esas 3, pesa dos. Cada pesada tiene TRES resultados posibles, así que descarta dos tercios de golpe.",
              en: "Two. Split into three groups of 3 and weigh two groups: if one drops, the ball is there; if they're equal, it's in the third. Second weighing: of those 3, weigh two. Each weighing has THREE possible outcomes, so it rules out two thirds at once.",
            },
          },
          {
            question: {
              es: "Una familia tiene dos hijos. Sabes que al menos uno es niño. ¿Probabilidad de que AMBOS sean niños?",
              en: "A family has two children. You know at least one is a boy. Probability that BOTH are boys?",
            },
            options: ["1/2", "1/3", "1/4", "3/4"],
            correct: 1,
            explanation: {
              es: "El mismo razonamiento que el de las monedas: los casos son NN, NÑ, ÑN, ÑÑ. «Al menos un niño» descarta ÑÑ y quedan tres, de los cuales sólo NN cumple → 1/3. Reconocer que es el MISMO problema con otro disfraz es justo lo que evalúan.",
              en: "The same reasoning as the coins: the cases are BB, BG, GB, GG. \"At least one boy\" rules out GG and leaves three, of which only BB qualifies → 1/3. Recognizing it's the SAME problem in another disguise is exactly what they're testing.",
            },
          },
        ],
      },
    },
  ],
};

/**
 * LIBRO III (cierre) · El Árbol de Piedra.
 * Tercer bloque: árboles, combinaciones/backtracking, criba y DP con O(1).
 */
export const CHAPTER_ALGOS_3: Chapter = {
  chapter: 13,
  title: { es: "El Árbol de Piedra", en: "The Tree of Stone" },
  lore: {
    es: "En la última cámara crece un árbol tallado en roca viva, con ramas que se bifurcan hasta perderse. Los Enanos dejaron aquí sus enigmas más finos: los que se resuelven pensando en ramas, en combinaciones y en no repetir trabajo.",
    en: "In the last chamber grows a tree carved from living rock, its branches forking until they vanish. The Dwarves left their finest riddles here: the ones solved by thinking in branches, in combinations, and in not repeating work.",
  },
  mapSize: { cols: 22, rows: 14 },
  spawn: { x: 2, y: 7 },
  scenery: {
    ground: "stone",
    pathRows: [7],
    pathGround: "gold",
    pond: { x: 17, y: 11, w: 4, h: 3 },
    pondGround: "ice",
    decor: [
      { type: "rock", x: 5, y: 4 },
      { type: "rock", x: 9, y: 11 },
      { type: "rock", x: 14, y: 4 },
      { type: "rock", x: 15, y: 11 },
      { type: "rock", x: 21, y: 6 },
      { type: "rock", x: 3, y: 12 },
      { type: "rock", x: 8, y: 3 },
    ],
  },
  nodes: [
    {
      node_id: "pergamino_narrar",
      kind: "scroll",
      title: { es: "El Pergamino de la Lengua Común", en: "The Scroll of the Common Tongue" },
      lore_intro: {
        es: "Grabado bajo el árbol: «No basta con resolverlo. En los concilios de los Hombres del Oeste, hay que saber CONTAR cómo lo resolviste — y hacerlo en su lengua.»",
        en: "Carved beneath the tree: \"Solving it is not enough. In the councils of the Men of the West, you must know how to TELL how you solved it — and to do so in their tongue.\"",
      },
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Cómo narrar la solución (y en inglés)",
        sections: [
          {
            heading: { es: "Los seis pasos", en: "The six steps" },
            body: {
              es: "1. Reformula el enunciado y confirma los casos borde (vacío, negativos, duplicados).\n2. Di la fuerza bruta y su Big-O.\n3. Optimiza — casi siempre un hash map o dos punteros bajan de O(n²) a O(n).\n4. Codifica hablando.\n5. Prueba con un ejemplo pequeño.\n6. Cierra diciendo la complejidad final de tiempo Y espacio.\n\nUna solución correcta y lenta, bien explicada, puntúa más que una óptima a medias y en silencio.",
              en: "1. Restate the problem and confirm the edge cases (empty, negatives, duplicates).\n2. State the brute force and its Big-O.\n3. Optimize — a hash map or two pointers almost always drop O(n²) to O(n).\n4. Code while talking.\n5. Test with a small example.\n6. Close by stating the final TIME AND SPACE complexity.\n\nA correct, slow solution, well explained, scores higher than a half-finished optimal one in silence.",
            },
          },
          {
            heading: { es: "Frases que resuelven la entrevista técnica", en: "Phrases that carry the technical interview" },
            body: {
              es: "«Let me restate the problem to make sure I understand it.»\n«The brute force would be O(n²) — let me see if I can do better.»\n«The trade-off here is between time and space, so I'd choose… because…»\n«Let me walk you through my approach step by step.»\n«Let me trace through a small example to verify.»\n«This runs in O(n) time and O(n) space.»",
              en: "\"Let me restate the problem to make sure I understand it.\"\n\"The brute force would be O(n²) — let me see if I can do better.\"\n\"The trade-off here is between time and space, so I'd choose… because…\"\n\"Let me walk you through my approach step by step.\"\n\"Let me trace through a small example to verify.\"\n\"This runs in O(n) time and O(n) space.\"",
            },
          },
          {
            heading: { es: "Si te pierdes", en: "If you get lost" },
            body: {
              es: "«Could you rephrase that?» — pedir aclaración no resta, suma.\n«I'd start simple and only add complexity when a real constraint requires it.»\n\nHablar despacio y claro puntúa más que hablar rápido con errores. Y si un problema te atasca: márcalo, sigue, y vuelve al final.",
              en: "\"Could you rephrase that?\" — asking for clarification doesn't subtract, it adds.\n\"I'd start simple and only add complexity when a real constraint requires it.\"\n\nSpeaking slowly and clearly scores higher than speaking fast with mistakes. And if a problem stalls you: flag it, move on, and come back at the end.",
            },
          },
        ],
        keyTakeaway: {
          es: "Piensa en voz alta desde el primer segundo. El silencio se interpreta como no saber, aunque estés resolviéndolo en tu cabeza.",
          en: "Think out loud from the first second. Silence is read as not knowing, even if you're solving it in your head.",
        },
      },
    },
    {
      node_id: "algo_arbol",
      title: { es: "Las Ramas de Piedra", en: "The Branches of Stone" },
      lore_intro: {
        es: "El árbol se bifurca en dos por cada nudo. ¿Cuántos nudos hay en la rama más larga, desde la raíz hasta la punta?",
        en: "The tree forks in two at every knot. How many knots are there on the longest branch, from the root to the tip?",
      },
      position: { x: 7, y: 7 },
      poo_challenge: {
        topic: "Árboles · DFS recursivo · O(n)",
        timeLimitSec: 720,
        instructions: {
          es: "Implementa maxDepth(?TreeNode $root): int — la profundidad máxima (número de nodos del camino raíz-hoja más largo) de un árbol binario. La clase TreeNode ya existe (con $val, $left y $right), junto a arbolDesde() para construir árboles por niveles.",
          en: "Return the maximum depth (number of nodes along the longest root-to-leaf path) of a binary tree. Implement maxDepth(?TreeNode $root): int. The TreeNode class already exists (with $val, $left and $right), plus arbolDesde() to build trees level by level.",
        },
        support_code:
          "class TreeNode {\n    public ?TreeNode $left = null;\n    public ?TreeNode $right = null;\n    public function __construct(public int $val) {}\n}\n\n/** Construye un árbol desde un array por niveles (null = hueco). */\nfunction arbolDesde(array $vals): ?TreeNode {\n    if (empty($vals) || $vals[0] === null) return null;\n    $root = new TreeNode($vals[0]);\n    $cola = [$root];\n    $i = 1;\n    while ($i < count($vals) && $cola) {\n        $n = array_shift($cola);\n        if ($i < count($vals)) { $v = $vals[$i++]; if ($v !== null) { $n->left = new TreeNode($v); $cola[] = $n->left; } }\n        if ($i < count($vals)) { $v = $vals[$i++]; if ($v !== null) { $n->right = new TreeNode($v); $cola[] = $n->right; } }\n    }\n    return $root;\n}",
        starter_code: "<?php\n\nfunction maxDepth(?TreeNode $root): int {\n}\n",
        hints: [
          { es: "Caso base: un nodo nulo tiene profundidad 0.", en: "Base case: a null node has depth 0." },
          { es: "La profundidad de un nodo es 1 más la MAYOR de sus dos ramas.", en: "A node's depth is 1 plus the GREATER of its two branches." },
          { es: "En una línea: return 1 + max(maxDepth($root->left), maxDepth($root->right));", en: "In one line: return 1 + max(maxDepth($root->left), maxDepth($root->right));" },
        ],
        test_cases: [
          {
            input: "maxDepth(arbolDesde([3, 9, 20, null, null, 15, 7]))",
            expected: 3,
            description: { es: "Árbol equilibrado de 3 niveles", en: "Balanced tree of 3 levels" },
          },
          { input: "maxDepth(arbolDesde([1]))", expected: 1, description: { es: "Sólo la raíz", en: "Just the root" } },
          { input: "maxDepth(null)", expected: 0, description: { es: "Árbol vacío: caso borde", en: "Empty tree: edge case" } },
          {
            input: "maxDepth(arbolDesde([1, 2, null, 3, null, 4]))",
            expected: 4,
            description: { es: "Rama izquierda encadenada: 4 niveles", en: "Chained left branch: 4 levels" },
          },
        ],
      },
    },
    {
      node_id: "algo_subconjuntos",
      title: { es: "Todas las Combinaciones", en: "All the Combinations" },
      lore_intro: {
        es: "Ante ti, un puñado de gemas distintas. ¿De cuántas formas puedes llevarte un subconjunto cualquiera — incluida la de no llevarte ninguna?",
        en: "Before you, a handful of distinct gems. In how many ways can you take any subset — including taking none at all?",
      },
      position: { x: 11, y: 4 },
      poo_challenge: {
        topic: "Recursión / combinaciones · O(n·2ⁿ)",
        timeLimitSec: 1200,
        instructions: {
          es: "Implementa subsets(array $nums): array — todos los subconjuntos posibles (el conjunto potencia) de un array de enteros distintos. El orden no importa.",
          en: "Return all possible subsets of an array of distinct integers (the power set). Implement subsets(array $nums): array. Order doesn't matter.",
        },
        starter_code: "<?php\n\nfunction subsets(array $nums): array {\n}\n",
        hints: [
          { es: "Arranca con $res = [[]] — el conjunto vacío también es un subconjunto.", en: "Start with $res = [[]] — the empty set is a subset too." },
          { es: "Por cada número, DUPLICA cada subconjunto que ya tienes añadiéndole ese número.", en: "For each number, DUPLICATE every subset you already have, adding that number to it." },
          { es: "foreach ($nums as $n) { foreach ($res as $sub) $res[] = [...$sub, $n]; }", en: "foreach ($nums as $n) { foreach ($res as $sub) $res[] = [...$sub, $n]; }" },
        ],
        test_cases: [
          {
            input: "count(subsets([1, 2, 3]))",
            expected: 8,
            description: { es: "Con 3 elementos hay 2³ = 8 subconjuntos", en: "With 3 elements there are 2³ = 8 subsets" },
          },
          {
            input:
              "(function() { $r = subsets([1, 2, 3]); foreach ($r as &$s) { sort($s); } unset($s); usort($r, fn($a, $b) => [count($a), $a] <=> [count($b), $b]); return $r; })()",
            expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
            description: { es: "Los 8 subconjuntos (normalizados para comparar)", en: "The 8 subsets (normalized for comparison)" },
          },
          {
            input: "count(subsets([]))",
            expected: 1,
            description: { es: "Del conjunto vacío sale un solo subconjunto: el vacío", en: "The empty set yields a single subset: the empty one" },
          },
        ],
      },
    },
    {
      node_id: "algo_agua",
      title: { es: "El Aljibe de Khazad", en: "The Cistern of Khazad" },
      lore_intro: {
        es: "Una hilera de columnas de distinta altura. Eliges dos para formar un aljibe: el agua que retiene la limita SIEMPRE la más baja de las dos.",
        en: "A row of columns of different heights. You pick two to form a cistern: the water it holds is ALWAYS limited by the shorter of the two.",
      },
      position: { x: 12, y: 10 },
      poo_challenge: {
        topic: "Dos punteros · O(n)",
        timeLimitSec: 1200,
        instructions: {
          es: "Implementa maxArea(array $h): int — el área máxima de agua entre dos columnas (cada columna y el eje x forman un contenedor).",
          en: "Given heights, pick two lines that with the x-axis form a container holding the most water. Return the max area. Implement maxArea(array $h): int.",
        },
        starter_code: "<?php\n\nfunction maxArea(array $h): int {\n}\n",
        hints: [
          { es: "Empieza con un puntero en cada extremo: $l = 0 y $r = count($h) - 1.", en: "Start with a pointer at each end: $l = 0 and $r = count($h) - 1." },
          { es: "El área es min($h[$l], $h[$r]) * ($r - $l) — la limita la columna más baja.", en: "The area is min($h[$l], $h[$r]) * ($r - $l) — the shorter column limits it." },
          { es: "Mueve SIEMPRE el puntero de la columna más baja: mover el alto sólo puede empeorar el resultado.", en: "ALWAYS move the pointer of the shorter column: moving the taller one can only worsen the result." },
        ],
        test_cases: [
          {
            input: "maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])",
            expected: 49,
            description: { es: "Las columnas de altura 8 y 7, separadas 7 posiciones", en: "The columns of height 8 and 7, 7 positions apart" },
          },
          { input: "maxArea([1, 1])", expected: 1, description: { es: "Dos columnas mínimas", en: "Two minimal columns" } },
          {
            input: "maxArea([4, 3, 2, 1, 4])",
            expected: 16,
            description: { es: "Los dos extremos, altura 4 y distancia 4", en: "The two ends, height 4 and distance 4" },
          },
        ],
      },
    },
    {
      node_id: "algo_topk",
      title: { es: "Los Ecos más Repetidos", en: "The Most Repeated Echoes" },
      lore_intro: {
        es: "De todos los sonidos de la cámara, ¿cuáles son los k que más veces resuenan?",
        en: "Of all the sounds in the chamber, which are the k that resonate most often?",
      },
      position: { x: 16, y: 7 },
      poo_challenge: {
        topic: "Hash map + orden · O(n log n)",
        timeLimitSec: 1200,
        instructions: {
          es: "Implementa topKFrequent(array $nums, int $k): array — los k elementos que más se repiten, del más frecuente al menos.",
          en: "Return the k most frequent elements of an array, from most to least frequent. Implement topKFrequent(array $nums, int $k): array.",
        },
        starter_code: "<?php\n\nfunction topKFrequent(array $nums, int $k): array {\n}\n",
        hints: [
          { es: "array_count_values($nums) te da directamente valor => conteo.", en: "array_count_values($nums) gives you value => count directly." },
          { es: "arsort($c) ordena por conteo descendente CONSERVANDO las claves.", en: "arsort($c) sorts by count descending WHILE KEEPING the keys." },
          { es: "Los valores son las claves: return array_slice(array_keys($c), 0, $k);", en: "The values are the keys: return array_slice(array_keys($c), 0, $k);" },
        ],
        test_cases: [
          {
            input: "topKFrequent([1, 1, 1, 2, 2, 3], 2)",
            expected: [1, 2],
            description: { es: "El 1 aparece 3 veces y el 2 dos veces", en: "1 appears 3 times and 2 appears twice" },
          },
          {
            input: "topKFrequent([4, 4, 4, 4, 5, 5, 6], 1)",
            expected: [4],
            description: { es: "Sólo el más frecuente", en: "Only the most frequent" },
          },
          { input: "topKFrequent([7], 1)", expected: [7], description: { es: "Un único elemento", en: "A single element" } },
        ],
      },
    },
    {
      node_id: "algo_primos",
      title: { es: "La Criba de los Herreros", en: "The Smiths' Sieve" },
      lore_intro: {
        es: "Los herreros marcaban los números que NO servían, tachando de golpe todos los múltiplos de cada uno. Lo que quedaba sin tachar era puro.",
        en: "The smiths marked the numbers that were NO good, crossing out all the multiples of each at once. What remained uncrossed was pure.",
      },
      position: { x: 19, y: 4 },
      poo_challenge: {
        topic: "Criba de Eratóstenes · O(n log log n)",
        timeLimitSec: 1200,
        instructions: {
          es: "Implementa countPrimes(int $n): int — cuántos primos hay estrictamente MENORES que n.",
          en: "Count the prime numbers strictly less than n. Implement countPrimes(int $n): int.",
        },
        starter_code: "<?php\n\nfunction countPrimes(int $n): int {\n}\n",
        hints: [
          { es: "Si $n < 3 no hay primos menores que n: devuelve 0.", en: "If $n < 3 there are no primes less than n: return 0." },
          { es: "Crea un array de booleanos con array_fill(0, $n, true) y marca 0 y 1 como false.", en: "Create a boolean array with array_fill(0, $n, true) and mark 0 and 1 as false." },
          { es: "Para cada $i con $i*$i < $n, si sigue siendo primo, tacha sus múltiplos EMPEZANDO EN $i*$i (los menores ya los tachó otro).", en: "For each $i with $i*$i < $n, if it's still prime, cross out its multiples STARTING AT $i*$i (smaller ones were already crossed by another)." },
        ],
        test_cases: [
          { input: "countPrimes(10)", expected: 4, description: { es: "2, 3, 5 y 7", en: "2, 3, 5 and 7" } },
          { input: "countPrimes(2)", expected: 0, description: { es: "Ninguno menor que 2", en: "None less than 2" } },
          { input: "countPrimes(0)", expected: 0, description: { es: "Caso borde", en: "Edge case" } },
          { input: "countPrimes(100)", expected: 25, description: { es: "25 primos por debajo de 100", en: "25 primes below 100" } },
        ],
      },
    },
    {
      node_id: "algo_escaleras",
      title: { es: "La Escalinata Infinita", en: "The Endless Stairway" },
      lore_intro: {
        es: "Los peldaños suben en la penumbra. Puedes avanzar de uno en uno o de dos en dos. ¿De cuántas formas distintas llegas arriba?",
        en: "The steps rise into the gloom. You can advance one at a time or two at a time. In how many distinct ways can you reach the top?",
      },
      position: { x: 20, y: 10 },
      poo_challenge: {
        topic: "Programación dinámica · O(n) tiempo, O(1) espacio",
        timeLimitSec: 720,
        instructions: {
          es: "Implementa climbStairs(int $n): int. Puedes subir 1 o 2 peldaños a la vez: ¿de cuántas formas distintas subes n peldaños? Pista: es Fibonacci disfrazado.",
          en: "You can climb 1 or 2 steps at a time. In how many distinct ways can you climb n steps? Implement climbStairs(int $n): int. Hint: it's Fibonacci in disguise.",
        },
        starter_code: "<?php\n\nfunction climbStairs(int $n): int {\n}\n",
        hints: [
          { es: "Para llegar al peldaño n vienes del n-1 (paso de 1) o del n-2 (paso de 2): formas(n) = formas(n-1) + formas(n-2).", en: "To reach step n you come from n-1 (a 1-step) or n-2 (a 2-step): ways(n) = ways(n-1) + ways(n-2)." },
          { es: "No necesitas guardar todo el array: con dos variables basta y el espacio queda en O(1).", en: "You don't need the whole array: two variables suffice and space stays O(1)." },
          { es: "$a = 1; $b = 1; y en cada vuelta: [$a, $b] = [$b, $a + $b];", en: "$a = 1; $b = 1; and each round: [$a, $b] = [$b, $a + $b];" },
        ],
        test_cases: [
          { input: "climbStairs(1)", expected: 1, description: { es: "Un peldaño, una forma", en: "One step, one way" } },
          { input: "climbStairs(2)", expected: 2, description: "1+1, 2" },
          { input: "climbStairs(3)", expected: 3, description: "1+1+1, 1+2, 2+1" },
          { input: "climbStairs(5)", expected: 8, description: { es: "Fibonacci disfrazado", en: "Fibonacci in disguise" } },
        ],
      },
    },
  ],
};

/**
 * LIBRO V · La Antecámara de los Novicios.
 * Calentamiento: los clásicos fáciles. Pensado para empezar aquí cuando vas
 * frío, o para repasar rápido antes de una prueba.
 */
export const CHAPTER_CALENTAMIENTO: Chapter = {
  chapter: 14,
  title: { es: "La Antecámara de los Novicios", en: "The Novices' Antechamber" },
  lore: {
    es: "Antes de las galerías profundas hay una sala luminosa donde los aprendices afilaban la mano. Problemas cortos, de los que se resuelven en diez minutos — pero que separan a quien lee el enunciado de quien lo supone.",
    en: "Before the deep galleries there's a bright hall where the apprentices sharpened their hand. Short problems, the kind solved in ten minutes — but which separate those who read the prompt from those who assume it.",
  },
  mapSize: { cols: 22, rows: 14 },
  spawn: { x: 2, y: 7 },
  scenery: {
    ground: "dry",
    pathRows: [7],
    pathGround: "gold",
    pond: { x: 17, y: 11, w: 4, h: 3 },
    decor: [
      { type: "rock", x: 5, y: 4 },
      { type: "rock", x: 9, y: 11 },
      { type: "rock", x: 14, y: 4 },
      { type: "rock", x: 15, y: 11 },
      { type: "rock", x: 21, y: 6 },
      { type: "rock", x: 3, y: 12 },
      { type: "tree", x: 8, y: 3 },
      { type: "tree", x: 18, y: 3 },
    ],
  },
  nodes: [
    {
      node_id: "pergamino_aprendiz",
      kind: "scroll",
      title: { es: "El Pergamino del Aprendiz", en: "The Apprentice's Scroll" },
      lore_intro: {
        es: "Colgado junto a la entrada, con la letra de un maestro paciente: no enseña a resolver, enseña a entrenar.",
        en: "Hung by the entrance, in the hand of a patient master: it doesn't teach how to solve, it teaches how to train.",
      },
      position: { x: 4, y: 10 },
      scroll: {
        topic: "Cómo practicar de verdad",
        sections: [
          {
            heading: { es: "Tápate la solución y ponte el reloj", en: "Cover the solution and start the clock" },
            body: {
              es: "Leer soluciones da sensación de aprender, pero no entrena. Lee sólo el enunciado, arranca el cronómetro y escribe TU versión antes de mirar nada.\n\nLa prueba real es cronometrada: practicar sin reloj entrena algo distinto de lo que te van a medir.",
              en: "Reading solutions feels like learning, but it doesn't train you. Read only the prompt, start the timer, and write YOUR version before looking at anything.\n\nThe real test is timed: practicing without a clock trains something different from what you'll be measured on.",
            },
          },
          {
            heading: { es: "Objetivo realista", en: "A realistic target" },
            body: {
              es: "Un problema fácil, resuelto y correcto, en 10–15 minutos.\nUno medio, en 20–30.\n\nSi te pasas mucho del tiempo, no es fracaso: es información sobre qué patrón repasar.",
              en: "An easy problem, solved and correct, in 10–15 minutes.\nA medium one, in 20–30.\n\nIf you go well over time, it's not failure: it's information about which pattern to review.",
            },
          },
          {
            heading: { es: "Los casos borde son la mitad del examen", en: "Edge cases are half the exam" },
            body: {
              es: "Antes de escribir la primera línea, pregúntate: ¿qué pasa con la entrada vacía? ¿Con un solo elemento? ¿Con negativos? ¿Con duplicados? ¿Con desbordamiento?\n\nUn error de lectura cuesta más caro que treinta segundos pensando.",
              en: "Before writing the first line, ask yourself: what about the empty input? A single element? Negatives? Duplicates? Overflow?\n\nA misreading costs more than thirty seconds of thinking.",
            },
          },
          {
            heading: { es: "Narra en voz alta, y en inglés", en: "Narrate out loud, and in English" },
            body: {
              es: "Di tu razonamiento mientras resuelves. Entrenas a la vez las dos cosas que evalúan: el algoritmo y el idioma.\n\nRepite a los dos días los que fallaste — la repetición espaciada es lo que fija el patrón.",
              en: "Say your reasoning as you solve. You train both things they assess at once: the algorithm and the language.\n\nRedo the ones you failed two days later — spaced repetition is what locks in the pattern.",
            },
          },
        ],
        keyTakeaway: {
          es: "Cronómetro, solución tapada y en voz alta. Repite a los dos días los que fallaste.",
          en: "Timer, solution covered, and out loud. Redo the ones you failed two days later.",
        },
      },
    },
    {
      node_id: "warm_fizzbuzz",
      title: { es: "El Cántico de los Enanos", en: "The Dwarves' Chant" },
      lore_intro: {
        es: "Los enanos cuentan sus pasos, pero cada tres gritan «¡Fizz!», cada cinco «¡Buzz!»… y cuando toca ambos, gritan las dos cosas. El orden de las comprobaciones lo es todo.",
        en: "The dwarves count their steps, but every third they shout \"Fizz!\", every fifth \"Buzz!\"… and when both apply, they shout both. The order of the checks is everything.",
      },
      position: { x: 7, y: 7 },
      poo_challenge: {
        topic: "Condicionales · el clásico",
        timeLimitSec: 480,
        instructions: {
          es: "Implementa fizzBuzz(int $n): array. Para 1..n: 'Fizz' si es divisible por 3, 'Buzz' si por 5, 'FizzBuzz' si por ambos, y si no, el número. Devuelve TODOS los valores como cadenas.",
          en: "For 1..n: 'Fizz' if divisible by 3, 'Buzz' if by 5, 'FizzBuzz' if by both, else the number (as a string). Implement fizzBuzz(int $n): array. Return ALL values as strings.",
        },
        starter_code: "<?php\n\nfunction fizzBuzz(int $n): array {\n}\n",
        hints: [
          { es: "Comprueba PRIMERO el múltiplo de 15; si no, «FizzBuzz» nunca saldría.", en: "Check the multiple of 15 FIRST; otherwise \"FizzBuzz\" would never come out." },
          { es: "El número también va como cadena: (string)$i", en: "The number also goes as a string: (string)$i" },
          { es: "Estructura: if (%15) … elseif (%3) … elseif (%5) … else …", en: "Structure: if (%15) … elseif (%3) … elseif (%5) … else …" },
        ],
        test_cases: [
          {
            input: "fizzBuzz(5)",
            expected: ["1", "2", "Fizz", "4", "Buzz"],
            description: { es: "Los cinco primeros", en: "The first five" },
          },
          {
            input: "fizzBuzz(15)[14]",
            expected: "FizzBuzz",
            description: { es: "El 15 es múltiplo de 3 Y de 5", en: "15 is a multiple of both 3 AND 5" },
          },
          {
            input: "count(fizzBuzz(100))",
            expected: 100,
            description: { es: "Devuelve exactamente n elementos", en: "Returns exactly n elements" },
          },
        ],
      },
    },
    {
      node_id: "warm_anagrama",
      title: { es: "Las Mismas Runas", en: "The Same Runes" },
      lore_intro: {
        es: "Dos inscripciones parecen distintas, pero están grabadas con exactamente las mismas runas. ¿Lo son?",
        en: "Two inscriptions look different, but they're carved with exactly the same runes. Are they?",
      },
      position: { x: 11, y: 4 },
      poo_challenge: {
        topic: "Hash map · O(n)",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa isAnagram(string $s, string $t): bool — true si la cadena t es un anagrama de s.",
          en: "Return true if string t is an anagram of string s. Implement isAnagram(string $s, string $t): bool.",
        },
        starter_code: "<?php\n\nfunction isAnagram(string $s, string $t): bool {\n}\n",
        hints: [
          { es: "Atajo inmediato: si las longitudes difieren, ya es false.", en: "Immediate shortcut: if the lengths differ, it's already false." },
          { es: "Cuenta las letras de $s con array_count_values(str_split($s)).", en: "Count the letters of $s with array_count_values(str_split($s))." },
          { es: "Recorre $t restando; si una letra no existe o baja de 0, devuelve false.", en: "Walk $t subtracting; if a letter doesn't exist or drops below 0, return false." },
        ],
        test_cases: [
          { input: "isAnagram('anagram', 'nagaram')", expected: true, description: { es: "Mismas letras", en: "Same letters" } },
          { input: "isAnagram('rat', 'car')", expected: false, description: { es: "Letras distintas", en: "Different letters" } },
          { input: "isAnagram('a', 'ab')", expected: false, description: { es: "Longitudes distintas", en: "Different lengths" } },
          { input: "isAnagram('', '')", expected: true, description: { es: "Dos vacías: caso borde", en: "Two empty: edge case" } },
        ],
      },
    },
    {
      node_id: "warm_unico",
      title: { es: "La Runa Solitaria", en: "The Solitary Rune" },
      lore_intro: {
        es: "En la hilera hay una única runa que no se repite en toda la inscripción. Encuentra su posición — la primera que cumpla.",
        en: "In the row there's a single rune that doesn't repeat in the whole inscription. Find its position — the first one that qualifies.",
      },
      position: { x: 12, y: 10 },
      poo_challenge: {
        topic: "Hash map · dos pasadas",
        timeLimitSec: 600,
        instructions: {
          es: "Implementa firstUniqChar(string $s): int — el índice del primer carácter que no se repite; -1 si no hay.",
          en: "Return the index of the first non-repeating character in a string, or -1 if none exists. Implement firstUniqChar(string $s): int.",
        },
        starter_code: "<?php\n\nfunction firstUniqChar(string $s): int {\n}\n",
        hints: [
          { es: "Primera pasada: cuenta cuántas veces aparece cada carácter.", en: "First pass: count how many times each character appears." },
          { es: "Segunda pasada: recorre EN ORDEN y devuelve el primer índice cuyo conteo sea 1.", en: "Second pass: walk IN ORDER and return the first index whose count is 1." },
          { es: "Hacen falta las dos pasadas: en una sola no sabes aún si algo se repetirá más adelante.", en: "Both passes are needed: in a single one you don't yet know if something will repeat later." },
        ],
        test_cases: [
          { input: "firstUniqChar('leetcode')", expected: 0, description: { es: "La 'l' es única", en: "The 'l' is unique" } },
          {
            input: "firstUniqChar('loveleetcode')",
            expected: 2,
            description: { es: "La 'v' en el índice 2", en: "The 'v' at index 2" },
          },
          { input: "firstUniqChar('aabb')", expected: -1, description: { es: "Todas se repiten", en: "All repeat" } },
          { input: "firstUniqChar('')", expected: -1, description: { es: "Cadena vacía: caso borde", en: "Empty string: edge case" } },
        ],
      },
    },
    {
      node_id: "warm_insertar",
      title: { es: "El Hueco en la Fila", en: "The Gap in the Row" },
      lore_intro: {
        es: "Las piedras están ordenadas por tamaño. Si traes una nueva, ¿en qué posición hay que encajarla para no romper el orden?",
        en: "The stones are ordered by size. If you bring a new one, at what position must it fit to keep the order?",
      },
      position: { x: 16, y: 7 },
      poo_challenge: {
        topic: "Búsqueda binaria (límite inferior) · O(log n)",
        timeLimitSec: 720,
        instructions: {
          es: "Implementa searchInsert(array $a, int $t): int — dado un array ordenado y un objetivo, el índice donde está, o donde se insertaría para mantenerlo ordenado.",
          en: "Given a sorted array and a target, return the index where it is, or where it would be inserted to keep it sorted. Implement searchInsert(array $a, int $t): int.",
        },
        starter_code: "<?php\n\nfunction searchInsert(array $a, int $t): int {\n}\n",
        hints: [
          { es: "Es una binaria distinta: $hi empieza en count($a), NO en count($a)-1.", en: "It's a different binary search: $hi starts at count($a), NOT count($a)-1." },
          { es: "El bucle va mientras $lo < $hi (no <=), y al final $lo == $hi es la respuesta.", en: "The loop runs while $lo < $hi (not <=), and at the end $lo == $hi is the answer." },
          { es: "$a[$mid] < $t ? $lo = $mid + 1 : $hi = $mid;  — fíjate en que $hi NO resta 1.", en: "$a[$mid] < $t ? $lo = $mid + 1 : $hi = $mid;  — note that $hi does NOT subtract 1." },
        ],
        test_cases: [
          { input: "searchInsert([1, 3, 5, 6], 5)", expected: 2, description: { es: "Ya está: índice 2", en: "Already present: index 2" } },
          { input: "searchInsert([1, 3, 5, 6], 2)", expected: 1, description: { es: "Iría entre 1 y 3", en: "Would go between 1 and 3" } },
          { input: "searchInsert([1, 3, 5, 6], 7)", expected: 4, description: { es: "Iría al final", en: "Would go at the end" } },
          { input: "searchInsert([], 5)", expected: 0, description: { es: "Array vacío: caso borde", en: "Empty array: edge case" } },
        ],
      },
    },
    {
      node_id: "warm_ventana_fija",
      title: { es: "La Veta más Rica", en: "The Richest Vein" },
      lore_intro: {
        es: "Debes escoger k galerías CONTIGUAS y quedarte con las de mayor rendimiento total. No vuelvas a sumar lo que ya sumaste: desliza.",
        en: "You must pick k CONTIGUOUS galleries and keep the ones with the highest total yield. Don't re-add what you already added: slide.",
      },
      position: { x: 19, y: 4 },
      poo_challenge: {
        topic: "Ventana deslizante fija · O(n)",
        timeLimitSec: 900,
        instructions: {
          es: "Implementa maxSumSubarray(array $nums, int $k): int — la suma máxima de cualquier subarray contiguo de tamaño k.",
          en: "Given an array and a number k, find the maximum sum of any contiguous subarray of size k. Implement maxSumSubarray(array $nums, int $k): int.",
        },
        starter_code: "<?php\n\nfunction maxSumSubarray(array $nums, int $k): int {\n}\n",
        hints: [
          { es: "Calcula la suma de los k primeros: array_sum(array_slice($nums, 0, $k)).", en: "Compute the sum of the first k: array_sum(array_slice($nums, 0, $k))." },
          { es: "Al desplazar la ventana, suma el que entra y resta el que sale — no recalcules toda la ventana.", en: "When sliding the window, add the one entering and subtract the one leaving — don't recompute the whole window." },
          { es: "$sum += $nums[$i] - $nums[$i - $k];  y guarda el máximo en cada paso.", en: "$sum += $nums[$i] - $nums[$i - $k];  and keep the maximum each step." },
        ],
        test_cases: [
          {
            input: "maxSumSubarray([2, 1, 5, 1, 3, 2], 3)",
            expected: 9,
            description: "5 + 1 + 3 = 9",
          },
          {
            input: "maxSumSubarray([1, 2, 3], 3)",
            expected: 6,
            description: { es: "La ventana ocupa todo el array", en: "The window spans the whole array" },
          },
          { input: "maxSumSubarray([5], 1)", expected: 5, description: { es: "Un solo elemento", en: "A single element" } },
          {
            input: "maxSumSubarray([-1, -2, -3, -4], 2)",
            expected: -3,
            description: { es: "Con negativos también: -1 + -2", en: "With negatives too: -1 + -2" },
          },
        ],
      },
    },
    {
      node_id: "warm_invertir",
      title: { es: "El Espejo de los Números", en: "The Mirror of Numbers" },
      lore_intro: {
        es: "El espejo devuelve las cifras del revés. Pero si el reflejo no cabe en la piedra rúnica de 32 bits, se desvanece en nada.",
        en: "The mirror returns the digits reversed. But if the reflection doesn't fit in the 32-bit rune stone, it vanishes into nothing.",
      },
      position: { x: 20, y: 10 },
      poo_challenge: {
        topic: "Matemáticas + desbordamiento",
        timeLimitSec: 900,
        instructions: {
          es: "Implementa reverseInt(int $x): int — invierte los dígitos de un entero con signo de 32 bits; devuelve 0 si el resultado se sale del rango de 32 bits.\n\nAVISO: este PHP es de 32 bits (PHP_INT_MAX = 2147483647). Comprueba el desbordamiento ANTES de convertir a int.",
          en: "Reverse the digits of a 32-bit signed integer. Return 0 if the result overflows the 32-bit range. Implement reverseInt(int $x): int.\n\nNOTE: this PHP is 32-bit (PHP_INT_MAX = 2147483647). Check for overflow BEFORE converting to int.",
        },
        starter_code: "<?php\n\nfunction reverseInt(int $x): int {\n}\n",
        hints: [
          { es: "Guarda el signo primero y trabaja con abs($x); al final multiplicas.", en: "Save the sign first and work with abs($x); multiply at the end." },
          { es: "Invertir es más fácil como texto: strrev((string)abs($x))", en: "Reversing is easier as text: strrev((string)abs($x))" },
          { es: "Cuidado: (int)'9646324351' se SATURA a PHP_INT_MAX en 32 bits y el desbordamiento pasaría desapercibido. Conviértelo antes a float, que es exacto hasta 2^53: $rev = (float)strrev((string)abs($x));", en: "Careful: (int)'9646324351' SATURATES to PHP_INT_MAX on 32-bit and the overflow would go unnoticed. Convert it first to float, exact up to 2^53: $rev = (float)strrev((string)abs($x));" },
          { es: "Y sólo entonces valida: if ($rev > 2**31 - 1) return 0; return (int)$rev * $sign;", en: "And only then validate: if ($rev > 2**31 - 1) return 0; return (int)$rev * $sign;" },
        ],
        test_cases: [
          { input: "reverseInt(123)", expected: 321, description: { es: "Positivo", en: "Positive" } },
          { input: "reverseInt(-123)", expected: -321, description: { es: "El signo se conserva", en: "The sign is preserved" } },
          { input: "reverseInt(120)", expected: 21, description: { es: "Los ceros finales desaparecen", en: "Trailing zeroes disappear" } },
          {
            input: "reverseInt(1534236469)",
            expected: 0,
            description: { es: "Al invertirlo se desborda: devuelve 0", en: "Reversing it overflows: returns 0" },
          },
          { input: "reverseInt(0)", expected: 0, description: { es: "Caso borde", en: "Edge case" } },
        ],
      },
    },
  ],
};

/** Capítulos jugables (con mapa y nodos). */
// ---- Libro VI · Las Dos Torres (enums y máquinas de estado) ----

/**
 * Capítulo 15 · El Sendero de Sméagol.
 * Emyn Muil y la Ciénaga de los Muertos. Gollum tiene DOS estados y sólo dos:
 * es el ejemplo perfecto de un enum de PHP 8.1 y de una máquina de estados.
 */
export const CHAPTER_GOLLUM: Chapter = {
  chapter: 15,
  title: { es: "El Sendero de Sméagol", en: "Sméagol's Path" },
  lore: {
    es: "Empieza un nuevo viaje y una nueva lengua. Frodo y Sam se pierden en el Emyn Muil con Sméagol de guía; y aquí, donde la piedra es gris y el camino incierto, se aprende Python desde la primera palabra. En estas Dos Torres se pasa de cero a experto.",
    en: "A new journey and a new language begin. Frodo and Sam are lost in the Emyn Muil with Sméagol as guide; and here, where the stone is grey and the path uncertain, Python is learned from the very first word. In these Two Towers you go from zero to expert.",
  },
  mapSize: { cols: 24, rows: 14 },
  spawn: { x: 2, y: 7 },
  companions: ["sam"],
  scenery: {
    ground: "grassDark",
    pathRows: [7],
    pathGround: "path",
    pond: { x: 9, y: 9, w: 8, h: 4 }, // la Ciénaga de los Muertos
    npcs: [{ spriteId: "gollum", x: 4, y: 10, label: { es: "…nos sigue", en: "…it follows us" } }],
    dialogues: [
      {
        x: 7,
        y: 8,
        speaker: "sam",
        name: { es: "Sam", en: "Sam" },
        text: {
          es: "Otra tierra, otra lengua. Dicen que ésta se lee casi como se habla.",
          en: "Another land, another language. They say this one reads almost like it's spoken.",
        },
      },
      {
        x: 18,
        y: 8,
        speaker: "sam",
        name: { es: "Sam", en: "Sam" },
        text: {
          es: "Nada de llaves ni puntos y comas: aquí lo que manda es la sangría.",
          en: "No braces, no semicolons: here it's the indentation that rules.",
        },
      },
    ],
    decor: [
      { type: "rock", x: 3, y: 3 },
      { type: "rock", x: 7, y: 2 },
      { type: "rock", x: 11, y: 3 },
      { type: "rock", x: 16, y: 2 },
      { type: "rock", x: 20, y: 3 },
      { type: "rock", x: 22, y: 11 },
      { type: "pine", x: 1, y: 12 },
      { type: "pine", x: 6, y: 12 },
      { type: "pine", x: 23, y: 6 },
    ],
  },
  nodes: [
    {
      node_id: "py_pergamino_fundamentos",
      kind: "scroll",
      title: { es: "El Pergamino de la Nueva Lengua", en: "The Scroll of the New Tongue" },
      lore_intro: {
        es: "Grabado en una losa del Emyn Muil, en signos que no son runas enanas ni tengwar élficas. Quien lo lee empieza a pensar en Python.",
        en: "Carved on a slab in the Emyn Muil, in signs that are neither dwarven runes nor Elvish tengwar. Whoever reads it starts thinking in Python.",
      },
      position: { x: 5, y: 5 },
      scroll: {
        topic: "Python desde cero: variables, tipos y f-strings",
        sections: [
          {
            heading: { es: "Sin ceremonias: variables", en: "No ceremony: variables" },
            body: {
              es: "En Python una variable existe en cuanto le asignas un valor: no se declara el tipo, no lleva $, no acaba en punto y coma. El nombre a la izquierda, el valor a la derecha. El tipo lo deduce Python del valor (tipado dinámico), pero cada valor SÍ tiene un tipo firme.",
              en: "In Python a variable exists as soon as you assign it a value: no type declaration, no $, no trailing semicolon. Name on the left, value on the right. Python infers the type from the value (dynamic typing), but each value DOES have a firm type.",
            },
            code:
              "nombre = 'Sméagol'      # str (texto)\nedad = 589              # int (entero)\npeso = 12.5             # float (decimal)\ntiene_anillo = False    # bool (True / False)\ntesoro = None           # None: la ausencia de valor\n\n# Python distingue mayúsculas: Edad y edad son variables distintas.",
          },
          {
            heading: { es: "La sangría ES la sintaxis", en: "Indentation IS the syntax" },
            body: {
              es: "Donde otros lenguajes ponen llaves { }, Python usa la SANGRÍA (la indentación). Un bloque son las líneas indentadas bajo una cabecera terminada en dos puntos. Mezclar espacios y tabulaciones, o sangrar de más, es un error de verdad (IndentationError), no un detalle de estilo. La convención es 4 espacios.",
              en: "Where other languages put braces { }, Python uses INDENTATION. A block is the lines indented under a header ending in a colon. Mixing spaces and tabs, or over-indenting, is a real error (IndentationError), not a style detail. The convention is 4 spaces.",
            },
            code:
              "if edad > 100:\n    print('Muy viejo')      # dentro del if (4 espacios)\n    print('...y flaco')     # sigue dentro\nprint('Fuera del if')       # ya fuera\n\n# Los comentarios empiezan con # y llegan al fin de la línea.",
          },
          {
            heading: { es: "f-strings: texto con valores dentro", en: "f-strings: text with values inside" },
            body: {
              es: "La forma moderna de construir texto es la f-string: una cadena precedida de f donde, entre llaves { }, metes cualquier expresión Python y se sustituye por su valor. Es legible y rápida. También puedes concatenar con +, pero exige que todo sea texto.",
              en: "The modern way to build text is the f-string: a string prefixed with f where, inside braces { }, you put any Python expression and it's replaced by its value. It's readable and fast. You can also concatenate with +, but that requires everything to be text.",
            },
            code:
              "nombre = 'Frodo'\nedad = 50\nsaludo = f'Soy {nombre} y tengo {edad} años'\n# -> 'Soy Frodo y tengo 50 años'\n\n# Dentro de las llaves cabe una operación:\nf'El año que viene tendré {edad + 1}'\n\n# Concatenar exige convertir: 'edad: ' + str(edad)",
          },
          {
            heading: { es: "Tipos y conversión", en: "Types and conversion" },
            body: {
              es: "Cada valor tiene un tipo, y a veces hay que convertir. `int('42')` pasa texto a entero; `str(42)` al revés; `float('3.14')`. Sumar un int y un str es TypeError: Python no adivina, te obliga a decidir. `type(x)` te dice el tipo; `len(x)` la longitud de un texto o una lista.",
              en: "Every value has a type, and sometimes you must convert. `int('42')` turns text into an integer; `str(42)` the other way; `float('3.14')`. Adding an int and a str is a TypeError: Python doesn't guess, it forces you to decide. `type(x)` tells you the type; `len(x)` the length of a text or a list.",
            },
            code:
              "int('42')        # 42   (texto -> entero)\nstr(42)          # '42'  (entero -> texto)\nfloat('3.14')    # 3.14\nint('42') + 8    # 50\n\n'año ' + 589     # TypeError: no se mezcla str con int\nlen('Mordor')    # 6",
          },
          {
            heading: { es: "Operadores y condiciones", en: "Operators and conditions" },
            body: {
              es: "Los aritméticos son los de siempre, con dos joyas: // es la división ENTERA y % el resto. En condiciones, los booleanos se escriben con palabras: `and`, `or`, `not` (no &&, ||, !). Y la escalera de decisión es if / elif / else — ojo, `elif`, no `else if`.",
              en: "The arithmetic ones are the usual, with two gems: // is INTEGER division and % the remainder. In conditions, the booleans are written as words: `and`, `or`, `not` (not &&, ||, !). And the decision ladder is if / elif / else — careful, it's `elif`, not `else if`.",
            },
            code:
              "7 // 2      # 3  (división entera)\n7 % 2       # 1  (resto)\n2 ** 10     # 1024 (potencia)\n\nif peces <= 0:\n    estado = 'hambriento'\nelif peces < 3:\n    estado = 'conforme'\nelse:\n    estado = 'gordo y feliz'",
          },
        ],
        keyTakeaway: {
          es: "Python: sin declarar tipos, sin llaves, sin punto y coma. La sangría define los bloques, las f-strings arman el texto (f'…{valor}…'), y las condiciones se leen en inglés: and, or, not, if/elif/else.",
          en: "Python: no type declarations, no braces, no semicolons. Indentation defines the blocks, f-strings build the text (f'…{value}…'), and conditions read like English: and, or, not, if/elif/else.",
        },
      },
    },
    {
      node_id: "py_presentarse",
      title: { es: "La primera palabra", en: "The first word" },
      lore_intro: {
        es: "«Sméagol ayuda, sí, ayuda… pero antes el amo debe decir quién es.» La criatura ladea la cabeza, esperando una presentación en la lengua nueva.",
        en: "\"Sméagol helps, yes, helps… but first master must say who he is.\" The creature tilts its head, waiting for an introduction in the new tongue.",
      },
      position: { x: 9, y: 6 },
      spriteId: "gollum",
      poo_challenge: {
        lang: "python",
        topic: "Variables y f-strings",
        instructions: {
          es:
            "Escribe la función `presentarse(nombre, edad)` que devuelva una f-string con EXACTAMENTE este formato:\n\n" +
            "  Soy {nombre} y tengo {edad} años\n\n" +
            "Por ejemplo, `presentarse('Frodo', 50)` debe devolver `'Soy Frodo y tengo 50 años'`.\n\n" +
            "Fíjate en la sangría: el cuerpo de la función va indentado 4 espacios bajo el `def`.",
          en:
            "Write the function `presentarse(nombre, edad)` that returns an f-string with EXACTLY this format:\n\n" +
            "  Soy {nombre} y tengo {edad} años\n\n" +
            "For example, `presentarse('Frodo', 50)` must return `'Soy Frodo y tengo 50 años'`.\n\n" +
            "Mind the indentation: the function body is indented 4 spaces under the `def`.",
        },
        starter_code: "def presentarse(nombre, edad):\n    ...\n",
        blocks: [
          "def presentarse(nombre, edad):",
          "    return f'Soy {nombre} y tengo {edad} años'",
          "    return f'Soy {nombre} y tengo {edad}'",
          "    return 'Soy {nombre} y tengo {edad} años'",
        ],
        hints: [
          { es: "Una función se declara con `def nombre(parametros):` y su cuerpo va indentado debajo.", en: "A function is declared with `def name(params):` and its body is indented below." },
          { es: "Una f-string lleva la f delante y las variables entre llaves: `f'Soy {nombre}...'`.", en: "An f-string has the f in front and variables inside braces: `f'Soy {nombre}...'`." },
          { es: "`return f'Soy {nombre} y tengo {edad} años'` — cuida los espacios y la palabra «años».", en: "`return f'Soy {nombre} y tengo {edad} años'` — mind the spaces and the word «años»." },
        ],
        test_cases: [
          {
            input: "presentarse('Frodo', 50)",
            expected: "Soy Frodo y tengo 50 años",
            description: { es: "El formato exacto", en: "The exact format" },
            raw: true,
          },
          {
            input: "presentarse('Sméagol', 589)",
            expected: "Soy Sméagol y tengo 589 años",
            description: { es: "Funciona con tildes y números grandes", en: "Works with accents and big numbers" },
            raw: true,
          },
          {
            input: "presentarse('Sam', 38)",
            expected: "Soy Sam y tengo 38 años",
            description: { es: "Y con cualquier otro valor", en: "And with any other value" },
            raw: true,
          },
        ],
      },
    },
    {
      node_id: "py_tipos",
      title: { es: "Contar peces", en: "Counting fish" },
      lore_intro: {
        es: "«¡Peces! ¡Ricos y jugosos!» Gollum cuenta con los dedos huesudos, pero se lía con los números escritos. Necesita quien convierta y calcule.",
        en: "\"Fish! Juicy sweet ones!\" Gollum counts on his bony fingers, but gets muddled with written numbers. He needs someone to convert and calculate.",
      },
      position: { x: 14, y: 5 },
      spriteId: "gollum",
      poo_challenge: {
        lang: "python",
        topic: "Tipos, conversión y operadores",
        instructions: {
          es:
            "Escribe dos funciones:\n\n" +
            "• `es_par(n)` — devuelve True si el entero `n` es par, False si no. Usa el resto `%`.\n" +
            "• `a_entero(texto)` — recibe un texto como `'42'` y devuelve su valor entero (un `int`), no el texto.\n\n" +
            "Recuerda: `int('42')` convierte texto a número; `n % 2` da el resto de dividir entre 2.",
          en:
            "Write two functions:\n\n" +
            "• `es_par(n)` — returns True if the integer `n` is even, False otherwise. Use the remainder `%`.\n" +
            "• `a_entero(texto)` — takes a text like `'42'` and returns its integer value (an `int`), not the text.\n\n" +
            "Remember: `int('42')` converts text to a number; `n % 2` gives the remainder of dividing by 2.",
        },
        starter_code: "def es_par(n):\n    ...\n\ndef a_entero(texto):\n    ...\n",
        blocks: [
          "def es_par(n):",
          "    return n % 2 == 0",
          "def a_entero(texto):",
          "    return int(texto)",
          "    return n % 2 == 1",
          "    return texto",
        ],
        hints: [
          { es: "Un número es par si al dividirlo entre 2 el resto es 0: `n % 2 == 0`. Esa comparación YA es un booleano, puedes devolverla directamente.", en: "A number is even if dividing by 2 leaves remainder 0: `n % 2 == 0`. That comparison is ALREADY a boolean, you can return it directly." },
          { es: "`int(texto)` convierte un str a int. `a_entero('42')` debe devolver el número 42, no la cadena '42'.", en: "`int(texto)` converts a str to int. `a_entero('42')` must return the number 42, not the string '42'." },
          { es: "`return n % 2 == 0` en la primera; `return int(texto)` en la segunda.", en: "`return n % 2 == 0` in the first; `return int(texto)` in the second." },
        ],
        test_cases: [
          { input: "es_par(4)", expected: true, description: { es: "4 es par", en: "4 is even" }, raw: true },
          { input: "es_par(7)", expected: false, description: { es: "7 es impar", en: "7 is odd" }, raw: true },
          { input: "es_par(0)", expected: true, description: { es: "0 es par", en: "0 is even" }, raw: true },
          {
            input: "a_entero('42')",
            expected: 42,
            description: { es: "Convierte texto a entero", en: "Converts text to integer" },
            raw: true,
          },
          {
            input: "a_entero('42') + 8",
            expected: 50,
            description: { es: "Y el resultado es un número de verdad (se puede sumar)", en: "And the result is a real number (you can add to it)" },
            raw: true,
          },
        ],
      },
    },
    {
      node_id: "py_condiciones",
      title: { es: "El humor de la criatura", en: "The creature's mood" },
      lore_intro: {
        es: "El ánimo de Sméagol cambia con el estómago. Vacío, gruñe; algo lleno, colabora; bien cebado, casi es amable. Traduce ese humor a Python.",
        en: "Sméagol's mood shifts with his stomach. Empty, he snarls; somewhat full, he cooperates; well fed, he's almost kind. Translate that mood into Python.",
      },
      position: { x: 20, y: 6 },
      spriteId: "gollum",
      poo_challenge: {
        lang: "python",
        topic: "Condicionales: if / elif / else",
        instructions: {
          es:
            "Escribe `clasificar(peces)` que devuelva, según cuántos peces ha comido:\n\n" +
            "• `'hambriento'` si `peces` es 0 o menos\n" +
            "• `'conforme'` si es 1 o 2 (menos de 3)\n" +
            "• `'gordo y feliz'` si es 3 o más\n\n" +
            "Usa la escalera `if` / `elif` / `else`. Recuerda: es `elif`, no `else if`, y cada rama va indentada.",
          en:
            "Write `clasificar(peces)` that returns, based on how many fish it has eaten:\n\n" +
            "• `'hambriento'` if `peces` is 0 or less\n" +
            "• `'conforme'` if it's 1 or 2 (less than 3)\n" +
            "• `'gordo y feliz'` if it's 3 or more\n\n" +
            "Use the `if` / `elif` / `else` ladder. Remember: it's `elif`, not `else if`, and each branch is indented.",
        },
        starter_code: "def clasificar(peces):\n    if peces <= 0:\n        return 'hambriento'\n",
        blocks: [
          "def clasificar(peces):",
          "    if peces <= 0:",
          "        return 'hambriento'",
          "    elif peces < 3:",
          "        return 'conforme'",
          "    else:",
          "        return 'gordo y feliz'",
          "    elif peces > 3:",
          "        return 'conforme y feliz'",
        ],
        hints: [
          { es: "Tres casos, tres ramas: `if peces <= 0:` … `elif peces < 3:` … `else:`.", en: "Three cases, three branches: `if peces <= 0:` … `elif peces < 3:` … `else:`." },
          { es: "Cada `return` va indentado 8 espacios (dentro de su rama, que ya está dentro de la función).", en: "Each `return` is indented 8 spaces (inside its branch, which is already inside the function)." },
          { es: "Con `<= 0` cubres el 0 y los negativos; con `< 3` cubres el 1 y el 2; el `else` recoge 3 o más.", en: "With `<= 0` you cover 0 and negatives; with `< 3` you cover 1 and 2; the `else` catches 3 or more." },
        ],
        test_cases: [
          {
            input: "clasificar(0)",
            expected: "hambriento",
            description: { es: "Sin peces, hambriento", en: "No fish, hungry" },
            raw: true,
          },
          {
            input: "clasificar(-2)",
            expected: "hambriento",
            description: { es: "Números negativos también", en: "Negative numbers too" },
            raw: true,
          },
          {
            input: "clasificar(2)",
            expected: "conforme",
            description: { es: "Uno o dos, conforme", en: "One or two, content" },
            raw: true,
          },
          {
            input: "clasificar(3)",
            expected: "gordo y feliz",
            description: { es: "Tres justos ya es festín", en: "Exactly three is already a feast" },
            raw: true,
          },
          {
            input: "clasificar(10)",
            expected: "gordo y feliz",
            description: { es: "Y de ahí para arriba", en: "And upward from there" },
            raw: true,
          },
        ],
      },
    },
    {
      node_id: "py_quiz_fundamentos",
      kind: "quiz",
      title: { es: "Los acertijos de la ciénaga", en: "The riddles of the marsh" },
      lore_intro: {
        es: "«¿Juega a los acertijos, mi tesoro? Preguntas fáciles… en la lengua nueva.» Las luces de la Ciénaga de los Muertos parpadean mientras Sméagol espera respuesta.",
        en: "\"Does it play riddles, precious? Easy questions… in the new tongue.\" The lights of the Dead Marshes flicker while Sméagol waits for an answer.",
      },
      position: { x: 12, y: 11 },
      spriteId: "gollum",
      quiz: {
        topic: "Fundamentos de Python",
        questions: [
          {
            question: { es: "¿Cómo se define un bloque de código en Python?", en: "How is a code block defined in Python?" },
            options: [
              { es: "Por la sangría (indentación) bajo una cabecera terminada en :", en: "By the indentation under a header ending in :" },
              { es: "Con llaves { }", en: "With braces { }" },
              { es: "Con begin / end", en: "With begin / end" },
              { es: "Con paréntesis ( )", en: "With parentheses ( )" },
            ],
            correct: 0,
            explanation: {
              es: "Python no usa llaves: el bloque son las líneas indentadas bajo una línea que acaba en dos puntos (`if ...:`, `def ...:`). La sangría no es estética, es sintaxis: sangrar mal es un IndentationError.",
              en: "Python doesn't use braces: the block is the lines indented under a line ending in a colon (`if ...:`, `def ...:`). Indentation isn't cosmetic, it's syntax: indenting wrong is an IndentationError.",
            },
          },
          {
            question: { es: "¿Qué devuelve `7 // 2` en Python?", en: "What does `7 // 2` return in Python?" },
            options: ["3", "3.5", "1", "'3.5'"],
            correct: 0,
            explanation: {
              es: "`//` es la división ENTERA: descarta la parte decimal y devuelve 3. La división normal `/` daría 3.5 (un float). Y `%` daría el resto, 1.",
              en: "`//` is INTEGER division: it drops the decimal part and returns 3. Regular division `/` would give 3.5 (a float). And `%` would give the remainder, 1.",
            },
          },
          {
            question: { es: "¿Cuál es la forma correcta de encadenar tres condiciones?", en: "What's the correct way to chain three conditions?" },
            options: [
              "if … : / elif … : / else :",
              "if … { } else if … { }",
              "if … : / else if … : / else :",
              "switch … case",
            ],
            correct: 0,
            explanation: {
              es: "En Python la rama intermedia es `elif` (no `else if` ni `elseif`), y cada cabecera termina en dos puntos. No hay `switch` clásico (desde 3.10 existe `match`, pero para esto se usa if/elif/else).",
              en: "In Python the middle branch is `elif` (not `else if` or `elseif`), and each header ends in a colon. There's no classic `switch` (since 3.10 there's `match`, but for this you use if/elif/else).",
            },
          },
          {
            question: {
              es: "`edad = 50`. ¿Qué imprime `print('Tengo ' + edad + ' años')`?",
              en: "`edad = 50`. What does `print('Tengo ' + edad + ' años')` print?",
            },
            options: [
              { es: "TypeError: no se puede sumar str e int", en: "TypeError: can't add str and int" },
              { es: "Tengo 50 años", en: "Tengo 50 años" },
              { es: "Tengo50años", en: "Tengo50años" },
              { es: "Tengo + 50 + años", en: "Tengo + 50 + años" },
            ],
            correct: 0,
            explanation: {
              es: "Concatenar con + exige que todo sea del mismo tipo: `str + int` es TypeError. Habría que convertir (`'Tengo ' + str(edad) + ' años'`) o, mejor, usar una f-string: `f'Tengo {edad} años'`.",
              en: "Concatenating with + requires everything to be the same type: `str + int` is a TypeError. You'd need to convert (`'Tengo ' + str(edad) + ' años'`) or, better, use an f-string: `f'Tengo {edad} años'`.",
            },
          },
        ],
      },
    },
  ],
};

export const CHAPTER_HELM: Chapter = {
  chapter: 16,
  title: { es: "El Abismo de Helm", en: "Helm's Deep" },
  lore: {
    es: "Cae la noche sobre el Sagrario y una hueste sin fin avanza bajo la lluvia. Diez mil Uruk-hai que no se cuentan de un vistazo: hay que recorrerlos, uno a uno, con un bucle. Aquí Python aprende a repetir, contar y decidir dentro del combate.",
    en: "Night falls over the Hornburg and an endless host advances in the rain. Ten thousand Uruk-hai you can't count at a glance: you must go through them, one by one, with a loop. Here Python learns to repeat, count and decide in the thick of combat.",
  },
  mapSize: { cols: 24, rows: 14 },
  spawn: { x: 2, y: 7 },
  companions: ["aragorn", "legolas", "gimli"],
  scenery: {
    ground: "stone",
    pathRows: [7],
    pathGround: "darkstone",
    npcs: [
      { spriteId: "uruk", x: 20, y: 2, label: { es: "La hueste", en: "The host" } },
      { spriteId: "uruk", x: 22, y: 4 },
      { spriteId: "uruk", x: 21, y: 12 },
      { spriteId: "uruk", x: 23, y: 10 },
    ],
    dialogues: [
      {
        x: 6,
        y: 8,
        speaker: "gimli",
        name: { es: "Gimli", en: "Gimli" },
        text: {
          es: "Podría abrirme paso a hachazos, pero prefiero contarlos con un for.",
          en: "I could hack my way through, but I'd rather count them with a for.",
        },
      },
      {
        x: 12,
        y: 8,
        speaker: "legolas",
        name: { es: "Legolas", en: "Legolas" },
        text: {
          es: "Mientras queden flechas, un while. Cuando se agoten, se rompe el bucle.",
          en: "While arrows remain, a while. When they run out, the loop breaks.",
        },
      },
      {
        x: 18,
        y: 8,
        speaker: "aragorn",
        name: { es: "Aragorn", en: "Aragorn" },
        text: {
          es: "Recorre la muralla con enumerate: sabrás en qué tramo cede.",
          en: "Walk the wall with enumerate: you'll know which stretch gives way.",
        },
      },
    ],
    decor: [
      { type: "house", x: 4, y: 6, label: { es: "El Baluarte", en: "The Keep" } },
      { type: "rock", x: 9, y: 2 },
      { type: "rock", x: 13, y: 3 },
      { type: "rock", x: 17, y: 2 },
      { type: "rock", x: 8, y: 12 },
      { type: "rock", x: 13, y: 11 },
      { type: "rock", x: 3, y: 11 },
    ],
  },
  nodes: [
    {
      node_id: "py_pergamino_bucles",
      kind: "scroll",
      title: { es: "El Pergamino de las Repeticiones", en: "The Scroll of Repetitions" },
      lore_intro: {
        es: "Clavado en la puerta del Baluarte, bajo la lluvia. Enseña a repetir sin cansarse: la única forma de enfrentar a diez mil.",
        en: "Nailed to the Keep's door, in the rain. It teaches how to repeat without tiring: the only way to face ten thousand.",
      },
      scroll: {
        topic: "Control de flujo: for, while, range y enumerate",
        sections: [
          {
            heading: { es: "for: repetir sobre una secuencia", en: "for: repeat over a sequence" },
            body: {
              es: "El bucle `for` de Python recorre los elementos de algo iterable (una lista, un texto, un rango) y ejecuta su cuerpo una vez por elemento. No hay contador manual ni condición: la variable toma cada valor directamente. Es un «para cada», no el for de C.",
              en: "Python's `for` loop walks the elements of something iterable (a list, a text, a range) and runs its body once per element. No manual counter, no condition: the variable takes each value directly. It's a \"for each\", not the C for.",
            },
            code:
              "for enemigo in ['orco', 'trasgo', 'uruk']:\n    print(enemigo)     # se ejecuta 3 veces\n\n# También recorre el texto carácter a carácter:\nfor letra in 'Rohan':\n    print(letra)",
          },
          {
            heading: { es: "range: contar sin lista", en: "range: counting without a list" },
            body: {
              es: "`range(n)` produce los números 0, 1, …, n-1 (el final NO se incluye). `range(a, b)` va de a hasta b-1, y `range(a, b, paso)` salta de `paso` en `paso`. Combinado con `for`, es cómo repites algo N veces o recorres índices.",
              en: "`range(n)` produces the numbers 0, 1, …, n-1 (the end is NOT included). `range(a, b)` goes from a to b-1, and `range(a, b, step)` jumps by `step`. Combined with `for`, it's how you repeat something N times or walk indices.",
            },
            code:
              "for i in range(3):        # 0, 1, 2\n    print(i)\n\nrange(1, 6)               # 1, 2, 3, 4, 5\nrange(0, 10, 2)           # 0, 2, 4, 6, 8\n\n# Acumular: sumar 1..n\ntotal = 0\nfor i in range(1, n + 1):\n    total += i",
          },
          {
            heading: { es: "while: repetir mientras se cumpla algo", en: "while: repeat while something holds" },
            body: {
              es: "`while condicion:` repite el cuerpo mientras la condición sea verdadera, comprobándola antes de cada vuelta. Se usa cuando no sabes de antemano cuántas veces hay que iterar — hasta agotar las flechas, hasta que el muro caiga. Cuidado: algo dentro debe acercar la condición a falsa, o el bucle es infinito.",
              en: "`while condition:` repeats the body while the condition is true, checking it before each round. Use it when you don't know in advance how many times to iterate — until the arrows run out, until the wall falls. Careful: something inside must move the condition toward false, or the loop is infinite.",
            },
            code:
              "flechas = 5\nwhile flechas > 0:\n    disparar()\n    flechas -= 1        # sin esto, bucle infinito\n\n# Contar cuántas vueltas hicieron falta\nturnos = 0\nwhile muro > 0:\n    muro -= golpe\n    turnos += 1",
          },
          {
            heading: { es: "break y continue", en: "break and continue" },
            body: {
              es: "`break` sale del bucle de inmediato, sin terminar las vueltas restantes. `continue` salta el resto del cuerpo y pasa a la siguiente vuelta. Sirven para cortar en cuanto encuentras lo que buscas, o para ignorar los casos que no interesan.",
              en: "`break` leaves the loop immediately, without finishing the remaining rounds. `continue` skips the rest of the body and moves to the next round. They're for cutting out as soon as you find what you want, or ignoring the cases you don't care about.",
            },
            code:
              "for i, r in enumerate(muralla):\n    if r <= 0:\n        primera_brecha = i\n        break          # ya la encontré, no sigo\n\nfor n in numeros:\n    if n < 0:\n        continue       # ignora los negativos\n    procesar(n)",
          },
          {
            heading: { es: "enumerate: el índice y el valor a la vez", en: "enumerate: index and value at once" },
            body: {
              es: "Cuando necesitas SABER la posición mientras recorres, `enumerate(secuencia)` te da pares (índice, valor). Es más limpio y menos propenso a errores que llevar un contador a mano o usar `range(len(...))`.",
              en: "When you need to KNOW the position while iterating, `enumerate(sequence)` gives you (index, value) pairs. It's cleaner and less error-prone than keeping a counter by hand or using `range(len(...))`.",
            },
            code:
              "for i, sala in enumerate(['Mazarbul', 'Puente']):\n    print(i, sala)     # 0 Mazarbul / 1 Puente\n\n# Recoger las posiciones que cumplen algo\ndebiles = []\nfor i, n in enumerate(enemigos):\n    if n < umbral:\n        debiles.append(i)",
          },
        ],
        keyTakeaway: {
          es: "for recorre un iterable (usa range para contar); while repite mientras algo sea cierto; break corta y continue salta; enumerate te da índice y valor juntos. Con eso ya puedes repetir, contar y decidir.",
          en: "for walks an iterable (use range to count); while repeats while something is true; break cuts out and continue skips; enumerate gives you index and value together. With that you can already repeat, count and decide.",
        },
      },
      position: { x: 4, y: 4 },
    },
    {
      node_id: "py_suma_hasta",
      title: { es: "Las salvas de la muralla", en: "The volleys from the wall" },
      lore_intro: {
        es: "«En la primera oleada, una salva; en la segunda, dos; y así hasta la enésima.» Cuenta cuántas flechas se disparan en total.",
        en: "\"On the first wave, one volley; on the second, two; and so on up to the nth.\" Count how many arrows are fired in total.",
      },
      spriteId: "legolas",
      poo_challenge: {
        lang: "python",
        topic: "Bucle for con range y acumulador",
        instructions: {
          es:
            "Escribe `suma_hasta(n)` que devuelva la suma de todos los enteros de 1 a `n` (ambos incluidos): 1 + 2 + … + n.\n\n" +
            "Usa un bucle `for` con `range` y un acumulador. Con `n = 0` (o negativo) no hay nada que sumar: devuelve 0.",
          en:
            "Write `suma_hasta(n)` that returns the sum of all integers from 1 to `n` (both included): 1 + 2 + … + n.\n\n" +
            "Use a `for` loop with `range` and an accumulator. With `n = 0` (or negative) there's nothing to add: return 0.",
        },
        starter_code: "def suma_hasta(n):\n    total = 0\n    return total\n",
        hints: [
          { es: "`range(1, n + 1)` genera 1, 2, …, n. El `+ 1` es porque el final de range NO se incluye.", en: "`range(1, n + 1)` yields 1, 2, …, n. The `+ 1` is because range's end is NOT included." },
          { es: "Dentro del for, acumula: `total += i`.", en: "Inside the for, accumulate: `total += i`." },
          { es: "Si n es 0, `range(1, 1)` está vacío y el for no se ejecuta: total se queda en 0. No hace falta un caso especial.", en: "If n is 0, `range(1, 1)` is empty and the for doesn't run: total stays 0. No special case needed." },
        ],
        test_cases: [
          { input: "suma_hasta(5)", expected: 15, description: "1+2+3+4+5", raw: true },
          { input: "suma_hasta(1)", expected: 1, description: { es: "Sólo el 1", en: "Just the 1" }, raw: true },
          { input: "suma_hasta(0)", expected: 0, description: { es: "Nada que sumar", en: "Nothing to add" }, raw: true },
          { input: "suma_hasta(10)", expected: 55, description: { es: "Hasta diez", en: "Up to ten" }, raw: true },
          { input: "suma_hasta(100)", expected: 5050, description: { es: "La suma de Gauss", en: "Gauss's sum" }, raw: true },
        ],
      },
      position: { x: 9, y: 5 },
    },
    {
      node_id: "py_aguantar",
      title: { es: "Cuánto aguanta el muro", en: "How long the wall holds" },
      lore_intro: {
        es: "El Muro Profundo encaja golpe tras golpe. Gimli quiere saber cuántos embates resistirá antes de ceder.",
        en: "The Deeping Wall takes blow after blow. Gimli wants to know how many strikes it will withstand before it gives way.",
      },
      spriteId: "gimli",
      poo_challenge: {
        lang: "python",
        topic: "Bucle while con contador",
        instructions: {
          es:
            "Escribe `aguantar(resistencia, golpe)` que devuelva cuántos golpes de fuerza `golpe` resiste un muro con `resistencia` puntos antes de caer (llegar a 0 o menos).\n\n" +
            "Cada golpe resta `golpe` a la resistencia. Cuenta los golpes con un `while`. Si el muro ya está a 0 o menos, aguanta 0 golpes.",
          en:
            "Write `aguantar(resistencia, golpe)` that returns how many blows of strength `golpe` a wall with `resistencia` points withstands before falling (reaching 0 or less).\n\n" +
            "Each blow subtracts `golpe` from the resistance. Count the blows with a `while`. If the wall is already at 0 or less, it withstands 0 blows.",
        },
        starter_code: "def aguantar(resistencia, golpe):\n    turnos = 0\n    return turnos\n",
        hints: [
          { es: "`while resistencia > 0:` repite mientras el muro aguante.", en: "`while resistencia > 0:` repeats while the wall holds." },
          { es: "Dentro: resta el golpe y suma un turno: `resistencia -= golpe` y `turnos += 1`.", en: "Inside: subtract the blow and add a turn: `resistencia -= golpe` and `turnos += 1`." },
          { es: "Si `resistencia` ya es 0 o menos, el while no entra y devuelves 0, que es lo correcto.", en: "If `resistencia` is already 0 or less, the while doesn't enter and you return 0, which is correct." },
        ],
        test_cases: [
          { input: "aguantar(10, 3)", expected: 4, description: "10 → 7 → 4 → 1 → -2", raw: true },
          { input: "aguantar(10, 5)", expected: 2, description: { es: "Dos golpes justos", en: "Exactly two blows" }, raw: true },
          { input: "aguantar(7, 10)", expected: 1, description: { es: "Un solo golpe brutal", en: "A single brutal blow" }, raw: true },
          { input: "aguantar(0, 5)", expected: 0, description: { es: "Ya estaba caído", en: "It was already down" }, raw: true },
          { input: "aguantar(100, 1)", expected: 100, description: { es: "Cien golpes de gota", en: "A hundred dripping blows" }, raw: true },
        ],
      },
      position: { x: 14, y: 5 },
    },
    {
      node_id: "py_filas_debiles",
      title: { es: "El tramo que cede", en: "The stretch that gives way" },
      lore_intro: {
        es: "Aragorn recorre la muralla contando defensores por tramo. Necesita los tramos flojos, con menos hombres de los que el umbral exige — y su número exacto de tramo.",
        en: "Aragorn walks the wall counting defenders per stretch. He needs the weak stretches, with fewer men than the threshold demands — and their exact stretch number.",
      },
      spriteId: "aragorn",
      poo_challenge: {
        lang: "python",
        topic: "for + enumerate + condicional",
        instructions: {
          es:
            "Escribe `filas_debiles(enemigos, umbral)` que reciba una lista de números (defensores por tramo) y devuelva una LISTA con los ÍNDICES de los tramos cuyo valor es MENOR que `umbral`.\n\n" +
            "Por ejemplo, `filas_debiles([12, 3, 8, 20, 1], 10)` → `[1, 2, 4]` (los tramos 1, 2 y 4 tienen menos de 10).\n\n" +
            "Usa `enumerate` para tener el índice y el valor a la vez.",
          en:
            "Write `filas_debiles(enemigos, umbral)` that takes a list of numbers (defenders per stretch) and returns a LIST with the INDICES of the stretches whose value is LESS than `umbral`.\n\n" +
            "For example, `filas_debiles([12, 3, 8, 20, 1], 10)` → `[1, 2, 4]` (stretches 1, 2 and 4 have fewer than 10).\n\n" +
            "Use `enumerate` to get the index and value at once.",
        },
        starter_code: "def filas_debiles(enemigos, umbral):\n    debiles = []\n    return debiles\n",
        hints: [
          { es: "`for i, n in enumerate(enemigos):` te da el índice `i` y el valor `n` en cada vuelta.", en: "`for i, n in enumerate(enemigos):` gives you the index `i` and value `n` each round." },
          { es: "Si `n < umbral`, añade el índice: `debiles.append(i)`.", en: "If `n < umbral`, add the index: `debiles.append(i)`." },
          { es: "Empieza con `debiles = []` y devuélvela al final. Si nada cumple, se devuelve la lista vacía.", en: "Start with `debiles = []` and return it at the end. If nothing qualifies, the empty list is returned." },
        ],
        test_cases: [
          { input: "filas_debiles([12, 3, 8, 20, 1], 10)", expected: [1, 2, 4], description: { es: "Índices con menos de 10", en: "Indices with fewer than 10" }, raw: true },
          { input: "filas_debiles([5, 5, 5], 5)", expected: [], description: { es: "Ninguno es MENOR que 5", en: "None is LESS than 5" }, raw: true },
          { input: "filas_debiles([5, 5, 5], 6)", expected: [0, 1, 2], description: { es: "Ahora todos son débiles", en: "Now all are weak" }, raw: true },
          { input: "filas_debiles([], 3)", expected: [], description: { es: "Muralla vacía", en: "Empty wall" }, raw: true },
          { input: "filas_debiles([0, 100, 2], 3)", expected: [0, 2], description: { es: "El primero y el último", en: "The first and the last" }, raw: true },
        ],
      },
      position: { x: 19, y: 5 },
    },
    {
      node_id: "py_quiz_bucles",
      kind: "quiz",
      title: { es: "El recuento del alba", en: "The reckoning at dawn" },
      lore_intro: {
        es: "Antes de que salga el sol y llegue Gandalf, Aragorn repasa contigo lo aprendido sobre repetir y contar.",
        en: "Before the sun rises and Gandalf arrives, Aragorn reviews with you what you learned about repeating and counting.",
      },
      spriteId: "aragorn",
      quiz: {
        topic: "Control de flujo en Python",
        questions: [
          {
            question: { es: "¿Qué imprime `for i in range(3): print(i)`?", en: "What does `for i in range(3): print(i)` print?" },
            options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "1, 2"],
            correct: 0,
            explanation: {
              es: "`range(3)` empieza en 0 y llega hasta 3-1 = 2: produce 0, 1, 2. El final nunca se incluye. Para obtener 1, 2, 3 usarías `range(1, 4)`.",
              en: "`range(3)` starts at 0 and goes up to 3-1 = 2: it produces 0, 1, 2. The end is never included. To get 1, 2, 3 you'd use `range(1, 4)`.",
            },
          },
          {
            question: { es: "¿Cuándo conviene un `while` en vez de un `for`?", en: "When is a `while` better than a `for`?" },
            options: [
              { es: "Cuando no sabes de antemano cuántas vueltas hará falta", en: "When you don't know in advance how many rounds you'll need" },
              { es: "Cuando recorres una lista", en: "When you iterate over a list" },
              { es: "Siempre: while es más rápido", en: "Always: while is faster" },
              { es: "Cuando quieres el índice y el valor", en: "When you want the index and the value" },
            ],
            correct: 0,
            explanation: {
              es: "`for` brilla cuando recorres algo o repites un número conocido de veces. `while` es para cuando la parada depende de una condición que evoluciona: hasta agotar las flechas, hasta que el usuario acierte. Para recorrer una lista con índice, lo idiomático es `enumerate`.",
              en: "`for` shines when you iterate over something or repeat a known number of times. `while` is for when stopping depends on an evolving condition: until the arrows run out, until the user gets it right. To iterate a list with an index, the idiomatic way is `enumerate`.",
            },
          },
          {
            question: { es: "¿Qué diferencia hay entre `break` y `continue`?", en: "What's the difference between `break` and `continue`?" },
            options: [
              { es: "break sale del bucle; continue salta a la siguiente vuelta", en: "break leaves the loop; continue jumps to the next round" },
              { es: "Son sinónimos", en: "They're synonyms" },
              { es: "break salta una vuelta; continue termina el bucle", en: "break skips a round; continue ends the loop" },
              { es: "continue sale del programa", en: "continue exits the program" },
            ],
            correct: 0,
            explanation: {
              es: "`break` abandona el bucle por completo (útil al encontrar lo que buscabas). `continue` sólo se salta lo que queda del cuerpo y sigue con la próxima iteración (útil para ignorar ciertos casos). Confundirlos cambia por completo el resultado.",
              en: "`break` abandons the loop entirely (useful when you find what you were after). `continue` only skips the rest of the body and moves on to the next iteration (useful to ignore certain cases). Confusing them completely changes the result.",
            },
          },
          {
            question: {
              es: "Quieres el índice y el valor al recorrer una lista. ¿Qué es más idiomático?",
              en: "You want the index and value while iterating a list. What's more idiomatic?",
            },
            options: [
              "for i, v in enumerate(lista):",
              "for i in range(len(lista)): v = lista[i]",
              "for v in lista: i = lista.index(v)",
              { es: "while con un contador manual", en: "while with a manual counter" },
            ],
            correct: 0,
            explanation: {
              es: "`enumerate` es la forma pythónica: clara y sin errores. `range(len(...))` funciona pero es más ruidoso, y `lista.index(v)` es un error sutil — devuelve el índice del PRIMER v igual, que falla si hay repetidos y además es lento.",
              en: "`enumerate` is the pythonic way: clear and error-free. `range(len(...))` works but is noisier, and `lista.index(v)` is a subtle bug — it returns the index of the FIRST matching v, which fails with duplicates and is also slow.",
            },
          },
        ],
      },
      position: { x: 12, y: 11 },
    },
  ],
};

export const CHAPTERS: Chapter[] = [
  CHAPTER_1,
  CHAPTER_2,
  CHAPTER_3,
  CHAPTER_4,
  CHAPTER_5,
  CHAPTER_6,
  CHAPTER_7,
  CHAPTER_8,
  CHAPTER_SOLID,
  CHAPTER_ALGOS,
  CHAPTER_ALGOS_2,
  CHAPTER_ALGOS_3,
  CHAPTER_LOGICA,
  CHAPTER_CALENTAMIENTO,
  CHAPTER_GOLLUM,
  CHAPTER_HELM,
];

export function getChapter(n: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.chapter === n);
}

/** Resumen de la campaña completa, para la pantalla de selección. */
export interface ChapterInfo {
  chapter: number;
  title: string;
  /** Concepto de POO que enseña el capítulo. */
  topic: string;
  lore: string;
}

export const CAMPAIGN: ChapterInfo[] = [
  {
    chapter: 1,
    title: "Sombras en la Comarca",
    topic: "Clases, propiedades y visibilidad",
    lore: "Frodo huye de la Comarca evadiendo a los Nazgûl y su Hálito Negro.",
  },
  {
    chapter: 2,
    title: "El Bosque Viejo y los Túmulos",
    topic: "Constructores, métodos y destructores",
    lore: "El Viejo Hombre Sauce y los Tumularios; el canto de Tom Bombadil rompe la parálisis.",
  },
  {
    chapter: 3,
    title: "Bree y la Cima de los Vientos",
    topic: "Herencia y sobrescritura (parent::)",
    lore: "Trancos guía a los hobbits; cinco Nazgûl atacan y las Hojas de los Túmulos responden.",
  },
  {
    chapter: 4,
    title: "Huida al Vado de Bruinen",
    topic: "Métodos estáticos y constantes de clase",
    lore: "Persecución de los Nueve hasta que el río se desborda y los arrasa.",
  },
  {
    chapter: 5,
    title: "El Paso de Caradhras",
    topic: "Encapsulamiento avanzado (readonly, validación)",
    lore: "Una tormenta sobrenatural castiga la montaña: hay que gestionar frío y fatiga.",
  },
  {
    chapter: 6,
    title: "Las Minas de Moria",
    topic: "Interfaces y polimorfismo",
    lore: "Las Puertas de Durin, la Cámara de Mazarbul y el Daño de Durin en el puente.",
  },
  {
    chapter: 7,
    title: "El Espejo de Lothlórien",
    topic: "Clases abstractas y traits",
    lore: "Galadriel muestra visiones y entrega dones élficos cargados de poder.",
  },
  {
    chapter: 8,
    title: "La Disolución en Amon Hen",
    topic: "Excepciones y patrón Factory",
    lore: "Boromir sucumbe al Anillo y los Uruk-hai caen sobre la Comunidad.",
  },
  // ---- Libro II · El Camino del Arquitecto (avanzado) ----
  {
    chapter: 9,
    title: "La Biblioteca de Rivendel",
    topic: "SOLID: los cinco principios",
    lore: "Los pergaminos de Imladris guardan los principios que sostienen todo código que perdura.",
  },
  // ---- Libro III · Los Acertijos Antiguos (algoritmos cronometrados) ----
  {
    chapter: 10,
    title: "La Cámara de los Enigmas",
    topic: "Algoritmos clásicos (Big-O y patrones)",
    lore: "Práctica cronometrada: hash maps, dos punteros, pilas, búsqueda binaria y programación dinámica.",
  },
  {
    chapter: 11,
    title: "El Laberinto de los Ecos",
    topic: "Ventana, memoización, listas y DFS",
    lore: "Segundo bloque: anagramas, ventana deslizante, Fibonacci memoizado, listas enlazadas e islas.",
  },
  {
    chapter: 13,
    title: "El Árbol de Piedra",
    topic: "Árboles, combinaciones, criba y DP",
    lore: "Tercer bloque: profundidad de árboles, conjunto potencia, dos punteros avanzado y criba de Eratóstenes.",
  },
  // ---- Libro IV · Acertijos de lógica (test de razonamiento) ----
  {
    chapter: 12,
    title: "La Sala de los Espejos Helados",
    topic: "Lógica y razonamiento (test IQ)",
    lore: "Secuencias, proporciones y probabilidad condicionada: donde más falla la intuición.",
  },
  // ---- Libro V · Calentamiento (empieza aquí si vas frío) ----
  {
    chapter: 14,
    title: "La Antecámara de los Novicios",
    topic: "Calentamiento: los clásicos fáciles",
    lore: "FizzBuzz, anagramas, primer carácter único, inserción binaria, ventana fija y desbordamiento.",
  },
  // ---- Libro VI · Las Dos Torres (Python, de 0 a 100) ----
  {
    chapter: 15,
    title: "El Sendero de Sméagol",
    topic: "Python desde cero: variables, tipos y f-strings",
    lore: "Empieza Las Dos Torres y con ellas Python. En el Emyn Muil se aprende la nueva lengua desde la primera palabra.",
  },
  {
    chapter: 16,
    title: "El Abismo de Helm",
    topic: "Python: control de flujo (for, while, enumerate)",
    lore: "Diez mil Uruk-hai que no se cuentan de un vistazo: se recorren con bucles. Repetir, contar y decidir en Python.",
  },
];
