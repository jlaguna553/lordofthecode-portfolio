import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de ANÁLISIS DE DATOS con Python (NumPy + pandas). Reviste la MISMA
 * narrativa compartida de la Comunidad con las herramientas de un analista de
 * datos. Bilingüe ES/EN. Los retos se ejecutan con Pyodide cargando los
 * paquetes `numpy`/`pandas` (campo `packages`).
 *
 * Regla de oro para los retos: los resultados en coma flotante deben ser
 * FRACCIONARIOS (2.5, no 3.0) o convertirse con int()/round(), porque Python
 * serializa 3.0 como "3.0" y JS lo compara contra "3".
 */

const P = (es: string, en: string) => ({ es, en });

/* ===================================================================== *
 * Capítulo 1 · NumPy: arrays y operaciones vectorizadas
 * ===================================================================== */

const Q_NP_IMPORT = {
  question: P(
    "¿Cómo se importa NumPy por convención?",
    "How is NumPy imported by convention?",
  ),
  options: [
    P("import numpy as np", "import numpy as np"),
    P("import numpy", "import numpy"),
    P("from numpy import *", "from numpy import *"),
    P("require('numpy')", "require('numpy')"),
  ],
  correct: 0,
  explanation: P(
    "El alias estándar es `np`: `import numpy as np`. Todo el ecosistema (docs, tutoriales) lo usa, así que `np.array`, `np.mean`… se reconocen al instante.",
    "The standard alias is `np`: `import numpy as np`. The whole ecosystem uses it, so `np.array`, `np.mean`… are recognized instantly.",
  ),
};
const Q_NP_ARRAY = {
  question: P(
    "¿Cómo creas un array de NumPy con [1, 2, 3]?",
    "How do you create a NumPy array from [1, 2, 3]?",
  ),
  options: [
    P("np.array([1, 2, 3])", "np.array([1, 2, 3])"),
    P("np.list([1, 2, 3])", "np.list([1, 2, 3])"),
    P("np.new([1, 2, 3])", "np.new([1, 2, 3])"),
    P("array(1, 2, 3)", "array(1, 2, 3)"),
  ],
  correct: 0,
  explanation: P(
    "`np.array(lista)` convierte una lista de Python en un `ndarray`, la estructura base de NumPy: homogénea y de tamaño fijo, pensada para cálculo numérico rápido.",
    "`np.array(list)` turns a Python list into an `ndarray`, NumPy's core structure: homogeneous and fixed-size, built for fast numeric computation.",
  ),
};
const Q_NP_VECTOR = {
  question: P(
    "Con `a = np.array([1, 2, 3])`, ¿qué es `a * 2`?",
    "With `a = np.array([1, 2, 3])`, what is `a * 2`?",
  ),
  options: [
    P("array([2, 4, 6]) — multiplica cada elemento", "array([2, 4, 6]) — multiplies each element"),
    P("array([1, 2, 3, 1, 2, 3]) — repite", "array([1, 2, 3, 1, 2, 3]) — repeats"),
    P("6", "6"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "Las operaciones en NumPy son VECTORIZADAS: se aplican elemento a elemento sin bucles. Ojo: con una LISTA normal, `[1,2,3] * 2` la repetiría.",
    "NumPy operations are VECTORIZED: applied element-wise with no loops. Careful: with a plain LIST, `[1,2,3] * 2` would repeat it.",
  ),
};
const Q_NP_LIST_DIFF = {
  question: P(
    "¿En qué se diferencia `np.array([1,2]) + np.array([3,4])` de sumar dos listas?",
    "How does `np.array([1,2]) + np.array([3,4])` differ from adding two lists?",
  ),
  options: [
    P("El array suma elemento a elemento → [4, 6]; las listas se CONCATENAN → [1,2,3,4]", "The array adds element-wise → [4, 6]; lists CONCATENATE → [1,2,3,4]"),
    P("Son idénticos", "They're identical"),
    P("El array da error", "The array errors"),
    P("Ambos concatenan", "Both concatenate"),
  ],
  correct: 0,
  explanation: P(
    "`+` en arrays suma posición a posición; en listas de Python concatena. Ésa es la gran ventaja de NumPy para datos: aritmética vectorizada, no manipulación de listas.",
    "`+` on arrays adds position by position; on Python lists it concatenates. That's NumPy's big win for data: vectorized arithmetic, not list manipulation.",
  ),
};
const Q_NP_SHAPE = {
  question: P("¿Qué devuelve `a.shape` de un array?", "What does an array's `a.shape` return?"),
  options: [
    P("Una tupla con las dimensiones, p. ej. (3,) o (2, 4)", "A tuple with the dimensions, e.g. (3,) or (2, 4)"),
    P("El número de elementos como entero", "The element count as an integer"),
    P("El tipo de dato", "The data type"),
    P("La suma de los elementos", "The sum of the elements"),
  ],
  correct: 0,
  explanation: P(
    "`shape` es una TUPLA: `(3,)` para 1D, `(filas, columnas)` para 2D. Es lo primero que se mira al depurar: casi todo error de datos es un desajuste de formas.",
    "`shape` is a TUPLE: `(3,)` for 1D, `(rows, columns)` for 2D. It's the first thing you check when debugging: most data errors are shape mismatches.",
  ),
};
const Q_NP_DTYPE = {
  question: P("¿Qué indica `a.dtype`?", "What does `a.dtype` indicate?"),
  options: [
    P("El tipo de los elementos (int64, float64…)", "The element type (int64, float64…)"),
    P("Las dimensiones", "The dimensions"),
    P("El número de elementos", "The element count"),
    P("Si el array está vacío", "Whether the array is empty"),
  ],
  correct: 0,
  explanation: P(
    "Un array es HOMOGÉNEO: todos sus elementos comparten `dtype` (int64, float64, bool…). Mezclar tipos o dividir enteros puede promover el array a `float64`.",
    "An array is HOMOGENEOUS: all elements share a `dtype` (int64, float64, bool…). Mixing types or dividing ints can promote the array to `float64`.",
  ),
};
const Q_NP_ARANGE = {
  question: P("¿Qué produce `np.arange(5)`?", "What does `np.arange(5)` produce?"),
  options: [
    P("array([0, 1, 2, 3, 4])", "array([0, 1, 2, 3, 4])"),
    P("array([1, 2, 3, 4, 5])", "array([1, 2, 3, 4, 5])"),
    P("array([5])", "array([5])"),
    P("array([0, 1, 2, 3, 4, 5])", "array([0, 1, 2, 3, 4, 5])"),
  ],
  correct: 0,
  explanation: P(
    "`np.arange(n)` es como `range` pero devuelve un array: de 0 a n-1. `np.linspace(0, 1, 5)` en cambio reparte 5 valores equiespaciados entre dos extremos.",
    "`np.arange(n)` is like `range` but returns an array: 0 to n-1. `np.linspace(0, 1, 5)` instead spreads 5 evenly spaced values between two endpoints.",
  ),
};
const Q_NP_INDEX = {
  question: P("Con `a = np.array([10, 20, 30, 40])`, ¿qué es `a[1:3]`?", "With `a = np.array([10, 20, 30, 40])`, what is `a[1:3]`?"),
  options: [
    P("array([20, 30])", "array([20, 30])"),
    P("array([20, 30, 40])", "array([20, 30, 40])"),
    P("array([10, 20, 30])", "array([10, 20, 30])"),
    P("20", "20"),
  ],
  correct: 0,
  explanation: P(
    "El slicing funciona como en las listas: `a[1:3]` incluye el índice 1 y excluye el 3. En arrays, además, un slice es una VISTA (comparte memoria), no una copia.",
    "Slicing works like lists: `a[1:3]` includes index 1 and excludes 3. In arrays, a slice is also a VIEW (shares memory), not a copy.",
  ),
};
const Q_NP_MASK = {
  question: P("¿Qué devuelve `a[a > 2]`?", "What does `a[a > 2]` return?"),
  options: [
    P("Los elementos de `a` MAYORES que 2 (indexado booleano)", "The elements of `a` GREATER than 2 (boolean indexing)"),
    P("Los índices donde a > 2", "The indices where a > 2"),
    P("True o False", "True or False"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "`a > 2` crea una máscara booleana (`[False, False, True…]`) y `a[máscara]` selecciona los elementos que cumplen. Es la base del FILTRADO en NumPy y pandas.",
    "`a > 2` builds a boolean mask (`[False, False, True…]`) and `a[mask]` selects the matching elements. It's the foundation of FILTERING in NumPy and pandas.",
  ),
};

export const SYL_DATA_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [Q_NP_IMPORT, Q_NP_ARRAY, Q_NP_VECTOR],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [Q_NP_LIST_DIFF, Q_NP_SHAPE, Q_NP_DTYPE],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [Q_NP_ARANGE, Q_NP_INDEX, Q_NP_MASK],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P(
      "El Nazgûl golpea con varias armas a la vez, cada una con su peso. Suma su daño total con un producto escalar de NumPy: sin bucles.",
      "The Nazgûl strikes with several weapons at once, each with its weight. Sum its total damage with a NumPy dot product: no loops.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Producto escalar (np.dot)", "Dot product (np.dot)"),
      instructions: P(
        "Escribe `dano_ponderado(golpes, pesos)` que devuelva la suma de cada golpe multiplicado por su peso, como ENTERO.\n\nUsa `np.dot(golpes, pesos)` y envuélvelo en `int(...)`.\n\nEjemplo: `dano_ponderado([2, 3, 4], [10, 10, 5])` → `2*10 + 3*10 + 4*5` = `70`.",
        "Write `dano_ponderado(golpes, pesos)` returning the sum of each hit times its weight, as an INTEGER.\n\nUse `np.dot(golpes, pesos)` wrapped in `int(...)`.\n\nExample: `dano_ponderado([2, 3, 4], [10, 10, 5])` → `2*10 + 3*10 + 4*5` = `70`.",
      ),
      starter_code: "import numpy as np\n\ndef dano_ponderado(golpes, pesos):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def dano_ponderado(golpes, pesos):",
        "    return int(np.dot(golpes, pesos))",
        "    return np.dot(golpes, pesos)",
        "    return int(np.sum(golpes) * np.sum(pesos))",
      ],
      hints: [
        P("`np.dot(a, b)` multiplica elemento a elemento y suma el resultado.", "`np.dot(a, b)` multiplies element-wise and sums the result."),
        P("Convierte a entero: `return int(np.dot(golpes, pesos))`.", "Convert to integer: `return int(np.dot(golpes, pesos))`."),
      ],
      test_cases: [
        { input: "dano_ponderado([2, 3, 4], [10, 10, 5])", expected: 70, description: P("Daño ponderado", "Weighted damage"), raw: true },
        { input: "dano_ponderado([1, 1], [100, 0])", expected: 100, description: P("Sólo cuenta el primero", "Only the first counts"), raw: true },
        { input: "dano_ponderado([5], [3])", expected: 15, description: P("Un solo golpe", "A single hit"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino del Vector", "The Scroll of the Vector"),
    lore_intro: P(
      "En un cofre de Bolsón Cerrado, un pergamino numerado enseña a tratar muchos números como uno solo.",
      "In a chest at Bag End, a numbered scroll teaches how to treat many numbers as one.",
    ),
    scroll: {
      topic: P(
        "NumPy: el array y el cálculo vectorizado",
        "NumPy: the array and vectorized computation",
      ),
      sections: [
        {
          heading: P("El ndarray", "The ndarray"),
          body: P(
            "`import numpy as np`. `np.array(lista)` crea un array homogéneo. `a.shape` da sus dimensiones y `a.dtype` el tipo de sus elementos.",
            "`import numpy as np`. `np.array(list)` creates a homogeneous array. `a.shape` gives its dimensions and `a.dtype` its element type.",
          ),
          code: "import numpy as np\na = np.array([1, 2, 3])\na.shape   # (3,)\na.dtype   # int64",
        },
        {
          heading: P("Operaciones vectorizadas", "Vectorized operations"),
          body: P(
            "La aritmética se aplica a TODO el array a la vez, sin bucles: `a * 2`, `a + b`, `np.dot(a, b)`. Es lo que hace a NumPy rápido.",
            "Arithmetic applies to the WHOLE array at once, no loops: `a * 2`, `a + b`, `np.dot(a, b)`. That's what makes NumPy fast.",
          ),
          code: "a * 2              # [2, 4, 6]\na + np.array([10, 10, 10])  # [11, 12, 13]\nnp.dot([1, 2], [3, 4])      # 11",
        },
        {
          heading: P("Slicing y máscaras", "Slicing and masks"),
          body: P(
            "`a[1:3]` toma un tramo; `a[a > 2]` selecciona por condición (indexado booleano). Es la base del filtrado de datos.",
            "`a[1:3]` takes a slice; `a[a > 2]` selects by condition (boolean indexing). It's the basis of data filtering.",
          ),
          code: "a = np.array([10, 20, 30, 40])\na[1:3]      # [20, 30]\na[a > 20]   # [30, 40]",
        },
      ],
      keyTakeaway: P(
        "np.array crea el ndarray; la aritmética es vectorizada (a*2, a+b, np.dot); a[a>x] filtra por condición. shape y dtype son tu brújula al depurar.",
        "np.array creates the ndarray; arithmetic is vectorized (a*2, a+b, np.dot); a[a>x] filters by condition. shape and dtype are your compass when debugging.",
      ),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Escalar la Provisión", "Scaling the Provisions"),
    lore_intro: P(
      "Antes de partir, multiplica de golpe todas las raciones por el número de días. Tu primer cálculo vectorizado.",
      "Before leaving, multiply all rations at once by the number of days. Your first vectorized computation.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Operación vectorizada", "Vectorized operation"),
      instructions: P(
        "Escribe `escalar(valores, factor)` que multiplique CADA valor por `factor` y devuelva una LISTA de Python.\n\nConvierte `valores` a array, multiplícalo y usa `.tolist()`.\n\nEjemplo: `escalar([1, 2, 3], 10)` → `[10, 20, 30]`.",
        "Write `escalar(valores, factor)` that multiplies EACH value by `factor` and returns a Python LIST.\n\nConvert `valores` to an array, multiply and use `.tolist()`.\n\nExample: `escalar([1, 2, 3], 10)` → `[10, 20, 30]`.",
      ),
      starter_code: "import numpy as np\n\ndef escalar(valores, factor):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def escalar(valores, factor):",
        "    return (np.array(valores) * factor).tolist()",
        "    return np.array(valores) * factor",
        "    return valores * factor",
      ],
      hints: [
        P("`np.array(valores) * factor` multiplica cada elemento.", "`np.array(valores) * factor` multiplies each element."),
        P("Devuelve una lista con `.tolist()` al final.", "Return a list with `.tolist()` at the end."),
      ],
      test_cases: [
        { input: "escalar([1, 2, 3], 10)", expected: [10, 20, 30], description: P("Multiplica cada uno", "Multiply each"), raw: true },
        { input: "escalar([0, 5], 2)", expected: [0, 10], description: P("Con el cero", "With zero"), raw: true },
        { input: "escalar([], 3)", expected: [], description: P("Lista vacía", "Empty list"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P(
      "El Jinete percibe a quien destaca. Cuenta de una sola pasada cuántos sigilos superan su umbral con una máscara booleana.",
      "The Rider senses whoever stands out. Count in one pass how many stealth values beat its threshold with a boolean mask.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Máscara booleana y conteo", "Boolean mask and counting"),
      instructions: P(
        "Escribe `sobre_umbral(valores, umbral)` que devuelva CUÁNTOS valores son ESTRICTAMENTE MAYORES que `umbral`, como entero.\n\nUsa una máscara: `np.array(valores) > umbral` y súmala con `np.sum(...)`, envuelto en `int(...)`.\n\nEjemplo: `sobre_umbral([10, 50, 90, 30], 40)` → `2`.",
        "Write `sobre_umbral(valores, umbral)` returning HOW MANY values are STRICTLY GREATER than `umbral`, as an integer.\n\nUse a mask: `np.array(valores) > umbral` and sum it with `np.sum(...)`, wrapped in `int(...)`.\n\nExample: `sobre_umbral([10, 50, 90, 30], 40)` → `2`.",
      ),
      starter_code: "import numpy as np\n\ndef sobre_umbral(valores, umbral):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def sobre_umbral(valores, umbral):",
        "    return int(np.sum(np.array(valores) > umbral))",
        "    return np.array(valores) > umbral",
        "    return int(np.sum(valores))",
      ],
      hints: [
        P("`np.array(valores) > umbral` da un array de True/False.", "`np.array(valores) > umbral` gives a True/False array."),
        P("`np.sum(mascara)` cuenta los True (True vale 1).", "`np.sum(mask)` counts the True values (True is 1)."),
      ],
      test_cases: [
        { input: "sobre_umbral([10, 50, 90, 30], 40)", expected: 2, description: P("50 y 90 superan 40", "50 and 90 beat 40"), raw: true },
        { input: "sobre_umbral([1, 2], 5)", expected: 0, description: P("Ninguno supera", "None beats it"), raw: true },
        { input: "sobre_umbral([100, 100], 50)", expected: 2, description: P("Todos superan", "All beat it"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 2 · NumPy: agregaciones y estadística
 * ===================================================================== */

const Q_NP_SUM = {
  question: P("¿Cómo sumas todos los elementos de un array `a`?", "How do you sum all elements of an array `a`?"),
  options: [
    P("a.sum() o np.sum(a)", "a.sum() or np.sum(a)"),
    P("sum(a) sólo", "sum(a) only"),
    P("a.total()", "a.total()"),
    P("a.add()", "a.add()"),
  ],
  correct: 0,
  explanation: P(
    "NumPy ofrece la agregación como MÉTODO (`a.sum()`) y como FUNCIÓN (`np.sum(a)`): son equivalentes. El `sum()` de Python también funciona, pero es más lento.",
    "NumPy offers the aggregation as a METHOD (`a.sum()`) and a FUNCTION (`np.sum(a)`): equivalent. Python's `sum()` works too, but is slower.",
  ),
};
const Q_NP_MEAN = {
  question: P("¿Qué calcula `a.mean()`?", "What does `a.mean()` compute?"),
  options: [
    P("La media (promedio) de los elementos", "The mean (average) of the elements"),
    P("El valor máximo", "The maximum value"),
    P("La mediana", "The median"),
    P("La suma", "The sum"),
  ],
  correct: 0,
  explanation: P(
    "`a.mean()` es la media aritmética: suma dividida entre el número de elementos. Ojo: es sensible a valores atípicos; para datos sesgados suele mirarse también la mediana.",
    "`a.mean()` is the arithmetic mean: sum divided by element count. Note: it's sensitive to outliers; for skewed data you also look at the median.",
  ),
};
const Q_NP_MINMAX = {
  question: P("¿Qué devuelven `a.max()` y `a.min()`?", "What do `a.max()` and `a.min()` return?"),
  options: [
    P("El valor mayor y el menor del array", "The largest and smallest value in the array"),
    P("Sus índices", "Their indices"),
    P("La media y la mediana", "The mean and the median"),
    P("True o False", "True or False"),
  ],
  correct: 0,
  explanation: P(
    "Devuelven los VALORES extremos. Si quieres su POSICIÓN, usa `a.argmax()` / `a.argmin()`. El rango de los datos es `a.max() - a.min()`.",
    "They return the extreme VALUES. For their POSITION, use `a.argmax()` / `a.argmin()`. The data range is `a.max() - a.min()`.",
  ),
};
const Q_NP_AXIS = {
  question: P("En una matriz 2D, ¿qué hace `a.sum(axis=0)`?", "In a 2D matrix, what does `a.sum(axis=0)` do?"),
  options: [
    P("Suma por COLUMNAS (colapsa las filas)", "Sums by COLUMNS (collapses the rows)"),
    P("Suma por filas", "Sums by rows"),
    P("Suma todo a un único número", "Sums everything to a single number"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "`axis=0` recorre las filas y agrega POR COLUMNA; `axis=1` agrega POR FILA. Sin `axis`, agrega TODO. Es la fuente número uno de confusión en NumPy.",
    "`axis=0` goes down the rows aggregating PER COLUMN; `axis=1` aggregates PER ROW. With no `axis`, it aggregates EVERYTHING. It's the #1 source of NumPy confusion.",
  ),
};
const Q_NP_STD = {
  question: P("¿Qué mide `a.std()`?", "What does `a.std()` measure?"),
  options: [
    P("La desviación estándar (cuánto se dispersan los datos)", "The standard deviation (how spread out the data is)"),
    P("La suma acumulada", "The cumulative sum"),
    P("El número de elementos", "The element count"),
    P("El valor más frecuente", "The most frequent value"),
  ],
  correct: 0,
  explanation: P(
    "La desviación estándar resume la DISPERSIÓN: baja = datos agrupados cerca de la media; alta = muy repartidos. `a.var()` es su cuadrado (la varianza).",
    "Standard deviation summarizes SPREAD: low = data clustered near the mean; high = widely scattered. `a.var()` is its square (the variance).",
  ),
};
const Q_NP_ARGMAX = {
  question: P("¿Qué devuelve `a.argmax()`?", "What does `a.argmax()` return?"),
  options: [
    P("El ÍNDICE del valor máximo", "The INDEX of the maximum value"),
    P("El valor máximo", "The maximum value"),
    P("El número de máximos", "The number of maxima"),
    P("True si hay un máximo", "True if there's a maximum"),
  ],
  correct: 0,
  explanation: P(
    "`argmax` da la POSICIÓN del mayor (el primero si hay empate); `max` da el valor. Sirve para saber QUÉ fila/registro tiene el pico, no sólo cuánto vale.",
    "`argmax` gives the POSITION of the largest (the first on ties); `max` gives the value. Useful to know WHICH row/record has the peak, not just its value.",
  ),
};
const Q_NP_MEDIAN = {
  question: P("¿Por qué la mediana (`np.median`) resiste mejor los valores atípicos que la media?", "Why does the median (`np.median`) resist outliers better than the mean?"),
  options: [
    P("Es el valor central: un dato extremo no la arrastra", "It's the central value: an extreme point doesn't drag it"),
    P("Porque siempre es mayor que la media", "Because it's always greater than the mean"),
    P("Porque ignora los negativos", "Because it ignores negatives"),
    P("No resiste: son iguales", "It doesn't: they're the same"),
  ],
  correct: 0,
  explanation: P(
    "La mediana es el valor que deja mitad de datos a cada lado; un único valor gigantesco casi no la mueve, mientras que a la media sí la infla. Por eso se usa en sueldos, precios…",
    "The median is the value with half the data on each side; a single huge value barely moves it, while it inflates the mean. That's why it's used for salaries, prices…",
  ),
};
const Q_NP_METHOD_VS_FUNC = {
  question: P("¿Es `a.sum()` lo mismo que `np.sum(a)`?", "Is `a.sum()` the same as `np.sum(a)`?"),
  options: [
    P("Sí: método y función son equivalentes en NumPy", "Yes: method and function are equivalent in NumPy"),
    P("No: dan resultados distintos", "No: they give different results"),
    P("Sólo el método funciona", "Only the method works"),
    P("Sólo la función funciona", "Only the function works"),
  ],
  correct: 0,
  explanation: P(
    "La mayoría de agregaciones existen como método (`a.mean()`) y como función (`np.mean(a)`). La función suele aceptar además listas de Python, convirtiéndolas al vuelo.",
    "Most aggregations exist as a method (`a.mean()`) and a function (`np.mean(a)`). The function also accepts Python lists, converting them on the fly.",
  ),
};
const Q_NP_CUMSUM = {
  question: P("¿Qué produce `np.cumsum([1, 2, 3, 4])`?", "What does `np.cumsum([1, 2, 3, 4])` produce?"),
  options: [
    P("[1, 3, 6, 10] — la suma acumulada", "[1, 3, 6, 10] — the running sum"),
    P("10 — la suma total", "10 — the total sum"),
    P("[1, 2, 3, 4]", "[1, 2, 3, 4]"),
    P("[4, 3, 2, 1]", "[4, 3, 2, 1]"),
  ],
  correct: 0,
  explanation: P(
    "`cumsum` devuelve la suma ACUMULADA paso a paso: útil para totales corridos (ventas acumuladas, saldo). `np.cumprod` hace lo mismo multiplicando.",
    "`cumsum` returns the RUNNING sum step by step: handy for running totals (cumulative sales, balance). `np.cumprod` does the same by multiplying.",
  ),
};

/** Capítulo 2 · NumPy: agregaciones y estadística. */
export const SYL_DATA_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_NP_SUM, Q_NP_MEAN, Q_NP_MINMAX] },
  c2_niebla: { kind: "battle", questions: [Q_NP_AXIS, Q_NP_STD, Q_NP_ARGMAX] },
  c2_sauce: { kind: "battle", questions: [Q_NP_MEDIAN, Q_NP_METHOD_VS_FUNC, Q_NP_CUMSUM] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P(
      "El Tumulario alza una horda de daños dispersos. Resúmelos en una sola ficha: mínimo, máximo y media. El resumen que abre cualquier análisis.",
      "The Barrow-wight raises a horde of scattered damages. Summarize them in one card: min, max and mean. The summary that opens any analysis.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Estadísticos resumen", "Summary statistics"),
      instructions: P(
        "Escribe `estadisticas(valores)` que devuelva un dict con:\n• `min`: el mínimo (entero),\n• `max`: el máximo (entero),\n• `media`: la media redondeada a 2 decimales.\n\nUsa `np.array(valores)` y sus métodos `.min()`, `.max()`, `.mean()`.\n\nEjemplo: `estadisticas([10, 20, 35])` → `{'min': 10, 'max': 35, 'media': 21.67}`.",
        "Write `estadisticas(valores)` returning a dict with:\n• `min`: the minimum (integer),\n• `max`: the maximum (integer),\n• `media`: the mean rounded to 2 decimals.\n\nUse `np.array(valores)` and its `.min()`, `.max()`, `.mean()` methods.\n\nExample: `estadisticas([10, 20, 35])` → `{'min': 10, 'max': 35, 'media': 21.67}`.",
      ),
      starter_code: "import numpy as np\n\ndef estadisticas(valores):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def estadisticas(valores):",
        "    v = np.array(valores)",
        "    return {'min': int(v.min()), 'max': int(v.max()), 'media': round(float(v.mean()), 2)}",
        "    return {'min': v.min(), 'max': v.max(), 'media': v.mean()}",
      ],
      hints: [
        P("Convierte una vez: `v = np.array(valores)`.", "Convert once: `v = np.array(valores)`."),
        P("`{'min': int(v.min()), 'max': int(v.max()), 'media': round(float(v.mean()), 2)}`.", "`{'min': int(v.min()), 'max': int(v.max()), 'media': round(float(v.mean()), 2)}`."),
      ],
      test_cases: [
        { input: "estadisticas([10, 20, 35])", expected: { min: 10, max: 35, media: 21.67 }, description: P("Resumen completo", "Full summary"), raw: true },
        { input: "estadisticas([1, 2, 4])", expected: { min: 1, max: 4, media: 2.33 }, description: P("Otro conjunto", "Another set"), raw: true },
        { input: "estadisticas([2, 3, 3])", expected: { min: 2, max: 3, media: 2.67 }, description: P("Con repetidos", "With repeats"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino del Resumen", "The Scroll of the Summary"),
    lore_intro: P(
      "Junto a la Cerca, un aviso enseña a condensar muchos números en pocos: el arte del analista.",
      "By the Hedge, a notice teaches how to condense many numbers into few: the analyst's craft.",
    ),
    scroll: {
      topic: P("NumPy: agregaciones y estadística", "NumPy: aggregations and statistics"),
      sections: [
        {
          heading: P("Agregaciones básicas", "Basic aggregations"),
          body: P(
            "`a.sum()`, `a.mean()`, `a.max()`, `a.min()`, `a.std()`. Existen como método y como función (`np.mean(a)`). Sin bucles.",
            "`a.sum()`, `a.mean()`, `a.max()`, `a.min()`, `a.std()`. Available as method and function (`np.mean(a)`). No loops.",
          ),
          code: "a = np.array([10, 20, 35])\na.sum()    # 65\na.mean()   # 21.666...\na.max()    # 35",
        },
        {
          heading: P("Posición y dispersión", "Position and spread"),
          body: P(
            "`a.argmax()` da el ÍNDICE del máximo. `a.std()` mide la dispersión; `np.median(a)` resiste los atípicos mejor que la media.",
            "`a.argmax()` gives the INDEX of the max. `a.std()` measures spread; `np.median(a)` resists outliers better than the mean.",
          ),
          code: "a.argmax()       # 2\nnp.median(a)     # 20.0\nround(a.std(), 2)",
        },
        {
          heading: P("El eje (axis)", "The axis"),
          body: P(
            "En 2D, `axis=0` agrega por columna y `axis=1` por fila. Sin `axis`, agrega todo. Redondea con `round(x, 2)` para presentar.",
            "In 2D, `axis=0` aggregates per column and `axis=1` per row. With no `axis`, everything. Round with `round(x, 2)` to present.",
          ),
          code: "m = np.array([[1, 2], [3, 4]])\nm.sum(axis=0)   # [4, 6]  (columnas)\nm.sum(axis=1)   # [3, 7]  (filas)",
        },
      ],
      keyTakeaway: P(
        "sum/mean/max/min/std resumen sin bucles; argmax da el índice del pico; axis=0 por columna, axis=1 por fila. Redondea floats para comparar y presentar.",
        "sum/mean/max/min/std summarize without loops; argmax gives the peak's index; axis=0 per column, axis=1 per row. Round floats to compare and present.",
      ),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("La Media del Sauce", "The Willow's Mean"),
    lore_intro: P(
      "El Viejo Hombre Sauce adormece con un promedio constante. Calcula la media de sus somníferos.",
      "Old Man Willow lulls with a steady average. Compute the mean of its soporifics.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Media redondeada", "Rounded mean"),
      instructions: P(
        "Escribe `media(valores)` que devuelva la MEDIA de `valores` redondeada a 2 decimales.\n\nUsa `np.mean(...)`, `float(...)` y `round(..., 2)`.\n\nEjemplo: `media([10, 20, 35])` → `21.67`.",
        "Write `media(valores)` returning the MEAN of `valores` rounded to 2 decimals.\n\nUse `np.mean(...)`, `float(...)` and `round(..., 2)`.\n\nExample: `media([10, 20, 35])` → `21.67`.",
      ),
      starter_code: "import numpy as np\n\ndef media(valores):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def media(valores):",
        "    return round(float(np.mean(valores)), 2)",
        "    return np.mean(valores)",
        "    return round(np.sum(valores), 2)",
      ],
      hints: [
        P("`np.mean(valores)` calcula el promedio.", "`np.mean(valores)` computes the average."),
        P("Envuélvelo: `round(float(np.mean(valores)), 2)`.", "Wrap it: `round(float(np.mean(valores)), 2)`."),
      ],
      test_cases: [
        { input: "media([10, 20, 35])", expected: 21.67, description: P("Media a 2 decimales", "Mean to 2 decimals"), raw: true },
        { input: "media([1, 2, 4])", expected: 2.33, description: P("Otro promedio", "Another average"), raw: true },
        { input: "media([2, 3, 3])", expected: 2.67, description: P("Con repetidos", "With repeats"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Rango del Espectro", "The Wight's Range"),
    lore_intro: P(
      "El frío del Tumulario oscila entre un mínimo y un máximo. Mide su amplitud: el rango.",
      "The wight's cold swings between a minimum and a maximum. Measure its spread: the range.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("Rango (max - min)", "Range (max - min)"),
      instructions: P(
        "Escribe `rango(valores)` que devuelva la diferencia entre el MÁXIMO y el MÍNIMO, como entero.\n\nUsa `np.max(...)` y `np.min(...)`.\n\nEjemplo: `rango([10, 50, 90, 30])` → `90 - 10` = `80`.",
        "Write `rango(valores)` returning the difference between the MAX and the MIN, as an integer.\n\nUse `np.max(...)` and `np.min(...)`.\n\nExample: `rango([10, 50, 90, 30])` → `90 - 10` = `80`.",
      ),
      starter_code: "import numpy as np\n\ndef rango(valores):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def rango(valores):",
        "    return int(np.max(valores) - np.min(valores))",
        "    return int(np.max(valores) + np.min(valores))",
        "    return np.max(valores)",
      ],
      hints: [
        P("El rango es `max - min`.", "The range is `max - min`."),
        P("`int(np.max(valores) - np.min(valores))`.", "`int(np.max(valores) - np.min(valores))`."),
      ],
      test_cases: [
        { input: "rango([10, 50, 90, 30])", expected: 80, description: P("90 - 10", "90 - 10"), raw: true },
        { input: "rango([5, 5])", expected: 0, description: P("Todos iguales", "All equal"), raw: true },
        { input: "rango([1, 2, 3])", expected: 2, description: P("Rango pequeño", "Small range"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Golpe Más Fuerte", "The Strongest Blow"),
    lore_intro: P(
      "Tom Bombadil señala, entre todos los golpes, cuál es el más fuerte. Devuelve su POSICIÓN.",
      "Tom Bombadil points out, among all blows, which is strongest. Return its POSITION.",
    ),
    challenge: {
      packages: ["numpy"],
      topic: P("argmax (índice del máximo)", "argmax (index of the max)"),
      instructions: P(
        "Escribe `mas_fuerte(valores)` que devuelva el ÍNDICE (posición) del valor más grande, como entero.\n\nUsa `np.argmax(...)`.\n\nEjemplo: `mas_fuerte([10, 50, 90, 30])` → `2` (el 90 está en la posición 2).",
        "Write `mas_fuerte(valores)` returning the INDEX (position) of the largest value, as an integer.\n\nUse `np.argmax(...)`.\n\nExample: `mas_fuerte([10, 50, 90, 30])` → `2` (90 is at position 2).",
      ),
      starter_code: "import numpy as np\n\ndef mas_fuerte(valores):\n    pass\n",
      blocks: [
        "import numpy as np",
        "def mas_fuerte(valores):",
        "    return int(np.argmax(valores))",
        "    return int(np.max(valores))",
        "    return np.argmax(valores)",
      ],
      hints: [
        P("`np.argmax` devuelve la POSICIÓN, no el valor.", "`np.argmax` returns the POSITION, not the value."),
        P("Envuélvelo en `int(...)`.", "Wrap it in `int(...)`."),
      ],
      test_cases: [
        { input: "mas_fuerte([10, 50, 90, 30])", expected: 2, description: P("El 90 está en el índice 2", "90 is at index 2"), raw: true },
        { input: "mas_fuerte([5])", expected: 0, description: P("Uno solo", "Just one"), raw: true },
        { input: "mas_fuerte([1, 9, 3])", expected: 1, description: P("El 9 en el índice 1", "9 at index 1"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 3 · pandas: la Series
 * ===================================================================== */

const Q_PD_SERIES = {
  question: P("¿Cómo se importa pandas y se crea una Series?", "How do you import pandas and create a Series?"),
  options: [
    P("import pandas as pd; pd.Series([1, 2, 3])", "import pandas as pd; pd.Series([1, 2, 3])"),
    P("import pandas; pandas.series([1, 2, 3])", "import pandas; pandas.series([1, 2, 3])"),
    P("pd.array([1, 2, 3])", "pd.array([1, 2, 3])"),
    P("new Series([1, 2, 3])", "new Series([1, 2, 3])"),
  ],
  correct: 0,
  explanation: P(
    "El alias es `pd`. Una `Series` es un array 1D CON etiquetas (índice): la columna básica de pandas. `Series` va con S mayúscula.",
    "The alias is `pd`. A `Series` is a 1D array WITH labels (an index): pandas' basic column. `Series` is capitalized.",
  ),
};
const Q_PD_INDEX = {
  question: P("¿Qué tiene una Series además de sus valores?", "What does a Series have besides its values?"),
  options: [
    P("Un ÍNDICE: una etiqueta para cada valor", "An INDEX: a label for each value"),
    P("Nada más", "Nothing else"),
    P("Un tipo por elemento distinto", "A different type per element"),
    P("Varias columnas", "Several columns"),
  ],
  correct: 0,
  explanation: P(
    "Cada valor tiene una etiqueta en el `index` (por defecto 0,1,2… o las que le des). Ese índice permite alinear datos y acceder por nombre, no sólo por posición.",
    "Each value has a label in the `index` (0,1,2… by default, or ones you give). That index lets you align data and access by name, not just position.",
  ),
};
const Q_PD_AGG = {
  question: P("¿Qué devuelve `s.mean()` sobre una Series numérica?", "What does `s.mean()` return on a numeric Series?"),
  options: [
    P("La media de sus valores", "The mean of its values"),
    P("El índice", "The index"),
    P("El número de valores", "The value count"),
    P("Una Series nueva", "A new Series"),
  ],
  correct: 0,
  explanation: P(
    "Las Series traen las agregaciones de NumPy: `.sum()`, `.mean()`, `.max()`, `.std()`, `.count()`. Por defecto IGNORAN los NaN, a diferencia de NumPy.",
    "Series carry NumPy's aggregations: `.sum()`, `.mean()`, `.max()`, `.std()`, `.count()`. By default they IGNORE NaN, unlike NumPy.",
  ),
};
const Q_PD_LABEL = {
  question: P("Con una Series de índice ['a','b','c'], ¿cómo lees el valor de 'b'?", "With a Series indexed ['a','b','c'], how do you read 'b'?"),
  options: [
    P("s['b'] (por etiqueta) o s.iloc[1] (por posición)", "s['b'] (by label) or s.iloc[1] (by position)"),
    P("s.b() ", "s.b()"),
    P("s.get(1) sólo", "s.get(1) only"),
    P("s[1] siempre", "s[1] always"),
  ],
  correct: 0,
  explanation: P(
    "`s['b']` accede por ETIQUETA; `s.iloc[1]` por POSICIÓN. Separar ambos (`.loc` etiqueta, `.iloc` posición) evita confusiones cuando el índice no es 0,1,2…",
    "`s['b']` accesses by LABEL; `s.iloc[1]` by POSITION. Keeping both apart (`.loc` label, `.iloc` position) avoids confusion when the index isn't 0,1,2…",
  ),
};
const Q_PD_FILTER = {
  question: P("¿Qué devuelve `s[s > 10]`?", "What does `s[s > 10]` return?"),
  options: [
    P("Una Series sólo con los valores mayores que 10", "A Series with only the values greater than 10"),
    P("True o False", "True or False"),
    P("El número de valores > 10", "The count of values > 10"),
    P("Los índices como lista", "The indices as a list"),
  ],
  correct: 0,
  explanation: P(
    "Igual que en NumPy: `s > 10` es una máscara booleana y `s[máscara]` filtra conservando el índice. Es el filtrado de datos por excelencia.",
    "Just like NumPy: `s > 10` is a boolean mask and `s[mask]` filters keeping the index. It's the quintessential data filter.",
  ),
};
const Q_PD_VALUECOUNTS = {
  question: P("¿Qué hace `s.value_counts()`?", "What does `s.value_counts()` do?"),
  options: [
    P("Cuenta cuántas veces aparece cada valor, de mayor a menor", "Counts how many times each value appears, most to least"),
    P("Suma los valores", "Sums the values"),
    P("Ordena los valores", "Sorts the values"),
    P("Cuenta el total de valores", "Counts the total of values"),
  ],
  correct: 0,
  explanation: P(
    "`value_counts()` es el histograma exprés de una columna categórica: devuelve una Series (valor → frecuencia) ordenada de más a menos frecuente. Clave para explorar datos.",
    "`value_counts()` is the express histogram of a categorical column: returns a Series (value → frequency) sorted from most to least frequent. Key for exploring data.",
  ),
};
const Q_PD_VECTOR = {
  question: P("¿Qué es `s * 2` sobre una Series?", "What is `s * 2` on a Series?"),
  options: [
    P("Una Series con cada valor multiplicado por 2 (y el mismo índice)", "A Series with each value times 2 (same index)"),
    P("La Series repetida dos veces", "The Series repeated twice"),
    P("Un error", "An error"),
    P("El doble del número de elementos", "Twice the element count"),
  ],
  correct: 0,
  explanation: P(
    "Las Series son vectorizadas como los arrays: la operación se aplica a cada valor conservando el índice. `s + otra_serie` alinea por índice, no por posición.",
    "Series are vectorized like arrays: the op applies to each value keeping the index. `s + other_series` aligns by index, not position.",
  ),
};
const Q_PD_IDXMAX = {
  question: P("¿Qué devuelve `s.idxmax()`?", "What does `s.idxmax()` return?"),
  options: [
    P("La ETIQUETA (índice) del valor máximo", "The LABEL (index) of the maximum value"),
    P("El valor máximo", "The maximum value"),
    P("La posición numérica", "The numeric position"),
    P("El número de máximos", "The count of maxima"),
  ],
  correct: 0,
  explanation: P(
    "`idxmax()` devuelve la ETIQUETA donde está el máximo (p. ej. el nombre del producto más vendido); `max()` da el valor. `idxmin()` es su gemelo para el mínimo.",
    "`idxmax()` returns the LABEL where the max is (e.g. the best-selling product's name); `max()` gives the value. `idxmin()` is its twin for the minimum.",
  ),
};
const Q_PD_ALIGN = {
  question: P("Al hacer `s1 + s2`, ¿cómo se combinan dos Series?", "When doing `s1 + s2`, how are two Series combined?"),
  options: [
    P("Se ALINEAN por índice; las etiquetas sin pareja dan NaN", "They ALIGN by index; unmatched labels give NaN"),
    P("Por posición, ignorando el índice", "By position, ignoring the index"),
    P("Se concatenan", "They concatenate"),
    P("Da error si difieren", "It errors if they differ"),
  ],
  correct: 0,
  explanation: P(
    "pandas ALINEA por etiqueta antes de operar: suma los valores de índices coincidentes y pone NaN donde una etiqueta falta en la otra. Es potente, pero hay que tenerlo presente.",
    "pandas ALIGNS by label before operating: it adds values of matching indices and puts NaN where a label is missing in the other. Powerful, but keep it in mind.",
  ),
};

/** Capítulo 3 · pandas: la Series. */
export const SYL_DATA_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_PD_SERIES, Q_PD_INDEX, Q_PD_AGG] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_PD_LABEL, Q_PD_FILTER, Q_PD_VALUECOUNTS] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_PD_VECTOR, Q_PD_IDXMAX, Q_PD_ALIGN] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P(
      "El señor de los Nazgûl comanda tropas de distinto poder. Resume la Series: total, media y QUIÉN es el más fuerte.",
      "The lord of the Nazgûl commands troops of varying power. Summarize the Series: total, mean and WHO is strongest.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Series: agregación e idxmax", "Series: aggregation and idxmax"),
      instructions: P(
        "Recibes `datos`, un dict {nombre: poder}. Escribe `resumen_series(datos)` que devuelva un dict con:\n• `total`: la suma (entero),\n• `media`: la media redondeada a 2 decimales,\n• `top`: la ETIQUETA del poder máximo (usa `idxmax`).\n\nConstruye `pd.Series(datos)` y usa `.sum()`, `.mean()`, `.idxmax()`.",
        "You get `datos`, a dict {name: power}. Write `resumen_series(datos)` returning a dict with:\n• `total`: the sum (integer),\n• `media`: the mean rounded to 2 decimals,\n• `top`: the LABEL of the max power (use `idxmax`).\n\nBuild `pd.Series(datos)` and use `.sum()`, `.mean()`, `.idxmax()`.",
      ),
      starter_code: "import pandas as pd\n\ndef resumen_series(datos):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def resumen_series(datos):",
        "    s = pd.Series(datos)",
        "    return {'total': int(s.sum()), 'media': round(float(s.mean()), 2), 'top': s.idxmax()}",
        "    return {'total': s.sum(), 'media': s.mean(), 'top': s.max()}",
      ],
      hints: [
        P("`s = pd.Series(datos)` crea la Series con nombres como índice.", "`s = pd.Series(datos)` builds the Series with names as the index."),
        P("`{'total': int(s.sum()), 'media': round(float(s.mean()), 2), 'top': s.idxmax()}`.", "`{'total': int(s.sum()), 'media': round(float(s.mean()), 2), 'top': s.idxmax()}`."),
      ],
      test_cases: [
        { input: "resumen_series({'orco': 10, 'trol': 20, 'nazgul': 35})", expected: { total: 65, media: 21.67, top: "nazgul" }, description: P("Resumen de la tropa", "Troop summary"), raw: true },
        { input: "resumen_series({'a': 1, 'b': 2, 'c': 4})", expected: { total: 7, media: 2.33, top: "c" }, description: P("Otro conjunto", "Another set"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino de la Series", "The Scroll of the Series"),
    lore_intro: P(
      "En El Poney Pisador, un montaraz encapuchado deja un pergamino: enseña la columna con nombre, la Series.",
      "At The Prancing Pony, a hooded ranger leaves a scroll: it teaches the named column, the Series.",
    ),
    scroll: {
      topic: P("pandas: la Series", "pandas: the Series"),
      sections: [
        {
          heading: P("Crear una Series", "Creating a Series"),
          body: P(
            "`import pandas as pd`. `pd.Series(lista)` o `pd.Series(dict)`: valores con un ÍNDICE de etiquetas. Es la columna básica.",
            "`import pandas as pd`. `pd.Series(list)` or `pd.Series(dict)`: values with an INDEX of labels. It's the basic column.",
          ),
          code: "import pandas as pd\ns = pd.Series({'orco': 10, 'trol': 20})\ns['orco']   # 10 (por etiqueta)",
        },
        {
          heading: P("Agregar y filtrar", "Aggregate and filter"),
          body: P(
            "`.sum()`, `.mean()`, `.max()`, `.idxmax()` (etiqueta del máximo). Filtra con máscara: `s[s > 10]`. `value_counts()` cuenta frecuencias.",
            "`.sum()`, `.mean()`, `.max()`, `.idxmax()` (label of the max). Filter with a mask: `s[s > 10]`. `value_counts()` counts frequencies.",
          ),
          code: "s.mean()          # media\ns[s > 15]         # sólo > 15\ns.idxmax()        # 'trol'",
        },
        {
          heading: P("Vectorización y alineación", "Vectorization and alignment"),
          body: P(
            "`s * 2` opera sobre cada valor conservando el índice. `s1 + s2` ALINEA por etiqueta (NaN donde no coinciden).",
            "`s * 2` operates on each value keeping the index. `s1 + s2` ALIGNS by label (NaN where they don't match).",
          ),
          code: "(s * 2)           # cada valor x2\ns.value_counts()  # frecuencias",
        },
      ],
      keyTakeaway: P(
        "La Series es una columna con índice: .sum()/.mean()/.idxmax() resumen, s[s>x] filtra, value_counts() cuenta. Las operaciones alinean por etiqueta.",
        "The Series is a column with an index: .sum()/.mean()/.idxmax() summarize, s[s>x] filters, value_counts() counts. Operations align by label.",
      ),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("La Cuenta del Poney", "The Pony's Bill"),
    lore_intro: P(
      "Mantecona anota el precio de cada consumición. Suma la cuenta entera con una Series.",
      "Butterbur notes the price of each drink. Total the whole bill with a Series.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Series desde dict y suma", "Series from dict and sum"),
      instructions: P(
        "Recibes `precios`, un dict {consumición: precio}. Escribe `total(precios)` que devuelva la SUMA de todos los precios, como entero.\n\nUsa `pd.Series(precios).sum()`.\n\nEjemplo: `total({'a': 10, 'b': 20, 'c': 5})` → `35`.",
        "You get `precios`, a dict {drink: price}. Write `total(precios)` returning the SUM of all prices, as an integer.\n\nUse `pd.Series(precios).sum()`.\n\nExample: `total({'a': 10, 'b': 20, 'c': 5})` → `35`.",
      ),
      starter_code: "import pandas as pd\n\ndef total(precios):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def total(precios):",
        "    return int(pd.Series(precios).sum())",
        "    return pd.Series(precios).sum()",
        "    return int(pd.Series(precios).mean())",
      ],
      hints: [
        P("`pd.Series(precios)` convierte el dict en una Series.", "`pd.Series(precios)` turns the dict into a Series."),
        P("`.sum()` la totaliza; envuélvela en `int(...)`.", "`.sum()` totals it; wrap it in `int(...)`."),
      ],
      test_cases: [
        { input: "total({'a': 10, 'b': 20, 'c': 5})", expected: 35, description: P("Cuenta completa", "Full bill"), raw: true },
        { input: "total({'x': 7})", expected: 7, description: P("Una sola", "Just one"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Reliquias Caras", "The Costly Relics"),
    lore_intro: P(
      "Entre las hojas del túmulo, algunas reliquias valen una fortuna. Lista los NOMBRES de las que superan un umbral.",
      "Among the barrow's blades, some relics are worth a fortune. List the NAMES of those above a threshold.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Filtrar una Series y tomar el índice", "Filter a Series and take the index"),
      instructions: P(
        "Recibes `precios`, un dict {nombre: precio}. Escribe `caras(precios, umbral)` que devuelva una LISTA con los NOMBRES cuyo precio es ESTRICTAMENTE MAYOR que `umbral`, en su orden original.\n\nFiltra `s[s > umbral]` y devuelve `.index.tolist()`.\n\nEjemplo: `caras({'espada': 100, 'daga': 20, 'anillo': 90}, 50)` → `['espada', 'anillo']`.",
        "You get `precios`, a dict {name: price}. Write `caras(precios, umbral)` returning a LIST of the NAMES whose price is STRICTLY GREATER than `umbral`, in original order.\n\nFilter `s[s > umbral]` and return `.index.tolist()`.\n\nExample: `caras({'espada': 100, 'daga': 20, 'anillo': 90}, 50)` → `['espada', 'anillo']`.",
      ),
      starter_code: "import pandas as pd\n\ndef caras(precios, umbral):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def caras(precios, umbral):",
        "    s = pd.Series(precios)",
        "    return s[s > umbral].index.tolist()",
        "    return s[s > umbral].tolist()",
        "    return s[s < umbral].index.tolist()",
      ],
      hints: [
        P("`s[s > umbral]` deja sólo las caras; su `.index` son los nombres.", "`s[s > umbral]` keeps only the costly ones; its `.index` are the names."),
        P("`.index.tolist()` los pasa a una lista de Python.", "`.index.tolist()` turns them into a Python list."),
      ],
      test_cases: [
        { input: "caras({'espada': 100, 'daga': 20, 'anillo': 90}, 50)", expected: ["espada", "anillo"], description: P("Superan 50", "Above 50"), raw: true },
        { input: "caras({'a': 1}, 50)", expected: [], description: P("Ninguna llega", "None reaches it"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("El Recuento de la Cima", "The Tally of the Hill"),
    lore_intro: P(
      "En Amon Sûl acechan enemigos de varias clases. Cuenta cuántos hay de cada tipo con un histograma exprés.",
      "At Amon Sûl enemies of several kinds lurk. Count how many of each type with an express histogram.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("value_counts", "value_counts"),
      instructions: P(
        "Recibes `items`, una lista de etiquetas. Escribe `frecuencias(items)` que devuelva un dict {valor: cuántas veces aparece}.\n\nUsa `pd.Series(items).value_counts().to_dict()`.\n\nEjemplo: `frecuencias(['orco', 'orco', 'orco', 'trol', 'trol', 'nazgul'])` → `{'orco': 3, 'trol': 2, 'nazgul': 1}`.",
        "You get `items`, a list of labels. Write `frecuencias(items)` returning a dict {value: how many times it appears}.\n\nUse `pd.Series(items).value_counts().to_dict()`.\n\nExample: `frecuencias(['orco', 'orco', 'orco', 'trol', 'trol', 'nazgul'])` → `{'orco': 3, 'trol': 2, 'nazgul': 1}`.",
      ),
      starter_code: "import pandas as pd\n\ndef frecuencias(items):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def frecuencias(items):",
        "    return pd.Series(items).value_counts().to_dict()",
        "    return pd.Series(items).count()",
        "    return pd.Series(items).sum()",
      ],
      hints: [
        P("`value_counts()` cuenta cada valor distinto.", "`value_counts()` counts each distinct value."),
        P("`.to_dict()` convierte la Series resultante en un dict.", "`.to_dict()` turns the resulting Series into a dict."),
      ],
      test_cases: [
        { input: "frecuencias(['orco', 'orco', 'orco', 'trol', 'trol', 'nazgul'])", expected: { orco: 3, trol: 2, nazgul: 1 }, description: P("Tres tipos", "Three types"), raw: true },
        { input: "frecuencias(['x'])", expected: { x: 1 }, description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 4 · pandas: el DataFrame
 * ===================================================================== */

const Q_DF_CREATE = {
  question: P("¿Cómo creas un DataFrame a partir de una lista de dicts?", "How do you create a DataFrame from a list of dicts?"),
  options: [
    P("pd.DataFrame([{'a': 1}, {'a': 2}])", "pd.DataFrame([{'a': 1}, {'a': 2}])"),
    P("pd.table([{'a': 1}])", "pd.table([{'a': 1}])"),
    P("pd.Frame([{'a': 1}])", "pd.Frame([{'a': 1}])"),
    P("new DataFrame([{'a': 1}])", "new DataFrame([{'a': 1}])"),
  ],
  correct: 0,
  explanation: P(
    "`pd.DataFrame(datos)` acepta una lista de dicts (cada dict = una fila) o un dict de columnas. Es la tabla 2D de pandas: filas con índice y columnas con nombre.",
    "`pd.DataFrame(data)` accepts a list of dicts (each dict = a row) or a dict of columns. It's pandas' 2D table: rows with an index and named columns.",
  ),
};
const Q_DF_COL = {
  question: P("¿Qué devuelve `df['edad']`?", "What does `df['edad']` return?"),
  options: [
    P("La columna 'edad' como una Series", "The 'edad' column as a Series"),
    P("Una fila", "A row"),
    P("El valor de una celda", "A single cell's value"),
    P("Un DataFrame de una columna", "A one-column DataFrame"),
  ],
  correct: 0,
  explanation: P(
    "Con corchetes y UN nombre obtienes esa columna como Series. Con una LISTA de nombres, `df[['a', 'b']]`, obtienes un DataFrame con esas columnas.",
    "With brackets and ONE name you get that column as a Series. With a LIST of names, `df[['a', 'b']]`, you get a DataFrame with those columns.",
  ),
};
const Q_DF_MULTICOL = {
  question: P("¿Qué es `df[['nombre', 'edad']]`?", "What is `df[['nombre', 'edad']]`?"),
  options: [
    P("Un DataFrame con SÓLO esas dos columnas", "A DataFrame with ONLY those two columns"),
    P("Una Series", "A Series"),
    P("Las filas 'nombre' y 'edad'", "The rows 'nombre' and 'edad'"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "Los dobles corchetes con una LISTA seleccionan varias columnas y devuelven un DataFrame. Un solo par de corchetes con un nombre daría una Series.",
    "Double brackets with a LIST select several columns and return a DataFrame. A single pair of brackets with one name would give a Series.",
  ),
};
const Q_DF_SHAPE = {
  question: P("¿Qué es `df.shape` de un DataFrame?", "What is a DataFrame's `df.shape`?"),
  options: [
    P("Una tupla (nº de filas, nº de columnas)", "A tuple (num rows, num columns)"),
    P("El número de celdas", "The number of cells"),
    P("Los nombres de las columnas", "The column names"),
    P("El tipo de cada columna", "The type of each column"),
  ],
  correct: 0,
  explanation: P(
    "`df.shape` es `(filas, columnas)`. `df.columns` da los nombres de columna y `df.dtypes` el tipo de cada una. Lo primero al recibir datos nuevos.",
    "`df.shape` is `(rows, columns)`. `df.columns` gives the column names and `df.dtypes` each one's type. The first thing to check with new data.",
  ),
};
const Q_DF_HEAD = {
  question: P("¿Para qué sirve `df.head()`?", "What is `df.head()` for?"),
  options: [
    P("Ver las primeras filas (5 por defecto)", "See the first rows (5 by default)"),
    P("Ordenar el DataFrame", "Sort the DataFrame"),
    P("Contar las filas", "Count the rows"),
    P("Ver los nombres de columna", "See the column names"),
  ],
  correct: 0,
  explanation: P(
    "`df.head(n)` muestra las primeras n filas (5 por defecto) y `df.tail(n)` las últimas: para echar un vistazo rápido sin volcar toda la tabla. `df.info()` resume tipos y nulos.",
    "`df.head(n)` shows the first n rows (5 by default) and `df.tail(n)` the last: a quick peek without dumping the whole table. `df.info()` summarizes types and nulls.",
  ),
};
const Q_DF_NEWCOL = {
  question: P("¿Cómo añades una columna 'total' = precio * cantidad?", "How do you add a column 'total' = price * quantity?"),
  options: [
    P("df['total'] = df['precio'] * df['cantidad']", "df['total'] = df['precio'] * df['cantidad']"),
    P("df.add('total', ...)", "df.add('total', ...)"),
    P("df.total = precio * cantidad", "df.total = price * quantity"),
    P("df.append('total')", "df.append('total')"),
  ],
  correct: 0,
  explanation: P(
    "Asignar a `df['nueva']` crea (o reemplaza) la columna. Como las columnas son Series vectorizadas, `df['precio'] * df['cantidad']` opera fila a fila sin bucles.",
    "Assigning to `df['new']` creates (or replaces) the column. Since columns are vectorized Series, `df['precio'] * df['cantidad']` operates row by row with no loops.",
  ),
};
const Q_DF_COLUMNS = {
  question: P("¿Qué devuelve `df.columns`?", "What does `df.columns` return?"),
  options: [
    P("Los nombres de las columnas", "The column names"),
    P("El número de columnas", "The number of columns"),
    P("La primera fila", "The first row"),
    P("Los tipos de dato", "The data types"),
  ],
  correct: 0,
  explanation: P(
    "`df.columns` es un índice con los nombres de columna; `list(df.columns)` los pasa a lista. Útil para comprobar qué campos trae un dataset antes de trabajarlo.",
    "`df.columns` is an index with the column names; `list(df.columns)` turns them into a list. Handy to check what fields a dataset brings before working it.",
  ),
};
const Q_DF_COLAGG = {
  question: P("¿Qué calcula `df['ventas'].sum()`?", "What does `df['ventas'].sum()` compute?"),
  options: [
    P("La suma de la columna 'ventas'", "The sum of the 'ventas' column"),
    P("La suma de todas las columnas", "The sum of all columns"),
    P("El número de ventas", "The number of sales"),
    P("La suma de una fila", "The sum of a row"),
  ],
  correct: 0,
  explanation: P(
    "Una columna es una Series, así que `.sum()`, `.mean()`, `.max()` operan sobre ella. Sobre el DataFrame entero, `df.sum()` agrega columna por columna.",
    "A column is a Series, so `.sum()`, `.mean()`, `.max()` operate on it. On the whole DataFrame, `df.sum()` aggregates column by column.",
  ),
};
const Q_DF_LOC_ILOC = {
  question: P("¿Qué diferencia hay entre `df.loc` y `df.iloc`?", "What's the difference between `df.loc` and `df.iloc`?"),
  options: [
    P("loc usa ETIQUETAS; iloc usa POSICIONES numéricas", "loc uses LABELS; iloc uses numeric POSITIONS"),
    P("Son idénticos", "They're identical"),
    P("loc es para columnas, iloc para filas", "loc is for columns, iloc for rows"),
    P("iloc no existe", "iloc doesn't exist"),
  ],
  correct: 0,
  explanation: P(
    "`df.loc[etiqueta, col]` indexa por nombre; `df.iloc[posición]` por número de fila/columna. Mezclarlos es un error clásico cuando el índice no es 0,1,2…",
    "`df.loc[label, col]` indexes by name; `df.iloc[position]` by row/column number. Mixing them is a classic mistake when the index isn't 0,1,2…",
  ),
};

/** Capítulo 4 · pandas: el DataFrame. */
export const SYL_DATA_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_DF_CREATE, Q_DF_COL, Q_DF_MULTICOL] },
  c4_lobo: { kind: "battle", questions: [Q_DF_SHAPE, Q_DF_HEAD, Q_DF_COLUMNS] },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_DF_NEWCOL, Q_DF_COLAGG, Q_DF_LOC_ILOC] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P(
      "Los Nueve cargan con su ataque y su defensa. Levanta la tabla de combate y AÑADE una columna con su poder total.",
      "The Nine charge with their attack and defense. Build the battle table and ADD a column with their total power.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Añadir una columna calculada", "Add a computed column"),
      instructions: P(
        "Recibes `registros`, una lista de dicts con `nombre`, `ataque` y `defensa`. Escribe `tabla_poder(registros)` que:\n1. cree el DataFrame,\n2. añada una columna `poder = ataque + defensa`,\n3. devuelva las filas con `df.to_dict('records')`.\n\nEl orden de columnas resultante es nombre, ataque, defensa, poder.",
        "You get `registros`, a list of dicts with `nombre`, `ataque` and `defensa`. Write `tabla_poder(registros)` that:\n1. builds the DataFrame,\n2. adds a column `poder = ataque + defensa`,\n3. returns the rows with `df.to_dict('records')`.\n\nResulting column order is nombre, ataque, defensa, poder.",
      ),
      starter_code: "import pandas as pd\n\ndef tabla_poder(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def tabla_poder(registros):",
        "    df = pd.DataFrame(registros)",
        "    df['poder'] = df['ataque'] + df['defensa']",
        "    return df.to_dict('records')",
        "    df['poder'] = df['ataque'] * df['defensa']",
        "    return df.to_dict()",
      ],
      hints: [
        P("`df = pd.DataFrame(registros)` y luego `df['poder'] = df['ataque'] + df['defensa']`.", "`df = pd.DataFrame(registros)` then `df['poder'] = df['ataque'] + df['defensa']`."),
        P("Devuelve `df.to_dict('records')` (una lista de dicts).", "Return `df.to_dict('records')` (a list of dicts)."),
      ],
      test_cases: [
        { input: "tabla_poder([{'nombre': 'orco', 'ataque': 10, 'defensa': 5}, {'nombre': 'trol', 'ataque': 20, 'defensa': 15}])", expected: [{ nombre: "orco", ataque: 10, defensa: 5, poder: 15 }, { nombre: "trol", ataque: 20, defensa: 15, poder: 35 }], description: P("Tabla con poder", "Table with power"), raw: true },
        { input: "tabla_poder([{'nombre': 'nazgul', 'ataque': 30, 'defensa': 30}])", expected: [{ nombre: "nazgul", ataque: 30, defensa: 30, poder: 60 }], description: P("Un solo enemigo", "A single enemy"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino del DataFrame", "The Scroll of the DataFrame"),
    lore_intro: P(
      "Antes del Vado, Glorfindel comparte un pergamino élfico: enseña la tabla de datos, el DataFrame.",
      "Before the Ford, Glorfindel shares an Elvish scroll: it teaches the data table, the DataFrame.",
    ),
    scroll: {
      topic: P("pandas: el DataFrame", "pandas: the DataFrame"),
      sections: [
        {
          heading: P("Crear y mirar", "Create and peek"),
          body: P(
            "`pd.DataFrame(lista_de_dicts)` crea la tabla. `df.shape` da (filas, columnas), `df.columns` los nombres, `df.head()` las primeras filas.",
            "`pd.DataFrame(list_of_dicts)` builds the table. `df.shape` gives (rows, columns), `df.columns` the names, `df.head()` the first rows.",
          ),
          code: "df = pd.DataFrame([\n  {'nombre': 'orco', 'atk': 10},\n  {'nombre': 'trol', 'atk': 20},\n])\ndf.shape   # (2, 2)",
        },
        {
          heading: P("Seleccionar columnas", "Selecting columns"),
          body: P(
            "`df['atk']` es una columna (Series); `df[['nombre', 'atk']]` un DataFrame. `df['atk'].sum()` agrega esa columna.",
            "`df['atk']` is a column (Series); `df[['nombre', 'atk']]` a DataFrame. `df['atk'].sum()` aggregates that column.",
          ),
          code: "df['atk']            # Series\ndf[['nombre', 'atk']]  # DataFrame\ndf['atk'].mean()     # media",
        },
        {
          heading: P("Añadir columnas", "Adding columns"),
          body: P(
            "Asignar a `df['nueva']` crea la columna, vectorizada. Exporta filas con `df.to_dict('records')` (lista de dicts).",
            "Assigning to `df['new']` creates the column, vectorized. Export rows with `df.to_dict('records')` (list of dicts).",
          ),
          code: "df['doble'] = df['atk'] * 2\ndf.to_dict('records')",
        },
      ],
      keyTakeaway: P(
        "pd.DataFrame(datos) es la tabla; df['c'] una columna, df[['a','b']] varias; df['n']=... añade columna vectorizada; to_dict('records') exporta filas.",
        "pd.DataFrame(data) is the table; df['c'] a column, df[['a','b']] several; df['n']=... adds a vectorized column; to_dict('records') exports rows.",
      ),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("Las Dimensiones de la Carga", "The Dimensions of the Load"),
    lore_intro: P(
      "El corcel de Glorfindel carga una tabla de bultos. ¿Cuántas filas y columnas tiene?",
      "Glorfindel's steed carries a table of parcels. How many rows and columns does it have?",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("df.shape", "df.shape"),
      instructions: P(
        "Recibes `registros`, una lista de dicts. Escribe `dimensiones(registros)` que devuelva una LISTA `[filas, columnas]`.\n\nUsa `pd.DataFrame(registros).shape` y `list(...)`.\n\nEjemplo: 2 registros de 3 campos → `[2, 3]`.",
        "You get `registros`, a list of dicts. Write `dimensiones(registros)` returning a LIST `[rows, columns]`.\n\nUse `pd.DataFrame(registros).shape` and `list(...)`.\n\nExample: 2 records of 3 fields → `[2, 3]`.",
      ),
      starter_code: "import pandas as pd\n\ndef dimensiones(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def dimensiones(registros):",
        "    return list(pd.DataFrame(registros).shape)",
        "    return pd.DataFrame(registros).shape",
        "    return len(registros)",
      ],
      hints: [
        P("`.shape` es una tupla (filas, columnas).", "`.shape` is a tuple (rows, columns)."),
        P("Conviértela a lista con `list(...)`.", "Convert it to a list with `list(...)`."),
      ],
      test_cases: [
        { input: "dimensiones([{'nombre': 'orco', 'ataque': 10, 'defensa': 5}, {'nombre': 'trol', 'ataque': 20, 'defensa': 15}])", expected: [2, 3], description: P("2 filas, 3 columnas", "2 rows, 3 columns"), raw: true },
        { input: "dimensiones([{'a': 1}])", expected: [1, 1], description: P("Una fila, una columna", "One row, one column"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("La Columna de los Nombres", "The Column of Names"),
    lore_intro: P(
      "De la tabla de los Nueve, extrae una sola columna: sus nombres, en orden.",
      "From the table of the Nine, pull a single column: their names, in order.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Seleccionar una columna", "Selecting a column"),
      instructions: P(
        "Recibes `registros` (lista de dicts) y `col` (nombre de columna). Escribe `columna(registros, col)` que devuelva los valores de esa columna como LISTA, en orden.\n\nUsa `pd.DataFrame(registros)[col].tolist()`.\n\nEjemplo: columna 'nombre' → `['orco', 'trol']`.",
        "You get `registros` (list of dicts) and `col` (a column name). Write `columna(registros, col)` returning that column's values as a LIST, in order.\n\nUse `pd.DataFrame(registros)[col].tolist()`.\n\nExample: column 'nombre' → `['orco', 'trol']`.",
      ),
      starter_code: "import pandas as pd\n\ndef columna(registros, col):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def columna(registros, col):",
        "    return pd.DataFrame(registros)[col].tolist()",
        "    return pd.DataFrame(registros)[[col]].tolist()",
        "    return pd.DataFrame(registros).columns",
      ],
      hints: [
        P("`df[col]` es la columna como Series.", "`df[col]` is the column as a Series."),
        P("`.tolist()` la pasa a una lista de Python.", "`.tolist()` turns it into a Python list."),
      ],
      test_cases: [
        { input: "columna([{'nombre': 'orco', 'ataque': 10}, {'nombre': 'trol', 'ataque': 20}], 'nombre')", expected: ["orco", "trol"], description: P("Los nombres", "The names"), raw: true },
        { input: "columna([{'nombre': 'orco', 'ataque': 10}, {'nombre': 'trol', 'ataque': 20}], 'ataque')", expected: [10, 20], description: P("Los ataques", "The attacks"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("La Crecida de Bruinen", "The Flood of Bruinen"),
    lore_intro: P(
      "La riada arrasa por igual: suma toda una columna de un golpe.",
      "The flood sweeps all alike: sum a whole column in one go.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Agregar una columna", "Aggregating a column"),
      instructions: P(
        "Recibes `registros` (lista de dicts) y `col`. Escribe `suma_columna(registros, col)` que devuelva la SUMA de esa columna, como entero.\n\nUsa `int(pd.DataFrame(registros)[col].sum())`.\n\nEjemplo: columna 'ataque' de dos filas (10 y 20) → `30`.",
        "You get `registros` (list of dicts) and `col`. Write `suma_columna(registros, col)` returning the SUM of that column, as an integer.\n\nUse `int(pd.DataFrame(registros)[col].sum())`.\n\nExample: 'ataque' column of two rows (10 and 20) → `30`.",
      ),
      starter_code: "import pandas as pd\n\ndef suma_columna(registros, col):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def suma_columna(registros, col):",
        "    return int(pd.DataFrame(registros)[col].sum())",
        "    return pd.DataFrame(registros).sum()",
        "    return int(pd.DataFrame(registros)[col].count())",
      ],
      hints: [
        P("`df[col]` es la columna; `.sum()` la totaliza.", "`df[col]` is the column; `.sum()` totals it."),
        P("Envuélvela en `int(...)`.", "Wrap it in `int(...)`."),
      ],
      test_cases: [
        { input: "suma_columna([{'ataque': 10}, {'ataque': 20}], 'ataque')", expected: 30, description: P("10 + 20", "10 + 20"), raw: true },
        { input: "suma_columna([{'x': 5}], 'x')", expected: 5, description: P("Una fila", "One row"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P(
      "En las piedras del vado sólo importan ciertas runas. Quédate con un subconjunto de columnas.",
      "On the ford's stones only certain runes matter. Keep a subset of columns.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Seleccionar varias columnas", "Selecting several columns"),
      instructions: P(
        "Recibes `registros` (lista de dicts) y `cols` (lista de nombres de columna). Escribe `subtabla(registros, cols)` que devuelva SÓLO esas columnas como lista de dicts (`to_dict('records')`).\n\nEjemplo: cols `['nombre', 'ataque']` deja fuera el resto.",
        "You get `registros` (list of dicts) and `cols` (a list of column names). Write `subtabla(registros, cols)` returning ONLY those columns as a list of dicts (`to_dict('records')`).\n\nExample: cols `['nombre', 'ataque']` drops the rest.",
      ),
      starter_code: "import pandas as pd\n\ndef subtabla(registros, cols):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def subtabla(registros, cols):",
        "    return pd.DataFrame(registros)[cols].to_dict('records')",
        "    return pd.DataFrame(registros)[cols].tolist()",
        "    return pd.DataFrame(registros).to_dict('records')",
      ],
      hints: [
        P("`df[cols]` con una LISTA de nombres da un DataFrame de esas columnas.", "`df[cols]` with a LIST of names gives a DataFrame of those columns."),
        P("`.to_dict('records')` lo pasa a lista de dicts.", "`.to_dict('records')` turns it into a list of dicts."),
      ],
      test_cases: [
        { input: "subtabla([{'nombre': 'orco', 'ataque': 10, 'defensa': 5}, {'nombre': 'trol', 'ataque': 20, 'defensa': 15}], ['nombre', 'ataque'])", expected: [{ nombre: "orco", ataque: 10 }, { nombre: "trol", ataque: 20 }], description: P("Sólo nombre y ataque", "Only name and attack"), raw: true },
        { input: "subtabla([{'a': 1, 'b': 2}], ['a'])", expected: [{ a: 1 }], description: P("Una sola columna", "A single column"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 5 · pandas: filtrado con máscaras booleanas
 * ===================================================================== */

const Q_FILT_MASK = {
  question: P("¿Cómo te quedas con las filas donde 'edad' > 30?", "How do you keep the rows where 'edad' > 30?"),
  options: [
    P("df[df['edad'] > 30]", "df[df['edad'] > 30]"),
    P("df.filter('edad > 30')", "df.filter('edad > 30')"),
    P("df.where(edad > 30)", "df.where(edad > 30)"),
    P("df['edad' > 30]", "df['edad' > 30]"),
  ],
  correct: 0,
  explanation: P(
    "`df['edad'] > 30` crea una máscara booleana (una fila = True/False) y `df[máscara]` conserva sólo las filas True. Es el filtrado central de pandas.",
    "`df['edad'] > 30` builds a boolean mask (one per row = True/False) and `df[mask]` keeps only the True rows. It's pandas' core filter.",
  ),
};
const Q_FILT_AND = {
  question: P("¿Cómo combinas dos condiciones (edad > 30 Y activo)?", "How do you combine two conditions (edad > 30 AND activo)?"),
  options: [
    P("df[(df['edad'] > 30) & (df['activo'])]", "df[(df['edad'] > 30) & (df['activo'])]"),
    P("df[df['edad'] > 30 and df['activo']]", "df[df['edad'] > 30 and df['activo']]"),
    P("df[df['edad'] > 30 && df['activo']]", "df[df['edad'] > 30 && df['activo']]"),
    P("df.and(edad > 30, activo)", "df.and(edad > 30, activo)"),
  ],
  correct: 0,
  explanation: P(
    "Con máscaras se usa `&` (y), `|` (o), `~` (no), NO las palabras `and`/`or`. Y cada condición va ENTRE PARÉNTESIS por la precedencia de operadores.",
    "With masks you use `&` (and), `|` (or), `~` (not), NOT the words `and`/`or`. And each condition goes IN PARENTHESES due to operator precedence.",
  ),
};
const Q_FILT_NOT = {
  question: P("¿Qué hace `~` en `df[~(df['activo'])]`?", "What does `~` do in `df[~(df['activo'])]`?"),
  options: [
    P("NIEGA la máscara: se queda con las filas NO activas", "NEGATES the mask: keeps the NOT active rows"),
    P("Ordena por 'activo'", "Sorts by 'activo'"),
    P("Elimina la columna 'activo'", "Drops the 'activo' column"),
    P("Es un comentario", "It's a comment"),
  ],
  correct: 0,
  explanation: P(
    "`~` invierte una máscara booleana (True↔False). `df[~df['activo']]` deja las filas donde 'activo' es False. Es el 'no lógico' del filtrado vectorizado.",
    "`~` inverts a boolean mask (True↔False). `df[~df['activo']]` keeps rows where 'activo' is False. It's the 'logical not' of vectorized filtering.",
  ),
};
const Q_FILT_ISIN = {
  question: P("¿Qué hace `df[df['tipo'].isin(['orco', 'trol'])]`?", "What does `df[df['tipo'].isin(['orco', 'trol'])]` do?"),
  options: [
    P("Deja las filas cuyo 'tipo' es 'orco' o 'trol'", "Keeps rows whose 'tipo' is 'orco' or 'trol'"),
    P("Comprueba si la columna existe", "Checks if the column exists"),
    P("Cuenta orcos y troles", "Counts orcs and trolls"),
    P("Ordena por tipo", "Sorts by type"),
  ],
  correct: 0,
  explanation: P(
    "`.isin(lista)` da una máscara True donde el valor está en la lista: perfecto para filtrar por VARIAS categorías sin encadenar muchos `|`.",
    "`.isin(list)` gives a True mask where the value is in the list: perfect to filter by SEVERAL categories without chaining many `|`.",
  ),
};
const Q_FILT_BETWEEN = {
  question: P("¿Qué selecciona `df['temp'].between(0, 30)`?", "What does `df['temp'].between(0, 30)` select?"),
  options: [
    P("Una máscara True donde 0 <= temp <= 30 (ambos incluidos)", "A True mask where 0 <= temp <= 30 (both included)"),
    P("Los valores fuera del rango", "The values outside the range"),
    P("La media entre 0 y 30", "The mean between 0 and 30"),
    P("Sólo temp == 0 o 30", "Only temp == 0 or 30"),
  ],
  correct: 0,
  explanation: P(
    "`.between(a, b)` es un atajo para `(s >= a) & (s <= b)`, con los extremos INCLUIDOS por defecto. Muy legible para filtrar rangos.",
    "`.between(a, b)` is shorthand for `(s >= a) & (s <= b)`, endpoints INCLUDED by default. Very readable for range filters.",
  ),
};
const Q_FILT_QUERY = {
  question: P("¿Qué hace `df.query('edad > 30')`?", "What does `df.query('edad > 30')` do?"),
  options: [
    P("Filtra las filas con una expresión de texto legible", "Filters rows with a readable string expression"),
    P("Ejecuta SQL sobre una base de datos", "Runs SQL on a database"),
    P("Busca una columna llamada 'edad > 30'", "Looks for a column named 'edad > 30'"),
    P("Ordena por edad", "Sorts by age"),
  ],
  correct: 0,
  explanation: P(
    "`query()` filtra usando una expresión en texto: `df.query('edad > 30 and activo')`. Es una alternativa más legible a las máscaras con `&`/`|` cuando hay varias condiciones.",
    "`query()` filters using a string expression: `df.query('edad > 30 and activo')`. It's a more readable alternative to `&`/`|` masks when there are several conditions.",
  ),
};
const Q_FILT_MASKTYPE = {
  question: P("Por sí sola, ¿qué es `df['edad'] > 30`?", "On its own, what is `df['edad'] > 30`?"),
  options: [
    P("Una Series booleana (True/False por fila)", "A boolean Series (True/False per row)"),
    P("Un DataFrame filtrado", "A filtered DataFrame"),
    P("El número de filas > 30", "The count of rows > 30"),
    P("Un error", "An error"),
  ],
  correct: 0,
  explanation: P(
    "La comparación devuelve la MÁSCARA (una Series de booleanos), no las filas. Filtras al meterla entre corchetes: `df[máscara]`. Y `máscara.sum()` cuenta los True.",
    "The comparison returns the MASK (a boolean Series), not the rows. You filter by putting it in brackets: `df[mask]`. And `mask.sum()` counts the True values.",
  ),
};
const Q_FILT_SELECT = {
  question: P("¿Cómo obtienes los NOMBRES de las filas con edad > 30?", "How do you get the NAMES of rows with edad > 30?"),
  options: [
    P("df[df['edad'] > 30]['nombre']", "df[df['edad'] > 30]['nombre']"),
    P("df['nombre' if edad > 30]", "df['nombre' if edad > 30]"),
    P("df.filter('edad>30').nombre", "df.filter('edad>30').nombre"),
    P("df['nombre'][edad > 30]", "df['nombre'][edad > 30]"),
  ],
  correct: 0,
  explanation: P(
    "Filtras las filas y luego seleccionas la columna: `df[máscara]['nombre']`. Encadenar filtrado + selección es el pan de cada día del análisis.",
    "You filter the rows and then select the column: `df[mask]['nombre']`. Chaining filter + selection is the analyst's daily bread.",
  ),
};
const Q_FILT_COUNT = {
  question: P("¿Cómo cuentas cuántas filas cumplen `df['edad'] > 30`?", "How do you count how many rows satisfy `df['edad'] > 30`?"),
  options: [
    P("(df['edad'] > 30).sum()", "(df['edad'] > 30).sum()"),
    P("df['edad'].count(> 30)", "df['edad'].count(> 30)"),
    P("count(df['edad'] > 30)", "count(df['edad'] > 30)"),
    P("df['edad'].len(30)", "df['edad'].len(30)"),
  ],
  correct: 0,
  explanation: P(
    "Como True vale 1, sumar la máscara CUENTA las filas que cumplen: `(df['edad'] > 30).sum()`. Equivale a `len(df[df['edad'] > 30])`, pero más directo.",
    "Since True is 1, summing the mask COUNTS the matching rows: `(df['edad'] > 30).sum()`. Equivalent to `len(df[df['edad'] > 30])`, but more direct.",
  ),
};

/** Capítulo 5 · pandas: filtrado con máscaras booleanas. */
export const SYL_DATA_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_FILT_MASK, Q_FILT_MASKTYPE, Q_FILT_COUNT] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_FILT_AND, Q_FILT_NOT, Q_FILT_SELECT] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_FILT_ISIN, Q_FILT_BETWEEN, Q_FILT_QUERY] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P(
      "La montaña pone a prueba cada obstáculo. Quédate SÓLO con los que resisten por encima de un umbral: filtra la tabla.",
      "The mountain tests each obstacle. Keep ONLY those resisting above a threshold: filter the table.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Filtrar filas por condición", "Filter rows by condition"),
      instructions: P(
        "Recibes `registros` (lista de dicts con `nombre` y `resistencia`) y `umbral`. Escribe `resisten(registros, umbral)` que devuelva SÓLO las filas cuya `resistencia` es ESTRICTAMENTE MAYOR que `umbral`, como lista de dicts (`to_dict('records')`).",
        "You get `registros` (list of dicts with `nombre` and `resistencia`) and `umbral`. Write `resisten(registros, umbral)` returning ONLY the rows whose `resistencia` is STRICTLY GREATER than `umbral`, as a list of dicts (`to_dict('records')`).",
      ),
      starter_code: "import pandas as pd\n\ndef resisten(registros, umbral):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def resisten(registros, umbral):",
        "    df = pd.DataFrame(registros)",
        "    return df[df['resistencia'] > umbral].to_dict('records')",
        "    return df[df['resistencia'] < umbral].to_dict('records')",
        "    return df.to_dict('records')",
      ],
      hints: [
        P("`df = pd.DataFrame(registros)` y la máscara `df['resistencia'] > umbral`.", "`df = pd.DataFrame(registros)` and the mask `df['resistencia'] > umbral`."),
        P("`df[máscara].to_dict('records')`.", "`df[mask].to_dict('records')`."),
      ],
      test_cases: [
        { input: "resisten([{'nombre': 'muro', 'resistencia': 10}, {'nombre': 'puerta', 'resistencia': 40}], 20)", expected: [{ nombre: "puerta", resistencia: 40 }], description: P("Sólo la puerta aguanta", "Only the door holds"), raw: true },
        { input: "resisten([{'nombre': 'a', 'resistencia': 5}], 20)", expected: [], description: P("Ninguno aguanta", "None holds"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Filtro", "The Scroll of the Filter"),
    lore_intro: P(
      "Bajo la ventisca, Gandalf traza runas de hielo: enseña a quedarse sólo con las filas que importan.",
      "Under the blizzard, Gandalf traces ice-runes: they teach how to keep only the rows that matter.",
    ),
    scroll: {
      topic: P("pandas: filtrado con máscaras", "pandas: filtering with masks"),
      sections: [
        {
          heading: P("La máscara booleana", "The boolean mask"),
          body: P(
            "`df['edad'] > 30` es una Series de True/False. `df[máscara]` conserva las filas True. `máscara.sum()` cuenta cuántas cumplen.",
            "`df['edad'] > 30` is a Series of True/False. `df[mask]` keeps the True rows. `mask.sum()` counts how many match.",
          ),
          code: "m = df['edad'] > 30\ndf[m]            # filas > 30\nm.sum()          # cuántas",
        },
        {
          heading: P("Combinar condiciones", "Combining conditions"),
          body: P(
            "Con máscaras: `&` (y), `|` (o), `~` (no) y cada condición ENTRE PARÉNTESIS. `and`/`or` de Python NO funcionan aquí.",
            "With masks: `&` (and), `|` (or), `~` (not) and each condition IN PARENTHESES. Python's `and`/`or` do NOT work here.",
          ),
          code: "df[(df['edad'] > 30) & df['activo']]\ndf[df['tipo'].isin(['orco', 'trol'])]\ndf[df['temp'].between(0, 30)]",
        },
        {
          heading: P("Filtrar y seleccionar", "Filter and select"),
          body: P(
            "Encadena filtrado y columna: `df[m]['nombre']`. O usa `query('edad > 30 and activo')` para una expresión más legible.",
            "Chain filter and column: `df[m]['nombre']`. Or use `query('edad > 30 and activo')` for a more readable expression.",
          ),
          code: "df[df['edad'] > 30]['nombre'].tolist()\ndf.query('edad > 30')",
        },
      ],
      keyTakeaway: P(
        "df[df['c'] > x] filtra filas; combina con & | ~ y paréntesis; isin/between para categorías y rangos; (máscara).sum() cuenta; df[m]['col'] filtra y selecciona.",
        "df[df['c'] > x] filters rows; combine with & | ~ and parentheses; isin/between for categories and ranges; (mask).sum() counts; df[m]['col'] filters and selects.",
      ),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("Los Bultos Pesados", "The Heavy Parcels"),
    lore_intro: P(
      "Bill el Poney no puede con todo. Cuenta cuántos bultos superan el peso máximo.",
      "Bill the Pony can't carry it all. Count how many parcels exceed the weight limit.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Contar filas que cumplen", "Counting matching rows"),
      instructions: P(
        "Recibes `registros` (dicts con `peso`) y `umbral`. Escribe `pesados(registros, umbral)` que devuelva CUÁNTAS filas tienen `peso` ESTRICTAMENTE MAYOR que `umbral`, como entero.\n\nUsa `(df['peso'] > umbral).sum()`.\n\nEjemplo: pesos [30, 60, 10], umbral 25 → `2`.",
        "You get `registros` (dicts with `peso`) and `umbral`. Write `pesados(registros, umbral)` returning HOW MANY rows have `peso` STRICTLY GREATER than `umbral`, as an integer.\n\nUse `(df['peso'] > umbral).sum()`.\n\nExample: weights [30, 60, 10], threshold 25 → `2`.",
      ),
      starter_code: "import pandas as pd\n\ndef pesados(registros, umbral):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def pesados(registros, umbral):",
        "    df = pd.DataFrame(registros)",
        "    return int((df['peso'] > umbral).sum())",
        "    return int(df['peso'].sum())",
        "    return df[df['peso'] > umbral]",
      ],
      hints: [
        P("`df['peso'] > umbral` es la máscara.", "`df['peso'] > umbral` is the mask."),
        P("`.sum()` cuenta los True; envuélvelo en `int(...)`.", "`.sum()` counts the True values; wrap it in `int(...)`."),
      ],
      test_cases: [
        { input: "pesados([{'nombre': 'saco', 'peso': 30}, {'nombre': 'olla', 'peso': 60}, {'nombre': 'manta', 'peso': 10}], 25)", expected: 2, description: P("Saco y olla superan 25", "Sack and pot exceed 25"), raw: true },
        { input: "pesados([{'peso': 5}], 100)", expected: 0, description: P("Ninguno pesa tanto", "None weighs that much"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("Los Supervivientes", "The Survivors"),
    lore_intro: P(
      "Sólo siguen en pie quienes conservan bastante vida. Lista sus nombres.",
      "Only those with enough life left stand. List their names.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Filtrar y seleccionar una columna", "Filter and select a column"),
      instructions: P(
        "Recibes `registros` (dicts con `nombre` y `vida`) y `minvida`. Escribe `supervivientes(registros, minvida)` que devuelva la LISTA de nombres cuya `vida` es MAYOR O IGUAL que `minvida`, en orden.\n\nUsa `df[df['vida'] >= minvida]['nombre'].tolist()`.",
        "You get `registros` (dicts with `nombre` and `vida`) and `minvida`. Write `supervivientes(registros, minvida)` returning the LIST of names whose `vida` is GREATER THAN OR EQUAL to `minvida`, in order.\n\nUse `df[df['vida'] >= minvida]['nombre'].tolist()`.",
      ),
      starter_code: "import pandas as pd\n\ndef supervivientes(registros, minvida):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def supervivientes(registros, minvida):",
        "    df = pd.DataFrame(registros)",
        "    return df[df['vida'] >= minvida]['nombre'].tolist()",
        "    return df['nombre'].tolist()",
        "    return df[df['vida'] < minvida]['nombre'].tolist()",
      ],
      hints: [
        P("Filtra las filas: `df[df['vida'] >= minvida]`.", "Filter the rows: `df[df['vida'] >= minvida]`."),
        P("Luego selecciona `['nombre']` y `.tolist()`.", "Then select `['nombre']` and `.tolist()`."),
      ],
      test_cases: [
        { input: "supervivientes([{'nombre': 'Frodo', 'vida': 80}, {'nombre': 'Sam', 'vida': 100}, {'nombre': 'Bill', 'vida': 20}], 50)", expected: ["Frodo", "Sam"], description: P("Vida >= 50", "Life >= 50"), raw: true },
        { input: "supervivientes([{'nombre': 'x', 'vida': 10}], 50)", expected: [], description: P("Ninguno resiste", "None survives"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("La Franja Templada", "The Temperate Band"),
    lore_intro: P(
      "Sólo se avanza donde la temperatura no es ni gélida ni ardiente. Cuenta los tramos dentro del rango.",
      "You only advance where the temperature is neither freezing nor scorching. Count the stretches within range.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("between (rango inclusivo)", "between (inclusive range)"),
      instructions: P(
        "Recibes `registros` (dicts con `temp`), y los límites `lo` y `hi`. Escribe `en_rango(registros, lo, hi)` que devuelva CUÁNTAS filas tienen `temp` entre `lo` y `hi` (ambos incluidos), como entero.\n\nUsa `df['temp'].between(lo, hi).sum()`.\n\nEjemplo: temps [-5, 10, 25, 40] con lo=0, hi=30 → `2`.",
        "You get `registros` (dicts with `temp`), and bounds `lo` and `hi`. Write `en_rango(registros, lo, hi)` returning HOW MANY rows have `temp` between `lo` and `hi` (both included), as an integer.\n\nUse `df['temp'].between(lo, hi).sum()`.\n\nExample: temps [-5, 10, 25, 40] with lo=0, hi=30 → `2`.",
      ),
      starter_code: "import pandas as pd\n\ndef en_rango(registros, lo, hi):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def en_rango(registros, lo, hi):",
        "    df = pd.DataFrame(registros)",
        "    return int(df['temp'].between(lo, hi).sum())",
        "    return int(df['temp'].between(lo, hi))",
        "    return int((df['temp'] > lo).sum())",
      ],
      hints: [
        P("`.between(lo, hi)` incluye ambos extremos.", "`.between(lo, hi)` includes both endpoints."),
        P("`.sum()` cuenta los True; `int(...)` al final.", "`.sum()` counts the True values; `int(...)` at the end."),
      ],
      test_cases: [
        { input: "en_rango([{'temp': -5}, {'temp': 10}, {'temp': 25}, {'temp': 40}], 0, 30)", expected: 2, description: P("10 y 25 entran", "10 and 25 qualify"), raw: true },
        { input: "en_rango([{'temp': -5}, {'temp': 40}], 100, 200)", expected: 0, description: P("Ninguno en rango", "None in range"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 6 · pandas: agrupar y agregar (groupby)
 * ===================================================================== */

const Q_GB_CONCEPT = {
  question: P("¿Qué patrón implementa `df.groupby('tipo')`?", "What pattern does `df.groupby('tipo')` implement?"),
  options: [
    P("Dividir-aplicar-combinar: agrupa filas y agrega cada grupo", "Split-apply-combine: groups rows and aggregates each group"),
    P("Ordena el DataFrame por 'tipo'", "Sorts the DataFrame by 'tipo'"),
    P("Elimina duplicados de 'tipo'", "Removes duplicates of 'tipo'"),
    P("Renombra la columna 'tipo'", "Renames the 'tipo' column"),
  ],
  correct: 0,
  explanation: P(
    "`groupby` DIVIDE las filas por el valor de la clave, APLICA una agregación a cada grupo y COMBINA los resultados. Es la herramienta nº1 para resumir por categorías.",
    "`groupby` SPLITS the rows by the key's value, APPLIES an aggregation to each group and COMBINES the results. It's the #1 tool to summarize by category.",
  ),
};
const Q_GB_SUM = {
  question: P("¿Qué da `df.groupby('tipo')['dano'].sum()`?", "What does `df.groupby('tipo')['dano'].sum()` give?"),
  options: [
    P("El daño total por cada tipo", "The total damage per type"),
    P("El daño total de todo el DataFrame", "The total damage of the whole DataFrame"),
    P("El número de tipos", "The number of types"),
    P("La primera fila de cada tipo", "The first row of each type"),
  ],
  correct: 0,
  explanation: P(
    "Agrupa por 'tipo' y suma 'dano' DENTRO de cada grupo: devuelve una Series indexada por tipo. Cambia `.sum()` por `.mean()`, `.max()`… según necesites.",
    "Groups by 'tipo' and sums 'dano' WITHIN each group: returns a Series indexed by type. Swap `.sum()` for `.mean()`, `.max()`… as needed.",
  ),
};
const Q_GB_SIZE = {
  question: P("¿Qué cuenta `df.groupby('tipo').size()`?", "What does `df.groupby('tipo').size()` count?"),
  options: [
    P("Cuántas filas hay en cada grupo", "How many rows are in each group"),
    P("El número de columnas", "The number of columns"),
    P("El tamaño en memoria", "The memory size"),
    P("La suma de cada grupo", "The sum of each group"),
  ],
  correct: 0,
  explanation: P(
    "`size()` da el número de filas por grupo (incluyendo NaN). `count()` es parecido pero cuenta valores NO nulos por columna. Ambos responden a '¿cuántos de cada?'.",
    "`size()` gives the row count per group (including NaN). `count()` is similar but counts NON-null values per column. Both answer 'how many of each?'.",
  ),
};
const Q_GB_MEAN = {
  question: P("¿Qué devuelve `df.groupby('region')['ventas'].mean()`?", "What does `df.groupby('region')['ventas'].mean()` return?"),
  options: [
    P("La media de ventas por región", "The mean of sales per region"),
    P("Las ventas totales", "The total sales"),
    P("El número de regiones", "The number of regions"),
    P("La región con más ventas", "The region with the most sales"),
  ],
  correct: 0,
  explanation: P(
    "El promedio de 'ventas' dentro de cada región. Comparar medias por grupo es el corazón de casi cualquier análisis: ¿qué categoría rinde más?",
    "The average of 'ventas' within each region. Comparing group means is the heart of almost any analysis: which category performs best?",
  ),
};
const Q_GB_AGG = {
  question: P("¿Para qué sirve `.agg(['sum', 'mean'])` tras un groupby?", "What is `.agg(['sum', 'mean'])` for after a groupby?"),
  options: [
    P("Calcular VARIAS agregaciones a la vez por grupo", "Compute SEVERAL aggregations at once per group"),
    P("Ordenar los grupos", "Sort the groups"),
    P("Filtrar los grupos", "Filter the groups"),
    P("Unir dos DataFrames", "Join two DataFrames"),
  ],
  correct: 0,
  explanation: P(
    "`.agg()` aplica varias funciones de golpe (`['sum', 'mean', 'max']`) o distintas por columna con un dict (`{'ventas': 'sum', 'precio': 'mean'}`). Un resumen a medida.",
    "`.agg()` applies several functions at once (`['sum', 'mean', 'max']`) or different ones per column with a dict (`{'ventas': 'sum', 'precio': 'mean'}`). A tailored summary.",
  ),
};
const Q_GB_INDEX = {
  question: P("Tras `df.groupby('tipo')['x'].sum()`, ¿qué es el índice del resultado?", "After `df.groupby('tipo')['x'].sum()`, what is the result's index?"),
  options: [
    P("Los valores únicos de 'tipo' (la clave de agrupación)", "The unique values of 'tipo' (the grouping key)"),
    P("0, 1, 2… como siempre", "0, 1, 2… as always"),
    P("Los valores de 'x'", "The values of 'x'"),
    P("No tiene índice", "It has no index"),
  ],
  correct: 0,
  explanation: P(
    "El resultado queda indexado por la CLAVE de grupo. Si prefieres 'tipo' como una columna normal, añade `.reset_index()` para aplanarlo a un DataFrame.",
    "The result is indexed by the GROUP key. If you'd rather have 'tipo' as a normal column, add `.reset_index()` to flatten it into a DataFrame.",
  ),
};
const Q_GB_RESET = {
  question: P("¿Qué hace `.reset_index()` tras un groupby?", "What does `.reset_index()` do after a groupby?"),
  options: [
    P("Convierte la clave de grupo (el índice) en una columna normal", "Turns the group key (the index) into a normal column"),
    P("Borra el resultado", "Deletes the result"),
    P("Ordena por índice", "Sorts by index"),
    P("Reinicia los valores a 0", "Resets the values to 0"),
  ],
  correct: 0,
  explanation: P(
    "Tras agregar, el resultado se indexa por la clave. `.reset_index()` la baja a columna y pone un índice 0,1,2… — cómodo para seguir trabajando o exportar con `to_dict('records')`.",
    "After aggregating, the result is indexed by the key. `.reset_index()` moves it down to a column and sets a 0,1,2… index — handy to keep working or export with `to_dict('records')`.",
  ),
};
const Q_GB_MULTI = {
  question: P("¿Qué hace `df.groupby(['region', 'tipo'])`?", "What does `df.groupby(['region', 'tipo'])` do?"),
  options: [
    P("Agrupa por la COMBINACIÓN de ambas columnas", "Groups by the COMBINATION of both columns"),
    P("Agrupa dos veces por separado", "Groups twice separately"),
    P("Da error: sólo se puede una columna", "Errors: only one column allowed"),
    P("Agrupa sólo por 'region'", "Groups only by 'region'"),
  ],
  correct: 0,
  explanation: P(
    "Con una LISTA de claves, cada grupo es una combinación única (region, tipo). El resultado tiene un índice jerárquico (MultiIndex): ventas por región Y tipo.",
    "With a LIST of keys, each group is a unique (region, tipo) combination. The result has a hierarchical index (MultiIndex): sales by region AND type.",
  ),
};
const Q_GB_NAMEDAGG = {
  question: P("¿Qué hace `.agg(total=('dano', 'sum'), n=('dano', 'size'))`?", "What does `.agg(total=('dano', 'sum'), n=('dano', 'size'))` do?"),
  options: [
    P("Crea columnas 'total' y 'n' con esas agregaciones", "Creates columns 'total' and 'n' with those aggregations"),
    P("Renombra la columna 'dano'", "Renames the 'dano' column"),
    P("Filtra por total y n", "Filters by total and n"),
    P("Da error", "Errors"),
  ],
  correct: 0,
  explanation: P(
    "Es la 'named aggregation': `nombre=(columna, función)` produce columnas con el nombre que elijas. Ideal para un resumen limpio: total de daño y número de enemigos por grupo.",
    "It's the 'named aggregation': `name=(column, function)` produces columns with the name you choose. Ideal for a clean summary: total damage and enemy count per group.",
  ),
};

/** Capítulo 6 · pandas: agrupar y agregar. */
export const SYL_DATA_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_GB_CONCEPT, Q_GB_SUM, Q_GB_SIZE] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_GB_MEAN, Q_GB_INDEX, Q_GB_RESET] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_GB_AGG, Q_GB_MULTI, Q_GB_NAMEDAGG] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P(
      "La horda de Moria es incontable, pero no si la agrupas. Resume por tipo: daño total y cuántos hay de cada uno.",
      "The horde of Moria is countless, unless you group it. Summarize by type: total damage and how many of each.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("groupby con named aggregation", "groupby with named aggregation"),
      instructions: P(
        "Recibes `registros` (dicts con `tipo` y `dano`). Escribe `resumen_por_tipo(registros)` que, POR CADA tipo, dé el `total` de daño y el número `n` de enemigos, como lista de dicts ordenada por tipo.\n\nUsa `df.groupby('tipo')['dano'].agg(total='sum', n='size').reset_index().to_dict('records')`.",
        "You get `registros` (dicts with `tipo` and `dano`). Write `resumen_por_tipo(registros)` that, PER type, gives the `total` damage and the count `n` of enemies, as a list of dicts sorted by type.\n\nUse `df.groupby('tipo')['dano'].agg(total='sum', n='size').reset_index().to_dict('records')`.",
      ),
      starter_code: "import pandas as pd\n\ndef resumen_por_tipo(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def resumen_por_tipo(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df.groupby('tipo')['dano'].agg(total='sum', n='size').reset_index().to_dict('records')",
        "    return df.groupby('tipo')['dano'].sum().to_dict()",
      ],
      hints: [
        P("`df.groupby('tipo')['dano'].agg(total='sum', n='size')` da las dos columnas.", "`df.groupby('tipo')['dano'].agg(total='sum', n='size')` gives both columns."),
        P("`.reset_index()` baja 'tipo' a columna; `.to_dict('records')` exporta.", "`.reset_index()` moves 'tipo' to a column; `.to_dict('records')` exports."),
      ],
      test_cases: [
        { input: "resumen_por_tipo([{'tipo': 'orco', 'dano': 10}, {'tipo': 'orco', 'dano': 15}, {'tipo': 'trol', 'dano': 10}, {'tipo': 'trol', 'dano': 25}])", expected: [{ tipo: "orco", total: 25, n: 2 }, { tipo: "trol", total: 35, n: 2 }], description: P("Resumen por tipo", "Summary per type"), raw: true },
        { input: "resumen_por_tipo([{'tipo': 'nazgul', 'dano': 50}])", expected: [{ tipo: "nazgul", total: 50, n: 1 }], description: P("Un solo grupo", "A single group"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino del Grupo", "The Scroll of the Group"),
    lore_intro: P(
      "En las tumbas de Moria, un pergamino enano enseña a resumir multitudes: dividir, agregar, combinar.",
      "In the tombs of Moria, a dwarven scroll teaches how to summarize multitudes: split, aggregate, combine.",
    ),
    scroll: {
      topic: P("pandas: groupby (dividir-aplicar-combinar)", "pandas: groupby (split-apply-combine)"),
      sections: [
        {
          heading: P("Agrupar y agregar", "Group and aggregate"),
          body: P(
            "`df.groupby('tipo')['dano'].sum()` suma el daño por tipo. Cambia `sum` por `mean`, `max`, `size` (nº de filas por grupo).",
            "`df.groupby('tipo')['dano'].sum()` sums damage per type. Swap `sum` for `mean`, `max`, `size` (row count per group).",
          ),
          code: "df.groupby('tipo')['dano'].sum()\ndf.groupby('tipo').size()   # cuántos",
        },
        {
          heading: P("El índice del resultado", "The result's index"),
          body: P(
            "El resultado queda indexado por la clave de grupo. `.reset_index()` la convierte en columna normal, cómodo para exportar.",
            "The result is indexed by the group key. `.reset_index()` turns it into a normal column, handy to export.",
          ),
          code: "(df.groupby('tipo')['dano'].sum()\n   .reset_index())",
        },
        {
          heading: P("Varias agregaciones", "Several aggregations"),
          body: P(
            "`.agg(total=('dano', 'sum'), n=('dano', 'size'))` crea columnas con el nombre que elijas. Agrupa por varias claves con una lista.",
            "`.agg(total=('dano', 'sum'), n=('dano', 'size'))` creates columns with names you choose. Group by several keys with a list.",
          ),
          code: "df.groupby('tipo')['dano'].agg(\n    total='sum', n='size'\n).reset_index()",
        },
      ],
      keyTakeaway: P(
        "groupby divide por clave y agrega cada grupo (sum/mean/size). El resultado se indexa por la clave: reset_index() la baja a columna; .agg(nombre=(col,func)) da resúmenes a medida.",
        "groupby splits by key and aggregates each group (sum/mean/size). The result is indexed by the key: reset_index() moves it to a column; .agg(name=(col,func)) gives tailored summaries.",
      ),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("El Daño de cada Estirpe", "The Damage of Each Kind"),
    lore_intro: P(
      "Ante las Puertas de Durin, suma el daño total que aporta cada estirpe de enemigo.",
      "Before the Doors of Durin, sum the total damage each enemy kind contributes.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("groupby + sum", "groupby + sum"),
      instructions: P(
        "Recibes `registros` (dicts con `tipo` y `dano`). Escribe `total_por_tipo(registros)` que devuelva un dict {tipo: daño total del tipo}.\n\nUsa `df.groupby('tipo')['dano'].sum().to_dict()`.\n\nEjemplo: dos orcos (10, 15) y dos troles (10, 25) → `{'orco': 25, 'trol': 35}`.",
        "You get `registros` (dicts with `tipo` and `dano`). Write `total_por_tipo(registros)` returning a dict {type: total damage of the type}.\n\nUse `df.groupby('tipo')['dano'].sum().to_dict()`.\n\nExample: two orcs (10, 15) and two trolls (10, 25) → `{'orco': 25, 'trol': 35}`.",
      ),
      starter_code: "import pandas as pd\n\ndef total_por_tipo(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def total_por_tipo(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df.groupby('tipo')['dano'].sum().to_dict()",
        "    return df['dano'].sum()",
        "    return df.groupby('dano')['tipo'].sum().to_dict()",
      ],
      hints: [
        P("`df.groupby('tipo')['dano'].sum()` suma por tipo.", "`df.groupby('tipo')['dano'].sum()` sums per type."),
        P("`.to_dict()` convierte la Series en un dict.", "`.to_dict()` turns the Series into a dict."),
      ],
      test_cases: [
        { input: "total_por_tipo([{'tipo': 'orco', 'dano': 10}, {'tipo': 'orco', 'dano': 15}, {'tipo': 'trol', 'dano': 10}, {'tipo': 'trol', 'dano': 25}])", expected: { orco: 25, trol: 35 }, description: P("Total por estirpe", "Total per kind"), raw: true },
        { input: "total_por_tipo([{'tipo': 'nazgul', 'dano': 50}])", expected: { nazgul: 50 }, description: P("Un solo tipo", "A single type"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("El Censo de la Cámara", "The Census of the Chamber"),
    lore_intro: P(
      "En la Cámara de Mazarbul, cuenta cuántos enemigos hay de cada tipo.",
      "In the Chamber of Mazarbul, count how many enemies there are of each type.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("groupby + size", "groupby + size"),
      instructions: P(
        "Recibes `registros` (dicts con `tipo`). Escribe `conteo_por_tipo(registros)` que devuelva un dict {tipo: cuántas filas de ese tipo}.\n\nUsa `df.groupby('tipo').size().to_dict()`.\n\nEjemplo: dos orcos y dos troles → `{'orco': 2, 'trol': 2}`.",
        "You get `registros` (dicts with `tipo`). Write `conteo_por_tipo(registros)` returning a dict {type: how many rows of that type}.\n\nUse `df.groupby('tipo').size().to_dict()`.\n\nExample: two orcs and two trolls → `{'orco': 2, 'trol': 2}`.",
      ),
      starter_code: "import pandas as pd\n\ndef conteo_por_tipo(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def conteo_por_tipo(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df.groupby('tipo').size().to_dict()",
        "    return df.groupby('tipo').sum().to_dict()",
        "    return len(df)",
      ],
      hints: [
        P("`.size()` cuenta las filas de cada grupo.", "`.size()` counts each group's rows."),
        P("`.to_dict()` lo pasa a dict.", "`.to_dict()` turns it into a dict."),
      ],
      test_cases: [
        { input: "conteo_por_tipo([{'tipo': 'orco'}, {'tipo': 'orco'}, {'tipo': 'trol'}, {'tipo': 'trol'}])", expected: { orco: 2, trol: 2 }, description: P("Dos de cada", "Two of each"), raw: true },
        { input: "conteo_por_tipo([{'tipo': 'uruk'}, {'tipo': 'uruk'}, {'tipo': 'uruk'}])", expected: { uruk: 3 }, description: P("Tres uruks", "Three uruks"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Daño Medio del Puente", "The Bridge's Mean Damage"),
    lore_intro: P(
      "Sobre el puente, calcula el daño MEDIO que asesta cada estirpe.",
      "On the bridge, compute the MEAN damage each kind deals.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("groupby + mean redondeada", "groupby + rounded mean"),
      instructions: P(
        "Recibes `registros` (dicts con `tipo` y `dano`). Escribe `media_por_tipo(registros)` que devuelva un dict {tipo: daño medio redondeado a 2 decimales}.\n\nUsa `df.groupby('tipo')['dano'].mean().round(2).to_dict()`.\n\nEjemplo: orcos (10, 15) y troles (10, 25) → `{'orco': 12.5, 'trol': 17.5}`.",
        "You get `registros` (dicts with `tipo` and `dano`). Write `media_por_tipo(registros)` returning a dict {type: mean damage rounded to 2 decimals}.\n\nUse `df.groupby('tipo')['dano'].mean().round(2).to_dict()`.\n\nExample: orcs (10, 15) and trolls (10, 25) → `{'orco': 12.5, 'trol': 17.5}`.",
      ),
      starter_code: "import pandas as pd\n\ndef media_por_tipo(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def media_por_tipo(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df.groupby('tipo')['dano'].mean().round(2).to_dict()",
        "    return df.groupby('tipo')['dano'].sum().to_dict()",
        "    return df['dano'].mean()",
      ],
      hints: [
        P("`.mean()` sobre el grupo da el promedio por tipo.", "`.mean()` over the group gives the average per type."),
        P("`.round(2)` antes de `.to_dict()` evita decimales infinitos.", "`.round(2)` before `.to_dict()` avoids endless decimals."),
      ],
      test_cases: [
        { input: "media_por_tipo([{'tipo': 'orco', 'dano': 10}, {'tipo': 'orco', 'dano': 15}, {'tipo': 'trol', 'dano': 10}, {'tipo': 'trol', 'dano': 25}])", expected: { orco: 12.5, trol: 17.5 }, description: P("Media por tipo", "Mean per type"), raw: true },
        { input: "media_por_tipo([{'tipo': 'a', 'dano': 5}, {'tipo': 'a', 'dano': 10}])", expected: { a: 7.5 }, description: P("Un grupo", "One group"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P(
      "En la galería resuena el golpe más brutal de cada estirpe. Halla el daño MÁXIMO por tipo.",
      "In the gallery echoes the most brutal blow of each kind. Find the MAX damage per type.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("groupby + max", "groupby + max"),
      instructions: P(
        "Recibes `registros` (dicts con `tipo` y `dano`). Escribe `maximo_por_tipo(registros)` que devuelva un dict {tipo: daño máximo de ese tipo}.\n\nUsa `df.groupby('tipo')['dano'].max().to_dict()`.\n\nEjemplo: orcos (10, 15) y troles (10, 25) → `{'orco': 15, 'trol': 25}`.",
        "You get `registros` (dicts with `tipo` and `dano`). Write `maximo_por_tipo(registros)` returning a dict {type: max damage of that type}.\n\nUse `df.groupby('tipo')['dano'].max().to_dict()`.\n\nExample: orcs (10, 15) and trolls (10, 25) → `{'orco': 15, 'trol': 25}`.",
      ),
      starter_code: "import pandas as pd\n\ndef maximo_por_tipo(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def maximo_por_tipo(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df.groupby('tipo')['dano'].max().to_dict()",
        "    return df.groupby('tipo')['dano'].min().to_dict()",
        "    return df['dano'].max()",
      ],
      hints: [
        P("`.max()` sobre el grupo da el pico de cada tipo.", "`.max()` over the group gives each type's peak."),
        P("`.to_dict()` lo convierte en dict.", "`.to_dict()` turns it into a dict."),
      ],
      test_cases: [
        { input: "maximo_por_tipo([{'tipo': 'orco', 'dano': 10}, {'tipo': 'orco', 'dano': 15}, {'tipo': 'trol', 'dano': 10}, {'tipo': 'trol', 'dano': 25}])", expected: { orco: 15, trol: 25 }, description: P("Pico por tipo", "Peak per type"), raw: true },
        { input: "maximo_por_tipo([{'tipo': 'x', 'dano': 3}, {'tipo': 'x', 'dano': 9}])", expected: { x: 9 }, description: P("Un grupo", "One group"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 7 · pandas: limpieza de datos (NaN, tipos, apply)
 * ===================================================================== */

const Q_CL_NAN = {
  question: P("¿Qué representa `NaN` en pandas?", "What does `NaN` represent in pandas?"),
  options: [
    P("Un valor AUSENTE (dato que falta)", "A MISSING value (absent data)"),
    P("El número cero", "The number zero"),
    P("Un texto vacío", "An empty string"),
    P("Un error de sintaxis", "A syntax error"),
  ],
  correct: 0,
  explanation: P(
    "`NaN` (Not a Number) marca un dato AUSENTE. Aparece al leer datos reales con huecos. Ojo: obliga a la columna a ser `float`, y `NaN != NaN`.",
    "`NaN` (Not a Number) marks MISSING data. It shows up when reading real data with gaps. Note: it forces the column to be `float`, and `NaN != NaN`.",
  ),
};
const Q_CL_ISNA = {
  question: P("¿Cómo detectas qué celdas están ausentes?", "How do you detect which cells are missing?"),
  options: [
    P("df.isna() (o df.isnull())", "df.isna() (or df.isnull())"),
    P("df == NaN", "df == NaN"),
    P("df.missing()", "df.missing()"),
    P("df.empty()", "df.empty()"),
  ],
  correct: 0,
  explanation: P(
    "`df.isna()` da un DataFrame de True/False. Como `NaN != NaN`, NO puedes compararlo con `==`. `df.isna().sum()` cuenta ausentes por columna: el primer diagnóstico de un dataset.",
    "`df.isna()` gives a True/False DataFrame. Since `NaN != NaN`, you can NOT compare with `==`. `df.isna().sum()` counts missing per column: a dataset's first diagnosis.",
  ),
};
const Q_CL_DROPNA = {
  question: P("¿Qué hace `df.dropna()`?", "What does `df.dropna()` do?"),
  options: [
    P("Elimina las FILAS que tienen algún NaN", "Removes the ROWS that have any NaN"),
    P("Rellena los NaN con 0", "Fills NaN with 0"),
    P("Borra la columna con NaN", "Deletes the column with NaN"),
    P("Convierte NaN en texto", "Turns NaN into text"),
  ],
  correct: 0,
  explanation: P(
    "`dropna()` descarta las filas con datos ausentes (por defecto, si falta CUALQUIER campo). Es simple, pero puede tirar mucha información: a veces conviene rellenar en su lugar.",
    "`dropna()` discards rows with missing data (by default, if ANY field is missing). Simple, but it can throw away a lot: sometimes filling is better.",
  ),
};
const Q_CL_FILLNA = {
  question: P("¿Qué hace `df['x'].fillna(0)`?", "What does `df['x'].fillna(0)` do?"),
  options: [
    P("Sustituye los NaN de esa columna por 0", "Replaces that column's NaN with 0"),
    P("Elimina las filas con NaN", "Removes rows with NaN"),
    P("Cuenta los NaN", "Counts the NaN"),
    P("Convierte todo a 0", "Turns everything into 0"),
  ],
  correct: 0,
  explanation: P(
    "`fillna(valor)` rellena los ausentes: con 0, con la media (`df['x'].mean()`), con el anterior (`method='ffill'`)… Rellenar conserva las filas, a diferencia de `dropna`.",
    "`fillna(value)` fills the missing ones: with 0, with the mean (`df['x'].mean()`), with the previous (`method='ffill'`)… Filling keeps the rows, unlike `dropna`.",
  ),
};
const Q_CL_ASTYPE = {
  question: P("¿Para qué sirve `df['x'].astype(int)`?", "What is `df['x'].astype(int)` for?"),
  options: [
    P("Convertir el tipo de la columna (p. ej. float → int)", "Convert the column's type (e.g. float → int)"),
    P("Filtrar los enteros", "Filter the integers"),
    P("Contar los valores", "Count the values"),
    P("Ordenar la columna", "Sort the column"),
  ],
  correct: 0,
  explanation: P(
    "`astype` cambia el dtype: útil tras rellenar NaN (que había forzado `float`) o al leer números que llegaron como texto. Falla si hay NaN o texto no convertible.",
    "`astype` changes the dtype: handy after filling NaN (which had forced `float`) or when numbers arrived as text. It fails if there's NaN or unconvertible text.",
  ),
};
const Q_CL_APPLY = {
  question: P("¿Qué hace `df['x'].apply(f)`?", "What does `df['x'].apply(f)` do?"),
  options: [
    P("Aplica la función `f` a cada valor de la columna", "Applies function `f` to each value of the column"),
    P("Filtra con `f`", "Filters with `f`"),
    P("Ordena con `f`", "Sorts with `f`"),
    P("Ejecuta `f` una sola vez", "Runs `f` once"),
  ],
  correct: 0,
  explanation: P(
    "`apply(f)` transforma cada valor con tu función (a menudo una `lambda`). Útil para lógica que no cubre la vectorización. Cuando puedas, prefiere operaciones vectorizadas por velocidad.",
    "`apply(f)` transforms each value with your function (often a `lambda`). Handy for logic vectorization doesn't cover. When you can, prefer vectorized ops for speed.",
  ),
};
const Q_CL_DUP = {
  question: P("¿Qué hace `df.drop_duplicates()`?", "What does `df.drop_duplicates()` do?"),
  options: [
    P("Elimina las filas repetidas", "Removes duplicate rows"),
    P("Cuenta los duplicados", "Counts the duplicates"),
    P("Marca los duplicados con NaN", "Marks duplicates with NaN"),
    P("Ordena y quita nulos", "Sorts and drops nulls"),
  ],
  correct: 0,
  explanation: P(
    "`drop_duplicates()` deja una sola copia de cada fila repetida; con `subset=['id']` mira sólo esas columnas. `df.duplicated()` da la máscara de cuáles son repetidos.",
    "`drop_duplicates()` keeps a single copy of each repeated row; with `subset=['id']` it looks only at those columns. `df.duplicated()` gives the mask of which are repeats.",
  ),
};
const Q_CL_STR = {
  question: P("¿Cómo pasas a mayúsculas toda una columna de texto `df['nombre']`?", "How do you uppercase a whole text column `df['nombre']`?"),
  options: [
    P("df['nombre'].str.upper()", "df['nombre'].str.upper()"),
    P("df['nombre'].upper()", "df['nombre'].upper()"),
    P("upper(df['nombre'])", "upper(df['nombre'])"),
    P("df['nombre'].toUpperCase()", "df['nombre'].toUpperCase()"),
  ],
  correct: 0,
  explanation: P(
    "El accesor `.str` aplica métodos de texto a toda la columna: `.str.upper()`, `.str.strip()`, `.str.contains('orco')`. Vectoriza la limpieza de cadenas.",
    "The `.str` accessor applies string methods to the whole column: `.str.upper()`, `.str.strip()`, `.str.contains('orco')`. It vectorizes string cleaning.",
  ),
};
const Q_CL_MEANSKIP = {
  question: P("Con un NaN en la columna, ¿qué hace `df['x'].mean()`?", "With a NaN in the column, what does `df['x'].mean()` do?"),
  options: [
    P("Calcula la media IGNORANDO los NaN", "Computes the mean IGNORING the NaN"),
    P("Devuelve NaN", "Returns NaN"),
    P("Da error", "Errors"),
    P("Cuenta el NaN como 0", "Counts the NaN as 0"),
  ],
  correct: 0,
  explanation: P(
    "Las agregaciones de pandas (`mean`, `sum`…) SALTAN los NaN por defecto. Pero la aritmética directa (`df['x'] + df['y']`) los PROPAGA: NaN contamina el resultado.",
    "pandas aggregations (`mean`, `sum`…) SKIP NaN by default. But direct arithmetic (`df['x'] + df['y']`) PROPAGATES them: NaN contaminates the result.",
  ),
};

/** Capítulo 7 · pandas: limpieza de datos. */
export const SYL_DATA_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_CL_NAN, Q_CL_ISNA, Q_CL_MEANSKIP] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_CL_DROPNA, Q_CL_FILLNA, Q_CL_ASTYPE] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_CL_APPLY, Q_CL_DUP, Q_CL_STR] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P(
      "El parte de bajas de Uglúk viene lleno de huecos. Descarta los registros sin dato y calcula la media de los que sí valen.",
      "Uglúk's casualty report comes full of gaps. Discard the records with no value and compute the mean of the valid ones.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("dropna + media", "dropna + mean"),
      instructions: P(
        "Recibes `registros` (dicts con `valor`, que puede ser `None`). Escribe `media_valida(registros)` que descarte los ausentes y devuelva la MEDIA de los válidos, redondeada a 2 decimales.\n\nUsa `df['valor'].dropna().mean()` con `round(float(...), 2)`.\n\nEjemplo: valores [10, None, 35] → media de [10, 35] = `22.5`.",
        "You get `registros` (dicts with `valor`, which may be `None`). Write `media_valida(registros)` that drops the missing ones and returns the MEAN of the valid ones, rounded to 2 decimals.\n\nUse `df['valor'].dropna().mean()` with `round(float(...), 2)`.\n\nExample: values [10, None, 35] → mean of [10, 35] = `22.5`.",
      ),
      starter_code: "import pandas as pd\n\ndef media_valida(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def media_valida(registros):",
        "    df = pd.DataFrame(registros)",
        "    return round(float(df['valor'].dropna().mean()), 2)",
        "    return round(float(df['valor'].mean()), 2)",
        "    return df['valor'].dropna().mean()",
      ],
      hints: [
        P("`df['valor'].dropna()` quita los NaN de la columna.", "`df['valor'].dropna()` removes the column's NaN."),
        P("Luego `.mean()` y `round(float(...), 2)`.", "Then `.mean()` and `round(float(...), 2)`."),
      ],
      test_cases: [
        { input: "media_valida([{'valor': 10}, {'valor': None}, {'valor': 35}])", expected: 22.5, description: P("Ignora el hueco", "Ignores the gap"), raw: true },
        { input: "media_valida([{'valor': 1}, {'valor': None}, {'valor': 4}])", expected: 2.5, description: P("Media de los válidos", "Mean of the valid ones"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino de la Limpieza", "The Scroll of Cleaning"),
    lore_intro: P(
      "Galadriel entrega, junto a sus dones, un pergamino: enseña a sanar los datos rotos antes de analizarlos.",
      "Galadriel gives, alongside her gifts, a scroll: it teaches how to heal broken data before analyzing it.",
    ),
    scroll: {
      topic: P("pandas: limpieza de datos", "pandas: data cleaning"),
      sections: [
        {
          heading: P("Datos ausentes (NaN)", "Missing data (NaN)"),
          body: P(
            "`df.isna().sum()` cuenta huecos por columna. `df.dropna()` tira las filas con NaN; `df['x'].fillna(0)` los rellena. Las agregaciones ignoran NaN; la aritmética lo propaga.",
            "`df.isna().sum()` counts gaps per column. `df.dropna()` drops rows with NaN; `df['x'].fillna(0)` fills them. Aggregations ignore NaN; arithmetic propagates it.",
          ),
          code: "df.isna().sum()\ndf.dropna()\ndf['x'].fillna(0)",
        },
        {
          heading: P("Tipos y duplicados", "Types and duplicates"),
          body: P(
            "`df['x'].astype(int)` corrige el tipo (tras rellenar o al leer texto). `df.drop_duplicates()` deja una copia de cada fila repetida.",
            "`df['x'].astype(int)` fixes the type (after filling or when reading text). `df.drop_duplicates()` keeps one copy of each repeated row.",
          ),
          code: "df['x'].fillna(0).astype(int)\ndf.drop_duplicates()",
        },
        {
          heading: P("Transformar valores", "Transforming values"),
          body: P(
            "`df['x'].apply(f)` aplica una función a cada valor. El accesor `.str` vectoriza texto: `.str.upper()`, `.str.strip()`.",
            "`df['x'].apply(f)` applies a function to each value. The `.str` accessor vectorizes text: `.str.upper()`, `.str.strip()`.",
          ),
          code: "df['poder'].apply(lambda p: 'alto' if p > 50 else 'bajo')\ndf['nombre'].str.upper()",
        },
      ],
      keyTakeaway: P(
        "isna/​dropna/​fillna manejan ausentes; astype corrige tipos; drop_duplicates quita repetidos; apply y .str transforman. Las agregaciones saltan NaN, la aritmética lo propaga.",
        "isna/​dropna/​fillna handle missing; astype fixes types; drop_duplicates removes repeats; apply and .str transform. Aggregations skip NaN, arithmetic propagates it.",
      ),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("Rellenar los Huecos", "Filling the Gaps"),
    lore_intro: P(
      "La luz del frasco no deja rincón oscuro. Rellena cada dato ausente con un valor por defecto.",
      "The phial's light leaves no dark corner. Fill each missing value with a default.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("fillna + astype", "fillna + astype"),
      instructions: P(
        "Recibes `registros` (dicts con `valor`, que puede ser `None`) y un `valor` por defecto. Escribe `rellenar(registros, valor)` que sustituya los ausentes por `valor` y devuelva la columna como LISTA de ENTEROS.\n\nUsa `df['valor'].fillna(valor).astype(int).tolist()`.\n\nEjemplo: [10, None, 30] con valor 0 → `[10, 0, 30]`.",
        "You get `registros` (dicts with `valor`, which may be `None`) and a default `valor`. Write `rellenar(registros, valor)` that replaces the missing ones with `valor` and returns the column as a LIST of INTEGERS.\n\nUse `df['valor'].fillna(valor).astype(int).tolist()`.\n\nExample: [10, None, 30] with valor 0 → `[10, 0, 30]`.",
      ),
      starter_code: "import pandas as pd\n\ndef rellenar(registros, valor):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def rellenar(registros, valor):",
        "    df = pd.DataFrame(registros)",
        "    return df['valor'].fillna(valor).astype(int).tolist()",
        "    return df['valor'].dropna().tolist()",
        "    return df['valor'].tolist()",
      ],
      hints: [
        P("`fillna(valor)` sustituye los NaN.", "`fillna(valor)` replaces the NaN."),
        P("`.astype(int)` vuelve a enteros; `.tolist()` al final.", "`.astype(int)` returns to integers; `.tolist()` at the end."),
      ],
      test_cases: [
        { input: "rellenar([{'valor': 10}, {'valor': None}, {'valor': 30}], 0)", expected: [10, 0, 30], description: P("Rellena con 0", "Fill with 0"), raw: true },
        { input: "rellenar([{'valor': 10}, {'valor': None}, {'valor': 30}], 99)", expected: [10, 99, 30], description: P("Rellena con 99", "Fill with 99"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Clasificar por Poder", "Classifying by Power"),
    lore_intro: P(
      "Cada capa oculta a un guerrero de distinta fuerza. Etiqueta cada uno como 'fuerte' o 'debil' con apply.",
      "Each cloak hides a warrior of different strength. Label each as 'fuerte' or 'debil' with apply.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("apply con lambda", "apply with a lambda"),
      instructions: P(
        "Recibes `registros` (dicts con `poder`). Escribe `etiquetar(registros)` que devuelva una LISTA con `'fuerte'` si `poder >= 50`, o `'debil'` en caso contrario, para cada fila.\n\nUsa `df['poder'].apply(lambda p: 'fuerte' if p >= 50 else 'debil').tolist()`.",
        "You get `registros` (dicts with `poder`). Write `etiquetar(registros)` returning a LIST with `'fuerte'` if `poder >= 50`, or `'debil'` otherwise, for each row.\n\nUse `df['poder'].apply(lambda p: 'fuerte' if p >= 50 else 'debil').tolist()`.",
      ),
      starter_code: "import pandas as pd\n\ndef etiquetar(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def etiquetar(registros):",
        "    df = pd.DataFrame(registros)",
        "    return df['poder'].apply(lambda p: 'fuerte' if p >= 50 else 'debil').tolist()",
        "    return df['poder'].tolist()",
        "    return df['poder'].apply('fuerte').tolist()",
      ],
      hints: [
        P("`apply` recibe una función que decide la etiqueta de cada valor.", "`apply` takes a function that decides each value's label."),
        P("La lambda: `lambda p: 'fuerte' if p >= 50 else 'debil'`.", "The lambda: `lambda p: 'fuerte' if p >= 50 else 'debil'`."),
      ],
      test_cases: [
        { input: "etiquetar([{'poder': 80}, {'poder': 20}, {'poder': 50}])", expected: ["fuerte", "debil", "fuerte"], description: P("50 ya es fuerte", "50 is already strong"), raw: true },
        { input: "etiquetar([{'poder': 10}])", expected: ["debil"], description: P("Débil", "Weak"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones Contables", "The Countable Gifts"),
    lore_intro: P(
      "No todos los dones llegan con su valor anotado. Cuenta cuántos SÍ lo traen.",
      "Not all gifts arrive with their value noted. Count how many DO carry it.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("notna + conteo", "notna + counting"),
      instructions: P(
        "Recibes `registros` (dicts con `valor`, que puede ser `None`). Escribe `validos(registros)` que devuelva CUÁNTAS filas tienen `valor` NO ausente, como entero.\n\nUsa `df['valor'].notna().sum()` envuelto en `int(...)`.\n\nEjemplo: [5, None, 7, None] → `2`.",
        "You get `registros` (dicts with `valor`, which may be `None`). Write `validos(registros)` returning HOW MANY rows have a NON-missing `valor`, as an integer.\n\nUse `df['valor'].notna().sum()` wrapped in `int(...)`.\n\nExample: [5, None, 7, None] → `2`.",
      ),
      starter_code: "import pandas as pd\n\ndef validos(registros):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def validos(registros):",
        "    df = pd.DataFrame(registros)",
        "    return int(df['valor'].notna().sum())",
        "    return int(df['valor'].isna().sum())",
        "    return len(df)",
      ],
      hints: [
        P("`notna()` da True donde HAY valor.", "`notna()` gives True where there IS a value."),
        P("`.sum()` cuenta los True; `int(...)` al final.", "`.sum()` counts the True values; `int(...)` at the end."),
      ],
      test_cases: [
        { input: "validos([{'valor': 5}, {'valor': None}, {'valor': 7}, {'valor': None}])", expected: 2, description: P("Dos con valor", "Two with a value"), raw: true },
        { input: "validos([{'valor': None}])", expected: 0, description: P("Ninguno", "None"), raw: true },
      ],
    },
  },
};


/* ===================================================================== *
 * Capítulo 8 · pandas: análisis (ordenar, describir, cruzar)
 * ===================================================================== */

const Q_AN_SORT = {
  question: P("¿Cómo ordenas el DataFrame por la columna 'ventas'?", "How do you sort the DataFrame by the 'ventas' column?"),
  options: [
    P("df.sort_values('ventas')", "df.sort_values('ventas')"),
    P("df.sort('ventas')", "df.sort('ventas')"),
    P("df.order_by('ventas')", "df.order_by('ventas')"),
    P("df.sort_index('ventas')", "df.sort_index('ventas')"),
  ],
  correct: 0,
  explanation: P(
    "`sort_values('col')` ordena por los VALORES de esa columna (ascendente por defecto). `sort_index()` en cambio ordena por el índice, no por los datos.",
    "`sort_values('col')` sorts by that column's VALUES (ascending by default). `sort_index()` instead sorts by the index, not the data.",
  ),
};
const Q_AN_DESC = {
  question: P("¿Cómo ordenas de MAYOR a menor?", "How do you sort from HIGHEST to lowest?"),
  options: [
    P("df.sort_values('x', ascending=False)", "df.sort_values('x', ascending=False)"),
    P("df.sort_values('x', desc=True)", "df.sort_values('x', desc=True)"),
    P("df.sort_values('x').reverse()", "df.sort_values('x').reverse()"),
    P("df.sort_values('-x')", "df.sort_values('-x')"),
  ],
  correct: 0,
  explanation: P(
    "`ascending=False` invierte el orden. Puedes ordenar por varias columnas con una lista y un `ascending` por cada una: `sort_values(['a', 'b'], ascending=[True, False])`.",
    "`ascending=False` reverses the order. You can sort by several columns with a list and one `ascending` each: `sort_values(['a', 'b'], ascending=[True, False])`.",
  ),
};
const Q_AN_NLARGEST = {
  question: P("¿Qué hace `df.nlargest(3, 'ventas')`?", "What does `df.nlargest(3, 'ventas')` do?"),
  options: [
    P("Devuelve las 3 filas con mayor 'ventas'", "Returns the 3 rows with the highest 'ventas'"),
    P("Devuelve el valor máximo de ventas", "Returns the max sales value"),
    P("Ordena todo por ventas", "Sorts everything by sales"),
    P("Cuenta las ventas > 3", "Counts sales > 3"),
  ],
  correct: 0,
  explanation: P(
    "`nlargest(n, col)` es el atajo para el 'top n': equivale a ordenar descendente y tomar `head(n)`, pero más directo. `nsmallest` da los n menores.",
    "`nlargest(n, col)` is the 'top n' shortcut: same as sorting descending and taking `head(n)`, but more direct. `nsmallest` gives the n lowest.",
  ),
};
const Q_AN_DESCRIBE = {
  question: P("¿Qué devuelve `df.describe()`?", "What does `df.describe()` return?"),
  options: [
    P("Estadísticos resumen (count, mean, std, min, cuartiles, max)", "Summary statistics (count, mean, std, min, quartiles, max)"),
    P("Los tipos de cada columna", "Each column's types"),
    P("Las primeras filas", "The first rows"),
    P("Los valores nulos", "The null values"),
  ],
  correct: 0,
  explanation: P(
    "`describe()` da de un vistazo count, media, desviación, mínimo, percentiles (25/50/75) y máximo de cada columna numérica. El primer resumen que se mira de un dataset.",
    "`describe()` gives at a glance count, mean, std, min, percentiles (25/50/75) and max of each numeric column. The first summary you look at in a dataset.",
  ),
};
const Q_AN_MERGE = {
  question: P("¿Qué hace `pd.merge(a, b, on='id')`?", "What does `pd.merge(a, b, on='id')` do?"),
  options: [
    P("Cruza (JOIN) las dos tablas emparejando por la columna 'id'", "Joins the two tables matching on the 'id' column"),
    P("Concatena las filas de a y b", "Concatenates the rows of a and b"),
    P("Suma a y b", "Sums a and b"),
    P("Compara a y b", "Compares a and b"),
  ],
  correct: 0,
  explanation: P(
    "`merge` es el JOIN de bases de datos: une columnas de dos tablas emparejando filas por una clave común. Para APILAR filas de tablas con las mismas columnas, se usa `concat`.",
    "`merge` is the database JOIN: it combines columns of two tables matching rows by a common key. To STACK rows from tables with the same columns, use `concat`.",
  ),
};
const Q_AN_HOW = {
  question: P("En un merge, ¿qué hace `how='left'`?", "In a merge, what does `how='left'` do?"),
  options: [
    P("Conserva TODAS las filas de la izquierda, aunque no casen", "Keeps ALL left rows, even unmatched ones"),
    P("Sólo las filas que casan en ambas", "Only rows matching in both"),
    P("Sólo las de la derecha", "Only the right ones"),
    P("Ordena a la izquierda", "Sorts to the left"),
  ],
  correct: 0,
  explanation: P(
    "`how` fija el tipo de join: `inner` (por defecto, sólo coincidencias), `left`/`right` (todas de un lado, NaN donde no casa) y `outer` (todas de ambos). Elegir mal cambia el resultado.",
    "`how` sets the join type: `inner` (default, matches only), `left`/`right` (all of one side, NaN where unmatched) and `outer` (all of both). Choosing wrong changes the result.",
  ),
};
const Q_AN_CONCAT = {
  question: P("¿Para qué sirve `pd.concat([df1, df2])`?", "What is `pd.concat([df1, df2])` for?"),
  options: [
    P("APILAR filas de tablas con las mismas columnas", "STACK rows of tables with the same columns"),
    P("Cruzar por una clave", "Join by a key"),
    P("Multiplicar dos tablas", "Multiply two tables"),
    P("Ordenar dos tablas", "Sort two tables"),
  ],
  correct: 0,
  explanation: P(
    "`concat` pega tablas: por defecto una debajo de otra (más filas). Con `axis=1`, una al lado de otra (más columnas). Para emparejar por clave, en cambio, es `merge`.",
    "`concat` glues tables: by default one below another (more rows). With `axis=1`, side by side (more columns). To match by a key, use `merge` instead.",
  ),
};
const Q_AN_CORR = {
  question: P("¿Qué mide `df.corr()`?", "What does `df.corr()` measure?"),
  options: [
    P("La correlación entre pares de columnas numéricas (-1 a 1)", "The correlation between pairs of numeric columns (-1 to 1)"),
    P("La suma de las columnas", "The sum of the columns"),
    P("El número de filas iguales", "The number of equal rows"),
    P("Los valores nulos", "The null values"),
  ],
  correct: 0,
  explanation: P(
    "`corr()` da una matriz de correlaciones (-1 a 1): cerca de 1, dos variables suben juntas; cerca de -1, una sube y la otra baja; cerca de 0, sin relación lineal. Cuidado: correlación no es causalidad.",
    "`corr()` gives a correlation matrix (-1 to 1): near 1, two variables rise together; near -1, one rises as the other falls; near 0, no linear relation. Careful: correlation isn't causation.",
  ),
};
const Q_AN_PIVOT = {
  question: P("¿Qué produce una `pivot_table`?", "What does a `pivot_table` produce?"),
  options: [
    P("Una tabla resumen: filas y columnas por categorías, valores agregados", "A summary table: rows and columns by categories, aggregated values"),
    P("Una copia rotada 90 grados", "A copy rotated 90 degrees"),
    P("Una lista de duplicados", "A list of duplicates"),
    P("Un gráfico", "A chart"),
  ],
  correct: 0,
  explanation: P(
    "`pivot_table(index='region', columns='mes', values='ventas', aggfunc='sum')` cruza dos categorías y agrega los valores en cada celda: el resumen tipo hoja de cálculo.",
    "`pivot_table(index='region', columns='mes', values='ventas', aggfunc='sum')` crosses two categories and aggregates the values in each cell: the spreadsheet-style summary.",
  ),
};

/** Capítulo 8 · pandas: análisis. */
export const SYL_DATA_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_AN_SORT, Q_AN_DESC, Q_AN_NLARGEST] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_AN_DESCRIBE, Q_AN_MERGE, Q_AN_HOW] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_AN_CONCAT, Q_AN_CORR, Q_AN_PIVOT] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P(
      "Lurtz cruza dos partes: el ataque base de cada guerrero y su bonificación. Únelos, calcula el poder y ordénalos del más letal al menos. Tu informe final.",
      "Lurtz cross-references two reports: each warrior's base attack and their bonus. Join them, compute the power and rank them from deadliest to least. Your final report.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("merge + columna calculada + sort", "merge + computed column + sort"),
      instructions: P(
        "Recibes `enemigos` (dicts con `nombre` y `ataque`) y `bonos` (dicts con `nombre` y `bono`). Escribe `informe(enemigos, bonos)` que:\n1. cruce ambas tablas por `nombre` (`pd.merge(..., on='nombre')`),\n2. añada `poder = ataque + bono`,\n3. ordene por `poder` DESCENDENTE,\n4. devuelva las filas con `to_dict('records')`.\n\nUsa `.reset_index(drop=True)` antes de exportar. Orden de columnas: nombre, ataque, bono, poder.",
        "You get `enemigos` (dicts with `nombre` and `ataque`) and `bonos` (dicts with `nombre` and `bono`). Write `informe(enemigos, bonos)` that:\n1. joins both tables on `nombre` (`pd.merge(..., on='nombre')`),\n2. adds `poder = ataque + bono`,\n3. sorts by `poder` DESCENDING,\n4. returns the rows with `to_dict('records')`.\n\nUse `.reset_index(drop=True)` before exporting. Column order: nombre, ataque, bono, poder.",
      ),
      starter_code: "import pandas as pd\n\ndef informe(enemigos, bonos):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def informe(enemigos, bonos):",
        "    df = pd.merge(pd.DataFrame(enemigos), pd.DataFrame(bonos), on='nombre')",
        "    df['poder'] = df['ataque'] + df['bono']",
        "    return df.sort_values('poder', ascending=False).reset_index(drop=True).to_dict('records')",
        "    return df.sort_values('poder').reset_index(drop=True).to_dict('records')",
      ],
      hints: [
        P("`df = pd.merge(pd.DataFrame(enemigos), pd.DataFrame(bonos), on='nombre')`.", "`df = pd.merge(pd.DataFrame(enemigos), pd.DataFrame(bonos), on='nombre')`."),
        P("`df['poder'] = df['ataque'] + df['bono']`, luego `sort_values('poder', ascending=False)`.", "`df['poder'] = df['ataque'] + df['bono']`, then `sort_values('poder', ascending=False)`."),
      ],
      test_cases: [
        { input: "informe([{'nombre': 'orco', 'ataque': 10}, {'nombre': 'trol', 'ataque': 40}, {'nombre': 'uruk', 'ataque': 25}], [{'nombre': 'orco', 'bono': 5}, {'nombre': 'trol', 'bono': 0}, {'nombre': 'uruk', 'bono': 10}])", expected: [{ nombre: "trol", ataque: 40, bono: 0, poder: 40 }, { nombre: "uruk", ataque: 25, bono: 10, poder: 35 }, { nombre: "orco", ataque: 10, bono: 5, poder: 15 }], description: P("Informe ordenado", "Ranked report"), raw: true },
        { input: "informe([{'nombre': 'a', 'ataque': 5}], [{'nombre': 'a', 'bono': 3}])", expected: [{ nombre: "a", ataque: 5, bono: 3, poder: 8 }], description: P("Un solo guerrero", "A single warrior"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino del Informe", "The Scroll of the Report"),
    lore_intro: P(
      "En Amon Hen, un último pergamino enseña a rematar el análisis: ordenar, describir y cruzar tablas.",
      "At Amon Hen, a last scroll teaches how to finish the analysis: sort, describe and cross tables.",
    ),
    scroll: {
      topic: P("pandas: análisis (ordenar, describir, cruzar)", "pandas: analysis (sort, describe, join)"),
      sections: [
        {
          heading: P("Ordenar y top", "Sort and top"),
          body: P(
            "`sort_values('col', ascending=False)` ordena; `nlargest(n, 'col')` da el top n directo. Encadena filtrado, orden y selección.",
            "`sort_values('col', ascending=False)` sorts; `nlargest(n, 'col')` gives the top n directly. Chain filter, sort and selection.",
          ),
          code: "df.sort_values('ventas', ascending=False)\ndf.nlargest(3, 'ventas')",
        },
        {
          heading: P("Describir", "Describe"),
          body: P(
            "`df.describe()` resume count, media, desviación, mínimo, cuartiles y máximo. `df.corr()` mide correlaciones entre columnas numéricas.",
            "`df.describe()` summarizes count, mean, std, min, quartiles and max. `df.corr()` measures correlations between numeric columns.",
          ),
          code: "df.describe()\ndf.corr()",
        },
        {
          heading: P("Cruzar tablas", "Joining tables"),
          body: P(
            "`pd.merge(a, b, on='id')` une columnas por clave (con `how='left'/'inner'…`). `pd.concat([a, b])` apila filas. `pivot_table` resume por dos categorías.",
            "`pd.merge(a, b, on='id')` joins columns by key (with `how='left'/'inner'…`). `pd.concat([a, b])` stacks rows. `pivot_table` summarizes by two categories.",
          ),
          code: "pd.merge(ventas, clientes, on='id')\npd.concat([enero, febrero])",
        },
      ],
      keyTakeaway: P(
        "sort_values/nlargest ordenan y sacan el top; describe() y corr() resumen; merge cruza por clave (how=inner/left), concat apila filas, pivot_table resume por categorías.",
        "sort_values/nlargest sort and take the top; describe() and corr() summarize; merge joins by key (how=inner/left), concat stacks rows, pivot_table summarizes by categories.",
      ),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación del Poder", "The Temptation of Power"),
    lore_intro: P(
      "Boromir sólo mira a los más fuertes. Devuelve los nombres de los `n` de mayor ataque.",
      "Boromir looks only at the strongest. Return the names of the top `n` by attack.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("Ordenar y tomar el top n", "Sort and take the top n"),
      instructions: P(
        "Recibes `registros` (dicts con `nombre` y una columna `col`) y un número `n`. Escribe `top_n(registros, col, n)` que devuelva la LISTA de nombres de las `n` filas con mayor `col`, de mayor a menor.\n\nUsa `df.sort_values(col, ascending=False).head(n)['nombre'].tolist()`.",
        "You get `registros` (dicts with `nombre` and a column `col`) and a number `n`. Write `top_n(registros, col, n)` returning the LIST of names of the `n` rows with the highest `col`, from highest to lowest.\n\nUse `df.sort_values(col, ascending=False).head(n)['nombre'].tolist()`.",
      ),
      starter_code: "import pandas as pd\n\ndef top_n(registros, col, n):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def top_n(registros, col, n):",
        "    df = pd.DataFrame(registros)",
        "    return df.sort_values(col, ascending=False).head(n)['nombre'].tolist()",
        "    return df.sort_values(col).head(n)['nombre'].tolist()",
        "    return df['nombre'].head(n).tolist()",
      ],
      hints: [
        P("`ascending=False` pone los mayores primero.", "`ascending=False` puts the highest first."),
        P("`.head(n)` toma los primeros n; luego `['nombre'].tolist()`.", "`.head(n)` takes the first n; then `['nombre'].tolist()`."),
      ],
      test_cases: [
        { input: "top_n([{'nombre': 'orco', 'ataque': 10}, {'nombre': 'trol', 'ataque': 40}, {'nombre': 'uruk', 'ataque': 25}], 'ataque', 2)", expected: ["trol", "uruk"], description: P("Los dos más fuertes", "The two strongest"), raw: true },
        { input: "top_n([{'nombre': 'a', 'ataque': 1}], 'ataque', 5)", expected: ["a"], description: P("Menos de n: todos", "Fewer than n: all"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Orden de la Visión", "The Order of the Seeing"),
    lore_intro: P(
      "Desde Amon Hen todo se ordena de menor a mayor. Devuelve los nombres ordenados por su valor.",
      "From Amon Hen everything is ordered from least to greatest. Return the names sorted by their value.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("sort_values ascendente", "sort_values ascending"),
      instructions: P(
        "Recibes `registros` (dicts con `nombre` y una columna `col`). Escribe `ordenar(registros, col)` que devuelva la LISTA de nombres ordenados por `col` de MENOR a MAYOR.\n\nUsa `df.sort_values(col)['nombre'].tolist()`.\n\nEjemplo: ataques orco 10, trol 40, uruk 25 → `['orco', 'uruk', 'trol']`.",
        "You get `registros` (dicts with `nombre` and a column `col`). Write `ordenar(registros, col)` returning the LIST of names sorted by `col` from LOWEST to HIGHEST.\n\nUse `df.sort_values(col)['nombre'].tolist()`.\n\nExample: attacks orco 10, trol 40, uruk 25 → `['orco', 'uruk', 'trol']`.",
      ),
      starter_code: "import pandas as pd\n\ndef ordenar(registros, col):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def ordenar(registros, col):",
        "    df = pd.DataFrame(registros)",
        "    return df.sort_values(col)['nombre'].tolist()",
        "    return df.sort_values(col, ascending=False)['nombre'].tolist()",
        "    return df['nombre'].tolist()",
      ],
      hints: [
        P("`sort_values(col)` ordena ascendente por defecto.", "`sort_values(col)` sorts ascending by default."),
        P("Luego `['nombre'].tolist()`.", "Then `['nombre'].tolist()`."),
      ],
      test_cases: [
        { input: "ordenar([{'nombre': 'orco', 'ataque': 10}, {'nombre': 'trol', 'ataque': 40}, {'nombre': 'uruk', 'ataque': 25}], 'ataque')", expected: ["orco", "uruk", "trol"], description: P("De menor a mayor", "Lowest to highest"), raw: true },
        { input: "ordenar([{'nombre': 'x', 'ataque': 5}], 'ataque')", expected: ["x"], description: P("Uno solo", "Just one"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste Unida", "The United Host"),
    lore_intro: P(
      "Isengard cruza dos registros de su hueste en uno solo, emparejando por nombre.",
      "Isengard merges two rolls of its host into one, matching by name.",
    ),
    challenge: {
      packages: ["pandas"],
      topic: P("merge (JOIN por clave)", "merge (JOIN by key)"),
      instructions: P(
        "Recibes `a` y `b`, dos listas de dicts, y `clave` (nombre de columna común). Escribe `unir(a, b, clave)` que las CRUCE por `clave` y devuelva las filas resultantes como lista de dicts.\n\nUsa `pd.merge(pd.DataFrame(a), pd.DataFrame(b), on=clave).to_dict('records')`.",
        "You get `a` and `b`, two lists of dicts, and `clave` (a shared column name). Write `unir(a, b, clave)` that JOINS them by `clave` and returns the resulting rows as a list of dicts.\n\nUse `pd.merge(pd.DataFrame(a), pd.DataFrame(b), on=clave).to_dict('records')`.",
      ),
      starter_code: "import pandas as pd\n\ndef unir(a, b, clave):\n    pass\n",
      blocks: [
        "import pandas as pd",
        "def unir(a, b, clave):",
        "    return pd.merge(pd.DataFrame(a), pd.DataFrame(b), on=clave).to_dict('records')",
        "    return pd.concat([pd.DataFrame(a), pd.DataFrame(b)]).to_dict('records')",
        "    return (a + b)",
      ],
      hints: [
        P("`pd.merge(df_a, df_b, on=clave)` empareja por la columna común.", "`pd.merge(df_a, df_b, on=clave)` matches by the shared column."),
        P("`.to_dict('records')` exporta las filas.", "`.to_dict('records')` exports the rows."),
      ],
      test_cases: [
        { input: "unir([{'nombre': 'orco', 'ataque': 10}], [{'nombre': 'orco', 'bono': 5}], 'nombre')", expected: [{ nombre: "orco", ataque: 10, bono: 5 }], description: P("Cruce por nombre", "Join by name"), raw: true },
        { input: "unir([{'id': 1, 'a': 7}, {'id': 2, 'a': 8}], [{'id': 1, 'b': 3}, {'id': 2, 'b': 4}], 'id')", expected: [{ id: 1, a: 7, b: 3 }, { id: 2, a: 8, b: 4 }], description: P("Cruce por id", "Join by id"), raw: true },
      ],
    },
  },
};
