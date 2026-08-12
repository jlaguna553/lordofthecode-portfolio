import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de React para el Libro I. Reviste la MISMA narrativa compartida de la
 * Comunidad con los fundamentos de React: componentes, props y JSX. El código
 * del jugador se TRANSPILA (JSX → React.createElement) y se RENDERIZA a HTML con
 * renderToStaticMarkup; el test compara ese HTML. En los tests, `render(el)`
 * devuelve el HTML estático de un elemento. Bilingüe ES/EN.
 */

const P = (es: string, en: string) => ({ es, en });

/** Preguntas de combate reutilizables sobre fundamentos de React. */
const Q_COMPONENT = {
  question: P(
    "¿Qué es un componente en React?",
    "What is a component in React?",
  ),
  options: [
    P(
      "Una función que devuelve JSX (lo que se ve en pantalla)",
      "A function that returns JSX (what appears on screen)",
    ),
    P("Una etiqueta HTML nueva", "A new HTML tag"),
    P("Un fichero .css", "A .css file"),
    P("Una variable global", "A global variable"),
  ],
  correct: 0,
  explanation: P(
    "Un componente es una función que recibe `props` y devuelve JSX describiendo la interfaz. Su nombre va en MAYÚSCULA inicial (`Hobbit`), y se usa como una etiqueta: `<Hobbit />`.",
    "A component is a function that takes `props` and returns JSX describing the UI. Its name starts with a CAPITAL letter (`Hobbit`), and it's used like a tag: `<Hobbit />`.",
  ),
};
const Q_JSX = {
  question: P(
    "¿Qué es JSX, como `<h1>Hola</h1>` dentro de JavaScript?",
    "What is JSX, like `<h1>Hola</h1>` inside JavaScript?",
  ),
  options: [
    P(
      "Azúcar sintáctico que se transpila a `React.createElement(...)`",
      "Syntactic sugar that transpiles to `React.createElement(...)`",
    ),
    P("HTML de verdad ejecutándose", "Real HTML running directly"),
    P("Una plantilla de texto", "A text template"),
    P("Un tipo de comentario", "A kind of comment"),
  ],
  correct: 0,
  explanation: P(
    "JSX no es HTML: es azúcar para `React.createElement('h1', null, 'Hola')`. El navegador no lo entiende directamente; un transpilador (Babel o TypeScript) lo convierte antes de ejecutarlo.",
    "JSX isn't HTML: it's sugar for `React.createElement('h1', null, 'Hola')`. The browser doesn't understand it directly; a transpiler (Babel or TypeScript) converts it before running.",
  ),
};
const Q_PROPS = {
  question: P(
    "¿Qué son las `props` de un componente?",
    "What are a component's `props`?",
  ),
  options: [
    P(
      "Los datos que recibe desde fuera, como los atributos de una etiqueta",
      "The data it receives from outside, like a tag's attributes",
    ),
    P("Su estado interno", "Its internal state"),
    P("Sus estilos CSS", "Its CSS styles"),
    P("Las funciones del navegador", "The browser functions"),
  ],
  correct: 0,
  explanation: P(
    "Las props son la entrada del componente: `<Hobbit nombre=\"Frodo\" />` le pasa `{ nombre: 'Frodo' }`. Dentro se leen desde el objeto `props` (o desestructurando: `function Hobbit({ nombre })`). Son de sólo lectura.",
    "Props are the component's input: `<Hobbit nombre=\"Frodo\" />` passes it `{ nombre: 'Frodo' }`. Inside you read them from the `props` object (or by destructuring: `function Hobbit({ nombre })`). They're read-only.",
  ),
};
const Q_EXPR = {
  question: P(
    "Dentro de JSX, ¿cómo se incrusta un valor de JavaScript, como una variable?",
    "Inside JSX, how do you embed a JavaScript value, like a variable?",
  ),
  options: [
    P("Con llaves: `<h1>Hola, {nombre}</h1>`", "With braces: `<h1>Hola, {nombre}</h1>`"),
    P("Con `${nombre}`", "With `${nombre}`"),
    P("Con comillas: `<h1>Hola, \"nombre\"</h1>`", "With quotes: `<h1>Hola, \"nombre\"</h1>`"),
    P("No se puede", "You can't"),
  ],
  correct: 0,
  explanation: P(
    "Las `{ }` abren una expresión de JavaScript dentro del JSX: `{nombre}`, `{1 + 2}`, `{esVisible ? 'sí' : 'no'}`. El `${}` es de las template strings, no de JSX.",
    "The `{ }` open a JavaScript expression inside JSX: `{nombre}`, `{1 + 2}`, `{esVisible ? 'sí' : 'no'}`. The `${}` is for template strings, not JSX.",
  ),
};
const Q_CAPITAL = {
  question: P(
    "¿Por qué el nombre de un componente debe empezar en MAYÚSCULA?",
    "Why must a component's name start with a CAPITAL letter?",
  ),
  options: [
    P(
      "React trata las etiquetas en minúscula como HTML y las Mayúsculas como componentes",
      "React treats lowercase tags as HTML and Capitalized ones as components",
    ),
    P("Por convención de estilo, sin efecto real", "Just a style convention, no real effect"),
    P("Para que ocupe menos memoria", "To use less memory"),
    P("Porque el CSS lo exige", "Because CSS requires it"),
  ],
  correct: 0,
  explanation: P(
    "`<hobbit />` (minúscula) lo interpreta React como una etiqueta HTML desconocida; `<Hobbit />` (mayúscula) lo trata como tu componente. La inicial decide si es HTML o tuyo.",
    "`<hobbit />` (lowercase) is read by React as an unknown HTML tag; `<Hobbit />` (capital) is treated as your component. The initial letter decides HTML vs yours.",
  ),
};
const Q_CONDITIONAL = {
  question: P(
    "¿Cómo se muestra una cosa u otra en JSX según una condición?",
    "How do you show one thing or another in JSX based on a condition?",
  ),
  options: [
    P("Con el operador ternario: `{cond ? <A/> : <B/>}`", "With the ternary operator: `{cond ? <A/> : <B/>}`"),
    P("Con `if` dentro del JSX directamente", "With `if` directly inside the JSX"),
    P("Con un bucle for", "With a for loop"),
    P("No se puede condicionar", "You can't do conditionals"),
  ],
  correct: 0,
  explanation: P(
    "Dentro del JSX van EXPRESIONES, no sentencias, así que el condicional idiomático es el ternario `{cond ? <A/> : <B/>}` (o `{cond && <A/>}` para «mostrar o nada»). Un `if` va fuera del `return`.",
    "Inside JSX you place EXPRESSIONS, not statements, so the idiomatic conditional is the ternary `{cond ? <A/> : <B/>}` (or `{cond && <A/>}` for \"show or nothing\"). An `if` goes outside the `return`.",
  ),
};

/** Capítulo 1 · Componentes, props y JSX. */
const Q_FRAGMENT = {
  question: P("¿Qué es `<>...</>` en JSX?", "What is `<>...</>` in JSX?"),
  options: [
    P("Un fragmento: agrupa elementos SIN añadir un nodo extra al HTML", "A fragment: groups elements WITHOUT adding an extra node to the HTML"),
    P("Un comentario", "A comment"),
    P("Una etiqueta HTML nueva", "A new HTML tag"),
    P("Un componente vacío", "An empty component"),
  ],
  correct: 0,
  explanation: P(
    "Un componente debe devolver UN solo elemento raíz. El fragmento `<>...</>` agrupa varios hijos sin envolverlos en un `<div>` de más, manteniendo el HTML limpio.",
    "A component must return ONE root element. The fragment `<>...</>` groups several children without wrapping them in an extra `<div>`, keeping the HTML clean.",
  ),
};
const Q_SELF_CLOSE = {
  question: P("En JSX, ¿cómo se escribe una etiqueta sin hijos como una imagen?", "In JSX, how do you write a tag with no children like an image?"),
  options: [
    P("Autocerrada: `<img src=\"...\" />`", "Self-closing: `<img src=\"...\" />`"),
    P("`<img src=\"...\">` sin cerrar", "`<img src=\"...\">` unclosed"),
    P("`<img></img>` obligatoriamente", "`<img></img>` mandatorily"),
    P("`[img src=...]`", "`[img src=...]`"),
  ],
  correct: 0,
  explanation: P(
    "En JSX TODA etiqueta debe cerrarse: las que no tienen hijos se autocierran con `/>` (`<img />`, `<br />`, `<input />`). Olvidar la barra es un error de sintaxis.",
    "In JSX EVERY tag must be closed: those with no children self-close with `/>` (`<img />`, `<br />`, `<input />`). Forgetting the slash is a syntax error.",
  ),
};
const Q_PROPS_MULTIPLE = {
  question: P("¿Cómo se pasan varias props a un componente?", "How do you pass several props to a component?"),
  options: [
    P("Como atributos separados: `<Ficha nombre=\"Sam\" edad={38} />`", "As separate attributes: `<Ficha nombre=\"Sam\" edad={38} />`"),
    P("En un array: `<Ficha [nombre, edad] />`", "In an array: `<Ficha [nombre, edad] />`"),
    P("Separadas por comas dentro de la etiqueta", "Comma-separated inside the tag"),
    P("Sólo se puede pasar una", "You can only pass one"),
  ],
  correct: 0,
  explanation: P(
    "Cada prop es un atributo: texto entre comillas (`nombre=\"Sam\"`) y cualquier otra expresión entre llaves (`edad={38}`). Dentro llegan juntas en el objeto `props`.",
    "Each prop is an attribute: text in quotes (`nombre=\"Sam\"`) and any other expression in braces (`edad={38}`). Inside they arrive together in the `props` object.",
  ),
};

export const SYL_REACT_COMMUNITY_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_COMPONENT, Q_JSX, Q_PROPS] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_EXPR, Q_CAPITAL, Q_CONDITIONAL] },
  c1_perro_negro: { kind: "battle", questions: [Q_FRAGMENT, Q_SELF_CLOSE, Q_PROPS_MULTIPLE] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl aparece y desaparece entre las sombras. Escribe el componente que lo muestra según lleve o no el rostro oculto: props + JSX condicional.",
      "The Nazgûl appears and vanishes among the shadows. Write the component that shows it based on whether its face is hidden: props + conditional JSX.",
    ),
    challenge: {
      topic: P("Componentes, props y JSX condicional", "Components, props and conditional JSX"),
      instructions: P(
        "Escribe el componente `Jinete` que reciba las props `nombre` (string) y `oculto` (booleano), y devuelva un `<h1>` que muestre `'sombra'` si `oculto` es true, o el `nombre` si es false.\n\n`render(<Jinete nombre=\"Nazgûl\" oculto={false} />)` → `\"<h1>Nazgûl</h1>\"`.",
        "Write the component `Jinete` taking the props `nombre` (string) and `oculto` (boolean), returning an `<h1>` that shows `'sombra'` if `oculto` is true, or the `nombre` if false.\n\n`render(<Jinete nombre=\"Nazgûl\" oculto={false} />)` → `\"<h1>Nazgûl</h1>\"`.",
      ),
      starter_code: "function Jinete({ nombre, oculto }) {\n}\n",
      blocks: [
        "function Jinete({ nombre, oculto }) {",
        "  return <h1>{oculto ? 'sombra' : nombre}</h1>;",
        "}",
        "  return <h1>{oculto ? nombre : 'sombra'}</h1>;",
        "  return <h1>oculto</h1>;",
      ],
      hints: [
        P("Ternario en el JSX: `<h1>{oculto ? 'sombra' : nombre}</h1>`.", "Ternary in the JSX: `<h1>{oculto ? 'sombra' : nombre}</h1>`."),
        P("Las props booleanas se pasan con llaves: `oculto={true}`.", "Boolean props are passed with braces: `oculto={true}`."),
      ],
      test_cases: [
        { input: 'render(<Jinete nombre="Nazgûl" oculto={false} />)', expected: "<h1>Nazgûl</h1>", description: P("A la vista: el nombre", "In sight: the name"), raw: true },
        { input: 'render(<Jinete nombre="Nazgûl" oculto={true} />)', expected: "<h1>sombra</h1>", description: P("Oculto: sombra", "Hidden: shadow"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino de las Formas", "The Scroll of Shapes"),
    lore_intro: P(
      "Antes de partir, un pergamino enseña a dibujar lo que se ve con funciones: componentes que reciben datos (props) y devuelven JSX.",
      "Before leaving, a scroll teaches how to draw what's seen with functions: components that take data (props) and return JSX.",
    ),
    scroll: {
      topic: P("Componentes, props y JSX", "Components, props and JSX"),
      sections: [
        {
          heading: P("Un componente es una función", "A component is a function"),
          body: P(
            "Devuelve JSX describiendo la interfaz. Su nombre va en MAYÚSCULA inicial y se usa como una etiqueta.",
            "It returns JSX describing the UI. Its name starts with a CAPITAL letter and is used like a tag.",
          ),
          code: "function Hobbit() {\n  return <h1>Soy un hobbit</h1>;\n}\n// se usa así:  <Hobbit />",
        },
        {
          heading: P("props: la entrada del componente", "props: the component's input"),
          body: P(
            "Los atributos que le pasas llegan como `props`. Desestructúralas en la firma y léelas en el JSX con llaves `{ }`.",
            "The attributes you pass arrive as `props`. Destructure them in the signature and read them in the JSX with braces `{ }`.",
          ),
          code: "function Hobbit({ nombre }) {\n  return <h1>Soy {nombre} de la Comarca</h1>;\n}\n// <Hobbit nombre=\"Frodo\" />  →  <h1>Soy Frodo de la Comarca</h1>",
        },
        {
          heading: P("JSX = React.createElement", "JSX = React.createElement"),
          body: P(
            "JSX no es HTML: se transpila a `React.createElement(...)`. Dentro, `{ }` abre una expresión de JS — ideal para condicionales con el ternario.",
            "JSX isn't HTML: it transpiles to `React.createElement(...)`. Inside, `{ }` opens a JS expression — perfect for conditionals with the ternary.",
          ),
          code: "function Sigilo({ nivel }) {\n  return nivel >= 50 ? <span>oculto</span> : <span>visible</span>;\n}",
        },
      ],
      keyTakeaway: P(
        "Un componente es una función con inicial Mayúscula que recibe props y devuelve JSX; dentro del JSX, `{ }` incrusta expresiones de JavaScript. JSX se transpila a React.createElement.",
        "A component is a Capitalized function that takes props and returns JSX; inside JSX, `{ }` embeds JavaScript expressions. JSX transpiles to React.createElement.",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing the Flight"),
    lore_intro: P(
      "Todo héroe empieza por presentarse. Escribe el componente que muestra quién eres.",
      "Every hero starts by introducing themselves. Write the component that shows who you are.",
    ),
    challenge: {
      topic: P("Componentes y props", "Components and props"),
      instructions: P(
        "Escribe el componente `Hobbit` que reciba la prop `nombre` y devuelva `<h1>Soy {nombre} de la Comarca</h1>`.\n\nEn los tests, `render(<Hobbit nombre=\"Frodo\" />)` devuelve el HTML `\"<h1>Soy Frodo de la Comarca</h1>\"`.",
        "Write the component `Hobbit` that takes the prop `nombre` and returns `<h1>Soy {nombre} de la Comarca</h1>`.\n\nIn the tests, `render(<Hobbit nombre=\"Frodo\" />)` returns the HTML `\"<h1>Soy Frodo de la Comarca</h1>\"`.",
      ),
      starter_code: "function Hobbit({ nombre }) {\n}\n",
      blocks: [
        "function Hobbit({ nombre }) {",
        "  return <h1>Soy {nombre} de la Comarca</h1>;",
        "}",
        "  return <h1>Soy nombre de la Comarca</h1>;",
        "  return <h1>{nombre}</h1>;",
      ],
      hints: [
        P("Desestructura la prop en la firma: `function Hobbit({ nombre })`.", "Destructure the prop in the signature: `function Hobbit({ nombre })`."),
        P("Incrusta la variable con llaves: `<h1>Soy {nombre} de la Comarca</h1>`.", "Embed the variable with braces: `<h1>Soy {nombre} de la Comarca</h1>`."),
      ],
      test_cases: [
        { input: 'render(<Hobbit nombre="Frodo" />)', expected: "<h1>Soy Frodo de la Comarca</h1>", description: P("Se presenta con su nombre", "Introduces itself with its name"), raw: true },
        { input: 'render(<Hobbit nombre="Sam" />)', expected: "<h1>Soy Sam de la Comarca</h1>", description: P("Con otro nombre", "With another name"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P(
      "Un Jinete Negro husmea el aire. Muestra si estás oculto o a la vista según tu sigilo, con un ternario en el JSX.",
      "A Black Rider sniffs the air. Show whether you're hidden or visible based on your stealth, with a ternary in the JSX.",
    ),
    challenge: {
      topic: P("Renderizado condicional (ternario)", "Conditional rendering (ternary)"),
      instructions: P(
        "Escribe el componente `Sigilo` que reciba la prop `nivel` (número) y devuelva:\n• `<span>oculto</span>` si `nivel` es 50 o más,\n• `<span>visible</span>` si es menor.\n\nUsa el operador ternario.",
        "Write the component `Sigilo` that takes the prop `nivel` (number) and returns:\n• `<span>oculto</span>` if `nivel` is 50 or more,\n• `<span>visible</span>` if less.\n\nUse the ternary operator.",
      ),
      starter_code: "function Sigilo({ nivel }) {\n}\n",
      blocks: [
        "function Sigilo({ nivel }) {",
        "  return nivel >= 50 ? <span>oculto</span> : <span>visible</span>;",
        "}",
        "  return nivel >= 50 ? <span>visible</span> : <span>oculto</span>;",
        "  return <span>{nivel}</span>;",
      ],
      hints: [
        P("El ternario devuelve uno u otro JSX: `return nivel >= 50 ? <span>oculto</span> : <span>visible</span>;`.", "The ternary returns one JSX or the other: `return nivel >= 50 ? <span>oculto</span> : <span>visible</span>;`."),
        P("Las props numéricas se pasan con llaves: `<Sigilo nivel={90} />`.", "Numeric props are passed with braces: `<Sigilo nivel={90} />`."),
      ],
      test_cases: [
        { input: "render(<Sigilo nivel={90} />)", expected: "<span>oculto</span>", description: P("Sigilo alto: oculto", "High stealth: hidden"), raw: true },
        { input: "render(<Sigilo nivel={10} />)", expected: "<span>visible</span>", description: P("Sigilo bajo: visible", "Low stealth: visible"), raw: true },
        { input: "render(<Sigilo nivel={50} />)", expected: "<span>oculto</span>", description: P("Justo en 50: oculto", "Exactly 50: hidden"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre listas, children y composición. */
const Q_LIST = {
  question: P(
    "¿Cómo se renderiza una lista de elementos desde un array en JSX?",
    "How do you render a list of elements from an array in JSX?",
  ),
  options: [
    P("Con `.map`: `{items.map(x => <li>{x}</li>)}`", "With `.map`: `{items.map(x => <li>{x}</li>)}`"),
    P("Con un bucle `for` dentro del JSX", "With a `for` loop inside the JSX"),
    P("Con `items.forEach(...)`", "With `items.forEach(...)`"),
    P("No se puede renderizar un array", "You can't render an array"),
  ],
  correct: 0,
  explanation: P(
    "`map` transforma cada dato en un elemento y devuelve un array de JSX, que React sabe renderizar. `forEach` no sirve (no devuelve nada) y un `for` es una sentencia, no una expresión.",
    "`map` turns each item into an element and returns an array of JSX, which React knows how to render. `forEach` won't work (returns nothing) and a `for` is a statement, not an expression.",
  ),
};
const Q_KEY = {
  question: P(
    "¿Para qué sirve la prop `key` en los elementos de una lista?",
    "What is the `key` prop for on list items?",
  ),
  options: [
    P(
      "Para que React identifique cada elemento entre renders (rendimiento y estado correcto)",
      "So React can identify each element across renders (performance and correct state)",
    ),
    P("Para ordenar la lista", "To sort the list"),
    P("Para darle estilo", "To style it"),
    P("Es obligatoria en el HTML final", "It's required in the final HTML"),
  ],
  correct: 0,
  explanation: P(
    "`key` le da a React una identidad estable a cada elemento de una lista para saber cuál cambió, se añadió o se borró. Debe ser única entre hermanos. No aparece en el HTML final: es sólo para React.",
    "`key` gives React a stable identity for each list item so it knows which one changed, was added or removed. It must be unique among siblings. It doesn't appear in the final HTML: it's only for React.",
  ),
};
const Q_CHILDREN = {
  question: P(
    "¿Qué es la prop especial `children` de un componente?",
    "What is a component's special `children` prop?",
  ),
  options: [
    P(
      "Lo que se escribe ENTRE las etiquetas: `<Marco>esto</Marco>`",
      "Whatever is written BETWEEN the tags: `<Marco>this</Marco>`",
    ),
    P("Sus componentes hijos declarados en el fichero", "Its child components declared in the file"),
    P("Una lista de sus props", "A list of its props"),
    P("El componente padre", "The parent component"),
  ],
  correct: 0,
  explanation: P(
    "`children` es lo que pones entre las etiquetas de apertura y cierre: en `<Marco>hola</Marco>`, `children` es `'hola'`. El componente lo coloca donde quiera con `{children}`. Así se hacen envoltorios reutilizables.",
    "`children` is whatever you put between the opening and closing tags: in `<Marco>hola</Marco>`, `children` is `'hola'`. The component places it wherever it wants with `{children}`. That's how you build reusable wrappers.",
  ),
};
const Q_COMPOSE = {
  question: P(
    "¿Cómo usa un componente a OTRO componente dentro de su JSX?",
    "How does one component use ANOTHER component inside its JSX?",
  ),
  options: [
    P("Como una etiqueta: `<Verso texto={v} />`", "As a tag: `<Verso texto={v} />`"),
    P("Llamándolo como función: `Verso(v)`", "Calling it as a function: `Verso(v)`"),
    P("Con `import` dentro del return", "With `import` inside the return"),
    P("No se pueden anidar componentes", "You can't nest components"),
  ],
  correct: 0,
  explanation: P(
    "La composición es el corazón de React: un componente usa a otro como si fuera una etiqueta, pasándole props. `<Canto>` puede renderizar muchos `<Verso />`. Se construyen interfaces complejas combinando piezas simples.",
    "Composition is the heart of React: a component uses another like a tag, passing it props. `<Canto>` can render many `<Verso />`. You build complex interfaces by combining simple pieces.",
  ),
};
const Q_CLASSNAME = {
  question: P(
    "En JSX, ¿cómo se pone una clase CSS a un elemento?",
    "In JSX, how do you put a CSS class on an element?",
  ),
  options: [
    P("Con `className`: `<div className=\"caja\">`", "With `className`: `<div className=\"caja\">`"),
    P("Con `class`: `<div class=\"caja\">`", "With `class`: `<div class=\"caja\">`"),
    P("Con `css`: `<div css=\"caja\">`", "With `css`: `<div css=\"caja\">`"),
    P("Con `style`: `<div style=\"caja\">`", "With `style`: `<div style=\"caja\">`"),
  ],
  correct: 0,
  explanation: P(
    "En JSX es `className`, no `class` (porque `class` es palabra reservada de JavaScript). React lo traduce al atributo `class` del HTML final. Igual pasa con `htmlFor` en vez de `for`.",
    "In JSX it's `className`, not `class` (because `class` is a reserved JavaScript word). React translates it to the `class` attribute in the final HTML. The same goes for `htmlFor` instead of `for`.",
  ),
};

/** Capítulo 2 · Listas, children y composición. */
const Q_KEY_WHY = {
  question: P("¿Por qué NO usar el índice del array como `key` si la lista cambia?", "Why NOT use the array index as `key` if the list changes?"),
  options: [
    P("Al reordenar/insertar, los índices se desplazan y React confunde los elementos (y su estado)", "On reorder/insert, indices shift and React confuses the elements (and their state)"),
    P("El índice es más lento", "The index is slower"),
    P("El índice no es un número", "The index isn't a number"),
    P("Da error siempre", "It always errors"),
  ],
  correct: 0,
  explanation: P(
    "La `key` debe ser una identidad ESTABLE de cada dato (un id). El índice cambia al insertar/reordenar, y React reutiliza el nodo equivocado, arrastrando estado o inputs a otra fila.",
    "The `key` must be a STABLE identity of each item (an id). The index changes on insert/reorder, and React reuses the wrong node, dragging state or inputs to another row.",
  ),
};
const Q_CLASSNAME_WHY = {
  question: P("¿Por qué en JSX es `className` y no `class`?", "Why is it `className` and not `class` in JSX?"),
  options: [
    P("`class` es palabra reservada de JavaScript; React la traduce a `class` en el HTML", "`class` is a reserved JavaScript word; React translates it to `class` in the HTML"),
    P("Por gusto de los creadores", "Just the creators' preference"),
    P("`class` no existe en HTML", "`class` doesn't exist in HTML"),
    P("Para que sea más largo", "To make it longer"),
  ],
  correct: 0,
  explanation: P(
    "JSX es JavaScript, y `class` ya significa «declarar una clase». Por eso se usa `className` (y `htmlFor` en vez de `for`); React lo convierte al atributo real del HTML.",
    "JSX is JavaScript, and `class` already means \"declare a class\". So `className` is used (and `htmlFor` instead of `for`); React converts it to the real HTML attribute.",
  ),
};
const Q_MAP_RETURN = {
  question: P("En `{items.map(x => <li>{x}</li>)}`, ¿qué produce el map?", "In `{items.map(x => <li>{x}</li>)}`, what does the map produce?"),
  options: [
    P("Un ARRAY de elementos JSX, que React renderiza en orden", "An ARRAY of JSX elements, which React renders in order"),
    P("Un solo elemento", "A single element"),
    P("Un string con todo junto", "A string with everything joined"),
    P("Nada visible", "Nothing visible"),
  ],
  correct: 0,
  explanation: P(
    "`map` devuelve un array de elementos, y React sabe renderizar arrays de JSX uno tras otro. Por eso `map` (y no `forEach`) es la forma de pintar listas.",
    "`map` returns an array of elements, and React knows how to render arrays of JSX one after another. That's why `map` (not `forEach`) is the way to paint lists.",
  ),
};
const Q_CHILDREN_MULTIPLE = {
  question: P("Si pones VARIOS elementos entre `<Marco>...</Marco>`, ¿qué es `children`?", "If you put SEVERAL elements between `<Marco>...</Marco>`, what is `children`?"),
  options: [
    P("Un array con todos ellos (React lo recorre solo al renderizar)", "An array with all of them (React renders it on its own)"),
    P("Sólo el primero", "Only the first one"),
    P("Un error: sólo se permite uno", "An error: only one is allowed"),
    P("Un string concatenado", "A concatenated string"),
  ],
  correct: 0,
  explanation: P(
    "`children` puede ser un solo hijo o un array de hijos; React renderiza ambos casos igual con `{children}`. No necesitas recorrerlo a mano para mostrarlo.",
    "`children` can be a single child or an array of children; React renders both the same with `{children}`. You don't need to iterate it by hand to show it.",
  ),
};

export const SYL_REACT_COMMUNITY_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_LIST, Q_KEY, Q_CLASSNAME] },
  c2_niebla: { kind: "battle", questions: [Q_CHILDREN, Q_COMPOSE, Q_MAP_RETURN] },
  c2_sauce: { kind: "battle", questions: [Q_KEY_WHY, Q_CLASSNAME_WHY, Q_CHILDREN_MULTIPLE] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza a su horda de muertos. Compón la lista a partir de un componente pequeño: composición + map + key.",
      "The Barrow-wight raises its horde of dead. Compose the list from a small component: composition + map + key.",
    ),
    challenge: {
      topic: P("Composición y listas", "Composition and lists"),
      instructions: P(
        "Escribe DOS componentes:\n• `Muerto` que reciba `nombre` y devuelva `<li>{nombre}</li>`,\n• `Horda` que reciba `nombres` (array) y devuelva un `<ul>` renderizando un `<Muerto />` por cada nombre (con `key`).\n\n`render(<Horda nombres={[\"Tumulario\", \"Espectro\"]} />)` → `\"<ul><li>Tumulario</li><li>Espectro</li></ul>\"`.",
        "Write TWO components:\n• `Muerto` taking `nombre` and returning `<li>{nombre}</li>`,\n• `Horda` taking `nombres` (array) and returning a `<ul>` rendering one `<Muerto />` per name (with `key`).\n\n`render(<Horda nombres={[\"Tumulario\", \"Espectro\"]} />)` → `\"<ul><li>Tumulario</li><li>Espectro</li></ul>\"`.",
      ),
      starter_code:
        "function Muerto({ nombre }) {\n}\n\nfunction Horda({ nombres }) {\n}\n",
      blocks: [
        "function Muerto({ nombre }) {",
        "  return <li>{nombre}</li>;",
        "}",
        "function Horda({ nombres }) {",
        "  return <ul>{nombres.map(n => <Muerto key={n} nombre={n} />)}</ul>;",
        "}",
        "  return <ul>{nombres.map(n => <Muerto nombre={n} />)}</ul>;",
      ],
      hints: [
        P("`Horda` usa a `Muerto` como etiqueta: `<Muerto key={n} nombre={n} />`.", "`Horda` uses `Muerto` as a tag: `<Muerto key={n} nombre={n} />`."),
        P("`Muerto` sólo devuelve `<li>{nombre}</li>`.", "`Muerto` just returns `<li>{nombre}</li>`."),
      ],
      test_cases: [
        { input: 'render(<Horda nombres={["Tumulario", "Espectro"]} />)', expected: "<ul><li>Tumulario</li><li>Espectro</li></ul>", description: P("Horda compuesta", "Composed horde"), raw: true },
        { input: "render(<Horda nombres={[]} />)", expected: "<ul></ul>", description: P("Sin muertos", "No dead"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino de las Muchas Formas", "The Scroll of Many Shapes"),
    lore_intro: P(
      "En el Bosque Viejo, un pergamino enseña a dibujar MUCHAS cosas (listas con map), a envolver contenido (children) y a combinar componentes (composición).",
      "In the Old Forest, a scroll teaches how to draw MANY things (lists with map), wrap content (children) and combine components (composition).",
    ),
    scroll: {
      topic: P("Listas, children y composición", "Lists, children and composition"),
      sections: [
        {
          heading: P("Listas con map (y key)", "Lists with map (and key)"),
          body: P(
            "Para renderizar un array, transfórmalo con `.map` en elementos. Dale a cada uno una `key` única: React la usa para seguir cada elemento (no aparece en el HTML).",
            "To render an array, transform it with `.map` into elements. Give each a unique `key`: React uses it to track each item (it doesn't appear in the HTML).",
          ),
          code: "function Lista({ nombres }) {\n  return (\n    <ul>\n      {nombres.map((n) => (\n        <li key={n}>{n}</li>\n      ))}\n    </ul>\n  );\n}",
        },
        {
          heading: P("children: envolver contenido", "children: wrapping content"),
          body: P(
            "Lo que pones ENTRE las etiquetas llega como la prop `children`. El componente lo coloca con `{children}`. Ideal para envoltorios. Ojo: la clase CSS es `className`, no `class`.",
            "Whatever you put BETWEEN the tags arrives as the `children` prop. The component places it with `{children}`. Great for wrappers. Note: the CSS class is `className`, not `class`.",
          ),
          code: "function Marco({ children }) {\n  return <div className=\"marco\">{children}</div>;\n}\n// <Marco>hola</Marco>  →  <div class=\"marco\">hola</div>",
        },
        {
          heading: P("Composición: componentes dentro de componentes", "Composition: components within components"),
          body: P(
            "Un componente usa a otro como una etiqueta, pasándole props. Combinando piezas simples se arman interfaces complejas.",
            "A component uses another like a tag, passing it props. Combining simple pieces builds complex interfaces.",
          ),
          code: "function Verso({ texto }) {\n  return <li>{texto}</li>;\n}\nfunction Canto({ versos }) {\n  return <ul>{versos.map((v) => <Verso key={v} texto={v} />)}</ul>;\n}",
        },
      ],
      keyTakeaway: P(
        "`.map` renderiza listas (con `key` única por elemento); `children` es el contenido entre etiquetas; y la composición combina componentes como etiquetas. La clase CSS se escribe `className`.",
        "`.map` renders lists (with a unique `key` per item); `children` is the content between tags; and composition combines components as tags. The CSS class is written `className`.",
      ),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre Sauce", "Old Man Willow"),
    lore_intro: P(
      "El Sauce atrapa a los hobbits uno a uno. Muéstralos a todos en una lista con map.",
      "The Willow snares the hobbits one by one. Show them all in a list with map.",
    ),
    challenge: {
      topic: P("Listas con map y key", "Lists with map and key"),
      instructions: P(
        "Escribe el componente `Lista` que reciba la prop `nombres` (array de strings) y devuelva un `<ul>` con un `<li>` por cada nombre. Dale a cada `<li>` una `key` (usa el propio nombre).\n\n`render(<Lista nombres={[\"Merry\", \"Pippin\"]} />)` → `\"<ul><li>Merry</li><li>Pippin</li></ul>\"`.",
        "Write the component `Lista` that takes the prop `nombres` (array of strings) and returns a `<ul>` with one `<li>` per name. Give each `<li>` a `key` (use the name itself).\n\n`render(<Lista nombres={[\"Merry\", \"Pippin\"]} />)` → `\"<ul><li>Merry</li><li>Pippin</li></ul>\"`.",
      ),
      starter_code: "function Lista({ nombres }) {\n}\n",
      blocks: [
        "function Lista({ nombres }) {",
        "  return <ul>{nombres.map(n => <li key={n}>{n}</li>)}</ul>;",
        "}",
        "  return <ul>{nombres.forEach(n => <li>{n}</li>)}</ul>;",
        "  return <li>{nombres}</li>;",
      ],
      hints: [
        P("Envuelve el map en un `<ul>`: `<ul>{nombres.map(...)}</ul>`.", "Wrap the map in a `<ul>`: `<ul>{nombres.map(...)}</ul>`."),
        P("Cada elemento lleva su key: `<li key={n}>{n}</li>`.", "Each element carries its key: `<li key={n}>{n}</li>`."),
      ],
      test_cases: [
        { input: 'render(<Lista nombres={["Merry", "Pippin"]} />)', expected: "<ul><li>Merry</li><li>Pippin</li></ul>", description: P("Cada nombre, su <li>", "Each name, its own <li>"), raw: true },
        { input: "render(<Lista nombres={[]} />)", expected: "<ul></ul>", description: P("Lista vacía", "Empty list"), raw: true },
        { input: 'render(<Lista nombres={["Frodo"]} />)', expected: "<ul><li>Frodo</li></ul>", description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Túmulo del Espectro", "The Wight's Barrow"),
    lore_intro: P(
      "El Tumulario encierra a sus víctimas. Crea un envoltorio que rodee lo que sea que le pongas dentro: eso es children.",
      "The Barrow-wight locks its victims away. Build a wrapper that surrounds whatever you place inside it: that's children.",
    ),
    challenge: {
      topic: P("La prop children (y className)", "The children prop (and className)"),
      instructions: P(
        "Escribe el componente `Tumba` que envuelva su contenido (`children`) en un `<div>` con la clase CSS `tumba`.\n\nRecuerda: en JSX la clase se escribe `className`. `render(<Tumba>Frodo</Tumba>)` → `\"<div class=\\\"tumba\\\">Frodo</div>\"`.",
        "Write the component `Tumba` that wraps its content (`children`) in a `<div>` with the CSS class `tumba`.\n\nRemember: in JSX the class is written `className`. `render(<Tumba>Frodo</Tumba>)` → `\"<div class=\\\"tumba\\\">Frodo</div>\"`.",
      ),
      starter_code: 'function Tumba({ children }) {\n}\n',
      blocks: [
        "function Tumba({ children }) {",
        "  return <div className=\"tumba\">{children}</div>;",
        "}",
        "  return <div class=\"tumba\">{children}</div>;",
        "  return <div className=\"tumba\">children</div>;",
      ],
      hints: [
        P("Desestructura `children` y colócalo dentro: `{children}`.", "Destructure `children` and place it inside: `{children}`."),
        P('La clase va con `className`, que React vuelca a `class`: `<div className="tumba">`.', 'The class goes with `className`, which React turns into `class`: `<div className="tumba">`.'),
      ],
      test_cases: [
        { input: "render(<Tumba>Frodo</Tumba>)", expected: '<div class="tumba">Frodo</div>', description: P("Envuelve el contenido", "Wraps the content"), raw: true },
        { input: 'render(<Tumba>{"Sam"}</Tumba>)', expected: '<div class="tumba">Sam</div>', description: P("Con otro contenido", "With other content"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Tom Bombadil", "Tom Bombadil's Song"),
    lore_intro: P(
      "El canto de Tom es muchos versos, cada uno su propio componente. Compón el canto a partir de piezas pequeñas.",
      "Tom's song is many verses, each its own component. Compose the song out of small pieces.",
    ),
    challenge: {
      topic: P("Composición de componentes", "Component composition"),
      instructions: P(
        "Escribe DOS componentes:\n• `Verso` que reciba `texto` y devuelva `<li>{texto}</li>`,\n• `Canto` que reciba `versos` (array) y devuelva un `<ul>` renderizando un `<Verso />` por cada verso (con `key`).\n\n`render(<Canto versos={[\"ho\", \"hey\"]} />)` → `\"<ul><li>ho</li><li>hey</li></ul>\"`.",
        "Write TWO components:\n• `Verso` taking `texto` and returning `<li>{texto}</li>`,\n• `Canto` taking `versos` (array) and returning a `<ul>` rendering one `<Verso />` per verse (with `key`).\n\n`render(<Canto versos={[\"ho\", \"hey\"]} />)` → `\"<ul><li>ho</li><li>hey</li></ul>\"`.",
      ),
      starter_code: "function Verso({ texto }) {\n}\n\nfunction Canto({ versos }) {\n}\n",
      blocks: [
        "function Verso({ texto }) {",
        "  return <li>{texto}</li>;",
        "}",
        "function Canto({ versos }) {",
        "  return <ul>{versos.map(v => <Verso key={v} texto={v} />)}</ul>;",
        "}",
        "  return <ul>{versos.map(v => <li>{v}</li>)}</ul>;",
      ],
      hints: [
        P("`Canto` usa a `Verso` como una etiqueta: `<Verso key={v} texto={v} />`.", "`Canto` uses `Verso` as a tag: `<Verso key={v} texto={v} />`."),
        P("`Verso` sólo devuelve `<li>{texto}</li>`.", "`Verso` just returns `<li>{texto}</li>`."),
      ],
      test_cases: [
        { input: 'render(<Canto versos={["ho", "hey"]} />)', expected: "<ul><li>ho</li><li>hey</li></ul>", description: P("Canto compuesto de versos", "A song composed of verses"), raw: true },
        { input: "render(<Canto versos={[]} />)", expected: "<ul></ul>", description: P("Sin versos", "No verses"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre estado con useState. */
const Q_USESTATE = {
  question: P(
    "¿Qué devuelve `useState(0)`?",
    "What does `useState(0)` return?",
  ),
  options: [
    P(
      "Un par `[valor, setValor]`: el estado actual y una función para cambiarlo",
      "A pair `[value, setValue]`: the current state and a function to change it",
    ),
    P("Sólo el valor 0", "Just the value 0"),
    P("Una promesa", "A promise"),
    P("El componente", "The component"),
  ],
  correct: 0,
  explanation: P(
    "`const [n, setN] = useState(0)` te da el valor actual (`n`, empieza en 0) y su actualizador (`setN`). Llamar a `setN(...)` re-renderiza el componente con el nuevo valor. El argumento es sólo el valor INICIAL.",
    "`const [n, setN] = useState(0)` gives you the current value (`n`, starts at 0) and its updater (`setN`). Calling `setN(...)` re-renders the component with the new value. The argument is only the INITIAL value.",
  ),
};
const Q_RERENDER = {
  question: P(
    "¿Qué pasa cuando llamas al actualizador de estado, como `setN(5)`?",
    "What happens when you call the state updater, like `setN(5)`?",
  ),
  options: [
    P(
      "React vuelve a renderizar el componente con el nuevo estado",
      "React re-renders the component with the new state",
    ),
    P("Cambia la variable pero no se ve hasta recargar", "It changes the variable but you won't see it until reload"),
    P("Modifica el DOM directamente a mano", "It edits the DOM directly by hand"),
    P("No hace nada hasta el próximo click", "It does nothing until the next click"),
  ],
  correct: 0,
  explanation: P(
    "Cambiar el estado con el actualizador le dice a React que el componente debe re-renderizarse: React vuelve a llamar a tu función y pinta el resultado. NO modifiques el estado a mano (`n = 5`): no se enteraría.",
    "Changing state with the updater tells React the component must re-render: React calls your function again and paints the result. Do NOT mutate state by hand (`n = 5`): React wouldn't notice.",
  ),
};
const Q_UPDATER_FN = {
  question: P(
    "¿Por qué a veces se usa `setN(prev => prev + 1)` en vez de `setN(n + 1)`?",
    "Why is `setN(prev => prev + 1)` sometimes used instead of `setN(n + 1)`?",
  ),
  options: [
    P(
      "El actualizador funcional recibe el valor MÁS RECIENTE: seguro si hay varias actualizaciones",
      "The functional updater receives the MOST RECENT value: safe when there are several updates",
    ),
    P("Es más corto de escribir", "It's shorter to write"),
    P("Sólo funciona con números", "It only works with numbers"),
    P("No hay diferencia", "There's no difference"),
  ],
  correct: 0,
  explanation: P(
    "`setN(prev => prev + 1)` calcula el nuevo estado a partir del anterior GARANTIZADO. Si haces varias actualizaciones seguidas (o dentro de callbacks), `setN(n + 1)` puede usar un `n` desfasado; la forma funcional no.",
    "`setN(prev => prev + 1)` computes the new state from the GUARANTEED previous one. If you do several updates in a row (or inside callbacks), `setN(n + 1)` may use a stale `n`; the functional form doesn't.",
  ),
};
const Q_ONCLICK = {
  question: P(
    "¿Cómo se maneja un click en un botón en React?",
    "How do you handle a button click in React?",
  ),
  options: [
    P("Con la prop `onClick={() => ...}`", "With the prop `onClick={() => ...}`"),
    P('Con `onclick="..."` como en HTML', 'With `onclick="..."` as in HTML'),
    P("Con `addEventListener` en el JSX", "With `addEventListener` in the JSX"),
    P("Con `on:click`", "With `on:click`"),
  ],
  correct: 0,
  explanation: P(
    "En JSX los eventos van en camelCase y reciben una FUNCIÓN, no una cadena: `onClick={() => setN(n + 1)}`. Pasa la función, no la llames (`onClick={setN(...)}` la ejecutaría en el render).",
    "In JSX events are camelCase and take a FUNCTION, not a string: `onClick={() => setN(n + 1)}`. Pass the function, don't call it (`onClick={setN(...)}` would run it during render).",
  ),
};
const Q_STATE_LOCAL = {
  question: P(
    "¿A quién pertenece el estado creado con `useState` dentro de un componente?",
    "Who owns the state created with `useState` inside a component?",
  ),
  options: [
    P(
      "A esa instancia del componente: cada una tiene su propio estado",
      "To that component instance: each one has its own state",
    ),
    P("Es global, compartido por todos", "It's global, shared by all"),
    P("Al componente padre", "To the parent component"),
    P("Al navegador", "To the browser"),
  ],
  correct: 0,
  explanation: P(
    "El estado es LOCAL y privado de cada instancia: dos `<Contador />` en pantalla cuentan por separado. Para compartir estado, se «sube» al componente padre común y se baja por props (lifting state up).",
    "State is LOCAL and private to each instance: two `<Contador />` on screen count separately. To share state, you \"lift it up\" to a common parent and pass it down via props (lifting state up).",
  ),
};

/** Capítulo 3 · Estado con useState. */
const Q_HOOK_RULES = {
  question: P("¿Dónde se pueden llamar los hooks como `useState`?", "Where can hooks like `useState` be called?"),
  options: [
    P("En el nivel superior del componente, SIEMPRE en el mismo orden (no dentro de if/bucles)", "At the top level of the component, ALWAYS in the same order (not inside if/loops)"),
    P("En cualquier sitio, incluso dentro de un if", "Anywhere, even inside an if"),
    P("Sólo dentro de un onClick", "Only inside an onClick"),
    P("Fuera del componente", "Outside the component"),
  ],
  correct: 0,
  explanation: P(
    "React distingue los hooks por el ORDEN de llamada, así que deben ejecutarse siempre igual: en el nivel superior, nunca dentro de condicionales o bucles. Es la «regla de los hooks».",
    "React tells hooks apart by CALL ORDER, so they must run the same every time: at the top level, never inside conditionals or loops. It's the \"rules of hooks\".",
  ),
};
const Q_STATE_ASYNC = {
  question: P("Tras `setN(5)`, ¿la variable `n` vale 5 en la siguiente línea?", "After `setN(5)`, is `n` equal to 5 on the next line?"),
  options: [
    P("No: `n` no cambia hasta el PRÓXIMO render", "No: `n` doesn't change until the NEXT render"),
    P("Sí, inmediatamente", "Yes, immediately"),
    P("Sólo si usas await", "Only if you use await"),
    P("Da error", "It errors"),
  ],
  correct: 0,
  explanation: P(
    "El actualizador programa un re-render con el nuevo valor; la variable `n` de este render NO cambia. Si el nuevo valor depende del anterior, usa la forma funcional `setN(prev => ...)`.",
    "The updater schedules a re-render with the new value; this render's `n` does NOT change. If the new value depends on the previous one, use the functional form `setN(prev => ...)`.",
  ),
};
const Q_INITIAL_STATE = {
  question: P("El argumento de `useState(inicial)`, ¿cuándo se usa?", "When is the argument of `useState(inicial)` used?"),
  options: [
    P("Sólo en el PRIMER render; luego React ignora ese valor y conserva el estado", "Only on the FIRST render; afterwards React ignores it and keeps the state"),
    P("En cada render", "On every render"),
    P("Nunca", "Never"),
    P("Sólo al hacer click", "Only on click"),
  ],
  correct: 0,
  explanation: P(
    "El valor inicial se usa una vez, al montar. En renders posteriores el estado ya existe y `useState` devuelve el actual, no el inicial. Por eso pasar `useState(props.x)` no «sigue» a la prop.",
    "The initial value is used once, on mount. On later renders the state already exists and `useState` returns the current one, not the initial. That's why `useState(props.x)` doesn't \"follow\" the prop.",
  ),
};
const Q_MULTIPLE_USESTATE = {
  question: P("¿Puede un componente tener VARIOS `useState`?", "Can a component have SEVERAL `useState` hooks?"),
  options: [
    P("Sí: uno por cada porción de estado independiente", "Yes: one per independent piece of state"),
    P("No: sólo uno por componente", "No: only one per component"),
    P("Sólo si son del mismo tipo", "Only if they're the same type"),
    P("Sólo dos", "Only two"),
  ],
  correct: 0,
  explanation: P(
    "Llamas a `useState` tantas veces como necesites: `const [nombre, setNombre] = useState('')` y `const [n, setN] = useState(0)`. React los distingue por el orden (de ahí la regla de los hooks).",
    "You call `useState` as many times as needed: `const [nombre, setNombre] = useState('')` and `const [n, setN] = useState(0)`. React tells them apart by order (hence the rules of hooks).",
  ),
};

export const SYL_REACT_COMMUNITY_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_USESTATE, Q_RERENDER, Q_ONCLICK] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_UPDATER_FN, Q_STATE_LOCAL, Q_HOOK_RULES] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_STATE_ASYNC, Q_INITIAL_STATE, Q_MULTIPLE_USESTATE] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "«Ningún hombre vivo puede detenerme.» Lleva la cuenta de los golpes con estado: sube con un botón y reiníciala con otro.",
      "\"No living man can hinder me.\" Track the blows with state: raise it with one button and reset it with another.",
    ),
    challenge: {
      topic: P("useState y varios manejadores", "useState and multiple handlers"),
      instructions: P(
        "Escribe `Contador` (sin props) con `useState(0)`. Devuelve un `<div>` con:\n• un `<button className=\"mas\">` que SUME 1,\n• un `<span>{n}</span>`,\n• un `<button className=\"reset\">` que ponga la cuenta a 0.\n\n`mount(<Contador />).click(\".mas\").click(\".mas\").text(\"span\")` → `\"2\"`; luego `.click(\".reset\")` → `\"0\"`.",
        "Write `Contador` (no props) with `useState(0)`. Return a `<div>` with:\n• a `<button className=\"mas\">` that ADDS 1,\n• a `<span>{n}</span>`,\n• a `<button className=\"reset\">` that sets the count to 0.\n\n`mount(<Contador />).click(\".mas\").click(\".mas\").text(\"span\")` → `\"2\"`; then `.click(\".reset\")` → `\"0\"`.",
      ),
      starter_code:
        'function Contador() {\n  const [n, setN] = useState(0);\n}\n',
      blocks: [
        "function Contador() {",
        "  const [n, setN] = useState(0);",
        "  return (",
        "    <div>",
        "      <button className=\"mas\" onClick={() => setN(n + 1)}>+</button>",
        "      <span>{n}</span>",
        "      <button className=\"reset\" onClick={() => setN(0)}>reset</button>",
        "    </div>",
        "  );",
        "}",
        "      <button className=\"reset\" onClick={() => setN(n)}>reset</button>",
      ],
      hints: [
        P("Cada botón lleva su `className` y su `onClick`.", "Each button has its `className` and its `onClick`."),
        P("Reiniciar es `onClick={() => setN(0)}`.", "Reset is `onClick={() => setN(0)}`."),
      ],
      test_cases: [
        { input: 'mount(<Contador />).click(".mas").click(".mas").text("span")', expected: "2", description: P("Dos veces más", "Twice up"), raw: true },
        { input: 'mount(<Contador />).click(".mas").click(".reset").text("span")', expected: "0", description: P("Reset vuelve a 0", "Reset back to 0"), raw: true },
        { input: 'mount(<Contador />).text("span")', expected: "0", description: P("Empieza en 0", "Starts at 0"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino del Estado", "The Scroll of State"),
    lore_intro: P(
      "En el Póney Pisador, un pergamino enseña a que un componente RECUERDE y CAMBIE: el hook useState, y cómo un evento lo actualiza.",
      "At the Prancing Pony, a scroll teaches a component to REMEMBER and CHANGE: the useState hook, and how an event updates it.",
    ),
    scroll: {
      topic: P("Estado con useState", "State with useState"),
      sections: [
        {
          heading: P("useState: recordar entre renders", "useState: remembering across renders"),
          body: P(
            "`useState(inicial)` devuelve `[valor, setValor]`. El componente pinta el `valor`; llamar a `setValor(...)` lo actualiza y hace que React re-renderice. El estado es local a cada instancia.",
            "`useState(initial)` returns `[value, setValue]`. The component paints the `value`; calling `setValue(...)` updates it and makes React re-render. State is local to each instance.",
          ),
          code: "function Contador() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}",
        },
        {
          heading: P("Eventos: onClick", "Events: onClick"),
          body: P(
            "Los eventos van en camelCase y reciben una FUNCIÓN: `onClick={() => setN(n + 1)}`. Pásala, no la llames. Nunca cambies el estado a mano (`n = 5`): usa siempre el actualizador.",
            "Events are camelCase and take a FUNCTION: `onClick={() => setN(n + 1)}`. Pass it, don't call it. Never mutate state by hand (`n = 5`): always use the updater.",
          ),
          code: "<button onClick={() => setOn(!on)}>\n  {on ? 'encendido' : 'apagado'}\n</button>",
        },
        {
          heading: P("Actualizador funcional", "Functional updater"),
          body: P(
            "Cuando el nuevo estado depende del anterior, usa la forma funcional `setN(prev => prev + 1)`: recibe el valor más reciente, sin riesgo de usar uno desfasado.",
            "When the new state depends on the previous one, use the functional form `setN(prev => prev + 1)`: it receives the most recent value, with no risk of using a stale one.",
          ),
          code: "setVida((v) => Math.max(0, v - 40)); // resta 40 sin bajar de 0",
        },
      ],
      keyTakeaway: P(
        "useState(inicial) da [valor, setValor]; setValor re-renderiza (nunca mutes el estado a mano). Los eventos son funciones en camelCase (onClick), y para actualizar a partir del valor previo, usa setValor(prev => ...).",
        "useState(initial) gives [value, setValue]; setValue re-renders (never mutate state by hand). Events are camelCase functions (onClick), and to update from the previous value, use setValue(prev => ...).",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("Trancos, el Montaraz", "Strider the Ranger"),
    lore_intro: P(
      "Trancos lleva la cuenta de los pasos del camino. Un componente que recuerda y suma: eso es useState.",
      "Strider keeps count of the steps on the road. A component that remembers and adds: that's useState.",
    ),
    challenge: {
      topic: P("useState básico", "Basic useState"),
      instructions: P(
        "Escribe el componente `Contador` (sin props) que use `useState(0)` y devuelva un `<button>` que MUESTRE el número y, al hacer click, lo INCREMENTE en 1.\n\nEn los tests, `mount(el)` renderiza el componente; `.click()` pulsa el botón y `.text()` lee su texto. Así, `mount(<Contador />).click().text()` → `\"1\"`.",
        "Write the component `Contador` (no props) that uses `useState(0)` and returns a `<button>` that SHOWS the number and, on click, INCREMENTS it by 1.\n\nIn the tests, `mount(el)` renders the component; `.click()` presses the button and `.text()` reads its text. So `mount(<Contador />).click().text()` → `\"1\"`.",
      ),
      starter_code: "function Contador() {\n  const [n, setN] = useState(0);\n}\n",
      blocks: [
        "function Contador() {",
        "  const [n, setN] = useState(0);",
        "  return <button onClick={() => setN(n + 1)}>{n}</button>;",
        "}",
        "  return <button onClick={setN(n + 1)}>{n}</button>;",
        "  return <button onClick={() => n + 1}>{n}</button>;",
      ],
      hints: [
        P("Lee y actualiza: `const [n, setN] = useState(0)`.", "Read and update: `const [n, setN] = useState(0)`."),
        P("El botón muestra `{n}` y al click hace `setN(n + 1)`.", "The button shows `{n}` and on click does `setN(n + 1)`."),
      ],
      test_cases: [
        { input: "mount(<Contador />).text()", expected: "0", description: P("Empieza en 0", "Starts at 0"), raw: true },
        { input: "mount(<Contador />).click().text()", expected: "1", description: P("Un click: 1", "One click: 1"), raw: true },
        { input: "mount(<Contador />).click().click().click().text()", expected: "3", description: P("Tres clicks: 3", "Three clicks: 3"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas de los Túmulos", "The Barrow-blades"),
    lore_intro: P(
      "La hoja encantada se enciende y se apaga. Un estado booleano que alterna con cada toque.",
      "The enchanted blade lights up and goes dark. A boolean state that toggles with each touch.",
    ),
    challenge: {
      topic: P("useState con prop inicial y toggle", "useState with an initial prop and toggle"),
      instructions: P(
        "Escribe `Interruptor` que reciba la prop `inicial` (booleano) y use `useState(inicial)`. Devuelve un `<button>` que muestre `\"encendido\"` si el estado es true o `\"apagado\"` si es false, y que al hacer click ALTERNE el valor.\n\n`mount(<Interruptor inicial={false} />).click().text()` → `\"encendido\"`.",
        "Write `Interruptor` that takes the prop `inicial` (boolean) and uses `useState(inicial)`. Return a `<button>` showing `\"encendido\"` if the state is true or `\"apagado\"` if false, and that TOGGLES on click.\n\n`mount(<Interruptor inicial={false} />).click().text()` → `\"encendido\"`.",
      ),
      starter_code: 'function Interruptor({ inicial }) {\n  const [on, setOn] = useState(inicial);\n}\n',
      blocks: [
        "function Interruptor({ inicial }) {",
        "  const [on, setOn] = useState(inicial);",
        "  return <button onClick={() => setOn(!on)}>{on ? \"encendido\" : \"apagado\"}</button>;",
        "}",
        "  return <button onClick={() => setOn(on)}>{on ? \"encendido\" : \"apagado\"}</button>;",
      ],
      hints: [
        P("Alterna con la negación: `onClick={() => setOn(!on)}`.", "Toggle with negation: `onClick={() => setOn(!on)}`."),
        P('Muestra según el estado: `{on ? "encendido" : "apagado"}`.', 'Show based on state: `{on ? "encendido" : "apagado"}`.'),
      ],
      test_cases: [
        { input: "mount(<Interruptor inicial={false} />).text()", expected: "apagado", description: P("Empieza apagado", "Starts off"), raw: true },
        { input: "mount(<Interruptor inicial={false} />).click().text()", expected: "encendido", description: P("Un click lo enciende", "One click turns it on"), raw: true },
        { input: "mount(<Interruptor inicial={true} />).click().text()", expected: "apagado", description: P("Desde encendido, se apaga", "From on, it turns off"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P(
      "Cada golpe del Rey Brujo drena tu vida. Usa el actualizador funcional para restar sin bajar de 0.",
      "Each blow from the Witch-king drains your life. Use the functional updater to subtract without going below 0.",
    ),
    challenge: {
      topic: P("Actualizador funcional y clamp", "Functional updater and clamp"),
      instructions: P(
        "Escribe `Vida` (sin props) con `useState(100)`. Devuelve un `<button>` que muestre la vida y, al hacer click, le RESTE 40 sin bajar nunca de 0. Usa el actualizador funcional: `setVida(v => Math.max(0, v - 40))`.\n\n`mount(<Vida />).click().text()` → `\"60\"`.",
        "Write `Vida` (no props) with `useState(100)`. Return a `<button>` showing the life and, on click, SUBTRACTING 40 without ever going below 0. Use the functional updater: `setVida(v => Math.max(0, v - 40))`.\n\n`mount(<Vida />).click().text()` → `\"60\"`.",
      ),
      starter_code: "function Vida() {\n  const [vida, setVida] = useState(100);\n}\n",
      blocks: [
        "function Vida() {",
        "  const [vida, setVida] = useState(100);",
        "  return <button onClick={() => setVida(v => Math.max(0, v - 40))}>{vida}</button>;",
        "}",
        "  return <button onClick={() => setVida(vida - 40)}>{vida}</button>;",
        "  return <button onClick={() => setVida(v => v - 40)}>{vida}</button>;",
      ],
      hints: [
        P("El actualizador funcional recibe el valor previo: `setVida(v => ...)`.", "The functional updater receives the previous value: `setVida(v => ...)`."),
        P("Resta sin bajar de 0: `Math.max(0, v - 40)`.", "Subtract without going below 0: `Math.max(0, v - 40)`."),
      ],
      test_cases: [
        { input: "mount(<Vida />).text()", expected: "100", description: P("Vida llena", "Full life"), raw: true },
        { input: "mount(<Vida />).click().text()", expected: "60", description: P("Un golpe: 60", "One blow: 60"), raw: true },
        { input: "mount(<Vida />).click().click().click().text()", expected: "0", description: P("100→60→20→0: nunca negativo", "100→60→20→0: never negative"), raw: true },
      ],
    },
  },
};

/** Preguntas de combate reutilizables sobre inputs controlados y estado. */
const Q_CONTROLLED = {
  question: P(
    "¿Qué es un input CONTROLADO en React?",
    "What is a CONTROLLED input in React?",
  ),
  options: [
    P(
      "Uno cuyo valor viene del estado (`value={x}`) y se actualiza con `onChange`",
      "One whose value comes from state (`value={x}`) and updates with `onChange`",
    ),
    P("Uno que React no toca nunca", "One React never touches"),
    P("Un input de sólo lectura", "A read-only input"),
    P("Un input dentro de un formulario", "An input inside a form"),
  ],
  correct: 0,
  explanation: P(
    "En un input controlado, el estado es la ÚNICA fuente de verdad: `value={texto}` lo pinta y `onChange={e => setTexto(e.target.value)}` lo actualiza. El estado y lo que se ve nunca se desincronizan.",
    "In a controlled input, state is the SINGLE source of truth: `value={texto}` paints it and `onChange={e => setTexto(e.target.value)}` updates it. State and what's shown never drift apart.",
  ),
};
const Q_ONCHANGE = {
  question: P(
    "En `onChange={e => ...}`, ¿cómo se lee lo que el usuario escribió?",
    "In `onChange={e => ...}`, how do you read what the user typed?",
  ),
  options: [
    P("`e.target.value`", "`e.target.value`"),
    P("`e.value`", "`e.value`"),
    P("`e.text`", "`e.text`"),
    P("`this.value`", "`this.value`"),
  ],
  correct: 0,
  explanation: P(
    "El evento trae el elemento en `e.target`, y su contenido en `.value`: `e.target.value`. Para un checkbox se usa `e.target.checked` (booleano) en su lugar.",
    "The event carries the element in `e.target`, and its content in `.value`: `e.target.value`. For a checkbox you use `e.target.checked` (boolean) instead.",
  ),
};
const Q_DERIVED = {
  question: P(
    "Si un valor se puede CALCULAR a partir del estado en cada render, ¿deberías guardarlo en otro useState?",
    "If a value can be COMPUTED from state on each render, should you store it in another useState?",
  ),
  options: [
    P(
      "No: calcúlalo en el render (estado derivado); guardar duplica y se desincroniza",
      "No: compute it in the render (derived state); storing it duplicates and drifts",
    ),
    P("Sí, siempre en su propio useState", "Yes, always in its own useState"),
    P("Sólo si es un número", "Only if it's a number"),
    P("Da igual", "It doesn't matter"),
  ],
  correct: 0,
  explanation: P(
    "El estado derivado se calcula durante el render a partir del estado real: `const total = a + b`. Guardarlo en otro `useState` crea una copia que hay que mantener sincronizada a mano — fuente de bugs. Menos estado, mejor.",
    "Derived state is computed during render from the real state: `const total = a + b`. Storing it in another `useState` creates a copy you must keep in sync by hand — a bug source. Less state is better.",
  ),
};
const Q_MULTI_STATE = {
  question: P(
    "¿Puede un componente tener VARIOS `useState`?",
    "Can a component have SEVERAL `useState` hooks?",
  ),
  options: [
    P(
      "Sí: uno por cada porción de estado independiente",
      "Yes: one per independent piece of state",
    ),
    P("No: sólo uno por componente", "No: only one per component"),
    P("Sólo dos como máximo", "Only two at most"),
    P("Sólo si son del mismo tipo", "Only if they're the same type"),
  ],
  correct: 0,
  explanation: P(
    "Puedes llamar a `useState` tantas veces como necesites: `const [nombre, setNombre] = useState('')` y `const [edad, setEdad] = useState(0)`. React los distingue por el ORDEN de llamada, por eso los hooks no van dentro de condicionales.",
    "You can call `useState` as many times as you need: `const [nombre, setNombre] = useState('')` and `const [edad, setEdad] = useState(0)`. React tells them apart by CALL ORDER, which is why hooks don't go inside conditionals.",
  ),
};
const Q_CHECKBOX = {
  question: P(
    "En un checkbox controlado, ¿qué prop refleja su estado y qué se lee en onChange?",
    "For a controlled checkbox, which prop reflects its state and what do you read in onChange?",
  ),
  options: [
    P("`checked={ok}` y `e.target.checked`", "`checked={ok}` and `e.target.checked`"),
    P("`value={ok}` y `e.target.value`", "`value={ok}` and `e.target.value`"),
    P("`checked={ok}` y `e.target.value`", "`checked={ok}` and `e.target.value`"),
    P("`on={ok}` y `e.on`", "`on={ok}` and `e.on`"),
  ],
  correct: 0,
  explanation: P(
    "Un checkbox se controla con `checked={ok}` (booleano), y en `onChange` se lee `e.target.checked`. Es el paralelo de `value`/`e.target.value` de los inputs de texto.",
    "A checkbox is controlled with `checked={ok}` (boolean), and in `onChange` you read `e.target.checked`. It's the parallel of `value`/`e.target.value` for text inputs.",
  ),
};

/** Capítulo 4 · Inputs controlados y estado múltiple/derivado. */
const Q_UNCONTROLLED = {
  question: P("¿Qué diferencia a un input CONTROLADO de uno NO controlado?", "What sets a CONTROLLED input apart from an UNCONTROLLED one?"),
  options: [
    P("El controlado usa `value` + `onChange` (el estado manda); el no controlado usa `defaultValue` y lo lleva el DOM", "The controlled uses `value` + `onChange` (state rules); the uncontrolled uses `defaultValue` and the DOM keeps it"),
    P("No hay diferencia", "There's no difference"),
    P("El no controlado es de sólo lectura", "The uncontrolled is read-only"),
    P("El controlado no se puede escribir", "The controlled can't be typed into"),
  ],
  correct: 0,
  explanation: P(
    "Controlado: React es la fuente de verdad (`value={x}` + `onChange`). No controlado: el DOM guarda el valor y lo lees con una ref; `defaultValue` sólo fija el inicial. Se recomienda controlado.",
    "Controlled: React is the source of truth (`value={x}` + `onChange`). Uncontrolled: the DOM keeps the value and you read it via a ref; `defaultValue` only sets the initial. Controlled is recommended.",
  ),
};
const Q_FORM_SUBMIT = {
  question: P("En un `<form onSubmit={...}>`, ¿qué hace `e.preventDefault()`?", "In a `<form onSubmit={...}>`, what does `e.preventDefault()` do?"),
  options: [
    P("Evita que el navegador recargue la página al enviar", "Prevents the browser from reloading the page on submit"),
    P("Cancela el estado", "Cancels the state"),
    P("Borra el formulario", "Clears the form"),
    P("Envía el formulario dos veces", "Submits the form twice"),
  ],
  correct: 0,
  explanation: P(
    "Por defecto, enviar un formulario RECARGA la página. `e.preventDefault()` lo impide para manejar el envío en JS (leer el estado, llamar a una API…) sin perder la app.",
    "By default, submitting a form RELOADS the page. `e.preventDefault()` stops it so you can handle the submit in JS (read state, call an API…) without losing the app.",
  ),
};
const Q_INPUT_NUMBER = {
  question: P("El `value` de un `<input>`, ¿de qué tipo llega en `onChange`?", "The `value` of an `<input>`, what type does it come as in `onChange`?"),
  options: [
    P("Siempre string, aunque el input sea `type=\"number\"`", "Always a string, even if the input is `type=\"number\"`"),
    P("number si es type number", "number if it's type number"),
    P("boolean", "boolean"),
    P("Depende del navegador", "Depends on the browser"),
  ],
  correct: 0,
  explanation: P(
    "`e.target.value` es SIEMPRE un string. Si necesitas un número, conviértelo con `Number(...)` o `parseInt(...)`. Es un fallo típico sumar dos «números» y obtener una concatenación.",
    "`e.target.value` is ALWAYS a string. If you need a number, convert it with `Number(...)` or `parseInt(...)`. A classic bug is adding two \"numbers\" and getting a concatenation.",
  ),
};
const Q_SELECT = {
  question: P("¿Cómo se controla un `<select>` en React?", "How do you control a `<select>` in React?"),
  options: [
    P("Con `value={x}` en el `<select>` y un `onChange` que actualiza el estado", "With `value={x}` on the `<select>` and an `onChange` that updates state"),
    P("Con `selected` en cada `<option>`", "With `selected` on each `<option>`"),
    P("No se puede controlar", "It can't be controlled"),
    P("Con `checked`", "With `checked`"),
  ],
  correct: 0,
  explanation: P(
    "Igual que un input de texto: el `<select>` lleva `value={x}` (el valor de la opción elegida) y un `onChange`. React NO usa el atributo `selected` de las `<option>`, sino el `value` del select.",
    "Just like a text input: the `<select>` takes `value={x}` (the chosen option's value) and an `onChange`. React does NOT use the `<option>`'s `selected` attribute, but the select's `value`.",
  ),
};

export const SYL_REACT_COMMUNITY_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_CONTROLLED, Q_ONCHANGE, Q_MULTI_STATE] },
  c4_lobo: { kind: "battle", questions: [Q_DERIVED, Q_CHECKBOX, Q_UNCONTROLLED] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Los Nueve exigen un nombre. Un input controlado guarda lo que escribes, y el saludo se CALCULA de ese estado.",
      "The Nine demand a name. A controlled input stores what you type, and the greeting is COMPUTED from that state.",
    ),
    challenge: {
      topic: P("Input controlado y estado derivado", "Controlled input and derived state"),
      instructions: P(
        "Escribe `Saludo` (sin props) con `useState(\"\")`. Devuelve un `<div>` con:\n• un `<input value={nombre} onChange={e => setNombre(e.target.value)} />`,\n• un `<p>` que muestre `'Hola, {nombre}'` si hay nombre, o `'extraño'` si está vacío.\n\n`mount(<Saludo />).fill(\"input\", \"Frodo\").text(\"p\")` → `\"Hola, Frodo\"`.",
        "Write `Saludo` (no props) with `useState(\"\")`. Return a `<div>` with:\n• an `<input value={nombre} onChange={e => setNombre(e.target.value)} />`,\n• a `<p>` showing `'Hola, {nombre}'` if there's a name, or `'extraño'` if empty.\n\n`mount(<Saludo />).fill(\"input\", \"Frodo\").text(\"p\")` → `\"Hola, Frodo\"`.",
      ),
      starter_code:
        'function Saludo() {\n  const [nombre, setNombre] = useState("");\n}\n',
      blocks: [
        "function Saludo() {",
        "  const [nombre, setNombre] = useState(\"\");",
        "  return (",
        "    <div>",
        "      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />",
        "      <p>{nombre ? `Hola, ${nombre}` : \"extraño\"}</p>",
        "    </div>",
        "  );",
        "}",
        "      <input value={nombre} onChange={setNombre} />",
      ],
      hints: [
        P("El input controlado ata `value` al estado y lo actualiza en `onChange`.", "The controlled input ties `value` to state and updates it in `onChange`."),
        P("El saludo se calcula: `{nombre ? `Hola, ${nombre}` : 'extraño'}`.", "The greeting is computed: `{nombre ? `Hola, ${nombre}` : 'extraño'}`."),
      ],
      test_cases: [
        { input: 'mount(<Saludo />).text("p")', expected: "extraño", description: P("Vacío: extraño", "Empty: stranger"), raw: true },
        { input: 'mount(<Saludo />).fill("input", "Frodo").text("p")', expected: "Hola, Frodo", description: P("Con nombre: saludo derivado", "With a name: derived greeting"), raw: true },
        { input: 'mount(<Saludo />).fill("input", "Sam").text("p")', expected: "Hola, Sam", description: P("Otro nombre", "Another name"), raw: true },
      ],
    },
  },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_FORM_SUBMIT, Q_INPUT_NUMBER, Q_SELECT] },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino de la Voz", "The Scroll of the Voice"),
    lore_intro: P(
      "Antes del Vado, un pergamino enseña a ESCUCHAR al usuario: inputs controlados (value + onChange), varios estados y valores derivados.",
      "Before the Ford, a scroll teaches how to LISTEN to the user: controlled inputs (value + onChange), several states and derived values.",
    ),
    scroll: {
      topic: P("Inputs controlados y estado", "Controlled inputs and state"),
      sections: [
        {
          heading: P("Input controlado", "Controlled input"),
          body: P(
            "El estado es la fuente de verdad: `value={texto}` lo pinta, `onChange` lo actualiza leyendo `e.target.value`. Para un checkbox, `checked={ok}` y `e.target.checked`.",
            "State is the source of truth: `value={texto}` paints it, `onChange` updates it reading `e.target.value`. For a checkbox, `checked={ok}` and `e.target.checked`.",
          ),
          code: "function Eco() {\n  const [texto, setTexto] = useState(\"\");\n  return (\n    <div>\n      <input value={texto} onChange={(e) => setTexto(e.target.value)} />\n      <p>{texto}</p>\n    </div>\n  );\n}",
        },
        {
          heading: P("Varios estados", "Several states"),
          body: P(
            "Llama a `useState` una vez por cada porción de estado independiente. React los distingue por el ORDEN de llamada: nunca metas hooks dentro de `if`.",
            "Call `useState` once per independent piece of state. React tells them apart by CALL ORDER: never put hooks inside an `if`.",
          ),
          code: "const [nombre, setNombre] = useState(\"\");\nconst [edad, setEdad] = useState(0);",
        },
        {
          heading: P("Estado derivado: no lo guardes, calcúlalo", "Derived state: don't store it, compute it"),
          body: P(
            "Si un valor se puede calcular del estado en cada render, NO lo metas en otro useState: calcúlalo. Guardarlo duplica y se desincroniza.",
            "If a value can be computed from state each render, DON'T put it in another useState: compute it. Storing it duplicates and drifts out of sync.",
          ),
          code: "const [caudal, setCaudal] = useState(0);\nconst estado = caudal < 3 ? \"calmo\" : caudal < 6 ? \"crecido\" : \"desbordado\";",
        },
      ],
      keyTakeaway: P(
        "Input controlado = value/checked desde el estado + onChange que lo actualiza (e.target.value / .checked). Usa un useState por porción independiente, y CALCULA lo derivado en el render en vez de guardarlo.",
        "Controlled input = value/checked from state + onChange that updates it (e.target.value / .checked). Use one useState per independent piece, and COMPUTE derived values in the render instead of storing them.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("Asfaloth, el Corcel Élfico", "Asfaloth, the Elven Steed"),
    lore_intro: P(
      "El corcel repite la orden que le das. Un input controlado: el estado manda lo que se ve.",
      "The steed echoes the command you give it. A controlled input: state drives what's shown.",
    ),
    challenge: {
      topic: P("Input de texto controlado", "Controlled text input"),
      instructions: P(
        "Escribe `Eco` (sin props) con `useState(\"\")`. Devuelve un `<div>` con:\n• un `<input value={texto} onChange={e => setTexto(e.target.value)} />`,\n• un `<p>{texto}</p>` que muestre lo escrito.\n\nEn los tests, `.fill(sel, valor)` escribe en el input. `mount(<Eco />).fill(\"input\", \"hola\").text(\"p\")` → `\"hola\"`.",
        "Write `Eco` (no props) with `useState(\"\")`. Return a `<div>` with:\n• an `<input value={texto} onChange={e => setTexto(e.target.value)} />`,\n• a `<p>{texto}</p>` showing what was typed.\n\nIn the tests, `.fill(sel, value)` types into the input. `mount(<Eco />).fill(\"input\", \"hola\").text(\"p\")` → `\"hola\"`.",
      ),
      starter_code: 'function Eco() {\n  const [texto, setTexto] = useState("");\n  return (\n    <div>\n      <input value={texto} onChange={(e) => setTexto(e.target.value)} />\n      <p>{texto}</p>\n    </div>\n  );\n}\n',
      blocks: [
        "function Eco() {",
        "  const [texto, setTexto] = useState(\"\");",
        "  return (",
        "    <div>",
        "      <input value={texto} onChange={(e) => setTexto(e.target.value)} />",
        "      <p>{texto}</p>",
        "    </div>",
        "  );",
        "}",
        "      <input value={texto} onChange={(e) => setTexto(e.value)} />",
      ],
      hints: [
        P("El input controlado ata `value` al estado y lo actualiza en `onChange`.", "The controlled input ties `value` to state and updates it in `onChange`."),
        P("Lee lo escrito con `e.target.value`.", "Read what's typed with `e.target.value`."),
      ],
      test_cases: [
        { input: 'mount(<Eco />).text("p")', expected: "", description: P("Empieza vacío", "Starts empty"), raw: true },
        { input: 'mount(<Eco />).fill("input", "hola").text("p")', expected: "hola", description: P("Refleja lo escrito", "Reflects what's typed"), raw: true },
        { input: 'mount(<Eco />).fill("input", "Noro lim").text("p")', expected: "Noro lim", description: P("Con otro texto", "With other text"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Reckoning of the Nine"),
    lore_intro: P(
      "Sube y baja la cuenta de los jinetes con dos botones, sin bajar de 0.",
      "Raise and lower the count of riders with two buttons, without going below 0.",
    ),
    challenge: {
      topic: P("Varios manejadores y clamp", "Multiple handlers and clamp"),
      instructions: P(
        "Escribe `Recuento` (sin props) con `useState(0)`. Devuelve un `<div>` con:\n• un `<button className=\"menos\">` que RESTE 1 sin bajar de 0,\n• un `<span>{n}</span>`,\n• un `<button className=\"mas\">` que SUME 1.\n\n`mount(<Recuento />).click(\".mas\").click(\".mas\").text(\"span\")` → `\"2\"`.",
        "Write `Recuento` (no props) with `useState(0)`. Return a `<div>` with:\n• a `<button className=\"menos\">` that SUBTRACTS 1 without going below 0,\n• a `<span>{n}</span>`,\n• a `<button className=\"mas\">` that ADDS 1.\n\n`mount(<Recuento />).click(\".mas\").click(\".mas\").text(\"span\")` → `\"2\"`.",
      ),
      starter_code: 'function Recuento() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button className="menos" onClick={() => setN((m) => Math.max(0, m - 1))}>-</button>\n      <span>{n}</span>\n      <button className="mas" onClick={() => setN((m) => m + 1)}>+</button>\n    </div>\n  );\n}\n',
      blocks: [
        "function Recuento() {",
        "  const [n, setN] = useState(0);",
        "  return (",
        "    <div>",
        "      <button className=\"menos\" onClick={() => setN((m) => Math.max(0, m - 1))}>-</button>",
        "      <span>{n}</span>",
        "      <button className=\"mas\" onClick={() => setN((m) => m + 1)}>+</button>",
        "    </div>",
        "  );",
        "}",
        "      <button className=\"menos\" onClick={() => setN((m) => m - 1)}>-</button>",
      ],
      hints: [
        P("Cada botón lleva su `className` y su `onClick`.", "Each button has its `className` and its `onClick`."),
        P("El de restar usa clamp: `setN(m => Math.max(0, m - 1))`.", "The subtract one uses clamp: `setN(m => Math.max(0, m - 1))`."),
      ],
      test_cases: [
        { input: 'mount(<Recuento />).click(".mas").click(".mas").text("span")', expected: "2", description: P("Dos veces más", "Twice up"), raw: true },
        { input: 'mount(<Recuento />).click(".menos").text("span")', expected: "0", description: P("No baja de 0", "Doesn't go below 0"), raw: true },
        { input: 'mount(<Recuento />).click(".mas").click(".mas").click(".mas").click(".menos").text("span")', expected: "2", description: P("+3 y −1 = 2", "+3 and −1 = 2"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P(
      "¿Se puede cruzar el vado? Una casilla controlada decide, con checked y e.target.checked.",
      "Can the ford be crossed? A controlled checkbox decides, with checked and e.target.checked.",
    ),
    challenge: {
      topic: P("Checkbox controlado", "Controlled checkbox"),
      instructions: P(
        "Escribe `Vadeable` (sin props) con `useState(false)`. Devuelve un `<div>` con:\n• un `<input type=\"checkbox\" checked={ok} onChange={e => setOk(e.target.checked)} />`,\n• un `<span>` que muestre `\"puede cruzar\"` si el estado es true, o `\"no puede\"` si es false.\n\nAl hacer click en la casilla se marca. `mount(<Vadeable />).click(\"input\").text(\"span\")` → `\"puede cruzar\"`.",
        "Write `Vadeable` (no props) with `useState(false)`. Return a `<div>` with:\n• an `<input type=\"checkbox\" checked={ok} onChange={e => setOk(e.target.checked)} />`,\n• a `<span>` showing `\"puede cruzar\"` if the state is true, or `\"no puede\"` if false.\n\nClicking the checkbox checks it. `mount(<Vadeable />).click(\"input\").text(\"span\")` → `\"puede cruzar\"`.",
      ),
      starter_code: 'function Vadeable() {\n  const [ok, setOk] = useState(false);\n  return (\n    <div>\n      <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />\n      <span>{ok ? "puede cruzar" : "no puede"}</span>\n    </div>\n  );\n}\n',
      blocks: [
        "function Vadeable() {",
        "  const [ok, setOk] = useState(false);",
        "  return (",
        "    <div>",
        "      <input type=\"checkbox\" checked={ok} onChange={(e) => setOk(e.target.checked)} />",
        "      <span>{ok ? \"puede cruzar\" : \"no puede\"}</span>",
        "    </div>",
        "  );",
        "}",
        "      <input type=\"checkbox\" checked={ok} onChange={(e) => setOk(e.target.value)} />",
      ],
      hints: [
        P("El checkbox se controla con `checked={ok}` y se lee con `e.target.checked`.", "The checkbox is controlled with `checked={ok}` and read with `e.target.checked`."),
        P('El span muestra según el estado: `{ok ? "puede cruzar" : "no puede"}`.', 'The span shows based on state: `{ok ? "puede cruzar" : "no puede"}`.'),
      ],
      test_cases: [
        { input: 'mount(<Vadeable />).text("span")', expected: "no puede", description: P("Al principio, no", "At first, no"), raw: true },
        { input: 'mount(<Vadeable />).click("input").text("span")', expected: "puede cruzar", description: P("Marcada: puede", "Checked: can"), raw: true },
        { input: 'mount(<Vadeable />).click("input").click("input").text("span")', expected: "no puede", description: P("Desmarcar vuelve a no", "Unchecking returns to no"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las runas del Vado", "The runes of the Ford"),
    lore_intro: P(
      "El caudal sube con cada runa. El estado del agua se CALCULA del caudal: eso es estado derivado.",
      "The flow rises with each rune. The water's state is COMPUTED from the flow: that's derived state.",
    ),
    challenge: {
      topic: P("Estado derivado", "Derived state"),
      instructions: P(
        "Escribe `Runas` (sin props) con `useState(0)` para el caudal. NO guardes el estado del agua en otro useState: CALCÚLALO en el render:\n• `\"calmo\"` si el caudal es menor que 3,\n• `\"crecido\"` si es menor que 6,\n• `\"desbordado\"` si es 6 o más.\n\nDevuelve un `<div>` con un `<button>` que suba el caudal en 1 y un `<span>` con el estado.\n\n`mount(<Runas />).click().click().click().text(\"span\")` → `\"crecido\"`.",
        "Write `Runas` (no props) with `useState(0)` for the flow. DON'T store the water's state in another useState: COMPUTE it in the render:\n• `\"calmo\"` if the flow is under 3,\n• `\"crecido\"` if under 6,\n• `\"desbordado\"` if 6 or more.\n\nReturn a `<div>` with a `<button>` that raises the flow by 1 and a `<span>` with the state.\n\n`mount(<Runas />).click().click().click().text(\"span\")` → `\"crecido\"`.",
      ),
      starter_code: 'function Runas() {\n  const [caudal, setCaudal] = useState(0);\n  const estado = caudal < 3 ? "calmo" : caudal < 6 ? "crecido" : "desbordado";\n  return (\n    <div>\n      <button onClick={() => setCaudal((c) => c + 1)}>subir</button>\n      <span>{estado}</span>\n    </div>\n  );\n}\n',
      blocks: [
        "function Runas() {",
        "  const [caudal, setCaudal] = useState(0);",
        "  const estado = caudal < 3 ? \"calmo\" : caudal < 6 ? \"crecido\" : \"desbordado\";",
        "  return (",
        "    <div>",
        "      <button onClick={() => setCaudal((c) => c + 1)}>subir</button>",
        "      <span>{estado}</span>",
        "    </div>",
        "  );",
        "}",
        "  const [estado, setEstado] = useState(\"calmo\");",
      ],
      hints: [
        P("`estado` se calcula del caudal con un ternario encadenado, sin otro useState.", "`estado` is computed from the flow with a chained ternary, without another useState."),
        P("El botón sólo sube el caudal: `setCaudal(c => c + 1)`.", "The button only raises the flow: `setCaudal(c => c + 1)`."),
      ],
      test_cases: [
        { input: 'mount(<Runas />).text("span")', expected: "calmo", description: P("Caudal 0: calmo", "Flow 0: calm"), raw: true },
        { input: 'mount(<Runas />).click().click().click().text("span")', expected: "crecido", description: P("Caudal 3: crecido", "Flow 3: risen"), raw: true },
        { input: 'mount(<Runas />).click().click().click().click().click().click().text("span")', expected: "desbordado", description: P("Caudal 6: desbordado", "Flow 6: overflowing"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 5 · Renderizado condicional
 * ===================================================================== */
const Q_R5_TERNARY = {
  question: P("¿Cómo muestras una cosa u otra en JSX según una condición?", "How do you show one thing or another in JSX based on a condition?"),
  options: [
    P("Con el ternario: `{cond ? <A/> : <B/>}`", "With the ternary: `{cond ? <A/> : <B/>}`"),
    P("Con un `if` dentro del JSX", "With an `if` inside the JSX"),
    P("Con un bucle for", "With a for loop"),
    P("No se puede", "You can't"),
  ],
  correct: 0,
  explanation: P(
    "Dentro del JSX sólo caben EXPRESIONES, no sentencias. El ternario `cond ? A : B` es una expresión y sirve para elegir entre dos vistas; un `if` iría FUERA del return.",
    "Inside JSX only EXPRESSIONS fit, not statements. The ternary `cond ? A : B` is an expression and chooses between two views; an `if` would go OUTSIDE the return.",
  ),
};
const Q_R5_AND = {
  question: P("¿Qué hace `{visible && <span>hola</span>}`?", "What does `{visible && <span>hola</span>}` do?"),
  options: [
    P("Muestra el `<span>` sólo si `visible` es true", "Shows the `<span>` only if `visible` is true"),
    P("Muestra siempre el span", "Always shows the span"),
    P("Da error", "Errors"),
    P("Muestra 'true' o 'false'", "Shows 'true' or 'false'"),
  ],
  correct: 0,
  explanation: P(
    "El `&&` es el atajo para 'mostrar sólo si': si la izquierda es true, se pinta la derecha; si es false, no se pinta nada. Ideal cuando no hay un 'else'.",
    "The `&&` is the shortcut for 'show only if': if the left is true, the right renders; if false, nothing renders. Ideal when there's no 'else'.",
  ),
};
const Q_R5_FALSE = {
  question: P("¿Qué pinta React cuando una expresión da `false`, `null` o `undefined`?", "What does React render when an expression is `false`, `null` or `undefined`?"),
  options: [
    P("Nada (no muestra ningún texto)", "Nothing (it shows no text)"),
    P("La palabra 'false'/'null'", "The word 'false'/'null'"),
    P("Un espacio en blanco", "A blank space"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "React IGNORA `false`, `null` y `undefined` al renderizar: no pintan nada. Por eso `{cond && <X/>}` no deja rastro cuando `cond` es false. Cuidado: `0` SÍ se pinta.",
    "React IGNORES `false`, `null` and `undefined` when rendering: they show nothing. That's why `{cond && <X/>}` leaves no trace when `cond` is false. Careful: `0` DOES render.",
  ),
};
const Q_R5_ZERO = {
  question: P("¿Por qué `{items.length && <Lista/>}` puede pintar un `0` inesperado?", "Why can `{items.length && <Lista/>}` render an unexpected `0`?"),
  options: [
    P("Si length es 0, `&&` devuelve 0, y React SÍ pinta el 0", "If length is 0, `&&` returns 0, and React DOES render the 0"),
    P("Porque length nunca es 0", "Because length is never 0"),
    P("Porque && no funciona con números", "Because && doesn't work with numbers"),
    P("Es un bug de React", "It's a React bug"),
  ],
  correct: 0,
  explanation: P(
    "`0 && algo` es `0`, y React pinta el número 0 (a diferencia de false). Por eso se usa `items.length > 0 && ...` o un ternario: convertir a booleano evita el 0 fantasma.",
    "`0 && something` is `0`, and React renders the number 0 (unlike false). Use `items.length > 0 && ...` or a ternary: converting to boolean avoids the ghost 0.",
  ),
};
const Q_R5_NOIF = {
  question: P("¿Se puede escribir un `if (...) { }` DENTRO del JSX del return?", "Can you write an `if (...) { }` INSIDE the return's JSX?"),
  options: [
    P("No: en JSX sólo van expresiones; el `if` va antes del return", "No: JSX only takes expressions; the `if` goes before the return"),
    P("Sí, igual que en HTML", "Yes, just like in HTML"),
    P("Sí, con `{if (...)}`", "Yes, with `{if (...)}`"),
    P("Sólo con `else`", "Only with `else`"),
  ],
  correct: 0,
  explanation: P(
    "Las llaves de JSX aceptan EXPRESIONES, y `if` es una sentencia. Para ramificar dentro del JSX se usa el ternario o `&&`; para lógica más larga, un `if` ANTES del return o un early return.",
    "JSX braces accept EXPRESSIONS, and `if` is a statement. To branch inside JSX use the ternary or `&&`; for longer logic, an `if` BEFORE the return or an early return.",
  ),
};
const Q_R5_EARLY = {
  question: P("¿Qué es un 'early return' en un componente?", "What is an 'early return' in a component?"),
  options: [
    P("Devolver un JSX distinto antes del return principal según una condición", "Returning a different JSX before the main return based on a condition"),
    P("Un return sin valor", "A return with no value"),
    P("Un return dentro del JSX", "A return inside the JSX"),
    P("Un error de sintaxis", "A syntax error"),
  ],
  correct: 0,
  explanation: P(
    "`if (cargando) return <Spinner/>;` corta pronto y evita anidar ternarios. Es muy común para estados de carga o error antes de pintar el contenido normal.",
    "`if (cargando) return <Spinner/>;` bails out early and avoids nested ternaries. Very common for loading or error states before painting the normal content.",
  ),
};
const Q_R5_CLASS_COND = {
  question: P("¿Cómo pones una clase CSS según una condición?", "How do you set a CSS class based on a condition?"),
  options: [
    P("`className={activo ? 'on' : 'off'}`", "`className={activo ? 'on' : 'off'}`"),
    P("`class={activo ? 'on' : 'off'}`", "`class={activo ? 'on' : 'off'}`"),
    P("`className=activo`", "`className=activo`"),
    P("No se puede condicionar la clase", "You can't make the class conditional"),
  ],
  correct: 0,
  explanation: P(
    "`className` acepta una expresión entre llaves, así que un ternario elige la clase. En JSX es `className` (no `class`) porque `class` es palabra reservada de JavaScript.",
    "`className` accepts an expression in braces, so a ternary picks the class. In JSX it's `className` (not `class`) because `class` is a reserved JavaScript word.",
  ),
};
const Q_R5_NULL = {
  question: P("Si un componente hace `return null`, ¿qué se ve?", "If a component does `return null`, what shows?"),
  options: [
    P("Nada: es la forma de no pintar nada", "Nothing: it's the way to render nothing"),
    P("La palabra 'null'", "The word 'null'"),
    P("Un error", "An error"),
    P("Un div vacío", "An empty div"),
  ],
  correct: 0,
  explanation: P(
    "`return null` es válido y no pinta nada: útil cuando un componente decide no mostrarse. No confundir con `return;` (que devuelve undefined y también funciona, pero es menos claro).",
    "`return null` is valid and renders nothing: useful when a component decides not to show. Don't confuse it with `return;` (returns undefined, also works, but less clear).",
  ),
};
const Q_R5_ELEMENTS = {
  question: P("¿Puede el ternario elegir entre dos ELEMENTOS distintos, no sólo textos?", "Can the ternary choose between two different ELEMENTS, not just texts?"),
  options: [
    P("Sí: `{ok ? <Exito/> : <Error/>}` es habitual", "Yes: `{ok ? <Exito/> : <Error/>}` is common"),
    P("No, sólo entre textos", "No, only between texts"),
    P("Sólo entre números", "Only between numbers"),
    P("Sólo si tienen la misma etiqueta", "Only if they have the same tag"),
  ],
  correct: 0,
  explanation: P(
    "El ternario devuelve cualquier expresión, incluidos elementos JSX completos. Es la forma más directa de alternar entre dos vistas (éxito/error, abierto/cerrado).",
    "The ternary returns any expression, including whole JSX elements. It's the most direct way to switch between two views (success/error, open/closed).",
  ),
};

export const SYL_REACT_COMMUNITY_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_R5_TERNARY, Q_R5_AND, Q_R5_FALSE] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_R5_ZERO, Q_R5_NOIF, Q_R5_EARLY] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_R5_CLASS_COND, Q_R5_NULL, Q_R5_ELEMENTS] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P(
      "La montaña abre y cierra sus pasos con la ventisca. Pinta SÓLO las rutas abiertas: condición + lista.",
      "The mountain opens and closes its passes with the blizzard. Render ONLY the open routes: condition + list.",
    ),
    challenge: {
      topic: P("Filtrar y renderizar por condición", "Filter and render by condition"),
      instructions: P(
        "Escribe `Rutas` que reciba `rutas` (array de `{ nombre, abierta }`) y devuelva un `<ul>` con un `<li key={r.nombre}>{r.nombre}</li>` SÓLO por cada ruta cuyo `abierta` sea true.\n\n`render(<Rutas rutas={[{nombre:\"Paso\",abierta:true},{nombre:\"Cima\",abierta:false}]} />)` → `\"<ul><li>Paso</li></ul>\"`.",
        "Write `Rutas` taking `rutas` (array of `{ nombre, abierta }`) and returning a `<ul>` with a `<li key={r.nombre}>{r.nombre}</li>` ONLY for each route whose `abierta` is true.\n\n`render(<Rutas rutas={[{nombre:\"Paso\",abierta:true},{nombre:\"Cima\",abierta:false}]} />)` → `\"<ul><li>Paso</li></ul>\"`.",
      ),
      starter_code: "function Rutas({ rutas }) {\n}\n",
      blocks: [
        "function Rutas({ rutas }) {",
        "  return <ul>{rutas.filter(r => r.abierta).map(r => <li key={r.nombre}>{r.nombre}</li>)}</ul>;",
        "}",
        "  return <ul>{rutas.map(r => <li key={r.nombre}>{r.nombre}</li>)}</ul>;",
        "  return <ul>{rutas.filter(r => r.abierta)}</ul>;",
      ],
      hints: [
        P("Filtra primero: `rutas.filter(r => r.abierta)`.", "Filter first: `rutas.filter(r => r.abierta)`."),
        P("Luego `.map(r => <li key={r.nombre}>{r.nombre}</li>)`.", "Then `.map(r => <li key={r.nombre}>{r.nombre}</li>)`."),
      ],
      test_cases: [
        { input: 'render(<Rutas rutas={[{nombre:"Paso",abierta:true},{nombre:"Cima",abierta:false},{nombre:"Puerta",abierta:true}]} />)', expected: "<ul><li>Paso</li><li>Puerta</li></ul>", description: P("Sólo las abiertas", "Only the open ones"), raw: true },
        { input: 'render(<Rutas rutas={[{nombre:"Cima",abierta:false}]} />)', expected: "<ul></ul>", description: P("Ninguna abierta", "None open"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino de la Condición", "The Scroll of the Condition"),
    lore_intro: P(
      "Bajo la ventisca, Gandalf traza runas: enseña a mostrar u ocultar según una condición, sin `if` dentro del JSX.",
      "Under the blizzard, Gandalf traces runes: they teach how to show or hide based on a condition, with no `if` inside the JSX.",
    ),
    scroll: {
      topic: P("Renderizado condicional", "Conditional rendering"),
      sections: [
        {
          heading: P("Ternario y &&", "Ternary and &&"),
          body: P(
            "En JSX sólo caben expresiones. `{cond ? <A/> : <B/>}` elige entre dos; `{cond && <A/>}` muestra sólo si es true.",
            "JSX only takes expressions. `{cond ? <A/> : <B/>}` chooses between two; `{cond && <A/>}` shows only if true.",
          ),
          code: "<span>{oculto ? 'sombra' : nombre}</span>\n<div>{activo && <span>protegido</span>}</div>",
        },
        {
          heading: P("false/null no pintan nada", "false/null render nothing"),
          body: P(
            "React ignora `false`, `null` y `undefined`. Ojo con `0`: SÍ se pinta, así que usa `length > 0 && ...`.",
            "React ignores `false`, `null` and `undefined`. Watch out for `0`: it DOES render, so use `length > 0 && ...`.",
          ),
          code: "{items.length > 0 && <Lista/>}\nreturn null; // no pinta nada",
        },
        {
          heading: P("if fuera del return", "if outside the return"),
          body: P(
            "Para lógica más larga, decide antes del return (early return) o guarda el JSX en una variable.",
            "For longer logic, decide before the return (early return) or store the JSX in a variable.",
          ),
          code: "if (cargando) return <Spinner/>;\nreturn <Contenido/>;",
        },
      ],
      keyTakeaway: P(
        "Condicionar en JSX: ternario (dos opciones) o && (mostrar si). false/null/undefined no pintan; 0 sí. Para lógica larga, if/early-return antes del return.",
        "Conditionals in JSX: ternary (two options) or && (show if). false/null/undefined render nothing; 0 does. For longer logic, if/early-return before the return.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("El Aviso de Bill", "Bill's Warning"),
    lore_intro: P(
      "Bill el Poney presiente el peligro. Muestra un aviso u otro según lo que huela.",
      "Bill the Pony senses danger. Show one warning or another based on what he smells.",
    ),
    challenge: {
      topic: P("Ternario en JSX", "Ternary in JSX"),
      instructions: P(
        "Escribe `Aviso` que reciba la prop `peligro` (booleano) y devuelva un `<p>` con `\"¡Peligro!\"` si es true o `\"todo en calma\"` si es false.",
        "Write `Aviso` taking the prop `peligro` (boolean) and returning a `<p>` with `\"¡Peligro!\"` if true or `\"todo en calma\"` if false.",
      ),
      starter_code: "function Aviso({ peligro }) {\n}\n",
      blocks: [
        "function Aviso({ peligro }) {",
        '  return <p>{peligro ? "¡Peligro!" : "todo en calma"}</p>;',
        "}",
        '  return <p>{peligro}</p>;',
        '  return <p>if (peligro) "¡Peligro!"</p>;',
      ],
      hints: [
        P("Ternario dentro de las llaves del JSX.", "Ternary inside the JSX braces."),
        P('`{peligro ? "¡Peligro!" : "todo en calma"}`.', '`{peligro ? "¡Peligro!" : "todo en calma"}`.'),
      ],
      test_cases: [
        { input: "render(<Aviso peligro={true} />)", expected: "<p>¡Peligro!</p>", description: P("Con peligro", "With danger"), raw: true },
        { input: "render(<Aviso peligro={false} />)", expected: "<p>todo en calma</p>", description: P("En calma", "Calm"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("El Escudo de la Comunidad", "The Fellowship's Shield"),
    lore_intro: P(
      "El escudo sólo aparece cuando está activo. Muéstralo con `&&`, o no muestres nada.",
      "The shield only appears when active. Show it with `&&`, or show nothing.",
    ),
    challenge: {
      topic: P("Operador && en JSX", "The && operator in JSX"),
      instructions: P(
        "Escribe `Escudo` que reciba la prop `activo` (booleano) y devuelva un `<div>` que contenga `<span>protegido</span>` SÓLO si `activo` es true (usa `&&`). Si es false, el div queda vacío.",
        "Write `Escudo` taking the prop `activo` (boolean) and returning a `<div>` that contains `<span>protegido</span>` ONLY if `activo` is true (use `&&`). If false, the div is empty.",
      ),
      starter_code: "function Escudo({ activo }) {\n}\n",
      blocks: [
        "function Escudo({ activo }) {",
        "  return <div>{activo && <span>protegido</span>}</div>;",
        "}",
        "  return <div>{activo ? activo : <span>protegido</span>}</div>;",
        "  return <span>protegido</span>;",
      ],
      hints: [
        P("`{activo && <span>protegido</span>}` sólo pinta si es true.", "`{activo && <span>protegido</span>}` only renders if true."),
        P("Cuando `activo` es false, no se pinta nada dentro del div.", "When `activo` is false, nothing renders inside the div."),
      ],
      test_cases: [
        { input: "render(<Escudo activo={true} />)", expected: "<div><span>protegido</span></div>", description: P("Activo: protegido", "Active: protected"), raw: true },
        { input: "render(<Escudo activo={false} />)", expected: "<div></div>", description: P("Inactivo: vacío", "Inactive: empty"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("El Clima de la Montaña", "The Mountain's Weather"),
    lore_intro: P(
      "Tres climas según los grados: helada, templado o calor. Encadena dos ternarios.",
      "Three climates by degrees: freezing, mild or hot. Chain two ternaries.",
    ),
    challenge: {
      topic: P("Ternario encadenado", "Chained ternary"),
      instructions: P(
        "Escribe `Clima` que reciba `grados` (número) y devuelva un `<span>` con:\n• `\"helada\"` si `grados < 0`,\n• `\"templado\"` si `grados < 20`,\n• `\"calor\"` en otro caso.",
        "Write `Clima` taking `grados` (number) and returning a `<span>` with:\n• `\"helada\"` if `grados < 0`,\n• `\"templado\"` if `grados < 20`,\n• `\"calor\"` otherwise.",
      ),
      starter_code: "function Clima({ grados }) {\n}\n",
      blocks: [
        "function Clima({ grados }) {",
        '  return <span>{grados < 0 ? "helada" : grados < 20 ? "templado" : "calor"}</span>;',
        "}",
        '  return <span>{grados < 0 ? "helada" : "calor"}</span>;',
        '  return <span>grados</span>;',
      ],
      hints: [
        P("Un ternario dentro de otro: `a < 0 ? 'helada' : (a < 20 ? 'templado' : 'calor')`.", "A ternary inside another: `a < 0 ? 'helada' : (a < 20 ? 'templado' : 'calor')`."),
        P("El orden importa: primero el corte más bajo.", "Order matters: the lowest cutoff first."),
      ],
      test_cases: [
        { input: "render(<Clima grados={-5} />)", expected: "<span>helada</span>", description: P("Bajo cero", "Below zero"), raw: true },
        { input: "render(<Clima grados={10} />)", expected: "<span>templado</span>", description: P("Templado", "Mild"), raw: true },
        { input: "render(<Clima grados={30} />)", expected: "<span>calor</span>", description: P("Calor", "Hot"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 6 · Listas y filtrado
 * ===================================================================== */
const Q_R6_MAP = {
  question: P("¿Cómo conviertes un array `xs` en una lista de `<li>`?", "How do you turn an array `xs` into a list of `<li>`?"),
  options: [
    P("{xs.map(x => <li key={x}>{x}</li>)}", "{xs.map(x => <li key={x}>{x}</li>)}"),
    P("{xs.forEach(x => <li>{x}</li>)}", "{xs.forEach(x => <li>{x}</li>)}"),
    P("{for (x of xs) <li>{x}</li>}", "{for (x of xs) <li>{x}</li>}"),
    P("{xs.join('<li>')}", "{xs.join('<li>')}"),
  ],
  correct: 0,
  explanation: P(
    "`map` transforma cada dato en un elemento y devuelve un ARRAY de JSX, que React pinta en orden. `forEach` no devuelve nada y un `for` es una sentencia, no una expresión.",
    "`map` turns each item into an element and returns an ARRAY of JSX, which React paints in order. `forEach` returns nothing and a `for` is a statement, not an expression.",
  ),
};
const Q_R6_KEY = {
  question: P("¿Qué prop hay que dar a cada elemento de una lista?", "What prop must you give each list item?"),
  options: [
    P("`key`, con un valor único y estable", "`key`, with a unique, stable value"),
    P("`id`", "`id`"),
    P("`index`", "`index`"),
    P("Ninguna", "None"),
  ],
  correct: 0,
  explanation: P(
    "`key` da a React una identidad estable por elemento para saber cuál cambió, se añadió o se borró. No aparece en el HTML final: es sólo para React.",
    "`key` gives React a stable identity per item so it knows which changed, was added or removed. It doesn't appear in the final HTML: it's only for React.",
  ),
};
const Q_R6_FILTER = {
  question: P("¿Cómo pintas SÓLO los elementos que cumplen una condición?", "How do you render ONLY the elements that meet a condition?"),
  options: [
    P("Filtra antes de mapear: `xs.filter(...).map(...)`", "Filter before mapping: `xs.filter(...).map(...)`"),
    P("Con un if dentro del map", "With an if inside the map"),
    P("Con `xs.only(...)`", "With `xs.only(...)`"),
    P("No se puede filtrar", "You can't filter"),
  ],
  correct: 0,
  explanation: P(
    "El patrón habitual es `filter` (quita los que no cumplen) y luego `map` (los convierte en JSX). Se encadenan porque ambos devuelven un array.",
    "The usual pattern is `filter` (drops those that don't match) and then `map` (turns them into JSX). They chain because both return an array.",
  ),
};
const Q_R6_KEY_UNIQUE = {
  question: P("¿Entre quién debe ser única la `key`?", "Among whom must the `key` be unique?"),
  options: [
    P("Entre los elementos HERMANOS de la misma lista", "Among the SIBLING items of the same list"),
    P("En toda la aplicación", "Across the whole app"),
    P("En todo el componente", "Across the whole component"),
    P("No hace falta que sea única", "It doesn't need to be unique"),
  ],
  correct: 0,
  explanation: P(
    "La `key` sólo tiene que distinguir a los hermanos de una misma lista. Dos listas distintas pueden repetir keys sin problema.",
    "The `key` only needs to tell apart siblings in the same list. Two different lists can repeat keys with no problem.",
  ),
};
const Q_R6_LENGTH = {
  question: P("¿Cómo muestras CUÁNTOS elementos hay en `items`?", "How do you show HOW MANY elements are in `items`?"),
  options: [
    P("{items.length}", "{items.length}"),
    P("{items.count()}", "{items.count()}"),
    P("{count(items)}", "{count(items)}"),
    P("{items.size}", "{items.size}"),
  ],
  correct: 0,
  explanation: P(
    "`items.length` es la propiedad (sin paréntesis) con el número de elementos de un array. Se incrusta como cualquier expresión: `<p>{items.length}</p>`.",
    "`items.length` is the property (no parentheses) with an array's element count. Embed it like any expression: `<p>{items.length}</p>`.",
  ),
};
const Q_R6_EMPTY = {
  question: P("¿Qué pinta `{[].map(x => <li>{x}</li>)}` (array vacío)?", "What does `{[].map(x => <li>{x}</li>)}` (empty array) render?"),
  options: [
    P("Nada: un array vacío no produce elementos", "Nothing: an empty array produces no elements"),
    P("Un `<li>` vacío", "An empty `<li>`"),
    P("Un error", "An error"),
    P("La palabra 'undefined'", "The word 'undefined'"),
  ],
  correct: 0,
  explanation: P(
    "`map` sobre un array vacío devuelve un array vacío, y React no pinta nada. Por eso una lista sin datos sale como `<ul></ul>` sin necesitar un caso especial.",
    "`map` over an empty array returns an empty array, and React renders nothing. That's why an empty list comes out as `<ul></ul>` without a special case.",
  ),
};
const Q_R6_NOINDEX = {
  question: P("¿Por qué evitar el índice del array como `key` si la lista cambia?", "Why avoid the array index as `key` if the list changes?"),
  options: [
    P("Al reordenar/insertar, el índice se desplaza y React confunde los elementos", "On reorder/insert, the index shifts and React confuses the items"),
    P("El índice es más lento", "The index is slower"),
    P("El índice no es un número", "The index isn't a number"),
    P("Da error siempre", "It always errors"),
  ],
  correct: 0,
  explanation: P(
    "El índice cambia al insertar o reordenar, así que React reutiliza el nodo equivocado (arrastrando estado o inputs). Usa un id estable del dato como `key`.",
    "The index changes on insert or reorder, so React reuses the wrong node (dragging state or inputs). Use a stable id from the data as `key`.",
  ),
};
const Q_R6_ARRAY = {
  question: P("En `{xs.map(x => <li>{x}</li>)}`, ¿qué devuelve el map?", "In `{xs.map(x => <li>{x}</li>)}`, what does map return?"),
  options: [
    P("Un ARRAY de elementos JSX que React pinta en orden", "An ARRAY of JSX elements React paints in order"),
    P("Un solo elemento", "A single element"),
    P("Un string", "A string"),
    P("Nada visible", "Nothing visible"),
  ],
  correct: 0,
  explanation: P(
    "React sabe pintar arrays de elementos uno tras otro; por eso `map` es la forma de renderizar listas. `forEach` no vale porque no devuelve nada.",
    "React knows how to paint arrays of elements one after another; that's why `map` renders lists. `forEach` won't do because it returns nothing.",
  ),
};
const Q_R6_CHAIN = {
  question: P("¿Qué hace `xs.filter(x => x > 0).map(x => <li>{x}</li>)`?", "What does `xs.filter(x => x > 0).map(x => <li>{x}</li>)` do?"),
  options: [
    P("Se queda con los positivos y los convierte en `<li>`", "Keeps the positives and turns them into `<li>`"),
    P("Suma los positivos", "Sums the positives"),
    P("Ordena y pinta todo", "Sorts and paints everything"),
    P("Da error al encadenar", "Errors when chaining"),
  ],
  correct: 0,
  explanation: P(
    "`filter` devuelve un array con los que cumplen, y sobre ese array se aplica `map`. Encadenar filter→map es el patrón para 'pintar sólo algunos'.",
    "`filter` returns an array with the matches, and `map` applies to that array. Chaining filter→map is the pattern for 'render only some'.",
  ),
};

export const SYL_REACT_COMMUNITY_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_R6_MAP, Q_R6_KEY, Q_R6_ARRAY] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_R6_FILTER, Q_R6_CHAIN, Q_R6_EMPTY] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_R6_KEY_UNIQUE, Q_R6_NOINDEX, Q_R6_LENGTH] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P(
      "La horda de Moria cae uno a uno. Píntalos a todos, marcando con una clase quién sigue vivo y quién ha caído.",
      "The horde of Moria falls one by one. Paint them all, marking with a class who's alive and who's fallen.",
    ),
    challenge: {
      topic: P("map con clase condicional", "map with a conditional class"),
      instructions: P(
        "Escribe `Tablero` que reciba `enemigos` (array de `{ nombre, vivo }`) y devuelva un `<ul>` con un `<li>` por enemigo. Cada `<li>` lleva `key={e.nombre}`, `className=\"vivo\"` si `vivo` es true o `\"caido\"` si es false, y muestra el `nombre`.\n\n`render(<Tablero enemigos={[{nombre:\"orco\",vivo:true}]} />)` → `'<ul><li class=\"vivo\">orco</li></ul>'`.",
        "Write `Tablero` taking `enemigos` (array of `{ nombre, vivo }`) and returning a `<ul>` with one `<li>` per enemy. Each `<li>` has `key={e.nombre}`, `className=\"vivo\"` if `vivo` is true or `\"caido\"` if false, and shows the `nombre`.\n\n`render(<Tablero enemigos={[{nombre:\"orco\",vivo:true}]} />)` → `'<ul><li class=\"vivo\">orco</li></ul>'`.",
      ),
      starter_code: "function Tablero({ enemigos }) {\n}\n",
      blocks: [
        "function Tablero({ enemigos }) {",
        '  return <ul>{enemigos.map(e => <li key={e.nombre} className={e.vivo ? "vivo" : "caido"}>{e.nombre}</li>)}</ul>;',
        "}",
        '  return <ul>{enemigos.map(e => <li key={e.nombre} class={e.vivo}>{e.nombre}</li>)}</ul>;',
        '  return <ul>{enemigos.filter(e => e.vivo)}</ul>;',
      ],
      hints: [
        P("`className={e.vivo ? 'vivo' : 'caido'}` elige la clase.", "`className={e.vivo ? 'vivo' : 'caido'}` picks the class."),
        P("En JSX es `className`, no `class`.", "In JSX it's `className`, not `class`."),
      ],
      test_cases: [
        { input: 'render(<Tablero enemigos={[{nombre:"orco",vivo:true},{nombre:"trol",vivo:false}]} />)', expected: '<ul><li class="vivo">orco</li><li class="caido">trol</li></ul>', description: P("Vivos y caídos", "Alive and fallen"), raw: true },
        { input: 'render(<Tablero enemigos={[]} />)', expected: "<ul></ul>", description: P("Horda vacía", "Empty horde"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de las Listas", "The Scroll of Lists"),
    lore_intro: P(
      "En las tumbas de Moria, un pergamino enano enseña a pintar muchos elementos de un array: map, key y filter.",
      "In the tombs of Moria, a dwarven scroll teaches how to paint many elements from an array: map, key and filter.",
    ),
    scroll: {
      topic: P("Listas: map, key y filter", "Lists: map, key and filter"),
      sections: [
        {
          heading: P("map + key", "map + key"),
          body: P(
            "`{xs.map(x => <li key={x}>{x}</li>)}` convierte cada dato en un elemento. La `key` debe ser única y estable entre hermanos.",
            "`{xs.map(x => <li key={x}>{x}</li>)}` turns each item into an element. The `key` must be unique and stable among siblings.",
          ),
          code: "<ul>\n  {nombres.map(n => <li key={n}>{n}</li>)}\n</ul>",
        },
        {
          heading: P("filter antes de map", "filter before map"),
          body: P(
            "Para pintar sólo algunos, filtra y luego mapea: ambos devuelven arrays, así que se encadenan.",
            "To render only some, filter and then map: both return arrays, so they chain.",
          ),
          code: "{numeros.filter(n => n >= 50)\n        .map(n => <li key={n}>{n}</li>)}",
        },
        {
          heading: P("Contar y vacío", "Count and empty"),
          body: P(
            "`items.length` da el número de elementos. Un array vacío no pinta nada: no hace falta un caso especial.",
            "`items.length` gives the element count. An empty array renders nothing: no special case needed.",
          ),
          code: "<p>{items.length}</p>\n// [] -> <ul></ul>",
        },
      ],
      keyTakeaway: P(
        "map convierte un array en elementos (con key única y estable entre hermanos); filter+map pinta sólo algunos; length cuenta; un array vacío no pinta nada.",
        "map turns an array into elements (with a unique, stable key among siblings); filter+map renders only some; length counts; an empty array renders nothing.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P(
      "Graba en la puerta la lista de nombres que abren el paso. Un `<li>` por cada uno.",
      "Engrave on the door the list of names that open the way. One `<li>` per name.",
    ),
    challenge: {
      topic: P("map a una lista", "map to a list"),
      instructions: P(
        "Escribe `ListaNombres` que reciba `nombres` (array de strings) y devuelva un `<ul>` con un `<li key={n}>{n}</li>` por cada nombre.\n\n`render(<ListaNombres nombres={[\"Frodo\",\"Sam\"]} />)` → `\"<ul><li>Frodo</li><li>Sam</li></ul>\"`.",
        "Write `ListaNombres` taking `nombres` (array of strings) and returning a `<ul>` with one `<li key={n}>{n}</li>` per name.\n\n`render(<ListaNombres nombres={[\"Frodo\",\"Sam\"]} />)` → `\"<ul><li>Frodo</li><li>Sam</li></ul>\"`.",
      ),
      starter_code: "function ListaNombres({ nombres }) {\n}\n",
      blocks: [
        "function ListaNombres({ nombres }) {",
        "  return <ul>{nombres.map(n => <li key={n}>{n}</li>)}</ul>;",
        "}",
        "  return <ul>{nombres.forEach(n => <li>{n}</li>)}</ul>;",
        "  return <ul><li>{nombres}</li></ul>;",
      ],
      hints: [
        P("`nombres.map(n => <li key={n}>{n}</li>)`.", "`nombres.map(n => <li key={n}>{n}</li>)`."),
        P("Envuélvelo en un `<ul>`.", "Wrap it in a `<ul>`."),
      ],
      test_cases: [
        { input: 'render(<ListaNombres nombres={["Frodo","Sam"]} />)', expected: "<ul><li>Frodo</li><li>Sam</li></ul>", description: P("Dos nombres", "Two names"), raw: true },
        { input: "render(<ListaNombres nombres={[]} />)", expected: "<ul></ul>", description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P(
      "Sólo los golpes FUERTES cuentan. Pinta únicamente los números de 50 o más.",
      "Only the STRONG blows count. Render only the numbers of 50 or more.",
    ),
    challenge: {
      topic: P("filter + map", "filter + map"),
      instructions: P(
        "Escribe `Fuertes` que reciba `numeros` (array) y devuelva un `<ul>` con un `<li key={n}>{n}</li>` SÓLO por cada número MAYOR O IGUAL que 50.\n\n`render(<Fuertes numeros={[10,50,90,30]} />)` → `\"<ul><li>50</li><li>90</li></ul>\"`.",
        "Write `Fuertes` taking `numeros` (array) and returning a `<ul>` with a `<li key={n}>{n}</li>` ONLY for each number GREATER THAN OR EQUAL to 50.\n\n`render(<Fuertes numeros={[10,50,90,30]} />)` → `\"<ul><li>50</li><li>90</li></ul>\"`.",
      ),
      starter_code: "function Fuertes({ numeros }) {\n}\n",
      blocks: [
        "function Fuertes({ numeros }) {",
        "  return <ul>{numeros.filter(n => n >= 50).map(n => <li key={n}>{n}</li>)}</ul>;",
        "}",
        "  return <ul>{numeros.map(n => <li key={n}>{n}</li>)}</ul>;",
        "  return <ul>{numeros.filter(n => n >= 50)}</ul>;",
      ],
      hints: [
        P("Filtra: `numeros.filter(n => n >= 50)`.", "Filter: `numeros.filter(n => n >= 50)`."),
        P("Luego mapea a `<li>`.", "Then map to `<li>`."),
      ],
      test_cases: [
        { input: "render(<Fuertes numeros={[10,50,90,30]} />)", expected: "<ul><li>50</li><li>90</li></ul>", description: P("50 y 90", "50 and 90"), raw: true },
        { input: "render(<Fuertes numeros={[1,2]} />)", expected: "<ul></ul>", description: P("Ninguno llega", "None reaches it"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P(
      "«¡No podéis pasar!» Cuenta cuántos enemigos aguardan al otro lado.",
      "\"You cannot pass!\" Count how many enemies wait on the other side.",
    ),
    challenge: {
      topic: P("length en JSX", "length in JSX"),
      instructions: P(
        "Escribe `Cuenta` que reciba `items` (array) y devuelva un `<p>` con el NÚMERO de elementos.\n\n`render(<Cuenta items={[1,2,3]} />)` → `\"<p>3</p>\"`.",
        "Write `Cuenta` taking `items` (array) and returning a `<p>` with the NUMBER of elements.\n\n`render(<Cuenta items={[1,2,3]} />)` → `\"<p>3</p>\"`.",
      ),
      starter_code: "function Cuenta({ items }) {\n}\n",
      blocks: [
        "function Cuenta({ items }) {",
        "  return <p>{items.length}</p>;",
        "}",
        "  return <p>{items.count()}</p>;",
        "  return <p>{items}</p>;",
      ],
      hints: [
        P("`items.length` es el número de elementos (sin paréntesis).", "`items.length` is the element count (no parentheses)."),
        P("Incrústalo en un `<p>`.", "Embed it in a `<p>`."),
      ],
      test_cases: [
        { input: "render(<Cuenta items={[1,2,3]} />)", expected: "<p>3</p>", description: P("Tres", "Three"), raw: true },
        { input: "render(<Cuenta items={[]} />)", expected: "<p>0</p>", description: P("Ninguno", "None"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P(
      "Cada enemigo llega con su nombre en un objeto. Extrae y pinta cada nombre.",
      "Each enemy arrives with its name in an object. Pull out and paint each name.",
    ),
    challenge: {
      topic: P("map sobre objetos", "map over objects"),
      instructions: P(
        "Escribe `Enemigos` que reciba `lista` (array de `{ nombre }`) y devuelva un `<ul>` con un `<li key={e.nombre}>{e.nombre}</li>` por cada objeto.\n\n`render(<Enemigos lista={[{nombre:\"orco\"},{nombre:\"trol\"}]} />)` → `\"<ul><li>orco</li><li>trol</li></ul>\"`.",
        "Write `Enemigos` taking `lista` (array of `{ nombre }`) and returning a `<ul>` with a `<li key={e.nombre}>{e.nombre}</li>` per object.\n\n`render(<Enemigos lista={[{nombre:\"orco\"},{nombre:\"trol\"}]} />)` → `\"<ul><li>orco</li><li>trol</li></ul>\"`.",
      ),
      starter_code: "function Enemigos({ lista }) {\n}\n",
      blocks: [
        "function Enemigos({ lista }) {",
        "  return <ul>{lista.map(e => <li key={e.nombre}>{e.nombre}</li>)}</ul>;",
        "}",
        "  return <ul>{lista.map(e => <li key={e}>{e}</li>)}</ul>;",
        "  return <ul>{lista.nombre}</ul>;",
      ],
      hints: [
        P("Cada elemento es un objeto: usa `e.nombre`.", "Each element is an object: use `e.nombre`."),
        P("`key={e.nombre}` y muestra `{e.nombre}`.", "`key={e.nombre}` and show `{e.nombre}`."),
      ],
      test_cases: [
        { input: 'render(<Enemigos lista={[{nombre:"orco"},{nombre:"trol"}]} />)', expected: "<ul><li>orco</li><li>trol</li></ul>", description: P("Dos enemigos", "Two enemies"), raw: true },
        { input: 'render(<Enemigos lista={[{nombre:"uruk"}]} />)', expected: "<ul><li>uruk</li></ul>", description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 7 · Composición y children
 * ===================================================================== */
const Q_R7_CHILDREN = {
  question: P("¿Qué es la prop `children` de un componente?", "What is a component's `children` prop?"),
  options: [
    P("Lo que se escribe ENTRE sus etiquetas: `<Marco>esto</Marco>`", "Whatever is written BETWEEN its tags: `<Marco>this</Marco>`"),
    P("Sus componentes hijos del fichero", "Its child components in the file"),
    P("Una lista de sus props", "A list of its props"),
    P("El componente padre", "The parent component"),
  ],
  correct: 0,
  explanation: P(
    "`children` es el contenido entre la etiqueta de apertura y cierre. El componente lo coloca donde quiera con `{children}`. Así se hacen envoltorios y layouts reutilizables.",
    "`children` is the content between the opening and closing tags. The component places it wherever with `{children}`. That's how you build reusable wrappers and layouts.",
  ),
};
const Q_R7_USE = {
  question: P("¿Cómo usa un componente a OTRO dentro de su JSX?", "How does one component use ANOTHER inside its JSX?"),
  options: [
    P("Como una etiqueta: `<Tarjeta titulo=\"x\" />`", "As a tag: `<Tarjeta titulo=\"x\" />`"),
    P("Llamándolo: `Tarjeta(props)`", "Calling it: `Tarjeta(props)`"),
    P("Con `import` en el return", "With `import` in the return"),
    P("No se pueden anidar", "You can't nest them"),
  ],
  correct: 0,
  explanation: P(
    "La composición es el corazón de React: un componente usa a otro como una etiqueta y le pasa props. Se construyen interfaces complejas combinando piezas simples.",
    "Composition is the heart of React: a component uses another like a tag and passes it props. You build complex interfaces by combining simple pieces.",
  ),
};
const Q_R7_WRAPPER = {
  question: P("¿Para qué sirve un componente 'envoltorio' que usa `children`?", "What is a 'wrapper' component using `children` for?"),
  options: [
    P("Reutilizar una estructura (marco, tarjeta, layout) alrededor de contenido variable", "Reuse a structure (frame, card, layout) around variable content"),
    P("Copiar props automáticamente", "Copy props automatically"),
    P("Evitar el uso de JSX", "Avoid using JSX"),
    P("Convertir HTML en React", "Turn HTML into React"),
  ],
  correct: 0,
  explanation: P(
    "Un envoltorio define una vez el borde/estilo y coloca dentro el `children`: `<Tarjeta><Lo que sea/></Tarjeta>`. Cambias el contenido sin repetir la estructura.",
    "A wrapper defines the border/style once and places `children` inside: `<Card><Anything/></Card>`. You change the content without repeating the structure.",
  ),
};
const Q_R7_PLACE = {
  question: P("¿Dónde aparece el contenido pasado como children?", "Where does the content passed as children appear?"),
  options: [
    P("Donde el componente escriba `{children}`", "Wherever the component writes `{children}`"),
    P("Siempre al principio", "Always at the start"),
    P("Siempre al final", "Always at the end"),
    P("No se puede controlar", "You can't control it"),
  ],
  correct: 0,
  explanation: P(
    "El componente decide la posición: puede envolver `{children}` con cabecera, pie, bordes… Tú controlas el marco; quien lo usa controla el contenido.",
    "The component decides the position: it can wrap `{children}` with a header, footer, borders… You control the frame; the user controls the content.",
  ),
};
const Q_R7_SPREAD = {
  question: P("¿Qué hace `<Boton {...props} />`?", "What does `<Boton {...props} />` do?"),
  options: [
    P("Pasa todas las propiedades de `props` como props del Botón", "Passes all of `props`'s properties as the Button's props"),
    P("Crea un array de botones", "Creates an array of buttons"),
    P("Copia el estado", "Copies the state"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "El spread `{...props}` reparte cada propiedad del objeto como una prop. Útil para reenviar props a un componente hijo sin listarlas una a una.",
    "The spread `{...props}` scatters each property of the object as a prop. Handy to forward props to a child component without listing them one by one.",
  ),
};
const Q_R7_NAMED = {
  question: P("¿Puede un componente recibir props CON NOMBRE y `children` a la vez?", "Can a component receive NAMED props and `children` at once?"),
  options: [
    P("Sí: `function Tarjeta({ titulo, children })`", "Yes: `function Tarjeta({ titulo, children })`"),
    P("No, o props o children", "No, either props or children"),
    P("Sólo con un array", "Only with an array"),
    P("Sólo children", "Only children"),
  ],
  correct: 0,
  explanation: P(
    "`children` es una prop más: se puede desestructurar junto a las demás. `<Tarjeta titulo=\"Capa\">contenido</Tarjeta>` pasa `titulo` y `children` a la vez.",
    "`children` is just another prop: you can destructure it alongside the rest. `<Card titulo=\"Cloak\">content</Card>` passes `titulo` and `children` together.",
  ),
};
const Q_R7_MULTI = {
  question: P("Si pones VARIOS elementos entre `<Marco>...</Marco>`, ¿qué es `children`?", "If you put SEVERAL elements between `<Marco>...</Marco>`, what is `children`?"),
  options: [
    P("Un array con todos ellos; React lo pinta solo con `{children}`", "An array with all of them; React paints it with `{children}` on its own"),
    P("Sólo el primero", "Only the first"),
    P("Un error", "An error"),
    P("Un string concatenado", "A concatenated string"),
  ],
  correct: 0,
  explanation: P(
    "`children` puede ser uno o varios hijos; React renderiza ambos casos igual con `{children}`. No hace falta recorrerlo a mano.",
    "`children` can be one or several children; React renders both the same with `{children}`. No need to iterate it by hand.",
  ),
};
const Q_R7_NEST = {
  question: P("¿Se pueden anidar componentes de composición?", "Can you nest composition components?"),
  options: [
    P("Sí: `<Panel><Tarjeta>...</Tarjeta></Panel>`", "Yes: `<Panel><Card>...</Card></Panel>`"),
    P("No, sólo un nivel", "No, only one level"),
    P("Sólo dos niveles", "Only two levels"),
    P("Sólo con la misma etiqueta", "Only with the same tag"),
  ],
  correct: 0,
  explanation: P(
    "La composición se anida libremente: un envoltorio contiene a otro, que contiene contenido. Así se arman layouts complejos con piezas pequeñas y reutilizables.",
    "Composition nests freely: a wrapper contains another, which contains content. That's how complex layouts are built from small, reusable pieces.",
  ),
};
const Q_R7_REUSE = {
  question: P("¿Cuál es la ventaja principal de componer con componentes pequeños?", "What's the main advantage of composing with small components?"),
  options: [
    P("Reutilizar y combinar piezas simples para formar interfaces complejas", "Reuse and combine simple pieces to form complex UIs"),
    P("Que el HTML sea más largo", "Make the HTML longer"),
    P("Evitar usar props", "Avoid using props"),
    P("Que todo esté en un solo componente", "Keep everything in a single component"),
  ],
  correct: 0,
  explanation: P(
    "Piezas pequeñas y enfocadas se prueban, entienden y reutilizan mejor. La UI compleja emerge de combinarlas, no de un componente gigante.",
    "Small, focused pieces are easier to test, understand and reuse. Complex UI emerges from combining them, not from one giant component.",
  ),
};

export const SYL_REACT_COMMUNITY_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_R7_CHILDREN, Q_R7_USE, Q_R7_WRAPPER] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_R7_PLACE, Q_R7_NAMED, Q_R7_MULTI] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_R7_SPREAD, Q_R7_NEST, Q_R7_REUSE] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P(
      "Uglúk arma su panel de guerra: un título y la lista de sus tropas, todo en un componente compuesto.",
      "Uglúk sets up his war panel: a title and the list of his troops, all in one composed component.",
    ),
    challenge: {
      topic: P("Composición: título + lista", "Composition: title + list"),
      instructions: P(
        "Escribe `Panel` que reciba `titulo` (string) e `items` (array). Devuelve un `<section>` con un `<h1>{titulo}</h1>` y un `<ul>` con un `<li key={i}>{i}</li>` por cada item.\n\n`render(<Panel titulo=\"Dones\" items={[\"luz\",\"cuerda\"]} />)` → `\"<section><h1>Dones</h1><ul><li>luz</li><li>cuerda</li></ul></section>\"`.",
        "Write `Panel` taking `titulo` (string) and `items` (array). Return a `<section>` with an `<h1>{titulo}</h1>` and a `<ul>` with a `<li key={i}>{i}</li>` per item.\n\n`render(<Panel titulo=\"Dones\" items={[\"luz\",\"cuerda\"]} />)` → `\"<section><h1>Dones</h1><ul><li>luz</li><li>cuerda</li></ul></section>\"`.",
      ),
      starter_code: "function Panel({ titulo, items }) {\n}\n",
      blocks: [
        "function Panel({ titulo, items }) {",
        "  return (",
        "    <section>",
        "      <h1>{titulo}</h1>",
        "      <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>",
        "    </section>",
        "  );",
        "}",
        "  return <section>{titulo}{items}</section>;",
      ],
      hints: [
        P("Un `<section>` con el `<h1>` y el `<ul>` dentro.", "A `<section>` with the `<h1>` and the `<ul>` inside."),
        P("La lista: `items.map(i => <li key={i}>{i}</li>)`.", "The list: `items.map(i => <li key={i}>{i}</li>)`."),
      ],
      test_cases: [
        { input: 'render(<Panel titulo="Dones" items={["luz","cuerda"]} />)', expected: "<section><h1>Dones</h1><ul><li>luz</li><li>cuerda</li></ul></section>", description: P("Título + lista", "Title + list"), raw: true },
        { input: 'render(<Panel titulo="Vacío" items={[]} />)', expected: "<section><h1>Vacío</h1><ul></ul></section>", description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de la Composición", "The Scroll of Composition"),
    lore_intro: P(
      "Galadriel entrega un pergamino: enseña a envolver contenido con `children` y a componer piezas.",
      "Galadriel gives a scroll: it teaches how to wrap content with `children` and compose pieces.",
    ),
    scroll: {
      topic: P("Composición y children", "Composition and children"),
      sections: [
        {
          heading: P("children: el contenido de dentro", "children: the content inside"),
          body: P(
            "Lo que pones entre `<Marco>` y `</Marco>` llega como `children`. El componente lo coloca con `{children}`.",
            "What you put between `<Marco>` and `</Marco>` arrives as `children`. The component places it with `{children}`.",
          ),
          code: "function Marco({ children }) {\n  return <div className=\"marco\">{children}</div>;\n}",
        },
        {
          heading: P("props con nombre + children", "named props + children"),
          body: P(
            "`children` es una prop más: se desestructura junto a las demás. Así una `Tarjeta` recibe `titulo` y contenido.",
            "`children` is just another prop: destructure it with the rest. So a `Card` takes `titulo` and content.",
          ),
          code: "function Tarjeta({ titulo, children }) {\n  return <div><h2>{titulo}</h2><div>{children}</div></div>;\n}",
        },
        {
          heading: P("Componer piezas", "Composing pieces"),
          body: P(
            "Un componente usa a otro como etiqueta. Anida libremente para formar layouts a partir de piezas simples.",
            "A component uses another as a tag. Nest freely to form layouts from simple pieces.",
          ),
          code: "function Saludo({ nombre }) {\n  return <Marco>Hola {nombre}</Marco>;\n}",
        },
      ],
      keyTakeaway: P(
        "children es el contenido entre etiquetas; el componente lo coloca con {children}. Se combina con props con nombre. Componer piezas pequeñas (y anidarlas) forma UIs complejas.",
        "children is the content between tags; the component places it with {children}. It combines with named props. Composing small pieces (and nesting them) forms complex UIs.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "Galadriel's Phial"),
    lore_intro: P(
      "El frasco es un marco que envuelve cualquier luz. Escribe el envoltorio con `children`.",
      "The phial is a frame that wraps any light. Write the wrapper with `children`.",
    ),
    challenge: {
      topic: P("children en un envoltorio", "children in a wrapper"),
      instructions: P(
        "Escribe `Marco` que devuelva un `<div className=\"marco\">` con su `children` dentro.\n\n`render(<Marco>luz</Marco>)` → `'<div class=\"marco\">luz</div>'`.",
        "Write `Marco` returning a `<div className=\"marco\">` with its `children` inside.\n\n`render(<Marco>luz</Marco>)` → `'<div class=\"marco\">luz</div>'`.",
      ),
      starter_code: "function Marco({ children }) {\n}\n",
      blocks: [
        "function Marco({ children }) {",
        '  return <div className="marco">{children}</div>;',
        "}",
        '  return <div class="marco">{children}</div>;',
        '  return <div className="marco">children</div>;',
      ],
      hints: [
        P("Desestructura `children` y colócalo con `{children}`.", "Destructure `children` and place it with `{children}`."),
        P("En JSX es `className`, no `class`.", "In JSX it's `className`, not `class`."),
      ],
      test_cases: [
        { input: "render(<Marco>luz</Marco>)", expected: '<div class="marco">luz</div>', description: P("Envuelve el contenido", "Wraps the content"), raw: true },
        { input: "render(<Marco>Eärendil</Marco>)", expected: '<div class="marco">Eärendil</div>', description: P("Otro contenido", "Other content"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P(
      "Una tarjeta con título y contenido: props con nombre y `children` juntos.",
      "A card with a title and content: named props and `children` together.",
    ),
    challenge: {
      topic: P("props con nombre + children", "named props + children"),
      instructions: P(
        "Escribe `Tarjeta` que reciba `titulo` y `children`. Devuelve un `<div>` que contenga un `<h2>{titulo}</h2>` y un `<div>{children}</div>`.\n\n`render(<Tarjeta titulo=\"Capa\">gris</Tarjeta>)` → `\"<div><h2>Capa</h2><div>gris</div></div>\"`.",
        "Write `Tarjeta` taking `titulo` and `children`. Return a `<div>` containing an `<h2>{titulo}</h2>` and a `<div>{children}</div>`.\n\n`render(<Tarjeta titulo=\"Capa\">gris</Tarjeta>)` → `\"<div><h2>Capa</h2><div>gris</div></div>\"`.",
      ),
      starter_code: "function Tarjeta({ titulo, children }) {\n}\n",
      blocks: [
        "function Tarjeta({ titulo, children }) {",
        "  return <div><h2>{titulo}</h2><div>{children}</div></div>;",
        "}",
        "  return <div><h2>{children}</h2><div>{titulo}</div></div>;",
        "  return <div>{titulo}{children}</div>;",
      ],
      hints: [
        P("Desestructura ambos: `{ titulo, children }`.", "Destructure both: `{ titulo, children }`."),
        P("Título en `<h2>`, contenido en un `<div>`.", "Title in `<h2>`, content in a `<div>`."),
      ],
      test_cases: [
        { input: 'render(<Tarjeta titulo="Capa">gris</Tarjeta>)', expected: "<div><h2>Capa</h2><div>gris</div></div>", description: P("Título y contenido", "Title and content"), raw: true },
        { input: 'render(<Tarjeta titulo="Frasco">luz</Tarjeta>)', expected: "<div><h2>Frasco</h2><div>luz</div></div>", description: P("Otra tarjeta", "Another card"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P(
      "Compón dos piezas: un marco reutilizable y un saludo que lo usa.",
      "Compose two pieces: a reusable frame and a greeting that uses it.",
    ),
    challenge: {
      topic: P("Componer dos componentes", "Composing two components"),
      instructions: P(
        "Escribe DOS componentes:\n• `Marco` que devuelva `<div className=\"marco\">{children}</div>`,\n• `Saludo` que reciba `nombre` y devuelva `<Marco>Hola {nombre}</Marco>`.\n\n`render(<Saludo nombre=\"Sam\" />)` → `'<div class=\"marco\">Hola Sam</div>'`.",
        "Write TWO components:\n• `Marco` returning `<div className=\"marco\">{children}</div>`,\n• `Saludo` taking `nombre` and returning `<Marco>Hola {nombre}</Marco>`.\n\n`render(<Saludo nombre=\"Sam\" />)` → `'<div class=\"marco\">Hola Sam</div>'`.",
      ),
      starter_code: "function Marco({ children }) {\n}\n\nfunction Saludo({ nombre }) {\n}\n",
      blocks: [
        "function Marco({ children }) {",
        '  return <div className="marco">{children}</div>;',
        "}",
        "function Saludo({ nombre }) {",
        "  return <Marco>Hola {nombre}</Marco>;",
        "}",
        "  return <div>Hola {nombre}</div>;",
        "  return Marco(nombre);",
      ],
      hints: [
        P("`Saludo` usa `Marco` como etiqueta y le pasa el saludo como children.", "`Saludo` uses `Marco` as a tag and passes it the greeting as children."),
        P("`<Marco>Hola {nombre}</Marco>`.", "`<Marco>Hola {nombre}</Marco>`."),
      ],
      test_cases: [
        { input: 'render(<Saludo nombre="Sam" />)', expected: '<div class="marco">Hola Sam</div>', description: P("Compuesto", "Composed"), raw: true },
        { input: 'render(<Saludo nombre="Frodo" />)', expected: '<div class="marco">Hola Frodo</div>', description: P("Otro nombre", "Another name"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 8 · Componer estado, props y listas (capstone)
 * ===================================================================== */
const Q_R8_PURE = {
  question: P("¿Qué significa que un componente sea 'puro'?", "What does it mean for a component to be 'pure'?"),
  options: [
    P("Con las mismas props, produce siempre el mismo JSX (sin efectos raros)", "With the same props, it always produces the same JSX (no odd side effects)"),
    P("Que no usa props", "That it uses no props"),
    P("Que no tiene JSX", "That it has no JSX"),
    P("Que es muy corto", "That it's very short"),
  ],
  correct: 0,
  explanation: P(
    "React espera componentes PUROS: mismas props → mismo resultado, sin modificar cosas de fuera durante el render. Eso los hace predecibles y optimizables.",
    "React expects PURE components: same props → same result, without modifying outside things during render. That makes them predictable and optimizable.",
  ),
};
const Q_R8_TOPDOWN = {
  question: P("¿En qué dirección fluyen los datos en React?", "In which direction does data flow in React?"),
  options: [
    P("De padre a hijo, vía props (flujo unidireccional)", "From parent to child, via props (one-way flow)"),
    P("De hijo a padre siempre", "From child to parent always"),
    P("En cualquier dirección", "In any direction"),
    P("No fluyen", "They don't flow"),
  ],
  correct: 0,
  explanation: P(
    "Los datos bajan por props del padre al hijo. Para 'subir' información, el padre pasa una función que el hijo llama. Este flujo único hace la app más fácil de razonar.",
    "Data flows down via props from parent to child. To 'send up' info, the parent passes a function the child calls. This one-way flow makes the app easier to reason about.",
  ),
};
const Q_R8_LIFT = {
  question: P("Dos componentes necesitan compartir un dato que cambia. ¿Dónde va el estado?", "Two components need to share a changing value. Where does the state go?"),
  options: [
    P("En el padre común más cercano (levantar el estado)", "In the nearest common parent (lift the state up)"),
    P("Duplicado en ambos", "Duplicated in both"),
    P("En una variable global suelta", "In a loose global variable"),
    P("No se puede compartir", "You can't share it"),
  ],
  correct: 0,
  explanation: P(
    "'Levantar el estado': se guarda en el ancestro común y se baja por props a los hijos. Así ambos ven el mismo valor y no hay copias que se desincronicen.",
    "'Lifting state up': keep it in the common ancestor and pass it down by props. Both see the same value and there are no copies that drift out of sync.",
  ),
};
const Q_R8_SMALL = {
  question: P("¿Por qué dividir la UI en componentes pequeños?", "Why split the UI into small components?"),
  options: [
    P("Se entienden, prueban y reutilizan mejor", "They're easier to understand, test and reuse"),
    P("El HTML pesa menos", "The HTML weighs less"),
    P("React lo exige", "React requires it"),
    P("Para usar más props", "To use more props"),
  ],
  correct: 0,
  explanation: P(
    "Un componente con una sola responsabilidad es fácil de leer y reutilizar. La pantalla compleja se arma componiendo esos bloques pequeños.",
    "A component with a single responsibility is easy to read and reuse. The complex screen is built by composing those small blocks.",
  ),
};
const Q_R8_DERIVE = {
  question: P("Un valor se puede calcular a partir de las props. ¿Conviene guardarlo también en estado?", "A value can be computed from props. Should you also store it in state?"),
  options: [
    P("No: se DERIVA en el render; duplicarlo en estado causa desincronización", "No: DERIVE it during render; duplicating it in state causes drift"),
    P("Sí, siempre", "Yes, always"),
    P("Sólo si es un número", "Only if it's a number"),
    P("Sólo con useEffect", "Only with useEffect"),
  ],
  correct: 0,
  explanation: P(
    "Lo que se puede calcular de las props o del estado se calcula al vuelo en el render (valor derivado). Guardarlo aparte obliga a mantener dos fuentes de verdad sincronizadas.",
    "Whatever can be computed from props or state is computed on the fly in render (derived value). Storing it separately forces you to keep two sources of truth in sync.",
  ),
};
const Q_R8_FRAGMENT = {
  question: P("¿Cómo devuelves DOS elementos hermanos sin añadir un `<div>` extra?", "How do you return TWO sibling elements without adding an extra `<div>`?"),
  options: [
    P("Con un Fragment: `<>...</>`", "With a Fragment: `<>...</>`"),
    P("Con dos returns", "With two returns"),
    P("Con una coma", "With a comma"),
    P("No se puede", "You can't"),
  ],
  correct: 0,
  explanation: P(
    "Un componente devuelve UN nodo raíz. El Fragment `<>...</>` agrupa varios hermanos sin crear un elemento extra en el HTML. Útil para no ensuciar el árbol.",
    "A component returns ONE root node. The Fragment `<>...</>` groups several siblings without creating an extra element in the HTML. Handy to keep the tree clean.",
  ),
};
const Q_R8_CONDLIST = {
  question: P("¿Cómo pintas una lista SÓLO de los elementos activos?", "How do you render a list of ONLY the active items?"),
  options: [
    P("Combinando filter y map: `xs.filter(x => x.activo).map(...)`", "Combining filter and map: `xs.filter(x => x.activo).map(...)`"),
    P("Con dos componentes distintos", "With two different components"),
    P("Sólo con un if antes", "Only with an if before"),
    P("No se puede combinar", "You can't combine them"),
  ],
  correct: 0,
  explanation: P(
    "Condición + lista es el patrón diario del analista de UI: `filter` quita los que no cumplen y `map` convierte el resto en JSX. Todo dentro de las llaves.",
    "Condition + list is the UI builder's daily pattern: `filter` drops non-matches and `map` turns the rest into JSX. All inside the braces.",
  ),
};
const Q_R8_KEY = {
  question: P("En una lista con estado que se reordena, ¿qué `key` usas?", "In a stateful list that reorders, which `key` do you use?"),
  options: [
    P("Un id estable del dato, no el índice", "A stable id from the data, not the index"),
    P("El índice del array", "The array index"),
    P("Math.random()", "Math.random()"),
    P("Ninguna", "None"),
  ],
  correct: 0,
  explanation: P(
    "Una `key` estable (un id) mantiene la identidad de cada fila al reordenar, conservando su estado. El índice o `Math.random()` rompen esa identidad.",
    "A stable `key` (an id) keeps each row's identity when reordering, preserving its state. The index or `Math.random()` break that identity.",
  ),
};
const Q_R8_ONEWAY = {
  question: P("¿Cómo hace un hijo para avisar al padre de un cambio?", "How does a child notify the parent of a change?"),
  options: [
    P("El padre le pasa una FUNCIÓN por props, y el hijo la llama", "The parent passes it a FUNCTION via props, and the child calls it"),
    P("El hijo modifica el estado del padre directamente", "The child mutates the parent's state directly"),
    P("Con una variable global", "With a global variable"),
    P("No puede avisar", "It can't notify"),
  ],
  correct: 0,
  explanation: P(
    "Los datos bajan por props; los eventos suben llamando a un callback que el padre pasó (`onCambio`). El hijo no toca el estado del padre: sólo avisa.",
    "Data flows down via props; events flow up by calling a callback the parent passed (`onChange`). The child doesn't touch the parent's state: it only notifies.",
  ),
};

export const SYL_REACT_COMMUNITY_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_R8_PURE, Q_R8_TOPDOWN, Q_R8_ONEWAY] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_R8_LIFT, Q_R8_SMALL, Q_R8_DERIVE] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_R8_FRAGMENT, Q_R8_CONDLIST, Q_R8_KEY] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P(
      "El informe final de Lurtz: un título con su nombre y la lista SÓLO de los soldados que siguen vivos. Combina props, condición, filtro y composición.",
      "Lurtz's final report: a title with his name and the list of ONLY the soldiers still alive. Combine props, condition, filter and composition.",
    ),
    challenge: {
      topic: P("Capstone: props + filtro + lista + composición", "Capstone: props + filter + list + composition"),
      instructions: P(
        "Escribe `Ejercito` que reciba `nombre` (string) y `soldados` (array de `{ nombre, vivo }`). Devuelve un `<section>` con un `<h1>{nombre}</h1>` y un `<ul>` que contenga un `<li key={s.nombre}>{s.nombre}</li>` SÓLO por cada soldado con `vivo` true.\n\n`render(<Ejercito nombre=\"Isengard\" soldados={[{nombre:\"a\",vivo:true},{nombre:\"b\",vivo:false}]} />)` → `\"<section><h1>Isengard</h1><ul><li>a</li></ul></section>\"`.",
        "Write `Ejercito` taking `nombre` (string) and `soldados` (array of `{ nombre, vivo }`). Return a `<section>` with an `<h1>{nombre}</h1>` and a `<ul>` containing a `<li key={s.nombre}>{s.nombre}</li>` ONLY for each soldier with `vivo` true.\n\n`render(<Ejercito nombre=\"Isengard\" soldados={[{nombre:\"a\",vivo:true},{nombre:\"b\",vivo:false}]} />)` → `\"<section><h1>Isengard</h1><ul><li>a</li></ul></section>\"`.",
      ),
      starter_code: "function Ejercito({ nombre, soldados }) {\n}\n",
      blocks: [
        "function Ejercito({ nombre, soldados }) {",
        "  return (",
        "    <section>",
        "      <h1>{nombre}</h1>",
        "      <ul>{soldados.filter(s => s.vivo).map(s => <li key={s.nombre}>{s.nombre}</li>)}</ul>",
        "    </section>",
        "  );",
        "}",
        "      <ul>{soldados.map(s => <li key={s.nombre}>{s.nombre}</li>)}</ul>",
        "      <h1>{soldados}</h1>",
      ],
      hints: [
        P("Título con `<h1>{nombre}</h1>`.", "Title with `<h1>{nombre}</h1>`."),
        P("Lista filtrada: `soldados.filter(s => s.vivo).map(...)`.", "Filtered list: `soldados.filter(s => s.vivo).map(...)`."),
      ],
      test_cases: [
        { input: 'render(<Ejercito nombre="Isengard" soldados={[{nombre:"a",vivo:true},{nombre:"b",vivo:false},{nombre:"c",vivo:true}]} />)', expected: "<section><h1>Isengard</h1><ul><li>a</li><li>c</li></ul></section>", description: P("Sólo los vivos", "Only the living"), raw: true },
        { input: 'render(<Ejercito nombre="Solo" soldados={[]} />)', expected: "<section><h1>Solo</h1><ul></ul></section>", description: P("Sin soldados", "No soldiers"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino del Cierre", "The Scroll of the Close"),
    lore_intro: P(
      "En Amon Hen, un último pergamino reúne todo: props que bajan, condición, listas y composición.",
      "At Amon Hen, a last scroll gathers it all: props flowing down, condition, lists and composition.",
    ),
    scroll: {
      topic: P("Componer props, condición y listas", "Composing props, condition and lists"),
      sections: [
        {
          heading: P("Flujo unidireccional", "One-way data flow"),
          body: P(
            "Los datos BAJAN por props (padre → hijo). Para avisar hacia arriba, el padre pasa una función que el hijo llama.",
            "Data flows DOWN via props (parent → child). To notify upward, the parent passes a function the child calls.",
          ),
          code: "<Fila dato={d} onBorrar={() => quitar(d.id)} />",
        },
        {
          heading: P("Valores derivados", "Derived values"),
          body: P(
            "Lo que se puede calcular de props/estado, se calcula en el render. No lo dupliques en estado: evita fuentes de verdad desincronizadas.",
            "Whatever can be computed from props/state is computed in render. Don't duplicate it in state: avoid out-of-sync sources of truth.",
          ),
          code: "const vivos = soldados.filter(s => s.vivo);\nreturn <p>{vivos.length} en pie</p>;",
        },
        {
          heading: P("Todo junto", "All together"),
          body: P(
            "Un componente combina props, condición (ternario/&&), listas (filter+map) y composición. Con Fragment `<>...</>` agrupas sin un div extra.",
            "A component combines props, condition (ternary/&&), lists (filter+map) and composition. With Fragment `<>...</>` you group without an extra div.",
          ),
          code: "<section>\n  <h1>{nombre}</h1>\n  <ul>{items.filter(...).map(...)}</ul>\n</section>",
        },
      ],
      keyTakeaway: P(
        "Componentes puros con flujo unidireccional (props bajan, callbacks suben); deriva en el render en vez de duplicar estado; combina condición + filter/map; Fragment agrupa sin nodo extra.",
        "Pure components with one-way flow (props down, callbacks up); derive in render instead of duplicating state; combine condition + filter/map; Fragment groups without an extra node.",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P(
      "Cada objeto se marca como tomado o libre con una clase. Prop booleana + clase condicional.",
      "Each item is marked taken or free with a class. Boolean prop + conditional class.",
    ),
    challenge: {
      topic: P("Prop booleana y clase condicional", "Boolean prop and conditional class"),
      instructions: P(
        "Escribe `Item` que reciba `nombre` (string) y `tomado` (booleano) y devuelva un `<li>` con `className=\"tomado\"` si `tomado` es true o `\"libre\"` si es false, mostrando el `nombre`.\n\n`render(<Item nombre=\"Anillo\" tomado={true} />)` → `'<li class=\"tomado\">Anillo</li>'`.",
        "Write `Item` taking `nombre` (string) and `tomado` (boolean) and returning a `<li>` with `className=\"tomado\"` if `tomado` is true or `\"libre\"` if false, showing the `nombre`.\n\n`render(<Item nombre=\"Anillo\" tomado={true} />)` → `'<li class=\"tomado\">Anillo</li>'`.",
      ),
      starter_code: "function Item({ nombre, tomado }) {\n}\n",
      blocks: [
        "function Item({ nombre, tomado }) {",
        '  return <li className={tomado ? "tomado" : "libre"}>{nombre}</li>;',
        "}",
        '  return <li class={tomado ? "tomado" : "libre"}>{nombre}</li>;',
        '  return <li className={tomado}>{nombre}</li>;',
      ],
      hints: [
        P("`className={tomado ? 'tomado' : 'libre'}`.", "`className={tomado ? 'tomado' : 'libre'}`."),
        P("Muestra el `{nombre}` dentro del `<li>`.", "Show the `{nombre}` inside the `<li>`."),
      ],
      test_cases: [
        { input: 'render(<Item nombre="Anillo" tomado={true} />)', expected: '<li class="tomado">Anillo</li>', description: P("Tomado", "Taken"), raw: true },
        { input: 'render(<Item nombre="Anillo" tomado={false} />)', expected: '<li class="libre">Anillo</li>', description: P("Libre", "Free"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P(
      "La visión se muestra resaltada o normal según esté activa. El ternario elige entre DOS elementos.",
      "The vision shows highlighted or plain depending on whether it's active. The ternary chooses between TWO elements.",
    ),
    challenge: {
      topic: P("Ternario entre dos elementos", "Ternary between two elements"),
      instructions: P(
        "Escribe `Insignia` que reciba `texto` (string) y `activa` (booleano). Si `activa` es true, devuelve `<strong>{texto}</strong>`; si es false, `<span>{texto}</span>`.\n\n`render(<Insignia texto=\"Visión\" activa={true} />)` → `\"<strong>Visión</strong>\"`.",
        "Write `Insignia` taking `texto` (string) and `activa` (boolean). If `activa` is true, return `<strong>{texto}</strong>`; if false, `<span>{texto}</span>`.\n\n`render(<Insignia texto=\"Visión\" activa={true} />)` → `\"<strong>Visión</strong>\"`.",
      ),
      starter_code: "function Insignia({ texto, activa }) {\n}\n",
      blocks: [
        "function Insignia({ texto, activa }) {",
        "  return activa ? <strong>{texto}</strong> : <span>{texto}</span>;",
        "}",
        "  return <strong>{activa}</strong>;",
        "  return activa && <strong>{texto}</strong>;",
      ],
      hints: [
        P("El ternario devuelve un elemento u otro: `activa ? <strong>...</strong> : <span>...</span>`.", "The ternary returns one element or another: `activa ? <strong>...</strong> : <span>...</span>`."),
        P("Ambas ramas muestran `{texto}`.", "Both branches show `{texto}`."),
      ],
      test_cases: [
        { input: 'render(<Insignia texto="Visión" activa={true} />)', expected: "<strong>Visión</strong>", description: P("Activa: resaltada", "Active: highlighted"), raw: true },
        { input: 'render(<Insignia texto="Visión" activa={false} />)', expected: "<span>Visión</span>", description: P("Inactiva: normal", "Inactive: plain"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P(
      "Cada tropa llega con su nombre y su cantidad. Píntalas como `nombre: cantidad`.",
      "Each troop arrives with its name and count. Render them as `name: count`.",
    ),
    challenge: {
      topic: P("map con varios campos", "map with several fields"),
      instructions: P(
        "Escribe `Hueste` que reciba `tropas` (array de `{ nombre, n }`) y devuelva un `<ul>` con un `<li key={t.nombre}>{t.nombre}: {t.n}</li>` por cada tropa.\n\n`render(<Hueste tropas={[{nombre:\"orco\",n:5}]} />)` → `\"<ul><li>orco: 5</li></ul>\"`.",
        "Write `Hueste` taking `tropas` (array of `{ nombre, n }`) and returning a `<ul>` with a `<li key={t.nombre}>{t.nombre}: {t.n}</li>` per troop.\n\n`render(<Hueste tropas={[{nombre:\"orco\",n:5}]} />)` → `\"<ul><li>orco: 5</li></ul>\"`.",
      ),
      starter_code: "function Hueste({ tropas }) {\n}\n",
      blocks: [
        "function Hueste({ tropas }) {",
        "  return <ul>{tropas.map(t => <li key={t.nombre}>{t.nombre}: {t.n}</li>)}</ul>;",
        "}",
        "  return <ul>{tropas.map(t => <li key={t.nombre}>{t}</li>)}</ul>;",
        "  return <ul>{tropas.nombre}: {tropas.n}</ul>;",
      ],
      hints: [
        P("Cada tropa es `{ nombre, n }`: muestra `{t.nombre}: {t.n}`.", "Each troop is `{ nombre, n }`: show `{t.nombre}: {t.n}`."),
        P("`key={t.nombre}`.", "`key={t.nombre}`."),
      ],
      test_cases: [
        { input: 'render(<Hueste tropas={[{nombre:"orco",n:5},{nombre:"uruk",n:3}]} />)', expected: "<ul><li>orco: 5</li><li>uruk: 3</li></ul>", description: P("Dos tropas", "Two troops"), raw: true },
        { input: 'render(<Hueste tropas={[]} />)', expected: "<ul></ul>", description: P("Sin tropas", "No troops"), raw: true },
      ],
    },
  },
};
