import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de VISUALIZACIÓN DE DATOS con Matplotlib. Reviste la narrativa
 * compartida de la Comunidad. Los retos se ejecutan con Pyodide cargando el
 * paquete `matplotlib` (campo `packages`).
 *
 * Enfoque de evaluación: como un gráfico es una imagen (no comparable como
 * texto), el jugador escribe una función `dibujar(ax, ...)` que CONFIGURA un
 * Axes, y los tests INSPECCIONAN el Axes resultante (título, datos de la línea,
 * etiquetas, alturas de las barras…) mediante helpers de `support_code`.
 *
 * Regla de floats: matplotlib guarda los datos como float; el helper `_norm`
 * convierte los enteros exactos a int para que la comparación con JS cuadre.
 */

const P = (es: string, en: string) => ({ es, en });

/**
 * Helpers de inspección de Axes, inyectados como support_code en cada reto.
 * Cada helper crea una figura, ejecuta la función del jugador sobre el `ax` y
 * lee una propiedad del resultado (título, datos, etiquetas, límites…).
 */
const MPL_SUP =
  "import matplotlib\n" +
  "matplotlib.use('Agg')\n" +
  "import matplotlib.pyplot as plt\n" +
  "def _norm(xs):\n" +
  "    return [int(v) if float(v).is_integer() else round(float(v), 2) for v in xs]\n" +
  "def _mk(fn, *a):\n" +
  "    fig, ax = plt.subplots(); fn(ax, *a); return fig, ax\n" +
  "def _titulo(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.get_title(); plt.close(f); return r\n" +
  "def _xlabel(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.get_xlabel(); plt.close(f); return r\n" +
  "def _ylabel(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.get_ylabel(); plt.close(f); return r\n" +
  "def _ydata(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm(ax.lines[0].get_ydata()); plt.close(f); return r\n" +
  "def _ydata1(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm(ax.lines[1].get_ydata()); plt.close(f); return r\n" +
  "def _nlineas(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = len(ax.lines); plt.close(f); return r\n" +
  "def _alturas(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm([p.get_height() for p in ax.patches]); plt.close(f); return r\n" +
  "def _anchos(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm([p.get_width() for p in ax.patches]); plt.close(f); return r\n" +
  "def _nbarras(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = len(ax.patches); plt.close(f); return r\n" +
  "def _npuntos(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = len(ax.collections[0].get_offsets()); plt.close(f); return r\n" +
  "def _color(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.lines[0].get_color(); plt.close(f); return r\n" +
  "def _marcador(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.lines[0].get_marker(); plt.close(f); return r\n" +
  "def _estilo(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = ax.lines[0].get_linestyle(); plt.close(f); return r\n" +
  "def _leyenda(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); lg = ax.get_legend(); r = [t.get_text() for t in lg.get_texts()] if lg else []; plt.close(f); return r\n" +
  "def _xlim(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm(list(ax.get_xlim())); plt.close(f); return r\n" +
  "def _ylim(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm(list(ax.get_ylim())); plt.close(f); return r\n" +
  "def _xticks(fn, *a):\n" +
  "    f, ax = _mk(fn, *a); r = _norm(list(ax.get_xticks())); plt.close(f); return r\n";

/* ===================================================================== *
 * Capítulo 1 · La figura, los ejes y la primera línea
 * ===================================================================== */

const Q_MPL_IMPORT = {
  question: P(
    "¿Cómo se importa Matplotlib por convención?",
    "How is Matplotlib imported by convention?",
  ),
  options: [
    P("import matplotlib.pyplot as plt", "import matplotlib.pyplot as plt"),
    P("import matplotlib as plt", "import matplotlib as plt"),
    P("from matplotlib import plot", "from matplotlib import plot"),
    P("import pyplot", "import pyplot"),
  ],
  correct: 0,
  explanation: P(
    "El alias estándar es `plt`: `import matplotlib.pyplot as plt`. `pyplot` es la interfaz de trazado; el resto del ecosistema la reconoce al instante.",
    "The standard alias is `plt`: `import matplotlib.pyplot as plt`. `pyplot` is the plotting interface; the whole ecosystem recognizes it instantly.",
  ),
};
const Q_MPL_SUBPLOTS = {
  question: P(
    "¿Qué devuelve `plt.subplots()`?",
    "What does `plt.subplots()` return?",
  ),
  options: [
    P("Una tupla `(fig, ax)`: la figura y los ejes", "A tuple `(fig, ax)`: the figure and the axes"),
    P("Sólo la figura", "Only the figure"),
    P("Una lista de líneas", "A list of lines"),
    P("Nada", "Nothing"),
  ],
  correct: 0,
  explanation: P(
    "`fig, ax = plt.subplots()` crea una figura (el lienzo) y unos ejes (el área donde se dibuja). Casi todo se hace sobre `ax` con la interfaz orientada a objetos.",
    "`fig, ax = plt.subplots()` creates a figure (the canvas) and axes (the area you draw on). Almost everything is done on `ax` with the object-oriented interface.",
  ),
};
const Q_MPL_PLOT = {
  question: P(
    "¿Qué dibuja `ax.plot([3, 5, 2])`?",
    "What does `ax.plot([3, 5, 2])` draw?",
  ),
  options: [
    P("Una línea con esos valores en Y (X = 0, 1, 2)", "A line with those values on Y (X = 0, 1, 2)"),
    P("Tres puntos sueltos", "Three separate points"),
    P("Un gráfico de barras", "A bar chart"),
    P("Nada visible", "Nothing visible"),
  ],
  correct: 0,
  explanation: P(
    "Con un solo array, `plot` lo usa como valores de Y y genera los X automáticamente (0, 1, 2…). Con dos, `ax.plot(x, y)`, tú das ambos ejes.",
    "With a single array, `plot` uses it as the Y values and generates X automatically (0, 1, 2…). With two, `ax.plot(x, y)`, you provide both axes.",
  ),
};
const Q_MPL_TITLE = {
  question: P(
    "¿Cómo pones el título de un gráfico sobre `ax`?",
    "How do you set a chart's title on `ax`?",
  ),
  options: [
    P("ax.set_title('Ventas')", "ax.set_title('Ventas')"),
    P("ax.title = 'Ventas'", "ax.title = 'Ventas'"),
    P("ax.title('Ventas')", "ax.title('Ventas')"),
    P("plt.name('Ventas')", "plt.name('Ventas')"),
  ],
  correct: 0,
  explanation: P(
    "En la interfaz OO, los ajustes van con métodos `set_...`: `ax.set_title(...)`, `ax.set_xlabel(...)`. `ax.title` existe pero es un objeto, no una cadena.",
    "In the OO interface, settings use `set_...` methods: `ax.set_title(...)`, `ax.set_xlabel(...)`. `ax.title` exists but is an object, not a string.",
  ),
};
const Q_MPL_LABELS = {
  question: P(
    "¿Cómo etiquetas los ejes X e Y?",
    "How do you label the X and Y axes?",
  ),
  options: [
    P("ax.set_xlabel(...) y ax.set_ylabel(...)", "ax.set_xlabel(...) and ax.set_ylabel(...)"),
    P("ax.xlabel(...) y ax.ylabel(...)", "ax.xlabel(...) and ax.ylabel(...)"),
    P("ax.labels(x, y)", "ax.labels(x, y)"),
    P("ax.set_axes(x, y)", "ax.set_axes(x, y)"),
  ],
  correct: 0,
  explanation: P(
    "`ax.set_xlabel('mes')` y `ax.set_ylabel('ventas')`. Etiquetar los ejes es lo mínimo para que un gráfico se entienda sin explicación.",
    "`ax.set_xlabel('mes')` and `ax.set_ylabel('ventas')`. Labeling the axes is the minimum for a chart to be understood without explanation.",
  ),
};
const Q_MPL_FIG_VS_AX = {
  question: P(
    "¿Qué diferencia hay entre la `figura` y los `ejes` (axes)?",
    "What's the difference between the `figure` and the `axes`?",
  ),
  options: [
    P("La figura es el lienzo entero; los ejes, cada área de trazado dentro", "The figure is the whole canvas; the axes, each plotting area inside"),
    P("Son lo mismo", "They're the same"),
    P("Los ejes contienen a la figura", "The axes contain the figure"),
    P("La figura es una línea", "The figure is a line"),
  ],
  correct: 0,
  explanation: P(
    "Una `Figure` puede contener varios `Axes` (varios gráficos). Cada `Axes` tiene su título, sus ejes X/Y y sus líneas. Casi siempre trabajas sobre un `ax`.",
    "A `Figure` can contain several `Axes` (several charts). Each `Axes` has its own title, X/Y axes and lines. You almost always work on an `ax`.",
  ),
};
const Q_MPL_PLOT_XY = {
  question: P(
    "¿Qué hace `ax.plot(x, y)` con dos argumentos?",
    "What does `ax.plot(x, y)` do with two arguments?",
  ),
  options: [
    P("Dibuja una línea usando `x` para el eje X e `y` para el eje Y", "Draws a line using `x` for the X axis and `y` for the Y axis"),
    P("Dibuja dos líneas", "Draws two lines"),
    P("Suma x e y", "Adds x and y"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "Con dos arrays, el primero son las posiciones X y el segundo los valores Y. Deben tener la misma longitud. Con uno solo, X se genera automáticamente.",
    "With two arrays, the first is the X positions and the second the Y values. They must be the same length. With one, X is generated automatically.",
  ),
};
const Q_MPL_OO = {
  question: P(
    "¿Por qué se prefiere la interfaz `ax.set_...` frente a `plt.title(...)`?",
    "Why is the `ax.set_...` interface preferred over `plt.title(...)`?",
  ),
  options: [
    P("Es explícita: dice sobre QUÉ ejes actúa (clave con varios gráficos)", "It's explicit: it says WHICH axes it acts on (key with several charts)"),
    P("Es más corta", "It's shorter"),
    P("Es la única que existe", "It's the only one that exists"),
    P("Dibuja más rápido", "It draws faster"),
  ],
  correct: 0,
  explanation: P(
    "`plt.title` actúa sobre el gráfico 'activo', ambiguo cuando hay varios. La interfaz OO (`ax.set_title`) deja claro sobre qué `Axes` operas. Es la forma recomendada.",
    "`plt.title` acts on the 'current' chart, ambiguous with several. The OO interface (`ax.set_title`) makes clear which `Axes` you operate on. It's the recommended way.",
  ),
};
const Q_MPL_SHOW = {
  question: P(
    "¿Para qué sirve `plt.show()`?",
    "What is `plt.show()` for?",
  ),
  options: [
    P("Mostrar la figura en pantalla al terminar de configurarla", "Display the figure on screen once you've finished configuring it"),
    P("Borrar el gráfico", "Delete the chart"),
    P("Guardar en disco", "Save to disk"),
    P("Crear los ejes", "Create the axes"),
  ],
  correct: 0,
  explanation: P(
    "`plt.show()` abre la ventana con el resultado. Para guardar en fichero se usa `fig.savefig('grafico.png')`. En un notebook, la figura suele mostrarse sola.",
    "`plt.show()` opens the window with the result. To save to a file use `fig.savefig('chart.png')`. In a notebook, the figure usually shows on its own.",
  ),
};

export const SYL_MPL_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_MPL_IMPORT, Q_MPL_SUBPLOTS, Q_MPL_PLOT] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_MPL_TITLE, Q_MPL_LABELS, Q_MPL_FIG_VS_AX] },
  c1_perro_negro: { kind: "battle", questions: [Q_MPL_PLOT_XY, Q_MPL_OO, Q_MPL_SHOW] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "Mide tu voluntad frente al Nazgûl en un gráfico: traza la línea, ponle título y etiqueta el eje de la resistencia.",
      "Measure your will against the Nazgûl in a chart: draw the line, give it a title and label the resistance axis.",
    ),
    challenge: {
      packages: ["matplotlib"],
      support_code: MPL_SUP,
      topic: P("Línea, título y etiqueta", "Line, title and label"),
      instructions: P(
        "Escribe `grafico(ax, valores)` que, sobre el `ax` recibido:\n1. dibuje una línea con `ax.plot(valores)`,\n2. ponga el título `\"Voluntad\"` con `ax.set_title`,\n3. etiquete el eje Y como `\"resistencia\"` con `ax.set_ylabel`.\n\nLos tests inspeccionan el Axes resultante.",
        "Write `grafico(ax, valores)` that, on the given `ax`:\n1. draws a line with `ax.plot(valores)`,\n2. sets the title `\"Voluntad\"` with `ax.set_title`,\n3. labels the Y axis `\"resistencia\"` with `ax.set_ylabel`.\n\nThe tests inspect the resulting Axes.",
      ),
      starter_code: "def grafico(ax, valores):\n    pass\n",
      blocks: [
        "def grafico(ax, valores):",
        "    ax.plot(valores)",
        '    ax.set_title("Voluntad")',
        '    ax.set_ylabel("resistencia")',
        '    ax.title("Voluntad")',
        '    ax.set_xlabel("resistencia")',
      ],
      hints: [
        P("`ax.plot(valores)` dibuja la línea.", "`ax.plot(valores)` draws the line."),
        P("Título y etiqueta: `ax.set_title(...)` y `ax.set_ylabel(...)`.", "Title and label: `ax.set_title(...)` and `ax.set_ylabel(...)`."),
      ],
      test_cases: [
        { input: '_titulo(grafico, [10, 20, 30])', expected: "Voluntad", description: P("El título", "The title"), raw: true },
        { input: '_ylabel(grafico, [10, 20, 30])', expected: "resistencia", description: P("La etiqueta Y", "The Y label"), raw: true },
        { input: '_ydata(grafico, [10, 20, 30])', expected: [10, 20, 30], description: P("Los datos de la línea", "The line's data"), raw: true },
        { input: '_nlineas(grafico, [1, 2])', expected: 1, description: P("Una sola línea", "A single line"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino del Lienzo", "The Scroll of the Canvas"),
    lore_intro: P(
      "Un pergamino ilustrado enseña a plasmar números en imágenes: la figura, los ejes y la primera línea.",
      "An illustrated scroll teaches how to turn numbers into images: the figure, the axes and the first line.",
    ),
    scroll: {
      topic: P("Matplotlib: figura, ejes y línea", "Matplotlib: figure, axes and line"),
      sections: [
        {
          heading: P("La figura y los ejes", "The figure and the axes"),
          body: P(
            "`import matplotlib.pyplot as plt`. `fig, ax = plt.subplots()` crea el lienzo (`fig`) y el área de trazado (`ax`). Trabaja sobre `ax`.",
            "`import matplotlib.pyplot as plt`. `fig, ax = plt.subplots()` creates the canvas (`fig`) and the plotting area (`ax`). Work on `ax`.",
          ),
          code: "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([3, 5, 2])",
        },
        {
          heading: P("Título y etiquetas", "Title and labels"),
          body: P(
            "Con la interfaz OO, se configura con métodos `set_...`: `ax.set_title(...)`, `ax.set_xlabel(...)`, `ax.set_ylabel(...)`.",
            "With the OO interface, you configure with `set_...` methods: `ax.set_title(...)`, `ax.set_xlabel(...)`, `ax.set_ylabel(...)`.",
          ),
          code: "ax.set_title('Voluntad')\nax.set_xlabel('turno')\nax.set_ylabel('resistencia')",
        },
        {
          heading: P("Mostrar o guardar", "Show or save"),
          body: P(
            "`plt.show()` abre la ventana; `fig.savefig('g.png')` guarda a fichero. Un solo array en `plot` son los valores Y; con dos, `plot(x, y)`.",
            "`plt.show()` opens the window; `fig.savefig('g.png')` saves to a file. A single array in `plot` is the Y values; with two, `plot(x, y)`.",
          ),
          code: "ax.plot([1, 2, 3], [3, 5, 2])  # x, y\nplt.show()",
        },
      ],
      keyTakeaway: P(
        "plt.subplots() da (fig, ax); ax.plot dibuja; ax.set_title/set_xlabel/set_ylabel etiquetan. Un array = valores Y; dos = plot(x, y). Prefiere la interfaz ax.set_...",
        "plt.subplots() gives (fig, ax); ax.plot draws; ax.set_title/set_xlabel/set_ylabel label. One array = Y values; two = plot(x, y). Prefer the ax.set_... interface.",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Trazar el Sendero", "Plotting the Path"),
    lore_intro: P(
      "Dibuja la altura del terreno a lo largo del sendero de la Comarca. Tu primera línea.",
      "Draw the terrain height along the Shire's path. Your first line.",
    ),
    challenge: {
      packages: ["matplotlib"],
      support_code: MPL_SUP,
      topic: P("Dibujar una línea con título", "Draw a line with a title"),
      instructions: P(
        "Escribe `trazar(ax, valores)` que dibuje una línea con `ax.plot(valores)` y ponga el título `\"Sendero de la Comarca\"`.\n\nLos tests inspeccionan el título y los datos de la línea.",
        "Write `trazar(ax, valores)` that draws a line with `ax.plot(valores)` and sets the title `\"Sendero de la Comarca\"`.\n\nThe tests inspect the title and the line's data.",
      ),
      starter_code: "def trazar(ax, valores):\n    pass\n",
      blocks: [
        "def trazar(ax, valores):",
        "    ax.plot(valores)",
        '    ax.set_title("Sendero de la Comarca")',
        '    ax.plot()',
        '    ax.set_title = "Sendero de la Comarca"',
      ],
      hints: [
        P("`ax.plot(valores)` dibuja la línea.", "`ax.plot(valores)` draws the line."),
        P("`ax.set_title(\"...\")` pone el título.", "`ax.set_title(\"...\")` sets the title."),
      ],
      test_cases: [
        { input: '_titulo(trazar, [3, 5, 2])', expected: "Sendero de la Comarca", description: P("El título", "The title"), raw: true },
        { input: '_ydata(trazar, [3, 5, 2])', expected: [3, 5, 2], description: P("Los datos de la línea", "The line's data"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P(
      "Un gráfico sin ejes etiquetados no dice nada. Rotula los ejes del sigilo día a día.",
      "A chart with unlabeled axes says nothing. Label the stealth axes day by day.",
    ),
    challenge: {
      packages: ["matplotlib"],
      support_code: MPL_SUP,
      topic: P("Etiquetar los ejes", "Labeling the axes"),
      instructions: P(
        "Escribe `rotular(ax)` que etiquete el eje X como `\"dia\"` (con `ax.set_xlabel`) y el eje Y como `\"sigilo\"` (con `ax.set_ylabel`).\n\nLos tests inspeccionan ambas etiquetas.",
        "Write `rotular(ax)` that labels the X axis `\"dia\"` (with `ax.set_xlabel`) and the Y axis `\"sigilo\"` (with `ax.set_ylabel`).\n\nThe tests inspect both labels.",
      ),
      starter_code: "def rotular(ax):\n    pass\n",
      blocks: [
        "def rotular(ax):",
        '    ax.set_xlabel("dia")',
        '    ax.set_ylabel("sigilo")',
        '    ax.set_ylabel("dia")',
        '    ax.set_label("sigilo")',
      ],
      hints: [
        P("Eje X: `ax.set_xlabel(\"dia\")`.", "X axis: `ax.set_xlabel(\"dia\")`."),
        P("Eje Y: `ax.set_ylabel(\"sigilo\")`.", "Y axis: `ax.set_ylabel(\"sigilo\")`."),
      ],
      test_cases: [
        { input: '_xlabel(rotular)', expected: "dia", description: P("Etiqueta X", "X label"), raw: true },
        { input: '_ylabel(rotular)', expected: "sigilo", description: P("Etiqueta Y", "Y label"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 2 · Gráficos de barras
 * ===================================================================== */
const Q_B_BAR = { question: P("¿Cómo dibujas barras verticales sobre `ax`?", "How do you draw vertical bars on `ax`?"),
  options: [P("ax.bar(posiciones, alturas)", "ax.bar(positions, heights)"), P("ax.plot(alturas)", "ax.plot(heights)"), P("ax.bars(alturas)", "ax.bars(heights)"), P("ax.column(alturas)", "ax.column(heights)")],
  correct: 0, explanation: P("`ax.bar(x, alturas)` dibuja una barra por posición. El primer argumento son las posiciones (o categorías) y el segundo, las alturas.", "`ax.bar(x, heights)` draws one bar per position. The first argument is the positions (or categories) and the second, the heights.") };
const Q_B_BARH = { question: P("¿Qué hace `ax.barh(...)`?", "What does `ax.barh(...)` do?"),
  options: [P("Dibuja barras HORIZONTALES", "Draws HORIZONTAL bars"), P("Barras más altas", "Taller bars"), P("Un histograma", "A histogram"), P("Barras apiladas", "Stacked bars")],
  correct: 0, explanation: P("`barh` traza barras horizontales: útil cuando las etiquetas de categoría son largas. La longitud de la barra es su valor (ancho).", "`barh` draws horizontal bars: handy when category labels are long. The bar's length is its value (width).") };
const Q_B_VS = { question: P("¿Cuándo eliges un gráfico de barras frente a uno de líneas?", "When do you choose a bar chart over a line chart?"),
  options: [P("Para comparar CATEGORÍAS discretas", "To compare discrete CATEGORIES"), P("Para series temporales continuas", "For continuous time series"), P("Siempre", "Always"), P("Nunca", "Never")],
  correct: 0, explanation: P("Las barras comparan cantidades entre categorías (ventas por región). Las líneas muestran una evolución continua (ventas por mes). Elegir bien es medio análisis.", "Bars compare quantities across categories (sales per region). Lines show a continuous trend (sales per month). Choosing well is half the analysis.") };
const Q_B_ARGS = { question: P("En `ax.bar(x, alturas)`, ¿qué es `x`?", "In `ax.bar(x, alturas)`, what is `x`?"),
  options: [P("Las posiciones o categorías de cada barra", "The positions or categories of each bar"), P("Las alturas", "The heights"), P("El color", "The color"), P("El ancho", "The width")],
  correct: 0, explanation: P("El primer argumento ubica cada barra: números (`range(len)`) o etiquetas de texto (categorías). El segundo da la altura de cada una.", "The first argument places each bar: numbers (`range(len)`) or text labels (categories). The second gives each one's height.") };
const Q_B_CAT = { question: P("¿Puede `ax.bar` recibir etiquetas de texto como categorías?", "Can `ax.bar` take text labels as categories?"),
  options: [P("Sí: `ax.bar(['orco', 'trol'], [3, 7])`", "Yes: `ax.bar(['orco', 'trol'], [3, 7])`"), P("No, sólo números", "No, numbers only"), P("Sólo con barh", "Only with barh"), P("Da error", "Errors")],
  correct: 0, explanation: P("Con categorías de texto, matplotlib las coloca equiespaciadas y las usa como etiquetas del eje X. Es lo más directo para 'valor por categoría'.", "With text categories, matplotlib spaces them evenly and uses them as X-axis labels. It's the most direct way for 'value per category'.") };
const Q_B_YLABEL = { question: P("¿Cómo indicas qué mide la altura de las barras?", "How do you indicate what the bars' height measures?"),
  options: [P("Etiquetando el eje Y con ax.set_ylabel(...)", "Labeling the Y axis with ax.set_ylabel(...)"), P("No se puede", "You can't"), P("Con el título solo", "With the title only"), P("Con ax.set_bar(...)", "With ax.set_bar(...)")],
  correct: 0, explanation: P("La altura de una barra es un valor del eje Y; etiquétalo (`set_ylabel`) para que se sepa QUÉ se mide. Sin ello, un gráfico de barras es ambiguo.", "A bar's height is a Y-axis value; label it (`set_ylabel`) so it's clear WHAT is measured. Without it, a bar chart is ambiguous.") };
const Q_B_WIDTH = { question: P("¿Qué controla el parámetro `width` en `ax.bar(x, h, width=0.5)`?", "What does the `width` parameter control in `ax.bar(x, h, width=0.5)`?"),
  options: [P("El ancho de cada barra", "The width of each bar"), P("El alto", "The height"), P("La separación de la figura", "The figure's spacing"), P("El color", "The color")],
  correct: 0, explanation: P("`width` fija lo ancha que es cada barra (1.0 = pegadas). Se usa para dejar hueco entre barras o para agrupar varias series.", "`width` sets how wide each bar is (1.0 = touching). Used to leave gaps between bars or to group several series.") };
const Q_B_STACK = { question: P("¿Cómo se apila una segunda serie ENCIMA de la primera en barras?", "How do you stack a second series ON TOP of the first in bars?"),
  options: [P("Con `bottom=`: `ax.bar(x, b, bottom=a)`", "With `bottom=`: `ax.bar(x, b, bottom=a)`"), P("Con `top=`", "With `top=`"), P("No se puede", "You can't"), P("Con `stack=True`", "With `stack=True`")],
  correct: 0, explanation: P("`bottom=a` arranca la segunda serie donde acaba la primera, creando barras apiladas. Útil para mostrar partes de un total.", "`bottom=a` starts the second series where the first ends, creating stacked bars. Handy to show parts of a total.") };
const Q_B_COLOR = { question: P("¿Cómo pintas las barras de un color concreto?", "How do you paint the bars a specific color?"),
  options: [P("Con `color=`: `ax.bar(x, h, color='green')`", "With `color=`: `ax.bar(x, h, color='green')`"), P("Con `paint=`", "With `paint=`"), P("No se puede", "You can't"), P("Con ax.set_color()", "With ax.set_color()")],
  correct: 0, explanation: P("`color=` acepta un nombre ('green'), un hex ('#2ca02c') o una lista (un color por barra). Da identidad visual sin recargar.", "`color=` accepts a name ('green'), a hex ('#2ca02c') or a list (one color per bar). Gives visual identity without clutter.") };

export const SYL_MPL_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_B_BAR, Q_B_BARH, Q_B_ARGS] },
  c2_niebla: { kind: "battle", questions: [Q_B_VS, Q_B_CAT, Q_B_YLABEL] },
  c2_sauce: { kind: "battle", questions: [Q_B_WIDTH, Q_B_STACK, Q_B_COLOR] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P("Cuenta las almas atrapadas por cada túmulo en un gráfico de barras con título y eje etiquetado.", "Count the souls trapped by each barrow in a bar chart with a title and a labeled axis."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Barras por categoría", "Bars by category"),
      instructions: P("Escribe `grafico_barras(ax, etiquetas, valores)` que dibuje barras con `ax.bar(etiquetas, valores)`, ponga el título `\"Túmulos\"` y etiquete el eje Y como `\"almas\"`.", "Write `grafico_barras(ax, etiquetas, valores)` that draws bars with `ax.bar(etiquetas, valores)`, sets the title `\"Túmulos\"` and labels the Y axis `\"almas\"`."),
      starter_code: "def grafico_barras(ax, etiquetas, valores):\n    pass\n",
      blocks: ["def grafico_barras(ax, etiquetas, valores):", "    ax.bar(etiquetas, valores)", '    ax.set_title("Túmulos")', '    ax.set_ylabel("almas")', "    ax.plot(etiquetas, valores)", '    ax.set_xlabel("almas")'],
      hints: [P("`ax.bar(etiquetas, valores)` dibuja una barra por categoría.", "`ax.bar(etiquetas, valores)` draws one bar per category."), P("Título y eje Y: `set_title` y `set_ylabel`.", "Title and Y axis: `set_title` and `set_ylabel`.")],
      test_cases: [
        { input: "_alturas(grafico_barras, ['a', 'b'], [3, 7])", expected: [3, 7], description: P("Las alturas", "The heights"), raw: true },
        { input: "_titulo(grafico_barras, ['a', 'b'], [3, 7])", expected: "Túmulos", description: P("El título", "The title"), raw: true },
        { input: "_ylabel(grafico_barras, ['a', 'b'], [3, 7])", expected: "almas", description: P("Etiqueta Y", "Y label"), raw: true },
        { input: "_nbarras(grafico_barras, ['a', 'b'], [3, 7])", expected: 2, description: P("Dos barras", "Two bars"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino de las Barras", "The Scroll of Bars"),
    lore_intro: P("Un pergamino enseña a comparar cantidades entre categorías con barras.", "A scroll teaches how to compare quantities across categories with bars."),
    scroll: {
      topic: P("Gráficos de barras", "Bar charts"),
      sections: [
        { heading: P("bar y barh", "bar and barh"), body: P("`ax.bar(x, alturas)` dibuja barras verticales; `ax.barh(y, valores)`, horizontales. `x` pueden ser números o categorías de texto.", "`ax.bar(x, heights)` draws vertical bars; `ax.barh(y, values)`, horizontal. `x` can be numbers or text categories."), code: "ax.bar(['orco', 'trol'], [3, 7])\nax.barh(range(3), [5, 2, 8])" },
        { heading: P("Cuándo usarlas", "When to use them"), body: P("Barras para comparar CATEGORÍAS; líneas para tendencias continuas. Etiqueta el eje Y para decir qué mide la altura.", "Bars to compare CATEGORIES; lines for continuous trends. Label the Y axis to say what the height measures."), code: "ax.bar(regiones, ventas)\nax.set_ylabel('ventas')" },
        { heading: P("Color y ancho", "Color and width"), body: P("`color=` pinta las barras; `width=` ajusta su grosor; `bottom=` las apila.", "`color=` paints the bars; `width=` sets their thickness; `bottom=` stacks them."), code: "ax.bar(x, h, color='green', width=0.6)" },
      ],
      keyTakeaway: P("ax.bar(x, alturas) compara categorías (barh = horizontal); x son números o etiquetas; etiqueta el eje Y; color/width/bottom dan estilo y apilado.", "ax.bar(x, heights) compares categories (barh = horizontal); x are numbers or labels; label the Y axis; color/width/bottom give style and stacking."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("Las Raíces del Sauce", "The Willow's Roots"),
    lore_intro: P("Dibuja la fuerza de cada raíz del Viejo Hombre Sauce como una barra.", "Draw the strength of each of Old Man Willow's roots as a bar."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Barras verticales", "Vertical bars"),
      instructions: P("Escribe `barras(ax, valores)` que dibuje una barra por valor con `ax.bar(range(len(valores)), valores)`.", "Write `barras(ax, valores)` that draws one bar per value with `ax.bar(range(len(valores)), valores)`."),
      starter_code: "def barras(ax, valores):\n    pass\n",
      blocks: ["def barras(ax, valores):", "    ax.bar(range(len(valores)), valores)", "    ax.plot(valores)", "    ax.barh(range(len(valores)), valores)"],
      hints: [P("`range(len(valores))` da una posición por barra.", "`range(len(valores))` gives one position per bar."), P("`ax.bar(posiciones, valores)`.", "`ax.bar(positions, valores)`.")],
      test_cases: [
        { input: "_alturas(barras, [10, 20, 30])", expected: [10, 20, 30], description: P("Las alturas", "The heights"), raw: true },
        { input: "_nbarras(barras, [1, 2, 3, 4])", expected: 4, description: P("Cuatro barras", "Four bars"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Frío del Túmulo", "The Barrow's Cold"),
    lore_intro: P("Con etiquetas largas, mejor barras horizontales. Traza el frío de cada espectro con barh.", "With long labels, horizontal bars are better. Draw each wight's cold with barh."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Barras horizontales", "Horizontal bars"),
      instructions: P("Escribe `barras_h(ax, valores)` que dibuje barras HORIZONTALES con `ax.barh(range(len(valores)), valores)`.", "Write `barras_h(ax, valores)` that draws HORIZONTAL bars with `ax.barh(range(len(valores)), valores)`."),
      starter_code: "def barras_h(ax, valores):\n    pass\n",
      blocks: ["def barras_h(ax, valores):", "    ax.barh(range(len(valores)), valores)", "    ax.bar(range(len(valores)), valores)", "    ax.plot(valores)"],
      hints: [P("`barh` en vez de `bar` para horizontales.", "`barh` instead of `bar` for horizontal."), P("`ax.barh(posiciones, valores)`.", "`ax.barh(positions, valores)`.")],
      test_cases: [
        { input: "_anchos(barras_h, [10, 20, 30])", expected: [10, 20, 30], description: P("Las longitudes", "The lengths"), raw: true },
        { input: "_nbarras(barras_h, [5, 5])", expected: 2, description: P("Dos barras", "Two bars"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Bombadil", "Bombadil's Song"),
    lore_intro: P("Cada verso de Tom rompe un hechizo. Dibuja las barras y titula el conjuro.", "Each of Tom's verses breaks a spell. Draw the bars and title the chant."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Barras con título", "Bars with a title"),
      instructions: P("Escribe `barras_titulo(ax, valores, titulo)` que dibuje `ax.bar(range(len(valores)), valores)` y ponga como título el parámetro `titulo` con `ax.set_title(titulo)`.", "Write `barras_titulo(ax, valores, titulo)` that draws `ax.bar(range(len(valores)), valores)` and sets the `titulo` parameter as the title with `ax.set_title(titulo)`."),
      starter_code: "def barras_titulo(ax, valores, titulo):\n    pass\n",
      blocks: ["def barras_titulo(ax, valores, titulo):", "    ax.bar(range(len(valores)), valores)", "    ax.set_title(titulo)", '    ax.set_title("titulo")'],
      hints: [P("Pásale la VARIABLE `titulo`, no el texto \"titulo\".", "Pass the VARIABLE `titulo`, not the text \"titulo\"."), P("`ax.set_title(titulo)`.", "`ax.set_title(titulo)`.")],
      test_cases: [
        { input: "_alturas(barras_titulo, [5, 8], 'Conjuro')", expected: [5, 8], description: P("Las alturas", "The heights"), raw: true },
        { input: "_titulo(barras_titulo, [5, 8], 'Conjuro')", expected: "Conjuro", description: P("El título recibido", "The received title"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 3 · Gráficos de dispersión (scatter)
 * ===================================================================== */
const Q_S_SCATTER = { question: P("¿Cómo dibujas puntos sueltos (dispersión) sobre `ax`?", "How do you draw scattered points on `ax`?"),
  options: [P("ax.scatter(xs, ys)", "ax.scatter(xs, ys)"), P("ax.points(xs, ys)", "ax.points(xs, ys)"), P("ax.plot(xs, ys, line=False)", "ax.plot(xs, ys, line=False)"), P("ax.dot(xs, ys)", "ax.dot(xs, ys)")],
  correct: 0, explanation: P("`ax.scatter(xs, ys)` dibuja un punto por cada par (x, y). Es el gráfico para ver la RELACIÓN entre dos variables.", "`ax.scatter(xs, ys)` draws a point for each (x, y) pair. It's the chart to see the RELATIONSHIP between two variables.") };
const Q_S_XY = { question: P("¿Cuántos argumentos de datos necesita `scatter`?", "How many data arguments does `scatter` need?"),
  options: [P("Dos: xs e ys, de la misma longitud", "Two: xs and ys, of the same length"), P("Uno solo", "Just one"), P("Tres", "Three"), P("Ninguno", "None")],
  correct: 0, explanation: P("`scatter` necesita las X y las Y (misma longitud): cada punto es un par. A diferencia de `plot`, no genera las X solo.", "`scatter` needs the X and the Y (same length): each point is a pair. Unlike `plot`, it doesn't generate X on its own.") };
const Q_S_VS = { question: P("¿En qué se diferencia `scatter` de `plot`?", "How does `scatter` differ from `plot`?"),
  options: [P("scatter dibuja PUNTOS sin unir; plot une con una LÍNEA", "scatter draws unconnected POINTS; plot connects with a LINE"), P("Son iguales", "They're the same"), P("scatter es más lento siempre", "scatter is always slower"), P("plot no acepta Y", "plot doesn't accept Y")],
  correct: 0, explanation: P("`plot` conecta los puntos en orden (ideal para series); `scatter` los deja sueltos (ideal para nubes de datos y correlaciones).", "`plot` connects the points in order (ideal for series); `scatter` leaves them separate (ideal for data clouds and correlations).") };
const Q_S_WHEN = { question: P("¿Para qué sirve típicamente un gráfico de dispersión?", "What is a scatter plot typically for?"),
  options: [P("Ver la relación/correlación entre dos variables", "Seeing the relationship/correlation between two variables"), P("Mostrar una evolución temporal", "Showing a time trend"), P("Comparar categorías", "Comparing categories"), P("Contar frecuencias", "Counting frequencies")],
  correct: 0, explanation: P("Si al subir X sube Y, los puntos forman una diagonal: hay correlación. Es la herramienta visual para detectar relaciones entre variables.", "If Y rises as X rises, the points form a diagonal: there's correlation. It's the visual tool to spot relationships between variables.") };
const Q_S_SIZE = { question: P("¿Qué controla el parámetro `s` en `ax.scatter(x, y, s=...)`?", "What does the `s` parameter control in `ax.scatter(x, y, s=...)`?"),
  options: [P("El TAMAÑO de los puntos", "The SIZE of the points"), P("La forma", "The shape"), P("El color", "The color"), P("La separación", "The spacing")],
  correct: 0, explanation: P("`s` fija el área de cada punto. Puede ser un número (todos iguales) o una lista (un tamaño por punto: una tercera variable en el gráfico).", "`s` sets each point's area. It can be a number (all equal) or a list (a size per point: a third variable in the chart).") };
const Q_S_COLOR = { question: P("¿Cómo coloreas los puntos según una tercera variable?", "How do you color the points by a third variable?"),
  options: [P("Con `c=` una lista de valores: `ax.scatter(x, y, c=z)`", "With `c=` a list of values: `ax.scatter(x, y, c=z)`"), P("Con `color=número`", "With `color=number`"), P("No se puede", "You can't"), P("Con `paint=`", "With `paint=`")],
  correct: 0, explanation: P("`c=` acepta un color fijo o una LISTA de valores que se mapea a un degradado (colormap). Añade una tercera dimensión de información.", "`c=` accepts a fixed color or a LIST of values mapped to a gradient (colormap). It adds a third dimension of information.") };
const Q_S_MARKER = { question: P("¿Qué cambia el parámetro `marker` en scatter, p. ej. `marker='^'`?", "What does the `marker` parameter change in scatter, e.g. `marker='^'`?"),
  options: [P("La FORMA de los puntos (círculo, cuadrado, triángulo…)", "The SHAPE of the points (circle, square, triangle…)"), P("El tamaño", "The size"), P("El color", "The color"), P("La posición", "The position")],
  correct: 0, explanation: P("`marker` elige el símbolo: `'o'` círculo, `'s'` cuadrado, `'^'` triángulo. Distingue varias series en un mismo gráfico.", "`marker` picks the symbol: `'o'` circle, `'s'` square, `'^'` triangle. It tells apart several series in one chart.") };
const Q_S_ALPHA = { question: P("¿Para qué sirve `alpha=0.5` en un scatter con muchos puntos?", "What is `alpha=0.5` for in a scatter with many points?"),
  options: [P("Da transparencia: revela zonas donde se amontonan los puntos", "Adds transparency: reveals where points pile up"), P("Duplica los puntos", "Doubles the points"), P("Cambia el color a gris", "Changes the color to gray"), P("Los ordena", "Sorts them")],
  correct: 0, explanation: P("Con muchos puntos superpuestos, `alpha` (0 a 1) los hace translúcidos: donde se acumulan, el color se ve más intenso. Combate el 'overplotting'.", "With many overlapping points, `alpha` (0 to 1) makes them translucent: where they pile up, the color looks more intense. It fights 'overplotting'.") };
const Q_S_RETURN = { question: P("¿Dónde guarda matplotlib los puntos de un scatter?", "Where does matplotlib store a scatter's points?"),
  options: [P("En una colección: `ax.collections`", "In a collection: `ax.collections`"), P("En `ax.lines`", "In `ax.lines`"), P("En `ax.patches`", "In `ax.patches`"), P("En ningún sitio", "Nowhere")],
  correct: 0, explanation: P("`scatter` crea una `PathCollection`, guardada en `ax.collections` (a diferencia de `plot`, que crea líneas en `ax.lines`). Detalle útil al inspeccionar o depurar.", "`scatter` creates a `PathCollection`, stored in `ax.collections` (unlike `plot`, which creates lines in `ax.lines`). A useful detail when inspecting or debugging.") };

export const SYL_MPL_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_S_SCATTER, Q_S_XY, Q_S_VS] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_S_WHEN, Q_S_SIZE, Q_S_COLOR] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_S_MARKER, Q_S_ALPHA, Q_S_RETURN] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("Dibuja la nube de sus jinetes por posición y altura, con título y ejes etiquetados.", "Draw the cloud of his riders by position and height, with a title and labeled axes."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dispersión con etiquetas", "Scatter with labels"),
      instructions: P("Escribe `nube(ax, xs, ys)` que dibuje `ax.scatter(xs, ys)`, ponga el título `\"Cima\"` y etiquete el eje X como `\"este\"`.", "Write `nube(ax, xs, ys)` that draws `ax.scatter(xs, ys)`, sets the title `\"Cima\"` and labels the X axis `\"este\"`."),
      starter_code: "def nube(ax, xs, ys):\n    pass\n",
      blocks: ["def nube(ax, xs, ys):", "    ax.scatter(xs, ys)", '    ax.set_title("Cima")', '    ax.set_xlabel("este")', "    ax.plot(xs, ys)"],
      hints: [P("`ax.scatter(xs, ys)` dibuja los puntos.", "`ax.scatter(xs, ys)` draws the points."), P("Título y eje X: `set_title` y `set_xlabel`.", "Title and X axis: `set_title` and `set_xlabel`.")],
      test_cases: [
        { input: "_npuntos(nube, [1, 2, 3], [4, 5, 6])", expected: 3, description: P("Tres puntos", "Three points"), raw: true },
        { input: "_titulo(nube, [1, 2, 3], [4, 5, 6])", expected: "Cima", description: P("El título", "The title"), raw: true },
        { input: "_xlabel(nube, [1, 2, 3], [4, 5, 6])", expected: "este", description: P("Etiqueta X", "X label"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de la Nube", "The Scroll of the Cloud"),
    lore_intro: P("Un pergamino enseña a revelar relaciones entre variables con puntos.", "A scroll teaches how to reveal relationships between variables with points."),
    scroll: {
      topic: P("Gráficos de dispersión", "Scatter plots"),
      sections: [
        { heading: P("scatter(x, y)", "scatter(x, y)"), body: P("`ax.scatter(xs, ys)` dibuja un punto por par. Necesita X e Y (misma longitud). Cada punto es una observación.", "`ax.scatter(xs, ys)` draws a point per pair. It needs X and Y (same length). Each point is an observation."), code: "ax.scatter([1, 2, 3], [2, 4, 6])" },
        { heading: P("Para ver relaciones", "To see relationships"), body: P("Si los puntos forman una diagonal, hay correlación. `plot` une con línea (series); `scatter` deja los puntos sueltos (nubes).", "If the points form a diagonal, there's correlation. `plot` joins with a line (series); `scatter` leaves the points separate (clouds)."), code: "ax.scatter(horas, nota)  # ¿más horas, más nota?" },
        { heading: P("Tamaño, color, forma", "Size, color, shape"), body: P("`s=` tamaño, `c=` color (o lista para degradado), `marker=` forma, `alpha=` transparencia (útil con muchos puntos).", "`s=` size, `c=` color (or list for a gradient), `marker=` shape, `alpha=` transparency (handy with many points)."), code: "ax.scatter(x, y, s=50, c=z, alpha=0.5)" },
      ],
      keyTakeaway: P("ax.scatter(x, y) revela relaciones entre dos variables (puntos sueltos, no línea); s/c/marker/alpha añaden tamaño, color, forma y transparencia. Los puntos viven en ax.collections.", "ax.scatter(x, y) reveals relationships between two variables (separate points, not a line); s/c/marker/alpha add size, color, shape and transparency. The points live in ax.collections."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("El Cruce del Poney", "The Pony's Crossing"),
    lore_intro: P("Dibuja como puntos las llegadas de los viajeros al Poney Pisador.", "Draw the travelers' arrivals at the Prancing Pony as points."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dispersión básica", "Basic scatter"),
      instructions: P("Escribe `dispersion(ax, xs, ys)` que dibuje los puntos con `ax.scatter(xs, ys)`.", "Write `dispersion(ax, xs, ys)` that draws the points with `ax.scatter(xs, ys)`."),
      starter_code: "def dispersion(ax, xs, ys):\n    pass\n",
      blocks: ["def dispersion(ax, xs, ys):", "    ax.scatter(xs, ys)", "    ax.plot(xs, ys)", "    ax.bar(xs, ys)"],
      hints: [P("`ax.scatter(xs, ys)`.", "`ax.scatter(xs, ys)`."), P("Puntos, no línea: por eso scatter y no plot.", "Points, not a line: hence scatter not plot.")],
      test_cases: [
        { input: "_npuntos(dispersion, [1, 2, 3], [4, 5, 6])", expected: 3, description: P("Tres puntos", "Three points"), raw: true },
        { input: "_npuntos(dispersion, [0, 0], [1, 2])", expected: 2, description: P("Dos puntos", "Two points"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas Dispersas", "The Scattered Blades"),
    lore_intro: P("Dibuja las hojas como puntos y titula el hallazgo.", "Draw the blades as points and title the find."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dispersión con título", "Scatter with a title"),
      instructions: P("Escribe `dispersion_titulo(ax, xs, ys)` que dibuje `ax.scatter(xs, ys)` y ponga el título `\"Estrellas\"`.", "Write `dispersion_titulo(ax, xs, ys)` that draws `ax.scatter(xs, ys)` and sets the title `\"Estrellas\"`."),
      starter_code: "def dispersion_titulo(ax, xs, ys):\n    pass\n",
      blocks: ["def dispersion_titulo(ax, xs, ys):", "    ax.scatter(xs, ys)", '    ax.set_title("Estrellas")', "    ax.plot(xs, ys)"],
      hints: [P("`ax.scatter(xs, ys)` y luego `ax.set_title(...)`.", "`ax.scatter(xs, ys)` then `ax.set_title(...)`.")],
      test_cases: [
        { input: "_npuntos(dispersion_titulo, [1, 2], [3, 4])", expected: 2, description: P("Dos puntos", "Two points"), raw: true },
        { input: "_titulo(dispersion_titulo, [1, 2], [3, 4])", expected: "Estrellas", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P("En Amon Sûl, marca cada fuego como un punto en el mapa.", "At Amon Sûl, mark each fire as a point on the map."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Contar puntos", "Counting points"),
      instructions: P("Escribe `puntos(ax, xs, ys)` que dibuje `ax.scatter(xs, ys)`. Cada par (x, y) es un fuego en la cima.", "Write `puntos(ax, xs, ys)` that draws `ax.scatter(xs, ys)`. Each (x, y) pair is a beacon on the hill."),
      starter_code: "def puntos(ax, xs, ys):\n    pass\n",
      blocks: ["def puntos(ax, xs, ys):", "    ax.scatter(xs, ys)", "    ax.scatter(xs)", "    ax.plot(xs, ys)"],
      hints: [P("scatter necesita X e Y.", "scatter needs X and Y."), P("`ax.scatter(xs, ys)`.", "`ax.scatter(xs, ys)`.")],
      test_cases: [
        { input: "_npuntos(puntos, [1, 2, 3, 4], [4, 3, 2, 1])", expected: 4, description: P("Cuatro fuegos", "Four beacons"), raw: true },
        { input: "_npuntos(puntos, [7], [7])", expected: 1, description: P("Un fuego", "One beacon"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 4 · Estilo: color, marcador, línea y leyenda
 * ===================================================================== */
const Q_E_COLOR = { question: P("¿Cómo pones una línea de color rojo?", "How do you make a line red?"),
  options: [P("ax.plot(v, color='red')", "ax.plot(v, color='red')"), P("ax.plot(v, red=True)", "ax.plot(v, red=True)"), P("ax.color('red')", "ax.color('red')"), P("ax.plot(v).red()", "ax.plot(v).red()")],
  correct: 0, explanation: P("`color=` acepta un nombre ('red', 'blue'), un hex ('#ff0000') o un código corto ('r'). Da identidad a cada serie.", "`color=` accepts a name ('red', 'blue'), a hex ('#ff0000') or a short code ('r'). It gives each series identity.") };
const Q_E_MARKER = { question: P("¿Qué añade `marker='o'` a `ax.plot(...)`?", "What does `marker='o'` add to `ax.plot(...)`?"),
  options: [P("Un símbolo (círculo) en cada punto de datos", "A symbol (circle) at each data point"), P("Un color", "A color"), P("Un título", "A title"), P("Una leyenda", "A legend")],
  correct: 0, explanation: P("`marker` marca cada dato: `'o'` círculo, `'s'` cuadrado, `'^'` triángulo. Deja ver dónde caen las observaciones sobre la línea.", "`marker` marks each data point: `'o'` circle, `'s'` square, `'^'` triangle. It shows where the observations fall on the line.") };
const Q_E_STYLE = { question: P("¿Qué controla `linestyle='--'`?", "What does `linestyle='--'` control?"),
  options: [P("El tipo de línea: discontinua (guiones)", "The line type: dashed"), P("El grosor", "The thickness"), P("El color", "The color"), P("El marcador", "The marker")],
  correct: 0, explanation: P("`linestyle` (o `ls`): `'-'` sólida, `'--'` discontinua, `':'` punteada, `'-.'` raya-punto. Distingue series sin depender del color.", "`linestyle` (or `ls`): `'-'` solid, `'--'` dashed, `':'` dotted, `'-.'` dash-dot. Distinguishes series without relying on color.") };
const Q_E_LABEL = { question: P("¿Qué hacen falta para que aparezca una leyenda?", "What is needed for a legend to appear?"),
  options: [P("Un `label=` en cada serie y llamar a `ax.legend()`", "A `label=` on each series and calling `ax.legend()`"), P("Sólo `ax.legend()`", "Only `ax.legend()`"), P("Sólo `label=`", "Only `label=`"), P("`ax.set_legend()`", "`ax.set_legend()`")],
  correct: 0, explanation: P("Cada serie lleva su `label='...'`, y luego `ax.legend()` recoge esas etiquetas y dibuja la leyenda. Falta cualquiera de los dos y no aparece.", "Each series carries its `label='...'`, then `ax.legend()` collects those labels and draws the legend. Miss either and it won't show.") };
const Q_E_LEGEND = { question: P("¿Qué muestra `ax.legend()`?", "What does `ax.legend()` show?"),
  options: [P("Una caja que asocia cada serie con su `label`", "A box associating each series with its `label`"), P("El título", "The title"), P("Los ejes", "The axes"), P("La cuadrícula", "The grid")],
  correct: 0, explanation: P("La leyenda es la clave del gráfico: dice qué color/estilo corresponde a qué serie. Imprescindible cuando hay más de una línea.", "The legend is the chart's key: it says which color/style matches which series. Essential when there's more than one line.") };
const Q_E_LW = { question: P("¿Qué controla `linewidth=3`?", "What does `linewidth=3` control?"),
  options: [P("El GROSOR de la línea", "The line's THICKNESS"), P("El largo", "The length"), P("El color", "The color"), P("El número de puntos", "The number of points")],
  correct: 0, explanation: P("`linewidth` (o `lw`) engrosa la línea para destacarla. Combinado con color y estilo, jerarquiza qué serie es la protagonista.", "`linewidth` (or `lw`) thickens the line to emphasize it. Combined with color and style, it ranks which series is the lead.") };
const Q_E_HEX = { question: P("¿Acepta `color=` un valor hexadecimal como '#2ca02c'?", "Does `color=` accept a hex value like '#2ca02c'?"),
  options: [P("Sí: nombre, código corto o hex", "Yes: name, short code or hex"), P("No, sólo nombres", "No, names only"), P("Sólo con RGB", "Only with RGB"), P("Da error", "Errors")],
  correct: 0, explanation: P("`color` admite nombres ('green'), códigos cortos ('g'), hex ('#2ca02c') y tuplas RGB. El hex da control exacto sobre el tono.", "`color` accepts names ('green'), short codes ('g'), hex ('#2ca02c') and RGB tuples. Hex gives exact control over the shade.") };
const Q_E_COMBO = { question: P("¿Se pueden combinar color, marcador y estilo a la vez?", "Can you combine color, marker and style at once?"),
  options: [P("Sí: `ax.plot(v, color='b', marker='o', linestyle='--')`", "Yes: `ax.plot(v, color='b', marker='o', linestyle='--')`"), P("No, sólo uno", "No, only one"), P("Sólo color y marcador", "Only color and marker"), P("Sólo con scatter", "Only with scatter")],
  correct: 0, explanation: P("Los tres son argumentos independientes y se combinan libremente. Así defines la apariencia completa de cada serie.", "The three are independent arguments and combine freely. That's how you define each series' full appearance.") };
const Q_E_FMT = { question: P("¿Qué significa el atajo `ax.plot(v, 'ro--')`?", "What does the shorthand `ax.plot(v, 'ro--')` mean?"),
  options: [P("rojo ('r'), marcador círculo ('o'), línea discontinua ('--')", "red ('r'), circle marker ('o'), dashed line ('--')"), P("Es un error", "It's an error"), P("El título 'ro--'", "The title 'ro--'"), P("Tres líneas", "Three lines")],
  correct: 0, explanation: P("El 'format string' comprime color+marcador+estilo en una cadena: `'ro--'` = rojo, círculos, discontinua. Rápido, aunque menos legible que los argumentos con nombre.", "The 'format string' packs color+marker+style into one string: `'ro--'` = red, circles, dashed. Fast, though less readable than named arguments.") };

export const SYL_MPL_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_E_COLOR, Q_E_MARKER, Q_E_STYLE] },
  c4_lobo: { kind: "battle", questions: [Q_E_LABEL, Q_E_LEGEND, Q_E_LW] },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_E_HEX, Q_E_COMBO, Q_E_FMT] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P("Traza la ruta de los Nueve con estilo completo: color, marcador, leyenda y título.", "Plot the Nine's route in full style: color, marker, legend and title."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Estilo completo y leyenda", "Full style and legend"),
      instructions: P("Escribe `linea_completa(ax, valores)` que dibuje `ax.plot(valores, color=\"blue\", marker=\"o\", label=\"ruta\")`, llame a `ax.legend()` y ponga el título `\"Vado\"`.", "Write `linea_completa(ax, valores)` that draws `ax.plot(valores, color=\"blue\", marker=\"o\", label=\"ruta\")`, calls `ax.legend()` and sets the title `\"Vado\"`."),
      starter_code: "def linea_completa(ax, valores):\n    pass\n",
      blocks: ["def linea_completa(ax, valores):", '    ax.plot(valores, color="blue", marker="o", label="ruta")', "    ax.legend()", '    ax.set_title("Vado")', "    ax.plot(valores)"],
      hints: [P("Todo en un `plot`: `color=`, `marker=`, `label=`.", "All in one `plot`: `color=`, `marker=`, `label=`."), P("La leyenda necesita `ax.legend()` DESPUÉS del label.", "The legend needs `ax.legend()` AFTER the label.")],
      test_cases: [
        { input: "_color(linea_completa, [1, 2, 3])", expected: "blue", description: P("El color", "The color"), raw: true },
        { input: "_marcador(linea_completa, [1, 2, 3])", expected: "o", description: P("El marcador", "The marker"), raw: true },
        { input: "_leyenda(linea_completa, [1, 2, 3])", expected: ["ruta"], description: P("La leyenda", "The legend"), raw: true },
        { input: "_titulo(linea_completa, [1, 2, 3])", expected: "Vado", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino del Estilo", "The Scroll of Style"),
    lore_intro: P("Un pergamino enseña a vestir un gráfico: color, marcador, línea y leyenda.", "A scroll teaches how to dress a chart: color, marker, line and legend."),
    scroll: {
      topic: P("Estilo y leyenda", "Style and legend"),
      sections: [
        { heading: P("Color, marcador, línea", "Color, marker, line"), body: P("`color=` el tono, `marker=` el símbolo por punto, `linestyle=` el trazo. Se combinan libremente.", "`color=` the shade, `marker=` the per-point symbol, `linestyle=` the stroke. They combine freely."), code: "ax.plot(v, color='blue', marker='o', linestyle='--')" },
        { heading: P("La leyenda", "The legend"), body: P("Da un `label=` a cada serie y llama a `ax.legend()`. Sin las dos cosas, la leyenda no aparece.", "Give each series a `label=` and call `ax.legend()`. Without both, the legend won't show."), code: "ax.plot(a, label='antes')\nax.plot(b, label='después')\nax.legend()" },
        { heading: P("Atajo de formato", "Format shorthand"), body: P("`'ro--'` comprime rojo + círculo + discontinua. `linewidth=` engrosa; el hex ('#2ca02c') da control exacto de color.", "`'ro--'` packs red + circle + dashed. `linewidth=` thickens; hex ('#2ca02c') gives exact color control."), code: "ax.plot(v, 'ro--', linewidth=2)" },
      ],
      keyTakeaway: P("color/marker/linestyle/linewidth definen la apariencia; label= + ax.legend() crean la leyenda (hacen falta los dos); 'ro--' es el atajo de formato.", "color/marker/linestyle/linewidth define the look; label= + ax.legend() create the legend (both needed); 'ro--' is the format shorthand."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Carrera de Asfaloth", "Asfaloth's Race"),
    lore_intro: P("Pinta de rojo la línea del galope de Asfaloth.", "Paint Asfaloth's gallop line red."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Color de la línea", "Line color"),
      instructions: P("Escribe `linea_roja(ax, valores)` que dibuje la línea de color rojo con `ax.plot(valores, color=\"red\")`.", "Write `linea_roja(ax, valores)` that draws the line in red with `ax.plot(valores, color=\"red\")`."),
      starter_code: "def linea_roja(ax, valores):\n    pass\n",
      blocks: ["def linea_roja(ax, valores):", '    ax.plot(valores, color="red")', "    ax.plot(valores)", '    ax.plot(valores, red=True)'],
      hints: [P("`color=\"red\"` dentro de `plot`.", "`color=\"red\"` inside `plot`.")],
      test_cases: [
        { input: "_color(linea_roja, [1, 2, 3])", expected: "red", description: P("El color", "The color"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("La Marca de los Nueve", "The Mark of the Nine"),
    lore_intro: P("Marca cada punto de la línea con un círculo para contar los Nueve.", "Mark each point of the line with a circle to count the Nine."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Marcador en la línea", "Marker on the line"),
      instructions: P("Escribe `con_marcador(ax, valores)` que dibuje la línea con un círculo en cada punto: `ax.plot(valores, marker=\"o\")`.", "Write `con_marcador(ax, valores)` that draws the line with a circle at each point: `ax.plot(valores, marker=\"o\")`."),
      starter_code: "def con_marcador(ax, valores):\n    pass\n",
      blocks: ["def con_marcador(ax, valores):", '    ax.plot(valores, marker="o")', "    ax.plot(valores)", '    ax.scatter(valores, marker="o")'],
      hints: [P("`marker=\"o\"` dentro de `plot`.", "`marker=\"o\"` inside `plot`.")],
      test_cases: [
        { input: "_marcador(con_marcador, [1, 2, 3])", expected: "o", description: P("El marcador", "The marker"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("La Crecida de Bruinen", "The Flood of Bruinen"),
    lore_intro: P("Dibuja la crecida con una línea discontinua, como el agua entrecortada.", "Draw the flood with a dashed line, like broken water."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Estilo de línea", "Line style"),
      instructions: P("Escribe `con_estilo(ax, valores)` que dibuje una línea DISCONTINUA con `ax.plot(valores, linestyle=\"--\")`.", "Write `con_estilo(ax, valores)` that draws a DASHED line with `ax.plot(valores, linestyle=\"--\")`."),
      starter_code: "def con_estilo(ax, valores):\n    pass\n",
      blocks: ["def con_estilo(ax, valores):", '    ax.plot(valores, linestyle="--")', "    ax.plot(valores)", '    ax.plot(valores, linewidth="--")'],
      hints: [P("`linestyle=\"--\"` para discontinua.", "`linestyle=\"--\"` for dashed.")],
      test_cases: [
        { input: "_estilo(con_estilo, [1, 2, 3])", expected: "--", description: P("El estilo", "The style"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P("Nombra la serie del sigilo y muestra la leyenda que la identifica.", "Name the stealth series and show the legend that identifies it."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("label + legend", "label + legend"),
      instructions: P("Escribe `con_leyenda(ax, valores)` que dibuje `ax.plot(valores, label=\"sigilo\")` y luego llame a `ax.legend()`.", "Write `con_leyenda(ax, valores)` that draws `ax.plot(valores, label=\"sigilo\")` and then calls `ax.legend()`."),
      starter_code: "def con_leyenda(ax, valores):\n    pass\n",
      blocks: ["def con_leyenda(ax, valores):", '    ax.plot(valores, label="sigilo")', "    ax.legend()", "    ax.plot(valores)"],
      hints: [P("Primero el `label=`, luego `ax.legend()`.", "First the `label=`, then `ax.legend()`.")],
      test_cases: [
        { input: "_leyenda(con_leyenda, [1, 2, 3])", expected: ["sigilo"], description: P("La leyenda", "The legend"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 5 · Múltiples series
 * ===================================================================== */
const Q_M_MULTI = { question: P("¿Cómo dibujas DOS líneas en el mismo `ax`?", "How do you draw TWO lines on the same `ax`?"),
  options: [P("Llamando a `ax.plot(...)` dos veces", "Calling `ax.plot(...)` twice"), P("No se puede", "You can't"), P("Con `ax.plot2(...)`", "With `ax.plot2(...)`"), P("Con dos figuras", "With two figures")],
  correct: 0, explanation: P("Cada `ax.plot(...)` añade una línea al mismo Axes: se superponen. Así comparas series en un solo gráfico.", "Each `ax.plot(...)` adds a line to the same Axes: they overlay. That's how you compare series in a single chart.") };
const Q_M_INDEP = { question: P("Al dibujar varias líneas en un `ax`, ¿comparten estilo?", "When drawing several lines on an `ax`, do they share style?"),
  options: [P("No: cada `plot` recibe su propio color/estilo", "No: each `plot` gets its own color/style"), P("Sí, todas iguales", "Yes, all identical"), P("Sólo el color", "Only the color"), P("Da error mezclar estilos", "Mixing styles errors")],
  correct: 0, explanation: P("Cada llamada a `plot` es independiente: matplotlib les da colores distintos por defecto, y tú puedes fijar estilo por serie.", "Each `plot` call is independent: matplotlib gives them different default colors, and you can set style per series.") };
const Q_M_LEGEND = { question: P("Con varias series, ¿qué es imprescindible añadir?", "With several series, what is essential to add?"),
  options: [P("Una leyenda (label + legend) para distinguirlas", "A legend (label + legend) to tell them apart"), P("Nada", "Nothing"), P("Más ejes", "More axes"), P("Un histograma", "A histogram")],
  correct: 0, explanation: P("Sin leyenda, el lector no sabe qué línea es cuál. Con varias series, `label=` en cada una + `ax.legend()` es obligado.", "Without a legend, the reader doesn't know which line is which. With several series, `label=` on each + `ax.legend()` is a must.") };
const Q_M_GRID = { question: P("¿Cómo creas una CUADRÍCULA de subgráficos (2 filas, 3 columnas)?", "How do you create a GRID of subplots (2 rows, 3 columns)?"),
  options: [P("plt.subplots(2, 3)", "plt.subplots(2, 3)"), P("plt.grid(2, 3)", "plt.grid(2, 3)"), P("plt.subplots(6)", "plt.subplots(6)"), P("ax.split(2, 3)", "ax.split(2, 3)")],
  correct: 0, explanation: P("`fig, axs = plt.subplots(2, 3)` crea una rejilla 2×3 de ejes. `axs` es un array; accedes con `axs[fila, col]`.", "`fig, axs = plt.subplots(2, 3)` creates a 2×3 grid of axes. `axs` is an array; you access it with `axs[row, col]`.") };
const Q_M_INDEX = { question: P("Con `fig, axs = plt.subplots(1, 2)`, ¿cómo usas el segundo eje?", "With `fig, axs = plt.subplots(1, 2)`, how do you use the second axis?"),
  options: [P("axs[1]", "axs[1]"), P("axs.second", "axs.second"), P("ax2", "ax2"), P("fig[1]", "fig[1]")],
  correct: 0, explanation: P("`axs` es un array de Axes: `axs[0]` el primero, `axs[1]` el segundo. Cada uno se dibuja por separado con sus propios métodos.", "`axs` is an array of Axes: `axs[0]` the first, `axs[1]` the second. Each is drawn separately with its own methods.") };
const Q_M_SHARE = { question: P("¿Qué hace `plt.subplots(1, 2, sharey=True)`?", "What does `plt.subplots(1, 2, sharey=True)` do?"),
  options: [P("Los dos ejes comparten la MISMA escala Y", "Both axes share the SAME Y scale"), P("Dibuja lo mismo dos veces", "Draws the same thing twice"), P("Une los ejes en uno", "Merges the axes into one"), P("Oculta el eje Y", "Hides the Y axis")],
  correct: 0, explanation: P("`sharey=True` alinea la escala Y de los subgráficos para poder compararlos de un vistazo. `sharex` hace lo propio con X.", "`sharey=True` aligns the subplots' Y scale so you can compare them at a glance. `sharex` does the same for X.") };
const Q_M_SUPTITLE = { question: P("¿Cómo pones un título GENERAL a toda la figura (no a un eje)?", "How do you set an OVERALL title for the whole figure (not one axis)?"),
  options: [P("fig.suptitle('...')", "fig.suptitle('...')"), P("ax.set_title('...')", "ax.set_title('...')"), P("plt.legend('...')", "plt.legend('...')"), P("fig.set_title('...')", "fig.set_title('...')")],
  correct: 0, explanation: P("`fig.suptitle(...)` pone un título sobre la figura entera; `ax.set_title(...)` titula cada subgráfico. Se usan juntos en dashboards.", "`fig.suptitle(...)` places a title over the whole figure; `ax.set_title(...)` titles each subplot. They're used together in dashboards.") };
const Q_M_TWINX = { question: P("¿Para qué sirve `ax.twinx()`?", "What is `ax.twinx()` for?"),
  options: [P("Un SEGUNDO eje Y que comparte el eje X", "A SECOND Y axis sharing the X axis"), P("Duplicar la figura", "Duplicating the figure"), P("Girar el gráfico", "Rotating the chart"), P("Dos títulos", "Two titles")],
  correct: 0, explanation: P("`twinx()` añade un eje Y a la derecha con otra escala: útil para superponer dos magnitudes distintas (ºC y mm) sobre el mismo X.", "`twinx()` adds a right-hand Y axis with another scale: handy to overlay two different magnitudes (ºC and mm) on the same X.") };
const Q_M_OVERLAY = { question: P("Dos `ax.plot` seguidos sobre el mismo `ax`, ¿qué producen?", "Two `ax.plot` calls in a row on the same `ax` produce what?"),
  options: [P("Dos líneas superpuestas en el mismo gráfico", "Two lines overlaid in the same chart"), P("Borran la anterior", "They erase the previous one"), P("Un error", "An error"), P("Dos figuras", "Two figures")],
  correct: 0, explanation: P("Las llamadas se ACUMULAN sobre el mismo Axes: la segunda no borra la primera. Por eso puedes comparar 'antes' y 'después' en una imagen.", "The calls ACCUMULATE on the same Axes: the second doesn't erase the first. That's why you can compare 'before' and 'after' in one image.") };

export const SYL_MPL_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_M_MULTI, Q_M_INDEP, Q_M_OVERLAY] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_M_LEGEND, Q_M_GRID, Q_M_INDEX] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_M_SHARE, Q_M_SUPTITLE, Q_M_TWINX] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P("Compara la subida 'antes' y 'después' de la ventisca: dos líneas con leyenda y título.", "Compare the ascent 'before' and 'after' the blizzard: two lines with a legend and title."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dos series con leyenda", "Two series with a legend"),
      instructions: P("Escribe `comparar(ax, a, b)` que dibuje `ax.plot(a, label=\"antes\")` y `ax.plot(b, label=\"despues\")`, llame a `ax.legend()` y ponga el título `\"Caradhras\"`.", "Write `comparar(ax, a, b)` that draws `ax.plot(a, label=\"antes\")` and `ax.plot(b, label=\"despues\")`, calls `ax.legend()` and sets the title `\"Caradhras\"`."),
      starter_code: "def comparar(ax, a, b):\n    pass\n",
      blocks: ["def comparar(ax, a, b):", '    ax.plot(a, label="antes")', '    ax.plot(b, label="despues")', "    ax.legend()", '    ax.set_title("Caradhras")', "    ax.plot(a, b)"],
      hints: [P("Un `plot` por serie, cada uno con su `label=`.", "One `plot` per series, each with its `label=`."), P("`ax.legend()` al final para mostrar ambas.", "`ax.legend()` at the end to show both.")],
      test_cases: [
        { input: "_nlineas(comparar, [1, 2], [3, 4])", expected: 2, description: P("Dos líneas", "Two lines"), raw: true },
        { input: "_leyenda(comparar, [1, 2], [3, 4])", expected: ["antes", "despues"], description: P("Las dos etiquetas", "Both labels"), raw: true },
        { input: "_titulo(comparar, [1, 2], [3, 4])", expected: "Caradhras", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino de las Series", "The Scroll of Series"),
    lore_intro: P("Un pergamino enseña a superponer y comparar varias series.", "A scroll teaches how to overlay and compare several series."),
    scroll: {
      topic: P("Múltiples series y subgráficos", "Multiple series and subplots"),
      sections: [
        { heading: P("Superponer líneas", "Overlaying lines"), body: P("Cada `ax.plot(...)` añade una línea al mismo eje; se acumulan. Ponle `label=` a cada una y `ax.legend()` para distinguirlas.", "Each `ax.plot(...)` adds a line to the same axis; they accumulate. Give each a `label=` and call `ax.legend()` to tell them apart."), code: "ax.plot(a, label='antes')\nax.plot(b, label='después')\nax.legend()" },
        { heading: P("Cuadrícula de subgráficos", "Grid of subplots"), body: P("`fig, axs = plt.subplots(2, 3)` crea una rejilla; `axs[fila, col]` es cada eje. `sharey=True` alinea escalas.", "`fig, axs = plt.subplots(2, 3)` creates a grid; `axs[row, col]` is each axis. `sharey=True` aligns scales."), code: "fig, axs = plt.subplots(1, 2)\naxs[0].plot(a)\naxs[1].bar(x, h)" },
        { heading: P("Títulos y doble eje", "Titles and twin axis"), body: P("`fig.suptitle(...)` titula toda la figura; `ax.twinx()` añade un segundo eje Y para otra magnitud.", "`fig.suptitle(...)` titles the whole figure; `ax.twinx()` adds a second Y axis for another magnitude."), code: "fig.suptitle('Informe')\nax2 = ax.twinx()" },
      ],
      keyTakeaway: P("Varios ax.plot se superponen (usa leyenda); plt.subplots(f, c) crea rejilla (axs[i]); sharex/sharey alinean; fig.suptitle titula todo; ax.twinx da segundo eje Y.", "Several ax.plot overlay (use a legend); plt.subplots(r, c) makes a grid (axs[i]); sharex/sharey align; fig.suptitle titles all; ax.twinx gives a second Y axis."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill", "Bill's Load"),
    lore_intro: P("Dibuja dos rutas de Bill el Poney en el mismo gráfico.", "Draw two of Bill the Pony's routes in the same chart."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dos líneas", "Two lines"),
      instructions: P("Escribe `dos_lineas(ax, a, b)` que dibuje dos líneas: `ax.plot(a)` y `ax.plot(b)`.", "Write `dos_lineas(ax, a, b)` that draws two lines: `ax.plot(a)` and `ax.plot(b)`."),
      starter_code: "def dos_lineas(ax, a, b):\n    pass\n",
      blocks: ["def dos_lineas(ax, a, b):", "    ax.plot(a)", "    ax.plot(b)", "    ax.plot(a, b)"],
      hints: [P("Dos llamadas a `plot`, una por serie.", "Two `plot` calls, one per series.")],
      test_cases: [
        { input: "_nlineas(dos_lineas, [1, 2], [3, 4])", expected: 2, description: P("Dos líneas", "Two lines"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Segunda Línea", "The Second Line"),
    lore_intro: P("La resistencia de la Comunidad es la SEGUNDA serie. Dibújala tras la primera.", "The Fellowship's resistance is the SECOND series. Draw it after the first."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Orden de las series", "Order of the series"),
      instructions: P("Escribe `segunda(ax, a, b)` que dibuje primero `ax.plot(a)` y luego `ax.plot(b)`. La segunda línea será `b`.", "Write `segunda(ax, a, b)` that first draws `ax.plot(a)` and then `ax.plot(b)`. The second line will be `b`."),
      starter_code: "def segunda(ax, a, b):\n    pass\n",
      blocks: ["def segunda(ax, a, b):", "    ax.plot(a)", "    ax.plot(b)", "    ax.plot(b)\n    ax.plot(a)"],
      hints: [P("El orden importa: `a` primero, `b` después.", "Order matters: `a` first, `b` after.")],
      test_cases: [
        { input: "_ydata1(segunda, [1, 2], [3, 4])", expected: [3, 4], description: P("La segunda es b", "The second is b"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("Las Tres Sendas", "The Three Paths"),
    lore_intro: P("Dibuja tantas líneas como sendas te den: una por cada serie de la lista.", "Draw as many lines as paths you're given: one per series in the list."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Bucle de series", "Loop of series"),
      instructions: P("Escribe `tres_series(ax, series)` que reciba una lista de series y dibuje una línea por cada una con un bucle (`for s in series: ax.plot(s)`).", "Write `tres_series(ax, series)` that takes a list of series and draws one line per series with a loop (`for s in series: ax.plot(s)`)."),
      starter_code: "def tres_series(ax, series):\n    pass\n",
      blocks: ["def tres_series(ax, series):", "    for s in series:", "        ax.plot(s)", "    ax.plot(series)"],
      hints: [P("Recorre `series` con un `for`.", "Iterate `series` with a `for`."), P("`ax.plot(s)` dentro del bucle.", "`ax.plot(s)` inside the loop.")],
      test_cases: [
        { input: "_nlineas(tres_series, [[1, 2], [3, 4], [5, 6]])", expected: 3, description: P("Tres líneas", "Three lines"), raw: true },
        { input: "_nlineas(tres_series, [[1, 2]])", expected: 1, description: P("Una senda", "One path"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 6 · Histogramas y distribuciones
 * ===================================================================== */
const Q_H_HIST = { question: P("¿Cómo dibujas un histograma de `datos`?", "How do you draw a histogram of `datos`?"),
  options: [P("ax.hist(datos)", "ax.hist(datos)"), P("ax.bar(datos)", "ax.bar(datos)"), P("ax.plot(datos)", "ax.plot(datos)"), P("ax.histogram(datos)", "ax.histogram(datos)")],
  correct: 0, explanation: P("`ax.hist(datos)` agrupa los valores en intervalos (bins) y dibuja una barra por intervalo con su frecuencia. Muestra la DISTRIBUCIÓN de una variable.", "`ax.hist(datos)` groups the values into intervals (bins) and draws one bar per interval with its frequency. It shows the DISTRIBUTION of a variable.") };
const Q_H_BINS = { question: P("¿Qué controla `bins=` en `ax.hist(datos, bins=10)`?", "What does `bins=` control in `ax.hist(datos, bins=10)`?"),
  options: [P("El número de intervalos en que se agrupan los datos", "The number of intervals the data is grouped into"), P("El color", "The color"), P("El título", "The title"), P("El número de datos", "The number of data points")],
  correct: 0, explanation: P("`bins` fija en cuántos tramos se divide el rango. Pocos bins → visión gruesa; muchos → más detalle (y ruido). Es la decisión clave de un histograma.", "`bins` sets how many segments the range is split into. Few bins → coarse view; many → more detail (and noise). It's a histogram's key decision.") };
const Q_H_VS = { question: P("¿En qué se diferencia un histograma de un gráfico de barras?", "How does a histogram differ from a bar chart?"),
  options: [P("El histograma agrupa datos NUMÉRICOS en rangos; las barras comparan CATEGORÍAS dadas", "The histogram groups NUMERIC data into ranges; bars compare given CATEGORIES"), P("Son idénticos", "They're identical"), P("El histograma es horizontal", "The histogram is horizontal"), P("El histograma no usa barras", "The histogram uses no bars")],
  correct: 0, explanation: P("En barras tú das la categoría y su valor. En un histograma das datos crudos y matplotlib los reparte en intervalos y cuenta cuántos caen en cada uno.", "In a bar chart you give the category and its value. In a histogram you give raw data and matplotlib bins them into intervals and counts how many fall in each.") };
const Q_H_WHEN = { question: P("¿Para qué sirve un histograma?", "What is a histogram for?"),
  options: [P("Ver cómo se DISTRIBUYE una variable (dónde se concentran los valores)", "Seeing how a variable is DISTRIBUTED (where the values cluster)"), P("Comparar dos categorías", "Comparing two categories"), P("Ver la evolución temporal", "Seeing a time trend"), P("Relacionar dos variables", "Relating two variables")],
  correct: 0, explanation: P("El histograma responde '¿cómo se reparten mis datos?': ¿son simétricos, sesgados, con dos picos? Es el primer vistazo a una variable numérica.", "The histogram answers 'how is my data spread?': symmetric, skewed, two peaks? It's the first look at a numeric variable.") };
const Q_H_FREQ = { question: P("¿Qué representa la altura de cada barra de un histograma?", "What does each histogram bar's height represent?"),
  options: [P("Cuántos valores caen en ese intervalo (frecuencia)", "How many values fall in that interval (frequency)"), P("El valor medio", "The mean value"), P("El máximo", "The maximum"), P("El número de bins", "The number of bins")],
  correct: 0, explanation: P("Cada barra cuenta las observaciones de su tramo. Las barras altas marcan los valores más frecuentes; las bajas, los raros.", "Each bar counts the observations in its range. Tall bars mark the most frequent values; short ones, the rare.") };
const Q_H_DENSITY = { question: P("¿Qué hace `ax.hist(datos, density=True)`?", "What does `ax.hist(datos, density=True)` do?"),
  options: [P("Normaliza para que el área sume 1 (proporciones, no conteos)", "Normalizes so the area sums to 1 (proportions, not counts)"), P("Aumenta el número de barras", "Increases the number of bars"), P("Pone más color", "Adds more color"), P("Ordena los datos", "Sorts the data")],
  correct: 0, explanation: P("Con `density=True` el eje Y pasa de frecuencias a densidad de probabilidad: útil para comparar distribuciones de tamaños distintos.", "With `density=True` the Y axis switches from frequencies to probability density: handy to compare distributions of different sizes.") };
const Q_H_EDGES = { question: P("¿Qué devuelve `ax.hist(...)`?", "What does `ax.hist(...)` return?"),
  options: [P("Los conteos, los bordes de los bins y los parches", "The counts, the bin edges and the patches"), P("Sólo la figura", "Only the figure"), P("Nada", "Nothing"), P("Una línea", "A line")],
  correct: 0, explanation: P("`n, bins, patches = ax.hist(...)`: `n` los conteos por intervalo, `bins` los bordes, `patches` las barras. Útil si necesitas los números además del dibujo.", "`n, bins, patches = ax.hist(...)`: `n` the counts per interval, `bins` the edges, `patches` the bars. Useful if you need the numbers besides the drawing.") };
const Q_H_DETAIL = { question: P("¿Qué pasa si subes mucho el número de `bins`?", "What happens if you raise the number of `bins` a lot?"),
  options: [P("Más detalle, pero puede aparecer ruido y huecos", "More detail, but noise and gaps may appear"), P("Menos detalle", "Less detail"), P("Da error", "It errors"), P("Cambia el color", "It changes the color")],
  correct: 0, explanation: P("Muchos bins revelan matices pero fragmentan los datos (barras vacías). Pocos suavizan de más. Se busca un equilibrio según el tamaño de la muestra.", "Many bins reveal nuance but fragment the data (empty bars). Few oversmooth. You seek a balance based on the sample size.") };
const Q_H_PATCHES = { question: P("Con `bins=5`, ¿cuántas barras dibuja el histograma?", "With `bins=5`, how many bars does the histogram draw?"),
  options: [P("5 (una por intervalo)", "5 (one per interval)"), P("Depende de los datos", "Depends on the data"), P("Siempre 10", "Always 10"), P("1", "1")],
  correct: 0, explanation: P("`bins=5` produce 5 intervalos y, por tanto, 5 barras (aunque alguna pueda quedar a altura 0). El número de barras lo fija `bins`, no los datos.", "`bins=5` yields 5 intervals and thus 5 bars (some may end at height 0). The bar count is set by `bins`, not the data.") };

export const SYL_MPL_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_H_HIST, Q_H_BINS, Q_H_PATCHES] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_H_VS, Q_H_WHEN, Q_H_FREQ] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_H_DENSITY, Q_H_EDGES, Q_H_DETAIL] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("Muestra cómo se distribuye el daño de la horda de Moria en un histograma completo.", "Show how Moria's horde damage is distributed in a full histogram."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Histograma con etiquetas", "Histogram with labels"),
      instructions: P("Escribe `distribucion(ax, datos)` que dibuje `ax.hist(datos, bins=5)`, ponga el título `\"Horda\"` y etiquete el eje X como `\"daño\"`.", "Write `distribucion(ax, datos)` that draws `ax.hist(datos, bins=5)`, sets the title `\"Horda\"` and labels the X axis `\"daño\"`."),
      starter_code: "def distribucion(ax, datos):\n    pass\n",
      blocks: ["def distribucion(ax, datos):", "    ax.hist(datos, bins=5)", '    ax.set_title("Horda")', '    ax.set_xlabel("daño")', "    ax.bar(datos, bins=5)"],
      hints: [P("`ax.hist(datos, bins=5)` agrupa en 5 intervalos.", "`ax.hist(datos, bins=5)` groups into 5 intervals."), P("Título y eje X con `set_title` y `set_xlabel`.", "Title and X axis with `set_title` and `set_xlabel`.")],
      test_cases: [
        { input: "_nbarras(distribucion, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])", expected: 5, description: P("Cinco intervalos", "Five intervals"), raw: true },
        { input: "_titulo(distribucion, [1, 2, 3, 4, 5])", expected: "Horda", description: P("El título", "The title"), raw: true },
        { input: "_xlabel(distribucion, [1, 2, 3, 4, 5])", expected: "daño", description: P("Etiqueta X", "X label"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino de la Distribución", "The Scroll of Distribution"),
    lore_intro: P("Un pergamino enano enseña a ver cómo se reparten los datos.", "A dwarven scroll teaches how to see how data is spread."),
    scroll: {
      topic: P("Histogramas", "Histograms"),
      sections: [
        { heading: P("hist y bins", "hist and bins"), body: P("`ax.hist(datos, bins=N)` agrupa los valores en N intervalos y cuenta cuántos caen en cada uno. La altura es la frecuencia.", "`ax.hist(datos, bins=N)` groups the values into N intervals and counts how many fall in each. The height is the frequency."), code: "ax.hist(edades, bins=10)" },
        { heading: P("Histograma vs barras", "Histogram vs bars"), body: P("El histograma reparte datos NUMÉRICOS crudos en rangos; las barras comparan categorías que tú das. `bins=5` → 5 barras.", "The histogram splits raw NUMERIC data into ranges; bars compare categories you provide. `bins=5` → 5 bars."), code: "ax.hist(datos, bins=5)  # 5 barras" },
        { heading: P("Para qué sirve", "What it's for"), body: P("Responde '¿cómo se distribuye mi variable?': simétrica, sesgada, con picos. `density=True` normaliza el área a 1.", "It answers 'how is my variable distributed?': symmetric, skewed, peaked. `density=True` normalizes the area to 1."), code: "ax.hist(datos, bins=20, density=True)" },
      ],
      keyTakeaway: P("ax.hist(datos, bins=N) muestra la distribución de una variable numérica: N intervalos, N barras, altura = frecuencia. Distinto de bar (categorías). density=True normaliza.", "ax.hist(datos, bins=N) shows a numeric variable's distribution: N intervals, N bars, height = frequency. Different from bar (categories). density=True normalizes."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P("Reparte en tres tramos los intentos de abrir la puerta.", "Split the door-opening attempts into three ranges."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Histograma básico", "Basic histogram"),
      instructions: P("Escribe `histograma(ax, datos)` que dibuje un histograma de 3 intervalos con `ax.hist(datos, bins=3)`.", "Write `histograma(ax, datos)` that draws a 3-interval histogram with `ax.hist(datos, bins=3)`."),
      starter_code: "def histograma(ax, datos):\n    pass\n",
      blocks: ["def histograma(ax, datos):", "    ax.hist(datos, bins=3)", "    ax.bar(datos, bins=3)", "    ax.plot(datos)"],
      hints: [P("`ax.hist(datos, bins=3)`.", "`ax.hist(datos, bins=3)`.")],
      test_cases: [
        { input: "_nbarras(histograma, [1, 2, 3, 4, 5, 6])", expected: 3, description: P("Tres intervalos", "Three intervals"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Titula el histograma de las bajas en la cámara.", "Title the histogram of casualties in the chamber."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Histograma con título", "Histogram with a title"),
      instructions: P("Escribe `hist_titulo(ax, datos)` que dibuje `ax.hist(datos, bins=3)` y ponga el título `\"Mazarbul\"`.", "Write `hist_titulo(ax, datos)` that draws `ax.hist(datos, bins=3)` and sets the title `\"Mazarbul\"`."),
      starter_code: "def hist_titulo(ax, datos):\n    pass\n",
      blocks: ["def hist_titulo(ax, datos):", "    ax.hist(datos, bins=3)", '    ax.set_title("Mazarbul")', "    ax.hist(datos)"],
      hints: [P("`ax.hist(datos, bins=3)` y `ax.set_title(...)`.", "`ax.hist(datos, bins=3)` and `ax.set_title(...)`.")],
      test_cases: [
        { input: "_nbarras(hist_titulo, [1, 2, 3, 4, 5, 6])", expected: 3, description: P("Tres intervalos", "Three intervals"), raw: true },
        { input: "_titulo(hist_titulo, [1, 2, 3])", expected: "Mazarbul", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Deja que quien llama elija en cuántos tramos partir el abismo.", "Let the caller choose how many segments to split the chasm into."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("bins como parámetro", "bins as a parameter"),
      instructions: P("Escribe `hist_bins(ax, datos, n)` que dibuje un histograma con `n` intervalos: `ax.hist(datos, bins=n)`.", "Write `hist_bins(ax, datos, n)` that draws a histogram with `n` intervals: `ax.hist(datos, bins=n)`."),
      starter_code: "def hist_bins(ax, datos, n):\n    pass\n",
      blocks: ["def hist_bins(ax, datos, n):", "    ax.hist(datos, bins=n)", "    ax.hist(datos, bins=3)", "    ax.hist(datos, n)"],
      hints: [P("Pásale la variable `n` a `bins=`.", "Pass the variable `n` to `bins=`.")],
      test_cases: [
        { input: "_nbarras(hist_bins, [1, 2, 3, 4, 5, 6], 6)", expected: 6, description: P("Seis intervalos", "Six intervals"), raw: true },
        { input: "_nbarras(hist_bins, [1, 2, 3, 4], 2)", expected: 2, description: P("Dos intervalos", "Two intervals"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Un histograma con ejes etiquetados: daño y frecuencia en la galería.", "A histogram with labeled axes: damage and frequency in the gallery."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Histograma etiquetado", "Labeled histogram"),
      instructions: P("Escribe `hist_completo(ax, datos)` que dibuje `ax.hist(datos, bins=4)`, etiquete el eje X como `\"daño\"` y el eje Y como `\"frecuencia\"`.", "Write `hist_completo(ax, datos)` that draws `ax.hist(datos, bins=4)`, labels the X axis `\"daño\"` and the Y axis `\"frecuencia\"`."),
      starter_code: "def hist_completo(ax, datos):\n    pass\n",
      blocks: ["def hist_completo(ax, datos):", "    ax.hist(datos, bins=4)", '    ax.set_xlabel("daño")', '    ax.set_ylabel("frecuencia")', "    ax.hist(datos)"],
      hints: [P("`bins=4`, luego `set_xlabel` y `set_ylabel`.", "`bins=4`, then `set_xlabel` and `set_ylabel`.")],
      test_cases: [
        { input: "_nbarras(hist_completo, [1, 2, 3, 4, 5, 6, 7, 8])", expected: 4, description: P("Cuatro intervalos", "Four intervals"), raw: true },
        { input: "_xlabel(hist_completo, [1, 2, 3, 4])", expected: "daño", description: P("Etiqueta X", "X label"), raw: true },
      ],
    },
  },
};

/* ===================================================================== *
 * Capítulo 7 · Límites, marcas y anotaciones
 * ===================================================================== */
const Q_L_YLIM = { question: P("¿Cómo fijas el rango visible del eje Y de 0 a 100?", "How do you set the Y axis visible range from 0 to 100?"),
  options: [P("ax.set_ylim(0, 100)", "ax.set_ylim(0, 100)"), P("ax.ylim = (0, 100)", "ax.ylim = (0, 100)"), P("ax.set_yrange(0, 100)", "ax.set_yrange(0, 100)"), P("ax.limit_y(0, 100)", "ax.limit_y(0, 100)")],
  correct: 0, explanation: P("`ax.set_ylim(min, max)` fija el rango del eje Y; `ax.set_xlim(min, max)`, el del X. Controlan qué parte de los datos se ve.", "`ax.set_ylim(min, max)` sets the Y axis range; `ax.set_xlim(min, max)`, the X. They control which part of the data is shown.") };
const Q_L_WHY = { question: P("¿Por qué fijarías manualmente los límites de un eje?", "Why would you manually set an axis's limits?"),
  options: [P("Para hacer zoom, comparar en la misma escala o evitar engaños visuales", "To zoom, compare on the same scale or avoid misleading views"), P("Para que sea más lento", "To make it slower"), P("Nunca se hace", "It's never done"), P("Para borrar datos", "To delete data")],
  correct: 0, explanation: P("Ajustar límites enfoca la zona de interés o iguala escalas entre gráficos. Ojo: recortar el eje Y puede exagerar diferencias (buen o mal uso).", "Adjusting limits focuses the area of interest or matches scales across charts. Beware: cropping the Y axis can exaggerate differences (good or bad use).") };
const Q_L_XTICKS = { question: P("¿Cómo fijas EXACTAMENTE dónde van las marcas del eje X?", "How do you set EXACTLY where the X-axis ticks go?"),
  options: [P("ax.set_xticks([0, 1, 2])", "ax.set_xticks([0, 1, 2])"), P("ax.xticks = [0, 1, 2]", "ax.xticks = [0, 1, 2]"), P("ax.set_marks([0, 1, 2])", "ax.set_marks([0, 1, 2])"), P("ax.ticks(0, 1, 2)", "ax.ticks(0, 1, 2)")],
  correct: 0, explanation: P("`ax.set_xticks(posiciones)` decide dónde aparecen las marcas. Con `ax.set_xticklabels([...])` les pones texto propio (meses, nombres…).", "`ax.set_xticks(positions)` decides where the ticks appear. With `ax.set_xticklabels([...])` you give them custom text (months, names…).") };
const Q_L_TICKLABELS = { question: P("¿Cómo pones texto propio ('ene', 'feb') en las marcas del eje?", "How do you put custom text ('jan', 'feb') on the axis ticks?"),
  options: [P("ax.set_xticklabels(['ene', 'feb'])", "ax.set_xticklabels(['jan', 'feb'])"), P("ax.set_xlabel(['ene', 'feb'])", "ax.set_xlabel(['jan', 'feb'])"), P("ax.text('ene')", "ax.text('jan')"), P("ax.rename(...)", "ax.rename(...)")],
  correct: 0, explanation: P("`set_xticklabels` sustituye los números de las marcas por texto. Se usa junto a `set_xticks` para que cada posición tenga su etiqueta.", "`set_xticklabels` replaces the tick numbers with text. It's used together with `set_xticks` so each position gets its label.") };
const Q_L_GRID = { question: P("¿Qué hace `ax.grid(True)`?", "What does `ax.grid(True)` do?"),
  options: [P("Dibuja una cuadrícula de fondo para leer valores", "Draws a background grid to read values"), P("Crea subgráficos", "Creates subplots"), P("Borra el gráfico", "Deletes the chart"), P("Ordena los datos", "Sorts the data")],
  correct: 0, explanation: P("La cuadrícula ayuda a estimar valores a ojo. Se puede limitar a un eje (`axis='y'`) o darle estilo. Úsala con moderación para no recargar.", "The grid helps eyeball values. It can be limited to one axis (`axis='y'`) or styled. Use it sparingly to avoid clutter.") };
const Q_L_ANNOTATE = { question: P("¿Cómo escribes un texto en un punto concreto del gráfico?", "How do you write text at a specific point of the chart?"),
  options: [P("ax.text(x, y, 'nota') o ax.annotate('nota', xy=(x, y))", "ax.text(x, y, 'note') or ax.annotate('note', xy=(x, y))"), P("ax.set_text('nota')", "ax.set_text('note')"), P("ax.title('nota')", "ax.title('note')"), P("ax.write('nota')", "ax.write('note')")],
  correct: 0, explanation: P("`ax.text(x, y, ...)` coloca texto; `ax.annotate(...)` además puede dibujar una flecha hacia el punto. Sirven para destacar un dato clave.", "`ax.text(x, y, ...)` places text; `ax.annotate(...)` can also draw an arrow to the point. They highlight a key data point.") };
const Q_L_LINES = { question: P("¿Qué dibuja `ax.axhline(50)`?", "What does `ax.axhline(50)` draw?"),
  options: [P("Una línea horizontal de referencia en y=50", "A horizontal reference line at y=50"), P("Una barra", "A bar"), P("Un punto", "A point"), P("El eje Y", "The Y axis")],
  correct: 0, explanation: P("`axhline(y)` traza una línea horizontal (y `axvline(x)`, vertical) que cruza todo el gráfico: ideal para marcar un umbral o una media.", "`axhline(y)` draws a horizontal line (and `axvline(x)`, vertical) across the whole chart: ideal to mark a threshold or a mean.") };
const Q_L_AUTOSCALE = { question: P("Si NO fijas límites, ¿qué hace matplotlib?", "If you DON'T set limits, what does matplotlib do?"),
  options: [P("Los ajusta automáticamente a los datos (autoscale)", "It auto-fits them to the data (autoscale)"), P("Los deja en 0-1", "It leaves them at 0-1"), P("Da error", "It errors"), P("Los pone en 0-100", "It sets them to 0-100")],
  correct: 0, explanation: P("Por defecto, matplotlib encuadra los datos con un pequeño margen. Fijar límites es opcional: sólo cuando quieres controlar el encuadre.", "By default, matplotlib frames the data with a small margin. Setting limits is optional: only when you want to control the framing.") };
const Q_L_ROTATE = { question: P("¿Para qué se rotan las etiquetas del eje X (`rotation=45`)?", "Why rotate the X-axis labels (`rotation=45`)?"),
  options: [P("Para que no se solapen cuando son largas", "So they don't overlap when they're long"), P("Para hacerlas más grandes", "To make them bigger"), P("Para cambiar el color", "To change the color"), P("Es decorativo", "It's decorative")],
  correct: 0, explanation: P("Con muchas categorías o nombres largos, las etiquetas horizontales chocan. Rotarlas 45° o 90° las hace legibles sin quitar información.", "With many categories or long names, horizontal labels collide. Rotating them 45° or 90° keeps them readable without losing information.") };

export const SYL_MPL_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_L_YLIM, Q_L_WHY, Q_L_AUTOSCALE] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_L_XTICKS, Q_L_TICKLABELS, Q_L_ROTATE] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_L_GRID, Q_L_ANNOTATE, Q_L_LINES] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P("Encuadra la persecución de Uglúk: fija los límites de ambos ejes y ponle título.", "Frame Uglúk's pursuit: set both axis limits and give it a title."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Límites de los ejes", "Axis limits"),
      instructions: P("Escribe `encuadrar(ax, valores)` que dibuje `ax.plot(valores)`, fije el eje X de 0 a 5 (`ax.set_xlim(0, 5)`), el eje Y de 0 a 100 (`ax.set_ylim(0, 100)`) y ponga el título `\"Uglúk\"`.", "Write `encuadrar(ax, valores)` that draws `ax.plot(valores)`, sets the X axis from 0 to 5 (`ax.set_xlim(0, 5)`), the Y axis from 0 to 100 (`ax.set_ylim(0, 100)`) and sets the title `\"Uglúk\"`."),
      starter_code: "def encuadrar(ax, valores):\n    pass\n",
      blocks: ["def encuadrar(ax, valores):", "    ax.plot(valores)", "    ax.set_xlim(0, 5)", "    ax.set_ylim(0, 100)", '    ax.set_title("Uglúk")', "    ax.set_xlim(0, 100)"],
      hints: [P("`set_xlim(0, 5)` y `set_ylim(0, 100)`.", "`set_xlim(0, 5)` and `set_ylim(0, 100)`."), P("No olvides el título.", "Don't forget the title.")],
      test_cases: [
        { input: "_xlim(encuadrar, [1, 2, 3])", expected: [0, 5], description: P("Límite X", "X limit"), raw: true },
        { input: "_ylim(encuadrar, [1, 2, 3])", expected: [0, 100], description: P("Límite Y", "Y limit"), raw: true },
        { input: "_titulo(encuadrar, [1, 2, 3])", expected: "Uglúk", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino del Encuadre", "The Scroll of Framing"),
    lore_intro: P("Un pergamino enseña a encuadrar, marcar y anotar un gráfico.", "A scroll teaches how to frame, mark and annotate a chart."),
    scroll: {
      topic: P("Límites, marcas y anotaciones", "Limits, ticks and annotations"),
      sections: [
        { heading: P("Límites de los ejes", "Axis limits"), body: P("`ax.set_xlim(a, b)` y `ax.set_ylim(a, b)` controlan qué parte se ve. Sin ellos, matplotlib autoescala a los datos.", "`ax.set_xlim(a, b)` and `ax.set_ylim(a, b)` control which part is shown. Without them, matplotlib autoscales to the data."), code: "ax.set_xlim(0, 5)\nax.set_ylim(0, 100)" },
        { heading: P("Marcas (ticks)", "Ticks"), body: P("`ax.set_xticks([...])` fija dónde van las marcas; `ax.set_xticklabels([...])` les da texto. `rotation=45` evita solapes.", "`ax.set_xticks([...])` sets where ticks go; `ax.set_xticklabels([...])` gives them text. `rotation=45` avoids overlaps."), code: "ax.set_xticks([0, 1, 2])\nax.set_xticklabels(['ene', 'feb', 'mar'])" },
        { heading: P("Anotaciones y referencias", "Annotations and references"), body: P("`ax.text(x, y, '...')` escribe texto; `ax.annotate` añade flecha; `ax.axhline(y)`/`axvline(x)` marcan umbrales; `ax.grid(True)` pone cuadrícula.", "`ax.text(x, y, '...')` writes text; `ax.annotate` adds an arrow; `ax.axhline(y)`/`axvline(x)` mark thresholds; `ax.grid(True)` adds a grid."), code: "ax.axhline(50)\nax.text(1, 90, 'pico')\nax.grid(True)" },
      ],
      keyTakeaway: P("set_xlim/set_ylim encuadran; set_xticks(+labels) fijan las marcas; grid, text/annotate y axhline/axvline anotan y referencian. Sin límites, autoescala.", "set_xlim/set_ylim frame; set_xticks(+labels) fix the ticks; grid, text/annotate and axhline/axvline annotate and reference. Without limits, autoscale."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "Galadriel's Phial"),
    lore_intro: P("Encierra la luz del frasco entre 0 y 100 en el eje Y.", "Bound the phial's light between 0 and 100 on the Y axis."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Límite del eje Y", "Y axis limit"),
      instructions: P("Escribe `con_limites(ax, valores)` que dibuje `ax.plot(valores)` y fije el eje Y de 0 a 100 con `ax.set_ylim(0, 100)`.", "Write `con_limites(ax, valores)` that draws `ax.plot(valores)` and sets the Y axis from 0 to 100 with `ax.set_ylim(0, 100)`."),
      starter_code: "def con_limites(ax, valores):\n    pass\n",
      blocks: ["def con_limites(ax, valores):", "    ax.plot(valores)", "    ax.set_ylim(0, 100)", "    ax.set_xlim(0, 100)"],
      hints: [P("`ax.set_ylim(0, 100)`.", "`ax.set_ylim(0, 100)`.")],
      test_cases: [
        { input: "_ylim(con_limites, [1, 2, 3])", expected: [0, 100], description: P("Límite Y", "Y limit"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("Coloca las marcas del eje X justo en 0, 1 y 2.", "Place the X-axis ticks exactly at 0, 1 and 2."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Marcas del eje", "Axis ticks"),
      instructions: P("Escribe `con_ticks(ax, valores)` que dibuje `ax.plot(valores)` y fije las marcas del eje X en `[0, 1, 2]` con `ax.set_xticks([0, 1, 2])`.", "Write `con_ticks(ax, valores)` that draws `ax.plot(valores)` and sets the X-axis ticks at `[0, 1, 2]` with `ax.set_xticks([0, 1, 2])`."),
      starter_code: "def con_ticks(ax, valores):\n    pass\n",
      blocks: ["def con_ticks(ax, valores):", "    ax.plot(valores)", "    ax.set_xticks([0, 1, 2])", "    ax.set_xlim([0, 1, 2])"],
      hints: [P("`ax.set_xticks([0, 1, 2])`.", "`ax.set_xticks([0, 1, 2])`.")],
      test_cases: [
        { input: "_xticks(con_ticks, [5, 6, 7])", expected: [0, 1, 2], description: P("Las marcas", "The ticks"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("Encuadra el eje X del viaje de 0 a 10.", "Frame the journey's X axis from 0 to 10."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Límite del eje X", "X axis limit"),
      instructions: P("Escribe `con_xlim(ax, valores)` que dibuje `ax.plot(valores)` y fije el eje X de 0 a 10 con `ax.set_xlim(0, 10)`.", "Write `con_xlim(ax, valores)` that draws `ax.plot(valores)` and sets the X axis from 0 to 10 with `ax.set_xlim(0, 10)`."),
      starter_code: "def con_xlim(ax, valores):\n    pass\n",
      blocks: ["def con_xlim(ax, valores):", "    ax.plot(valores)", "    ax.set_xlim(0, 10)", "    ax.set_ylim(0, 10)"],
      hints: [P("`ax.set_xlim(0, 10)`.", "`ax.set_xlim(0, 10)`.")],
      test_cases: [
        { input: "_xlim(con_xlim, [1, 2, 3])", expected: [0, 10], description: P("Límite X", "X limit"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 8 · Síntesis: un gráfico que se lee solo (capstone)
 * ===================================================================== */
const Q_D_COMPLETE = { question: P("¿Qué NO puede faltarle a un gráfico para entenderse solo?", "What can a chart NOT miss to be self-explanatory?"),
  options: [P("Título y ejes etiquetados", "A title and labeled axes"), P("Muchos colores", "Lots of colors"), P("Una cuadrícula densa", "A dense grid"), P("Efectos 3D", "3D effects")],
  correct: 0, explanation: P("Un buen gráfico dice QUÉ muestra (título) y qué mide cada eje (etiquetas). Con eso, se entiende sin explicación aparte. Lo demás es secundario.", "A good chart says WHAT it shows (title) and what each axis measures (labels). With that, it's understood without a separate explanation. The rest is secondary.") };
const Q_D_CHOOSE = { question: P("Quieres COMPARAR ventas entre 5 regiones. ¿Qué gráfico?", "You want to COMPARE sales across 5 regions. Which chart?"),
  options: [P("Barras", "Bars"), P("Histograma", "Histogram"), P("Dispersión", "Scatter"), P("Tarta 3D", "3D pie")],
  correct: 0, explanation: P("Comparar categorías → barras. Tendencia en el tiempo → líneas. Relación entre dos variables → dispersión. Distribución de una variable → histograma. Elegir bien es clave.", "Compare categories → bars. Trend over time → lines. Relationship between two variables → scatter. Distribution of one variable → histogram. Choosing well is key.") };
const Q_D_TREND = { question: P("Para mostrar la EVOLUCIÓN de la temperatura por hora, ¿qué gráfico?", "To show the temperature TREND by hour, which chart?"),
  options: [P("Líneas", "Lines"), P("Barras", "Bars"), P("Tarta", "Pie"), P("Histograma", "Histogram")],
  correct: 0, explanation: P("Una serie continua en el tiempo se muestra con líneas: conectan los puntos y revelan subidas y bajadas. Las barras servirían para comparar categorías, no una evolución.", "A continuous time series is shown with lines: they connect the points and reveal ups and downs. Bars would compare categories, not a trend.") };
const Q_D_RELATION = { question: P("Para ver si horas de estudio y nota van juntas, ¿qué gráfico?", "To see if study hours and grade go together, which chart?"),
  options: [P("Dispersión (scatter)", "Scatter"), P("Barras", "Bars"), P("Líneas", "Lines"), P("Histograma", "Histogram")],
  correct: 0, explanation: P("La relación entre dos variables numéricas se ve con dispersión: cada punto es un caso, y la forma de la nube revela si hay correlación.", "The relationship between two numeric variables is seen with a scatter: each point is a case, and the cloud's shape reveals whether there's correlation.") };
const Q_D_LEGEND = { question: P("Cuando hay varias series en un gráfico, ¿qué añades siempre?", "When there are several series in a chart, what do you always add?"),
  options: [P("Una leyenda que diga qué es cada una", "A legend saying what each one is"), P("Nada", "Nothing"), P("Un tercer eje", "A third axis"), P("Más bins", "More bins")],
  correct: 0, explanation: P("Sin leyenda, varias líneas son un enigma. `label=` en cada serie + `ax.legend()` es obligado en cuanto hay más de una.", "Without a legend, several lines are a puzzle. `label=` on each series + `ax.legend()` is a must as soon as there's more than one.") };
const Q_D_JUNK = { question: P("¿Qué es el 'chartjunk' que conviene evitar?", "What is 'chartjunk' that's best avoided?"),
  options: [P("Adornos que no aportan información y estorban la lectura", "Decorations that add no information and hinder reading"), P("Los títulos", "Titles"), P("Los datos", "The data"), P("Las etiquetas", "Labels")],
  correct: 0, explanation: P("Efectos 3D, fondos, exceso de colores o rejillas densas distraen del dato. Un gráfico claro quita todo lo que no ayude a entender la información.", "3D effects, backgrounds, too many colors or dense grids distract from the data. A clear chart removes anything that doesn't help understand the information.") };
const Q_D_TIGHT = { question: P("¿Qué hace `fig.tight_layout()`?", "What does `fig.tight_layout()` do?"),
  options: [P("Ajusta los márgenes para que nada se solape", "Adjusts the margins so nothing overlaps"), P("Borra la figura", "Deletes the figure"), P("Añade una leyenda", "Adds a legend"), P("Cambia los colores", "Changes the colors")],
  correct: 0, explanation: P("Con varios subgráficos, títulos y etiquetas pueden pisarse. `tight_layout()` recalcula los espacios para que todo quepa y se lea. Imprescindible en dashboards.", "With several subplots, titles and labels can collide. `tight_layout()` recomputes the spacing so everything fits and reads. Essential in dashboards.") };
const Q_D_SAVE = { question: P("¿Cómo exportas la figura a un fichero PNG?", "How do you export the figure to a PNG file?"),
  options: [P("fig.savefig('grafico.png')", "fig.savefig('chart.png')"), P("plt.export('grafico.png')", "plt.export('chart.png')"), P("ax.save('grafico.png')", "ax.save('chart.png')"), P("fig.png()", "fig.png()")],
  correct: 0, explanation: P("`fig.savefig('nombre.png')` guarda la figura; con `dpi=` controlas la resolución. Es lo que usas para informes en vez de `plt.show()`.", "`fig.savefig('name.png')` saves the figure; with `dpi=` you control the resolution. It's what you use for reports instead of `plt.show()`.") };
const Q_D_SUBPLOTS = { question: P("Para un DASHBOARD con 4 gráficos a la vez, ¿qué usas?", "For a DASHBOARD with 4 charts at once, what do you use?"),
  options: [P("plt.subplots(2, 2) y dibujas en cada axs[i, j]", "plt.subplots(2, 2) and draw on each axs[i, j]"), P("Cuatro figuras separadas siempre", "Four separate figures always"), P("Un solo ax con todo encima", "A single ax with everything on top"), P("No se puede", "You can't")],
  correct: 0, explanation: P("Una rejilla de ejes (`plt.subplots(2, 2)`) reúne varios gráficos en una figura: cada `axs[i, j]` es uno. Con `fig.suptitle` y `tight_layout` queda un panel limpio.", "A grid of axes (`plt.subplots(2, 2)`) gathers several charts in one figure: each `axs[i, j]` is one. With `fig.suptitle` and `tight_layout` you get a clean panel.") };

export const SYL_MPL_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_D_COMPLETE, Q_D_CHOOSE, Q_D_TREND] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_D_RELATION, Q_D_LEGEND, Q_D_JUNK] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_D_TIGHT, Q_D_SAVE, Q_D_SUBPLOTS] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("El informe final de Lurtz: barras por unidad, con leyenda, título y ambos ejes etiquetados. Todo lo aprendido en un solo gráfico.", "Lurtz's final report: bars per unit, with a legend, title and both axes labeled. Everything learned in a single chart."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Gráfico completo (capstone)", "A complete chart (capstone)"),
      instructions: P("Escribe `informe(ax, etiquetas, valores)` que:\n1. dibuje `ax.bar(etiquetas, valores, label=\"tropas\")`,\n2. llame a `ax.legend()`,\n3. ponga el título `\"Isengard\"`,\n4. etiquete el eje X como `\"unidad\"` y el eje Y como `\"nº\"`.", "Write `informe(ax, etiquetas, valores)` that:\n1. draws `ax.bar(etiquetas, valores, label=\"tropas\")`,\n2. calls `ax.legend()`,\n3. sets the title `\"Isengard\"`,\n4. labels the X axis `\"unidad\"` and the Y axis `\"nº\"`."),
      starter_code: "def informe(ax, etiquetas, valores):\n    pass\n",
      blocks: ["def informe(ax, etiquetas, valores):", '    ax.bar(etiquetas, valores, label="tropas")', "    ax.legend()", '    ax.set_title("Isengard")', '    ax.set_xlabel("unidad")', '    ax.set_ylabel("nº")', "    ax.plot(etiquetas, valores)"],
      hints: [P("Barras con `label=\"tropas\"`, luego `ax.legend()`.", "Bars with `label=\"tropas\"`, then `ax.legend()`."), P("Título + `set_xlabel` + `set_ylabel`.", "Title + `set_xlabel` + `set_ylabel`.")],
      test_cases: [
        { input: "_alturas(informe, ['a', 'b'], [5, 6])", expected: [5, 6], description: P("Las alturas", "The heights"), raw: true },
        { input: "_leyenda(informe, ['a', 'b'], [5, 6])", expected: ["tropas"], description: P("La leyenda", "The legend"), raw: true },
        { input: "_titulo(informe, ['a', 'b'], [5, 6])", expected: "Isengard", description: P("El título", "The title"), raw: true },
        { input: "_nbarras(informe, ['a', 'b'], [5, 6])", expected: 2, description: P("Dos barras", "Two bars"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino del Informe", "The Scroll of the Report"),
    lore_intro: P("Un último pergamino reúne todo: elegir el gráfico, etiquetarlo y presentarlo.", "A last scroll gathers it all: choosing the chart, labeling it and presenting it."),
    scroll: {
      topic: P("Un gráfico que se lee solo", "A chart that reads itself"),
      sections: [
        { heading: P("Elegir el tipo", "Choosing the type"), body: P("Comparar categorías → barras; evolución → líneas; relación → dispersión; distribución → histograma. La pregunta decide el gráfico.", "Compare categories → bars; trend → lines; relationship → scatter; distribution → histogram. The question decides the chart."), code: "ax.bar(regiones, ventas)     # comparar\nax.plot(horas, temp)         # evolución" },
        { heading: P("Que se entienda solo", "Make it self-explanatory"), body: P("Título + ejes etiquetados + leyenda si hay varias series. Evita el 'chartjunk' (adornos que no informan).", "Title + labeled axes + legend if there are several series. Avoid 'chartjunk' (decorations that don't inform)."), code: "ax.set_title('Isengard')\nax.set_xlabel('unidad'); ax.set_ylabel('nº')\nax.legend()" },
        { heading: P("Presentar y exportar", "Present and export"), body: P("`plt.subplots(2, 2)` arma un dashboard; `fig.tight_layout()` evita solapes; `fig.savefig('informe.png')` lo exporta.", "`plt.subplots(2, 2)` builds a dashboard; `fig.tight_layout()` avoids overlaps; `fig.savefig('report.png')` exports it."), code: "fig, axs = plt.subplots(2, 2)\nfig.suptitle('Panel')\nfig.tight_layout()\nfig.savefig('informe.png')" },
      ],
      keyTakeaway: P("La pregunta elige el gráfico (barras/líneas/dispersión/histograma); título + ejes + leyenda lo hacen legible; subplots + suptitle + tight_layout arman el dashboard; savefig lo exporta.", "The question picks the chart (bars/lines/scatter/histogram); title + axes + legend make it readable; subplots + suptitle + tight_layout build the dashboard; savefig exports it."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P("Compara el poder que tienta a cada miembro con barras tituladas.", "Compare the power tempting each member with titled bars."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Barras con título y eje Y", "Bars with a title and Y axis"),
      instructions: P("Escribe `barras_etiquetadas(ax, etiquetas, valores)` que dibuje `ax.bar(etiquetas, valores)`, ponga el título `\"Tentación\"` y etiquete el eje Y como `\"poder\"`.", "Write `barras_etiquetadas(ax, etiquetas, valores)` that draws `ax.bar(etiquetas, valores)`, sets the title `\"Tentación\"` and labels the Y axis `\"poder\"`."),
      starter_code: "def barras_etiquetadas(ax, etiquetas, valores):\n    pass\n",
      blocks: ["def barras_etiquetadas(ax, etiquetas, valores):", "    ax.bar(etiquetas, valores)", '    ax.set_title("Tentación")', '    ax.set_ylabel("poder")', "    ax.plot(etiquetas, valores)"],
      hints: [P("`ax.bar(etiquetas, valores)`.", "`ax.bar(etiquetas, valores)`."), P("Título y eje Y.", "Title and Y axis.")],
      test_cases: [
        { input: "_alturas(barras_etiquetadas, ['a', 'b'], [4, 9])", expected: [4, 9], description: P("Las alturas", "The heights"), raw: true },
        { input: "_titulo(barras_etiquetadas, ['a', 'b'], [4, 9])", expected: "Tentación", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("Nombra la línea de la visión y muéstrala con leyenda y título.", "Name the vision line and show it with a legend and title."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Línea con leyenda y título", "Line with a legend and title"),
      instructions: P("Escribe `linea_leyenda(ax, valores)` que dibuje `ax.plot(valores, label=\"visión\")`, llame a `ax.legend()` y ponga el título `\"Amon Hen\"`.", "Write `linea_leyenda(ax, valores)` that draws `ax.plot(valores, label=\"visión\")`, calls `ax.legend()` and sets the title `\"Amon Hen\"`."),
      starter_code: "def linea_leyenda(ax, valores):\n    pass\n",
      blocks: ["def linea_leyenda(ax, valores):", '    ax.plot(valores, label="visión")', "    ax.legend()", '    ax.set_title("Amon Hen")', "    ax.plot(valores)"],
      hints: [P("`label=\"visión\"` y luego `ax.legend()`.", "`label=\"visión\"` then `ax.legend()`."), P("No olvides el título.", "Don't forget the title.")],
      test_cases: [
        { input: "_leyenda(linea_leyenda, [1, 2, 3])", expected: ["visión"], description: P("La leyenda", "The legend"), raw: true },
        { input: "_titulo(linea_leyenda, [1, 2, 3])", expected: "Amon Hen", description: P("El título", "The title"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("Dibuja la hueste como una nube de puntos con título y ejes bien rotulados.", "Draw the host as a cloud of points with a title and well-labeled axes."),
    challenge: {
      packages: ["matplotlib"], support_code: MPL_SUP,
      topic: P("Dispersión completa", "Complete scatter"),
      instructions: P("Escribe `completo(ax, xs, ys)` que dibuje `ax.scatter(xs, ys)`, ponga el título `\"Hueste\"` y etiquete el eje X como `\"fila\"` y el eje Y como `\"fuerza\"`.", "Write `completo(ax, xs, ys)` that draws `ax.scatter(xs, ys)`, sets the title `\"Hueste\"` and labels the X axis `\"fila\"` and the Y axis `\"fuerza\"`."),
      starter_code: "def completo(ax, xs, ys):\n    pass\n",
      blocks: ["def completo(ax, xs, ys):", "    ax.scatter(xs, ys)", '    ax.set_title("Hueste")', '    ax.set_xlabel("fila")', '    ax.set_ylabel("fuerza")', "    ax.plot(xs, ys)"],
      hints: [P("`ax.scatter(xs, ys)`.", "`ax.scatter(xs, ys)`."), P("Título + `set_xlabel` + `set_ylabel`.", "Title + `set_xlabel` + `set_ylabel`.")],
      test_cases: [
        { input: "_npuntos(completo, [1, 2], [3, 4])", expected: 2, description: P("Dos puntos", "Two points"), raw: true },
        { input: "_titulo(completo, [1, 2], [3, 4])", expected: "Hueste", description: P("El título", "The title"), raw: true },
        { input: "_xlabel(completo, [1, 2], [3, 4])", expected: "fila", description: P("Etiqueta X", "X label"), raw: true },
      ],
    },
  },
};
