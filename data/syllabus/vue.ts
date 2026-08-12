import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de Vue 3 sobre la narrativa compartida de la Comunidad. Los retos se
 * EJECUTAN de verdad: se carga el build global de Vue (`/vue/vue.global.prod.js`)
 * y el evaluador monta el/los componente(s) del jugador y compara el HTML
 * resultante (ver `lib/game/vue-evaluator.ts`). En los tests: `render(Comp, props)`
 * da el HTML; `trasClick`/`trasClicks`/`trasInput` esperan al `nextTick` tras
 * interactuar. Bilingüe ES/EN. ARCHIVO GENERADO (scripts/gen-vue en scratchpad).
 */

const P = (es: string, en: string) => ({ es, en });
const p = P;

export const SYL_VUE_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué es un componente en Vue?", "What is a component in Vue?"),
        options: [
          p("Un objeto con `template` y lógica que produce una parte de la interfaz", "An object with a `template` and logic that produces a piece of UI"),
          p("Una etiqueta HTML nueva", "A new HTML tag"),
          p("Un fichero .css", "A .css file"),
          p("Una variable global", "A global variable"),
        ],
        correct: 0,
        explanation: p("Un componente Vue es un objeto (o SFC) con `template` y opciones como `props`, `setup`, `computed`. Se monta con `createApp(Comp).mount(...)`.", "A Vue component is an object (or SFC) with a `template` and options like `props`, `setup`, `computed`. It's mounted with `createApp(Comp).mount(...)`."),
      },
      {
        question: p("En la plantilla, ¿cómo se muestra el valor de `nombre`?", "In the template, how do you show the value of `nombre`?"),
        options: [
          p("Con dobles llaves: `{{ nombre }}`", "With double braces: `{{ nombre }}`"),
          p("Con `${nombre}`", "With `${nombre}`"),
          p("Con `<nombre>`", "With `<nombre>`"),
          p("Con `[nombre]`", "With `[nombre]`"),
        ],
        correct: 0,
        explanation: p("La interpolación de texto usa dobles llaves (bigote): `{{ expresión }}`. Dentro va cualquier expresión JS.", "Text interpolation uses double braces (mustache): `{{ expression }}`. Any JS expression goes inside."),
      },
      {
        question: p("¿Para qué sirven las `props`?", "What are `props` for?"),
        options: [
          p("Recibir datos del exterior, como atributos de la etiqueta", "To receive data from outside, like tag attributes"),
          p("Guardar el estado interno", "To hold internal state"),
          p("Definir estilos", "To define styles"),
          p("Llamar al servidor", "To call the server"),
        ],
        correct: 0,
        explanation: p("Las props son la entrada del componente: `<Ficha nombre=\"Frodo\" />` pasa `{ nombre: 'Frodo' }`. Son de sólo lectura.", "Props are the component's input: `<Ficha nombre=\"Frodo\" />` passes `{ nombre: 'Frodo' }`. They're read-only."),
      }
    ],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [
    {
        question: p("¿Cómo se declaran las props en un componente?", "How are props declared in a component?"),
        options: [
          p("Con la opción `props: ['nombre']` (o un objeto)", "With the `props: ['nombre']` option (or an object)"),
          p("Con `data`", "With `data`"),
          p("Con `let props`", "With `let props`"),
          p("No se declaran", "They aren't declared"),
        ],
        correct: 0,
        explanation: p("Se declaran en `props`, como array de nombres o un objeto con tipos. Así Vue sabe qué atributos son props.", "You declare them in `props`, as an array of names or an object with types. That tells Vue which attributes are props."),
      },
      {
        question: p("Dentro de `{{ }}`, ¿qué se puede poner?", "Inside `{{ }}`, what can go?"),
        options: [
          p("Cualquier EXPRESIÓN JS: `{{ 1 + 2 }}`, `{{ n ? 'sí' : 'no' }}`", "Any JS EXPRESSION: `{{ 1 + 2 }}`, `{{ n ? 'sí' : 'no' }}`"),
          p("Sólo variables sueltas", "Only bare variables"),
          p("Sentencias `if`", "`if` statements"),
          p("Etiquetas HTML", "HTML tags"),
        ],
        correct: 0,
        explanation: p("Las llaves aceptan una expresión (no sentencias). Ternarios, sumas y llamadas valen; `if`/`for` no.", "Braces accept an expression (not statements). Ternaries, sums and calls work; `if`/`for` don't."),
      },
      {
        question: p("¿El nombre de componente `<Ficha>` distingue mayúsculas?", "Does the component name `<Ficha>` care about case?"),
        options: [
          p("Sí: en plantilla se usa PascalCase para tus componentes", "Yes: in templates PascalCase is used for your components"),
          p("No, da igual", "No, it doesn't matter"),
          p("Debe ir en minúscula", "It must be lowercase"),
          p("Sólo con guiones", "Only with hyphens"),
        ],
        correct: 0,
        explanation: p("Tus componentes se registran y usan en PascalCase (`<Ficha/>`); las etiquetas en minúscula son HTML nativo.", "Your components are registered and used in PascalCase (`<Ficha/>`); lowercase tags are native HTML."),
      }
    ],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [
    {
        question: p("¿Puede un `template` tener varias etiquetas raíz en Vue 3?", "Can a `template` have multiple root tags in Vue 3?"),
        options: [
          p("Sí, Vue 3 admite fragmentos (varios nodos raíz)", "Yes, Vue 3 supports fragments (multiple root nodes)"),
          p("No, sólo una", "No, only one"),
          p("Sólo con `<template>`", "Only with `<template>`"),
          p("Sólo listas", "Only lists"),
        ],
        correct: 0,
        explanation: p("A diferencia de Vue 2, en Vue 3 un componente puede devolver varios nodos raíz sin envolverlos.", "Unlike Vue 2, in Vue 3 a component can return several root nodes without wrapping them."),
      },
      {
        question: p("¿Cómo se pasa una prop numérica literal `poder`?", "How do you pass a literal numeric prop `poder`?"),
        options: [
          p("Con v-bind: `:poder=\"80\"` (o `v-bind:poder`)", "With v-bind: `:poder=\"80\"` (or `v-bind:poder`)"),
          p("`poder=\"80\"` siempre da número", "`poder=\"80\"` always gives a number"),
          p("`poder={80}`", "`poder={80}`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("`poder=\"80\"` pasa el STRING \"80\". Para un número usa `:poder=\"80\"`, que evalúa la expresión.", "`poder=\"80\"` passes the STRING \"80\". For a number use `:poder=\"80\"`, which evaluates the expression."),
      },
      {
        question: p("¿Qué hace `createApp(Comp).mount('#app')`?", "What does `createApp(Comp).mount('#app')` do?"),
        options: [
          p("Crea la app y monta `Comp` en el elemento `#app`", "Creates the app and mounts `Comp` into the `#app` element"),
          p("Compila CSS", "Compiles CSS"),
          p("Borra el DOM", "Clears the DOM"),
          p("Define una prop", "Defines a prop"),
        ],
        correct: 0,
        explanation: p("`createApp` crea la instancia de aplicación y `mount` la conecta a un nodo del DOM, renderizando el componente raíz.", "`createApp` creates the app instance and `mount` attaches it to a DOM node, rendering the root component."),
      }
    ],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("El señor de los Nazgûl exige tu ficha completa: nombre y poder.", "The lord of the Nazgûl demands your full card: name and power."),
    challenge: {
      topic: P("Componente con varias props", "Component with several props"),
      instructions: P("Define `Ficha` con props `nombre` y `poder`, y `template` `<div><h2>{{ nombre }}</h2><span>{{ poder }}</span></div>`.", "Define `Ficha` with props `nombre` and `poder`, and template `<div><h2>{{ nombre }}</h2><span>{{ poder }}</span></div>`."),
      starter_code: "const Ficha = {\n  props: [],\n  template: ''\n};\n",
      blocks: [
        "const Ficha = {",
        "  props: ['nombre', 'poder'],",
        "  template: '<div><h2>{{ nombre }}</h2><span>{{ poder }}</span></div>'",
        "};",
        "  template: '<div><h2>nombre</h2><span>poder</span></div>'",
      ],
      hints: [
        P("El poder es un número: recuerda pasarlo con `:poder=\"80\"`.", "Power is a number: remember to pass it with `:poder=\"80\"`."),
      ],
      test_cases: [
        { input: "render(Ficha, { nombre: 'Aragorn', poder: 80 })", expected: "<div><h2>Aragorn</h2><span>80</span></div>", description: P("Aragorn, poder 80", "Aragorn, power 80"), raw: true },
        { input: "render(Ficha, { nombre: 'Sam', poder: 30 })", expected: "<div><h2>Sam</h2><span>30</span></div>", description: P("Sam, poder 30", "Sam, power 30"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: p("El Pergamino del Componente", "The Scroll of the Component"),
    lore_intro: p("Un pergamino enseña a forjar componentes con plantilla y props.", "A scroll teaches how to forge components with a template and props."),
    scroll: {
      topic: p("Vue: componentes, plantillas y props", "Vue: components, templates and props"),
      sections: [
        { heading: p("Componente", "Component"), body: p("Un componente es un objeto con `template`. Se monta con `createApp(Comp).mount('#app')`.", "A component is an object with a `template`. It's mounted with `createApp(Comp).mount('#app')`."), code: "const Ficha = {\n  template: '<h1>Comunidad</h1>'\n};" },
        { heading: p("Interpolación", "Interpolation"), body: p("Las dobles llaves muestran una expresión: `{{ nombre }}`, `{{ 1 + 2 }}`.", "Double braces show an expression: `{{ nombre }}`, `{{ 1 + 2 }}`."), code: "template: '<p>{{ nombre }}</p>'" },
        { heading: p("Props", "Props"), body: p("La entrada del componente se declara en `props` y llega como atributos.", "The component's input is declared in `props` and arrives as attributes."), code: "props: ['nombre', 'poder']" },
      ],
      keyTakeaway: p("Un componente es un objeto con template; `{{ }}` interpola expresiones; las props son la entrada de sólo lectura.", "A component is an object with a template; `{{ }}` interpolates expressions; props are its read-only input."),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing the Flight"),
    lore_intro: P("Todo héroe empieza por izar su estandarte. Escribe el componente que lo muestra.", "Every hero starts by raising their banner. Write the component that shows it."),
    challenge: {
      topic: P("Componente y plantilla", "Component and template"),
      instructions: P("Define el componente `Estandarte` cuyo `template` sea exactamente `<h1>La Comunidad del Anillo</h1>`.", "Define the `Estandarte` component whose `template` is exactly `<h1>La Comunidad del Anillo</h1>`."),
      starter_code: "const Estandarte = {\n  template: ''\n};\n",
      blocks: [
        "const Estandarte = {",
        "  template: '<h1>La Comunidad del Anillo</h1>'",
        "};",
        "  template: '{{ La Comunidad del Anillo }}'",
      ],
      hints: [
        P("Un componente es un objeto con `template`.", "A component is an object with a `template`."),
      ],
      test_cases: [
        { input: "render(Estandarte, {})", expected: "<h1>La Comunidad del Anillo</h1>", description: P("Muestra el estandarte", "Shows the banner"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P("Un Jinete husmea el aire: identifícate con nombre y raza.", "A Rider sniffs the air: identify yourself with name and race."),
    challenge: {
      topic: P("Props e interpolación", "Props and interpolation"),
      instructions: P("Define `Placa` con las props `nombre` y `raza`, y `template` `<p>{{ nombre }}, {{ raza }}</p>`.", "Define `Placa` with props `nombre` and `raza`, and template `<p>{{ nombre }}, {{ raza }}</p>`."),
      starter_code: "const Placa = {\n  props: [],\n  template: ''\n};\n",
      blocks: [
        "const Placa = {",
        "  props: ['nombre', 'raza'],",
        "  template: '<p>{{ nombre }}, {{ raza }}</p>'",
        "};",
        "  template: '<p>nombre, raza</p>'",
      ],
      hints: [
        P("Declara ambas props: `props: ['nombre', 'raza']`.", "Declare both props: `props: ['nombre', 'raza']`."),
        P("Interpola con dobles llaves: `{{ nombre }}`.", "Interpolate with double braces: `{{ nombre }}`."),
      ],
      test_cases: [
        { input: "render(Placa, { nombre: 'Frodo', raza: 'hobbit' })", expected: "<p>Frodo, hobbit</p>", description: P("Frodo el hobbit", "Frodo the hobbit"), raw: true },
        { input: "render(Placa, { nombre: 'Gimli', raza: 'enano' })", expected: "<p>Gimli, enano</p>", description: P("Gimli el enano", "Gimli the dwarf"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_2: Syllabus = {
  c2_raiz: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué directiva repite un elemento por cada ítem de un array?", "Which directive repeats an element for each item of an array?"),
        options: [
          p("`v-for`", "`v-for`"),
          p("`v-each`", "`v-each`"),
          p("`v-loop`", "`v-loop`"),
          p("`v-map`", "`v-map`"),
        ],
        correct: 0,
        explanation: p("`v-for=\"item in lista\"` renderiza el elemento una vez por cada `item`.", "`v-for=\"item in lista\"` renders the element once per `item`."),
      },
      {
        question: p("¿Por qué se pone `:key` en un `v-for`?", "Why put `:key` on a `v-for`?"),
        options: [
          p("Para que Vue identifique cada nodo y actualice eficientemente", "So Vue can identify each node and update efficiently"),
          p("Para ordenar", "To sort"),
          p("Es decorativo", "It's decorative"),
          p("Para el CSS", "For CSS"),
        ],
        correct: 0,
        explanation: p("`:key` da identidad estable a cada elemento; Vue lo usa para reutilizar nodos y evitar errores al reordenar.", "`:key` gives each element a stable identity; Vue uses it to reuse nodes and avoid bugs when reordering."),
      },
      {
        question: p("¿Qué hace `:href=\"url\"`?", "What does `:href=\"url\"` do?"),
        options: [
          p("Enlaza el atributo `href` a la expresión `url`", "Binds the `href` attribute to the expression `url`"),
          p("Pone el texto `url`", "Sets the text `url`"),
          p("Crea una prop", "Creates a prop"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`:atributo=\"expr\"` (v-bind) enlaza un atributo HTML a una expresión JS. `:href=\"url\"` usa el valor de `url`.", "`:attribute=\"expr\"` (v-bind) binds an HTML attribute to a JS expression. `:href=\"url\"` uses the value of `url`."),
      }
    ],
  },
  c2_niebla: {
    kind: "battle",
    questions: [
    {
        question: p("En `v-for=\"m in miembros\"`, ¿qué es `m`?", "In `v-for=\"m in miembros\"`, what is `m`?"),
        options: [
          p("Cada elemento del array en cada vuelta", "Each array element on each pass"),
          p("El índice", "The index"),
          p("El array entero", "The whole array"),
          p("La clave", "The key"),
        ],
        correct: 0,
        explanation: p("`m` es el ítem actual. Para el índice: `v-for=\"(m, i) in miembros\"`.", "`m` is the current item. For the index: `v-for=\"(m, i) in miembros\"`."),
      },
      {
        question: p("¿Cómo accedes a un campo del objeto en `v-for`?", "How do you access an object field in `v-for`?"),
        options: [
          p("Con punto: `{{ m.nombre }}`", "With a dot: `{{ m.nombre }}`"),
          p("Con `m->nombre`", "With `m->nombre`"),
          p("Con `m::nombre`", "With `m::nombre`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("Si `m` es un objeto, `{{ m.nombre }}` muestra su campo `nombre`.", "If `m` is an object, `{{ m.nombre }}` shows its `nombre` field."),
      },
      {
        question: p("`:href` es la forma corta de…", "`:href` is shorthand for…"),
        options: [
          p("`v-bind:href`", "`v-bind:href`"),
          p("`v-on:href`", "`v-on:href`"),
          p("`v-model:href`", "`v-model:href`"),
          p("`v-if:href`", "`v-if:href`"),
        ],
        correct: 0,
        explanation: p("Los dos puntos `:` son el atajo de `v-bind:`. `@` es el atajo de `v-on:`.", "The colon `:` is shorthand for `v-bind:`. `@` is shorthand for `v-on:`."),
      }
    ],
  },
  c2_sauce: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué obtienes con `v-for=\"(x, i) in items\"`?", "What do you get with `v-for=\"(x, i) in items\"`?"),
        options: [
          p("El ítem `x` y su índice `i` (desde 0)", "The item `x` and its index `i` (from 0)"),
          p("Dos copias", "Two copies"),
          p("El índice y luego el ítem", "The index then the item"),
          p("Sólo `i`", "Only `i`"),
        ],
        correct: 0,
        explanation: p("El segundo argumento es el índice base 0. Útil para numerar: `{{ i + 1 }}`.", "The second argument is the 0-based index. Handy for numbering: `{{ i + 1 }}`."),
      },
      {
        question: p("¿Buena clave para `:key`?", "Good value for `:key`?"),
        options: [
          p("Un identificador único y estable del ítem", "A unique, stable identifier of the item"),
          p("Un número aleatorio en cada render", "A random number each render"),
          p("Siempre 0", "Always 0"),
          p("El color", "The color"),
        ],
        correct: 0,
        explanation: p("La clave debe ser única y estable (un id o valor que no se repita), no algo que cambie en cada render.", "The key must be unique and stable (an id or non-repeating value), not something that changes each render."),
      },
      {
        question: p("¿`v-bind` puede enlazar cualquier atributo?", "Can `v-bind` bind any attribute?"),
        options: [
          p("Sí: `:src`, `:alt`, `:disabled`, `:class`…", "Yes: `:src`, `:alt`, `:disabled`, `:class`…"),
          p("Sólo `href`", "Only `href`"),
          p("Sólo clases", "Only classes"),
          p("Ninguno", "None"),
        ],
        correct: 0,
        explanation: p("`v-bind` enlaza cualquier atributo o prop a una expresión. Con `:disabled=\"cond\"` el atributo aparece sólo si es verdad.", "`v-bind` binds any attribute or prop to an expression. With `:disabled=\"cond\"` the attribute appears only if truthy."),
      }
    ],
  },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Señor de los Túmulos", "The Lord of the Barrows"),
    lore_intro: P("Inventaría el botín numerado: 1., 2., 3…", "Inventory the numbered loot: 1., 2., 3…"),
    challenge: {
      topic: P("v-for con índice", "v-for with index"),
      instructions: P("Define `Filas` con la prop `items` (array de strings) y una `<ol>` con un `<li>` `{{ i + 1 }}. {{ x }}` por cada ítem, usando el índice. Usa `:key=\"i\"`.", "Define `Filas` with prop `items` (array of strings) and an `<ol>` with a `<li>` `{{ i + 1 }}. {{ x }}` per item, using the index. Use `:key=\"i\"`."),
      starter_code: "const Filas = {\n  props: ['items'],\n  template: ''\n};\n",
      blocks: [
        "const Filas = {",
        "  props: ['items'],",
        "  template: '<ol><li v-for=\"(x, i) in items\" :key=\"i\">{{ i + 1 }}. {{ x }}</li></ol>'",
        "};",
        "  template: '<ol><li v-for=\"x in items\" :key=\"x\">{{ x }}</li></ol>'",
      ],
      hints: [
        P("El índice es el segundo argumento: `v-for=\"(x, i) in items\"`.", "The index is the second argument: `v-for=\"(x, i) in items\"`."),
        P("Numera desde 1 con `{{ i + 1 }}`.", "Number from 1 with `{{ i + 1 }}`."),
      ],
      test_cases: [
        { input: "render(Filas, { items: ['Espada', 'Capa', 'Pan'] })", expected: "<ol><li>1. Espada</li><li>2. Capa</li><li>3. Pan</li></ol>", description: P("Botín numerado", "Numbered loot"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: p("El Pergamino de las Listas", "The Scroll of Lists"),
    lore_intro: p("Un pergamino revela cómo repetir y enlazar atributos.", "A scroll reveals how to repeat and bind attributes."),
    scroll: {
      topic: p("Vue: v-for y v-bind", "Vue: v-for and v-bind"),
      sections: [
        { heading: p("v-for", "v-for"), body: p("Repite un elemento por cada ítem. Añade siempre una `:key` única.", "Repeats an element per item. Always add a unique `:key`."), code: "<li v-for=\"m in miembros\" :key=\"m\">{{ m }}</li>" },
        { heading: p("Índice", "Index"), body: p("El segundo argumento es el índice base 0.", "The second argument is the 0-based index."), code: "<li v-for=\"(x, i) in items\" :key=\"i\">{{ i + 1 }}. {{ x }}</li>" },
        { heading: p("v-bind", "v-bind"), body: p("`:atributo=\"expr\"` enlaza un atributo a una expresión. `:` es el atajo de `v-bind`.", "`:attribute=\"expr\"` binds an attribute to an expression. `:` is the shorthand for `v-bind`."), code: "<a :href=\"url\">{{ texto }}</a>" },
      ],
      keyTakeaway: p("`v-for` repite con `:key` única; el índice va como segundo argumento; `:attr` (v-bind) enlaza atributos a expresiones.", "`v-for` repeats with a unique `:key`; the index is the second argument; `:attr` (v-bind) binds attributes to expressions."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre-Sauce", "Old Man Willow"),
    lore_intro: P("Pasa lista de la comitiva: una lista con todos los nombres.", "Take the fellowship roll: a list of all the names."),
    challenge: {
      topic: P("v-for", "v-for"),
      instructions: P("Define `Lista` con la prop `nombres` (array de strings) y una `<ul>` que muestre un `<li>{{ n }}</li>` por cada nombre. No olvides `:key`.", "Define `Lista` with prop `nombres` (array of strings) and a `<ul>` showing one `<li>{{ n }}</li>` per name. Don't forget `:key`."),
      starter_code: "const Lista = {\n  props: ['nombres'],\n  template: ''\n};\n",
      blocks: [
        "const Lista = {",
        "  props: ['nombres'],",
        "  template: '<ul><li v-for=\"n in nombres\" :key=\"n\">{{ n }}</li></ul>'",
        "};",
        "  template: '<ul><li>nombres</li></ul>'",
      ],
      hints: [
        P("`<li v-for=\"n in nombres\" :key=\"n\">{{ n }}</li>` dentro de la `<ul>`.", "`<li v-for=\"n in nombres\" :key=\"n\">{{ n }}</li>` inside the `<ul>`."),
      ],
      test_cases: [
        { input: "render(Lista, { nombres: ['Frodo', 'Sam'] })", expected: "<ul><li>Frodo</li><li>Sam</li></ul>", description: P("Frodo y Sam", "Frodo and Sam"), raw: true },
        { input: "render(Lista, { nombres: ['Merry', 'Pippin', 'Bilbo'] })", expected: "<ul><li>Merry</li><li>Pippin</li><li>Bilbo</li></ul>", description: P("Tres hobbits", "Three hobbits"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Espectro del Túmulo", "The Barrow-wight"),
    lore_intro: P("Forja un enlace rúnico hacia un destino, con texto y href dinámicos.", "Forge a runic link to a destination, with dynamic text and href."),
    challenge: {
      topic: P("v-bind (:href)", "v-bind (:href)"),
      instructions: P("Define `Enlace` con props `url` y `texto`, y `template` `<a :href=\"url\">{{ texto }}</a>`.", "Define `Enlace` with props `url` and `texto`, and template `<a :href=\"url\">{{ texto }}</a>`."),
      starter_code: "const Enlace = {\n  props: ['url', 'texto'],\n  template: ''\n};\n",
      blocks: [
        "const Enlace = {",
        "  props: ['url', 'texto'],",
        "  template: '<a :href=\"url\">{{ texto }}</a>'",
        "};",
        "  template: '<a href=\"url\">{{ texto }}</a>'",
      ],
      hints: [
        P("Enlaza el atributo con `:href=\"url\"` (v-bind).", "Bind the attribute with `:href=\"url\"` (v-bind)."),
      ],
      test_cases: [
        { input: "render(Enlace, { url: '/mordor', texto: 'Al Este' })", expected: "<a href=\"/mordor\">Al Este</a>", description: P("Hacia el Este", "To the East"), raw: true },
        { input: "render(Enlace, { url: '/comarca', texto: 'A casa' })", expected: "<a href=\"/comarca\">A casa</a>", description: P("A casa", "Home"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Bombadil", "Bombadil's Song"),
    lore_intro: P("Recita la comitiva con nombre y raza de cada miembro.", "Recite the fellowship with each member's name and race."),
    challenge: {
      topic: P("v-for con objetos", "v-for with objects"),
      instructions: P("Define `Comitiva` con la prop `miembros` (array de objetos `{ nombre, raza }`) y una `<ul>` con un `<li>` `{{ m.nombre }} ({{ m.raza }})` por cada uno. Usa `:key=\"m.nombre\"`.", "Define `Comitiva` with prop `miembros` (array of objects `{ nombre, raza }`) and a `<ul>` with a `<li>` `{{ m.nombre }} ({{ m.raza }})` for each. Use `:key=\"m.nombre\"`."),
      starter_code: "const Comitiva = {\n  props: ['miembros'],\n  template: ''\n};\n",
      blocks: [
        "const Comitiva = {",
        "  props: ['miembros'],",
        "  template: '<ul><li v-for=\"m in miembros\" :key=\"m.nombre\">{{ m.nombre }} ({{ m.raza }})</li></ul>'",
        "};",
        "  template: '<ul><li v-for=\"m in miembros\">{{ m }}</li></ul>'",
      ],
      hints: [
        P("Accede a los campos con punto: `{{ m.nombre }}`.", "Access fields with a dot: `{{ m.nombre }}`."),
      ],
      test_cases: [
        { input: "render(Comitiva, { miembros: [{ nombre: 'Frodo', raza: 'hobbit' }, { nombre: 'Legolas', raza: 'elfo' }] })", expected: "<ul><li>Frodo (hobbit)</li><li>Legolas (elfo)</li></ul>", description: P("Frodo y Legolas", "Frodo and Legolas"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_3: Syllabus = {
  c3_ferny: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué crea un valor reactivo en `setup()`?", "What creates a reactive value in `setup()`?"),
        options: [
          p("`ref(0)`", "`ref(0)`"),
          p("`let x = 0`", "`let x = 0`"),
          p("`const x = 0`", "`const x = 0`"),
          p("`var x`", "`var x`"),
        ],
        correct: 0,
        explanation: p("`ref` crea una referencia reactiva. Se lee/escribe con `.value` en JS; en la plantilla se usa sin `.value`.", "`ref` creates a reactive reference. Read/write with `.value` in JS; in the template you use it without `.value`."),
      },
      {
        question: p("Dentro de `setup`, ¿cómo cambias un `ref` llamado `n`?", "Inside `setup`, how do you change a `ref` called `n`?"),
        options: [
          p("`n.value++` (o `n.value = ...`)", "`n.value++` (or `n.value = ...`)"),
          p("`n++`", "`n++`"),
          p("`n = n + 1`", "`n = n + 1`"),
          p("`this.n++`", "`this.n++`"),
        ],
        correct: 0,
        explanation: p("En JS un `ref` se manipula por su `.value`: `n.value++`. En la plantilla, Vue lo desenvuelve solo.", "In JS a `ref` is manipulated via its `.value`: `n.value++`. In the template Vue unwraps it for you."),
      },
      {
        question: p("¿Cómo escuchas un clic en la plantilla?", "How do you listen for a click in the template?"),
        options: [
          p("`@click=\"metodo\"` (atajo de `v-on:click`)", "`@click=\"metodo\"` (shorthand for `v-on:click`)"),
          p("`onclick=metodo`", "`onclick=metodo`"),
          p("`:click`", "`:click`"),
          p("`v-click`", "`v-click`"),
        ],
        correct: 0,
        explanation: p("`@click` (o `v-on:click`) enlaza el evento a un método o expresión. `@` es el atajo de `v-on`.", "`@click` (or `v-on:click`) binds the event to a method or expression. `@` is the shorthand for `v-on`."),
      }
    ],
  },
  c3_espia_nazgul: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué devuelve `setup()` para exponerlo a la plantilla?", "What does `setup()` return to expose to the template?"),
        options: [
          p("Un objeto con los refs y funciones a usar", "An object with the refs and functions to use"),
          p("Nada", "Nothing"),
          p("El template", "The template"),
          p("Una promesa", "A promise"),
        ],
        correct: 0,
        explanation: p("Lo que `setup` devuelve en un objeto queda disponible en la plantilla: `return { n, sumar }`.", "Whatever `setup` returns in an object becomes available in the template: `return { n, sumar }`."),
      },
      {
        question: p("En la PLANTILLA, ¿usas `.value`?", "In the TEMPLATE, do you use `.value`?"),
        options: [
          p("No: `{{ n }}` (Vue desenvuelve el ref)", "No: `{{ n }}` (Vue unwraps the ref)"),
          p("Sí: `{{ n.value }}`", "Yes: `{{ n.value }}`"),
          p("`{{ n() }}`", "`{{ n() }}`"),
          p("`{{ ref(n) }}`", "`{{ ref(n) }}`"),
        ],
        correct: 0,
        explanation: p("En la plantilla los refs se desenvuelven automáticamente: escribes `{{ n }}`, no `{{ n.value }}`.", "In the template refs are auto-unwrapped: you write `{{ n }}`, not `{{ n.value }}`."),
      },
      {
        question: p("¿Puede `@click` llamar con argumentos?", "Can `@click` call with arguments?"),
        options: [
          p("Sí: `@click=\"cambiar(1)\"`", "Yes: `@click=\"cambiar(1)\"`"),
          p("No, nunca", "No, never"),
          p("Sólo sin paréntesis", "Only without parentheses"),
          p("Sólo con `this`", "Only with `this`"),
        ],
        correct: 0,
        explanation: p("Puedes invocar el método con argumentos: `@click=\"cambiar(1)\"`. Sin paréntesis, Vue pasa el evento nativo.", "You can invoke the method with arguments: `@click=\"cambiar(1)\"`. Without parentheses, Vue passes the native event."),
      }
    ],
  },
  c3_montaraz_falso: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué pasa al cambiar un `ref` que usa la plantilla?", "What happens when you change a `ref` used by the template?"),
        options: [
          p("Vue re-renderiza esa parte automáticamente", "Vue re-renders that part automatically"),
          p("Nada hasta recargar", "Nothing until reload"),
          p("Se borra el DOM", "The DOM is cleared"),
          p("Hay que llamar `render()`", "You must call `render()`"),
        ],
        correct: 0,
        explanation: p("La reactividad de Vue detecta el cambio y actualiza sólo lo que depende de ese valor.", "Vue's reactivity detects the change and updates only what depends on that value."),
      },
      {
        question: p("¿La actualización del DOM tras un cambio es…?", "Is the DOM update after a change…?"),
        options: [
          p("Asíncrona: se aplica en el siguiente `nextTick`", "Asynchronous: applied on the next `nextTick`"),
          p("Instantánea y síncrona", "Instant and synchronous"),
          p("Nunca", "Never"),
          p("Cada segundo", "Every second"),
        ],
        correct: 0,
        explanation: p("Vue agrupa los cambios y actualiza el DOM de forma asíncrona; `await nextTick()` espera a que termine.", "Vue batches changes and updates the DOM asynchronously; `await nextTick()` waits for it to finish."),
      },
      {
        question: p("¿Puedes tener varios `ref` en un `setup`?", "Can you have several `ref`s in one `setup`?"),
        options: [
          p("Sí, tantos como necesites", "Yes, as many as you need"),
          p("Sólo uno", "Only one"),
          p("Máximo dos", "At most two"),
          p("Ninguno", "None"),
        ],
        correct: 0,
        explanation: p("Puedes declarar múltiples refs independientes y devolverlos todos: `return { a, b, sumar }`.", "You can declare multiple independent refs and return them all: `return { a, b, sumar }`."),
      }
    ],
  },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Grito del Rey Brujo", "The Witch-king's Cry"),
    lore_intro: P("Transforma la palabra en un grito: mayúsculas y una admiración.", "Turn the word into a shout: uppercase and an exclamation."),
    challenge: {
      topic: P("Método que transforma estado", "Method that transforms state"),
      instructions: P("Define `Grito` con un `ref` `texto` ('paz') y `gritar` que lo ponga en MAYÚSCULAS y le añada '!'. El `template` es `<button @click=\"gritar\">{{ texto }}</button>`.", "Define `Grito` with a `ref` `texto` ('paz') and `gritar` that uppercases it and appends '!'. The template is `<button @click=\"gritar\">{{ texto }}</button>`."),
      starter_code: "const Grito = {\n  setup() {\n    // texto + gritar\n  },\n  template: ''\n};\n",
      blocks: [
        "const Grito = {",
        "  setup() {",
        "    const texto = ref('paz');",
        "    const gritar = () => { texto.value = texto.value.toUpperCase() + '!'; };",
        "    return { texto, gritar };",
        "  },",
        "  template: '<button @click=\"gritar\">{{ texto }}</button>'",
        "};",
        "    const gritar = () => { texto.value.toUpperCase(); };",
      ],
      hints: [
        P("`texto.value = texto.value.toUpperCase() + '!'`.", "`texto.value = texto.value.toUpperCase() + '!'`."),
      ],
      test_cases: [
        { input: "render(Grito, {})", expected: "<button>paz</button>", description: P("Empieza en paz", "Starts at peace"), raw: true },
        { input: "trasClick(Grito, {}, 'button')", expected: "<button>PAZ!</button>", description: P("Un clic → PAZ!", "One click → PAZ!"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: p("El Pergamino de la Reactividad", "The Scroll of Reactivity"),
    lore_intro: p("Un pergamino enseña a dar vida al estado y responder a eventos.", "A scroll teaches how to bring state to life and respond to events."),
    scroll: {
      topic: p("Vue: ref y eventos", "Vue: ref and events"),
      sections: [
        { heading: p("ref", "ref"), body: p("`ref(inicial)` crea estado reactivo. En JS se usa con `.value`; en la plantilla, sin él.", "`ref(initial)` creates reactive state. In JS use `.value`; in the template, without it."), code: "const n = ref(0);\n// n.value++ en JS, {{ n }} en plantilla" },
        { heading: p("setup", "setup"), body: p("Lo que devuelve `setup` queda disponible en la plantilla.", "Whatever `setup` returns is available in the template."), code: "setup() {\n  const n = ref(0);\n  const sumar = () => n.value++;\n  return { n, sumar };\n}" },
        { heading: p("@click", "@click"), body: p("`@evento=\"metodo\"` escucha eventos. `@` es el atajo de `v-on`.", "`@event=\"method\"` listens for events. `@` is the shorthand for `v-on`."), code: "<button @click=\"sumar\">{{ n }}</button>" },
      ],
      keyTakeaway: p("`ref` crea estado reactivo (`.value` en JS); `setup` lo expone; `@click` escucha eventos. Vue re-renderiza solo.", "`ref` creates reactive state (`.value` in JS); `setup` exposes it; `@click` listens for events. Vue re-renders for you."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("El Póney Pisador", "The Prancing Pony"),
    lore_intro: P("Lleva la cuenta de las jarras servidas: un botón que suma.", "Keep count of the mugs served: a button that adds up."),
    challenge: {
      topic: P("ref + @click", "ref + @click"),
      instructions: P("Define `Contador` con un `ref` `n` inicial 0 y un método `sumar` que haga `n.value++`. El `template` es `<button @click=\"sumar\">{{ n }}</button>`.", "Define `Contador` with a `ref` `n` starting at 0 and a `sumar` method doing `n.value++`. The template is `<button @click=\"sumar\">{{ n }}</button>`."),
      starter_code: "const Contador = {\n  setup() {\n    // crea n y sumar, y devuélvelos\n  },\n  template: ''\n};\n",
      blocks: [
        "const Contador = {",
        "  setup() {",
        "    const n = ref(0);",
        "    const sumar = () => { n.value++; };",
        "    return { n, sumar };",
        "  },",
        "  template: '<button @click=\"sumar\">{{ n }}</button>'",
        "};",
        "    const n = ref(0); const sumar = () => { n++; }; return { n, sumar };",
      ],
      hints: [
        P("En `setup`: `const n = ref(0)` y `const sumar = () => { n.value++; }`.", "In `setup`: `const n = ref(0)` and `const sumar = () => { n.value++; }`."),
        P("Devuelve `{ n, sumar }` para la plantilla.", "Return `{ n, sumar }` for the template."),
      ],
      test_cases: [
        { input: "render(Contador, {})", expected: "<button>0</button>", description: P("Empieza en 0", "Starts at 0"), raw: true },
        { input: "trasClick(Contador, {}, 'button')", expected: "<button>1</button>", description: P("Un clic → 1", "One click → 1"), raw: true },
        { input: "trasClicks(Contador, {}, 'button', 3)", expected: "<button>3</button>", description: P("Tres clics → 3", "Three clicks → 3"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas del Túmulo", "The Barrow Leaves"),
    lore_intro: P("Enciende o apaga la antorcha con cada pulsación.", "Turn the torch on or off with each press."),
    challenge: {
      topic: P("Estado booleano", "Boolean state"),
      instructions: P("Define `Antorcha` con un `ref` `encendida` (false) y `alternar` que lo invierta. El `template` es `<button @click=\"alternar\">{{ encendida ? \"Encendida\" : \"Apagada\" }}</button>`.", "Define `Antorcha` with a `ref` `encendida` (false) and `alternar` that flips it. The template is `<button @click=\"alternar\">{{ encendida ? \"Encendida\" : \"Apagada\" }}</button>`."),
      starter_code: "const Antorcha = {\n  setup() {\n    // encendida + alternar\n  },\n  template: ''\n};\n",
      blocks: [
        "const Antorcha = {",
        "  setup() {",
        "    const encendida = ref(false);",
        "    const alternar = () => { encendida.value = !encendida.value; };",
        "    return { encendida, alternar };",
        "  },",
        "  template: '<button @click=\"alternar\">{{ encendida ? \"Encendida\" : \"Apagada\" }}</button>'",
        "};",
        "    const encendida = ref(true);",
      ],
      hints: [
        P("Invierte con `encendida.value = !encendida.value`.", "Flip with `encendida.value = !encendida.value`."),
      ],
      test_cases: [
        { input: "render(Antorcha, {})", expected: "<button>Apagada</button>", description: P("Empieza apagada", "Starts off"), raw: true },
        { input: "trasClick(Antorcha, {}, 'button')", expected: "<button>Encendida</button>", description: P("Un clic → encendida", "One click → on"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P("Ajusta la señal de fuego arriba y abajo con dos botones.", "Adjust the beacon up and down with two buttons."),
    challenge: {
      topic: P("Evento con argumento", "Event with an argument"),
      instructions: P("Define `Ajustador` con un `ref` `valor` (5) y `cambiar(d)` que sume `d`. El `template` es `<div><button class=\"menos\" @click=\"cambiar(-1)\">-</button><span>{{ valor }}</span><button class=\"mas\" @click=\"cambiar(1)\">+</button></div>`.", "Define `Ajustador` with a `ref` `valor` (5) and `cambiar(d)` that adds `d`. The template is `<div><button class=\"menos\" @click=\"cambiar(-1)\">-</button><span>{{ valor }}</span><button class=\"mas\" @click=\"cambiar(1)\">+</button></div>`."),
      starter_code: "const Ajustador = {\n  setup() {\n    // valor + cambiar(d)\n  },\n  template: ''\n};\n",
      blocks: [
        "const Ajustador = {",
        "  setup() {",
        "    const valor = ref(5);",
        "    const cambiar = (d) => { valor.value += d; };",
        "    return { valor, cambiar };",
        "  },",
        "  template: '<div><button class=\"menos\" @click=\"cambiar(-1)\">-</button><span>{{ valor }}</span><button class=\"mas\" @click=\"cambiar(1)\">+</button></div>'",
        "};",
        "    const cambiar = (d) => { valor.value = d; };",
      ],
      hints: [
        P("Pasa el paso como argumento: `@click=\"cambiar(1)\"` y `cambiar(-1)`.", "Pass the step as an argument: `@click=\"cambiar(1)\"` and `cambiar(-1)`."),
      ],
      test_cases: [
        { input: "render(Ajustador, {})", expected: "<div><button class=\"menos\">-</button><span>5</span><button class=\"mas\">+</button></div>", description: P("Empieza en 5", "Starts at 5"), raw: true },
        { input: "trasClick(Ajustador, {}, '.mas')", expected: "<div><button class=\"menos\">-</button><span>6</span><button class=\"mas\">+</button></div>", description: P("+ → 6", "+ → 6"), raw: true },
        { input: "trasClicks(Ajustador, {}, '.menos', 2)", expected: "<div><button class=\"menos\">-</button><span>3</span><button class=\"mas\">+</button></div>", description: P("-- → 3", "-- → 3"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_4: Syllabus = {
  c4_jinete_rezagado: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué hace `v-model` en un `<input>`?", "What does `v-model` do on an `<input>`?"),
        options: [
          p("Enlace de doble sentido: sincroniza input y estado", "Two-way binding: syncs input and state"),
          p("Sólo lee", "Read only"),
          p("Sólo escribe", "Write only"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`v-model` mantiene sincronizados el valor del input y el ref: si tecleas, cambia el ref; si cambia el ref, cambia el input.", "`v-model` keeps the input value and the ref in sync: typing updates the ref; changing the ref updates the input."),
      },
      {
        question: p("¿A qué se suele enlazar `v-model`?", "What does `v-model` usually bind to?"),
        options: [
          p("A un `ref` reactivo", "To a reactive `ref`"),
          p("A una constante", "To a constant"),
          p("A una prop de sólo lectura", "To a read-only prop"),
          p("A nada", "To nothing"),
        ],
        correct: 0,
        explanation: p("`v-model` necesita un estado reactivo mutable, normalmente un `ref` devuelto por `setup`.", "`v-model` needs mutable reactive state, usually a `ref` returned by `setup`."),
      },
      {
        question: p("¿Qué modificador convierte el valor a número?", "Which modifier converts the value to a number?"),
        options: [
          p("`.number`: `v-model.number`", "`.number`: `v-model.number`"),
          p("`.int`", "`.int`"),
          p("`.num`", "`.num`"),
          p("`.float`", "`.float`"),
        ],
        correct: 0,
        explanation: p("`v-model.number` convierte la entrada a número; sin él, el valor de un input es siempre string.", "`v-model.number` converts the input to a number; without it, an input's value is always a string."),
      }
    ],
  },
  c4_lobo: {
    kind: "battle",
    questions: [
    {
        question: p("Sin `.number`, el valor de un `<input>` es…", "Without `.number`, an `<input>`'s value is…"),
        options: [
          p("Un string, aunque escribas dígitos", "A string, even if you type digits"),
          p("Siempre un número", "Always a number"),
          p("Un booleano", "A boolean"),
          p("`null`", "`null`"),
        ],
        correct: 0,
        explanation: p("Los inputs de texto entregan strings. Para operar aritméticamente usa `.number` o conviértelo tú.", "Text inputs yield strings. To do arithmetic use `.number` or convert it yourself."),
      },
      {
        question: p("¿Con qué se enlaza un checkbox por `v-model`?", "What does `v-model` bind a checkbox to?"),
        options: [
          p("Un booleano (marcado/desmarcado)", "A boolean (checked/unchecked)"),
          p("Un string", "A string"),
          p("Un array siempre", "Always an array"),
          p("Un número", "A number"),
        ],
        correct: 0,
        explanation: p("Un checkbox con `v-model` refleja `true`/`false`. Con varios y un array, junta los marcados.", "A checkbox with `v-model` reflects `true`/`false`. With several and an array, it collects the checked ones."),
      },
      {
        question: p("¿Puedes derivar un valor de un ref con `computed`?", "Can you derive a value from a ref with `computed`?"),
        options: [
          p("Sí: recalcula cuando cambian sus dependencias", "Yes: it recomputes when its dependencies change"),
          p("No", "No"),
          p("Sólo con `ref`", "Only with `ref`"),
          p("Sólo una vez", "Only once"),
        ],
        correct: 0,
        explanation: p("`computed` crea un valor derivado que se recalcula sólo cuando cambian los refs de los que depende.", "`computed` creates a derived value that recomputes only when the refs it depends on change."),
      }
    ],
  },
  c4_trasgo_montaraz: {
    kind: "battle",
    questions: [
    {
        question: p("¿Cómo evitas que un `<form>` recargue la página al enviar?", "How do you stop a `<form>` from reloading the page on submit?"),
        options: [
          p("`@submit.prevent=\"...\"`", "`@submit.prevent=\"...\"`"),
          p("`@submit.stop`", "`@submit.stop`"),
          p("`return false`", "`return false`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("El modificador `.prevent` llama a `event.preventDefault()`, evitando la recarga del formulario.", "The `.prevent` modifier calls `event.preventDefault()`, avoiding the form reload."),
      },
      {
        question: p("`@click` es el atajo de…", "`@click` is shorthand for…"),
        options: [
          p("`v-on:click`", "`v-on:click`"),
          p("`v-bind:click`", "`v-bind:click`"),
          p("`v-model:click`", "`v-model:click`"),
          p("`v-if:click`", "`v-if:click`"),
        ],
        correct: 0,
        explanation: p("`@evento` = `v-on:evento`. Sirve para clicks, input, submit, etc.", "`@event` = `v-on:event`. Works for clicks, input, submit, etc."),
      },
      {
        question: p("¿`v-model` funciona en `<select>` y `<textarea>`?", "Does `v-model` work on `<select>` and `<textarea>`?"),
        options: [
          p("Sí, en la mayoría de controles de formulario", "Yes, on most form controls"),
          p("Sólo en `<input>`", "Only on `<input>`"),
          p("Sólo en checkbox", "Only on checkbox"),
          p("No", "No"),
        ],
        correct: 0,
        explanation: p("`v-model` funciona en inputs, textarea y select, adaptándose al tipo de control.", "`v-model` works on inputs, textarea and select, adapting to the control type."),
      }
    ],
  },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("El Señor de los Nueve", "The Lord of the Nine"),
    lore_intro: P("Valida la contraseña rúnica: mínimo cuatro caracteres.", "Validate the runic password: at least four characters."),
    challenge: {
      topic: P("v-model + validación", "v-model + validation"),
      instructions: P("Define `Contrasena` con un `ref` `clave` (''), un `computed` `valida` = `this.clave.length >= 4`, y `template` `<div><input v-model=\"clave\"><p>{{ valida ? \"Válida\" : \"Corta\" }}</p></div>`.", "Define `Contrasena` with a `ref` `clave` (''), a `computed` `valida` = `this.clave.length >= 4`, and template `<div><input v-model=\"clave\"><p>{{ valida ? \"Válida\" : \"Corta\" }}</p></div>`."),
      starter_code: "const Contrasena = {\n  setup() {\n    // clave\n  },\n  computed: {\n    // valida\n  },\n  template: ''\n};\n",
      blocks: [
        "const Contrasena = {",
        "  setup() {",
        "    const clave = ref('');",
        "    return { clave };",
        "  },",
        "  computed: {",
        "    valida() { return this.clave.length >= 4; }",
        "  },",
        "  template: '<div><input v-model=\"clave\"><p>{{ valida ? \"Válida\" : \"Corta\" }}</p></div>'",
        "};",
        "    valida() { return this.clave.length > 4; }",
      ],
      hints: [
        P("`valida() { return this.clave.length >= 4; }`.", "`valida() { return this.clave.length >= 4; }`."),
      ],
      test_cases: [
        { input: "render(Contrasena, {})", expected: "<div><input><p>Corta</p></div>", description: P("Vacía: Corta", "Empty: too short"), raw: true },
        { input: "trasInput(Contrasena, {}, 'input', 'ab')", expected: "<div><input><p>Corta</p></div>", description: P("'ab': Corta", "'ab': too short"), raw: true },
        { input: "trasInput(Contrasena, {}, 'input', 'mellon')", expected: "<div><input><p>Válida</p></div>", description: P("'mellon': Válida", "'mellon': valid"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: p("El Pergamino de los Formularios", "The Scroll of Forms"),
    lore_intro: p("Un pergamino muestra el enlace de doble sentido con v-model.", "A scroll shows two-way binding with v-model."),
    scroll: {
      topic: p("Vue: v-model", "Vue: v-model"),
      sections: [
        { heading: p("v-model", "v-model"), body: p("Sincroniza input y estado en ambos sentidos.", "Syncs input and state both ways."), code: "<input v-model=\"texto\">\n<p>{{ texto }}</p>" },
        { heading: p("Números", "Numbers"), body: p("El valor de un input es string; `.number` lo convierte a número.", "An input's value is a string; `.number` converts it to a number."), code: "<input v-model.number=\"n\">" },
        { heading: p("Checkbox", "Checkbox"), body: p("Un checkbox con `v-model` refleja un booleano.", "A checkbox with `v-model` reflects a boolean."), code: "<input type=\"checkbox\" v-model=\"activo\">" },
      ],
      keyTakeaway: p("`v-model` enlaza input y estado en doble sentido; `.number` convierte a número; en checkbox refleja un booleano.", "`v-model` two-way binds input and state; `.number` converts to number; on a checkbox it reflects a boolean."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Montura Asfaloth", "Asfaloth the Steed"),
    lore_intro: P("Haz eco de lo que se escribe: un input y su reflejo.", "Echo what is typed: an input and its reflection."),
    challenge: {
      topic: P("v-model", "v-model"),
      instructions: P("Define `Eco` con un `ref` `texto` ('') y `template` `<div><input v-model=\"texto\"><p>{{ texto }}</p></div>`.", "Define `Eco` with a `ref` `texto` ('') and template `<div><input v-model=\"texto\"><p>{{ texto }}</p></div>`."),
      starter_code: "const Eco = {\n  setup() {\n    // texto\n  },\n  template: ''\n};\n",
      blocks: [
        "const Eco = {",
        "  setup() {",
        "    const texto = ref('');",
        "    return { texto };",
        "  },",
        "  template: '<div><input v-model=\"texto\"><p>{{ texto }}</p></div>'",
        "};",
        "  template: '<div><input :value=\"texto\"><p>{{ texto }}</p></div>'",
      ],
      hints: [
        P("Enlaza el input con `v-model=\"texto\"` y refléjalo en el `<p>`.", "Bind the input with `v-model=\"texto\"` and reflect it in the `<p>`."),
      ],
      test_cases: [
        { input: "render(Eco, {})", expected: "<div><input><p></p></div>", description: P("Vacío al inicio", "Empty at first"), raw: true },
        { input: "trasInput(Eco, {}, 'input', 'Mellon')", expected: "<div><input><p>Mellon</p></div>", description: P("Escribe 'Mellon'", "Type 'Mellon'"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Count of the Nine"),
    lore_intro: P("Duplica el número que se teclee: un input numérico.", "Double the typed number: a numeric input."),
    challenge: {
      topic: P("v-model.number", "v-model.number"),
      instructions: P("Define `Doble` con un `ref` `n` (0) y `template` `<div><input v-model.number=\"n\"><p>{{ n * 2 }}</p></div>`.", "Define `Doble` with a `ref` `n` (0) and template `<div><input v-model.number=\"n\"><p>{{ n * 2 }}</p></div>`."),
      starter_code: "const Doble = {\n  setup() {\n    // n\n  },\n  template: ''\n};\n",
      blocks: [
        "const Doble = {",
        "  setup() {",
        "    const n = ref(0);",
        "    return { n };",
        "  },",
        "  template: '<div><input v-model.number=\"n\"><p>{{ n * 2 }}</p></div>'",
        "};",
        "  template: '<div><input v-model=\"n\"><p>{{ n * 2 }}</p></div>'",
      ],
      hints: [
        P("Usa el modificador `.number` para que `n` sea número: `v-model.number=\"n\"`.", "Use the `.number` modifier so `n` is a number: `v-model.number=\"n\"`."),
      ],
      test_cases: [
        { input: "render(Doble, {})", expected: "<div><input><p>0</p></div>", description: P("Cero al inicio", "Zero at first"), raw: true },
        { input: "trasInput(Doble, {}, 'input', '7')", expected: "<div><input><p>14</p></div>", description: P("7 → 14", "7 → 14"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P("Mide la longitud de la frase que crece con la corriente.", "Measure the length of the phrase as it grows with the current."),
    challenge: {
      topic: P("v-model + computed", "v-model + computed"),
      instructions: P("Define `Medidor` con un `ref` `frase` (''), un `computed` `largo` = `this.frase.length`, y `template` `<div><input v-model=\"frase\"><span>{{ largo }}</span></div>`.", "Define `Medidor` with a `ref` `frase` (''), a `computed` `largo` = `this.frase.length`, and template `<div><input v-model=\"frase\"><span>{{ largo }}</span></div>`."),
      starter_code: "const Medidor = {\n  setup() {\n    // frase\n  },\n  computed: {\n    // largo\n  },\n  template: ''\n};\n",
      blocks: [
        "const Medidor = {",
        "  setup() {",
        "    const frase = ref('');",
        "    return { frase };",
        "  },",
        "  computed: {",
        "    largo() { return this.frase.length; }",
        "  },",
        "  template: '<div><input v-model=\"frase\"><span>{{ largo }}</span></div>'",
        "};",
        "    largo() { return frase.length; }",
      ],
      hints: [
        P("El computed lee el ref por `this`: `largo() { return this.frase.length; }`.", "The computed reads the ref via `this`: `largo() { return this.frase.length; }`."),
      ],
      test_cases: [
        { input: "render(Medidor, {})", expected: "<div><input><span>0</span></div>", description: P("Longitud 0", "Length 0"), raw: true },
        { input: "trasInput(Medidor, {}, 'input', 'Mordor')", expected: "<div><input><span>6</span></div>", description: P("'Mordor' → 6", "'Mordor' → 6"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P("Activa o desactiva el sello con una casilla.", "Enable or disable the seal with a checkbox."),
    challenge: {
      topic: P("v-model en checkbox", "v-model on a checkbox"),
      instructions: P("Define `Interruptor` con un `ref` `activo` (false) y `template` `<div><input type=\"checkbox\" v-model=\"activo\"><p>{{ activo ? \"Sí\" : \"No\" }}</p></div>`.", "Define `Interruptor` with a `ref` `activo` (false) and template `<div><input type=\"checkbox\" v-model=\"activo\"><p>{{ activo ? \"Sí\" : \"No\" }}</p></div>`."),
      starter_code: "const Interruptor = {\n  setup() {\n    // activo\n  },\n  template: ''\n};\n",
      blocks: [
        "const Interruptor = {",
        "  setup() {",
        "    const activo = ref(false);",
        "    return { activo };",
        "  },",
        "  template: '<div><input type=\"checkbox\" v-model=\"activo\"><p>{{ activo ? \"Sí\" : \"No\" }}</p></div>'",
        "};",
        "  template: '<div><input type=\"checkbox\" :checked=\"activo\"><p>{{ activo ? \"Sí\" : \"No\" }}</p></div>'",
      ],
      hints: [
        P("Un checkbox con `v-model` refleja un booleano.", "A checkbox with `v-model` reflects a boolean."),
      ],
      test_cases: [
        { input: "render(Interruptor, {})", expected: "<div><input type=\"checkbox\"><p>No</p></div>", description: P("Empieza en No", "Starts at No"), raw: true },
        { input: "trasClick(Interruptor, {}, 'input')", expected: "<div><input type=\"checkbox\"><p>Sí</p></div>", description: P("Clic → Sí", "Click → Yes"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_5: Syllabus = {
  c5_crebain: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué directiva muestra un elemento sólo si una condición es cierta?", "Which directive shows an element only if a condition is true?"),
        options: [
          p("`v-if`", "`v-if`"),
          p("`v-show-if`", "`v-show-if`"),
          p("`v-cond`", "`v-cond`"),
          p("`v-when`", "`v-when`"),
        ],
        correct: 0,
        explanation: p("`v-if=\"cond\"` renderiza (o no) el elemento según la condición. Si es falsa, no está en el DOM.", "`v-if=\"cond\"` renders (or not) the element based on the condition. If false, it's not in the DOM."),
      },
      {
        question: p("¿Qué acompaña a `v-if` para el caso contrario?", "What goes with `v-if` for the opposite case?"),
        options: [
          p("`v-else`", "`v-else`"),
          p("`v-not`", "`v-not`"),
          p("`v-otherwise`", "`v-otherwise`"),
          p("`else`", "`else`"),
        ],
        correct: 0,
        explanation: p("`v-else` (en el elemento inmediatamente siguiente) cubre el caso contrario al `v-if`.", "`v-else` (on the immediately following element) covers the opposite case to `v-if`."),
      },
      {
        question: p("Diferencia entre `v-if` y `v-show`:", "Difference between `v-if` and `v-show`:"),
        options: [
          p("`v-if` quita el nodo del DOM; `v-show` lo oculta con CSS", "`v-if` removes the node from the DOM; `v-show` hides it with CSS"),
          p("Son iguales", "They're the same"),
          p("`v-show` borra datos", "`v-show` deletes data"),
          p("`v-if` es más rápido siempre", "`v-if` is always faster"),
        ],
        correct: 0,
        explanation: p("`v-if` monta/desmonta el elemento; `v-show` lo deja pero con `display:none`. `v-show` es mejor si alternas mucho.", "`v-if` mounts/unmounts the element; `v-show` keeps it but with `display:none`. `v-show` is better if you toggle often."),
      }
    ],
  },
  c5_lobo_nieve: {
    kind: "battle",
    questions: [
    {
        question: p("¿Se puede encadenar más de dos casos?", "Can you chain more than two cases?"),
        options: [
          p("Sí, con `v-else-if`", "Yes, with `v-else-if`"),
          p("No", "No"),
          p("Sólo con `switch`", "Only with `switch`"),
          p("Máximo dos", "At most two"),
        ],
        correct: 0,
        explanation: p("`v-if` / `v-else-if` / `v-else` encadena varios casos, como un `if/else if/else`.", "`v-if` / `v-else-if` / `v-else` chains several cases, like an `if/else if/else`."),
      },
      {
        question: p("`v-else` debe ir…", "`v-else` must go…"),
        options: [
          p("Justo tras el elemento con `v-if`/`v-else-if`", "Right after the element with `v-if`/`v-else-if`"),
          p("En cualquier sitio", "Anywhere"),
          p("Antes del `v-if`", "Before the `v-if`"),
          p("En otro componente", "In another component"),
        ],
        correct: 0,
        explanation: p("`v-else` debe ser el hermano inmediatamente posterior; si no, Vue no lo reconoce.", "`v-else` must be the immediately following sibling; otherwise Vue won't recognize it."),
      },
      {
        question: p("¿Qué expresión vale en `v-if`?", "What expression is valid in `v-if`?"),
        options: [
          p("Cualquiera que dé verdadero/falso: `hp > 0`", "Anything truthy/falsy: `hp > 0`"),
          p("Sólo booleanos literales", "Only literal booleans"),
          p("Sólo props", "Only props"),
          p("Sólo números", "Only numbers"),
        ],
        correct: 0,
        explanation: p("`v-if` acepta cualquier expresión; se evalúa su veracidad (truthy/falsy).", "`v-if` accepts any expression; its truthiness is evaluated."),
      }
    ],
  },
  c5_trasgo_montanes: {
    kind: "battle",
    questions: [
    {
        question: p("¿Cómo aplicas una clase según una condición?", "How do you apply a class based on a condition?"),
        options: [
          p("`:class=\"{ activa: cond }\"`", "`:class=\"{ activa: cond }\"`"),
          p("`class=cond`", "`class=cond`"),
          p("`v-class`", "`v-class`"),
          p("`:className`", "`:className`"),
        ],
        correct: 0,
        explanation: p("El enlace de clase por objeto activa la clase cuando la condición es verdadera: `:class=\"{ activa: cond }\"`.", "The object class binding turns the class on when the condition is true: `:class=\"{ activa: cond }\"`."),
      },
      {
        question: p("¿Puedes combinar clase fija y condicional?", "Can you combine a fixed and a conditional class?"),
        options: [
          p("Sí: `:class=\"['base', { activa: cond }]\"`", "Yes: `:class=\"['base', { activa: cond }]\"`"),
          p("No", "No"),
          p("Sólo una", "Only one"),
          p("Con dos atributos class", "With two class attributes"),
        ],
        correct: 0,
        explanation: p("La sintaxis de array mezcla clases fijas y condicionales: `['base', { activa: cond }]`.", "Array syntax mixes fixed and conditional classes: `['base', { activa: cond }]`."),
      },
      {
        question: p("Con `:class=\"{ x: false }\"`, ¿qué class sale?", "With `:class=\"{ x: false }\"`, what class comes out?"),
        options: [
          p("Ninguna clase `x` (queda vacía)", "No `x` class (empty)"),
          p("`x`", "`x`"),
          p("`false`", "`false`"),
          p("`undefined`", "`undefined`"),
        ],
        correct: 0,
        explanation: p("Si la condición es falsa, la clase no se añade. Por eso una base fija evita un `class=\"\"` vacío.", "If the condition is false, the class isn't added. That's why a fixed base avoids an empty `class=\"\"`."),
      }
    ],
  },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Furia de Caradhras", "The Wrath of Caradhras"),
    lore_intro: P("Enciende la baliza de Gondor: una clase que se activa al pulsar.", "Light the beacon of Gondor: a class that turns on when pressed."),
    challenge: {
      topic: P("Clase condicional + evento", "Conditional class + event"),
      instructions: P("Define `Baliza` con un `ref` `activa` (false) y `alternar`. El `template` es `<button :class=\"['baliza', { encendida: activa }]\" @click=\"alternar\">Gondor</button>`.", "Define `Baliza` with a `ref` `activa` (false) and `alternar`. The template is `<button :class=\"['baliza', { encendida: activa }]\" @click=\"alternar\">Gondor</button>`."),
      starter_code: "const Baliza = {\n  setup() {\n    // activa + alternar\n  },\n  template: ''\n};\n",
      blocks: [
        "const Baliza = {",
        "  setup() {",
        "    const activa = ref(false);",
        "    const alternar = () => { activa.value = !activa.value; };",
        "    return { activa, alternar };",
        "  },",
        "  template: '<button :class=\"[\\'baliza\\', { encendida: activa }]\" @click=\"alternar\">Gondor</button>'",
        "};",
        "  template: '<button :class=\"{ encendida: activa }\" @click=\"alternar\">Gondor</button>'",
      ],
      hints: [
        P("La sintaxis de array mezcla clase fija y condicional: `['baliza', { encendida: activa }]`.", "Array syntax mixes a fixed and a conditional class: `['baliza', { encendida: activa }]`."),
      ],
      test_cases: [
        { input: "render(Baliza, {})", expected: "<button class=\"baliza\">Gondor</button>", description: P("Apagada: sólo baliza", "Off: only baliza"), raw: true },
        { input: "trasClick(Baliza, {}, 'button')", expected: "<button class=\"baliza encendida\">Gondor</button>", description: P("Clic → encendida", "Click → lit"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: p("El Pergamino de lo Condicional", "The Scroll of the Conditional"),
    lore_intro: p("Un pergamino enseña a mostrar u ocultar según la situación.", "A scroll teaches how to show or hide based on the situation."),
    scroll: {
      topic: p("Vue: v-if y clases", "Vue: v-if and classes"),
      sections: [
        { heading: p("v-if / v-else", "v-if / v-else"), body: p("Renderiza una rama u otra según la condición.", "Renders one branch or another based on the condition."), code: "<p v-if=\"abierta\">Mellon</p>\n<p v-else>Cerrada</p>" },
        { heading: p("v-else-if", "v-else-if"), body: p("Encadena varios casos, como `if/else if/else`.", "Chains several cases, like `if/else if/else`."), code: "<p v-if=\"g<0\">Helada</p>\n<p v-else-if=\"g<20\">Fría</p>\n<p v-else>Templada</p>" },
        { heading: p("Clases", "Classes"), body: p("`:class` con array/objeto aplica clases condicionales.", "`:class` with an array/object applies conditional classes."), code: "<button :class=\"['base', { activa: on }]\">" },
      ],
      keyTakeaway: p("`v-if`/`v-else-if`/`v-else` eligen ramas; `:class` con objeto/array aplica clases según condición.", "`v-if`/`v-else-if`/`v-else` pick branches; `:class` with an object/array applies classes conditionally."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Póney", "Bill the Pony's Load"),
    lore_intro: P("Muestra si la puerta está abierta o cerrada.", "Show whether the door is open or shut."),
    challenge: {
      topic: P("v-if / v-else", "v-if / v-else"),
      instructions: P("Define `Puerta` con la prop `abierta` (booleana). El `template` muestra `<p v-if=\"abierta\">Mellon</p>` y `<p v-else>Cerrada</p>`.", "Define `Puerta` with prop `abierta` (boolean). The template shows `<p v-if=\"abierta\">Mellon</p>` and `<p v-else>Cerrada</p>`."),
      starter_code: "const Puerta = {\n  props: ['abierta'],\n  template: ''\n};\n",
      blocks: [
        "const Puerta = {",
        "  props: ['abierta'],",
        "  template: '<p v-if=\"abierta\">Mellon</p><p v-else>Cerrada</p>'",
        "};",
        "  template: '<p v-if=\"abierta\">Mellon</p><p v-if=\"!abierta\">Cerrada</p>'",
      ],
      hints: [
        P("`v-else` va en el elemento inmediatamente posterior al `v-if`.", "`v-else` goes on the element immediately after the `v-if`."),
      ],
      test_cases: [
        { input: "render(Puerta, { abierta: true })", expected: "<p>Mellon</p>", description: P("Abierta → Mellon", "Open → Mellon"), raw: true },
        { input: "render(Puerta, { abierta: false })", expected: "<p>Cerrada</p>", description: P("Cerrada", "Shut"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Resilience"),
    lore_intro: P("Indica si el héroe sigue en pie según sus puntos de vida.", "Show whether the hero still stands based on their hit points."),
    challenge: {
      topic: P("v-if con expresión", "v-if with an expression"),
      instructions: P("Define `Estado` con la prop `hp` (número). Muestra `<span v-if=\"hp > 0\">Vivo</span>` y `<span v-else>Caído</span>`.", "Define `Estado` with prop `hp` (number). Show `<span v-if=\"hp > 0\">Vivo</span>` and `<span v-else>Caído</span>`."),
      starter_code: "const Estado = {\n  props: ['hp'],\n  template: ''\n};\n",
      blocks: [
        "const Estado = {",
        "  props: ['hp'],",
        "  template: '<span v-if=\"hp > 0\">Vivo</span><span v-else>Caído</span>'",
        "};",
        "  template: '<span v-if=\"hp\">Vivo</span><span v-else>Caído</span>'",
      ],
      hints: [
        P("`v-if` acepta cualquier expresión: `hp > 0`.", "`v-if` accepts any expression: `hp > 0`."),
      ],
      test_cases: [
        { input: "render(Estado, { hp: 12 })", expected: "<span>Vivo</span>", description: P("hp 12 → Vivo", "hp 12 → alive"), raw: true },
        { input: "render(Estado, { hp: 0 })", expected: "<span>Caído</span>", description: P("hp 0 → Caído", "hp 0 → down"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("La Temperatura de la Montaña", "The Mountain's Temperature"),
    lore_intro: P("Clasifica el frío de Caradhras en tres grados.", "Classify Caradhras's cold in three degrees."),
    challenge: {
      topic: P("v-if / v-else-if / v-else", "v-if / v-else-if / v-else"),
      instructions: P("Define `Termometro` con la prop `grados`. Muestra `Helada` si `grados < 0`, `Fría` si `grados < 20`, y `Templada` en otro caso, cada una en un `<p>`.", "Define `Termometro` with prop `grados`. Show `Helada` if `grados < 0`, `Fría` if `grados < 20`, and `Templada` otherwise, each in a `<p>`."),
      starter_code: "const Termometro = {\n  props: ['grados'],\n  template: ''\n};\n",
      blocks: [
        "const Termometro = {",
        "  props: ['grados'],",
        "  template: '<p v-if=\"grados < 0\">Helada</p><p v-else-if=\"grados < 20\">Fría</p><p v-else>Templada</p>'",
        "};",
        "  template: '<p v-if=\"grados < 0\">Helada</p><p v-if=\"grados < 20\">Fría</p><p v-else>Templada</p>'",
      ],
      hints: [
        P("Encadena con `v-else-if`: `<p v-if=\"grados < 0\">…</p><p v-else-if=\"grados < 20\">…</p><p v-else>…</p>`.", "Chain with `v-else-if`: `<p v-if=\"grados < 0\">…</p><p v-else-if=\"grados < 20\">…</p><p v-else>…</p>`."),
      ],
      test_cases: [
        { input: "render(Termometro, { grados: -5 })", expected: "<p>Helada</p>", description: P("-5 → Helada", "-5 → frozen"), raw: true },
        { input: "render(Termometro, { grados: 10 })", expected: "<p>Fría</p>", description: P("10 → Fría", "10 → cold"), raw: true },
        { input: "render(Termometro, { grados: 25 })", expected: "<p>Templada</p>", description: P("25 → Templada", "25 → mild"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_6: Syllabus = {
  c6_trasgo_explorador: {
    kind: "battle",
    questions: [
    {
        question: p("¿Qué es una propiedad `computed`?", "What is a `computed` property?"),
        options: [
          p("Un valor derivado que se cachea y recalcula al cambiar sus dependencias", "A derived value that's cached and recomputed when dependencies change"),
          p("Un método normal", "A plain method"),
          p("Un ref", "A ref"),
          p("Una prop", "A prop"),
        ],
        correct: 0,
        explanation: p("`computed` deriva un valor de otros reactivos; se memoriza y sólo se recalcula si cambia una dependencia.", "`computed` derives a value from other reactives; it's memoized and only recomputes if a dependency changes."),
      },
      {
        question: p("En Options API, ¿desde dónde lee datos un computed?", "In the Options API, where does a computed read data from?"),
        options: [
          p("De `this` (props, refs de setup, data)", "From `this` (props, setup refs, data)"),
          p("De variables globales", "From global variables"),
          p("Del servidor", "From the server"),
          p("De ningún sitio", "From nowhere"),
        ],
        correct: 0,
        explanation: p("Un computed en Options API accede a `this.prop`, `this.dato`, etc. Devuelve el valor derivado.", "A computed in the Options API accesses `this.prop`, `this.data`, etc. It returns the derived value."),
      },
      {
        question: p("¿Cómo obtienes sólo los ítems que cumplen algo?", "How do you get only the items that match a condition?"),
        options: [
          p("Con `.filter(cond)` dentro de un computed", "With `.filter(cond)` inside a computed"),
          p("Con `.map`", "With `.map`"),
          p("Con `v-if` en el array", "With `v-if` on the array"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("Un computed que devuelve `this.lista.filter(...)` da la sublista filtrada, y la plantilla la recorre con `v-for`.", "A computed returning `this.lista.filter(...)` gives the filtered sublist, and the template loops it with `v-for`."),
      }
    ],
  },
  c6_trol_cavernas: {
    kind: "battle",
    questions: [
    {
        question: p("¿Un computed puede llamar a `.reduce`?", "Can a computed call `.reduce`?"),
        options: [
          p("Sí: para sumar/agregar valores", "Yes: to sum/aggregate values"),
          p("No", "No"),
          p("Sólo `.map`", "Only `.map`"),
          p("Sólo `.sort`", "Only `.sort`"),
        ],
        correct: 0,
        explanation: p("Dentro de un computed puedes usar cualquier método de array: `reduce` para totales, `filter`, `sort`, etc.", "Inside a computed you can use any array method: `reduce` for totals, `filter`, `sort`, etc."),
      },
      {
        question: p("¿Debe un computed mutar el array original al ordenar?", "Should a computed mutate the original array when sorting?"),
        options: [
          p("No: copia antes (`[...arr].sort()`)", "No: copy first (`[...arr].sort()`)"),
          p("Sí, siempre", "Yes, always"),
          p("Da igual", "It doesn't matter"),
          p("`sort` no muta", "`sort` doesn't mutate"),
        ],
        correct: 0,
        explanation: p("`sort` muta en sitio. En un computed conviene copiar antes: `[...this.arr].sort(...)` para no alterar el original.", "`sort` mutates in place. In a computed, copy first: `[...this.arr].sort(...)` to avoid altering the original."),
      },
      {
        question: p("¿Se recalcula un computed si nada de lo que usa cambia?", "Does a computed recompute if nothing it uses changes?"),
        options: [
          p("No: devuelve el valor cacheado", "No: it returns the cached value"),
          p("Sí, cada render", "Yes, every render"),
          p("Cada segundo", "Every second"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("El cacheo es la ventaja del computed frente a un método: sólo recalcula cuando cambia una dependencia.", "Caching is the computed's advantage over a method: it only recomputes when a dependency changes."),
      }
    ],
  },
  c6_capitan_trasgo: {
    kind: "battle",
    questions: [
    {
        question: p("¿Computed o método para un valor derivado que se usa varias veces?", "Computed or method for a derived value used several times?"),
        options: [
          p("`computed` (se cachea)", "`computed` (cached)"),
          p("Un método (recalcula siempre)", "A method (recomputes always)"),
          p("Un ref manual", "A manual ref"),
          p("Da igual", "It doesn't matter"),
        ],
        correct: 0,
        explanation: p("Para valores derivados, `computed` es lo idiomático: legible y cacheado.", "For derived values, `computed` is idiomatic: readable and cached."),
      },
      {
        question: p("Un computed que filtra y otro que cuenta, ¿pueden depender de lo mismo?", "Can one computed that filters and another that counts depend on the same data?"),
        options: [
          p("Sí, y ambos se actualizan al cambiar la fuente", "Yes, and both update when the source changes"),
          p("No", "No"),
          p("Sólo uno", "Only one"),
          p("Se pisan", "They clash"),
        ],
        correct: 0,
        explanation: p("Varios computed pueden derivar del mismo estado; cada uno se recalcula cuando cambia la dependencia común.", "Several computeds can derive from the same state; each recomputes when the shared dependency changes."),
      },
      {
        question: p("¿Un computed puede depender de una `prop`?", "Can a computed depend on a `prop`?"),
        options: [
          p("Sí: reacciona a cambios de la prop", "Yes: it reacts to prop changes"),
          p("No", "No"),
          p("Sólo de refs", "Only refs"),
          p("Sólo de data", "Only data"),
        ],
        correct: 0,
        explanation: p("Las props son reactivas; un computed que usa `this.prop` se recalcula cuando la prop cambia.", "Props are reactive; a computed using `this.prop` recomputes when the prop changes."),
      }
    ],
  },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("Suma la fuerza de la horda y señala a su jefe.", "Sum the horde's strength and name its chief."),
    challenge: {
      topic: P("Varios computed", "Several computed"),
      instructions: P("Define `Puente` con la prop `enemigos` (array de `{ nombre, fuerza }`), un `computed` `total` (suma de fuerzas) y otro `jefe` (nombre del de mayor fuerza). El `template` es `<div><p>Total: {{ total }}</p><p>Jefe: {{ jefe }}</p></div>`.", "Define `Puente` with prop `enemigos` (array of `{ nombre, fuerza }`), a `computed` `total` (sum of strengths) and another `jefe` (name of the strongest). The template is `<div><p>Total: {{ total }}</p><p>Jefe: {{ jefe }}</p></div>`."),
      starter_code: "const Puente = {\n  props: ['enemigos'],\n  computed: {\n    // total y jefe\n  },\n  template: ''\n};\n",
      blocks: [
        "const Puente = {",
        "  props: ['enemigos'],",
        "  computed: {",
        "    total() { return this.enemigos.reduce((a, e) => a + e.fuerza, 0); },",
        "    jefe() { return this.enemigos.reduce((m, e) => e.fuerza > m.fuerza ? e : m).nombre; }",
        "  },",
        "  template: '<div><p>Total: {{ total }}</p><p>Jefe: {{ jefe }}</p></div>'",
        "};",
        "    jefe() { return this.enemigos[0].nombre; }",
      ],
      hints: [
        P("`total` con `reduce`; `jefe` con `reduce` quedándote con el de mayor `fuerza` y su `.nombre`.", "`total` with `reduce`; `jefe` with `reduce` keeping the one with the highest `fuerza` and its `.nombre`."),
      ],
      test_cases: [
        { input: "render(Puente, { enemigos: [{ nombre: 'Orco', fuerza: 10 }, { nombre: 'Balrog', fuerza: 99 }, { nombre: 'Trol', fuerza: 40 }] })", expected: "<div><p>Total: 149</p><p>Jefe: Balrog</p></div>", description: P("Total 149, jefe Balrog", "Total 149, chief Balrog"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: p("El Pergamino de los Derivados", "The Scroll of Derived Values"),
    lore_intro: p("Un pergamino revela los valores calculados que se cachean.", "A scroll reveals computed values that cache themselves."),
    scroll: {
      topic: p("Vue: computed", "Vue: computed"),
      sections: [
        { heading: p("computed", "computed"), body: p("Un valor derivado, cacheado, que se recalcula al cambiar sus dependencias.", "A derived, cached value that recomputes when its dependencies change."), code: "computed: {\n  total() { return this.objetos.reduce((a,o)=>a+o.peso,0); }\n}" },
        { heading: p("Filtrar", "Filtering"), body: p("Un computed puede devolver una sublista con `.filter`.", "A computed can return a sublist with `.filter`."), code: "conVida() { return this.personajes.filter(p => p.hp > 0); }" },
        { heading: p("Copiar al ordenar", "Copy when sorting"), body: p("`sort` muta; copia antes con la propagación.", "`sort` mutates; copy first with the spread."), code: "asc() { return [...this.numeros].sort((a,b)=>a-b); }" },
      ],
      keyTakeaway: p("`computed` deriva y cachea; usa `filter`/`reduce`/`sort` (copiando al ordenar) para transformar listas.", "`computed` derives and caches; use `filter`/`reduce`/`sort` (copying when sorting) to transform lists."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P("Pesa la mochila sumando el peso de cada objeto.", "Weigh the pack by summing each object's weight."),
    challenge: {
      topic: P("computed (reduce)", "computed (reduce)"),
      instructions: P("Define `Mochila` con la prop `objetos` (array de `{ peso }`), un `computed` `total` que sume los pesos, y `template` `<p>Peso: {{ total }}</p>`.", "Define `Mochila` with prop `objetos` (array of `{ peso }`), a `computed` `total` summing the weights, and template `<p>Peso: {{ total }}</p>`."),
      starter_code: "const Mochila = {\n  props: ['objetos'],\n  computed: {\n    // total\n  },\n  template: ''\n};\n",
      blocks: [
        "const Mochila = {",
        "  props: ['objetos'],",
        "  computed: {",
        "    total() { return this.objetos.reduce((a, o) => a + o.peso, 0); }",
        "  },",
        "  template: '<p>Peso: {{ total }}</p>'",
        "};",
        "    total() { return this.objetos.length; }",
      ],
      hints: [
        P("`total() { return this.objetos.reduce((a, o) => a + o.peso, 0); }`.", "`total() { return this.objetos.reduce((a, o) => a + o.peso, 0); }`."),
      ],
      test_cases: [
        { input: "render(Mochila, { objetos: [{ peso: 3 }, { peso: 5 }] })", expected: "<p>Peso: 8</p>", description: P("3 + 5 = 8", "3 + 5 = 8"), raw: true },
        { input: "render(Mochila, { objetos: [] })", expected: "<p>Peso: 0</p>", description: P("Vacía → 0", "Empty → 0"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Muestra sólo a los que siguen con vida.", "Show only those still alive."),
    challenge: {
      topic: P("computed (filter)", "computed (filter)"),
      instructions: P("Define `Vivos` con la prop `personajes` (array de `{ nombre, hp }`), un `computed` `conVida` que filtre `hp > 0`, y una `<ul>` con `<li>{{ p.nombre }}</li>` por cada uno.", "Define `Vivos` with prop `personajes` (array of `{ nombre, hp }`), a `computed` `conVida` filtering `hp > 0`, and a `<ul>` with `<li>{{ p.nombre }}</li>` for each."),
      starter_code: "const Vivos = {\n  props: ['personajes'],\n  computed: {\n    // conVida\n  },\n  template: ''\n};\n",
      blocks: [
        "const Vivos = {",
        "  props: ['personajes'],",
        "  computed: {",
        "    conVida() { return this.personajes.filter(p => p.hp > 0); }",
        "  },",
        "  template: '<ul><li v-for=\"p in conVida\" :key=\"p.nombre\">{{ p.nombre }}</li></ul>'",
        "};",
        "    conVida() { return this.personajes.filter(p => p.hp); }",
      ],
      hints: [
        P("`conVida() { return this.personajes.filter(p => p.hp > 0); }` y recórrelo con `v-for`.", "`conVida() { return this.personajes.filter(p => p.hp > 0); }` and loop it with `v-for`."),
      ],
      test_cases: [
        { input: "render(Vivos, { personajes: [{ nombre: 'Frodo', hp: 10 }, { nombre: 'Boromir', hp: 0 }, { nombre: 'Sam', hp: 8 }] })", expected: "<ul><li>Frodo</li><li>Sam</li></ul>", description: P("Boromir (0) fuera", "Boromir (0) out"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Ordena las cifras rúnicas de menor a mayor.", "Sort the runic numbers from smallest to largest."),
    challenge: {
      topic: P("computed (sort)", "computed (sort)"),
      instructions: P("Define `Ordenada` con la prop `numeros` (array), un `computed` `ascendente` que devuelva una COPIA ordenada ascendente, y una `<ul>` con `<li>{{ n }}</li>` por cada uno.", "Define `Ordenada` with prop `numeros` (array), a `computed` `ascendente` returning a sorted ascending COPY, and a `<ul>` with `<li>{{ n }}</li>` for each."),
      starter_code: "const Ordenada = {\n  props: ['numeros'],\n  computed: {\n    // ascendente\n  },\n  template: ''\n};\n",
      blocks: [
        "const Ordenada = {",
        "  props: ['numeros'],",
        "  computed: {",
        "    ascendente() { return [...this.numeros].sort((a, b) => a - b); }",
        "  },",
        "  template: '<ul><li v-for=\"n in ascendente\" :key=\"n\">{{ n }}</li></ul>'",
        "};",
        "    ascendente() { return this.numeros.sort(); }",
      ],
      hints: [
        P("Copia antes de ordenar: `[...this.numeros].sort((a, b) => a - b)`.", "Copy before sorting: `[...this.numeros].sort((a, b) => a - b)`."),
      ],
      test_cases: [
        { input: "render(Ordenada, { numeros: [3, 1, 2] })", expected: "<ul><li>1</li><li>2</li><li>3</li></ul>", description: P("[3,1,2] → 1,2,3", "[3,1,2] → 1,2,3"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Calcula el saldo y tíñelo de rojo si es negativo.", "Compute the balance and paint it red if negative."),
    challenge: {
      topic: P("computed + clase condicional", "computed + conditional class"),
      instructions: P("Define `Saldo` con props `ingresos` y `gastos`, un `computed` `balance` = ingresos − gastos, y `template` `<p :class=\"['saldo', { rojo: balance < 0 }]\">{{ balance }}</p>`.", "Define `Saldo` with props `ingresos` and `gastos`, a `computed` `balance` = ingresos − gastos, and template `<p :class=\"['saldo', { rojo: balance < 0 }]\">{{ balance }}</p>`."),
      starter_code: "const Saldo = {\n  props: ['ingresos', 'gastos'],\n  computed: {\n    // balance\n  },\n  template: ''\n};\n",
      blocks: [
        "const Saldo = {",
        "  props: ['ingresos', 'gastos'],",
        "  computed: {",
        "    balance() { return this.ingresos - this.gastos; }",
        "  },",
        "  template: '<p :class=\"[\\'saldo\\', { rojo: balance < 0 }]\">{{ balance }}</p>'",
        "};",
        "    balance() { return this.gastos - this.ingresos; }",
      ],
      hints: [
        P("Aplica la clase con array: `['saldo', { rojo: balance < 0 }]`.", "Apply the class with an array: `['saldo', { rojo: balance < 0 }]`."),
      ],
      test_cases: [
        { input: "render(Saldo, { ingresos: 10, gastos: 4 })", expected: "<p class=\"saldo\">6</p>", description: P("10 − 4 = 6", "10 − 4 = 6"), raw: true },
        { input: "render(Saldo, { ingresos: 3, gastos: 8 })", expected: "<p class=\"saldo rojo\">-5</p>", description: P("3 − 8 = -5 (rojo)", "3 − 8 = -5 (red)"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_7: Syllabus = {
  c7_orco_explorador: {
    kind: "battle",
    questions: [
    {
        question: p("¿Cómo usas un componente hijo dentro de otro?", "How do you use a child component inside another?"),
        options: [
          p("Registrándolo en `components` y usándolo en la plantilla", "Registering it in `components` and using it in the template"),
          p("Con `import` en el HTML", "With `import` in the HTML"),
          p("Con `new Comp()`", "With `new Comp()`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("Registra el hijo en la opción `components: { Hijo }` y colócalo como `<Hijo />` en la plantilla del padre.", "Register the child in `components: { Hijo }` and place it as `<Hijo />` in the parent's template."),
      },
      {
        question: p("¿Qué proyecta un `<slot></slot>`?", "What does a `<slot></slot>` project?"),
        options: [
          p("El contenido que el padre pone entre las etiquetas del hijo", "The content the parent puts between the child's tags"),
          p("Una prop", "A prop"),
          p("Un evento", "An event"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("El `<slot>` es un hueco: `<Tarjeta>Hola</Tarjeta>` mete `Hola` donde el hijo tenga su `<slot>`.", "The `<slot>` is a placeholder: `<Tarjeta>Hola</Tarjeta>` puts `Hola` where the child has its `<slot>`."),
      },
      {
        question: p("¿Cómo pasas datos a un hijo?", "How do you pass data to a child?"),
        options: [
          p("Con props: `<Hijo :nombre=\"n\" />`", "With props: `<Hijo :nombre=\"n\" />`"),
          p("Con variables globales", "With global variables"),
          p("Con `this`", "With `this`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("El padre pasa datos por props enlazadas: `<Hijo :nombre=\"n\" />`. El hijo las declara en `props`.", "The parent passes data via bound props: `<Hijo :nombre=\"n\" />`. The child declares them in `props`."),
      }
    ],
  },
  c7_trasgo_frontera: {
    kind: "battle",
    questions: [
    {
        question: p("¿Puedes usar el mismo componente varias veces?", "Can you use the same component multiple times?"),
        options: [
          p("Sí, cada uso es una instancia independiente", "Yes, each use is an independent instance"),
          p("No", "No"),
          p("Sólo dos veces", "Only twice"),
          p("Sólo con id", "Only with an id"),
        ],
        correct: 0,
        explanation: p("Reutilizar componentes es el objetivo: `<Estrella /><Estrella />` crea dos instancias separadas.", "Reusing components is the point: `<Estrella /><Estrella />` creates two separate instances."),
      },
      {
        question: p("¿Puedes combinar `v-for` con un componente?", "Can you combine `v-for` with a component?"),
        options: [
          p("Sí: `<Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" />`", "Yes: `<Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" />`"),
          p("No", "No"),
          p("Sólo con divs", "Only with divs"),
          p("Sólo una vez", "Only once"),
        ],
        correct: 0,
        explanation: p("Puedes repetir un componente con `v-for`, pasando a cada uno sus props: un patrón muy común para listas.", "You can repeat a component with `v-for`, passing each its props: a very common pattern for lists."),
      },
      {
        question: p("Un componente sin `<slot>`, ¿muestra el contenido entre sus etiquetas?", "Does a component without `<slot>` show content between its tags?"),
        options: [
          p("No: se descarta si no hay slot", "No: it's discarded if there's no slot"),
          p("Sí siempre", "Yes always"),
          p("Da error", "It errors"),
          p("Lo pone al final", "It appends it"),
        ],
        correct: 0,
        explanation: p("Sin `<slot>`, el contenido proyectado no tiene dónde ir y se ignora.", "Without a `<slot>`, projected content has nowhere to go and is ignored."),
      }
    ],
  },
  c7_uruk_rastreador: {
    kind: "battle",
    questions: [
    {
        question: p("Las props que recibe un hijo son…", "The props a child receives are…"),
        options: [
          p("De sólo lectura (no las muta el hijo)", "Read-only (the child shouldn't mutate them)"),
          p("Modificables libremente", "Freely modifiable"),
          p("Globales", "Global"),
          p("Opcionales siempre", "Always optional"),
        ],
        correct: 0,
        explanation: p("El flujo es de arriba a abajo: el hijo no debe mutar sus props; para cambiar algo, avisa al padre.", "Flow is top-down: the child shouldn't mutate its props; to change something, it notifies the parent."),
      },
      {
        question: p("¿Cómo anidas componentes?", "How do you nest components?"),
        options: [
          p("Un componente puede usar otros en su plantilla, y esos otros más", "A component can use others in its template, and those others more"),
          p("No se puede anidar", "You can't nest"),
          p("Sólo dos niveles", "Only two levels"),
          p("Con herencia", "With inheritance"),
        ],
        correct: 0,
        explanation: p("Los árboles de componentes se anidan libremente: padre → hijos → nietos, cada uno con su plantilla.", "Component trees nest freely: parent → children → grandchildren, each with its template."),
      },
      {
        question: p("`:nombre=\"d\"` frente a `nombre=\"d\"`:", "`:nombre=\"d\"` vs `nombre=\"d\"`:"),
        options: [
          p("Con `:` pasa la variable `d`; sin `:`, el texto \"d\"", "With `:` passes the variable `d`; without, the text \"d\""),
          p("Son iguales", "They're the same"),
          p("Ambos pasan texto", "Both pass text"),
          p("Ambos pasan la variable", "Both pass the variable"),
        ],
        correct: 0,
        explanation: p("`:nombre=\"d\"` enlaza a la expresión `d`; `nombre=\"d\"` pasa la cadena literal \"d\".", "`:nombre=\"d\"` binds to the expression `d`; `nombre=\"d\"` passes the literal string \"d\"."),
      }
    ],
  },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de Isengard", "Uglúk of Isengard"),
    lore_intro: P("Levanta una tabla de personajes: una fila-componente por cada uno.", "Raise a table of characters: one row-component each."),
    challenge: {
      topic: P("Tabla de componentes", "Table of components"),
      instructions: P("Define `Fila` con la prop `p` y `template` `<tr><td>{{ p.nombre }}</td><td>{{ p.poder }}</td></tr>`, y `Tabla` con la prop `personajes` que renderice `<Fila v-for=\"p in personajes\" :key=\"p.nombre\" :p=\"p\" />` dentro de `<table>`. La última expresión debe ser `Tabla`.", "Define `Fila` with prop `p` and template `<tr><td>{{ p.nombre }}</td><td>{{ p.poder }}</td></tr>`, and `Tabla` with prop `personajes` rendering `<Fila v-for=\"p in personajes\" :key=\"p.nombre\" :p=\"p\" />` inside `<table>`. The last expression must be `Tabla`."),
      starter_code: "const Fila = {\n  props: ['p'],\n  template: ''\n};\nconst Tabla = {\n  components: { Fila },\n  props: ['personajes'],\n  template: ''\n};\n",
      blocks: [
        "const Fila = {",
        "  props: ['p'],",
        "  template: '<tr><td>{{ p.nombre }}</td><td>{{ p.poder }}</td></tr>'",
        "};",
        "const Tabla = {",
        "  components: { Fila },",
        "  props: ['personajes'],",
        "  template: '<table><Fila v-for=\"p in personajes\" :key=\"p.nombre\" :p=\"p\" /></table>'",
        "};",
        "  template: '<table><Fila v-for=\"p in personajes\" :key=\"p.nombre\" p=\"p\" /></table>'",
      ],
      hints: [
        P("Pasa el objeto entero como prop: `:p=\"p\"`.", "Pass the whole object as a prop: `:p=\"p\"`."),
      ],
      test_cases: [
        { input: "render(Tabla, { personajes: [{ nombre: 'Frodo', poder: 20 }, { nombre: 'Aragorn', poder: 80 }] })", expected: "<table><tr><td>Frodo</td><td>20</td></tr><tr><td>Aragorn</td><td>80</td></tr></table>", description: P("Frodo y Aragorn", "Frodo and Aragorn"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: p("El Pergamino de la Composición", "The Scroll of Composition"),
    lore_intro: p("Un pergamino enseña a componer con hijos y slots.", "A scroll teaches how to compose with children and slots."),
    scroll: {
      topic: p("Vue: componentes y slots", "Vue: components and slots"),
      sections: [
        { heading: p("Registrar hijo", "Register child"), body: p("Declara el hijo en `components` y úsalo en la plantilla.", "Declare the child in `components` and use it in the template."), code: "components: { Estrella },\ntemplate: '<div><Estrella /></div>'" },
        { heading: p("Props al hijo", "Props to child"), body: p("Pasa datos con props enlazadas, incluso en un `v-for`.", "Pass data with bound props, even inside a `v-for`."), code: "<Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" />" },
        { heading: p("Slot", "Slot"), body: p("`<slot>` proyecta el contenido que pone el padre.", "`<slot>` projects the content the parent provides."), code: "template: '<div class=\"carta\"><slot></slot></div>'" },
      ],
      keyTakeaway: p("Registra hijos en `components`, pásales props (incluso en `v-for`) y proyecta contenido con `<slot>`.", "Register children in `components`, pass them props (even in `v-for`) and project content with `<slot>`."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P("Compón un cielo con dos estrellas: reutiliza un hijo.", "Compose a sky with two stars: reuse a child."),
    challenge: {
      topic: P("Componente hijo", "Child component"),
      instructions: P("Define `Estrella` con `template` `<span>✦</span>`, y `Cielo` que lo registre en `components` y lo use dos veces: `template` `<div><Estrella /><Estrella /></div>`. La última expresión debe ser `Cielo`.", "Define `Estrella` with template `<span>✦</span>`, and `Cielo` that registers it in `components` and uses it twice: template `<div><Estrella /><Estrella /></div>`. The last expression must be `Cielo`."),
      starter_code: "const Estrella = {\n  template: ''\n};\nconst Cielo = {\n  components: { Estrella },\n  template: ''\n};\n",
      blocks: [
        "const Estrella = {",
        "  template: '<span>✦</span>'",
        "};",
        "const Cielo = {",
        "  components: { Estrella },",
        "  template: '<div><Estrella /><Estrella /></div>'",
        "};",
        "  template: '<div><Estrella /></div>'",
      ],
      hints: [
        P("Registra el hijo: `components: { Estrella }` y úsalo como `<Estrella />`.", "Register the child: `components: { Estrella }` and use it as `<Estrella />`."),
      ],
      test_cases: [
        { input: "render(Cielo, {})", expected: "<div><span>✦</span><span>✦</span></div>", description: P("Dos estrellas", "Two stars"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("Envuelve un contenido en una tarjeta con un slot.", "Wrap content in a card with a slot."),
    challenge: {
      topic: P("Slot", "Slot"),
      instructions: P("Define `Tarjeta` con `template` `<div class=\"carta\"><slot></slot></div>`, y `Vitrina` que la use con contenido: `template` `<Tarjeta>Frodo</Tarjeta>`. La última expresión debe ser `Vitrina`.", "Define `Tarjeta` with template `<div class=\"carta\"><slot></slot></div>`, and `Vitrina` using it with content: template `<Tarjeta>Frodo</Tarjeta>`. The last expression must be `Vitrina`."),
      starter_code: "const Tarjeta = {\n  template: ''\n};\nconst Vitrina = {\n  components: { Tarjeta },\n  template: ''\n};\n",
      blocks: [
        "const Tarjeta = {",
        "  template: '<div class=\"carta\"><slot></slot></div>'",
        "};",
        "const Vitrina = {",
        "  components: { Tarjeta },",
        "  template: '<Tarjeta>Frodo</Tarjeta>'",
        "};",
        "  template: '<div class=\"carta\"></div>'",
      ],
      hints: [
        P("El `<slot>` recibe lo que el padre ponga entre `<Tarjeta>…</Tarjeta>`.", "The `<slot>` receives whatever the parent puts between `<Tarjeta>…</Tarjeta>`."),
      ],
      test_cases: [
        { input: "render(Vitrina, {})", expected: "<div class=\"carta\">Frodo</div>", description: P("Frodo en la tarjeta", "Frodo in the card"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("Reparte los dones: un componente hijo por cada uno.", "Hand out the gifts: one child component per gift."),
    challenge: {
      topic: P("v-for de componentes con props", "v-for of components with props"),
      instructions: P("Define `Don` con la prop `nombre` y `template` `<li>{{ nombre }}</li>`, y `Reparto` con la prop `dones` (array) que renderice `<Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" />` dentro de una `<ul>`. La última expresión debe ser `Reparto`.", "Define `Don` with prop `nombre` and template `<li>{{ nombre }}</li>`, and `Reparto` with prop `dones` (array) rendering `<Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" />` inside a `<ul>`. The last expression must be `Reparto`."),
      starter_code: "const Don = {\n  props: ['nombre'],\n  template: ''\n};\nconst Reparto = {\n  components: { Don },\n  props: ['dones'],\n  template: ''\n};\n",
      blocks: [
        "const Don = {",
        "  props: ['nombre'],",
        "  template: '<li>{{ nombre }}</li>'",
        "};",
        "const Reparto = {",
        "  components: { Don },",
        "  props: ['dones'],",
        "  template: '<ul><Don v-for=\"d in dones\" :key=\"d\" :nombre=\"d\" /></ul>'",
        "};",
        "  template: '<ul><Don v-for=\"d in dones\" :key=\"d\" nombre=\"d\" /></ul>'",
      ],
      hints: [
        P("Pasa la variable con `:nombre=\"d\"` (con dos puntos), no `nombre=\"d\"`.", "Pass the variable with `:nombre=\"d\"` (with a colon), not `nombre=\"d\"`."),
      ],
      test_cases: [
        { input: "render(Reparto, { dones: ['Frasco', 'Capa', 'Pan'] })", expected: "<ul><li>Frasco</li><li>Capa</li><li>Pan</li></ul>", description: P("Tres dones", "Three gifts"), raw: true },
      ],
    },
  },
};

export const SYL_VUE_8: Syllabus = {
  c8_uruk_arquero: {
    kind: "battle",
    questions: [
    {
        question: p("¿Cómo avisa un hijo a su padre de que algo pasó?", "How does a child tell its parent something happened?"),
        options: [
          p("Emitiendo un evento con `$emit('nombre')`", "By emitting an event with `$emit('nombre')`"),
          p("Mutando una prop", "By mutating a prop"),
          p("Con una variable global", "With a global variable"),
          p("No puede", "It can't"),
        ],
        correct: 0,
        explanation: p("El hijo emite (`$emit`) y el padre escucha (`@nombre`). Así el flujo de datos baja por props y sube por eventos.", "The child emits (`$emit`) and the parent listens (`@nombre`). Data flows down via props and up via events."),
      },
      {
        question: p("El padre escucha el evento `pulsar` con…", "The parent listens for the `pulsar` event with…"),
        options: [
          p("`@pulsar=\"metodo\"`", "`@pulsar=\"metodo\"`"),
          p("`:pulsar`", "`:pulsar`"),
          p("`v-model:pulsar`", "`v-model:pulsar`"),
          p("`prop:pulsar`", "`prop:pulsar`"),
        ],
        correct: 0,
        explanation: p("Los eventos personalizados se escuchan con `@nombreEvento`, igual que los nativos.", "Custom events are listened to with `@eventName`, just like native ones."),
      },
      {
        question: p("¿Debe el hijo declarar sus eventos?", "Should the child declare its events?"),
        options: [
          p("Sí, en `emits: ['pulsar']` (buena práctica)", "Yes, in `emits: ['pulsar']` (good practice)"),
          p("No, nunca", "No, never"),
          p("Sólo props", "Only props"),
          p("Sólo en data", "Only in data"),
        ],
        correct: 0,
        explanation: p("Declarar `emits` documenta la interfaz del componente y ayuda a Vue a distinguir eventos de atributos.", "Declaring `emits` documents the component's interface and helps Vue tell events from attributes."),
      }
    ],
  },
  c8_orco_saqueador: {
    kind: "battle",
    questions: [
    {
        question: p("¿Puede `$emit` llevar datos (payload)?", "Can `$emit` carry data (payload)?"),
        options: [
          p("Sí: `$emit('tirar', 6)`", "Yes: `$emit('tirar', 6)`"),
          p("No", "No"),
          p("Sólo strings", "Only strings"),
          p("Sólo booleanos", "Only booleans"),
        ],
        correct: 0,
        explanation: p("Tras el nombre del evento van los argumentos: `$emit('tirar', 6)`. El padre los recibe en su manejador.", "After the event name come the arguments: `$emit('tirar', 6)`. The parent receives them in its handler."),
      },
      {
        question: p("El padre recibe el payload en…", "The parent receives the payload in…"),
        options: [
          p("El parámetro del manejador: `acumular(v)`", "The handler's parameter: `acumular(v)`"),
          p("Una prop", "A prop"),
          p("`this.payload`", "`this.payload`"),
          p("No lo recibe", "It doesn't receive it"),
        ],
        correct: 0,
        explanation: p("`@tirar=\"acumular\"` pasa el payload como argumento: `acumular(valor)`.", "`@tirar=\"acumular\"` passes the payload as an argument: `acumular(value)`."),
      },
      {
        question: p("¿Elevar el estado (lifting) significa…?", "Does lifting state mean…?"),
        options: [
          p("Poner el estado en el padre común y pasarlo/recibirlo", "Putting state in the common parent and passing/receiving it"),
          p("Borrarlo", "Deleting it"),
          p("Duplicarlo en cada hijo", "Duplicating it in each child"),
          p("Usar globales", "Using globals"),
        ],
        correct: 0,
        explanation: p("Cuando varios hijos comparten estado, se eleva al padre: baja por props, sube por eventos.", "When several children share state, it's lifted to the parent: down via props, up via events."),
      }
    ],
  },
  c8_uruk_espadachin: {
    kind: "battle",
    questions: [
    {
        question: p("En un `v-for` de hijos, ¿cómo sabe el padre cuál emitió?", "In a `v-for` of children, how does the parent know which emitted?"),
        options: [
          p("El hijo incluye un dato en el payload: `$emit('caer', nombre)`", "The child includes data in the payload: `$emit('caer', nombre)`"),
          p("Por el color", "By color"),
          p("No puede saberlo", "It can't know"),
          p("Por el orden del DOM", "By DOM order"),
        ],
        correct: 0,
        explanation: p("El hijo manda su identidad en el payload; el padre la usa para saber quién disparó el evento.", "The child sends its identity in the payload; the parent uses it to know who fired the event."),
      },
      {
        question: p("Flujo de datos idiomático en Vue:", "Idiomatic data flow in Vue:"),
        options: [
          p("Props hacia abajo, eventos hacia arriba", "Props down, events up"),
          p("Todo global", "Everything global"),
          p("Sólo hacia abajo", "Only downward"),
          p("Aleatorio", "Random"),
        ],
        correct: 0,
        explanation: p("El patrón de Vue: los datos bajan por props y las notificaciones suben por eventos. Predecible y mantenible.", "Vue's pattern: data flows down via props and notifications flow up via events. Predictable and maintainable."),
      },
      {
        question: p("¿Un componente puede tener props, estado, computed y emitir eventos a la vez?", "Can a component have props, state, computed and emit events all at once?"),
        options: [
          p("Sí: así se construyen componentes reales", "Yes: that's how real components are built"),
          p("No", "No"),
          p("Sólo dos cosas", "Only two of them"),
          p("Sólo props", "Only props"),
        ],
        correct: 0,
        explanation: p("Un componente combina props (entrada), estado reactivo, computed (derivados) y emits (salida): la interfaz completa.", "A component combines props (input), reactive state, computed (derived) and emits (output): the full interface."),
      }
    ],
  },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("La prueba final: un bestiario que se filtra al pulsar.", "The final trial: a bestiary that filters when pressed."),
    challenge: {
      topic: P("Estado + computed + v-for + evento", "State + computed + v-for + event"),
      instructions: P("Define `Bestiario` con la prop `bestias` (array de `{ nombre, peligro }`), un `ref` `soloPeligrosas` (false) con `alternar`, un `computed` `visibles` (todas, o sólo las peligrosas si el filtro está activo) y `template` `<div><button @click=\"alternar\">Filtrar</button><ul><li v-for=\"b in visibles\" :key=\"b.nombre\">{{ b.nombre }}</li></ul></div>`.", "Define `Bestiario` with prop `bestias` (array of `{ nombre, peligro }`), a `ref` `soloPeligrosas` (false) with `alternar`, a `computed` `visibles` (all, or only the dangerous ones if the filter is on) and template `<div><button @click=\"alternar\">Filtrar</button><ul><li v-for=\"b in visibles\" :key=\"b.nombre\">{{ b.nombre }}</li></ul></div>`."),
      starter_code: "const Bestiario = {\n  props: ['bestias'],\n  setup() {\n    // soloPeligrosas + alternar\n  },\n  computed: {\n    // visibles\n  },\n  template: ''\n};\n",
        support_code: "const bestias = [\n  { nombre: 'Orco', peligro: true },\n  { nombre: 'Conejo', peligro: false },\n  { nombre: 'Balrog', peligro: true }\n];",
      blocks: [
        "const Bestiario = {",
        "  props: ['bestias'],",
        "  setup() {",
        "    const soloPeligrosas = ref(false);",
        "    const alternar = () => { soloPeligrosas.value = !soloPeligrosas.value; };",
        "    return { soloPeligrosas, alternar };",
        "  },",
        "  computed: {",
        "    visibles() {",
        "      return this.soloPeligrosas",
        "        ? this.bestias.filter(b => b.peligro)",
        "        : this.bestias;",
        "    }",
        "  },",
        "  template: '<div><button @click=\"alternar\">Filtrar</button><ul><li v-for=\"b in visibles\" :key=\"b.nombre\">{{ b.nombre }}</li></ul></div>'",
        "};",
        "    visibles() { return this.bestias.filter(b => b.peligro); }",
      ],
      hints: [
        P("El computed decide: `this.soloPeligrosas ? this.bestias.filter(b => b.peligro) : this.bestias`.", "The computed decides: `this.soloPeligrosas ? this.bestias.filter(b => b.peligro) : this.bestias`."),
        P("El botón alterna el ref; el computed reacciona.", "The button toggles the ref; the computed reacts."),
      ],
      test_cases: [
        { input: "render(Bestiario, { bestias })", expected: "<div><button>Filtrar</button><ul><li>Orco</li><li>Conejo</li><li>Balrog</li></ul></div>", description: P("Sin filtro: todas", "No filter: all"), raw: true },
        { input: "trasClick(Bestiario, { bestias }, 'button')", expected: "<div><button>Filtrar</button><ul><li>Orco</li><li>Balrog</li></ul></div>", description: P("Filtrar → peligrosas", "Filter → dangerous"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: p("El Pergamino de los Eventos", "The Scroll of Events"),
    lore_intro: p("Un pergamino cierra el círculo: los hijos avisan al padre.", "A scroll closes the circle: children notify the parent."),
    scroll: {
      topic: p("Vue: emits y comunicación", "Vue: emits and communication"),
      sections: [
        { heading: p("$emit", "$emit"), body: p("El hijo dispara un evento; el padre lo escucha con `@`.", "The child fires an event; the parent listens with `@`."), code: "// hijo\ntemplate: '<button @click=\"$emit(\\'pulsar\\')\">+</button>'\n// padre\n<Boton @pulsar=\"sumar\" />" },
        { heading: p("Payload", "Payload"), body: p("Tras el nombre van los datos: el padre los recibe como argumento.", "After the name come the data: the parent receives them as an argument."), code: "$emit('tirar', 6)  // padre: acumular(v)" },
        { heading: p("Flujo", "Flow"), body: p("Props hacia abajo, eventos hacia arriba: predecible y mantenible.", "Props down, events up: predictable and maintainable."), code: "// estado en el padre; se eleva cuando se comparte" },
      ],
      keyTakeaway: p("El hijo `$emit`-e eventos (con payload) y el padre escucha con `@`. Props bajan, eventos suben.", "The child `$emit`s events (with payload) and the parent listens with `@`. Props down, events up."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P("El hijo pulsa; el padre cuenta. Comunícalos con un evento.", "The child presses; the parent counts. Connect them with an event."),
    challenge: {
      topic: P("$emit / @evento", "$emit / @event"),
      instructions: P("Define `Boton` que emita `pulsar` al hacer clic (`<button @click=\"$emit('pulsar')\">+</button>`), y `Panel` que lo registre, tenga un `ref` `n` (0) y `sumar`, y lo escuche: `<div><Boton @pulsar=\"sumar\" /><span>{{ n }}</span></div>`. La última expresión debe ser `Panel`.", "Define `Boton` that emits `pulsar` on click (`<button @click=\"$emit('pulsar')\">+</button>`), and `Panel` that registers it, has a `ref` `n` (0) and `sumar`, and listens: `<div><Boton @pulsar=\"sumar\" /><span>{{ n }}</span></div>`. The last expression must be `Panel`."),
      starter_code: "const Boton = {\n  emits: ['pulsar'],\n  template: ''\n};\nconst Panel = {\n  components: { Boton },\n  setup() {\n    // n + sumar\n  },\n  template: ''\n};\n",
      blocks: [
        "const Boton = {",
        "  emits: ['pulsar'],",
        "  template: '<button @click=\"$emit(\\'pulsar\\')\">+</button>'",
        "};",
        "const Panel = {",
        "  components: { Boton },",
        "  setup() {",
        "    const n = ref(0);",
        "    const sumar = () => { n.value++; };",
        "    return { n, sumar };",
        "  },",
        "  template: '<div><Boton @pulsar=\"sumar\" /><span>{{ n }}</span></div>'",
        "};",
        "  template: '<button @click=\"sumar\">+</button>'",
      ],
      hints: [
        P("El hijo emite: `$emit('pulsar')`. El padre escucha: `@pulsar=\"sumar\"`.", "The child emits: `$emit('pulsar')`. The parent listens: `@pulsar=\"sumar\"`."),
      ],
      test_cases: [
        { input: "render(Panel, {})", expected: "<div><button>+</button><span>0</span></div>", description: P("Empieza en 0", "Starts at 0"), raw: true },
        { input: "trasClicks(Panel, {}, 'button', 3)", expected: "<div><button>+</button><span>3</span></div>", description: P("Tres clics → 3", "Three clicks → 3"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("El hijo tira el dado y envía el 6; el padre acumula.", "The child rolls the die and sends the 6; the parent accumulates."),
    challenge: {
      topic: P("$emit con payload", "$emit with payload"),
      instructions: P("Define `Dado` que emita `tirar` con el valor 6 (`<button @click=\"$emit('tirar', 6)\">Tirar</button>`), y `Mesa` que lo registre, tenga un `ref` `suma` (0) y `acumular(v)` que sume `v`, escuchando `<div><Dado @tirar=\"acumular\" /><span>{{ suma }}</span></div>`. La última expresión debe ser `Mesa`.", "Define `Dado` that emits `tirar` with value 6 (`<button @click=\"$emit('tirar', 6)\">Tirar</button>`), and `Mesa` that registers it, has a `ref` `suma` (0) and `acumular(v)` adding `v`, listening `<div><Dado @tirar=\"acumular\" /><span>{{ suma }}</span></div>`. The last expression must be `Mesa`."),
      starter_code: "const Dado = {\n  emits: ['tirar'],\n  template: ''\n};\nconst Mesa = {\n  components: { Dado },\n  setup() {\n    // suma + acumular\n  },\n  template: ''\n};\n",
      blocks: [
        "const Dado = {",
        "  emits: ['tirar'],",
        "  template: '<button @click=\"$emit(\\'tirar\\', 6)\">Tirar</button>'",
        "};",
        "const Mesa = {",
        "  components: { Dado },",
        "  setup() {",
        "    const suma = ref(0);",
        "    const acumular = (v) => { suma.value += v; };",
        "    return { suma, acumular };",
        "  },",
        "  template: '<div><Dado @tirar=\"acumular\" /><span>{{ suma }}</span></div>'",
        "};",
        "  template: '<button @click=\"$emit(\\'tirar\\')\">Tirar</button>'",
      ],
      hints: [
        P("El payload va tras el nombre: `$emit('tirar', 6)`. El padre lo recibe en `acumular(v)`.", "The payload goes after the name: `$emit('tirar', 6)`. The parent receives it in `acumular(v)`."),
      ],
      test_cases: [
        { input: "render(Mesa, {})", expected: "<div><button>Tirar</button><span>0</span></div>", description: P("Empieza en 0", "Starts at 0"), raw: true },
        { input: "trasClicks(Mesa, {}, 'button', 2)", expected: "<div><button>Tirar</button><span>12</span></div>", description: P("Dos tiradas → 12", "Two rolls → 12"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("Cada soldado que cae grita su nombre; el padre anota el último.", "Each fallen soldier shouts its name; the parent notes the last."),
    challenge: {
      topic: P("v-for de hijos que emiten", "v-for of emitting children"),
      instructions: P("Define `Soldado` con la prop `nombre` que emita `caer` con su `nombre` al hacer clic (`<button @click=\"$emit('caer', nombre)\">{{ nombre }}</button>`), y `Batalla` con la prop `tropas` que renderice un `Soldado` por cada una y guarde en un `ref` `ultimo` el nombre recibido, mostrando `<div>…<p>{{ ultimo }}</p></div>`. La última expresión debe ser `Batalla`.", "Define `Soldado` with prop `nombre` emitting `caer` with its `nombre` on click (`<button @click=\"$emit('caer', nombre)\">{{ nombre }}</button>`), and `Batalla` with prop `tropas` rendering a `Soldado` per item and storing the received name in a `ref` `ultimo`, showing `<div>…<p>{{ ultimo }}</p></div>`. The last expression must be `Batalla`."),
      starter_code: "const Soldado = {\n  props: ['nombre'],\n  emits: ['caer'],\n  template: ''\n};\nconst Batalla = {\n  components: { Soldado },\n  props: ['tropas'],\n  setup() {\n    // ultimo + registrar\n  },\n  template: ''\n};\n",
      blocks: [
        "const Soldado = {",
        "  props: ['nombre'],",
        "  emits: ['caer'],",
        "  template: '<button @click=\"$emit(\\'caer\\', nombre)\">{{ nombre }}</button>'",
        "};",
        "const Batalla = {",
        "  components: { Soldado },",
        "  props: ['tropas'],",
        "  setup() {",
        "    const ultimo = ref('');",
        "    const registrar = (n) => { ultimo.value = n; };",
        "    return { ultimo, registrar };",
        "  },",
        "  template: '<div><Soldado v-for=\"t in tropas\" :key=\"t\" :nombre=\"t\" @caer=\"registrar\" /><p>{{ ultimo }}</p></div>'",
        "};",
        "  template: '<button @click=\"$emit(\\'caer\\')\">{{ nombre }}</button>'",
      ],
      hints: [
        P("El hijo manda su identidad: `$emit('caer', nombre)`. El padre la guarda: `registrar(n) { ultimo.value = n; }`.", "The child sends its identity: `$emit('caer', nombre)`. The parent stores it: `registrar(n) { ultimo.value = n; }`."),
      ],
      test_cases: [
        { input: "render(Batalla, { tropas: ['Uruk', 'Orco'] })", expected: "<div><button>Uruk</button><button>Orco</button><p></p></div>", description: P("Dos soldados, sin caídos", "Two soldiers, none fallen"), raw: true },
        { input: "trasClick(Batalla, { tropas: ['Uruk', 'Orco'] }, 'button')", expected: "<div><button>Uruk</button><button>Orco</button><p>Uruk</p></div>", description: P("Clic Uruk → Uruk", "Click Uruk → Uruk"), raw: true },
      ],
    },
  },
};
