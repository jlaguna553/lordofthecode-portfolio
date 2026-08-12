import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de JavaScript para el Libro I. Reviste la MISMA narrativa compartida
 * de la Comunidad (Sombras en la Comarca) con fundamentos de JavaScript.
 * Bilingüe ES/EN.
 */

const P = (es: string, en: string) => ({ es, en });

/** Preguntas de combate reutilizables sobre fundamentos de JS. */
const Q_CONST_LET = {
  question: P(
    "¿Qué usarías para una variable que NO vas a reasignar?",
    "What would you use for a variable you will NOT reassign?",
  ),
  options: [
    P("const", "const"),
    P("let", "let"),
    P("var", "var"),
    P("Da igual", "It doesn't matter"),
  ],
  correct: 0,
  explanation: P(
    "`const` por defecto: expresa que el valor no cambia y evita reasignaciones accidentales. `let` sólo si vas a reasignar; `var` está obsoleto.",
    "`const` by default: states the value won't change and prevents accidental reassignment. `let` only if you'll reassign; `var` is obsolete.",
  ),
};

const Q_STRICT = {
  question: P("¿Qué imprime `42 === '42'`?", "What does `42 === '42'` print?"),
  options: [
    P("false, porque son de distinto tipo", "false, they're different types"),
    P("true", "true"),
    P("Error de tipos", "Type error"),
    P("'42'", "'42'"),
  ],
  correct: 0,
  explanation: P(
    "`===` compara valor Y tipo sin conversiones: un number nunca es igual a un string. `==` convertiría y daría true, por eso se evita.",
    "`===` compares value AND type with no conversions: a number is never equal to a string. `==` would convert and return true, which is why it's avoided.",
  ),
};

const Q_TEMPLATE = {
  question: P(
    "¿Cómo se incrusta una expresión en una template string?",
    "How do you embed an expression in a template string?",
  ),
  options: [
    P("`texto ${expresión}`", "`text ${expression}`"),
    P('"texto {expresión}"', '"text {expression}"'),
    P("'texto' + expresión", "'text' + expression"),
    P("`texto #{expresión}`", "`text #{expression}`"),
  ],
  correct: 0,
  explanation: P(
    "Comillas invertidas y ${ }. La opción con + es concatenación normal (funciona, pero menos legible); #{} es de otros lenguajes.",
    "Backticks and ${ }. The + option is plain concatenation (works, but less readable); #{} is from other languages.",
  ),
};

const Q_TYPEOF = {
  question: P(
    "¿Qué devuelve `typeof 42`?",
    "What does `typeof 42` return?",
  ),
  options: [
    P("'number'", "'number'"),
    P("'int'", "'int'"),
    P("'42'", "'42'"),
    P("number", "number"),
  ],
  correct: 0,
  explanation: P(
    "`typeof` devuelve un STRING con el nombre del tipo: 'number', 'string', 'boolean', 'undefined'… En JS no hay int/float separados: todo número es `number`.",
    "`typeof` returns a STRING with the type name: 'number', 'string', 'boolean', 'undefined'… JS has no separate int/float: every number is `number`.",
  ),
};

const Q_NUMBER = {
  question: P(
    "¿Cómo conviertes el texto '42' en el número 42?",
    "How do you turn the text '42' into the number 42?",
  ),
  options: [
    P("Number('42')", "Number('42')"),
    P("int('42')", "int('42')"),
    P("'42'.toNumber()", "'42'.toNumber()"),
    P("(int) '42'", "(int) '42'"),
  ],
  correct: 0,
  explanation: P(
    "`Number('42')` (o `parseInt`) convierte texto a número. No existe `int()` ni casts con paréntesis como en otros lenguajes.",
    "`Number('42')` (or `parseInt`) turns text into a number. There is no `int()` nor paren casts like in other languages.",
  ),
};

const Q_FALSY = {
  question: P(
    "¿Cuál de estos valores es 'falsy' (se comporta como false)?",
    "Which of these values is 'falsy' (behaves like false)?",
  ),
  options: [
    P("0", "0"),
    P("'0'", "'0'"),
    P("[]", "[]"),
    P("'false'", "'false'"),
  ],
  correct: 0,
  explanation: P(
    "Los falsy en JS son: false, 0, '', null, undefined y NaN. Ojo: '0', [] y 'false' son todos TRUTHY (un string no vacío o un array siempre lo son).",
    "The falsy values in JS are: false, 0, '', null, undefined and NaN. Careful: '0', [] and 'false' are all TRUTHY (a non-empty string or an array always are).",
  ),
};

const Q_TERNARY = {
  question: P(
    "¿Qué es `x >= 0 ? '+' : '-'`?",
    "What is `x >= 0 ? '+' : '-'`?",
  ),
  options: [
    P("Un operador ternario: devuelve un valor según la condición", "A ternary operator: returns a value based on the condition"),
    P("Un error de sintaxis", "A syntax error"),
    P("Un bucle", "A loop"),
    P("Una función anónima", "An anonymous function"),
  ],
  correct: 0,
  explanation: P(
    "El ternario `cond ? a : b` es una EXPRESIÓN que devuelve `a` si la condición es cierta y `b` si no. Práctico para asignar un valor según una condición.",
    "The ternary `cond ? a : b` is an EXPRESSION that returns `a` if the condition is true and `b` otherwise. Handy to assign a value based on a condition.",
  ),
};
const Q_MODULO = {
  question: P("¿Qué devuelve `7 % 3` en JavaScript?", "What does `7 % 3` return in JavaScript?"),
  options: [
    P("1 (el RESTO de dividir 7 entre 3)", "1 (the REMAINDER of 7 divided by 3)"),
    P("2 (el cociente)", "2 (the quotient)"),
    P("2.33", "2.33"),
    P("21", "21"),
  ],
  correct: 0,
  explanation: P(
    "El operador `%` (módulo) da el RESTO de la división entera: `7 % 3` es 1. Muy usado para saber si un número es par (`n % 2 === 0`) o para ciclar índices.",
    "The `%` (modulo) operator gives the REMAINDER of integer division: `7 % 3` is 1. Widely used to check if a number is even (`n % 2 === 0`) or to cycle indices.",
  ),
};
const Q_STRING_METHODS = {
  question: P("¿Qué devuelve `'mellon'.length`?", "What does `'mellon'.length` return?"),
  options: [
    P("6 (el número de caracteres)", "6 (the number of characters)"),
    P("'mellon' (la cadena)", "'mellon' (the string)"),
    P("true", "true"),
    P("Un error: los strings no tienen length", "An error: strings have no length"),
  ],
  correct: 0,
  explanation: P(
    "Los strings tienen `.length` (número de caracteres) y métodos como `.toUpperCase()`, `.includes(...)` o `.slice(...)`. Son inmutables: los métodos devuelven una cadena NUEVA, no modifican la original.",
    "Strings have `.length` (character count) and methods like `.toUpperCase()`, `.includes(...)` or `.slice(...)`. They're immutable: methods return a NEW string, they don't change the original.",
  ),
};

export const SYL_JS_COMMUNITY_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [Q_CONST_LET, Q_TEMPLATE, Q_TYPEOF],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [Q_STRICT, Q_NUMBER, Q_FALSY],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [Q_TERNARY, Q_MODULO, Q_STRING_METHODS],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl acorrala a Frodo. No hay acero que lo hiera aquí: sólo la VOLUNTAD. Escribe la función que mide si resistes o sucumbes.",
      "The Nazgûl corners Frodo. No steel harms it here: only WILL. Write the function that measures whether you resist or succumb.",
    ),
    challenge: {
      topic: P("Funciones, template strings y condicionales", "Functions, template strings and conditionals"),
      instructions: P(
        "Escribe `resistir(nombre, tentacion)`:\n• si `tentacion` es 100 o más, devuelve `'{nombre} sucumbe'`,\n• si no, devuelve `'{nombre} resiste con {X} de voluntad'`, donde `X` es `100 - tentacion`.\n\nEjemplo: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
        "Write `resistir(nombre, tentacion)`:\n• if `tentacion` is 100 or more, return `'{nombre} sucumbe'`,\n• otherwise, return `'{nombre} resiste con {X} de voluntad'`, where `X` is `100 - tentacion`.\n\nExample: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
      ),
      starter_code: "function resistir(nombre, tentacion) {\n}\n",
      blocks: [
        "function resistir(nombre, tentacion) {",
        "  if (tentacion >= 100) return `${nombre} sucumbe`;",
        "  return `${nombre} resiste con ${100 - tentacion} de voluntad`;",
        "}",
        "  if (tentacion > 100) return `${nombre} sucumbe`;",
      ],
      hints: [
        P("Un `if` con el caso de sucumbir; el resto, resistir.", "An `if` for the succumb case; the rest, resist."),
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
    title: P("El Pergamino del Guión", "The Scroll of the Script"),
    lore_intro: P(
      "Entre los papeles del viejo Bilbo, un pergamino en una lengua nueva enseña a nombrar las cosas.",
      "Among old Bilbo's papers, a scroll in a new tongue teaches how to name things.",
    ),
    scroll: {
      topic: P(
        "JavaScript desde cero: variables, tipos y decisiones",
        "JavaScript from scratch: variables, types and decisions",
      ),
      sections: [
        {
          heading: P("Variables: const y let", "Variables: const and let"),
          body: P(
            "Se declara con `const` (no se reasigna) o `let` (sí). Evita `var`. No se declara el tipo: lo deduce el valor.",
            "Declare with `const` (never reassigned) or `let` (reassignable). Avoid `var`. You don't declare the type: the value implies it.",
          ),
          code:
            "const nombre = 'Frodo';   // string\nlet edad = 50;            // number\nedad = 51;                // ok con let\nconst activo = true;      // boolean",
        },
        {
          heading: P("Template strings", "Template strings"),
          body: P(
            "Con comillas invertidas (`) incrustas expresiones con ${...}. Más legible que concatenar con +.",
            "With backticks (`) you embed expressions with ${...}. More readable than concatenating with +.",
          ),
          code: "const n = 'Sam';\n`Hola, ${n}`          // 'Hola, Sam'\n`El doble es ${2 * 21}`  // 'El doble es 42'",
        },
        {
          heading: P("Tipos y comparación", "Types and comparison"),
          body: P(
            "`Number('42')` convierte texto a número. Usa SIEMPRE `===` (estricto): compara valor y tipo. `==` hace conversiones traicioneras.",
            "`Number('42')` turns text into a number. Always use `===` (strict): compares value and type. `==` does treacherous conversions.",
          ),
          code: "Number('42')     // 42\n42 === 42        // true\n42 === '42'      // false (distinto tipo)\n42 == '42'       // true  (¡evítalo!)",
        },
        {
          heading: P("Decisiones", "Decisions"),
          body: P(
            "`if` / `else if` / `else` para ramificar. El ternario `cond ? a : b` es una expresión que devuelve un valor.",
            "`if` / `else if` / `else` to branch. The ternary `cond ? a : b` is an expression that returns a value.",
          ),
          code: "if (n <= 0) estado = 'vacío';\nelse if (n < 3) estado = 'algo';\nelse estado = 'lleno';\n\nconst signo = x >= 0 ? '+' : '-';",
        },
      ],
      keyTakeaway: P(
        "const por defecto, let si reasignas, nunca var. Template strings con `${}`. Compara con === (nunca ==).",
        "const by default, let if you reassign, never var. Template strings with `${}`. Compare with === (never ==).",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing to Flee"),
    lore_intro: P(
      "Antes de partir, aprende a decir quién eres. Escribe tu primera función.",
      "Before you leave, learn to say who you are. Write your first function.",
    ),
    challenge: {
      topic: P("Funciones y template strings", "Functions and template strings"),
      instructions: P(
        "Escribe `presentarse(nombre)` que devuelva una template string con el formato exacto:\n\n  Soy {nombre} de la Comarca\n\nPor ejemplo, `presentarse('Frodo')` devuelve `'Soy Frodo de la Comarca'`.",
        "Write `presentarse(nombre)` that returns a template string with the exact format:\n\n  Soy {name} de la Comarca\n\nFor example, `presentarse('Frodo')` returns `'Soy Frodo de la Comarca'`.",
      ),
      starter_code: "function presentarse(nombre) {\n}\n",
      blocks: [
        "function presentarse(nombre) {",
        "  return `Soy ${nombre} de la Comarca`;",
        "}",
        '  return "Soy " + nombre;',
        "  return `Soy ${nombre}`;",
      ],
      hints: [
        P(
          "Una template string va entre comillas invertidas: `...`.",
          "A template string is wrapped in backticks: `...`.",
        ),
        P(
          "La variable va dentro de ${ }: `Soy ${nombre} de la Comarca`.",
          "The variable goes inside ${ }: `Soy ${nombre} de la Comarca`.",
        ),
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
      "Un Jinete Negro olfatea el aire. Controla tu Sigilo con números y comparaciones para pasar inadvertido.",
      "A Black Rider sniffs the air. Control your Stealth with numbers and comparisons to slip by unseen.",
    ),
    challenge: {
      topic: P("Números y comparación", "Numbers and comparison"),
      instructions: P(
        "Escribe dos funciones:\n\n• `ocultar(actual, n)` — suma `n` al sigilo `actual`, SIN pasar de 100. Usa `Math.min`.\n• `esVisible(sigilo, percepcion)` — devuelve true si tu `sigilo` es MENOR que la `percepcion` del Nazgûl.",
        "Write two functions:\n\n• `ocultar(actual, n)` — adds `n` to the current stealth, capped at 100. Use `Math.min`.\n• `esVisible(sigilo, percepcion)` — returns true if your `sigilo` is LESS than the Nazgûl's `percepcion`.",
      ),
      starter_code: "function ocultar(actual, n) {\n}\n\nfunction esVisible(sigilo, percepcion) {\n}\n",
      blocks: [
        "function ocultar(actual, n) {",
        "  return Math.min(100, actual + n);",
        "}",
        "function esVisible(sigilo, percepcion) {",
        "  return sigilo < percepcion;",
        "}",
        "  return Math.max(100, actual + n);",
        "  return sigilo > percepcion;",
      ],
      hints: [
        P(
          "`Math.min(100, actual + n)` nunca devuelve más de 100.",
          "`Math.min(100, actual + n)` never returns more than 100.",
        ),
        P(
          "`sigilo < percepcion` ya es un booleano: devuélvelo.",
          "`sigilo < percepcion` is already a boolean: return it.",
        ),
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


/** Preguntas de combate sobre control de flujo en JavaScript. */
const Q_FOR = {
  question: P("¿Cómo recorres cada elemento de un array `xs`?", "How do you go over each element of an array `xs`?"),
  options: [
    P("for (const x of xs) { ... }", "for (const x of xs) { ... }"),
    P("for (x in xs) { ... }", "for (x in xs) { ... }"),
    P("foreach (xs as x) { ... }", "foreach (xs as x) { ... }"),
    P("loop xs { ... }", "loop xs { ... }"),
  ],
  correct: 0,
  explanation: P(
    "`for...of` recorre los VALORES de un array. `for...in` recorre las CLAVES (índices como string) y casi nunca es lo que quieres para arrays.",
    "`for...of` iterates the VALUES of an array. `for...in` iterates the KEYS (indices as strings) and is rarely what you want for arrays.",
  ),
};
const Q_WHILE = {
  question: P("¿Qué bucle usas cuando no sabes de antemano cuántas vueltas dará?", "Which loop do you use when you don't know how many turns you'll need?"),
  options: [
    P("while", "while"),
    P("for de rango fijo", "a fixed-range for"),
    P("map", "map"),
    P("switch", "switch"),
  ],
  correct: 0,
  explanation: P(
    "`while (condición)` repite mientras la condición sea cierta: ideal cuando la parada depende de un estado que evoluciona. Algo dentro debe acercar la condición a falsa, o el bucle es infinito.",
    "`while (condition)` repeats while the condition holds: ideal when stopping depends on an evolving state. Something inside must move the condition toward false, or the loop is infinite.",
  ),
};
const Q_PUSH = {
  question: P("¿Cómo añades un elemento al final de un array `r`?", "How do you add an element to the end of an array `r`?"),
  options: [
    P("r.push(x)", "r.push(x)"),
    P("r.add(x)", "r.add(x)"),
    P("r[] = x", "r[] = x"),
    P("r.append(x)", "r.append(x)"),
  ],
  correct: 0,
  explanation: P(
    "`array.push(x)` añade al final. `r[] = x` es de PHP; `.add()`/`.append()` son de otros lenguajes.",
    "`array.push(x)` appends. `r[] = x` is PHP; `.add()`/`.append()` are from other languages.",
  ),
};
const Q_BREAK = {
  question: P("¿Qué diferencia hay entre `break` y `continue` dentro de un bucle?", "What's the difference between `break` and `continue` inside a loop?"),
  options: [
    P("break sale del bucle; continue salta a la siguiente vuelta", "break exits the loop; continue jumps to the next turn"),
    P("Son sinónimos", "They're synonyms"),
    P("break salta una vuelta; continue termina el bucle", "break skips one turn; continue ends the loop"),
    P("continue sale del programa", "continue exits the program"),
  ],
  correct: 0,
  explanation: P(
    "`break` abandona el bucle por completo; `continue` sólo se salta lo que queda del cuerpo y sigue con la próxima iteración.",
    "`break` leaves the loop entirely; `continue` only skips the rest of the body and moves to the next iteration.",
  ),
};
const Q_LEN = {
  question: P("¿Cómo obtienes cuántos elementos tiene un array `xs`?", "How do you get how many elements an array `xs` has?"),
  options: [
    P("xs.length", "xs.length"),
    P("xs.size()", "xs.size()"),
    P("count(xs)", "count(xs)"),
    P("len(xs)", "len(xs)"),
  ],
  correct: 0,
  explanation: P(
    "`xs.length` es una PROPIEDAD (sin paréntesis), no un método. `count()` es de PHP y `len()` de Python.",
    "`xs.length` is a PROPERTY (no parentheses), not a method. `count()` is PHP and `len()` is Python.",
  ),
};
const Q_ARRAY_INDEX = {
  question: P("Con `const xs = [10, 20, 30]`, ¿qué es `xs[1]`?", "With `const xs = [10, 20, 30]`, what is `xs[1]`?"),
  options: [
    P("20 (los índices empiezan en 0)", "20 (indices start at 0)"),
    P("10 (el primero)", "10 (the first)"),
    P("30", "30"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "Los arrays se indexan desde 0: `xs[0]` es 10, `xs[1]` es 20. Un índice fuera de rango (`xs[9]`) devuelve `undefined`, no un error.",
    "Arrays are indexed from 0: `xs[0]` is 10, `xs[1]` is 20. An out-of-range index (`xs[9]`) returns `undefined`, not an error.",
  ),
};
const Q_FOROF = {
  question: P("¿Qué recorre `for (const x of xs)` sobre un array?", "What does `for (const x of xs)` iterate over an array?"),
  options: [
    P("Los VALORES del array, uno a uno", "The array's VALUES, one by one"),
    P("Los ÍNDICES (0, 1, 2…)", "The INDICES (0, 1, 2…)"),
    P("Las claves como texto", "The keys as text"),
    P("Nada: no funciona con arrays", "Nothing: it doesn't work with arrays"),
  ],
  correct: 0,
  explanation: P(
    "`for...of` recorre los VALORES (`x` es cada elemento). Si quieres los índices, usa `for...in` (da las claves) o `xs.forEach((x, i) => ...)`.",
    "`for...of` iterates the VALUES (`x` is each element). If you want the indices, use `for...in` (gives the keys) or `xs.forEach((x, i) => ...)`.",
  ),
};
const Q_CONTINUE = {
  question: P("¿Qué hace `continue` dentro de un bucle?", "What does `continue` do inside a loop?"),
  options: [
    P("Salta a la SIGUIENTE iteración, sin salir del bucle", "Jumps to the NEXT iteration, without leaving the loop"),
    P("Sale del bucle por completo", "Exits the loop entirely"),
    P("Reinicia el bucle desde el principio", "Restarts the loop from the start"),
    P("No hace nada", "Does nothing"),
  ],
  correct: 0,
  explanation: P(
    "`continue` se salta el resto del cuerpo y pasa a la siguiente vuelta; `break` en cambio ABANDONA el bucle. Útil para ignorar ciertos elementos sin dejar de recorrer.",
    "`continue` skips the rest of the body and moves to the next round; `break` instead LEAVES the loop. Handy to ignore certain elements without stopping the iteration.",
  ),
};
const Q_ARRAY_NEW = {
  question: P("¿Cómo se crea un array vacío al que ir añadiendo elementos?", "How do you create an empty array to keep adding elements to?"),
  options: [
    P("const r = [];", "const r = [];"),
    P("const r = {};", "const r = {};"),
    P("const r = new List();", "const r = new List();"),
    P("const r = array();", "const r = array();"),
  ],
  correct: 0,
  explanation: P(
    "`[]` es un array vacío; `{}` sería un OBJETO. Se le añaden elementos con `r.push(x)`. Es el patrón típico para construir un resultado dentro de un bucle.",
    "`[]` is an empty array; `{}` would be an OBJECT. You add elements with `r.push(x)`. It's the usual pattern to build a result inside a loop.",
  ),
};

/** Capítulo 2 · Control de flujo: bucles y arrays. */
export const SYL_JS_COMMUNITY_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_FOR, Q_PUSH, Q_LEN] },
  c2_niebla: { kind: "battle", questions: [Q_WHILE, Q_BREAK, Q_CONTINUE] },
  c2_sauce: { kind: "battle", questions: [Q_FOROF, Q_ARRAY_INDEX, Q_ARRAY_NEW] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza a sus muertos. Recorre la horda y quédate sólo con los golpes que de verdad hieren: un bucle y un array.",
      "The Barrow-wight raises its dead. Walk the horde and keep only the blows that truly harm: a loop and an array.",
    ),
    challenge: {
      topic: P("Bucles y arrays", "Loops and arrays"),
      instructions: P(
        "Escribe `filtrarFuertes(danios, minimo)` que devuelva un array NUEVO con los daños que sean MAYORES O IGUALES que `minimo`. Recórrelo con un bucle y añade con `push`.\n\nEjemplo: `filtrarFuertes([3, 7, 2, 9], 5)` → `[7, 9]`.",
        "Write `filtrarFuertes(danios, minimo)` returning a NEW array with the damages GREATER THAN OR EQUAL to `minimo`. Iterate with a loop and add with `push`.\n\nExample: `filtrarFuertes([3, 7, 2, 9], 5)` → `[7, 9]`.",
      ),
      starter_code: "function filtrarFuertes(danios, minimo) {\n}\n",
      blocks: [
        "function filtrarFuertes(danios, minimo) {",
        "  return danios.filter((d) => d >= minimo);",
        "}",
        "  return danios.filter((d) => d > minimo);",
      ],
      hints: [
        P("Empieza con un array vacío y recórrelos: `for (const d of danios)`.", "Start with an empty array and iterate: `for (const d of danios)`."),
        P("`if (d >= minimo) r.push(d);`.", "`if (d >= minimo) r.push(d);`."),
      ],
      test_cases: [
        { input: "filtrarFuertes([3, 7, 2, 9], 5)", expected: [7, 9], description: P("Sólo los fuertes", "Only the strong ones"), raw: true },
        { input: "filtrarFuertes([1, 2], 5)", expected: [], description: P("Ninguno llega", "None reaches it"), raw: true },
        { input: "filtrarFuertes([5, 6], 5)", expected: [5, 6], description: P("El 5 entra (>=)", "5 counts (>=)"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino del Camino", "The Scroll of the Path"),
    lore_intro: P(
      "Junto a la Cerca, un aviso enseña a recorrer y repetir sin cansarse.",
      "By the Hedge, a notice teaches how to traverse and repeat without tiring.",
    ),
    scroll: {
      topic: P("Control de flujo: bucles y arrays", "Control flow: loops and arrays"),
      sections: [
        {
          heading: P("for...of: recorrer un array", "for...of: iterate an array"),
          body: P(
            "`for (const x of xs)` toma cada VALOR del array. Para acumular resultados, empieza con un array vacío y usa `push`.",
            "`for (const x of xs)` takes each VALUE of the array. To collect results, start with an empty array and use `push`.",
          ),
          code: "const r = [];\nfor (const n of [1, 2, 3]) {\n  r.push(n * 2);\n}\n// r === [2, 4, 6]",
        },
        {
          heading: P("while: repetir mientras algo sea cierto", "while: repeat while something holds"),
          body: P(
            "`while (cond)` repite hasta que la condición deje de cumplirse. Úsalo cuando no sabes cuántas vueltas harán falta.",
            "`while (cond)` repeats until the condition stops holding. Use it when you don't know how many turns you'll need.",
          ),
          code: "let vida = 100;\nlet golpes = 0;\nwhile (vida > 0) {\n  vida -= 30;\n  golpes++;\n}",
        },
        {
          heading: P("Arrays: length y push", "Arrays: length and push"),
          body: P(
            "`xs.length` (propiedad, sin paréntesis) da el número de elementos. `xs.push(x)` añade al final. `Math.max(0, n)` acota por abajo.",
            "`xs.length` (a property, no parentheses) gives the element count. `xs.push(x)` appends. `Math.max(0, n)` clamps from below.",
          ),
          code: "const a = ['Frodo', 'Sam'];\na.length      // 2\na.push('Merry');\nMath.max(0, -5)  // 0",
        },
      ],
      keyTakeaway: P(
        "for...of recorre valores; while repite mientras algo sea cierto; con [] + push acumulas resultados. length es propiedad, no método.",
        "for...of iterates values; while repeats while something holds; with [] + push you collect results. length is a property, not a method.",
      ),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre Sauce", "Old Man Willow"),
    lore_intro: P(
      "El sauce atrapa a los hobbits uno a uno. Recorre la lista con un bucle.",
      "The willow snares the hobbits one by one. Walk the list with a loop.",
    ),
    challenge: {
      topic: P("Bucle for sobre un array", "for loop over an array"),
      instructions: P(
        "Escribe `atrapar(nombres)` que reciba un array de nombres y devuelva un array nuevo donde cada nombre pasa a ser `'{nombre} queda atrapado'`.\n\nPor ejemplo, `atrapar(['Merry', 'Pippin'])` → `['Merry queda atrapado', 'Pippin queda atrapado']`.",
        "Write `atrapar(nombres)` that takes an array of names and returns a new array where each name becomes `'{name} queda atrapado'`.\n\nFor example, `atrapar(['Merry', 'Pippin'])` → `['Merry queda atrapado', 'Pippin queda atrapado']`.",
      ),
      starter_code: "function atrapar(nombres) {\n  const r = [];\n  return r;\n}\n",
      blocks: [
        "function atrapar(nombres) {",
        "  const r = [];",
        "  for (const n of nombres) {",
        "    r.push(`${n} queda atrapado`);",
        "  }",
        "  return r;",
        "}",
        "    r.push(n);",
        "  for (const n in nombres) {",
      ],
      hints: [
        P("`for (const n of nombres) { ... }` recorre cada nombre.", "`for (const n of nombres) { ... }` goes over each name."),
        P("Dentro: `r.push(`${n} queda atrapado`)`.", "Inside: `r.push(`${n} queda atrapado`)`."),
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
      "El frío del Tumulario drena varias vidas a la vez, pero nunca por debajo de cero.",
      "The wight's cold drains several lives at once, but never below zero.",
    ),
    challenge: {
      topic: P("Bucle con condición (Math.max)", "Loop with a condition (Math.max)"),
      instructions: P(
        "Escribe `drenarVarios(vidas, frio)` que reciba un array de vidas y un número `frio`, y devuelva un array nuevo con cada vida menos `frio`, SIN bajar de 0. Usa `Math.max(0, ...)`.\n\nEjemplo: `drenarVarios([100, 20, 5], 30)` → `[70, 0, 0]`.",
        "Write `drenarVarios(vidas, frio)` that takes an array of lives and a number `frio`, and returns a new array with each life minus `frio`, never below 0. Use `Math.max(0, ...)`.\n\nExample: `drenarVarios([100, 20, 5], 30)` → `[70, 0, 0]`.",
      ),
      starter_code: "function drenarVarios(vidas, frio) {\n  const r = [];\n  return r;\n}\n",
      blocks: [
        "function drenarVarios(vidas, frio) {",
        "  const r = [];",
        "  for (const v of vidas) {",
        "    r.push(Math.max(0, v - frio));",
        "  }",
        "  return r;",
        "}",
        "    r.push(v - frio);",
        "    r.push(Math.min(0, v - frio));",
      ],
      hints: [
        P("`for (const v of vidas)` recorre cada vida.", "`for (const v of vidas)` goes over each life."),
        P("`r.push(Math.max(0, v - frio))` nunca añade menos de 0.", "`r.push(Math.max(0, v - frio))` never adds less than 0."),
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
      "Tom canta y el hechizo se debilita golpe a golpe. ¿Cuántos versos hacen falta para romperlo?",
      "Tom sings and the spell weakens verse by verse. How many verses does it take to break it?",
    ),
    challenge: {
      topic: P("Bucle while con contador", "while loop with a counter"),
      instructions: P(
        "Escribe `romperHechizo(fuerza, golpe)` que devuelva cuántos versos (de valor `golpe`) hacen falta para reducir la `fuerza` del hechizo a 0 o menos.\n\nCada verso resta `golpe` a la fuerza. Cuenta los versos con un `while`. Si la fuerza ya es 0 o menos, hacen falta 0.",
        "Write `romperHechizo(fuerza, golpe)` that returns how many verses (of value `golpe`) it takes to reduce the spell's `fuerza` to 0 or less.\n\nEach verse subtracts `golpe`. Count the verses with a `while`. If `fuerza` is already 0 or less, it takes 0.",
      ),
      starter_code: "function romperHechizo(fuerza, golpe) {\n  let versos = 0;\n  return versos;\n}\n",
      blocks: [
        "function romperHechizo(fuerza, golpe) {",
        "  let versos = 0;",
        "  while (fuerza > 0) {",
        "    fuerza -= golpe;",
        "    versos++;",
        "  }",
        "  return versos;",
        "}",
        "  while (fuerza >= 0) {",
        "    fuerza += golpe;",
      ],
      hints: [
        P("`while (fuerza > 0)` repite mientras el hechizo resista.", "`while (fuerza > 0)` repeats while the spell holds."),
        P("Dentro: `fuerza -= golpe;` y `versos++;`.", "Inside: `fuerza -= golpe;` and `versos++;`."),
      ],
      test_cases: [
        { input: "romperHechizo(35, 10)", expected: 4, description: P("35 → 25 → 15 → 5 → -5: cuatro versos", "35 → 25 → 15 → 5 → -5: four verses"), raw: true },
        { input: "romperHechizo(30, 10)", expected: 3, description: P("Tres justos", "Exactly three"), raw: true },
        { input: "romperHechizo(0, 10)", expected: 0, description: P("Ya estaba roto", "Already broken"), raw: true },
      ],
    },
  },
};


/** Preguntas de combate sobre funciones en JavaScript. */
const Q_DEF = {
  question: P("¿Cómo se declara una función clásica en JavaScript?", "How do you declare a classic function in JavaScript?"),
  options: [
    P("function suma(a, b) { return a + b; }", "function suma(a, b) { return a + b; }"),
    P("def suma(a, b): return a + b", "def suma(a, b): return a + b"),
    P("func suma(a, b) => a + b", "func suma(a, b) => a + b"),
    P("function suma(a, b): { a + b }", "function suma(a, b): { a + b }"),
  ],
  correct: 0,
  explanation: P(
    "`function nombre(params) { ... return ... }`. El `def` es de Python; en JS el cuerpo va entre llaves y el valor se devuelve con `return`.",
    "`function name(params) { ... return ... }`. `def` is Python; in JS the body goes in braces and the value is returned with `return`.",
  ),
};
const Q_ARROW = {
  question: P("¿Qué es `(x) => x * 2`?", "What is `(x) => x * 2`?"),
  options: [
    P("Una arrow function: una función corta que devuelve x * 2", "An arrow function: a short function that returns x * 2"),
    P("Un comentario", "A comment"),
    P("Una comparación", "A comparison"),
    P("Un bucle", "A loop"),
  ],
  correct: 0,
  explanation: P(
    "Las arrow functions son una forma breve de escribir funciones. Con una sola expresión, `x => x * 2` la devuelve sin `return` ni llaves.",
    "Arrow functions are a short way to write functions. With a single expression, `x => x * 2` returns it without `return` or braces.",
  ),
};
const Q_DEFAULT = {
  question: P("¿Qué hace `function saluda(n, s = 'Hola') { ... }`?", "What does `function saluda(n, s = 'Hola') { ... }` do?"),
  options: [
    P("Da a `s` el valor 'Hola' si no se pasa argumento", "Gives `s` the value 'Hola' if no argument is passed"),
    P("Obliga a pasar siempre `s`", "Forces you to always pass `s`"),
    P("Declara `s` como constante", "Declares `s` as a constant"),
    P("Es un error de sintaxis", "It's a syntax error"),
  ],
  correct: 0,
  explanation: P(
    "Un valor por defecto se usa cuando el argumento falta (o es undefined). `saluda('Sam')` usa 'Hola'; `saluda('Sam', 'Ey')` usa 'Ey'.",
    "A default value is used when the argument is missing (or undefined). `saluda('Sam')` uses 'Hola'; `saluda('Sam', 'Ey')` uses 'Ey'.",
  ),
};
const Q_HOF = {
  question: P("¿Puede una función recibir OTRA función como argumento?", "Can a function receive ANOTHER function as an argument?"),
  options: [
    P("Sí: las funciones son valores de primera clase en JS", "Yes: functions are first-class values in JS"),
    P("No: sólo se pasan números y textos", "No: only numbers and text are passed"),
    P("Sólo con la palabra clave callback", "Only with the callback keyword"),
    P("Sólo si se declara con arrow", "Only if declared as arrow"),
  ],
  correct: 0,
  explanation: P(
    "En JS una función es un valor como cualquier otro: puedes guardarla en una variable, pasarla como argumento y devolverla. Eso son las funciones de orden superior (map, filter…).",
    "In JS a function is a value like any other: you can store it in a variable, pass it as an argument and return it. That's higher-order functions (map, filter…).",
  ),
};
const Q_RETURN = {
  question: P("Una función sin `return`, ¿qué devuelve?", "A function with no `return` returns what?"),
  options: [
    P("undefined", "undefined"),
    P("null", "null"),
    P("0", "0"),
    P("Una cadena vacía", "An empty string"),
  ],
  correct: 0,
  explanation: P(
    "Si una función no ejecuta ningún `return` (o hace `return;` a secas), devuelve `undefined`. Ojo con usar su resultado esperando un valor.",
    "If a function runs no `return` (or does a bare `return;`), it returns `undefined`. Beware of using its result expecting a value.",
  ),
};
const Q_CLOSURE_JS3 = {
  question: P("Una función devuelve otra función que usa una variable local de la primera. ¿Qué es?", "A function returns another function that uses a local variable of the first. What is it?"),
  options: [
    P("Una clausura: la función interior recuerda ese estado", "A closure: the inner function remembers that state"),
    P("Una variable global", "A global variable"),
    P("Un error: la variable ya no existe", "An error: the variable no longer exists"),
    P("Una función pura", "A pure function"),
  ],
  correct: 0,
  explanation: P(
    "Una clausura captura las variables de su entorno y las mantiene vivas mientras exista. Por eso `crearContador()` puede devolver funciones que recuerdan su propio contador.",
    "A closure captures the variables of its environment and keeps them alive while it exists. That's why `crearContador()` can return functions that remember their own counter.",
  ),
};
const Q_REST = {
  question: P("¿Qué hace `...nums` en `function suma(...nums) {}`?", "What does `...nums` do in `function suma(...nums) {}`?"),
  options: [
    P("Recoge TODOS los argumentos en un array `nums`", "Gathers ALL arguments into an array `nums`"),
    P("Obliga a pasar exactamente tres", "Forces exactly three to be passed"),
    P("Es un comentario", "It's a comment"),
    P("Copia el primer argumento", "Copies the first argument"),
  ],
  correct: 0,
  explanation: P(
    "El parámetro REST `...nums` mete todos los argumentos en un array: `suma(1, 2, 3)` hace `nums = [1, 2, 3]`. Va siempre el ÚLTIMO. No confundir con el spread, que hace lo contrario.",
    "The REST parameter `...nums` puts all arguments into an array: `suma(1, 2, 3)` makes `nums = [1, 2, 3]`. It always goes LAST. Don't confuse it with spread, which does the opposite.",
  ),
};
const Q_SPREAD = {
  question: P("¿Qué hace `Math.max(...[3, 7, 2])`?", "What does `Math.max(...[3, 7, 2])` do?"),
  options: [
    P("Expande el array en argumentos: es como `Math.max(3, 7, 2)` → 7", "Spreads the array into arguments: like `Math.max(3, 7, 2)` → 7"),
    P("Devuelve el array entero", "Returns the whole array"),
    P("Da error", "Errors"),
    P("Devuelve 3", "Returns 3"),
  ],
  correct: 0,
  explanation: P(
    "El operador SPREAD `...` esparce los elementos de un array como argumentos sueltos. También sirve para copiar/combinar: `[...a, ...b]` o `{ ...obj }`.",
    "The SPREAD operator `...` spreads an array's elements as separate arguments. It also copies/combines: `[...a, ...b]` or `{ ...obj }`.",
  ),
};
const Q_CALLBACK = {
  question: P("En `xs.map(n => n * 2)`, ¿qué es `n => n * 2`?", "In `xs.map(n => n * 2)`, what is `n => n * 2`?"),
  options: [
    P("Un callback: una función que `map` llama por cada elemento", "A callback: a function `map` calls for each element"),
    P("Una variable", "A variable"),
    P("Un bucle", "A loop"),
    P("El array resultante", "The resulting array"),
  ],
  correct: 0,
  explanation: P(
    "`map`, `filter`, `forEach`… reciben un CALLBACK y lo invocan por cada elemento. Pasas la función (no la llamas); la biblioteca decide cuándo ejecutarla. Es el corazón del estilo funcional.",
    "`map`, `filter`, `forEach`… take a CALLBACK and invoke it per element. You pass the function (don't call it); the library decides when to run it. It's the heart of the functional style.",
  ),
};

/** Capítulo 3 · Funciones: parámetros, arrow y orden superior. */
export const SYL_JS_COMMUNITY_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_DEF, Q_ARROW, Q_RETURN] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_DEFAULT, Q_HOF, Q_CALLBACK] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_CLOSURE_JS3, Q_REST, Q_SPREAD] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "«Ningún hombre vivo puede detenerme.» Forja una cuenta que RECUERDE cada golpe: una función que devuelve otra función con memoria — una clausura.",
      "\"No living man can hinder me.\" Forge a tally that REMEMBERS each blow: a function that returns another function with memory — a closure.",
    ),
    challenge: {
      topic: P("Clausuras (closures)", "Closures"),
      instructions: P(
        "Escribe `crearCuenta(inicio)` que DEVUELVA una función. Cada vez que se llame a esa función (sin argumentos), incrementa en 1 el valor (que empieza en `inicio`) y lo devuelve.\n\nEjemplos: `crearCuenta(10)()` → `11`; y llamando tres veces a la misma cuenta desde 0 → `3`.",
        "Write `crearCuenta(inicio)` that RETURNS a function. Each time that function is called (no arguments), it increments the value (starting at `inicio`) by 1 and returns it.\n\nExamples: `crearCuenta(10)()` → `11`; and calling the same tally three times from 0 → `3`.",
      ),
      starter_code: "function crearCuenta(inicio) {\n}\n",
      blocks: [
        "function crearCuenta(inicio) {",
        "  let n = inicio;",
        "  return () => ++n;",
        "}",
        "  return () => n++;",
      ],
      hints: [
        P("Guarda el estado en una variable local y devuelve una función que la usa.", "Keep the state in a local variable and return a function that uses it."),
        P("`let n = inicio; return () => { n += 1; return n; };`.", "`let n = inicio; return () => { n += 1; return n; };`."),
      ],
      test_cases: [
        { input: "crearCuenta(10)()", expected: 11, description: P("Desde 10, una llamada: 11", "From 10, one call: 11"), raw: true },
        { input: "(() => { const f = crearCuenta(0); f(); f(); return f(); })()", expected: 3, description: P("La misma cuenta recuerda: 3 llamadas", "The same tally remembers: 3 calls"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de los Montaraces", "The Rangers' Scroll"),
    lore_intro: P(
      "En el Póney Pisador, un pergamino enseña a nombrar acciones y reutilizarlas: funciones.",
      "At the Prancing Pony, a scroll teaches how to name actions and reuse them: functions.",
    ),
    scroll: {
      topic: P("Funciones: parámetros, arrow y orden superior", "Functions: parameters, arrow and higher-order"),
      sections: [
        {
          heading: P("Declarar y llamar", "Declare and call"),
          body: P(
            "Una función encapsula una acción con nombre. Recibe parámetros y devuelve un valor con `return`.",
            "A function wraps a named action. It takes parameters and returns a value with `return`.",
          ),
          code: "function viajar(nombre, destino) {\n  return `${nombre} viaja hacia ${destino}`;\n}\nviajar('Trancos', 'Rivendel');",
        },
        {
          heading: P("Arrow functions y valores por defecto", "Arrow functions and default values"),
          body: P(
            "`(x) => x * 2` es una función corta. Un parámetro puede tener valor por defecto: se usa si no se pasa.",
            "`(x) => x * 2` is a short function. A parameter can have a default value: used if none is passed.",
          ),
          code: "const doble = (x) => x * 2;\n\nfunction saludar(nombre, saludo = 'Salve') {\n  return `${saludo}, ${nombre}`;\n}",
        },
        {
          heading: P("Funciones de orden superior", "Higher-order functions"),
          body: P(
            "Una función es un valor: puedes pasarla a otra función o devolverla. Así se construyen piezas reutilizables.",
            "A function is a value: you can pass it to another function or return it. That's how reusable pieces are built.",
          ),
          code: "function aplicarDoble(fn, x) {\n  return fn(fn(x));   // llama fn dos veces\n}\naplicarDoble((n) => n + 1, 5);   // 7",
        },
      ],
      keyTakeaway: P(
        "function declara; return devuelve (o undefined si no hay). Las arrow (=>) son cortas, los parámetros admiten valor por defecto, y una función puede pasarse o devolverse como cualquier valor.",
        "function declares; return returns (or undefined if none). Arrows (=>) are short, parameters can have defaults, and a function can be passed or returned like any value.",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("Trancos, el Montaraz", "Strider the Ranger"),
    lore_intro: P(
      "Un montaraz saluda distinto según la ocasión. Escribe la función que lo haga.",
      "A ranger greets differently depending on the moment. Write the function that does it.",
    ),
    challenge: {
      topic: P("Función con valor por defecto", "Function with a default value"),
      instructions: P(
        "Escribe `saludar(nombre, saludo = 'Salve')` que devuelva `'{saludo}, {nombre}'`.\n\nSi no se pasa `saludo`, usa 'Salve'. Ejemplos: `saludar('Frodo')` → `'Salve, Frodo'`; `saludar('Sam', 'Hola')` → `'Hola, Sam'`.",
        "Write `saludar(nombre, saludo = 'Salve')` returning `'{saludo}, {nombre}'`.\n\nIf `saludo` isn't passed, use 'Salve'. Examples: `saludar('Frodo')` → `'Salve, Frodo'`; `saludar('Sam', 'Hola')` → `'Hola, Sam'`.",
      ),
      starter_code: "function saludar(nombre, saludo = 'Salve') {\n}\n",
      blocks: [
        "function saludar(nombre, saludo = 'Salve') {",
        "  return `${saludo}, ${nombre}`;",
        "}",
        "function saludar(nombre, saludo) {",
      ],
      hints: [
        P("El valor por defecto va en la firma: `(nombre, saludo = 'Salve')`.", "The default goes in the signature: `(nombre, saludo = 'Salve')`."),
        P("`return `${saludo}, ${nombre}``;", "`return `${saludo}, ${nombre}``;"),
      ],
      test_cases: [
        { input: "saludar('Frodo')", expected: "Salve, Frodo", description: P("Sin saludo: usa el por defecto", "No greeting: uses the default"), raw: true },
        { input: "saludar('Sam', 'Hola')", expected: "Hola, Sam", description: P("Con saludo propio", "With a custom greeting"), raw: true },
        { input: "saludar('Merry', 'Ey')", expected: "Ey, Merry", description: P("Otro saludo", "Another greeting"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas de los Túmulos", "The Barrow-blades"),
    lore_intro: P(
      "Una hoja encantada aplica su filo dos veces. En JS, una función puede recibir otra y usarla.",
      "An enchanted blade applies its edge twice. In JS, a function can take another and use it.",
    ),
    challenge: {
      topic: P("Funciones de orden superior", "Higher-order functions"),
      instructions: P(
        "Escribe `aplicarDoble(fn, x)` que llame a la función `fn` DOS veces sobre `x` y devuelva el resultado: `fn(fn(x))`.\n\nEjemplo: `aplicarDoble((n) => n + 1, 5)` → `7`.",
        "Write `aplicarDoble(fn, x)` that calls the function `fn` TWICE on `x` and returns the result: `fn(fn(x))`.\n\nExample: `aplicarDoble((n) => n + 1, 5)` → `7`.",
      ),
      starter_code: "function aplicarDoble(fn, x) {\n}\n",
      blocks: [
        "function aplicarDoble(fn, x) {",
        "  return fn(fn(x));",
        "}",
        "  return fn(x);",
      ],
      hints: [
        P("`fn` es una función: la llamas con paréntesis, `fn(x)`.", "`fn` is a function: call it with parentheses, `fn(x)`."),
        P("`return fn(fn(x));` — el resultado de la primera llamada entra en la segunda.", "`return fn(fn(x));` — the first call's result feeds the second."),
      ],
      test_cases: [
        { input: "aplicarDoble((n) => n + 1, 5)", expected: 7, description: P("+1 dos veces", "+1 twice"), raw: true },
        { input: "aplicarDoble((n) => n * 2, 3)", expected: 12, description: P("×2 dos veces", "×2 twice"), raw: true },
        { input: "aplicarDoble((s) => s + '!', 'ea')", expected: "ea!!", description: P("También con textos", "Works with text too"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P(
      "Forja un arma que recuerde su daño. Una función puede DEVOLVER otra función que lo conserva.",
      "Forge a weapon that remembers its damage. A function can RETURN another function that keeps it.",
    ),
    challenge: {
      topic: P("Closures: devolver una función", "Closures: returning a function"),
      instructions: P(
        "Escribe `crearGolpe(danio)` que DEVUELVA una función. Esa función, al llamarla sin argumentos, devuelve el `danio` con el que se creó.\n\nEjemplo: `crearGolpe(20)()` → `20`.",
        "Write `crearGolpe(danio)` that RETURNS a function. That function, called with no arguments, returns the `danio` it was created with.\n\nExample: `crearGolpe(20)()` → `20`.",
      ),
      starter_code: "function crearGolpe(danio) {\n}\n",
      blocks: [
        "function crearGolpe(danio) {",
        "  return () => danio;",
        "}",
        "  return danio;",
      ],
      hints: [
        P("`crearGolpe` debe `return` una función, p. ej. una arrow.", "`crearGolpe` must `return` a function, e.g. an arrow."),
        P("`return () => danio;` — la función interior recuerda `danio` (closure).", "`return () => danio;` — the inner function remembers `danio` (closure)."),
      ],
      test_cases: [
        { input: "crearGolpe(20)()", expected: 20, description: P("Recuerda su daño", "Remembers its damage"), raw: true },
        { input: "crearGolpe(7)()", expected: 7, description: P("Con otro valor", "With another value"), raw: true },
        { input: "typeof crearGolpe(1)", expected: "function", description: P("Devuelve una función", "Returns a function"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre objetos y métodos de array. */
const Q_OBJ = {
  question: P("¿Cómo se crea un objeto literal en JS?", "How do you create an object literal in JS?"),
  options: [
    P("{ nombre: 'Frodo', edad: 50 }", "{ nombre: 'Frodo', edad: 50 }"),
    P("[ nombre: 'Frodo' ]", "[ nombre: 'Frodo' ]"),
    P("new Object[nombre = 'Frodo']", "new Object[nombre = 'Frodo']"),
    P("( nombre = 'Frodo' )", "( nombre = 'Frodo' )"),
  ],
  correct: 0,
  explanation: P(
    "Un objeto agrupa pares clave: valor entre llaves `{ }`, separados por comas. Los corchetes `[ ]` son para arrays.",
    "An object groups key: value pairs inside braces `{ }`, separated by commas. Brackets `[ ]` are for arrays.",
  ),
};
const Q_PROP = {
  question: P("Con `const h = { nombre: 'Sam' }`, ¿cómo lees el nombre?", "With `const h = { nombre: 'Sam' }`, how do you read the name?"),
  options: [
    P("h.nombre  (o h['nombre'])", "h.nombre  (or h['nombre'])"),
    P("h->nombre", "h->nombre"),
    P("h::nombre", "h::nombre"),
    P("nombre(h)", "nombre(h)"),
  ],
  correct: 0,
  explanation: P(
    "Se accede con punto (`h.nombre`) o con corchetes y la clave como texto (`h['nombre']`). La flecha `->` es de PHP.",
    "Access it with a dot (`h.nombre`) or brackets with the key as text (`h['nombre']`). The `->` arrow is PHP.",
  ),
};
const Q_METHOD = {
  question: P("Dentro de un método de objeto, ¿a qué apunta `this`?", "Inside an object method, what does `this` point to?"),
  options: [
    P("Al propio objeto que contiene el método", "To the object that contains the method"),
    P("Al primer argumento", "To the first argument"),
    P("Siempre a undefined", "Always to undefined"),
    P("A la función global", "To the global function"),
  ],
  correct: 0,
  explanation: P(
    "En un método llamado como `obj.metodo()`, `this` es `obj`: así el método lee las propiedades de su propio objeto (`this.velocidad`).",
    "In a method called as `obj.method()`, `this` is `obj`: so the method reads its own object's properties (`this.velocidad`).",
  ),
};
const Q_MAP = {
  question: P("¿Qué devuelve `[1, 2, 3].map(n => n * 2)`?", "What does `[1, 2, 3].map(n => n * 2)` return?"),
  options: [
    P("[2, 4, 6]", "[2, 4, 6]"),
    P("6", "6"),
    P("[1, 2, 3]", "[1, 2, 3]"),
    P("12", "12"),
  ],
  correct: 0,
  explanation: P(
    "`map` crea un array NUEVO aplicando la función a cada elemento. No modifica el original y siempre devuelve un array del mismo tamaño.",
    "`map` builds a NEW array applying the function to each element. It doesn't change the original and always returns an array of the same length.",
  ),
};
const Q_FILTER = {
  question: P("¿Qué devuelve `[10, 20, 80].filter(n => n < 50)`?", "What does `[10, 20, 80].filter(n => n < 50)` return?"),
  options: [
    P("[10, 20]", "[10, 20]"),
    P("2", "2"),
    P("[80]", "[80]"),
    P("true", "true"),
  ],
  correct: 0,
  explanation: P(
    "`filter` devuelve un array con SÓLO los elementos para los que la función da `true`. Para contarlos, añade `.length`.",
    "`filter` returns an array with ONLY the elements for which the function returns `true`. To count them, add `.length`.",
  ),
};
const Q_REDUCE = {
  question: P("¿Qué hace `[5, 4].reduce((a, b) => a + b, 0)`?", "What does `[5, 4].reduce((a, b) => a + b, 0)` do?"),
  options: [
    P("Suma todo el array a un solo valor: 9", "Reduces the whole array to one value: 9"),
    P("Devuelve [5, 4]", "Returns [5, 4]"),
    P("Devuelve el mayor: 5", "Returns the largest: 5"),
    P("Da error sin tercer argumento", "Errors without a third argument"),
  ],
  correct: 0,
  explanation: P(
    "`reduce` combina el array en un único valor. El `0` es el acumulador inicial; en cada paso `a` es lo acumulado y `b` el elemento actual.",
    "`reduce` combines the array into a single value. The `0` is the initial accumulator; each step `a` is the running total and `b` the current element.",
  ),
};
const Q_DESTRUCT = {
  question: P("Con `const h = { nombre: 'Sam', edad: 38 }`, ¿qué hace `const { nombre } = h`?", "With `const h = { nombre: 'Sam', edad: 38 }`, what does `const { nombre } = h` do?"),
  options: [
    P("Extrae la propiedad `nombre` a una variable: `nombre === 'Sam'`", "Extracts the `nombre` property into a variable: `nombre === 'Sam'`"),
    P("Copia el objeto entero", "Copies the whole object"),
    P("Borra `nombre` del objeto", "Deletes `nombre` from the object"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "La DESESTRUCTURACIÓN saca propiedades a variables por nombre: `const { nombre, edad } = h`. Muy usada en los parámetros: `function f({ nombre }) { ... }`.",
    "DESTRUCTURING pulls properties into variables by name: `const { nombre, edad } = h`. Widely used in parameters: `function f({ nombre }) { ... }`.",
  ),
};
const Q_FIND = {
  question: P("¿Qué devuelve `[3, 7, 2].find(n => n > 5)`?", "What does `[3, 7, 2].find(n => n > 5)` return?"),
  options: [
    P("7 (el PRIMER elemento que cumple)", "7 (the FIRST element that matches)"),
    P("[7] (un array)", "[7] (an array)"),
    P("true", "true"),
    P("Todos los que cumplen", "All that match"),
  ],
  correct: 0,
  explanation: P(
    "`find` devuelve el PRIMER elemento que cumple la condición (o `undefined` si ninguno). A diferencia de `filter`, que devuelve un ARRAY con todos los que cumplen.",
    "`find` returns the FIRST element that matches the condition (or `undefined` if none). Unlike `filter`, which returns an ARRAY with all matches.",
  ),
};
const Q_OBJ_SHORT = {
  question: P("Si tienes una variable `nombre`, ¿qué crea `{ nombre }`?", "If you have a variable `nombre`, what does `{ nombre }` create?"),
  options: [
    P("Un objeto `{ nombre: nombre }` (abreviatura de propiedad)", "An object `{ nombre: nombre }` (property shorthand)"),
    P("Un bloque de código", "A code block"),
    P("Un array con un elemento", "An array with one element"),
    P("Un error de sintaxis", "A syntax error"),
  ],
  correct: 0,
  explanation: P(
    "La abreviatura de propiedades: si la clave y la variable se llaman igual, `{ nombre }` equivale a `{ nombre: nombre }`. Ahorra repetir el nombre al construir objetos.",
    "Property shorthand: if the key and the variable share a name, `{ nombre }` equals `{ nombre: nombre }`. Saves repeating the name when building objects.",
  ),
};

/** Capítulo 4 · Objetos, métodos (this) y arrays (map, filter, reduce). */
export const SYL_JS_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_OBJ, Q_PROP, Q_MAP] },
  c4_lobo: { kind: "battle", questions: [Q_METHOD, Q_FILTER, Q_DESTRUCT] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Los Nueve entran en el agua. De la lista de jinetes, saca sólo el NOMBRE de los que aún resisten la crecida: filter + map sobre objetos.",
      "The Nine enter the water. From the list of riders, pull only the NAME of those still resisting the flood: filter + map over objects.",
    ),
    challenge: {
      topic: P("Objetos y métodos de array (filter + map)", "Objects and array methods (filter + map)"),
      instructions: P(
        "Escribe `nombresFuertes(guerreros, min)` que reciba un array de objetos `{ nombre, poder }` y devuelva un array SÓLO con los `nombre` de aquellos cuyo `poder` sea MAYOR O IGUAL que `min`, en orden.\n\nEjemplo: `nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)` → `['Aragorn']`.",
        "Write `nombresFuertes(guerreros, min)` taking an array of objects `{ nombre, poder }` and returning an array with ONLY the `nombre`s of those whose `poder` is GREATER THAN OR EQUAL to `min`, in order.\n\nExample: `nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)` → `['Aragorn']`.",
      ),
      starter_code: "function nombresFuertes(guerreros, min) {\n}\n",
      blocks: [
        "function nombresFuertes(guerreros, min) {",
        "  return guerreros.filter((g) => g.poder >= min).map((g) => g.nombre);",
        "}",
        "  return guerreros.filter((g) => g.poder >= min);",
      ],
      hints: [
        P("Primero filtra por poder: `guerreros.filter(g => g.poder >= min)`.", "First filter by power: `guerreros.filter(g => g.poder >= min)`."),
        P("Luego transforma a nombres: `.map(g => g.nombre)`.", "Then transform to names: `.map(g => g.nombre)`."),
      ],
      test_cases: [
        { input: "nombresFuertes([{ nombre: 'Aragorn', poder: 80 }, { nombre: 'Frodo', poder: 20 }], 50)", expected: ["Aragorn"], description: P("Sólo el fuerte", "Only the strong one"), raw: true },
        { input: "nombresFuertes([], 50)", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
        { input: "nombresFuertes([{ nombre: 'Gimli', poder: 60 }, { nombre: 'Legolas', poder: 70 }], 50)", expected: ["Gimli", "Legolas"], description: P("Ambos, en orden", "Both, in order"), raw: true },
      ],
    },
  },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_REDUCE, Q_FIND, Q_OBJ_SHORT] },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino del Cartógrafo", "The Cartographer's Scroll"),
    lore_intro: P(
      "Antes del Vado, un pergamino enseña a agrupar datos con nombre (objetos) y a transformar listas enteras de un golpe (map, filter, reduce).",
      "Before the Ford, a scroll teaches how to group named data (objects) and transform whole lists at once (map, filter, reduce).",
    ),
    scroll: {
      topic: P("Objetos y métodos de array", "Objects and array methods"),
      sections: [
        {
          heading: P("Objetos: datos con nombre", "Objects: named data"),
          body: P(
            "Un objeto agrupa valores bajo claves. Se leen con punto (`jinete.nombre`). Un método es una función guardada en el objeto: dentro, `this` es el propio objeto.",
            "An object groups values under keys. Read them with a dot (`jinete.nombre`). A method is a function stored on the object: inside it, `this` is the object itself.",
          ),
          code: "const montura = {\n  velocidadMaxima: 120,\n  galopar(deseada) {\n    return Math.min(this.velocidadMaxima, deseada);\n  },\n};\nmontura.galopar(200); // 120",
        },
        {
          heading: P("map y filter", "map and filter"),
          body: P(
            "`map` transforma cada elemento y devuelve un array nuevo del mismo tamaño. `filter` se queda sólo con los que cumplen una condición. Ninguno modifica el original.",
            "`map` transforms each element and returns a new array of the same length. `filter` keeps only those matching a condition. Neither changes the original.",
          ),
          code: "const jinetes = [{ fuerza: 10 }, { fuerza: 80 }];\njinetes.map(j => j.fuerza);          // [10, 80]\njinetes.filter(j => j.fuerza < 50);  // [{ fuerza: 10 }]",
        },
        {
          heading: P("reduce: plegar a un solo valor", "reduce: fold to a single value"),
          body: P(
            "`reduce` combina todo el array en un único resultado. Recibe el acumulador y el elemento actual, y un valor inicial (aquí, 0).",
            "`reduce` combines the whole array into one result. It receives the accumulator and the current element, plus an initial value (here, 0).",
          ),
          code: "[5, 4].reduce((total, f) => total + f, 0); // 9",
        },
      ],
      keyTakeaway: P(
        "Los objetos agrupan datos con nombre y `this` apunta al objeto dentro de sus métodos. Para listas: map transforma, filter selecciona, reduce resume — y ninguno toca el array original.",
        "Objects group named data and `this` points to the object inside its methods. For lists: map transforms, filter selects, reduce summarizes — and none of them mutate the original array.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("Asfaloth, el Corcel Élfico", "Asfaloth, the Elven Steed"),
    lore_intro: P(
      "Ningún corcel supera su límite. Crea una montura que se conozca a sí misma con this.",
      "No steed exceeds its limit. Build a mount that knows itself through this.",
    ),
    challenge: {
      topic: P("Objetos y this", "Objects and this"),
      instructions: P(
        "Escribe `crearMontura(velocidadMaxima)` que DEVUELVA un objeto con:\n• la propiedad `velocidadMaxima`,\n• el método `galopar(deseada)` que devuelva la velocidad deseada sin superar nunca `this.velocidadMaxima`.\n\nEjemplo: `crearMontura(120).galopar(200)` → `120`.",
        "Write `crearMontura(velocidadMaxima)` that RETURNS an object with:\n• the property `velocidadMaxima`,\n• the method `galopar(deseada)` returning the wanted speed never above `this.velocidadMaxima`.\n\nExample: `crearMontura(120).galopar(200)` → `120`.",
      ),
      starter_code: "function crearMontura(velocidadMaxima) {\n}\n",
      blocks: [
        "function crearMontura(velocidadMaxima) {",
        "  return {",
        "    velocidadMaxima,",
        "    galopar(v) { return Math.min(v, velocidadMaxima); },",
        "  };",
        "}",
        "    galopar(v) { return Math.max(v, velocidadMaxima); },",
      ],
      hints: [
        P("Devuelve un objeto literal: `return { velocidadMaxima, galopar(deseada) { ... } };`.", "Return an object literal: `return { velocidadMaxima, galopar(deseada) { ... } };`."),
        P("Dentro del método usa `this.velocidadMaxima` y `Math.min(...)`.", "Inside the method use `this.velocidadMaxima` and `Math.min(...)`."),
      ],
      test_cases: [
        { input: "crearMontura(120).galopar(90)", expected: 90, description: P("Por debajo del límite", "Below the limit"), raw: true },
        { input: "crearMontura(120).galopar(200)", expected: 120, description: P("Nunca supera el máximo", "Never above the max"), raw: true },
        { input: "crearMontura(120).velocidadMaxima", expected: 120, description: P("Expone su propiedad", "Exposes its property"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Reckoning of the Nine"),
    lore_intro: P(
      "Suma la fuerza de todos los jinetes en un solo número. Eso es reduce.",
      "Add up the strength of every rider into a single number. That's reduce.",
    ),
    challenge: {
      topic: P("Arrays: reduce", "Arrays: reduce"),
      instructions: P(
        "Escribe `fuerzaTotal(fuerzas)` que reciba un array de números y devuelva su SUMA usando `reduce`. Con un array vacío, devuelve `0`.\n\nEjemplo: `fuerzaTotal([5, 4])` → `9`.",
        "Write `fuerzaTotal(fuerzas)` taking an array of numbers and returning their SUM using `reduce`. For an empty array, return `0`.\n\nExample: `fuerzaTotal([5, 4])` → `9`.",
      ),
      starter_code: "function fuerzaTotal(fuerzas) {\n}\n",
      blocks: [
        "function fuerzaTotal(fuerzas) {",
        "  return fuerzas.reduce((s, f) => s + f, 0);",
        "}",
        "  return fuerzas.reduce((s, f) => s + f);",
      ],
      hints: [
        P("`reduce` recibe un acumulador y el elemento actual: `(a, b) => a + b`.", "`reduce` takes an accumulator and the current element: `(a, b) => a + b`."),
        P("No olvides el valor inicial: `fuerzas.reduce((a, b) => a + b, 0)`.", "Don't forget the initial value: `fuerzas.reduce((a, b) => a + b, 0)`."),
      ],
      test_cases: [
        { input: "fuerzaTotal([5, 4])", expected: 9, description: P("Cinco más cuatro", "Five plus four"), raw: true },
        { input: "fuerzaTotal([1, 2, 3])", expected: 6, description: P("Varios sumandos", "Several addends"), raw: true },
        { input: "fuerzaTotal([])", expected: 0, description: P("Array vacío: el inicial", "Empty array: the initial value"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P(
      "La crecida arrastra a los jinetes más débiles. Quédate sólo con ellos: filter.",
      "The flood sweeps away the weakest riders. Keep only those: filter.",
    ),
    challenge: {
      topic: P("Arrays: filter + length", "Arrays: filter + length"),
      instructions: P(
        "La crecida tiene fuerza 50. Escribe `arrastrados(fuerzas)` que reciba un array con la fuerza de cada jinete y devuelva CUÁNTOS son arrastrados: los que tengan fuerza MENOR que 50.\n\nEjemplo: `arrastrados([10, 20, 80])` → `2`.",
        "The flood has strength 50. Write `arrastrados(fuerzas)` taking an array of each rider's strength and returning HOW MANY are swept away: those with strength LESS than 50.\n\nExample: `arrastrados([10, 20, 80])` → `2`.",
      ),
      starter_code: "function arrastrados(fuerzas) {\n}\n",
      blocks: [
        "function arrastrados(fuerzas) {",
        "  return fuerzas.filter((f) => f < 50).length;",
        "}",
        "  return fuerzas.filter((f) => f > 50).length;",
      ],
      hints: [
        P("Primero selecciona: `fuerzas.filter(f => f < 50)`.", "First select: `fuerzas.filter(f => f < 50)`."),
        P("Luego cuenta con `.length`.", "Then count with `.length`."),
      ],
      test_cases: [
        { input: "arrastrados([10, 20, 80])", expected: 2, description: P("Dos débiles caen; el fuerte resiste", "Two weak ones fall; the strong resists"), raw: true },
        { input: "arrastrados([60, 70])", expected: 0, description: P("Ninguno cede", "None gives in"), raw: true },
        { input: "arrastrados([5, 5, 5, 5, 5, 5, 5, 5, 5])", expected: 9, description: P("Los Nueve son barridos", "The Nine are swept away"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las runas del Vado", "The runes of the Ford"),
    lore_intro: P(
      "De la lista de jinetes, extrae sólo sus nombres. Transformar cada elemento es map.",
      "From the list of riders, pull out only their names. Transforming each element is map.",
    ),
    challenge: {
      topic: P("Arrays: map sobre objetos", "Arrays: map over objects"),
      instructions: P(
        "Escribe `nombres(jinetes)` que reciba un array de objetos `{ nombre, fuerza }` y devuelva un array SÓLO con los `nombre`, en el mismo orden.\n\nEjemplo: `nombres([{ nombre: 'Khamûl', fuerza: 8 }])` → `['Khamûl']`.",
        "Write `nombres(jinetes)` taking an array of objects `{ nombre, fuerza }` and returning an array with ONLY the `nombre`s, in the same order.\n\nExample: `nombres([{ nombre: 'Khamûl', fuerza: 8 }])` → `['Khamûl']`.",
      ),
      starter_code: "function nombres(jinetes) {\n}\n",
      blocks: [
        "function nombres(jinetes) {",
        "  return jinetes.map((j) => j.nombre);",
        "}",
        "  return jinetes.map((j) => j.fuerza);",
      ],
      hints: [
        P("`map` transforma cada elemento: `jinetes.map(j => ...)`.", "`map` transforms each element: `jinetes.map(j => ...)`."),
        P("De cada jinete quieres su nombre: `j => j.nombre`.", "From each rider you want its name: `j => j.nombre`."),
      ],
      test_cases: [
        { input: "nombres([{ nombre: 'Khamul', fuerza: 8 }, { nombre: 'Rey Brujo', fuerza: 9 }])", expected: ["Khamul", "Rey Brujo"], description: P("Extrae los nombres en orden", "Pulls the names in order"), raw: true },
        { input: "nombres([])", expected: [], description: P("Lista vacía → array vacío", "Empty list → empty array"), raw: true },
        { input: "nombres([{ nombre: 'Nazgul', fuerza: 5 }]).length", expected: 1, description: P("Mismo tamaño que la entrada", "Same length as the input"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre clases en JS. */
const Q_CLASS = {
  question: P("¿Cómo se declara una clase en JS?", "How do you declare a class in JS?"),
  options: [
    P("class Hobbit { ... }", "class Hobbit { ... }"),
    P("function class Hobbit { ... }", "function class Hobbit { ... }"),
    P("def Hobbit: ...", "def Hobbit: ..."),
    P("new class = Hobbit", "new class = Hobbit"),
  ],
  correct: 0,
  explanation: P(
    "`class Nombre { ... }` declara una clase. Dentro van el `constructor` y los métodos, sin comas entre ellos.",
    "`class Name { ... }` declares a class. Inside go the `constructor` and methods, with no commas between them.",
  ),
};
const Q_CTOR = {
  question: P("¿Para qué sirve el `constructor` de una clase?", "What is a class `constructor` for?"),
  options: [
    P("Inicializa el objeto al hacer `new`, recibiendo los datos iniciales", "It initializes the object on `new`, receiving the initial data"),
    P("Destruye el objeto al terminar", "It destroys the object at the end"),
    P("Es un método estático obligatorio", "It's a required static method"),
    P("Compara dos objetos", "It compares two objects"),
  ],
  correct: 0,
  explanation: P(
    "`constructor(...)` se ejecuta una vez, cuando haces `new Clase(...)`. Ahí asignas el estado inicial con `this.x = ...`.",
    "`constructor(...)` runs once, when you do `new Class(...)`. That's where you set the initial state with `this.x = ...`.",
  ),
};
const Q_THIS_CLASS = {
  question: P("Dentro de un método de clase, ¿qué es `this`?", "Inside a class method, what is `this`?"),
  options: [
    P("La instancia sobre la que se llamó el método", "The instance the method was called on"),
    P("La clase en sí", "The class itself"),
    P("El constructor", "The constructor"),
    P("Siempre el objeto global", "Always the global object"),
  ],
  correct: 0,
  explanation: P(
    "`this` es el objeto concreto: `frodo.saludar()` hace que dentro `this` sea `frodo`. Así cada instancia trabaja con sus propios datos.",
    "`this` is the concrete object: `frodo.greet()` makes `this` be `frodo` inside. So each instance works with its own data.",
  ),
};
const Q_PRIVATE = {
  question: P("¿Qué hace un campo privado `#calor` en una clase?", "What does a private field `#calor` do in a class?"),
  options: [
    P("Sólo es accesible desde dentro de la clase; fuera da error", "It's only accessible inside the class; outside it errors"),
    P("Lo hace de sólo lectura", "It makes it read-only"),
    P("Lo comparte entre todas las instancias", "It shares it across all instances"),
    P("Es un comentario", "It's a comment"),
  ],
  correct: 0,
  explanation: P(
    "El prefijo `#` declara un campo privado real: `obj.#calor` desde fuera lanza error de sintaxis. Es el encapsulamiento de JS, equivalente a `private` en PHP.",
    "The `#` prefix declares a truly private field: `obj.#calor` from outside throws a syntax error. It's JS encapsulation, equivalent to PHP's `private`.",
  ),
};
const Q_STATIC_JS = {
  question: P("Con `static UMBRAL = 20` en la clase Nieve, ¿cómo lo lees?", "With `static UMBRAL = 20` in class Nieve, how do you read it?"),
  options: [
    P("Nieve.UMBRAL", "Nieve.UMBRAL"),
    P("this.UMBRAL", "this.UMBRAL"),
    P("new Nieve().UMBRAL", "new Nieve().UMBRAL"),
    P("#UMBRAL", "#UMBRAL"),
  ],
  correct: 0,
  explanation: P(
    "Un miembro `static` pertenece a la clase, no a la instancia: se lee con `Nieve.UMBRAL`. Desde dentro puedes usar `Nieve.UMBRAL` (o `this.constructor.UMBRAL`).",
    "A `static` member belongs to the class, not the instance: read it as `Nieve.UMBRAL`. Inside you can use `Nieve.UMBRAL` (or `this.constructor.UMBRAL`).",
  ),
};
const Q_FREEZE = {
  question: P("¿Qué consigue `Object.freeze(this)` en el constructor?", "What does `Object.freeze(this)` achieve in the constructor?"),
  options: [
    P("Hace el objeto inmutable: reasignar sus propiedades falla", "It makes the object immutable: reassigning its properties fails"),
    P("Borra el objeto", "It deletes the object"),
    P("Lo copia", "It copies it"),
    P("Oculta sus propiedades", "It hides its properties"),
  ],
  correct: 0,
  explanation: P(
    "`Object.freeze` congela el objeto: en modo estricto, cualquier `obj.prop = ...` posterior lanza `TypeError`. Es la forma de crear objetos de valor inmutables en JS, como `readonly` en PHP.",
    "`Object.freeze` freezes the object: in strict mode any later `obj.prop = ...` throws a `TypeError`. It's how you build immutable value objects in JS, like `readonly` in PHP.",
  ),
};
const Q_NEW = {
  question: P("¿Qué hace `new Hobbit('Frodo')`?", "What does `new Hobbit('Frodo')` do?"),
  options: [
    P("Crea una instancia y ejecuta su `constructor` con ese argumento", "Creates an instance and runs its `constructor` with that argument"),
    P("Llama a una función normal llamada Hobbit", "Calls a normal function named Hobbit"),
    P("Copia la clase Hobbit", "Copies the Hobbit class"),
    P("Borra el objeto Hobbit", "Deletes the Hobbit object"),
  ],
  correct: 0,
  explanation: P(
    "`new` crea un objeto nuevo a partir de la clase y ejecuta su `constructor`, pasándole los argumentos. Olvidar el `new` llama la clase como función y falla (o da `undefined`).",
    "`new` creates a new object from the class and runs its `constructor`, passing the arguments. Forgetting `new` calls the class as a function and fails (or gives `undefined`).",
  ),
};
const Q_GETTER = {
  question: P("¿Cómo se lee un getter `get calor() { ... }` de una instancia `r`?", "How do you read a getter `get calor() { ... }` from an instance `r`?"),
  options: [
    P("Como una propiedad: `r.calor` (sin paréntesis)", "Like a property: `r.calor` (no parentheses)"),
    P("Como un método: `r.calor()`", "Like a method: `r.calor()`"),
    P("Con `get r.calor`", "With `get r.calor`"),
    P("No se puede leer", "It can't be read"),
  ],
  correct: 0,
  explanation: P(
    "Un `get` se accede SIN paréntesis, como si fuera una propiedad: `r.calor`. Por dentro es una función que se ejecuta al leerlo. Útil para exponer valores calculados o de sólo lectura.",
    "A `get` is accessed WITHOUT parentheses, as if it were a property: `r.calor`. Internally it's a function that runs when read. Handy to expose computed or read-only values.",
  ),
};
const Q_METHOD_CLASS = {
  question: P("¿Cómo se declara un método dentro de una `class`?", "How do you declare a method inside a `class`?"),
  options: [
    P("`golpear(x) { ... }` — sin la palabra `function`", "`golpear(x) { ... }` — without the `function` keyword"),
    P("`function golpear(x) { ... }`", "`function golpear(x) { ... }`"),
    P("`golpear: function(x) { ... }`", "`golpear: function(x) { ... }`"),
    P("`def golpear(x): { ... }`", "`def golpear(x): { ... }`"),
  ],
  correct: 0,
  explanation: P(
    "Dentro de una clase los métodos van SIN `function` ni comas: `golpear(x) { ... }`. Comparten estado por `this`. Es distinto de los objetos literales, donde sí se separan con comas.",
    "Inside a class, methods go WITHOUT `function` or commas: `golpear(x) { ... }`. They share state via `this`. It differs from object literals, where members are separated by commas.",
  ),
};

/** Capítulo 5 · Clases: constructor, campos privados (#) e inmutabilidad. */
export const SYL_JS_COMMUNITY_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_CLASS, Q_CTOR, Q_THIS_CLASS] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_PRIVATE, Q_FREEZE, Q_NEW] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Voluntad de Caradhras", "The Will of Caradhras"),
    lore_intro: P(
      "La montaña es el enemigo. Forja una hoja con su filo PROTEGIDO (privado), que valide su forja y golpee sin dañar de menos que cero.",
      "The mountain is the enemy. Forge a blade with its edge PROTECTED (private), that validates its forging and strikes without dealing below zero.",
    ),
    challenge: {
      topic: P("Clases: campos privados (#), validación y métodos", "Classes: private fields (#), validation and methods"),
      instructions: P(
        "Crea la clase `Espada` con un campo PRIVADO `#filo`:\n• el `constructor(filo)` lanza un `Error` si `filo` es negativo; si no, lo guarda,\n• el método `filo()` devuelve el filo,\n• el método `golpear(objetivo)` devuelve `objetivo - #filo`, sin bajar de 0.\n\nEjemplo: `new Espada(10).golpear(30)` → `20`.",
        "Create the class `Espada` with a PRIVATE field `#filo`:\n• the `constructor(filo)` throws an `Error` if `filo` is negative; otherwise stores it,\n• the method `filo()` returns the edge,\n• the method `golpear(objetivo)` returns `objetivo - #filo`, never below 0.\n\nExample: `new Espada(10).golpear(30)` → `20`.",
      ),
      starter_code: "class Espada {\n  #filo;\n  constructor(filo) {\n  }\n  filo() {\n  }\n  golpear(objetivo) {\n  }\n}\n",
      blocks: [
        "class Espada {",
        "  #filo;",
        "  constructor(filo) {",
        "    if (filo < 0) throw new Error('filo negativo');",
        "    this.#filo = filo;",
        "  }",
        "  filo() {",
        "    return this.#filo;",
        "  }",
        "  golpear(objetivo) {",
        "    return Math.max(0, objetivo - this.#filo);",
        "  }",
        "}",
        "    return Math.min(0, objetivo - this.#filo);",
        "    this.#filo = filo;",
      ],
      hints: [
        P("Guard clause en el constructor: `if (filo < 0) throw new Error('...');`.", "Guard clause in the constructor: `if (filo < 0) throw new Error('...');`."),
        P("`golpear` no baja de 0: `Math.max(0, objetivo - this.#filo)`.", "`golpear` doesn't go below 0: `Math.max(0, objetivo - this.#filo)`."),
      ],
      test_cases: [
        { input: "new Espada(10).golpear(30)", expected: 20, description: P("30 − 10", "30 − 10"), raw: true },
        { input: "new Espada(10).golpear(5)", expected: 0, description: P("Nunca negativo", "Never negative"), raw: true },
        { input: "new Espada(10).filo()", expected: 10, description: P("El filo se lee por su método", "The edge is read via its method"), raw: true },
        { input: "(() => { try { new Espada(-1); return false; } catch (e) { return true; } })()", expected: true, description: P("Un filo negativo se rechaza", "A negative edge is rejected"), raw: true },
      ],
    },
  },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_STATIC_JS, Q_GETTER, Q_METHOD_CLASS] },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Hielo", "The Scroll of Ice"),
    lore_intro: P(
      "Gandalf resguarda un pergamino bajo su capa. «Lo que no debe cambiar, congélalo. Lo que sí, guárdalo tras una puerta con guardia.»",
      "Gandalf shelters a scroll under his cloak. \"What must not change, freeze it. What may, keep it behind a guarded door.\"",
    ),
    scroll: {
      topic: P("Clases: constructor, campos privados e inmutabilidad", "Classes: constructor, private fields and immutability"),
      sections: [
        {
          heading: P("class y constructor", "class and constructor"),
          body: P(
            "Una clase es un molde para objetos. El `constructor` recibe los datos iniciales y los guarda en la instancia con `this`.",
            "A class is a mold for objects. The `constructor` takes the initial data and stores it on the instance with `this`.",
          ),
          code: "class Provision {\n  constructor(nombre, peso) {\n    this.nombre = nombre;\n    this.peso = peso;\n  }\n}\nconst p = new Provision('lembas', 5);",
        },
        {
          heading: P("Campos privados (#) y métodos", "Private fields (#) and methods"),
          body: P(
            "Un campo con `#` sólo se ve dentro de la clase. Los métodos son la puerta: validan antes de tocar el estado.",
            "A field with `#` is only visible inside the class. Methods are the door: they validate before touching the state.",
          ),
          code: "class Resistencia {\n  #calor = 100;\n  enfriar(g) {\n    if (g < 0) throw new Error('frío negativo');\n    this.#calor = Math.max(0, this.#calor - g);\n  }\n  getCalor() { return this.#calor; }\n}",
        },
        {
          heading: P("Inmutabilidad: Object.freeze", "Immutability: Object.freeze"),
          body: P(
            "`Object.freeze(this)` en el constructor deja el objeto de sólo lectura. Para «cambiarlo», devuelves una instancia nueva.",
            "`Object.freeze(this)` in the constructor leaves the object read-only. To \"change\" it, you return a new instance.",
          ),
          code: "class Temperatura {\n  constructor(grados) {\n    this.grados = grados;\n    Object.freeze(this);\n  }\n  conMas(g) { return new Temperatura(this.grados + g); }\n}",
        },
      ],
      keyTakeaway: P(
        "class + constructor crean objetos; `this` guarda su estado. Los campos `#` lo esconden y los métodos lo validan en la puerta; `Object.freeze` lo vuelve inmutable, y entonces «cambiar» es crear otra instancia.",
        "class + constructor create objects; `this` holds their state. `#` fields hide it and methods validate it at the door; `Object.freeze` makes it immutable, and then \"changing\" means creating another instance.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Poney", "Bill the Pony's Load"),
    lore_intro: P(
      "Una provisión es lo que es: su nombre y su peso no cambian a mitad del camino. Congela el objeto al crearlo.",
      "A provision is what it is: its name and weight don't change mid-journey. Freeze the object when you create it.",
    ),
    challenge: {
      topic: P("Clases e inmutabilidad (Object.freeze)", "Classes and immutability (Object.freeze)"),
      instructions: P(
        "Crea la clase `Provision` con un `constructor(nombre, peso)` que guarde ambos en `this` y llame a `Object.freeze(this)` para que no puedan cambiarse después.\n\nTras crearla, `p.nombre` y `p.peso` se leen; asignarlos lanza error.",
        "Create class `Provision` with a `constructor(nombre, peso)` that stores both on `this` and calls `Object.freeze(this)` so they can't change afterwards.\n\nOnce created, `p.nombre` and `p.peso` read fine; assigning them throws.",
      ),
      sut: "new Provision('lembas', 5)",
      starter_code: "class Provision {\n  constructor(nombre, peso) {\n  }\n}\n",
      blocks: [
        "class Provision {",
        "  constructor(nombre, peso) {",
        "    this.nombre = nombre;",
        "    this.peso = peso;",
        "    Object.freeze(this);",
        "  }",
        "}",
        "    Object.seal(this);",
      ],
      hints: [
        P("Asigna con `this.nombre = nombre;` y `this.peso = peso;`.", "Assign with `this.nombre = nombre;` and `this.peso = peso;`."),
        P("Al final del constructor: `Object.freeze(this);`.", "At the end of the constructor: `Object.freeze(this);`."),
      ],
      test_cases: [
        { input: "nombre", expected: "lembas", description: P("El nombre se lee", "The name reads") },
        { input: "peso", expected: 5, description: P("El peso se lee", "The weight reads") },
        {
          input: "(() => { const p = new Provision('cuerda', 2); try { p.peso = 99; return false; } catch (e) { return true; } })()",
          raw: true,
          expected: true,
          description: P("Modificarla después lanza error: está congelada", "Modifying it later throws: it's frozen"),
        },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Endurance"),
    lore_intro: P(
      "Vigila el calor de la Comunidad: que nadie lo toque desde fuera y que nunca baje de cero. Un campo privado y un método que valida.",
      "Guard the Fellowship's warmth: no one touches it from outside and it never drops below zero. A private field and a method that validates.",
    ),
    challenge: {
      topic: P("Campos privados (#) y validación", "Private fields (#) and validation"),
      instructions: P(
        "Crea la clase `ResistenciaComunidad` con un `static UMBRAL = 20` y un campo privado `#calor = 100`. Añade:\n• `getCalor()` que lo devuelva,\n• `enfriar(grados)` que reste sin bajar de 0 y lance un `Error` si `grados` es negativo,\n• `estaCongelada()` que devuelva `true` cuando el calor sea ≤ UMBRAL.",
        "Create class `ResistenciaComunidad` with a `static UMBRAL = 20` and a private field `#calor = 100`. Add:\n• `getCalor()` returning it,\n• `enfriar(grados)` that subtracts without going below 0 and throws an `Error` if `grados` is negative,\n• `estaCongelada()` returning `true` when warmth is ≤ UMBRAL.",
      ),
      sut: "new ResistenciaComunidad()",
      starter_code: "class ResistenciaComunidad {\n  static UMBRAL = 20;\n  #calor = 100;\n\n  getCalor() {\n  }\n  enfriar(grados) {\n  }\n  estaCongelada() {\n  }\n}\n",
      blocks: [
        "class ResistenciaComunidad {",
        "  static UMBRAL = 20;",
        "  #calor = 100;",
        "  getCalor() {",
        "    return this.#calor;",
        "  }",
        "  enfriar(grados) {",
        "    if (grados < 0) throw new Error('grados negativos');",
        "    this.#calor = Math.max(0, this.#calor - grados);",
        "  }",
        "  estaCongelada() {",
        "    return this.#calor <= ResistenciaComunidad.UMBRAL;",
        "  }",
        "}",
        "    this.#calor -= grados;",
      ],
      hints: [
        P("Guard clause: `if (grados < 0) throw new Error('...');`.", "Guard clause: `if (grados < 0) throw new Error('...');`."),
        P("Sin bajar de 0: `this.#calor = Math.max(0, this.#calor - grados);`.", "No below 0: `this.#calor = Math.max(0, this.#calor - grados);`."),
        P("Compara con la estática: `this.#calor <= ResistenciaComunidad.UMBRAL`.", "Compare with the static: `this.#calor <= ResistenciaComunidad.UMBRAL`."),
      ],
      test_cases: [
        { input: "getCalor()", expected: 100, description: P("Parte con el calor intacto", "Starts with warmth intact") },
        { input: "estaCongelada()", expected: false, description: P("Nadie congelado al principio", "No one frozen at first") },
        { input: "enfriar(50)", expected: null, description: P("La ventisca muerde…", "The blizzard bites…") },
        { input: "getCalor()", expected: 50, description: P("…y el calor baja a 50", "…and warmth drops to 50") },
        { input: "enfriar(40)", expected: null, description: P("Sigue nevando…", "It keeps snowing…") },
        { input: "estaCongelada()", expected: true, description: P("Con 10 (≤ 20) se congela", "At 10 (≤ 20) it freezes") },
        {
          input: "(() => { const r = new ResistenciaComunidad(); r.enfriar(500); return r.getCalor(); })()",
          raw: true,
          expected: 0,
          description: P("El calor nunca baja de 0", "Warmth never goes below 0"),
        },
        {
          input: "(() => { const r = new ResistenciaComunidad(); try { r.enfriar(-5); return false; } catch (e) { return true; } })()",
          raw: true,
          expected: true,
          description: P("Un frío negativo se rechaza", "A negative cold is rejected"),
        },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("El Umbral de la Nieve", "The Snow Threshold"),
    lore_intro: P(
      "Una medida no se altera: si el frío cambia, lo que tienes es OTRA medida. Un objeto de valor inmutable.",
      "A measurement isn't altered: if the cold changes, what you have is ANOTHER measurement. An immutable value object.",
    ),
    challenge: {
      topic: P("Objetos de valor inmutables", "Immutable value objects"),
      instructions: P(
        "Crea la clase `Temperatura`. El `constructor(grados)` debe lanzar un `Error` si `grados` está fuera del rango -40..40; si es válido, guardarlo en `this.grados` y llamar a `Object.freeze(this)`. Añade `conMas(g)` que devuelva una INSTANCIA NUEVA con los grados sumados, sin tocar la original.",
        "Create class `Temperatura`. The `constructor(grados)` must throw an `Error` if `grados` is outside -40..40; if valid, store it in `this.grados` and call `Object.freeze(this)`. Add `conMas(g)` returning a NEW INSTANCE with the added degrees, without touching the original.",
      ),
      sut: "new Temperatura(-10)",
      starter_code: "class Temperatura {\n  constructor(grados) {\n  }\n  conMas(g) {\n  }\n}\n",
      blocks: [
        "class Temperatura {",
        "  constructor(grados) {",
        "    if (grados < -50) throw new Error('demasiado fria');",
        "    this.grados = grados;",
        "    Object.freeze(this);",
        "  }",
        "  conMas(g) {",
        "    return new Temperatura(this.grados + g);",
        "  }",
        "}",
        "  conMas(g) { this.grados += g; return this; }",
      ],
      hints: [
        P("Valida primero: `if (grados < -40 || grados > 40) throw new Error('...');`.", "Validate first: `if (grados < -40 || grados > 40) throw new Error('...');`."),
        P("Congela al final: `Object.freeze(this);`.", "Freeze at the end: `Object.freeze(this);`."),
        P("`conMas` no muta: `return new Temperatura(this.grados + g);`.", "`conMas` doesn't mutate: `return new Temperatura(this.grados + g);`."),
      ],
      test_cases: [
        { input: "grados", expected: -10, description: P("La temperatura de partida", "The starting temperature") },
        {
          input: "(new Temperatura(-10)).conMas(-5).grados",
          raw: true,
          expected: -15,
          description: P("conMas() devuelve una más fría", "conMas() returns a colder one"),
        },
        {
          input: "(() => { const t = new Temperatura(-10); try { t.conMas(-5); } catch (e) {} return t.grados; })()",
          raw: true,
          expected: -10,
          description: P("La original no cambia: inmutabilidad", "The original doesn't change: immutability"),
        },
        {
          input: "(() => { try { new Temperatura(-100); return false; } catch (e) { return true; } })()",
          raw: true,
          expected: true,
          description: P("Rechaza valores fuera de rango", "Rejects out-of-range values"),
        },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre herencia, polimorfismo e iterables. */
const Q_EXTENDS = {
  question: P("¿Qué hace `class Gandalf extends Mago { ... }`?", "What does `class Gandalf extends Mago { ... }` do?"),
  options: [
    P("Gandalf hereda las propiedades y métodos de Mago", "Gandalf inherits Mago's properties and methods"),
    P("Copia el código de Mago en tiempo de compilación", "It copies Mago's code at compile time"),
    P("Crea una instancia de Mago", "It creates an instance of Mago"),
    P("Declara una interfaz Mago", "It declares an interface Mago"),
  ],
  correct: 0,
  explanation: P(
    "`extends` establece herencia: Gandalf ES UN Mago y dispone de todo lo suyo, además de lo que añada. En JS sólo se extiende UNA clase.",
    "`extends` sets up inheritance: Gandalf IS A Mago and has all of its members, plus whatever it adds. In JS you extend only ONE class.",
  ),
};
const Q_SUPER = {
  question: P("En el constructor de una subclase, ¿para qué sirve `super(...)`?", "In a subclass constructor, what is `super(...)` for?"),
  options: [
    P("Llama al constructor de la clase padre", "It calls the parent class constructor"),
    P("Crea un objeto global", "It creates a global object"),
    P("Devuelve la instancia padre", "It returns the parent instance"),
    P("Borra la clase padre", "It deletes the parent class"),
  ],
  correct: 0,
  explanation: P(
    "`super(args)` ejecuta el constructor del padre y es OBLIGATORIO antes de usar `this` en la subclase. `super.metodo()` llama a la versión del padre de un método.",
    "`super(args)` runs the parent's constructor and is REQUIRED before using `this` in the subclass. `super.method()` calls the parent's version of a method.",
  ),
};
const Q_OVERRIDE = {
  question: P("Una subclase define un método con el mismo nombre que el padre. ¿Qué ocurre?", "A subclass defines a method with the same name as the parent. What happens?"),
  options: [
    P("Lo sobrescribe: en esa subclase se usa la versión nueva", "It overrides it: that subclass uses the new version"),
    P("Da error por nombre duplicado", "It errors on duplicate name"),
    P("Se ejecutan los dos, uno tras otro", "Both run, one after the other"),
    P("El del padre gana siempre", "The parent's always wins"),
  ],
  correct: 0,
  explanation: P(
    "Sobrescribir reemplaza el método para esa subclase. Si aún quieres la lógica del padre, la invocas con `super.metodo()` dentro de la nueva versión.",
    "Overriding replaces the method for that subclass. If you still want the parent's logic, call it with `super.method()` inside the new version.",
  ),
};
const Q_POLY_JS = {
  question: P("En JS, ¿qué necesita un objeto para que `horda.reduce((s, e) => s + e.atacar(), 0)` funcione con él?", "In JS, what does an object need for `horda.reduce((s, e) => s + e.atacar(), 0)` to work with it?"),
  options: [
    P("Sólo tener un método `atacar()`; su clase da igual (duck typing)", "Just to have an `atacar()` method; its class doesn't matter (duck typing)"),
    P("Heredar de una clase Enemigo", "To inherit from an Enemigo class"),
    P("Implementar una interfaz declarada", "To implement a declared interface"),
    P("Ser del mismo tipo que los demás", "To be the same type as the others"),
  ],
  correct: 0,
  explanation: P(
    "JS no tiene interfaces: el polimorfismo es por forma («si camina como pato…»). Cualquier objeto con `atacar()` encaja, venga de la clase que venga. La responsabilidad de cumplir el contrato es tuya.",
    "JS has no interfaces: polymorphism is by shape (\"if it walks like a duck…\"). Any object with `atacar()` fits, whatever class it comes from. Honoring the contract is on you.",
  ),
};
const Q_INSTANCEOF_JS = {
  question: P("¿Qué comprueba `x instanceof Hechizo`?", "What does `x instanceof Hechizo` check?"),
  options: [
    P("Si Hechizo está en la cadena de prototipos de x", "Whether Hechizo is in x's prototype chain"),
    P("Si x tiene un método hechizo()", "Whether x has a hechizo() method"),
    P("Si x se llama 'Hechizo'", "Whether x is named 'Hechizo'"),
    P("Si x es una cadena de texto", "Whether x is a string"),
  ],
  correct: 0,
  explanation: P(
    "`instanceof` recorre la cadena de prototipos: es `true` para la clase de x y todas sus superclases. Si `PalabraDeMando extends Hechizo`, una instancia suya es `instanceof` de ambas.",
    "`instanceof` walks the prototype chain: it's `true` for x's class and all its superclasses. If `PalabraDeMando extends Hechizo`, an instance is `instanceof` both.",
  ),
};
const Q_ITER = {
  question: P("¿Qué hace recorrible con `for...of` (y con `[...x]`) a un objeto?", "What makes an object iterable with `for...of` (and with `[...x]`)?"),
  options: [
    P("Definir el método `[Symbol.iterator]()`", "Defining the `[Symbol.iterator]()` method"),
    P("Tener una propiedad `length`", "Having a `length` property"),
    P("Heredar de Array", "Inheriting from Array"),
    P("Ser un objeto literal", "Being an object literal"),
  ],
  correct: 0,
  explanation: P(
    "El protocolo de iteración: un objeto con `[Symbol.iterator]()` que rinda valores es recorrible por `for...of`, el spread `[...x]` y la desestructuración. Un generador (`function*`) es la forma más fácil de escribirlo.",
    "The iteration protocol: an object with `[Symbol.iterator]()` yielding values is walkable by `for...of`, spread `[...x]` and destructuring. A generator (`function*`) is the easiest way to write it.",
  ),
};
const Q_GEN = {
  question: P("¿Qué hace `yield` dentro de una función generadora `function*`?", "What does `yield` do inside a generator `function*`?"),
  options: [
    P("Produce un valor y pausa la función hasta que se pida el siguiente", "Produces a value and pauses the function until the next is requested"),
    P("Devuelve y termina la función, como return", "Returns and ends the function, like return"),
    P("Lanza una excepción", "Throws an exception"),
    P("Declara una variable", "Declares a variable"),
  ],
  correct: 0,
  explanation: P(
    "`yield` emite un valor y congela el generador ahí; al pedir el siguiente, retoma justo después. Así se producen secuencias perezosas sin construir toda la lista. `yield*` delega en otro iterable.",
    "`yield` emits a value and freezes the generator there; requesting the next resumes right after. This yields lazy sequences without building the whole list. `yield*` delegates to another iterable.",
  ),
};
const Q_DUCK = {
  question: P("En JS, para llamar `x.volar()`, ¿qué necesita `x`?", "In JS, to call `x.volar()`, what does `x` need?"),
  options: [
    P("Sólo tener un método `volar()`; su clase da igual (duck typing)", "Just to have a `volar()` method; its class doesn't matter (duck typing)"),
    P("Heredar de una clase Ave", "To inherit from an Ave class"),
    P("Implementar una interfaz declarada", "To implement a declared interface"),
    P("Ser del tipo exacto Ave", "To be exactly of type Ave"),
  ],
  correct: 0,
  explanation: P(
    "JS no tiene interfaces: el polimorfismo es por forma («si camina como pato…»). Cualquier objeto con `volar()` sirve, venga de la clase que venga. Honrar el contrato es responsabilidad tuya.",
    "JS has no interfaces: polymorphism is by shape (\"if it walks like a duck…\"). Any object with `volar()` works, whatever class it's from. Honoring the contract is on you.",
  ),
};
const Q_SPREAD_ITER = {
  question: P("¿Qué hace `[...galeria]` si `galeria` es iterable?", "What does `[...galeria]` do if `galeria` is iterable?"),
  options: [
    P("Recorre el iterable y mete sus valores en un array nuevo", "Walks the iterable and puts its values into a new array"),
    P("Copia el objeto tal cual", "Copies the object as is"),
    P("Da error si no es un array", "Errors if it's not an array"),
    P("Devuelve su longitud", "Returns its length"),
  ],
  correct: 0,
  explanation: P(
    "El spread `[...x]` consume el protocolo de iteración (`[Symbol.iterator]`) y vuelca los valores en un array. Igual que `for...of`, funciona con cualquier iterable, no sólo arrays.",
    "Spread `[...x]` consumes the iteration protocol (`[Symbol.iterator]`) and dumps the values into an array. Like `for...of`, it works with any iterable, not just arrays.",
  ),
};

/** Capítulo 6 · Herencia (extends/super), polimorfismo (duck typing) e iterables. */
export const SYL_JS_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_POLY_JS, Q_EXTENDS, Q_OVERRIDE] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_SUPER, Q_INSTANCEOF_JS, Q_ITER] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_GEN, Q_DUCK, Q_SPREAD_ITER] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Morgoth", "The Balrog of Morgoth"),
    lore_intro: P(
      "Sombra y fuego. El Balrog es un Enemigo más… pero golpea DIEZ veces más fuerte. Hereda del Enemigo base y amplía su ataque con super.",
      "Shadow and flame. The Balrog is just another Enemy… but it strikes TEN times harder. Extend the base Enemy and amplify its attack with super.",
    ),
    challenge: {
      topic: P("Herencia: extends, super y polimorfismo", "Inheritance: extends, super and polymorphism"),
      instructions: P(
        "Existen la clase base `Enemigo` (con `atacar()` que devuelve 1) y `danioTotal(enemigos)` que suma el `atacar()` de cada uno. Crea `Balrog extends Enemigo` cuyo `atacar()` devuelva DIEZ veces el del padre (usa `super.atacar()`).\n\n`new Balrog().atacar()` → `10`.",
        "The base class `Enemigo` (with `atacar()` returning 1) and `danioTotal(enemigos)` (summing each one's `atacar()`) already exist. Create `Balrog extends Enemigo` whose `atacar()` returns TEN times the parent's (use `super.atacar()`).\n\n`new Balrog().atacar()` → `10`.",
      ),
      support_code:
        "class Enemigo {\n  atacar() { return 1; }\n}\nfunction danioTotal(enemigos) {\n  return enemigos.reduce((s, e) => s + e.atacar(), 0);\n}",
      starter_code: "class Balrog extends Enemigo {\n}\n",
      blocks: [
        "class Balrog extends Enemigo {",
        "  atacar() {",
        "    return 10;",
        "  }",
        "}",
        "class Balrog {",
      ],
      hints: [
        P("Sobrescribe `atacar()` y reutiliza al padre: `return super.atacar() * 10;`.", "Override `atacar()` and reuse the parent: `return super.atacar() * 10;`."),
        P("`danioTotal` trata a Enemigo y Balrog por igual: eso es polimorfismo.", "`danioTotal` treats Enemigo and Balrog alike: that's polymorphism."),
      ],
      test_cases: [
        { input: "new Balrog().atacar()", expected: 10, description: P("Diez veces el ataque base", "Ten times the base attack"), raw: true },
        { input: "danioTotal([new Enemigo(), new Balrog()])", expected: 11, description: P("1 + 10, mezclados", "1 + 10, mixed"), raw: true },
        { input: "new Balrog() instanceof Enemigo", expected: true, description: P("Un Balrog ES un Enemigo", "A Balrog IS an Enemigo"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de los Contratos", "The Scroll of Contracts"),
    lore_intro: P(
      "Gandalf despliega un pergamino de runas. «No preguntes de qué está hecha una cosa. Pregunta qué sabe hacer.»",
      "Gandalf unrolls a scroll of runes. \"Don't ask what a thing is made of. Ask what it can do.\"",
    ),
    scroll: {
      topic: P("Herencia, polimorfismo e iterables", "Inheritance, polymorphism and iterables"),
      sections: [
        {
          heading: P("extends y super", "extends and super"),
          body: P(
            "Una subclase hereda con `extends` y llama al padre con `super`: `super(...)` a su constructor, `super.metodo()` a su método. Sobrescribir es redefinir un método heredado.",
            "A subclass inherits with `extends` and calls the parent with `super`: `super(...)` for its constructor, `super.method()` for its method. Overriding is redefining an inherited method.",
          ),
          code: "class Hechizo {\n  constructor(nombre) { this.nombre = nombre; }\n  describir() { return `Hechizo: ${this.nombre}`; }\n}\nclass PalabraDeMando extends Hechizo {\n  constructor() { super('Palabra de Mando'); }\n}",
        },
        {
          heading: P("Polimorfismo por forma (duck typing)", "Polymorphism by shape (duck typing)"),
          body: P(
            "JS no tiene interfaces: si un objeto tiene el método que necesitas, encaja, venga de la clase que venga. El código que los recorre no sabe ni le importa qué son.",
            "JS has no interfaces: if an object has the method you need, it fits, whatever class it's from. The code walking them doesn't know or care what they are.",
          ),
          code: "const danioTotal = (horda) =>\n  horda.reduce((s, e) => s + e.atacar(), 0);\n// funciona con cualquier cosa que tenga atacar()",
        },
        {
          heading: P("Iterables y generadores", "Iterables and generators"),
          body: P(
            "Un objeto con `[Symbol.iterator]()` es recorrible por `for...of` y `[...x]`. Un generador (`function*` con `yield`) es la forma más simple de producirlo.",
            "An object with `[Symbol.iterator]()` is walkable by `for...of` and `[...x]`. A generator (`function*` with `yield`) is the simplest way to produce it.",
          ),
          code: "class Galeria {\n  #salas = [];\n  agregar(s) { this.#salas.push(s); return this; }\n  *[Symbol.iterator]() { yield* this.#salas; }\n}\n[...new Galeria().agregar('Mazarbul')]; // ['Mazarbul']",
        },
      ],
      keyTakeaway: P(
        "extends + super comparten y amplían comportamiento; el polimorfismo en JS es por forma, no por tipo declarado; y `[Symbol.iterator]` (con generadores) hace recorrible cualquier objeto.",
        "extends + super share and extend behavior; polymorphism in JS is by shape, not declared type; and `[Symbol.iterator]` (with generators) makes any object iterable.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P(
      "«Habla, amigo, y entra.» La puerta sólo promete una cosa: reconocer la palabra correcta.",
      "\"Speak, friend, and enter.\" The door promises just one thing: to recognize the right word.",
    ),
    challenge: {
      topic: P("Clases y método (contrato por convención)", "Classes and method (contract by convention)"),
      instructions: P(
        "Crea la clase `PuertaDurin` con el método `susurrarPalabra(palabra)` que devuelva `true` SÓLO con la palabra élfica 'mellon' (amigo), sin distinguir mayúsculas.\n\nEjemplo: `susurrarPalabra('Mellon')` → `true`.",
        "Create class `PuertaDurin` with method `susurrarPalabra(palabra)` returning `true` ONLY for the Elvish word 'mellon' (friend), case-insensitive.\n\nExample: `susurrarPalabra('Mellon')` → `true`.",
      ),
      sut: "new PuertaDurin()",
      starter_code: "class PuertaDurin {\n  susurrarPalabra(palabra) {\n  }\n}\n",
      blocks: [
        "class PuertaDurin {",
        "  susurrarPalabra(palabra) {",
        "    return palabra.toLowerCase() === 'mellon';",
        "  }",
        "}",
        "    return palabra === 'mellon';",
      ],
      hints: [
        P("Normaliza a minúsculas: `palabra.toLowerCase()`.", "Normalize to lowercase: `palabra.toLowerCase()`."),
        P("Compara: `return palabra.toLowerCase() === 'mellon';`.", "Compare: `return palabra.toLowerCase() === 'mellon';`."),
      ],
      test_cases: [
        { input: "susurrarPalabra('Mellon')", expected: true, description: P("La palabra élfica abre la puerta", "The Elvish word opens the door") },
        { input: "susurrarPalabra('mellon')", expected: true, description: P("No distingue mayúsculas", "Case-insensitive") },
        { input: "susurrarPalabra('Amigo')", expected: false, description: P("En castellano no funciona", "In Spanish it doesn't work") },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P(
      "Trasgos y un troll irrumpen a la vez: distintas criaturas, un mismo gesto — todas atacan. El código que suma su daño no sabe qué son.",
      "Goblins and a troll burst in at once: different creatures, one same gesture — they all attack. The code summing their damage doesn't know what they are.",
    ),
    challenge: {
      topic: P("Polimorfismo (duck typing)", "Polymorphism (duck typing)"),
      instructions: P(
        "Existe `Camara.danioTotal(horda)`, que suma el `atacar()` de cada enemigo. Crea DOS clases con métodos `nombre()` y `atacar()`: `Trasgo` (nombre 'Trasgo', ataque 5) y `Troll` (nombre 'Troll', ataque 20).",
        "There's `Camara.danioTotal(horda)`, summing each enemy's `atacar()`. Create TWO classes with methods `nombre()` and `atacar()`: `Trasgo` (name 'Trasgo', attack 5) and `Troll` (name 'Troll', attack 20).",
      ),
      support_code:
        "const Camara = {\n  danioTotal(horda) {\n    return horda.reduce((s, e) => s + e.atacar(), 0);\n  },\n};",
      starter_code: "\nclass Trasgo {\n}\n\nclass Troll {\n}\n",
      blocks: [
        "class Trasgo {",
        "  nombre() { return 'Trasgo'; }",
        "  atacar() { return 5; }",
        "}",
        "class Troll {",
        "  nombre() { return 'Troll'; }",
        "  atacar() { return 20; }",
        "}",
        "  atacar() { return 10; }",
      ],
      hints: [
        P("Cada clase define los dos métodos: `nombre()` devuelve el texto, `atacar()` el número.", "Each class defines both methods: `nombre()` returns the text, `atacar()` the number."),
        P("`Camara.danioTotal` no sabe si son trasgos o trolls: eso es polimorfismo por forma.", "`Camara.danioTotal` doesn't know if they're goblins or trolls: that's polymorphism by shape."),
      ],
      test_cases: [
        { input: "new Trasgo().nombre()", expected: "Trasgo", description: P("El trasgo se identifica", "The goblin identifies itself"), raw: true },
        { input: "new Trasgo().atacar()", expected: 5, description: P("El trasgo golpea flojo", "The goblin hits soft"), raw: true },
        { input: "new Troll().atacar()", expected: 20, description: P("El troll golpea fuerte", "The troll hits hard"), raw: true },
        { input: "Camara.danioTotal([new Trasgo(), new Trasgo(), new Troll()])", expected: 30, description: P("La misma función suma la horda mezclada", "The same function sums the mixed horde"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P(
      "Gandalf alza a Glamdring sobre el puente estrecho. Un hechizo hereda del linaje de la magia y añade lo suyo.",
      "Gandalf raises Glamdring over the narrow bridge. A spell inherits from the lineage of magic and adds its own.",
    ),
    challenge: {
      topic: P("Herencia: extends y super", "Inheritance: extends and super"),
      instructions: P(
        "Existe la clase base `Hechizo` (constructor `nombre`, método `describir()`), la clase `Puente` (con `roto`) y `Gandalf`, que ejecuta cualquier hechizo. Crea `PalabraDeMando extends Hechizo`:\n• su `constructor()` debe llamar a `super('Palabra de Mando')`,\n• su método `lanzar(puente)` pone `puente.roto = true` y devuelve exactamente '¡No puedes pasar!'.",
        "There's a base class `Hechizo` (constructor `nombre`, method `describir()`), a class `Puente` (with `roto`) and `Gandalf`, which executes any spell. Create `PalabraDeMando extends Hechizo`:\n• its `constructor()` must call `super('Palabra de Mando')`,\n• its method `lanzar(puente)` sets `puente.roto = true` and returns exactly '¡No puedes pasar!'.",
      ),
      support_code:
        "class Puente {\n  constructor() { this.roto = false; }\n}\nclass Hechizo {\n  constructor(nombre) { this.nombre = nombre; }\n  describir() { return `Hechizo: ${this.nombre}`; }\n  lanzar(puente) { return 'nada ocurre'; }\n}\nconst Gandalf = {\n  ejecutar(hechizo, puente) { return hechizo.lanzar(puente); },\n};",
      starter_code: "\nclass PalabraDeMando extends Hechizo {\n}\n",
      blocks: [
        "class PalabraDeMando extends Hechizo {",
        "  constructor() {",
        "    super('Palabra de Mando');",
        "  }",
        "  lanzar(puente) {",
        "    puente.roto = true;",
        "    return '¡No puedes pasar!';",
        "  }",
        "}",
        "    return 'nada ocurre';",
      ],
      hints: [
        P("En el constructor, primero: `super('Palabra de Mando');`.", "In the constructor, first: `super('Palabra de Mando');`."),
        P("`lanzar` modifica el puente: `puente.roto = true;` y `return '¡No puedes pasar!';`.", "`lanzar` modifies the bridge: `puente.roto = true;` then `return '¡No puedes pasar!';`."),
      ],
      test_cases: [
        { input: "Gandalf.ejecutar(new PalabraDeMando(), new Puente())", expected: "¡No puedes pasar!", description: P("Gandalf ejecuta el hechizo", "Gandalf casts the spell"), raw: true },
        {
          input: "(() => { const p = new Puente(); Gandalf.ejecutar(new PalabraDeMando(), p); return p.roto; })()",
          raw: true,
          expected: true,
          description: P("El puente se quiebra bajo el Balrog", "The bridge breaks under the Balrog"),
        },
        { input: "new PalabraDeMando().describir()", expected: "Hechizo: Palabra de Mando", description: P("describir() se HEREDA del padre vía super", "describir() is INHERITED from the parent via super"), raw: true },
        { input: "new PalabraDeMando() instanceof Hechizo", expected: true, description: P("Es un Hechizo por herencia", "It's a Hechizo by inheritance"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La galería sin fin", "The endless gallery"),
    lore_intro: P(
      "Las salas de Khazad-dûm se encadenan en la oscuridad. Quien lleve su registro debe poder recorrerlas con un simple for...of — eso es un iterable.",
      "The halls of Khazad-dûm chain together in the dark. Whoever keeps their record must walk them with a simple for...of — that's an iterable.",
    ),
    challenge: {
      topic: P("Iterables y generadores (Symbol.iterator)", "Iterables and generators (Symbol.iterator)"),
      instructions: P(
        "Crea la clase `Galeria` con las salas en un campo PRIVADO `#salas`:\n• `agregar(sala)` — añade la sala y devuelve `this` (interfaz fluida),\n• `*[Symbol.iterator]()` — un generador que rinde las salas en orden con `yield*`,\n• el getter `tamano` — cuántas salas hay.\n\nAsí `[...galeria]` y `for...of` la recorren.",
        "Create class `Galeria` with the halls in a PRIVATE field `#salas`:\n• `agregar(sala)` — adds the hall and returns `this` (fluent interface),\n• `*[Symbol.iterator]()` — a generator yielding the halls in order with `yield*`,\n• the getter `tamano` — how many halls there are.\n\nThen `[...galeria]` and `for...of` walk it.",
      ),
      starter_code: "class Galeria {\n  #salas = [];\n\n  agregar(sala) {\n  }\n\n  *[Symbol.iterator]() {\n  }\n\n  get tamano() {\n  }\n}\n",
      blocks: [
        "class Galeria {",
        "  #salas = [];",
        "  agregar(sala) {",
        "    this.#salas.push(sala);",
        "    return this;",
        "  }",
        "  *[Symbol.iterator]() {",
        "    yield* this.#salas;",
        "  }",
        "  get tamano() {",
        "    return this.#salas.length;",
        "  }",
        "}",
        "    return sala;",
      ],
      hints: [
        P("Fluida: al final de `agregar`, `return this;`.", "Fluent: at the end of `agregar`, `return this;`."),
        P("El generador delega: `yield* this.#salas;`.", "The generator delegates: `yield* this.#salas;`."),
        P("`tamano` devuelve `this.#salas.length`.", "`tamano` returns `this.#salas.length`."),
      ],
      test_cases: [
        { input: "[...new Galeria().agregar('Mazarbul').agregar('Puente')]", expected: ["Mazarbul", "Puente"], description: P("Se recorre con spread, en orden", "Walkable with spread, in order"), raw: true },
        { input: "new Galeria().agregar('a').agregar('b').agregar('c').tamano", expected: 3, description: P("tamano cuenta las salas", "tamano counts the halls"), raw: true },
        { input: "new Galeria().tamano", expected: 0, description: P("Una galería vacía", "An empty gallery"), raw: true },
        { input: "new Galeria().agregar('x') instanceof Galeria", expected: true, description: P("agregar() es fluida: devuelve la galería", "agregar() is fluent: returns the gallery"), raw: true },
        { input: "typeof new Galeria()[Symbol.iterator]", expected: "function", description: P("Es iterable de verdad", "It's truly iterable"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre bases abstractas y mixins. */
const Q_ABSTRACT_JS = {
  question: P("JS no tiene la palabra `abstract`. ¿Cómo se impide instanciar una clase base?", "JS has no `abstract` keyword. How do you prevent instantiating a base class?"),
  options: [
    P("Lanzando en el constructor si `new.target === Base`", "By throwing in the constructor if `new.target === Base`"),
    P("Declarándola con `abstract class`", "By declaring it `abstract class`"),
    P("Poniéndole `#` al nombre", "By prefixing its name with `#`"),
    P("No se puede: toda clase se instancia", "You can't: every class is instantiable"),
  ],
  correct: 0,
  explanation: P(
    "JS no tiene clases abstractas nativas, pero puedes simularlas: si `new.target === Base` significa que se instanció la base directamente, así que lanzas un error. Las subclases pasan el `if` porque su `new.target` es la subclase.",
    "JS has no native abstract classes, but you can fake them: `new.target === Base` means the base was instantiated directly, so you throw. Subclasses pass the `if` because their `new.target` is the subclass.",
  ),
};
const Q_NEWTARGET = {
  question: P("Dentro de un constructor, ¿qué es `new.target`?", "Inside a constructor, what is `new.target`?"),
  options: [
    P("La clase sobre la que se hizo `new` (la subclase si hubo herencia)", "The class `new` was called on (the subclass if inherited)"),
    P("Siempre la clase base", "Always the base class"),
    P("La instancia recién creada", "The freshly created instance"),
    P("El último argumento", "The last argument"),
  ],
  correct: 0,
  explanation: P(
    "`new.target` es la clase con la que se invocó `new`. En `new Frasco()`, dentro del constructor heredado de `Don` vale `Frasco`, no `Don`. Por eso sirve para detectar la instanciación directa de la base.",
    "`new.target` is the class `new` was invoked with. In `new Frasco()`, inside `Don`'s inherited constructor it's `Frasco`, not `Don`. That's why it detects direct instantiation of the base.",
  ),
};
const Q_TEMPLATE_METHOD = {
  question: P("Una clase base define `saludo()` que llama a `this.nombre()`, sin implementar `nombre()`. ¿Qué patrón es?", "A base class defines `saludo()` calling `this.nombre()`, without implementing `nombre()`. What pattern is that?"),
  options: [
    P("Método plantilla: la base fija el esqueleto, la subclase rellena los huecos", "Template method: the base sets the skeleton, the subclass fills the gaps"),
    P("Singleton", "Singleton"),
    P("Factoría", "Factory"),
    P("Observador", "Observer"),
  ],
  correct: 0,
  explanation: P(
    "El método plantilla escribe el algoritmo general en la base y delega los pasos variables en métodos que la subclase implementa. `saludo()` funciona en cuanto la subclase provee `nombre()`.",
    "The template method writes the general algorithm in the base and delegates the variable steps to methods the subclass implements. `saludo()` works as soon as the subclass provides `nombre()`.",
  ),
};
const Q_MIXIN = {
  question: P("¿Qué es un mixin en JS?", "What is a mixin in JS?"),
  options: [
    P("Un objeto de métodos que se copian a varias clases (p. ej. con Object.assign)", "An object of methods copied into several classes (e.g. with Object.assign)"),
    P("Una clase que hereda de dos padres", "A class that inherits from two parents"),
    P("Un método privado", "A private method"),
    P("Una interfaz nativa de JS", "A native JS interface"),
  ],
  correct: 0,
  explanation: P(
    "Un mixin es el equivalente de un trait: un conjunto de métodos que «pegas» a clases sin parentesco. `Object.assign(Clase.prototype, mixin)` los añade al prototipo de la clase, y todas sus instancias los ganan.",
    "A mixin is the equivalent of a trait: a set of methods you \"paste\" onto unrelated classes. `Object.assign(Class.prototype, mixin)` adds them to the class prototype, and all its instances gain them.",
  ),
};
const Q_MIXIN_VS = {
  question: P("¿Cuándo eliges un mixin en vez de herencia (extends)?", "When do you pick a mixin over inheritance (extends)?"),
  options: [
    P("Cuando clases SIN parentesco necesitan el mismo comportamiento", "When UNRELATED classes need the same behavior"),
    P("Cuando quieres una relación es-un clara", "When you want a clear is-a relationship"),
    P("Siempre: la herencia está obsoleta", "Always: inheritance is obsolete"),
    P("Sólo para métodos estáticos", "Only for static methods"),
  ],
  correct: 0,
  explanation: P(
    "La herencia expresa «es un» y sólo admite un padre. El mixin comparte una capacidad («sabe hacer X») entre clases dispares sin forzar una jerarquía común, y puedes aplicar varios. Es reuso horizontal.",
    "Inheritance expresses \"is a\" and allows only one parent. A mixin shares a capability (\"can do X\") across disparate classes without forcing a common hierarchy, and you can apply several. It's horizontal reuse.",
  ),
};
const Q_PROTO = {
  question: P("¿Qué hace `Object.assign(CapaElfica.prototype, mixin)`?", "What does `Object.assign(CapaElfica.prototype, mixin)` do?"),
  options: [
    P("Copia los métodos del mixin al prototipo: todas las instancias los tendrán", "Copies the mixin's methods to the prototype: all instances will have them"),
    P("Crea una instancia de CapaElfica", "Creates an instance of CapaElfica"),
    P("Borra el prototipo", "Deletes the prototype"),
    P("Hace CapaElfica inmutable", "Makes CapaElfica immutable"),
  ],
  correct: 0,
  explanation: P(
    "Los métodos compartidos de una clase viven en su `prototype`. Copiar el mixin ahí hace que cada `new CapaElfica()` los herede, igual que un `use Trait;` en PHP.",
    "A class's shared methods live on its `prototype`. Copying the mixin there makes every `new CapaElfica()` inherit them, just like `use Trait;` in PHP.",
  ),
};
const Q_ABSTRACT_METHOD = {
  question: P("Una base define `usar() { throw new Error('no implementado'); }`. ¿Para qué?", "A base defines `usar() { throw new Error('not implemented'); }`. What for?"),
  options: [
    P("Obligar a las subclases a implementar `usar()`; si no, falla al llamarlo", "To force subclasses to implement `usar()`; if not, it fails when called"),
    P("Para que `usar()` no exista", "So that `usar()` doesn't exist"),
    P("Para borrar la clase", "To delete the class"),
    P("Para que sea privado", "To make it private"),
  ],
  correct: 0,
  explanation: P(
    "JS no tiene métodos abstractos, así que se SIMULAN: la base lanza un error, y quien no sobrescriba `usar()` lo verá al llamarlo. Recuerda a un método abstracto obligatorio.",
    "JS has no abstract methods, so you SIMULATE them: the base throws, and whoever doesn't override `usar()` hits it when calling. It mimics a required abstract method.",
  ),
};
const Q_COMPOSITION_JS = {
  question: P("«Composición sobre herencia»: ¿qué recomienda?", "\"Composition over inheritance\": what does it advise?"),
  options: [
    P("Combinar capacidades pequeñas (mixins) antes que jerarquías rígidas de clases", "Combine small capabilities (mixins) rather than rigid class hierarchies"),
    P("No usar nunca clases", "Never use classes"),
    P("Heredar de tantas clases como se pueda", "Inherit from as many classes as possible"),
    P("Copiar y pegar el código", "Copy and paste the code"),
  ],
  correct: 0,
  explanation: P(
    "En vez de una jerarquía profunda («es un»), montas objetos combinando piezas de comportamiento («tiene la capacidad de»). Los mixins son la forma en JS de componer sin cadenas de herencia frágiles.",
    "Instead of a deep hierarchy (\"is a\"), you build objects by combining behavior pieces (\"has the ability to\"). Mixins are the JS way to compose without brittle inheritance chains.",
  ),
};
const Q_MIXIN_MULTI = {
  question: P("¿Puede una clase recibir VARIOS mixins?", "Can a class receive SEVERAL mixins?"),
  options: [
    P("Sí: aplicas cada mixin con `Object.assign` y suma sus métodos", "Yes: apply each mixin with `Object.assign` and it adds up their methods"),
    P("No: sólo uno por clase", "No: only one per class"),
    P("Sólo si heredan entre sí", "Only if they inherit from each other"),
    P("Sólo dos como máximo", "Only two at most"),
  ],
  correct: 0,
  explanation: P(
    "Los mixins se acumulan: `Object.assign(C.prototype, A, B)` (o dos llamadas) le da a `C` los métodos de `A` y `B`. Es la ventaja frente a la herencia, que sólo admite un padre.",
    "Mixins stack: `Object.assign(C.prototype, A, B)` (or two calls) gives `C` the methods of both `A` and `B`. That's the edge over inheritance, which allows only one parent.",
  ),
};

/** Capítulo 7 · Bases abstractas (new.target, método plantilla) y mixins. */
export const SYL_JS_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_ABSTRACT_JS, Q_NEWTARGET, Q_TEMPLATE_METHOD] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_MIXIN, Q_PROTO, Q_MIXIN_VS] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_ABSTRACT_METHOD, Q_COMPOSITION_JS, Q_MIXIN_MULTI] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk, capitán de Isengard", "Uglúk, captain of Isengard"),
    lore_intro: P(
      "El capitán Uruk-hai porta una reliquia. Existe la base abstracta `Don` y el mixin `Bendecido`. Crea una `Reliquia` que herede del Don y gane la bendición por composición.",
      "The Uruk-hai captain bears a relic. The abstract base `Don` and the mixin `Bendecido` exist. Create a `Reliquia` that extends the Don and gains the blessing by composition.",
    ),
    challenge: {
      topic: P("Base abstracta + mixin (composición)", "Abstract base + mixin (composition)"),
      instructions: P(
        "Existen la base `Don` (que exige `poder()` y no se puede instanciar sola) y el mixin `Bendecido` (aporta `bendicion()` = 10). Crea `Reliquia extends Don` cuyo `poder()` devuelva `5 + this.bendicion()`, y aplícale el mixin con `Object.assign(Reliquia.prototype, Bendecido)`.\n\n`new Reliquia().poder()` → `15`.",
        "The base `Don` (requiring `poder()` and not instantiable on its own) and the mixin `Bendecido` (providing `bendicion()` = 10) exist. Create `Reliquia extends Don` whose `poder()` returns `5 + this.bendicion()`, and apply the mixin with `Object.assign(Reliquia.prototype, Bendecido)`.\n\n`new Reliquia().poder()` → `15`.",
      ),
      support_code:
        "class Don {\n  constructor() { if (new.target === Don) throw new Error('Don es abstracta'); }\n  poder() { throw new Error('poder() no implementado'); }\n}\nconst Bendecido = { bendicion() { return 10; } };",
      starter_code: "class Reliquia extends Don {\n}\n",
      blocks: [
        "class Reliquia extends Don {",
        "  poder() {",
        "    return 5 + this.bendicion();",
        "  }",
        "}",
        "Object.assign(Reliquia.prototype, Bendecido);",
        "Object.assign(Reliquia, Bendecido);",
      ],
      hints: [
        P("En `poder()` usa el método del mixin: `return 5 + this.bendicion();`.", "In `poder()` use the mixin's method: `return 5 + this.bendicion();`."),
        P("Aplica el mixin al prototipo: `Object.assign(Reliquia.prototype, Bendecido);`.", "Apply the mixin to the prototype: `Object.assign(Reliquia.prototype, Bendecido);`."),
      ],
      test_cases: [
        { input: "new Reliquia().poder()", expected: 15, description: P("5 propios + 10 de bendición", "5 of its own + 10 blessing"), raw: true },
        { input: "new Reliquia() instanceof Don", expected: true, description: P("Hereda del Don", "Inherits from Don"), raw: true },
        { input: "(() => { try { new Don(); return false; } catch (e) { return true; } })()", expected: true, description: P("La base abstracta no se instancia sola", "The abstract base isn't instantiated alone"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de Galadriel", "Galadriel's Scroll"),
    lore_intro: P(
      "La Dama entrega un pergamino con la luz de Eärendil. «Hay parentesco y hay don. Uno se hereda; el otro se pega a cualquiera.»",
      "The Lady hands over a scroll bearing the light of Eärendil. \"There is kinship and there is gift. One is inherited; the other clings to anyone.\"",
    ),
    scroll: {
      topic: P("Bases abstractas y mixins", "Abstract bases and mixins"),
      sections: [
        {
          heading: P("Base «abstracta» con new.target", "\"Abstract\" base with new.target"),
          body: P(
            "JS no tiene `abstract`, pero una base puede prohibir su instanciación directa comprobando `new.target`, y dejar métodos que la subclase debe implementar.",
            "JS has no `abstract`, but a base can forbid direct instantiation by checking `new.target`, and leave methods the subclass must implement.",
          ),
          code: "class ObjetoMagico {\n  constructor(nombre) {\n    if (new.target === ObjetoMagico) throw new Error('abstracta');\n    this.nombre = nombre;\n  }\n  usar() { throw new Error('no implementado'); }\n  describir() { return `Don de Galadriel: ${this.nombre}`; }\n}",
        },
        {
          heading: P("Método plantilla", "Template method"),
          body: P(
            "La base escribe el algoritmo y delega los pasos variables en métodos que la subclase completa. `describir()` ya funciona; sólo falta que la hija provea `usar()`.",
            "The base writes the algorithm and delegates the variable steps to methods the subclass fills. `describir()` already works; the child just needs to provide `usar()`.",
          ),
          code: "class FrascoDeGaladriel extends ObjetoMagico {\n  usar() { return 'una luz en los lugares oscuros'; }\n}",
        },
        {
          heading: P("Mixins: el trait de JS", "Mixins: JS's trait"),
          body: P(
            "Un mixin es un objeto de métodos que copias al prototipo de clases sin parentesco con `Object.assign`. Reuso horizontal, como los traits de PHP.",
            "A mixin is an object of methods you copy onto the prototype of unrelated classes with `Object.assign`. Horizontal reuse, like PHP traits.",
          ),
          code: "const Camuflable = { ocultar() { return 'te fundes con el bosque'; } };\nclass CapaElfica {}\nclass Barca {}\nObject.assign(CapaElfica.prototype, Camuflable);\nObject.assign(Barca.prototype, Camuflable);",
        },
      ],
      keyTakeaway: P(
        "Herencia para «es un» (con new.target simulas lo abstracto y el método plantilla); mixins vía Object.assign para «sabe hacer», compartido entre clases sin parentesco. Son ejes distintos y se combinan.",
        "Inheritance for \"is a\" (new.target fakes abstract and the template method); mixins via Object.assign for \"can do\", shared across unrelated classes. They're different axes and they combine.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P(
      "«Que sea para ti una luz en los lugares oscuros.» Todo don comparte una forma; sólo cambia cómo se usa.",
      "\"May it be a light for you in dark places.\" Every gift shares a shape; only its use changes.",
    ),
    challenge: {
      topic: P("Bases abstractas y herencia", "Abstract bases and inheritance"),
      instructions: P(
        "La clase base `ObjetoMagico` ya existe: guarda `nombre`, comparte `describir()`, exige `usar()` y lanza si se instancia directamente. Crea `FrascoDeGaladriel` que la EXTIENDA e implemente `usar()` devolviendo exactamente 'una luz en los lugares oscuros'.",
        "The base class `ObjetoMagico` already exists: it stores `nombre`, shares `describir()`, requires `usar()` and throws if instantiated directly. Create `FrascoDeGaladriel` that EXTENDS it and implements `usar()` returning exactly 'una luz en los lugares oscuros'.",
      ),
      sut: "new FrascoDeGaladriel('Frasco')",
      support_code:
        "class ObjetoMagico {\n  constructor(nombre) {\n    if (new.target === ObjetoMagico) throw new Error('ObjetoMagico es abstracta');\n    this.nombre = nombre;\n  }\n  usar() { throw new Error('usar() no implementado'); }\n  describir() { return `Don de Galadriel: ${this.nombre}`; }\n}",
      starter_code: "\nclass FrascoDeGaladriel extends ObjetoMagico {\n}\n",
      blocks: [
        "class FrascoDeGaladriel extends ObjetoMagico {",
        "  usar() {",
        "    return 'una luz en los lugares oscuros';",
        "  }",
        "}",
        "    return 'luz';",
      ],
      hints: [
        P("Sólo implementa `usar()`: `describir()` se hereda ya resuelto.", "Just implement `usar()`: `describir()` is inherited already solved."),
        P("Devuelve el texto exacto: `return 'una luz en los lugares oscuros';`.", "Return the exact text: `return 'una luz en los lugares oscuros';`."),
      ],
      test_cases: [
        { input: "usar()", expected: "una luz en los lugares oscuros", description: P("Cada don se usa a su manera", "Each gift is used its own way") },
        { input: "describir()", expected: "Don de Galadriel: Frasco", description: P("describir() se HEREDA de la base", "describir() is INHERITED from the base") },
        {
          input: "(() => { try { new ObjetoMagico('x'); return false; } catch (e) { return true; } })()",
          raw: true,
          expected: true,
          description: P("La base no se puede instanciar directamente", "The base can't be instantiated directly"),
        },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P(
      "Las capas de Lórien no son de la familia de las barcas… pero ambas saben esconderse. Eso no se hereda: se comparte con un mixin.",
      "Lórien's cloaks aren't kin to the boats… yet both know how to hide. That isn't inherited: it's shared with a mixin.",
    ),
    challenge: {
      topic: P("Mixins (reuso horizontal)", "Mixins (horizontal reuse)"),
      instructions: P(
        "Existe el mixin `CamuflajeElfico`, un objeto con `ocultar()` que devuelve 'te fundes con el bosque'. Crea DOS clases sin parentesco, `CapaElfica` y `Barca`, y AÑÁDELES el mixin con `Object.assign(Clase.prototype, CamuflajeElfico)` para que ambas tengan `ocultar()`.",
        "There's a mixin `CamuflajeElfico`, an object with `ocultar()` returning 'te fundes con el bosque'. Create TWO unrelated classes, `CapaElfica` and `Barca`, and ADD the mixin to them with `Object.assign(Class.prototype, CamuflajeElfico)` so both get `ocultar()`.",
      ),
      support_code:
        "const CamuflajeElfico = {\n  ocultar() { return 'te fundes con el bosque'; },\n};",
      starter_code: "\nclass CapaElfica {}\nclass Barca {}\n",
      blocks: [
        "class CapaElfica {}",
        "class Barca {}",
        "Object.assign(CapaElfica.prototype, CamuflajeElfico);",
        "Object.assign(Barca.prototype, CamuflajeElfico);",
        "Object.assign(CapaElfica, CamuflajeElfico);",
      ],
      hints: [
        P("`Object.assign(CapaElfica.prototype, CamuflajeElfico);`.", "`Object.assign(CapaElfica.prototype, CamuflajeElfico);`."),
        P("Haz lo mismo con `Barca.prototype`. No copies el método a mano.", "Do the same with `Barca.prototype`. Don't hand-copy the method."),
      ],
      test_cases: [
        { input: "new CapaElfica().ocultar()", expected: "te fundes con el bosque", description: P("La capa esconde a quien la lleva", "The cloak hides its wearer"), raw: true },
        { input: "new Barca().ocultar()", expected: "te fundes con el bosque", description: P("La barca también, sin heredar de la capa", "The boat too, without inheriting from the cloak"), raw: true },
        { input: "CapaElfica.prototype.ocultar === CamuflajeElfico.ocultar", expected: true, description: P("El método viene del MIXIN, no de copiar y pegar", "The method comes from the MIXIN, not copy-paste"), raw: true },
        { input: "Barca.prototype.ocultar === CamuflajeElfico.ocultar", expected: true, description: P("El mismo mixin, reutilizado horizontalmente", "The same mixin, reused horizontally"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de la Dama", "The Lady's Gifts"),
    lore_intro: P(
      "Cada don es distinto, pero todos llevan la bendición de Lórien. Se juntan las dos ideas: la familia que comparte forma y el don que se pega a cualquiera.",
      "Each gift is different, yet all bear Lórien's blessing. The two ideas meet: the family that shares a shape, and the gift that clings to anyone.",
    ),
    challenge: {
      topic: P("Bases abstractas + mixins combinados", "Abstract bases + mixins combined"),
      instructions: P(
        "Existen la base `Don` (exige `poder()`), el mixin `Bendecido` (aporta `bendicion()` = 10) y `Cofre.poderTotal(dones)`. Crea `Frasco` y `Capa`: ambas EXTIENDEN `Don`, y añádeles el mixin con `Object.assign`. `poder()` devuelve su base más la bendición: 5 en Frasco (total 15), 2 en Capa (total 12).",
        "There's a base `Don` (requires `poder()`), a mixin `Bendecido` (adds `bendicion()` = 10) and `Cofre.poderTotal(dones)`. Create `Frasco` and `Capa`: both EXTEND `Don`, and add the mixin with `Object.assign`. `poder()` returns its base plus the blessing: 5 in Frasco (total 15), 2 in Capa (total 12).",
      ),
      support_code:
        "class Don {\n  constructor() { if (new.target === Don) throw new Error('Don es abstracta'); }\n  poder() { throw new Error('poder() no implementado'); }\n}\nconst Bendecido = { bendicion() { return 10; } };\nconst Cofre = {\n  poderTotal(dones) { return dones.reduce((s, d) => s + d.poder(), 0); },\n};",
      starter_code: "\nclass Frasco extends Don {\n  poder() { /* 5 + this.bendicion() */ }\n}\nclass Capa extends Don {\n  poder() { /* 2 + this.bendicion() */ }\n}\n",
      blocks: [
        "class Frasco extends Don {",
        "  poder() {",
        "    return 5 + this.bendicion();",
        "  }",
        "}",
        "class Capa extends Don {",
        "  poder() {",
        "    return 2 + this.bendicion();",
        "  }",
        "}",
        "Object.assign(Frasco.prototype, Bendecido);",
        "Object.assign(Capa.prototype, Bendecido);",
        "    return 5;",
      ],
      hints: [
        P("Dentro de `poder()` usa el método del mixin: `return 5 + this.bendicion();`.", "Inside `poder()` use the mixin's method: `return 5 + this.bendicion();`."),
        P("Aplica el mixin: `Object.assign(Frasco.prototype, Bendecido);` (y Capa).", "Apply the mixin: `Object.assign(Frasco.prototype, Bendecido);` (and Capa)."),
      ],
      test_cases: [
        { input: "new Frasco().poder()", expected: 15, description: P("5 propios + 10 de bendición", "5 of its own + 10 blessing"), raw: true },
        { input: "new Capa().poder()", expected: 12, description: P("2 propios + 10 de bendición", "2 of its own + 10 blessing"), raw: true },
        { input: "Cofre.poderTotal([new Frasco(), new Capa()])", expected: 27, description: P("El cofre las suma a ambas como Don", "The chest sums both as Don"), raw: true },
        {
          input: "(new Frasco() instanceof Don) && Frasco.prototype.bendicion === Bendecido.bendicion",
          raw: true,
          expected: true,
          description: P("Hereda de Don Y usa el mixin Bendecido", "Inherits from Don AND uses the Bendecido mixin"),
        },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre errores y factorías. */
const Q_THROW = {
  question: P("¿Qué hace `throw new Error('boom')` en JS?", "What does `throw new Error('boom')` do in JS?"),
  options: [
    P("Lanza el error e interrumpe el flujo hasta que un catch lo recoja", "Throws the error and interrupts the flow until a catch takes it"),
    P("Imprime 'boom' y sigue", "Prints 'boom' and continues"),
    P("Termina el programa en silencio", "Ends the program silently"),
    P("Crea un Error sin ningún efecto", "Creates an Error with no effect"),
  ],
  correct: 0,
  explanation: P(
    "`throw` corta la ejecución y propaga el error hacia arriba por la pila hasta el primer `catch` que lo recoja. Si nadie lo captura, la ejecución termina con el error sin manejar.",
    "`throw` cuts execution and propagates the error up the stack to the first `catch` that takes it. If no one catches it, execution ends with the unhandled error.",
  ),
};
const Q_TRYCATCH = {
  question: P("En `try { ... } catch (e) { ... }`, ¿cuándo entra el catch?", "In `try { ... } catch (e) { ... }`, when does the catch run?"),
  options: [
    P("Sólo si el try lanza (throw) un error", "Only if the try throws an error"),
    P("Siempre, después del try", "Always, after the try"),
    P("Sólo si el try termina bien", "Only if the try finishes fine"),
    P("Nunca, si el try tiene return", "Never, if the try has a return"),
  ],
  correct: 0,
  explanation: P(
    "El `catch` es el plan B: sólo se ejecuta si dentro del `try` se lanza algo. Si el try va bien, se salta. A diferencia de PHP, en JS un solo `catch` recibe cualquier error; se distingue el tipo dentro con `instanceof`.",
    "The `catch` is plan B: it only runs if something is thrown inside the `try`. If the try goes fine, it's skipped. Unlike PHP, in JS a single `catch` receives any error; you distinguish the type inside with `instanceof`.",
  ),
};
const Q_FINALLY = {
  question: P("¿Para qué sirve el bloque `finally`?", "What is the `finally` block for?"),
  options: [
    P("Para código que corre haya o no error (limpieza, cierre)", "For code that runs whether or not there's an error (cleanup, closing)"),
    P("Para capturar lo que el catch no cogió", "To catch what the catch missed"),
    P("Sólo corre si NO hubo error", "It only runs if there was NO error"),
    P("Para relanzar el error", "To rethrow the error"),
  ],
  correct: 0,
  explanation: P(
    "`finally` corre siempre: acabe bien el try o salte un error (incluso con un `return` de por medio). Es donde liberas recursos —cerrar un fichero, soltar un candado— sin duplicar ese código en cada rama.",
    "`finally` always runs: whether the try finishes fine or throws (even with a `return` in play). It's where you release resources —close a file, drop a lock— without duplicating that code in each branch.",
  ),
};
const Q_CUSTOMERR = {
  question: P("¿Cómo se crea un tipo de error propio en JS?", "How do you create a custom error type in JS?"),
  options: [
    P("class CorruptionError extends Error {}", "class CorruptionError extends Error {}"),
    P("class CorruptionError implements Error {}", "class CorruptionError implements Error {}"),
    P("throw new String('error')", "throw new String('error')"),
    P("function Error CorruptionError() {}", "function Error CorruptionError() {}"),
  ],
  correct: 0,
  explanation: P(
    "Extendiendo `Error` obtienes un tipo propio con `.message` y capturable por su clase con `instanceof`. Así distingues «esto es corrupción» de cualquier otro fallo dentro del catch.",
    "Extending `Error` gives you a custom type with `.message`, catchable by its class with `instanceof`. That's how you tell \"this is corruption\" from any other failure inside the catch.",
  ),
};
const Q_FACTORY = {
  question: P("¿Qué es el patrón Factory (fábrica)?", "What is the Factory pattern?"),
  options: [
    P("Una función/método cuya tarea es CREAR objetos, centralizando el `new`", "A function/method whose job is to CREATE objects, centralizing `new`"),
    P("Un objeto que se clona a sí mismo", "An object that clones itself"),
    P("Otro nombre para el constructor", "Another name for the constructor"),
    P("Una clase sólo de campos estáticos", "A class of only static fields"),
  ],
  correct: 0,
  explanation: P(
    "Una fábrica decide QUÉ crear y CÓMO, devolviendo algo que cumple cierta forma. Quien la usa pide por un dato ('uruk') y no se acopla a la clase concreta ni esparce `new` por todo el código.",
    "A factory decides WHAT to create and HOW, returning something of a certain shape. The caller asks by a value ('uruk') and doesn't couple to the concrete class or spread `new` all over.",
  ),
};
const Q_ERRVSRET = {
  question: P("¿Por qué lanzar un error suele ser mejor que devolver `null` al fallar?", "Why is throwing an error often better than returning `null` on failure?"),
  options: [
    P("Un null se ignora por accidente; un throw obliga a tratarlo o propaga el fallo", "A null is ignored by accident; a throw forces handling or propagates the failure"),
    P("Lanzar es más rápido", "Throwing is faster"),
    P("null ocupa más memoria", "null uses more memory"),
    P("No hay diferencia", "There's no difference"),
  ],
  correct: 0,
  explanation: P(
    "Un `null` de error se cuela hacia adelante disfrazado hasta estallar lejos del origen (el famoso 'cannot read property of null'). Un error lanzado se hace visible: o lo capturas, o detiene el flujo donde de verdad falló.",
    "An error `null` slips forward disguised until it blows up far from the source (the famous 'cannot read property of null'). A thrown error is visible: either you catch it, or it stops the flow where it truly failed.",
  ),
};
const Q_ERR_MESSAGE = {
  question: P("Capturas un error `e`. ¿Cómo lees su mensaje?", "You catch an error `e`. How do you read its message?"),
  options: [
    P("e.message", "e.message"),
    P("e.text", "e.text"),
    P("e.getMessage()", "e.getMessage()"),
    P("e.value", "e.value"),
  ],
  correct: 0,
  explanation: P(
    "Un `Error` tiene `.message` (el texto) y `.name` (el tipo, p. ej. 'TypeError'). `getMessage()` es de PHP. En JS se accede como propiedades: `e.message`.",
    "An `Error` has `.message` (the text) and `.name` (the type, e.g. 'TypeError'). `getMessage()` is PHP. In JS you access them as properties: `e.message`.",
  ),
};
const Q_RETHROW = {
  question: P("Capturas un error que no sabes resolver aquí. ¿Qué es lo correcto?", "You catch an error you can't resolve here. What's the right thing?"),
  options: [
    P("Relanzarlo (`throw e`) para que un nivel superior decida", "Rethrow it (`throw e`) so a higher level decides"),
    P("Ignorarlo con un catch vacío", "Ignore it with an empty catch"),
    P("Devolver null y seguir", "Return null and continue"),
    P("Convertirlo en un console.log", "Turn it into a console.log"),
  ],
  correct: 0,
  explanation: P(
    "Tragarse un error que no sabes manejar lo esconde y aparece más tarde y peor. Si no es tu responsabilidad, RELÁNZALO (`throw e`) o envuélvelo en otro con más contexto. Capturar no obliga a resolver ahí.",
    "Swallowing an error you can't handle hides it, and it resurfaces later and worse. If it's not your responsibility, RETHROW it (`throw e`) or wrap it in another with more context. Catching doesn't oblige you to resolve it there.",
  ),
};
const Q_ERR_INSTANCEOF = {
  question: P("Dentro de un `catch (e)`, ¿cómo distingues si es un tipo de error concreto?", "Inside a `catch (e)`, how do you tell if it's a specific error type?"),
  options: [
    P("Con `if (e instanceof MiError) { ... }`", "With `if (e instanceof MiError) { ... }`"),
    P("Con varios `catch` por tipo, como en PHP", "With several `catch` blocks by type, as in PHP"),
    P("Con `switch (e.type)`", "With `switch (e.type)`"),
    P("No se puede distinguir", "You can't tell them apart"),
  ],
  correct: 0,
  explanation: P(
    "En JS hay UN solo `catch` que recibe cualquier error; distingues el tipo dentro con `instanceof` (o `e.name`). No existen los `catch` por tipo de PHP/Java.",
    "In JS there's a SINGLE `catch` that receives any error; you tell the type inside with `instanceof` (or `e.name`). There are no per-type `catch` blocks like in PHP/Java.",
  ),
};

/** Capítulo 8 · Errores (throw, try/catch/finally, Error propios) y factorías. */
export const SYL_JS_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_THROW, Q_ERRVSRET, Q_CUSTOMERR] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_TRYCATCH, Q_FINALLY, Q_ERR_MESSAGE] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_FACTORY, Q_RETHROW, Q_ERR_INSTANCEOF] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, el primero de los Uruk-hai", "Lurtz, first of the Uruk-hai"),
    lore_intro: P(
      "El último enemigo de la Comunidad. Monta la fábrica que crea a la hueste de Isengard — y que ante lo desconocido, LANZA en vez de mentir.",
      "The Fellowship's last foe. Build the factory that creates the host of Isengard — and that, faced with the unknown, THROWS instead of lying.",
    ),
    challenge: {
      topic: P("Factoría y errores (throw)", "Factory and errors (throw)"),
      instructions: P(
        "Existen las clases `Orco` (`fuerza()` = 10) y `UrukHai` (`fuerza()` = 30). Escribe `crear(tipo)` que devuelva un `Orco` para `'orco'`, un `UrukHai` para `'uruk'`, y LANCE un `Error` para cualquier otro tipo.\n\n`crear('uruk').fuerza()` → `30`.",
        "The classes `Orco` (`fuerza()` = 10) and `UrukHai` (`fuerza()` = 30) exist. Write `crear(tipo)` returning an `Orco` for `'orco'`, a `UrukHai` for `'uruk'`, and THROWING an `Error` for any other type.\n\n`crear('uruk').fuerza()` → `30`.",
      ),
      support_code:
        "class Orco {\n  fuerza() { return 10; }\n}\nclass UrukHai {\n  fuerza() { return 30; }\n}",
      starter_code: "function crear(tipo) {\n}\n",
      blocks: [
        "function crear(tipo) {",
        "  if (tipo === 'orco') return new Orco();",
        "  if (tipo === 'uruk') return new UrukHai();",
        "  throw new Error('tipo desconocido');",
        "}",
        "  return new Orco();",
      ],
      hints: [
        P("Compara el tipo y devuelve la instancia; para lo desconocido, `throw new Error(...)`.", "Compare the type and return the instance; for the unknown, `throw new Error(...)`."),
        P("`if (tipo === 'orco') return new Orco();` … `throw new Error('tipo desconocido: ' + tipo);`.", "`if (tipo === 'orco') return new Orco();` … `throw new Error('tipo desconocido: ' + tipo);`."),
      ],
      test_cases: [
        { input: "crear('orco').fuerza()", expected: 10, description: P("El orco", "The orc"), raw: true },
        { input: "crear('uruk').fuerza()", expected: 30, description: P("El Uruk-hai", "The Uruk-hai"), raw: true },
        { input: "(() => { try { crear('elfo'); return false; } catch (e) { return true; } })()", expected: true, description: P("Un tipo desconocido lanza", "An unknown type throws"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino de lo que Puede Fallar", "The Scroll of What Can Go Wrong"),
    lore_intro: P(
      "Aragorn deja caer un pergamino junto al fuego apagado. «Ninguna compañía sobrevive fingiendo que nada saldrá mal. Nómbralo, y podrás responder.»",
      "Aragorn drops a scroll beside the dead fire. \"No company survives pretending nothing will go wrong. Name it, and you can answer it.\"",
    ),
    scroll: {
      topic: P("Errores y patrón Factory", "Errors and the Factory pattern"),
      sections: [
        {
          heading: P("Un error NO es un valor de retorno", "An error is NOT a return value"),
          body: P(
            "Devolver `null` cuando algo falla obliga a quien llama a adivinar. Un error propio (`class X extends Error`) nombra el problema y se propaga con `throw` hasta quien sepa manejarlo.",
            "Returning `null` on failure forces the caller to guess. A custom error (`class X extends Error`) names the problem and propagates with `throw` to whoever can handle it.",
          ),
          code: "class CorruptionError extends Error {}\n\nfunction resistir(tentacion) {\n  if (tentacion > 80) throw new CorruptionError('El Anillo lo reclama');\n  return 'resiste';\n}",
        },
        {
          heading: P("try / catch / finally", "try / catch / finally"),
          body: P(
            "Un solo `catch` recibe cualquier error; distingues el tipo con `instanceof`. `finally` corre pase lo que pase. Regla de oro: no te tragues el error con un catch vacío.",
            "A single `catch` receives any error; you tell the type with `instanceof`. `finally` runs no matter what. Golden rule: don't swallow the error with an empty catch.",
          ),
          code: "try {\n  return solio.mirar(conAnillo);\n} catch (e) {\n  if (e instanceof VisionError) return 'te quitas el Anillo: ' + e.message;\n  throw e; // lo que no sé manejar, lo relanzo\n}",
        },
        {
          heading: P("Factory: crear sin acoplarse al new", "Factory: create without coupling to new"),
          body: P(
            "Una fábrica centraliza la creación. Quien la usa pide 'un uruk' y recibe algo con la forma esperada, sin conocer la clase concreta. Ante un tipo inválido, lanza.",
            "A factory centralizes creation. The caller asks for 'an uruk' and gets something of the expected shape, without knowing the concrete class. On an invalid type, it throws.",
          ),
          code: "class FabricaDeHuestes {\n  static crear(tipo) {\n    if (tipo === 'orco') return new Orco();\n    if (tipo === 'uruk') return new UrukHai();\n    throw new Error(`Tipo desconocido: ${tipo}`);\n  }\n}",
        },
      ],
      keyTakeaway: P(
        "Lanza errores con tipo propio y captúralos donde puedas hacer algo útil (relanza el resto); `finally` limpia siempre. Y cuando el `new` se repite por todas partes, es hora de una fábrica.",
        "Throw typed errors and catch them where you can do something useful (rethrow the rest); `finally` always cleans up. And when `new` repeats everywhere, it's time for a factory.",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P(
      "«Podríamos usarlo… ¡Dámelo!» El Anillo susurra al orgullo de Gondor. Cuando la voluntad no basta, declara el fallo por su nombre.",
      "\"We could use it… Give it to me!\" The Ring whispers to Gondor's pride. When will isn't enough, declare the failure by name.",
    ),
    challenge: {
      topic: P("Errores propios (throw)", "Custom errors (throw)"),
      instructions: P(
        "Crea `CorruptionError` que EXTIENDA `Error`. Después crea la clase `Boromir` con `resistir(tentacion)` que devuelva 'resiste' si la tentación es 80 o menos, y LANCE un `CorruptionError` con el mensaje 'El Anillo lo reclama' si es mayor que 80.",
        "Create `CorruptionError` EXTENDING `Error`. Then create class `Boromir` with `resistir(tentacion)` returning 'resiste' if temptation is 80 or less, and THROWING a `CorruptionError` with the message 'El Anillo lo reclama' if greater than 80.",
      ),
      sut: "new Boromir()",
      starter_code: "class CorruptionError extends Error {}\n\nclass Boromir {\n  resistir(tentacion) {\n  }\n}\n",
      blocks: [
        "class CorruptionError extends Error {}",
        "class Boromir {",
        "  resistir(tentacion) {",
        "    if (tentacion >= 90) throw new CorruptionError('El Anillo lo reclama');",
        "    return 'resiste';",
        "  }",
        "}",
        "    return 'sucumbe';",
      ],
      hints: [
        P("Guard clause: `if (tentacion > 80) throw new CorruptionError('El Anillo lo reclama');`.", "Guard clause: `if (tentacion > 80) throw new CorruptionError('El Anillo lo reclama');`."),
        P("El mensaje se lee con `e.message`.", "The message is read with `e.message`."),
      ],
      test_cases: [
        { input: "resistir(50)", expected: "resiste", description: P("Con poca tentación, aguanta", "With little temptation, he holds") },
        {
          input: "(() => { try { new Boromir().resistir(95); return false; } catch (e) { return e instanceof CorruptionError; } })()",
          raw: true,
          expected: true,
          description: P("Con 95 sucumbe: lanza CorruptionError", "At 95 he succumbs: throws CorruptionError"),
        },
        {
          input: "(() => { try { new Boromir().resistir(95); return ''; } catch (e) { return e.message; } })()",
          raw: true,
          expected: "El Anillo lo reclama",
          description: P("El error lleva su mensaje", "The error carries its message"),
        },
        { input: "new CorruptionError('x') instanceof Error", expected: true, description: P("Debe EXTENDER Error", "Must EXTEND Error"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P(
      "Frodo sube a Amon Hen y se pone el Anillo. Ver de más tiene un precio: hay que saber recogerlo.",
      "Frodo climbs Amon Hen and puts on the Ring. Seeing too much has a price: you must know how to catch it.",
    ),
    challenge: {
      topic: P("try / catch", "try / catch"),
      instructions: P(
        "El `Solio` ya existe: `mirar(conAnillo)` devuelve la visión, pero LANZA `VisionError` si miras con el Anillo puesto. Crea `observar(solio, conAnillo)` que capture esa excepción y devuelva 'te quitas el Anillo: ' seguido del mensaje del error.",
        "The `Solio` already exists: `mirar(conAnillo)` returns the vision, but THROWS `VisionError` if you look with the Ring on. Create `observar(solio, conAnillo)` that catches it and returns 'te quitas el Anillo: ' followed by the error's message.",
      ),
      support_code:
        "class VisionError extends Error {}\n\nclass Solio {\n  mirar(conAnillo) {\n    if (conAnillo) throw new VisionError('El Ojo te ve');\n    return 'ves las tierras de Rohan';\n  }\n}",
      starter_code: "\nfunction observar(solio, conAnillo) {\n}\n",
      blocks: [
        "function observar(solio, conAnillo) {",
        "  try {",
        "    return solio.mirar(conAnillo);",
        "  } catch (e) {",
        "    return `te quitas el Anillo: ${e.message}`;",
        "  }",
        "}",
        "  return solio.mirar(conAnillo);",
      ],
      hints: [
        P("Envuelve la llamada: `try { return solio.mirar(conAnillo); } catch (e) { ... }`.", "Wrap the call: `try { return solio.mirar(conAnillo); } catch (e) { ... }`."),
        P("En el catch: `return 'te quitas el Anillo: ' + e.message;`.", "In the catch: `return 'te quitas el Anillo: ' + e.message;`."),
      ],
      test_cases: [
        { input: "observar(new Solio(), false)", expected: "ves las tierras de Rohan", description: P("Sin el Anillo, la visión es segura", "Without the Ring, the vision is safe"), raw: true },
        { input: "observar(new Solio(), true)", expected: "te quitas el Anillo: El Ojo te ve", description: P("Con el Anillo, capturas y reaccionas", "With the Ring, you catch and react"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P(
      "Bajan por centenares. No los crees uno a uno: monta una fábrica que decida qué crear.",
      "They come down by the hundreds. Don't create them one by one: build a factory that decides what to make.",
    ),
    challenge: {
      topic: P("Patrón Factory", "Factory pattern"),
      instructions: P(
        "Existen las clases `Orco` (resistenciaSol 0) y `UrukHai` (100). Crea `FabricaDeHuestes` con el método ESTÁTICO `crear(tipo)` que devuelva un `Orco` para 'orco', un `UrukHai` para 'uruk', y LANCE un `Error` con cualquier otro tipo.",
        "The classes `Orco` (resistenciaSol 0) and `UrukHai` (100) exist. Create `FabricaDeHuestes` with a STATIC method `crear(tipo)` returning an `Orco` for 'orco', a `UrukHai` for 'uruk', and THROWING an `Error` for any other type.",
      ),
      support_code:
        "class Orco {\n  resistenciaSol() { return 0; }\n}\nclass UrukHai {\n  resistenciaSol() { return 100; }\n}",
      starter_code: "\nclass FabricaDeHuestes {\n  static crear(tipo) {\n  }\n}\n",
      blocks: [
        "class FabricaDeHuestes {",
        "  static crear(tipo) {",
        "    if (tipo === 'orco') return new Orco();",
        "    if (tipo === 'uruk') return new UrukHai();",
        "    throw new Error('tipo desconocido');",
        "  }",
        "}",
        "    return new Orco();",
      ],
      hints: [
        P("Compara el tipo y devuelve la instancia: `if (tipo === 'orco') return new Orco();`.", "Compare the type and return the instance: `if (tipo === 'orco') return new Orco();`."),
        P("Para lo desconocido: `throw new Error(`Tipo desconocido: ${tipo}`);`.", "For the unknown: `throw new Error(`Tipo desconocido: ${tipo}`);`."),
      ],
      test_cases: [
        { input: "FabricaDeHuestes.crear('orco').resistenciaSol()", expected: 0, description: P("El orco común se abrasa al sol", "The common orc burns in the sun"), raw: true },
        { input: "FabricaDeHuestes.crear('uruk').resistenciaSol()", expected: 100, description: P("El Uruk-hai marcha a plena luz", "The Uruk-hai marches in full daylight"), raw: true },
        { input: "FabricaDeHuestes.crear('uruk') instanceof UrukHai", expected: true, description: P("La fábrica devuelve el tipo correcto", "The factory returns the right type"), raw: true },
        {
          input: "(() => { try { FabricaDeHuestes.crear('elfo'); return false; } catch (e) { return true; } })()",
          raw: true,
          expected: true,
          description: P("Un tipo desconocido se rechaza", "An unknown type is rejected"),
        },
      ],
    },
  },
};
