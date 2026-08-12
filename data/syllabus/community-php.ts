import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de PHP para el Libro I. Reviste la narrativa compartida de la
 * Comunidad con programación orientada a objetos. (Los textos siguen en español;
 * se traducen a EN en una fase posterior.)
 */

/** Capítulo 1 · POO: clases, propiedades y visibilidad. */
export const SYL_PHP_COMMUNITY_1: Syllabus = {
  c1_espia: {
    kind: "battle",
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
        options: ["$this->nombre", "$this.nombre", "self::$nombre", "$nombre"],
        correct: 0,
        explanation:
          "`$this->propiedad`, con flecha y SIN el signo dólar en el nombre. El punto es concatenación en PHP, no acceso a miembro. `self::$nombre` es para propiedades estáticas.",
      },
      {
        question: "Tienes `private $anillo;`. ¿Desde dónde se puede leer?",
        options: [
          "Sólo desde dentro de la propia clase",
          "Desde la clase y sus hijas",
          "Desde cualquier parte del programa",
          "Sólo desde fuera de la clase",
        ],
        correct: 0,
        explanation:
          "`private` es el cerrojo más estricto: ni siquiera las clases hijas lo ven. Si quieres que las hijas sí puedan, usa `protected`. Empieza siempre por private y abre sólo lo que haga falta.",
      },
    ],
  },
  c1_jinete_rastreador: {
    kind: "battle",
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
          "La clase es el molde; `new` fabrica una pieza con ese molde y llama a `__construct()`. Para copiar un objeto existente se usa `clone`.",
      },
      {
        question: "¿Cuál de estas cosas NO puede hacer un método `private`?",
        options: [
          "Ser llamado desde otra clase, aunque sea hija",
          "Ser llamado desde otro método de su clase",
          "Devolver un valor",
          "Recibir parámetros",
        ],
        correct: 0,
        explanation:
          "La visibilidad no limita lo que el método hace, sólo desde DÓNDE se le puede llamar. Un private es invisible fuera de su propia clase — incluidas las hijas.",
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
          "El coste no es de rendimiento, es de control: con la propiedad pública nadie garantiza que valga algo válido. Si el único camino para cambiarla es un método tuyo, ahí validas. Eso es encapsulamiento.",
      },
    ],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [
      {
        question:
          "¿Qué visibilidad usarías para una propiedad que sólo debe tocar la propia clase?",
        options: ["private", "public", "protected", "final"],
        correct: 0,
        explanation:
          "`private` es el cerrojo más estricto: ni las clases hijas la ven. Es el punto de partida recomendado.",
      },
      {
        question:
          "Declaras `public function __construct(public string $nombre) {}`. ¿Qué visibilidad tendrá `$nombre`?",
        options: ["public", "private", "protected", "ninguna: es sólo un parámetro"],
        correct: 0,
        explanation:
          "La promoción de propiedades usa la visibilidad que pongas ANTES del parámetro. Aquí `public`, así que `$obj->nombre` se lee desde fuera.",
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
          "La clase es el molde; la instancia es cada objeto fabricado con ese molde por `new`. Dos instancias tienen las mismas propiedades pero valores independientes.",
      },
    ],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: "El Jinete Negro",
    lore_intro:
      "El Nazgûl acorrala a Frodo. Sólo la VOLUNTAD lo detiene: encapsula ese estado en una clase y mide si resistes.",
    challenge: {
      topic: "Clases, encapsulamiento y métodos",
      instructions:
        "Crea la clase Portador con una propiedad PRIVADA $voluntad iniciada en 100. Añade getVoluntad(): int; y resistir(int $tentacion): string, que devuelva 'sucumbe' si la tentación es mayor o igual que la voluntad, o 'resiste con {N} de voluntad' (donde N es voluntad menos tentación) en caso contrario.",
      sut: "new Portador()",
      starter_code:
        "<?php\n\nclass Portador {\n}\n",
      blocks: [
        "<?php",
        "class Portador {",
        "    private int $voluntad = 100;",
        "    public function getVoluntad(): int {",
        "        return $this->voluntad;",
        "    }",
        "    public function resistir(int $tentacion): string {",
        "        if ($tentacion >= 100) {",
        "            return \"sucumbe\";",
        "        }",
        "        return \"resiste con \" . (100 - $tentacion) . \" de voluntad\";",
        "    }",
        "}",
        "        return \"resiste con \" . $tentacion . \" de voluntad\";",
      ],
      hints: [
        "La propiedad va privada: private int $voluntad = 100;",
        "En el else compón el texto: return 'resiste con ' . ($this->voluntad - $tentacion) . ' de voluntad';",
      ],
      test_cases: [
        { input: "getVoluntad()", expected: 100, description: "La voluntad parte intacta" },
        { input: "resistir(30)", expected: "resiste con 70 de voluntad", description: "Resiste y le queda voluntad" },
        { input: "resistir(100)", expected: "sucumbe", description: "Al igualar la voluntad, sucumbe" },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: "El Pergamino de Bilbo",
    lore_intro:
      "Entre los papeles del viejo Bilbo hay un pergamino con su letra apretada: «Antes de contar una historia, di quién la protagoniza. Un molde primero; los personajes, después.»",
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
          body: "`public` → lo toca cualquiera, desde fuera.\n`private` → sólo la propia clase.\n`protected` → la clase y sus hijas.\n\nPor defecto empieza en `private` y abre sólo lo que haga falta.",
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
  sendero_comarca: {
    kind: "challenge",
    title: "Preparar la Huida",
    lore_intro:
      "Antes de partir debes saber quién eres. Todo héroe empieza por definirse: crea la clase que representa a un hobbit de la Comarca.",
    challenge: {
      topic: "Clases, propiedades y constructores",
      instructions:
        "Crea la clase Hobbit con un constructor que reciba $nombre (string) y guárdelo en una propiedad. Añade el método presentarse(): string que devuelva exactamente 'Soy {nombre} de la Comarca'.",
      sut: "new Hobbit('Frodo')",
      starter_code: "<?php\n\nclass Hobbit {\n\n}\n",
      blocks: [
        "class Hobbit {",
        "    public function __construct(private string $nombre) {}",
        '    public function presentarse(): string {\n        return "Soy {$this->nombre} de la Comarca";\n    }',
        "}",
        '    public function presentarse(): string {\n        return "Soy {$this->nombre}";\n    }',
        '    public function presentarse(): string {\n        return "Soy de la Comarca";\n    }',
      ],
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
  halito_negro: {
    kind: "challenge",
    title: "El Hálito Negro",
    lore_intro:
      "Un Jinete Negro olfatea el aire cerca del camino. Para pasar inadvertido debes controlar tu Sigilo — un estado privado que nadie puede manipular directamente desde fuera.",
    challenge: {
      topic: "Encapsulamiento (private) + getters/setters",
      instructions:
        "En la clase Hobbit protege la propiedad $nivelSigilo (private, empieza en 0). Añade: getNivelSigilo(): int; ocultarse(int $n): void que SUME sigilo sin pasar de 100; y esVisiblePara(Nazgul $n): bool que devuelva true solo si tu sigilo es MENOR que la percepción del Nazgûl.\n\nLa clase Nazgul ya existe (ver «Código de apoyo»): obtén su percepción con $n->getPercepcion() — con paréntesis, es un método.",
      sut: "new Hobbit()",
      support_code:
        "class Nazgul {\n    public function __construct(private int $percepcion = 50) {}\n    public function getPercepcion(): int { return $this->percepcion; }\n}",
      starter_code: "<?php\n\nclass Hobbit {\n\n}\n",
      blocks: [
        "class Hobbit {",
        "    private int $nivelSigilo = 0;",
        "    public function getNivelSigilo(): int {\n        return $this->nivelSigilo;\n    }",
        "    public function ocultarse(int $n): void {\n        $this->nivelSigilo = min(100, $this->nivelSigilo + $n);\n    }",
        "    public function esVisiblePara(Nazgul $n): bool {\n        return $this->nivelSigilo < $n->getPercepcion();\n    }",
        "}",
        "    public function ocultarse(int $n): void {\n        $this->nivelSigilo = $this->nivelSigilo + $n;\n    }",
        "    public function esVisiblePara(Nazgul $n): bool {\n        return $this->nivelSigilo > $n->getPercepcion();\n    }",
      ],
      hints: [
        "Declara la propiedad como private int $nivelSigilo = 0; para que nadie pueda tocarla desde fuera.",
        "ocultarse() debe SUMAR al sigilo actual, no reemplazarlo: min(100, $this->nivelSigilo + $n)",
        "esVisiblePara() compara tu sigilo con la percepción del Nazgûl: $this->nivelSigilo < $n->getPercepcion()",
      ],
      test_cases: [
        { input: "getNivelSigilo()", expected: 0, description: "El sigilo empieza en 0" },
        { input: "ocultarse(70)", expected: null, description: "ocultarse() no devuelve nada (void)" },
        { input: "getNivelSigilo()", expected: 70, description: "Tras ocultarse(70) el sigilo es 70" },
        { input: "ocultarse(50)", expected: null, description: "Sumar más sigilo…" },
        { input: "getNivelSigilo()", expected: 100, description: "…pero nunca supera 100 (70+50 → 100)" },
        { input: "esVisiblePara(new Nazgul(50))", expected: false, description: "Con sigilo 100 y percepción 50, NO te ve" },
        { input: "esVisiblePara(new Nazgul(120))", expected: true, description: "Un Nazgûl muy perceptivo (120) sí te ve" },
      ],
    },
  },
};


/** Capítulo 2 · Ciclo de vida: constructores, métodos y destructores. */
export const SYL_PHP_COMMUNITY_2: Syllabus = {
  c2_raiz: {
    kind: "battle",
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
          "PHP lo llama solo, y sólo una vez, justo al construir. Por eso es el sitio donde exigir lo imprescindible.",
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
          "Desde PHP 8, poner la visibilidad delante del parámetro declara la propiedad y hace el `$this->nombre = $nombre;` por ti.",
      },
      {
        question: "¿Qué debe devolver un constructor?",
        options: ["Nada: no puede tener tipo de retorno", "El objeto creado", "true si todo fue bien", "$this"],
        correct: 0,
        explanation:
          "`__construct` no devuelve nada y declararle un tipo de retorno es error fatal. El objeto lo entrega `new`.",
      },
    ],
  },
  c2_niebla: {
    kind: "battle",
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
          "PHP cuenta referencias: cuando la última desaparece llama al destructor. Sirve para soltar recursos.",
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
          "`unset()` quita ESA referencia. Si era la última, el objeto se destruye y su destructor se ejecuta ahí mismo.",
      },
      {
        question: "Un método declara `public function cantar(): void`. ¿Qué significa `void`?",
        options: [
          "Que no devuelve valor; un `return $algo;` dentro sería error",
          "Que devuelve null",
          "Que puede devolver cualquier cosa",
          "Que no recibe parámetros",
        ],
        correct: 0,
        explanation:
          "`void` promete que el método no entrega nada; se permite `return;` a secas, pero no `return $x;`.",
      },
    ],
  },
  c2_sauce: {
    kind: "battle",
    questions: [
      {
        question: "¿Puede un método llamar a OTRO método de la misma clase? ¿Cómo?",
        options: [
          "Sí, con $this->otroMetodo()",
          "No: cada método es independiente",
          "Sí, pero sólo si el otro es público",
          "Sí, con self::otroMetodo() siempre",
        ],
        correct: 0,
        explanation:
          "Dentro de un objeto, $this-> te da acceso a todos sus métodos, incluidos los privados. self:: se reserva para lo estático.",
      },
      {
        question: "Un método sin `return` explícito, ¿qué devuelve?",
        options: ["null", "false", "0", "Una cadena vacía"],
        correct: 0,
        explanation:
          "Si un método termina sin return, PHP devuelve null. Por eso conviene declarar : void cuando no debe devolver nada.",
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
          "Un parámetro es una variable local que existe mientras se ejecuta el método. Una propiedad es memoria del objeto: persiste entre llamadas.",
      },
    ],
  },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: "El Rey de los Túmulos",
    lore_intro:
      "El Tumulario cuenta las horas de sus prisioneros. Modela un cronómetro: un objeto que nace con un valor y avanza con sus métodos.",
    challenge: {
      topic: "Ciclo de vida: constructor y métodos",
      instructions:
        "Crea la clase Cronometro con una propiedad PRIVADA $segundos, un constructor que reciba el valor inicial, avanzar(int $n): void que le sume $n, y leer(): int que devuelva el valor actual.",
      sut: "new Cronometro(10)",
      starter_code:
        "<?php\n\nclass Cronometro {\n}\n",
      blocks: [
        "<?php",
        "class Cronometro {",
        "    public function __construct(private int $tiempo) {}",
        "    public function leer(): int {",
        "        return $this->tiempo;",
        "    }",
        "    public function avanzar(int $n): void {",
        "        $this->tiempo += $n;",
        "    }",
        "}",
        "        $this->tiempo = $n;",
      ],
      hints: [
        "El constructor guarda el inicial: public function __construct(int $inicial) { $this->segundos = $inicial; }",
        "avanzar() no devuelve nada (void); leer() devuelve el estado.",
      ],
      test_cases: [
        { input: "leer()", expected: 10, description: "Nace con el valor inicial" },
        { input: "avanzar(5)", expected: null, description: "avanzar() no devuelve nada (void)" },
        { input: "leer()", expected: 15, description: "Tras avanzar 5, marca 15" },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: "El Pergamino del Camino",
    lore_intro:
      "Clavado en un poste junto a la Cerca, medio comido por la humedad, alguien dejó un aviso para los que entran al Bosque: «Todo lo que nace aquí, aquí termina. Y al terminar, deshace lo que ató.»",
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
          body: "Una variable LOCAL muere al terminar el método → su destructor se dispara ahí mismo.\nSi guardas el objeto en una PROPIEDAD, sigue vivo mientras viva el dueño → el destructor NO se ejecuta.",
          code: `public function cantarConjuro(Personaje $p): void {
    $efecto = new EfectoHechizo($p);   // local: muere aquí y libera
    // $this->efecto = new EfectoHechizo($p);  // sobrevive: no libera
}`,
        },
      ],
      keyTakeaway:
        "El constructor deja el objeto válido; el destructor deshace lo que ató. Y quién guarda la referencia decide CUÁNDO muere.",
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: "El Viejo Hombre Sauce",
    lore_intro:
      "Un sauce inmenso adormece a los hobbits y atrapa a Merry entre sus raíces. Para enfrentarlo primero hay que darle forma: todo objeto nace con un constructor.",
    challenge: {
      topic: "Constructores y métodos",
      instructions:
        "Crea la clase HombreSauce con un constructor que reciba $fuerza (int) y la guarde. Añade getFuerza(): int y atrapar(string $nombre): string, que devuelva exactamente '{nombre} queda atrapado entre las raíces'.",
      sut: "new HombreSauce(80)",
      starter_code: "<?php\n\nclass HombreSauce {\n\n}\n",
      blocks: [
        "<?php",
        "class HombreSauce {",
        "    public function __construct(private int $fuerza) {}",
        "    public function getFuerza(): int {",
        "        return $this->fuerza;",
        "    }",
        "    public function atrapar(string $nombre): string {",
        "        return \"{$nombre} queda atrapado entre las raíces\";",
        "    }",
        "}",
        "        return \"{$nombre} escapa\";",
      ],
      hints: [
        "__construct(private int $fuerza) {} declara la propiedad y la asigna de una vez.",
        'El texto debe coincidir exactamente: return "$nombre queda atrapado entre las raíces";',
      ],
      test_cases: [
        { input: "getFuerza()", expected: 80, description: "El constructor guarda la fuerza recibida" },
        { input: "atrapar('Merry')", expected: "Merry queda atrapado entre las raíces", description: "atrapar() usa el nombre recibido" },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: "El Túmulo del Espectro",
    lore_intro:
      "Entre las piedras erguidas, un Tumulario susurra en la niebla. Su frío drena la vida de quien se acerque… pero nunca por debajo de cero.",
    challenge: {
      topic: "Métodos y lógica de estado",
      instructions:
        "Crea la clase Tumulario con un constructor que reciba $frio (int). Añade getFrio(): int y drenar(int $vida): int, que reste el frío a la vida devuelta, sin bajar nunca de 0.",
      sut: "new Tumulario(30)",
      starter_code: "<?php\n\nclass Tumulario {\n}\n",
      blocks: [
        "<?php",
        "class Tumulario {",
        "    public function __construct(private int $frio) {}",
        "    public function getFrio(): int {",
        "        return $this->frio;",
        "    }",
        "    public function drenar(int $vida): int {",
        "        return max(0, $vida - $this->frio);",
        "    }",
        "}",
        "        return $vida - $this->frio;",
      ],
      hints: [
        "Guarda el frío con __construct(private int $frio) {}",
        "Para que nunca baje de cero: return max(0, $vida - $this->frio);",
      ],
      test_cases: [
        { input: "getFrio()", expected: 30, description: "El frío del espectro" },
        { input: "drenar(100)", expected: 70, description: "Drena 30 puntos de vida" },
        { input: "drenar(20)", expected: 0, description: "La vida nunca baja de 0" },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: "El Canto de Tom Bombadil",
    lore_intro:
      "«¡Eh, vamos alegre dol!» Tom canta y el hechizo se deshace. En PHP, lo que se deshace al terminar su vida es un objeto: su DESTRUCTOR es el que libera a los prisioneros.",
    challenge: {
      topic: "Destructores (__destruct)",
      instructions:
        "Crea EfectoHechizo: su constructor recibe un Personaje y lo guarda; su destructor __destruct() debe liberarlo poniendo $paralizado = false. Luego, en TomBombadil añade cantarConjuro(Personaje $p): void que cree un EfectoHechizo en una variable LOCAL — al terminar el método el objeto se destruye y el canto libera al personaje.",
      sut: "new TomBombadil()",
      support_code:
        "class Personaje {\n    public bool $paralizado = true;\n    public function estaParalizado(): bool { return $this->paralizado; }\n}\n\nclass Prueba {\n    public static ?Personaje $victima = null;\n    public static function nueva(): Personaje {\n        self::$victima = new Personaje();\n        return self::$victima;\n    }\n}",
      starter_code: "<?php\n\nclass EfectoHechizo {\n\n}\n\nclass TomBombadil {\n}\n",
      blocks: [
        "<?php",
        "class EfectoHechizo {",
        "}",
        "class TomBombadil {",
        "    public function cantarConjuro(Personaje $victima): void {",
        "        $victima->paralizado = false;",
        "    }",
        "}",
        "        $victima->paralizado = true;",
      ],
      hints: [
        "El constructor solo guarda la referencia: __construct(private Personaje $objetivo) {}",
        "El destructor se llama solo al morir el objeto: public function __destruct() { $this->objetivo->paralizado = false; }",
        "Clave: en cantarConjuro() guarda el efecto en una variable LOCAL. Si lo guardas como propiedad, no se destruye al salir del método.",
      ],
      test_cases: [
        { input: "Prueba::nueva()->estaParalizado()", raw: true, expected: true, description: "El personaje empieza paralizado por el hechizo" },
        { input: "$sut->cantarConjuro(Prueba::$victima)", raw: true, expected: null, description: "Tom canta (el método no devuelve nada)" },
        { input: "Prueba::$victima->estaParalizado()", raw: true, expected: false, description: "Al acabar el método, el destructor liberó al personaje" },
      ],
    },
  },
};


/** Capítulo 3 · Herencia y sobrescritura (parent::). */
export const SYL_PHP_COMMUNITY_3: Syllabus = {
  c3_ferny: {
    kind: "battle",
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
          "`private` es privado de verdad: la hija no lo ve, aunque ocupe espacio en el objeto. Lo que quieras compartir con las hijas va en `protected`.",
      },
      {
        question: "¿Cuántas clases puede extender una clase en PHP?",
        options: ["Una sola", "Todas las que quieras, separadas por comas", "Hasta tres", "Ninguna: PHP no tiene herencia"],
        correct: 0,
        explanation:
          "PHP tiene herencia SIMPLE: un solo `extends`. Para reunir comportamiento de varios sitios están los `interface` y los `trait`.",
      },
      {
        question: "Al sobrescribir un método del padre, ¿qué NO puedes hacer?",
        options: [
          "Reducir su visibilidad (pasar de public a private)",
          "Cambiar el cuerpo por completo",
          "Ampliar la visibilidad (de protected a public)",
          "Llamar a la versión del padre desde dentro",
        ],
        correct: 0,
        explanation:
          "La hija puede abrir el acceso, nunca cerrarlo: si el padre prometía un método público, quien use la hija como el padre debe poder llamarlo. Es Liskov aplicado por el lenguaje.",
      },
    ],
  },
  c3_espia_nazgul: {
    kind: "battle",
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
          "`parent::` no crea nada: ejecuta el método del padre sobre el objeto ACTUAL. Permite ampliar el comportamiento heredado en vez de reemplazarlo.",
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
          "Copiar y pegar se rompe el día que alguien toque al padre: dos versiones divergiendo en silencio. `parent::atacar()` mantiene una sola fuente de verdad.",
      },
      {
        question:
          "`$x instanceof Personaje` con `$x = new Hobbit()` y `class Hobbit extends Personaje`. ¿Qué devuelve?",
        options: ["true: un Hobbit ES un Personaje", "false: sólo compara la clase exacta", "Error de tipos", "true sólo si Personaje es abstracta"],
        correct: 0,
        explanation:
          "`instanceof` recorre toda la cadena de herencia y las interfaces implementadas. Es lo que hace posible el polimorfismo.",
      },
    ],
  },
  c3_montaraz_falso: {
    kind: "battle",
    questions: [
      {
        question: "`class B extends A {}`. Si `A` tiene un método protegido `paso()`, ¿puede `B` llamarlo?",
        options: ["Sí: protected es visible para las clases hijas", "No: protected es como private", "Sólo si B lo declara también", "Sólo desde el constructor"],
        correct: 0,
        explanation:
          "`protected` está pensado para esto: compartir con las hijas lo que sigue oculto para el exterior. Punto medio entre `private` y `public`.",
      },
      {
        question: "Al sobrescribir un método, ¿puedes cambiar el tipo de retorno por uno más específico?",
        options: ["Sí: covarianza. Puedes devolver un subtipo del tipo original", "No: debe ser idéntico", "Sí, cualquier tipo distinto", "Sólo si el método es estático"],
        correct: 0,
        explanation:
          "PHP permite covarianza en el retorno: si el padre devuelve `Animal`, la hija puede devolver `Perro`. La regla de fondo es la sustituibilidad.",
      },
      {
        question: "¿Qué es una clase base o superclase?",
        options: ["La clase de la que otra hereda (el padre)", "La primera clase que se declara en el fichero", "Una clase que no se puede instanciar", "La clase con más métodos"],
        correct: 0,
        explanation:
          "Superclase, clase base y clase padre son lo mismo: aquella de la que otra extiende. La que hereda es la subclase, derivada o hija.",
      },
    ],
  },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: "El Rey Brujo de Angmar",
    lore_intro:
      "«Ningún hombre vivo puede detenerme.» Forja una hoja mágica que HEREDE de un arma normal y AMPLÍE su golpe con parent::.",
    challenge: {
      topic: "Herencia y parent::",
      instructions:
        "La clase Arma ya existe (constructor con $danio protegido y atacar(): int). Crea HojaMagica que extienda Arma y SOBRESCRIBA atacar() para devolver el DOBLE, reutilizando el cálculo del padre con parent::atacar().",
      sut: "new HojaMagica(15)",
      support_code:
        "class Arma {\n    public function __construct(protected int $danio) {}\n    public function atacar(): int { return $this->danio; }\n}",
      starter_code:
        "<?php\n\n// Arma ya existe: constructor con $danio (protected) y atacar(): int\n\nclass HojaMagica {\n}\n",
      blocks: [
        "<?php",
        "class HojaMagica extends Arma {",
        "    public function atacar(): int {",
        "        return parent::atacar() * 2;",
        "    }",
        "}",
        "        return parent::atacar();",
      ],
      hints: [
        "class HojaMagica extends Arma { … }",
        "Reutiliza al padre: return parent::atacar() * 2;",
      ],
      test_cases: [
        { input: "atacar()", expected: 30, description: "Duplica el daño base (15 → 30)" },
        { input: "(new HojaMagica(7))->atacar()", raw: true, expected: 14, description: "Funciona con cualquier daño (7 → 14)" },
        { input: "(new HojaMagica(1)) instanceof Arma", raw: true, expected: true, description: "Una HojaMagica ES un Arma" },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: "El Pergamino de los Montaraces",
    lore_intro:
      "En un rincón del Póney Pisador, bajo una jarra, un pergamino con el emblema de la Estrella: «Un montaraz es un viajero. No repitas lo que ya sabe tu estirpe: hereda.»",
    scroll: {
      topic: "Herencia y sobrescritura",
      sections: [
        {
          heading: "extends: heredar es «ES UN»",
          body: "Una subclase recibe TODAS las propiedades y métodos del padre sin reescribirlos, y añade lo suyo.\n\nUsa herencia sólo cuando «una X ES UNA Y» es cierta de verdad. Si sólo quieres reutilizar código suelto, busca composición o un trait.",
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
          body: "`private` esconde el dato incluso de las hijas. Si quieres que la subclase pueda usarlo, decláralo `protected`: visible para la clase y su descendencia, cerrado para el resto.",
          code: `class Viajero {
    public function __construct(protected string $nombre) {}
}

class Montaraz extends Viajero {
    public function rastrear(string $rastro): string {
        return "{$this->nombre} sigue el rastro";  // protected sí se ve
    }
}`,
        },
        {
          heading: "Sobrescribir sin tirar lo que había: parent::",
          body: "Redefinir un método en la hija SUSTITUYE al del padre. Si sólo quieres AMPLIARLO, llama al original con `parent::metodo()` y añade lo tuyo.",
          code: `class HojaDeTumulo extends Arma {
    public function atacar(): int {
        return parent::atacar() * 2;   // reutiliza y amplía
    }
}`,
        },
      ],
      keyTakeaway:
        "Hereda cuando hay parentesco real. Y al sobrescribir, pregúntate si debes reemplazar el método del padre o ampliarlo con parent::.",
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: "Trancos, el Montaraz",
    lore_intro:
      "Un hombre curtido observa desde el rincón más oscuro de la posada. Es un Montaraz: un viajero como cualquier otro… pero con habilidades que los demás no tienen. En POO, eso es HEREDAR.",
    challenge: {
      topic: "Herencia (extends)",
      instructions:
        "Crea la clase Montaraz que HEREDE de Viajero usando extends. NO redefinas viajar(): debe heredarse tal cual. Sólo añade el método rastrear(string $rastro): string que devuelva '{nombre} sigue el rastro de {rastro}'.",
      sut: "new Montaraz('Trancos')",
      support_code:
        "class Viajero {\n    public function __construct(protected string $nombre) {}\n    public function viajar(string $destino): string {\n        return \"{$this->nombre} viaja hacia {$destino}\";\n    }\n}",
      starter_code: "<?php\n\nclass Montaraz {\n\n}\n",
      blocks: [
        "<?php",
        "class Montaraz extends Viajero {",
        "    public function rastrear(string $objetivo): string {",
        "        return \"{$this->nombre} sigue el rastro de {$objetivo}\";",
        "    }",
        "}",
        "        return \"{$this->nombre} viaja hacia {$objetivo}\";",
      ],
      hints: [
        "Para heredar: class Montaraz extends Viajero { … }",
        "$nombre es protected, así que la subclase puede usar $this->nombre directamente.",
        'rastrear() devuelve: return "{$this->nombre} sigue el rastro de {$rastro}";',
      ],
      test_cases: [
        { input: "viajar('Rivendel')", expected: "Trancos viaja hacia Rivendel", description: "viajar() se HEREDA de Viajero sin reescribirlo" },
        { input: "rastrear('los Nazgûl')", expected: "Trancos sigue el rastro de los Nazgûl", description: "rastrear() es el método propio del Montaraz" },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: "Las Hojas de los Túmulos",
    lore_intro:
      "Tom Bombadil entregó a los hobbits dagas forjadas contra el Rey Brujo. Son armas normales… mejoradas. Sobrescribir un método no significa tirar el del padre: puedes reutilizarlo con parent::.",
    challenge: {
      topic: "Sobrescritura y parent::",
      instructions:
        "Crea HojaDeTumulo que extienda Arma y SOBRESCRIBA atacar() para devolver el DOBLE del daño base. Debes reutilizar el cálculo del padre llamando a parent::atacar() en vez de leer $danio directamente.",
      sut: "new HojaDeTumulo(15)",
      support_code:
        "class Arma {\n    public static int $llamadasAlPadre = 0;\n    public function __construct(protected int $danio) {}\n    public function atacar(): int {\n        self::$llamadasAlPadre++;\n        return $this->danio;\n    }\n}",
      starter_code: "<?php\n\nclass HojaDeTumulo {\n}\n",
      blocks: [
        "<?php",
        "class HojaDeTumulo extends Arma {",
        "    public function atacar(): int {",
        "        return parent::atacar() * 2;",
        "    }",
        "}",
        "        return $this->danio * 2;",
      ],
      hints: [
        "class HojaDeTumulo extends Arma { … }",
        "Dentro de atacar(), llama al padre así: return parent::atacar() * 2;",
        "Si lees $this->danio directamente en vez de usar parent::atacar(), la última prueba fallará.",
      ],
      test_cases: [
        { input: "atacar()", expected: 30, description: "La hoja duplica el daño base (15 → 30)" },
        { input: "(new HojaDeTumulo(7))->atacar()", raw: true, expected: 14, description: "Funciona con cualquier daño (7 → 14)" },
        { input: "Arma::$llamadasAlPadre > 0", raw: true, expected: true, description: "atacar() reutiliza el método del padre con parent::" },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: "La Cima de los Vientos",
    lore_intro:
      "Cinco Jinetes Negros ascienden entre las ruinas de Amon Sûl. El acero común los atraviesa sin daño: son espectros. Sólo una hoja encantada puede herir lo que es invisible.",
    challenge: {
      topic: "Sobrescritura de comportamiento",
      instructions:
        "Un arma común no puede herir a un Espectro invisible (devuelve 0). Crea HojaEncantada que extienda Arma y sobrescriba golpear(Espectro $e): int para que devuelva SIEMPRE el daño completo, incluso si el espectro es invisible.",
      sut: "new HojaEncantada(20)",
      support_code:
        "class Espectro {\n    public bool $esInvisible = true;\n}\n\nclass Arma {\n    public function __construct(protected int $danio) {}\n    public function golpear(Espectro $e): int {\n        return $e->esInvisible ? 0 : $this->danio;\n    }\n}",
      starter_code: "<?php\n\nclass HojaEncantada {\n}\n",
      blocks: [
        "<?php",
        "class HojaEncantada extends Arma {",
        "    public function golpear(Espectro $e): int {",
        "        return $this->danio;",
        "    }",
        "}",
        "        return parent::golpear($e);",
      ],
      hints: [
        "class HojaEncantada extends Arma { … }",
        "$danio es protected: puedes devolverlo directamente con return $this->danio;",
        "Aquí NO conviene llamar a parent::golpear(): el padre devolvería 0 ante un espectro invisible.",
      ],
      test_cases: [
        { input: "golpear(new Espectro())", expected: 20, description: "La hoja encantada SÍ hiere al espectro invisible" },
        { input: "(new Arma(20))->golpear(new Espectro())", raw: true, expected: 0, description: "Un arma común sigue sin poder herirlo (padre intacto)" },
      ],
    },
  },
};

/** Capítulo 4 · static, self::, constantes de clase y enums. */
export const SYL_PHP_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: {
    kind: "battle",
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
        options: ["self::$contador", "$this->contador", "self->contador", "static.contador"],
        correct: 0,
        explanation:
          "Se accede con `::` y CONSERVANDO el `$`: `self::$contador`. Es justo al revés que en las propiedades normales, donde el `$` desaparece (`$this->contador`). Confundirlo es el error de sintaxis más habitual con estáticos.",
      },
      {
        question: "¿Y una constante de clase?",
        options: ["self::NOMBRE, sin signo dólar", "self::$NOMBRE", "$this->NOMBRE", "const::NOMBRE"],
        correct: 0,
        explanation:
          "Las constantes no llevan `$` nunca, ni al declararlas (`const NUEVE = 9;`) ni al leerlas (`self::NUEVE`). Desde fuera se leen con el nombre de la clase: `Nazgul::NUEVE`.",
      },
    ],
  },
  c4_lobo: {
    kind: "battle",
    questions: [
      {
        question: "¿Cuál es la diferencia entre `self::` y `static::`?",
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
        question: "Dentro de un método `static`, ¿puedes usar `$this`?",
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
        question: "¿Por qué se dice que abusar de los estáticos complica las pruebas?",
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
  c4_jefe_nueve: {
    kind: "challenge",
    title: "Los Nueve en el Vado",
    lore_intro:
      "El recuento de los Nueve no pertenece a ninguno: es de la Sombra entera. Un contador compartido por toda la clase es estado ESTÁTICO.",
    challenge: {
      topic: "Propiedades y métodos estáticos",
      instructions:
        "Crea la clase Caceria con una propiedad estática PRIVADA $jinetes iniciada en 0, y dos métodos ESTÁTICOS: sumar(int $n): void, que la incremente, y total(): int, que la devuelva. Todo se llama con Caceria::… sin instanciar.",
      starter_code:
        "<?php\n\nclass Caceria {\n}\n",
      blocks: [
        "<?php",
        "class Caceria {",
        "    private static int $total = 0;",
        "    public static function sumar(int $n): void {",
        "        self::$total += $n;",
        "    }",
        "    public static function total(): int {",
        "        return self::$total;",
        "    }",
        "}",
        "        self::$total = $n;",
      ],
      hints: [
        "Estado compartido: private static int $jinetes = 0;",
        "En un método estático no hay $this: usa self::$jinetes += $n;",
      ],
      test_cases: [
        { input: "Caceria::total()", raw: true, expected: 0, description: "Empieza sin jinetes contados" },
        { input: "Caceria::sumar(5)", raw: true, expected: null, description: "Cinco en la Cima de los Vientos…" },
        { input: "Caceria::sumar(4)", raw: true, expected: null, description: "…y los cuatro restantes" },
        { input: "Caceria::total()", raw: true, expected: 9, description: "El estado es compartido: son los Nueve" },
      ],
    },
  },
  c4_trasgo_montaraz: {
    kind: "battle",
    questions: [
      {
        question:
          "Declaras `const VELOCIDAD = 5;` en una clase. ¿Cómo la lees desde FUERA?",
        options: ["Caballo::VELOCIDAD", "$caballo->VELOCIDAD", "Caballo::$VELOCIDAD", "$Caballo::VELOCIDAD"],
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
  pergamino_estatico: {
    kind: "scroll",
    title: "El Poder Compartido",
    lore_intro:
      "Antes de partir, Elrond te entrega un pergamino: «No siempre hace falta crear una cosa para usar su poder. Algunos poderes pertenecen a la estirpe entera, no a un solo individuo.»",
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
  montura_asfaloth: {
    kind: "challenge",
    title: "Asfaloth, el Corcel Élfico",
    lore_intro:
      "Glorfindel pone a Frodo sobre su caballo blanco. «¡Noro lim, Asfaloth!» Ningún corcel, por élfico que sea, supera su límite: eso es una constante.",
    challenge: {
      topic: "Constantes de clase (const, self::)",
      instructions:
        "Crea la clase Asfaloth con una constante pública VELOCIDAD_MAXIMA = 120 y el método galopar(int $deseada): int, que devuelva la velocidad deseada SIN superar nunca la constante. Léela desde dentro con self::.",
      sut: "new Asfaloth()",
      starter_code: "<?php\n\nclass Asfaloth {\n\n}\n",
      blocks: [
        "<?php",
        "class Asfaloth {",
        "    public const VELOCIDAD_MAXIMA = 120;",
        "    public function galopar(int $deseada): int {",
        "        return min($deseada, self::VELOCIDAD_MAXIMA);",
        "    }",
        "}",
        "        return max($deseada, self::VELOCIDAD_MAXIMA);",
      ],
      hints: [
        "Una constante de clase se declara así: public const VELOCIDAD_MAXIMA = 120;",
        "Desde dentro de la clase se lee con self::VELOCIDAD_MAXIMA (nunca con $this->).",
        "Para no pasarte del límite: return min(self::VELOCIDAD_MAXIMA, $deseada);",
      ],
      test_cases: [
        { input: "galopar(90)", expected: 90, description: "Por debajo del límite, galopa a lo pedido" },
        { input: "galopar(200)", expected: 120, description: "Nunca supera VELOCIDAD_MAXIMA" },
        { input: "Asfaloth::VELOCIDAD_MAXIMA", raw: true, expected: 120, description: "La constante es pública y se lee sin instanciar" },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: "El Recuento de los Nueve",
    lore_intro:
      "Los Jinetes Negros son nueve, y el recuento no pertenece a ninguno en particular: pertenece a la Sombra entera. Un contador que viven todas las instancias a la vez es estado estático.",
    challenge: {
      topic: "Propiedades estáticas (self::$prop)",
      instructions:
        "Crea la clase Caceria con una propiedad estática privada $jinetes que empiece en 0, y dos métodos ESTÁTICOS: sumar(int $n): void, que la incremente, y total(): int, que la devuelva. Todo se llama con Caceria::… sin instanciar.",
      starter_code: "<?php\n\nclass Caceria {\n\n}\n",
      blocks: [
        "<?php",
        "class Caceria {",
        "    private static int $total = 0;",
        "    public static function sumar(int $n): void {",
        "        self::$total += $n;",
        "    }",
        "    public static function total(): int {",
        "        return self::$total;",
        "    }",
        "}",
        "        self::$total = $n;",
      ],
      hints: [
        "Declara el estado compartido: private static int $jinetes = 0;",
        "Dentro de un método estático no hay $this: usa self::$jinetes += $n;",
        "Los métodos también deben ser static para poder llamarlos con Caceria::sumar(5).",
      ],
      test_cases: [
        { input: "Caceria::total()", raw: true, expected: 0, description: "La cacería empieza sin jinetes contados" },
        { input: "Caceria::sumar(5)", raw: true, expected: null, description: "Cinco jinetes en la Cima de los Vientos…" },
        { input: "Caceria::sumar(4)", raw: true, expected: null, description: "…y los cuatro restantes se unen" },
        { input: "Caceria::total()", raw: true, expected: 9, description: "El estado es compartido: son los Nueve" },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: "El Vado de Bruinen",
    lore_intro:
      "«¡Volved a la tierra de Mordor y no me sigáis!» Las aguas se alzan en caballos de espuma. No hace falta crear un río nuevo para desatar su furia: el poder es de la clase, no del objeto.",
    challenge: {
      topic: "Métodos estáticos (Clase::metodo)",
      instructions:
        "Crea la clase RioBruinen con la constante FUERZA_CRECIDA = 50 y el método ESTÁTICO desbordar(array $jinetes): int. Recibe un array con la fuerza de cada jinete y devuelve cuántos son arrastrados: los que tengan fuerza MENOR que la crecida. No debe hacer falta instanciar la clase.",
      starter_code: "<?php\n\nclass RioBruinen {\n\n}\n",
      blocks: [
        "<?php",
        "class RioBruinen {",
        "    public const FUERZA_CRECIDA = 50;",
        "    public static function desbordar(array $fuerzas): int {",
        "        return count(array_filter($fuerzas, fn($f) => $f < self::FUERZA_CRECIDA));",
        "    }",
        "}",
        "        return count(array_filter($fuerzas, fn($f) => $f > self::FUERZA_CRECIDA));",
      ],
      hints: [
        "El método debe ser estático: public static function desbordar(array $jinetes): int",
        "Dentro usa self::FUERZA_CRECIDA para comparar.",
        "Cuenta los que no resisten: return count(array_filter($jinetes, fn(int $f) => $f < self::FUERZA_CRECIDA));",
      ],
      test_cases: [
        { input: "RioBruinen::FUERZA_CRECIDA", raw: true, expected: 50, description: "La fuerza de la crecida es una constante de clase" },
        { input: "RioBruinen::desbordar([10, 20, 80])", raw: true, expected: 2, description: "Dos jinetes débiles son arrastrados; el fuerte resiste" },
        { input: "RioBruinen::desbordar([60, 70])", raw: true, expected: 0, description: "Ninguno cede ante la crecida" },
        { input: "RioBruinen::desbordar([5, 5, 5, 5, 5, 5, 5, 5, 5])", raw: true, expected: 9, description: "Los Nueve caballos son barridos por las aguas" },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: "Las runas del Vado",
    lore_intro:
      "Grabados en la roca sobre Bruinen hay tres signos: aguas calmas, aguas crecidas, aguas desbordadas. Sólo tres estados posibles, y ni uno más — como un enum.",
    challenge: {
      topic: "Enums respaldados (const con superpoderes)",
      instructions:
        "Un enum es un conjunto CERRADO de valores con nombre: como las constantes de clase, pero convertidas en un tipo propio.\n\n" +
        "Declara el enum `Vado` respaldado por `string` con tres casos y sus valores exactos:\n" +
        "• `Calmo` = `'calmo'`\n• `Crecido` = `'crecido'`\n• `Desbordado` = `'desbordado'`\n\n" +
        "Añade:\n" +
        "• `esVadeable(): bool` — sólo el Vado Calmo se puede cruzar.\n" +
        "• `public static function segunCaudal(int $caudal): self` — devuelve `Calmo` si el caudal es menor que 30, `Crecido` si es menor que 70, y `Desbordado` en los demás casos. Usa `match (true)`.",
      starter_code: "<?php\n\nenum Vado: string\n{\n\n    public function esVadeable(): bool\n    {\n    }\n\n    public static function segunCaudal(int $caudal): self\n    {\n    }\n}\n",
      blocks: [
        "<?php",
        "enum Vado: string",
        "{",
        "    case Calmo = 'calmo';",
        "    case Crecido = 'crecido';",
        "    case Desbordado = 'desbordado';",
        "    public function esVadeable(): bool",
        "    {",
        "        return $this === self::Calmo;",
        "    }",
        "    public static function segunCaudal(int $caudal): self",
        "    {",
        "        if ($caudal < 50) return self::Calmo;",
        "        if ($caudal < 150) return self::Crecido;",
        "        return self::Desbordado;",
        "    }",
        "}",
        "        return self::Calmo;",
      ],
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
};

/** Capítulo 5 · Encapsulamiento avanzado, readonly, invariantes y value objects. */
export const SYL_PHP_COMMUNITY_5: Syllabus = {
  c5_crebain: {
    kind: "battle",
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
        question: "¿Dónde se puede asignar por primera vez una propiedad readonly?",
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
        question: "¿Puede una propiedad `readonly` tener también un tipo declarado?",
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
  c5_lobo_nieve: {
    kind: "battle",
    questions: [
      {
        question: "Un `setEdad($n)` que rechaza edades negativas protege una…",
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
        question: "¿Por qué un setter con validación es mejor que una propiedad pública?",
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
        question: "Quieres cambiar un dato de un objeto `readonly`. ¿Cuál es el patrón idiomático?",
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
  c5_jefe_caradhras: {
    kind: "challenge",
    title: "La Voluntad de Caradhras",
    lore_intro:
      "La montaña no negocia. Una medida no se altera: si el frío cambia, tienes OTRA medida. Forja un objeto de valor inmutable con readonly.",
    challenge: {
      topic: "Objetos de valor inmutables (readonly)",
      instructions:
        "Crea la clase Temperatura con $grados readonly (promovido en el constructor). El constructor debe lanzar InvalidArgumentException si los grados están fuera de -40..40. Añade conMas(int $g): Temperatura, que devuelva una INSTANCIA NUEVA con los grados sumados, sin tocar la original.",
      sut: "new Temperatura(-10)",
      starter_code:
        "<?php\n\nclass Temperatura {\n}\n",
      blocks: [
        "<?php",
        "class Temperatura {",
        "    public function __construct(public readonly int $grados) {",
        "        if ($grados < -50) {",
        "            throw new InvalidArgumentException('demasiado fría');",
        "        }",
        "    }",
        "    public function conMas(int $g): Temperatura {",
        "        return new Temperatura($this->grados + $g);",
        "    }",
        "}",
        "        $this->grados += $g;",
      ],
      hints: [
        "Promueve y marca readonly: public function __construct(public readonly int $grados) { … }",
        "conMas() no muta: return new Temperatura($this->grados + $g);",
      ],
      test_cases: [
        { input: "grados", expected: -10, description: "La temperatura de partida" },
        { input: "(new Temperatura(-10))->conMas(-5)->grados", raw: true, expected: -15, description: "conMas() devuelve una más fría" },
        { input: "(function() { $t = new Temperatura(-10); $t->conMas(-5); return $t->grados; })()", raw: true, expected: -10, description: "La ORIGINAL no cambia: inmutabilidad" },
        { input: "(function() { try { new Temperatura(-100); return false; } catch (\\InvalidArgumentException $e) { return true; } })()", raw: true, expected: true, description: "Rechaza valores fuera de rango" },
      ],
    },
  },
  c5_trasgo_montanes: {
    kind: "battle",
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
        question: "¿Qué pasa si un método intenta LEER una propiedad readonly?",
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
        question: "¿Cuál es la ventaja de un objeto inmutable a la hora de razonar sobre el código?",
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
  pergamino_hielo: {
    kind: "scroll",
    title: "El Pergamino del Hielo",
    lore_intro:
      "Gandalf resguarda un pergamino bajo su capa antes de que la ventisca lo arranque. «Lo que no debe cambiar, protégelo. Lo que cambia, vigílalo en la puerta.»",
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
  carga_de_bill: {
    kind: "challenge",
    title: "La Carga de Bill el Poney",
    lore_intro:
      "Sam repasa los fardos que carga Bill. Una provisión es lo que es: su nombre y su peso no cambian a mitad del camino. Eso, en PHP, se llama readonly.",
    challenge: {
      topic: "Propiedades readonly",
      instructions:
        "Crea la clase Provision con dos propiedades públicas de sólo lectura: $nombre (string) y $peso (int), asignadas en el constructor. Una vez creada, nadie debe poder modificarlas.",
      sut: "new Provision('lembas', 5)",
      starter_code: "<?php\n\nclass Provision {\n}\n",
      blocks: [
        "<?php",
        "class Provision {",
        "    public function __construct(",
        "        public readonly string $nombre,",
        "        public readonly int $peso,",
        "    ) {}",
        "}",
        "        public string $nombre,",
      ],
      hints: [
        "Puedes promover y marcar de sólo lectura a la vez: public readonly string $nombre",
        "El constructor completo: __construct(public readonly string $nombre, public readonly int $peso) {}",
        "Una propiedad readonly sólo se escribe dentro del constructor; después lanza un Error.",
      ],
      test_cases: [
        { input: "nombre", expected: "lembas", description: "El nombre se lee sin problema" },
        { input: "peso", expected: 5, description: "El peso se lee sin problema" },
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
  resistencia_comunidad: {
    kind: "challenge",
    title: "La Resistencia de la Comunidad",
    lore_intro:
      "El viento arrecia. Boromir abre paso entre la nieve, pero las fuerzas menguan. Vigila el calor de la Comunidad: que nadie pueda alterarlo desde fuera y que nunca caiga por debajo de cero.",
    challenge: {
      topic: "Setters con validación e invariantes",
      instructions:
        "Crea ResistenciaComunidad con la constante UMBRAL = 20 y la propiedad PRIVADA $calor iniciada en 100. Añade: getCalor(): int; enfriar(int $grados): void, que reste sin bajar nunca de 0 y lance InvalidArgumentException si le pasan un número negativo; y estaCongelada(): bool, true cuando el calor sea menor o igual al UMBRAL.",
      sut: "new ResistenciaComunidad()",
      starter_code: "<?php\n\nclass ResistenciaComunidad {\n    public const UMBRAL = 20;\n\n}\n",
      blocks: [
        "<?php",
        "class ResistenciaComunidad {",
        "    public const UMBRAL = 20;",
        "    private int $calor = 100;",
        "    public function getCalor(): int {",
        "        return $this->calor;",
        "    }",
        "    public function estaCongelada(): bool {",
        "        return $this->calor <= self::UMBRAL;",
        "    }",
        "    public function enfriar(int $grados): void {",
        "        if ($grados < 0) {",
        "            throw new InvalidArgumentException('grados negativos');",
        "        }",
        "        $this->calor = max(0, $this->calor - $grados);",
        "    }",
        "}",
        "        $this->calor -= $grados;",
      ],
      hints: [
        "Guard clause al principio: if ($grados < 0) throw new InvalidArgumentException('...');",
        "Para no bajar de cero: $this->calor = max(0, $this->calor - $grados);",
        "estaCongelada() compara con la constante: return $this->calor <= self::UMBRAL;",
      ],
      test_cases: [
        { input: "getCalor()", expected: 100, description: "La Comunidad parte con el calor intacto" },
        { input: "estaCongelada()", expected: false, description: "Al principio nadie está congelado" },
        { input: "enfriar(50)", expected: null, description: "La ventisca muerde…" },
        { input: "getCalor()", expected: 50, description: "…y el calor baja a 50" },
        { input: "enfriar(40)", expected: null, description: "Sigue nevando…" },
        { input: "estaCongelada()", expected: true, description: "Con 10 de calor (≤ 20) la Comunidad se congela" },
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
  temperatura_montana: {
    kind: "challenge",
    title: "El Umbral de la Nieve",
    lore_intro:
      "«La montaña no negocia», murmura Aragorn mirando el termómetro de escarcha. Una medida no se altera: si el frío cambia, lo que tienes es OTRA medida.",
    challenge: {
      topic: "Objetos de valor inmutables",
      instructions:
        "Crea la clase Temperatura con $grados readonly. El constructor debe lanzar InvalidArgumentException si los grados están fuera del rango -40..40. Añade conMas(int $g): Temperatura, que devuelva una INSTANCIA NUEVA con los grados sumados, dejando la original intacta.",
      sut: "new Temperatura(-10)",
      starter_code: "<?php\n\nclass Temperatura {\n\n}\n",
      blocks: [
        "<?php",
        "class Temperatura {",
        "    public function __construct(public readonly int $grados) {",
        "        if ($grados < -50) {",
        "            throw new InvalidArgumentException('demasiado fría');",
        "        }",
        "    }",
        "    public function conMas(int $g): Temperatura {",
        "        return new Temperatura($this->grados + $g);",
        "    }",
        "}",
        "        $this->grados += $g;",
      ],
      hints: [
        "Valida dentro del constructor antes de nada: if ($grados < -40 || $grados > 40) throw new InvalidArgumentException('...');",
        "Como es readonly, conMas() no puede modificar: return new Temperatura($this->grados + $g);",
        "Ese patrón (devolver una instancia nueva) es lo que hace inmutable al objeto.",
      ],
      test_cases: [
        { input: "grados", expected: -10, description: "La temperatura de partida" },
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
};

/** Capítulo 6 · Interfaces, polimorfismo, patrón Command e iteradores. */
export const SYL_PHP_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: {
    kind: "battle",
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
        question: "¿Con qué palabra clave una clase adopta una interfaz?",
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
  c6_trol_cavernas: {
    kind: "battle",
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
        question: "Tienes `function atacar(Arma $a)`. ¿Qué objetos acepta?",
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
  c6_capitan_trasgo: {
    kind: "battle",
    questions: [
      {
        question: "¿Puede una clase implementar VARIAS interfaces a la vez?",
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
        question: "`$x instanceof Arma`: ¿cuándo devuelve true?",
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
  c6_jefe_balrog: {
    kind: "challenge",
    title: "El Balrog de Morgoth",
    lore_intro:
      "Sombra y fuego. El Balrog es un Enemigo más para el código que lo enfrenta… pero golpea diez veces más fuerte. Implementa el contrato Enemigo.",
    challenge: {
      topic: "Interfaces y polimorfismo",
      instructions:
        "Existen la interfaz Enemigo (atacar(): int), la clase Orco (ataca con 10) y la función danioTotal(array $enemigos). Crea Balrog, que implemente Enemigo y ataque con 100. danioTotal debe poder sumar orcos y balrogs por igual.",
      support_code:
        "interface Enemigo {\n    public function atacar(): int;\n}\n\nclass Orco implements Enemigo {\n    public function atacar(): int { return 10; }\n}\n\nfunction danioTotal(array $enemigos): int {\n    return array_sum(array_map(fn(Enemigo $e) => $e->atacar(), $enemigos));\n}",
      starter_code:
        "<?php\n\n// Enemigo (interfaz), Orco y danioTotal() ya existen.\n\nclass Balrog {\n}\n",
      blocks: [
        "<?php",
        "// Enemigo (interfaz), Orco y danioTotal() ya existen.",
        "class Balrog implements Enemigo {",
        "    public function atacar(): int {",
        "        return 100;",
        "    }",
        "}",
        "class Balrog {",
      ],
      hints: [
        "Declara el contrato: class Balrog implements Enemigo { … }",
        "Implementa atacar() devolviendo 100.",
      ],
      test_cases: [
        { input: "(new Balrog())->atacar()", raw: true, expected: 100, description: "El Balrog golpea fortísimo" },
        { input: "danioTotal([new Orco(), new Balrog()])", raw: true, expected: 110, description: "La misma función suma orco y balrog: polimorfismo" },
        { input: "(new Balrog()) instanceof Enemigo", raw: true, expected: true, description: "Cumple el contrato Enemigo" },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: "El Pergamino de los Contratos",
    lore_intro:
      "Ante las puertas cerradas, Gandalf despliega un pergamino cubierto de runas. «No preguntes de qué está hecha una cosa. Pregunta qué promete hacer.»",
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
  puertas_de_durin: {
    kind: "challenge",
    title: "Las Puertas de Durin",
    lore_intro:
      "Las runas de ithildin brillan bajo la luz de la luna: «Habla, amigo, y entra.» Gandalf lucha con hechizos de apertura… hasta que Merry hace la pregunta correcta. La puerta sólo promete una cosa: reconocer la palabra.",
    challenge: {
      topic: "Interfaces (implements)",
      instructions:
        "Implementa la interfaz Descifrable en la clase PuertaDurin. El método susurrarPalabra(string $palabra): bool debe devolver true SOLO con la palabra élfica 'mellon' (amigo), sin distinguir mayúsculas.",
      sut: "new PuertaDurin()",
      support_code:
        "interface Descifrable {\n    public function susurrarPalabra(string $palabra): bool;\n}",
      starter_code: "<?php\n\nclass PuertaDurin {\n}\n",
      blocks: [
        "<?php",
        "class PuertaDurin implements Descifrable {",
        "    public function susurrarPalabra(string $palabra): bool {",
        "        return strtolower($palabra) === 'mellon';",
        "    }",
        "}",
        "        return $palabra === 'mellon';",
      ],
      hints: [
        "Declara que cumples el contrato: class PuertaDurin implements Descifrable",
        "Para ignorar mayúsculas: strtolower($palabra) === 'mellon'",
        "Si el nombre o la firma del método no coinciden con la interfaz, PHP lanzará un error fatal.",
      ],
      test_cases: [
        { input: "susurrarPalabra('Mellon')", expected: true, description: "La palabra élfica abre la puerta" },
        { input: "susurrarPalabra('mellon')", expected: true, description: "No distingue mayúsculas" },
        { input: "susurrarPalabra('Amigo')", expected: false, description: "En castellano no funciona: hay que decirlo en élfico" },
        {
          input: "(new PuertaDurin()) instanceof Descifrable",
          raw: true,
          expected: true,
          description: "La clase debe IMPLEMENTAR el contrato Descifrable",
        },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: "La Cámara de Mazarbul",
    lore_intro:
      "«Han tomado el puente y la segunda sala.» Tambores en lo profundo. Trasgos y un troll de las cavernas irrumpen a la vez: distintas criaturas, un mismo contrato — todas atacan.",
    challenge: {
      topic: "Polimorfismo",
      instructions:
        "Existe la interfaz Enemigo (nombre(): string y atacar(): int) y la clase Camara con el método estático danioTotal(). Crea DOS clases que implementen Enemigo: Trasgo, que se llame 'Trasgo' y ataque con 5, y Troll, que se llame 'Troll' y ataque con 20.",
      support_code:
        "interface Enemigo {\n    public function nombre(): string;\n    public function atacar(): int;\n}\n\nclass Camara {\n    /** @param Enemigo[] $horda */\n    public static function danioTotal(array $horda): int {\n        return array_sum(array_map(fn(Enemigo $e) => $e->atacar(), $horda));\n    }\n}",
      starter_code: "<?php\n\nclass Trasgo {\n}\n\nclass Troll {\n}\n",
      blocks: [
        "<?php",
        "class Trasgo implements Enemigo {",
        "    public function nombre(): string {",
        "        return \"Trasgo\";",
        "    }",
        "    public function atacar(): int {",
        "        return 5;",
        "    }",
        "}",
        "class Troll implements Enemigo {",
        "    public function nombre(): string {",
        "        return \"Troll\";",
        "    }",
        "    public function atacar(): int {",
        "        return 20;",
        "    }",
        "}",
        "        return 10;",
      ],
      hints: [
        "Ambas deben declarar el contrato: class Trasgo implements Enemigo",
        "Cada una implementa los DOS métodos de la interfaz: nombre() y atacar().",
        "Fíjate en que Camara::danioTotal() no sabe si le pasas trasgos o trolls: eso es polimorfismo.",
      ],
      test_cases: [
        { input: "(new Trasgo())->nombre()", raw: true, expected: "Trasgo", description: "El trasgo se identifica" },
        { input: "(new Trasgo())->atacar()", raw: true, expected: 5, description: "El trasgo golpea flojo" },
        { input: "(new Troll())->atacar()", raw: true, expected: 20, description: "El troll golpea fuerte" },
        {
          input: "Camara::danioTotal([new Trasgo(), new Trasgo(), new Troll()])",
          raw: true,
          expected: 30,
          description: "La MISMA función suma la horda mezclada sin saber qué es cada uno",
        },
        { input: "(new Troll()) instanceof Enemigo", raw: true, expected: true, description: "Ambas cumplen el contrato Enemigo" },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: "El Puente de Khazad-dûm",
    lore_intro:
      "Una sombra con alas de oscuridad y una espada de llama. «¡Huid, insensatos!» Gandalf alza a Glamdring sobre el puente estrecho. Un comando mágico es un objeto: quien lo ejecuta no necesita saber qué hechizo es.",
    challenge: {
      topic: "Interfaces · patrón Command",
      instructions:
        "Existen la interfaz ComandoMagico (lanzar(Puente $p): string), la clase Puente (con $roto) y Gandalf, que ejecuta cualquier comando. Crea PalabraDeMando, que implemente ComandoMagico: al lanzarse debe ROMPER el puente ($p->roto = true) y devolver exactamente '¡No puedes pasar!'.",
      sut: "new Gandalf()",
      support_code:
        "class Puente {\n    public bool $roto = false;\n}\n\ninterface ComandoMagico {\n    public function lanzar(Puente $p): string;\n}\n\nclass Gandalf {\n    public function ejecutar(ComandoMagico $hechizo, Puente $p): string {\n        return $hechizo->lanzar($p);\n    }\n}",
      starter_code: "<?php\n\nclass PalabraDeMando {\n}\n",
      blocks: [
        "<?php",
        "class PalabraDeMando implements ComandoMagico {",
        "    public function lanzar(Puente $p): string {",
        "        $p->roto = true;",
        "        return \"¡No puedes pasar!\";",
        "    }",
        "}",
        "        return \"nada ocurre\";",
      ],
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
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: "La galería sin fin",
    lore_intro:
      "Las salas de Khazad-dûm se encadenan una tras otra en la oscuridad. Quien lleve su registro debe poder recorrerlas con un simple foreach — eso es un iterador, y la interfaz que lo permite.",
    challenge: {
      topic: "Generadores e IteratorAggregate",
      instructions:
        "Un generador produce valores de uno en uno con `yield`, sin construir la lista entera. Y un objeto se vuelve recorrible con foreach implementando la interfaz `IteratorAggregate`.\n\n" +
        "Escribe la clase `Galeria` que implemente `IteratorAggregate` y `Countable`, con las salas en una propiedad PRIVADA:\n" +
        "• `agregar(string $sala): static` — añade una sala y devuelve `$this` (interfaz fluida).\n" +
        "• `getIterator(): Generator` — rinde las salas en orden con `yield from`. Una línea.\n" +
        "• `count(): int` — cuántas salas hay.",
      starter_code: "<?php\n\nfinal class Galeria implements IteratorAggregate, Countable\n{\n    private array $salas = [];\n\n    public function agregar(string $sala): static\n    {\n    }\n\n    public function getIterator(): Generator\n    {\n    }\n\n    public function count(): int\n    {\n    }\n}\n",
      blocks: [
        "<?php",
        "final class Galeria implements IteratorAggregate, Countable",
        "{",
        "    private array $salas = [];",
        "    public function agregar(string $sala): static",
        "    {",
        "        $this->salas[] = $sala;",
        "        return $this;",
        "    }",
        "    public function getIterator(): Generator",
        "    {",
        "        yield from $this->salas;",
        "    }",
        "    public function count(): int",
        "    {",
        "        return count($this->salas);",
        "    }",
        "}",
        "        return $this->salas;",
      ],
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
};

/** Capítulo 7 · Clases abstractas y traits. */
export const SYL_PHP_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: {
    kind: "battle",
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
  c7_trasgo_frontera: {
    kind: "battle",
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
  c7_uruk_rastreador: {
    kind: "battle",
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
  c7_jefe_ugluk: {
    kind: "challenge",
    title: "Uglúk, capitán de Isengard",
    lore_intro:
      "El capitán porta una reliquia bendecida. Combina la FAMILIA (una abstracta) con la CAPACIDAD compartida (un trait) en una sola clase.",
    challenge: {
      topic: "Clases abstractas + traits",
      instructions:
        "Existen la abstracta Don (exige poder(): int) y el trait Bendecido (aporta bendicion(): int = 10). Crea Reliquia, que EXTIENDA Don y USE Bendecido, cuyo poder() devuelva 5 más la bendición (total 15).",
      support_code:
        "abstract class Don {\n    abstract public function poder(): int;\n}\n\ntrait Bendecido {\n    public function bendicion(): int { return 10; }\n}",
      starter_code:
        "<?php\n\n// Don (abstracta) y Bendecido (trait) ya existen.\n\nclass Reliquia {\n}\n",
      blocks: [
        "<?php",
        "// Don (abstracta) y Bendecido (trait) ya existen.",
        "class Reliquia extends Don {",
        "    use Bendecido;",
        "    public function poder(): int {",
        "        return 5 + $this->bendicion();",
        "    }",
        "}",
        "        return $this->bendicion();",
      ],
      hints: [
        "Se combinan así: class Reliquia extends Don { use Bendecido; … }",
        "En poder() llama al método del trait: return 5 + $this->bendicion();",
      ],
      test_cases: [
        { input: "(new Reliquia())->poder()", raw: true, expected: 15, description: "5 propios + 10 de bendición" },
        { input: "(new Reliquia()) instanceof Don", raw: true, expected: true, description: "Hereda de la abstracta Don" },
        { input: "in_array('Bendecido', class_uses('Reliquia'))", raw: true, expected: true, description: "Y usa el trait Bendecido" },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: "El Pergamino de Galadriel",
    lore_intro:
      "«Te doy la luz de Eärendil», dice la Dama. Y con ella, un pergamino: «Hay parentesco y hay don. No los confundas: uno se hereda, el otro se comparte.»",
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
  frasco_de_galadriel: {
    kind: "challenge",
    title: "El Frasco de Galadriel",
    lore_intro:
      "«Que sea para ti una luz en los lugares oscuros, cuando todas las demás se apaguen.» Todo don comparte una forma; sólo cambia cómo se usa.",
    challenge: {
      topic: "Clases abstractas (abstract)",
      instructions:
        "La clase abstracta ObjetoMagico ya existe: guarda $nombre, comparte describir() y obliga a implementar usar(): string. Crea FrascoDeGaladriel, que la extienda y devuelva en usar() exactamente 'una luz en los lugares oscuros'.",
      sut: "new FrascoDeGaladriel('Frasco')",
      support_code:
        "abstract class ObjetoMagico {\n    public function __construct(protected string $nombre) {}\n    abstract public function usar(): string;\n    public function describir(): string {\n        return \"Don de Galadriel: {$this->nombre}\";\n    }\n}",
      starter_code: "<?php\n\nclass FrascoDeGaladriel {\n}\n",
      blocks: [
        "<?php",
        "class FrascoDeGaladriel extends ObjetoMagico {",
        "    public function usar(): string {",
        "        return \"una luz en los lugares oscuros\";",
        "    }",
        "}",
        "        return \"luz\";",
      ],
      hints: [
        "class FrascoDeGaladriel extends ObjetoMagico { … }",
        "Sólo tienes que implementar usar(): describir() se hereda ya resuelto.",
        "Devuelve el texto exacto: return 'una luz en los lugares oscuros';",
      ],
      test_cases: [
        { input: "usar()", expected: "una luz en los lugares oscuros", description: "Cada don se usa a su manera" },
        {
          input: "describir()",
          expected: "Don de Galadriel: Frasco",
          description: "describir() se HEREDA: una abstracta sí puede traer código compartido",
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
  capas_elficas: {
    kind: "challenge",
    title: "Las Capas Élficas",
    lore_intro:
      "Las capas de Lórien no son de la misma familia que las barcas… pero ambas saben esconderse a la vista de ojos enemigos. Eso no se hereda: se comparte.",
    challenge: {
      topic: "Traits (reuso horizontal)",
      instructions:
        "Crea el trait CamuflajeElfico con el método ocultar(): string, que devuelva 'te fundes con el bosque'. Después crea DOS clases sin parentesco entre sí, CapaElfica y Barca, que USEN ese trait.",
      starter_code: "<?php\n\ntrait CamuflajeElfico {\n}\n\nclass CapaElfica {\n}\n\nclass Barca {\n}\n",
      blocks: [
        "<?php",
        "trait CamuflajeElfico {",
        "    public function ocultar(): string {",
        "        return \"te fundes con el bosque\";",
        "    }",
        "}",
        "class CapaElfica {",
        "    use CamuflajeElfico;",
        "}",
        "class Barca {",
        "    use CamuflajeElfico;",
        "}",
        "class CapaElfica {}",
      ],
      hints: [
        "Dentro de una clase, incorporas el trait con: use CamuflajeElfico;",
        "El trait declara el método una sola vez y las dos clases lo obtienen.",
        "No copies el método en cada clase: la última prueba comprueba que realmente usaste un trait.",
      ],
      test_cases: [
        { input: "(new CapaElfica())->ocultar()", raw: true, expected: "te fundes con el bosque", description: "La capa esconde a quien la lleva" },
        { input: "(new Barca())->ocultar()", raw: true, expected: "te fundes con el bosque", description: "La barca también, sin heredar de la capa" },
        { input: "in_array('CamuflajeElfico', class_uses('CapaElfica'))", raw: true, expected: true, description: "La capacidad viene de un TRAIT, no de copiar y pegar" },
        { input: "in_array('CamuflajeElfico', class_uses('Barca'))", raw: true, expected: true, description: "El mismo trait, reutilizado horizontalmente" },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: "Los Dones de la Dama",
    lore_intro:
      "Al alba, la Comunidad recibe sus regalos. Cada don es distinto, pero todos llevan la bendición de Lórien. Aquí se juntan las dos ideas: la familia que comparte forma, y el don que se pega a cualquiera.",
    challenge: {
      topic: "Abstractas + traits combinados",
      instructions:
        "Existen la abstracta Don (exige poder(): int), el trait Bendecido (aporta bendicion(): int = 10) y Cofre::poderTotal(). Crea Frasco y Capa: ambas EXTIENDEN Don y USAN Bendecido. poder() debe devolver su base más la bendición: 5 para el Frasco (total 15) y 2 para la Capa (total 12).",
      support_code:
        "abstract class Don {\n    abstract public function poder(): int;\n}\n\ntrait Bendecido {\n    public function bendicion(): int { return 10; }\n}\n\nclass Cofre {\n    /** @param Don[] $dones */\n    public static function poderTotal(array $dones): int {\n        return array_sum(array_map(fn(Don $d) => $d->poder(), $dones));\n    }\n}",
      starter_code: "<?php\n\nclass Frasco {\n}\n\nclass Capa {\n}\n",
      blocks: [
        "<?php",
        "class Frasco extends Don {",
        "    use Bendecido;",
        "    public function poder(): int {",
        "        return 5 + $this->bendicion();",
        "    }",
        "}",
        "class Capa extends Don {",
        "    use Bendecido;",
        "    public function poder(): int {",
        "        return 2 + $this->bendicion();",
        "    }",
        "}",
        "        return 5;",
      ],
      hints: [
        "Se combinan así: class Frasco extends Don { use Bendecido; … }",
        "Dentro de poder() puedes llamar al método que aporta el trait: return 5 + $this->bendicion();",
        "Cofre::poderTotal() las trata a las dos como Don: eso es polimorfismo sobre una abstracta.",
      ],
      test_cases: [
        { input: "(new Frasco())->poder()", raw: true, expected: 15, description: "5 propios + 10 de bendición" },
        { input: "(new Capa())->poder()", raw: true, expected: 12, description: "2 propios + 10 de bendición" },
        { input: "Cofre::poderTotal([new Frasco(), new Capa()])", raw: true, expected: 27, description: "El cofre las suma a ambas como Don" },
        {
          input:
            "(new Frasco()) instanceof Don && in_array('Bendecido', class_uses('Frasco'))",
          raw: true,
          expected: true,
          description: "Hereda de Don Y usa el trait Bendecido",
        },
      ],
    },
  },
};

/** Capítulo 8 · Excepciones (throw, try/catch/finally) y patrón Factory. */
export const SYL_PHP_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: {
    kind: "battle",
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
  c8_orco_saqueador: {
    kind: "battle",
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
  c8_uruk_espadachin: {
    kind: "battle",
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
  c8_jefe_lurtz: {
    kind: "challenge",
    title: "Lurtz, el primero de los Uruk-hai",
    lore_intro:
      "El último enemigo de la Comunidad. Monta la fábrica que crea la hueste de Isengard — y que ante lo desconocido, LANZA en vez de mentir.",
    challenge: {
      topic: "Patrón Factory y excepciones",
      instructions:
        "Existen la interfaz Guerrero (fuerza(): int), Orco (fuerza 10) y UrukHai (fuerza 30). Crea FabricaDeHuestes con el método ESTÁTICO crear(string $tipo): Guerrero, que devuelva un Orco para 'orco', un UrukHai para 'uruk', y lance InvalidArgumentException con cualquier otro tipo.",
      support_code:
        "interface Guerrero {\n    public function fuerza(): int;\n}\n\nclass Orco implements Guerrero {\n    public function fuerza(): int { return 10; }\n}\n\nclass UrukHai implements Guerrero {\n    public function fuerza(): int { return 30; }\n}",
      starter_code:
        "<?php\n\n// Guerrero (interfaz), Orco y UrukHai ya existen.\n\nclass FabricaDeHuestes {\n}\n",
      blocks: [
        "<?php",
        "// Guerrero (interfaz), Orco y UrukHai ya existen.",
        "class FabricaDeHuestes {",
        "    public static function crear(string $tipo): Guerrero {",
        "        return match ($tipo) {",
        "            'orco' => new Orco(),",
        "            'uruk' => new UrukHai(),",
        "            default => throw new InvalidArgumentException(\"tipo desconocido\"),",
        "        };",
        "    }",
        "}",
        "            default => new Orco(),",
      ],
      hints: [
        "En PHP 8 queda limpio con match: return match ($tipo) { 'orco' => new Orco(), … };",
        "El caso por defecto lanza: default => throw new InvalidArgumentException(\"Tipo desconocido: $tipo\"),",
      ],
      test_cases: [
        { input: "FabricaDeHuestes::crear('orco')->fuerza()", raw: true, expected: 10, description: "El orco común" },
        { input: "FabricaDeHuestes::crear('uruk')->fuerza()", raw: true, expected: 30, description: "El Uruk-hai" },
        { input: "(function() { try { FabricaDeHuestes::crear('elfo'); return false; } catch (\\InvalidArgumentException $e) { return true; } })()", raw: true, expected: true, description: "Un tipo desconocido se rechaza" },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: "El Pergamino de lo que Puede Fallar",
    lore_intro:
      "Aragorn deja caer un pergamino junto al fuego apagado. «Ninguna compañía sobrevive fingiendo que nada saldrá mal. Nómbralo, y podrás responder.»",
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
  tentacion_de_boromir: {
    kind: "challenge",
    title: "La Tentación de Boromir",
    lore_intro:
      "«Podríamos usarlo… ¡Dámelo!» El Anillo susurra al orgullo de Gondor. Cuando la voluntad no basta, hay que declarar el fallo por su nombre.",
    challenge: {
      topic: "Excepciones propias (throw)",
      instructions:
        "Crea la excepción CorruptionException, que extienda Exception. Después crea Boromir con resistir(int $tentacion): string, que devuelva 'resiste' si la tentación es 80 o menos, y LANCE una CorruptionException con el mensaje 'El Anillo lo reclama' si es mayor que 80.",
      sut: "new Boromir()",
      starter_code: "<?php\n\nclass CorruptionException extends Exception {\n}\n\nclass Boromir {\n}\n",
      blocks: [
        "<?php",
        "class CorruptionException extends Exception {",
        "}",
        "class Boromir {",
        "    public function resistir(int $tentacion): string {",
        "        if ($tentacion >= 90) {",
        "            throw new CorruptionException('El Anillo lo reclama');",
        "        }",
        "        return \"resiste\";",
        "    }",
        "}",
        "        return \"resiste\";",
      ],
      hints: [
        "Guard clause: if ($tentacion > 80) { throw new CorruptionException('El Anillo lo reclama'); }",
        "El mensaje se pasa al constructor de la excepción y se lee con getMessage().",
        "Si no lo lanzas, la prueba que espera la excepción fallará.",
      ],
      test_cases: [
        { input: "resistir(50)", expected: "resiste", description: "Con poca tentación, Boromir aguanta" },
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
  solio_de_la_vision: {
    kind: "challenge",
    title: "El Solio de la Visión",
    lore_intro:
      "Frodo sube a Amon Hen y se pone el Anillo. Desde el Solio ve reinos… y también el Ojo se vuelve hacia él. Ver de más tiene un precio: hay que saber recogerlo.",
    challenge: {
      topic: "try / catch",
      instructions:
        "El Solio ya existe: mirar(bool $conAnillo) devuelve la visión, pero LANZA VisionException si miras con el Anillo puesto. Crea la función observar(Solio $s, bool $conAnillo): string, que capture esa excepción y devuelva 'te quitas el Anillo: ' seguido del mensaje de la excepción.",
      support_code:
        "class VisionException extends Exception {}\n\nclass Solio {\n    public function mirar(bool $conAnillo): string {\n        if ($conAnillo) {\n            throw new VisionException('El Ojo te ve');\n        }\n        return 'ves las tierras de Rohan';\n    }\n}",
      starter_code: "<?php\n\nfunction observar(Solio $s, bool $conAnillo): string {\n}\n",
      blocks: [
        "<?php",
        "function observar(Solio $s, bool $conAnillo): string {",
        "    try {",
        "        return $s->mirar($conAnillo);",
        "    } catch (VisionException $e) {",
        "        return \"te quitas el Anillo: \" . $e->getMessage();",
        "    }",
        "}",
        "    return $s->mirar($conAnillo);",
      ],
      hints: [
        "Envuelve la llamada: try { return $s->mirar($conAnillo); } catch (VisionException $e) { … }",
        "Dentro del catch, compón el texto: return 'te quitas el Anillo: ' . $e->getMessage();",
        "Captura VisionException en concreto, no un Throwable genérico: captura sólo lo que sabes manejar.",
      ],
      test_cases: [
        { input: "observar(new Solio(), false)", raw: true, expected: "ves las tierras de Rohan", description: "Sin el Anillo, la visión es segura" },
        { input: "observar(new Solio(), true)", raw: true, expected: "te quitas el Anillo: El Ojo te ve", description: "Con el Anillo, capturas la excepción y reaccionas" },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: "La Hueste de Isengard",
    lore_intro:
      "Bajan por centenares. Los orcos comunes temen el sol; los Uruk-hai de Saruman marchan bajo él sin pestañear. No los crees uno a uno: monta una fábrica.",
    challenge: {
      topic: "Patrón Factory",
      instructions:
        "Existen la interfaz Guerrero y las clases Orco (resistencia al sol 0) y UrukHai (100). Crea FabricaDeHuestes con el método ESTÁTICO crear(string $tipo): Guerrero, que devuelva un Orco para 'orco', un UrukHai para 'uruk', y lance InvalidArgumentException con cualquier otro tipo.",
      support_code:
        "interface Guerrero {\n    public function resistenciaSol(): int;\n}\n\nclass Orco implements Guerrero {\n    public function resistenciaSol(): int { return 0; }\n}\n\nclass UrukHai implements Guerrero {\n    public function resistenciaSol(): int { return 100; }\n}",
      starter_code: "<?php\n\nclass FabricaDeHuestes {\n}\n",
      blocks: [
        "<?php",
        "class FabricaDeHuestes {",
        "    public static function crear(string $tipo): Guerrero {",
        "        return match ($tipo) {",
        "            'orco' => new Orco(),",
        "            'uruk' => new UrukHai(),",
        "            default => throw new InvalidArgumentException(\"tipo desconocido\"),",
        "        };",
        "    }",
        "}",
        "            default => new Orco(),",
      ],
      hints: [
        "En PHP 8 queda muy limpio con match: return match ($tipo) { 'orco' => new Orco(), … };",
        "El caso por defecto lanza: default => throw new InvalidArgumentException(\"Tipo desconocido: $tipo\"),",
        "Devuelve el tipo de la INTERFAZ (Guerrero): quien llama no necesita saber la clase concreta.",
      ],
      test_cases: [
        { input: "FabricaDeHuestes::crear('orco')->resistenciaSol()", raw: true, expected: 0, description: "El orco común se abrasa al sol" },
        { input: "FabricaDeHuestes::crear('uruk')->resistenciaSol()", raw: true, expected: 100, description: "El Uruk-hai marcha a plena luz del día" },
        { input: "FabricaDeHuestes::crear('uruk') instanceof Guerrero", raw: true, expected: true, description: "La fábrica devuelve algo que cumple el contrato" },
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
};
