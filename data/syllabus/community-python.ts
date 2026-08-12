import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de Python para el Libro I. Reviste la MISMA narrativa compartida
 * de la Comunidad (Sombras en la Comarca) con fundamentos de Python.
 * Bilingüe ES/EN. Ejecutable con Pyodide en el navegador.
 */

const P = (es: string, en: string) => ({ es, en });

/* ===================================================================== *
 * Capítulo 1 · Fundamentos: variables, f-strings, tipos y decisiones
 * ===================================================================== */

const Q_PY_VAR = {
  question: P(
    "¿Cómo declaras una variable en Python?",
    "How do you declare a variable in Python?",
  ),
  options: [
    P("nombre = 'Frodo'", "nombre = 'Frodo'"),
    P("const nombre = 'Frodo'", "const nombre = 'Frodo'"),
    P("let nombre = 'Frodo'", "let nombre = 'Frodo'"),
    P("var nombre = 'Frodo'", "var nombre = 'Frodo'"),
  ],
  correct: 0,
  explanation: P(
    "En Python no hay palabra clave: se asigna directamente con `=`. No se declara el tipo ni se usa const/let/var (esos son de JavaScript).",
    "In Python there is no keyword: you assign directly with `=`. You don't declare the type nor use const/let/var (those are JavaScript).",
  ),
};

const Q_PY_FSTRING = {
  question: P(
    "¿Cómo incrustas una variable `n` dentro de un texto?",
    "How do you embed a variable `n` inside a string?",
  ),
  options: [
    P('f"Hola {n}"', 'f"Hola {n}"'),
    P('"Hola ${n}"', '"Hola ${n}"'),
    P('"Hola #{n}"', '"Hola #{n}"'),
    P('"Hola " . n', '"Hola " . n'),
  ],
  correct: 0,
  explanation: P(
    "Una f-string lleva una `f` delante de las comillas y la expresión va entre `{ }`: `f\"Hola {n}\"`. El `${}` es de JavaScript; `#{}` de Ruby.",
    "An f-string has an `f` before the quotes and the expression goes in `{ }`: `f\"Hola {n}\"`. `${}` is JavaScript; `#{}` is Ruby.",
  ),
};

const Q_PY_TYPE = {
  question: P("¿Qué devuelve `type(42)`?", "What does `type(42)` return?"),
  options: [
    P("<class 'int'>", "<class 'int'>"),
    P("'number'", "'number'"),
    P("'int'", "'int'"),
    P("42", "42"),
  ],
  correct: 0,
  explanation: P(
    "`type(x)` devuelve la CLASE del valor: `<class 'int'>`, `<class 'str'>`, `<class 'float'>`… A diferencia de JS, Python distingue `int` de `float`.",
    "`type(x)` returns the value's CLASS: `<class 'int'>`, `<class 'str'>`, `<class 'float'>`… Unlike JS, Python tells `int` from `float`.",
  ),
};

const Q_PY_INT_CONV = {
  question: P(
    "¿Cómo conviertes el texto '42' en el número 42?",
    "How do you turn the text '42' into the number 42?",
  ),
  options: [
    P("int('42')", "int('42')"),
    P("Number('42')", "Number('42')"),
    P("'42'.toInt()", "'42'.toInt()"),
    P("parseInt('42')", "parseInt('42')"),
  ],
  correct: 0,
  explanation: P(
    "`int('42')` convierte texto a entero; `float('4.2')` a decimal; `str(42)` al revés. `Number()`/`parseInt()` son de JavaScript.",
    "`int('42')` turns text into an integer; `float('4.2')` into a decimal; `str(42)` the other way. `Number()`/`parseInt()` are JavaScript.",
  ),
};

const Q_PY_BOOL = {
  question: P(
    "¿Cómo se escriben los valores booleanos en Python?",
    "How are boolean values written in Python?",
  ),
  options: [
    P("True y False (con mayúscula)", "True and False (capitalized)"),
    P("true y false", "true and false"),
    P("TRUE y FALSE", "TRUE and FALSE"),
    P("1 y 0 solamente", "1 and 0 only"),
  ],
  correct: 0,
  explanation: P(
    "En Python los booleanos van en Mayúscula inicial: `True` y `False`. En minúscula (`true`) darían NameError. Son subtipo de `int`: `True == 1`.",
    "In Python booleans are Capitalized: `True` and `False`. Lowercase (`true`) would raise NameError. They subtype `int`: `True == 1`.",
  ),
};

const Q_PY_NONE = {
  question: P(
    "¿Qué representa la ausencia de valor en Python?",
    "What represents the absence of a value in Python?",
  ),
  options: [
    P("None", "None"),
    P("null", "null"),
    P("undefined", "undefined"),
    P("nil", "nil"),
  ],
  correct: 0,
  explanation: P(
    "`None` es el valor 'nada' de Python (una función sin `return` lo devuelve). `null`/`undefined` son de JS; `nil` de Ruby/Go. Se compara con `is None`.",
    "`None` is Python's 'nothing' value (a function with no `return` gives it). `null`/`undefined` are JS; `nil` is Ruby/Go. Compare it with `is None`.",
  ),
};

const Q_PY_IF = {
  question: P(
    "¿Cuál es la sintaxis correcta de un condicional en Python?",
    "What is the correct conditional syntax in Python?",
  ),
  options: [
    P("if x > 0:  (dos puntos y cuerpo indentado)", "if x > 0:  (colon and indented body)"),
    P("if (x > 0) { ... }", "if (x > 0) { ... }"),
    P("if x > 0 then ... end", "if x > 0 then ... end"),
    P("if x > 0 do ...", "if x > 0 do ..."),
  ],
  correct: 0,
  explanation: P(
    "Python usa `:` al final y el cuerpo va INDENTADO (sin llaves). Para el 'si no si' se usa `elif`, y `else:` para el resto.",
    "Python uses `:` at the end and the body is INDENTED (no braces). Use `elif` for 'else if', and `else:` for the rest.",
  ),
};

const Q_PY_MODULO = {
  question: P("¿Qué devuelve `7 % 3` en Python?", "What does `7 % 3` return in Python?"),
  options: [
    P("1 (el RESTO de la división)", "1 (the REMAINDER of the division)"),
    P("2 (el cociente)", "2 (the quotient)"),
    P("2.33", "2.33"),
    P("21", "21"),
  ],
  correct: 0,
  explanation: P(
    "`%` da el RESTO: `7 % 3` es 1. Para el cociente entero se usa `//` (`7 // 3` es 2). `n % 2 == 0` comprueba si es par.",
    "`%` gives the REMAINDER: `7 % 3` is 1. For integer quotient use `//` (`7 // 3` is 2). `n % 2 == 0` checks even.",
  ),
};

const Q_PY_LEN = {
  question: P("¿Qué devuelve `len('mellon')`?", "What does `len('mellon')` return?"),
  options: [
    P("6 (el número de caracteres)", "6 (the number of characters)"),
    P("'mellon'.length", "'mellon'.length"),
    P("true", "true"),
    P("Un error: usa .size", "An error: use .size"),
  ],
  correct: 0,
  explanation: P(
    "`len(x)` es una FUNCIÓN global que da la longitud de textos, listas, dicts… En Python NO se usa `.length` (eso es JS): siempre `len(...)`.",
    "`len(x)` is a global FUNCTION giving the length of strings, lists, dicts… In Python you do NOT use `.length` (that's JS): always `len(...)`.",
  ),
};

export const SYL_PY_COMMUNITY_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [Q_PY_VAR, Q_PY_FSTRING, Q_PY_TYPE],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [Q_PY_INT_CONV, Q_PY_BOOL, Q_PY_NONE],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [Q_PY_IF, Q_PY_MODULO, Q_PY_LEN],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl acorrala a Frodo. No hay acero que lo hiera aquí: sólo la VOLUNTAD. Escribe la función que mide si resistes o sucumbes.",
      "The Nazgûl corners Frodo. No steel harms it here: only WILL. Write the function that measures whether you resist or succumb.",
    ),
    challenge: {
      topic: P("Funciones, f-strings y condicionales", "Functions, f-strings and conditionals"),
      instructions: P(
        "Escribe `resistir(nombre, tentacion)`:\n• si `tentacion` es 100 o más, devuelve `'{nombre} sucumbe'`,\n• si no, devuelve `'{nombre} resiste con {X} de voluntad'`, donde `X` es `100 - tentacion`.\n\nEjemplo: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
        "Write `resistir(nombre, tentacion)`:\n• if `tentacion` is 100 or more, return `'{nombre} sucumbe'`,\n• otherwise, return `'{nombre} resiste con {X} de voluntad'`, where `X` is `100 - tentacion`.\n\nExample: `resistir('Frodo', 30)` → `'Frodo resiste con 70 de voluntad'`.",
      ),
      starter_code: "def resistir(nombre, tentacion):\n    pass\n",
      blocks: [
        "def resistir(nombre, tentacion):",
        "    if tentacion >= 100:",
        "        return f'{nombre} sucumbe'",
        "    return f'{nombre} resiste con {100 - tentacion} de voluntad'",
        "    return f'{nombre} resiste'",
      ],
      hints: [
        P("Un `if tentacion >= 100:` para el caso de sucumbir; el resto, resistir.", "An `if tentacion >= 100:` for the succumb case; the rest, resist."),
        P("Interpola con f-strings: `f'{nombre} resiste con {100 - tentacion} de voluntad'`.", "Interpolate with f-strings: `f'{nombre} resiste con {100 - tentacion} de voluntad'`."),
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
        "Python desde cero: variables, tipos y decisiones",
        "Python from scratch: variables, types and decisions",
      ),
      sections: [
        {
          heading: P("Variables: sin palabra clave", "Variables: no keyword"),
          body: P(
            "Se asigna directamente con `=`. No se declara el tipo: lo deduce el valor. Los nombres van en minúscula_con_guiones.",
            "You assign directly with `=`. You don't declare the type: the value implies it. Names use lower_snake_case.",
          ),
          code:
            "nombre = 'Frodo'    # str\nedad = 50           # int\nedad = 51           # se reasigna sin más\nactivo = True       # bool",
        },
        {
          heading: P("f-strings", "f-strings"),
          body: P(
            "Con una `f` delante de las comillas incrustas expresiones entre `{ }`. Más legible que concatenar con `+`.",
            "With an `f` before the quotes you embed expressions in `{ }`. More readable than concatenating with `+`.",
          ),
          code: "n = 'Sam'\nf'Hola, {n}'          # 'Hola, Sam'\nf'El doble es {2 * 21}'  # 'El doble es 42'",
        },
        {
          heading: P("Tipos y conversión", "Types and conversion"),
          body: P(
            "`int('42')` convierte texto a entero, `str(42)` al revés. `type(x)` da la clase. Python distingue `int` de `float`.",
            "`int('42')` turns text into an integer, `str(42)` the other way. `type(x)` gives the class. Python tells `int` from `float`.",
          ),
          code: "int('42')      # 42\nfloat('4.2')   # 4.2\nstr(42)        # '42'\ntype(42)       # <class 'int'>",
        },
        {
          heading: P("Decisiones", "Decisions"),
          body: P(
            "`if` / `elif` / `else` con `:` y cuerpo indentado. `None` es la ausencia de valor; se compara con `is None`.",
            "`if` / `elif` / `else` with `:` and an indented body. `None` is the absence of a value; compare it with `is None`.",
          ),
          code: "if n <= 0:\n    estado = 'vacío'\nelif n < 3:\n    estado = 'algo'\nelse:\n    estado = 'lleno'",
        },
      ],
      keyTakeaway: P(
        "Asigna con = (sin const/let). f-strings con f'...{x}...'. Convierte con int()/str(). Indenta el cuerpo tras los dos puntos.",
        "Assign with = (no const/let). f-strings with f'...{x}...'. Convert with int()/str(). Indent the body after the colon.",
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
      topic: P("Funciones y f-strings", "Functions and f-strings"),
      instructions: P(
        "Escribe `presentarse(nombre)` que devuelva una f-string con el formato exacto:\n\n  Soy {nombre} de la Comarca\n\nPor ejemplo, `presentarse('Frodo')` devuelve `'Soy Frodo de la Comarca'`.",
        "Write `presentarse(nombre)` that returns an f-string with the exact format:\n\n  Soy {name} de la Comarca\n\nFor example, `presentarse('Frodo')` returns `'Soy Frodo de la Comarca'`.",
      ),
      starter_code: "def presentarse(nombre):\n    pass\n",
      blocks: [
        "def presentarse(nombre):",
        "    return f'Soy {nombre} de la Comarca'",
        "    return 'Soy ' + nombre",
        "    return f'Soy {nombre}'",
      ],
      hints: [
        P("Una f-string lleva una `f` delante: `f'...'`.", "An f-string has an `f` in front: `f'...'`."),
        P("La variable va entre llaves: `f'Soy {nombre} de la Comarca'`.", "The variable goes in braces: `f'Soy {nombre} de la Comarca'`."),
      ],
      test_cases: [
        { input: "presentarse('Frodo')", expected: "Soy Frodo de la Comarca", description: P("El formato exacto", "The exact format"), raw: true },
        { input: "presentarse('Sam')", expected: "Soy Sam de la Comarca", description: P("Con otro nombre", "With another name"), raw: true },
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
        "Escribe dos funciones:\n\n• `ocultar(actual, n)` — suma `n` al sigilo `actual`, SIN pasar de 100. Usa `min`.\n• `es_visible(sigilo, percepcion)` — devuelve True si tu `sigilo` es MENOR que la `percepcion` del Nazgûl.",
        "Write two functions:\n\n• `ocultar(actual, n)` — adds `n` to the current stealth, capped at 100. Use `min`.\n• `es_visible(sigilo, percepcion)` — returns True if your `sigilo` is LESS than the Nazgûl's `percepcion`.",
      ),
      starter_code: "def ocultar(actual, n):\n    pass\n\ndef es_visible(sigilo, percepcion):\n    pass\n",
      blocks: [
        "def ocultar(actual, n):",
        "    return min(100, actual + n)",
        "def es_visible(sigilo, percepcion):",
        "    return sigilo < percepcion",
        "    return max(100, actual + n)",
        "    return sigilo > percepcion",
      ],
      hints: [
        P("`min(100, actual + n)` nunca devuelve más de 100.", "`min(100, actual + n)` never returns more than 100."),
        P("`sigilo < percepcion` ya es un booleano: devuélvelo.", "`sigilo < percepcion` is already a boolean: return it."),
      ],
      test_cases: [
        { input: "ocultar(0, 70)", expected: 70, description: P("Suma normal", "Plain sum"), raw: true },
        { input: "ocultar(70, 50)", expected: 100, description: P("70+50 se corta en 100", "70+50 caps at 100"), raw: true },
        { input: "ocultar(90, 30)", expected: 100, description: P("Nunca pasa de 100", "Never over 100"), raw: true },
        { input: "es_visible(100, 50)", expected: false, description: P("Sigilo alto: no te ve", "High stealth: unseen"), raw: true },
        { input: "es_visible(40, 120)", expected: true, description: P("Nazgûl muy perceptivo", "Very perceptive Nazgûl"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 2 · Control de flujo: bucles y listas
 * ===================================================================== */

const Q_PY_FOR = {
  question: P("¿Cómo recorres cada elemento de una lista `xs`?", "How do you go over each element of a list `xs`?"),
  options: [
    P("for x in xs:", "for x in xs:"),
    P("for (x of xs) {", "for (x of xs) {"),
    P("foreach (xs as x)", "foreach (xs as x)"),
    P("for x := range xs {", "for x := range xs {"),
  ],
  correct: 0,
  explanation: P(
    "`for x in xs:` recorre directamente los VALORES de la lista. No hay `of` (JS) ni `foreach` (PHP): en Python el `for` siempre itera sobre un iterable.",
    "`for x in xs:` iterates the list's VALUES directly. No `of` (JS) nor `foreach` (PHP): in Python `for` always loops over an iterable.",
  ),
};
const Q_PY_APPEND = {
  question: P("¿Cómo añades un elemento al final de una lista `r`?", "How do you add an element to the end of a list `r`?"),
  options: [
    P("r.append(x)", "r.append(x)"),
    P("r.push(x)", "r.push(x)"),
    P("r.add(x)", "r.add(x)"),
    P("r[] = x", "r[] = x"),
  ],
  correct: 0,
  explanation: P(
    "`r.append(x)` añade al final en Python. `.push()` es de JS, `.add()` de sets/otros lenguajes, `r[] = x` de PHP.",
    "`r.append(x)` appends in Python. `.push()` is JS, `.add()` is sets/other languages, `r[] = x` is PHP.",
  ),
};
const Q_PY_RANGE = {
  question: P("¿Qué produce `range(3)`?", "What does `range(3)` produce?"),
  options: [
    P("Los números 0, 1, 2 (para de 3)", "The numbers 0, 1, 2 (stops before 3)"),
    P("Los números 1, 2, 3", "The numbers 1, 2, 3"),
    P("Los números 0, 1, 2, 3", "The numbers 0, 1, 2, 3"),
    P("La lista [3]", "The list [3]"),
  ],
  correct: 0,
  explanation: P(
    "`range(n)` genera de 0 hasta n-1 (sin incluir n). `range(1, 4)` da 1,2,3. Se usa mucho en `for i in range(...)`.",
    "`range(n)` yields 0 up to n-1 (excluding n). `range(1, 4)` gives 1,2,3. Common in `for i in range(...)`.",
  ),
};
const Q_PY_WHILE = {
  question: P("¿Qué bucle usas cuando no sabes de antemano cuántas vueltas dará?", "Which loop when you don't know how many turns in advance?"),
  options: [
    P("while condicion:", "while condicion:"),
    P("for de rango fijo", "a fixed-range for"),
    P("map", "map"),
    P("switch", "switch"),
  ],
  correct: 0,
  explanation: P(
    "`while cond:` repite mientras la condición sea verdadera: ideal cuando la parada depende de un estado que evoluciona. Algo dentro debe acercar la condición a False.",
    "`while cond:` repeats while the condition holds: ideal when stopping depends on evolving state. Something inside must move the condition toward False.",
  ),
};
const Q_PY_BREAK = {
  question: P("¿Qué hace `break` dentro de un bucle?", "What does `break` do inside a loop?"),
  options: [
    P("Sale del bucle por completo", "Exits the loop entirely"),
    P("Salta a la siguiente vuelta", "Jumps to the next turn"),
    P("Reinicia el bucle", "Restarts the loop"),
    P("No hace nada", "Does nothing"),
  ],
  correct: 0,
  explanation: P(
    "`break` abandona el bucle inmediatamente; `continue` en cambio sólo se salta lo que queda del cuerpo y sigue con la próxima iteración.",
    "`break` leaves the loop immediately; `continue` instead only skips the rest of the body and moves to the next iteration.",
  ),
};
const Q_PY_CONTINUE = {
  question: P("¿Qué hace `continue` dentro de un bucle?", "What does `continue` do inside a loop?"),
  options: [
    P("Salta a la SIGUIENTE iteración sin salir del bucle", "Jumps to the NEXT iteration without leaving the loop"),
    P("Sale del bucle por completo", "Exits the loop entirely"),
    P("Reinicia el bucle desde el principio", "Restarts the loop from the start"),
    P("Termina el programa", "Ends the program"),
  ],
  correct: 0,
  explanation: P(
    "`continue` se salta el resto del cuerpo y pasa a la siguiente vuelta; `break` ABANDONA el bucle. Útil para ignorar ciertos elementos sin dejar de recorrer.",
    "`continue` skips the rest of the body and moves to the next round; `break` LEAVES the loop. Handy to ignore certain elements without stopping.",
  ),
};
const Q_PY_LIST_LITERAL = {
  question: P("¿Cómo se crea una lista vacía a la que ir añadiendo elementos?", "How do you create an empty list to keep adding to?"),
  options: [
    P("r = []", "r = []"),
    P("r = {}", "r = {}"),
    P("r = list[]", "r = list[]"),
    P("r = new List()", "r = new List()"),
  ],
  correct: 0,
  explanation: P(
    "`[]` es una lista vacía; `{}` sería un DICCIONARIO (o set vacío). Se le añaden elementos con `r.append(x)`.",
    "`[]` is an empty list; `{}` would be a DICTIONARY (or empty set). You add elements with `r.append(x)`.",
  ),
};
const Q_PY_INDEX = {
  question: P("Con `xs = [10, 20, 30]`, ¿qué es `xs[1]`?", "With `xs = [10, 20, 30]`, what is `xs[1]`?"),
  options: [
    P("20 (los índices empiezan en 0)", "20 (indices start at 0)"),
    P("10 (el primero)", "10 (the first)"),
    P("30", "30"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "Las listas se indexan desde 0: `xs[0]` es 10, `xs[1]` es 20. Python además admite índices negativos: `xs[-1]` es el último (30).",
    "Lists are indexed from 0: `xs[0]` is 10, `xs[1]` is 20. Python also allows negative indices: `xs[-1]` is the last (30).",
  ),
};
const Q_PY_COMPREHENSION = {
  question: P("¿Qué devuelve `[n * 2 for n in [1, 2, 3]]`?", "What does `[n * 2 for n in [1, 2, 3]]` return?"),
  options: [
    P("[2, 4, 6]", "[2, 4, 6]"),
    P("[1, 2, 3]", "[1, 2, 3]"),
    P("6", "6"),
    P("Un error de sintaxis", "A syntax error"),
  ],
  correct: 0,
  explanation: P(
    "Es una list comprehension: construye una lista nueva aplicando `n * 2` a cada elemento. Equivale a un `for` con `append`, pero más conciso.",
    "It's a list comprehension: builds a new list applying `n * 2` to each element. Equivalent to a `for` with `append`, but more concise.",
  ),
};

/** Capítulo 2 · Control de flujo: bucles y listas. */
export const SYL_PY_COMMUNITY_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_PY_FOR, Q_PY_APPEND, Q_PY_RANGE] },
  c2_niebla: { kind: "battle", questions: [Q_PY_WHILE, Q_PY_BREAK, Q_PY_CONTINUE] },
  c2_sauce: { kind: "battle", questions: [Q_PY_LIST_LITERAL, Q_PY_INDEX, Q_PY_COMPREHENSION] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza a sus muertos. Recorre la horda y quédate sólo con los golpes que de verdad hieren: un bucle y una lista.",
      "The Barrow-wight raises its dead. Walk the horde and keep only the blows that truly harm: a loop and a list.",
    ),
    challenge: {
      topic: P("Bucles y listas", "Loops and lists"),
      instructions: P(
        "Escribe `filtrar_fuertes(danios, minimo)` que devuelva una lista NUEVA con los daños que sean MAYORES O IGUALES que `minimo`.\n\nEjemplo: `filtrar_fuertes([3, 7, 2, 9], 5)` → `[7, 9]`.",
        "Write `filtrar_fuertes(danios, minimo)` returning a NEW list with the damages GREATER THAN OR EQUAL to `minimo`.\n\nExample: `filtrar_fuertes([3, 7, 2, 9], 5)` → `[7, 9]`.",
      ),
      starter_code: "def filtrar_fuertes(danios, minimo):\n    pass\n",
      blocks: [
        "def filtrar_fuertes(danios, minimo):",
        "    r = []",
        "    for d in danios:",
        "        if d >= minimo:",
        "            r.append(d)",
        "    return r",
        "        if d < minimo:",
      ],
      hints: [
        P("Empieza con `r = []` y recórrelos: `for d in danios:`.", "Start with `r = []` and iterate: `for d in danios:`."),
        P("`if d >= minimo: r.append(d)`. O una comprehension: `[d for d in danios if d >= minimo]`.", "`if d >= minimo: r.append(d)`. Or a comprehension: `[d for d in danios if d >= minimo]`."),
      ],
      test_cases: [
        { input: "filtrar_fuertes([3, 7, 2, 9], 5)", expected: [7, 9], description: P("Sólo los fuertes", "Only the strong ones"), raw: true },
        { input: "filtrar_fuertes([1, 2], 5)", expected: [], description: P("Ninguno llega", "None reaches it"), raw: true },
        { input: "filtrar_fuertes([5, 6], 5)", expected: [5, 6], description: P("El 5 entra (>=)", "5 counts (>=)"), raw: true },
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
      topic: P("Control de flujo: bucles y listas", "Control flow: loops and lists"),
      sections: [
        {
          heading: P("for..in: recorrer una lista", "for..in: iterate a list"),
          body: P(
            "`for x in xs:` toma cada VALOR de la lista. Para acumular resultados, empieza con `[]` y usa `append`.",
            "`for x in xs:` takes each VALUE of the list. To collect results, start with `[]` and use `append`.",
          ),
          code: "r = []\nfor n in [1, 2, 3]:\n    r.append(n * 2)\n# r == [2, 4, 6]",
        },
        {
          heading: P("range y while", "range and while"),
          body: P(
            "`for i in range(n):` repite n veces (0..n-1). `while cond:` repite mientras la condición se cumpla.",
            "`for i in range(n):` repeats n times (0..n-1). `while cond:` repeats while the condition holds.",
          ),
          code: "for i in range(3):   # 0, 1, 2\n    ...\n\nvida = 100\nwhile vida > 0:\n    vida -= 30",
        },
        {
          heading: P("Listas: len, append y comprehensions", "Lists: len, append and comprehensions"),
          body: P(
            "`len(xs)` da el número de elementos. `xs.append(x)` añade al final. Una comprehension construye una lista en una línea.",
            "`len(xs)` gives the count. `xs.append(x)` appends. A comprehension builds a list in one line.",
          ),
          code: "a = ['Frodo', 'Sam']\nlen(a)            # 2\na.append('Merry')\n[n*2 for n in [1,2,3]]  # [2, 4, 6]",
        },
      ],
      keyTakeaway: P(
        "for x in xs recorre valores; while repite mientras algo sea cierto; con [] + append acumulas. len() es función, no .length.",
        "for x in xs iterates values; while repeats while something holds; with [] + append you collect. len() is a function, not .length.",
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
      topic: P("Bucle for sobre una lista", "for loop over a list"),
      instructions: P(
        "Escribe `atrapar(nombres)` que reciba una lista de nombres y devuelva una lista nueva donde cada nombre pasa a ser `'{nombre} queda atrapado'`.\n\nPor ejemplo, `atrapar(['Merry', 'Pippin'])` → `['Merry queda atrapado', 'Pippin queda atrapado']`.",
        "Write `atrapar(nombres)` that takes a list of names and returns a new list where each name becomes `'{name} queda atrapado'`.\n\nFor example, `atrapar(['Merry', 'Pippin'])` → `['Merry queda atrapado', 'Pippin queda atrapado']`.",
      ),
      starter_code: "def atrapar(nombres):\n    r = []\n    return r\n",
      blocks: [
        "def atrapar(nombres):",
        "    r = []",
        "    for n in nombres:",
        "        r.append(f'{n} queda atrapado')",
        "    return r",
        "        r.append(n)",
        "    for n in range(nombres):",
      ],
      hints: [
        P("`for n in nombres:` recorre cada nombre.", "`for n in nombres:` goes over each name."),
        P("Dentro: `r.append(f'{n} queda atrapado')`.", "Inside: `r.append(f'{n} queda atrapado')`."),
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
      topic: P("Bucle con condición (max)", "Loop with a condition (max)"),
      instructions: P(
        "Escribe `drenar_varios(vidas, frio)` que reciba una lista de vidas y un número `frio`, y devuelva una lista nueva con cada vida menos `frio`, SIN bajar de 0. Usa `max(0, ...)`.\n\nEjemplo: `drenar_varios([100, 20, 5], 30)` → `[70, 0, 0]`.",
        "Write `drenar_varios(vidas, frio)` that takes a list of lives and a number `frio`, and returns a new list with each life minus `frio`, never below 0. Use `max(0, ...)`.\n\nExample: `drenar_varios([100, 20, 5], 30)` → `[70, 0, 0]`.",
      ),
      starter_code: "def drenar_varios(vidas, frio):\n    r = []\n    return r\n",
      blocks: [
        "def drenar_varios(vidas, frio):",
        "    r = []",
        "    for v in vidas:",
        "        r.append(max(0, v - frio))",
        "    return r",
        "        r.append(v - frio)",
        "        r.append(min(0, v - frio))",
      ],
      hints: [
        P("`for v in vidas:` recorre cada vida.", "`for v in vidas:` goes over each life."),
        P("`r.append(max(0, v - frio))` nunca añade menos de 0.", "`r.append(max(0, v - frio))` never adds less than 0."),
      ],
      test_cases: [
        { input: "drenar_varios([100, 20, 5], 30)", expected: [70, 0, 0], description: P("Resta acotada a 0", "Subtraction clamped at 0"), raw: true },
        { input: "drenar_varios([50], 10)", expected: [40], description: P("Una sola vida", "A single life"), raw: true },
        { input: "drenar_varios([], 10)", expected: [], description: P("Sin vidas", "No lives"), raw: true },
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
        "Escribe `romper_hechizo(fuerza, golpe)` que devuelva cuántos versos (de valor `golpe`) hacen falta para reducir la `fuerza` del hechizo a 0 o menos.\n\nCada verso resta `golpe`. Cuenta los versos con un `while`. Si la fuerza ya es 0 o menos, hacen falta 0.",
        "Write `romper_hechizo(fuerza, golpe)` that returns how many verses (of value `golpe`) it takes to reduce the spell's `fuerza` to 0 or less.\n\nEach verse subtracts `golpe`. Count the verses with a `while`. If `fuerza` is already 0 or less, it takes 0.",
      ),
      starter_code: "def romper_hechizo(fuerza, golpe):\n    versos = 0\n    return versos\n",
      blocks: [
        "def romper_hechizo(fuerza, golpe):",
        "    versos = 0",
        "    while fuerza > 0:",
        "        fuerza -= golpe",
        "        versos += 1",
        "    return versos",
        "    while fuerza >= 0:",
        "        fuerza += golpe",
      ],
      hints: [
        P("`while fuerza > 0:` repite mientras el hechizo resista.", "`while fuerza > 0:` repeats while the spell holds."),
        P("Dentro: `fuerza -= golpe` y `versos += 1`.", "Inside: `fuerza -= golpe` and `versos += 1`."),
      ],
      test_cases: [
        { input: "romper_hechizo(35, 10)", expected: 4, description: P("35 → 25 → 15 → 5 → -5: cuatro versos", "35 → 25 → 15 → 5 → -5: four verses"), raw: true },
        { input: "romper_hechizo(30, 10)", expected: 3, description: P("Tres justos", "Exactly three"), raw: true },
        { input: "romper_hechizo(0, 10)", expected: 0, description: P("Ya estaba roto", "Already broken"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 3 · Funciones: parámetros, *args, lambda y orden superior
 * ===================================================================== */

const Q_PY_DEF = {
  question: P("¿Cómo se declara una función en Python?", "How do you declare a function in Python?"),
  options: [
    P("def suma(a, b):", "def suma(a, b):"),
    P("function suma(a, b) {", "function suma(a, b) {"),
    P("func suma(a, b) {", "func suma(a, b) {"),
    P("fn suma(a, b) ->", "fn suma(a, b) ->"),
  ],
  correct: 0,
  explanation: P(
    "`def nombre(params):` y el cuerpo indentado. `function` es de JS, `func` de Go, `fn` de Rust. El valor se devuelve con `return`.",
    "`def name(params):` with the body indented. `function` is JS, `func` is Go, `fn` is Rust. The value is returned with `return`.",
  ),
};
const Q_PY_RETURN = {
  question: P("Una función sin `return`, ¿qué devuelve?", "A function with no `return` returns what?"),
  options: [
    P("None", "None"),
    P("0", "0"),
    P("undefined", "undefined"),
    P("Una cadena vacía", "An empty string"),
  ],
  correct: 0,
  explanation: P(
    "Si una función no ejecuta ningún `return` (o hace `return` a secas), devuelve `None`. Ojo con usar su resultado esperando un valor.",
    "If a function runs no `return` (or a bare `return`), it returns `None`. Beware of using its result expecting a value.",
  ),
};
const Q_PY_DEFAULT = {
  question: P("¿Qué hace `def saluda(n, s='Hola'):`?", "What does `def saluda(n, s='Hola'):` do?"),
  options: [
    P("Da a `s` el valor 'Hola' si no se pasa argumento", "Gives `s` the value 'Hola' if no argument is passed"),
    P("Obliga a pasar siempre `s`", "Forces you to always pass `s`"),
    P("Declara `s` como constante", "Declares `s` as a constant"),
    P("Es un error de sintaxis", "It's a syntax error"),
  ],
  correct: 0,
  explanation: P(
    "Un valor por defecto se usa cuando el argumento falta. `saluda('Sam')` usa 'Hola'; `saluda('Sam', 'Ey')` usa 'Ey'. Los parámetros con defecto van al final.",
    "A default value is used when the argument is missing. `saluda('Sam')` uses 'Hola'; `saluda('Sam', 'Ey')` uses 'Ey'. Defaulted params go last.",
  ),
};
const Q_PY_ARGS = {
  question: P("¿Qué hace `*nums` en `def suma(*nums):`?", "What does `*nums` do in `def suma(*nums):`?"),
  options: [
    P("Recoge TODOS los argumentos en una tupla `nums`", "Gathers ALL arguments into a tuple `nums`"),
    P("Obliga a pasar exactamente uno", "Forces exactly one to be passed"),
    P("Es un puntero", "It's a pointer"),
    P("Multiplica los argumentos", "Multiplies the arguments"),
  ],
  correct: 0,
  explanation: P(
    "`*nums` recoge un número variable de argumentos posicionales en una tupla: `suma(1, 2, 3)` hace `nums = (1, 2, 3)`. `**kwargs` hace lo mismo con argumentos con nombre.",
    "`*nums` gathers a variable number of positional arguments into a tuple: `suma(1, 2, 3)` makes `nums = (1, 2, 3)`. `**kwargs` does the same for keyword arguments.",
  ),
};
const Q_PY_HOF = {
  question: P("¿Puede una función recibir OTRA función como argumento?", "Can a function receive ANOTHER function as an argument?"),
  options: [
    P("Sí: las funciones son objetos de primera clase", "Yes: functions are first-class objects"),
    P("No: sólo se pasan números y textos", "No: only numbers and text are passed"),
    P("Sólo con la palabra clave callback", "Only with the callback keyword"),
    P("Sólo si es una lambda", "Only if it's a lambda"),
  ],
  correct: 0,
  explanation: P(
    "En Python una función es un objeto: puedes guardarla en una variable, pasarla como argumento y devolverla. Eso permite `map`, `filter`, `sorted(key=...)`…",
    "In Python a function is an object: you can store it in a variable, pass it as an argument and return it. That enables `map`, `filter`, `sorted(key=...)`…",
  ),
};
const Q_PY_LAMBDA = {
  question: P("¿Qué es `lambda x: x * 2`?", "What is `lambda x: x * 2`?"),
  options: [
    P("Una función anónima que devuelve x * 2", "An anonymous function returning x * 2"),
    P("Un comentario", "A comment"),
    P("Una comparación", "A comparison"),
    P("Un bucle", "A loop"),
  ],
  correct: 0,
  explanation: P(
    "Una `lambda` es una función anónima de UNA expresión (la devuelve sin `return`). Útil para pasar a `map`, `sorted(key=...)`, etc. Para algo más largo, usa `def`.",
    "A `lambda` is an anonymous function of ONE expression (returned without `return`). Handy to pass to `map`, `sorted(key=...)`, etc. For anything longer, use `def`.",
  ),
};
const Q_PY_CLOSURE = {
  question: P("Una función devuelve otra función que usa una variable local de la primera. ¿Qué es?", "A function returns another function using a local variable of the first. What is it?"),
  options: [
    P("Una clausura: la interior recuerda ese estado", "A closure: the inner one remembers that state"),
    P("Una variable global", "A global variable"),
    P("Un error: la variable ya no existe", "An error: the variable no longer exists"),
    P("Un decorador", "A decorator"),
  ],
  correct: 0,
  explanation: P(
    "Una clausura captura las variables de su entorno y las mantiene vivas. Por eso `crear_multiplicador(3)` devuelve una función que recuerda `factor = 3`.",
    "A closure captures the variables of its environment and keeps them alive. That's why `crear_multiplicador(3)` returns a function that remembers `factor = 3`.",
  ),
};
const Q_PY_MAP = {
  question: P("¿Qué forma idiomática aplica `fn` a cada elemento de `xs`?", "What idiomatic form applies `fn` to each element of `xs`?"),
  options: [
    P("[fn(x) for x in xs]", "[fn(x) for x in xs]"),
    P("xs.map(fn)", "xs.map(fn)"),
    P("map fn over xs", "map fn over xs"),
    P("xs.each(fn)", "xs.each(fn)"),
  ],
  correct: 0,
  explanation: P(
    "Una comprehension `[fn(x) for x in xs]` es lo más pythónico. También existe `map(fn, xs)` (devuelve un iterador; envuélvelo en `list(...)`). `.map()` como método es de JS.",
    "A comprehension `[fn(x) for x in xs]` is most Pythonic. `map(fn, xs)` also exists (returns an iterator; wrap in `list(...)`). `.map()` as a method is JS.",
  ),
};
const Q_PY_TUPLE_RETURN = {
  question: P("¿Qué devuelve `return a, b` en una función?", "What does `return a, b` return in a function?"),
  options: [
    P("Una tupla `(a, b)` — se pueden devolver varios valores", "A tuple `(a, b)` — you can return several values"),
    P("Sólo `a`; `b` se ignora", "Only `a`; `b` is ignored"),
    P("Un error de sintaxis", "A syntax error"),
    P("La suma `a + b`", "The sum `a + b`"),
  ],
  correct: 0,
  explanation: P(
    "`return a, b` devuelve la tupla `(a, b)`. Quien llama puede desempaquetarla: `x, y = f()`. Es la forma pythónica de devolver varios valores.",
    "`return a, b` returns the tuple `(a, b)`. The caller can unpack it: `x, y = f()`. It's the Pythonic way to return several values.",
  ),
};

/** Capítulo 3 · Funciones: parámetros, *args, lambda y orden superior. */
export const SYL_PY_COMMUNITY_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_PY_DEF, Q_PY_RETURN, Q_PY_DEFAULT] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_PY_ARGS, Q_PY_HOF, Q_PY_TUPLE_RETURN] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_PY_LAMBDA, Q_PY_CLOSURE, Q_PY_MAP] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "El señor de los Nazgûl forja conjuros a medida. Escribe una FÁBRICA de funciones: una clausura que recuerda su poder.",
      "The lord of the Nazgûl forges spells to measure. Write a FACTORY of functions: a closure that remembers its power.",
    ),
    challenge: {
      topic: P("Clausuras (funciones que devuelven funciones)", "Closures (functions returning functions)"),
      instructions: P(
        "Escribe `crear_multiplicador(factor)` que devuelva una FUNCIÓN. Esa función recibe un número `x` y devuelve `x * factor`.\n\nEjemplo:\n  triple = crear_multiplicador(3)\n  triple(5)  → 15",
        "Write `crear_multiplicador(factor)` that returns a FUNCTION. That function takes a number `x` and returns `x * factor`.\n\nExample:\n  triple = crear_multiplicador(3)\n  triple(5)  → 15",
      ),
      starter_code: "def crear_multiplicador(factor):\n    pass\n",
      blocks: [
        "def crear_multiplicador(factor):",
        "    def multiplicar(x):",
        "        return x * factor",
        "    return multiplicar",
        "    return multiplicar(factor)",
      ],
      hints: [
        P("Define una función DENTRO y devuélvela (sin llamarla).", "Define a function INSIDE and return it (without calling it)."),
        P("`def multiplicar(x): return x * factor` y luego `return multiplicar`.", "`def multiplicar(x): return x * factor` then `return multiplicar`."),
      ],
      test_cases: [
        { input: "crear_multiplicador(3)(5)", expected: 15, description: P("Triple de 5", "Triple of 5"), raw: true },
        { input: "crear_multiplicador(10)(4)", expected: 40, description: P("Otro factor", "Another factor"), raw: true },
        { input: "crear_multiplicador(0)(9)", expected: 0, description: P("Factor cero", "Zero factor"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de las Funciones", "The Scroll of Functions"),
    lore_intro: P(
      "En El Poney Pisador, un montaraz encapuchado deja un pergamino: enseña a empaquetar la lógica en funciones.",
      "At The Prancing Pony, a hooded ranger leaves a scroll: it teaches how to pack logic into functions.",
    ),
    scroll: {
      topic: P("Funciones: parámetros, *args, lambda y orden superior", "Functions: parameters, *args, lambda and higher order"),
      sections: [
        {
          heading: P("def y valores por defecto", "def and default values"),
          body: P(
            "`def nombre(params):` con cuerpo indentado. Un parámetro puede tener valor por defecto (va al final).",
            "`def name(params):` with an indented body. A parameter can have a default value (goes last).",
          ),
          code: "def saluda(n, s='Hola'):\n    return f'{s}, {n}'\n\nsaluda('Sam')          # 'Hola, Sam'\nsaluda('Sam', 'Ey')    # 'Ey, Sam'",
        },
        {
          heading: P("*args y varios valores de retorno", "*args and multiple return values"),
          body: P(
            "`*args` recoge argumentos sueltos en una tupla. `return a, b` devuelve una tupla que se puede desempaquetar.",
            "`*args` gathers loose arguments into a tuple. `return a, b` returns a tuple that can be unpacked.",
          ),
          code: "def suma(*nums):\n    return sum(nums)\nsuma(1, 2, 3)   # 6\n\ndef par(a, b):\n    return a, b   # tupla",
        },
        {
          heading: P("Lambda y orden superior", "Lambda and higher order"),
          body: P(
            "Una función es un objeto: se pasa como argumento. `lambda x: x*2` es una función anónima de una expresión.",
            "A function is an object: it's passed as an argument. `lambda x: x*2` is a one-expression anonymous function.",
          ),
          code: "[fn(x) for x in xs]        # aplicar a cada uno\nsorted(xs, key=lambda p: p[1])\nmap(str.upper, ['a', 'b'])",
        },
      ],
      keyTakeaway: P(
        "def con : y cuerpo indentado; return None si no hay return. *args recoge, return a,b es tupla. Las funciones son objetos: pásalas y devuélvelas.",
        "def with : and indented body; returns None with no return. *args gathers, return a,b is a tuple. Functions are objects: pass and return them.",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("El Poney Pisador", "The Prancing Pony"),
    lore_intro: P(
      "El posadero Mantecona saluda a cada huésped. A veces con un saludo especial, a veces con el de siempre.",
      "Innkeeper Butterbur greets each guest. Sometimes with a special greeting, sometimes the usual one.",
    ),
    challenge: {
      topic: P("Parámetros con valor por defecto", "Parameters with default values"),
      instructions: P(
        "Escribe `saludar(nombre, saludo='Bienvenido')` que devuelva `'{saludo}, {nombre}'`.\n\nSi no se pasa `saludo`, usa 'Bienvenido'.\n\nEjemplos: `saludar('Frodo')` → `'Bienvenido, Frodo'`; `saludar('Sam', 'Hola')` → `'Hola, Sam'`.",
        "Write `saludar(nombre, saludo='Bienvenido')` returning `'{saludo}, {nombre}'`.\n\nIf `saludo` isn't passed, use 'Bienvenido'.\n\nExamples: `saludar('Frodo')` → `'Bienvenido, Frodo'`; `saludar('Sam', 'Hola')` → `'Hola, Sam'`.",
      ),
      starter_code: "def saludar(nombre, saludo='Bienvenido'):\n    pass\n",
      blocks: [
        "def saludar(nombre, saludo='Bienvenido'):",
        "    return f'{saludo}, {nombre}'",
        "def saludar(nombre, saludo):",
        "    return f'{nombre}, {saludo}'",
      ],
      hints: [
        P("El valor por defecto va en la firma: `saludo='Bienvenido'`.", "The default value goes in the signature: `saludo='Bienvenido'`."),
        P("Devuelve `f'{saludo}, {nombre}'`.", "Return `f'{saludo}, {nombre}'`."),
      ],
      test_cases: [
        { input: "saludar('Frodo')", expected: "Bienvenido, Frodo", description: P("Saludo por defecto", "Default greeting"), raw: true },
        { input: "saludar('Sam', 'Hola')", expected: "Hola, Sam", description: P("Saludo dado", "Given greeting"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("El Recuento de Bree", "The Tally of Bree"),
    lore_intro: P(
      "En Bree se cuentan las monedas de todos los viajeros a la vez, sean cuantos sean.",
      "In Bree they count every traveler's coins at once, however many there are.",
    ),
    challenge: {
      topic: P("*args: número variable de argumentos", "*args: variable number of arguments"),
      instructions: P(
        "Escribe `sumar_todos(*nums)` que devuelva la suma de TODOS los argumentos que reciba (cualquier cantidad). Sin argumentos, devuelve 0.\n\nEjemplo: `sumar_todos(1, 2, 3)` → `6`.",
        "Write `sumar_todos(*nums)` that returns the sum of ALL arguments it receives (any amount). With no arguments, returns 0.\n\nExample: `sumar_todos(1, 2, 3)` → `6`.",
      ),
      starter_code: "def sumar_todos(*nums):\n    pass\n",
      blocks: [
        "def sumar_todos(*nums):",
        "    return sum(nums)",
        "def sumar_todos(nums):",
        "    return sum(*nums)",
      ],
      hints: [
        P("`*nums` recoge todos los argumentos en una tupla.", "`*nums` gathers all arguments into a tuple."),
        P("`sum(nums)` suma una tupla o lista (vacía → 0).", "`sum(nums)` sums a tuple or list (empty → 0)."),
      ],
      test_cases: [
        { input: "sumar_todos(1, 2, 3)", expected: 6, description: P("Tres números", "Three numbers"), raw: true },
        { input: "sumar_todos(10)", expected: 10, description: P("Uno solo", "Just one"), raw: true },
        { input: "sumar_todos()", expected: 0, description: P("Ninguno → 0", "None → 0"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P(
      "En Amon Sûl, Trancos aplica el mismo remedio a cada herida. Aplica una función a cada elemento.",
      "At Amon Sûl, Strider applies the same remedy to each wound. Apply a function to each element.",
    ),
    challenge: {
      topic: P("Orden superior: función como argumento", "Higher order: function as an argument"),
      instructions: P(
        "Escribe `aplicar(fn, valores)` que devuelva una lista nueva con `fn` aplicada a cada elemento de `valores`.\n\nEjemplo: `aplicar(lambda x: x * 2, [1, 2, 3])` → `[2, 4, 6]`.",
        "Write `aplicar(fn, valores)` that returns a new list with `fn` applied to each element of `valores`.\n\nExample: `aplicar(lambda x: x * 2, [1, 2, 3])` → `[2, 4, 6]`.",
      ),
      starter_code: "def aplicar(fn, valores):\n    pass\n",
      blocks: [
        "def aplicar(fn, valores):",
        "    return [fn(v) for v in valores]",
        "    return [v for v in valores]",
        "    return fn(valores)",
      ],
      hints: [
        P("Una comprehension aplica `fn` a cada uno: `[fn(v) for v in valores]`.", "A comprehension applies `fn` to each: `[fn(v) for v in valores]`."),
        P("`fn` es una función: llámala con `fn(v)`.", "`fn` is a function: call it with `fn(v)`."),
      ],
      test_cases: [
        { input: "aplicar(lambda x: x * 2, [1, 2, 3])", expected: [2, 4, 6], description: P("Duplicar cada uno", "Double each"), raw: true },
        { input: "aplicar(len, ['a', 'bb', 'ccc'])", expected: [1, 2, 3], description: P("Longitud de cada texto", "Length of each string"), raw: true },
        { input: "aplicar(lambda x: x, [])", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 4 · Colecciones: listas, slicing, dicts y comprehensions
 * ===================================================================== */

const Q_PY_DICT_LITERAL = {
  question: P("¿Cómo se crea un diccionario con la clave 'anillo' → 100?", "How do you create a dictionary with key 'anillo' → 100?"),
  options: [
    P("{'anillo': 100}", "{'anillo': 100}"),
    P("['anillo' => 100]", "['anillo' => 100]"),
    P("{'anillo' -> 100}", "{'anillo' -> 100}"),
    P("dict('anillo', 100)", "dict('anillo', 100)"),
  ],
  correct: 0,
  explanation: P(
    "Un dict va entre `{ }` con pares `clave: valor`. El `=>` es de PHP. `{}` vacío es un dict; para un set vacío se usa `set()`.",
    "A dict uses `{ }` with `key: value` pairs. `=>` is PHP. Empty `{}` is a dict; for an empty set use `set()`.",
  ),
};
const Q_PY_DICT_ACCESS = {
  question: P("Con `d = {'anillo': 100}`, ¿cómo lees el valor de 'anillo'?", "With `d = {'anillo': 100}`, how do you read 'anillo'?"),
  options: [
    P("d['anillo']", "d['anillo']"),
    P("d->anillo", "d->anillo"),
    P("d.anillo", "d.anillo"),
    P("d('anillo')", "d('anillo')"),
  ],
  correct: 0,
  explanation: P(
    "Se accede con corchetes: `d['anillo']`. Si la clave no existe, lanza `KeyError`. La notación con punto (`d.anillo`) NO funciona con dicts.",
    "Access with brackets: `d['anillo']`. A missing key raises `KeyError`. Dot notation (`d.anillo`) does NOT work with dicts.",
  ),
};
const Q_PY_DICT_GET = {
  question: P("¿Qué devuelve `d.get('x', 0)` si 'x' no está en `d`?", "What does `d.get('x', 0)` return if 'x' isn't in `d`?"),
  options: [
    P("0 (el valor por defecto que le diste)", "0 (the default you gave)"),
    P("Lanza KeyError", "Raises KeyError"),
    P("None siempre", "Always None"),
    P("Una lista vacía", "An empty list"),
  ],
  correct: 0,
  explanation: P(
    "`d.get(clave, defecto)` devuelve el valor si existe, o el defecto si no (sin lanzar error). `d.get('x')` sin defecto devuelve `None`.",
    "`d.get(key, default)` returns the value if present, or the default otherwise (no error). `d.get('x')` with no default returns `None`.",
  ),
};
const Q_PY_IN = {
  question: P("¿Cómo compruebas si 'anillo' es una clave de `d`?", "How do you check if 'anillo' is a key of `d`?"),
  options: [
    P("'anillo' in d", "'anillo' in d"),
    P("d.has('anillo')", "d.has('anillo')"),
    P("d.contains('anillo')", "d.contains('anillo')"),
    P("in(d, 'anillo')", "in(d, 'anillo')"),
  ],
  correct: 0,
  explanation: P(
    "`clave in d` da `True`/`False` según exista la clave. También sirve para listas (`x in xs`) y textos (`'a' in 'casa'`).",
    "`key in d` gives `True`/`False` depending on whether the key exists. It also works on lists (`x in xs`) and strings (`'a' in 'casa'`).",
  ),
};
const Q_PY_DICT_ITEMS = {
  question: P("¿Cómo recorres clave Y valor de un dict `d`?", "How do you iterate key AND value of a dict `d`?"),
  options: [
    P("for k, v in d.items():", "for k, v in d.items():"),
    P("for (k, v) of d:", "for (k, v) of d:"),
    P("for k, v in d:", "for k, v in d:"),
    P("foreach d as k => v", "foreach d as k => v"),
  ],
  correct: 0,
  explanation: P(
    "`d.items()` da pares `(clave, valor)` que desempaquetas en `k, v`. Un `for x in d:` a secas recorre sólo las CLAVES.",
    "`d.items()` yields `(key, value)` pairs you unpack into `k, v`. A bare `for x in d:` iterates only the KEYS.",
  ),
};
const Q_PY_KEYS = {
  question: P("¿Qué devuelve `d.keys()`?", "What does `d.keys()` return?"),
  options: [
    P("Una vista con las CLAVES del dict", "A view with the dict's KEYS"),
    P("Los valores", "The values"),
    P("Los pares clave-valor", "The key-value pairs"),
    P("El número de claves", "The number of keys"),
  ],
  correct: 0,
  explanation: P(
    "`d.keys()` da las claves, `d.values()` los valores y `d.items()` los pares. Son 'vistas' que reflejan el dict; envuélvelas en `list(...)` si necesitas una lista.",
    "`d.keys()` gives keys, `d.values()` values and `d.items()` pairs. They're 'views' reflecting the dict; wrap in `list(...)` for a list.",
  ),
};
const Q_PY_SLICE = {
  question: P("Con `xs = [10, 20, 30, 40]`, ¿qué es `xs[1:3]`?", "With `xs = [10, 20, 30, 40]`, what is `xs[1:3]`?"),
  options: [
    P("[20, 30] (del índice 1 al 3 sin incluir el 3)", "[20, 30] (index 1 up to but not 3)"),
    P("[20, 30, 40]", "[20, 30, 40]"),
    P("[10, 20, 30]", "[10, 20, 30]"),
    P("[20]", "[20]"),
  ],
  correct: 0,
  explanation: P(
    "El slicing `xs[inicio:fin]` incluye `inicio` y EXCLUYE `fin`. `xs[:2]` son los dos primeros; `xs[2:]` desde el índice 2 hasta el final.",
    "Slicing `xs[start:end]` includes `start` and EXCLUDES `end`. `xs[:2]` is the first two; `xs[2:]` from index 2 to the end.",
  ),
};
const Q_PY_NEG_INDEX = {
  question: P("Con `xs = [10, 20, 30]`, ¿qué es `xs[-1]`?", "With `xs = [10, 20, 30]`, what is `xs[-1]`?"),
  options: [
    P("30 (el último elemento)", "30 (the last element)"),
    P("10 (el primero)", "10 (the first)"),
    P("Un error", "An error"),
    P("-1", "-1"),
  ],
  correct: 0,
  explanation: P(
    "Los índices negativos cuentan desde el final: `xs[-1]` es el último, `xs[-2]` el penúltimo. Muy cómodo para no escribir `xs[len(xs)-1]`.",
    "Negative indices count from the end: `xs[-1]` is the last, `xs[-2]` the second to last. Handy to avoid `xs[len(xs)-1]`.",
  ),
};
const Q_PY_DICT_COMP = {
  question: P("¿Qué construye `{n: n*n for n in [1, 2, 3]}`?", "What does `{n: n*n for n in [1, 2, 3]}` build?"),
  options: [
    P("Un dict {1: 1, 2: 4, 3: 9}", "A dict {1: 1, 2: 4, 3: 9}"),
    P("Una lista [1, 4, 9]", "A list [1, 4, 9]"),
    P("Un set {1, 4, 9}", "A set {1, 4, 9}"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "Es una dict comprehension: `{clave: valor for ...}`. Con corchetes `[...]` sería una lista; con sólo un valor `{v for ...}` sería un set.",
    "It's a dict comprehension: `{key: value for ...}`. With brackets `[...]` it'd be a list; with a single value `{v for ...}` it'd be a set.",
  ),
};
/** Capítulo 4 · Colecciones: listas, slicing, dicts y comprehensions. */
export const SYL_PY_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_PY_DICT_LITERAL, Q_PY_DICT_ACCESS, Q_PY_DICT_GET] },
  c4_lobo: { kind: "battle", questions: [Q_PY_IN, Q_PY_DICT_ITEMS, Q_PY_KEYS] },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_PY_SLICE, Q_PY_NEG_INDEX, Q_PY_DICT_COMP] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Los Nueve cargan juntos. Para saber a cuántos enfrentas de cada clase, cuéntalos en un diccionario.",
      "The Nine charge together. To know how many of each kind you face, tally them in a dictionary.",
    ),
    challenge: {
      topic: P("Diccionarios como contadores", "Dictionaries as counters"),
      instructions: P(
        "Escribe `contar(nombres)` que reciba una lista de nombres y devuelva un dict con cuántas veces aparece cada uno.\n\nEjemplo: `contar(['orco', 'orco', 'trol'])` → `{'orco': 2, 'trol': 1}`.",
        "Write `contar(nombres)` that takes a list of names and returns a dict with how many times each appears.\n\nExample: `contar(['orco', 'orco', 'trol'])` → `{'orco': 2, 'trol': 1}`.",
      ),
      starter_code: "def contar(nombres):\n    d = {}\n    return d\n",
      blocks: [
        "def contar(nombres):",
        "    d = {}",
        "    for n in nombres:",
        "        d[n] = d.get(n, 0) + 1",
        "    return d",
        "        d[n] = d.get(n, 0)",
      ],
      hints: [
        P("Recorre los nombres y usa `d.get(n, 0)` para el conteo actual.", "Iterate the names and use `d.get(n, 0)` for the current count."),
        P("`d[n] = d.get(n, 0) + 1`.", "`d[n] = d.get(n, 0) + 1`."),
      ],
      test_cases: [
        { input: "contar(['orco', 'orco', 'trol'])", expected: { orco: 2, trol: 1 }, description: P("Dos orcos, un trol", "Two orcs, one troll"), raw: true },
        { input: "contar(['nazgul'])", expected: { nazgul: 1 }, description: P("Uno solo", "Just one"), raw: true },
        { input: "contar([])", expected: {}, description: P("Sin enemigos", "No enemies"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino de las Colecciones", "The Scroll of Collections"),
    lore_intro: P(
      "Antes del Vado, Glorfindel comparte un pergamino élfico: enseña a guardar y buscar entre muchos.",
      "Before the Ford, Glorfindel shares an Elvish scroll: it teaches how to store and search among many.",
    ),
    scroll: {
      topic: P("Colecciones: listas, slicing, dicts y comprehensions", "Collections: lists, slicing, dicts and comprehensions"),
      sections: [
        {
          heading: P("Diccionarios", "Dictionaries"),
          body: P(
            "`{clave: valor}` asocia claves con valores. Lee con `d[k]` o, sin riesgo de error, `d.get(k, defecto)`. `k in d` comprueba si existe.",
            "`{key: value}` maps keys to values. Read with `d[k]` or, error-free, `d.get(k, default)`. `k in d` checks existence.",
          ),
          code: "d = {'anillo': 100}\nd['anillo']           # 100\nd.get('espada', 0)    # 0\n'anillo' in d         # True",
        },
        {
          heading: P("Recorrer y slicing", "Iterating and slicing"),
          body: P(
            "`for k, v in d.items()` recorre pares. En listas, `xs[1:3]` toma un tramo y `xs[-1]` el último.",
            "`for k, v in d.items()` iterates pairs. On lists, `xs[1:3]` takes a slice and `xs[-1]` the last.",
          ),
          code: "for k, v in d.items():\n    ...\n\nxs = [10, 20, 30, 40]\nxs[1:3]   # [20, 30]\nxs[-1]    # 40",
        },
        {
          heading: P("Comprehensions, sets y tuplas", "Comprehensions, sets and tuples"),
          body: P(
            "Comprehensions construyen listas/dicts/sets en una línea. `set(xs)` quita duplicados; una tupla `(a, b)` es inmutable.",
            "Comprehensions build lists/dicts/sets in one line. `set(xs)` drops duplicates; a tuple `(a, b)` is immutable.",
          ),
          code: "{n: n*n for n in [1,2,3]}  # {1:1, 2:4, 3:9}\nset([1, 2, 2])             # {1, 2}\npunto = (3, 4)             # inmutable",
        },
      ],
      keyTakeaway: P(
        "dict {k: v} con d.get(k, def) y k in d. Slicing xs[a:b] excluye b, xs[-1] es el último. Comprehensions y set() para construir y deduplicar.",
        "dict {k: v} with d.get(k, def) and k in d. Slicing xs[a:b] excludes b, xs[-1] is the last. Comprehensions and set() to build and dedupe.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Montura de Asfaloth", "Asfaloth's Steed"),
    lore_intro: P(
      "El corcel de Glorfindel lleva el fardo de cada viajero. Busca cuánto poder guarda cada objeto.",
      "Glorfindel's steed bears each traveler's pack. Look up how much power each item holds.",
    ),
    challenge: {
      topic: P("Acceso a dict con valor por defecto", "Dict access with a default"),
      instructions: P(
        "Escribe `buscar_poder(inventario, nombre)` que devuelva el poder del `nombre` en el dict `inventario`, o `0` si no está.\n\nEjemplo: `buscar_poder({'anillo': 100}, 'anillo')` → `100`; `buscar_poder({'anillo': 100}, 'espada')` → `0`.",
        "Write `buscar_poder(inventario, nombre)` returning the power of `nombre` in the `inventario` dict, or `0` if absent.\n\nExample: `buscar_poder({'anillo': 100}, 'anillo')` → `100`; `buscar_poder({'anillo': 100}, 'espada')` → `0`.",
      ),
      starter_code: "def buscar_poder(inventario, nombre):\n    pass\n",
      blocks: [
        "def buscar_poder(inventario, nombre):",
        "    return inventario.get(nombre, 0)",
        "    return inventario[nombre]",
        "    return inventario.get(nombre)",
      ],
      hints: [
        P("`.get(clave, defecto)` evita el KeyError si no existe.", "`.get(key, default)` avoids KeyError when absent."),
        P("El defecto es 0: `inventario.get(nombre, 0)`.", "The default is 0: `inventario.get(nombre, 0)`."),
      ],
      test_cases: [
        { input: "buscar_poder({'anillo': 100}, 'anillo')", expected: 100, description: P("Existe", "Present"), raw: true },
        { input: "buscar_poder({'anillo': 100}, 'espada')", expected: 0, description: P("No existe → 0", "Absent → 0"), raw: true },
        { input: "buscar_poder({}, 'x')", expected: 0, description: P("Inventario vacío", "Empty inventory"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Count of the Nine"),
    lore_intro: P(
      "Suma el poder de todo lo que porta la Comunidad para saber si basta ante el Vado.",
      "Add up the power of all the Fellowship carries to see if it's enough at the Ford.",
    ),
    challenge: {
      topic: P("Sumar los valores de un dict", "Summing a dict's values"),
      instructions: P(
        "Escribe `poder_total(inventario)` que devuelva la SUMA de todos los valores del dict `inventario`. Vacío → 0.\n\nEjemplo: `poder_total({'a': 10, 'b': 5})` → `15`.",
        "Write `poder_total(inventario)` returning the SUM of all values in the `inventario` dict. Empty → 0.\n\nExample: `poder_total({'a': 10, 'b': 5})` → `15`.",
      ),
      starter_code: "def poder_total(inventario):\n    pass\n",
      blocks: [
        "def poder_total(inventario):",
        "    return sum(inventario.values())",
        "    return sum(inventario.keys())",
        "    return sum(inventario)",
      ],
      hints: [
        P("`inventario.values()` da los valores del dict.", "`inventario.values()` gives the dict's values."),
        P("`sum(...)` suma un iterable (vacío → 0).", "`sum(...)` adds an iterable (empty → 0)."),
      ],
      test_cases: [
        { input: "poder_total({'a': 10, 'b': 5})", expected: 15, description: P("10 + 5", "10 + 5"), raw: true },
        { input: "poder_total({'anillo': 100})", expected: 100, description: P("Uno solo", "Just one"), raw: true },
        { input: "poder_total({})", expected: 0, description: P("Vacío → 0", "Empty → 0"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P(
      "La riada de Elrond arrasa a los primeros jinetes que cruzan. Quédate con los `n` primeros.",
      "Elrond's flood sweeps away the first riders to cross. Keep the first `n`.",
    ),
    challenge: {
      topic: P("Slicing de listas", "List slicing"),
      instructions: P(
        "Escribe `primeros(xs, n)` que devuelva los `n` PRIMEROS elementos de la lista `xs`. Si hay menos de `n`, devuélvelos todos.\n\nEjemplo: `primeros([1, 2, 3, 4, 5], 3)` → `[1, 2, 3]`.",
        "Write `primeros(xs, n)` returning the FIRST `n` elements of list `xs`. If there are fewer than `n`, return them all.\n\nExample: `primeros([1, 2, 3, 4, 5], 3)` → `[1, 2, 3]`.",
      ),
      starter_code: "def primeros(xs, n):\n    pass\n",
      blocks: [
        "def primeros(xs, n):",
        "    return xs[:n]",
        "    return xs[n:]",
        "    return xs[n]",
      ],
      hints: [
        P("`xs[:n]` toma desde el principio hasta el índice `n` (sin incluirlo).", "`xs[:n]` takes from the start up to index `n` (excluded)."),
        P("Si `n` supera la longitud, el slice devuelve la lista entera sin error.", "If `n` exceeds the length, the slice returns the whole list with no error."),
      ],
      test_cases: [
        { input: "primeros([1, 2, 3, 4, 5], 3)", expected: [1, 2, 3], description: P("Los tres primeros", "The first three"), raw: true },
        { input: "primeros([1, 2], 5)", expected: [1, 2], description: P("Menos de n: todos", "Fewer than n: all"), raw: true },
        { input: "primeros([1, 2, 3], 0)", expected: [], description: P("Ninguno", "None"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P(
      "En las piedras del Bruinen se repiten runas élficas. Cuenta cuántas son DISTINTAS con un conjunto.",
      "On the stones of the Bruinen, Elvish runes repeat. Count how many are DISTINCT with a set.",
    ),
    challenge: {
      topic: P("set: contar elementos únicos", "set: counting unique elements"),
      instructions: P(
        "Escribe `runas_unicas(runas)` que devuelva cuántas runas DISTINTAS hay en la lista `runas`. Usa un `set` para eliminar duplicados.\n\nEjemplo: `runas_unicas(['a', 'b', 'a', 'c'])` → `3`.",
        "Write `runas_unicas(runas)` returning how many DISTINCT runes are in the list `runas`. Use a `set` to remove duplicates.\n\nExample: `runas_unicas(['a', 'b', 'a', 'c'])` → `3`.",
      ),
      starter_code: "def runas_unicas(runas):\n    pass\n",
      blocks: [
        "def runas_unicas(runas):",
        "    return len(set(runas))",
        "    return len(runas)",
        "    return set(runas)",
      ],
      hints: [
        P("`set(runas)` deja sólo las runas distintas.", "`set(runas)` keeps only the distinct runes."),
        P("`len(...)` cuenta cuántas quedan.", "`len(...)` counts how many remain."),
      ],
      test_cases: [
        { input: "runas_unicas(['a', 'b', 'a', 'c'])", expected: 3, description: P("Tres distintas", "Three distinct"), raw: true },
        { input: "runas_unicas(['x', 'x'])", expected: 1, description: P("Todas iguales", "All the same"), raw: true },
        { input: "runas_unicas([])", expected: 0, description: P("Ninguna", "None"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 5 · Clases: __init__, self, atributos y métodos
 * ===================================================================== */

const Q_PY_CLASS = {
  question: P("¿Cómo se declara una clase en Python?", "How do you declare a class in Python?"),
  options: [
    P("class Heroe:", "class Heroe:"),
    P("class Heroe {", "class Heroe {"),
    P("def class Heroe:", "def class Heroe:"),
    P("struct Heroe:", "struct Heroe:"),
  ],
  correct: 0,
  explanation: P(
    "`class Nombre:` y el cuerpo indentado (sin llaves). Por convención, los nombres de clase van en CamelCase (Heroe, MiembroComunidad).",
    "`class Name:` with an indented body (no braces). By convention, class names use CamelCase (Heroe, MiembroComunidad).",
  ),
};
const Q_PY_INIT = {
  question: P("¿Qué método hace de CONSTRUCTOR en una clase?", "Which method acts as the CONSTRUCTOR in a class?"),
  options: [
    P("__init__", "__init__"),
    P("constructor", "constructor"),
    P("__new__ siempre", "__new__ always"),
    P("init (sin guiones)", "init (no underscores)"),
  ],
  correct: 0,
  explanation: P(
    "`__init__(self, ...)` se ejecuta al crear la instancia y suele fijar los atributos. `constructor` es de JS; en Python el nombre lleva doble guion bajo a cada lado.",
    "`__init__(self, ...)` runs when the instance is created and usually sets the attributes. `constructor` is JS; in Python the name has a double underscore on each side.",
  ),
};
const Q_PY_SELF = {
  question: P("¿Qué es `self` en un método?", "What is `self` in a method?"),
  options: [
    P("La propia instancia sobre la que se llama el método", "The instance the method is called on"),
    P("La clase entera", "The whole class"),
    P("Una palabra clave opcional", "An optional keyword"),
    P("Un módulo global", "A global module"),
  ],
  correct: 0,
  explanation: P(
    "`self` es la instancia actual: a través de él se leen y fijan atributos (`self.vida`). Es el PRIMER parámetro de cada método (no se pasa al llamar).",
    "`self` is the current instance: through it you read and set attributes (`self.vida`). It's the FIRST parameter of every method (you don't pass it when calling).",
  ),
};
const Q_PY_INSTANCE = {
  question: P("¿Cómo creas una instancia de la clase `Heroe`?", "How do you create an instance of class `Heroe`?"),
  options: [
    P("h = Heroe('Frodo')", "h = Heroe('Frodo')"),
    P("h = new Heroe('Frodo')", "h = new Heroe('Frodo')"),
    P("h = Heroe.new('Frodo')", "h = Heroe.new('Frodo')"),
    P("h = create Heroe('Frodo')", "h = create Heroe('Frodo')"),
  ],
  correct: 0,
  explanation: P(
    "Se llama a la clase como si fuera una función: `Heroe('Frodo')`. En Python NO existe `new` (eso es JS/Java): la llamada dispara `__init__`.",
    "You call the class like a function: `Heroe('Frodo')`. Python has NO `new` (that's JS/Java): the call triggers `__init__`.",
  ),
};
const Q_PY_ATTR = {
  question: P("Dentro de `__init__`, ¿cómo guardas el nombre recibido como atributo?", "Inside `__init__`, how do you store the received name as an attribute?"),
  options: [
    P("self.nombre = nombre", "self.nombre = nombre"),
    P("this.nombre = nombre", "this.nombre = nombre"),
    P("nombre = nombre", "nombre = nombre"),
    P("attr nombre = nombre", "attr nombre = nombre"),
  ],
  correct: 0,
  explanation: P(
    "`self.nombre = nombre` crea/actualiza el atributo en la instancia. `this` es de JS/Java. Sin `self.`, sólo sería una variable local que se pierde.",
    "`self.nombre = nombre` creates/updates the attribute on the instance. `this` is JS/Java. Without `self.`, it'd be a local variable that's lost.",
  ),
};
const Q_PY_METHOD = {
  question: P("¿Cuál es el primer parámetro de un método de instancia?", "What is the first parameter of an instance method?"),
  options: [
    P("self", "self"),
    P("this", "this"),
    P("cls", "cls"),
    P("Ninguno", "None"),
  ],
  correct: 0,
  explanation: P(
    "Por convención `self`. Python lo pasa automáticamente al llamar `h.metodo()`. `cls` es el primer parámetro de los métodos de CLASE (`@classmethod`), no de instancia.",
    "By convention `self`. Python passes it automatically when calling `h.metodo()`. `cls` is the first parameter of CLASS methods (`@classmethod`), not instance ones.",
  ),
};
const Q_PY_STR = {
  question: P("¿Qué método define cómo se muestra un objeto con `print()`?", "Which method defines how an object shows with `print()`?"),
  options: [
    P("__str__", "__str__"),
    P("toString", "toString"),
    P("__print__", "__print__"),
    P("show", "show"),
  ],
  correct: 0,
  explanation: P(
    "`__str__(self)` devuelve el texto 'amable' que usan `print()` y `str()`. `toString` es de JS/Java. `__repr__` es la versión técnica para depurar.",
    "`__str__(self)` returns the 'friendly' text used by `print()` and `str()`. `toString` is JS/Java. `__repr__` is the technical debug version.",
  ),
};
const Q_PY_READ_ATTR = {
  question: P("Con `h = Heroe('Frodo')`, ¿cómo lees su atributo `nombre`?", "With `h = Heroe('Frodo')`, how do you read its `nombre` attribute?"),
  options: [
    P("h.nombre", "h.nombre"),
    P("h['nombre']", "h['nombre']"),
    P("h->nombre", "h->nombre"),
    P("h::nombre", "h::nombre"),
  ],
  correct: 0,
  explanation: P(
    "Los atributos se leen con punto: `h.nombre`. Los corchetes `h['nombre']` son para dicts/listas; `->` es de PHP y `::` para elementos de clase.",
    "Attributes are read with a dot: `h.nombre`. Brackets `h['nombre']` are for dicts/lists; `->` is PHP and `::` for class members.",
  ),
};
const Q_PY_CLASS_ATTR = {
  question: P("Un atributo definido en el cuerpo de la clase (fuera de `__init__`) es…", "An attribute defined in the class body (outside `__init__`) is…"),
  options: [
    P("Un atributo de CLASE: compartido por todas las instancias", "A CLASS attribute: shared by all instances"),
    P("Un atributo de instancia distinto por objeto", "A per-object instance attribute"),
    P("Un error de sintaxis", "A syntax error"),
    P("Una variable global", "A global variable"),
  ],
  correct: 0,
  explanation: P(
    "Lo que se declara en el cuerpo de la clase pertenece a la CLASE y lo comparten todas las instancias. Lo que se fija con `self.x` en `__init__` es propio de cada objeto.",
    "What's declared in the class body belongs to the CLASS and is shared by all instances. What's set with `self.x` in `__init__` is per-object.",
  ),
};

/** Capítulo 5 · Clases: __init__, self, atributos y métodos. */
export const SYL_PY_COMMUNITY_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_PY_CLASS, Q_PY_INIT, Q_PY_SELF] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_PY_INSTANCE, Q_PY_ATTR, Q_PY_METHOD] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_PY_READ_ATTR, Q_PY_STR, Q_PY_CLASS_ATTR] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P(
      "La montaña sepulta el paso bajo la nieve. Modela a Caradhras como una CLASE con estado: avanza mientras quede nieve.",
      "The mountain buries the pass under snow. Model Caradhras as a CLASS with state: advance while snow remains.",
    ),
    challenge: {
      topic: P("Clase con estado y métodos", "Class with state and methods"),
      instructions: P(
        "Escribe la clase `Caradhras`:\n• `__init__(self, nieve)` guarda `self.nieve`.\n• `avanzar(self, fuerza)` resta `fuerza` a la nieve SIN bajar de 0 y DEVUELVE la nieve restante.\n• `paso_libre(self)` devuelve True si la nieve es 0.",
        "Write the class `Caradhras`:\n• `__init__(self, nieve)` stores `self.nieve`.\n• `avanzar(self, fuerza)` subtracts `fuerza` from the snow, never below 0, and RETURNS the remaining snow.\n• `paso_libre(self)` returns True if snow is 0.",
      ),
      starter_code: "class Caradhras:\n    def __init__(self, nieve):\n        pass\n\n    def avanzar(self, fuerza):\n        pass\n\n    def paso_libre(self):\n        pass\n",
      sut: "Caradhras(100)",
      blocks: [
        "class Caradhras:",
        "    def __init__(self, nieve):",
        "        self.nieve = nieve",
        "    def avanzar(self, fuerza):",
        "        self.nieve = max(0, self.nieve - fuerza)",
        "        return self.nieve",
        "    def paso_libre(self):",
        "        return self.nieve == 0",
        "        self.nieve = self.nieve - fuerza",
      ],
      hints: [
        P("En `__init__`: `self.nieve = nieve`.", "In `__init__`: `self.nieve = nieve`."),
        P("`self.nieve = max(0, self.nieve - fuerza)` y luego `return self.nieve`.", "`self.nieve = max(0, self.nieve - fuerza)` then `return self.nieve`."),
      ],
      test_cases: [
        { input: "avanzar(40)", expected: 60, description: P("100 - 40 = 60", "100 - 40 = 60"), raw: false },
        { input: "avanzar(70)", expected: 0, description: P("No baja de 0", "Never below 0"), raw: false },
        { input: "paso_libre()", expected: true, description: P("Nieve agotada: paso libre", "Snow gone: pass clear"), raw: false },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino de las Clases", "The Scroll of Classes"),
    lore_intro: P(
      "Bajo la ventisca, Gandalf traza runas de hielo: enseña a moldear objetos con estado y comportamiento.",
      "Under the blizzard, Gandalf traces ice-runes: they teach how to shape objects with state and behavior.",
    ),
    scroll: {
      topic: P("Clases: __init__, self, atributos y métodos", "Classes: __init__, self, attributes and methods"),
      sections: [
        {
          heading: P("Definir una clase", "Defining a class"),
          body: P(
            "`class Nombre:` agrupa datos (atributos) y comportamiento (métodos). Se crea una instancia llamando a la clase, sin `new`.",
            "`class Name:` groups data (attributes) and behavior (methods). You create an instance by calling the class, no `new`.",
          ),
          code: "class Heroe:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nh = Heroe('Frodo')   # sin new",
        },
        {
          heading: P("__init__ y self", "__init__ and self"),
          body: P(
            "`__init__` es el constructor y fija los atributos con `self.x = ...`. `self` es la instancia y es el primer parámetro de cada método.",
            "`__init__` is the constructor and sets attributes with `self.x = ...`. `self` is the instance and the first parameter of every method.",
          ),
          code: "class Miembro:\n    def __init__(self, nombre, vida):\n        self.nombre = nombre\n        self.vida = vida",
        },
        {
          heading: P("Métodos y estado", "Methods and state"),
          body: P(
            "Un método opera sobre `self`: lee y modifica atributos. Así el objeto guarda estado entre llamadas. `__str__` define su texto.",
            "A method operates on `self`: reads and modifies attributes. That's how the object keeps state between calls. `__str__` defines its text.",
          ),
          code: "    def herir(self, n):\n        self.vida = max(0, self.vida - n)\n    def esta_vivo(self):\n        return self.vida > 0",
        },
      ],
      keyTakeaway: P(
        "class Nombre: con __init__(self, ...) fija atributos self.x. Los métodos llevan self primero y operan sobre el estado del objeto. Instancias sin new.",
        "class Name: with __init__(self, ...) sets self.x attributes. Methods take self first and operate on the object's state. Instances need no new.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Poney", "Bill the Pony's Load"),
    lore_intro: P(
      "Bill el Poney carga los bártulos de la Comunidad. Descríbelo con una clase sencilla.",
      "Bill the Pony carries the Fellowship's gear. Describe him with a simple class.",
    ),
    challenge: {
      topic: P("Clase con atributos y un método", "Class with attributes and a method"),
      instructions: P(
        "Escribe la clase `Poney`:\n• `__init__(self, nombre, carga)` guarda ambos como atributos.\n• `describir(self)` devuelve `'{nombre} lleva {carga} kg'`.\n\nEjemplo: `Poney('Bill', 50).describir()` → `'Bill lleva 50 kg'`.",
        "Write the class `Poney`:\n• `__init__(self, nombre, carga)` stores both as attributes.\n• `describir(self)` returns `'{nombre} lleva {carga} kg'`.\n\nExample: `Poney('Bill', 50).describir()` → `'Bill lleva 50 kg'`.",
      ),
      starter_code: "class Poney:\n    def __init__(self, nombre, carga):\n        pass\n\n    def describir(self):\n        pass\n",
      blocks: [
        "class Poney:",
        "    def __init__(self, nombre, carga):",
        "        self.nombre = nombre",
        "        self.carga = carga",
        "    def describir(self):",
        "        return f'{self.nombre} lleva {self.carga} kg'",
        "        nombre = nombre",
        "        return f'{nombre} lleva {carga} kg'",
      ],
      hints: [
        P("Guarda con `self.nombre = nombre` y `self.carga = carga`.", "Store with `self.nombre = nombre` and `self.carga = carga`."),
        P("`describir` usa los atributos: `f'{self.nombre} lleva {self.carga} kg'`.", "`describir` uses the attributes: `f'{self.nombre} lleva {self.carga} kg'`."),
      ],
      test_cases: [
        { input: "Poney('Bill', 50).describir()", expected: "Bill lleva 50 kg", description: P("Descripción completa", "Full description"), raw: true },
        { input: "Poney('Sam', 0).describir()", expected: "Sam lleva 0 kg", description: P("Sin carga", "No load"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Endurance"),
    lore_intro: P(
      "Cada miembro aguanta el frío hasta que su vida se agota. Modela a uno con estado que cambia.",
      "Each member endures the cold until their life runs out. Model one with changing state.",
    ),
    challenge: {
      topic: P("Método que modifica el estado", "Method that mutates state"),
      instructions: P(
        "Escribe la clase `Miembro`:\n• `__init__(self, nombre, vida)` guarda ambos.\n• `herir(self, n)` resta `n` a la vida SIN bajar de 0.\n• `esta_vivo(self)` devuelve True si la vida es mayor que 0.",
        "Write the class `Miembro`:\n• `__init__(self, nombre, vida)` stores both.\n• `herir(self, n)` subtracts `n` from life, never below 0.\n• `esta_vivo(self)` returns True if life is greater than 0.",
      ),
      starter_code: "class Miembro:\n    def __init__(self, nombre, vida):\n        pass\n\n    def herir(self, n):\n        pass\n\n    def esta_vivo(self):\n        pass\n",
      sut: "Miembro('Sam', 100)",
      blocks: [
        "class Miembro:",
        "    def __init__(self, nombre, vida):",
        "        self.nombre = nombre",
        "        self.vida = vida",
        "    def herir(self, n):",
        "        self.vida = max(0, self.vida - n)",
        "    def esta_vivo(self):",
        "        return self.vida > 0",
        "        self.vida = self.vida - n",
      ],
      hints: [
        P("`self.vida = max(0, self.vida - n)` evita bajar de 0.", "`self.vida = max(0, self.vida - n)` avoids going below 0."),
        P("`esta_vivo` devuelve `self.vida > 0`.", "`esta_vivo` returns `self.vida > 0`."),
      ],
      test_cases: [
        { input: "herir(30)", expected: null, description: P("Recibe daño (vida 70)", "Takes damage (life 70)"), raw: false },
        { input: "esta_vivo()", expected: true, description: P("Aún en pie", "Still standing"), raw: false },
        { input: "herir(80)", expected: null, description: P("Golpe mortal (vida 0)", "Fatal blow (life 0)"), raw: false },
        { input: "esta_vivo()", expected: false, description: P("Ha caído", "Fallen"), raw: false },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("La Temperatura de la Montaña", "The Mountain's Temperature"),
    lore_intro: P(
      "La nieve se acumula copo a copo y el frío baja. Lleva la cuenta con un objeto acumulador.",
      "Snow piles up flake by flake and the cold drops. Keep the tally with an accumulator object.",
    ),
    challenge: {
      topic: P("Objeto acumulador", "Accumulator object"),
      instructions: P(
        "Escribe la clase `Montana`:\n• `__init__(self)` empieza con `self.frio = 0`.\n• `nevar(self, n)` SUMA `n` al frío.\n• `temperatura(self)` devuelve el frío en NEGATIVO (`-self.frio`).\n\nEjemplo: tras `nevar(10)` y `nevar(5)`, `temperatura()` → `-15`.",
        "Write the class `Montana`:\n• `__init__(self)` starts with `self.frio = 0`.\n• `nevar(self, n)` ADDS `n` to the cold.\n• `temperatura(self)` returns the cold NEGATED (`-self.frio`).\n\nExample: after `nevar(10)` and `nevar(5)`, `temperatura()` → `-15`.",
      ),
      starter_code: "class Montana:\n    def __init__(self):\n        pass\n\n    def nevar(self, n):\n        pass\n\n    def temperatura(self):\n        pass\n",
      sut: "Montana()",
      blocks: [
        "class Montana:",
        "    def __init__(self):",
        "        self.frio = 0",
        "    def nevar(self, n):",
        "        self.frio += n",
        "    def temperatura(self):",
        "        return -self.frio",
        "        return self.frio",
      ],
      hints: [
        P("Arranca el estado en `__init__`: `self.frio = 0`.", "Start the state in `__init__`: `self.frio = 0`."),
        P("`nevar` acumula: `self.frio += n`. `temperatura` devuelve `-self.frio`.", "`nevar` accumulates: `self.frio += n`. `temperatura` returns `-self.frio`."),
      ],
      test_cases: [
        { input: "nevar(10)", expected: null, description: P("Nieva 10", "Snows 10"), raw: false },
        { input: "nevar(5)", expected: null, description: P("Nieva 5 más", "Snows 5 more"), raw: false },
        { input: "temperatura()", expected: -15, description: P("Frío acumulado en negativo", "Accumulated cold, negated"), raw: false },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 6 · Herencia y polimorfismo: super(), override, duck typing
 * ===================================================================== */

const Q_PY_INHERIT = {
  question: P("¿Cómo declaras que `Trasgo` hereda de `Enemigo`?", "How do you declare that `Trasgo` inherits from `Enemigo`?"),
  options: [
    P("class Trasgo(Enemigo):", "class Trasgo(Enemigo):"),
    P("class Trasgo extends Enemigo:", "class Trasgo extends Enemigo:"),
    P("class Trasgo : Enemigo", "class Trasgo : Enemigo"),
    P("class Trasgo inherits Enemigo:", "class Trasgo inherits Enemigo:"),
  ],
  correct: 0,
  explanation: P(
    "La clase base va entre paréntesis: `class Trasgo(Enemigo):`. `extends` es de JS/Java. `Trasgo` hereda atributos y métodos de `Enemigo`.",
    "The base class goes in parentheses: `class Trasgo(Enemigo):`. `extends` is JS/Java. `Trasgo` inherits attributes and methods from `Enemigo`.",
  ),
};
const Q_PY_SUPER = {
  question: P("¿Cómo llamas al `__init__` de la clase padre?", "How do you call the parent's `__init__`?"),
  options: [
    P("super().__init__(...)", "super().__init__(...)"),
    P("parent.__init__(...)", "parent.__init__(...)"),
    P("Enemigo.init(...)", "Enemigo.init(...)"),
    P("this.super(...)", "this.super(...)"),
  ],
  correct: 0,
  explanation: P(
    "`super().__init__(...)` invoca el constructor del padre para reutilizar su inicialización antes de añadir lo propio de la subclase.",
    "`super().__init__(...)` invokes the parent's constructor to reuse its initialization before adding the subclass's own.",
  ),
};
const Q_PY_OVERRIDE = {
  question: P("Si la subclase define un método con el MISMO nombre que el padre…", "If the subclass defines a method with the SAME name as the parent…"),
  options: [
    P("Lo SOBREESCRIBE: se usa la versión de la subclase", "It OVERRIDES it: the subclass version is used"),
    P("Da un error de nombre duplicado", "It raises a duplicate-name error"),
    P("Se ejecutan los dos", "Both run"),
    P("Se ignora el de la subclase", "The subclass one is ignored"),
  ],
  correct: 0,
  explanation: P(
    "La subclase SOBREESCRIBE (override) el método: al llamarlo sobre una instancia de la subclase, se usa su versión. Puede reutilizar la del padre con `super().metodo()`.",
    "The subclass OVERRIDES the method: calling it on a subclass instance uses its version. It can reuse the parent's with `super().metodo()`.",
  ),
};
const Q_PY_POLYMORPHISM = {
  question: P("Varias clases con un método `atacar()` distinto y las recorres llamando `e.atacar()`. ¿Qué es?", "Several classes with a different `atacar()` method, iterated calling `e.atacar()`. What is it?"),
  options: [
    P("Polimorfismo: cada objeto responde a su manera", "Polymorphism: each object responds its own way"),
    P("Sobrecarga de operadores", "Operator overloading"),
    P("Un error de tipos", "A type error"),
    P("Recursión", "Recursion"),
  ],
  correct: 0,
  explanation: P(
    "El polimorfismo permite tratar objetos distintos por una interfaz común (`atacar()`) y que cada uno aporte su comportamiento. El bucle no necesita saber la clase concreta.",
    "Polymorphism lets you treat different objects through a common interface (`atacar()`), each contributing its behavior. The loop needn't know the concrete class.",
  ),
};
const Q_PY_DUCK = {
  question: P("¿Qué es el 'duck typing' en Python?", "What is 'duck typing' in Python?"),
  options: [
    P("Si tiene el método que necesito, sirve — sin importar su clase", "If it has the method I need, it works — regardless of its class"),
    P("Un tipo de dato para aves", "A data type for birds"),
    P("Obligar a heredar de una interfaz", "Forcing inheritance from an interface"),
    P("Comparar tipos con ==", "Comparing types with =="),
  ],
  correct: 0,
  explanation: P(
    "'Si camina como un pato y hace cuac, es un pato': a Python le basta con que el objeto tenga el método/atributo usado, sin exigir una clase concreta ni herencia.",
    "'If it walks like a duck and quacks, it's a duck': Python only needs the object to have the used method/attribute, without requiring a concrete class or inheritance.",
  ),
};
const Q_PY_SUPER_METHOD = {
  question: P("Dentro de un método sobreescrito, ¿cómo reutilizas la versión del padre?", "Inside an overridden method, how do you reuse the parent's version?"),
  options: [
    P("super().metodo(...)", "super().metodo(...)"),
    P("self.metodo(...)", "self.metodo(...)"),
    P("parent().metodo(...)", "parent().metodo(...)"),
    P("base.metodo(...)", "base.metodo(...)"),
  ],
  correct: 0,
  explanation: P(
    "`super().metodo(...)` ejecuta la versión del padre. `self.metodo(...)` volvería a llamar a la de la subclase (recursión infinita si es el mismo método).",
    "`super().metodo(...)` runs the parent's version. `self.metodo(...)` would call the subclass's again (infinite recursion if it's the same method).",
  ),
};
const Q_PY_INHERIT_ATTR = {
  question: P("Una subclase que NO redefine un método del padre…", "A subclass that does NOT redefine a parent method…"),
  options: [
    P("Lo hereda tal cual y puede usarlo", "Inherits it as-is and can use it"),
    P("No puede usarlo", "Cannot use it"),
    P("Debe copiarlo a mano", "Must copy it by hand"),
    P("Da error al instanciar", "Errors on instantiation"),
  ],
  correct: 0,
  explanation: P(
    "La herencia da acceso automático a los métodos y atributos del padre que la subclase no redefina. Sólo sobreescribes lo que quieras cambiar.",
    "Inheritance grants automatic access to the parent's methods and attributes the subclass doesn't redefine. You only override what you want to change.",
  ),
};
const Q_PY_OVERRIDE_STR = {
  question: P("Una subclase quiere su propio texto en `print()`. ¿Qué redefine?", "A subclass wants its own text in `print()`. What does it redefine?"),
  options: [
    P("__str__", "__str__"),
    P("__init__", "__init__"),
    P("__super__", "__super__"),
    P("print", "print"),
  ],
  correct: 0,
  explanation: P(
    "Redefinir `__str__` es un caso típico de override: cada clase da su representación amable. `print(obj)` usará la de la clase concreta del objeto.",
    "Redefining `__str__` is a typical override case: each class gives its friendly representation. `print(obj)` uses that of the object's concrete class.",
  ),
};
const Q_PY_TYPE_VS_ISINSTANCE = {
  question: P("¿Por qué se prefiere `isinstance(x, A)` a `type(x) == A`?", "Why is `isinstance(x, A)` preferred over `type(x) == A`?"),
  options: [
    P("isinstance también acepta subclases; == exige la clase exacta", "isinstance also accepts subclasses; == demands the exact class"),
    P("Son idénticos", "They're identical"),
    P("type(x) es más rápido siempre", "type(x) is always faster"),
    P("isinstance no existe", "isinstance doesn't exist"),
  ],
  correct: 0,
  explanation: P(
    "`isinstance` respeta la herencia: un `Trasgo` cuenta como `Enemigo`. `type(x) == Enemigo` sería False para las subclases, rompiendo el polimorfismo.",
    "`isinstance` respects inheritance: a `Trasgo` counts as `Enemigo`. `type(x) == Enemigo` would be False for subclasses, breaking polymorphism.",
  ),
};

/** Capítulo 6 · Herencia y polimorfismo. */
export const SYL_PY_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_PY_INHERIT, Q_PY_SUPER, Q_PY_OVERRIDE] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_PY_INHERIT_ATTR, Q_PY_SUPER_METHOD, Q_PY_OVERRIDE_STR] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_PY_POLYMORPHISM, Q_PY_DUCK, Q_PY_TYPE_VS_ISINSTANCE] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P(
      "La Perdición de Durin es un enemigo como ningún otro: hereda su poder y le suma el fuego. Extiende la clase base con `super()`.",
      "Durin's Bane is an enemy like no other: it inherits its power and adds fire. Extend the base class with `super()`.",
    ),
    challenge: {
      topic: P("Herencia con super() y override", "Inheritance with super() and override"),
      instructions: P(
        "Ya existe la clase base `Enemigo` (con `__init__(self, nombre, vida)` y `poder(self)` que devuelve `self.vida`).\n\nEscribe `Balrog(Enemigo)`:\n• `__init__(self, nombre, vida, fuego)` llama a `super().__init__(nombre, vida)` y guarda `self.fuego`.\n• `poder(self)` devuelve `super().poder() + self.fuego`.",
        "The base class `Enemigo` already exists (with `__init__(self, nombre, vida)` and `poder(self)` returning `self.vida`).\n\nWrite `Balrog(Enemigo)`:\n• `__init__(self, nombre, vida, fuego)` calls `super().__init__(nombre, vida)` and stores `self.fuego`.\n• `poder(self)` returns `super().poder() + self.fuego`.",
      ),
      support_code: "class Enemigo:\n    def __init__(self, nombre, vida):\n        self.nombre = nombre\n        self.vida = vida\n    def poder(self):\n        return self.vida\n",
      starter_code: "class Balrog(Enemigo):\n    def __init__(self, nombre, vida, fuego):\n        pass\n\n    def poder(self):\n        pass\n",
      blocks: [
        "class Balrog(Enemigo):",
        "    def __init__(self, nombre, vida, fuego):",
        "        super().__init__(nombre, vida)",
        "        self.fuego = fuego",
        "    def poder(self):",
        "        return super().poder() + self.fuego",
        "        return self.fuego",
      ],
      hints: [
        P("Reutiliza el constructor del padre: `super().__init__(nombre, vida)`.", "Reuse the parent constructor: `super().__init__(nombre, vida)`."),
        P("En `poder`: `return super().poder() + self.fuego`.", "In `poder`: `return super().poder() + self.fuego`."),
      ],
      test_cases: [
        { input: "Balrog('Perdición de Durin', 100, 50).poder()", expected: 150, description: P("Vida + fuego", "Life + fire"), raw: true },
        { input: "Balrog('Perdición de Durin', 100, 50).nombre", expected: "Perdición de Durin", description: P("Nombre vía super()", "Name via super()"), raw: true },
        { input: "Balrog('B', 80, 0).poder()", expected: 80, description: P("Sin fuego, sólo vida", "No fire, just life"), raw: true },
        { input: "isinstance(Balrog('B', 1, 1), Enemigo)", expected: true, description: P("Un Balrog ES un Enemigo", "A Balrog IS an Enemy"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de la Herencia", "The Scroll of Inheritance"),
    lore_intro: P(
      "En las profundidades de Moria, las tumbas de los enanos guardan un pergamino: enseña cómo unas clases descienden de otras.",
      "Deep in Moria, the dwarven tombs hold a scroll: it teaches how some classes descend from others.",
    ),
    scroll: {
      topic: P("Herencia y polimorfismo", "Inheritance and polymorphism"),
      sections: [
        {
          heading: P("Heredar de una clase base", "Inheriting from a base class"),
          body: P(
            "`class Hija(Padre):` hereda atributos y métodos. La subclase puede añadir cosas o SOBREESCRIBIR métodos del padre.",
            "`class Child(Parent):` inherits attributes and methods. The subclass can add things or OVERRIDE the parent's methods.",
          ),
          code: "class Enemigo:\n    def grito(self):\n        return '...'\nclass Trasgo(Enemigo):\n    def grito(self):\n        return 'chilla'",
        },
        {
          heading: P("super(): reutilizar al padre", "super(): reuse the parent"),
          body: P(
            "`super().__init__(...)` llama al constructor del padre; `super().metodo()` reutiliza su comportamiento antes o después de ampliarlo.",
            "`super().__init__(...)` calls the parent constructor; `super().metodo()` reuses its behavior before or after extending it.",
          ),
          code: "class Trol(Enemigo):\n    def __init__(self, vida, armadura):\n        super().__init__(vida)\n        self.armadura = armadura",
        },
        {
          heading: P("Polimorfismo y duck typing", "Polymorphism and duck typing"),
          body: P(
            "Objetos distintos con el mismo método se tratan igual. `isinstance(x, Enemigo)` respeta la herencia. Duck typing: si tiene el método, sirve.",
            "Different objects with the same method are treated alike. `isinstance(x, Enemigo)` respects inheritance. Duck typing: if it has the method, it works.",
          ),
          code: "def dano_total(es):\n    return sum(e.atacar() for e in es)\nisinstance(Trasgo(), Enemigo)  # True",
        },
      ],
      keyTakeaway: P(
        "class Hija(Padre) hereda; super() reutiliza al padre; sobreescribir cambia un método. Polimorfismo y duck typing: distintos objetos, misma interfaz.",
        "class Child(Parent) inherits; super() reuses the parent; overriding changes a method. Polymorphism and duck typing: different objects, same interface.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P(
      "Ante las puertas élficas, un trasgo hereda el porte de todo enemigo pero grita a su manera. Sobreescribe un método.",
      "Before the Elven doors, a goblin inherits every enemy's bearing but shrieks its own way. Override a method.",
    ),
    challenge: {
      topic: P("Heredar y sobreescribir un método", "Inheriting and overriding a method"),
      instructions: P(
        "Ya existe la clase base `Enemigo` con `acercarse()` (devuelve 'un enemigo se acerca') y `grito()`.\n\nEscribe `Trasgo(Enemigo)` que SOBREESCRIBA `grito(self)` para devolver `'un trasgo chilla'`, heredando `acercarse` sin tocarlo.",
        "The base class `Enemigo` exists with `acercarse()` (returns 'un enemigo se acerca') and `grito()`.\n\nWrite `Trasgo(Enemigo)` that OVERRIDES `grito(self)` to return `'un trasgo chilla'`, inheriting `acercarse` untouched.",
      ),
      support_code: "class Enemigo:\n    def acercarse(self):\n        return 'un enemigo se acerca'\n    def grito(self):\n        return '...'\n",
      starter_code: "class Trasgo(Enemigo):\n    def grito(self):\n        pass\n",
      blocks: [
        "class Trasgo(Enemigo):",
        "    def grito(self):",
        "        return 'un trasgo chilla'",
        "class Trasgo:",
        "    def acercarse(self):",
        "        return 'un trasgo chilla'",
      ],
      hints: [
        P("Hereda con `class Trasgo(Enemigo):`.", "Inherit with `class Trasgo(Enemigo):`."),
        P("Sólo redefines `grito`; `acercarse` se hereda solo.", "You only redefine `grito`; `acercarse` is inherited automatically."),
      ],
      test_cases: [
        { input: "Trasgo().grito()", expected: "un trasgo chilla", description: P("Método sobreescrito", "Overridden method"), raw: true },
        { input: "Trasgo().acercarse()", expected: "un enemigo se acerca", description: P("Método heredado", "Inherited method"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P(
      "Un trol de las cavernas irrumpe: tiene la vida de todo enemigo y, además, armadura. Amplía al padre con `super()`.",
      "A cave troll bursts in: it has every enemy's life and, on top, armor. Extend the parent with `super()`.",
    ),
    challenge: {
      topic: P("super().__init__ y atributos propios", "super().__init__ and own attributes"),
      instructions: P(
        "Ya existe `Enemigo` con `__init__(self, vida)` que guarda `self.vida`.\n\nEscribe `Trol(Enemigo)`:\n• `__init__(self, vida, armadura)` llama a `super().__init__(vida)` y guarda `self.armadura`.\n• `dureza(self)` devuelve `self.vida + self.armadura`.",
        "`Enemigo` exists with `__init__(self, vida)` storing `self.vida`.\n\nWrite `Trol(Enemigo)`:\n• `__init__(self, vida, armadura)` calls `super().__init__(vida)` and stores `self.armadura`.\n• `dureza(self)` returns `self.vida + self.armadura`.",
      ),
      support_code: "class Enemigo:\n    def __init__(self, vida):\n        self.vida = vida\n",
      starter_code: "class Trol(Enemigo):\n    def __init__(self, vida, armadura):\n        pass\n\n    def dureza(self):\n        pass\n",
      blocks: [
        "class Trol(Enemigo):",
        "    def __init__(self, vida, armadura):",
        "        super().__init__(vida)",
        "        self.armadura = armadura",
        "    def dureza(self):",
        "        return self.vida + self.armadura",
        "        self.vida = vida",
        "        return self.armadura",
      ],
      hints: [
        P("`super().__init__(vida)` deja que el padre fije `self.vida`.", "`super().__init__(vida)` lets the parent set `self.vida`."),
        P("`dureza` suma ambos: `self.vida + self.armadura`.", "`dureza` adds both: `self.vida + self.armadura`."),
      ],
      test_cases: [
        { input: "Trol(100, 50).dureza()", expected: 150, description: P("Vida + armadura", "Life + armor"), raw: true },
        { input: "Trol(100, 50).vida", expected: 100, description: P("vida la fija super()", "life set by super()"), raw: true },
        { input: "Trol(30, 0).dureza()", expected: 30, description: P("Sin armadura", "No armor"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P(
      "Sobre el puente cargan trasgos y troles a la vez. No importa la clase: si sabe atacar, cuenta. Eso es polimorfismo.",
      "Goblins and trolls charge the bridge at once. Class doesn't matter: if it can attack, it counts. That's polymorphism.",
    ),
    challenge: {
      topic: P("Polimorfismo / duck typing", "Polymorphism / duck typing"),
      instructions: P(
        "Ya existen `Trasgo` (atacar→5) y `Trol` (atacar→20).\n\nEscribe `dano_total(enemigos)` que sume `atacar()` de CADA enemigo de la lista, sea de la clase que sea.\n\nEjemplo: `dano_total([Trasgo(), Trol(), Trasgo()])` → `30`.",
        "`Trasgo` (atacar→5) and `Trol` (atacar→20) already exist.\n\nWrite `dano_total(enemigos)` summing `atacar()` of EACH enemy in the list, whatever its class.\n\nExample: `dano_total([Trasgo(), Trol(), Trasgo()])` → `30`.",
      ),
      support_code: "class Trasgo:\n    def atacar(self):\n        return 5\nclass Trol:\n    def atacar(self):\n        return 20\n",
      starter_code: "def dano_total(enemigos):\n    pass\n",
      blocks: [
        "def dano_total(enemigos):",
        "    return sum(e.atacar() for e in enemigos)",
        "    return sum(enemigos)",
        "    return sum(e.atacar for e in enemigos)",
      ],
      hints: [
        P("No compruebes la clase: sólo llama `e.atacar()` (duck typing).", "Don't check the class: just call `e.atacar()` (duck typing)."),
        P("`sum(e.atacar() for e in enemigos)`.", "`sum(e.atacar() for e in enemigos)`."),
      ],
      test_cases: [
        { input: "dano_total([Trasgo(), Trol(), Trasgo()])", expected: 30, description: P("5 + 20 + 5", "5 + 20 + 5"), raw: true },
        { input: "dano_total([Trol(), Trol()])", expected: 40, description: P("Dos troles", "Two trolls"), raw: true },
        { input: "dano_total([])", expected: 0, description: P("Sin enemigos", "No enemies"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P(
      "En la penumbra se mezclan enemigos y escombros. Cuenta sólo a los que SON enemigos, usando `isinstance` (que respeta la herencia).",
      "In the gloom, enemies and rubble mingle. Count only those that ARE enemies, using `isinstance` (which respects inheritance).",
    ),
    challenge: {
      topic: P("isinstance con herencia", "isinstance with inheritance"),
      instructions: P(
        "Ya existen la clase base `Enemigo`, su subclase `Trasgo(Enemigo)` y una clase suelta `Piedra`.\n\nEscribe `contar_enemigos(cosas)` que devuelva cuántos elementos de la lista SON enemigos (`isinstance(c, Enemigo)`). Un `Trasgo` cuenta; una `Piedra` no.\n\nEjemplo: `contar_enemigos([Trasgo(), Piedra(), Trasgo()])` → `2`.",
        "The base class `Enemigo`, its subclass `Trasgo(Enemigo)` and a separate class `Piedra` already exist.\n\nWrite `contar_enemigos(cosas)` returning how many list items ARE enemies (`isinstance(c, Enemigo)`). A `Trasgo` counts; a `Piedra` doesn't.\n\nExample: `contar_enemigos([Trasgo(), Piedra(), Trasgo()])` → `2`.",
      ),
      support_code: "class Enemigo:\n    pass\nclass Trasgo(Enemigo):\n    pass\nclass Piedra:\n    pass\n",
      starter_code: "def contar_enemigos(cosas):\n    pass\n",
      blocks: [
        "def contar_enemigos(cosas):",
        "    return sum(1 for c in cosas if isinstance(c, Enemigo))",
        "    return sum(1 for c in cosas if type(c) == Enemigo)",
        "    return len(cosas)",
      ],
      hints: [
        P("`isinstance(c, Enemigo)` es True también para las subclases (Trasgo).", "`isinstance(c, Enemigo)` is True for subclasses too (Trasgo)."),
        P("Cuenta con `sum(1 for c in cosas if ...)`.", "Count with `sum(1 for c in cosas if ...)`."),
      ],
      test_cases: [
        { input: "contar_enemigos([Trasgo(), Piedra(), Trasgo()])", expected: 2, description: P("Dos trasgos (Piedra no cuenta)", "Two goblins (Piedra doesn't count)"), raw: true },
        { input: "contar_enemigos([Piedra()])", expected: 0, description: P("Sólo escombros", "Only rubble"), raw: true },
        { input: "contar_enemigos([])", expected: 0, description: P("Galería vacía", "Empty gallery"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 7 · Encapsulación y métodos dunder: _priv, @property, __str__
 * ===================================================================== */

const Q_PY_PROTECTED = {
  question: P("¿Qué indica un atributo con UN guion bajo, como `_saldo`?", "What does an attribute with ONE underscore, like `_saldo`, indicate?"),
  options: [
    P("Convención de 'privado': úsalo sólo dentro de la clase", "A 'private' convention: use it only inside the class"),
    P("Que es una constante", "That it's a constant"),
    P("Que Python lo oculta por completo", "That Python fully hides it"),
    P("Que es un método", "That it's a method"),
  ],
  correct: 0,
  explanation: P(
    "`_saldo` es una CONVENCIÓN: señala 'no me toques desde fuera', pero Python no lo impide. La encapsulación en Python es por acuerdo, no por obligación.",
    "`_saldo` is a CONVENTION: it signals 'don't touch me from outside', but Python doesn't enforce it. Encapsulation in Python is by agreement, not by force.",
  ),
};
const Q_PY_NAME_MANGLING = {
  question: P("¿Qué hace el DOBLE guion bajo, como `__saldo`?", "What does the DOUBLE underscore, like `__saldo`, do?"),
  options: [
    P("Activa name mangling: se renombra a _Clase__saldo", "Triggers name mangling: renamed to _Clase__saldo"),
    P("Lo hace público", "Makes it public"),
    P("Lo convierte en método dunder", "Turns it into a dunder method"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "El doble guion bajo activa 'name mangling': Python lo renombra a `_Clase__saldo` para evitar choques en subclases. No es privacidad real, pero dificulta el acceso externo.",
    "Double underscore triggers 'name mangling': Python renames it to `_Clase__saldo` to avoid clashes in subclasses. Not real privacy, but it hampers external access.",
  ),
};
const Q_PY_PROPERTY = {
  question: P("¿Qué hace `@property` sobre un método?", "What does `@property` do to a method?"),
  options: [
    P("Permite llamarlo como si fuera un atributo, sin paréntesis", "Lets you call it like an attribute, without parentheses"),
    P("Lo hace privado", "Makes it private"),
    P("Lo convierte en estático", "Makes it static"),
    P("Impide sobreescribirlo", "Prevents overriding it"),
  ],
  correct: 0,
  explanation: P(
    "`@property` convierte un método en un atributo CALCULADO de sólo lectura: `obj.brillo` (sin `()`) ejecuta el método. Ideal para exponer datos derivados de atributos privados.",
    "`@property` turns a method into a read-only COMPUTED attribute: `obj.brillo` (no `()`) runs the method. Ideal to expose data derived from private attributes.",
  ),
};
const Q_PY_SETTER = {
  question: P("¿Para qué sirve `@brillo.setter`?", "What is `@brillo.setter` for?"),
  options: [
    P("Definir qué pasa al ASIGNAR `obj.brillo = valor` (p. ej. validar)", "Define what happens when ASSIGNING `obj.brillo = value` (e.g. validate)"),
    P("Borrar la propiedad", "Delete the property"),
    P("Hacer la propiedad de sólo lectura", "Make the property read-only"),
    P("Crear un método estático", "Create a static method"),
  ],
  correct: 0,
  explanation: P(
    "Un `@x.setter` intercepta la asignación `obj.x = v`, permitiendo validar o transformar el valor. Sin él, una `@property` es de sólo lectura.",
    "A `@x.setter` intercepts the assignment `obj.x = v`, allowing validation or transformation. Without it, a `@property` is read-only.",
  ),
};
const Q_PY_REPR = {
  question: P("¿Qué método da la representación 'técnica' de un objeto (para depurar)?", "Which method gives the 'technical' representation of an object (for debugging)?"),
  options: [
    P("__repr__", "__repr__"),
    P("__str__", "__str__"),
    P("__debug__", "__debug__"),
    P("__dict__", "__dict__"),
  ],
  correct: 0,
  explanation: P(
    "`__repr__` es la versión sin ambigüedad (la que ves en la consola o en una lista de objetos). `__str__` es la 'amable' para el usuario. Si sólo defines una, define `__repr__`.",
    "`__repr__` is the unambiguous version (seen in the console or a list of objects). `__str__` is the 'friendly' one for users. If you define only one, define `__repr__`.",
  ),
};
const Q_PY_EQ = {
  question: P("¿Qué método define cuándo dos objetos son iguales con `==`?", "Which method defines when two objects are equal with `==`?"),
  options: [
    P("__eq__", "__eq__"),
    P("__cmp__", "__cmp__"),
    P("__equals__", "__equals__"),
    P("equals", "equals"),
  ],
  correct: 0,
  explanation: P(
    "`__eq__(self, otro)` define la igualdad `==`. Por defecto compara identidad (mismo objeto en memoria); redefínelo para comparar por contenido.",
    "`__eq__(self, other)` defines `==` equality. By default it compares identity (same object in memory); redefine it to compare by content.",
  ),
};
const Q_PY_LEN_DUNDER = {
  question: P("Si defines `__len__` en tu clase, ¿qué consigues?", "If you define `__len__` in your class, what do you get?"),
  options: [
    P("Que `len(obj)` funcione sobre tus objetos", "That `len(obj)` works on your objects"),
    P("Que `obj.length` funcione", "That `obj.length` works"),
    P("Un atributo llamado len", "An attribute named len"),
    P("Nada útil", "Nothing useful"),
  ],
  correct: 0,
  explanation: P(
    "Los métodos dunder conectan tu clase con las funciones del lenguaje: `__len__` hace que `len(obj)` funcione, `__getitem__` habilita `obj[i]`, etc. Es la base del 'modelo de datos' de Python.",
    "Dunder methods wire your class to the language's functions: `__len__` makes `len(obj)` work, `__getitem__` enables `obj[i]`, etc. It's the basis of Python's 'data model'.",
  ),
};
const Q_PY_DATACLASS = {
  question: P("¿Qué te ahorra el decorador `@dataclass`?", "What does the `@dataclass` decorator save you?"),
  options: [
    P("Escribir a mano __init__, __repr__ y __eq__", "Writing __init__, __repr__ and __eq__ by hand"),
    P("Importar módulos", "Importing modules"),
    P("Usar self", "Using self"),
    P("Nada: es decorativo", "Nothing: it's decorative"),
  ],
  correct: 0,
  explanation: P(
    "`@dataclass` genera automáticamente `__init__`, `__repr__` y `__eq__` a partir de los atributos anotados. Perfecto para clases que sólo llevan datos.",
    "`@dataclass` auto-generates `__init__`, `__repr__` and `__eq__` from the annotated attributes. Perfect for classes that just hold data.",
  ),
};

const Q_PY_ADD = {
  question: P("Si defines `__add__` en tu clase, ¿qué habilitas?", "If you define `__add__` in your class, what do you enable?"),
  options: [
    P("El operador `+` entre tus objetos (a + b)", "The `+` operator between your objects (a + b)"),
    P("El método `.add()`", "The `.add()` method"),
    P("La suma con `sum()` solamente", "Summing with `sum()` only"),
    P("Nada: no existe", "Nothing: it doesn't exist"),
  ],
  correct: 0,
  explanation: P(
    "`__add__(self, otro)` define qué hace `a + b` con tus objetos (sobrecarga de operador). Igual que `__mul__` para `*` o `__lt__` para `<`. Es parte del modelo de datos.",
    "`__add__(self, other)` defines what `a + b` does with your objects (operator overloading). Like `__mul__` for `*` or `__lt__` for `<`. It's part of the data model.",
  ),
};

/** Capítulo 7 · Encapsulación y métodos dunder. */
export const SYL_PY_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_PY_PROTECTED, Q_PY_NAME_MANGLING, Q_PY_PROPERTY] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_PY_SETTER, Q_PY_REPR, Q_PY_EQ] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_PY_LEN_DUNDER, Q_PY_DATACLASS, Q_PY_ADD] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P(
      "Uglúk quiebra la moral de los cautivos a gritos. La luz de Galadriel la sostiene. Encapsula la moral: nadie la fija a mano, sólo sube y baja con límites.",
      "Uglúk breaks the captives' morale with shouts. Galadriel's light sustains it. Encapsulate morale: no one sets it by hand, it only rises and falls within limits.",
    ),
    challenge: {
      topic: P("Encapsulación con atributo privado y @property", "Encapsulation with a private attribute and @property"),
      instructions: P(
        "Escribe la clase `Companero`:\n• `__init__(self, nombre)` guarda `self.nombre` y arranca `self._moral = 100`.\n• `desanimar(self, n)` resta `n` a la moral SIN bajar de 0.\n• `animar(self, n)` suma `n` SIN pasar de 100.\n• `moral` es una `@property` que devuelve `self._moral`.",
        "Write the class `Companero`:\n• `__init__(self, nombre)` stores `self.nombre` and starts `self._moral = 100`.\n• `desanimar(self, n)` subtracts `n` from morale, never below 0.\n• `animar(self, n)` adds `n`, never above 100.\n• `moral` is a `@property` returning `self._moral`.",
      ),
      starter_code: "class Companero:\n    def __init__(self, nombre):\n        pass\n\n    def desanimar(self, n):\n        pass\n\n    def animar(self, n):\n        pass\n\n    @property\n    def moral(self):\n        pass\n",
      sut: "Companero('Pippin')",
      blocks: [
        "class Companero:",
        "    def __init__(self, nombre):",
        "        self.nombre = nombre",
        "        self._moral = 100",
        "    def desanimar(self, n):",
        "        self._moral = max(0, self._moral - n)",
        "    def animar(self, n):",
        "        self._moral = min(100, self._moral + n)",
        "    @property",
        "    def moral(self):",
        "        return self._moral",
        "        self._moral = self._moral - n",
      ],
      hints: [
        P("Guarda la moral en `self._moral` (privada por convención).", "Store morale in `self._moral` (private by convention)."),
        P("`desanimar`: `self._moral = max(0, self._moral - n)`. `animar`: `min(100, ...)`.", "`desanimar`: `self._moral = max(0, self._moral - n)`. `animar`: `min(100, ...)`."),
      ],
      test_cases: [
        { input: "moral", expected: 100, description: P("Arranca a 100", "Starts at 100"), raw: false },
        { input: "desanimar(40)", expected: null, description: P("Baja 40 (60)", "Drops 40 (60)"), raw: false },
        { input: "animar(20)", expected: null, description: P("Sube 20 (80)", "Rises 20 (80)"), raw: false },
        { input: "moral", expected: 80, description: P("Moral leída por la property", "Morale read via the property"), raw: false },
        { input: "desanimar(200)", expected: null, description: P("Golpe brutal: no baja de 0", "Brutal blow: never below 0"), raw: false },
        { input: "moral", expected: 0, description: P("Moral agotada", "Morale spent"), raw: false },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de la Encapsulación", "The Scroll of Encapsulation"),
    lore_intro: P(
      "Galadriel entrega, junto a sus dones, un pergamino: enseña a proteger el estado y a exponerlo con cuidado.",
      "Galadriel gives, alongside her gifts, a scroll: it teaches how to protect state and expose it carefully.",
    ),
    scroll: {
      topic: P("Encapsulación y métodos dunder", "Encapsulation and dunder methods"),
      sections: [
        {
          heading: P("Atributos 'privados'", "'Private' attributes"),
          body: P(
            "Un `_x` señala 'uso interno' (convención); `__x` activa name mangling. Python no impide el acceso: la encapsulación es un acuerdo.",
            "A `_x` signals 'internal use' (convention); `__x` triggers name mangling. Python doesn't block access: encapsulation is an agreement.",
          ),
          code: "class Cuenta:\n    def __init__(self, saldo):\n        self._saldo = saldo   # 'no tocar'",
        },
        {
          heading: P("@property: leer sin paréntesis", "@property: read without parentheses"),
          body: P(
            "`@property` expone un valor calculado como si fuera atributo. Con `@x.setter` controlas la asignación (validar, acotar).",
            "`@property` exposes a computed value as if it were an attribute. With `@x.setter` you control assignment (validate, clamp).",
          ),
          code: "class Frasco:\n    def __init__(self, luz):\n        self._luz = luz\n    @property\n    def brillo(self):\n        return self._luz * 2",
        },
        {
          heading: P("Métodos dunder", "Dunder methods"),
          body: P(
            "Conectan tu clase con el lenguaje: `__str__` (print), `__repr__` (depurar), `__eq__` (==), `__len__` (len). `@dataclass` genera varios por ti.",
            "They wire your class to the language: `__str__` (print), `__repr__` (debug), `__eq__` (==), `__len__` (len). `@dataclass` generates several for you.",
          ),
          code: "class Capa:\n    def __init__(self, color):\n        self.color = color\n    def __str__(self):\n        return f'capa {self.color}'",
        },
      ],
      keyTakeaway: P(
        "_x es privado por convención; @property expone datos calculados sin (); los dunder (__str__, __eq__, __len__) integran tu clase con el lenguaje.",
        "_x is private by convention; @property exposes computed data without (); dunders (__str__, __eq__, __len__) integrate your class with the language.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "Galadriel's Phial"),
    lore_intro: P(
      "La luz de Eärendil crece cuando más oscuro está todo. Exponla como una propiedad calculada.",
      "Eärendil's light grows when all is darkest. Expose it as a computed property.",
    ),
    challenge: {
      topic: P("@property (atributo calculado)", "@property (computed attribute)"),
      instructions: P(
        "Escribe la clase `Frasco`:\n• `__init__(self, luz)` guarda `self._luz`.\n• `brillo` es una `@property` que devuelve `self._luz * 2`.\n\nSe lee SIN paréntesis: `Frasco(10).brillo` → `20`.",
        "Write the class `Frasco`:\n• `__init__(self, luz)` stores `self._luz`.\n• `brillo` is a `@property` returning `self._luz * 2`.\n\nRead WITHOUT parentheses: `Frasco(10).brillo` → `20`.",
      ),
      starter_code: "class Frasco:\n    def __init__(self, luz):\n        self._luz = luz\n\n    @property\n    def brillo(self):\n        pass\n",
      blocks: [
        "class Frasco:",
        "    def __init__(self, luz):",
        "        self._luz = luz",
        "    @property",
        "    def brillo(self):",
        "        return self._luz * 2",
        "    def brillo(self):",
        "        return luz * 2",
      ],
      hints: [
        P("El decorador `@property` va justo encima de `def brillo(self):`.", "The `@property` decorator goes right above `def brillo(self):`."),
        P("Devuelve el doble: `return self._luz * 2`.", "Return the double: `return self._luz * 2`."),
      ],
      test_cases: [
        { input: "Frasco(10).brillo", expected: 20, description: P("Se lee sin ()", "Read without ()"), raw: true },
        { input: "Frasco(0).brillo", expected: 0, description: P("Sin luz", "No light"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P(
      "Cada capa de Lórien toma el color de la tierra. Da a tu objeto un texto propio con `__str__`.",
      "Each Lórien cloak takes the color of the land. Give your object its own text with `__str__`.",
    ),
    challenge: {
      topic: P("Método dunder __str__", "Dunder method __str__"),
      instructions: P(
        "Escribe la clase `Capa`:\n• `__init__(self, color)` guarda `self.color`.\n• `__str__(self)` devuelve `'capa {color}'`.\n\nEjemplo: `str(Capa('gris'))` → `'capa gris'`.",
        "Write the class `Capa`:\n• `__init__(self, color)` stores `self.color`.\n• `__str__(self)` returns `'capa {color}'`.\n\nExample: `str(Capa('gris'))` → `'capa gris'`.",
      ),
      starter_code: "class Capa:\n    def __init__(self, color):\n        self.color = color\n\n    def __str__(self):\n        pass\n",
      blocks: [
        "class Capa:",
        "    def __init__(self, color):",
        "        self.color = color",
        "    def __str__(self):",
        "        return f'capa {self.color}'",
        "    def str(self):",
        "        return f'capa {color}'",
      ],
      hints: [
        P("El método se llama exactamente `__str__` (dos guiones a cada lado).", "The method is exactly `__str__` (two underscores each side)."),
        P("`return f'capa {self.color}'`.", "`return f'capa {self.color}'`."),
      ],
      test_cases: [
        { input: "str(Capa('gris'))", expected: "capa gris", description: P("Texto del objeto", "Object's text"), raw: true },
        { input: "str(Capa('verde'))", expected: "capa verde", description: P("Otro color", "Another color"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P(
      "El cofre de Sam guarda tierra de Lórien; cada puñado suma. El total se consulta, pero nadie lo fija a mano.",
      "Sam's box holds soil of Lórien; each handful adds up. The total is read, but no one sets it by hand.",
    ),
    challenge: {
      topic: P("Estado encapsulado con @property de lectura", "Encapsulated state with a read @property"),
      instructions: P(
        "Escribe la clase `Cofre`:\n• `__init__(self)` arranca `self._oro = 0` (privado).\n• `anadir(self, n)` SUMA `n` al oro.\n• `total` es una `@property` que devuelve `self._oro`.",
        "Write the class `Cofre`:\n• `__init__(self)` starts `self._oro = 0` (private).\n• `anadir(self, n)` ADDS `n` to the gold.\n• `total` is a `@property` returning `self._oro`.",
      ),
      starter_code: "class Cofre:\n    def __init__(self):\n        pass\n\n    def anadir(self, n):\n        pass\n\n    @property\n    def total(self):\n        pass\n",
      sut: "Cofre()",
      blocks: [
        "class Cofre:",
        "    def __init__(self):",
        "        self._oro = 0",
        "    def anadir(self, n):",
        "        self._oro = self._oro + n",
        "    @property",
        "    def total(self):",
        "        return self._oro",
        "        self._oro = n",
      ],
      hints: [
        P("`self._oro = 0` en el constructor; `anadir` hace `self._oro += n`.", "`self._oro = 0` in the constructor; `anadir` does `self._oro += n`."),
        P("`total` lleva `@property` encima y devuelve `self._oro`.", "`total` has `@property` above it and returns `self._oro`."),
      ],
      test_cases: [
        { input: "total", expected: 0, description: P("Cofre vacío", "Empty box"), raw: false },
        { input: "anadir(10)", expected: null, description: P("Añade 10", "Adds 10"), raw: false },
        { input: "anadir(5)", expected: null, description: P("Añade 5 más", "Adds 5 more"), raw: false },
        { input: "total", expected: 15, description: P("Total leído por la property", "Total read via the property"), raw: false },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 8 · Excepciones y fábricas: try/except, raise, custom, factory
 * ===================================================================== */

const Q_PY_TRY = {
  question: P("¿Cuál es la sintaxis para capturar un error en Python?", "What's the syntax to catch an error in Python?"),
  options: [
    P("try: ... except: ...", "try: ... except: ..."),
    P("try { ... } catch { ... }", "try { ... } catch { ... }"),
    P("try: ... rescue: ...", "try: ... rescue: ..."),
    P("attempt: ... on_error: ...", "attempt: ... on_error: ..."),
  ],
  correct: 0,
  explanation: P(
    "`try:` envuelve el código que puede fallar y `except:` maneja el error. La palabra es `except`, no `catch` (JS/Java) ni `rescue` (Ruby).",
    "`try:` wraps the code that may fail and `except:` handles the error. The word is `except`, not `catch` (JS/Java) nor `rescue` (Ruby).",
  ),
};
const Q_PY_RAISE = {
  question: P("¿Cómo lanzas tú mismo una excepción?", "How do you throw an exception yourself?"),
  options: [
    P("raise ValueError('mensaje')", "raise ValueError('mensaje')"),
    P("throw new ValueError('mensaje')", "throw new ValueError('mensaje')"),
    P("error('mensaje')", "error('mensaje')"),
    P("panic('mensaje')", "panic('mensaje')"),
  ],
  correct: 0,
  explanation: P(
    "`raise Excepcion('mensaje')` lanza el error. `throw` es de JS/Java, `panic` de Go. Se suele lanzar una clase de excepción concreta (ValueError, TypeError…).",
    "`raise Exception('message')` throws the error. `throw` is JS/Java, `panic` is Go. You usually raise a specific exception class (ValueError, TypeError…).",
  ),
};
const Q_PY_FINALLY = {
  question: P("¿Cuándo se ejecuta el bloque `finally`?", "When does the `finally` block run?"),
  options: [
    P("Siempre, haya error o no", "Always, error or not"),
    P("Sólo si hubo error", "Only if there was an error"),
    P("Sólo si NO hubo error", "Only if there was NO error"),
    P("Nunca, es decorativo", "Never, it's decorative"),
  ],
  correct: 0,
  explanation: P(
    "`finally:` se ejecuta SIEMPRE al final del try/except, ideal para liberar recursos (cerrar ficheros, conexiones). Corre aunque el bloque haga `return`.",
    "`finally:` always runs at the end of the try/except, ideal to release resources (close files, connections). It runs even if the block does `return`.",
  ),
};
const Q_PY_EXCEPT_TYPE = {
  question: P("¿Cómo capturas SÓLO un `ValueError` y guardas el objeto de error?", "How do you catch ONLY a `ValueError` and keep the error object?"),
  options: [
    P("except ValueError as e:", "except ValueError as e:"),
    P("except (ValueError) e:", "except (ValueError) e:"),
    P("catch ValueError e:", "catch ValueError e:"),
    P("except e: ValueError", "except e: ValueError"),
  ],
  correct: 0,
  explanation: P(
    "`except ValueError as e:` atrapa ese tipo y liga el objeto a `e`. Un `except:` a secas captura TODO (peligroso: oculta errores inesperados).",
    "`except ValueError as e:` catches that type and binds the object to `e`. A bare `except:` catches EVERYTHING (dangerous: hides unexpected errors).",
  ),
};
const Q_PY_CUSTOM_EXC = {
  question: P("¿Cómo defines tu propia excepción `MiError`?", "How do you define your own exception `MiError`?"),
  options: [
    P("class MiError(Exception): pass", "class MiError(Exception): pass"),
    P("def MiError(): raise", "def MiError(): raise"),
    P("error MiError", "error MiError"),
    P("class MiError extends Error", "class MiError extends Error"),
  ],
  correct: 0,
  explanation: P(
    "Una excepción es una CLASE que hereda de `Exception`: `class MiError(Exception): pass`. Así puedes lanzarla con `raise MiError(...)` y capturarla por su tipo.",
    "An exception is a CLASS inheriting from `Exception`: `class MiError(Exception): pass`. Then you can raise it with `raise MiError(...)` and catch it by type.",
  ),
};
const Q_PY_EXC_BASE = {
  question: P("`except Exception:` ¿qué captura?", "What does `except Exception:` catch?"),
  options: [
    P("Casi cualquier error (Exception es la base común)", "Almost any error (Exception is the common base)"),
    P("Sólo errores de sintaxis", "Only syntax errors"),
    P("Sólo tus excepciones propias", "Only your own exceptions"),
    P("Nada", "Nothing"),
  ],
  correct: 0,
  explanation: P(
    "Casi todas las excepciones heredan de `Exception`, así que `except Exception:` las atrapa. Captura siempre el tipo MÁS específico que puedas para no ocultar fallos.",
    "Almost all exceptions inherit from `Exception`, so `except Exception:` catches them. Always catch the MOST specific type you can, to avoid hiding failures.",
  ),
};
const Q_PY_FACTORY = {
  question: P("Una función que devuelve una instancia de DISTINTAS clases según un parámetro es…", "A function returning an instance of DIFFERENT classes based on a parameter is…"),
  options: [
    P("Una fábrica (factory): centraliza la creación de objetos", "A factory: centralizes object creation"),
    P("Un singleton", "A singleton"),
    P("Un decorador", "A decorator"),
    P("Una excepción", "An exception"),
  ],
  correct: 0,
  explanation: P(
    "El patrón FACTORY encapsula 'qué clase crear' en una función/método, según un tipo o condición. Quien la usa no necesita conocer las clases concretas.",
    "The FACTORY pattern encapsulates 'which class to create' in a function/method, based on a type or condition. The caller needn't know the concrete classes.",
  ),
};
const Q_PY_ZERODIV = {
  question: P("¿Qué excepción lanza `10 / 0`?", "What exception does `10 / 0` raise?"),
  options: [
    P("ZeroDivisionError", "ZeroDivisionError"),
    P("ValueError", "ValueError"),
    P("Devuelve infinito, sin error", "Returns infinity, no error"),
    P("TypeError", "TypeError"),
  ],
  correct: 0,
  explanation: P(
    "Dividir entre cero lanza `ZeroDivisionError` (a diferencia de JS, que da `Infinity`). Se captura con `except ZeroDivisionError:` para dar un valor por defecto.",
    "Dividing by zero raises `ZeroDivisionError` (unlike JS, which gives `Infinity`). Catch it with `except ZeroDivisionError:` to provide a default.",
  ),
};
const Q_PY_MULTI_EXCEPT = {
  question: P("¿Cómo capturas VARIOS tipos de error en un mismo `except`?", "How do you catch SEVERAL error types in one `except`?"),
  options: [
    P("except (ValueError, TypeError):", "except (ValueError, TypeError):"),
    P("except ValueError, TypeError:", "except ValueError, TypeError:"),
    P("except ValueError or TypeError:", "except ValueError or TypeError:"),
    P("except [ValueError, TypeError]:", "except [ValueError, TypeError]:"),
  ],
  correct: 0,
  explanation: P(
    "Se pasan en una TUPLA entre paréntesis: `except (ValueError, TypeError):`. También puedes encadenar varios bloques `except` distintos, uno por tipo.",
    "Pass them as a TUPLE in parentheses: `except (ValueError, TypeError):`. You can also chain several distinct `except` blocks, one per type.",
  ),
};

/** Capítulo 8 · Excepciones y fábricas. */
export const SYL_PY_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_PY_TRY, Q_PY_RAISE, Q_PY_FINALLY] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_PY_EXCEPT_TYPE, Q_PY_CUSTOM_EXC, Q_PY_EXC_BASE] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_PY_FACTORY, Q_PY_ZERODIV, Q_PY_MULTI_EXCEPT] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P(
      "Lurtz forja su hueste en los fosos de Isengard. Escribe la FÁBRICA que crea cada enemigo y lanza tu propia excepción si el tipo no existe; envuélvela para no caer.",
      "Lurtz forges his host in the pits of Isengard. Write the FACTORY that creates each enemy and raise your own exception if the type doesn't exist; wrap it so you don't fall.",
    ),
    challenge: {
      topic: P("Excepción personalizada + factory + try/except", "Custom exception + factory + try/except"),
      instructions: P(
        "Ya existen `Uruk` (poder→30) y `Orco` (poder→10).\n\nEscribe:\n• `class EnemigoDesconocido(Exception): pass`.\n• `forjar(tipo)`: devuelve `Uruk()` si `tipo=='uruk'`, `Orco()` si `'orco'`, y si no, `raise EnemigoDesconocido(tipo)`.\n• `forjar_seguro(tipo)`: devuelve `forjar(tipo).poder()`, pero si salta `EnemigoDesconocido`, devuelve `0`.",
        "`Uruk` (poder→30) and `Orco` (poder→10) already exist.\n\nWrite:\n• `class EnemigoDesconocido(Exception): pass`.\n• `forjar(tipo)`: returns `Uruk()` if `tipo=='uruk'`, `Orco()` if `'orco'`, otherwise `raise EnemigoDesconocido(tipo)`.\n• `forjar_seguro(tipo)`: returns `forjar(tipo).poder()`, but if `EnemigoDesconocido` is raised, returns `0`.",
      ),
      support_code: "class Uruk:\n    def poder(self):\n        return 30\nclass Orco:\n    def poder(self):\n        return 10\n",
      starter_code: "class EnemigoDesconocido(Exception):\n    pass\n\ndef forjar(tipo):\n    pass\n\ndef forjar_seguro(tipo):\n    pass\n",
      blocks: [
        "class EnemigoDesconocido(Exception):",
        "    pass",
        "def forjar(tipo):",
        "    if tipo == 'uruk':",
        "        return Uruk()",
        "    if tipo == 'orco':",
        "        return Orco()",
        "    raise EnemigoDesconocido(tipo)",
        "def forjar_seguro(tipo):",
        "    try:",
        "        return forjar(tipo).poder()",
        "    except EnemigoDesconocido:",
        "        return 0",
        "    return forjar(tipo).poder()",
      ],
      hints: [
        P("La excepción es una clase: `class EnemigoDesconocido(Exception): pass`.", "The exception is a class: `class EnemigoDesconocido(Exception): pass`."),
        P("En `forjar_seguro`, envuelve `forjar(tipo).poder()` en try/except EnemigoDesconocido → 0.", "In `forjar_seguro`, wrap `forjar(tipo).poder()` in try/except EnemigoDesconocido → 0."),
      ],
      test_cases: [
        { input: "forjar_seguro('uruk')", expected: 30, description: P("Un Uruk", "An Uruk"), raw: true },
        { input: "forjar_seguro('orco')", expected: 10, description: P("Un Orco", "An Orc"), raw: true },
        { input: "forjar_seguro('dragon')", expected: 0, description: P("Tipo desconocido: se captura → 0", "Unknown type: caught → 0"), raw: true },
        { input: "issubclass(EnemigoDesconocido, Exception)", expected: true, description: P("Es una excepción de verdad", "It's a real exception"), raw: true },
        { input: "forjar('uruk').poder()", expected: 30, description: P("La fábrica crea el objeto", "The factory builds the object"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino de los Fallos", "The Scroll of Failures"),
    lore_intro: P(
      "En Amon Hen, entre las estatuas de los reyes, un último pergamino enseña a caer con gracia: a manejar el error.",
      "At Amon Hen, among the statues of the kings, a last scroll teaches how to fall gracefully: to handle error.",
    ),
    scroll: {
      topic: P("Excepciones y fábricas", "Exceptions and factories"),
      sections: [
        {
          heading: P("try / except / finally", "try / except / finally"),
          body: P(
            "`try:` envuelve lo que puede fallar; `except Tipo as e:` lo maneja; `finally:` se ejecuta siempre. Captura el tipo más específico posible.",
            "`try:` wraps what may fail; `except Type as e:` handles it; `finally:` always runs. Catch the most specific type possible.",
          ),
          code: "try:\n    n = int(texto)\nexcept ValueError:\n    n = 0\nfinally:\n    print('listo')",
        },
        {
          heading: P("raise y excepciones propias", "raise and custom exceptions"),
          body: P(
            "`raise Tipo('msg')` lanza un error. Defines los tuyos heredando de `Exception`, para señalar fallos de tu dominio.",
            "`raise Type('msg')` throws an error. You define your own by inheriting from `Exception`, to signal domain-specific failures.",
          ),
          code: "class SinEnergia(Exception):\n    pass\nif energia <= 0:\n    raise SinEnergia('agotado')",
        },
        {
          heading: P("Patrón factory", "Factory pattern"),
          body: P(
            "Una fábrica centraliza la creación: según un tipo, devuelve la instancia adecuada. Quien la usa no conoce las clases concretas.",
            "A factory centralizes creation: given a type, it returns the right instance. The caller doesn't know the concrete classes.",
          ),
          code: "def crear(tipo):\n    if tipo == 'uruk':\n        return Uruk()\n    return Orco()",
        },
      ],
      keyTakeaway: P(
        "try/except/finally maneja errores; raise los lanza; hereda de Exception para los tuyos. Una factory decide qué clase crear según un parámetro.",
        "try/except/finally handles errors; raise throws them; inherit from Exception for your own. A factory decides which class to create from a parameter.",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P(
      "Boromir quiere repartir el poder del Anillo entre los suyos, pero repartir entre nadie no tiene sentido. Protege la división.",
      "Boromir wants to split the Ring's power among his own, but splitting among no one makes no sense. Guard the division.",
    ),
    challenge: {
      topic: P("try/except ZeroDivisionError", "try/except ZeroDivisionError"),
      instructions: P(
        "Escribe `dividir_botin(oro, entre)` que devuelva `oro // entre` (división entera). Si `entre` es 0, captura el error y devuelve `0`.\n\nEjemplo: `dividir_botin(100, 4)` → `25`; `dividir_botin(50, 0)` → `0`.",
        "Write `dividir_botin(oro, entre)` returning `oro // entre` (integer division). If `entre` is 0, catch the error and return `0`.\n\nExample: `dividir_botin(100, 4)` → `25`; `dividir_botin(50, 0)` → `0`.",
      ),
      starter_code: "def dividir_botin(oro, entre):\n    pass\n",
      blocks: [
        "def dividir_botin(oro, entre):",
        "    try:",
        "        return oro // entre",
        "    except ZeroDivisionError:",
        "        return 0",
        "    except ValueError:",
        "        return oro",
      ],
      hints: [
        P("Envuelve la división en `try:` y captura `ZeroDivisionError`.", "Wrap the division in `try:` and catch `ZeroDivisionError`."),
        P("En el `except`, `return 0`.", "In the `except`, `return 0`."),
      ],
      test_cases: [
        { input: "dividir_botin(100, 4)", expected: 25, description: P("Reparto normal", "Normal split"), raw: true },
        { input: "dividir_botin(50, 0)", expected: 0, description: P("Entre 0 → 0", "By 0 → 0"), raw: true },
        { input: "dividir_botin(9, 2)", expected: 4, description: P("División entera", "Integer division"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P(
      "Desde el trono de Amon Hen se ven muchas cosas, no todas legibles. Convierte lo que puedas y no caigas ante lo que no.",
      "From the Seat of Amon Hen many things are seen, not all readable. Convert what you can and don't fall for what you can't.",
    ),
    challenge: {
      topic: P("try/except ValueError", "try/except ValueError"),
      instructions: P(
        "Escribe `leer_numero(texto)` que devuelva `int(texto)`. Si el texto no es un número válido (lanza `ValueError`), devuelve `0`.\n\nEjemplo: `leer_numero('42')` → `42`; `leer_numero('orco')` → `0`.",
        "Write `leer_numero(texto)` returning `int(texto)`. If the text isn't a valid number (raises `ValueError`), return `0`.\n\nExample: `leer_numero('42')` → `42`; `leer_numero('orco')` → `0`.",
      ),
      starter_code: "def leer_numero(texto):\n    pass\n",
      blocks: [
        "def leer_numero(texto):",
        "    try:",
        "        return int(texto)",
        "    except ValueError:",
        "        return 0",
        "    except ZeroDivisionError:",
        "        return -1",
      ],
      hints: [
        P("`int('orco')` lanza `ValueError`: captúralo.", "`int('orco')` raises `ValueError`: catch it."),
        P("En el `except ValueError:`, `return 0`.", "In the `except ValueError:`, `return 0`."),
      ],
      test_cases: [
        { input: "leer_numero('42')", expected: 42, description: P("Texto numérico", "Numeric text"), raw: true },
        { input: "leer_numero('orco')", expected: 0, description: P("No es número → 0", "Not a number → 0"), raw: true },
        { input: "leer_numero('-7')", expected: -7, description: P("Negativo válido", "Valid negative"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P(
      "De los fosos de Isengard brotan uruks y orcos. Una sola fábrica decide cuál nace según su estirpe.",
      "From the pits of Isengard rise Uruks and Orcs. A single factory decides which is born by its breed.",
    ),
    challenge: {
      topic: P("Patrón factory", "Factory pattern"),
      instructions: P(
        "Ya existen `Uruk` (poder→30) y `Orco` (poder→10).\n\nEscribe `crear(tipo)` que devuelva un `Uruk()` si `tipo == 'uruk'`, y en cualquier otro caso un `Orco()`.\n\nEjemplo: `crear('uruk').poder()` → `30`; `crear('orco').poder()` → `10`.",
        "`Uruk` (poder→30) and `Orco` (poder→10) already exist.\n\nWrite `crear(tipo)` returning a `Uruk()` if `tipo == 'uruk'`, and otherwise an `Orco()`.\n\nExample: `crear('uruk').poder()` → `30`; `crear('orco').poder()` → `10`.",
      ),
      support_code: "class Uruk:\n    def poder(self):\n        return 30\nclass Orco:\n    def poder(self):\n        return 10\n",
      starter_code: "def crear(tipo):\n    pass\n",
      blocks: [
        "def crear(tipo):",
        "    if tipo == 'uruk':",
        "        return Uruk()",
        "    return Orco()",
        "    return tipo()",
        "        return Uruk",
      ],
      hints: [
        P("Un `if tipo == 'uruk':` decide qué clase instanciar.", "An `if tipo == 'uruk':` decides which class to instantiate."),
        P("Devuelve INSTANCIAS: `Uruk()` y `Orco()` (con paréntesis).", "Return INSTANCES: `Uruk()` and `Orco()` (with parentheses)."),
      ],
      test_cases: [
        { input: "crear('uruk').poder()", expected: 30, description: P("Nace un Uruk", "An Uruk is born"), raw: true },
        { input: "crear('orco').poder()", expected: 10, description: P("Nace un Orco", "An Orc is born"), raw: true },
        { input: "crear('otro').poder()", expected: 10, description: P("Por defecto, Orco", "Default: Orc"), raw: true },
      ],
    },
  },
};
