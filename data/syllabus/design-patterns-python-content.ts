import type { VariantOverride } from "@/lib/game/narrative";
import { DP_Q } from "./design-patterns";

/**
 * Contenido POR IDIOMA (Python) de «Patrones de Diseño»: preguntas, pergaminos e
 * instrucciones. Las preguntas conceptuales se reutilizan del temario base
 * (DP_Q); sólo se redefinen las atadas a la sintaxis. Se funde con los overrides
 * de código (design-patterns-python.ts) vía mergeOverrides. GENERADO (gen-dp-content).
 */

const P = (es: string, en: string) => ({ es, en });

export const DP_PY_C_1: Record<string, VariantOverride> = {
  c1_espia: {
    questions: [
      DP_Q.Q_F_WHAT,
      {
      question: P("¿Por qué usar una fábrica en vez de instanciar las clases directamente por todas partes?", "Why use a factory instead of instantiating classes directly everywhere?"),
      options: [
      P("Desacopla al cliente de las clases concretas", "Decouples the client from concrete classes"),
      P("Es más corto siempre", "It's always shorter"),
      P("Evita usar clases", "Avoids using classes"),
      P("Hace el código más lento", "Makes code slower"),
      ],
      correct: 0,
      explanation: P("Si la creación está centralizada, cambiar o añadir tipos toca UN sitio. Con `Clase()` esparcido por el código, un cambio obliga a tocar muchos.", "With creation centralized, changing or adding types touches ONE place. With `Clase()` scattered, a change forces edits everywhere."),
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
        { heading: P("La idea", "The idea"), body: P("Una función decide qué clase instanciar y devuelve un objeto de la interfaz común. El cliente pide 'un arma', no una clase concreta.", "A function decides which class to instantiate and returns an object of the common interface. The client asks for 'a weapon', not a concrete class."), code: "def crearArma(tipo):\n    if tipo == 'espada':\n        return Espada()\n    return Hacha()" },
        { heading: P("Por qué", "Why"), body: P("Centraliza la creación: añadir o cambiar tipos toca un solo sitio. El cliente los usa de forma polimórfica.", "It centralizes creation: adding or changing types touches one place. The client uses them polymorphically."), code: "a = crearArma('espada')\na.danio()  # 10, sin saber la clase" },
        { heading: P("Extensible", "Extensible"), body: P("Abierto a extensión (nuevas armas), cerrado a modificación (el cliente no cambia). Si el tipo es desconocido, falla claro.", "Open for extension (new weapons), closed for modification (the client stays). If the type is unknown, fail clearly."), code: "if tipo == 'daga':\n    return Daga()\nraise Exception('arma desconocida')" },
      ],
      keyTakeaway: P("La Factory centraliza la creación y devuelve la interfaz común: desacopla al cliente de las clases concretas y permite añadir tipos sin tocarlo.", "The Factory centralizes creation and returns the common interface: it decouples the client from concrete classes and lets you add types without touching it."),
    },
  },
  c1_jefe_nazgul: {
    instructions: P("Ya existe `crearArma(tipo)`. Escribe `poderTotal(tipos)` que use la fábrica para crear cada arma y devuelva la SUMA de sus `danio()`.", "`crearArma(tipo)` already exists. Write `poderTotal(tipos)` that uses the factory to create each weapon and returns the SUM of their `danio()`."),
  },
  sendero_comarca: {
    instructions: P("Ya existen `Espada` (danio 10) y `Hacha` (danio 15). Escribe `crearArma(tipo)` que devuelva un `Espada()` si `tipo` es `'espada'` o un `Hacha()` en otro caso.", "`Espada` (danio 10) and `Hacha` (danio 15) already exist. Write `crearArma(tipo)` returning an `Espada()` if `tipo` is `'espada'` or a `Hacha()` otherwise."),
  },
  halito_negro: {
    instructions: P("Escribe `crearArma(tipo)` que devuelva `Espada()` para `'espada'`, `Hacha()` para `'hacha'`, y LANCE (`raise`) una `Exception` para cualquier otro tipo.", "Write `crearArma(tipo)` returning `Espada()` for `'espada'`, `Hacha()` for `'hacha'`, and RAISING an `Exception` for any other type."),
  },
};

export const DP_PY_C_2: Record<string, VariantOverride> = {
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
      question: P("En Python, una estrategia puede ser simplemente…", "In Python, a strategy can simply be…"),
      options: [
      P("Una FUNCIÓN (las funciones son objetos de primera clase)", "A FUNCTION (functions are first-class objects)"),
      P("Un número", "A number"),
      P("Un comentario", "A comment"),
      P("Un `import`", "An `import`"),
      ],
      correct: 0,
      explanation: P("No siempre hace falta una jerarquía de clases: una función (o `lambda base: resultado`) ya es una estrategia enchufable que se llama con `estrategia(base)`.", "You don't always need a class hierarchy: a function (or `lambda base: result`) is already a pluggable strategy called with `estrategia(base)`."),
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
        { heading: P("Algoritmo enchufable", "Pluggable algorithm"), body: P("Cada variante de un comportamiento es una pieza con la MISMA firma. En Python, una función o `lambda` basta como estrategia.", "Each behavior variant is a piece with the SAME signature. In Python, a function or `lambda` suffices as a strategy."), code: "agresiva = lambda b: b * 2\nagresiva(10)  # 20" },
        { heading: P("El contexto delega", "The context delegates"), body: P("Un objeto guarda una estrategia y le delega el trabajo. Puede cambiarla en caliente sin recrearse.", "An object holds a strategy and delegates the work. It can swap it live without recreating."), code: "class Guerrero:\n    def __init__(self, e):\n        self.e = e\n    def golpear(self, b):\n        return self.e(b)" },
        { heading: P("Composición sobre herencia", "Composition over inheritance"), body: P("En vez de una subclase por variante, el objeto COMPONE una estrategia. Añadir una nueva no toca el contexto.", "Instead of a subclass per variant, the object COMPOSES a strategy. Adding a new one doesn't touch the context."), code: "g.cambiar(cauta)  # cambia el comportamiento" },
      ],
      keyTakeaway: P("Strategy encapsula algoritmos intercambiables con la misma firma; el contexto los guarda y delega, y puede cambiarlos en caliente. Favorece composición sobre herencia y sustituye grandes if/switch.", "Strategy encapsulates interchangeable algorithms with the same signature; the context holds and delegates, and can swap them live. It favors composition over inheritance and replaces big if/switch."),
    },
  },
  c2_jefe_tumulario: {
    instructions: P("Escribe la clase `Guerrero` que reciba una estrategia (función) en el constructor, con:\n• `cambiar(e)` que la reemplace,\n• `golpear(bases)` que aplique la estrategia a cada base y devuelva la SUMA.", "Write class `Guerrero` taking a strategy (function) in the constructor, with:\n• `cambiar(e)` that replaces it,\n• `golpear(bases)` that applies the strategy to each base and returns the SUM."),
  },
  viejo_hombre_sauce: {
    instructions: P("Escribe `atacar(base, estrategia)` que devuelva el resultado de aplicar la `estrategia` a `base`.", "Write `atacar(base, estrategia)` returning the result of applying `estrategia` to `base`."),
  },
  tumulo_espectro: {
    instructions: P("Define dos estrategias: `agresiva` (multiplica por 2) y `cauta` (`max(0, base - 5)`). Escribe `usar(base, e)` que aplique la estrategia dada.", "Define two strategies: `agresiva` (times 2) and `cauta` (`max(0, base - 5)`). Write `usar(base, e)` applying the given strategy."),
  },
  canto_bombadil: {
    instructions: P("Escribe la clase `Guerrero` que reciba una estrategia en el constructor, con `setEstrategia(e)` para reemplazarla y `atacar(base)` que la aplique.", "Write class `Guerrero` taking a strategy in the constructor, with `setEstrategia(e)` to replace it and `atacar(base)` applying it."),
  },
};

export const DP_PY_C_3: Record<string, VariantOverride> = {
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
      question: P("¿Dónde reconoces el patrón Observer en Python?", "Where do you recognize Observer in Python?"),
      options: [
      P("En callbacks, señales (Django), y suscripciones a eventos", "In callbacks, signals (Django), and event subscriptions"),
      P("En los bucles `for`", "In `for` loops"),
      P("En los `import`", "In `import`s"),
      P("En los decoradores de tipo", "In type hints"),
      ],
      correct: 0,
      explanation: P("Registrar callbacks, las signals de Django o cualquier lista de suscriptores a la que avisas son Observer: te suscribes con una función que se ejecuta al ocurrir el evento.", "Registering callbacks, Django signals or any subscriber list you notify are Observer: you subscribe a function run when the event fires."),
    },
      DP_Q.Q_O_ADD,
    ],
  },
  pergamino_herencia: {
    scroll: {
      topic: P("Patrón Observer", "Observer pattern"),
      sections: [
        { heading: P("Sujeto y observadores", "Subject and observers"), body: P("El sujeto guarda una lista de observadores (funciones) y los avisa. Relación uno a muchos.", "The subject holds a list of observers (functions) and notifies them. One-to-many relationship."), code: "s.suscribir(lambda v: print(v))" },
        { heading: P("Notificar", "Notify"), body: P("Al notificar, el sujeto recorre la lista y ejecuta cada observador con el dato (modelo 'push').", "On notify, the subject walks the list and runs each observer with the data ('push' model)."), code: "def notificar(self, v):\n    for o in self.obs:\n        o(v)" },
        { heading: P("Desacople", "Decoupling"), body: P("El sujeto no sabe qué hacen los observadores; añadir o quitar reacciones no lo toca. Es lo que hay tras las señales y los callbacks.", "The subject doesn't know what observers do; adding or removing reactions doesn't touch it. It's what's behind signals and callbacks."), code: "boton.al_pulsar(reaccionar)  # registra un callback" },
      ],
      keyTakeaway: P("Observer: un sujeto mantiene observadores y les notifica un cambio (uno a muchos, modelo push). Desacopla emisor y reacciones; suscribir/desuscribir es dinámico. Es la base de los eventos.", "Observer: a subject keeps observers and notifies them of a change (one-to-many, push model). It decouples emitter and reactions; subscribe/unsubscribe is dynamic. It's the basis of events."),
    },
  },
  c3_jefe_reybrujo: {
    instructions: P("Escribe la clase `Sujeto` con una lista de observadores (funciones), `suscribir(o)` que lo añada y `notificar(valor)` que llame a CADA observador con ese valor.", "Write class `Sujeto` with a list of observers (functions), `suscribir(o)` that adds it and `notificar(valor)` that calls EACH observer with that value."),
  },
  poney_pisador: {
    instructions: P("Escribe la clase `Sujeto` con una lista de observadores y `suscribir(o)` que lo añada y devuelva CUÁNTOS observadores hay ya.", "Write class `Sujeto` with a list of observers and `suscribir(o)` that adds it and returns HOW MANY observers there are now."),
  },
  hojas_de_tumulo: {
    instructions: P("Escribe la clase `Sujeto` con `suscribir(o)` (añade a la lista) y `notificar(valor)` que llame a TODOS los observadores con ese valor.", "Write class `Sujeto` with `suscribir(o)` (adds to the list) and `notificar(valor)` that calls ALL observers with that value."),
  },
  cima_de_los_vientos: {
    instructions: P("Escribe `crearAcumulador()` que devuelva un diccionario con `'recibir'` (una función que suma `v` a un total interno) y `'total'` (una función que devuelve el total). Es un observador que recuerda.", "Write `crearAcumulador()` returning a dict with `'recibir'` (a function adding `v` to an internal total) and `'total'` (a function returning the total). It's an observer that remembers."),
  },
};

export const DP_PY_C_4: Record<string, VariantOverride> = {
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
      question: P("En un Singleton, ¿cómo se impide crear más instancias?", "In a Singleton, how do you prevent creating more instances?"),
      options: [
      P("Controlando la creación en un método de clase que reutiliza la instancia", "By controlling creation in a class method that reuses the instance"),
      P("Por decoración", "For decoration"),
      P("Para que sea más rápido", "To make it faster"),
      P("No se puede en absoluto", "It's impossible"),
      ],
      correct: 0,
      explanation: P("Python no tiene constructores privados de verdad; se usa un método de clase (o `__new__`) que guarda y reutiliza la única instancia en un atributo de clase.", "Python has no true private constructors; you use a classmethod (or `__new__`) that stores and reuses the single instance in a class attribute."),
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
        { heading: P("Una sola instancia", "A single instance"), body: P("Un atributo de clase guarda la única instancia; un método de clase la crea la primera vez y la devuelve siempre.", "A class attribute holds the single instance; a classmethod creates it the first time and always returns it."), code: "@classmethod\ndef instancia(cls):\n    if cls._inst is None:\n        cls._inst = Banco()\n    return cls._inst" },
        { heading: P("Controlar la creación", "Controlling creation"), body: P("Python no tiene constructores privados de verdad; se controla la creación en el método de clase (o en `__new__`).", "Python has no true private constructors; you control creation in the classmethod (or in `__new__`)."), code: "class Banco:\n    _inst = None" },
        { heading: P("Estado compartido y cautela", "Shared state and caution"), body: P("Todas las llamadas devuelven el mismo objeto, así que comparten estado. Ojo: es estado GLOBAL; abusar dificulta las pruebas.", "All calls return the same object, so they share state. Beware: it's GLOBAL state; overuse hurts testing."), code: "Banco.instancia().depositar(10)\nBanco.instancia().saldo()  # 10" },
      ],
      keyTakeaway: P("Singleton: una única instancia (atributo de clase) con acceso global (método de clase). Comparte estado; úsalo con criterio porque es un global disfrazado.", "Singleton: a single instance (class attribute) with global access (classmethod). It shares state; use it wisely because it's a disguised global."),
    },
  },
  c4_jefe_nueve: {
    instructions: P("Escribe la clase `Banco` (Singleton) con `instancia()` de clase que devuelva SIEMPRE la misma, `depositar(n)` que sume a un total interno y `saldo()` que lo devuelva.", "Write class `Banco` (Singleton) with a class-level `instancia()` returning ALWAYS the same, `depositar(n)` adding to an internal total and `saldo()` returning it."),
  },
  montura_asfaloth: {
    instructions: P("Escribe la clase `Registro` con un método de clase `instancia()` que devuelva SIEMPRE la misma instancia (créala la primera vez y guárdala en un atributo de clase).", "Write class `Registro` with a class method `instancia()` that ALWAYS returns the same instance (create it the first time and store it in a class attribute)."),
  },
  recuento_de_los_nueve: {
    instructions: P("Escribe la clase `Contador` (Singleton) con `instancia()` de clase y `sumar()` que incremente un contador interno y devuelva su nuevo valor.", "Write class `Contador` (Singleton) with a class-level `instancia()` and `sumar()` that increments an internal counter and returns its new value."),
  },
  vado_de_bruinen: {
    instructions: P("Escribe la clase `Config` con un atributo `valor = 42`, y un método de clase `instancia()` que cree la instancia sólo la primera vez (inicialización perezosa).", "Write class `Config` with a `valor = 42` attribute, and a class method `instancia()` that creates the instance only the first time (lazy initialization)."),
  },
  c4_runas_del_vado: {
    instructions: P("Escribe la clase `Estado` (Singleton) con `instancia()` de clase, `set(x)` que guarde un valor y `get()` que lo devuelva.", "Write class `Estado` (Singleton) with a class-level `instancia()`, `set(x)` storing a value and `get()` returning it."),
  },
};

export const DP_PY_C_5: Record<string, VariantOverride> = {
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
        { heading: P("Envolver y añadir", "Wrap and add"), body: P("Un decorador cumple la misma interfaz que el componente, guarda uno dentro y le suma o transforma el resultado.", "A decorator satisfies the same interface as the component, holds one inside and adds to or transforms its result."), code: "class ConEscudo:\n    def __init__(self, c):\n        self.c = c\n    def costo(self):\n        return self.c.costo() + 5" },
        { heading: P("Apilable y transparente", "Stackable and transparent"), body: P("Como comparten interfaz, se anidan libremente y el cliente los usa igual que al componente sin decorar.", "Since they share the interface, they nest freely and the client uses them like the undecorated component."), code: "ConFilo(ConEscudo(Base())).costo()" },
        { heading: P("Frente a la herencia", "Versus inheritance"), body: P("Evita crear una subclase por cada combinación: compones capas en tiempo de ejecución. Composición sobre herencia.", "Avoids a subclass per combination: you compose layers at runtime. Composition over inheritance."), code: "# nada de ConEscudoYFiloYPuntas..." },
      ],
      keyTakeaway: P("Decorator envuelve un objeto de la misma interfaz para añadirle comportamiento; es apilable y transparente para el cliente. Evita la explosión de subclases: compones capas en tiempo de ejecución.", "Decorator wraps an object of the same interface to add behavior; it's stackable and transparent to the client. It avoids subclass explosion: you compose layers at runtime."),
    },
  },
  c5_jefe_caradhras: {
    instructions: P("Ya existen `Componente` (con `costo()`) y `Base` (costo 10). Escribe `Doblado`, un decorador que reciba otro `Componente` y devuelva su `costo()` MULTIPLICADO por 2. Debe poder anidarse.", "`Componente` (with `costo()`) and `Base` (cost 10) already exist. Write `Doblado`, a decorator taking another `Componente` and returning its `costo()` TIMES 2. It must be nestable."),
  },
  carga_de_bill: {
    instructions: P("Escribe la clase `Base` con un método `costo()` que devuelva 10.", "Write class `Base` with a `costo()` method returning 10."),
  },
  resistencia_comunidad: {
    instructions: P("Escribe `ConEscudo`, un decorador que reciba otro `Componente` y devuelva su `costo()` MÁS 5.", "Write `ConEscudo`, a decorator taking another `Componente` and returning its `costo()` PLUS 5."),
  },
  temperatura_montana: {
    instructions: P("Ya existen `Base` (10) y `ConEscudo` (+5). Escribe `ConFilo`, un decorador que sume 3 al `costo()` de lo que envuelve. Debe funcionar apilado con `ConEscudo`.", "`Base` (10) and `ConEscudo` (+5) already exist. Write `ConFilo`, a decorator that adds 3 to the `costo()` of what it wraps. It must work stacked with `ConEscudo`."),
  },
};

export const DP_PY_C_6: Record<string, VariantOverride> = {
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
        { heading: P("Traducir interfaces", "Translating interfaces"), body: P("El adaptador ofrece el método que ESPERA el cliente y, por dentro, delega en el objeto 'adaptado' incompatible.", "The adapter offers the method the client EXPECTS and, inside, delegates to the incompatible 'adaptee' object."), code: "class Adaptador:\n    def __init__(self, v):\n        self.v = v\n    def poder(self):\n        return self.v.valorViejo()" },
        { heading: P("Composición y conversión", "Composition and conversion"), body: P("Es un 'object adapter': TIENE-UN adaptado y le delega. Puede además convertir datos (unidades, formatos).", "It's an 'object adapter': it HAS-A adaptee and delegates. It can also convert data (units, formats)."), code: "def fahrenheit(self):\n    return self.c.grados() * 9 / 5 + 32" },
        { heading: P("Reutilizar sin tocar", "Reuse without touching"), body: P("Perfecto para código legado o de terceros que no puedes modificar: lo envuelves con la interfaz que te conviene.", "Perfect for legacy or third-party code you can't modify: you wrap it with the interface you want."), code: "obj = Adaptador(legado)" },
      ],
      keyTakeaway: P("Adapter traduce una interfaz incompatible a la que el cliente espera: cumple la interfaz objetivo y delega (por composición) en el adaptado, pudiendo convertir datos. Ideal para reutilizar código legado sin tocarlo.", "Adapter translates an incompatible interface to the one the client expects: it satisfies the target interface and delegates (by composition) to the adaptee, possibly converting data. Ideal to reuse legacy code without touching it."),
    },
  },
  c6_jefe_balrog: {
    instructions: P("Ya existen `Objetivo` (con `golpear()`) y `Legado` (con `ataque()`, incompatible). Escribe `AdaptadorBalrog` que reciba un `Legado` y haga que `golpear()` devuelva su `ataque()`.", "`Objetivo` (with `golpear()`) and `Legado` (with `ataque()`, incompatible) already exist. Write `AdaptadorBalrog` taking a `Legado`, so `golpear()` returns its `ataque()`."),
  },
  puertas_de_durin: {
    instructions: P("Ya existen `Nuevo` (con `poder()`) y `Viejo` (con `valorViejo()`). Escribe `Adaptador` que reciba un `Viejo` y haga que `poder()` devuelva su `valorViejo()`.", "`Nuevo` (with `poder()`) and `Viejo` (with `valorViejo()`) already exist. Write `Adaptador` taking a `Viejo`, so `poder()` returns its `valorViejo()`."),
  },
  camara_mazarbul: {
    instructions: P("Ya existe `Celsius` (con `grados()`). Escribe `AFahrenheit` que reciba un `Celsius` y tenga `fahrenheit()` que devuelva `grados() * 9 / 5 + 32`.", "`Celsius` (with `grados()`) already exists. Write `AFahrenheit` taking a `Celsius`, with `fahrenheit()` returning `grados() * 9 / 5 + 32`."),
  },
  puente_khazad_dum: {
    instructions: P("Ya existe `Metros` (con `valor()`). Escribe `AKm` que reciba un `Metros` y tenga `km()` que devuelva `valor() / 1000`.", "`Metros` (with `valor()`) already exists. Write `AKm` taking a `Metros`, with `km()` returning `valor() / 1000`."),
  },
  c6_galeria_de_mazarbul: {
    instructions: P("Ya existe `Motor` (con `fuerza(x)`). Escribe `Adaptado` que reciba un `Motor` y tenga `empujar(x)` que delegue en `fuerza(x)`.", "`Motor` (with `fuerza(x)`) already exists. Write `Adaptado` taking a `Motor`, with `empujar(x)` delegating to `fuerza(x)`."),
  },
};

export const DP_PY_C_7: Record<string, VariantOverride> = {
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
        { heading: P("La acción como objeto", "The action as an object"), body: P("Un comando implementa `ejecutar()`. Empaqueta QUÉ hacer (y sus datos) en un objeto que se puede pasar y guardar.", "A command implements `ejecutar()`. It packages WHAT to do (and its data) into an object you can pass and store."), code: "class Sumar:\n    def __init__(self, n):\n        self.n = n\n    def ejecutar(self):\n        return self.n + 1" },
        { heading: P("Invocador y receptor", "Invoker and receiver"), body: P("El invocador guarda comandos y los ejecuta sin conocer su lógica. Desacopla al que pide del que hace.", "The invoker holds commands and runs them without knowing their logic. It decouples the requester from the performer."), code: "class Invocador:\n    def __init__(self, c):\n        self.c = c\n    def correr(self):\n        return self.c.ejecutar()" },
        { heading: P("Colas, undo y macros", "Queues, undo and macros"), body: P("Al ser objetos, se encolan, se ejecutan en lote, se registran o se deshacen (si implementan `deshacer()`).", "As objects, they queue, run in batches, get logged or undone (if they implement `deshacer()`)."), code: "cola.agregar(Valor(3))\ncola.ejecutarTodo()" },
      ],
      keyTakeaway: P("Command empaqueta una acción (y sus datos) como objeto con ejecutar(); desacopla invocador y receptor y permite encolar, ejecutar en lote, registrar y deshacer. Convierte las acciones en valores de primera clase.", "Command packages an action (and its data) as an object with execute(); it decouples invoker and receiver and enables queuing, batching, logging and undo. It makes actions first-class values."),
    },
  },
  c7_jefe_ugluk: {
    instructions: P("Ya existen `Comando` (con `ejecutar()`) y `Valor` (devuelve su número). Escribe la clase `Cola` con `agregar(c)` que apile un comando y `ejecutarTodo()` que ejecute todos y devuelva la SUMA de sus resultados.", "`Comando` (with `ejecutar()`) and `Valor` (returns its number) already exist. Write class `Cola` with `agregar(c)` that stacks a command and `ejecutarTodo()` that runs them all and returns the SUM of their results."),
  },
  frasco_de_galadriel: {
    instructions: P("Ya existe la interfaz `Comando` con `ejecutar()`. Escribe la clase `Encender` con `ejecutar()` que devuelva 1.", "The `Comando` interface with `ejecutar()` already exists. Write class `Encender` with `ejecutar()` returning 1."),
  },
  capas_elficas: {
    instructions: P("Ya existen `Comando` y `Encender`. Escribe la clase `Invocador` que reciba un `Comando` en el constructor y tenga `correr()` que devuelva el resultado de `ejecutar()` del comando.", "`Comando` and `Encender` already exist. Write class `Invocador` taking a `Comando` in the constructor, with `correr()` returning the command's `ejecutar()` result."),
  },
  dones_de_lorien: {
    instructions: P("Escribe la clase `Sumar` que reciba un número `n` en el constructor y cuyo `ejecutar()` devuelva `n + 1`.", "Write class `Sumar` taking a number `n` in the constructor, whose `ejecutar()` returns `n + 1`."),
  },
};

export const DP_PY_C_8: Record<string, VariantOverride> = {
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
        { heading: P("Hojas y grupos", "Leaves and groups"), body: P("Hojas (piezas simples) y grupos (que contienen otros nodos) comparten la MISMA interfaz. El cliente no los distingue.", "Leaves (simple pieces) and groups (containing other nodes) share the SAME interface. The client can't tell them apart."), code: "class Hoja:\n    def __init__(self, v):\n        self.v = v\n    def total(self):\n        return self.v" },
        { heading: P("Recursión", "Recursion"), body: P("Un grupo calcula su `total()` sumando el de sus hijos; si un hijo es otro grupo, la recursión baja por todo el árbol.", "A group computes its `total()` by summing its children's; if a child is another group, recursion descends the whole tree."), code: "def total(self):\n    return sum(h.total() for h in self.hijos)" },
        { heading: P("Parte-todo uniforme", "Uniform part-whole"), body: P("Ideal para jerarquías (carpetas/archivos, menús). Operas sobre la raíz igual que sobre una hoja: una sola llamada.", "Ideal for hierarchies (folders/files, menus). You operate on the root like on a leaf: a single call."), code: "raiz.agregar(Hoja(1)).agregar(sub)\nraiz.total()" },
      ],
      keyTakeaway: P("Composite forma un árbol parte-todo: hojas y grupos comparten interfaz y el cliente los trata igual. El grupo calcula recursivamente sobre sus hijos. Ideal para jerarquías (ficheros, menús, escenas).", "Composite forms a part-whole tree: leaves and groups share an interface and the client treats them alike. The group computes recursively over its children. Ideal for hierarchies (files, menus, scenes)."),
    },
  },
  c8_jefe_lurtz: {
    instructions: P("Ya existen `Nodo` (con `total()`) y `Hoja` (devuelve su valor). Escribe `Grupo` con `agregar(n)` que añada un hijo y DEVUELVA el propio grupo (para encadenar), y `total()` que sume el `total()` de todos sus hijos.", "`Nodo` (with `total()`) and `Hoja` (returns its value) already exist. Write `Grupo` with `agregar(n)` adding a child and RETURNING the group itself (for chaining), and `total()` summing all children's `total()`."),
  },
  tentacion_de_boromir: {
    instructions: P("Ya existe la interfaz `Nodo` con `total()`. Escribe la clase `Hoja` que reciba un número `v` en el constructor y cuyo `total()` devuelva `v`.", "The `Nodo` interface with `total()` already exists. Write class `Hoja` taking a number `v` in the constructor, whose `total()` returns `v`."),
  },
  solio_de_la_vision: {
    instructions: P("Ya existen `Nodo` y `Hoja`. Escribe `Grupo` con `agregar(n)` que añada un hijo y `total()` que sume el `total()` de todos sus hijos.", "`Nodo` and `Hoja` already exist. Write `Grupo` with `agregar(n)` adding a child and `total()` summing all children's `total()`."),
  },
  hueste_de_isengard: {
    instructions: P("Ya existen `Nodo`, `Hoja` y `Grupo` (con `agregar` y `total`). Escribe `ejercito(valores)` que cree un `Grupo`, le agregue una `Hoja` por cada valor y devuelva el `total()` del grupo.", "`Nodo`, `Hoja` and `Grupo` (with `agregar` and `total`) already exist. Write `ejercito(valores)` that creates a `Grupo`, adds one `Hoja` per value and returns the group's `total()`."),
  },
};
