import type { VariantOverride } from "@/lib/game/narrative";
import { DP_Q } from "./design-patterns";

/**
 * Contenido POR IDIOMA (PHP) de «Patrones de Diseño»: preguntas, pergaminos e
 * instrucciones. Las preguntas conceptuales se reutilizan del temario base
 * (DP_Q); sólo se redefinen las atadas a la sintaxis. Se funde con los overrides
 * de código (design-patterns-php.ts) vía mergeOverrides. GENERADO (gen-dp-content).
 */

const P = (es: string, en: string) => ({ es, en });

export const DP_PHP_C_1: Record<string, VariantOverride> = {
  c1_espia: {
    questions: [
      DP_Q.Q_F_WHAT,
      {
      question: P("¿Por qué usar una fábrica en vez de `new` directo por todas partes?", "Why use a factory instead of `new` directly everywhere?"),
      options: [
      P("Desacopla al cliente de las clases concretas", "Decouples the client from concrete classes"),
      P("Es más corto siempre", "It's always shorter"),
      P("Evita usar clases", "Avoids using classes"),
      P("Hace el código más lento", "Makes code slower"),
      ],
      correct: 0,
      explanation: P("Si la creación está centralizada, cambiar o añadir tipos toca UN sitio. Con `new` esparcido por el código, un cambio obliga a tocar muchos.", "With creation centralized, changing or adding types touches ONE place. With `new` scattered, a change forces edits everywhere."),
    },
      DP_Q.Q_F_RETURN,
    ],
  },
  c1_jinete_rastreador: {
    questions: [
      DP_Q.Q_F_METHOD,
      DP_Q.Q_F_CLIENT,
      DP_Q.Q_F_POLY,
    ],
  },
  c1_perro_negro: {
    questions: [
      DP_Q.Q_F_OCP,
      DP_Q.Q_F_UNKNOWN,
      DP_Q.Q_F_CENTRAL,
    ],
  },
  pergamino_clases: {
    scroll: {
      topic: P("Patrón Factory", "Factory pattern"),
      sections: [
        { heading: P("La idea", "The idea"), body: P("Una función/método decide qué clase instanciar y devuelve la INTERFAZ común. El cliente pide 'un arma', no una clase concreta.", "A function/method decides which class to instantiate and returns the common INTERFACE. The client asks for 'a weapon', not a concrete class."), code: "function crearArma(string $tipo): Arma {\n    if ($tipo === 'espada') return new Espada();\n    return new Hacha();\n}" },
        { heading: P("Por qué", "Why"), body: P("Centraliza la creación: añadir o cambiar tipos toca un solo sitio. El cliente los usa de forma polimórfica, por la interfaz.", "It centralizes creation: adding or changing types touches one place. The client uses them polymorphically, via the interface."), code: "$a = crearArma('espada');\n$a->danio(); // 10, sin saber la clase" },
        { heading: P("Extensible", "Extensible"), body: P("Abierto a extensión (nuevas armas), cerrado a modificación (el cliente no cambia). Si el tipo es desconocido, falla claro.", "Open for extension (new weapons), closed for modification (the client stays). If the type is unknown, fail clearly."), code: "if ($tipo === 'daga') return new Daga();\nthrow new Exception('arma desconocida');" },
      ],
      keyTakeaway: P("La Factory centraliza la creación y devuelve la interfaz común: desacopla al cliente de las clases concretas y permite añadir tipos sin tocarlo.", "The Factory centralizes creation and returns the common interface: it decouples the client from concrete classes and lets you add types without touching it."),
    },
  },
  c1_jefe_nazgul: {
    instructions: P("Ya existe `crearArma($tipo)`. Escribe `poderTotal(array $tipos): int` que use la fábrica para crear cada arma y devuelva la SUMA de sus `danio()`.", "`crearArma($tipo)` already exists. Write `poderTotal(array $tipos): int` that uses the factory to create each weapon and returns the SUM of their `danio()`."),
  },
  sendero_comarca: {
    instructions: P("Ya existen `Espada` (danio 10) y `Hacha` (danio 15), que implementan `Arma`. Escribe `crearArma(string $tipo): Arma` que devuelva un `Espada` si `$tipo` es `'espada'` o un `Hacha` en otro caso.", "`Espada` (danio 10) and `Hacha` (danio 15) already exist, implementing `Arma`. Write `crearArma(string $tipo): Arma` returning an `Espada` if `$tipo` is `'espada'` or a `Hacha` otherwise."),
  },
  halito_negro: {
    instructions: P("Escribe `crearArma(string $tipo): Arma` que devuelva `Espada` para `'espada'`, `Hacha` para `'hacha'`, y LANCE una `Exception` para cualquier otro tipo.", "Write `crearArma(string $tipo): Arma` returning `Espada` for `'espada'`, `Hacha` for `'hacha'`, and THROWING an `Exception` for any other type."),
  },
};

export const DP_PHP_C_2: Record<string, VariantOverride> = {
  c2_raiz: {
    questions: [
      DP_Q.Q_S_WHAT,
      DP_Q.Q_S_SWAP,
      DP_Q.Q_S_VS_IF,
    ],
  },
  c2_niebla: {
    questions: [
      {
      question: P("En PHP, una estrategia puede ser simplemente…", "In PHP, a strategy can simply be…"),
      options: [
      P("Un CLOSURE (función anónima), invocable con `$e($base)`", "A CLOSURE (anonymous function), callable with `$e($base)`"),
      P("Un número", "A number"),
      P("Un comentario", "A comment"),
      P("Un `use`", "A `use`"),
      ],
      correct: 0,
      explanation: P("No siempre hace falta una jerarquía de clases: un closure `fn($base) => $resultado` (declarado `callable`) ya es una estrategia enchufable.", "You don't always need a class hierarchy: a closure `fn($base) => $result` (typed `callable`) is already a pluggable strategy."),
    },
      DP_Q.Q_S_CONTEXT,
      DP_Q.Q_S_COMPOSE,
    ],
  },
  c2_sauce: {
    questions: [
      DP_Q.Q_S_OCP,
      DP_Q.Q_S_INTER,
      DP_Q.Q_S_TEST,
    ],
  },
  pergamino_ciclo_vida: {
    scroll: {
      topic: P("Patrón Strategy", "Strategy pattern"),
      sections: [
        { heading: P("Algoritmo enchufable", "Pluggable algorithm"), body: P("Cada variante de un comportamiento es una pieza con la MISMA firma. En PHP, un closure `callable` basta como estrategia.", "Each behavior variant is a piece with the SAME signature. In PHP, a `callable` closure suffices as a strategy."), code: "$agresiva = fn(int $b): int => $b * 2;\n$agresiva(10); // 20" },
        { heading: P("El contexto delega", "The context delegates"), body: P("Un objeto guarda una estrategia y le delega el trabajo. Puede cambiarla en caliente sin recrearse.", "An object holds a strategy and delegates the work. It can swap it live without recreating."), code: "class Guerrero {\n    public function __construct(private $e) {}\n    public function golpear(int $b): int { return ($this->e)($b); }\n}" },
        { heading: P("Composición sobre herencia", "Composition over inheritance"), body: P("En vez de una subclase por variante, el objeto COMPONE una estrategia. Añadir una nueva no toca el contexto.", "Instead of a subclass per variant, the object COMPOSES a strategy. Adding a new one doesn't touch the context."), code: "$g->cambiar($cauta); // cambia el comportamiento" },
      ],
      keyTakeaway: P("Strategy encapsula algoritmos intercambiables con la misma firma; el contexto los guarda y delega, y puede cambiarlos en caliente. Favorece composición sobre herencia y sustituye grandes switch.", "Strategy encapsulates interchangeable algorithms with the same signature; the context holds and delegates, and can swap them live. It favors composition over inheritance and replaces big switches."),
    },
  },
  c2_jefe_tumulario: {
    instructions: P("Escribe la clase `Guerrero` que reciba una estrategia `callable` en el constructor, con:\n• `cambiar(callable $e)` que la reemplace,\n• `golpear(array $bases): int` que aplique la estrategia a cada base y devuelva la SUMA.", "Write class `Guerrero` taking a `callable` strategy in the constructor, with:\n• `cambiar(callable $e)` that replaces it,\n• `golpear(array $bases): int` that applies the strategy to each base and returns the SUM."),
  },
  viejo_hombre_sauce: {
    instructions: P("Escribe `atacar(int $base, callable $estrategia): int` que devuelva el resultado de aplicar la `$estrategia` a `$base`.", "Write `atacar(int $base, callable $estrategia): int` returning the result of applying `$estrategia` to `$base`."),
  },
  tumulo_espectro: {
    instructions: P("Define dos estrategias: `$agresiva` (multiplica por 2) y `$cauta` (`max(0, $base - 5)`). Escribe `usar(int $base, callable $e): int` que aplique la estrategia dada.", "Define two strategies: `$agresiva` (times 2) and `$cauta` (`max(0, $base - 5)`). Write `usar(int $base, callable $e): int` applying the given strategy."),
  },
  canto_bombadil: {
    instructions: P("Escribe la clase `Guerrero` que reciba una estrategia `callable` en el constructor, con `setEstrategia(callable $e)` para reemplazarla y `atacar(int $base): int` que la aplique.", "Write class `Guerrero` taking a `callable` strategy in the constructor, with `setEstrategia(callable $e)` to replace it and `atacar(int $base): int` applying it."),
  },
};

export const DP_PHP_C_3: Record<string, VariantOverride> = {
  c3_ferny: {
    questions: [
      DP_Q.Q_O_WHAT,
      DP_Q.Q_O_DECOUPLE,
      DP_Q.Q_O_MANY,
    ],
  },
  c3_espia_nazgul: {
    questions: [
      DP_Q.Q_O_SUBSCRIBE,
      DP_Q.Q_O_NOTIFY,
      DP_Q.Q_O_PUSH,
    ],
  },
  c3_montaraz_falso: {
    questions: [
      DP_Q.Q_O_INDEP,
      {
      question: P("¿Dónde reconoces el patrón Observer en PHP?", "Where do you recognize Observer in PHP?"),
      options: [
      P("En `SplSubject`/`SplObserver`, dispatchers y sistemas de eventos", "In `SplSubject`/`SplObserver`, dispatchers and event systems"),
      P("En los bucles `foreach`", "In `foreach` loops"),
      P("En los `namespace`", "In `namespace`s"),
      P("En los `use`", "In `use`s"),
      ],
      correct: 0,
      explanation: P("La SPL trae `SplSubject`/`SplObserver`, y los event dispatchers (Symfony, Laravel) son Observer: te suscribes con un listener que se ejecuta cuando ocurre el evento.", "The SPL ships `SplSubject`/`SplObserver`, and event dispatchers (Symfony, Laravel) are Observer: you subscribe a listener that runs when the event fires."),
    },
      DP_Q.Q_O_ADD,
    ],
  },
  pergamino_herencia: {
    scroll: {
      topic: P("Patrón Observer", "Observer pattern"),
      sections: [
        { heading: P("Sujeto y observadores", "Subject and observers"), body: P("El sujeto guarda una lista de observadores (callables) y los avisa. Relación uno a muchos.", "The subject holds a list of observers (callables) and notifies them. One-to-many relationship."), code: "$s->suscribir(fn($v) => print($v));" },
        { heading: P("Notificar", "Notify"), body: P("Al notificar, el sujeto recorre la lista y ejecuta cada observador con el dato (modelo 'push').", "On notify, the subject walks the list and runs each observer with the data ('push' model)."), code: "public function notificar(int $v): void {\n    foreach ($this->obs as $o) $o($v);\n}" },
        { heading: P("Desacople", "Decoupling"), body: P("El sujeto no sabe qué hacen los observadores; añadir o quitar reacciones no lo toca. Es lo que hay tras los event dispatchers.", "The subject doesn't know what observers do; adding or removing reactions doesn't touch it. It's what's behind event dispatchers."), code: "$dispatcher->addListener('click', $reaccionar);" },
      ],
      keyTakeaway: P("Observer: un sujeto mantiene observadores y les notifica un cambio (uno a muchos, modelo push). Desacopla emisor y reacciones; suscribir/desuscribir es dinámico. Es la base de los eventos.", "Observer: a subject keeps observers and notifies them of a change (one-to-many, push model). It decouples emitter and reactions; subscribe/unsubscribe is dynamic. It's the basis of events."),
    },
  },
  c3_jefe_reybrujo: {
    instructions: P("Escribe la clase `Sujeto` con una lista privada de observadores (`callable`), un método `suscribir(callable $o)` que lo añada y `notificar(int $valor)` que llame a CADA observador con ese valor.", "Write class `Sujeto` with a private list of observers (`callable`), a method `suscribir(callable $o)` that adds it and `notificar(int $valor)` that calls EACH observer with that value."),
  },
  poney_pisador: {
    instructions: P("Escribe la clase `Sujeto` con una lista privada de observadores y `suscribir(callable $o): int` que lo añada y devuelva CUÁNTOS observadores hay ya.", "Write class `Sujeto` with a private list of observers and `suscribir(callable $o): int` that adds it and returns HOW MANY observers there are now."),
  },
  hojas_de_tumulo: {
    instructions: P("Escribe la clase `Sujeto` con `suscribir(callable $o)` (añade a la lista) y `notificar(int $valor)` que llame a TODOS los observadores con ese valor.", "Write class `Sujeto` with `suscribir(callable $o)` (adds to the list) and `notificar(int $valor)` that calls ALL observers with that value."),
  },
  cima_de_los_vientos: {
    instructions: P("Escribe `crearAcumulador()` que devuelva un array con `'recibir'` (una función que suma `$v` a un total interno) y `'total'` (una función que devuelve el total). Es un observador que recuerda.", "Write `crearAcumulador()` returning an array with `'recibir'` (a function adding `$v` to an internal total) and `'total'` (a function returning the total). It's an observer that remembers."),
  },
};

export const DP_PHP_C_4: Record<string, VariantOverride> = {
  c4_jinete_rezagado: {
    questions: [
      DP_Q.Q_SG_WHAT,
      DP_Q.Q_SG_ACCESS,
      DP_Q.Q_SG_STATIC,
    ],
  },
  c4_lobo: {
    questions: [
      {
      question: P("¿Por qué el constructor de un Singleton suele ser privado?", "Why is a Singleton's constructor usually private?"),
      options: [
      P("Para impedir que se creen más instancias con `new`", "To prevent creating more instances with `new`"),
      P("Por decoración", "For decoration"),
      P("Para que sea más rápido", "To make it faster"),
      P("Es obligatorio en PHP", "It's required in PHP"),
      ],
      correct: 0,
      explanation: P("Con `private function __construct()`, nadie de fuera puede hacer `new`. La única vía es el método estático, que controla la instancia única.", "With `private function __construct()`, no outsider can `new` it. The only way is the static method, which controls the single instance."),
    },
      DP_Q.Q_SG_LAZY,
      DP_Q.Q_SG_STATE,
    ],
  },
  c4_trasgo_montaraz: {
    questions: [
      DP_Q.Q_SG_WHEN,
      DP_Q.Q_SG_CONS,
      DP_Q.Q_SG_POINT,
    ],
  },
  pergamino_estatico: {
    scroll: {
      topic: P("Patrón Singleton", "Singleton pattern"),
      sections: [
        { heading: P("Una sola instancia", "A single instance"), body: P("Una propiedad estática guarda la única instancia; un método estático la crea la primera vez y la devuelve siempre.", "A static property holds the single instance; a static method creates it the first time and always returns it."), code: "public static function instancia(): Banco {\n    if (self::$inst === null) self::$inst = new Banco();\n    return self::$inst;\n}" },
        { heading: P("Constructor privado", "Private constructor"), body: P("Con el constructor privado, nadie puede hacer `new` desde fuera: la única vía es el método estático.", "With a private constructor, nobody can `new` from outside: the only way is the static method."), code: "private function __construct() {}" },
        { heading: P("Estado compartido y cautela", "Shared state and caution"), body: P("Todas las llamadas devuelven el mismo objeto, así que comparten estado. Ojo: es estado GLOBAL; abusar dificulta las pruebas.", "All calls return the same object, so they share state. Beware: it's GLOBAL state; overuse hurts testing."), code: "Banco::instancia()->depositar(10);\nBanco::instancia()->saldo(); // 10" },
      ],
      keyTakeaway: P("Singleton: una única instancia (propiedad estática) con acceso global (método estático) y constructor privado. Comparte estado; úsalo con criterio porque es un global disfrazado.", "Singleton: a single instance (static property) with global access (static method) and a private constructor. It shares state; use it wisely because it's a disguised global."),
    },
  },
  c4_jefe_nueve: {
    instructions: P("Escribe la clase `Banco` (Singleton) con `instancia()` estático que devuelva SIEMPRE la misma, `depositar(int $n)` que sume a un total interno y `saldo(): int` que lo devuelva.", "Write class `Banco` (Singleton) with a static `instancia()` returning ALWAYS the same, `depositar(int $n)` adding to an internal total and `saldo(): int` returning it."),
  },
  montura_asfaloth: {
    instructions: P("Escribe la clase `Registro` con un método estático `instancia()` que devuelva SIEMPRE la misma instancia (créala la primera vez y guárdala en una propiedad estática).", "Write class `Registro` with a static `instancia()` method that ALWAYS returns the same instance (create it the first time and store it in a static property)."),
  },
  recuento_de_los_nueve: {
    instructions: P("Escribe la clase `Contador` (Singleton) con `instancia()` estático y `sumar(): int` que incremente un contador interno y devuelva su nuevo valor.", "Write class `Contador` (Singleton) with a static `instancia()` and `sumar(): int` that increments an internal counter and returns its new value."),
  },
  vado_de_bruinen: {
    instructions: P("Escribe la clase `Config` con una propiedad pública `$valor = 42`, constructor PRIVADO, y `instancia()` estático que cree la instancia sólo la primera vez.", "Write class `Config` with a public property `$valor = 42`, a PRIVATE constructor, and a static `instancia()` that creates the instance only the first time."),
  },
  c4_runas_del_vado: {
    instructions: P("Escribe la clase `Estado` (Singleton) con `instancia()` estático, `set(int $x)` que guarde un valor y `get(): int` que lo devuelva.", "Write class `Estado` (Singleton) with a static `instancia()`, `set(int $x)` storing a value and `get(): int` returning it."),
  },
};

export const DP_PHP_C_5: Record<string, VariantOverride> = {
  c5_crebain: {
    questions: [
      DP_Q.Q_D_WHAT,
      DP_Q.Q_D_INTERFACE,
      DP_Q.Q_D_DELEGATE,
    ],
  },
  c5_lobo_nieve: {
    questions: [
      DP_Q.Q_D_STACK,
      DP_Q.Q_D_TRANSPARENT,
      DP_Q.Q_D_RUNTIME,
    ],
  },
  c5_trasgo_montanes: {
    questions: [
      DP_Q.Q_D_VS_INHERIT,
      DP_Q.Q_D_COMPOSE,
      DP_Q.Q_D_REAL,
    ],
  },
  pergamino_hielo: {
    scroll: {
      topic: P("Patrón Decorator", "Decorator pattern"),
      sections: [
        { heading: P("Envolver y añadir", "Wrap and add"), body: P("Un decorador implementa la misma interfaz que el componente, guarda uno dentro y le suma o transforma el resultado.", "A decorator implements the same interface as the component, holds one inside and adds to or transforms its result."), code: "class ConEscudo implements Componente {\n    public function __construct(private Componente $c) {}\n    public function costo(): int { return $this->c->costo() + 5; }\n}" },
        { heading: P("Apilable y transparente", "Stackable and transparent"), body: P("Como comparten interfaz, se anidan libremente y el cliente los usa igual que al componente sin decorar.", "Since they share the interface, they nest freely and the client uses them like the undecorated component."), code: "(new ConFilo(new ConEscudo(new Base())))->costo();" },
        { heading: P("Frente a la herencia", "Versus inheritance"), body: P("Evita crear una subclase por cada combinación: compones capas en tiempo de ejecución. Composición sobre herencia.", "Avoids a subclass per combination: you compose layers at runtime. Composition over inheritance."), code: "// nada de ConEscudoYFiloYPuntas..." },
      ],
      keyTakeaway: P("Decorator envuelve un objeto de la misma interfaz para añadirle comportamiento; es apilable y transparente para el cliente. Evita la explosión de subclases: compones capas en tiempo de ejecución.", "Decorator wraps an object of the same interface to add behavior; it's stackable and transparent to the client. It avoids subclass explosion: you compose layers at runtime."),
    },
  },
  c5_jefe_caradhras: {
    instructions: P("Ya existen `Componente` (interfaz con `costo(): int`) y `Base` (costo 10). Escribe `Doblado`, un decorador que implemente `Componente`, reciba otro `Componente` y devuelva su `costo()` MULTIPLICADO por 2. Debe poder anidarse.", "`Componente` (interface with `costo(): int`) and `Base` (cost 10) already exist. Write `Doblado`, a decorator implementing `Componente`, taking another `Componente` and returning its `costo()` TIMES 2. It must be nestable."),
  },
  carga_de_bill: {
    instructions: P("Ya existe la interfaz `Componente` con `costo(): int`. Escribe la clase `Base` que la implemente y devuelva un costo de 10.", "The `Componente` interface with `costo(): int` already exists. Write class `Base` implementing it and returning a cost of 10."),
  },
  resistencia_comunidad: {
    instructions: P("Escribe `ConEscudo`, un decorador que implemente `Componente`, reciba otro `Componente` y devuelva su `costo()` MÁS 5.", "Write `ConEscudo`, a decorator implementing `Componente`, taking another `Componente` and returning its `costo()` PLUS 5."),
  },
  temperatura_montana: {
    instructions: P("Ya existen `Base` (10) y `ConEscudo` (+5). Escribe `ConFilo`, un decorador que implemente `Componente` y sume 3 al `costo()` de lo que envuelve. Debe funcionar apilado con `ConEscudo`.", "`Base` (10) and `ConEscudo` (+5) already exist. Write `ConFilo`, a decorator implementing `Componente` that adds 3 to the `costo()` of what it wraps. It must work stacked with `ConEscudo`."),
  },
};

export const DP_PHP_C_6: Record<string, VariantOverride> = {
  c6_trasgo_explorador: {
    questions: [
      DP_Q.Q_A_WHAT,
      DP_Q.Q_A_WRAP,
      DP_Q.Q_A_TARGET,
    ],
  },
  c6_trol_cavernas: {
    questions: [
      DP_Q.Q_A_TRANSLATE,
      DP_Q.Q_A_DELEGATION,
      DP_Q.Q_A_CONVERT,
    ],
  },
  c6_capitan_trasgo: {
    questions: [
      DP_Q.Q_A_REUSE,
      DP_Q.Q_A_VS_FACADE,
      DP_Q.Q_A_CLIENT,
    ],
  },
  pergamino_contratos: {
    scroll: {
      topic: P("Patrón Adapter", "Adapter pattern"),
      sections: [
        { heading: P("Traducir interfaces", "Translating interfaces"), body: P("El adaptador implementa la interfaz que ESPERA el cliente y, por dentro, delega en el objeto 'adaptado' incompatible.", "The adapter implements the interface the client EXPECTS and, inside, delegates to the incompatible 'adaptee' object."), code: "class Adaptador implements Nuevo {\n    public function __construct(private Viejo $v) {}\n    public function poder(): int { return $this->v->valorViejo(); }\n}" },
        { heading: P("Composición y conversión", "Composition and conversion"), body: P("Es un 'object adapter': TIENE-UN adaptado y le delega. Puede además convertir datos (unidades, formatos).", "It's an 'object adapter': it HAS-A adaptee and delegates. It can also convert data (units, formats)."), code: "public function fahrenheit(): float {\n    return $this->c->grados() * 9 / 5 + 32;\n}" },
        { heading: P("Reutilizar sin tocar", "Reuse without touching"), body: P("Perfecto para código legado o de terceros que no puedes modificar: lo envuelves con la interfaz que te conviene.", "Perfect for legacy or third-party code you can't modify: you wrap it with the interface you want."), code: "$obj = new Adaptador($legado);" },
      ],
      keyTakeaway: P("Adapter traduce una interfaz incompatible a la que el cliente espera: implementa la interfaz objetivo y delega (por composición) en el adaptado, pudiendo convertir datos. Ideal para reutilizar código legado sin tocarlo.", "Adapter translates an incompatible interface to the one the client expects: it implements the target interface and delegates (by composition) to the adaptee, possibly converting data. Ideal to reuse legacy code without touching it."),
    },
  },
  c6_jefe_balrog: {
    instructions: P("Ya existen la interfaz `Objetivo` (con `golpear(): int`) y la clase `Legado` (con `ataque(): int`, incompatible). Escribe `AdaptadorBalrog` que implemente `Objetivo`, reciba un `Legado` y haga que `golpear()` devuelva su `ataque()`.", "The `Objetivo` interface (with `golpear(): int`) and class `Legado` (with `ataque(): int`, incompatible) already exist. Write `AdaptadorBalrog` implementing `Objetivo`, taking a `Legado`, so `golpear()` returns its `ataque()`."),
  },
  puertas_de_durin: {
    instructions: P("Ya existen `Nuevo` (con `poder(): int`) y `Viejo` (con `valorViejo(): int`). Escribe `Adaptador` que implemente `Nuevo`, reciba un `Viejo` y haga que `poder()` devuelva su `valorViejo()`.", "`Nuevo` (with `poder(): int`) and `Viejo` (with `valorViejo(): int`) already exist. Write `Adaptador` implementing `Nuevo`, taking a `Viejo`, so `poder()` returns its `valorViejo()`."),
  },
  camara_mazarbul: {
    instructions: P("Ya existe `Celsius` (con `grados()`). Escribe `AFahrenheit` que reciba un `Celsius` y tenga `fahrenheit()` que devuelva `grados() * 9 / 5 + 32`.", "`Celsius` (with `grados()`) already exists. Write `AFahrenheit` taking a `Celsius`, with `fahrenheit()` returning `grados() * 9 / 5 + 32`."),
  },
  puente_khazad_dum: {
    instructions: P("Ya existe `Metros` (con `valor()`). Escribe `AKm` que reciba un `Metros` y tenga `km()` que devuelva `valor() / 1000`.", "`Metros` (with `valor()`) already exists. Write `AKm` taking a `Metros`, with `km()` returning `valor() / 1000`."),
  },
  c6_galeria_de_mazarbul: {
    instructions: P("Ya existe `Motor` (con `fuerza($x)`). Escribe `Adaptado` que reciba un `Motor` y tenga `empujar(int $x): int` que delegue en `fuerza($x)`.", "`Motor` (with `fuerza($x)`) already exists. Write `Adaptado` taking a `Motor`, with `empujar(int $x): int` delegating to `fuerza($x)`."),
  },
};

export const DP_PHP_C_7: Record<string, VariantOverride> = {
  c7_orco_explorador: {
    questions: [
      DP_Q.Q_C_WHAT,
      DP_Q.Q_C_EXECUTE,
      DP_Q.Q_C_DECOUPLE,
    ],
  },
  c7_trasgo_frontera: {
    questions: [
      DP_Q.Q_C_QUEUE,
      DP_Q.Q_C_UNDO,
      DP_Q.Q_C_INVOKER,
    ],
  },
  c7_uruk_rastreador: {
    questions: [
      DP_Q.Q_C_PARAM,
      DP_Q.Q_C_MACRO,
      DP_Q.Q_C_FIRST,
    ],
  },
  pergamino_dones: {
    scroll: {
      topic: P("Patrón Command", "Command pattern"),
      sections: [
        { heading: P("La acción como objeto", "The action as an object"), body: P("Un comando implementa `ejecutar()`. Empaqueta QUÉ hacer (y sus datos) en un objeto que se puede pasar y guardar.", "A command implements `ejecutar()`. It packages WHAT to do (and its data) into an object you can pass and store."), code: "class Sumar implements Comando {\n    public function __construct(private int $n) {}\n    public function ejecutar(): int { return $this->n + 1; }\n}" },
        { heading: P("Invocador y receptor", "Invoker and receiver"), body: P("El invocador guarda comandos y los ejecuta sin conocer su lógica. Desacopla al que pide del que hace.", "The invoker holds commands and runs them without knowing their logic. It decouples the requester from the performer."), code: "class Invocador {\n    public function __construct(private Comando $c) {}\n    public function correr(): int { return $this->c->ejecutar(); }\n}" },
        { heading: P("Colas, undo y macros", "Queues, undo and macros"), body: P("Al ser objetos, se encolan, se ejecutan en lote, se registran o se deshacen (si implementan `deshacer()`).", "As objects, they queue, run in batches, get logged or undone (if they implement `deshacer()`)."), code: "$cola->agregar(new Valor(3));\n$cola->ejecutarTodo();" },
      ],
      keyTakeaway: P("Command empaqueta una acción (y sus datos) como objeto con ejecutar(); desacopla invocador y receptor y permite encolar, ejecutar en lote, registrar y deshacer. Convierte las acciones en valores de primera clase.", "Command packages an action (and its data) as an object with execute(); it decouples invoker and receiver and enables queuing, batching, logging and undo. It makes actions first-class values."),
    },
  },
  c7_jefe_ugluk: {
    instructions: P("Ya existen `Comando` (con `ejecutar(): int`) y `Valor` (devuelve su número). Escribe la clase `Cola` con `agregar(Comando $c)` que apile un comando y `ejecutarTodo(): int` que ejecute todos y devuelva la SUMA de sus resultados.", "`Comando` (with `ejecutar(): int`) and `Valor` (returns its number) already exist. Write class `Cola` with `agregar(Comando $c)` that stacks a command and `ejecutarTodo(): int` that runs them all and returns the SUM of their results."),
  },
  frasco_de_galadriel: {
    instructions: P("Ya existe la interfaz `Comando` con `ejecutar(): int`. Escribe la clase `Encender` que la implemente y devuelva 1.", "The `Comando` interface with `ejecutar(): int` already exists. Write class `Encender` implementing it and returning 1."),
  },
  capas_elficas: {
    instructions: P("Ya existen `Comando` y `Encender`. Escribe la clase `Invocador` que reciba un `Comando` en el constructor y tenga `correr(): int` que devuelva el resultado de `ejecutar()` del comando.", "`Comando` and `Encender` already exist. Write class `Invocador` taking a `Comando` in the constructor, with `correr(): int` returning the command's `ejecutar()` result."),
  },
  dones_de_lorien: {
    instructions: P("Escribe la clase `Sumar` que implemente `Comando`, reciba un número `$n` en el constructor y cuyo `ejecutar()` devuelva `$n + 1`.", "Write class `Sumar` implementing `Comando`, taking a number `$n` in the constructor, whose `ejecutar()` returns `$n + 1`."),
  },
};

export const DP_PHP_C_8: Record<string, VariantOverride> = {
  c8_uruk_arquero: {
    questions: [
      DP_Q.Q_CO_WHAT,
      DP_Q.Q_CO_UNIFORM,
      DP_Q.Q_CO_LEAF,
    ],
  },
  c8_orco_saqueador: {
    questions: [
      DP_Q.Q_CO_RECURSION,
      DP_Q.Q_CO_ADD,
      DP_Q.Q_CO_NEST,
    ],
  },
  c8_uruk_espadachin: {
    questions: [
      DP_Q.Q_CO_PARTWHOLE,
      DP_Q.Q_CO_CLIENT,
      DP_Q.Q_CO_VS_DEC,
    ],
  },
  pergamino_fallos: {
    scroll: {
      topic: P("Patrón Composite", "Composite pattern"),
      sections: [
        { heading: P("Hojas y grupos", "Leaves and groups"), body: P("Hojas (piezas simples) y grupos (que contienen otros nodos) comparten la MISMA interfaz. El cliente no los distingue.", "Leaves (simple pieces) and groups (containing other nodes) share the SAME interface. The client can't tell them apart."), code: "class Hoja implements Nodo {\n    public function __construct(private int $v) {}\n    public function total(): int { return $this->v; }\n}" },
        { heading: P("Recursión", "Recursion"), body: P("Un grupo calcula su `total()` sumando el de sus hijos; si un hijo es otro grupo, la recursión baja por todo el árbol.", "A group computes its `total()` by summing its children's; if a child is another group, recursion descends the whole tree."), code: "public function total(): int {\n    return array_sum(array_map(fn($h) => $h->total(), $this->hijos));\n}" },
        { heading: P("Parte-todo uniforme", "Uniform part-whole"), body: P("Ideal para jerarquías (carpetas/archivos, menús). Operas sobre la raíz igual que sobre una hoja: una sola llamada.", "Ideal for hierarchies (folders/files, menus). You operate on the root like on a leaf: a single call."), code: "$raiz->agregar(new Hoja(1))->agregar($sub);\n$raiz->total();" },
      ],
      keyTakeaway: P("Composite forma un árbol parte-todo: hojas y grupos comparten interfaz y el cliente los trata igual. El grupo calcula recursivamente sobre sus hijos. Ideal para jerarquías (ficheros, menús, escenas).", "Composite forms a part-whole tree: leaves and groups share an interface and the client treats them alike. The group computes recursively over its children. Ideal for hierarchies (files, menus, scenes)."),
    },
  },
  c8_jefe_lurtz: {
    instructions: P("Ya existen `Nodo` (con `total(): int`) y `Hoja` (devuelve su valor). Escribe `Grupo` que implemente `Nodo`, con `agregar(Nodo $n)` que añada un hijo y DEVUELVA el propio grupo (para encadenar), y `total(): int` que sume el `total()` de todos sus hijos.", "`Nodo` (with `total(): int`) and `Hoja` (returns its value) already exist. Write `Grupo` implementing `Nodo`, with `agregar(Nodo $n)` adding a child and RETURNING the group itself (for chaining), and `total(): int` summing all children's `total()`."),
  },
  tentacion_de_boromir: {
    instructions: P("Ya existe la interfaz `Nodo` con `total(): int`. Escribe la clase `Hoja` que reciba un número `$v` en el constructor y cuyo `total()` devuelva `$v`.", "The `Nodo` interface with `total(): int` already exists. Write class `Hoja` taking a number `$v` in the constructor, whose `total()` returns `$v`."),
  },
  solio_de_la_vision: {
    instructions: P("Ya existen `Nodo` y `Hoja`. Escribe `Grupo` que implemente `Nodo`, con `agregar(Nodo $n)` que añada un hijo y `total(): int` que sume el `total()` de todos sus hijos.", "`Nodo` and `Hoja` already exist. Write `Grupo` implementing `Nodo`, with `agregar(Nodo $n)` adding a child and `total(): int` summing all children's `total()`."),
  },
  hueste_de_isengard: {
    instructions: P("Ya existen `Nodo`, `Hoja` y `Grupo` (con `agregar` y `total`). Escribe `ejercito(array $valores): int` que cree un `Grupo`, le agregue una `Hoja` por cada valor y devuelva el `total()` del grupo.", "`Nodo`, `Hoja` and `Grupo` (with `agregar` and `total`) already exist. Write `ejercito(array $valores): int` that creates a `Grupo`, adds one `Hoja` per value and returns the group's `total()`."),
  },
};
