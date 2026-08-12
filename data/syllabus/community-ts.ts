import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de TypeScript para el Libro I. Reviste la MISMA narrativa compartida
 * de la Comunidad (Sombras en la Comarca) con los fundamentos de TypeScript:
 * anotaciones de tipo, primitivos, inferencia y funciones tipadas. El código
 * del jugador se TRANSPILA a JS y se ejecuta de verdad. Bilingüe ES/EN.
 */

const P = (es: string, en: string) => ({ es, en });

/** Preguntas de combate reutilizables sobre tipos en TypeScript. */
const Q_ANNOTATION = {
  question: P(
    "¿Cómo se anota el tipo de una variable en TypeScript?",
    "How do you annotate a variable's type in TypeScript?",
  ),
  options: [
    P("let edad: number = 50", "let edad: number = 50"),
    P("let number edad = 50", "let number edad = 50"),
    P("let edad = number(50)", "let edad = number(50)"),
    P("let edad as number = 50", "let edad as number = 50"),
  ],
  correct: 0,
  explanation: P(
    "El tipo va DESPUÉS del nombre, tras dos puntos: `nombre: tipo`. Es la sintaxis base de TypeScript, y funciona igual en variables, parámetros y valores de retorno.",
    "The type goes AFTER the name, following a colon: `name: type`. It's the base syntax of TypeScript, and works the same for variables, parameters and return values.",
  ),
};
const Q_PRIMITIVES = {
  question: P(
    "¿Cuáles son los tres tipos primitivos más habituales?",
    "What are the three most common primitive types?",
  ),
  options: [
    P("string, number, boolean", "string, number, boolean"),
    P("String, Int, Bool", "String, Int, Bool"),
    P("text, int, float", "text, int, float"),
    P("str, num, bit", "str, num, bit"),
  ],
  correct: 0,
  explanation: P(
    "En minúscula: `string`, `number` (no hay int/float aparte) y `boolean`. Los que empiezan por mayúscula (`String`, `Number`) son los objetos envoltorio de JS y casi nunca se usan como tipo.",
    "Lowercase: `string`, `number` (no separate int/float) and `boolean`. The capitalized ones (`String`, `Number`) are JS's wrapper objects and are almost never used as a type.",
  ),
};
const Q_INFERENCE = {
  question: P(
    "`const nombre = 'Frodo'`. ¿Qué tipo infiere TypeScript?",
    "`const nombre = 'Frodo'`. What type does TypeScript infer?",
  ),
  options: [
    P("string (lo deduce del valor, no hace falta anotarlo)", "string (it's inferred from the value, no annotation needed)"),
    P("any", "any"),
    P("object", "object"),
    P("Ninguno: hay que anotarlo siempre", "None: you must always annotate it"),
  ],
  correct: 0,
  explanation: P(
    "TypeScript INFIERE el tipo del valor inicial: aquí `string`. No hace falta anotar lo obvio; se anota sobre todo en parámetros de función y en APIs públicas.",
    "TypeScript INFERS the type from the initial value: here `string`. You don't need to annotate the obvious; you mainly annotate function parameters and public APIs.",
  ),
};
const Q_FUNC_TYPE = {
  question: P(
    "¿Cómo se tipa una función que recibe un `string` y devuelve un `string`?",
    "How do you type a function that takes a `string` and returns a `string`?",
  ),
  options: [
    P("function saludar(n: string): string { ... }", "function saludar(n: string): string { ... }"),
    P("function saludar(string n): string { ... }", "function saludar(string n): string { ... }"),
    P("function string saludar(n) { ... }", "function string saludar(n) { ... }"),
    P("function saludar(n): { ... }: string", "function saludar(n): { ... }: string"),
  ],
  correct: 0,
  explanation: P(
    "Cada parámetro lleva su tipo (`n: string`) y el tipo de retorno va tras los paréntesis, antes de las llaves (`): string`). Anotar el retorno hace que el compilador te avise si devuelves algo que no cuadra.",
    "Each parameter carries its type (`n: string`) and the return type goes after the parentheses, before the braces (`): string`). Annotating the return makes the compiler warn you if you return something that doesn't fit.",
  ),
};
const Q_UNION = {
  question: P(
    "¿Qué significa el tipo `string | number`?",
    "What does the type `string | number` mean?",
  ),
  options: [
    P("El valor puede ser un string O un number", "The value can be a string OR a number"),
    P("Un string y un number a la vez", "A string and a number at the same time"),
    P("Un array de strings y numbers", "An array of strings and numbers"),
    P("Un error de sintaxis", "A syntax error"),
  ],
  correct: 0,
  explanation: P(
    "La barra `|` forma un tipo UNIÓN: el valor es uno de esos tipos. Antes de usarlo como uno concreto, normalmente compruebas cuál es (`typeof x === 'string'`) — eso se llama reducción de tipo (narrowing).",
    "The bar `|` forms a UNION type: the value is one of those types. Before using it as a specific one, you usually check which it is (`typeof x === 'string'`) — that's called narrowing.",
  ),
};
const Q_WHY_TS = {
  question: P(
    "¿Cuál es la principal ventaja de TypeScript sobre JavaScript?",
    "What's the main advantage of TypeScript over JavaScript?",
  ),
  options: [
    P("Detecta errores de tipo ANTES de ejecutar, al compilar", "It catches type errors BEFORE running, at compile time"),
    P("Se ejecuta más rápido en el navegador", "It runs faster in the browser"),
    P("Ocupa menos memoria", "It uses less memory"),
    P("No necesita transpilarse", "It doesn't need transpiling"),
  ],
  correct: 0,
  explanation: P(
    "Los tipos se comprueban al compilar y desaparecen al transpilar: el navegador ejecuta JS puro, sin coste ni velocidad extra. La ganancia es cazar errores (un typo, un argumento cambiado) en el editor, no en producción.",
    "Types are checked at compile time and vanish on transpile: the browser runs plain JS, with no extra cost or speed. The win is catching errors (a typo, a swapped argument) in the editor, not in production.",
  ),
};
const Q_ANY = {
  question: P(
    "¿Qué hace el tipo `any`?",
    "What does the `any` type do?",
  ),
  options: [
    P("Desactiva la comprobación de tipos para ese valor", "It turns off type checking for that value"),
    P("Acepta sólo números o textos", "It accepts only numbers or text"),
    P("Es lo mismo que unknown", "It's the same as unknown"),
    P("Convierte el valor a string", "It converts the value to a string"),
  ],
  correct: 0,
  explanation: P(
    "`any` es la vía de escape: con él TypeScript deja de comprobar y vuelves a JS sin red. Úsalo lo mínimo — cada `any` es un agujero por donde se cuelan los errores que TS debía atrapar.",
    "`any` is the escape hatch: with it TypeScript stops checking and you're back to JS with no safety net. Use it as little as possible — each `any` is a hole where the errors TS should catch slip through.",
  ),
};

/** Capítulo 1 · TypeScript desde cero: tipos, anotaciones e inferencia. */
const Q_VOID = {
  question: P("¿Qué significa el tipo de retorno `: void` en una función?", "What does the return type `: void` mean on a function?"),
  options: [
    P("Que la función NO devuelve nada útil", "That the function returns nothing useful"),
    P("Que devuelve null", "That it returns null"),
    P("Que devuelve un vacío `[]`", "That it returns an empty `[]`"),
    P("Que no tiene parámetros", "That it has no parameters"),
  ],
  correct: 0,
  explanation: P(
    "`void` marca funciones que se ejecutan por su EFECTO, no por su valor (como registrar algo). Devuelven `undefined`; anotarlo lo deja claro.",
    "`void` marks functions run for their SIDE EFFECT, not their value (like logging). They return `undefined`; annotating it makes that clear.",
  ),
};
const Q_NULL_UNDEF = {
  question: P("¿Cómo declaras que un valor puede ser un `string` o faltar?", "How do you declare that a value can be a `string` or be missing?"),
  options: [
    P("string | undefined  (o string | null)", "string | undefined  (or string | null)"),
    P("string?", "string?"),
    P("optional string", "optional string"),
    P("string | void", "string | void"),
  ],
  correct: 0,
  explanation: P(
    "La ausencia se modela con una unión: `string | undefined`. Con `strictNullChecks`, TS te OBLIGA a comprobar antes de usarlo, evitando el clásico error de `undefined`.",
    "Absence is modeled with a union: `string | undefined`. With `strictNullChecks`, TS FORCES you to check before using it, avoiding the classic `undefined` error.",
  ),
};

export const SYL_TS_COMMUNITY_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_ANNOTATION, Q_PRIMITIVES, Q_INFERENCE] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_FUNC_TYPE, Q_WHY_TS, Q_UNION] },
  c1_perro_negro: { kind: "battle", questions: [Q_ANY, Q_VOID, Q_NULL_UNDEF] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl acorrala a Frodo. Sólo la VOLUNTAD lo detiene: escribe la función TIPADA que mide si resistes o sucumbes.",
      "The Nazgûl corners Frodo. Only WILL stops it: write the TYPED function that measures whether you resist or succumb.",
    ),
    challenge: {
      topic: P("Funciones tipadas y template strings", "Typed functions and template strings"),
      instructions: P(
        "Escribe `resistir(nombre: string, tentacion: number): string`:\n• si `tentacion` es 100 o más, devuelve `'{nombre} sucumbe'`,\n• si no, devuelve `'{nombre} resiste con {100 - tentacion} de voluntad'`.\n\nEjemplo: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
        "Write `resistir(nombre: string, tentacion: number): string`:\n• if `tentacion` is 100 or more, return `'{nombre} sucumbe'`,\n• otherwise, return `'{nombre} resiste con {100 - tentacion} de voluntad'`.\n\nExample: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
      ),
      starter_code: "function resistir(nombre: string, tentacion: number): string {\n}\n",
      blocks: [
        "function resistir(nombre: string, tentacion: number): string {",
        "  if (tentacion >= 100) return `${nombre} sucumbe`;",
        "  return `${nombre} resiste con ${100 - tentacion} de voluntad`;",
        "}",
        "  if (tentacion > 100) return `${nombre} sucumbe`;",
      ],
      hints: [
        P("Anota los parámetros y el retorno: `(nombre: string, tentacion: number): string`.", "Annotate the params and return: `(nombre: string, tentacion: number): string`."),
        P("Interpola con template strings: `` `${nombre} resiste con ${100 - tentacion} de voluntad` ``.", "Interpolate with template strings: `` `${nombre} resiste con ${100 - tentacion} de voluntad` ``."),
      ],
      test_cases: [
        { input: "resistir('Frodo', 30)", expected: "Frodo resiste con 70 de voluntad", description: P("Resiste", "Resists"), raw: true },
        { input: "resistir('Boromir', 100)", expected: "Boromir sucumbe", description: P("Sucumbe al llegar a 100", "Succumbs at 100"), raw: true },
        { input: "resistir('Sam', 0)", expected: "Sam resiste con 100 de voluntad", description: P("Voluntad plena", "Full will"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino del Guión Tipado", "The Scroll of the Typed Script"),
    lore_intro: P(
      "Entre los papeles del viejo Bilbo, un pergamino en una lengua nueva enseña a nombrar las cosas… y a decir de qué están hechas.",
      "Among old Bilbo's papers, a scroll in a new tongue teaches how to name things… and to say what they're made of.",
    ),
    scroll: {
      topic: P(
        "TypeScript desde cero: tipos, anotaciones e inferencia",
        "TypeScript from scratch: types, annotations and inference",
      ),
      sections: [
        {
          heading: P("Anotar el tipo: nombre: tipo", "Annotate the type: name: type" ),
          body: P(
            "TypeScript es JavaScript con tipos. El tipo va tras el nombre y dos puntos. Los primitivos, en minúscula: `string`, `number`, `boolean`.",
            "TypeScript is JavaScript with types. The type goes after the name and a colon. The primitives, lowercase: `string`, `number`, `boolean`.",
          ),
          code:
            "const nombre: string = 'Frodo';\nlet edad: number = 50;\nconst activo: boolean = true;",
        },
        {
          heading: P("Inferencia: no anotes lo obvio", "Inference: don't annotate the obvious"),
          body: P(
            "Si el valor deja claro el tipo, TypeScript lo INFIERE y no hace falta anotarlo. Se anota sobre todo en parámetros de función, donde no hay valor del que deducir.",
            "If the value makes the type clear, TypeScript INFERS it and you needn't annotate. You mainly annotate function parameters, where there's no value to deduce from.",
          ),
          code:
            "const n = 'Sam';   // TS infiere string\nlet x = 41;        // infiere number\n// x = 'hola';     // ❌ error: string no es number",
        },
        {
          heading: P("Funciones tipadas", "Typed functions"),
          body: P(
            "Cada parámetro lleva su tipo; el tipo de retorno va tras los paréntesis. Si devuelves algo que no cuadra, el compilador te avisa en el editor.",
            "Each parameter carries its type; the return type goes after the parentheses. If you return something that doesn't fit, the compiler warns you in the editor.",
          ),
          code:
            "function presentarse(nombre: string): string {\n  return `Soy ${nombre} de la Comarca`;\n}",
        },
        {
          heading: P("Uniones y any", "Unions and any"),
          body: P(
            "`string | number` es un tipo UNIÓN: uno u otro. `any` apaga la comprobación (evítalo). Los tipos desaparecen al transpilar: el navegador ejecuta JS puro.",
            "`string | number` is a UNION type: one or the other. `any` turns off checking (avoid it). Types vanish on transpile: the browser runs plain JS.",
          ),
          code:
            "let id: string | number = 42;\nid = 'A-42';          // también válido\nlet libre: any = 7;   // sin red: úsalo poco",
        },
      ],
      keyTakeaway: P(
        "El tipo va tras `: `. Anota parámetros y retornos; deja que TS infiera el resto. `|` une tipos, `any` los apaga. Al transpilar, los tipos se borran y queda JS.",
        "The type goes after `: `. Annotate parameters and returns; let TS infer the rest. `|` unites types, `any` turns them off. On transpile, types are erased and JS remains.",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing to Flee"),
    lore_intro: P(
      "Antes de partir, aprende a decir quién eres. Escribe tu primera función tipada.",
      "Before you leave, learn to say who you are. Write your first typed function.",
    ),
    challenge: {
      topic: P("Funciones tipadas y template strings", "Typed functions and template strings"),
      instructions: P(
        "Escribe `presentarse(nombre: string): string` que devuelva una template string con el formato exacto:\n\n  Soy {nombre} de la Comarca\n\nPor ejemplo, `presentarse('Frodo')` devuelve `'Soy Frodo de la Comarca'`. Anota el parámetro y el tipo de retorno.",
        "Write `presentarse(nombre: string): string` that returns a template string with the exact format:\n\n  Soy {name} de la Comarca\n\nFor example, `presentarse('Frodo')` returns `'Soy Frodo de la Comarca'`. Annotate the parameter and the return type.",
      ),
      starter_code: "function presentarse(nombre: string): string {\n}\n",
      blocks: [
        "function presentarse(nombre: string): string {",
        "  return `Soy ${nombre} de la Comarca`;",
        "}",
        '  return "Soy " + nombre;',
        "  return `${nombre} de la Comarca`;",
      ],
      hints: [
        P("El parámetro lleva su tipo: `(nombre: string)`, y el retorno tras los paréntesis: `): string`.", "The parameter carries its type: `(nombre: string)`, and the return after the parentheses: `): string`."),
        P("La variable va dentro de ${ } en una template string: `` `Soy ${nombre} de la Comarca` ``.", "The variable goes inside ${ } in a template string: `` `Soy ${nombre} de la Comarca` ``."),
      ],
      test_cases: [
        {
          input: "presentarse('Frodo')",
          expected: "Soy Frodo de la Comarca",
          description: P("El formato exacto", "The exact format"),
          raw: true,
        },
        {
          input: "presentarse('Sam')",
          expected: "Soy Sam de la Comarca",
          description: P("Con otro nombre", "With another name"),
          raw: true,
        },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P(
      "Un Jinete Negro olfatea el aire. Controla tu Sigilo con números tipados y comparaciones para pasar inadvertido.",
      "A Black Rider sniffs the air. Control your Stealth with typed numbers and comparisons to slip by unseen.",
    ),
    challenge: {
      topic: P("Tipos number y boolean", "number and boolean types"),
      instructions: P(
        "Escribe dos funciones tipadas:\n\n• `ocultar(actual: number, n: number): number` — suma `n` al sigilo `actual`, SIN pasar de 100. Usa `Math.min`.\n• `esVisible(sigilo: number, percepcion: number): boolean` — devuelve true si tu `sigilo` es MENOR que la `percepcion` del Nazgûl.",
        "Write two typed functions:\n\n• `ocultar(actual: number, n: number): number` — adds `n` to the current stealth, capped at 100. Use `Math.min`.\n• `esVisible(sigilo: number, percepcion: number): boolean` — returns true if your `sigilo` is LESS than the Nazgûl's `percepcion`.",
      ),
      starter_code: "function ocultar(actual: number, n: number): number {\n}\n\nfunction esVisible(sigilo: number, percepcion: number): boolean {\n}\n",
      blocks: [
        "function ocultar(actual: number, n: number): number {",
        "  return Math.min(100, actual + n);",
        "}",
        "function esVisible(sigilo: number, percepcion: number): boolean {",
        "  return sigilo < percepcion;",
        "}",
        "  return Math.max(100, actual + n);",
        "  return sigilo > percepcion;",
      ],
      hints: [
        P("`Math.min(100, actual + n)` nunca devuelve más de 100.", "`Math.min(100, actual + n)` never returns more than 100."),
        P("`sigilo < percepcion` ya es un `boolean`: devuélvelo.", "`sigilo < percepcion` is already a `boolean`: return it."),
      ],
      test_cases: [
        { input: "ocultar(0, 70)", expected: 70, description: P("Suma normal", "Plain sum"), raw: true },
        { input: "ocultar(70, 50)", expected: 100, description: P("70+50 se corta en 100", "70+50 caps at 100"), raw: true },
        { input: "ocultar(90, 30)", expected: 100, description: P("Nunca pasa de 100", "Never over 100"), raw: true },
        { input: "esVisible(100, 50)", expected: false, description: P("Sigilo alto: no te ve", "High stealth: unseen"), raw: true },
        { input: "esVisible(40, 120)", expected: true, description: P("Nazgûl muy perceptivo", "Very perceptive Nazgûl"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre arrays y tuplas tipados. */
const Q_ARR_TYPE = {
  question: P(
    "¿Cómo se tipa un array de números en TypeScript?",
    "How do you type an array of numbers in TypeScript?",
  ),
  options: [
    P("number[]  (o Array<number>)", "number[]  (or Array<number>)"),
    P("array<number>", "array<number>"),
    P("[number]", "[number]"),
    P("number{}", "number{}"),
  ],
  correct: 0,
  explanation: P(
    "`number[]` es la forma habitual; `Array<number>` es equivalente. Ojo: `[number]` NO es «array de números», sino una TUPLA de exactamente un número.",
    "`number[]` is the usual form; `Array<number>` is equivalent. Careful: `[number]` is NOT \"array of numbers\", but a TUPLE of exactly one number.",
  ),
};
const Q_ARR_INFER = {
  question: P(
    "`const nombres = ['Frodo', 'Sam']`. ¿Qué tipo infiere TypeScript?",
    "`const nombres = ['Frodo', 'Sam']`. What type does TypeScript infer?",
  ),
  options: [
    P("string[]", "string[]"),
    P("[string, string]", "[string, string]"),
    P("any[]", "any[]"),
    P("Array", "Array"),
  ],
  correct: 0,
  explanation: P(
    "De un array literal de strings, TS infiere `string[]` (no una tupla). Si quieres una tupla de tamaño fijo, tienes que anotarla o usar `as const`.",
    "From a string array literal, TS infers `string[]` (not a tuple). If you want a fixed-size tuple, you must annotate it or use `as const`.",
  ),
};
const Q_TUPLE = {
  question: P(
    "¿Qué describe el tipo `[number, string]`?",
    "What does the type `[number, string]` describe?",
  ),
  options: [
    P("Una tupla: un array de longitud fija con un number y luego un string", "A tuple: a fixed-length array with a number then a string"),
    P("Un array de numbers o strings", "An array of numbers or strings"),
    P("Un objeto con dos campos", "An object with two fields"),
    P("Dos variables sueltas", "Two separate variables"),
  ],
  correct: 0,
  explanation: P(
    "Una tupla fija la LONGITUD y el tipo de cada posición: `[number, string]` es exactamente dos elementos, primero number y luego string. Útil para devolver «un par» sin crear un objeto.",
    "A tuple fixes the LENGTH and the type of each position: `[number, string]` is exactly two elements, first a number then a string. Handy to return \"a pair\" without creating an object.",
  ),
};
const Q_ARR_METHOD = {
  question: P(
    "`const xs: number[] = [1, 2, 3]`. ¿Qué tipo tiene `xs.map(n => n * 2)`?",
    "`const xs: number[] = [1, 2, 3]`. What type does `xs.map(n => n * 2)` have?",
  ),
  options: [
    P("number[] (map devuelve un array nuevo del tipo que produce la función)", "number[] (map returns a new array of the type the function produces)"),
    P("number", "number"),
    P("any[]", "any[]"),
    P("void", "void"),
  ],
  correct: 0,
  explanation: P(
    "`map` conserva los tipos: sobre `number[]` con una función que devuelve number, el resultado es `number[]`. Si la función devolviera string, sería `string[]`. TS deduce el tipo de `n` (number) sin anotarlo.",
    "`map` preserves types: over `number[]` with a function returning number, the result is `number[]`. If the function returned string, it'd be `string[]`. TS infers `n`'s type (number) without annotation.",
  ),
};
const Q_READONLY_ARR = {
  question: P(
    "¿Qué garantiza el tipo `readonly number[]`?",
    "What does the type `readonly number[]` guarantee?",
  ),
  options: [
    P("Que no puedes mutar el array (ni push, ni asignar por índice)", "That you can't mutate the array (no push, no index assignment)"),
    P("Que sus números no cambian de valor", "That its numbers don't change value"),
    P("Que el array es privado", "That the array is private"),
    P("Que sólo se lee una vez", "That it's read only once"),
  ],
  correct: 0,
  explanation: P(
    "`readonly number[]` prohíbe en tiempo de compilación cualquier mutación: `push`, `pop` o `xs[0] = 9` dan error. Es útil para parámetros que no deberías modificar. Como todo tipo, desaparece al transpilar.",
    "`readonly number[]` forbids any mutation at compile time: `push`, `pop` or `xs[0] = 9` error out. Useful for parameters you shouldn't modify. Like all types, it vanishes on transpile.",
  ),
};
const Q_MIXED_ARR = {
  question: P(
    "¿Cómo se tipa un array que puede contener strings Y numbers mezclados?",
    "How do you type an array that can contain strings AND numbers mixed?",
  ),
  options: [
    P("(string | number)[]", "(string | number)[]"),
    P("string | number[]", "string | number[]"),
    P("string[] & number[]", "string[] & number[]"),
    P("[string, number]", "[string, number]"),
  ],
  correct: 0,
  explanation: P(
    "Los paréntesis importan: `(string | number)[]` es «array de (string o number)». Sin ellos, `string | number[]` significa «un string O un array de numbers», que es otra cosa.",
    "The parentheses matter: `(string | number)[]` is \"array of (string or number)\". Without them, `string | number[]` means \"a string OR an array of numbers\", which is something else.",
  ),
};

/** Capítulo 2 · Arrays y tuplas tipados. */
const Q_ARRAY_GENERIC = {
  question: P("Además de `number[]`, ¿qué otra sintaxis declara un array de números?", "Besides `number[]`, what other syntax declares an array of numbers?"),
  options: [
    P("Array<number>", "Array<number>"),
    P("List<number>", "List<number>"),
    P("number[Array]", "number[Array]"),
    P("[number]", "[number]"),
  ],
  correct: 0,
  explanation: P(
    "`number[]` y `Array<number>` son EQUIVALENTES. La forma genérica `Array<T>` es útil cuando `T` es complejo. `[number]` NO es un array: es una tupla de un solo número.",
    "`number[]` and `Array<number>` are EQUIVALENT. The generic form `Array<T>` helps when `T` is complex. `[number]` is NOT an array: it's a tuple of a single number.",
  ),
};
const Q_TUPLE_ACCESS = {
  question: P("Con `const par: [number, string] = [1, 'a']`, ¿de qué tipo es `par[1]`?", "With `const par: [number, string] = [1, 'a']`, what type is `par[1]`?"),
  options: [
    P("string (cada posición de la tupla tiene su tipo)", "string (each tuple position has its own type)"),
    P("number", "number"),
    P("number | string", "number | string"),
    P("any", "any"),
  ],
  correct: 0,
  explanation: P(
    "En una tupla, TS sabe el tipo EXACTO de cada posición: `par[0]` es number y `par[1]` es string. También puedes desestructurar: `const [n, s] = par`.",
    "In a tuple, TS knows the EXACT type of each position: `par[0]` is number and `par[1]` is string. You can also destructure: `const [n, s] = par`.",
  ),
};
const Q_ARRAY_OF_OBJ = {
  question: P("¿Cómo se tipa un array de objetos con `nombre` y `poder`?", "How do you type an array of objects with `nombre` and `poder`?"),
  options: [
    P("{ nombre: string; poder: number }[]", "{ nombre: string; poder: number }[]"),
    P("[nombre: string, poder: number]", "[nombre: string, poder: number]"),
    P("Array{ nombre, poder }", "Array{ nombre, poder }"),
    P("object[]", "object[]"),
  ],
  correct: 0,
  explanation: P(
    "Pones el tipo del objeto y le añades `[]`: `{ nombre: string; poder: number }[]`. Si el objeto se repite, conviene un `type` o `interface` con nombre y usar `Guerrero[]`.",
    "You write the object type and add `[]`: `{ nombre: string; poder: number }[]`. If the object repeats, use a named `type` or `interface` and write `Guerrero[]`.",
  ),
};

export const SYL_TS_COMMUNITY_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_ARR_TYPE, Q_ARR_INFER, Q_ARR_METHOD] },
  c2_niebla: { kind: "battle", questions: [Q_TUPLE, Q_MIXED_ARR, Q_READONLY_ARR] },
  c2_sauce: { kind: "battle", questions: [Q_ARRAY_GENERIC, Q_TUPLE_ACCESS, Q_ARRAY_OF_OBJ] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza su horda. Resume el daño en un PAR tipado: cuántos golpes y el más fuerte. Una tupla lo dice todo.",
      "The Barrow-wight raises its horde. Summarize the damage in a typed PAIR: how many blows and the strongest. A tuple says it all.",
    ),
    challenge: {
      topic: P("Arrays y tuplas tipados", "Typed arrays and tuples"),
      instructions: P(
        "Escribe `resumen(danios: number[]): [number, number]` que devuelva una TUPLA con:\n• cuántos daños hay,\n• el daño MÁXIMO (0 si la lista está vacía).\n\nEjemplo: `resumen([3, 7, 2])` → `[3, 7]`.",
        "Write `resumen(danios: number[]): [number, number]` returning a TUPLE with:\n• how many damages there are,\n• the MAXIMUM damage (0 if the list is empty).\n\nExample: `resumen([3, 7, 2])` → `[3, 7]`.",
      ),
      starter_code: "function resumen(danios: number[]): [number, number] {\n}\n",
      blocks: [
        "function resumen(danios: number[]): [number, number] {",
        "  const max = danios.length === 0 ? 0 : Math.max(...danios);",
        "  return [danios.length, max];",
        "}",
        "  return [max, danios.length];",
      ],
      hints: [
        P("La longitud es `danios.length`; el máximo, un bucle que guarde el mayor.", "The length is `danios.length`; the max, a loop keeping the largest."),
        P("Devuelve la tupla: `return [danios.length, max];`.", "Return the tuple: `return [danios.length, max];`."),
      ],
      test_cases: [
        { input: "resumen([3, 7, 2])", expected: [3, 7], description: P("Cantidad y máximo", "Count and max"), raw: true },
        { input: "resumen([])", expected: [0, 0], description: P("Lista vacía", "Empty list"), raw: true },
        { input: "resumen([5])", expected: [1, 5], description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino de las Listas", "The Scroll of Lists"),
    lore_intro: P(
      "En un claro del Bosque Viejo, un pergamino enseña a nombrar no una cosa, sino MUCHAS: arrays con tipo, y tuplas de posición fija.",
      "In a clearing of the Old Forest, a scroll teaches how to name not one thing but MANY: typed arrays, and fixed-position tuples.",
    ),
    scroll: {
      topic: P("Arrays y tuplas tipados", "Typed arrays and tuples"),
      sections: [
        {
          heading: P("Arrays con tipo", "Typed arrays"),
          body: P(
            "`number[]` es un array de números; `string[]` de textos. TS lo infiere de un literal, pero lo anotas en parámetros. Los métodos conservan el tipo: `map` sobre `number[]` da otro array del tipo que produzca la función.",
            "`number[]` is an array of numbers; `string[]` of texts. TS infers it from a literal, but you annotate it in parameters. Methods preserve the type: `map` over `number[]` gives another array of whatever the function produces.",
          ),
          code:
            "const vidas: number[] = [100, 40, 5];\nconst nombres: string[] = ['Frodo', 'Sam'];\nconst dobles = vidas.map(v => v * 2); // number[]",
        },
        {
          heading: P("Tuplas: longitud y posición fijas", "Tuples: fixed length and position"),
          body: P(
            "Una tupla `[number, string]` es un array de tamaño fijo donde cada posición tiene su tipo. Perfecta para devolver «un par» sin montar un objeto.",
            "A tuple `[number, string]` is a fixed-size array where each position has its own type. Perfect to return \"a pair\" without building an object.",
          ),
          code:
            "function medir(xs: string[]): [number, string] {\n  return [xs.length, xs.join(' ')];\n}\nconst [n, texto] = medir(['a', 'b']); // n: number, texto: string",
        },
        {
          heading: P("Uniones y readonly", "Unions and readonly"),
          body: P(
            "`(string | number)[]` mezcla tipos (ojo a los paréntesis). `readonly number[]` prohíbe mutar el array: ni `push` ni asignar por índice. Ideal para parámetros que no debes tocar.",
            "`(string | number)[]` mixes types (mind the parentheses). `readonly number[]` forbids mutating the array: no `push`, no index assignment. Ideal for parameters you must not touch.",
          ),
          code:
            "const mixto: (string | number)[] = ['A', 42];\nfunction total(xs: readonly number[]): number {\n  return xs.reduce((a, b) => a + b, 0); // leer sí; mutar no\n}",
        },
      ],
      keyTakeaway: P(
        "`T[]` para listas de un tipo; `[A, B]` para tuplas de posición fija; `(A | B)[]` para mezclas; `readonly T[]` cuando no debe mutarse. Los métodos de array conservan el tipo.",
        "`T[]` for lists of one type; `[A, B]` for fixed-position tuples; `(A | B)[]` for mixes; `readonly T[]` when it mustn't mutate. Array methods preserve the type.",
      ),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre Sauce", "Old Man Willow"),
    lore_intro: P(
      "Las raíces del Sauce atrapan a los hobbits uno a uno. Recorre la lista de nombres y devuelve otra, tipada.",
      "The Willow's roots snare the hobbits one by one. Walk the list of names and return another, typed.",
    ),
    challenge: {
      topic: P("Arrays de string y map", "String arrays and map"),
      instructions: P(
        "Escribe `atrapar(nombres: string[]): string[]` que devuelva un array NUEVO con cada nombre seguido de ' queda atrapado'.\n\nEjemplo: `atrapar(['Merry'])` → `['Merry queda atrapado']`.",
        "Write `atrapar(nombres: string[]): string[]` that returns a NEW array with each name followed by ' queda atrapado'.\n\nExample: `atrapar(['Merry'])` → `['Merry queda atrapado']`.",
      ),
      starter_code: "function atrapar(nombres: string[]): string[] {\n}\n",
      blocks: [
        "function atrapar(nombres: string[]): string[] {",
        "  return nombres.map(n => `${n} queda atrapado`);",
        "}",
        "  return nombres.map(n => n);",
        "  return nombres.map(n => `${n}`);",
      ],
      hints: [
        P("`nombres.map(n => ...)` devuelve un `string[]` nuevo.", "`nombres.map(n => ...)` returns a new `string[]`."),
        P("Cada elemento: `` `${n} queda atrapado` ``.", "Each element: `` `${n} queda atrapado` ``."),
      ],
      test_cases: [
        { input: "atrapar(['Merry', 'Pippin'])", expected: ["Merry queda atrapado", "Pippin queda atrapado"], description: P("Cada nombre atrapado", "Each name snared"), raw: true },
        { input: "atrapar([])", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
        { input: "atrapar(['Frodo'])", expected: ["Frodo queda atrapado"], description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Túmulo del Espectro", "The Wight's Barrow"),
    lore_intro: P(
      "El Tumulario drena la vida de cada hobbit. Aplica el drenaje a toda la lista de vidas, sin bajar nunca de 0.",
      "The Barrow-wight drains the life of each hobbit. Apply the drain to the whole list of lives, never dropping below 0.",
    ),
    challenge: {
      topic: P("Arrays de number y clamp", "Number arrays and clamp"),
      instructions: P(
        "Escribe `drenarVarios(vidas: number[], drenaje: number): number[]` que reste `drenaje` a cada vida, sin bajar nunca de 0. Usa `Math.max`.\n\nEjemplo: `drenarVarios([100, 20, 5], 30)` → `[70, 0, 0]`.",
        "Write `drenarVarios(vidas: number[], drenaje: number): number[]` that subtracts `drenaje` from each life, never going below 0. Use `Math.max`.\n\nExample: `drenarVarios([100, 20, 5], 30)` → `[70, 0, 0]`.",
      ),
      starter_code: "function drenarVarios(vidas: number[], drenaje: number): number[] {\n}\n",
      blocks: [
        "function drenarVarios(vidas: number[], drenaje: number): number[] {",
        "  return vidas.map(v => Math.max(0, v - drenaje));",
        "}",
        "  return vidas.map(v => v - drenaje);",
        "  return vidas.map(v => Math.min(0, v - drenaje));",
      ],
      hints: [
        P("`vidas.map(v => Math.max(0, v - drenaje))`.", "`vidas.map(v => Math.max(0, v - drenaje))`."),
        P("`Math.max(0, ...)` evita los negativos.", "`Math.max(0, ...)` avoids negatives."),
      ],
      test_cases: [
        { input: "drenarVarios([100, 20, 5], 30)", expected: [70, 0, 0], description: P("Resta acotada a 0", "Subtraction clamped at 0"), raw: true },
        { input: "drenarVarios([50], 10)", expected: [40], description: P("Una sola vida", "A single life"), raw: true },
        { input: "drenarVarios([], 10)", expected: [], description: P("Sin vidas", "No lives"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Tom Bombadil", "Tom Bombadil's Song"),
    lore_intro: P(
      "El canto de Tom rompe el hechizo. Resume los versos en un par: cuántos son y el canto entero. Una tupla lo dice todo.",
      "Tom's song breaks the spell. Summarize the verses in a pair: how many there are and the whole song. A tuple says it all.",
    ),
    challenge: {
      topic: P("Tuplas [number, string]", "Tuples [number, string]"),
      instructions: P(
        "Escribe `resumen(versos: string[]): [number, string]` que devuelva una TUPLA con:\n• cuántos versos hay,\n• todos los versos unidos por un espacio.\n\nEjemplo: `resumen(['ho', 'hey'])` → `[2, 'ho hey']`.",
        "Write `resumen(versos: string[]): [number, string]` that returns a TUPLE with:\n• how many verses there are,\n• all verses joined by a space.\n\nExample: `resumen(['ho', 'hey'])` → `[2, 'ho hey']`.",
      ),
      starter_code: "function resumen(versos: string[]): [number, string] {\n}\n",
      blocks: [
        "function resumen(versos: string[]): [number, string] {",
        "  return [versos.length, versos.join(' ')];",
        "}",
        "  return [versos.join(' '), versos.length];",
        "  return [versos.length, versos.join('')];",
      ],
      hints: [
        P("`versos.length` da la cantidad; `versos.join(' ')` los une.", "`versos.length` gives the count; `versos.join(' ')` joins them."),
        P("Devuelve las dos cosas como tupla: `return [versos.length, versos.join(' ')];`.", "Return both as a tuple: `return [versos.length, versos.join(' ')];`."),
      ],
      test_cases: [
        { input: "resumen(['ho', 'hey'])", expected: [2, "ho hey"], description: P("Cantidad y canto", "Count and song"), raw: true },
        { input: "resumen([])", expected: [0, ""], description: P("Sin versos", "No verses"), raw: true },
        { input: "resumen(['solo'])", expected: [1, "solo"], description: P("Un verso", "One verse"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre interfaces y tipos de objeto. */
const Q_INTERFACE = {
  question: P(
    "¿Para qué sirve una `interface` en TypeScript?",
    "What is an `interface` for in TypeScript?",
  ),
  options: [
    P("Describe la FORMA de un objeto: qué propiedades y tipos tiene", "It describes the SHAPE of an object: what properties and types it has"),
    P("Crea un objeto con valores por defecto", "It creates an object with default values"),
    P("Ejecuta código al instanciar", "It runs code on instantiation"),
    P("Es lo mismo que una clase", "It's the same as a class"),
  ],
  correct: 0,
  explanation: P(
    "Una interfaz es sólo un CONTRATO de forma: dice qué campos y métodos debe tener un objeto, sin aportar código ni valores. Como todo lo de tipos, desaparece al transpilar.",
    "An interface is only a SHAPE contract: it says what fields and methods an object must have, without providing code or values. Like everything type-related, it vanishes on transpile.",
  ),
};
const Q_OBJ_TYPE = {
  question: P(
    "¿Cómo se anota un parámetro que es un objeto con `nombre: string` y `edad: number`?",
    "How do you annotate a parameter that is an object with `nombre: string` and `edad: number`?",
  ),
  options: [
    P("(h: { nombre: string; edad: number })", "(h: { nombre: string; edad: number })"),
    P("(h: object)", "(h: object)"),
    P("(h: [string, number])", "(h: [string, number])"),
    P("(h: {string, number})", "(h: {string, number})"),
  ],
  correct: 0,
  explanation: P(
    "Puedes escribir el tipo del objeto en línea entre llaves, con cada campo y su tipo. `object` a secas apenas dice nada (no conoce los campos); una tupla `[string, number]` es un array, no un objeto con nombres.",
    "You can write the object type inline in braces, with each field and its type. Plain `object` says almost nothing (it doesn't know the fields); a tuple `[string, number]` is an array, not an object with names.",
  ),
};
const Q_OPTIONAL = {
  question: P(
    "En `interface Arma { nombre: string; encantada?: boolean }`, ¿qué significa el `?`?",
    "In `interface Arma { nombre: string; encantada?: boolean }`, what does the `?` mean?",
  ),
  options: [
    P("La propiedad es OPCIONAL: puede faltar", "The property is OPTIONAL: it may be absent"),
    P("La propiedad es booleana", "The property is boolean"),
    P("La propiedad es privada", "The property is private"),
    P("La propiedad es de sólo lectura", "The property is read-only"),
  ],
  correct: 0,
  explanation: P(
    "El `?` marca la propiedad como opcional: un objeto válido puede tenerla o no. Al leerla, su tipo es `boolean | undefined`, así que conviene comprobarla antes de usarla.",
    "The `?` marks the property as optional: a valid object may or may not have it. When you read it, its type is `boolean | undefined`, so you should check it before using it.",
  ),
};
const Q_TYPE_ALIAS = {
  question: P(
    "¿Qué diferencia práctica hay entre `interface` y `type` para describir un objeto?",
    "What's the practical difference between `interface` and `type` for describing an object?",
  ),
  options: [
    P("Casi ninguna para objetos; type además nombra uniones y tuplas", "Almost none for objects; type also names unions and tuples"),
    P("type no puede describir objetos", "type can't describe objects"),
    P("interface se ejecuta y type no", "interface runs and type doesn't"),
    P("Son incompatibles entre sí", "They're incompatible with each other"),
  ],
  correct: 0,
  explanation: P(
    "Para la forma de un objeto son casi intercambiables. `type` es más general (nombra uniones, tuplas, primitivos: `type Id = string | number`); `interface` se especializa en objetos y admite fusión de declaraciones. Elige uno y sé consistente.",
    "For an object's shape they're nearly interchangeable. `type` is more general (names unions, tuples, primitives: `type Id = string | number`); `interface` specializes in objects and allows declaration merging. Pick one and be consistent.",
  ),
};
const Q_METHOD_SIG = {
  question: P(
    "¿Cómo se declara en una interfaz un método `atacar` que devuelve `number`?",
    "How do you declare in an interface a method `atacar` that returns `number`?",
  ),
  options: [
    P("atacar(): number", "atacar(): number"),
    P("atacar: number", "atacar: number"),
    P("function atacar(): number { }", "function atacar(): number { }"),
    P("atacar => number", "atacar => number"),
  ],
  correct: 0,
  explanation: P(
    "En una interfaz sólo va la FIRMA, sin cuerpo: `atacar(): number`. `atacar: number` sería una propiedad numérica, no un método. El cuerpo lo pone el objeto o la clase que cumpla la interfaz.",
    "In an interface only the SIGNATURE goes, with no body: `atacar(): number`. `atacar: number` would be a numeric property, not a method. The body is provided by the object or class that fulfills the interface.",
  ),
};
const Q_STRUCTURAL = {
  question: P(
    "Una función espera un `{ nombre: string }`. Le pasas `{ nombre: 'Sam', edad: 38 }`. ¿Qué ocurre?",
    "A function expects `{ nombre: string }`. You pass `{ nombre: 'Sam', edad: 38 }`. What happens?",
  ),
  options: [
    P("Vale: TS es estructural, basta con que tenga (al menos) los campos pedidos", "Fine: TS is structural, it just needs (at least) the required fields"),
    P("Error: sobran campos", "Error: too many fields"),
    P("Error: hay que declarar una interfaz primero", "Error: you must declare an interface first"),
    P("Se ignoran los dos campos", "Both fields are ignored"),
  ],
  correct: 0,
  explanation: P(
    "TypeScript usa tipado ESTRUCTURAL: importa la forma, no el nombre del tipo. Si el objeto tiene todo lo que se pide, encaja aunque traiga campos de más (salvo el chequeo extra de objetos literales pasados directamente). No hace falta declarar que «implementa» nada.",
    "TypeScript uses STRUCTURAL typing: the shape matters, not the type's name. If the object has everything required, it fits even with extra fields (except the excess-property check on object literals passed directly). No need to declare it \"implements\" anything.",
  ),
};

/** Capítulo 3 · Interfaces y tipos de objeto. */
const Q_IFACE_VS_ALIAS = {
  question: P("¿Diferencia práctica entre `interface X {}` y `type X = {}`?", "Practical difference between `interface X {}` and `type X = {}`?"),
  options: [
    P("Casi ninguna para objetos; la interface se puede REABRIR y extender, el type sirve además para uniones", "Almost none for objects; an interface can be REOPENED and extended, a type also covers unions"),
    P("El type no existe en TS", "type doesn't exist in TS"),
    P("La interface es más lenta", "interfaces are slower"),
    P("El type no admite propiedades", "type can't have properties"),
  ],
  correct: 0,
  explanation: P(
    "Para describir la forma de un objeto son intercambiables. La `interface` admite «declaration merging» (reabrirla) y `extends`; el `type` es más flexible (uniones, intersecciones, mapeados).",
    "To describe an object's shape they're interchangeable. `interface` allows declaration merging (reopening) and `extends`; `type` is more flexible (unions, intersections, mapped types).",
  ),
};
const Q_READONLY_PROP = {
  question: P("¿Qué hace `readonly` en `interface P { readonly id: number }`?", "What does `readonly` do in `interface P { readonly id: number }`?"),
  options: [
    P("La propiedad se asigna una vez y no se puede reasignar después", "The property is set once and can't be reassigned afterwards"),
    P("La oculta del exterior", "It hides it from outside"),
    P("La hace opcional", "It makes it optional"),
    P("La convierte en método", "It turns it into a method"),
  ],
  correct: 0,
  explanation: P(
    "`readonly` marca una propiedad como inmutable tras crearse: `p.id = 2` da error de compilación. Es la versión a nivel de propiedad de la inmutabilidad, sólo en tiempo de tipos.",
    "`readonly` marks a property as immutable after creation: `p.id = 2` errors at compile time. It's the property-level version of immutability, at the type level only.",
  ),
};
const Q_EXTENDS_IFACE = {
  question: P("¿Qué permite `interface Guerrero extends Persona {}`?", "What does `interface Guerrero extends Persona {}` allow?"),
  options: [
    P("Que Guerrero herede las propiedades de Persona y añada las suyas", "Guerrero inherits Persona's properties and adds its own"),
    P("Que Persona use a Guerrero", "Persona uses Guerrero"),
    P("Crear una instancia de Persona", "Create a Persona instance"),
    P("Nada: las interfaces no se extienden", "Nothing: interfaces can't extend"),
  ],
  correct: 0,
  explanation: P(
    "Una interfaz puede EXTENDER otra (o varias) y reunir sus propiedades: `Guerrero` tendrá lo de `Persona` más lo suyo. Compone contratos sin repetir.",
    "An interface can EXTEND another (or several) and gather its properties: `Guerrero` will have `Persona`'s plus its own. It composes contracts without repetition.",
  ),
};

export const SYL_TS_COMMUNITY_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_INTERFACE, Q_OBJ_TYPE, Q_OPTIONAL] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_STRUCTURAL, Q_METHOD_SIG, Q_TYPE_ALIAS] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_IFACE_VS_ALIAS, Q_READONLY_PROP, Q_EXTENDS_IFACE] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "«Ningún hombre vivo puede detenerme.» Describe a los guerreros con una INTERFAZ y saca el nombre de los más fuertes.",
      "\"No living man can hinder me.\" Describe the warriors with an INTERFACE and pull the names of the strongest.",
    ),
    challenge: {
      topic: P("Interfaces y tipos de objeto", "Interfaces and object types"),
      instructions: P(
        "Declara la interfaz `Guerrero` con `nombre: string` y `poder: number`. Escribe `nombresFuertes(guerreros: Guerrero[], min: number): string[]` que devuelva SÓLO los nombres de los guerreros cuyo `poder` sea ≥ `min`, en orden.\n\nEjemplo: `nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)` → `['Aragorn']`.",
        "Declare the interface `Guerrero` with `nombre: string` and `poder: number`. Write `nombresFuertes(guerreros: Guerrero[], min: number): string[]` returning ONLY the names of warriors whose `poder` is ≥ `min`, in order.\n\nExample: `nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)` → `['Aragorn']`.",
      ),
      starter_code:
        "interface Guerrero {\n  nombre: string;\n  poder: number;\n}\n\nfunction nombresFuertes(guerreros: Guerrero[], min: number): string[] {\n}\n",
      blocks: [
        "function nombresFuertes(guerreros: Guerrero[], min: number): string[] {",
        "  return guerreros.filter((g) => g.poder >= min).map((g) => g.nombre);",
        "}",
        "  return guerreros.filter((g) => g.poder >= min);",
      ],
      hints: [
        P("La interfaz describe la forma del objeto; el array es `Guerrero[]`.", "The interface describes the object's shape; the array is `Guerrero[]`."),
        P("Filtra y transforma: `.filter(g => g.poder >= min).map(g => g.nombre)`.", "Filter and transform: `.filter(g => g.poder >= min).map(g => g.nombre)`."),
      ],
      test_cases: [
        { input: "nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)", expected: ["Aragorn"], description: P("Sólo el fuerte", "Only the strong one"), raw: true },
        { input: "nombresFuertes([], 50)", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
        { input: "nombresFuertes([{ nombre: 'Gimli', poder: 60 }, { nombre: 'Legolas', poder: 70 }], 50)", expected: ["Gimli", "Legolas"], description: P("Ambos, en orden", "Both, in order"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de las Formas", "The Scroll of Shapes"),
    lore_intro: P(
      "En El Póney Pisador, un pergamino enseña a describir de qué está hecho un objeto antes de crearlo: interfaces.",
      "At the Prancing Pony, a scroll teaches how to describe what an object is made of before creating it: interfaces.",
    ),
    scroll: {
      topic: P("Interfaces y tipos de objeto", "Interfaces and object types"),
      sections: [
        {
          heading: P("Interfaces: la forma de un objeto", "Interfaces: the shape of an object"),
          body: P(
            "Una `interface` describe qué campos y de qué tipo tiene un objeto. No es código: es un contrato de forma que desaparece al transpilar.",
            "An `interface` describes what fields an object has and of what type. It's not code: it's a shape contract that vanishes on transpile.",
          ),
          code:
            "interface Montaraz {\n  nombre: string;\n  oficio: string;\n}\nconst t: Montaraz = { nombre: 'Trancos', oficio: 'montaraz' };",
        },
        {
          heading: P("Propiedades opcionales y métodos", "Optional properties and methods"),
          body: P(
            "Un `?` marca una propiedad opcional (puede faltar; su tipo incluye `undefined`). Un método se declara con su firma, sin cuerpo: `atacar(): number`.",
            "A `?` marks an optional property (it may be absent; its type includes `undefined`). A method is declared by its signature, with no body: `atacar(): number`.",
          ),
          code:
            "interface Arma {\n  nombre: string;\n  danio: number;\n  encantada?: boolean;   // opcional\n}",
        },
        {
          heading: P("Estructural: encaja por forma", "Structural: it fits by shape"),
          body: P(
            "TS es de tipado estructural: si un objeto tiene lo que se pide, encaja — no hace falta declarar que «implementa» la interfaz. `type` es la alternativa para nombrar también uniones y tuplas.",
            "TS is structurally typed: if an object has what's required, it fits — no need to declare it \"implements\" the interface. `type` is the alternative to also name unions and tuples.",
          ),
          code:
            "function saludar(h: { nombre: string }): string {\n  return `Hola, ${h.nombre}`;\n}\nsaludar({ nombre: 'Sam', edad: 38 }); // vale: tiene nombre\n\ntype Id = string | number;",
        },
      ],
      keyTakeaway: P(
        "`interface` describe la forma de un objeto (campos y métodos, con `?` para opcionales). TS encaja por forma, no por nombre. `type` nombra además uniones y tuplas.",
        "`interface` describes an object's shape (fields and methods, with `?` for optional). TS fits by shape, not by name. `type` also names unions and tuples.",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("Trancos, el Montaraz", "Strider the Ranger"),
    lore_intro: P(
      "Un montaraz observa desde el rincón. Descríbelo con una interfaz y fabrícalo con su forma exacta.",
      "A ranger watches from the corner. Describe him with an interface and build him in his exact shape.",
    ),
    challenge: {
      topic: P("Interfaces y objetos tipados", "Interfaces and typed objects"),
      instructions: P(
        "Declara `interface Montaraz { nombre: string; oficio: string }` y escribe `crearMontaraz(nombre: string): Montaraz` que devuelva un objeto con ese `nombre` y `oficio` siempre `'montaraz'`.\n\nEjemplo: `crearMontaraz('Trancos')` → `{ nombre: 'Trancos', oficio: 'montaraz' }`.",
        "Declare `interface Montaraz { nombre: string; oficio: string }` and write `crearMontaraz(nombre: string): Montaraz` returning an object with that `nombre` and `oficio` always `'montaraz'`.\n\nExample: `crearMontaraz('Trancos')` → `{ nombre: 'Trancos', oficio: 'montaraz' }`.",
      ),
      starter_code: "interface Montaraz {\n  nombre: string;\n  oficio: string;\n}\n\nfunction crearMontaraz(nombre: string): Montaraz {\n}\n",
      blocks: [
        "function crearMontaraz(nombre: string): Montaraz {",
        "  return { nombre, oficio: 'montaraz' };",
        "}",
        "  return { nombre, oficio: nombre };",
      ],
      hints: [
        P("Devuelve un objeto literal con los dos campos: `{ nombre, oficio: 'montaraz' }`.", "Return an object literal with both fields: `{ nombre, oficio: 'montaraz' }`."),
        P("`{ nombre }` es abreviatura de `{ nombre: nombre }`.", "`{ nombre }` is shorthand for `{ nombre: nombre }`."),
      ],
      test_cases: [
        { input: "crearMontaraz('Trancos').nombre", expected: "Trancos", description: P("El nombre recibido", "The received name"), raw: true },
        { input: "crearMontaraz('Trancos').oficio", expected: "montaraz", description: P("Oficio fijo", "Fixed occupation"), raw: true },
        { input: "crearMontaraz('Aragorn').nombre", expected: "Aragorn", description: P("Con otro nombre", "With another name"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas de los Túmulos", "The Barrow-blades"),
    lore_intro: P(
      "Algunas hojas están encantadas y otras no. Descríbelas con una propiedad opcional y muéstralas según lo tengan.",
      "Some blades are enchanted and some aren't. Describe them with an optional property and show them accordingly.",
    ),
    challenge: {
      topic: P("Propiedades opcionales", "Optional properties"),
      instructions: P(
        "Con `interface Arma { nombre: string; danio: number; encantada?: boolean }`, escribe `describir(a: Arma): string` que devuelva `'{nombre}: {danio}'`, y si `encantada` es `true`, añada ` (encantada)` al final.\n\nEjemplos: `describir({ nombre: 'Daga', danio: 5 })` → `'Daga: 5'`; con `encantada: true` → `'Hoja: 8 (encantada)'`.",
        "With `interface Arma { nombre: string; danio: number; encantada?: boolean }`, write `describir(a: Arma): string` returning `'{nombre}: {danio}'`, and if `encantada` is `true`, append ` (encantada)`.\n\nExamples: `describir({ nombre: 'Daga', danio: 5 })` → `'Daga: 5'`; with `encantada: true` → `'Hoja: 8 (encantada)'`.",
      ),
      starter_code: "interface Arma {\n  nombre: string;\n  danio: number;\n  encantada?: boolean;\n}\n\nfunction describir(a: Arma): string {\n}\n",
      blocks: [
        "function describir(a: Arma): string {",
        "  return a.encantada ? `${a.nombre}: ${a.danio} (encantada)` : `${a.nombre}: ${a.danio}`;",
        "}",
        "  return `${a.nombre}: ${a.danio}`;",
      ],
      hints: [
        P("Base: `` `${a.nombre}: ${a.danio}` ``.", "Base: `` `${a.nombre}: ${a.danio}` ``."),
        P("`a.encantada` puede ser undefined: `a.encantada ? ... : ...` lo cubre.", "`a.encantada` may be undefined: `a.encantada ? ... : ...` covers it."),
      ],
      test_cases: [
        { input: "describir({ nombre: 'Daga', danio: 5 })", expected: "Daga: 5", description: P("Sin encantar", "Not enchanted"), raw: true },
        { input: "describir({ nombre: 'Hoja', danio: 8, encantada: true })", expected: "Hoja: 8 (encantada)", description: P("Encantada", "Enchanted"), raw: true },
        { input: "describir({ nombre: 'Espada', danio: 12, encantada: false })", expected: "Espada: 12", description: P("Opcional en false", "Optional set to false"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P(
      "Cinco Jinetes suben por Amon Sûl. De una lista de jinetes tipada, encuentra al más fuerte.",
      "Five Riders climb Amon Sûl. From a typed list of riders, find the strongest.",
    ),
    challenge: {
      topic: P("Arrays de objetos (interface[])", "Arrays of objects (interface[])"),
      instructions: P(
        "Con `interface Jinete { nombre: string; fuerza: number }`, escribe `masFuerte(jinetes: Jinete[]): string` que devuelva el `nombre` del jinete con mayor `fuerza`. La lista tendrá al menos uno.\n\nEjemplo: `masFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }])` → `'B'`.",
        "With `interface Jinete { nombre: string; fuerza: number }`, write `masFuerte(jinetes: Jinete[]): string` returning the `nombre` of the rider with the highest `fuerza`. The list has at least one.\n\nExample: `masFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }])` → `'B'`.",
      ),
      starter_code: "interface Jinete {\n  nombre: string;\n  fuerza: number;\n}\n\nfunction masFuerte(jinetes: Jinete[]): string {\n}\n",
      blocks: [
        "function masFuerte(jinetes: Jinete[]): string {",
        "  return jinetes.reduce((a, b) => (b.fuerza > a.fuerza ? b : a)).nombre;",
        "}",
        "  return jinetes.reduce((a, b) => (b.fuerza < a.fuerza ? b : a)).nombre;",
      ],
      hints: [
        P("`reduce` compara pares: `(a, b) => b.fuerza > a.fuerza ? b : a`.", "`reduce` compares pairs: `(a, b) => b.fuerza > a.fuerza ? b : a`."),
        P("Al final, toma su `.nombre`.", "At the end, take its `.nombre`."),
      ],
      test_cases: [
        { input: "masFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }])", expected: "B", description: P("El más fuerte", "The strongest"), raw: true },
        { input: "masFuerte([{ nombre: 'Solo', fuerza: 1 }])", expected: "Solo", description: P("Uno solo", "Just one"), raw: true },
        { input: "masFuerte([{ nombre: 'Rey Brujo', fuerza: 9 }, { nombre: 'Khamul', fuerza: 8 }])", expected: "Rey Brujo", description: P("El primero gana el empate hacia abajo", "The first keeps the lead"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre enums y tipos literales. */
const Q_LITERAL = {
  question: P(
    "¿Qué describe el tipo `'paso' | 'trote' | 'galope'`?",
    "What does the type `'paso' | 'trote' | 'galope'` describe?",
  ),
  options: [
    P("Un valor que sólo puede ser una de esas TRES cadenas exactas", "A value that can only be one of those THREE exact strings"),
    P("Cualquier string", "Any string"),
    P("Un array de tres strings", "An array of three strings"),
    P("Tres variables", "Three variables"),
  ],
  correct: 0,
  explanation: P(
    "Es una UNIÓN de tipos literales: el valor debe ser exactamente una de esas cadenas. Si intentas `'volar'`, TS lo rechaza. Es la forma más ligera de un conjunto cerrado de opciones, sin declarar un enum.",
    "It's a UNION of literal types: the value must be exactly one of those strings. If you try `'volar'`, TS rejects it. It's the lightest form of a closed set of options, without declaring an enum.",
  ),
};
const Q_ENUM = {
  question: P(
    "¿Qué es un `enum` en TypeScript?",
    "What is an `enum` in TypeScript?",
  ),
  options: [
    P("Un conjunto de constantes con nombre que SÍ existe en tiempo de ejecución", "A named set of constants that DOES exist at runtime"),
    P("Un alias de tipo que desaparece al transpilar", "A type alias that vanishes on transpile"),
    P("Una interfaz con métodos", "An interface with methods"),
    P("Un array de números", "An array of numbers"),
  ],
  correct: 0,
  explanation: P(
    "A diferencia de los tipos (que se borran), un `enum` genera un OBJETO real en el JS transpilado. Por eso puedes recorrer sus valores en ejecución. Los enums de string (`Calmo = 'calmo'`) son los más previsibles.",
    "Unlike types (which are erased), an `enum` generates a real OBJECT in the transpiled JS. That's why you can iterate its values at runtime. String enums (`Calmo = 'calmo'`) are the most predictable.",
  ),
};
const Q_ENUM_VS_LITERAL = {
  question: P(
    "Para un conjunto cerrado de opciones, ¿cuándo basta una unión literal en vez de un enum?",
    "For a closed set of options, when does a literal union suffice instead of an enum?",
  ),
  options: [
    P("Casi siempre: es más ligera y no genera código", "Almost always: it's lighter and generates no code"),
    P("Nunca: hay que usar enum", "Never: you must use an enum"),
    P("Sólo con números", "Only with numbers"),
    P("Sólo dentro de una clase", "Only inside a class"),
  ],
  correct: 0,
  explanation: P(
    "La unión literal (`'a' | 'b'`) es puro tipo: cero coste en runtime y muy legible. El enum añade un objeto en ejecución — útil si necesitas iterar los valores o darles un nombre estable. Para lo demás, la unión suele ganar.",
    "The literal union (`'a' | 'b'`) is pure type: zero runtime cost and very readable. The enum adds a runtime object — handy if you need to iterate the values or give them a stable name. Otherwise, the union usually wins.",
  ),
};
const Q_EXHAUSTIVE = {
  question: P(
    "Con una unión literal en un `switch`, ¿qué te da cubrir TODOS los casos?",
    "With a literal union in a `switch`, what does covering ALL cases give you?",
  ),
  options: [
    P("Comprobación de exhaustividad: si añades una opción y olvidas un caso, TS avisa", "Exhaustiveness checking: if you add an option and miss a case, TS warns"),
    P("Más velocidad", "More speed"),
    P("Menos memoria", "Less memory"),
    P("Nada especial", "Nothing special"),
  ],
  correct: 0,
  explanation: P(
    "Si el tipo es una unión cerrada, TS sabe qué casos faltan. Con un `default` que asigne a una variable `never`, el compilador te avisa en cuanto amplíes la unión y olvides tratar el caso nuevo. Es una red de seguridad al refactorizar.",
    "If the type is a closed union, TS knows which cases are missing. With a `default` assigning to a `never` variable, the compiler warns you the moment you widen the union and forget to handle the new case. It's a safety net when refactoring.",
  ),
};
const Q_ENUM_NUMERIC = {
  question: P(
    "`enum Rango { Jinete = 1, Capitan = 3 }`. ¿Cuánto vale `Rango.Capitan`?",
    "`enum Rango { Jinete = 1, Capitan = 3 }`. What is `Rango.Capitan`?",
  ),
  options: [
    P("3", "3"),
    P("'Capitan'", "'Capitan'"),
    P("1", "1"),
    P("undefined", "undefined"),
  ],
  correct: 0,
  explanation: P(
    "Un enum numérico guarda el número asignado: `Rango.Capitan` es `3`. Si no asignas valores, empiezan en 0 y suben de uno en uno. Puedes usarlos como números normales (sumarlos, compararlos).",
    "A numeric enum stores the assigned number: `Rango.Capitan` is `3`. If you don't assign values, they start at 0 and increase by one. You can use them as regular numbers (add, compare).",
  ),
};

/** Capítulo 4 · Enums y tipos literales. */
const Q_STRING_ENUM = {
  question: P("¿Qué es `enum Color { Rojo = 'rojo', Azul = 'azul' }`?", "What is `enum Color { Rojo = 'rojo', Azul = 'azul' }`?"),
  options: [
    P("Un enum de STRING: cada caso tiene un valor de texto legible", "A STRING enum: each case has a readable text value"),
    P("Un objeto normal", "A plain object"),
    P("Una unión de literales", "A literal union"),
    P("Un error: los enums son numéricos", "An error: enums are numeric"),
  ],
  correct: 0,
  explanation: P(
    "Un enum respaldado por string da a cada caso un valor de texto (`Color.Rojo === 'rojo'`), más legible al depurar o serializar que los numéricos, que empiezan en 0.",
    "A string-backed enum gives each case a text value (`Color.Rojo === 'rojo'`), more readable when debugging or serializing than numeric ones, which start at 0.",
  ),
};
const Q_CONST_ENUM = {
  question: P("¿Qué hace `const enum` frente a un `enum` normal?", "What does `const enum` do vs a normal `enum`?"),
  options: [
    P("Se INLINEA en compilación: no genera objeto en el JS final", "It's INLINED at compile time: no object is generated in the final JS"),
    P("No se puede leer", "It can't be read"),
    P("Es de sólo lectura en ejecución", "It's read-only at runtime"),
    P("No existe", "It doesn't exist"),
  ],
  correct: 0,
  explanation: P(
    "Un `const enum` desaparece del JS: cada uso se sustituye por su valor literal, sin crear el objeto del enum. Más ligero, aunque con alguna limitación de herramientas.",
    "A `const enum` vanishes from the JS: each use is replaced by its literal value, without creating the enum object. Lighter, though with some tooling caveats.",
  ),
};
const Q_UNION_NARROW = {
  question: P("Con `type E = 'a' | 'b'` y `x: E`, ¿qué comprueba `if (x === 'a')`?", "With `type E = 'a' | 'b'` and `x: E`, what does `if (x === 'a')` check?"),
  options: [
    P("Estrecha `x` a `'a'` dentro del if; el resto es `'b'`", "Narrows `x` to `'a'` inside the if; the rest is `'b'`"),
    P("Nada: no se puede comparar", "Nothing: you can't compare"),
    P("Convierte x en booleano", "Turns x into a boolean"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "Comparar con un literal ESTRECHA el tipo: en la rama del `if`, TS sabe que `x` es `'a'`; en el `else`, `'b'`. Es la base del manejo exhaustivo de una unión.",
    "Comparing with a literal NARROWS the type: in the `if` branch, TS knows `x` is `'a'`; in the `else`, `'b'`. It's the basis of exhaustively handling a union.",
  ),
};
const Q_AS_CONST = {
  question: P("¿Qué hace `as const` en `const dir = 'norte' as const`?", "What does `as const` do in `const dir = 'norte' as const`?"),
  options: [
    P("Fija el tipo al LITERAL `'norte'`, no al genérico `string`", "Pins the type to the LITERAL `'norte'`, not the general `string`"),
    P("Lo convierte en constante en ejecución", "Makes it a runtime constant"),
    P("Lo hace readonly y ya", "Just makes it readonly"),
    P("Nada", "Nothing"),
  ],
  correct: 0,
  explanation: P(
    "`as const` le dice a TS que infiera el tipo más ESTRECHO posible: `'norte'` en vez de `string`. En objetos/arrays, los vuelve `readonly` y con tipos literales.",
    "`as const` tells TS to infer the NARROWEST type: `'norte'` instead of `string`. On objects/arrays, it makes them `readonly` with literal types.",
  ),
};

export const SYL_TS_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_LITERAL, Q_ENUM, Q_ENUM_VS_LITERAL] },
  c4_lobo: { kind: "battle", questions: [Q_ENUM_NUMERIC, Q_EXHAUSTIVE, Q_STRING_ENUM] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Las aguas del Bruinen se alzan. El estado del vado sólo puede ser uno de TRES: modélalo con un tipo de unión literal.",
      "The waters of the Bruinen rise. The ford's state can only be one of THREE: model it with a literal union type.",
    ),
    challenge: {
      topic: P("Tipos de unión literal", "Literal union types"),
      instructions: P(
        "Declara el tipo `Estado = 'calmo' | 'crecido' | 'desbordado'`. Escribe `estado(caudal: number): Estado` que devuelva:\n• `'calmo'` si el caudal es menor que 30,\n• `'crecido'` si es menor que 70,\n• `'desbordado'` en los demás casos.",
        "Declare the type `Estado = 'calmo' | 'crecido' | 'desbordado'`. Write `estado(caudal: number): Estado` returning:\n• `'calmo'` if the flow is under 30,\n• `'crecido'` if under 70,\n• `'desbordado'` otherwise.",
      ),
      starter_code:
        "type Estado = 'calmo' | 'crecido' | 'desbordado';\n\nfunction estado(caudal: number): Estado {\n}\n",
      blocks: [
        "function estado(caudal: number): Estado {",
        "  if (caudal < 50) return 'calmo';",
        "  if (caudal < 150) return 'crecido';",
        "  return 'desbordado';",
        "}",
        "  if (caudal < 50) return 'crecido';",
      ],
      hints: [
        P("El tipo de retorno `Estado` obliga a devolver uno de los tres literales exactos.", "The return type `Estado` forces you to return one of the three exact literals."),
        P("Dos `if` en cascada: `< 30` → calmo, `< 70` → crecido, y el resto desbordado.", "Two cascading `if`s: `< 30` → calm, `< 70` → risen, and the rest overflowing."),
      ],
      test_cases: [
        { input: "estado(10)", expected: "calmo", description: P("Caudal bajo", "Low flow"), raw: true },
        { input: "estado(50)", expected: "crecido", description: P("Caudal medio", "Medium flow"), raw: true },
        { input: "estado(200)", expected: "desbordado", description: P("El río contra los Nueve", "The river against the Nine"), raw: true },
      ],
    },
  },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_CONST_ENUM, Q_UNION_NARROW, Q_AS_CONST] },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino de los Estados Cerrados", "The Scroll of Closed States"),
    lore_intro: P(
      "Antes del Vado, un pergamino enseña a nombrar un conjunto CERRADO de posibilidades: uniones literales y enums.",
      "Before the Ford, a scroll teaches how to name a CLOSED set of possibilities: literal unions and enums.",
    ),
    scroll: {
      topic: P("Enums y tipos literales", "Enums and literal types"),
      sections: [
        {
          heading: P("Uniones literales: opciones sin coste", "Literal unions: options at no cost"),
          body: P(
            "`'paso' | 'trote' | 'galope'` es un tipo cuyo valor sólo puede ser una de esas cadenas exactas. Es puro tipo: no genera nada al transpilar y se lee de maravilla.",
            "`'paso' | 'trote' | 'galope'` is a type whose value can only be one of those exact strings. It's pure type: it generates nothing on transpile and reads beautifully.",
          ),
          code:
            "type Marcha = 'paso' | 'trote' | 'galope';\nfunction galopar(v: number): Marcha {\n  return v < 30 ? 'paso' : v < 70 ? 'trote' : 'galope';\n}",
        },
        {
          heading: P("Enums: constantes con presencia en runtime", "Enums: constants present at runtime"),
          body: P(
            "Un `enum` SÍ existe en el JS transpilado (es un objeto). Los numéricos guardan números; los de string, cadenas. Útil cuando necesitas iterar o nombrar valores de forma estable.",
            "An `enum` DOES exist in the transpiled JS (it's an object). Numeric ones store numbers; string ones store strings. Handy when you need to iterate or name values stably.",
          ),
          code:
            "enum Vado {\n  Calmo = 'calmo',\n  Crecido = 'crecido',\n  Desbordado = 'desbordado',\n}\nVado.Calmo === 'calmo'; // true",
        },
        {
          heading: P("¿Enum o unión?", "Enum or union?"),
          body: P(
            "Si sólo necesitas restringir valores, la unión literal gana: cero coste. Elige enum cuando quieras un objeto en runtime (iterar sus valores, un nombre estable). Y cubrir todos los casos de una unión te da chequeo de exhaustividad al refactorizar.",
            "If you only need to restrict values, the literal union wins: zero cost. Choose an enum when you want a runtime object (iterate its values, a stable name). And covering every case of a union gives you exhaustiveness checking when refactoring.",
          ),
          code:
            "enum Rango { Jinete = 1, Capitan = 3 }\nconst total = [Rango.Jinete, Rango.Capitan]\n  .reduce((a, r) => a + r, 0); // 4",
        },
      ],
      keyTakeaway: P(
        "Unión literal `'a' | 'b'` para opciones sin coste; `enum` cuando quieres el valor en runtime. Los enums de string son los más previsibles; los numéricos se usan como números.",
        "Literal union `'a' | 'b'` for options at no cost; `enum` when you want the value at runtime. String enums are the most predictable; numeric ones are used as numbers.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("Asfaloth, el Corcel Élfico", "Asfaloth, the Elven Steed"),
    lore_intro: P(
      "El corcel de Glorfindel tiene tres marchas, ni una más. Un tipo literal las encierra todas.",
      "Glorfindel's steed has three gaits, not one more. A literal type encloses them all.",
    ),
    challenge: {
      topic: P("Uniones literales", "Literal unions"),
      instructions: P(
        "Declara `type Marcha = 'paso' | 'trote' | 'galope'` y escribe `galopar(v: number): Marcha` que devuelva `'paso'` si `v < 30`, `'trote'` si `v < 70`, y `'galope'` en los demás casos.\n\nEjemplo: `galopar(50)` → `'trote'`.",
        "Declare `type Marcha = 'paso' | 'trote' | 'galope'` and write `galopar(v: number): Marcha` returning `'paso'` if `v < 30`, `'trote'` if `v < 70`, and `'galope'` otherwise.\n\nExample: `galopar(50)` → `'trote'`.",
      ),
      starter_code: "type Marcha = 'paso' | 'trote' | 'galope';\n\nfunction galopar(v: number): Marcha {\n}\n",
      blocks: [
        "function galopar(v: number): Marcha {",
        "  if (v < 50) return 'paso';",
        "  if (v < 150) return 'trote';",
        "  return 'galope';",
        "}",
        "  if (v < 50) return 'trote';",
      ],
      hints: [
        P("Un ternario encadenado: `v < 30 ? 'paso' : v < 70 ? 'trote' : 'galope'`.", "A chained ternary: `v < 30 ? 'paso' : v < 70 ? 'trote' : 'galope'`."),
        P("Sólo puedes devolver una de las tres cadenas del tipo Marcha.", "You can only return one of the three strings of the Marcha type."),
      ],
      test_cases: [
        { input: "galopar(10)", expected: "paso", description: P("Lento", "Slow"), raw: true },
        { input: "galopar(50)", expected: "trote", description: P("Medio", "Medium"), raw: true },
        { input: "galopar(200)", expected: "galope", description: P("A todo correr", "Full gallop"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Reckoning of the Nine"),
    lore_intro: P(
      "Cada rango de la Sombra pesa distinto. Un enum numérico les pone valor, y tú sumas la hueste.",
      "Each rank of the Shadow weighs differently. A numeric enum gives them a value, and you sum the host.",
    ),
    challenge: {
      topic: P("Enums numéricos", "Numeric enums"),
      instructions: P(
        "Declara `enum Rango { Jinete = 1, Capitan = 3 }` y escribe `contar(rangos: Rango[]): number` que devuelva la SUMA de sus valores.\n\nEjemplo: `contar([Rango.Jinete, Rango.Capitan])` → `4`.",
        "Declare `enum Rango { Jinete = 1, Capitan = 3 }` and write `contar(rangos: Rango[]): number` returning the SUM of their values.\n\nExample: `contar([Rango.Jinete, Rango.Capitan])` → `4`.",
      ),
      starter_code: "enum Rango { Jinete = 1, Capitan = 3 }\n\nfunction contar(rangos: Rango[]): number {\n}\n",
      blocks: [
        "enum Rango {",
        "  Jinete = 1,",
        "  Capitan = 3,",
        "}",
        "function contar(rangos: Rango[]): number {",
        "  return rangos.reduce((s, r) => s + r, 0);",
        "}",
        "  return rangos.length;",
      ],
      hints: [
        P("Los valores del enum son números: `rangos.reduce((a, r) => a + r, 0)`.", "The enum values are numbers: `rangos.reduce((a, r) => a + r, 0)`."),
        P("`Rango.Jinete` vale 1 y `Rango.Capitan` vale 3.", "`Rango.Jinete` is 1 and `Rango.Capitan` is 3."),
      ],
      test_cases: [
        { input: "contar([Rango.Jinete, Rango.Capitan])", expected: 4, description: P("1 + 3", "1 + 3"), raw: true },
        { input: "contar([Rango.Jinete, Rango.Jinete, Rango.Jinete])", expected: 3, description: P("Tres jinetes", "Three riders"), raw: true },
        { input: "contar([])", expected: 0, description: P("Hueste vacía", "Empty host"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P(
      "Sólo el vado en calma se puede cruzar. Una unión literal restringe los estados posibles.",
      "Only the calm ford can be crossed. A literal union restricts the possible states.",
    ),
    challenge: {
      topic: P("Parámetro de unión literal", "Literal union parameter"),
      instructions: P(
        "Escribe `esVadeable(estado: 'calmo' | 'crecido' | 'desbordado'): boolean` que devuelva `true` SÓLO si el estado es `'calmo'`.\n\nEjemplo: `esVadeable('calmo')` → `true`; `esVadeable('crecido')` → `false`.",
        "Write `esVadeable(estado: 'calmo' | 'crecido' | 'desbordado'): boolean` returning `true` ONLY if the state is `'calmo'`.\n\nExample: `esVadeable('calmo')` → `true`; `esVadeable('crecido')` → `false`.",
      ),
      starter_code: "function esVadeable(estado: 'calmo' | 'crecido' | 'desbordado'): boolean {\n}\n",
      blocks: [
        "function esVadeable(estado: 'calmo' | 'crecido' | 'desbordado'): boolean {",
        "  return estado === 'calmo';",
        "}",
        "  return estado !== 'calmo';",
      ],
      hints: [
        P("Una comparación ya es booleana: `return estado === 'calmo';`.", "A comparison is already boolean: `return estado === 'calmo';`."),
        P("El parámetro sólo acepta una de las tres cadenas.", "The parameter only accepts one of the three strings."),
      ],
      test_cases: [
        { input: "esVadeable('calmo')", expected: true, description: P("El vado en calma se cruza", "The calm ford is crossable"), raw: true },
        { input: "esVadeable('crecido')", expected: false, description: P("Crecido, no", "Risen, no"), raw: true },
        { input: "esVadeable('desbordado')", expected: false, description: P("Desbordado, tampoco", "Flooded, neither"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las runas del Vado", "The runes of the Ford"),
    lore_intro: P(
      "Tres runas, tres estados del agua. Un enum de string los nombra y clasifica según el caudal.",
      "Three runes, three states of the water. A string enum names them and classifies by flow.",
    ),
    challenge: {
      topic: P("Enums de string", "String enums"),
      instructions: P(
        "Declara `enum Vado { Calmo = 'calmo', Crecido = 'crecido', Desbordado = 'desbordado' }` y escribe `segunCaudal(caudal: number): Vado` que devuelva `Vado.Calmo` si `caudal < 30`, `Vado.Crecido` si `< 70`, y `Vado.Desbordado` en los demás casos.\n\nEjemplo: `segunCaudal(10)` → `Vado.Calmo` (valor `'calmo'`).",
        "Declare `enum Vado { Calmo = 'calmo', Crecido = 'crecido', Desbordado = 'desbordado' }` and write `segunCaudal(caudal: number): Vado` returning `Vado.Calmo` if `caudal < 30`, `Vado.Crecido` if `< 70`, and `Vado.Desbordado` otherwise.\n\nExample: `segunCaudal(10)` → `Vado.Calmo` (value `'calmo'`).",
      ),
      starter_code: "enum Vado {\n  Calmo = 'calmo',\n  Crecido = 'crecido',\n  Desbordado = 'desbordado',\n}\n\nfunction segunCaudal(caudal: number): Vado {\n}\n",
      blocks: [
        "enum Vado {",
        "  Calmo = 'calmo',",
        "  Crecido = 'crecido',",
        "  Desbordado = 'desbordado',",
        "}",
        "function segunCaudal(caudal: number): Vado {",
        "  if (caudal < 50) return Vado.Calmo;",
        "  if (caudal < 150) return Vado.Crecido;",
        "  return Vado.Desbordado;",
        "}",
        "  return Vado.Calmo;",
      ],
      hints: [
        P("Ternario encadenado devolviendo miembros del enum: `Vado.Calmo`, `Vado.Crecido`, `Vado.Desbordado`.", "Chained ternary returning enum members: `Vado.Calmo`, `Vado.Crecido`, `Vado.Desbordado`."),
        P("Un enum de string es igual a su valor: `Vado.Calmo === 'calmo'`.", "A string enum equals its value: `Vado.Calmo === 'calmo'`."),
      ],
      test_cases: [
        { input: "segunCaudal(10)", expected: "calmo", description: P("Caudal bajo", "Low flow"), raw: true },
        { input: "segunCaudal(50)", expected: "crecido", description: P("Caudal medio", "Medium flow"), raw: true },
        { input: "segunCaudal(200)", expected: "desbordado", description: P("El río contra los Nueve", "The river against the Nine"), raw: true },
        { input: "segunCaudal(10) === Vado.Calmo", expected: true, description: P("Devuelve el miembro del enum", "Returns the enum member"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre clases tipadas. */
const Q_CLASS_FIELD = {
  question: P(
    "¿Cómo se declara en una clase un campo `calor` de tipo number con valor inicial 100?",
    "How do you declare in a class a field `calor` of type number with initial value 100?",
  ),
  options: [
    P("calor: number = 100;", "calor: number = 100;"),
    P("number calor = 100;", "number calor = 100;"),
    P("let calor: number = 100;", "let calor: number = 100;"),
    P("calor = number(100);", "calor = number(100);"),
  ],
  correct: 0,
  explanation: P(
    "Dentro de una clase el campo se declara como `nombre: tipo = valor`, sin `let`/`const`. TS también infiere el tipo del valor inicial, pero anotarlo documenta la intención.",
    "Inside a class the field is declared as `name: type = value`, without `let`/`const`. TS also infers the type from the initial value, but annotating it documents intent.",
  ),
};
const Q_ACCESS = {
  question: P(
    "¿Qué hace el modificador `private` en un campo de clase de TypeScript?",
    "What does the `private` modifier do on a TypeScript class field?",
  ),
  options: [
    P("Impide acceder al campo desde fuera de la clase (en tiempo de compilación)", "It prevents accessing the field from outside the class (at compile time)"),
    P("Lo hace inmutable", "It makes it immutable"),
    P("Lo comparte entre instancias", "It shares it across instances"),
    P("Lo borra al transpilar el valor", "It deletes its value on transpile"),
  ],
  correct: 0,
  explanation: P(
    "`private` restringe el acceso a la propia clase, comprobado al COMPILAR. Como los tipos, se borra al transpilar: en el JS resultante el campo sigue siendo accesible. Para privacidad real en runtime, usa `#campo`.",
    "`private` restricts access to the class itself, checked at COMPILE time. Like types, it's erased on transpile: in the resulting JS the field is still accessible. For real runtime privacy, use `#field`.",
  ),
};
const Q_PARAM_PROP = {
  question: P(
    "¿Qué hace `constructor(public readonly nombre: string) {}`?",
    "What does `constructor(public readonly nombre: string) {}` do?",
  ),
  options: [
    P("Declara Y asigna el campo `nombre` automáticamente (propiedad de parámetro)", "It declares AND assigns the field `nombre` automatically (parameter property)"),
    P("Sólo recibe un argumento, sin guardarlo", "It only receives an argument, without storing it"),
    P("Crea una variable local `nombre`", "It creates a local variable `nombre`"),
    P("Es un error de sintaxis", "It's a syntax error"),
  ],
  correct: 0,
  explanation: P(
    "Poner un modificador (`public`/`private`/`readonly`) en un parámetro del constructor crea el campo y lo asigna solo, sin escribir `this.nombre = nombre`. Es azúcar de TypeScript que ahorra el boilerplate más repetido.",
    "Putting a modifier (`public`/`private`/`readonly`) on a constructor parameter creates the field and assigns it for you, without writing `this.nombre = nombre`. It's TypeScript sugar that saves the most repeated boilerplate.",
  ),
};
const Q_READONLY_TS = {
  question: P(
    "¿Qué garantiza `readonly` en una propiedad de clase de TypeScript?",
    "What does `readonly` guarantee on a TypeScript class property?",
  ),
  options: [
    P("Que el compilador impide reasignarla tras el constructor (no en runtime)", "That the compiler prevents reassigning it after the constructor (not at runtime)"),
    P("Que nadie puede leerla", "That no one can read it"),
    P("Que se comparte entre instancias", "That it's shared across instances"),
    P("Que lanza un error si la tocas en ejecución", "That it throws an error if you touch it at runtime"),
  ],
  correct: 0,
  explanation: P(
    "`readonly` es una comprobación de COMPILACIÓN: TS marca error si reasignas la propiedad fuera del constructor. Pero desaparece al transpilar, así que en runtime el JS no lo impide (a diferencia del `readonly` de PHP, que sí lanza).",
    "`readonly` is a COMPILE-time check: TS flags an error if you reassign the property outside the constructor. But it vanishes on transpile, so at runtime the JS doesn't prevent it (unlike PHP's `readonly`, which does throw).",
  ),
};
const Q_CLASS_IMPL = {
  question: P(
    "¿Qué significa `class Espada implements Arma`?",
    "What does `class Espada implements Arma` mean?",
  ),
  options: [
    P("Espada se compromete a tener todo lo que declara la interfaz Arma", "Espada commits to having everything the interface Arma declares"),
    P("Espada hereda el código de Arma", "Espada inherits Arma's code"),
    P("Arma es una clase base", "Arma is a base class"),
    P("Crea una instancia de Arma", "It creates an instance of Arma"),
  ],
  correct: 0,
  explanation: P(
    "`implements` obliga a la clase a cumplir la FORMA de la interfaz: si falta un método o un campo, TS avisa. No aporta código (eso es `extends`); sólo verifica el contrato. Una clase puede implementar varias interfaces.",
    "`implements` forces the class to satisfy the interface's SHAPE: if a method or field is missing, TS warns. It provides no code (that's `extends`); it only verifies the contract. A class can implement several interfaces.",
  ),
};
const Q_STATIC_TS = {
  question: P(
    "`static readonly UMBRAL = 20` dentro de una clase `Nieve`. ¿Cómo lo lees?",
    "`static readonly UMBRAL = 20` inside a class `Nieve`. How do you read it?",
  ),
  options: [
    P("Nieve.UMBRAL", "Nieve.UMBRAL"),
    P("this.UMBRAL", "this.UMBRAL"),
    P("new Nieve().UMBRAL", "new Nieve().UMBRAL"),
    P("UMBRAL", "UMBRAL"),
  ],
  correct: 0,
  explanation: P(
    "`static` pertenece a la CLASE, no a la instancia: se lee con `Nieve.UMBRAL`. `readonly` le añade que no se reasigna. Es la forma típica de una constante ligada a la clase.",
    "`static` belongs to the CLASS, not the instance: read it with `Nieve.UMBRAL`. `readonly` adds that it isn't reassigned. It's the typical form of a class-bound constant.",
  ),
};

/** Capítulo 5 · Clases tipadas: campos, readonly, acceso y propiedades de parámetro. */
const Q_CONSTRUCTOR_TS = {
  question: P("En TS, ¿cómo tipa el constructor sus parámetros?", "In TS, how does the constructor type its parameters?"),
  options: [
    P("Como cualquier función: `constructor(nombre: string, edad: number)`", "Like any function: `constructor(nombre: string, edad: number)`"),
    P("No se pueden tipar", "They can't be typed"),
    P("Con `constructor<string>`", "With `constructor<string>`"),
    P("Sólo con any", "Only with any"),
  ],
  correct: 0,
  explanation: P(
    "El `constructor` tipa sus parámetros como cualquier método. Y con modificadores (`private`, `readonly`) delante de un parámetro, además declara y asigna la propiedad de golpe (property promotion).",
    "The `constructor` types its parameters like any method. And with modifiers (`private`, `readonly`) before a parameter, it also declares and assigns the property at once (property promotion).",
  ),
};
const Q_ABSTRACT_TS = {
  question: P("¿Qué es una `abstract class` en TypeScript?", "What is an `abstract class` in TypeScript?"),
  options: [
    P("Una clase que no se puede instanciar; puede tener métodos `abstract` que las hijas implementan", "A class that can't be instantiated; it may have `abstract` methods the children implement"),
    P("Una interfaz con otro nombre", "An interface by another name"),
    P("Una clase sin propiedades", "A class with no properties"),
    P("Una clase final", "A final class"),
  ],
  correct: 0,
  explanation: P(
    "TS SÍ tiene `abstract`: la clase base no se instancia con `new`, y sus métodos `abstract` (sin cuerpo) obligan a las subclases a implementarlos. Combina base compartida + contrato.",
    "TS DOES have `abstract`: the base class isn't instantiated with `new`, and its `abstract` methods (no body) force subclasses to implement them. It combines shared base + contract.",
  ),
};
const Q_GETTER_TS = {
  question: P("¿Cómo se declara una propiedad calculada de sólo lectura en una clase TS?", "How do you declare a read-only computed property in a TS class?"),
  options: [
    P("Con un getter: `get area(): number { ... }`", "With a getter: `get area(): number { ... }`"),
    P("Con `readonly area()`", "With `readonly area()`"),
    P("Con `area: get`", "With `area: get`"),
    P("No se puede", "You can't"),
  ],
  correct: 0,
  explanation: P(
    "Un `get area()` se accede como propiedad (`obj.area`, sin paréntesis) y calcula su valor al leerlo. Con un `set` correspondiente, controlas también la escritura.",
    "A `get area()` is accessed as a property (`obj.area`, no parentheses) and computes its value on read. With a matching `set`, you also control writes.",
  ),
};

export const SYL_TS_COMMUNITY_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_CLASS_FIELD, Q_PARAM_PROP, Q_READONLY_TS] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_ACCESS, Q_STATIC_TS, Q_CLASS_IMPL] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Voluntad de Caradhras", "The Will of Caradhras"),
    lore_intro: P(
      "La montaña es el enemigo. Forja una hoja con su filo PRIVADO, que valide su forja y golpee sin dañar de menos que cero.",
      "The mountain is the enemy. Forge a blade with its PRIVATE edge, that validates its forging and strikes without dealing below zero.",
    ),
    challenge: {
      topic: P("Clases tipadas: private y validación", "Typed classes: private and validation"),
      instructions: P(
        "Crea la clase `Espada` con un campo `private filo: number`:\n• el `constructor(filo: number)` lanza un `Error` si `filo` es negativo; si no, lo guarda,\n• `getFilo(): number` devuelve el filo,\n• `golpear(objetivo: number): number` devuelve `objetivo - filo`, sin bajar de 0.\n\nEjemplo: `new Espada(10).golpear(30)` → `20`.",
        "Create the class `Espada` with a `private filo: number` field:\n• the `constructor(filo: number)` throws an `Error` if `filo` is negative; otherwise stores it,\n• `getFilo(): number` returns the edge,\n• `golpear(objetivo: number): number` returns `objetivo - filo`, never below 0.\n\nExample: `new Espada(10).golpear(30)` → `20`.",
      ),
      starter_code:
        "class Espada {\n  private filo: number;\n  constructor(filo: number) {\n  }\n  getFilo(): number {\n  }\n  golpear(objetivo: number): number {\n  }\n}\n",
      blocks: [
        "class Espada {",
        "  private filo: number;",
        "  constructor(filo: number) {",
        "    if (filo < 0) throw new Error('filo negativo');",
        "    this.filo = filo;",
        "  }",
        "  getFilo(): number {",
        "    return this.filo;",
        "  }",
        "  golpear(objetivo: number): number {",
        "    return Math.max(0, objetivo - this.filo);",
        "  }",
        "}",
        "    return Math.min(0, objetivo - this.filo);",
      ],
      hints: [
        P("Guard clause en el constructor: `if (filo < 0) throw new Error('...');`.", "Guard clause in the constructor: `if (filo < 0) throw new Error('...');`."),
        P("`golpear` no baja de 0: `Math.max(0, objetivo - this.filo)`.", "`golpear` doesn't go below 0: `Math.max(0, objetivo - this.filo)`."),
      ],
      test_cases: [
        { input: "new Espada(10).golpear(30)", expected: 20, description: P("30 − 10", "30 − 10"), raw: true },
        { input: "new Espada(10).golpear(5)", expected: 0, description: P("Nunca negativo", "Never negative"), raw: true },
        { input: "new Espada(10).getFilo()", expected: 10, description: P("El filo se lee por su método", "The edge is read via its method"), raw: true },
        { input: "(() => { try { new Espada(-1); return false; } catch (e) { return true; } })()", expected: true, description: P("Un filo negativo se rechaza", "A negative edge is rejected"), raw: true },
      ],
    },
  },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_CONSTRUCTOR_TS, Q_ABSTRACT_TS, Q_GETTER_TS] },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Hielo Tipado", "The Scroll of Typed Ice"),
    lore_intro: P(
      "Gandalf resguarda un pergamino: enseña a moldear objetos con clases donde cada campo declara su tipo, su acceso y si puede cambiar.",
      "Gandalf shelters a scroll: it teaches how to shape objects with classes where each field declares its type, its access and whether it can change.",
    ),
    scroll: {
      topic: P("Clases tipadas: campos, acceso y readonly", "Typed classes: fields, access and readonly"),
      sections: [
        {
          heading: P("Campos con tipo y modificadores", "Typed fields and modifiers"),
          body: P(
            "Dentro de una clase, cada campo declara su tipo: `calor: number = 100`. Los modificadores `public` / `private` controlan el acceso (comprobado al compilar; se borra en runtime — para privacidad real, `#campo`).",
            "Inside a class, each field declares its type: `calor: number = 100`. The `public` / `private` modifiers control access (checked at compile time; erased at runtime — for real privacy, `#field`).",
          ),
          code:
            "class Resistencia {\n  private calor: number = 100;\n  getCalor(): number { return this.calor; }\n}",
        },
        {
          heading: P("Propiedades de parámetro y readonly", "Parameter properties and readonly"),
          body: P(
            "Un modificador en un parámetro del constructor crea y asigna el campo solo, sin `this.x = x`. `readonly` impide reasignarlo tras el constructor (comprobación de compilación).",
            "A modifier on a constructor parameter creates and assigns the field for you, without `this.x = x`. `readonly` prevents reassigning it after the constructor (a compile-time check).",
          ),
          code:
            "class Provision {\n  constructor(\n    public readonly nombre: string,\n    public readonly peso: number,\n  ) {}\n}\nnew Provision('lembas', 5).nombre; // 'lembas'",
        },
        {
          heading: P("static, implements e inmutabilidad", "static, implements and immutability"),
          body: P(
            "`static readonly UMBRAL = 20` es una constante de la clase (se lee `Clase.UMBRAL`). `implements` obliga a cumplir una interfaz. Como `readonly` no protege en runtime, para «cambiar» un valor inmutable se devuelve una instancia nueva.",
            "`static readonly UMBRAL = 20` is a class constant (read as `Class.UMBRAL`). `implements` forces satisfying an interface. Since `readonly` doesn't protect at runtime, to \"change\" an immutable value you return a new instance.",
          ),
          code:
            "class Temperatura {\n  constructor(public readonly grados: number) {}\n  conMas(g: number): Temperatura {\n    return new Temperatura(this.grados + g);\n  }\n}",
        },
      ],
      keyTakeaway: P(
        "Campos con `nombre: tipo`; `public`/`private` para el acceso; propiedades de parámetro para ahorrar boilerplate; `readonly` y `private` son de compilación (para privacidad real, `#`). `static` liga a la clase; «cambiar» un inmutable = nueva instancia.",
        "Fields as `name: type`; `public`/`private` for access; parameter properties to save boilerplate; `readonly` and `private` are compile-time (for real privacy, `#`). `static` binds to the class; \"changing\" an immutable = new instance.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Poney", "Bill the Pony's Load"),
    lore_intro: P(
      "Una provisión es lo que es: su nombre y su peso se fijan al crearla. Decláralos con una propiedad de parámetro readonly.",
      "A provision is what it is: its name and weight are set on creation. Declare them with a readonly parameter property.",
    ),
    challenge: {
      topic: P("Propiedades de parámetro y readonly", "Parameter properties and readonly"),
      instructions: P(
        "Crea `class Provision` cuyo constructor use propiedades de parámetro `public readonly nombre: string` y `public readonly peso: number` (sin escribir `this.x = x`).\n\nEjemplo: `new Provision('lembas', 5).nombre` → `'lembas'`.",
        "Create `class Provision` whose constructor uses parameter properties `public readonly nombre: string` and `public readonly peso: number` (without writing `this.x = x`).\n\nExample: `new Provision('lembas', 5).nombre` → `'lembas'`.",
      ),
      starter_code: "class Provision {\n  constructor(\n  ) {}\n}\n",
      blocks: [
        "class Provision {",
        "  constructor(",
        "    public readonly nombre: string,",
        "    public readonly peso: number,",
        "  ) {}",
        "}",
        "    private readonly nombre: string,",
      ],
      hints: [
        P("Pon los modificadores en los parámetros: `constructor(public readonly nombre: string, public readonly peso: number) {}`.", "Put the modifiers on the parameters: `constructor(public readonly nombre: string, public readonly peso: number) {}`."),
        P("No necesitas cuerpo en el constructor: TS crea y asigna los campos.", "No constructor body needed: TS creates and assigns the fields."),
      ],
      test_cases: [
        { input: "new Provision('lembas', 5).nombre", expected: "lembas", description: P("El nombre queda fijado", "The name is set"), raw: true },
        { input: "new Provision('lembas', 5).peso", expected: 5, description: P("Y el peso", "And the weight"), raw: true },
        { input: "new Provision('cuerda', 2).peso", expected: 2, description: P("Con otros valores", "With other values"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Endurance"),
    lore_intro: P(
      "Vigila el calor de la Comunidad con un campo privado tipado y una constante de clase, sin bajar nunca de 0.",
      "Guard the Fellowship's warmth with a typed private field and a class constant, never dropping below 0.",
    ),
    challenge: {
      topic: P("Campos privados, static y métodos tipados", "Private fields, static and typed methods"),
      instructions: P(
        "Crea `class ResistenciaComunidad` con `static readonly UMBRAL = 20` y un campo `private calor: number = 100`. Añade:\n• `getCalor(): number`,\n• `enfriar(g: number): void` que reste sin bajar de 0 (`Math.max`),\n• `estaCongelada(): boolean` que devuelva true cuando el calor sea ≤ UMBRAL.",
        "Create `class ResistenciaComunidad` with `static readonly UMBRAL = 20` and a field `private calor: number = 100`. Add:\n• `getCalor(): number`,\n• `enfriar(g: number): void` that subtracts without going below 0 (`Math.max`),\n• `estaCongelada(): boolean` returning true when warmth is ≤ UMBRAL.",
      ),
      starter_code: "class ResistenciaComunidad {\n  static readonly UMBRAL = 20;\n  private calor: number = 100;\n\n  getCalor(): number {\n  }\n  enfriar(g: number): void {\n  }\n  estaCongelada(): boolean {\n  }\n}\n",
      blocks: [
        "class ResistenciaComunidad {",
        "  static readonly UMBRAL = 20;",
        "  private calor: number = 100;",
        "  getCalor(): number {",
        "    return this.calor;",
        "  }",
        "  enfriar(g: number): void {",
        "    this.calor = Math.max(0, this.calor - g);",
        "  }",
        "  estaCongelada(): boolean {",
        "    return this.calor <= ResistenciaComunidad.UMBRAL;",
        "  }",
        "}",
        "    this.calor -= g;",
      ],
      hints: [
        P("Resta acotada: `this.calor = Math.max(0, this.calor - g);`.", "Clamped subtraction: `this.calor = Math.max(0, this.calor - g);`."),
        P("La constante se lee por la clase: `this.calor <= ResistenciaComunidad.UMBRAL`.", "Read the constant via the class: `this.calor <= ResistenciaComunidad.UMBRAL`."),
      ],
      test_cases: [
        { input: "new ResistenciaComunidad().getCalor()", expected: 100, description: P("Empieza intacta", "Starts intact"), raw: true },
        { input: "new ResistenciaComunidad().estaCongelada()", expected: false, description: P("No congelada al inicio", "Not frozen at first"), raw: true },
        { input: "(() => { const r = new ResistenciaComunidad(); r.enfriar(50); return r.getCalor(); })()", expected: 50, description: P("Baja a 50", "Drops to 50"), raw: true },
        { input: "(() => { const r = new ResistenciaComunidad(); r.enfriar(500); return r.getCalor(); })()", expected: 0, description: P("Nunca baja de 0", "Never below 0"), raw: true },
        { input: "(() => { const r = new ResistenciaComunidad(); r.enfriar(90); return r.estaCongelada(); })()", expected: true, description: P("Con 10 (≤ 20) se congela", "At 10 (≤ 20) it freezes"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("El Umbral de la Nieve", "The Snow Threshold"),
    lore_intro: P(
      "Una medida no se altera: si el frío cambia, es OTRA medida. Un objeto de valor tipado que devuelve una instancia nueva.",
      "A measurement isn't altered: if the cold changes, it's ANOTHER measurement. A typed value object that returns a new instance.",
    ),
    challenge: {
      topic: P("Objetos de valor tipados", "Typed value objects"),
      instructions: P(
        "Crea `class Temperatura` con `public readonly grados: number` (propiedad de parámetro). El constructor debe lanzar un `Error` si `grados` está fuera de -40..40. Añade `conMas(g: number): Temperatura` que devuelva una INSTANCIA NUEVA con los grados sumados.\n\nEjemplo: `new Temperatura(-10).conMas(-5).grados` → `-15`.",
        "Create `class Temperatura` with `public readonly grados: number` (parameter property). The constructor must throw an `Error` if `grados` is outside -40..40. Add `conMas(g: number): Temperatura` returning a NEW INSTANCE with the added degrees.\n\nExample: `new Temperatura(-10).conMas(-5).grados` → `-15`.",
      ),
      starter_code: "class Temperatura {\n  constructor(public readonly grados: number) {\n  }\n  conMas(g: number): Temperatura {\n  }\n}\n",
      blocks: [
        "class Temperatura {",
        "  constructor(public readonly grados: number) {",
        "    if (grados < -50) throw new Error('demasiado fria');",
        "  }",
        "  conMas(g: number): Temperatura {",
        "    return new Temperatura(this.grados + g);",
        "  }",
        "}",
        "    return this;",
      ],
      hints: [
        P("Valida en el constructor: `if (grados < -40 || grados > 40) throw new Error('rango');`.", "Validate in the constructor: `if (grados < -40 || grados > 40) throw new Error('rango');`."),
        P("`conMas` no muta: `return new Temperatura(this.grados + g);`.", "`conMas` doesn't mutate: `return new Temperatura(this.grados + g);`."),
      ],
      test_cases: [
        { input: "new Temperatura(-10).grados", expected: -10, description: P("La de partida", "The starting one"), raw: true },
        { input: "new Temperatura(-10).conMas(-5).grados", expected: -15, description: P("Una más fría", "A colder one"), raw: true },
        { input: "(() => { const t = new Temperatura(-10); t.conMas(-5); return t.grados; })()", expected: -10, description: P("La original no cambia", "The original doesn't change"), raw: true },
        { input: "(() => { try { new Temperatura(-100); return false; } catch (e) { return true; } })()", expected: true, description: P("Rechaza fuera de rango", "Rejects out of range"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre genéricos. */
const Q_GENERIC = {
  question: P(
    "¿Qué es `<T>` en `function primero<T>(xs: T[]): T`?",
    "What is `<T>` in `function primero<T>(xs: T[]): T`?",
  ),
  options: [
    P("Un parámetro de TIPO: la función funciona con cualquier tipo y lo conserva", "A TYPE parameter: the function works with any type and preserves it"),
    P("Un valor por defecto", "A default value"),
    P("Una comparación menor-que", "A less-than comparison"),
    P("Un array vacío", "An empty array"),
  ],
  correct: 0,
  explanation: P(
    "`<T>` declara un tipo genérico: un hueco que se rellena al llamar. Aquí liga la entrada `T[]` con la salida `T`, así que `primero([1,2])` devuelve `number` y `primero(['a'])` devuelve `string`. Es reutilización SIN perder el tipo.",
    "`<T>` declares a generic type: a slot filled in at the call. Here it links the input `T[]` with the output `T`, so `primero([1,2])` returns `number` and `primero(['a'])` returns `string`. It's reuse WITHOUT losing the type.",
  ),
};
const Q_GENERIC_INFER = {
  question: P(
    "Al llamar `primero([1, 2, 3])`, ¿hace falta escribir `primero<number>(...)`?",
    "When calling `primero([1, 2, 3])`, do you need to write `primero<number>(...)`?",
  ),
  options: [
    P("No: TS INFIERE T = number del argumento", "No: TS INFERS T = number from the argument"),
    P("Sí, siempre hay que indicar el tipo", "Yes, you must always state the type"),
    P("Sólo con strings", "Only with strings"),
    P("Sólo dentro de una clase", "Only inside a class"),
  ],
  correct: 0,
  explanation: P(
    "En la mayoría de los casos TS deduce el tipo genérico del argumento, así que no hace falta anotarlo. Sólo lo indicas explícitamente (`primero<number>([])`) cuando no hay de dónde inferirlo o quieres forzarlo.",
    "In most cases TS infers the generic type from the argument, so you needn't annotate it. You only state it explicitly (`primero<number>([])`) when there's nothing to infer from or you want to force it.",
  ),
};
const Q_GENERIC_CONSTRAINT = {
  question: P(
    "¿Qué hace `<T extends { fuerza: number }>`?",
    "What does `<T extends { fuerza: number }>` do?",
  ),
  options: [
    P("Restringe T a tipos que TENGAN una propiedad `fuerza: number`", "It constrains T to types that HAVE a `fuerza: number` property"),
    P("Hace que T herede de una clase", "It makes T inherit from a class"),
    P("Convierte T en number", "It turns T into number"),
    P("Crea un array de fuerzas", "It creates an array of forces"),
  ],
  correct: 0,
  explanation: P(
    "`extends` en un genérico es una RESTRICCIÓN: T puede ser cualquier tipo siempre que tenga (al menos) esa forma. Así dentro puedes leer `x.fuerza` con seguridad, y aun así devolver el tipo concreto que te pasaron.",
    "`extends` in a generic is a CONSTRAINT: T can be any type as long as it has (at least) that shape. So inside you can safely read `x.fuerza`, and still return the concrete type you were given.",
  ),
};
const Q_GENERIC_FN = {
  question: P(
    "En `function mapear<T, U>(xs: T[], fn: (x: T) => U): U[]`, ¿qué relación hay entre T y U?",
    "In `function mapear<T, U>(xs: T[], fn: (x: T) => U): U[]`, what's the relation between T and U?",
  ),
  options: [
    P("Entran T y salen U: la función transforma un array de T en uno de U", "T goes in and U comes out: it transforms an array of T into one of U"),
    P("T y U son siempre el mismo tipo", "T and U are always the same type"),
    P("U debe ser number", "U must be number"),
    P("No pueden usarse dos genéricos", "You can't use two generics"),
  ],
  correct: 0,
  explanation: P(
    "Dos parámetros de tipo modelan una transformación: recibes `T[]` y una función `T → U`, y devuelves `U[]`. Es exactamente la firma de `Array.map`. TS deduce ambos del uso.",
    "Two type parameters model a transformation: you take `T[]` and a function `T → U`, and return `U[]`. It's exactly the signature of `Array.map`. TS infers both from usage.",
  ),
};
const Q_GENERIC_CLASS = {
  question: P(
    "¿Qué representa `class Cofre<T>`?",
    "What does `class Cofre<T>` represent?",
  ),
  options: [
    P("Una clase genérica: un Cofre<string> guarda strings, un Cofre<number> numbers", "A generic class: a Cofre<string> holds strings, a Cofre<number> numbers"),
    P("Una clase que hereda de T", "A class that inherits from T"),
    P("Una clase con un método T", "A class with a method T"),
    P("Un error: las clases no admiten <T>", "An error: classes can't take <T>"),
  ],
  correct: 0,
  explanation: P(
    "Una clase genérica parametriza su contenido: `Cofre<T>` reutiliza el mismo código para cualquier tipo, y cada instancia conserva el suyo. `new Cofre<string>()` sólo aceptará strings en sus métodos.",
    "A generic class parametrizes its content: `Cofre<T>` reuses the same code for any type, and each instance keeps its own. `new Cofre<string>()` will only accept strings in its methods.",
  ),
};
const Q_WHY_GENERIC = {
  question: P(
    "¿Por qué un genérico es mejor que usar `any` para una función reutilizable?",
    "Why is a generic better than using `any` for a reusable function?",
  ),
  options: [
    P("El genérico CONSERVA el tipo de entrada a la salida; `any` lo pierde", "The generic PRESERVES the input type at the output; `any` loses it"),
    P("El genérico es más rápido", "The generic is faster"),
    P("`any` no compila", "`any` doesn't compile"),
    P("No hay diferencia", "There's no difference"),
  ],
  correct: 0,
  explanation: P(
    "Con `any`, `primero(['a'])` devolvería `any` y perderías el autocompletado y los errores. Con `<T>`, devuelve `string`: mantienes toda la información de tipos a lo largo de la llamada. Genéricos = reutilización con tipos intactos.",
    "With `any`, `primero(['a'])` would return `any` and you'd lose autocomplete and error checks. With `<T>`, it returns `string`: you keep all type information through the call. Generics = reuse with types intact.",
  ),
};

/** Capítulo 6 · Genéricos. */
const Q_GENERIC_MULTIPLE = {
  question: P("¿Qué significan los DOS parámetros de `function f<T, U>(x: T): U`?", "What do the TWO parameters mean in `function f<T, U>(x: T): U`?"),
  options: [
    P("Dos tipos independientes: T la entrada y U la salida, resueltos por separado", "Two independent types: T the input and U the output, resolved separately"),
    P("Que T y U son iguales", "That T and U are the same"),
    P("Que hay dos funciones", "That there are two functions"),
    P("Un error: sólo se permite un tipo", "An error: only one type is allowed"),
  ],
  correct: 0,
  explanation: P(
    "Puedes declarar varios parámetros de tipo. `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` relaciona entrada y salida sin fijarlas: cada llamada las concreta.",
    "You can declare several type parameters. `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` relates input and output without fixing them: each call resolves them.",
  ),
};
const Q_GENERIC_DEFAULT = {
  question: P("¿Qué hace `T = string` en `class Caja<T = string> {}`?", "What does `T = string` do in `class Caja<T = string> {}`?"),
  options: [
    P("Da a T un tipo POR DEFECTO si no se especifica", "Gives T a DEFAULT type if none is specified"),
    P("Obliga a que T sea string", "Forces T to be string"),
    P("Convierte T en string siempre", "Always turns T into string"),
    P("Es un error", "It's an error"),
  ],
  correct: 0,
  explanation: P(
    "Un valor por defecto para el parámetro de tipo: `new Caja()` usa `string`, pero `new Caja<number>()` lo cambia. Cómodo cuando hay un tipo habitual.",
    "A default for the type parameter: `new Caja()` uses `string`, but `new Caja<number>()` changes it. Handy when there's a common type.",
  ),
};
const Q_GENERIC_ARRAY = {
  question: P("En `function primero<T>(xs: T[]): T`, ¿qué relaciona el genérico?", "In `function primero<T>(xs: T[]): T`, what does the generic relate?"),
  options: [
    P("El tipo del array con el del valor devuelto: mismo T", "The array's type with the returned value's: same T"),
    P("Nada, T es any", "Nothing, T is any"),
    P("Obliga a que el array sea de números", "Forces the array to be numbers"),
    P("Convierte el array en tupla", "Turns the array into a tuple"),
  ],
  correct: 0,
  explanation: P(
    "El genérico ATA el tipo: si le pasas `string[]`, devuelve `string`; si `number[]`, `number`. Sin él tendrías que devolver `any` y perderías el tipo.",
    "The generic TIES the type: pass it `string[]` and it returns `string`; pass `number[]` and it returns `number`. Without it you'd return `any` and lose the type.",
  ),
};

export const SYL_TS_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_GENERIC, Q_GENERIC_INFER, Q_WHY_GENERIC] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_GENERIC_FN, Q_GENERIC_CONSTRAINT, Q_GENERIC_CLASS] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_GENERIC_DEFAULT, Q_GENERIC_MULTIPLE, Q_GENERIC_ARRAY] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Morgoth", "The Balrog of Morgoth"),
    lore_intro: P(
      "Sombra y fuego. Forja una herramienta que sirva para CUALQUIER tipo: una función genérica que transforma una lista.",
      "Shadow and flame. Forge a tool that works for ANY type: a generic function that transforms a list.",
    ),
    challenge: {
      topic: P("Genéricos: <T, U>", "Generics: <T, U>"),
      instructions: P(
        "Escribe `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` que aplique `fn` a cada elemento y devuelva el array de resultados. Con dos parámetros de tipo, funciona con cualquier entrada y salida.\n\nEjemplo: `mapear([1, 2, 3], (n) => n * 2)` → `[2, 4, 6]`.",
        "Write `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` applying `fn` to each element and returning the array of results. With two type parameters, it works with any input and output.\n\nExample: `mapear([1, 2, 3], (n) => n * 2)` → `[2, 4, 6]`.",
      ),
      starter_code: "function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {\n}\n",
      blocks: [
        "function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {",
        "  return xs.map(fn);",
        "}",
        "  return xs;",
      ],
      hints: [
        P("`T` es el tipo de entrada y `U` el de salida; el resultado es `U[]`.", "`T` is the input type and `U` the output; the result is `U[]`."),
        P("El cuerpo es una línea: `return xs.map(fn);`.", "The body is one line: `return xs.map(fn);`."),
      ],
      test_cases: [
        { input: "mapear([1, 2, 3], (n) => n * 2)", expected: [2, 4, 6], description: P("Números a números", "Numbers to numbers"), raw: true },
        { input: "mapear(['a', 'bb'], (s) => s.length)", expected: [1, 2], description: P("Textos a longitudes: T y U distintos", "Texts to lengths: different T and U"), raw: true },
        { input: "mapear([], (x) => x)", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de los Moldes", "The Scroll of Molds"),
    lore_intro: P(
      "Ante las Puertas de Durin, un pergamino enseña a escribir código que sirve para CUALQUIER tipo sin perderlo: los genéricos.",
      "Before the Doors of Durin, a scroll teaches how to write code that works for ANY type without losing it: generics.",
    ),
    scroll: {
      topic: P("Genéricos: reutilización con tipos intactos", "Generics: reuse with types intact"),
      sections: [
        {
          heading: P("El parámetro de tipo <T>", "The type parameter <T>"),
          body: P(
            "`<T>` es un hueco de tipo que se rellena al llamar. Liga entrada y salida: `primero<T>(xs: T[]): T` devuelve el mismo tipo que contiene el array. Mejor que `any`, que lo perdería.",
            "`<T>` is a type slot filled in at the call. It links input and output: `primero<T>(xs: T[]): T` returns the same type the array holds. Better than `any`, which would lose it.",
          ),
          code:
            "function primero<T>(xs: T[]): T {\n  return xs[0];\n}\nprimero([1, 2, 3]); // number\nprimero(['a', 'b']); // string",
        },
        {
          heading: P("Varios tipos y restricciones", "Multiple types and constraints"),
          body: P(
            "Puedes usar varios (`<T, U>`) para modelar transformaciones, y restringir con `extends`: `<T extends { fuerza: number }>` exige que T tenga esa forma, para poder leer `x.fuerza` sin perder el tipo concreto.",
            "You can use several (`<T, U>`) to model transformations, and constrain with `extends`: `<T extends { fuerza: number }>` requires T to have that shape, so you can read `x.fuerza` without losing the concrete type.",
          ),
          code:
            "function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {\n  return xs.map(fn);\n}\nfunction masFuerte<T extends { fuerza: number }>(xs: T[]): T {\n  return xs.reduce((a, b) => b.fuerza > a.fuerza ? b : a);\n}",
        },
        {
          heading: P("Clases genéricas", "Generic classes"),
          body: P(
            "Una clase también puede parametrizarse: `Cofre<T>` guarda elementos de un tipo y cada instancia conserva el suyo. TS suele INFERIR los genéricos del uso, sin que tengas que anotarlos.",
            "A class can also be parametrized: `Cofre<T>` holds elements of a type and each instance keeps its own. TS usually INFERS the generics from usage, without you annotating them.",
          ),
          code:
            "class Cofre<T> {\n  private items: T[] = [];\n  guardar(x: T): this { this.items.push(x); return this; }\n  todo(): T[] { return this.items; }\n}",
        },
      ],
      keyTakeaway: P(
        "`<T>` reutiliza código conservando el tipo (a diferencia de `any`). `<T, U>` modela transformaciones; `<T extends ...>` restringe la forma; `Clase<T>` parametriza una clase. TS infiere el tipo del uso casi siempre.",
        "`<T>` reuses code while keeping the type (unlike `any`). `<T, U>` models transformations; `<T extends ...>` constrains the shape; `Class<T>` parametrizes a class. TS infers the type from usage almost always.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P(
      "La puerta acepta cualquier viajero y lo deja pasar tal como es. Escribe una función genérica que conserve el tipo.",
      "The door accepts any traveler and lets them through as they are. Write a generic function that preserves the type.",
    ),
    challenge: {
      topic: P("Función genérica <T>", "Generic function <T>"),
      instructions: P(
        "Escribe `primero<T>(xs: T[]): T` que devuelva el PRIMER elemento del array, conservando su tipo. La lista tendrá al menos uno.\n\nEjemplo: `primero([1, 2, 3])` → `1`; `primero(['a', 'b'])` → `'a'`.",
        "Write `primero<T>(xs: T[]): T` returning the FIRST element of the array, preserving its type. The list has at least one.\n\nExample: `primero([1, 2, 3])` → `1`; `primero(['a', 'b'])` → `'a'`.",
      ),
      starter_code: "function primero<T>(xs: T[]): T {\n}\n",
      blocks: [
        "function primero<T>(xs: T[]): T {",
        "  return xs[0];",
        "}",
        "  return xs[1];",
      ],
      hints: [
        P("El primer elemento es `xs[0]`.", "The first element is `xs[0]`."),
        P("`<T>` liga la entrada `T[]` con la salida `T`: no hace falta anotar el tipo al llamar.", "`<T>` links the input `T[]` with the output `T`: no need to annotate the type when calling."),
      ],
      test_cases: [
        { input: "primero([1, 2, 3])", expected: 1, description: P("Con numbers", "With numbers"), raw: true },
        { input: "primero(['a', 'b'])", expected: "a", description: P("Con strings", "With strings"), raw: true },
        { input: "primero([true, false])", expected: true, description: P("Con booleans", "With booleans"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P(
      "Transforma una hueste en otra cosa: un genérico de dos tipos convierte una lista de T en una de U.",
      "Transform a host into something else: a two-type generic turns a list of T into one of U.",
    ),
    challenge: {
      topic: P("Genéricos <T, U> y funciones", "Generics <T, U> and functions"),
      instructions: P(
        "Escribe `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` que aplique `fn` a cada elemento y devuelva el array de resultados (como `Array.map`).\n\nEjemplo: `mapear([1, 2], (n) => n * 2)` → `[2, 4]`.",
        "Write `mapear<T, U>(xs: T[], fn: (x: T) => U): U[]` applying `fn` to each element and returning the array of results (like `Array.map`).\n\nExample: `mapear([1, 2], (n) => n * 2)` → `[2, 4]`.",
      ),
      starter_code: "function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {\n}\n",
      blocks: [
        "function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {",
        "  return xs.map(fn);",
        "}",
        "  return xs.forEach(fn);",
      ],
      hints: [
        P("Es `xs.map(fn)`.", "It's `xs.map(fn)`."),
        P("T es el tipo de entrada y U el de salida; TS los deduce del uso.", "T is the input type and U the output; TS infers both from usage."),
      ],
      test_cases: [
        { input: "mapear([1, 2], (n) => n * 2)", expected: [2, 4], description: P("Números al doble", "Numbers doubled"), raw: true },
        { input: "mapear(['a', 'bb'], (s) => s.length)", expected: [1, 2], description: P("String → longitud (T≠U)", "String → length (T≠U)"), raw: true },
        { input: "mapear([], (x) => x)", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P(
      "De todo lo que cruce el puente, quédate con lo más fuerte — sea lo que sea, mientras tenga fuerza. Restringe el genérico.",
      "Of everything that crosses the bridge, keep the strongest — whatever it is, as long as it has strength. Constrain the generic.",
    ),
    challenge: {
      topic: P("Genéricos con restricción (extends)", "Constrained generics (extends)"),
      instructions: P(
        "Escribe `elMasFuerte<T extends { fuerza: number }>(xs: T[]): T` que devuelva el elemento con mayor `fuerza`, conservando su tipo concreto. La lista tendrá al menos uno.\n\nEjemplo: `elMasFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }]).nombre` → `'B'`.",
        "Write `elMasFuerte<T extends { fuerza: number }>(xs: T[]): T` returning the element with the highest `fuerza`, preserving its concrete type. The list has at least one.\n\nExample: `elMasFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }]).nombre` → `'B'`.",
      ),
      starter_code: "function elMasFuerte<T extends { fuerza: number }>(xs: T[]): T {\n}\n",
      blocks: [
        "function elMasFuerte<T extends { fuerza: number }>(xs: T[]): T {",
        "  return xs.reduce((a, b) => (b.fuerza > a.fuerza ? b : a));",
        "}",
        "  return xs.reduce((a, b) => (b.fuerza < a.fuerza ? b : a));",
      ],
      hints: [
        P("`xs.reduce((a, b) => b.fuerza > a.fuerza ? b : a)` sin valor inicial.", "`xs.reduce((a, b) => b.fuerza > a.fuerza ? b : a)` with no initial value."),
        P("La restricción `extends { fuerza: number }` te deja leer `.fuerza` con seguridad.", "The constraint `extends { fuerza: number }` lets you safely read `.fuerza`."),
      ],
      test_cases: [
        { input: "elMasFuerte([{ nombre: 'A', fuerza: 3 }, { nombre: 'B', fuerza: 9 }]).nombre", expected: "B", description: P("El más fuerte, con su tipo", "The strongest, with its type"), raw: true },
        { input: "elMasFuerte([{ nombre: 'Solo', fuerza: 1 }]).nombre", expected: "Solo", description: P("Uno solo", "Just one"), raw: true },
        { input: "elMasFuerte([{ fuerza: 5 }, { fuerza: 2 }]).fuerza", expected: 5, description: P("Funciona con cualquier forma que tenga fuerza", "Works with any shape that has fuerza"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La galería sin fin", "The endless gallery"),
    lore_intro: P(
      "Un cofre que guarda lo que le eches, del tipo que sea, sin mezclarlos. Una clase genérica lo consigue.",
      "A chest that holds whatever you put in, of any type, without mixing them. A generic class achieves it.",
    ),
    challenge: {
      topic: P("Clase genérica Cofre<T>", "Generic class Cofre<T>"),
      instructions: P(
        "Crea `class Cofre<T>` con un array privado `items: T[]`:\n• `guardar(x: T): this` — añade y devuelve `this` (fluida),\n• `todo(): T[]` — devuelve todo lo guardado.\n\nEjemplo: `new Cofre<string>().guardar('a').guardar('b').todo()` → `['a', 'b']`.",
        "Create `class Cofre<T>` with a private array `items: T[]`:\n• `guardar(x: T): this` — adds and returns `this` (fluent),\n• `todo(): T[]` — returns everything stored.\n\nExample: `new Cofre<string>().guardar('a').guardar('b').todo()` → `['a', 'b']`.",
      ),
      starter_code: "class Cofre<T> {\n  private items: T[] = [];\n\n  guardar(x: T): this {\n  }\n  todo(): T[] {\n  }\n}\n",
      blocks: [
        "class Cofre<T> {",
        "  private items: T[] = [];",
        "  guardar(x: T): this {",
        "    this.items.push(x);",
        "    return this;",
        "  }",
        "  todo(): T[] {",
        "    return this.items;",
        "  }",
        "}",
        "    return x;",
      ],
      hints: [
        P("`this.items.push(x); return this;` hace la interfaz fluida.", "`this.items.push(x); return this;` makes the fluent interface."),
        P("`todo()` devuelve `this.items`.", "`todo()` returns `this.items`."),
      ],
      test_cases: [
        { input: "new Cofre().guardar('a').guardar('b').todo()", expected: ["a", "b"], description: P("Guarda en orden", "Stores in order"), raw: true },
        { input: "new Cofre().guardar(1).guardar(2).guardar(3).todo()", expected: [1, 2, 3], description: P("Con numbers también", "With numbers too"), raw: true },
        { input: "new Cofre().todo()", expected: [], description: P("Cofre vacío", "Empty chest"), raw: true },
        { input: "new Cofre().guardar('x') instanceof Cofre", expected: true, description: P("guardar() es fluida", "guardar() is fluent"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre tipos utilitarios e intersecciones. */
const Q_INTERSECTION = {
  question: P(
    "¿Qué describe el tipo `A & B`?",
    "What does the type `A & B` describe?",
  ),
  options: [
    P("Un valor que cumple A Y B a la vez (todas las propiedades de ambos)", "A value that satisfies A AND B at once (all properties of both)"),
    P("Un valor que es A o B", "A value that is A or B"),
    P("Un array de A y B", "An array of A and B"),
    P("La parte común de A y B", "The common part of A and B"),
  ],
  correct: 0,
  explanation: P(
    "La intersección `A & B` COMBINA: el valor debe tener todo lo de A y todo lo de B. Es el opuesto de la unión `|` (que es «uno u otro»). Útil para mezclar formas: `Don & Brillo`.",
    "The intersection `A & B` COMBINES: the value must have everything from A and everything from B. It's the opposite of the union `|` (which is \"one or the other\"). Handy to merge shapes: `Don & Brillo`.",
  ),
};
const Q_PARTIAL = {
  question: P(
    "¿Qué hace `Partial<Config>`?",
    "What does `Partial<Config>` do?",
  ),
  options: [
    P("Crea un tipo como Config pero con TODAS las propiedades opcionales", "It creates a type like Config but with ALL properties optional"),
    P("Coge la mitad de las propiedades", "It takes half the properties"),
    P("Elimina las propiedades", "It removes the properties"),
    P("Hace Config de sólo lectura", "It makes Config read-only"),
  ],
  correct: 0,
  explanation: P(
    "`Partial<T>` es un tipo utilitario que vuelve opcionales todas las propiedades de T. Perfecto para «un objeto de cambios» donde sólo mandas los campos que quieres modificar, como en `{ ...base, ...cambios }`.",
    "`Partial<T>` is a utility type that makes every property of T optional. Perfect for \"a changes object\" where you only send the fields you want to modify, as in `{ ...base, ...cambios }`.",
  ),
};
const Q_UTILITY = {
  question: P(
    "¿Qué son los tipos utilitarios como `Partial`, `Pick` o `Readonly`?",
    "What are utility types like `Partial`, `Pick` or `Readonly`?",
  ),
  options: [
    P("Tipos genéricos de la librería estándar que transforman otros tipos", "Generic types from the standard library that transform other types"),
    P("Funciones que copian objetos", "Functions that copy objects"),
    P("Clases base para heredar", "Base classes to inherit from"),
    P("Métodos de los arrays", "Array methods"),
  ],
  correct: 0,
  explanation: P(
    "TypeScript trae tipos utilitarios ya hechos: `Partial<T>` (todo opcional), `Readonly<T>` (todo readonly), `Pick<T, K>` (sólo algunas claves), `Record<K, V>` (objeto de K a V). Derivan tipos nuevos a partir de otros sin reescribirlos.",
    "TypeScript ships ready-made utility types: `Partial<T>` (all optional), `Readonly<T>` (all readonly), `Pick<T, K>` (only some keys), `Record<K, V>` (object from K to V). They derive new types from others without rewriting them.",
  ),
};
const Q_PICK = {
  question: P(
    "¿Qué produce `Pick<Jinete, 'nombre'>` si `Jinete` tiene `nombre` y `fuerza`?",
    "What does `Pick<Jinete, 'nombre'>` produce if `Jinete` has `nombre` and `fuerza`?",
  ),
  options: [
    P("Un tipo con SÓLO la propiedad `nombre`", "A type with ONLY the `nombre` property"),
    P("Un tipo sin `nombre`", "A type without `nombre`"),
    P("El valor del nombre", "The name's value"),
    P("Un array de nombres", "An array of names"),
  ],
  correct: 0,
  explanation: P(
    "`Pick<T, K>` selecciona un subconjunto de propiedades: `Pick<Jinete, 'nombre'>` es `{ nombre: string }`. Su opuesto es `Omit<T, K>`, que quita las indicadas. Sirven para derivar vistas más pequeñas de un tipo grande.",
    "`Pick<T, K>` selects a subset of properties: `Pick<Jinete, 'nombre'>` is `{ nombre: string }`. Its opposite is `Omit<T, K>`, which removes the given ones. They derive smaller views of a large type.",
  ),
};
const Q_RECORD = {
  question: P(
    "¿Qué describe `Record<string, boolean>`?",
    "What does `Record<string, boolean>` describe?",
  ),
  options: [
    P("Un objeto con claves string y valores boolean", "An object with string keys and boolean values"),
    P("Un array de booleanos", "An array of booleans"),
    P("Una tupla [string, boolean]", "A tuple [string, boolean]"),
    P("Un Map nativo", "A native Map"),
  ],
  correct: 0,
  explanation: P(
    "`Record<K, V>` describe un objeto cuyas claves son de tipo K y sus valores de tipo V. `Record<string, boolean>` es un diccionario de nombre a booleano, ideal para un índice o inventario.",
    "`Record<K, V>` describes an object whose keys are of type K and values of type V. `Record<string, boolean>` is a name-to-boolean dictionary, ideal for an index or inventory.",
  ),
};
const Q_READONLY_UTIL = {
  question: P(
    "¿Qué hace `Readonly<Config>`?",
    "What does `Readonly<Config>` do?",
  ),
  options: [
    P("Crea un tipo como Config con todas sus propiedades readonly", "It creates a type like Config with all its properties readonly"),
    P("Borra Config", "It deletes Config"),
    P("Hace todas las propiedades opcionales", "It makes all properties optional"),
    P("Convierte Config en string", "It turns Config into a string"),
  ],
  correct: 0,
  explanation: P(
    "`Readonly<T>` marca todas las propiedades como `readonly`: el compilador impide reasignarlas. Como los demás utilitarios, es transformación de tipos en compilación; no cambia nada en runtime.",
    "`Readonly<T>` marks every property as `readonly`: the compiler prevents reassigning them. Like the other utilities, it's a compile-time type transformation; it changes nothing at runtime.",
  ),
};

/** Capítulo 7 · Tipos utilitarios e intersecciones. */
const Q_OMIT = {
  question: P("¿Qué es `Omit<Guerrero, 'poder'>`?", "What is `Omit<Guerrero, 'poder'>`?"),
  options: [
    P("El tipo Guerrero SIN la propiedad `poder`", "The Guerrero type WITHOUT the `poder` property"),
    P("Sólo la propiedad `poder`", "Only the `poder` property"),
    P("Guerrero con `poder` opcional", "Guerrero with optional `poder`"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "`Omit<T, K>` construye un tipo con todas las propiedades de `T` MENOS las de `K`. Es el complemento de `Pick<T, K>`, que se queda sólo con esas.",
    "`Omit<T, K>` builds a type with all of `T`'s properties EXCEPT those in `K`. It's the complement of `Pick<T, K>`, which keeps only those.",
  ),
};
const Q_REQUIRED = {
  question: P("¿Qué hace `Required<T>` sobre un tipo con propiedades opcionales?", "What does `Required<T>` do to a type with optional properties?"),
  options: [
    P("Las vuelve TODAS obligatorias (lo contrario de Partial)", "Makes them ALL required (the opposite of Partial)"),
    P("Las hace opcionales", "Makes them optional"),
    P("Las hace readonly", "Makes them readonly"),
    P("Las borra", "Deletes them"),
  ],
  correct: 0,
  explanation: P(
    "`Required<T>` quita los `?` de todas las propiedades: lo contrario de `Partial<T>`, que se los pone. Son tipos utilitarios «mapeados» que transforman otro tipo.",
    "`Required<T>` removes the `?` from all properties: the opposite of `Partial<T>`, which adds them. They're \"mapped\" utility types that transform another type.",
  ),
};
const Q_RETURNTYPE = {
  question: P("¿Qué extrae `ReturnType<typeof f>`?", "What does `ReturnType<typeof f>` extract?"),
  options: [
    P("El tipo que DEVUELVE la función `f`", "The type that function `f` RETURNS"),
    P("Los parámetros de f", "f's parameters"),
    P("El nombre de f", "f's name"),
    P("Si f es async", "Whether f is async"),
  ],
  correct: 0,
  explanation: P(
    "`ReturnType<typeof f>` te da el tipo de retorno de `f` sin escribirlo a mano; si `f` cambia, el tipo se ajusta solo. `Parameters<typeof f>` hace lo mismo con los argumentos.",
    "`ReturnType<typeof f>` gives you `f`'s return type without writing it by hand; if `f` changes, the type follows. `Parameters<typeof f>` does the same for the arguments.",
  ),
};

export const SYL_TS_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_INTERSECTION, Q_UTILITY, Q_PARTIAL] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_RECORD, Q_PICK, Q_READONLY_UTIL] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_OMIT, Q_REQUIRED, Q_RETURNTYPE] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk, capitán de Isengard", "Uglúk, captain of Isengard"),
    lore_intro: P(
      "El capitán reúne dos linajes en uno. Combina dos tipos con una INTERSECCIÓN: un guerrero es a la vez con-nombre y con-poder.",
      "The captain unites two lineages in one. Combine two types with an INTERSECTION: a warrior is both named and powered.",
    ),
    challenge: {
      topic: P("Tipos de intersección (A & B)", "Intersection types (A & B)"),
      instructions: P(
        "Declara `ConNombre = { nombre: string }` y `ConPoder = { poder: number }`. Escribe `crearGuerrero(nombre: string, poder: number): ConNombre & ConPoder` que devuelva un objeto con AMBAS propiedades.\n\nEjemplo: `crearGuerrero('Aragorn', 80).poder` → `80`.",
        "Declare `ConNombre = { nombre: string }` and `ConPoder = { poder: number }`. Write `crearGuerrero(nombre: string, poder: number): ConNombre & ConPoder` returning an object with BOTH properties.\n\nExample: `crearGuerrero('Aragorn', 80).poder` → `80`.",
      ),
      starter_code:
        "type ConNombre = { nombre: string };\ntype ConPoder = { poder: number };\n\nfunction crearGuerrero(nombre: string, poder: number): ConNombre & ConPoder {\n}\n",
      blocks: [
        "function crearGuerrero(nombre: string, poder: number): ConNombre & ConPoder {",
        "  return { nombre, poder };",
        "}",
        "  return { nombre };",
      ],
      hints: [
        P("La intersección `A & B` exige TODAS las propiedades de ambos.", "The intersection `A & B` requires ALL properties of both."),
        P("Devuelve un objeto con las dos: `return { nombre, poder };`.", "Return an object with both: `return { nombre, poder };`."),
      ],
      test_cases: [
        { input: "crearGuerrero('Aragorn', 80).nombre", expected: "Aragorn", description: P("Tiene nombre", "Has a name"), raw: true },
        { input: "crearGuerrero('Aragorn', 80).poder", expected: 80, description: P("Y poder: A & B", "And power: A & B"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de los Dones Derivados", "The Scroll of Derived Gifts"),
    lore_intro: P(
      "Galadriel entrega un pergamino: enseña a COMBINAR y DERIVAR tipos a partir de otros, sin reescribirlos — intersecciones y tipos utilitarios.",
      "Galadriel hands over a scroll: it teaches how to COMBINE and DERIVE types from others, without rewriting them — intersections and utility types.",
    ),
    scroll: {
      topic: P("Intersecciones y tipos utilitarios", "Intersections and utility types"),
      sections: [
        {
          heading: P("Intersección: combinar formas", "Intersection: combining shapes"),
          body: P(
            "`A & B` exige cumplir A Y B: el valor tiene todas las propiedades de ambos. Es lo contrario de la unión `|` («uno u otro»). Útil para fusionar capacidades en un mismo objeto.",
            "`A & B` requires satisfying A AND B: the value has all properties of both. It's the opposite of the union `|` (\"one or the other\"). Handy to merge capabilities into one object.",
          ),
          code:
            "type Don = { nombre: string };\ntype Brillo = { luz: number };\nconst frasco: Don & Brillo = { nombre: 'Frasco', luz: 5 };",
        },
        {
          heading: P("Tipos utilitarios: derivar sin reescribir", "Utility types: derive without rewriting"),
          body: P(
            "TS trae genéricos que transforman tipos: `Partial<T>` (todo opcional), `Readonly<T>`, `Pick<T, K>` (algunas claves), `Omit<T, K>`. Evitan duplicar definiciones.",
            "TS ships generics that transform types: `Partial<T>` (all optional), `Readonly<T>`, `Pick<T, K>` (some keys), `Omit<T, K>`. They avoid duplicating definitions.",
          ),
          code:
            "interface Config { camuflaje: boolean; peso: number }\nfunction conValores(base: Config, cambios: Partial<Config>): Config {\n  return { ...base, ...cambios };\n}",
        },
        {
          heading: P("Record: diccionarios tipados", "Record: typed dictionaries"),
          body: P(
            "`Record<K, V>` describe un objeto de claves K y valores V. `Record<string, boolean>` es un índice de nombre a booleano. Ideal para inventarios y mapas de presencia.",
            "`Record<K, V>` describes an object of keys K and values V. `Record<string, boolean>` is a name-to-boolean index. Ideal for inventories and presence maps.",
          ),
          code:
            "function inventario(dones: string[]): Record<string, boolean> {\n  const r: Record<string, boolean> = {};\n  for (const d of dones) r[d] = true;\n  return r;\n}",
        },
      ],
      keyTakeaway: P(
        "`A & B` combina formas (frente a `A | B`, que elige una). Los utilitarios derivan tipos: `Partial`/`Readonly`/`Pick`/`Omit`. `Record<K, V>` tipa diccionarios. Todo se borra al transpilar.",
        "`A & B` combines shapes (vs `A | B`, which picks one). Utilities derive types: `Partial`/`Readonly`/`Pick`/`Omit`. `Record<K, V>` types dictionaries. All erased on transpile.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P(
      "El frasco es un don Y una luz a la vez. Combina las dos formas con una intersección.",
      "The phial is a gift AND a light at once. Combine both shapes with an intersection.",
    ),
    challenge: {
      topic: P("Intersecciones (A & B)", "Intersections (A & B)"),
      instructions: P(
        "Con `type Don = { nombre: string }` y `type Brillo = { luz: number }`, escribe `forjar(nombre: string, luz: number): Don & Brillo` que devuelva un objeto con ambas propiedades.\n\nEjemplo: `forjar('Frasco', 5)` → `{ nombre: 'Frasco', luz: 5 }`.",
        "With `type Don = { nombre: string }` and `type Brillo = { luz: number }`, write `forjar(nombre: string, luz: number): Don & Brillo` returning an object with both properties.\n\nExample: `forjar('Frasco', 5)` → `{ nombre: 'Frasco', luz: 5 }`.",
      ),
      starter_code: "type Don = { nombre: string };\ntype Brillo = { luz: number };\n\nfunction forjar(nombre: string, luz: number): Don & Brillo {\n}\n",
      blocks: [
        "function forjar(nombre: string, luz: number): Don & Brillo {",
        "  return { nombre, luz };",
        "}",
        "  return { nombre };",
      ],
      hints: [
        P("El objeto debe tener AMBAS propiedades: `{ nombre, luz }`.", "The object must have BOTH properties: `{ nombre, luz }`."),
        P("`Don & Brillo` exige todo lo de Don y todo lo de Brillo.", "`Don & Brillo` requires everything from Don and everything from Brillo."),
      ],
      test_cases: [
        { input: "forjar('Frasco', 5).nombre", expected: "Frasco", description: P("La parte Don", "The Don part"), raw: true },
        { input: "forjar('Frasco', 5).luz", expected: 5, description: P("La parte Brillo", "The Brillo part"), raw: true },
        { input: "forjar('Estrella', 9).luz", expected: 9, description: P("Con otros valores", "With other values"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P(
      "Ajusta una capa cambiando sólo lo que quieras, sin repetir el resto. Un objeto de cambios PARCIAL basta.",
      "Adjust a cloak by changing only what you want, without repeating the rest. A PARTIAL changes object is enough.",
    ),
    challenge: {
      topic: P("Partial<T> y spread", "Partial<T> and spread"),
      instructions: P(
        "Con `interface Config { camuflaje: boolean; peso: number }`, escribe `conValores(base: Config, cambios: Partial<Config>): Config` que devuelva una copia de `base` con los `cambios` aplicados encima.\n\nEjemplo: `conValores({ camuflaje: false, peso: 1 }, { camuflaje: true })` → `{ camuflaje: true, peso: 1 }`.",
        "With `interface Config { camuflaje: boolean; peso: number }`, write `conValores(base: Config, cambios: Partial<Config>): Config` returning a copy of `base` with the `cambios` applied on top.\n\nExample: `conValores({ camuflaje: false, peso: 1 }, { camuflaje: true })` → `{ camuflaje: true, peso: 1 }`.",
      ),
      starter_code: "interface Config { camuflaje: boolean; peso: number }\n\nfunction conValores(base: Config, cambios: Partial<Config>): Config {\n}\n",
      blocks: [
        "function conValores(base: Config, cambios: Partial<Config>): Config {",
        "  return { ...base, ...cambios };",
        "}",
        "  return { ...cambios, ...base };",
      ],
      hints: [
        P("El spread combina, y el segundo pisa al primero: `{ ...base, ...cambios }`.", "Spread merges, and the second overrides the first: `{ ...base, ...cambios }`."),
        P("`Partial<Config>` hace opcionales todos los campos de `cambios`.", "`Partial<Config>` makes all fields of `cambios` optional."),
      ],
      test_cases: [
        { input: "conValores({ camuflaje: false, peso: 1 }, { camuflaje: true })", expected: { camuflaje: true, peso: 1 }, description: P("Cambia un campo", "Changes one field"), raw: true },
        { input: "conValores({ camuflaje: false, peso: 1 }, {})", expected: { camuflaje: false, peso: 1 }, description: P("Sin cambios: copia igual", "No changes: same copy"), raw: true },
        { input: "conValores({ camuflaje: false, peso: 1 }, { peso: 9 }).peso", expected: 9, description: P("Cambia el otro", "Changes the other"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de la Dama", "The Lady's Gifts"),
    lore_intro: P(
      "Anota qué dones lleva cada uno en un índice de nombre a presencia. Un Record tipado lo describe.",
      "Note which gifts each one carries in a name-to-presence index. A typed Record describes it.",
    ),
    challenge: {
      topic: P("Record<K, V>", "Record<K, V>"),
      instructions: P(
        "Escribe `inventario(dones: string[]): Record<string, boolean>` que devuelva un objeto con cada nombre de la lista como clave y `true` como valor.\n\nEjemplo: `inventario(['frasco', 'capa'])` → `{ frasco: true, capa: true }`.",
        "Write `inventario(dones: string[]): Record<string, boolean>` returning an object with each name in the list as a key and `true` as its value.\n\nExample: `inventario(['frasco', 'capa'])` → `{ frasco: true, capa: true }`.",
      ),
      starter_code: "function inventario(dones: string[]): Record<string, boolean> {\n  const r: Record<string, boolean> = {};\n  return r;\n}\n",
      blocks: [
        "function inventario(dones: string[]): Record<string, boolean> {",
        "  const r: Record<string, boolean> = {};",
        "  for (const d of dones) r[d] = true;",
        "  return r;",
        "}",
        "    r[d] = false;",
      ],
      hints: [
        P("Recorre con `for (const d of dones)` y asigna `r[d] = true;`.", "Iterate with `for (const d of dones)` and assign `r[d] = true;`."),
        P("`Record<string, boolean>` es un objeto de clave string a valor boolean.", "`Record<string, boolean>` is an object from string key to boolean value."),
      ],
      test_cases: [
        { input: "inventario(['frasco', 'capa'])", expected: { frasco: true, capa: true }, description: P("Índice de presencia", "Presence index"), raw: true },
        { input: "inventario([])", expected: {}, description: P("Sin dones", "No gifts"), raw: true },
        { input: "inventario(['luz']).luz", expected: true, description: P("Cada don en true", "Each gift set to true"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre narrowing, uniones discriminadas y guards. */
const Q_NARROW = {
  question: P(
    "Con `v: string | number`, ¿cómo sabe TS que dentro de `if (typeof v === 'number')` v es number?",
    "With `v: string | number`, how does TS know that inside `if (typeof v === 'number')` v is a number?",
  ),
  options: [
    P("Por narrowing: el `typeof` REDUCE el tipo en esa rama", "By narrowing: the `typeof` NARROWS the type in that branch"),
    P("Hay que hacer un cast con `as number`", "You must cast with `as number`"),
    P("No lo sabe: da error", "It doesn't know: it errors"),
    P("Sólo si anotas v de nuevo", "Only if you annotate v again"),
  ],
  correct: 0,
  explanation: P(
    "El «narrowing» (reducción de tipo) es una de las mejores ideas de TS: comprobaciones como `typeof`, `===` o `in` estrechan el tipo dentro de la rama. En el `else`, v pasa a ser `string` automáticamente. Sin castings.",
    "\"Narrowing\" is one of TS's best ideas: checks like `typeof`, `===` or `in` shrink the type inside the branch. In the `else`, v automatically becomes `string`. No casts needed.",
  ),
};
const Q_DISCRIMINATED = {
  question: P(
    "¿Qué es una unión DISCRIMINADA como `{ tipo: 'reino'; ... } | { tipo: 'ojo'; ... }`?",
    "What is a DISCRIMINATED union like `{ tipo: 'reino'; ... } | { tipo: 'ojo'; ... }`?",
  ),
  options: [
    P("Una unión con un campo común (el discriminante) que dice qué variante es", "A union with a common field (the discriminant) telling which variant it is"),
    P("Una unión que TS no puede reducir", "A union TS can't narrow"),
    P("Un tipo con propiedades opcionales", "A type with optional properties"),
    P("Una intersección de dos objetos", "An intersection of two objects"),
  ],
  correct: 0,
  explanation: P(
    "El campo común literal (aquí `tipo`) es el DISCRIMINANTE: al comprobar `v.tipo === 'reino'`, TS sabe exactamente qué variante tienes y qué otras propiedades existen. Es el patrón más limpio para modelar «una cosa de varias formas posibles».",
    "The common literal field (here `tipo`) is the DISCRIMINANT: checking `v.tipo === 'reino'` tells TS exactly which variant you have and what other properties exist. It's the cleanest pattern to model \"one thing of several possible shapes\".",
  ),
};
const Q_UNKNOWN = {
  question: P(
    "¿Qué diferencia hay entre `unknown` y `any`?",
    "What's the difference between `unknown` and `any`?",
  ),
  options: [
    P("`unknown` obliga a comprobar el tipo antes de usarlo; `any` no comprueba nada", "`unknown` forces you to check the type before using it; `any` checks nothing"),
    P("Son idénticos", "They're identical"),
    P("`unknown` sólo admite números", "`unknown` only allows numbers"),
    P("`any` es más seguro", "`any` is safer"),
  ],
  correct: 0,
  explanation: P(
    "`unknown` es el `any` SEGURO: acepta cualquier valor, pero no te deja usarlo hasta que reduces su tipo (con `typeof`, un guard…). `any` desactiva toda comprobación. Para datos de origen incierto (JSON, entradas), prefiere `unknown`.",
    "`unknown` is the SAFE `any`: it accepts any value, but won't let you use it until you narrow its type (with `typeof`, a guard…). `any` disables all checking. For data of uncertain origin (JSON, inputs), prefer `unknown`.",
  ),
};
const Q_TYPE_PREDICATE = {
  question: P(
    "¿Qué significa el retorno `x is number` en `function esNumero(x: unknown): x is number`?",
    "What does the return `x is number` mean in `function esNumero(x: unknown): x is number`?",
  ),
  options: [
    P("Es un type guard: si devuelve true, TS trata x como number a partir de ahí", "It's a type guard: if it returns true, TS treats x as a number from then on"),
    P("Convierte x en number", "It converts x into a number"),
    P("Devuelve el tipo de x como texto", "It returns x's type as text"),
    P("Es lo mismo que `: boolean`", "It's the same as `: boolean`"),
  ],
  correct: 0,
  explanation: P(
    "`x is number` es un PREDICADO DE TIPO: la función devuelve un booleano, pero además le dice a TS que, cuando es true, x es number. Así puedes escribir tus propios guards y usarlos en `if` o en `filter`, conservando el tipo.",
    "`x is number` is a TYPE PREDICATE: the function returns a boolean, but also tells TS that, when true, x is a number. This lets you write your own guards and use them in `if` or `filter`, preserving the type.",
  ),
};
const Q_IN_OPERATOR = {
  question: P(
    "En una unión de objetos, ¿cómo reduces el tipo con el operador `in`?",
    "In a union of objects, how do you narrow the type with the `in` operator?",
  ),
  options: [
    P("`if ('peligro' in v)` → TS sabe que v es la variante que tiene `peligro`", "`if ('peligro' in v)` → TS knows v is the variant that has `peligro`"),
    P("`if (v.peligro)` siempre compila", "`if (v.peligro)` always compiles"),
    P("`in` no sirve para reducir tipos", "`in` can't narrow types"),
    P("Hay que usar `instanceof`", "You must use `instanceof`"),
  ],
  correct: 0,
  explanation: P(
    "`'prop' in v` comprueba si el objeto tiene esa propiedad, y TS lo usa para reducir la unión a la variante que la contiene. Junto a `typeof`, `===` (discriminante) e `instanceof`, es una de las formas de narrowing.",
    "`'prop' in v` checks whether the object has that property, and TS uses it to narrow the union to the variant that contains it. Along with `typeof`, `===` (discriminant) and `instanceof`, it's one of the narrowing forms.",
  ),
};
const Q_NARROW_WHY = {
  question: P(
    "¿Por qué conviene modelar «un resultado o un error» como una unión en vez de valores sueltos?",
    "Why model \"a result or an error\" as a union rather than loose values?",
  ),
  options: [
    P("El compilador te obliga a tratar ambos casos antes de usar el valor", "The compiler forces you to handle both cases before using the value"),
    P("Es más rápido", "It's faster"),
    P("Ocupa menos memoria", "It uses less memory"),
    P("Evita escribir funciones", "It avoids writing functions"),
  ],
  correct: 0,
  explanation: P(
    "Una unión discriminada (`{ ok: true; valor } | { ok: false; error }`) hace que el compilador no te deje leer `valor` sin antes comprobar `ok`. El caso de error deja de ser algo que «se te olvida»: el tipo lo exige.",
    "A discriminated union (`{ ok: true; valor } | { ok: false; error }`) makes the compiler refuse to read `valor` without first checking `ok`. The error case stops being something you \"forget\": the type demands it.",
  ),
};

/** Capítulo 8 · Narrowing, uniones discriminadas y type guards. */
const Q_TYPEOF_NARROW = {
  question: P("Con `x: string | number`, ¿qué hace `if (typeof x === 'string')`?", "With `x: string | number`, what does `if (typeof x === 'string')` do?"),
  options: [
    P("Estrecha `x` a `string` dentro del if; en el else es `number`", "Narrows `x` to `string` inside the if; in the else it's `number`"),
    P("Convierte x en string", "Converts x to a string"),
    P("Da error", "Errors"),
    P("No cambia el tipo", "Doesn't change the type"),
  ],
  correct: 0,
  explanation: P(
    "`typeof` es la guarda de tipo más común para primitivos: dentro del `if`, TS sabe que `x` es `string` y te deja usar sus métodos; en el `else`, `number`.",
    "`typeof` is the most common type guard for primitives: inside the `if`, TS knows `x` is `string` and lets you use its methods; in the `else`, `number`.",
  ),
};
const Q_INSTANCEOF_NARROW = {
  question: P("¿Para qué sirve `if (e instanceof RangeError)` al capturar un error?", "What is `if (e instanceof RangeError)` for when catching an error?"),
  options: [
    P("Estrecha el tipo a RangeError en esa rama, con sus propiedades", "Narrows the type to RangeError in that branch, with its properties"),
    P("Crea un RangeError", "Creates a RangeError"),
    P("Comprueba el nombre por texto", "Checks the name by text"),
    P("Nada útil", "Nothing useful"),
  ],
  correct: 0,
  explanation: P(
    "`instanceof` estrecha a un tipo de CLASE: útil con `unknown` o uniones de objetos (`Perro | Gato`) y para distinguir errores dentro de un `catch`.",
    "`instanceof` narrows to a CLASS type: useful with `unknown` or object unions (`Perro | Gato`) and to tell errors apart inside a `catch`.",
  ),
};
const Q_TRUTHY_NARROW = {
  question: P("Con `x: string | undefined`, ¿qué consigue `if (x) { ... }`?", "With `x: string | undefined`, what does `if (x) { ... }` achieve?"),
  options: [
    P("Descarta `undefined` (y ''): dentro, `x` es un `string`", "Rules out `undefined` (and ''): inside, `x` is a `string`"),
    P("Convierte x en booleano permanente", "Turns x into a permanent boolean"),
    P("Da error si x es undefined", "Errors if x is undefined"),
    P("Nada", "Nothing"),
  ],
  correct: 0,
  explanation: P(
    "La comprobación de veracidad estrecha quitando los valores «falsy» (`undefined`, `null`, `''`, `0`). Ojo: también descarta la cadena vacía, no sólo `undefined`.",
    "The truthiness check narrows by removing \"falsy\" values (`undefined`, `null`, `''`, `0`). Note: it also rules out the empty string, not just `undefined`.",
  ),
};

export const SYL_TS_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_NARROW, Q_UNKNOWN, Q_NARROW_WHY] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_DISCRIMINATED, Q_IN_OPERATOR, Q_TYPEOF_NARROW] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_TYPE_PREDICATE, Q_INSTANCEOF_NARROW, Q_TRUTHY_NARROW] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, el primero de los Uruk-hai", "Lurtz, first of the Uruk-hai"),
    lore_intro: P(
      "El último enemigo de la Comunidad. Un valor puede llegar como número o como texto: ESTRECHA el tipo con typeof y actúa en consecuencia.",
      "The Fellowship's last foe. A value may come as a number or as text: NARROW the type with typeof and act accordingly.",
    ),
    challenge: {
      topic: P("Narrowing: uniones y typeof", "Narrowing: unions and typeof"),
      instructions: P(
        "Escribe `describir(x: string | number): string` que:\n• si `x` es un número, devuelva `'numero {x}'`,\n• si es un texto, devuelva `'texto {x}'`.\n\nUsa `typeof` para estrechar el tipo. Ejemplo: `describir(5)` → `'numero 5'`; `describir('hola')` → `'texto hola'`.",
        "Write `describir(x: string | number): string` that:\n• if `x` is a number, returns `'numero {x}'`,\n• if it's text, returns `'texto {x}'`.\n\nUse `typeof` to narrow the type. Example: `describir(5)` → `'numero 5'`; `describir('hola')` → `'texto hola'`.",
      ),
      starter_code: "function describir(x: string | number): string {\n}\n",
      blocks: [
        "function describir(x: string | number): string {",
        "  return typeof x === 'number' ? `numero ${x}` : `texto ${x}`;",
        "}",
        "  return `texto ${x}`;",
      ],
      hints: [
        P("`if (typeof x === 'number') { ... }` estrecha `x` a number en esa rama.", "`if (typeof x === 'number') { ... }` narrows `x` to number in that branch."),
        P("Interpola con template strings: `` `numero ${x}` `` y `` `texto ${x}` ``.", "Interpolate with template strings: `` `numero ${x}` `` and `` `texto ${x}` ``."),
      ],
      test_cases: [
        { input: "describir(5)", expected: "numero 5", description: P("Rama number", "Number branch"), raw: true },
        { input: "describir('hola')", expected: "texto hola", description: P("Rama string", "String branch"), raw: true },
        { input: "describir(0)", expected: "numero 0", description: P("El 0 también es número", "0 is a number too"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino de lo que Puede Fallar", "The Scroll of What Can Go Wrong"),
    lore_intro: P(
      "Aragorn deja un pergamino junto al fuego apagado: enseña a distinguir, en tiempo de tipos, entre lo que sirve y lo que engaña — narrowing y type guards.",
      "Aragorn leaves a scroll by the dead fire: it teaches how to tell, at the type level, what's useful from what deceives — narrowing and type guards.",
    ),
    scroll: {
      topic: P("Narrowing, uniones discriminadas y guards", "Narrowing, discriminated unions and guards"),
      sections: [
        {
          heading: P("Narrowing: reducir un tipo por ramas", "Narrowing: shrinking a type by branch"),
          body: P(
            "Con un valor `string | number`, comprobaciones como `typeof`, `===` o `in` estrechan el tipo dentro de cada rama. En el `if` es number; en el `else`, string. Sin castings.",
            "With a `string | number` value, checks like `typeof`, `===` or `in` shrink the type within each branch. In the `if` it's a number; in the `else`, a string. No casts.",
          ),
          code:
            "function describir(v: string | number): string {\n  return typeof v === 'number' ? `número ${v}` : `texto ${v}`;\n}",
        },
        {
          heading: P("Uniones discriminadas", "Discriminated unions"),
          body: P(
            "Un campo literal común (el discriminante) modela «una cosa de varias formas». Al comprobarlo, TS sabe qué variante tienes y qué propiedades existen. El caso de error deja de olvidarse.",
            "A common literal field (the discriminant) models \"one thing of several shapes\". Checking it tells TS which variant you have and what properties exist. The error case stops being forgotten.",
          ),
          code:
            "type Vision =\n  | { tipo: 'reino'; nombre: string }\n  | { tipo: 'ojo'; peligro: number };\nfunction leer(v: Vision): string {\n  return v.tipo === 'reino' ? `ves ${v.nombre}` : `el Ojo (${v.peligro})`;\n}",
        },
        {
          heading: P("unknown y type guards", "unknown and type guards"),
          body: P(
            "`unknown` es el `any` seguro: no lo usas hasta reducir su tipo. Un guard propio con retorno `x is T` enseña a TS a reducir, y funciona hasta dentro de `filter`.",
            "`unknown` is the safe `any`: you can't use it until you narrow its type. A custom guard returning `x is T` teaches TS to narrow, and works even inside `filter`.",
          ),
          code:
            "function esNumero(x: unknown): x is number {\n  return typeof x === 'number';\n}\nconst nums = [1, 'a', 2].filter(esNumero); // number[]",
        },
      ],
      keyTakeaway: P(
        "Narrowing reduce tipos por ramas (`typeof`, `===`, `in`); las uniones discriminadas obligan a tratar cada caso; `unknown` es el `any` seguro y un guard `x is T` reduce a tu medida (incluido `filter`).",
        "Narrowing shrinks types by branch (`typeof`, `===`, `in`); discriminated unions force handling each case; `unknown` is the safe `any` and a guard `x is T` narrows on demand (including in `filter`).",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P(
      "El Anillo se muestra de dos formas: como cifra de poder o como palabra tentadora. Distínguelas con narrowing.",
      "The Ring shows itself in two forms: as a number of power or as a tempting word. Tell them apart with narrowing.",
    ),
    challenge: {
      topic: P("Narrowing con typeof", "Narrowing with typeof"),
      instructions: P(
        "Escribe `describir(v: string | number): string` que devuelva `'número {v}'` si `v` es un number, y `'texto {v}'` si es un string. Usa `typeof`.\n\nEjemplo: `describir(5)` → `'número 5'`; `describir('oro')` → `'texto oro'`.",
        "Write `describir(v: string | number): string` returning `'número {v}'` if `v` is a number, and `'texto {v}'` if it's a string. Use `typeof`.\n\nExample: `describir(5)` → `'número 5'`; `describir('oro')` → `'texto oro'`.",
      ),
      starter_code: "function describir(v: string | number): string {\n}\n",
      blocks: [
        "function describir(v: string | number): string {",
        "  return typeof v === 'number' ? `número ${v}` : `texto ${v}`;",
        "}",
        "  return typeof v === \"number\" ? `numero ${v}` : `texto ${v}`;",
      ],
      hints: [
        P("`typeof v === 'number'` reduce v a number en esa rama.", "`typeof v === 'number'` narrows v to a number in that branch."),
        P("Usa template strings: `` `número ${v}` `` y `` `texto ${v}` ``.", "Use template strings: `` `número ${v}` `` and `` `texto ${v}` ``."),
      ],
      test_cases: [
        { input: "describir(5)", expected: "número 5", description: P("Rama number", "Number branch"), raw: true },
        { input: "describir('oro')", expected: "texto oro", description: P("Rama string", "String branch"), raw: true },
        { input: "describir(0)", expected: "número 0", description: P("El 0 también es number", "0 is a number too"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P(
      "Desde Amon Hen se ven reinos… o el Ojo. Modela las dos visiones con una unión discriminada y léelas según su tipo.",
      "From Amon Hen you see kingdoms… or the Eye. Model both visions with a discriminated union and read them by their type.",
    ),
    challenge: {
      topic: P("Uniones discriminadas", "Discriminated unions"),
      instructions: P(
        "Con `type Vision = { tipo: 'reino'; nombre: string } | { tipo: 'ojo'; peligro: number }`, escribe `leer(v: Vision): string` que devuelva `'ves {nombre}'` para un reino y `'el Ojo (peligro {peligro})'` para el ojo.\n\nEjemplos: `leer({ tipo: 'reino', nombre: 'Rohan' })` → `'ves Rohan'`; `leer({ tipo: 'ojo', peligro: 9 })` → `'el Ojo (peligro 9)'`.",
        "With `type Vision = { tipo: 'reino'; nombre: string } | { tipo: 'ojo'; peligro: number }`, write `leer(v: Vision): string` returning `'ves {nombre}'` for a kingdom and `'el Ojo (peligro {peligro})'` for the eye.\n\nExamples: `leer({ tipo: 'reino', nombre: 'Rohan' })` → `'ves Rohan'`; `leer({ tipo: 'ojo', peligro: 9 })` → `'el Ojo (peligro 9)'`.",
      ),
      starter_code: "type Vision =\n  | { tipo: 'reino'; nombre: string }\n  | { tipo: 'ojo'; peligro: number };\n\nfunction leer(v: Vision): string {\n}\n",
      blocks: [
        "function leer(v: Vision): string {",
        "  return v.tipo === 'reino' ? `ves ${v.nombre}` : `el Ojo (peligro ${v.peligro})`;",
        "}",
        "  return `ves ${v.nombre}`;",
      ],
      hints: [
        P("`v.tipo === 'reino'` reduce v a la variante con `nombre`.", "`v.tipo === 'reino'` narrows v to the variant with `nombre`."),
        P("En la otra rama, TS ya sabe que existe `v.peligro`.", "In the other branch, TS already knows `v.peligro` exists."),
      ],
      test_cases: [
        { input: "leer({ tipo: 'reino', nombre: 'Rohan' })", expected: "ves Rohan", description: P("Variante reino", "Kingdom variant"), raw: true },
        { input: "leer({ tipo: 'ojo', peligro: 9 })", expected: "el Ojo (peligro 9)", description: P("Variante ojo", "Eye variant"), raw: true },
        { input: "leer({ tipo: 'reino', nombre: 'Gondor' })", expected: "ves Gondor", description: P("Otro reino", "Another kingdom"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P(
      "De un montón de cosas dudosas, quédate sólo con las que de verdad son números y súmalas. Un type guard separa el grano de la paja.",
      "From a heap of dubious things, keep only the ones that truly are numbers and sum them. A type guard separates the wheat from the chaff.",
    ),
    challenge: {
      topic: P("unknown y type guards (x is T)", "unknown and type guards (x is T)"),
      instructions: P(
        "Escribe un guard `esNumero(x: unknown): x is number` (true si `x` es number) y `sumarSeguros(xs: unknown[]): number` que SUME sólo los elementos que sean números, usando `filter(esNumero)`.\n\nEjemplo: `sumarSeguros([1, 'a', 2, true, 3])` → `6`.",
        "Write a guard `esNumero(x: unknown): x is number` (true if `x` is a number) and `sumarSeguros(xs: unknown[]): number` that SUMS only the elements that are numbers, using `filter(esNumero)`.\n\nExample: `sumarSeguros([1, 'a', 2, true, 3])` → `6`.",
      ),
      starter_code: "function esNumero(x: unknown): x is number {\n}\n\nfunction sumarSeguros(xs: unknown[]): number {\n}\n",
      blocks: [
        "function esNumero(x: unknown): x is number {",
        "  return typeof x === 'number';",
        "}",
        "function sumarSeguros(xs: unknown[]): number {",
        "  return xs.filter(esNumero).reduce((s, n) => s + n, 0);",
        "}",
        "  return typeof x === \"string\";",
      ],
      hints: [
        P("El guard: `return typeof x === 'number';`.", "The guard: `return typeof x === 'number';`."),
        P("`xs.filter(esNumero)` ya es `number[]`, así que puedes `reduce((a, b) => a + b, 0)`.", "`xs.filter(esNumero)` is already `number[]`, so you can `reduce((a, b) => a + b, 0)`."),
      ],
      test_cases: [
        { input: "sumarSeguros([1, 'a', 2, true, 3])", expected: 6, description: P("Sólo suma los numbers", "Only sums the numbers"), raw: true },
        { input: "sumarSeguros([])", expected: 0, description: P("Lista vacía", "Empty list"), raw: true },
        { input: "sumarSeguros(['x', false, null])", expected: 0, description: P("Ningún number", "No numbers"), raw: true },
        { input: "esNumero('7')", expected: false, description: P("Un string no es number", "A string isn't a number"), raw: true },
      ],
    },
  },
};
