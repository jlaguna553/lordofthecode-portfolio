import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de Go para el Libro I. Reviste la MISMA narrativa compartida de la
 * Comunidad (Sombras en la Comarca) con los fundamentos de Go: paquetes,
 * funciones tipadas, variables y tipos básicos. El código del jugador se
 * INTERPRETA de verdad con Yaegi (Go → WASM). Bilingüe ES/EN.
 */

const P = (es: string, en: string) => ({ es, en });

/** Preguntas de combate reutilizables sobre fundamentos de Go. */
const Q_FUNC_GO = {
  question: P(
    "¿Cómo se declara en Go una función que recibe un `int` y devuelve un `string`?",
    "How do you declare in Go a function that takes an `int` and returns a `string`?",
  ),
  options: [
    P("func nombre(n int) string { ... }", "func nombre(n int) string { ... }"),
    P("function nombre(int n): string { ... }", "function nombre(int n): string { ... }"),
    P("func string nombre(n int) { ... }", "func string nombre(n int) { ... }"),
    P("def nombre(n): string { ... }", "def nombre(n): string { ... }"),
  ],
  correct: 0,
  explanation: P(
    "En Go la palabra clave es `func`, el TIPO va DESPUÉS del nombre del parámetro (`n int`), y el tipo de retorno va tras los paréntesis. Nada de punto y coma: las llaves y `gofmt` mandan.",
    "In Go the keyword is `func`, the TYPE goes AFTER the parameter name (`n int`), and the return type goes after the parentheses. No semicolons: braces and `gofmt` rule.",
  ),
};
const Q_TYPE_AFTER = {
  question: P(
    "En Go, ¿dónde va el tipo respecto al nombre de la variable?",
    "In Go, where does the type go relative to the variable name?",
  ),
  options: [
    P("Después: `var edad int`", "After: `var edad int`"),
    P("Antes: `int edad`", "Before: `int edad`"),
    P("No se escribe nunca", "It's never written"),
    P("Entre paréntesis: `(int) edad`", "In parentheses: `(int) edad`"),
  ],
  correct: 0,
  explanation: P(
    "Go pone el tipo DESPUÉS del nombre (`var edad int`, `nombre string`). Es al revés que C o Java. Se lee «edad, de tipo int».",
    "Go puts the type AFTER the name (`var edad int`, `nombre string`). It's the reverse of C or Java. It reads \"edad, of type int\".",
  ),
};
const Q_VAR_GO = {
  question: P(
    "¿Qué hace `nombre := \"Frodo\"` en Go?",
    "What does `nombre := \"Frodo\"` do in Go?",
  ),
  options: [
    P("Declara `nombre` e infiere su tipo (string) — declaración corta", "Declares `nombre` and infers its type (string) — short declaration"),
    P("Compara nombre con 'Frodo'", "Compares nombre with 'Frodo'"),
    P("Reasigna una variable ya existente", "Reassigns an existing variable"),
    P("Es un error de sintaxis", "It's a syntax error"),
  ],
  correct: 0,
  explanation: P(
    "`:=` es la declaración corta: crea la variable e infiere el tipo del valor. Sólo vale DENTRO de funciones. Fuera, o cuando quieres el tipo explícito, usas `var nombre string = \"Frodo\"`.",
    "`:=` is the short declaration: it creates the variable and infers the type from the value. It only works INSIDE functions. Outside, or when you want the explicit type, you use `var nombre string = \"Frodo\"`.",
  ),
};
const Q_PACKAGE = {
  question: P(
    "¿Con qué debe empezar todo archivo Go, y cómo se trae `fmt`?",
    "How must every Go file start, and how do you bring in `fmt`?",
  ),
  options: [
    P("`package main` y luego `import \"fmt\"`", "`package main` and then `import \"fmt\"`"),
    P("`#include <fmt>`", "`#include <fmt>`"),
    P("`using fmt;`", "`using fmt;`"),
    P("`require('fmt')`", "`require('fmt')`"),
  ],
  correct: 0,
  explanation: P(
    "Todo archivo Go declara su paquete en la primera línea (`package main` para un programa) y luego importa lo que use: `import \"fmt\"`. Un import sin usar es error de compilación: Go es estricto.",
    "Every Go file declares its package on the first line (`package main` for a program) and then imports what it uses: `import \"fmt\"`. An unused import is a compile error: Go is strict.",
  ),
};
const Q_MULTIRET = {
  question: P(
    "¿Qué permite Go que muchos lenguajes no, en el retorno de una función?",
    "What does Go allow in a function's return that many languages don't?",
  ),
  options: [
    P("Devolver VARIOS valores: `func dividir(a, b int) (int, error)`", "Returning MULTIPLE values: `func dividir(a, b int) (int, error)`"),
    P("No devolver nada nunca", "Never returning anything"),
    P("Devolver sólo strings", "Returning only strings"),
    P("Devolver una función anónima siempre", "Always returning an anonymous function"),
  ],
  correct: 0,
  explanation: P(
    "Go devuelve varios valores de forma nativa, y el idiomático es `(resultado, error)`: el que llama comprueba el error antes de usar el resultado. Es el patrón de errores de Go, sin excepciones.",
    "Go returns multiple values natively, and the idiomatic one is `(result, error)`: the caller checks the error before using the result. It's Go's error pattern, without exceptions.",
  ),
};
const Q_EXPORTED = {
  question: P(
    "En Go, ¿qué hace que una función o variable sea visible desde otros paquetes (exportada)?",
    "In Go, what makes a function or variable visible from other packages (exported)?",
  ),
  options: [
    P("Empezar con MAYÚSCULA: `Sumar` se exporta, `sumar` no", "Starting with an UPPERCASE letter: `Sumar` is exported, `sumar` isn't"),
    P("La palabra clave `public`", "The `public` keyword"),
    P("Un decorador `@export`", "An `@export` decorator"),
    P("Declararla con `export`", "Declaring it with `export`"),
  ],
  correct: 0,
  explanation: P(
    "Go no tiene `public`/`private`: la VISIBILIDAD la marca la primera letra. Mayúscula = exportada (visible fuera del paquete); minúscula = privada del paquete. Simple y sin palabras clave.",
    "Go has no `public`/`private`: VISIBILITY is set by the first letter. Uppercase = exported (visible outside the package); lowercase = package-private. Simple and keyword-free.",
  ),
};
const Q_NO_SEMI = {
  question: P(
    "¿Qué es cierto sobre el estilo de Go?",
    "What's true about Go's style?",
  ),
  options: [
    P("`gofmt` impone el formato y no se escriben puntos y coma", "`gofmt` enforces formatting and you don't write semicolons"),
    P("La sangría define los bloques, como en Python", "Indentation defines blocks, like Python"),
    P("Hay que terminar cada línea con `;`", "You must end each line with `;`"),
    P("El formato es libre", "Formatting is free-form"),
  ],
  correct: 0,
  explanation: P(
    "Go usa llaves `{ }` para los bloques (no la sangría), pero el compilador inserta los `;` por ti: no los escribes. Y `gofmt` deja todo el código con el MISMO formato — se acabaron las discusiones de estilo.",
    "Go uses braces `{ }` for blocks (not indentation), but the compiler inserts the `;` for you: you don't write them. And `gofmt` leaves all code in the SAME format — no more style debates.",
  ),
};

/** Capítulo 1 · Go desde cero: paquetes, funciones tipadas y tipos básicos. */
const Q_SHORT_DECL = {
  question: P("¿Qué hace `n := 5` en Go?", "What does `n := 5` do in Go?"),
  options: [
    P("Declara `n` e infiere su tipo (int) a la vez: es `:=`, la forma corta", "Declares `n` and infers its type (int) at once: it's `:=`, the short form"),
    P("Compara n con 5", "Compares n with 5"),
    P("Sólo asigna a una `n` ya declarada", "Only assigns to an already-declared `n`"),
    P("Da error: falta `var`", "Errors: `var` is missing"),
  ],
  correct: 0,
  explanation: P(
    "`:=` declara e infiere el tipo en una línea, dentro de funciones. `var n int = 5` es la forma larga. Fuera de funciones (nivel de paquete) sólo vale `var`.",
    "`:=` declares and infers the type in one line, inside functions. `var n int = 5` is the long form. Outside functions (package level) only `var` works.",
  ),
};
const Q_GO_IF = {
  question: P("¿Cómo se escribe un `if` en Go?", "How do you write an `if` in Go?"),
  options: [
    P("if x > 0 { ... }  — sin paréntesis, con llaves obligatorias", "if x > 0 { ... }  — no parentheses, braces required"),
    P("if (x > 0) then ...", "if (x > 0) then ..."),
    P("if (x > 0): ...", "if (x > 0): ..."),
    P("if x > 0 do ... end", "if x > 0 do ... end"),
  ],
  correct: 0,
  explanation: P(
    "En Go la condición va SIN paréntesis y las llaves son OBLIGATORIAS aunque haya una sola sentencia. La llave de apertura va en la misma línea (lo exige gofmt).",
    "In Go the condition has NO parentheses and the braces are REQUIRED even for a single statement. The opening brace goes on the same line (gofmt requires it).",
  ),
};

export const SYL_GO_COMMUNITY_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_FUNC_GO, Q_TYPE_AFTER, Q_PACKAGE] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_VAR_GO, Q_NO_SEMI, Q_MULTIRET] },
  c1_perro_negro: { kind: "battle", questions: [Q_EXPORTED, Q_SHORT_DECL, Q_GO_IF] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl acorrala a Frodo. Sólo la VOLUNTAD lo detiene: escribe la función que mide si resistes o sucumbes.",
      "The Nazgûl corners Frodo. Only WILL stops it: write the function that measures whether you resist or succumb.",
    ),
    challenge: {
      topic: P("Funciones y fmt.Sprintf", "Functions and fmt.Sprintf"),
      instructions: P(
        "Escribe `resistir(nombre string, tentacion int) string`:\n• si `tentacion` es 100 o más, devuelve `'{nombre} sucumbe'`,\n• si no, devuelve `'{nombre} resiste con {100 - tentacion} de voluntad'`. Usa `fmt.Sprintf`.\n\nEjemplo: `resistir(\"Frodo\", 30)` → `\"Frodo resiste con 70 de voluntad\"`.",
        "Write `resistir(nombre string, tentacion int) string`:\n• if `tentacion` is 100 or more, return `'{nombre} sucumbe'`,\n• otherwise, return `'{nombre} resiste con {100 - tentacion} de voluntad'`. Use `fmt.Sprintf`.\n\nExample: `resistir(\"Frodo\", 30)` → `\"Frodo resiste con 70 de voluntad\"`.",
      ),
      starter_code:
        'package main\n\nimport "fmt"\n\nfunc resistir(nombre string, tentacion int) string {\n}\n',
      blocks: [
        "package main",
        "import \"fmt\"",
        "func resistir(nombre string, tentacion int) string {",
        "\tif tentacion >= 100 {",
        "\t\treturn fmt.Sprintf(\"%s sucumbe\", nombre)",
        "\t}",
        "\treturn fmt.Sprintf(\"%s resiste con %d de voluntad\", nombre, 100-tentacion)",
        "}",
        "\t\treturn fmt.Sprintf(\"%s sucumbe\", tentacion)",
      ],
      hints: [
        P("Un `if` para el caso de sucumbir; el resto, resistir.", "An `if` for the succumb case; the rest, resist."),
        P('Formatea con `fmt.Sprintf("%s resiste con %d de voluntad", nombre, 100-tentacion)`.', 'Format with `fmt.Sprintf("%s resiste con %d de voluntad", nombre, 100-tentacion)`.'),
      ],
      test_cases: [
        { input: 'resistir("Frodo", 30)', expected: "Frodo resiste con 70 de voluntad", description: P("Resiste", "Resists"), raw: true },
        { input: 'resistir("Boromir", 100)', expected: "Boromir sucumbe", description: P("Sucumbe al llegar a 100", "Succumbs at 100"), raw: true },
        { input: 'resistir("Sam", 0)', expected: "Sam resiste con 100 de voluntad", description: P("Voluntad plena", "Full will"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino del Gopher", "The Gopher's Scroll"),
    lore_intro: P(
      "Entre los papeles del viejo Bilbo, un pergamino de una lengua nueva, austera y veloz, enseña a nombrar las cosas al estilo de Go.",
      "Among old Bilbo's papers, a scroll in a new tongue — austere and fast — teaches how to name things the Go way.",
    ),
    scroll: {
      topic: P(
        "Go desde cero: paquetes, funciones y tipos",
        "Go from scratch: packages, functions and types",
      ),
      sections: [
        {
          heading: P("Paquete e imports", "Package and imports"),
          body: P(
            "Todo archivo empieza por `package`. Un programa es `package main` con una función `main`. Se importa lo que se usa; un import sin usar NO compila.",
            "Every file starts with `package`. A program is `package main` with a `main` function. You import what you use; an unused import does NOT compile.",
          ),
          code:
            'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("¡Hola, Comarca!")\n}',
        },
        {
          heading: P("Funciones: el tipo va después", "Functions: the type comes after"),
          body: P(
            "`func nombre(params) retorno`. El tipo va DESPUÉS del nombre (`n int`). La mayúscula inicial marca lo exportado. Go devuelve varios valores: lo idiomático es `(valor, error)`.",
            "`func name(params) return`. The type goes AFTER the name (`n int`). An initial uppercase marks what's exported. Go returns multiple values: the idiomatic one is `(value, error)`.",
          ),
          code:
            'func saludar(nombre string) string {\n\treturn fmt.Sprintf("Hola, %s", nombre)\n}\n\nfunc dividir(a, b int) (int, error) { /* ... */ }',
        },
        {
          heading: P("Variables y tipos", "Variables and types"),
          body: P(
            "`var edad int = 50` o, dentro de funciones, la forma corta `edad := 50` (infiere el tipo). Tipos básicos: `string`, `int`, `float64`, `bool`. Sin punto y coma; `gofmt` da formato.",
            "`var edad int = 50` or, inside functions, the short form `edad := 50` (infers the type). Basic types: `string`, `int`, `float64`, `bool`. No semicolons; `gofmt` formats.",
          ),
          code:
            'var nombre string = "Frodo"\nedad := 50          // infiere int\nactivo := true      // infiere bool\naltura := 1.2       // infiere float64',
        },
      ],
      keyTakeaway: P(
        "`package` + `import` en cada archivo. `func nombre(p Tipo) Retorno`, con el tipo tras el nombre. `:=` declara e infiere dentro de funciones. Mayúscula = exportado. Sin `;`; manda gofmt.",
        "`package` + `import` in every file. `func name(p Type) Return`, with the type after the name. `:=` declares and infers inside functions. Uppercase = exported. No `;`; gofmt rules.",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing to Flee"),
    lore_intro: P(
      "Antes de partir, aprende a decir quién eres en la nueva lengua. Escribe tu primera función en Go.",
      "Before you leave, learn to say who you are in the new tongue. Write your first Go function.",
    ),
    challenge: {
      topic: P("Funciones y fmt.Sprintf", "Functions and fmt.Sprintf"),
      instructions: P(
        "Escribe la función `presentarse(nombre string) string` que devuelva, con `fmt.Sprintf`, el texto exacto:\n\n  Soy {nombre} de la Comarca\n\nEl código ya trae `package main` e `import \"fmt\"`. Por ejemplo, `presentarse(\"Frodo\")` devuelve `\"Soy Frodo de la Comarca\"`.",
        "Write the function `presentarse(nombre string) string` returning, with `fmt.Sprintf`, the exact text:\n\n  Soy {nombre} de la Comarca\n\nThe code already has `package main` and `import \"fmt\"`. For example, `presentarse(\"Frodo\")` returns `\"Soy Frodo de la Comarca\"`.",
      ),
      starter_code: 'package main\n\nimport "fmt"\n\nfunc presentarse(nombre string) string {\n}\n',
      blocks: [
        "package main",
        'import "fmt"',
        "func presentarse(nombre string) string {",
        '\treturn fmt.Sprintf("Soy %s de la Comarca", nombre)',
        "}",
        '\treturn "Soy " + nombre',
        "func presentarse(nombre int) string {",
      ],
      hints: [
        P("`fmt.Sprintf` formatea sin imprimir: `%s` inserta un string.", "`fmt.Sprintf` formats without printing: `%s` inserts a string."),
        P('`return fmt.Sprintf("Soy %s de la Comarca", nombre)`.', '`return fmt.Sprintf("Soy %s de la Comarca", nombre)`.'),
      ],
      test_cases: [
        { input: 'presentarse("Frodo")', expected: "Soy Frodo de la Comarca", description: P("El formato exacto", "The exact format"), raw: true },
        { input: 'presentarse("Sam")', expected: "Soy Sam de la Comarca", description: P("Con otro nombre", "With another name"), raw: true },
        { input: 'presentarse("Bilbo")', expected: "Soy Bilbo de la Comarca", description: P("Y con cualquier valor", "And with any value"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P(
      "Un Jinete Negro olfatea el aire. Controla tu Sigilo con enteros y comparaciones tipadas para pasar inadvertido.",
      "A Black Rider sniffs the air. Control your Stealth with typed integers and comparisons to slip by unseen.",
    ),
    challenge: {
      topic: P("int, bool y control de flujo", "int, bool and control flow"),
      instructions: P(
        "Escribe dos funciones (el `package main` ya está):\n\n• `ocultar(actual, n int) int` — suma `n` al sigilo `actual`, SIN pasar de 100. Usa un `if`.\n• `esVisible(sigilo, percepcion int) bool` — devuelve true si tu `sigilo` es MENOR que la `percepcion`.",
        "Write two functions (the `package main` is already there):\n\n• `ocultar(actual, n int) int` — adds `n` to the current stealth, WITHOUT exceeding 100. Use an `if`.\n• `esVisible(sigilo, percepcion int) bool` — returns true if your `sigilo` is LESS than `percepcion`.",
      ),
      starter_code: "package main\n\nfunc ocultar(actual, n int) int {\n}\n\nfunc esVisible(sigilo, percepcion int) bool {\n}\n",
      blocks: [
        "package main",
        "func ocultar(actual, n int) int {",
        "\tsuma := actual + n",
        "\tif suma > 100 {",
        "\t\treturn 100",
        "\t}",
        "\treturn suma",
        "}",
        "func esVisible(sigilo, percepcion int) bool {",
        "\treturn sigilo < percepcion",
        "}",
        "\treturn actual + n",
        "\treturn sigilo > percepcion",
      ],
      hints: [
        P("Suma primero y comprueba: `if suma > 100 { return 100 }`.", "Sum first and check: `if suma > 100 { return 100 }`."),
        P("`sigilo < percepcion` ya es un `bool`: devuélvelo.", "`sigilo < percepcion` is already a `bool`: return it."),
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

/** Preguntas de combate reutilizables sobre slices. */
const Q_SLICE_TYPE = {
  question: P(
    "¿Cómo se declara el tipo de un slice de strings en Go?",
    "How do you declare the type of a slice of strings in Go?",
  ),
  options: [
    P("[]string", "[]string"),
    P("string[]", "string[]"),
    P("Array<string>", "Array<string>"),
    P("slice(string)", "slice(string)"),
  ],
  correct: 0,
  explanation: P(
    "Los corchetes van DELANTE del tipo: `[]string`, `[]int`. Un slice es una vista de tamaño dinámico sobre un array; es lo que se usa el 99% del tiempo (los arrays de tamaño fijo `[3]int` son raros).",
    "The brackets go BEFORE the type: `[]string`, `[]int`. A slice is a dynamically-sized view over an array; it's what you use 99% of the time (fixed-size arrays `[3]int` are rare).",
  ),
};
const Q_APPEND = {
  question: P(
    "¿Cómo se añade un elemento a un slice `xs`?",
    "How do you add an element to a slice `xs`?",
  ),
  options: [
    P("xs = append(xs, elem)", "xs = append(xs, elem)"),
    P("xs.push(elem)", "xs.push(elem)"),
    P("xs.add(elem)", "xs.add(elem)"),
    P("xs[] = elem", "xs[] = elem"),
  ],
  correct: 0,
  explanation: P(
    "`append` devuelve un slice NUEVO (puede reubicar la memoria), por eso hay que REASIGNAR: `xs = append(xs, elem)`. Olvidar el `xs =` es el error clásico de principiante en Go.",
    "`append` returns a NEW slice (it may relocate memory), so you must REASSIGN: `xs = append(xs, elem)`. Forgetting the `xs =` is the classic beginner mistake in Go.",
  ),
};
const Q_RANGE = {
  question: P(
    "¿Qué da `for i, v := range xs` en cada vuelta?",
    "What does `for i, v := range xs` give each iteration?",
  ),
  options: [
    P("El índice `i` y el valor `v` de cada elemento", "The index `i` and the value `v` of each element"),
    P("Sólo el valor", "Only the value"),
    P("Sólo el índice", "Only the index"),
    P("Un puntero al elemento", "A pointer to the element"),
  ],
  correct: 0,
  explanation: P(
    "`range` sobre un slice da (índice, valor). Si no quieres el índice, usa `for _, v := range xs` con el guion bajo. `for i := range xs` da sólo el índice. En Go el `_` descarta lo que no usas (y lo no usado es error).",
    "`range` over a slice gives (index, value). If you don't want the index, use `for _, v := range xs` with the blank identifier. `for i := range xs` gives only the index. In Go `_` discards what you don't use (and unused vars are errors).",
  ),
};
const Q_LEN = {
  question: P(
    "¿Cómo se obtiene la longitud de un slice `xs`?",
    "How do you get the length of a slice `xs`?",
  ),
  options: [
    P("len(xs)", "len(xs)"),
    P("xs.length", "xs.length"),
    P("xs.len()", "xs.len()"),
    P("count(xs)", "count(xs)"),
  ],
  correct: 0,
  explanation: P(
    "`len` es una función incorporada (builtin): `len(xs)` para slices, arrays, strings y maps. También existe `cap(xs)` para la capacidad. No son métodos: se llaman como funciones.",
    "`len` is a builtin function: `len(xs)` for slices, arrays, strings and maps. There's also `cap(xs)` for capacity. They aren't methods: you call them as functions.",
  ),
};
const Q_MAKE = {
  question: P(
    "¿Qué crea `make([]int, 0)` frente a `var xs []int`?",
    "What does `make([]int, 0)` create versus `var xs []int`?",
  ),
  options: [
    P("Un slice VACÍO no-nil; `var xs []int` deja un slice nil", "An empty non-nil slice; `var xs []int` leaves a nil slice"),
    P("Lo mismo exactamente", "Exactly the same"),
    P("Un array de tamaño fijo", "A fixed-size array"),
    P("Un map", "A map"),
  ],
  correct: 0,
  explanation: P(
    "`make([]int, 0)` (o `[]int{}`) es un slice vacío pero no nil; `var xs []int` es nil. Para `append` da igual (funciona con nil). Pero al serializar a JSON, un slice nil sale como `null` y uno vacío como `[]` — cuidado con eso.",
    "`make([]int, 0)` (or `[]int{}`) is an empty but non-nil slice; `var xs []int` is nil. For `append` it doesn't matter (it works on nil). But when serializing to JSON, a nil slice becomes `null` and an empty one `[]` — mind that.",
  ),
};
const Q_SLICING = {
  question: P(
    "Con `xs := []int{10, 20, 30, 40}`, ¿qué es `xs[1:3]`?",
    "With `xs := []int{10, 20, 30, 40}`, what is `xs[1:3]`?",
  ),
  options: [
    P("[20 30] — del índice 1 al 3 sin incluir el 3", "[20 30] — from index 1 up to but not including 3"),
    P("[10 20 30]", "[10 20 30]"),
    P("[20 30 40]", "[20 30 40]"),
    P("[10 20]", "[10 20]"),
  ],
  correct: 0,
  explanation: P(
    "El slicing `xs[inicio:fin]` incluye `inicio` y EXCLUYE `fin`: `xs[1:3]` son los índices 1 y 2 → [20 30]. Puedes omitir extremos: `xs[:2]` (desde el principio) o `xs[2:]` (hasta el final).",
    "Slicing `xs[start:end]` includes `start` and EXCLUDES `end`: `xs[1:3]` is indices 1 and 2 → [20 30]. You can omit ends: `xs[:2]` (from the start) or `xs[2:]` (to the end).",
  ),
};

/** Capítulo 2 · Slices: []T, append, range y len. */
const Q_SLICE_INDEX = {
  question: P("Con `xs := []int{10, 20, 30}`, ¿qué es `xs[1]`?", "With `xs := []int{10, 20, 30}`, what is `xs[1]`?"),
  options: [
    P("20 (los índices empiezan en 0)", "20 (indices start at 0)"),
    P("10", "10"),
    P("30", "30"),
    P("Panic", "Panic"),
  ],
  correct: 0,
  explanation: P(
    "Los slices se indexan desde 0: `xs[0]` es 10, `xs[1]` es 20. Un índice fuera de rango SÍ provoca un panic en tiempo de ejecución (a diferencia de leer un map ausente).",
    "Slices are indexed from 0: `xs[0]` is 10, `xs[1]` is 20. An out-of-range index DOES cause a runtime panic (unlike reading a missing map key).",
  ),
};
const Q_RANGE_INDEX = {
  question: P("En `for i, v := range xs`, ¿qué son `i` y `v`?", "In `for i, v := range xs`, what are `i` and `v`?"),
  options: [
    P("`i` es el índice y `v` el valor de cada elemento", "`i` is the index and `v` the value of each element"),
    P("Ambos son el valor", "Both are the value"),
    P("`i` es el valor y `v` el índice", "`i` is the value and `v` the index"),
    P("`i` es la longitud", "`i` is the length"),
  ],
  correct: 0,
  explanation: P(
    "`range` sobre un slice da índice y valor. Si sólo quieres el valor, descarta el índice con `_`: `for _, v := range xs`. Si sólo el índice: `for i := range xs`.",
    "`range` over a slice gives index and value. If you only want the value, discard the index with `_`: `for _, v := range xs`. If only the index: `for i := range xs`.",
  ),
};
const Q_NIL_SLICE = {
  question: P("¿Qué valor tiene un slice sin inicializar, `var xs []int`?", "What value does an uninitialized slice have, `var xs []int`?"),
  options: [
    P("nil, pero se le puede hacer `append` y `len` sin problema (da 0)", "nil, but you can `append` and `len` it fine (gives 0)"),
    P("Un array vacío que no admite append", "An empty array that can't be appended to"),
    P("Panic al usarlo", "Panic when used"),
    P("[]int{} exactamente", "Exactly []int{}"),
  ],
  correct: 0,
  explanation: P(
    "Un slice nil es utilizable: `len(xs)` es 0 y `append(xs, 1)` funciona (crea el respaldo). Por eso muchas funciones empiezan con `var r []T` en vez de `[]T{}`.",
    "A nil slice is usable: `len(xs)` is 0 and `append(xs, 1)` works (creates the backing array). That's why many functions start with `var r []T` instead of `[]T{}`.",
  ),
};

export const SYL_GO_COMMUNITY_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_SLICE_TYPE, Q_APPEND, Q_LEN] },
  c2_niebla: { kind: "battle", questions: [Q_RANGE, Q_SLICING, Q_MAKE] },
  c2_sauce: { kind: "battle", questions: [Q_SLICE_INDEX, Q_RANGE_INDEX, Q_NIL_SLICE] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza su horda. Recorre el slice y quédate sólo con los golpes que de verdad hieren: range + append.",
      "The Barrow-wight raises its horde. Walk the slice and keep only the blows that truly harm: range + append.",
    ),
    challenge: {
      topic: P("Slices, range y append", "Slices, range and append"),
      instructions: P(
        "Escribe `filtrarFuertes(danios []int, minimo int) []int` que devuelva un slice NUEVO con los daños MAYORES O IGUALES que `minimo`. Empieza en `[]int{}` y usa `range` + `append`.\n\nEjemplo: `filtrarFuertes([]int{3, 7, 2, 9}, 5)` → `[7, 9]`.",
        "Write `filtrarFuertes(danios []int, minimo int) []int` returning a NEW slice with the damages GREATER THAN OR EQUAL to `minimo`. Start at `[]int{}` and use `range` + `append`.\n\nExample: `filtrarFuertes([]int{3, 7, 2, 9}, 5)` → `[7, 9]`.",
      ),
      starter_code:
        "package main\n\nfunc filtrarFuertes(danios []int, minimo int) []int {\n}\n",
      blocks: [
        "package main",
        "func filtrarFuertes(danios []int, minimo int) []int {",
        "\tr := []int{}",
        "\tfor _, d := range danios {",
        "\t\tif d >= minimo {",
        "\t\t\tr = append(r, d)",
        "\t\t}",
        "\t}",
        "\treturn r",
        "}",
        "\t\tif d > minimo {",
      ],
      hints: [
        P("Empieza con `r := []int{}` y recórrelos con `for _, d := range danios`.", "Start with `r := []int{}` and iterate with `for _, d := range danios`."),
        P("`if d >= minimo { r = append(r, d) }`.", "`if d >= minimo { r = append(r, d) }`."),
      ],
      test_cases: [
        { input: "filtrarFuertes([]int{3, 7, 2, 9}, 5)", expected: [7, 9], description: P("Sólo los fuertes", "Only the strong ones"), raw: true },
        { input: "filtrarFuertes([]int{1, 2}, 5)", expected: [], description: P("Ninguno llega", "None reaches it"), raw: true },
        { input: "filtrarFuertes([]int{5, 6}, 5)", expected: [5, 6], description: P("El 5 entra (>=)", "5 counts (>=)"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino de las Listas", "The Scroll of Lists"),
    lore_intro: P(
      "En un claro del Bosque Viejo, un pergamino enseña a manejar MUCHAS cosas a la vez: los slices de Go.",
      "In a clearing of the Old Forest, a scroll teaches how to handle MANY things at once: Go's slices.",
    ),
    scroll: {
      topic: P("Slices: []T, append, range y len", "Slices: []T, append, range and len"),
      sections: [
        {
          heading: P("Declarar y recorrer", "Declare and iterate"),
          body: P(
            "`[]T` es un slice (lista dinámica). Se recorre con `range`, que da índice y valor; usa `_` para descartar el que no necesites. `len(xs)` da la longitud.",
            "`[]T` is a slice (dynamic list). Iterate with `range`, which gives index and value; use `_` to discard the one you don't need. `len(xs)` gives the length.",
          ),
          code:
            'nombres := []string{"Frodo", "Sam"}\nfor _, n := range nombres {\n\tfmt.Println(n)\n}\nfmt.Println(len(nombres)) // 2',
        },
        {
          heading: P("append: crece reasignando", "append: grows by reassigning"),
          body: P(
            "`append` devuelve un slice nuevo, así que hay que REASIGNAR: `xs = append(xs, v)`. Empieza con `[]T{}` (vacío no-nil) para acumular; un slice nil serializa a `null` y uno vacío a `[]`.",
            "`append` returns a new slice, so you must REASSIGN: `xs = append(xs, v)`. Start with `[]T{}` (empty non-nil) to accumulate; a nil slice serializes to `null` and an empty one to `[]`.",
          ),
          code:
            'out := []string{}\nfor _, n := range nombres {\n\tout = append(out, n+"!")\n}',
        },
        {
          heading: P("Slicing", "Slicing"),
          body: P(
            "`xs[inicio:fin]` toma un sub-slice: incluye `inicio`, excluye `fin`. `xs[:2]` desde el principio; `xs[2:]` hasta el final. No copia: comparte memoria con el original.",
            "`xs[start:end]` takes a sub-slice: includes `start`, excludes `end`. `xs[:2]` from the start; `xs[2:]` to the end. It doesn't copy: it shares memory with the original.",
          ),
          code:
            "xs := []int{10, 20, 30, 40}\nxs[1:3] // [20 30]\nxs[:2]  // [10 20]\nxs[2:]  // [30 40]",
        },
      ],
      keyTakeaway: P(
        "`[]T` para listas; recorre con `range` (índice, valor; `_` descarta); crece con `xs = append(xs, v)` (¡reasigna!); mide con `len`; corta con `xs[a:b]` (excluye b). Empieza en `[]T{}` para no acabar en nil.",
        "`[]T` for lists; iterate with `range` (index, value; `_` discards); grow with `xs = append(xs, v)` (reassign!); measure with `len`; cut with `xs[a:b]` (excludes b). Start at `[]T{}` to avoid ending up nil.",
      ),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre Sauce", "Old Man Willow"),
    lore_intro: P(
      "Las raíces del Sauce atrapan a los hobbits uno a uno. Recorre el slice de nombres y devuelve otro.",
      "The Willow's roots snare the hobbits one by one. Iterate the slice of names and return another.",
    ),
    challenge: {
      topic: P("Slices, range y append", "Slices, range and append"),
      instructions: P(
        'Escribe `atrapar(nombres []string) []string` que devuelva un slice NUEVO con cada nombre seguido de " queda atrapado". Empieza con `[]string{}` y usa `range` + `append`.\n\nEjemplo: `atrapar([]string{"Merry"})` → `["Merry queda atrapado"]`.',
        'Write `atrapar(nombres []string) []string` returning a NEW slice with each name followed by " queda atrapado". Start with `[]string{}` and use `range` + `append`.\n\nExample: `atrapar([]string{"Merry"})` → `["Merry queda atrapado"]`.',
      ),
      starter_code: 'package main\n\nfunc atrapar(nombres []string) []string {\n\tresultado := []string{}\n\treturn resultado\n}\n',
      blocks: [
        "package main",
        "func atrapar(nombres []string) []string {",
        "\tresultado := []string{}",
        "\tfor _, n := range nombres {",
        '\t\tresultado = append(resultado, n+" queda atrapado")',
        "\t}",
        "\treturn resultado",
        "}",
        "\t\tresultado = append(resultado, n)",
        "\tfor n := range nombres {",
      ],
      hints: [
        P("`for _, n := range nombres { ... }` recorre los valores.", "`for _, n := range nombres { ... }` iterates the values."),
        P('Acumula: `resultado = append(resultado, n+" queda atrapado")`.', 'Accumulate: `resultado = append(resultado, n+" queda atrapado")`.'),
      ],
      test_cases: [
        { input: 'atrapar([]string{"Merry", "Pippin"})', expected: ["Merry queda atrapado", "Pippin queda atrapado"], description: P("Cada nombre atrapado", "Each name snared"), raw: true },
        { input: "atrapar([]string{})", expected: [], description: P("Slice vacío", "Empty slice"), raw: true },
        { input: 'atrapar([]string{"Frodo"})', expected: ["Frodo queda atrapado"], description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Túmulo del Espectro", "The Wight's Barrow"),
    lore_intro: P(
      "El Tumulario drena la vida de cada hobbit. Aplica el drenaje a todo el slice de vidas, sin bajar de 0.",
      "The Barrow-wight drains the life of each hobbit. Apply the drain to the whole slice of lives, never below 0.",
    ),
    challenge: {
      topic: P("Slices de int y control de flujo", "Int slices and control flow"),
      instructions: P(
        "Escribe `drenarVarios(vidas []int, drenaje int) []int` que reste `drenaje` a cada vida, sin bajar nunca de 0. Empieza en `[]int{}`.\n\nEjemplo: `drenarVarios([]int{100, 20, 5}, 30)` → `[70, 0, 0]`.",
        "Write `drenarVarios(vidas []int, drenaje int) []int` subtracting `drenaje` from each life, never below 0. Start at `[]int{}`.\n\nExample: `drenarVarios([]int{100, 20, 5}, 30)` → `[70, 0, 0]`.",
      ),
      starter_code: "package main\n\nfunc drenarVarios(vidas []int, drenaje int) []int {\n\tresultado := []int{}\n\treturn resultado\n}\n",
      blocks: [
        "package main",
        "func drenarVarios(vidas []int, drenaje int) []int {",
        "\tresultado := []int{}",
        "\tfor _, v := range vidas {",
        "\t\tx := v - drenaje",
        "\t\tif x < 0 {",
        "\t\t\tx = 0",
        "\t\t}",
        "\t\tresultado = append(resultado, x)",
        "\t}",
        "\treturn resultado",
        "}",
        "\t\tx := v + drenaje",
        "\t\tif x > 0 {",
      ],
      hints: [
        P("Por cada vida: `x := v - drenaje; if x < 0 { x = 0 }`.", "For each life: `x := v - drenaje; if x < 0 { x = 0 }`."),
        P("`resultado = append(resultado, x)`.", "`resultado = append(resultado, x)`."),
      ],
      test_cases: [
        { input: "drenarVarios([]int{100, 20, 5}, 30)", expected: [70, 0, 0], description: P("Resta acotada a 0", "Subtraction clamped at 0"), raw: true },
        { input: "drenarVarios([]int{50}, 10)", expected: [40], description: P("Una sola vida", "A single life"), raw: true },
        { input: "drenarVarios([]int{}, 10)", expected: [], description: P("Sin vidas", "No lives"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Tom Bombadil", "Tom Bombadil's Song"),
    lore_intro: P(
      "El canto de Tom rompe el hechizo. Resume los versos: cuántos son y el canto entero unido.",
      "Tom's song breaks the spell. Summarize the verses: how many there are and the whole song joined.",
    ),
    challenge: {
      topic: P("len, strings.Join y fmt.Sprintf", "len, strings.Join and fmt.Sprintf"),
      instructions: P(
        'Escribe `resumen(versos []string) string` que devuelva "{n}: {canto}", donde `n` es cuántos versos hay y `canto` son todos unidos por un espacio (con `strings.Join`).\n\nEjemplo: `resumen([]string{"ho", "hey"})` → `"2: ho hey"`.',
        'Write `resumen(versos []string) string` returning "{n}: {song}", where `n` is how many verses there are and `song` is all of them joined by a space (with `strings.Join`).\n\nExample: `resumen([]string{"ho", "hey"})` → `"2: ho hey"`.',
      ),
      starter_code: 'package main\n\nimport (\n\t"fmt"\n\t"strings"\n)\n\nfunc resumen(versos []string) string {\n}\n',
      blocks: [
        "package main",
        'import (\n\t"fmt"\n\t"strings"\n)',
        "func resumen(versos []string) string {",
        '\treturn fmt.Sprintf("%d: %s", len(versos), strings.Join(versos, " "))',
        "}",
        '\treturn strings.Join(versos, " ")',
        '\treturn fmt.Sprintf("%s: %d", strings.Join(versos, " "), len(versos))',
      ],
      hints: [
        P("`len(versos)` cuenta; `strings.Join(versos, \" \")` une.", "`len(versos)` counts; `strings.Join(versos, \" \")` joins."),
        P('`return fmt.Sprintf("%d: %s", len(versos), strings.Join(versos, " "))`.', '`return fmt.Sprintf("%d: %s", len(versos), strings.Join(versos, " "))`.'),
      ],
      test_cases: [
        { input: 'resumen([]string{"ho", "hey"})', expected: "2: ho hey", description: P("Cantidad y canto", "Count and song"), raw: true },
        { input: "resumen([]string{})", expected: "0: ", description: P("Sin versos", "No verses"), raw: true },
        { input: 'resumen([]string{"solo"})', expected: "1: solo", description: P("Un verso", "One verse"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre funciones en Go. */
const Q_VARIADIC = {
  question: P(
    "¿Qué significa `func sumar(nums ...int) int`?",
    "What does `func sumar(nums ...int) int` mean?",
  ),
  options: [
    P("Recibe un número VARIABLE de int; dentro, `nums` es un []int", "Takes a VARIABLE number of ints; inside, `nums` is a []int"),
    P("Recibe exactamente tres int", "Takes exactly three ints"),
    P("Recibe un puntero a int", "Takes a pointer to int"),
    P("Es un error de sintaxis", "It's a syntax error"),
  ],
  correct: 0,
  explanation: P(
    "Los `...int` hacen la función variádica: `sumar(1,2,3)` o `sumar()` valen, y dentro `nums` es un slice `[]int` que recorres con `range`. Sólo el ÚLTIMO parámetro puede ser variádico.",
    "The `...int` makes the function variadic: `sumar(1,2,3)` or `sumar()` both work, and inside `nums` is a slice `[]int` you range over. Only the LAST parameter can be variadic.",
  ),
};
const Q_HOF_GO = {
  question: P(
    "¿Puede una función de Go recibir otra función como parámetro?",
    "Can a Go function take another function as a parameter?",
  ),
  options: [
    P("Sí: las funciones son valores de primera clase, p. ej. `fn func(int) int`", "Yes: functions are first-class values, e.g. `fn func(int) int`"),
    P("No: Go no tiene funciones de orden superior", "No: Go has no higher-order functions"),
    P("Sólo si se declara con `interface`", "Only if declared with `interface`"),
    P("Sólo funciones sin retorno", "Only functions with no return"),
  ],
  correct: 0,
  explanation: P(
    "En Go una función es un valor: puedes guardarla en una variable, pasarla como argumento (`fn func(int) int`) y devolverla. El tipo describe su firma. Es la base de callbacks y del estilo funcional.",
    "In Go a function is a value: you can store it in a variable, pass it as an argument (`fn func(int) int`) and return it. The type describes its signature. It's the basis of callbacks and functional style.",
  ),
};
const Q_CLOSURE_GO = {
  question: P(
    "Una función devuelve otra función que usa una variable local del padre. ¿Qué es?",
    "A function returns another function that uses a local variable of the parent. What is that?",
  ),
  options: [
    P("Una clausura (closure): la función interior recuerda ese estado", "A closure: the inner function remembers that state"),
    P("Una variable global", "A global variable"),
    P("Un puntero colgante", "A dangling pointer"),
    P("Un error de compilación", "A compile error"),
  ],
  correct: 0,
  explanation: P(
    "Una clausura captura las variables de su entorno y las mantiene vivas mientras exista. `func crearContador() func() int { n := 0; return func() int { n++; return n } }` devuelve funciones que recuerdan su propio `n`.",
    "A closure captures the variables of its environment and keeps them alive as long as it exists. `func crearContador() func() int { n := 0; return func() int { n++; return n } }` returns functions that remember their own `n`.",
  ),
};
const Q_NAMEDRET = {
  question: P(
    "¿Qué hace `func f() (total int) { total = 5; return }`?",
    "What does `func f() (total int) { total = 5; return }` do?",
  ),
  options: [
    P("Devuelve 5: `total` es un retorno con NOMBRE, y `return` a secas lo devuelve", "Returns 5: `total` is a NAMED return, and a bare `return` returns it"),
    P("Da error: falta el valor en `return`", "Errors: the `return` is missing a value"),
    P("Devuelve 0 siempre", "Always returns 0"),
    P("Devuelve un puntero", "Returns a pointer"),
  ],
  correct: 0,
  explanation: P(
    "Los retornos con nombre declaran la variable de salida en la firma. Un `return` desnudo devuelve sus valores actuales. Útil para claridad, pero con moderación: en exceso confunden.",
    "Named returns declare the output variable in the signature. A bare `return` returns their current values. Handy for clarity, but use sparingly: overused they confuse.",
  ),
};

/** Capítulo 3 · Funciones: variádicas, orden superior y clausuras. */
const Q_FUNC_VALUE = {
  question: P("¿Se puede guardar una función en una variable en Go?", "Can you store a function in a variable in Go?"),
  options: [
    P("Sí: las funciones son valores. `f := suma; f(2, 3)`", "Yes: functions are values. `f := suma; f(2, 3)`"),
    P("No: sólo se pueden llamar por su nombre", "No: they can only be called by name"),
    P("Sólo si son métodos", "Only if they're methods"),
    P("Sólo con punteros", "Only with pointers"),
  ],
  correct: 0,
  explanation: P(
    "En Go una función es un valor de primera clase: puedes asignarla (`f := suma`), pasarla como argumento y devolverla. El tipo de `f` sería `func(int, int) int`.",
    "In Go a function is a first-class value: you can assign it (`f := suma`), pass it as an argument and return it. The type of `f` would be `func(int, int) int`.",
  ),
};
const Q_FUNC_LITERAL = {
  question: P("¿Qué es `func(x int) int { return x * 2 }` sin nombre?", "What is `func(x int) int { return x * 2 }` with no name?"),
  options: [
    P("Una función literal (anónima): se usa o se pasa al momento", "A function literal (anonymous): used or passed on the spot"),
    P("Un error: toda función necesita nombre", "An error: every function needs a name"),
    P("Una declaración de tipo", "A type declaration"),
    P("Un método", "A method"),
  ],
  correct: 0,
  explanation: P(
    "Una función literal no tiene nombre; se asigna a una variable, se pasa como argumento o se invoca en el sitio. Si captura variables de su entorno, se convierte en una clausura.",
    "A function literal has no name; you assign it to a variable, pass it as an argument or invoke it on the spot. If it captures variables from its environment, it becomes a closure.",
  ),
};
const Q_DEFER = {
  question: P("¿Qué hace `defer f()` dentro de una función?", "What does `defer f()` do inside a function?"),
  options: [
    P("Aplaza la llamada a `f()` hasta que la función que la contiene termine", "Postpones the call to `f()` until the enclosing function returns"),
    P("Ejecuta f() en otra goroutine", "Runs f() in another goroutine"),
    P("Cancela la llamada a f()", "Cancels the call to f()"),
    P("Llama a f() de inmediato", "Calls f() immediately"),
  ],
  correct: 0,
  explanation: P(
    "`defer` retrasa la ejecución hasta el retorno de la función, pase lo que pase. Se usa para limpiar recursos (cerrar un fichero) justo al lado de donde se abren. Los defer se ejecutan en orden inverso.",
    "`defer` delays execution until the function returns, no matter what. It's used to clean up resources (close a file) right next to where they open. Deferred calls run in reverse order.",
  ),
};
const Q_BLANK_RET = {
  question: P("Con retornos nombrados `func f() (total int)`, ¿qué devuelve un `return` a secas?", "With named returns `func f() (total int)`, what does a bare `return` return?"),
  options: [
    P("El valor actual de `total`", "The current value of `total`"),
    P("0 siempre", "Always 0"),
    P("nil", "nil"),
    P("Da error de compilación", "A compile error"),
  ],
  correct: 0,
  explanation: P(
    "Con retornos nombrados, un `return` desnudo devuelve los valores actuales de esas variables. Útil para claridad, pero en exceso confunde: úsalo con moderación.",
    "With named returns, a bare `return` returns the current values of those variables. Handy for clarity, but overused it confuses: use it sparingly.",
  ),
};

export const SYL_GO_COMMUNITY_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_VARIADIC, Q_MULTIRET, Q_HOF_GO] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_CLOSURE_GO, Q_NAMEDRET, Q_FUNC_VALUE] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_FUNC_LITERAL, Q_DEFER, Q_BLANK_RET] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "«Ningún hombre vivo puede detenerme.» Forja una cuenta que RECUERDE cada golpe: una función que devuelve otra con memoria — una clausura.",
      "\"No living man can hinder me.\" Forge a tally that REMEMBERS each blow: a function that returns another with memory — a closure.",
    ),
    challenge: {
      topic: P("Clausuras (closures)", "Closures"),
      instructions: P(
        "Escribe `crearCuenta(inicio int) func() int` que DEVUELVA una función. Cada vez que se llame a esa función, incrementa en 1 el valor (que empieza en `inicio`) y lo devuelve.\n\nEjemplo: `crearCuenta(10)()` → `11`.",
        "Write `crearCuenta(inicio int) func() int` that RETURNS a function. Each time that function is called, it increments the value (starting at `inicio`) by 1 and returns it.\n\nExample: `crearCuenta(10)()` → `11`.",
      ),
      starter_code:
        "package main\n\nfunc crearCuenta(inicio int) func() int {\n}\n",
      blocks: [
        "package main",
        "func crearCuenta(inicio int) func() int {",
        "\tn := inicio",
        "\treturn func() int {",
        "\t\tn++",
        "\t\treturn n",
        "\t}",
        "}",
        "\t\treturn n",
      ],
      hints: [
        P("Guarda el estado en una variable local y devuelve una función que la usa.", "Keep the state in a local variable and return a function that uses it."),
        P("`n := inicio; return func() int { n++; return n }`.", "`n := inicio; return func() int { n++; return n }`."),
      ],
      test_cases: [
        { input: "crearCuenta(10)()", expected: 11, description: P("Desde 10, una llamada: 11", "From 10, one call: 11"), raw: true },
        { input: "crearCuenta(0)()", expected: 1, description: P("Desde 0: 1", "From 0: 1"), raw: true },
        { input: "crearCuenta(100)()", expected: 101, description: P("Con otro inicio", "With another start"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de los Montaraces", "The Rangers' Scroll"),
    lore_intro: P(
      "En el Póney Pisador, un pergamino enseña a tratar las funciones como lo que son en Go: valores. Variádicas, de orden superior y clausuras.",
      "At the Prancing Pony, a scroll teaches you to treat functions as what they are in Go: values. Variadic, higher-order and closures.",
    ),
    scroll: {
      topic: P("Funciones: variádicas, orden superior y clausuras", "Functions: variadic, higher-order and closures"),
      sections: [
        {
          heading: P("Variádicas y retornos múltiples", "Variadic and multiple returns"),
          body: P(
            "`...int` acepta un número variable de argumentos (dentro es un `[]int`). Y una función puede devolver varios valores: el patrón `(valor, error)` es el ADN de Go.",
            "`...int` accepts a variable number of arguments (inside it's a `[]int`). And a function can return several values: the `(value, error)` pattern is Go's DNA.",
          ),
          code: "func sumar(nums ...int) int {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\nfunc dividir(a, b int) (int, int) {\n\treturn a / b, a % b // cociente y resto\n}",
        },
        {
          heading: P("Funciones de orden superior", "Higher-order functions"),
          body: P(
            "Una función es un valor: puedes pasarla como parámetro (`fn func(int) int`) o devolverla. Así se construyen callbacks y piezas reutilizables.",
            "A function is a value: you can pass it as a parameter (`fn func(int) int`) or return it. That's how callbacks and reusable pieces are built.",
          ),
          code: "func aplicarDoble(fn func(int) int, x int) int {\n\treturn fn(fn(x)) // llama fn dos veces\n}\naplicarDoble(func(n int) int { return n + 1 }, 5) // 7",
        },
        {
          heading: P("Clausuras: funciones que recuerdan", "Closures: functions that remember"),
          body: P(
            "Una función literal captura las variables de su entorno. La función devuelta las conserva vivas: eso es una clausura.",
            "A function literal captures the variables of its environment. The returned function keeps them alive: that's a closure.",
          ),
          code: "func crearGolpe(danio int) func() int {\n\treturn func() int { return danio } // recuerda danio\n}\ngolpe := crearGolpe(20)\ngolpe() // 20",
        },
      ],
      keyTakeaway: P(
        "En Go las funciones son valores: variádicas con `...T`, retornos múltiples con `(A, B)`, y clausuras que capturan su entorno. Pásalas y devuélvelas como cualquier dato.",
        "In Go functions are values: variadic with `...T`, multiple returns with `(A, B)`, and closures that capture their environment. Pass and return them like any data.",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("Trancos, el Montaraz", "Strider the Ranger"),
    lore_intro: P(
      "Un montaraz reúne la fuerza de cuantos viajeros haya, sean los que sean. Escribe una función variádica.",
      "A ranger gathers the strength of however many travelers there are. Write a variadic function.",
    ),
    challenge: {
      topic: P("Funciones variádicas (...int)", "Variadic functions (...int)"),
      instructions: P(
        "Escribe `sumarFuerzas(fuerzas ...int) int` que sume TODAS las fuerzas recibidas, sean cuantas sean. Con cero argumentos, devuelve 0.\n\nEjemplo: `sumarFuerzas(3, 5, 2)` → `10`.",
        "Write `sumarFuerzas(fuerzas ...int) int` that sums ALL the strengths received, however many. With zero arguments, return 0.\n\nExample: `sumarFuerzas(3, 5, 2)` → `10`.",
      ),
      starter_code: "package main\n\nfunc sumarFuerzas(fuerzas ...int) int {\n}\n",
      blocks: [
        "package main",
        "func sumarFuerzas(fuerzas ...int) int {",
        "\ttotal := 0",
        "\tfor _, f := range fuerzas {",
        "\t\ttotal += f",
        "\t}",
        "\treturn total",
        "}",
        "\t\ttotal = f",
      ],
      hints: [
        P("`fuerzas` es un `[]int`: recórrelo con `for _, f := range fuerzas`.", "`fuerzas` is a `[]int`: range over it with `for _, f := range fuerzas`."),
        P("Acumula en una variable que empiece en 0 y devuélvela.", "Accumulate in a variable starting at 0 and return it."),
      ],
      test_cases: [
        { input: "sumarFuerzas(3, 5, 2)", expected: 10, description: P("Varios argumentos", "Several arguments"), raw: true },
        { input: "sumarFuerzas()", expected: 0, description: P("Ninguno: 0", "None: 0"), raw: true },
        { input: "sumarFuerzas(7)", expected: 7, description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas de los Túmulos", "The Barrow-blades"),
    lore_intro: P(
      "Una hoja encantada aplica su filo dos veces. En Go, una función puede recibir otra y usarla.",
      "An enchanted blade applies its edge twice. In Go, a function can take another and use it.",
    ),
    challenge: {
      topic: P("Funciones de orden superior", "Higher-order functions"),
      instructions: P(
        "Escribe `aplicarDoble(fn func(int) int, x int) int` que llame a `fn` DOS veces sobre `x` y devuelva el resultado: `fn(fn(x))`.\n\nEjemplo: `aplicarDoble(func(n int) int { return n + 1 }, 5)` → `7`.",
        "Write `aplicarDoble(fn func(int) int, x int) int` that calls `fn` TWICE on `x` and returns the result: `fn(fn(x))`.\n\nExample: `aplicarDoble(func(n int) int { return n + 1 }, 5)` → `7`.",
      ),
      starter_code: "package main\n\nfunc aplicarDoble(fn func(int) int, x int) int {\n}\n",
      blocks: [
        "package main",
        "func aplicarDoble(fn func(int) int, x int) int {",
        "\treturn fn(fn(x))",
        "}",
        "\treturn fn(x)",
      ],
      hints: [
        P("`fn` es una función: la llamas con paréntesis, `fn(x)`.", "`fn` is a function: call it with parentheses, `fn(x)`."),
        P("`return fn(fn(x))`: el resultado de la primera llamada entra en la segunda.", "`return fn(fn(x))`: the first call's result feeds the second."),
      ],
      test_cases: [
        { input: "aplicarDoble(func(n int) int { return n + 1 }, 5)", expected: 7, description: P("+1 dos veces", "+1 twice"), raw: true },
        { input: "aplicarDoble(func(n int) int { return n * 2 }, 3)", expected: 12, description: P("×2 dos veces", "×2 twice"), raw: true },
        { input: "aplicarDoble(func(n int) int { return n }, 9)", expected: 9, description: P("Identidad", "Identity"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P(
      "Forja un arma que recuerde su daño. Una función puede DEVOLVER otra función que lo conserva: una clausura.",
      "Forge a weapon that remembers its damage. A function can RETURN another function that keeps it: a closure.",
    ),
    challenge: {
      topic: P("Clausuras (closures)", "Closures"),
      instructions: P(
        "Escribe `crearGolpe(danio int) func() int` que DEVUELVA una función. Esa función, al llamarla sin argumentos, devuelve el `danio` con el que se creó.\n\nEjemplo: `crearGolpe(20)()` → `20`.",
        "Write `crearGolpe(danio int) func() int` that RETURNS a function. That function, called with no arguments, returns the `danio` it was created with.\n\nExample: `crearGolpe(20)()` → `20`.",
      ),
      starter_code: "package main\n\nfunc crearGolpe(danio int) func() int {\n}\n",
      blocks: [
        "package main",
        "func crearGolpe(danio int) func() int {",
        "\treturn func() int {",
        "\t\treturn danio",
        "\t}",
        "}",
        "\treturn danio",
      ],
      hints: [
        P("Devuelve una función literal: `return func() int { ... }`.", "Return a function literal: `return func() int { ... }`."),
        P("La función interior recuerda `danio` (clausura): `return func() int { return danio }`.", "The inner function remembers `danio` (closure): `return func() int { return danio }`."),
      ],
      test_cases: [
        { input: "crearGolpe(20)()", expected: 20, description: P("Recuerda su daño", "Remembers its damage"), raw: true },
        { input: "crearGolpe(7)()", expected: 7, description: P("Con otro valor", "With another value"), raw: true },
        { input: "crearGolpe(0)()", expected: 0, description: P("También cero", "Zero too"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre maps y constantes. */
const Q_MAP_TYPE = {
  question: P(
    "¿Cómo se declara en Go un diccionario de string a int?",
    "How do you declare in Go a dictionary from string to int?",
  ),
  options: [
    P("map[string]int", "map[string]int"),
    P("dict<string, int>", "dict<string, int>"),
    P("map<string, int>", "map<string, int>"),
    P("[string]int", "[string]int"),
  ],
  correct: 0,
  explanation: P(
    "Un map se escribe `map[Clave]Valor`: `map[string]int`. Se crea con `map[string]int{}` o `make(map[string]int)`. Acceder a una clave que no existe devuelve el valor cero del tipo (0 para int), nunca un error.",
    "A map is written `map[Key]Value`: `map[string]int`. Create it with `map[string]int{}` or `make(map[string]int)`. Accessing a missing key returns the type's zero value (0 for int), never an error.",
  ),
};
const Q_MAP_COMMAOK = {
  question: P(
    "¿Qué hace `v, ok := m[\"clave\"]` en un map?",
    "What does `v, ok := m[\"key\"]` do on a map?",
  ),
  options: [
    P("`v` es el valor (o el cero) y `ok` es un bool: si la clave existía", "`v` is the value (or the zero) and `ok` is a bool: whether the key existed"),
    P("Lanza un error si la clave falta", "Throws an error if the key is missing"),
    P("`ok` es la clave siguiente", "`ok` is the next key"),
    P("Borra la clave", "Deletes the key"),
  ],
  correct: 0,
  explanation: P(
    "La forma «comma, ok» distingue «la clave vale 0» de «la clave no está»: `v, ok := m[k]`. Si `ok` es false, la clave no existía. Es la manera idiomática de comprobar presencia en un map.",
    "The \"comma, ok\" form tells apart \"the key is 0\" from \"the key isn't there\": `v, ok := m[k]`. If `ok` is false, the key wasn't present. It's the idiomatic way to check for presence in a map.",
  ),
};
const Q_MAP_RANGE = {
  question: P(
    "`for k, v := range m` sobre un map, ¿en qué orden recorre las claves?",
    "`for k, v := range m` over a map iterates the keys in what order?",
  ),
  options: [
    P("En orden ALEATORIO: los maps de Go no garantizan orden", "In RANDOM order: Go maps guarantee no order"),
    P("Alfabético", "Alphabetical"),
    P("El de inserción", "Insertion order"),
    P("El inverso al de inserción", "Reverse insertion order"),
  ],
  correct: 0,
  explanation: P(
    "El recorrido de un map es deliberadamente aleatorio en Go: no dependas del orden. Si necesitas un orden, extrae las claves a un slice y ordénalo con `sort.Strings`.",
    "Map iteration is deliberately randomized in Go: don't rely on the order. If you need one, pull the keys into a slice and sort it with `sort.Strings`.",
  ),
};
const Q_CONST = {
  question: P(
    "¿Qué distingue a una `const` de una variable en Go?",
    "What sets a `const` apart from a variable in Go?",
  ),
  options: [
    P("Su valor se fija en compilación y no puede cambiar", "Its value is fixed at compile time and cannot change"),
    P("Ocupa más memoria", "It uses more memory"),
    P("Sólo existe dentro de funciones", "It only exists inside functions"),
    P("Se declara con `let`", "It's declared with `let`"),
  ],
  correct: 0,
  explanation: P(
    "Una `const` es un valor inmutable conocido en compilación: `const VelocidadMaxima = 120`. No se le puede asignar en ejecución. Sirve para números mágicos con nombre y para los enums con `iota`.",
    "A `const` is an immutable value known at compile time: `const VelocidadMaxima = 120`. You can't assign to it at runtime. It's used for named magic numbers and for `iota` enums.",
  ),
};
const Q_IOTA = {
  question: P(
    "En `const ( A = iota; B; C )`, ¿qué valores toman A, B y C?",
    "In `const ( A = iota; B; C )`, what values do A, B and C take?",
  ),
  options: [
    P("0, 1 y 2: iota se autoincrementa por línea", "0, 1 and 2: iota auto-increments per line"),
    P("1, 2 y 3", "1, 2 and 3"),
    P("Los tres valen 0", "All three are 0"),
    P("iota, iota+1, iota+2 sin evaluar", "iota, iota+1, iota+2 unevaluated"),
  ],
  correct: 0,
  explanation: P(
    "`iota` empieza en 0 en cada bloque `const` y sube de 1 en 1 por cada línea. `B` y `C` heredan la expresión `= iota`, así que valen 1 y 2. Es la forma idiomática de crear enumeraciones en Go.",
    "`iota` starts at 0 in each `const` block and increases by 1 per line. `B` and `C` inherit the `= iota` expression, so they're 1 and 2. It's the idiomatic way to build enumerations in Go.",
  ),
};

/** Capítulo 4 · Maps y constantes (iota). */
const Q_MAP_MAKE = {
  question: P("¿Qué diferencia hay entre `map[string]int{}` y `make(map[string]int)`?", "What's the difference between `map[string]int{}` and `make(map[string]int)`?"),
  options: [
    P("Ninguna práctica: ambos crean un map vacío y USABLE", "None in practice: both create an empty, USABLE map"),
    P("make crea uno nil", "make creates a nil one"),
    P("El literal no admite claves", "The literal can't take keys"),
    P("make es sólo para slices", "make is only for slices"),
  ],
  correct: 0,
  explanation: P(
    "Ambos crean un map listo para usar. Lo importante: un `var m map[string]int` (SIN inicializar) es nil y escribir en él provoca panic. Siempre inicializa el map antes de asignar claves.",
    "Both create a ready-to-use map. The key point: a `var m map[string]int` (UNINITIALIZED) is nil and writing to it panics. Always initialize the map before assigning keys.",
  ),
};
const Q_MAP_DELETE = {
  question: P("¿Cómo se borra una clave de un map?", "How do you delete a key from a map?"),
  options: [
    P("delete(m, clave)", "delete(m, clave)"),
    P("m.delete(clave)", "m.delete(clave)"),
    P("remove(m, clave)", "remove(m, clave)"),
    P("m[clave] = nil", "m[clave] = nil"),
  ],
  correct: 0,
  explanation: P(
    "`delete(m, clave)` es una función incorporada: quita la entrada. Si la clave no existe, no hace nada (no da error). `m[clave] = 0` NO la borra: la deja con valor 0.",
    "`delete(m, clave)` is a built-in function: it removes the entry. If the key doesn't exist, it does nothing (no error). `m[clave] = 0` does NOT delete it: it leaves it with value 0.",
  ),
};
const Q_CONST_BLOCK = {
  question: P("¿Se puede reasignar una `const` en Go en tiempo de ejecución?", "Can you reassign a `const` in Go at runtime?"),
  options: [
    P("No: su valor se fija en compilación y es inmutable", "No: its value is fixed at compile time and immutable"),
    P("Sí, con `:=`", "Yes, with `:=`"),
    P("Sólo dentro de funciones", "Only inside functions"),
    P("Sólo si es exportada", "Only if exported"),
  ],
  correct: 0,
  explanation: P(
    "Una `const` es inmutable y debe conocerse en compilación (no puede venir de una llamada en ejecución). Da nombre a números mágicos y, con `iota`, forma enumeraciones.",
    "A `const` is immutable and must be known at compile time (it can't come from a runtime call). It names magic numbers and, with `iota`, forms enumerations.",
  ),
};
const Q_IOTA_START = {
  question: P("En `const ( A = iota; B; C )`, ¿cuánto vale `C`?", "In `const ( A = iota; B; C )`, what is `C`?"),
  options: [
    P("2 (iota empieza en 0 y sube por línea)", "2 (iota starts at 0 and rises per line)"),
    P("3", "3"),
    P("iota", "iota"),
    P("0", "0"),
  ],
  correct: 0,
  explanation: P(
    "`iota` empieza en 0 en cada bloque `const` y aumenta 1 por línea. `A`=0, `B`=1, `C`=2. `B` y `C` heredan la expresión `= iota`. Es la forma idiomática de hacer enums en Go.",
    "`iota` starts at 0 in each `const` block and rises by 1 per line. `A`=0, `B`=1, `C`=2. `B` and `C` inherit the `= iota` expression. It's the idiomatic way to make enums in Go.",
  ),
};

export const SYL_GO_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_MAP_TYPE, Q_MAP_COMMAOK, Q_CONST] },
  c4_lobo: { kind: "battle", questions: [Q_MAP_RANGE, Q_IOTA, Q_MAP_MAKE] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Los Nueve entran en el agua. Cuenta cuántas veces aparece cada jinete: un map asocia cada nombre con su total.",
      "The Nine enter the water. Count how many times each rider appears: a map associates each name with its total.",
    ),
    challenge: {
      topic: P("Maps: contar por clave", "Maps: counting by key"),
      instructions: P(
        "Escribe `contar(jinetes []string) map[string]int` que devuelva cuántas veces aparece cada nombre.\n\nEjemplo: `contar([]string{\"nazgul\", \"nazgul\", \"rey\"})` da un map con `\"nazgul\": 2` y `\"rey\": 1`.",
        "Write `contar(jinetes []string) map[string]int` returning how many times each name appears.\n\nExample: `contar([]string{\"nazgul\", \"nazgul\", \"rey\"})` gives a map with `\"nazgul\": 2` and `\"rey\": 1`.",
      ),
      starter_code:
        "package main\n\nfunc contar(jinetes []string) map[string]int {\n}\n",
      blocks: [
        "package main",
        "func contar(jinetes []string) map[string]int {",
        "\tr := map[string]int{}",
        "\tfor _, j := range jinetes {",
        "\t\tr[j]++",
        "\t}",
        "\treturn r",
        "}",
        "\t\tr[j] = 1",
      ],
      hints: [
        P("Empieza con `m := map[string]int{}`.", "Start with `m := map[string]int{}`."),
        P("Por cada nombre: `m[j]++` (la clave ausente empieza en 0).", "For each name: `m[j]++` (a missing key starts at 0)."),
      ],
      test_cases: [
        { input: 'contar([]string{"nazgul", "nazgul", "rey"})["nazgul"]', expected: 2, description: P("Dos nazgûl", "Two nazgûl"), raw: true },
        { input: 'contar([]string{"nazgul", "nazgul", "rey"})["rey"]', expected: 1, description: P("Un rey", "One king"), raw: true },
        { input: 'len(contar([]string{"a", "b", "a"}))', expected: 2, description: P("Dos claves distintas", "Two distinct keys"), raw: true },
      ],
    },
  },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_MAP_DELETE, Q_CONST_BLOCK, Q_IOTA_START] },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino del Recuento", "The Scroll of the Reckoning"),
    lore_intro: P(
      "Antes del Vado, un pergamino enseña a nombrar lo que no cambia (constantes, enums con iota) y a contar por clave (maps).",
      "Before the Ford, a scroll teaches how to name what doesn't change (constants, iota enums) and to count by key (maps).",
    ),
    scroll: {
      topic: P("Maps y constantes (iota)", "Maps and constants (iota)"),
      sections: [
        {
          heading: P("Maps: diccionarios por clave", "Maps: key-value dictionaries"),
          body: P(
            "`map[K]V` asocia claves con valores. Una clave ausente devuelve el valor cero (0, \"\", false…). La forma «comma, ok» distingue ausente de cero.",
            "`map[K]V` associates keys with values. A missing key returns the zero value (0, \"\", false…). The \"comma, ok\" form tells absent apart from zero.",
          ),
          code: "conteo := map[string]int{}\nconteo[\"nazgul\"]++          // ausente → 0, luego 1\nv, ok := conteo[\"rey\"]      // v=0, ok=false: no estaba",
        },
        {
          heading: P("Constantes", "Constants"),
          body: P(
            "Una `const` es un valor inmutable conocido en compilación. Da nombre a los números mágicos y no puede reasignarse.",
            "A `const` is an immutable value known at compile time. It names magic numbers and can't be reassigned.",
          ),
          code: "const VelocidadMaxima = 120\n\nfunc galopar(deseada int) int {\n\tif deseada > VelocidadMaxima {\n\t\treturn VelocidadMaxima\n\t}\n\treturn deseada\n}",
        },
        {
          heading: P("iota: enumeraciones", "iota: enumerations"),
          body: P(
            "Dentro de un bloque `const`, `iota` empieza en 0 y sube de 1 en 1 por línea. Es la forma idiomática de hacer enums en Go.",
            "Inside a `const` block, `iota` starts at 0 and rises by 1 per line. It's the idiomatic way to make enums in Go.",
          ),
          code: "const (\n\tCalmo = iota // 0\n\tCrecido      // 1\n\tDesbordado   // 2\n)",
        },
      ],
      keyTakeaway: P(
        "`map[K]V` cuenta y busca por clave (con «comma, ok» para la presencia y orden ALEATORIO al recorrer); `const` da nombre a lo inmutable, e `iota` numera enums desde 0.",
        "`map[K]V` counts and looks up by key (with \"comma, ok\" for presence and RANDOM iteration order); `const` names the immutable, and `iota` numbers enums from 0.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("Asfaloth, el Corcel Élfico", "Asfaloth, the Elven Steed"),
    lore_intro: P(
      "Ningún corcel supera su límite. Ese límite no cambia: es una constante.",
      "No steed exceeds its limit. That limit never changes: it's a constant.",
    ),
    challenge: {
      topic: P("Constantes", "Constants"),
      instructions: P(
        "Declara la constante `VelocidadMaxima = 120` y escribe `galopar(deseada int) int` que devuelva la velocidad deseada SIN superar nunca la constante.\n\nEjemplo: `galopar(200)` → `120`.",
        "Declare the constant `VelocidadMaxima = 120` and write `galopar(deseada int) int` returning the wanted speed WITHOUT ever exceeding the constant.\n\nExample: `galopar(200)` → `120`.",
      ),
      starter_code: "package main\n\nfunc galopar(deseada int) int {\n}\n",
      blocks: [
        "package main",
        "const VelocidadMaxima = 120",
        "func galopar(deseada int) int {",
        "\tif deseada > VelocidadMaxima {",
        "\t\treturn VelocidadMaxima",
        "\t}",
        "\treturn deseada",
        "}",
        "\tif deseada < VelocidadMaxima {",
      ],
      hints: [
        P("Declara la constante a nivel de paquete: `const VelocidadMaxima = 120`.", "Declare the constant at package level: `const VelocidadMaxima = 120`."),
        P("Con un `if`: si `deseada > VelocidadMaxima`, devuelve la constante; si no, `deseada`.", "With an `if`: if `deseada > VelocidadMaxima`, return the constant; otherwise `deseada`."),
      ],
      test_cases: [
        { input: "galopar(90)", expected: 90, description: P("Por debajo del límite", "Below the limit"), raw: true },
        { input: "galopar(200)", expected: 120, description: P("Nunca supera el máximo", "Never above the max"), raw: true },
        { input: "VelocidadMaxima", expected: 120, description: P("La constante es legible", "The constant is readable"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Reckoning of the Nine"),
    lore_intro: P(
      "Cuenta cuántas veces aparece cada jinete. Un map asocia cada nombre con su total.",
      "Count how many times each rider appears. A map associates each name with its total.",
    ),
    challenge: {
      topic: P("Maps: contar por clave", "Maps: counting by key"),
      instructions: P(
        "Escribe `contar(jinetes []string) map[string]int` que devuelva cuántas veces aparece cada nombre.\n\nEjemplo: `contar([]string{\"nazgul\", \"nazgul\", \"rey\"})` da un map con `\"nazgul\": 2` y `\"rey\": 1`.",
        "Write `contar(jinetes []string) map[string]int` returning how many times each name appears.\n\nExample: `contar([]string{\"nazgul\", \"nazgul\", \"rey\"})` gives a map with `\"nazgul\": 2` and `\"rey\": 1`.",
      ),
      starter_code: "package main\n\nfunc contar(jinetes []string) map[string]int {\n}\n",
      blocks: [
        "package main",
        "func contar(jinetes []string) map[string]int {",
        "\tr := map[string]int{}",
        "\tfor _, j := range jinetes {",
        "\t\tr[j]++",
        "\t}",
        "\treturn r",
        "}",
        "\t\tr[j] = 1",
      ],
      hints: [
        P("Empieza con `m := map[string]int{}`.", "Start with `m := map[string]int{}`."),
        P("Por cada nombre: `m[j]++` (la clave ausente empieza en 0).", "For each name: `m[j]++` (a missing key starts at 0)."),
      ],
      test_cases: [
        { input: 'contar([]string{"nazgul", "nazgul", "rey"})["nazgul"]', expected: 2, description: P("Dos nazgûl", "Two nazgûl"), raw: true },
        { input: 'contar([]string{"nazgul", "nazgul", "rey"})["rey"]', expected: 1, description: P("Un rey", "One king"), raw: true },
        { input: 'len(contar([]string{"a", "b", "a"}))', expected: 2, description: P("Dos claves distintas", "Two distinct keys"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P(
      "Cada punto del vado tiene su defensa; algunos, ninguna. Distingue «defensa 0» de «sin defensa» con «comma, ok».",
      "Each point of the ford has its defense; some, none. Tell \"defense 0\" apart from \"no defense\" with \"comma, ok\".",
    ),
    challenge: {
      topic: P("Maps: comma-ok", "Maps: comma-ok"),
      instructions: P(
        "Escribe `defensaDe(defensas map[string]int, nombre string) int` que devuelva la defensa del punto `nombre`. Si el punto NO está en el map, devuelve `-1` (usa la forma «comma, ok»).\n\nOjo: un punto puede tener defensa 0 y aun así existir.",
        "Write `defensaDe(defensas map[string]int, nombre string) int` returning the defense of point `nombre`. If the point is NOT in the map, return `-1` (use the \"comma, ok\" form).\n\nNote: a point may have defense 0 and still exist.",
      ),
      starter_code: "package main\n\nfunc defensaDe(defensas map[string]int, nombre string) int {\n}\n",
      blocks: [
        "package main",
        "func defensaDe(defensas map[string]int, nombre string) int {",
        "\tif v, ok := defensas[nombre]; ok {",
        "\t\treturn v",
        "\t}",
        "\treturn -1",
        "}",
        "\treturn 0",
      ],
      hints: [
        P("`v, ok := defensas[nombre]` te dice el valor y si existía.", "`v, ok := defensas[nombre]` gives you the value and whether it existed."),
        P("`if !ok { return -1 }` y si no, `return v`.", "`if !ok { return -1 }` otherwise `return v`."),
      ],
      test_cases: [
        { input: 'defensaDe(map[string]int{"vado": 50}, "vado")', expected: 50, description: P("Defensa presente", "Defense present"), raw: true },
        { input: 'defensaDe(map[string]int{"vado": 0}, "vado")', expected: 0, description: P("Presente con valor 0 (no es -1)", "Present with value 0 (not -1)"), raw: true },
        { input: 'defensaDe(map[string]int{}, "x")', expected: -1, description: P("Ausente: -1", "Absent: -1"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las runas del Vado", "The runes of the Ford"),
    lore_intro: P(
      "Tres estados del agua grabados en la roca: calmo, crecido, desbordado. Un enum con iota los numera desde 0.",
      "Three states of the water carved in the rock: calm, risen, overflowing. An iota enum numbers them from 0.",
    ),
    challenge: {
      topic: P("Constantes con iota (enums)", "Constants with iota (enums)"),
      instructions: P(
        "Declara un bloque `const` con `iota`: `Calmo` (0), `Crecido` (1) y `Desbordado` (2). Después escribe `estado(caudal int) int` que devuelva:\n• `Calmo` si el caudal es menor que 30,\n• `Crecido` si es menor que 70,\n• `Desbordado` en los demás casos.",
        "Declare a `const` block with `iota`: `Calmo` (0), `Crecido` (1) and `Desbordado` (2). Then write `estado(caudal int) int` returning:\n• `Calmo` if the flow is under 30,\n• `Crecido` if under 70,\n• `Desbordado` otherwise.",
      ),
      starter_code: "package main\n\nconst (\n\tCalmo = iota\n)\n\nfunc estado(caudal int) int {\n}\n",
      blocks: [
        "package main",
        "const (",
        "\tCalmo = iota",
        "\tCrecido",
        "\tDesbordado",
        ")",
        "func estado(caudal int) int {",
        "\tif caudal < 50 {",
        "\t\treturn Calmo",
        "\t}",
        "\tif caudal < 150 {",
        "\t\treturn Crecido",
        "\t}",
        "\treturn Desbordado",
        "}",
        "\treturn Calmo",
      ],
      hints: [
        P("Tras `Calmo = iota`, basta listar `Crecido` y `Desbordado`: heredan `= iota` y valen 1 y 2.", "After `Calmo = iota`, just list `Crecido` and `Desbordado`: they inherit `= iota` and are 1 and 2."),
        P("Dos `if` en cascada: `< 30` → Calmo, `< 70` → Crecido, y el resto Desbordado.", "Two cascading `if`s: `< 30` → Calmo, `< 70` → Crecido, and the rest Desbordado."),
      ],
      test_cases: [
        { input: "estado(10)", expected: 0, description: P("Caudal bajo: Calmo (0)", "Low flow: Calmo (0)"), raw: true },
        { input: "estado(50)", expected: 1, description: P("Caudal medio: Crecido (1)", "Medium flow: Crecido (1)"), raw: true },
        { input: "estado(200)", expected: 2, description: P("El río contra los Nueve: Desbordado (2)", "The river against the Nine: Desbordado (2)"), raw: true },
        { input: "Desbordado", expected: 2, description: P("iota lo numeró en 2", "iota numbered it 2"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre structs y métodos. */
const Q_STRUCT = {
  question: P(
    "¿Qué es un `struct` en Go?",
    "What is a `struct` in Go?",
  ),
  options: [
    P("Un tipo que agrupa campos con nombre y tipo", "A type that groups named, typed fields"),
    P("Una clase con herencia", "A class with inheritance"),
    P("Una función con estado", "A function with state"),
    P("Un tipo de map", "A kind of map"),
  ],
  correct: 0,
  explanation: P(
    "Un `struct` agrupa datos relacionados: `type Provision struct { Nombre string; Peso int }`. Se crea con `Provision{Nombre: \"x\", Peso: 1}` y se accede a los campos con el punto. Go no tiene clases: structs + métodos hacen su papel.",
    "A `struct` groups related data: `type Provision struct { Nombre string; Peso int }`. Create it with `Provision{Nombre: \"x\", Peso: 1}` and access fields with a dot. Go has no classes: structs + methods do the job.",
  ),
};
const Q_METHOD_RECV = {
  question: P(
    "¿Qué es el `(r Resistencia)` en `func (r Resistencia) Calor() int`?",
    "What is the `(r Resistencia)` in `func (r Resistencia) Calor() int`?",
  ),
  options: [
    P("El RECEPTOR: liga el método al tipo Resistencia", "The RECEIVER: it binds the method to the Resistencia type"),
    P("Un parámetro normal más", "Just another normal parameter"),
    P("El valor de retorno", "The return value"),
    P("Una anotación opcional", "An optional annotation"),
  ],
  correct: 0,
  explanation: P(
    "El receptor va ANTES del nombre del método y liga la función al tipo: se llama `r.Calor()`. Dentro, `r` es el valor sobre el que se invocó. Es como `this`/`self`, pero explícito y con nombre a tu elección.",
    "The receiver goes BEFORE the method name and binds the function to the type: you call `r.Calor()`. Inside, `r` is the value it was invoked on. It's like `this`/`self`, but explicit and named as you like.",
  ),
};
const Q_PTR_RECV = {
  question: P(
    "¿Cuándo usas un receptor por PUNTERO, `func (r *R) M()`, en vez de por valor?",
    "When do you use a POINTER receiver, `func (r *R) M()`, instead of a value receiver?",
  ),
  options: [
    P("Cuando el método debe MODIFICAR el struct (o para evitar copiarlo)", "When the method must MODIFY the struct (or to avoid copying it)"),
    P("Nunca: siempre por valor", "Never: always by value"),
    P("Sólo para structs vacíos", "Only for empty structs"),
    P("Sólo en funciones main", "Only in main functions"),
  ],
  correct: 0,
  explanation: P(
    "Un receptor por valor recibe una COPIA: los cambios no se ven fuera. Con `*R` el método opera sobre el original y puede mutarlo. Regla práctica: si mutas o el struct es grande, usa puntero; si sólo lees algo pequeño, por valor.",
    "A value receiver gets a COPY: changes aren't visible outside. With `*R` the method works on the original and can mutate it. Rule of thumb: if you mutate or the struct is large, use a pointer; to just read something small, by value.",
  ),
};
const Q_CONSTRUCTOR = {
  question: P(
    "Go no tiene constructores. ¿Cómo se crea un struct ya inicializado idiomáticamente?",
    "Go has no constructors. How do you idiomatically create an initialized struct?",
  ),
  options: [
    P("Con una función `NuevaX(...) X` que devuelve el struct listo", "With a function `NuevaX(...) X` that returns the ready struct"),
    P("Con `new X()`", "With `new X()`"),
    P("Con un método `__init__`", "With an `__init__` method"),
    P("No se puede inicializar", "You can't initialize it"),
  ],
  correct: 0,
  explanation: P(
    "El patrón es una función «constructora» por convención: `func NuevaResistencia() Resistencia { return Resistencia{calor: 100} }`. Devuelve el struct con sus invariantes ya establecidas. `new(T)` existe, pero devuelve un puntero a un T con ceros.",
    "The pattern is a \"constructor\" function by convention: `func NuevaResistencia() Resistencia { return Resistencia{calor: 100} }`. It returns the struct with its invariants set. `new(T)` exists, but returns a pointer to a zeroed T.",
  ),
};

/** Capítulo 5 · Structs y métodos (receptores, encapsulación). */
const Q_STRUCT_LITERAL = {
  question: P("¿Cómo se crea un valor de `type Punto struct { X, Y int }`?", "How do you create a value of `type Punto struct { X, Y int }`?"),
  options: [
    P("Punto{X: 1, Y: 2}  (o Punto{1, 2})", "Punto{X: 1, Y: 2}  (or Punto{1, 2})"),
    P("new Punto(1, 2)", "new Punto(1, 2)"),
    P("Punto(1, 2)", "Punto(1, 2)"),
    P("{X: 1, Y: 2}", "{X: 1, Y: 2}"),
  ],
  correct: 0,
  explanation: P(
    "Un literal de struct: `Punto{X: 1, Y: 2}` (por nombre, recomendado) o `Punto{1, 2}` (por posición). Go no tiene `new` con argumentos como constructor; para eso se usa una función `NuevoPunto`.",
    "A struct literal: `Punto{X: 1, Y: 2}` (by name, recommended) or `Punto{1, 2}` (by position). Go has no `new` with constructor args; for that you use a `NuevoPunto` function.",
  ),
};
const Q_ZERO_VALUE = {
  question: P("Si creas `var p Punto` sin inicializar campos, ¿qué valen `p.X` y `p.Y`?", "If you create `var p Punto` without initializing fields, what are `p.X` and `p.Y`?"),
  options: [
    P("0: cada campo toma el VALOR CERO de su tipo", "0: each field takes its type's ZERO VALUE"),
    P("nil", "nil"),
    P("Basura de memoria", "Memory garbage"),
    P("Da error", "It errors"),
  ],
  correct: 0,
  explanation: P(
    "Go inicializa todo a su valor cero: 0 para números, \"\" para strings, false para bool, nil para punteros/slices/maps. Por eso un struct recién creado es siempre utilizable.",
    "Go initializes everything to its zero value: 0 for numbers, \"\" for strings, false for bool, nil for pointers/slices/maps. That's why a freshly created struct is always usable.",
  ),
};
const Q_METHOD_VS_FUNC = {
  question: P("¿Qué distingue a un método de una función normal en Go?", "What sets a method apart from a plain function in Go?"),
  options: [
    P("El método lleva un RECEPTOR: `func (e Espada) Golpear()`", "The method has a RECEIVER: `func (e Espada) Golpear()`"),
    P("El método va en otro fichero", "The method goes in another file"),
    P("El método no tiene parámetros", "The method has no parameters"),
    P("No hay diferencia", "There's no difference"),
  ],
  correct: 0,
  explanation: P(
    "Un método es una función con un RECEPTOR entre `func` y el nombre: `func (e Espada) Golpear() int`. Se llama con `esp.Golpear()`. Así se asocia comportamiento a un tipo.",
    "A method is a function with a RECEIVER between `func` and the name: `func (e Espada) Golpear() int`. You call it with `esp.Golpear()`. That's how behavior is tied to a type.",
  ),
};
const Q_STRUCT_COPY = {
  question: P("Si pasas un struct a una función por VALOR y esta cambia un campo, ¿cambia el original?", "If you pass a struct to a function by VALUE and it changes a field, does the original change?"),
  options: [
    P("No: se pasa una COPIA. Para mutar el original, pasa un puntero `*Struct`", "No: a COPY is passed. To mutate the original, pass a pointer `*Struct`"),
    P("Sí, siempre", "Yes, always"),
    P("Sólo si el campo es exportado", "Only if the field is exported"),
    P("Da error", "It errors"),
  ],
  correct: 0,
  explanation: P(
    "En Go los structs se pasan por valor (copia). Cambiar la copia no toca el original. Para modificarlo, pasa `*Struct` (puntero); por eso muchos métodos usan receptor de puntero.",
    "In Go structs are passed by value (a copy). Changing the copy doesn't touch the original. To modify it, pass `*Struct` (a pointer); that's why many methods use a pointer receiver.",
  ),
};

export const SYL_GO_COMMUNITY_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_STRUCT, Q_METHOD_RECV, Q_EXPORTED] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_PTR_RECV, Q_CONSTRUCTOR, Q_STRUCT_LITERAL] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Voluntad de Caradhras", "The Will of Caradhras"),
    lore_intro: P(
      "La montaña es el enemigo. Forja una espada con su filo, y un método que golpee sin dañar de menos que cero.",
      "The mountain is the enemy. Forge a sword with its edge, and a method that strikes without dealing below zero.",
    ),
    challenge: {
      topic: P("Structs y métodos", "Structs and methods"),
      instructions: P(
        "Define un struct `Espada` con un campo `Filo int`. Añade el método `Golpear(objetivo int) int` (receptor de valor) que devuelva `objetivo - Filo`, sin bajar de 0.\n\nEjemplo: `Espada{Filo: 10}.Golpear(30)` → `20`.",
        "Define a struct `Espada` with a field `Filo int`. Add the method `Golpear(objetivo int) int` (value receiver) returning `objetivo - Filo`, never below 0.\n\nExample: `Espada{Filo: 10}.Golpear(30)` → `20`.",
      ),
      starter_code:
        "package main\n\ntype Espada struct {\n\tFilo int\n}\n",
      blocks: [
        "package main",
        "type Espada struct {",
        "\tFilo int",
        "}",
        "func (e Espada) Golpear(objetivo int) int {",
        "\tif objetivo < e.Filo {",
        "\t\treturn 0",
        "\t}",
        "\treturn objetivo - e.Filo",
        "}",
        "\treturn e.Filo - objetivo",
      ],
      hints: [
        P("El método lleva receptor: `func (e Espada) Golpear(objetivo int) int { … }`.", "The method has a receiver: `func (e Espada) Golpear(objetivo int) int { … }`."),
        P("No bajes de 0: calcula `objetivo - e.Filo` y si es negativo devuelve 0.", "Don't go below 0: compute `objetivo - e.Filo` and if negative return 0."),
      ],
      test_cases: [
        { input: "Espada{Filo: 10}.Golpear(30)", expected: 20, description: P("30 − 10", "30 − 10"), raw: true },
        { input: "Espada{Filo: 10}.Golpear(5)", expected: 0, description: P("Nunca negativo", "Never negative"), raw: true },
        { input: "Espada{Filo: 10}.Filo", expected: 10, description: P("El campo se lee directo", "The field reads directly"), raw: true },
      ],
    },
  },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_ZERO_VALUE, Q_METHOD_VS_FUNC, Q_STRUCT_COPY] },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Hielo", "The Scroll of Ice"),
    lore_intro: P(
      "Gandalf resguarda un pergamino. «Un objeto es datos con nombre (struct) y verbos que operan sobre ellos (métodos). Lo que no debe tocarse, escríbelo en minúscula.»",
      "Gandalf shelters a scroll. \"An object is named data (a struct) and verbs that act on it (methods). What must not be touched, write it lowercase.\"",
    ),
    scroll: {
      topic: P("Structs y métodos (receptores, encapsulación)", "Structs and methods (receivers, encapsulation)"),
      sections: [
        {
          heading: P("Structs y constructores", "Structs and constructors"),
          body: P(
            "Un `struct` agrupa campos. Go no tiene constructores: por convención se usa una función `NuevaX(...) X` que devuelve el struct ya inicializado.",
            "A `struct` groups fields. Go has no constructors: by convention you use a function `NuevaX(...) X` that returns the initialized struct.",
          ),
          code: "type Provision struct {\n\tNombre string\n\tPeso   int\n}\n\nfunc nuevaProvision(n string, p int) Provision {\n\treturn Provision{Nombre: n, Peso: p}\n}",
        },
        {
          heading: P("Métodos y receptores", "Methods and receivers"),
          body: P(
            "Un método liga una función a un tipo mediante el RECEPTOR, antes del nombre. Por valor recibe una copia; por puntero (`*R`) opera sobre el original y puede mutarlo.",
            "A method binds a function to a type via the RECEIVER, before the name. By value it gets a copy; by pointer (`*R`) it works on the original and can mutate it.",
          ),
          code: "type Resistencia struct{ calor int }\n\nfunc (r Resistencia) Calor() int { return r.calor } // lee (copia)\nfunc (r *Resistencia) Enfriar(g int) { r.calor -= g } // muta (original)",
        },
        {
          heading: P("Encapsulación por inicial", "Encapsulation by initial letter"),
          body: P(
            "La visibilidad la marca la primera letra: `Nombre` (mayúscula) se exporta; `calor` (minúscula) es privado del paquete. Expón métodos, esconde el estado en minúscula.",
            "Visibility is set by the first letter: `Nombre` (uppercase) is exported; `calor` (lowercase) is package-private. Expose methods, hide state in lowercase.",
          ),
          code: "type Temperatura struct{ grados int } // grados: privado\n\nfunc (t Temperatura) ConMas(g int) Temperatura {\n\treturn Temperatura{grados: t.grados + g} // copia nueva: inmutable\n}",
        },
      ],
      keyTakeaway: P(
        "structs agrupan datos; los métodos los operan con un receptor (por valor copia, por puntero muta); la inicial mayúscula/minúscula marca lo público/privado; y `NuevaX(...)` hace de constructor.",
        "structs group data; methods act on them via a receiver (by value copies, by pointer mutates); the uppercase/lowercase initial marks public/private; and `NuevaX(...)` acts as a constructor.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Poney", "Bill the Pony's Load"),
    lore_intro: P(
      "Una provisión es su nombre y su peso, juntos. Modela ese dato con un struct y una función que lo cree.",
      "A provision is its name and its weight, together. Model that data with a struct and a function that creates it.",
    ),
    challenge: {
      topic: P("Structs y constructores", "Structs and constructors"),
      instructions: P(
        "Declara el struct `Provision` con dos campos EXPORTADOS: `Nombre` (string) y `Peso` (int). Después escribe `nuevaProvision(nombre string, peso int) Provision` que lo cree con esos valores.\n\nEjemplo: `nuevaProvision(\"lembas\", 5).Peso` → `5`.",
        "Declare the struct `Provision` with two EXPORTED fields: `Nombre` (string) and `Peso` (int). Then write `nuevaProvision(nombre string, peso int) Provision` creating it with those values.\n\nExample: `nuevaProvision(\"lembas\", 5).Peso` → `5`.",
      ),
      starter_code: "package main\n\ntype Provision struct {\n}\n\nfunc nuevaProvision(nombre string, peso int) Provision {\n}\n",
      blocks: [
        "package main",
        "type Provision struct {",
        "\tNombre string",
        "\tPeso   int",
        "}",
        "func nuevaProvision(nombre string, peso int) Provision {",
        "\treturn Provision{Nombre: nombre, Peso: peso}",
        "}",
        "\treturn Provision{Nombre: nombre}",
      ],
      hints: [
        P("Campos exportados van en mayúscula: `Nombre string` y `Peso int`.", "Exported fields go uppercase: `Nombre string` and `Peso int`."),
        P("Crea el struct con nombres de campo: `return Provision{Nombre: nombre, Peso: peso}`.", "Create the struct with field names: `return Provision{Nombre: nombre, Peso: peso}`."),
      ],
      test_cases: [
        { input: 'nuevaProvision("lembas", 5).Peso', expected: 5, description: P("El peso", "The weight"), raw: true },
        { input: 'nuevaProvision("lembas", 5).Nombre', expected: "lembas", description: P("El nombre", "The name"), raw: true },
        { input: 'nuevaProvision("cuerda", 2).Peso', expected: 2, description: P("Con otros valores", "With other values"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Endurance"),
    lore_intro: P(
      "El calor de la Comunidad es un estado protegido. Escóndelo en minúscula y expón métodos que lo lean, sin bajar nunca de 0.",
      "The Fellowship's warmth is a protected state. Hide it lowercase and expose methods that read it, never dropping below 0.",
    ),
    challenge: {
      topic: P("Métodos, receptores y encapsulación", "Methods, receivers and encapsulation"),
      instructions: P(
        "Declara `Resistencia` con un campo PRIVADO `calor int`. Añade:\n• `NuevaResistencia() Resistencia` que lo cree con `calor` a 100,\n• el método `Calor() int` que lo devuelva,\n• el método `TrasEnfriar(grados int) int` que devuelva el calor tras restar `grados`, SIN bajar de 0.",
        "Declare `Resistencia` with a PRIVATE field `calor int`. Add:\n• `NuevaResistencia() Resistencia` creating it with `calor` at 100,\n• the method `Calor() int` returning it,\n• the method `TrasEnfriar(grados int) int` returning the warmth after subtracting `grados`, never below 0.",
      ),
      starter_code: "package main\n\ntype Resistencia struct {\n\tcalor int\n}\n\nfunc NuevaResistencia() Resistencia {\n}\n\nfunc (r Resistencia) Calor() int {\n}\n\nfunc (r Resistencia) TrasEnfriar(grados int) int {\n}\n",
      blocks: [
        "package main",
        "type Resistencia struct {",
        "\tcalor int",
        "}",
        "func NuevaResistencia() Resistencia {",
        "\treturn Resistencia{calor: 100}",
        "}",
        "func (r Resistencia) Calor() int {",
        "\treturn r.calor",
        "}",
        "func (r Resistencia) TrasEnfriar(grados int) int {",
        "\tc := r.calor - grados",
        "\tif c < 0 {",
        "\t\treturn 0",
        "\t}",
        "\treturn c",
        "}",
        "\treturn r.calor - grados",
      ],
      hints: [
        P("El constructor: `return Resistencia{calor: 100}`.", "The constructor: `return Resistencia{calor: 100}`."),
        P("En `TrasEnfriar`: `c := r.calor - grados; if c < 0 { return 0 }; return c`.", "In `TrasEnfriar`: `c := r.calor - grados; if c < 0 { return 0 }; return c`."),
      ],
      test_cases: [
        { input: "NuevaResistencia().Calor()", expected: 100, description: P("Parte con el calor intacto", "Starts with warmth intact"), raw: true },
        { input: "NuevaResistencia().TrasEnfriar(50)", expected: 50, description: P("La ventisca muerde", "The blizzard bites"), raw: true },
        { input: "NuevaResistencia().TrasEnfriar(200)", expected: 0, description: P("Nunca baja de 0", "Never below 0"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("El Umbral de la Nieve", "The Snow Threshold"),
    lore_intro: P(
      "Una medida no se altera: si el frío cambia, tienes OTRA medida. Un método por valor devuelve una copia nueva: inmutabilidad.",
      "A measurement isn't altered: if the cold changes, you have ANOTHER measurement. A value-receiver method returns a fresh copy: immutability.",
    ),
    challenge: {
      topic: P("Value objects inmutables", "Immutable value objects"),
      instructions: P(
        "Declara `Temperatura` con un campo privado `grados int`. Añade:\n• `NuevaTemperatura(grados int) Temperatura`,\n• el método `Grados() int`,\n• el método `ConMas(g int) Temperatura` que devuelva una Temperatura NUEVA con los grados sumados (sin mutar la original: receptor por valor).",
        "Declare `Temperatura` with a private field `grados int`. Add:\n• `NuevaTemperatura(grados int) Temperatura`,\n• the method `Grados() int`,\n• the method `ConMas(g int) Temperatura` returning a NEW Temperatura with the degrees added (without mutating the original: value receiver).",
      ),
      starter_code: "package main\n\ntype Temperatura struct {\n\tgrados int\n}\n\nfunc NuevaTemperatura(grados int) Temperatura {\n}\n\nfunc (t Temperatura) Grados() int {\n}\n\nfunc (t Temperatura) ConMas(g int) Temperatura {\n}\n",
      blocks: [
        "package main",
        "type Temperatura struct {",
        "\tgrados int",
        "}",
        "func NuevaTemperatura(grados int) Temperatura {",
        "\treturn Temperatura{grados: grados}",
        "}",
        "func (t Temperatura) Grados() int {",
        "\treturn t.grados",
        "}",
        "func (t Temperatura) ConMas(g int) Temperatura {",
        "\treturn NuevaTemperatura(t.grados + g)",
        "}",
        "\treturn NuevaTemperatura(t.grados - g)",
      ],
      hints: [
        P("`ConMas` no muta: `return Temperatura{grados: t.grados + g}`.", "`ConMas` doesn't mutate: `return Temperatura{grados: t.grados + g}`."),
        P("Como el receptor es por VALOR, `t` es una copia: la original nunca cambia.", "Since the receiver is by VALUE, `t` is a copy: the original never changes."),
      ],
      test_cases: [
        { input: "NuevaTemperatura(-10).Grados()", expected: -10, description: P("La temperatura de partida", "The starting temperature"), raw: true },
        { input: "NuevaTemperatura(-10).ConMas(-5).Grados()", expected: -15, description: P("ConMas devuelve una más fría", "ConMas returns a colder one"), raw: true },
        { input: "NuevaTemperatura(-10).ConMas(-5).ConMas(-5).Grados()", expected: -20, description: P("Se puede encadenar", "It can be chained"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre interfaces. */
const Q_INTERFACE = {
  question: P(
    "¿Qué es una `interface` en Go?",
    "What is an `interface` in Go?",
  ),
  options: [
    P("Un conjunto de firmas de método: un contrato de comportamiento", "A set of method signatures: a behavior contract"),
    P("Una clase base con código", "A base class with code"),
    P("Un struct con campos públicos", "A struct with public fields"),
    P("Una función anónima", "An anonymous function"),
  ],
  correct: 0,
  explanation: P(
    "Una interfaz declara QUÉ métodos debe tener un tipo, sin decir cómo: `type Enemigo interface { Atacar() int }`. Cualquier tipo con ese método la cumple. Es un contrato de comportamiento, no de datos.",
    "An interface declares WHAT methods a type must have, without saying how: `type Enemigo interface { Atacar() int }`. Any type with that method satisfies it. It's a behavior contract, not a data one.",
  ),
};
const Q_IMPLICIT = {
  question: P(
    "¿Cómo declara un tipo de Go que implementa una interfaz?",
    "How does a Go type declare that it implements an interface?",
  ),
  options: [
    P("No lo declara: basta con tener sus métodos (implementación implícita)", "It doesn't: just having its methods is enough (implicit implementation)"),
    P("Con `implements Enemigo`", "With `implements Enemigo`"),
    P("Con `extends Enemigo`", "With `extends Enemigo`"),
    P("Registrándolo en la interfaz", "By registering it in the interface"),
  ],
  correct: 0,
  explanation: P(
    "Go usa «duck typing» estático: si un tipo tiene los métodos de una interfaz, la cumple automáticamente, sin declararlo. Esto desacopla: puedes crear tipos que satisfagan interfaces de librerías que no controlas.",
    "Go uses static \"duck typing\": if a type has an interface's methods, it satisfies it automatically, without declaring it. This decouples: you can build types that satisfy interfaces from libraries you don't control.",
  ),
};
const Q_POLY_GO = {
  question: P(
    "Tienes `func total(es []Enemigo) int`. ¿Qué puedes meter en ese slice?",
    "You have `func total(es []Enemigo) int`. What can you put in that slice?",
  ),
  options: [
    P("Cualquier tipo que tenga los métodos de Enemigo (Trasgo, Troll…)", "Any type that has Enemigo's methods (Trasgo, Troll…)"),
    P("Sólo structs llamados Enemigo", "Only structs named Enemigo"),
    P("Sólo un tipo, no mezclas", "Only one type, no mixing"),
    P("Cualquier cosa: la interfaz no filtra", "Anything: the interface doesn't filter"),
  ],
  correct: 0,
  explanation: P(
    "Un `[]Enemigo` acepta valores de CUALQUIER tipo que cumpla `Enemigo`, mezclados. El código que los recorre llama `e.Atacar()` sin saber cuál es cada uno: eso es polimorfismo. Añadir un tipo nuevo no obliga a tocar `total`.",
    "A `[]Enemigo` accepts values of ANY type satisfying `Enemigo`, mixed. The code iterating them calls `e.Atacar()` without knowing which is which: that's polymorphism. Adding a new type doesn't force touching `total`.",
  ),
};
const Q_EMPTY_IFACE = {
  question: P(
    "¿Qué significa el tipo `interface{}` (o `any`)?",
    "What does the type `interface{}` (or `any`) mean?",
  ),
  options: [
    P("Cualquier valor: no exige ningún método", "Any value: it requires no methods"),
    P("Ningún valor", "No value"),
    P("Sólo structs", "Only structs"),
    P("Sólo punteros", "Only pointers"),
  ],
  correct: 0,
  explanation: P(
    "La interfaz vacía no pide métodos, así que TODO la cumple: `interface{}` (o su alias `any`) acepta cualquier valor. Para volver a usar el tipo concreto, haces una aserción `v.(int)` o un `switch v.(type)`.",
    "The empty interface requires no methods, so EVERYTHING satisfies it: `interface{}` (or its alias `any`) accepts any value. To get the concrete type back, you do an assertion `v.(int)` or a `switch v.(type)`.",
  ),
};
const Q_TYPESWITCH = {
  question: P(
    "¿Para qué sirve `switch v.(type) { case int: ...; case string: ... }`?",
    "What is `switch v.(type) { case int: ...; case string: ... }` for?",
  ),
  options: [
    P("Para ramificar según el TIPO concreto de un valor de interfaz", "To branch on the concrete TYPE of an interface value"),
    P("Para convertir un int en string", "To convert an int to a string"),
    P("Para recorrer un slice", "To iterate a slice"),
    P("Para declarar una interfaz", "To declare an interface"),
  ],
  correct: 0,
  explanation: P(
    "El «type switch» inspecciona el tipo dinámico de un valor `interface{}` y ejecuta la rama que corresponda. Es la forma segura de recuperar el tipo concreto tras haberlo guardado como `any`.",
    "The \"type switch\" inspects the dynamic type of an `interface{}` value and runs the matching branch. It's the safe way to recover the concrete type after storing it as `any`.",
  ),
};

/** Capítulo 6 · Interfaces (implícitas, polimorfismo). */
const Q_IFACE_SMALL = {
  question: P("¿Por qué en Go se prefieren interfaces PEQUEÑAS (uno o dos métodos)?", "Why does Go prefer SMALL interfaces (one or two methods)?"),
  options: [
    P("Más fáciles de implementar y de combinar; muchos tipos las cumplen sin querer", "Easier to implement and combine; many types satisfy them without even trying"),
    P("Porque las grandes no compilan", "Because large ones don't compile"),
    P("Para ahorrar memoria", "To save memory"),
    P("Porque Go limita a dos métodos", "Because Go caps them at two methods"),
  ],
  correct: 0,
  explanation: P(
    "Cuanto más pequeña la interfaz, más tipos la satisfacen y más fácil es reutilizarla (`io.Reader` tiene UN método). El proverbio Go: «la interfaz más grande, la abstracción más débil».",
    "The smaller the interface, the more types satisfy it and the easier it is to reuse (`io.Reader` has ONE method). The Go proverb: \"the bigger the interface, the weaker the abstraction\".",
  ),
};
const Q_IFACE_NIL = {
  question: P("¿Qué es el valor cero de una interfaz?", "What is the zero value of an interface?"),
  options: [
    P("nil: no apunta a ningún valor todavía", "nil: it points to no value yet"),
    P("Una struct vacía", "An empty struct"),
    P("0", "0"),
    P("Un puntero a sí misma", "A pointer to itself"),
  ],
  correct: 0,
  explanation: P(
    "Una interfaz sin valor asignado es `nil`; llamar un método sobre ella provoca panic. Es el patrón habitual: `func(...) (Guerrero, error)` devuelve `nil` como interfaz cuando falla.",
    "An interface with no assigned value is `nil`; calling a method on it panics. It's the usual pattern: `func(...) (Guerrero, error)` returns `nil` as the interface when it fails.",
  ),
};
const Q_TYPE_ASSERT = {
  question: P("¿Qué hace `v, ok := x.(Espada)` sobre una interfaz `x`?", "What does `v, ok := x.(Espada)` do on an interface `x`?"),
  options: [
    P("Type assertion: `v` es el valor como Espada y `ok` si de verdad lo era", "Type assertion: `v` is the value as an Espada and `ok` whether it truly was"),
    P("Convierte x en un número", "Converts x into a number"),
    P("Crea una Espada nueva", "Creates a new Espada"),
    P("Compara tipos por texto", "Compares types by text"),
  ],
  correct: 0,
  explanation: P(
    "La aserción de tipo saca el valor concreto de una interfaz. Con la forma «coma, ok» no hace panic si el tipo no coincide: `ok` es false. Es lo que usa por dentro el `type switch`.",
    "The type assertion pulls the concrete value out of an interface. With the \"comma, ok\" form it won't panic if the type doesn't match: `ok` is false. It's what the `type switch` uses under the hood.",
  ),
};
const Q_IFACE_CONTRACT = {
  question: P("Una función pide `func atacar(e Enemigo)`. ¿Qué acepta?", "A function takes `func atacar(e Enemigo)`. What does it accept?"),
  options: [
    P("Cualquier tipo que tenga los métodos de Enemigo (implícitamente)", "Any type that has Enemigo's methods (implicitly)"),
    P("Sólo un valor creado como Enemigo", "Only a value created as an Enemigo"),
    P("Cualquier cosa: la interfaz no obliga", "Anything: the interface doesn't enforce"),
    P("Sólo punteros", "Only pointers"),
  ],
  correct: 0,
  explanation: P(
    "Programar contra la interfaz acepta CUALQUIER implementación. En Go no se declara `implements`: si el tipo tiene los métodos, ya vale. Añadir un enemigo nuevo no toca `atacar()`.",
    "Programming to the interface accepts ANY implementation. In Go you don't declare `implements`: if the type has the methods, it already qualifies. Adding a new enemy doesn't touch `atacar()`.",
  ),
};

export const SYL_GO_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_INTERFACE, Q_IMPLICIT, Q_POLY_GO] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_EMPTY_IFACE, Q_TYPESWITCH, Q_TYPE_ASSERT] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_IFACE_SMALL, Q_IFACE_NIL, Q_IFACE_CONTRACT] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Morgoth", "The Balrog of Morgoth"),
    lore_intro: P(
      "Sombra y fuego. El Balrog es un Enemigo más para quien lo enfrenta… pero golpea con 100. Cumple el contrato Enemigo (implícitamente).",
      "Shadow and flame. The Balrog is just another Enemy to whoever faces it… but it strikes with 100. Satisfy the Enemigo contract (implicitly).",
    ),
    challenge: {
      topic: P("Interfaces implícitas y polimorfismo", "Implicit interfaces and polymorphism"),
      instructions: P(
        "Existen la interfaz `Enemigo` (con `Atacar() int`), el tipo `Orco` (ataca con 10) y `danioTotal([]Enemigo) int`. Define un tipo `Balrog` con el método `Atacar() int` que devuelva 100. No hace falta declarar que implementa Enemigo: en Go es implícito.\n\n`Balrog{}.Atacar()` → `100`.",
        "The interface `Enemigo` (with `Atacar() int`), the type `Orco` (attacks with 10) and `danioTotal([]Enemigo) int` exist. Define a type `Balrog` with the method `Atacar() int` returning 100. No need to declare it implements Enemigo: in Go it's implicit.\n\n`Balrog{}.Atacar()` → `100`.",
      ),
      support_code:
        "package main\n\ntype Enemigo interface {\n\tAtacar() int\n}\n\ntype Orco struct{}\n\nfunc (o Orco) Atacar() int { return 10 }\n\nfunc danioTotal(es []Enemigo) int {\n\tt := 0\n\tfor _, e := range es {\n\t\tt += e.Atacar()\n\t}\n\treturn t\n}",
      starter_code:
        "// Enemigo (interfaz), Orco y danioTotal ya existen.\n\ntype Balrog struct{}\n",
      blocks: [
        "// Enemigo (interfaz), Orco y danioTotal ya existen.",
        "type Balrog struct{}",
        "func (b Balrog) Atacar() int {",
        "\treturn 100",
        "}",
        "\treturn 10",
      ],
      hints: [
        P("Basta con un método con la firma correcta: `func (b Balrog) Atacar() int { return 100 }`.", "Just a method with the right signature: `func (b Balrog) Atacar() int { return 100 }`."),
        P("`danioTotal` trata a Orco y Balrog por igual: eso es polimorfismo.", "`danioTotal` treats Orco and Balrog alike: that's polymorphism."),
      ],
      test_cases: [
        { input: "Balrog{}.Atacar()", expected: 100, description: P("Golpe brutal", "Brutal blow"), raw: true },
        { input: "danioTotal([]Enemigo{Orco{}, Balrog{}})", expected: 110, description: P("Suma orco y balrog: polimorfismo", "Sums orc and balrog: polymorphism"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de los Contratos", "The Scroll of Contracts"),
    lore_intro: P(
      "Gandalf despliega un pergamino de runas. «No preguntes de qué está hecha una cosa. Pregunta qué métodos tiene. En Go, eso basta.»",
      "Gandalf unrolls a scroll of runes. \"Don't ask what a thing is made of. Ask what methods it has. In Go, that's enough.\"",
    ),
    scroll: {
      topic: P("Interfaces implícitas y polimorfismo", "Implicit interfaces and polymorphism"),
      sections: [
        {
          heading: P("Una interfaz es un contrato de métodos", "An interface is a method contract"),
          body: P(
            "Declara QUÉ métodos hacen falta, sin implementación. Un tipo la cumple SÓLO por tener esos métodos: no se declara nada (implementación implícita).",
            "It declares WHICH methods are needed, with no implementation. A type satisfies it JUST by having those methods: nothing is declared (implicit implementation).",
          ),
          code: "type Enemigo interface {\n\tAtacar() int\n}\n\ntype Trasgo struct{}\nfunc (t Trasgo) Atacar() int { return 5 } // ya es un Enemigo",
        },
        {
          heading: P("Polimorfismo", "Polymorphism"),
          body: P(
            "Un `[]Enemigo` mezcla cualquier tipo que cumpla el contrato. El código que lo recorre no sabe ni le importa qué son: llama al método y ya.",
            "A `[]Enemigo` mixes any type that satisfies the contract. The code iterating it doesn't know or care what they are: it calls the method and that's it.",
          ),
          code: "func danioTotal(horda []Enemigo) int {\n\ttotal := 0\n\tfor _, e := range horda {\n\t\ttotal += e.Atacar()\n\t}\n\treturn total\n}",
        },
        {
          heading: P("interface{} y type switch", "interface{} and type switch"),
          body: P(
            "`interface{}` (alias `any`) acepta cualquier valor. Para recuperar el tipo concreto, un `switch v.(type)` ramifica según lo que sea.",
            "`interface{}` (alias `any`) accepts any value. To recover the concrete type, a `switch v.(type)` branches on what it is.",
          ),
          code: "func describir(v interface{}) string {\n\tswitch v.(type) {\n\tcase int:\n\t\treturn \"numero\"\n\tcase string:\n\t\treturn \"texto\"\n\tdefault:\n\t\treturn \"otro\"\n\t}\n}",
        },
      ],
      keyTakeaway: P(
        "Programa contra interfaces: contratos de métodos que los tipos cumplen implícitamente. Un slice de interfaz da polimorfismo; `interface{}` acepta todo y el type switch recupera el tipo concreto.",
        "Program against interfaces: method contracts that types satisfy implicitly. A slice of interface gives polymorphism; `interface{}` accepts anything and the type switch recovers the concrete type.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P(
      "«Habla, amigo, y entra.» La interfaz Descifrable ya existe; la puerta sólo debe tener su método para cumplirla — sin declararlo.",
      "\"Speak, friend, and enter.\" The Descifrable interface already exists; the door just needs its method to satisfy it — without declaring so.",
    ),
    challenge: {
      topic: P("Implementar una interfaz (implícito)", "Implementing an interface (implicit)"),
      instructions: P(
        "Ya existen la interfaz `Descifrable` (con `SusurrarPalabra(palabra string) bool`) y la función `abre(d Descifrable, palabra string) bool`. Crea el tipo `PuertaDurin` con el método `SusurrarPalabra` que devuelva `true` SÓLO con la palabra `\"mellon\"`.",
        "The interface `Descifrable` (with `SusurrarPalabra(palabra string) bool`) and the function `abre(d Descifrable, palabra string) bool` already exist. Create the type `PuertaDurin` with the method `SusurrarPalabra` returning `true` ONLY for the word `\"mellon\"`.",
      ),
      support_code:
        'package main\n\ntype Descifrable interface {\n\tSusurrarPalabra(palabra string) bool\n}\n\nfunc abre(d Descifrable, palabra string) bool {\n\treturn d.SusurrarPalabra(palabra)\n}',
      starter_code: "\ntype PuertaDurin struct{}\n\nfunc (p PuertaDurin) SusurrarPalabra(palabra string) bool {\n}\n",
      blocks: [
        "type PuertaDurin struct{}",
        "func (p PuertaDurin) SusurrarPalabra(palabra string) bool {",
        "\treturn palabra == \"mellon\"",
        "}",
        "\treturn palabra == \"amigo\"",
      ],
      hints: [
        P("El método debe tener la MISMA firma que la interfaz para cumplirla.", "The method must have the SAME signature as the interface to satisfy it."),
        P("`return palabra == \"mellon\"`.", "`return palabra == \"mellon\"`."),
      ],
      test_cases: [
        { input: 'abre(PuertaDurin{}, "mellon")', expected: true, description: P("La palabra élfica abre", "The Elvish word opens it"), raw: true },
        { input: 'abre(PuertaDurin{}, "amigo")', expected: false, description: P("En castellano no", "Not in Spanish"), raw: true },
        { input: 'PuertaDurin{}.SusurrarPalabra("mellon")', expected: true, description: P("El método directo también", "The direct method too"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P(
      "Trasgos y un troll irrumpen a la vez: criaturas distintas, un mismo contrato. La función que suma su daño no sabe qué son.",
      "Goblins and a troll burst in at once: different creatures, one contract. The function summing their damage doesn't know what they are.",
    ),
    challenge: {
      topic: P("Polimorfismo con interfaces", "Polymorphism with interfaces"),
      instructions: P(
        "Ya existen la interfaz `Enemigo` (con `Atacar() int`) y `DanioTotal(horda []Enemigo) int`. Crea DOS tipos que cumplan `Enemigo`: `Trasgo` (ataca con 5) y `Troll` (ataca con 20).",
        "The interface `Enemigo` (with `Atacar() int`) and `DanioTotal(horda []Enemigo) int` already exist. Create TWO types satisfying `Enemigo`: `Trasgo` (attacks with 5) and `Troll` (attacks with 20).",
      ),
      support_code:
        "package main\n\ntype Enemigo interface {\n\tAtacar() int\n}\n\nfunc DanioTotal(horda []Enemigo) int {\n\ttotal := 0\n\tfor _, e := range horda {\n\t\ttotal += e.Atacar()\n\t}\n\treturn total\n}",
      starter_code: "\ntype Trasgo struct{}\n\nfunc (t Trasgo) Atacar() int {\n}\n\ntype Troll struct{}\n\nfunc (t Troll) Atacar() int {\n}\n",
      blocks: [
        "type Trasgo struct{}",
        "func (t Trasgo) Atacar() int {",
        "\treturn 5",
        "}",
        "type Troll struct{}",
        "func (t Troll) Atacar() int {",
        "\treturn 20",
        "}",
        "\t\treturn 0",
      ],
      hints: [
        P("Cada tipo cumple `Enemigo` sólo por tener `Atacar() int`.", "Each type satisfies `Enemigo` just by having `Atacar() int`."),
        P("`DanioTotal` los trata a todos como `Enemigo`: eso es polimorfismo.", "`DanioTotal` treats them all as `Enemigo`: that's polymorphism."),
      ],
      test_cases: [
        { input: "Trasgo{}.Atacar()", expected: 5, description: P("El trasgo golpea flojo", "The goblin hits soft"), raw: true },
        { input: "Troll{}.Atacar()", expected: 20, description: P("El troll golpea fuerte", "The troll hits hard"), raw: true },
        { input: "DanioTotal([]Enemigo{Trasgo{}, Trasgo{}, Troll{}})", expected: 30, description: P("Suma la horda mezclada", "Sums the mixed horde"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P(
      "«¡No puedes pasar!» Un hechizo es cualquier cosa que sepa lanzarse. Quien lo conjura no necesita saber cuál es.",
      "\"You cannot pass!\" A spell is anything that knows how to be cast. Whoever conjures it needn't know which one it is.",
    ),
    challenge: {
      topic: P("Interfaces como parámetro", "Interfaces as a parameter"),
      instructions: P(
        "Ya existen la interfaz `Hechizo` (con `Lanzar() string`), la función `conjurar(h Hechizo) string` y un tipo `Chispa`. Crea el tipo `PalabraDeMando` cuyo `Lanzar()` devuelva exactamente `\"¡No puedes pasar!\"`.",
        "The interface `Hechizo` (with `Lanzar() string`), the function `conjurar(h Hechizo) string` and a type `Chispa` already exist. Create the type `PalabraDeMando` whose `Lanzar()` returns exactly `\"¡No puedes pasar!\"`.",
      ),
      support_code:
        'package main\n\ntype Hechizo interface {\n\tLanzar() string\n}\n\nfunc conjurar(h Hechizo) string {\n\treturn h.Lanzar()\n}\n\ntype Chispa struct{}\n\nfunc (c Chispa) Lanzar() string { return "chispas" }',
      starter_code: "\ntype PalabraDeMando struct{}\n\nfunc (p PalabraDeMando) Lanzar() string {\n}\n",
      blocks: [
        "type PalabraDeMando struct{}",
        "func (p PalabraDeMando) Lanzar() string {",
        "\treturn \"¡No puedes pasar!\"",
        "}",
        "\treturn \"chispas\"",
      ],
      hints: [
        P("`conjurar` acepta cualquier `Hechizo`: tu tipo lo será por tener `Lanzar()`.", "`conjurar` accepts any `Hechizo`: your type will be one by having `Lanzar()`."),
        P('`return "¡No puedes pasar!"` (con los signos de apertura y cierre).', '`return "¡No puedes pasar!"` (with the opening and closing marks).'),
      ],
      test_cases: [
        { input: "conjurar(PalabraDeMando{})", expected: "¡No puedes pasar!", description: P("Gandalf conjura tu hechizo", "Gandalf casts your spell"), raw: true },
        { input: "conjurar(Chispa{})", expected: "chispas", description: P("La misma función con otro Hechizo", "The same function with another Hechizo"), raw: true },
        { input: "PalabraDeMando{}.Lanzar()", expected: "¡No puedes pasar!", description: P("El método directo", "The direct method"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La galería sin fin", "The endless gallery"),
    lore_intro: P(
      "En la oscuridad, cada runa es de una clase distinta. Identifica qué es cada valor con un type switch sobre la interfaz vacía.",
      "In the dark, each rune is of a different kind. Identify what each value is with a type switch over the empty interface.",
    ),
    challenge: {
      topic: P("interface{} y type switch", "interface{} and type switch"),
      instructions: P(
        "Escribe `describir(v interface{}) string` que devuelva:\n• `\"numero\"` si `v` es un `int`,\n• `\"texto\"` si es un `string`,\n• `\"otro\"` en cualquier otro caso.\n\nUsa un `switch v.(type)`.",
        "Write `describir(v interface{}) string` returning:\n• `\"numero\"` if `v` is an `int`,\n• `\"texto\"` if it's a `string`,\n• `\"otro\"` otherwise.\n\nUse a `switch v.(type)`.",
      ),
      starter_code: 'package main\n\nfunc describir(v interface{}) string {\n\tswitch v.(type) {\n\t}\n}\n',
      blocks: [
        "package main",
        "func describir(v interface{}) string {",
        "\tswitch v.(type) {",
        "\tcase int:",
        "\t\treturn \"numero\"",
        "\tcase string:",
        "\t\treturn \"texto\"",
        "\tdefault:",
        "\t\treturn \"otro\"",
        "\t}",
        "}",
        "\t\treturn \"numero\"",
      ],
      hints: [
        P("`case int:` devuelve `\"numero\"`; `case string:` devuelve `\"texto\"`.", "`case int:` returns `\"numero\"`; `case string:` returns `\"texto\"`."),
        P("`default:` recoge todo lo demás con `\"otro\"`.", "`default:` catches everything else with `\"otro\"`."),
      ],
      test_cases: [
        { input: "describir(5)", expected: "numero", description: P("Un entero", "An integer"), raw: true },
        { input: 'describir("mellon")', expected: "texto", description: P("Un texto", "A string"), raw: true },
        { input: "describir(true)", expected: "otro", description: P("Un bool: otro", "A bool: other"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre embedding y composición. */
const Q_EMBED = {
  question: P(
    "En `type Frasco struct { ObjetoMagico }` (sin nombre de campo), ¿qué es `ObjetoMagico`?",
    "In `type Frasco struct { ObjetoMagico }` (no field name), what is `ObjetoMagico`?",
  ),
  options: [
    P("Un campo EMBEBIDO: sus métodos y campos se promueven a Frasco", "An EMBEDDED field: its methods and fields are promoted to Frasco"),
    P("Un error: falta el nombre del campo", "An error: the field name is missing"),
    P("Una clase padre de la que Frasco hereda", "A parent class Frasco inherits from"),
    P("Un comentario", "A comment"),
  ],
  correct: 0,
  explanation: P(
    "Escribir un tipo sin nombre de campo lo EMBEBE: `Frasco` gana los métodos y campos de `ObjetoMagico` como si fueran suyos (promoción). No es herencia: es composición. Puedes acceder al embebido con `f.ObjetoMagico`.",
    "Writing a type with no field name EMBEDS it: `Frasco` gains `ObjetoMagico`'s methods and fields as if they were its own (promotion). It's not inheritance: it's composition. You can reach the embedded one via `f.ObjetoMagico`.",
  ),
};
const Q_PROMOTION = {
  question: P(
    "`Frasco` embebe `ObjetoMagico`, que tiene `Describir()`. ¿Cómo se llama a ese método?",
    "`Frasco` embeds `ObjetoMagico`, which has `Describir()`. How do you call that method?",
  ),
  options: [
    P("Directamente: `f.Describir()` (está promovido)", "Directly: `f.Describir()` (it's promoted)"),
    P("Sólo con `f.ObjetoMagico.Describir()`", "Only with `f.ObjetoMagico.Describir()`"),
    P("No se puede llamar desde fuera", "It can't be called from outside"),
    P("Con `super.Describir()`", "With `super.Describir()`"),
  ],
  correct: 0,
  explanation: P(
    "Los métodos del tipo embebido se promueven: `f.Describir()` funciona como si fuera de `Frasco`. También vale la forma explícita `f.ObjetoMagico.Describir()`, útil si hay un choque de nombres.",
    "The embedded type's methods are promoted: `f.Describir()` works as if it were `Frasco`'s. The explicit form `f.ObjetoMagico.Describir()` also works, handy if there's a name clash.",
  ),
};
const Q_COMPOSITION = {
  question: P(
    "Go no tiene herencia de clases. ¿Cómo comparte comportamiento entre tipos?",
    "Go has no class inheritance. How does it share behavior between types?",
  ),
  options: [
    P("Con COMPOSICIÓN: embebiendo tipos (has-a), no heredando (is-a)", "With COMPOSITION: embedding types (has-a), not inheriting (is-a)"),
    P("Con `extends`", "With `extends`"),
    P("Con herencia múltiple", "With multiple inheritance"),
    P("No se puede compartir", "It can't be shared"),
  ],
  correct: 0,
  explanation: P(
    "La filosofía de Go es «composición sobre herencia». Embebes un tipo con la capacidad que quieres (un `Camuflaje` con `Ocultar()`) en cuantos tipos la necesiten. Sin jerarquías rígidas: piezas que se combinan.",
    "Go's philosophy is \"composition over inheritance\". You embed a type with the capability you want (a `Camuflaje` with `Ocultar()`) into whatever types need it. No rigid hierarchies: pieces that combine.",
  ),
};
const Q_EMBED_IFACE = {
  question: P(
    "Un tipo embebe `Bendicion` (que aporta `Bendecir()`) y define su propio `Poder()`. ¿Puede cumplir una interfaz `Don { Poder() int }`?",
    "A type embeds `Bendicion` (providing `Bendecir()`) and defines its own `Poder()`. Can it satisfy an interface `Don { Poder() int }`?",
  ),
  options: [
    P("Sí: tiene `Poder()` (propio) y `Bendecir()` (promovido); cumple `Don`", "Yes: it has `Poder()` (its own) and `Bendecir()` (promoted); it satisfies `Don`"),
    P("No: embeber impide cumplir interfaces", "No: embedding prevents satisfying interfaces"),
    P("Sólo si `Bendicion` cumple `Don`", "Only if `Bendicion` satisfies `Don`"),
    P("Sólo con `implements Don`", "Only with `implements Don`"),
  ],
  correct: 0,
  explanation: P(
    "Los métodos promovidos cuentan para satisfacer interfaces igual que los propios. El tipo tiene `Poder()` (que exige `Don`) y de paso `Bendecir()` heredado por composición. Combina embedding e interfaces sin fricción.",
    "Promoted methods count toward satisfying interfaces just like the type's own. The type has `Poder()` (which `Don` requires) plus `Bendecir()` gained by composition. It combines embedding and interfaces seamlessly.",
  ),
};

/** Capítulo 7 · Embedding y composición. */
const Q_NO_INHERIT = {
  question: P("¿Tiene Go herencia de clases como Java o PHP?", "Does Go have class inheritance like Java or PHP?"),
  options: [
    P("No: usa COMPOSICIÓN (embedding) en su lugar", "No: it uses COMPOSITION (embedding) instead"),
    P("Sí, con `extends`", "Yes, with `extends`"),
    P("Sí, con `class`", "Yes, with `class`"),
    P("Sólo herencia múltiple", "Only multiple inheritance"),
  ],
  correct: 0,
  explanation: P(
    "Go no tiene clases ni herencia. Reutiliza comportamiento EMBEBIENDO un tipo dentro de otro (composición) y cumpliendo interfaces. «Composición sobre herencia» es aquí la única vía.",
    "Go has no classes or inheritance. It reuses behavior by EMBEDDING one type inside another (composition) and satisfying interfaces. \"Composition over inheritance\" is here the only way.",
  ),
};
const Q_EMBED_SYNTAX = {
  question: P("¿Cómo se embebe `Base` dentro de `Guerrero`?", "How do you embed `Base` inside `Guerrero`?"),
  options: [
    P("Poniendo el tipo SIN nombre de campo: `struct { Base; Arma string }`", "By writing the type WITHOUT a field name: `struct { Base; Arma string }`"),
    P("Con `Guerrero extends Base`", "With `Guerrero extends Base`"),
    P("Con `base Base` (con nombre)", "With `base Base` (named)"),
    P("Con `embed Base`", "With `embed Base`"),
  ],
  correct: 0,
  explanation: P(
    "Embeber es declarar el tipo sin nombre de campo. Si le pones nombre (`base Base`) es composición NORMAL: tendrías que escribir `g.base.Saludar()` en vez de `g.Saludar()`.",
    "Embedding is declaring the type with no field name. If you name it (`base Base`) it's PLAIN composition: you'd write `g.base.Saludar()` instead of `g.Saludar()`.",
  ),
};
const Q_PROMOTION_OVERRIDE = {
  question: P("Si `Guerrero` embebe `Base` y define su propio `Saludar()`, ¿cuál se llama?", "If `Guerrero` embeds `Base` and defines its own `Saludar()`, which is called?"),
  options: [
    P("El de Guerrero: el método propio TAPA al promovido", "Guerrero's: its own method SHADOWS the promoted one"),
    P("El de Base siempre", "Base's always"),
    P("Los dos", "Both"),
    P("Da error de ambigüedad", "An ambiguity error"),
  ],
  correct: 0,
  explanation: P(
    "El método definido en el tipo exterior tiene prioridad sobre el promovido del embebido. Aún puedes llamar al de Base explícitamente con `g.Base.Saludar()`.",
    "The method defined on the outer type takes precedence over the embedded promoted one. You can still call Base's explicitly with `g.Base.Saludar()`.",
  ),
};
const Q_EMBED_SATISFY = {
  question: P("Si `Base` cumple la interfaz `Saludador` y `Guerrero` embebe `Base`, ¿cumple `Guerrero` también?", "If `Base` satisfies interface `Saludador` and `Guerrero` embeds `Base`, does `Guerrero` satisfy it too?"),
  options: [
    P("Sí: hereda los métodos promovidos, así que satisface la interfaz", "Yes: it gains the promoted methods, so it satisfies the interface"),
    P("No: hay que reimplementarla", "No: you must reimplement it"),
    P("Sólo si lo declara", "Only if it declares it"),
    P("Nunca", "Never"),
  ],
  correct: 0,
  explanation: P(
    "Como los métodos de `Base` se promueven, `Guerrero` los tiene y por tanto satisface cualquier interfaz que cumpliera `Base`. Embeber + interfaces implícitas es la composición idiomática de Go.",
    "Since `Base`'s methods are promoted, `Guerrero` has them and thus satisfies any interface `Base` satisfied. Embedding + implicit interfaces is Go's idiomatic composition.",
  ),
};
const Q_EMBED_AMBIG = {
  question: P("Si embebes DOS tipos que tienen un método con el mismo nombre, ¿qué pasa al llamarlo sin cualificar?", "If you embed TWO types that have a method with the same name, what happens when you call it unqualified?"),
  options: [
    P("Error de ambigüedad: debes cualificar cuál, `g.A.M()` o `g.B.M()`", "Ambiguity error: you must qualify which, `g.A.M()` or `g.B.M()`"),
    P("Gana el primero", "The first wins"),
    P("Se ejecutan los dos", "Both run"),
    P("Se fusionan", "They merge"),
  ],
  correct: 0,
  explanation: P(
    "Si dos embebidos aportan el MISMO nombre de método, la llamada sin cualificar es ambigua y no compila: tienes que decir de cuál, `g.A.M()`. Go prefiere el error explícito a adivinar.",
    "If two embedded types provide the SAME method name, the unqualified call is ambiguous and won't compile: you must say which, `g.A.M()`. Go prefers an explicit error over guessing.",
  ),
};

export const SYL_GO_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_EMBED, Q_PROMOTION, Q_COMPOSITION] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_EMBED_IFACE, Q_NO_INHERIT, Q_EMBED_SYNTAX] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_PROMOTION_OVERRIDE, Q_EMBED_SATISFY, Q_EMBED_AMBIG] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk, capitán de Isengard", "Uglúk, captain of Isengard"),
    lore_intro: P(
      "El capitán se compone de un linaje base más lo suyo. En Go no se hereda: se EMBEBE. Compón un guerrero embebiendo la base.",
      "The captain is composed of a base lineage plus his own. In Go you don't inherit: you EMBED. Compose a warrior by embedding the base.",
    ),
    challenge: {
      topic: P("Embedding y promoción de métodos", "Embedding and method promotion"),
      instructions: P(
        "Existe el struct `Base` con campo `Nombre` y método `Saludar() string`. Define `Guerrero` que EMBEBA `Base` (sin nombre de campo) y añada un campo `Arma string`. Al embeber, el `Guerrero` obtiene `Nombre` y `Saludar()` como propios (promoción).\n\n`Guerrero{Base: Base{Nombre: \"Aragorn\"}}.Saludar()` → `\"soy Aragorn\"`.",
        "The struct `Base` with a `Nombre` field and a `Saludar() string` method exists. Define `Guerrero` that EMBEDS `Base` (no field name) and adds an `Arma string` field. By embedding, `Guerrero` gains `Nombre` and `Saludar()` as its own (promotion).\n\n`Guerrero{Base: Base{Nombre: \"Aragorn\"}}.Saludar()` → `\"soy Aragorn\"`.",
      ),
      support_code:
        'package main\n\ntype Base struct {\n\tNombre string\n}\n\nfunc (b Base) Saludar() string { return "soy " + b.Nombre }',
      starter_code:
        "// Base (con Nombre y Saludar()) ya existe.\n\ntype Guerrero struct {\n}\n",
      blocks: [
        "// Base (con Nombre y Saludar()) ya existe.",
        "type Guerrero struct {",
        "\tBase",
        "\tArma string",
        "}",
        "\tNombre string",
      ],
      hints: [
        P("Embeber es poner el tipo SIN nombre de campo: `type Guerrero struct { Base; Arma string }`.", "Embedding is writing the type WITHOUT a field name: `type Guerrero struct { Base; Arma string }`."),
        P("El método `Saludar()` de Base queda promovido a Guerrero: se llama directo.", "Base's `Saludar()` method is promoted to Guerrero: call it directly."),
      ],
      test_cases: [
        { input: 'Guerrero{Base: Base{Nombre: "Aragorn"}, Arma: "Andúril"}.Saludar()', expected: "soy Aragorn", description: P("Saludar() promovido de Base", "Saludar() promoted from Base"), raw: true },
        { input: 'Guerrero{Base: Base{Nombre: "Aragorn"}}.Nombre', expected: "Aragorn", description: P("El campo Nombre también se promueve", "The Nombre field is promoted too"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de Galadriel", "Galadriel's Scroll"),
    lore_intro: P(
      "La Dama entrega un pergamino. «En estas tierras no hay estirpes que hereden. Hay dones que se ENGARZAN en quien los porte: composición.»",
      "The Lady hands over a scroll. \"In these lands there are no bloodlines that inherit. There are gifts that are SET into whoever bears them: composition.\"",
    ),
    scroll: {
      topic: P("Embedding y composición", "Embedding and composition"),
      sections: [
        {
          heading: P("Embeber: promoción de métodos y campos", "Embedding: method and field promotion"),
          body: P(
            "Un tipo sin nombre de campo dentro de un struct queda EMBEBIDO: sus métodos y campos se promueven al que lo contiene, como si fueran suyos.",
            "A type with no field name inside a struct is EMBEDDED: its methods and fields are promoted to the container, as if they were its own.",
          ),
          code: "type ObjetoMagico struct{ Nombre string }\nfunc (o ObjetoMagico) Describir() string { return \"Don: \" + o.Nombre }\n\ntype Frasco struct {\n\tObjetoMagico // embebido\n}\n// Frasco{...}.Describir() y .Nombre funcionan (promovidos)",
        },
        {
          heading: P("Composición sobre herencia", "Composition over inheritance"),
          body: P(
            "Go no tiene herencia de clases. Compartes comportamiento embebiendo un tipo con esa capacidad en cuantos tipos la necesiten — sin parentesco.",
            "Go has no class inheritance. You share behavior by embedding a type with that capability into whatever types need it — with no kinship.",
          ),
          code: "type Camuflaje struct{}\nfunc (c Camuflaje) Ocultar() string { return \"te fundes\" }\n\ntype CapaElfica struct{ Camuflaje }\ntype Barca struct{ Camuflaje } // sin relación entre sí",
        },
        {
          heading: P("Embedding + interfaces", "Embedding + interfaces"),
          body: P(
            "Los métodos promovidos cuentan para cumplir interfaces. Un tipo puede embeber una capacidad y, con su propio método, satisfacer un contrato.",
            "Promoted methods count toward satisfying interfaces. A type can embed a capability and, with its own method, satisfy a contract.",
          ),
          code: "type Don interface{ Poder() int }\n\ntype Frasco struct{ Bendicion } // aporta Bendecir()\nfunc (f Frasco) Poder() int { return 5 + f.Bendecir() } // cumple Don",
        },
      ],
      keyTakeaway: P(
        "Go compone, no hereda: embeber un tipo promueve sus métodos y campos (has-a). Combínalo con interfaces —los métodos promovidos también cuentan— para reusar comportamiento sin jerarquías.",
        "Go composes, it doesn't inherit: embedding a type promotes its methods and fields (has-a). Combine it with interfaces —promoted methods count too— to reuse behavior without hierarchies.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P(
      "Todo don comparte una forma. Engarza esa base común en el frasco embebiéndola: sus métodos pasan a ser suyos.",
      "Every gift shares a shape. Set that common base into the phial by embedding it: its methods become its own.",
    ),
    challenge: {
      topic: P("Embedding (promoción de métodos)", "Embedding (method promotion)"),
      instructions: P(
        "Ya existe `ObjetoMagico` (con el campo `Nombre` y el método `Describir()`). Crea `FrascoDeGaladriel` que EMBEBA `ObjetoMagico` y añada el método `Usar()` que devuelva `\"una luz en los lugares oscuros\"`.\n\nAl embeberlo, `Describir()` y `Nombre` quedan promovidos.",
        "The type `ObjetoMagico` (with field `Nombre` and method `Describir()`) already exists. Create `FrascoDeGaladriel` that EMBEDS `ObjetoMagico` and adds the method `Usar()` returning `\"una luz en los lugares oscuros\"`.\n\nBy embedding it, `Describir()` and `Nombre` are promoted.",
      ),
      support_code:
        'package main\n\ntype ObjetoMagico struct {\n\tNombre string\n}\n\nfunc (o ObjetoMagico) Describir() string {\n\treturn "Don de Galadriel: " + o.Nombre\n}',
      starter_code: "\ntype FrascoDeGaladriel struct {\n}\n\nfunc (f FrascoDeGaladriel) Usar() string {\n}\n",
      blocks: [
        "type FrascoDeGaladriel struct {",
        "\tObjetoMagico",
        "}",
        "func (f FrascoDeGaladriel) Usar() string {",
        "\treturn \"una luz en los lugares oscuros\"",
        "}",
        "\treturn \"luz\"",
      ],
      hints: [
        P("Para embeber, escribe el tipo sin nombre de campo: `struct { ObjetoMagico }`.", "To embed, write the type with no field name: `struct { ObjetoMagico }`."),
        P("`Usar()` devuelve el texto exacto; `Describir()` ya viene promovido.", "`Usar()` returns the exact text; `Describir()` is already promoted."),
      ],
      test_cases: [
        { input: 'FrascoDeGaladriel{ObjetoMagico{Nombre: "Frasco"}}.Usar()', expected: "una luz en los lugares oscuros", description: P("Su método propio", "Its own method"), raw: true },
        { input: 'FrascoDeGaladriel{ObjetoMagico{Nombre: "Frasco"}}.Describir()', expected: "Don de Galadriel: Frasco", description: P("Describir() promovido del embebido", "Describir() promoted from the embedded type"), raw: true },
        { input: 'FrascoDeGaladriel{ObjetoMagico{Nombre: "Frasco"}}.Nombre', expected: "Frasco", description: P("El campo Nombre también se promueve", "The Nombre field is promoted too"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P(
      "Capas y barcas no son de la misma estirpe… pero ambas saben esconderse. Engarza la misma capacidad en las dos por composición.",
      "Cloaks and boats aren't of the same kin… yet both know how to hide. Set the same capability into both by composition.",
    ),
    challenge: {
      topic: P("Composición: embeber una capacidad", "Composition: embedding a capability"),
      instructions: P(
        "Ya existe `Camuflaje`, con el método `Ocultar()` que devuelve `\"te fundes con el bosque\"`. Crea DOS tipos SIN relación entre sí, `CapaElfica` y `Barca`, que EMBEBAN `Camuflaje` para ganar ese método.",
        "The type `Camuflaje`, with method `Ocultar()` returning `\"te fundes con el bosque\"`, already exists. Create TWO UNRELATED types, `CapaElfica` and `Barca`, that EMBED `Camuflaje` to gain that method.",
      ),
      support_code:
        'package main\n\ntype Camuflaje struct{}\n\nfunc (c Camuflaje) Ocultar() string {\n\treturn "te fundes con el bosque"\n}',
      starter_code: "\ntype CapaElfica struct {\n}\n\ntype Barca struct {\n}\n",
      blocks: [
        "type CapaElfica struct {",
        "\tCamuflaje",
        "}",
        "type Barca struct {",
        "\tCamuflaje",
        "}",
        "type CapaElfica struct{}",
      ],
      hints: [
        P("Embeber = escribir `Camuflaje` sin nombre de campo dentro de cada struct.", "Embedding = writing `Camuflaje` with no field name inside each struct."),
        P("No escribas `Ocultar()` en ninguna: viene promovido del embebido.", "Don't write `Ocultar()` in either: it comes promoted from the embedded type."),
      ],
      test_cases: [
        { input: "CapaElfica{}.Ocultar()", expected: "te fundes con el bosque", description: P("La capa esconde a quien la lleva", "The cloak hides its wearer"), raw: true },
        { input: "Barca{}.Ocultar()", expected: "te fundes con el bosque", description: P("La barca también, sin parentesco", "The boat too, with no kinship"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de la Dama", "The Lady's Gifts"),
    lore_intro: P(
      "Cada don lleva la bendición de Lórien y sabe declarar su poder. Embedding para la bendición, interfaz para el poder.",
      "Each gift bears Lórien's blessing and knows how to declare its power. Embedding for the blessing, an interface for the power.",
    ),
    challenge: {
      topic: P("Embedding + interfaces combinados", "Embedding + interfaces combined"),
      instructions: P(
        "Ya existen: la interfaz `Don` (con `Poder() int`), el tipo `Bendicion` (con `Bendecir() int` = 10) y `PoderTotal(dones []Don) int`. Crea `Frasco` y `Capa`: ambos EMBEBEN `Bendicion` y definen `Poder()` = su base + `Bendecir()`. Base 5 en Frasco (total 15), 2 en Capa (total 12).",
        "Already exist: the interface `Don` (with `Poder() int`), the type `Bendicion` (with `Bendecir() int` = 10) and `PoderTotal(dones []Don) int`. Create `Frasco` and `Capa`: both EMBED `Bendicion` and define `Poder()` = their base + `Bendecir()`. Base 5 in Frasco (total 15), 2 in Capa (total 12).",
      ),
      support_code:
        "package main\n\ntype Don interface {\n\tPoder() int\n}\n\ntype Bendicion struct{}\n\nfunc (b Bendicion) Bendecir() int { return 10 }\n\nfunc PoderTotal(dones []Don) int {\n\ttotal := 0\n\tfor _, d := range dones {\n\t\ttotal += d.Poder()\n\t}\n\treturn total\n}",
      starter_code: "\ntype Frasco struct {\n\tBendicion\n}\n\nfunc (f Frasco) Poder() int {\n}\n\ntype Capa struct {\n\tBendicion\n}\n\nfunc (c Capa) Poder() int {\n}\n",
      blocks: [
        "type Frasco struct {",
        "\tBendicion",
        "}",
        "func (f Frasco) Poder() int {",
        "\treturn 5 + f.Bendecir()",
        "}",
        "type Capa struct {",
        "\tBendicion",
        "}",
        "func (c Capa) Poder() int {",
        "\treturn 2 + c.Bendecir()",
        "}",
        "\treturn 5",
      ],
      hints: [
        P("`Bendecir()` viene promovido del embebido: `f.Bendecir()` funciona.", "`Bendecir()` comes promoted from the embedded type: `f.Bendecir()` works."),
        P("Al tener `Poder()`, ambos cumplen `Don` y entran en `PoderTotal`.", "By having `Poder()`, both satisfy `Don` and fit into `PoderTotal`."),
      ],
      test_cases: [
        { input: "Frasco{}.Poder()", expected: 15, description: P("5 propios + 10 de bendición", "5 of its own + 10 blessing"), raw: true },
        { input: "Capa{}.Poder()", expected: 12, description: P("2 propios + 10 de bendición", "2 of its own + 10 blessing"), raw: true },
        { input: "PoderTotal([]Don{Frasco{}, Capa{}})", expected: 27, description: P("Los suma a ambos como Don", "Sums both as Don"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre errores y factorías. */
const Q_ERROR_IFACE = {
  question: P(
    "En Go, ¿cómo se señala que algo salió mal (en vez de excepciones)?",
    "In Go, how do you signal that something went wrong (instead of exceptions)?",
  ),
  options: [
    P("Devolviendo un `error` como último valor: `(resultado, error)`", "Returning an `error` as the last value: `(result, error)`"),
    P("Con `throw`", "With `throw`"),
    P("Con `try/catch`", "With `try/catch`"),
    P("Devolviendo `-1` siempre", "Always returning `-1`"),
  ],
  correct: 0,
  explanation: P(
    "Go no tiene excepciones para los fallos normales: las funciones devuelven un `error` como último valor. Si todo fue bien, el error es `nil`. `error` es una interfaz con un método `Error() string`.",
    "Go has no exceptions for ordinary failures: functions return an `error` as the last value. If all went well, the error is `nil`. `error` is an interface with one method, `Error() string`.",
  ),
};
const Q_ERR_CHECK = {
  question: P(
    "¿Cuál es el patrón idiomático para comprobar un error en Go?",
    "What's the idiomatic pattern to check an error in Go?",
  ),
  options: [
    P("`v, err := f(); if err != nil { ... }`", "`v, err := f(); if err != nil { ... }`"),
    P("`try { f() } catch (err) { ... }`", "`try { f() } catch (err) { ... }`"),
    P("`if f().hasError()`", "`if f().hasError()`"),
    P("No se comprueban: se ignoran", "You don't check them: you ignore them"),
  ],
  correct: 0,
  explanation: P(
    "Recibes valor y error, y compruebas `if err != nil` justo después de la llamada. Es explícito y repetitivo a propósito: el manejo del error está a la vista, no escondido en un `catch` lejano.",
    "You receive the value and the error, and check `if err != nil` right after the call. It's explicit and repetitive on purpose: error handling is in plain sight, not hidden in a distant `catch`.",
  ),
};
const Q_ERRORS_NEW = {
  question: P(
    "¿Cómo se crea un error nuevo con un mensaje?",
    "How do you create a new error with a message?",
  ),
  options: [
    P("`errors.New(\"mensaje\")` (o `fmt.Errorf(\"...%d\", n)` con formato)", "`errors.New(\"message\")` (or `fmt.Errorf(\"...%d\", n)` with formatting)"),
    P("`new Error(\"mensaje\")`", "`new Error(\"message\")`"),
    P("`throw \"mensaje\"`", "`throw \"message\"`"),
    P("`raise(\"mensaje\")`", "`raise(\"message\")`"),
  ],
  correct: 0,
  explanation: P(
    "`errors.New(\"...\")` crea un error simple; `fmt.Errorf(\"...%w\", err)` compone un mensaje (y puede envolver otro error). Se leen con `err.Error()`. Nada de `new` ni `throw`: Go los TRATA como valores.",
    "`errors.New(\"...\")` makes a simple error; `fmt.Errorf(\"...%w\", err)` composes a message (and can wrap another error). Read them with `err.Error()`. No `new` or `throw`: Go treats them as values.",
  ),
};
const Q_NIL_ERR = {
  question: P(
    "Una función `(string, error)` termina bien. ¿Qué error devuelve?",
    "A `(string, error)` function finishes fine. What error does it return?",
  ),
  options: [
    P("`nil`: la ausencia de error", "`nil`: the absence of an error"),
    P("Un error vacío `\"\"`", "An empty error `\"\"`"),
    P("`0`", "`0`"),
    P("Debe lanzar algo igualmente", "It must throw something anyway"),
  ],
  correct: 0,
  explanation: P(
    "El valor cero de una interfaz es `nil`, y así se indica «sin error»: `return valor, nil`. Quien llama comprueba `if err != nil` y, si es `nil`, usa el valor con confianza.",
    "The zero value of an interface is `nil`, and that's how you say \"no error\": `return value, nil`. The caller checks `if err != nil` and, if it's `nil`, uses the value with confidence.",
  ),
};
const Q_FACTORY_GO = {
  question: P(
    "Una función `crear(tipo string) (Guerrero, error)` que devuelve distintos tipos según el parámetro. ¿Qué patrón es?",
    "A function `crear(tipo string) (Guerrero, error)` returning different types based on the parameter. What pattern is that?",
  ),
  options: [
    P("Una factoría: centraliza la creación y devuelve la interfaz", "A factory: it centralizes creation and returns the interface"),
    P("Un singleton", "A singleton"),
    P("Un método plantilla", "A template method"),
    P("Un decorador", "A decorator"),
  ],
  correct: 0,
  explanation: P(
    "La factoría decide QUÉ crear y devuelve un tipo de interfaz (`Guerrero`), así el que llama no se acopla al tipo concreto. Ante un tipo inválido, devuelve un `error` en vez de un valor inventado.",
    "The factory decides WHAT to create and returns an interface type (`Guerrero`), so the caller doesn't couple to the concrete type. For an invalid type, it returns an `error` instead of a made-up value.",
  ),
};

/** Capítulo 8 · Errores y constructores (factory). */
const Q_ERRORF = {
  question: P("¿Qué aporta `fmt.Errorf(\"fallo con %s\", nombre)` frente a `errors.New`?", "What does `fmt.Errorf(\"failed with %s\", name)` add over `errors.New`?"),
  options: [
    P("Un error con MENSAJE FORMATEADO (interpola valores)", "An error with a FORMATTED MESSAGE (interpolates values)"),
    P("Un error más rápido", "A faster error"),
    P("Un error que no se puede capturar", "An error that can't be caught"),
    P("Nada, son idénticos", "Nothing, they're identical"),
  ],
  correct: 0,
  explanation: P(
    "`fmt.Errorf` crea un error con un mensaje formateado como `Sprintf`. Con el verbo `%w` además ENVUELVE otro error para conservar la causa (`errors.Is`/`errors.As` la recuperan).",
    "`fmt.Errorf` builds an error with a `Sprintf`-formatted message. With the `%w` verb it also WRAPS another error to keep the cause (`errors.Is`/`errors.As` recover it).",
  ),
};
const Q_ERR_LAST = {
  question: P("Por convención, ¿dónde va el `error` en los valores de retorno?", "By convention, where does the `error` go in the return values?"),
  options: [
    P("El ÚLTIMO: `func f() (T, error)`", "LAST: `func f() (T, error)`"),
    P("El primero", "First"),
    P("En medio", "In the middle"),
    P("Da igual", "It doesn't matter"),
  ],
  correct: 0,
  explanation: P(
    "El error es siempre el último valor devuelto, y se comprueba de inmediato: `v, err := f(); if err != nil { return err }`. Esta convención está por toda la stdlib.",
    "The error is always the last returned value, checked right away: `v, err := f(); if err != nil { return err }`. This convention is all over the stdlib.",
  ),
};
const Q_PANIC = {
  question: P("¿Cuándo se usa `panic` en Go en vez de devolver un `error`?", "When is `panic` used in Go instead of returning an `error`?"),
  options: [
    P("Sólo para fallos IRRECUPERABLES o bugs del programador; los errores esperables se devuelven", "Only for UNRECOVERABLE failures or programmer bugs; expected errors are returned"),
    P("Siempre que algo falla", "Whenever something fails"),
    P("Para validar la entrada del usuario", "To validate user input"),
    P("Nunca existe", "It doesn't exist"),
  ],
  correct: 0,
  explanation: P(
    "En Go los fallos ESPERABLES se devuelven como `error`. `panic` se reserva para lo irrecuperable (un estado imposible, un bug). Abusar de `panic` como excepción es antiidiomático.",
    "In Go, EXPECTED failures are returned as `error`. `panic` is reserved for the unrecoverable (an impossible state, a bug). Abusing `panic` as an exception is unidiomatic.",
  ),
};
const Q_ERRORS_IS = {
  question: P("¿Para qué sirve `errors.Is(err, ErrNoEncontrado)`?", "What is `errors.Is(err, ErrNotFound)` for?"),
  options: [
    P("Comprobar si `err` ES (o envuelve) ese error concreto", "Check whether `err` IS (or wraps) that specific error"),
    P("Crear un error nuevo", "Create a new error"),
    P("Convertir err en texto", "Convert err to text"),
    P("Lanzar el error", "Throw the error"),
  ],
  correct: 0,
  explanation: P(
    "`errors.Is` compara con un error centinela recorriendo la cadena de envueltos (`%w`). Así distingues «no encontrado» de otros fallos sin comparar textos. `errors.As` extrae un tipo concreto.",
    "`errors.Is` compares against a sentinel error walking the wrapped chain (`%w`). That's how you tell \"not found\" from other failures without comparing strings. `errors.As` extracts a concrete type.",
  ),
};

export const SYL_GO_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_ERROR_IFACE, Q_ERR_CHECK, Q_ERRORS_NEW] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_NIL_ERR, Q_FACTORY_GO, Q_ERRORF] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_ERR_LAST, Q_PANIC, Q_ERRORS_IS] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, el primero de los Uruk-hai", "Lurtz, first of the Uruk-hai"),
    lore_intro: P(
      "El último enemigo de la Comunidad. Monta la fábrica que crea la hueste de Isengard — y que ante lo desconocido devuelve un error, no un guerrero falso.",
      "The Fellowship's last foe. Build the factory that creates the host of Isengard — and that, faced with the unknown, returns an error, not a fake warrior.",
    ),
    challenge: {
      topic: P("Constructor con (valor, error)", "Constructor with (value, error)"),
      instructions: P(
        "Existen la interfaz `Guerrero` (con `Fuerza() int`), los tipos `Orco` (fuerza 10) y `UrukHai` (fuerza 30), y el error `ErrDesconocido`. Escribe `Crear(tipo string) (Guerrero, error)` que devuelva un `Orco` para `\"orco\"`, un `UrukHai` para `\"uruk\"` (con `nil` de error), y `nil, ErrDesconocido` para cualquier otro tipo.",
        "The interface `Guerrero` (with `Fuerza() int`), the types `Orco` (strength 10) and `UrukHai` (strength 30), and the error `ErrDesconocido` exist. Write `Crear(tipo string) (Guerrero, error)` returning an `Orco` for `\"orco\"`, a `UrukHai` for `\"uruk\"` (with `nil` error), and `nil, ErrDesconocido` for any other type.",
      ),
      support_code:
        'package main\n\nimport "errors"\n\ntype Guerrero interface {\n\tFuerza() int\n}\n\ntype Orco struct{}\n\nfunc (o Orco) Fuerza() int { return 10 }\n\ntype UrukHai struct{}\n\nfunc (u UrukHai) Fuerza() int { return 30 }\n\nvar ErrDesconocido = errors.New("tipo desconocido")\n\nfunc fuerzaDe(tipo string) int { g, _ := Crear(tipo); return g.Fuerza() }\n\nfunc esError(tipo string) bool { _, err := Crear(tipo); return err != nil }',
      starter_code:
        "// Guerrero, Orco, UrukHai y ErrDesconocido ya existen.\n\nfunc Crear(tipo string) (Guerrero, error) {\n}\n",
      blocks: [
        "// Guerrero, Orco, UrukHai y ErrDesconocido ya existen.",
        "func Crear(tipo string) (Guerrero, error) {",
        "\tswitch tipo {",
        "\tcase \"orco\":",
        "\t\treturn Orco{}, nil",
        "\tcase \"uruk\":",
        "\t\treturn UrukHai{}, nil",
        "\tdefault:",
        "\t\treturn nil, ErrDesconocido",
        "\t}",
        "}",
        "\t\treturn Orco{}, nil",
      ],
      hints: [
        P("Un `switch tipo` con un `case` por cada guerrero, devolviendo `(guerrero, nil)`.", "A `switch tipo` with a `case` per warrior, returning `(guerrero, nil)`."),
        P("El `default` devuelve el error: `return nil, ErrDesconocido`.", "The `default` returns the error: `return nil, ErrDesconocido`."),
      ],
      test_cases: [
        { input: 'fuerzaDe("orco")', expected: 10, description: P("El orco", "The orc"), raw: true },
        { input: 'fuerzaDe("uruk")', expected: 30, description: P("El Uruk-hai", "The Uruk-hai"), raw: true },
        { input: 'esError("elfo")', expected: true, description: P("Un tipo desconocido da error", "An unknown type returns an error"), raw: true },
        { input: 'esError("orco")', expected: false, description: P("Uno válido, sin error", "A valid one, no error"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino de lo que Puede Fallar", "The Scroll of What Can Go Wrong"),
    lore_intro: P(
      "Aragorn deja caer un pergamino. «En Go, un fallo no se lanza: se devuelve. Un error es un valor más, y comprobarlo es tu deber.»",
      "Aragorn drops a scroll. \"In Go, a failure isn't thrown: it's returned. An error is just another value, and checking it is your duty.\"",
    ),
    scroll: {
      topic: P("Errores y factorías", "Errors and factories"),
      sections: [
        {
          heading: P("El error como valor de retorno", "The error as a return value"),
          body: P(
            "Go no usa excepciones para los fallos normales: la función devuelve un `error` como último valor. `nil` significa «todo bien». Se crea con `errors.New(...)` o `fmt.Errorf(...)`.",
            "Go doesn't use exceptions for ordinary failures: the function returns an `error` as the last value. `nil` means \"all good\". Create it with `errors.New(...)` or `fmt.Errorf(...)`.",
          ),
          code: "import \"errors\"\n\nfunc resistir(tentacion int) (string, error) {\n\tif tentacion > 80 {\n\t\treturn \"\", errors.New(\"El Anillo lo reclama\")\n\t}\n\treturn \"resiste\", nil\n}",
        },
        {
          heading: P("Comprobar el error", "Checking the error"),
          body: P(
            "El patrón idiomático: recibe valor y error, y comprueba `if err != nil` justo después. El manejo está a la vista, no escondido en un catch lejano.",
            "The idiomatic pattern: receive value and error, and check `if err != nil` right after. The handling is in plain sight, not hidden in a distant catch.",
          ),
          code: "vision, err := mirar(conAnillo)\nif err != nil {\n\treturn \"te quitas el Anillo: \" + err.Error()\n}\nreturn vision",
        },
        {
          heading: P("Factoría con error", "Factory with an error"),
          body: P(
            "Una factoría decide qué crear y devuelve un tipo de interfaz. Ante un tipo inválido, devuelve un `error` en lugar de un valor inventado.",
            "A factory decides what to create and returns an interface type. For an invalid type, it returns an `error` instead of a made-up value.",
          ),
          code: "func crear(tipo string) (Guerrero, error) {\n\tswitch tipo {\n\tcase \"orco\":\n\t\treturn Orco{}, nil\n\tdefault:\n\t\treturn nil, errors.New(\"tipo desconocido: \" + tipo)\n\t}\n}",
        },
      ],
      keyTakeaway: P(
        "En Go los errores son valores: se devuelven como último resultado, se crean con errors.New/fmt.Errorf y se comprueban con `if err != nil`. Una factoría devuelve la interfaz y un error ante lo inválido.",
        "In Go errors are values: returned as the last result, created with errors.New/fmt.Errorf and checked with `if err != nil`. A factory returns the interface and an error for the invalid case.",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P(
      "Cuando la voluntad flaquea, no lo escondas: devuélvelo como error. Un error es un valor más.",
      "When the will falters, don't hide it: return it as an error. An error is just another value.",
    ),
    challenge: {
      topic: P("Devolver un error", "Returning an error"),
      instructions: P(
        "Escribe `resistir(tentacion int) (string, error)`:\n• si `tentacion` es 80 o menos, devuelve `\"resiste\"` y `nil`,\n• si es mayor que 80, devuelve `\"\"` y un `errors.New(\"El Anillo lo reclama\")`.\n\nEl paquete `errors` ya está disponible. Se prueba con los ayudantes `mensajeDe` y `fallaCon`.",
        "Write `resistir(tentacion int) (string, error)`:\n• if `tentacion` is 80 or less, return `\"resiste\"` and `nil`,\n• if greater than 80, return `\"\"` and an `errors.New(\"El Anillo lo reclama\")`.\n\nThe `errors` package is available. It's tested via the helpers `mensajeDe` and `fallaCon`.",
      ),
      support_code:
        'package main\n\nimport "errors"\n\nvar _ = errors.New\n\nfunc mensajeDe(t int) string {\n\ts, err := resistir(t)\n\tif err != nil {\n\t\treturn err.Error()\n\t}\n\treturn s\n}\n\nfunc fallaCon(t int) bool {\n\t_, err := resistir(t)\n\treturn err != nil\n}',
      starter_code: '\nfunc resistir(tentacion int) (string, error) {\n}\n',
      blocks: [
        "func resistir(tentacion int) (string, error) {",
        "\tif tentacion >= 90 {",
        "\t\treturn \"\", errors.New(\"El Anillo lo reclama\")",
        "\t}",
        "\treturn \"resiste\", nil",
        "}",
        "\t\treturn \"resiste\", nil",
      ],
      hints: [
        P("Guard clause: `if tentacion > 80 { return \"\", errors.New(\"El Anillo lo reclama\") }`.", "Guard clause: `if tentacion > 80 { return \"\", errors.New(\"El Anillo lo reclama\") }`."),
        P("El caso bueno: `return \"resiste\", nil`.", "The good case: `return \"resiste\", nil`."),
      ],
      test_cases: [
        { input: "mensajeDe(50)", expected: "resiste", description: P("Poca tentación: aguanta", "Little temptation: he holds"), raw: true },
        { input: "mensajeDe(95)", expected: "El Anillo lo reclama", description: P("El error lleva su mensaje", "The error carries its message"), raw: true },
        { input: "fallaCon(95)", expected: true, description: P("Con 95 sucumbe (error != nil)", "At 95 he succumbs (error != nil)"), raw: true },
        { input: "fallaCon(50)", expected: false, description: P("Con 50 no hay error", "At 50 there's no error"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P(
      "Mirar con el Anillo tiene un precio. Recibe el error y reacciona con `if err != nil`.",
      "Looking with the Ring has a price. Receive the error and react with `if err != nil`.",
    ),
    challenge: {
      topic: P("Comprobar y manejar un error", "Checking and handling an error"),
      instructions: P(
        "Ya existe `mirar(conAnillo bool) (string, error)`, que devuelve un error si miras con el Anillo puesto. Escribe `observar(conAnillo bool) string` que:\n• si hay error, devuelva `\"te quitas el Anillo: \"` seguido del mensaje del error,\n• si no, devuelva la visión.",
        "The function `mirar(conAnillo bool) (string, error)` already exists, returning an error if you look with the Ring on. Write `observar(conAnillo bool) string` that:\n• if there's an error, returns `\"te quitas el Anillo: \"` followed by the error's message,\n• otherwise returns the vision.",
      ),
      support_code:
        'package main\n\nimport "errors"\n\nfunc mirar(conAnillo bool) (string, error) {\n\tif conAnillo {\n\t\treturn "", errors.New("El Ojo te ve")\n\t}\n\treturn "ves las tierras de Rohan", nil\n}',
      starter_code: '\nfunc observar(conAnillo bool) string {\n\tvision, err := mirar(conAnillo)\n}\n',
      blocks: [
        "func observar(conAnillo bool) string {",
        "\tvision, err := mirar(conAnillo)",
        "\tif err != nil {",
        "\t\treturn \"te quitas el Anillo: \" + err.Error()",
        "\t}",
        "\treturn vision",
        "}",
        "\treturn vision",
      ],
      hints: [
        P("`if err != nil { return \"te quitas el Anillo: \" + err.Error() }`.", "`if err != nil { return \"te quitas el Anillo: \" + err.Error() }`."),
        P("Si no hubo error, `return vision`.", "If there was no error, `return vision`."),
      ],
      test_cases: [
        { input: "observar(false)", expected: "ves las tierras de Rohan", description: P("Sin el Anillo, visión segura", "Without the Ring, safe vision"), raw: true },
        { input: "observar(true)", expected: "te quitas el Anillo: El Ojo te ve", description: P("Con el Anillo, capturas el error", "With the Ring, you catch the error"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P(
      "No los crees uno a uno: una factoría decide qué crear y, ante lo desconocido, devuelve un error.",
      "Don't create them one by one: a factory decides what to make and, faced with the unknown, returns an error.",
    ),
    challenge: {
      topic: P("Factoría con error", "Factory with an error"),
      instructions: P(
        "Ya existen la interfaz `Guerrero` (con `ResistenciaSol() int`) y los tipos `Orco` (0) y `UrukHai` (100). Escribe `crear(tipo string) (Guerrero, error)` que devuelva un `Orco` para `\"orco\"`, un `UrukHai` para `\"uruk\"`, y un `errors.New(...)` (con `nil` como Guerrero) para cualquier otro tipo.\n\nSe prueba con `resistenciaDe` y `fallaAl`.",
        "The interface `Guerrero` (with `ResistenciaSol() int`) and the types `Orco` (0) and `UrukHai` (100) already exist. Write `crear(tipo string) (Guerrero, error)` returning an `Orco` for `\"orco\"`, a `UrukHai` for `\"uruk\"`, and an `errors.New(...)` (with `nil` as the Guerrero) for any other type.\n\nTested via `resistenciaDe` and `fallaAl`.",
      ),
      support_code:
        'package main\n\nimport "errors"\n\ntype Guerrero interface {\n\tResistenciaSol() int\n}\n\ntype Orco struct{}\n\nfunc (o Orco) ResistenciaSol() int { return 0 }\n\ntype UrukHai struct{}\n\nfunc (u UrukHai) ResistenciaSol() int { return 100 }\n\nvar _ = errors.New\n\nfunc resistenciaDe(tipo string) int {\n\tg, err := crear(tipo)\n\tif err != nil {\n\t\treturn -1\n\t}\n\treturn g.ResistenciaSol()\n}\n\nfunc fallaAl(tipo string) bool {\n\t_, err := crear(tipo)\n\treturn err != nil\n}',
      starter_code: '\nfunc crear(tipo string) (Guerrero, error) {\n}\n',
      blocks: [
        "func crear(tipo string) (Guerrero, error) {",
        "\tswitch tipo {",
        "\tcase \"orco\":",
        "\t\treturn Orco{}, nil",
        "\tcase \"uruk\":",
        "\t\treturn UrukHai{}, nil",
        "\tdefault:",
        "\t\treturn nil, errors.New(\"tipo desconocido\")",
        "\t}",
        "}",
        "\t\treturn Orco{}, nil",
      ],
      hints: [
        P("`switch tipo` con `case \"orco\": return Orco{}, nil` y `case \"uruk\": return UrukHai{}, nil`.", "`switch tipo` with `case \"orco\": return Orco{}, nil` and `case \"uruk\": return UrukHai{}, nil`."),
        P("`default: return nil, errors.New(\"tipo desconocido: \" + tipo)`.", "`default: return nil, errors.New(\"tipo desconocido: \" + tipo)`."),
      ],
      test_cases: [
        { input: 'resistenciaDe("orco")', expected: 0, description: P("El orco se abrasa al sol", "The orc burns in the sun"), raw: true },
        { input: 'resistenciaDe("uruk")', expected: 100, description: P("El Uruk-hai marcha a plena luz", "The Uruk-hai marches in daylight"), raw: true },
        { input: 'fallaAl("elfo")', expected: true, description: P("Un tipo desconocido da error", "An unknown type errors"), raw: true },
        { input: 'resistenciaDe("elfo")', expected: -1, description: P("…y el ayudante lo traduce a -1", "…and the helper turns it into -1"), raw: true },
      ],
    },
  },
};
