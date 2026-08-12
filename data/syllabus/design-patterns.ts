import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de PATRONES DE DISEÑO (GoF) en TypeScript, sobre la narrativa
 * compartida de la Comunidad. Un patrón por capítulo. El código se transpila
 * (los tipos se borran) y se ejecuta; los tests verifican el comportamiento.
 */

const P = (es: string, en: string) => ({ es, en });

/* Andamiajes reutilizables por capítulo (support_code). */
const S_FACTORY =
  "interface Arma { danio(): number; }\n" +
  "class Espada implements Arma { danio(): number { return 10; } }\n" +
  "class Hacha implements Arma { danio(): number { return 15; } }";
const S_FACTORY_B =
  S_FACTORY +
  "\nfunction crearArma(tipo: string): Arma { if (tipo === 'espada') return new Espada(); return new Hacha(); }";
const S_STRAT = "type Estrategia = (base: number) => number;";
const S_OBS = "type Observador = (valor: number) => void;";
const S_DEC_I = "interface Componente { costo(): number; }";
const S_DEC_B = S_DEC_I + "\nclass Base implements Componente { costo(): number { return 10; } }";
const S_DEC_BE =
  S_DEC_B +
  "\nclass ConEscudo implements Componente { constructor(private c: Componente) {} costo(): number { return this.c.costo() + 5; } }";

/* ===================================================================== *
 * Capítulo 1 · Factory (Fábrica)
 * ===================================================================== */
const Q_F_WHAT = { question: P("¿Qué resuelve el patrón Factory?", "What does the Factory pattern solve?"),
  options: [P("Centraliza la CREACIÓN de objetos en un solo sitio", "Centralizes object CREATION in one place"), P("Ordena una lista", "Sorts a list"), P("Copia objetos", "Copies objects"), P("Borra objetos", "Deletes objects")],
  correct: 0, explanation: P("Una fábrica decide qué clase instanciar y devuelve el objeto ya listo. El código cliente pide 'un arma' sin saber la clase concreta.", "A factory decides which class to instantiate and returns the ready object. Client code asks for 'a weapon' without knowing the concrete class.") };
const Q_F_WHY = { question: P("¿Por qué usar una fábrica en vez de `new` directo por todas partes?", "Why use a factory instead of `new` directly everywhere?"),
  options: [P("Desacopla al cliente de las clases concretas", "Decouples the client from concrete classes"), P("Es más corto siempre", "It's always shorter"), P("Evita usar clases", "Avoids using classes"), P("Hace el código más lento", "Makes code slower")],
  correct: 0, explanation: P("Si la creación está centralizada, cambiar o añadir tipos toca UN sitio. Con `new` esparcido, un cambio obliga a tocar muchos.", "With creation centralized, changing or adding types touches ONE place. With `new` scattered, a change forces edits everywhere.") };
const Q_F_RETURN = { question: P("¿Qué tipo suele devolver una fábrica?", "What type does a factory usually return?"),
  options: [P("La INTERFAZ común (no la clase concreta)", "The common INTERFACE (not the concrete class)"), P("Siempre string", "Always string"), P("void", "void"), P("La clase concreta exacta", "The exact concrete class")],
  correct: 0, explanation: P("Devolver la interfaz (`Arma`) permite intercambiar implementaciones sin que el cliente se entere. Es la clave del desacople.", "Returning the interface (`Arma`) lets you swap implementations without the client noticing. That's the key to decoupling.") };
const Q_F_OCP = { question: P("Añadir un nuevo tipo de arma, idealmente, ¿qué debería requerir?", "Adding a new weapon type should ideally require what?"),
  options: [P("Una clase nueva y un caso en la fábrica; el cliente no cambia", "A new class and a case in the factory; the client doesn't change"), P("Reescribir el cliente", "Rewriting the client"), P("Borrar la interfaz", "Deleting the interface"), P("Nada, aparece solo", "Nothing, it appears on its own")],
  correct: 0, explanation: P("El objetivo es 'abierto a extensión, cerrado a modificación': el cliente que pide armas sigue igual aunque añadas tipos.", "The goal is 'open for extension, closed for modification': the client asking for weapons stays the same even as you add types.") };
const Q_F_METHOD = { question: P("¿Qué es una 'fábrica simple'?", "What is a 'simple factory'?"),
  options: [P("Una función/método que, según un parámetro, devuelve la instancia adecuada", "A function/method that, based on a parameter, returns the right instance"), P("Un bucle for", "A for loop"), P("Una subclase", "A subclass"), P("Un array", "An array")],
  correct: 0, explanation: P("La forma más básica: `crearArma(tipo)` con un `if`/`switch` que devuelve la clase que toque. El 'Factory Method' de GoF lo lleva a subclases.", "The most basic form: `crearArma(tipo)` with an `if`/`switch` returning the right class. GoF's 'Factory Method' takes it to subclasses.") };
const Q_F_UNKNOWN = { question: P("Si a la fábrica le piden un tipo desconocido, ¿qué es razonable?", "If the factory is asked for an unknown type, what's reasonable?"),
  options: [P("Lanzar un error (o devolver un valor por defecto)", "Throw an error (or return a default)"), P("Devolver undefined en silencio siempre", "Silently return undefined always"), P("Reiniciar el programa", "Restart the program"), P("Ignorarlo", "Ignore it")],
  correct: 0, explanation: P("Fallar pronto y claro (lanzar un error) evita bugs silenciosos. A veces se usa un 'objeto nulo' por defecto en su lugar.", "Failing early and clearly (throwing) avoids silent bugs. Sometimes a default 'null object' is used instead.") };
const Q_F_CLIENT = { question: P("El código cliente de una fábrica, ¿qué NO necesita saber?", "The client code of a factory does NOT need to know what?"),
  options: [P("Qué clase concreta se instancia por dentro", "Which concrete class is instantiated inside"), P("Cómo se llama la fábrica", "The factory's name"), P("Qué método llamar", "Which method to call"), P("Que existe una interfaz", "That an interface exists")],
  correct: 0, explanation: P("El cliente conoce la fábrica y la interfaz; ignora la clase concreta. Por eso puedes cambiar la implementación sin tocarlo.", "The client knows the factory and the interface; it ignores the concrete class. That's why you can change the implementation without touching it.") };
const Q_F_POLY = { question: P("Tras crear objetos con la fábrica, ¿cómo se usan?", "After creating objects with the factory, how are they used?"),
  options: [P("De forma POLIMÓRFICA: por su interfaz común", "POLYMORPHICALLY: through their common interface"), P("Con casts por todos lados", "With casts everywhere"), P("Comprobando su tipo con if", "Checking their type with if"), P("No se pueden usar", "You can't use them")],
  correct: 0, explanation: P("La gracia es que todos cumplen la misma interfaz (`danio()`), así que el cliente los trata igual sin saber cuál es cuál.", "The point is they all satisfy the same interface (`danio()`), so the client treats them alike without knowing which is which.") };
const Q_F_CENTRAL = { question: P("¿Cuál es el principal beneficio de centralizar la creación?", "What's the main benefit of centralizing creation?"),
  options: [P("Un solo punto de cambio para cómo se construyen los objetos", "A single point of change for how objects are built"), P("Menos clases", "Fewer classes"), P("Más velocidad", "More speed"), P("Menos memoria", "Less memory")],
  correct: 0, explanation: P("Si mañana la construcción cambia (validaciones, caché, config), lo ajustas en la fábrica y todo el sistema se beneficia.", "If construction changes tomorrow (validation, caching, config), you adjust it in the factory and the whole system benefits.") };

export const SYL_DP_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_F_WHAT, Q_F_WHY, Q_F_RETURN] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_F_METHOD, Q_F_CLIENT, Q_F_POLY] },
  c1_perro_negro: { kind: "battle", questions: [Q_F_OCP, Q_F_UNKNOWN, Q_F_CENTRAL] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P("Usa la fábrica para forjar cada arma de una lista y suma su daño total.", "Use the factory to forge each weapon from a list and sum their total damage."),
    challenge: {
      support_code: S_FACTORY_B,
      topic: P("Factory: uso polimórfico", "Factory: polymorphic use"),
      instructions: P("Ya existe `crearArma(tipo)`. Escribe `poderTotal(tipos: string[])` que use la fábrica para crear cada arma y devuelva la SUMA de sus `danio()`.", "`crearArma(tipo)` already exists. Write `poderTotal(tipos: string[])` that uses the factory to create each weapon and returns the SUM of their `danio()`."),
      starter_code: "function poderTotal(tipos: string[]): number {\n}\n",
      blocks: [
        "function poderTotal(tipos: string[]): number {",
        "  return tipos.reduce((s, t) => s + crearArma(t).danio(), 0);",
        "}",
        "  return tipos.reduce((s, t) => s + t.danio(), 0);",
      ],
      hints: [P("Recorre `tipos` y crea cada arma con `crearArma(t)`.", "Iterate `tipos` and create each weapon with `crearArma(t)`."), P("Suma sus `.danio()` con `reduce`.", "Sum their `.danio()` with `reduce`.")],
      test_cases: [
        { input: "poderTotal(['espada','hacha','espada'])", expected: 35, description: P("10 + 15 + 10", "10 + 15 + 10"), raw: true },
        { input: "poderTotal([])", expected: 0, description: P("Sin armas", "No weapons"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino de la Fábrica", "The Scroll of the Factory"),
    lore_intro: P("Un pergamino enseña a crear objetos sin acoplarse a sus clases: el patrón Factory.", "A scroll teaches how to create objects without coupling to their classes: the Factory pattern."),
    scroll: {
      topic: P("Patrón Factory", "Factory pattern"),
      sections: [
        { heading: P("La idea", "The idea"), body: P("Una función/método decide qué clase instanciar y devuelve la INTERFAZ común. El cliente pide 'un arma', no una clase concreta.", "A function/method decides which class to instantiate and returns the common INTERFACE. The client asks for 'a weapon', not a concrete class."), code: "function crearArma(tipo: string): Arma {\n  if (tipo === 'espada') return new Espada();\n  return new Hacha();\n}" },
        { heading: P("Por qué", "Why"), body: P("Centraliza la creación: añadir o cambiar tipos toca un solo sitio. El cliente los usa de forma polimórfica, por la interfaz.", "It centralizes creation: adding or changing types touches one place. The client uses them polymorphically, via the interface."), code: "const a = crearArma('espada');\na.danio(); // 10, sin saber la clase" },
        { heading: P("Extensible", "Extensible"), body: P("Abierto a extensión (nuevas armas), cerrado a modificación (el cliente no cambia). Si el tipo es desconocido, falla claro.", "Open for extension (new weapons), closed for modification (the client stays). If the type is unknown, fail clearly."), code: "if (tipo === 'daga') return new Daga();\nthrow new Error('arma desconocida');" },
      ],
      keyTakeaway: P("La Factory centraliza la creación y devuelve la interfaz común: desacopla al cliente de las clases concretas y permite añadir tipos sin tocarlo.", "The Factory centralizes creation and returns the common interface: it decouples the client from concrete classes and lets you add types without touching it."),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Forjar el Arma", "Forging the Weapon"),
    lore_intro: P("Escribe la fábrica que forja la espada o el hacha según se pida.", "Write the factory that forges the sword or the axe as requested."),
    challenge: {
      support_code: S_FACTORY,
      topic: P("Fábrica simple", "Simple factory"),
      instructions: P("Ya existen `Espada` (danio 10) y `Hacha` (danio 15), que implementan `Arma`. Escribe `crearArma(tipo: string): Arma` que devuelva un `Espada` si `tipo` es `'espada'` o un `Hacha` en otro caso.", "`Espada` (danio 10) and `Hacha` (danio 15) already exist, implementing `Arma`. Write `crearArma(tipo: string): Arma` returning an `Espada` if `tipo` is `'espada'` or a `Hacha` otherwise."),
      starter_code: "function crearArma(tipo: string): Arma {\n}\n",
      blocks: [
        "function crearArma(tipo: string): Arma {",
        "  if (tipo === 'espada') return new Espada();",
        "  return new Hacha();",
        "}",
        "  return new Arma();",
      ],
      hints: [P("Un `if` para la espada; el resto, hacha.", "An `if` for the sword; the rest, axe."), P("Devuelve instancias: `new Espada()`, `new Hacha()`.", "Return instances: `new Espada()`, `new Hacha()`.")],
      test_cases: [
        { input: "crearArma('espada').danio()", expected: 10, description: P("La espada", "The sword"), raw: true },
        { input: "crearArma('hacha').danio()", expected: 15, description: P("El hacha", "The axe"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P("Una buena fábrica falla claro ante lo desconocido. Añade el control de errores.", "A good factory fails clearly on the unknown. Add error handling."),
    challenge: {
      support_code: S_FACTORY,
      topic: P("Fábrica con error", "Factory with an error"),
      instructions: P("Escribe `crearArma(tipo: string): Arma` que devuelva `Espada` para `'espada'`, `Hacha` para `'hacha'`, y LANCE un `Error` para cualquier otro tipo.", "Write `crearArma(tipo: string): Arma` returning `Espada` for `'espada'`, `Hacha` for `'hacha'`, and THROWING an `Error` for any other type."),
      starter_code: "function crearArma(tipo: string): Arma {\n}\n",
      blocks: [
        "function crearArma(tipo: string): Arma {",
        "  if (tipo === 'espada') return new Espada();",
        "  if (tipo === 'hacha') return new Hacha();",
        "  throw new Error('arma desconocida');",
        "}",
        "  return new Espada();",
      ],
      hints: [P("Un `if` por cada tipo conocido.", "One `if` per known type."), P("Al final, `throw new Error(...)`.", "At the end, `throw new Error(...)`.")],
      test_cases: [
        { input: "crearArma('hacha').danio()", expected: 15, description: P("Tipo conocido", "Known type"), raw: true },
        { input: "(() => { try { crearArma('daga'); return false; } catch (e) { return true; } })()", expected: true, description: P("Desconocido lanza error", "Unknown throws"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 2 · Strategy (Estrategia)
 * ===================================================================== */
const Q_S_WHAT = { question: P("¿Qué encapsula el patrón Strategy?", "What does the Strategy pattern encapsulate?"),
  options: [P("Un ALGORITMO intercambiable, como una pieza que se enchufa", "An interchangeable ALGORITHM, like a pluggable piece"), P("Una tabla de datos", "A data table"), P("Una única instancia", "A single instance"), P("Un árbol", "A tree")],
  correct: 0, explanation: P("Strategy mete cada variante de un comportamiento en su propia pieza (función u objeto) que se puede intercambiar sin tocar al que la usa.", "Strategy puts each variant of a behavior in its own piece (function or object) that can be swapped without touching its user.") };
const Q_S_SWAP = { question: P("¿Qué permite Strategy en tiempo de EJECUCIÓN?", "What does Strategy allow at RUNTIME?"),
  options: [P("Cambiar el algoritmo que usa un objeto sobre la marcha", "Swapping the algorithm an object uses on the fly"), P("Crear objetos", "Creating objects"), P("Borrar clases", "Deleting classes"), P("Ordenar listas", "Sorting lists")],
  correct: 0, explanation: P("El objeto 'contexto' guarda una estrategia y puede reemplazarla en caliente: pasar de un ataque agresivo a uno cauto sin recrear nada.", "The 'context' object holds a strategy and can replace it live: switch from an aggressive attack to a cautious one without recreating anything.") };
const Q_S_VS_IF = { question: P("Strategy suele sustituir a…", "Strategy usually replaces…"),
  options: [P("Grandes cadenas de `if`/`switch` sobre 'qué comportamiento aplicar'", "Big `if`/`switch` chains over 'which behavior to apply'"), P("Los bucles", "Loops"), P("Las clases", "Classes"), P("Las interfaces", "Interfaces")],
  correct: 0, explanation: P("En vez de un `switch` gigante que elige el comportamiento, cada comportamiento vive por separado y se enchufa. Más limpio y extensible.", "Instead of a giant `switch` picking the behavior, each behavior lives separately and plugs in. Cleaner and more extensible.") };
const Q_S_FN = { question: P("En TypeScript/JS, una estrategia puede ser simplemente…", "In TypeScript/JS, a strategy can simply be…"),
  options: [P("Una FUNCIÓN (las funciones son valores de primera clase)", "A FUNCTION (functions are first-class values)"), P("Un número", "A number"), P("Un comentario", "A comment"), P("Un import", "An import")],
  correct: 0, explanation: P("No siempre hace falta una jerarquía de clases: una función `(base) => resultado` ya es una estrategia enchufable.", "You don't always need a class hierarchy: a function `(base) => result` is already a pluggable strategy.") };
const Q_S_CONTEXT = { question: P("¿Qué papel tiene el 'contexto' en Strategy?", "What role does the 'context' play in Strategy?"),
  options: [P("Guarda una estrategia y DELEGA en ella el trabajo", "Holds a strategy and DELEGATES the work to it"), P("Implementa todos los algoritmos", "Implements all algorithms"), P("Ordena datos", "Sorts data"), P("Crea la estrategia", "Creates the strategy")],
  correct: 0, explanation: P("El contexto no sabe CÓMO se hace el trabajo; delega en la estrategia actual. Cambiar de estrategia cambia el comportamiento.", "The context doesn't know HOW the work is done; it delegates to the current strategy. Swapping the strategy changes the behavior.") };
const Q_S_OCP = { question: P("Añadir una estrategia nueva, ¿qué exige del contexto?", "Adding a new strategy requires what from the context?"),
  options: [P("Nada: el contexto no cambia (abierto/cerrado)", "Nothing: the context stays the same (open/closed)"), P("Reescribirlo entero", "Rewriting it entirely"), P("Borrar las otras", "Deleting the others"), P("Un bucle nuevo", "A new loop")],
  correct: 0, explanation: P("Escribes una estrategia más y la enchufas; el contexto que la usa no se toca. Ésa es la ventaja frente al `switch`.", "You write one more strategy and plug it in; the context using it isn't touched. That's the advantage over the `switch`.") };
const Q_S_COMPOSE = { question: P("Strategy es un ejemplo de 'favorecer la COMPOSICIÓN sobre…'", "Strategy is an example of 'favor COMPOSITION over…'"),
  options: [P("la herencia", "inheritance"), P("las funciones", "functions"), P("los tipos", "types"), P("los tests", "tests")],
  correct: 0, explanation: P("En vez de crear subclases para cada variante (herencia), el objeto COMPONE con una estrategia que puede cambiar. Más flexible.", "Instead of subclassing for each variant (inheritance), the object COMPOSES a strategy it can change. More flexible.") };
const Q_S_INTER = { question: P("Todas las estrategias de un mismo contexto comparten…", "All strategies of the same context share…"),
  options: [P("La misma FIRMA/interfaz, para ser intercambiables", "The same SIGNATURE/interface, to be interchangeable"), P("El mismo nombre", "The same name"), P("El mismo valor", "The same value"), P("Nada", "Nothing")],
  correct: 0, explanation: P("Para poder enchufarse en el mismo hueco, todas aceptan las mismas entradas y devuelven lo mismo. Sólo cambia el CÓMO.", "To plug into the same slot, they all accept the same inputs and return the same shape. Only the HOW changes.") };
const Q_S_TEST = { question: P("¿Por qué Strategy facilita las pruebas?", "Why does Strategy ease testing?"),
  options: [P("Cada algoritmo es una pieza aislada que se prueba sola", "Each algorithm is an isolated piece tested on its own"), P("Elimina los tests", "It removes tests"), P("Hace el código más largo", "It makes code longer"), P("No influye", "It doesn't matter")],
  correct: 0, explanation: P("Al vivir separada, cada estrategia se prueba de forma independiente, y el contexto se prueba con una estrategia falsa sencilla.", "Living separately, each strategy is tested independently, and the context is tested with a simple fake strategy.") };

export const SYL_DP_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_S_WHAT, Q_S_SWAP, Q_S_VS_IF] },
  c2_niebla: { kind: "battle", questions: [Q_S_FN, Q_S_CONTEXT, Q_S_COMPOSE] },
  c2_sauce: { kind: "battle", questions: [Q_S_OCP, Q_S_INTER, Q_S_TEST] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P("El guerrero cambia de táctica en plena batalla. Un contexto con estrategia intercambiable.", "The warrior changes tactics mid-battle. A context with a swappable strategy."),
    challenge: {
      support_code: S_STRAT,
      topic: P("Contexto con estrategia", "Context with a strategy"),
      instructions: P("Escribe la clase `Guerrero` que reciba una `Estrategia` en el constructor, con:\n• `cambiar(e: Estrategia)` que la reemplace,\n• `golpear(bases: number[])` que aplique la estrategia a cada base y devuelva la SUMA.", "Write class `Guerrero` taking an `Estrategia` in the constructor, with:\n• `cambiar(e: Estrategia)` that replaces it,\n• `golpear(bases: number[])` that applies the strategy to each base and returns the SUM."),
      starter_code: "class Guerrero {\n}\n",
      blocks: [
        "class Guerrero {",
        "  constructor(private e: Estrategia) {}",
        "  cambiar(e: Estrategia): void { this.e = e; }",
        "  golpear(bases: number[]): number {",
        "    return bases.reduce((s, b) => s + this.e(b), 0);",
        "  }",
        "}",
        "  golpear(bases: number[]): number { return bases.length; }",
      ],
      hints: [P("Guarda la estrategia: `constructor(private e: Estrategia) {}`.", "Store the strategy: `constructor(private e: Estrategia) {}`."), P("`golpear` delega en `this.e(b)` por cada base.", "`golpear` delegates to `this.e(b)` per base.")],
      test_cases: [
        { input: "new Guerrero((b) => b * 2).golpear([1,2,3])", expected: 12, description: P("Estrategia x2", "Strategy x2"), raw: true },
        { input: "(() => { const g = new Guerrero((b) => b); g.cambiar((b) => b * 2); return g.golpear([5]); })()", expected: 10, description: P("Cambio en caliente", "Live swap"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino de la Táctica", "The Scroll of Tactics"),
    lore_intro: P("Un pergamino enseña a enchufar algoritmos intercambiables: Strategy.", "A scroll teaches how to plug in interchangeable algorithms: Strategy."),
    scroll: {
      topic: P("Patrón Strategy", "Strategy pattern"),
      sections: [
        { heading: P("Algoritmo enchufable", "Pluggable algorithm"), body: P("Cada variante de un comportamiento es una pieza con la MISMA firma. En JS/TS, una función basta como estrategia.", "Each behavior variant is a piece with the SAME signature. In JS/TS, a function suffices as a strategy."), code: "type Estrategia = (base: number) => number;\nconst agresiva: Estrategia = (b) => b * 2;" },
        { heading: P("El contexto delega", "The context delegates"), body: P("Un objeto guarda una estrategia y le delega el trabajo. Puede cambiarla en caliente sin recrearse.", "An object holds a strategy and delegates the work. It can swap it live without recreating."), code: "class Guerrero {\n  constructor(private e: Estrategia) {}\n  golpear(b: number) { return this.e(b); }\n}" },
        { heading: P("Composición sobre herencia", "Composition over inheritance"), body: P("En vez de una subclase por variante, el objeto COMPONE una estrategia. Añadir una nueva no toca el contexto.", "Instead of a subclass per variant, the object COMPOSES a strategy. Adding a new one doesn't touch the context."), code: "g.cambiar(cauta); // cambia el comportamiento" },
      ],
      keyTakeaway: P("Strategy encapsula algoritmos intercambiables con la misma firma; el contexto los guarda y delega, y puede cambiarlos en caliente. Favorece composición sobre herencia y sustituye grandes switch.", "Strategy encapsulates interchangeable algorithms with the same signature; the context holds and delegates, and can swap them live. It favors composition over inheritance and replaces big switches."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("La Táctica del Sauce", "The Willow's Tactic"),
    lore_intro: P("Aplica la estrategia que te den al valor base. La pieza más simple.", "Apply whatever strategy you're given to the base value. The simplest piece."),
    challenge: {
      support_code: S_STRAT,
      topic: P("Aplicar una estrategia", "Applying a strategy"),
      instructions: P("Escribe `atacar(base: number, estrategia: Estrategia): number` que devuelva el resultado de aplicar la `estrategia` a `base`.", "Write `atacar(base: number, estrategia: Estrategia): number` returning the result of applying `estrategia` to `base`."),
      starter_code: "function atacar(base: number, estrategia: Estrategia): number {\n}\n",
      blocks: [
        "function atacar(base: number, estrategia: Estrategia): number {",
        "  return estrategia(base);",
        "}",
        "  return base;",
      ],
      hints: [P("Una estrategia es una función: llámala con `estrategia(base)`.", "A strategy is a function: call it with `estrategia(base)`.")],
      test_cases: [
        { input: "atacar(10, (b) => b * 2)", expected: 20, description: P("Doblar", "Double"), raw: true },
        { input: "atacar(5, (b) => b + 3)", expected: 8, description: P("Sumar 3", "Add 3"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("Dos Espíritus, Dos Tácticas", "Two Spirits, Two Tactics"),
    lore_intro: P("Define dos estrategias con nombre y una función que use cualquiera.", "Define two named strategies and a function that uses either."),
    challenge: {
      support_code: S_STRAT,
      topic: P("Estrategias con nombre", "Named strategies"),
      instructions: P("Define dos estrategias: `agresiva` (multiplica por 2) y `cauta` (`Math.max(0, base - 5)`). Escribe `usar(base: number, e: Estrategia): number` que aplique la estrategia dada.", "Define two strategies: `agresiva` (times 2) and `cauta` (`Math.max(0, base - 5)`). Write `usar(base: number, e: Estrategia): number` applying the given strategy."),
      starter_code: "const agresiva: Estrategia = (b) => b * 2;\nconst cauta: Estrategia = (b) => 0;\n\nfunction usar(base: number, e: Estrategia): number {\n}\n",
      blocks: [
        "const agresiva: Estrategia = (b) => b * 2;",
        "const cauta: Estrategia = (b) => Math.max(0, b - 5);",
        "function usar(base: number, e: Estrategia): number {",
        "  return e(base);",
        "}",
        "const cauta: Estrategia = (b) => b - 5;",
      ],
      hints: [P("`cauta` no baja de 0: usa `Math.max(0, b - 5)`.", "`cauta` never goes below 0: use `Math.max(0, b - 5)`."), P("`usar` sólo delega: `e(base)`.", "`usar` just delegates: `e(base)`.")],
      test_cases: [
        { input: "usar(10, agresiva)", expected: 20, description: P("Agresiva", "Aggressive"), raw: true },
        { input: "usar(3, cauta)", expected: 0, description: P("Cauta no baja de 0", "Cautious floors at 0"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto que Cambia", "The Changing Song"),
    lore_intro: P("Un guerrero que guarda su táctica y puede cambiarla cuando canta Bombadil.", "A warrior that holds its tactic and can change it when Bombadil sings."),
    challenge: {
      support_code: S_STRAT,
      topic: P("Guardar y cambiar estrategia", "Store and swap strategy"),
      instructions: P("Escribe la clase `Guerrero` que reciba una `Estrategia` en el constructor, con `setEstrategia(e)` para reemplazarla y `atacar(base)` que la aplique.", "Write class `Guerrero` taking an `Estrategia` in the constructor, with `setEstrategia(e)` to replace it and `atacar(base)` applying it."),
      starter_code: "class Guerrero {\n  private estrategia: Estrategia;\n  constructor(e: Estrategia) {\n    this.estrategia = e;\n  }\n}\n",
      blocks: [
        "class Guerrero {",
        "  private estrategia: Estrategia;",
        "  constructor(e: Estrategia) { this.estrategia = e; }",
        "  setEstrategia(e: Estrategia): void { this.estrategia = e; }",
        "  atacar(base: number): number { return this.estrategia(base); }",
        "}",
        "  atacar(base: number): number { return base; }",
      ],
      hints: [P("Guarda `this.estrategia`; `setEstrategia` la reemplaza.", "Store `this.estrategia`; `setEstrategia` replaces it."), P("`atacar` delega: `this.estrategia(base)`.", "`atacar` delegates: `this.estrategia(base)`.")],
      test_cases: [
        { input: "new Guerrero((b) => b * 2).atacar(10)", expected: 20, description: P("Estrategia inicial", "Initial strategy"), raw: true },
        { input: "(() => { const g = new Guerrero((b) => b); g.setEstrategia((b) => b * 3); return g.atacar(10); })()", expected: 30, description: P("Tras cambiar", "After swap"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 3 · Observer (Observador)
 * ===================================================================== */
const Q_O_WHAT = { question: P("¿Qué modela el patrón Observer?", "What does the Observer pattern model?"),
  options: [P("Una relación 'uno a muchos': un sujeto avisa a varios observadores", "A 'one-to-many' relationship: a subject notifies several observers"), P("Una única instancia", "A single instance"), P("Una fábrica", "A factory"), P("Un árbol", "A tree")],
  correct: 0, explanation: P("Un 'sujeto' mantiene una lista de observadores y les AVISA cuando pasa algo. Es la base de los sistemas de eventos y publish/subscribe.", "A 'subject' keeps a list of observers and NOTIFIES them when something happens. It's the basis of event and publish/subscribe systems.") };
const Q_O_DECOUPLE = { question: P("¿Qué desacopla Observer?", "What does Observer decouple?"),
  options: [P("Al que emite el evento de los que reaccionan", "The event emitter from those who react"), P("Las clases de las interfaces", "Classes from interfaces"), P("El cliente de la fábrica", "The client from the factory"), P("Nada", "Nothing")],
  correct: 0, explanation: P("El sujeto no sabe QUÉ hacen los observadores; sólo los avisa. Puedes añadir o quitar reacciones sin tocar al emisor.", "The subject doesn't know WHAT the observers do; it just notifies them. You can add or remove reactions without touching the emitter.") };
const Q_O_SUBSCRIBE = { question: P("¿Qué hace 'suscribirse' a un sujeto?", "What does 'subscribing' to a subject do?"),
  options: [P("Registrar un observador en su lista para recibir avisos", "Registers an observer in its list to receive notifications"), P("Borrar el sujeto", "Deletes the subject"), P("Crear un sujeto", "Creates a subject"), P("Ordenar la lista", "Sorts the list")],
  correct: 0, explanation: P("Suscribir añade el observador a la lista interna. Muchos patrones ofrecen también 'desuscribir' para dejar de recibir avisos.", "Subscribing adds the observer to the internal list. Many implementations also offer 'unsubscribe' to stop receiving notifications.") };
const Q_O_NOTIFY = { question: P("¿Qué hace `notificar(valor)` en el sujeto?", "What does `notificar(valor)` do on the subject?"),
  options: [P("Llama a CADA observador con ese valor", "Calls EACH observer with that value"), P("Sólo al primero", "Only the first"), P("Crea observadores", "Creates observers"), P("Borra la lista", "Clears the list")],
  correct: 0, explanation: P("Notificar recorre la lista y ejecuta cada observador. Así, un solo cambio se propaga a todos los interesados a la vez.", "Notify walks the list and runs each observer. So a single change propagates to all interested parties at once.") };
const Q_O_MANY = { question: P("¿Cuántos observadores puede tener un sujeto?", "How many observers can a subject have?"),
  options: [P("Los que sea: cero, uno o muchos", "As many as needed: zero, one or many"), P("Sólo uno", "Only one"), P("Exactamente dos", "Exactly two"), P("Ninguno nunca", "Never any")],
  correct: 0, explanation: P("La lista es dinámica: se suscriben y desuscriben en tiempo de ejecución. Por eso es 'uno a muchos'.", "The list is dynamic: they subscribe and unsubscribe at runtime. That's why it's 'one-to-many'.") };
const Q_O_INDEP = { question: P("Los observadores de un sujeto, ¿se conocen entre sí?", "Do a subject's observers know each other?"),
  options: [P("No: son independientes; sólo reciben el aviso", "No: they're independent; they just receive the notification"), P("Sí, todos", "Yes, all"), P("Sólo el primero conoce al resto", "Only the first knows the rest"), P("Comparten estado", "They share state")],
  correct: 0, explanation: P("Cada observador reacciona por su cuenta. Añadir uno no afecta a los demás: son piezas sueltas enganchadas al mismo sujeto.", "Each observer reacts on its own. Adding one doesn't affect the others: they're separate pieces hooked to the same subject.") };
const Q_O_PUSH = { question: P("Cuando el sujeto ENVÍA el dato al notificar, se llama modelo…", "When the subject SENDS the data on notify, it's called the… model"),
  options: [P("'push': el sujeto empuja el valor a los observadores", "'push': the subject pushes the value to the observers"), P("'pull'", "'pull'"), P("'factory'", "'factory'"), P("'singleton'", "'singleton'")],
  correct: 0, explanation: P("En el modelo 'push', notificar pasa el dato ya listo. En 'pull', el observador consulta al sujeto por lo que necesite.", "In the 'push' model, notify passes the ready data. In 'pull', the observer queries the subject for what it needs.") };
const Q_O_EVENTS = { question: P("¿Dónde reconoces el patrón Observer en el día a día?", "Where do you recognize Observer in everyday code?"),
  options: [P("En los sistemas de EVENTOS: addEventListener, suscripciones, reactividad", "In EVENT systems: addEventListener, subscriptions, reactivity"), P("En los bucles for", "In for loops"), P("En los tipos", "In types"), P("En los imports", "In imports")],
  correct: 0, explanation: P("`elemento.addEventListener('click', fn)` es Observer puro: te suscribes con una función que se ejecuta cuando ocurre el evento.", "`element.addEventListener('click', fn)` is pure Observer: you subscribe with a function run when the event fires.") };
const Q_O_ADD = { question: P("Añadir una reacción nueva ante un evento, ¿qué requiere?", "Adding a new reaction to an event requires what?"),
  options: [P("Suscribir un observador más; el sujeto no cambia", "Subscribing one more observer; the subject stays"), P("Reescribir el sujeto", "Rewriting the subject"), P("Borrar los otros", "Deleting the others"), P("Un switch", "A switch")],
  correct: 0, explanation: P("El sujeto está cerrado a modificación: sólo te suscribes con una función nueva. Extensible sin tocar lo que ya funciona.", "The subject is closed for modification: you just subscribe a new function. Extensible without touching what already works.") };

export const SYL_DP_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_O_WHAT, Q_O_DECOUPLE, Q_O_MANY] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_O_SUBSCRIBE, Q_O_NOTIFY, Q_O_PUSH] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_O_INDEP, Q_O_EVENTS, Q_O_ADD] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("Un sujeto avisa a varios espías a la vez. Suscribe y notifica: el Observer completo.", "A subject notifies several spies at once. Subscribe and notify: the full Observer."),
    challenge: {
      support_code: S_OBS,
      topic: P("Sujeto: suscribir + notificar", "Subject: subscribe + notify"),
      instructions: P("Escribe la clase `Sujeto` con una lista privada de `Observador`, un método `suscribir(o)` que lo añada y `notificar(valor)` que llame a CADA observador con ese valor.", "Write class `Sujeto` with a private list of `Observador`, a method `suscribir(o)` that adds it and `notificar(valor)` that calls EACH observer with that value."),
      starter_code: "class Sujeto {\n  private obs: Observador[] = [];\n}\n",
      blocks: [
        "class Sujeto {",
        "  private obs: Observador[] = [];",
        "  suscribir(o: Observador): void { this.obs.push(o); }",
        "  notificar(valor: number): void {",
        "    this.obs.forEach((o) => o(valor));",
        "  }",
        "}",
        "  notificar(valor: number): void { this.obs[0](valor); }",
      ],
      hints: [P("`suscribir` hace `this.obs.push(o)`.", "`suscribir` does `this.obs.push(o)`."), P("`notificar` recorre TODOS con `forEach`.", "`notificar` walks ALL with `forEach`.")],
      test_cases: [
        { input: "(() => { let a = 0, b = 0; const s = new Sujeto(); s.suscribir((v) => { a += v; }); s.suscribir((v) => { b += v * 2; }); s.notificar(10); return [a, b]; })()", expected: [10, 20], description: P("Dos observadores avisados", "Two observers notified"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino del Aviso", "The Scroll of Notification"),
    lore_intro: P("Un pergamino enseña a avisar a muchos de un solo cambio: Observer.", "A scroll teaches how to notify many of a single change: Observer."),
    scroll: {
      topic: P("Patrón Observer", "Observer pattern"),
      sections: [
        { heading: P("Sujeto y observadores", "Subject and observers"), body: P("El sujeto guarda una lista de observadores (funciones) y los avisa. Relación uno a muchos.", "The subject holds a list of observers (functions) and notifies them. One-to-many relationship."), code: "type Observador = (v: number) => void;\ns.suscribir((v) => console.log(v));" },
        { heading: P("Notificar", "Notify"), body: P("Al notificar, el sujeto recorre la lista y ejecuta cada observador con el dato (modelo 'push').", "On notify, the subject walks the list and runs each observer with the data ('push' model)."), code: "notificar(v: number) {\n  this.obs.forEach((o) => o(v));\n}" },
        { heading: P("Desacople", "Decoupling"), body: P("El sujeto no sabe qué hacen los observadores; añadir o quitar reacciones no lo toca. Es lo que hay tras addEventListener.", "The subject doesn't know what observers do; adding or removing reactions doesn't touch it. It's what's behind addEventListener."), code: "boton.addEventListener('click', reaccionar);" },
      ],
      keyTakeaway: P("Observer: un sujeto mantiene observadores y les notifica un cambio (uno a muchos, modelo push). Desacopla emisor y reacciones; suscribir/​desuscribir es dinámico. Es la base de los eventos.", "Observer: a subject keeps observers and notifies them of a change (one-to-many, push model). It decouples emitter and reactions; subscribe/​unsubscribe is dynamic. It's the basis of events."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("La Lista del Poney", "The Pony's List"),
    lore_intro: P("Apunta a cada nuevo espía en la lista del sujeto. Empieza por suscribir.", "Sign up each new spy on the subject's list. Start with subscribing."),
    challenge: {
      support_code: S_OBS,
      topic: P("Suscribir", "Subscribe"),
      instructions: P("Escribe la clase `Sujeto` con una lista privada de `Observador` y un método `suscribir(o)` que lo añada y devuelva CUÁNTOS observadores hay ya.", "Write class `Sujeto` with a private list of `Observador` and a method `suscribir(o)` that adds it and returns HOW MANY observers there are now."),
      starter_code: "class Sujeto {\n  private obs: Observador[] = [];\n}\n",
      blocks: [
        "class Sujeto {",
        "  private obs: Observador[] = [];",
        "  suscribir(o: Observador): number {",
        "    this.obs.push(o);",
        "    return this.obs.length;",
        "  }",
        "}",
        "    return this.obs;",
      ],
      hints: [P("`push` añade; `this.obs.length` da la cuenta.", "`push` adds; `this.obs.length` gives the count.")],
      test_cases: [
        { input: "(() => { const s = new Sujeto(); s.suscribir(() => {}); return s.suscribir(() => {}); })()", expected: 2, description: P("Dos suscritos", "Two subscribed"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("El Aviso de las Hojas", "The Blades' Alert"),
    lore_intro: P("Cuando el peligro llega, avisa a todos los suscritos a la vez.", "When danger comes, notify all subscribers at once."),
    challenge: {
      support_code: S_OBS,
      topic: P("Notificar a todos", "Notify all"),
      instructions: P("Escribe la clase `Sujeto` con `suscribir(o)` (añade a la lista) y `notificar(valor)` que llame a TODOS los observadores con ese valor.", "Write class `Sujeto` with `suscribir(o)` (adds to the list) and `notificar(valor)` that calls ALL observers with that value."),
      starter_code: "class Sujeto {\n  private obs: Observador[] = [];\n}\n",
      blocks: [
        "class Sujeto {",
        "  private obs: Observador[] = [];",
        "  suscribir(o: Observador): void { this.obs.push(o); }",
        "  notificar(valor: number): void {",
        "    this.obs.forEach((o) => o(valor));",
        "  }",
        "}",
        "    this.obs.push(valor);",
      ],
      hints: [P("`notificar` usa `forEach` sobre la lista.", "`notificar` uses `forEach` over the list."), P("Llama a cada uno: `o(valor)`.", "Call each: `o(valor)`.")],
      test_cases: [
        { input: "(() => { let total = 0; const s = new Sujeto(); s.suscribir((v) => { total += v; }); s.suscribir((v) => { total += v; }); s.notificar(5); return total; })()", expected: 10, description: P("Dos reciben 5", "Two receive 5"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("El Vigía Acumulador", "The Accumulating Watcher"),
    lore_intro: P("Un observador que recuerda todo lo que recibe. Una clausura como observador.", "An observer that remembers everything it receives. A closure as an observer."),
    challenge: {
      support_code: S_OBS,
      topic: P("Observador con estado", "Observer with state"),
      instructions: P("Escribe `crearAcumulador()` que devuelva un objeto con `recibir(v)` (suma `v` a un total interno) y `total()` (devuelve el total). Es un observador que recuerda.", "Write `crearAcumulador()` returning an object with `recibir(v)` (adds `v` to an internal total) and `total()` (returns the total). It's an observer that remembers."),
      starter_code: "function crearAcumulador() {\n}\n",
      blocks: [
        "function crearAcumulador() {",
        "  let suma = 0;",
        "  return {",
        "    recibir: (v: number) => { suma += v; },",
        "    total: () => suma,",
        "  };",
        "}",
        "  return { recibir: (v: number) => v, total: () => 0 };",
      ],
      hints: [P("Guarda `suma` en una clausura.", "Keep `suma` in a closure."), P("`recibir` acumula; `total` la devuelve.", "`recibir` accumulates; `total` returns it.")],
      test_cases: [
        { input: "(() => { const a = crearAcumulador(); a.recibir(3); a.recibir(4); return a.total(); })()", expected: 7, description: P("Recuerda lo recibido", "Remembers what it got"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 4 · Singleton
 * ===================================================================== */
const Q_SG_WHAT = { question: P("¿Qué garantiza el patrón Singleton?", "What does the Singleton pattern guarantee?"),
  options: [P("Que exista UNA sola instancia de una clase, con acceso global", "That only ONE instance of a class exists, with global access"), P("Muchas instancias", "Many instances"), P("Ninguna instancia", "No instances"), P("Una fábrica", "A factory")],
  correct: 0, explanation: P("Singleton asegura una única instancia compartida y un punto de acceso a ella. Útil para configuración, logs o una conexión.", "Singleton ensures a single shared instance and one access point to it. Useful for config, logging or one connection.") };
const Q_SG_ACCESS = { question: P("¿Cómo se obtiene la instancia de un Singleton?", "How do you obtain a Singleton's instance?"),
  options: [P("Con un método estático, p. ej. `Clase.instancia()`", "With a static method, e.g. `Class.instancia()`"), P("Con `new Clase()` directo", "With direct `new Class()`"), P("No se puede obtener", "You can't obtain it"), P("Con un bucle", "With a loop")],
  correct: 0, explanation: P("El acceso pasa por un método estático que devuelve SIEMPRE la misma instancia, creándola la primera vez.", "Access goes through a static method that ALWAYS returns the same instance, creating it the first time.") };
const Q_SG_PRIVATE = { question: P("¿Por qué el constructor de un Singleton suele ser privado?", "Why is a Singleton's constructor usually private?"),
  options: [P("Para impedir que se creen más instancias con `new`", "To prevent creating more instances with `new`"), P("Por decoración", "For decoration"), P("Para que sea más rápido", "To make it faster"), P("Es obligatorio en TS", "It's required in TS")],
  correct: 0, explanation: P("Si el constructor es privado, nadie de fuera puede hacer `new`. La única vía es el método estático, que controla la instancia única.", "If the constructor is private, no outsider can `new` it. The only way is the static method, which controls the single instance.") };
const Q_SG_LAZY = { question: P("¿Qué es la inicialización 'perezosa' (lazy) de un Singleton?", "What is a Singleton's 'lazy' initialization?"),
  options: [P("Crear la instancia la PRIMERA vez que se pide, no antes", "Creating the instance the FIRST time it's requested, not before"), P("No crearla nunca", "Never creating it"), P("Crearla al arrancar siempre", "Always creating it at startup"), P("Crear muchas", "Creating many")],
  correct: 0, explanation: P("`if (!inst) inst = new Clase()`: sólo se construye cuando de verdad hace falta. Ahorra recursos si nunca se usa.", "`if (!inst) inst = new Class()`: it's built only when actually needed. Saves resources if never used.") };
const Q_SG_STATE = { question: P("Dos llamadas a `Clase.instancia()`, ¿comparten estado?", "Do two calls to `Class.instancia()` share state?"),
  options: [P("Sí: es la MISMA instancia, así que ven el mismo estado", "Yes: it's the SAME instance, so they see the same state"), P("No, cada una es nueva", "No, each is new"), P("Sólo la primera", "Only the first"), P("Depende del parámetro", "Depends on the parameter")],
  correct: 0, explanation: P("Como devuelven el mismo objeto, un cambio hecho a través de una llamada lo ve la otra. Ése es el punto: estado compartido.", "Since they return the same object, a change made via one call is seen by the other. That's the point: shared state.") };
const Q_SG_STATIC = { question: P("¿Dónde se guarda la única instancia?", "Where is the single instance stored?"),
  options: [P("En un campo ESTÁTICO de la clase", "In a STATIC field of the class"), P("En cada objeto", "In each object"), P("En un array global", "In a global array"), P("En el constructor", "In the constructor")],
  correct: 0, explanation: P("Un campo estático (`private static inst`) pertenece a la clase, no a los objetos: por eso hay una y sólo una para todos.", "A static field (`private static inst`) belongs to the class, not the objects: hence one and only one for everyone.") };
const Q_SG_WHEN = { question: P("¿Cuándo tiene sentido un Singleton?", "When does a Singleton make sense?"),
  options: [P("Cuando de verdad debe haber UN recurso compartido (config, log)", "When there truly must be ONE shared resource (config, log)"), P("Siempre, para todo", "Always, for everything"), P("Nunca", "Never"), P("Sólo con números", "Only with numbers")],
  correct: 0, explanation: P("Sirve cuando una segunda instancia no tendría sentido: la configuración de la app, un logger central, un pool. No como atajo para variables globales.", "It fits when a second instance would make no sense: the app config, a central logger, a pool. Not as a shortcut for globals.") };
const Q_SG_CONS = { question: P("¿Cuál es el riesgo de abusar del Singleton?", "What's the risk of overusing Singleton?"),
  options: [P("Introduce estado GLOBAL, que dificulta las pruebas y el desacople", "It introduces GLOBAL state, hurting testability and decoupling"), P("Consume demasiada memoria", "It uses too much memory"), P("Es más lento", "It's slower"), P("No tiene riesgos", "It has no risks")],
  correct: 0, explanation: P("Un Singleton es un global disfrazado: acoplas código a él y cuesta sustituirlo en tests. Úsalo con criterio; a veces es mejor inyectar la dependencia.", "A Singleton is a disguised global: code couples to it and it's hard to replace in tests. Use it judiciously; injecting the dependency is often better.") };
const Q_SG_POINT = { question: P("Un Singleton ofrece, además de una instancia única, …", "Besides a single instance, a Singleton offers…"),
  options: [P("Un punto de acceso GLOBAL a esa instancia", "A GLOBAL access point to that instance"), P("Varias fábricas", "Several factories"), P("Un árbol", "A tree"), P("Una lista", "A list")],
  correct: 0, explanation: P("El método estático es a la vez la garantía de unicidad y la puerta global por la que todos acceden a la misma instancia.", "The static method is both the uniqueness guarantee and the global door through which everyone reaches the same instance.") };

export const SYL_DP_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_SG_WHAT, Q_SG_ACCESS, Q_SG_STATIC] },
  c4_lobo: { kind: "battle", questions: [Q_SG_PRIVATE, Q_SG_LAZY, Q_SG_STATE] },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_SG_WHEN, Q_SG_CONS, Q_SG_POINT] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P("Un solo tesoro compartido por todos los Nueve. Un Singleton con estado que se acumula.", "A single hoard shared by all Nine. A Singleton with accumulating state."),
    challenge: {
      support_code: "",
      topic: P("Singleton con estado", "Singleton with state"),
      instructions: P("Escribe la clase `Banco` (Singleton) con `instancia()` estático que devuelva SIEMPRE la misma, `depositar(n)` que sume a un total interno y `saldo()` que lo devuelva.", "Write class `Banco` (Singleton) with a static `instancia()` returning ALWAYS the same, `depositar(n)` adding to an internal total and `saldo()` returning it."),
      starter_code: "class Banco {\n  private static inst: Banco;\n  private total = 0;\n}\n",
      blocks: [
        "class Banco {",
        "  private static inst: Banco;",
        "  private total = 0;",
        "  static instancia(): Banco {",
        "    if (!Banco.inst) Banco.inst = new Banco();",
        "    return Banco.inst;",
        "  }",
        "  depositar(n: number): void { this.total += n; }",
        "  saldo(): number { return this.total; }",
        "}",
        "    return new Banco();",
      ],
      hints: [P("`instancia()` crea la única la primera vez y la reutiliza.", "`instancia()` creates the single one the first time and reuses it."), P("El estado (`total`) se comparte porque la instancia es única.", "State (`total`) is shared because the instance is unique.")],
      test_cases: [
        { input: "(() => { Banco.instancia().depositar(10); Banco.instancia().depositar(5); return Banco.instancia().saldo(); })()", expected: 15, description: P("Estado compartido", "Shared state"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino del Único", "The Scroll of the One"),
    lore_intro: P("Un pergamino enseña a garantizar una sola instancia: Singleton.", "A scroll teaches how to guarantee a single instance: Singleton."),
    scroll: {
      topic: P("Patrón Singleton", "Singleton pattern"),
      sections: [
        { heading: P("Una sola instancia", "A single instance"), body: P("Un campo estático guarda la única instancia; un método estático la crea la primera vez y la devuelve siempre.", "A static field holds the single instance; a static method creates it the first time and always returns it."), code: "static instancia(): Banco {\n  if (!Banco.inst) Banco.inst = new Banco();\n  return Banco.inst;\n}" },
        { heading: P("Constructor privado", "Private constructor"), body: P("Con el constructor privado, nadie puede hacer `new` desde fuera: la única vía es el método estático.", "With a private constructor, nobody can `new` from outside: the only way is the static method."), code: "private constructor() {}" },
        { heading: P("Estado compartido y cautela", "Shared state and caution"), body: P("Todas las llamadas devuelven el mismo objeto, así que comparten estado. Ojo: es estado GLOBAL; abusar dificulta las pruebas.", "All calls return the same object, so they share state. Beware: it's GLOBAL state; overuse hurts testing."), code: "Banco.instancia().depositar(10);\nBanco.instancia().saldo(); // 10" },
      ],
      keyTakeaway: P("Singleton: una única instancia (campo estático) con acceso global (método estático) y constructor privado. Comparte estado; úsalo con criterio porque es un global disfrazado.", "Singleton: a single instance (static field) with global access (static method) and a private constructor. It shares state; use it wisely because it's a disguised global."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Única Montura", "The One Steed"),
    lore_intro: P("Sólo hay un Asfaloth. Garantiza que siempre sea la misma instancia.", "There is only one Asfaloth. Guarantee it's always the same instance."),
    challenge: {
      support_code: "",
      topic: P("Instancia única", "Single instance"),
      instructions: P("Escribe la clase `Registro` con un método estático `instancia()` que devuelva SIEMPRE la misma instancia (créala la primera vez y guárdala en un campo estático).", "Write class `Registro` with a static `instancia()` method that ALWAYS returns the same instance (create it the first time and store it in a static field)."),
      starter_code: "class Registro {\n  private static inst: Registro;\n}\n",
      blocks: [
        "class Registro {",
        "  private static inst: Registro;",
        "  static instancia(): Registro {",
        "    if (!Registro.inst) Registro.inst = new Registro();",
        "    return Registro.inst;",
        "  }",
        "}",
        "    return new Registro();",
      ],
      hints: [P("Crea sólo si no existe: `if (!Registro.inst) ...`.", "Create only if missing: `if (!Registro.inst) ...`."), P("Devuelve `Registro.inst`.", "Return `Registro.inst`.")],
      test_cases: [
        { input: "Registro.instancia() === Registro.instancia()", expected: true, description: P("Misma instancia", "Same instance"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento Único", "The Single Count"),
    lore_intro: P("Un contador que todos comparten. Suma a través de la misma instancia.", "A counter everyone shares. Add through the same instance."),
    challenge: {
      support_code: "",
      topic: P("Singleton contador", "Counter singleton"),
      instructions: P("Escribe la clase `Contador` (Singleton) con `instancia()` estático y `sumar()` que incremente un contador interno y devuelva su nuevo valor.", "Write class `Contador` (Singleton) with a static `instancia()` and `sumar()` that increments an internal counter and returns its new value."),
      starter_code: "class Contador {\n  private static inst: Contador;\n  private n = 0;\n}\n",
      blocks: [
        "class Contador {",
        "  private static inst: Contador;",
        "  private n = 0;",
        "  static instancia(): Contador {",
        "    if (!Contador.inst) Contador.inst = new Contador();",
        "    return Contador.inst;",
        "  }",
        "  sumar(): number { this.n++; return this.n; }",
        "}",
        "  sumar(): number { return 1; }",
      ],
      hints: [P("El patrón `instancia()` de siempre.", "The usual `instancia()` pattern."), P("`sumar` incrementa `this.n`.", "`sumar` increments `this.n`.")],
      test_cases: [
        { input: "(() => { Contador.instancia().sumar(); Contador.instancia().sumar(); return Contador.instancia().sumar(); })()", expected: 3, description: P("Contador compartido", "Shared counter"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado Perezoso", "The Lazy Ford"),
    lore_intro: P("La config del vado se crea sólo al necesitarla. Inicialización perezosa.", "The ford's config is created only when needed. Lazy initialization."),
    challenge: {
      support_code: "",
      topic: P("Lazy init + constructor privado", "Lazy init + private constructor"),
      instructions: P("Escribe la clase `Config` con un campo público `valor = 42`, constructor PRIVADO, y `instancia()` estático que cree la instancia sólo la primera vez.", "Write class `Config` with a public field `valor = 42`, a PRIVATE constructor, and a static `instancia()` that creates the instance only the first time."),
      starter_code: "class Config {\n  private static inst: Config | null = null;\n  valor = 42;\n}\n",
      blocks: [
        "class Config {",
        "  private static inst: Config | null = null;",
        "  valor = 42;",
        "  private constructor() {}",
        "  static instancia(): Config {",
        "    if (Config.inst === null) Config.inst = new Config();",
        "    return Config.inst;",
        "  }",
        "}",
        "  constructor() {}",
      ],
      hints: [P("Constructor privado para bloquear `new` desde fuera.", "Private constructor to block outside `new`."), P("Crea sólo si `inst === null`.", "Create only if `inst === null`.")],
      test_cases: [
        { input: "Config.instancia().valor", expected: 42, description: P("El valor", "The value"), raw: true },
        { input: "Config.instancia() === Config.instancia()", expected: true, description: P("Misma instancia", "Same instance"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas Compartidas", "The Shared Runes"),
    lore_intro: P("Un estado que todos leen y escriben a través del único registro.", "A state everyone reads and writes through the single registry."),
    challenge: {
      support_code: "",
      topic: P("Singleton con set/get", "Singleton with set/get"),
      instructions: P("Escribe la clase `Estado` (Singleton) con `instancia()` estático, `set(x)` que guarde un valor y `get()` que lo devuelva.", "Write class `Estado` (Singleton) with a static `instancia()`, `set(x)` storing a value and `get()` returning it."),
      starter_code: "class Estado {\n  private static inst: Estado;\n  private v = 0;\n}\n",
      blocks: [
        "class Estado {",
        "  private static inst: Estado;",
        "  private v = 0;",
        "  static instancia(): Estado {",
        "    if (!Estado.inst) Estado.inst = new Estado();",
        "    return Estado.inst;",
        "  }",
        "  set(x: number): void { this.v = x; }",
        "  get(): number { return this.v; }",
        "}",
        "  get(): number { return 0; }",
      ],
      hints: [P("El patrón `instancia()` de siempre.", "The usual `instancia()` pattern."), P("`set` guarda en `this.v`, `get` lo lee.", "`set` stores in `this.v`, `get` reads it.")],
      test_cases: [
        { input: "(() => { Estado.instancia().set(7); return Estado.instancia().get(); })()", expected: 7, description: P("Escribe y lee lo mismo", "Writes and reads the same"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 5 · Decorator (Decorador)
 * ===================================================================== */
const Q_D_WHAT = { question: P("¿Qué hace el patrón Decorator?", "What does the Decorator pattern do?"),
  options: [P("Envuelve un objeto para AÑADIRLE comportamiento sin tocar su clase", "Wraps an object to ADD behavior without touching its class"), P("Crea instancias", "Creates instances"), P("Garantiza una sola instancia", "Guarantees a single instance"), P("Ordena una lista", "Sorts a list")],
  correct: 0, explanation: P("Un decorador contiene otro objeto de la misma interfaz y le suma algo antes o después. La clase original no se modifica.", "A decorator holds another object of the same interface and adds something before or after. The original class isn't modified.") };
const Q_D_INTERFACE = { question: P("¿Qué relación hay entre el decorador y lo que envuelve?", "What's the relationship between the decorator and what it wraps?"),
  options: [P("Ambos implementan la MISMA interfaz (son intercambiables)", "Both implement the SAME interface (interchangeable)"), P("El decorador no tiene interfaz", "The decorator has no interface"), P("Son de tipos distintos sin relación", "They're unrelated types"), P("El decorador hereda del cliente", "The decorator inherits from the client")],
  correct: 0, explanation: P("Como el decorador cumple la misma interfaz que el componente, el cliente lo usa igual, sin saber si está decorado o no.", "Since the decorator satisfies the same interface as the component, the client uses it the same, unaware whether it's decorated.") };
const Q_D_STACK = { question: P("¿Se pueden apilar varios decoradores?", "Can you stack several decorators?"),
  options: [P("Sí: un decorador puede envolver a otro decorador", "Yes: a decorator can wrap another decorator"), P("No, sólo uno", "No, only one"), P("Sólo dos", "Only two"), P("Sólo si son iguales", "Only if identical")],
  correct: 0, explanation: P("Como todos comparten interfaz, se anidan: `new ConFilo(new ConEscudo(new Base()))`. Cada capa suma su parte.", "Since all share the interface, they nest: `new ConFilo(new ConEscudo(new Base()))`. Each layer adds its part.") };
const Q_D_DELEGATE = { question: P("Dentro de su método, ¿qué hace típicamente un decorador?", "Inside its method, what does a decorator typically do?"),
  options: [P("Llama al componente que envuelve y añade su parte", "Calls the wrapped component and adds its bit"), P("Ignora al componente", "Ignores the component"), P("Crea uno nuevo", "Creates a new one"), P("Lo borra", "Deletes it"),],
  correct: 0, explanation: P("Delega en el objeto interior (`this.c.costo()`) y le suma o transforma el resultado. Por eso las capas se combinan.", "It delegates to the inner object (`this.c.costo()`) and adds to or transforms the result. That's why layers combine.") };
const Q_D_VS_INHERIT = { question: P("¿Qué ventaja tiene Decorator frente a crear una subclase por combinación?", "What's Decorator's advantage over subclassing per combination?"),
  options: [P("Evita la explosión de subclases: combinas capas en tiempo de ejecución", "Avoids subclass explosion: you combine layers at runtime"), P("Es más rápido siempre", "It's always faster"), P("Usa menos memoria", "Uses less memory"), P("No usa interfaces", "It uses no interfaces")],
  correct: 0, explanation: P("Con herencia necesitarías una subclase por cada mezcla (ConEscudoYFilo…). Con decoradores compones las que quieras al vuelo.", "With inheritance you'd need a subclass per mix (ConEscudoYFilo…). With decorators you compose whatever you want on the fly.") };
const Q_D_TRANSPARENT = { question: P("Para el cliente, un objeto decorado…", "For the client, a decorated object…"),
  options: [P("Se usa IGUAL que uno sin decorar (misma interfaz)", "Is used the SAME as an undecorated one (same interface)"), P("Requiere métodos nuevos", "Requires new methods"), P("Hay que comprobar su tipo", "Must be type-checked"), P("No se puede usar", "Can't be used")],
  correct: 0, explanation: P("El decorado es transparente: el cliente llama `costo()` sin saber cuántas capas hay debajo. Ésa es la gracia.", "The decorated one is transparent: the client calls `costo()` unaware of the layers below. That's the point.") };
const Q_D_RUNTIME = { question: P("¿Cuándo se decide qué decoradores aplicar?", "When do you decide which decorators to apply?"),
  options: [P("En tiempo de EJECUCIÓN, componiendo las capas que hagan falta", "At RUNTIME, composing the needed layers"), P("En tiempo de compilación siempre", "Always at compile time"), P("Nunca", "Never"), P("Al instalar", "At install time")],
  correct: 0, explanation: P("Puedes envolver un objeto con unas capas u otras según la situación, sin recompilar ni crear tipos nuevos.", "You can wrap an object with different layers per situation, without recompiling or creating new types.") };
const Q_D_COMPOSE = { question: P("Decorator es otro ejemplo de 'favorecer la composición sobre…'", "Decorator is another example of 'favor composition over…'"),
  options: [P("la herencia", "inheritance"), P("los tests", "tests"), P("los tipos", "types"), P("las funciones", "functions")],
  correct: 0, explanation: P("En vez de heredar para añadir comportamiento, se COMPONE envolviendo. Más flexible y sin acoplar jerarquías.", "Instead of inheriting to add behavior, you COMPOSE by wrapping. More flexible and without coupling hierarchies.") };
const Q_D_REAL = { question: P("¿Dónde aparece Decorator en la práctica?", "Where does Decorator appear in practice?"),
  options: [P("Middlewares, streams envueltos, envoltorios que añaden logging/caché", "Middlewares, wrapped streams, wrappers adding logging/caching"), P("En los bucles for", "In for loops"), P("En los enums", "In enums"), P("En los imports", "In imports")],
  correct: 0, explanation: P("Un stream comprimido que envuelve a uno de fichero, o un middleware que añade autenticación, son decoradores: envuelven y añaden.", "A compressed stream wrapping a file stream, or a middleware adding auth, are decorators: they wrap and add.") };

export const SYL_DP_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_D_WHAT, Q_D_INTERFACE, Q_D_DELEGATE] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_D_STACK, Q_D_TRANSPARENT, Q_D_RUNTIME] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_D_VS_INHERIT, Q_D_COMPOSE, Q_D_REAL] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P("Un decorador que DOBLA el costo de lo que envuelve, y se puede apilar sobre sí mismo.", "A decorator that DOUBLES the cost of what it wraps, and can stack on itself."),
    challenge: {
      support_code: S_DEC_B,
      topic: P("Decorador multiplicador", "Multiplier decorator"),
      instructions: P("Ya existen `Componente` (interfaz con `costo()`) y `Base` (costo 10). Escribe `Doblado`, un decorador que implemente `Componente`, reciba otro `Componente` y devuelva su `costo()` MULTIPLICADO por 2. Debe poder anidarse.", "`Componente` (interface with `costo()`) and `Base` (cost 10) already exist. Write `Doblado`, a decorator implementing `Componente`, taking another `Componente` and returning its `costo()` TIMES 2. It must be nestable."),
      starter_code: "class Doblado implements Componente {\n}\n",
      blocks: [
        "class Doblado implements Componente {",
        "  constructor(private c: Componente) {}",
        "  costo(): number {",
        "    return this.c.costo() * 2;",
        "  }",
        "}",
        "    return 2;",
      ],
      hints: [P("Guarda el componente envuelto en el constructor.", "Store the wrapped component in the constructor."), P("Delega y multiplica: `this.c.costo() * 2`.", "Delegate and multiply: `this.c.costo() * 2`.")],
      test_cases: [
        { input: "new Doblado(new Base()).costo()", expected: 20, description: P("10 x 2", "10 x 2"), raw: true },
        { input: "new Doblado(new Doblado(new Base())).costo()", expected: 40, description: P("Apilado: 10 x 2 x 2", "Stacked: 10 x 2 x 2"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Envoltorio", "The Scroll of the Wrapper"),
    lore_intro: P("Un pergamino enseña a añadir comportamiento envolviendo: Decorator.", "A scroll teaches how to add behavior by wrapping: Decorator."),
    scroll: {
      topic: P("Patrón Decorator", "Decorator pattern"),
      sections: [
        { heading: P("Envolver y añadir", "Wrap and add"), body: P("Un decorador implementa la misma interfaz que el componente, guarda uno dentro y le suma o transforma el resultado.", "A decorator implements the same interface as the component, holds one inside and adds to or transforms its result."), code: "class ConEscudo implements Componente {\n  constructor(private c: Componente) {}\n  costo() { return this.c.costo() + 5; }\n}" },
        { heading: P("Apilable y transparente", "Stackable and transparent"), body: P("Como comparten interfaz, se anidan libremente y el cliente los usa igual que al componente sin decorar.", "Since they share the interface, they nest freely and the client uses them like the undecorated component."), code: "new ConFilo(new ConEscudo(new Base())).costo();" },
        { heading: P("Frente a la herencia", "Versus inheritance"), body: P("Evita crear una subclase por cada combinación: compones capas en tiempo de ejecución. Composición sobre herencia.", "Avoids a subclass per combination: you compose layers at runtime. Composition over inheritance."), code: "// nada de ConEscudoYFiloYPuntas..." },
      ],
      keyTakeaway: P("Decorator envuelve un objeto de la misma interfaz para añadirle comportamiento; es apilable y transparente para el cliente. Evita la explosión de subclases: compones capas en tiempo de ejecución.", "Decorator wraps an object of the same interface to add behavior; it's stackable and transparent to the client. It avoids subclass explosion: you compose layers at runtime."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga Base", "The Base Load"),
    lore_intro: P("Todo empieza por el componente base, sin adornos.", "It all starts with the base component, unadorned."),
    challenge: {
      support_code: S_DEC_I,
      topic: P("Componente base", "Base component"),
      instructions: P("Ya existe la interfaz `Componente` con `costo(): number`. Escribe la clase `Base` que la implemente y devuelva un costo de 10.", "The `Componente` interface with `costo(): number` already exists. Write class `Base` implementing it and returning a cost of 10."),
      starter_code: "class Base implements Componente {\n}\n",
      blocks: [
        "class Base implements Componente {",
        "  costo(): number {",
        "    return 10;",
        "  }",
        "}",
        "  costo(): string { return '10'; }",
      ],
      hints: [P("Implementa `costo()` devolviendo 10.", "Implement `costo()` returning 10.")],
      test_cases: [
        { input: "new Base().costo()", expected: 10, description: P("Costo base", "Base cost"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("El Escudo que Suma", "The Shield that Adds"),
    lore_intro: P("Un decorador que envuelve un componente y le suma 5 al costo.", "A decorator that wraps a component and adds 5 to the cost."),
    challenge: {
      support_code: S_DEC_B,
      topic: P("Decorador que suma", "Additive decorator"),
      instructions: P("Escribe `ConEscudo`, un decorador que implemente `Componente`, reciba otro `Componente` y devuelva su `costo()` MÁS 5.", "Write `ConEscudo`, a decorator implementing `Componente`, taking another `Componente` and returning its `costo()` PLUS 5."),
      starter_code: "class ConEscudo implements Componente {\n}\n",
      blocks: [
        "class ConEscudo implements Componente {",
        "  constructor(private c: Componente) {}",
        "  costo(): number {",
        "    return this.c.costo() + 5;",
        "  }",
        "}",
        "    return 5;",
      ],
      hints: [P("Guarda el envuelto: `constructor(private c: Componente) {}`.", "Store the wrapped: `constructor(private c: Componente) {}`."), P("Delega y suma: `this.c.costo() + 5`.", "Delegate and add: `this.c.costo() + 5`.")],
      test_cases: [
        { input: "new ConEscudo(new Base()).costo()", expected: 15, description: P("10 + 5", "10 + 5"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("El Filo Apilado", "The Stacked Edge"),
    lore_intro: P("Otra capa más: un decorador que suma 3, apilable sobre el escudo.", "One more layer: a decorator that adds 3, stackable over the shield."),
    challenge: {
      support_code: S_DEC_BE,
      topic: P("Decoradores apilados", "Stacked decorators"),
      instructions: P("Ya existen `Base` (10) y `ConEscudo` (+5). Escribe `ConFilo`, un decorador que implemente `Componente` y sume 3 al `costo()` de lo que envuelve. Debe funcionar apilado con `ConEscudo`.", "`Base` (10) and `ConEscudo` (+5) already exist. Write `ConFilo`, a decorator implementing `Componente` that adds 3 to the `costo()` of what it wraps. It must work stacked with `ConEscudo`."),
      starter_code: "class ConFilo implements Componente {\n}\n",
      blocks: [
        "class ConFilo implements Componente {",
        "  constructor(private c: Componente) {}",
        "  costo(): number {",
        "    return this.c.costo() + 3;",
        "  }",
        "}",
        "    return this.c.costo();",
      ],
      hints: [P("Igual que `ConEscudo` pero sumando 3.", "Same as `ConEscudo` but adding 3."), P("Delega en `this.c.costo()`.", "Delegate to `this.c.costo()`.")],
      test_cases: [
        { input: "new ConFilo(new ConEscudo(new Base())).costo()", expected: 18, description: P("10 + 5 + 3", "10 + 5 + 3"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 6 · Adapter (Adaptador)
 * ===================================================================== */
const Q_A_WHAT = { question: P("¿Qué problema resuelve el patrón Adapter?", "What problem does the Adapter pattern solve?"),
  options: [P("Hacer que dos interfaces INCOMPATIBLES trabajen juntas", "Making two INCOMPATIBLE interfaces work together"), P("Crear objetos", "Creating objects"), P("Ordenar listas", "Sorting lists"), P("Garantizar una instancia", "Guaranteeing one instance")],
  correct: 0, explanation: P("Un adaptador traduce la interfaz de una clase a la que el cliente espera. Como el enchufe que conecta dos tomas distintas.", "An adapter translates one class's interface to the one the client expects. Like a plug connecting two different sockets.") };
const Q_A_WRAP = { question: P("¿Qué contiene un adaptador por dentro?", "What does an adapter hold inside?"),
  options: [P("El objeto 'adaptado' (adaptee) al que redirige las llamadas", "The 'adaptee' object it forwards calls to"), P("Una copia del cliente", "A copy of the client"), P("Nada", "Nothing"), P("Una lista de fábricas", "A list of factories")],
  correct: 0, explanation: P("El adaptador guarda el objeto incompatible y, cuando el cliente llama al método esperado, delega en el método real del adaptado.", "The adapter holds the incompatible object and, when the client calls the expected method, delegates to the adaptee's real method.") };
const Q_A_TARGET = { question: P("¿Qué interfaz implementa el adaptador?", "Which interface does the adapter implement?"),
  options: [P("La que ESPERA el cliente (la interfaz objetivo)", "The one the client EXPECTS (the target interface)"), P("Ninguna", "None"), P("La del adaptado", "The adaptee's"), P("Una nueva sin relación", "A new unrelated one")],
  correct: 0, explanation: P("El adaptador habla el idioma del cliente (implementa su interfaz) y por dentro traduce al idioma del adaptado.", "The adapter speaks the client's language (implements its interface) and internally translates to the adaptee's.") };
const Q_A_TRANSLATE = { question: P("En su método, ¿qué hace el adaptador?", "In its method, what does the adapter do?"),
  options: [P("Traduce/redirige la llamada al método del adaptado", "Translates/forwards the call to the adaptee's method"), P("Crea el adaptado", "Creates the adaptee"), P("Lo borra", "Deletes it"), P("Lo ignora", "Ignores it")],
  correct: 0, explanation: P("`poder() { return this.viejo.valorViejo(); }`: por fuera parece la interfaz nueva; por dentro llama a la vieja. Puede además convertir unidades o formatos.", "`poder() { return this.viejo.valorViejo(); }`: outside it looks like the new interface; inside it calls the old one. It can also convert units or formats.") };
const Q_A_REUSE = { question: P("¿Para qué sirve especialmente Adapter?", "What is Adapter especially useful for?"),
  options: [P("Reutilizar código antiguo o de terceros SIN modificarlo", "Reusing old or third-party code WITHOUT modifying it"), P("Escribir el código más rápido", "Writing code faster"), P("Borrar dependencias", "Deleting dependencies"), P("Crear singletons", "Creating singletons")],
  correct: 0, explanation: P("Cuando no puedes (o no debes) tocar una clase legada o una librería externa, la envuelves en un adaptador con la interfaz que te conviene.", "When you can't (or shouldn't) touch a legacy class or external library, you wrap it in an adapter with the interface you want.") };
const Q_A_DELEGATION = { question: P("El 'object adapter' se basa en…", "The 'object adapter' is based on…"),
  options: [P("Composición y delegación: contiene el adaptado y le delega", "Composition and delegation: it holds the adaptee and delegates"), P("Herencia múltiple", "Multiple inheritance"), P("Copiar el código", "Copying the code"), P("Un bucle", "A loop")],
  correct: 0, explanation: P("El adaptador de objeto TIENE-UN adaptado (composición) y delega en él, en vez de heredar. Es la forma más flexible y común.", "The object adapter HAS-A adaptee (composition) and delegates to it, rather than inheriting. It's the most flexible and common form.") };
const Q_A_CONVERT = { question: P("Además de redirigir, un adaptador puede…", "Besides forwarding, an adapter can…"),
  options: [P("Convertir datos: unidades, formatos, tipos", "Convert data: units, formats, types"), P("Nada más", "Nothing else"), P("Sólo redirigir", "Only forward"), P("Crear objetos", "Create objects")],
  correct: 0, explanation: P("Un adaptador de Celsius a Fahrenheit no sólo llama al método: transforma el valor. La adaptación puede incluir conversión.", "A Celsius-to-Fahrenheit adapter doesn't just call the method: it transforms the value. Adaptation can include conversion.") };
const Q_A_VS_FACADE = { question: P("¿En qué se diferencia Adapter de Facade?", "How does Adapter differ from Facade?"),
  options: [P("Adapter CAMBIA una interfaz a otra esperada; Facade SIMPLIFICA un subsistema complejo", "Adapter CHANGES one interface to an expected one; Facade SIMPLIFIES a complex subsystem"), P("Son iguales", "They're the same"), P("Adapter crea objetos", "Adapter creates objects"), P("Facade garantiza una instancia", "Facade guarantees one instance")],
  correct: 0, explanation: P("Adapter existe porque las interfaces no encajan; Facade porque un subsistema es incómodo de usar y se le pone una fachada simple.", "Adapter exists because interfaces don't fit; Facade because a subsystem is awkward to use and gets a simple front.") };
const Q_A_CLIENT = { question: P("El cliente que usa el adaptador, ¿nota que hay una clase adaptada dentro?", "Does the client using the adapter notice there's an adaptee inside?"),
  options: [P("No: sólo ve la interfaz esperada", "No: it only sees the expected interface"), P("Sí, siempre", "Yes, always"), P("Depende del bucle", "Depends on the loop"), P("Sólo en tests", "Only in tests")],
  correct: 0, explanation: P("El cliente trabaja contra la interfaz objetivo. Que por dentro haya una clase vieja adaptada es un detalle oculto.", "The client works against the target interface. That an old adapted class sits inside is a hidden detail.") };

export const SYL_DP_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_A_WHAT, Q_A_WRAP, Q_A_TARGET] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_A_TRANSLATE, Q_A_DELEGATION, Q_A_CONVERT] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_A_REUSE, Q_A_VS_FACADE, Q_A_CLIENT] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("Un poder legado con la interfaz equivocada. Adáptalo a la que el cliente espera.", "A legacy power with the wrong interface. Adapt it to the one the client expects."),
    challenge: {
      support_code: "interface Objetivo { golpear(): number; }\nclass Legado { ataque(): number { return 100; } }",
      topic: P("Adaptar a la interfaz objetivo", "Adapt to the target interface"),
      instructions: P("Ya existen la interfaz `Objetivo` (con `golpear(): number`) y la clase `Legado` (con `ataque(): number`, incompatible). Escribe `AdaptadorBalrog` que implemente `Objetivo`, reciba un `Legado` y haga que `golpear()` devuelva su `ataque()`.", "The `Objetivo` interface (with `golpear(): number`) and class `Legado` (with `ataque(): number`, incompatible) already exist. Write `AdaptadorBalrog` implementing `Objetivo`, taking a `Legado`, so `golpear()` returns its `ataque()`."),
      starter_code: "class AdaptadorBalrog implements Objetivo {\n}\n",
      blocks: [
        "class AdaptadorBalrog implements Objetivo {",
        "  constructor(private l: Legado) {}",
        "  golpear(): number {",
        "    return this.l.ataque();",
        "  }",
        "}",
        "    return this.l.golpear();",
      ],
      hints: [P("Implementa la interfaz OBJETIVO (`golpear`), no la del legado.", "Implement the TARGET interface (`golpear`), not the legacy one."), P("Por dentro delega en `this.l.ataque()`.", "Inside, delegate to `this.l.ataque()`.")],
      test_cases: [
        { input: "new AdaptadorBalrog(new Legado()).golpear()", expected: 100, description: P("golpear() redirige a ataque()", "golpear() forwards to ataque()"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino del Enchufe", "The Scroll of the Plug"),
    lore_intro: P("Un pergamino enseña a conectar interfaces que no encajan: Adapter.", "A scroll teaches how to connect interfaces that don't fit: Adapter."),
    scroll: {
      topic: P("Patrón Adapter", "Adapter pattern"),
      sections: [
        { heading: P("Traducir interfaces", "Translating interfaces"), body: P("El adaptador implementa la interfaz que ESPERA el cliente y, por dentro, delega en el objeto 'adaptado' incompatible.", "The adapter implements the interface the client EXPECTS and, inside, delegates to the incompatible 'adaptee' object."), code: "class Adaptador implements Nuevo {\n  constructor(private v: Viejo) {}\n  poder() { return this.v.valorViejo(); }\n}" },
        { heading: P("Composición y conversión", "Composition and conversion"), body: P("Es un 'object adapter': TIENE-UN adaptado y le delega. Puede además convertir datos (unidades, formatos).", "It's an 'object adapter': it HAS-A adaptee and delegates. It can also convert data (units, formats)."), code: "fahrenheit() { return this.c.grados() * 9 / 5 + 32; }" },
        { heading: P("Reutilizar sin tocar", "Reuse without touching"), body: P("Perfecto para código legado o de terceros que no puedes modificar: lo envuelves con la interfaz que te conviene.", "Perfect for legacy or third-party code you can't modify: you wrap it with the interface you want."), code: "const obj: Nuevo = new Adaptador(legado);" },
      ],
      keyTakeaway: P("Adapter traduce una interfaz incompatible a la que el cliente espera: implementa la interfaz objetivo y delega (por composición) en el adaptado, pudiendo convertir datos. Ideal para reutilizar código legado sin tocarlo.", "Adapter translates an incompatible interface to the one the client expects: it implements the target interface and delegates (by composition) to the adaptee, possibly converting data. Ideal to reuse legacy code without touching it."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P("Una puerta vieja con el método equivocado. Adáptala a la nueva interfaz.", "An old door with the wrong method. Adapt it to the new interface."),
    challenge: {
      support_code: "interface Nuevo { poder(): number; }\nclass Viejo { valorViejo(): number { return 42; } }",
      topic: P("Adaptador básico", "Basic adapter"),
      instructions: P("Ya existen `Nuevo` (con `poder(): number`) y `Viejo` (con `valorViejo(): number`). Escribe `Adaptador` que implemente `Nuevo`, reciba un `Viejo` y haga que `poder()` devuelva su `valorViejo()`.", "`Nuevo` (with `poder(): number`) and `Viejo` (with `valorViejo(): number`) already exist. Write `Adaptador` implementing `Nuevo`, taking a `Viejo`, so `poder()` returns its `valorViejo()`."),
      starter_code: "class Adaptador implements Nuevo {\n}\n",
      blocks: [
        "class Adaptador implements Nuevo {",
        "  constructor(private v: Viejo) {}",
        "  poder(): number {",
        "    return this.v.valorViejo();",
        "  }",
        "}",
        "    return this.v.poder();",
      ],
      hints: [P("Guarda el `Viejo` y delega en `valorViejo()`.", "Store the `Viejo` and delegate to `valorViejo()`.")],
      test_cases: [
        { input: "new Adaptador(new Viejo()).poder()", expected: 42, description: P("poder() → valorViejo()", "poder() → valorViejo()"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Adapta grados Celsius a Fahrenheit: el adaptador también convierte.", "Adapt Celsius to Fahrenheit: the adapter also converts."),
    challenge: {
      support_code: "class Celsius { grados(): number { return 100; } }",
      topic: P("Adaptador con conversión", "Adapter with conversion"),
      instructions: P("Ya existe `Celsius` (con `grados()`). Escribe `AFahrenheit` que reciba un `Celsius` y tenga `fahrenheit()` que devuelva `grados() * 9 / 5 + 32`.", "`Celsius` (with `grados()`) already exists. Write `AFahrenheit` taking a `Celsius`, with `fahrenheit()` returning `grados() * 9 / 5 + 32`."),
      starter_code: "class AFahrenheit {\n}\n",
      blocks: [
        "class AFahrenheit {",
        "  constructor(private c: Celsius) {}",
        "  fahrenheit(): number {",
        "    return this.c.grados() * 9 / 5 + 32;",
        "  }",
        "}",
        "    return this.c.grados();",
      ],
      hints: [P("Delega en `this.c.grados()` y convierte.", "Delegate to `this.c.grados()` and convert."), P("Fórmula: `* 9 / 5 + 32`.", "Formula: `* 9 / 5 + 32`.")],
      test_cases: [
        { input: "new AFahrenheit(new Celsius()).fahrenheit()", expected: 212, description: P("100 °C = 212 °F", "100 °C = 212 °F"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Adapta metros a kilómetros para medir el abismo.", "Adapt meters to kilometers to measure the chasm."),
    challenge: {
      support_code: "class Metros { valor(): number { return 3; } }",
      topic: P("Adaptador de unidades", "Unit adapter"),
      instructions: P("Ya existe `Metros` (con `valor()`). Escribe `AKm` que reciba un `Metros` y tenga `km()` que devuelva `valor() / 1000`.", "`Metros` (with `valor()`) already exists. Write `AKm` taking a `Metros`, with `km()` returning `valor() / 1000`."),
      starter_code: "class AKm {\n}\n",
      blocks: [
        "class AKm {",
        "  constructor(private m: Metros) {}",
        "  km(): number {",
        "    return this.m.valor() / 1000;",
        "  }",
        "}",
        "    return this.m.valor() * 1000;",
      ],
      hints: [P("Divide entre 1000: `this.m.valor() / 1000`.", "Divide by 1000: `this.m.valor() / 1000`.")],
      test_cases: [
        { input: "new AKm(new Metros()).km()", expected: 0.003, description: P("3 m = 0.003 km", "3 m = 0.003 km"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Adapta un motor legado con parámetro a la interfaz de empuje.", "Adapt a legacy engine with a parameter to the push interface."),
    challenge: {
      support_code: "class Motor { fuerza(x: number): number { return x * 10; } }",
      topic: P("Adaptar un método con argumento", "Adapt a method with an argument"),
      instructions: P("Ya existe `Motor` (con `fuerza(x)`). Escribe `Adaptado` que reciba un `Motor` y tenga `empujar(x)` que delegue en `fuerza(x)`.", "`Motor` (with `fuerza(x)`) already exists. Write `Adaptado` taking a `Motor`, with `empujar(x)` delegating to `fuerza(x)`."),
      starter_code: "class Adaptado {\n}\n",
      blocks: [
        "class Adaptado {",
        "  constructor(private m: Motor) {}",
        "  empujar(x: number): number {",
        "    return this.m.fuerza(x);",
        "  }",
        "}",
        "    return this.m.empujar(x);",
      ],
      hints: [P("Pasa el argumento al método del adaptado: `this.m.fuerza(x)`.", "Pass the argument to the adaptee's method: `this.m.fuerza(x)`.")],
      test_cases: [
        { input: "new Adaptado(new Motor()).empujar(5)", expected: 50, description: P("empujar(5) → fuerza(5)", "empujar(5) → fuerza(5)"), raw: true },
      ],
    },
  },
};


/* Andamiajes para Command y Composite. */
const S_CMD = "interface Comando { ejecutar(): number; }";
const S_CMD_E = S_CMD + "\nclass Encender implements Comando { ejecutar(): number { return 1; } }";
const S_CMD_V = "interface Comando { ejecutar(): number; }\nclass Valor implements Comando { constructor(private n: number) {} ejecutar(): number { return this.n; } }";
const S_NODO = "interface Nodo { total(): number; }";
const S_NODO_H = S_NODO + "\nclass Hoja implements Nodo { constructor(private v: number) {} total(): number { return this.v; } }";
const S_NODO_HG = S_NODO_H + "\nclass Grupo implements Nodo { private hijos: Nodo[] = []; agregar(n: Nodo): void { this.hijos.push(n); } total(): number { return this.hijos.reduce((s, h) => s + h.total(), 0); } }";

/* ===================================================================== *
 * Capítulo 7 · Command (Comando)
 * ===================================================================== */
const Q_C_WHAT = { question: P("¿Qué encapsula el patrón Command?", "What does the Command pattern encapsulate?"),
  options: [P("Una PETICIÓN o acción como un objeto", "A REQUEST or action as an object"), P("Una única instancia", "A single instance"), P("Un árbol", "A tree"), P("Una fábrica", "A factory")],
  correct: 0, explanation: P("Command convierte una acción en un objeto con un método `ejecutar()`. Así se puede pasar, guardar, encolar o deshacer como cualquier dato.", "Command turns an action into an object with an `ejecutar()` method. So it can be passed, stored, queued or undone like any data.") };
const Q_C_EXECUTE = { question: P("¿Qué método define la interfaz de un comando?", "What method defines a command's interface?"),
  options: [P("`ejecutar()` (execute): dispara la acción", "`ejecutar()` (execute): triggers the action"), P("`crear()`", "`crear()`"), P("`ordenar()`", "`ordenar()`"), P("`copiar()`", "`copiar()`")],
  correct: 0, explanation: P("Todos los comandos comparten `ejecutar()`. Quien lo invoca no sabe qué hace por dentro: sólo lo ejecuta.", "All commands share `ejecutar()`. Whoever invokes it doesn't know what it does inside: it just runs it.") };
const Q_C_DECOUPLE = { question: P("¿Qué desacopla Command?", "What does Command decouple?"),
  options: [P("Al que PIDE la acción (invocador) del que la EJECUTA (receptor)", "The one REQUESTING the action (invoker) from the one PERFORMING it (receiver)"), P("Las clases de los tipos", "Classes from types"), P("El cliente de la fábrica", "The client from the factory"), P("Nada", "Nothing")],
  correct: 0, explanation: P("El invocador tiene un comando y lo ejecuta sin saber los detalles. El comando encapsula quién y cómo se hace el trabajo.", "The invoker holds a command and executes it without knowing the details. The command encapsulates who and how the work is done.") };
const Q_C_QUEUE = { question: P("Como los comandos son objetos, ¿qué se puede hacer con ellos?", "Since commands are objects, what can you do with them?"),
  options: [P("Guardarlos, encolarlos, ejecutarlos más tarde o en lote", "Store them, queue them, run them later or in batches"), P("Sólo ejecutarlos al instante", "Only run them instantly"), P("Nada más", "Nothing else"), P("Sólo compararlos", "Only compare them")],
  correct: 0, explanation: P("Al ser datos, una cola puede acumular comandos y ejecutarlos cuando toque: base de las colas de tareas, macros y transacciones.", "As data, a queue can accumulate commands and run them when needed: the basis of task queues, macros and transactions.") };
const Q_C_UNDO = { question: P("¿Qué operación extra permite a menudo Command?", "What extra operation does Command often enable?"),
  options: [P("Deshacer (undo): si el comando sabe revertirse", "Undo: if the command knows how to reverse itself"), P("Ordenar", "Sorting"), P("Crear singletons", "Creating singletons"), P("Nada", "Nothing")],
  correct: 0, explanation: P("Si además de `ejecutar()` el comando implementa `deshacer()`, tienes un historial de undo/redo. Es un uso clásico del patrón.", "If besides `ejecutar()` the command implements `deshacer()`, you get an undo/redo history. It's a classic use of the pattern.") };
const Q_C_INVOKER = { question: P("¿Qué es el 'invocador' (invoker)?", "What is the 'invoker'?"),
  options: [P("El que guarda comandos y los ejecuta, sin conocer su lógica", "The one that holds commands and runs them, without knowing their logic"), P("El que crea objetos", "The one that creates objects"), P("El comando en sí", "The command itself"), P("Una interfaz", "An interface")],
  correct: 0, explanation: P("Un botón, un menú o una cola son invocadores: tienen un comando y lo disparan. No saben qué hace, sólo llaman a `ejecutar()`.", "A button, a menu or a queue are invokers: they hold a command and fire it. They don't know what it does, just call `ejecutar()`.") };
const Q_C_PARAM = { question: P("¿Puede un comando llevar datos propios (parámetros)?", "Can a command carry its own data (parameters)?"),
  options: [P("Sí: se guardan en el comando al crearlo", "Yes: stored in the command when created"), P("No, nunca", "No, never"), P("Sólo números", "Only numbers"), P("Sólo strings", "Only strings")],
  correct: 0, explanation: P("Un comando `Sumar(10)` guarda el 10 y lo usa al ejecutarse. El comando empaqueta la acción Y sus datos.", "A `Sumar(10)` command stores the 10 and uses it when executed. The command packages the action AND its data.") };
const Q_C_MACRO = { question: P("¿Qué es un 'comando compuesto' (macro)?", "What is a 'composite command' (macro)?"),
  options: [P("Un comando que ejecuta VARIOS comandos en orden", "A command that runs SEVERAL commands in order"), P("Un comando sin ejecutar", "A command with no execute"), P("Un singleton", "A singleton"), P("Una fábrica", "A factory")],
  correct: 0, explanation: P("Como todos comparten `ejecutar()`, un comando puede contener otros y ejecutarlos en cadena: una macro. Se combina con Composite.", "Since all share `ejecutar()`, a command can contain others and run them in a chain: a macro. It combines with Composite.") };
const Q_C_FIRST = { question: P("Command hace de las acciones…", "Command makes actions…"),
  options: [P("Valores de primera clase: se pasan y almacenan como objetos", "First-class values: passed and stored as objects"), P("Más lentas", "Slower"), P("Imposibles de probar", "Impossible to test"), P("Globales", "Global")],
  correct: 0, explanation: P("Convertir 'hacer algo' en un objeto permite tratarlo como dato: pasarlo a funciones, meterlo en listas, registrarlo. Muy potente.", "Turning 'do something' into an object lets you treat it as data: pass it to functions, put it in lists, log it. Very powerful.") };

export const SYL_DP_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_C_WHAT, Q_C_EXECUTE, Q_C_DECOUPLE] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_C_QUEUE, Q_C_UNDO, Q_C_INVOKER] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_C_PARAM, Q_C_MACRO, Q_C_FIRST] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P("Uglúk encola órdenes y las ejecuta todas de golpe. Un invocador con cola de comandos.", "Uglúk queues orders and runs them all at once. An invoker with a command queue."),
    challenge: {
      support_code: S_CMD_V,
      topic: P("Invocador con cola", "Invoker with a queue"),
      instructions: P("Ya existen `Comando` (con `ejecutar(): number`) y `Valor` (devuelve su número). Escribe la clase `Cola` con `agregar(c)` que apile un comando y `ejecutarTodo()` que ejecute todos y devuelva la SUMA de sus resultados.", "`Comando` (with `ejecutar(): number`) and `Valor` (returns its number) already exist. Write class `Cola` with `agregar(c)` that stacks a command and `ejecutarTodo()` that runs them all and returns the SUM of their results."),
      starter_code: "class Cola {\n  private cmds: Comando[] = [];\n}\n",
      blocks: [
        "class Cola {",
        "  private cmds: Comando[] = [];",
        "  agregar(c: Comando): void { this.cmds.push(c); }",
        "  ejecutarTodo(): number {",
        "    return this.cmds.reduce((s, c) => s + c.ejecutar(), 0);",
        "  }",
        "}",
        "    return this.cmds.length;",
      ],
      hints: [P("`agregar` apila en `this.cmds`.", "`agregar` stacks into `this.cmds`."), P("`ejecutarTodo` suma cada `c.ejecutar()`.", "`ejecutarTodo` sums each `c.ejecutar()`.")],
      test_cases: [
        { input: "(() => { const q = new Cola(); q.agregar(new Valor(3)); q.agregar(new Valor(4)); return q.ejecutarTodo(); })()", expected: 7, description: P("3 + 4", "3 + 4"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de la Orden", "The Scroll of the Command"),
    lore_intro: P("Un pergamino enseña a empaquetar acciones como objetos: Command.", "A scroll teaches how to package actions as objects: Command."),
    scroll: {
      topic: P("Patrón Command", "Command pattern"),
      sections: [
        { heading: P("La acción como objeto", "The action as an object"), body: P("Un comando implementa `ejecutar()`. Empaqueta QUÉ hacer (y sus datos) en un objeto que se puede pasar y guardar.", "A command implements `ejecutar()`. It packages WHAT to do (and its data) into an object you can pass and store."), code: "class Sumar implements Comando {\n  constructor(private n: number) {}\n  ejecutar() { return this.n + 1; }\n}" },
        { heading: P("Invocador y receptor", "Invoker and receiver"), body: P("El invocador guarda comandos y los ejecuta sin conocer su lógica. Desacopla al que pide del que hace.", "The invoker holds commands and runs them without knowing their logic. It decouples the requester from the performer."), code: "class Invocador {\n  constructor(private c: Comando) {}\n  correr() { return this.c.ejecutar(); }\n}" },
        { heading: P("Colas, undo y macros", "Queues, undo and macros"), body: P("Al ser objetos, se encolan, se ejecutan en lote, se registran o se deshacen (si implementan `deshacer()`).", "As objects, they queue, run in batches, get logged or undone (if they implement `deshacer()`)."), code: "cola.agregar(new Valor(3));\ncola.ejecutarTodo();" },
      ],
      keyTakeaway: P("Command empaqueta una acción (y sus datos) como objeto con ejecutar(); desacopla invocador y receptor y permite encolar, ejecutar en lote, registrar y deshacer. Convierte las acciones en valores de primera clase.", "Command packages an action (and its data) as an object with execute(); it decouples invoker and receiver and enables queuing, batching, logging and undo. It makes actions first-class values."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "Galadriel's Phial"),
    lore_intro: P("Empaqueta la acción de encender como un comando.", "Package the action of lighting up as a command."),
    challenge: {
      support_code: S_CMD,
      topic: P("Un comando", "A command"),
      instructions: P("Ya existe la interfaz `Comando` con `ejecutar(): number`. Escribe la clase `Encender` que la implemente y devuelva 1.", "The `Comando` interface with `ejecutar(): number` already exists. Write class `Encender` implementing it and returning 1."),
      starter_code: "class Encender implements Comando {\n}\n",
      blocks: [
        "class Encender implements Comando {",
        "  ejecutar(): number {",
        "    return 1;",
        "  }",
        "}",
        "  ejecutar(): number { return 0; }",
      ],
      hints: [P("Implementa `ejecutar()` devolviendo 1.", "Implement `ejecutar()` returning 1.")],
      test_cases: [
        { input: "new Encender().ejecutar()", expected: 1, description: P("Ejecuta la acción", "Runs the action"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("Un invocador que ejecuta el comando que le den, sin conocer su lógica.", "An invoker that runs whatever command it's given, without knowing its logic."),
    challenge: {
      support_code: S_CMD_E,
      topic: P("Invocador", "Invoker"),
      instructions: P("Ya existen `Comando` y `Encender`. Escribe la clase `Invocador` que reciba un `Comando` en el constructor y tenga `correr()` que devuelva el resultado de `ejecutar()` del comando.", "`Comando` and `Encender` already exist. Write class `Invocador` taking a `Comando` in the constructor, with `correr()` returning the command's `ejecutar()` result."),
      starter_code: "class Invocador {\n}\n",
      blocks: [
        "class Invocador {",
        "  constructor(private c: Comando) {}",
        "  correr(): number {",
        "    return this.c.ejecutar();",
        "  }",
        "}",
        "    return 1;",
      ],
      hints: [P("Guarda el comando; `correr` delega en `this.c.ejecutar()`.", "Store the command; `correr` delegates to `this.c.ejecutar()`.")],
      test_cases: [
        { input: "new Invocador(new Encender()).correr()", expected: 1, description: P("Ejecuta el comando", "Runs the command"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("Un comando que lleva su propio dato: suma 1 a lo que guarda.", "A command that carries its own data: adds 1 to what it stores."),
    challenge: {
      support_code: S_CMD,
      topic: P("Comando con parámetro", "Command with a parameter"),
      instructions: P("Escribe la clase `Sumar` que implemente `Comando`, reciba un número `n` en el constructor y cuyo `ejecutar()` devuelva `n + 1`.", "Write class `Sumar` implementing `Comando`, taking a number `n` in the constructor, whose `ejecutar()` returns `n + 1`."),
      starter_code: "class Sumar implements Comando {\n}\n",
      blocks: [
        "class Sumar implements Comando {",
        "  constructor(private n: number) {}",
        "  ejecutar(): number {",
        "    return this.n + 1;",
        "  }",
        "}",
        "    return this.n;",
      ],
      hints: [P("Guarda `n` en el constructor.", "Store `n` in the constructor."), P("`ejecutar` devuelve `this.n + 1`.", "`ejecutar` returns `this.n + 1`.")],
      test_cases: [
        { input: "new Sumar(10).ejecutar()", expected: 11, description: P("Lleva su dato", "Carries its data"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 8 · Composite (Compuesto) — capstone
 * ===================================================================== */
const Q_CO_WHAT = { question: P("¿Qué estructura modela el patrón Composite?", "What structure does the Composite pattern model?"),
  options: [P("Un ÁRBOL de objetos parte-todo, tratados de forma uniforme", "A part-whole TREE of objects, treated uniformly"), P("Una única instancia", "A single instance"), P("Una cola", "A queue"), P("Una fábrica", "A factory")],
  correct: 0, explanation: P("Composite organiza objetos en árbol: hojas (piezas simples) y grupos (que contienen otros), y el cliente los trata a TODOS igual.", "Composite arranges objects in a tree: leaves (simple pieces) and groups (containing others), and the client treats them ALL the same.") };
const Q_CO_UNIFORM = { question: P("¿Qué comparten las hojas y los grupos en Composite?", "What do leaves and groups share in Composite?"),
  options: [P("La MISMA interfaz, así que el cliente no los distingue", "The SAME interface, so the client can't tell them apart"), P("El mismo valor", "The same value"), P("El mismo nombre", "The same name"), P("Nada", "Nothing")],
  correct: 0, explanation: P("Tanto una hoja como un grupo cumplen `total()`. El cliente llama `total()` sin saber si es una pieza suelta o todo un subárbol.", "Both a leaf and a group satisfy `total()`. The client calls `total()` without knowing if it's a single piece or a whole subtree.") };
const Q_CO_RECURSION = { question: P("¿Cómo calcula un grupo su resultado?", "How does a group compute its result?"),
  options: [P("Recursivamente: suma el `total()` de cada hijo (hojas o grupos)", "Recursively: it sums each child's `total()` (leaves or groups)"), P("Con un bucle infinito", "With an infinite loop"), P("Sin recorrer nada", "Without traversing anything"), P("Sólo el primero", "Only the first")],
  correct: 0, explanation: P("El grupo pide `total()` a cada hijo; si el hijo es otro grupo, éste hace lo mismo. La recursión recorre todo el árbol.", "The group asks each child for `total()`; if the child is another group, it does the same. Recursion walks the whole tree.") };
const Q_CO_ADD = { question: P("¿Qué operación tiene un grupo (composite) que una hoja no?", "What operation does a group (composite) have that a leaf doesn't?"),
  options: [P("Añadir hijos (`agregar`)", "Adding children (`agregar`)"), P("Ninguna", "None"), P("Borrarse", "Deleting itself"), P("Ejecutar", "Executing")],
  correct: 0, explanation: P("El grupo gestiona hijos (agregar/quitar); la hoja no tiene hijos. Ambos comparten la operación común (`total()`).", "The group manages children (add/remove); the leaf has none. Both share the common operation (`total()`).") };
const Q_CO_PARTWHOLE = { question: P("Composite es ideal para jerarquías…", "Composite is ideal for hierarchies…"),
  options: [P("parte-todo: carpetas/archivos, menús, organigramas, escenas", "part-whole: folders/files, menus, org charts, scenes"), P("planas sin anidar", "flat with no nesting"), P("de una sola pieza", "of a single piece"), P("numéricas", "numeric")],
  correct: 0, explanation: P("Un sistema de ficheros (carpetas que contienen carpetas y archivos) es Composite puro: operas sobre el todo o una parte igual.", "A file system (folders containing folders and files) is pure Composite: you operate on the whole or a part alike.") };
const Q_CO_CLIENT = { question: P("Para el cliente, operar sobre un árbol Composite es…", "For the client, operating on a Composite tree is…"),
  options: [P("Igual de simple que sobre una hoja: una sola llamada", "As simple as on a leaf: a single call"), P("Muy distinto en cada caso", "Very different each time"), P("Imposible", "Impossible"), P("Sólo posible con casts", "Only possible with casts")],
  correct: 0, explanation: P("Llamas `total()` a la raíz y la recursión se encarga de todo el subárbol. La uniformidad es la gran ventaja del patrón.", "You call `total()` on the root and recursion handles the whole subtree. Uniformity is the pattern's big advantage.") };
const Q_CO_NEST = { question: P("¿Puede un grupo contener a otro grupo?", "Can a group contain another group?"),
  options: [P("Sí: por eso forma un árbol de profundidad arbitraria", "Yes: that's why it forms a tree of arbitrary depth"), P("No, sólo hojas", "No, only leaves"), P("Sólo dos niveles", "Only two levels"), P("Nunca", "Never")],
  correct: 0, explanation: P("Como el grupo acepta cualquier `Nodo` (hoja o grupo), se anida sin límite. El árbol crece tan hondo como haga falta.", "Since the group accepts any `Nodo` (leaf or group), it nests without limit. The tree grows as deep as needed.") };
const Q_CO_VS_DEC = { question: P("¿En qué se diferencian Composite y Decorator, si ambos 'envuelven'?", "How do Composite and Decorator differ, if both 'wrap'?"),
  options: [P("Composite agrupa MUCHOS hijos (árbol); Decorator envuelve a UNO para añadirle algo", "Composite groups MANY children (a tree); Decorator wraps ONE to add to it"), P("Son iguales", "They're the same"), P("Composite crea objetos", "Composite creates objects"), P("Decorator hace árboles", "Decorator makes trees")],
  correct: 0, explanation: P("Composite es 'tengo varios hijos y los trato como uno'; Decorator es 'envuelvo a uno y le sumo comportamiento'. Comparten la idea de misma interfaz.", "Composite is 'I have several children and treat them as one'; Decorator is 'I wrap one and add behavior'. They share the same-interface idea.") };
const Q_CO_LEAF = { question: P("¿Qué es una 'hoja' en Composite?", "What is a 'leaf' in Composite?"),
  options: [P("Un nodo simple, sin hijos, con la operación común", "A simple node, with no children, with the common operation"), P("El nodo raíz", "The root node"), P("Un grupo", "A group"), P("Una interfaz", "An interface")],
  correct: 0, explanation: P("La hoja es el caso base del árbol: implementa `total()` devolviendo su propio valor, sin recorrer hijos (no tiene).", "The leaf is the tree's base case: it implements `total()` returning its own value, without traversing children (it has none).") };

export const SYL_DP_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_CO_WHAT, Q_CO_UNIFORM, Q_CO_LEAF] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_CO_RECURSION, Q_CO_ADD, Q_CO_NEST] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_CO_PARTWHOLE, Q_CO_CLIENT, Q_CO_VS_DEC] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("Un ejército en árbol: grupos dentro de grupos. Suma el total de todo el mando con recursión.", "An army as a tree: groups within groups. Sum the total of the whole command with recursion."),
    challenge: {
      support_code: S_NODO_H,
      topic: P("Composite: grupo recursivo", "Composite: recursive group"),
      instructions: P("Ya existen `Nodo` (con `total(): number`) y `Hoja` (devuelve su valor). Escribe `Grupo` que implemente `Nodo`, con `agregar(n)` que añada un hijo (hoja o grupo) y DEVUELVA el propio grupo (para encadenar), y `total()` que sume el `total()` de todos sus hijos.", "`Nodo` (with `total(): number`) and `Hoja` (returns its value) already exist. Write `Grupo` implementing `Nodo`, with `agregar(n)` adding a child (leaf or group) and RETURNING the group itself (for chaining), and `total()` summing all children's `total()`."),
      starter_code: "class Grupo implements Nodo {\n  private hijos: Nodo[] = [];\n}\n",
      blocks: [
        "class Grupo implements Nodo {",
        "  private hijos: Nodo[] = [];",
        "  agregar(n: Nodo): Grupo {",
        "    this.hijos.push(n);",
        "    return this;",
        "  }",
        "  total(): number {",
        "    return this.hijos.reduce((s, h) => s + h.total(), 0);",
        "  }",
        "}",
        "  total(): number { return this.hijos.length; }",
      ],
      hints: [P("`agregar` apila y `return this` para encadenar.", "`agregar` stacks and `return this` to chain."), P("`total` suma recursivamente el `total()` de cada hijo.", "`total` recursively sums each child's `total()`.")],
      test_cases: [
        { input: "(() => { const raiz = new Grupo(); const sub = new Grupo(); sub.agregar(new Hoja(2)).agregar(new Hoja(3)); raiz.agregar(new Hoja(1)).agregar(sub); return raiz.total(); })()", expected: 6, description: P("Árbol anidado: 1 + (2 + 3)", "Nested tree: 1 + (2 + 3)"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino del Árbol", "The Scroll of the Tree"),
    lore_intro: P("Un último pergamino enseña a tratar un árbol de objetos como si fuera uno solo: Composite.", "A last scroll teaches how to treat a tree of objects as if it were one: Composite."),
    scroll: {
      topic: P("Patrón Composite", "Composite pattern"),
      sections: [
        { heading: P("Hojas y grupos", "Leaves and groups"), body: P("Hojas (piezas simples) y grupos (que contienen otros nodos) comparten la MISMA interfaz. El cliente no los distingue.", "Leaves (simple pieces) and groups (containing other nodes) share the SAME interface. The client can't tell them apart."), code: "interface Nodo { total(): number; }\nclass Hoja implements Nodo {\n  constructor(private v: number) {}\n  total() { return this.v; }\n}" },
        { heading: P("Recursión", "Recursion"), body: P("Un grupo calcula su `total()` sumando el de sus hijos; si un hijo es otro grupo, la recursión baja por todo el árbol.", "A group computes its `total()` by summing its children's; if a child is another group, recursion descends the whole tree."), code: "total() {\n  return this.hijos.reduce((s, h) => s + h.total(), 0);\n}" },
        { heading: P("Parte-todo uniforme", "Uniform part-whole"), body: P("Ideal para jerarquías (carpetas/archivos, menús). Operas sobre la raíz igual que sobre una hoja: una sola llamada.", "Ideal for hierarchies (folders/files, menus). You operate on the root like on a leaf: a single call."), code: "raiz.agregar(new Hoja(1)).agregar(sub);\nraiz.total();" },
      ],
      keyTakeaway: P("Composite forma un árbol parte-todo: hojas y grupos comparten interfaz y el cliente los trata igual. El grupo calcula recursivamente sobre sus hijos. Ideal para jerarquías (ficheros, menús, escenas).", "Composite forms a part-whole tree: leaves and groups share an interface and the client treats them alike. The group computes recursively over its children. Ideal for hierarchies (files, menus, scenes)."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Hoja de la Tentación", "The Leaf of Temptation"),
    lore_intro: P("Todo árbol empieza por sus hojas. Escribe la pieza simple.", "Every tree starts with its leaves. Write the simple piece."),
    challenge: {
      support_code: S_NODO,
      topic: P("La hoja", "The leaf"),
      instructions: P("Ya existe la interfaz `Nodo` con `total(): number`. Escribe la clase `Hoja` que reciba un número `v` en el constructor y cuyo `total()` devuelva `v`.", "The `Nodo` interface with `total(): number` already exists. Write class `Hoja` taking a number `v` in the constructor, whose `total()` returns `v`."),
      starter_code: "class Hoja implements Nodo {\n}\n",
      blocks: [
        "class Hoja implements Nodo {",
        "  constructor(private v: number) {}",
        "  total(): number {",
        "    return this.v;",
        "  }",
        "}",
        "    return 0;",
      ],
      hints: [P("Guarda `v` y devuélvelo en `total()`.", "Store `v` and return it in `total()`.")],
      test_cases: [
        { input: "new Hoja(5).total()", expected: 5, description: P("La hoja vale su valor", "The leaf is worth its value"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("Un grupo que reúne varias hojas y suma su total.", "A group that gathers several leaves and sums their total."),
    challenge: {
      support_code: S_NODO_H,
      topic: P("El grupo (composite)", "The group (composite)"),
      instructions: P("Ya existen `Nodo` y `Hoja`. Escribe `Grupo` que implemente `Nodo`, con `agregar(n)` que añada un hijo y `total()` que sume el `total()` de todos sus hijos.", "`Nodo` and `Hoja` already exist. Write `Grupo` implementing `Nodo`, with `agregar(n)` adding a child and `total()` summing all children's `total()`."),
      starter_code: "class Grupo implements Nodo {\n  private hijos: Nodo[] = [];\n}\n",
      blocks: [
        "class Grupo implements Nodo {",
        "  private hijos: Nodo[] = [];",
        "  agregar(n: Nodo): void { this.hijos.push(n); }",
        "  total(): number {",
        "    return this.hijos.reduce((s, h) => s + h.total(), 0);",
        "  }",
        "}",
        "    return this.hijos.length;",
      ],
      hints: [P("`agregar` apila en `this.hijos`.", "`agregar` stacks into `this.hijos`."), P("`total` suma cada `h.total()` con `reduce`.", "`total` sums each `h.total()` with `reduce`.")],
      test_cases: [
        { input: "(() => { const g = new Grupo(); g.agregar(new Hoja(3)); g.agregar(new Hoja(4)); return g.total(); })()", expected: 7, description: P("3 + 4", "3 + 4"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("Reúne toda la hueste en un grupo y suma su fuerza total.", "Gather the whole host in a group and sum its total strength."),
    challenge: {
      support_code: S_NODO_HG,
      topic: P("Construir y sumar un árbol", "Build and sum a tree"),
      instructions: P("Ya existen `Nodo`, `Hoja` y `Grupo` (con `agregar` y `total`). Escribe `ejercito(valores: number[]): number` que cree un `Grupo`, le agregue una `Hoja` por cada valor y devuelva el `total()` del grupo.", "`Nodo`, `Hoja` and `Grupo` (with `agregar` and `total`) already exist. Write `ejercito(valores: number[]): number` that creates a `Grupo`, adds one `Hoja` per value and returns the group's `total()`."),
      starter_code: "function ejercito(valores: number[]): number {\n}\n",
      blocks: [
        "function ejercito(valores: number[]): number {",
        "  const g = new Grupo();",
        "  valores.forEach((v) => g.agregar(new Hoja(v)));",
        "  return g.total();",
        "}",
        "  return valores.length;",
      ],
      hints: [P("Crea un `Grupo` y agrégale una `Hoja` por valor.", "Create a `Grupo` and add one `Hoja` per value."), P("Devuelve `g.total()`.", "Return `g.total()`.")],
      test_cases: [
        { input: "ejercito([1,2,3,4])", expected: 10, description: P("Suma de la hueste", "Sum of the host"), raw: true },
      ],
    },
  },
};

/**
 * Todas las preguntas de combate, para que las variantes por idioma reutilicen
 * las CONCEPTUALES (el patrón no cambia con el lenguaje) y sólo redefinan las
 * que dependen de la sintaxis. Ver design-patterns-*-content.ts.
 */
export const DP_Q = {
  Q_F_WHAT, Q_F_WHY, Q_F_RETURN, Q_F_OCP, Q_F_METHOD, Q_F_UNKNOWN, Q_F_CLIENT, Q_F_POLY, Q_F_CENTRAL,
  Q_S_WHAT, Q_S_SWAP, Q_S_VS_IF, Q_S_FN, Q_S_CONTEXT, Q_S_OCP, Q_S_COMPOSE, Q_S_INTER, Q_S_TEST,
  Q_O_WHAT, Q_O_DECOUPLE, Q_O_SUBSCRIBE, Q_O_NOTIFY, Q_O_MANY, Q_O_INDEP, Q_O_PUSH, Q_O_EVENTS, Q_O_ADD,
  Q_SG_WHAT, Q_SG_ACCESS, Q_SG_PRIVATE, Q_SG_LAZY, Q_SG_STATE, Q_SG_STATIC, Q_SG_WHEN, Q_SG_CONS, Q_SG_POINT,
  Q_D_WHAT, Q_D_INTERFACE, Q_D_STACK, Q_D_DELEGATE, Q_D_VS_INHERIT, Q_D_TRANSPARENT, Q_D_RUNTIME, Q_D_COMPOSE, Q_D_REAL,
  Q_A_WHAT, Q_A_WRAP, Q_A_TARGET, Q_A_TRANSLATE, Q_A_REUSE, Q_A_DELEGATION, Q_A_CONVERT, Q_A_VS_FACADE, Q_A_CLIENT,
  Q_C_WHAT, Q_C_EXECUTE, Q_C_DECOUPLE, Q_C_QUEUE, Q_C_UNDO, Q_C_INVOKER, Q_C_PARAM, Q_C_MACRO, Q_C_FIRST,
  Q_CO_WHAT, Q_CO_UNIFORM, Q_CO_RECURSION, Q_CO_ADD, Q_CO_PARTWHOLE, Q_CO_CLIENT, Q_CO_NEST, Q_CO_VS_DEC, Q_CO_LEAF,
};
