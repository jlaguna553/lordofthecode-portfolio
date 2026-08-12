import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de SQL sobre la narrativa compartida de la Comunidad. Los retos se
 * ejecutan con SQLite compilado a WASM (sql.js): el `support_code` crea la BD y
 * la siembra; el jugador escribe una consulta `SELECT` y el evaluador compara el
 * conjunto de filas con el esperado.
 */

const P = (es: string, en: string) => ({ es, en });

/** Esquema + datos sembrados (support_code) para casi todos los retos. */
const BASE =
  "CREATE TABLE personajes (id INTEGER, nombre TEXT, raza TEXT, poder INTEGER, reino TEXT);\n" +
  "INSERT INTO personajes VALUES\n" +
  " (1,'Frodo','hobbit',20,'Comarca'),\n" +
  " (2,'Aragorn','humano',80,'Gondor'),\n" +
  " (3,'Legolas','elfo',75,'Bosque'),\n" +
  " (4,'Gimli','enano',70,'Erebor'),\n" +
  " (5,'Gandalf','maia',95,'Valinor'),\n" +
  " (6,'Sam','hobbit',30,'Comarca'),\n" +
  " (7,'Boromir','humano',65,'Gondor'),\n" +
  " (8,'Galadriel','elfo',90,'Lorien');";

/** BASE + una segunda tabla `reinos` para los retos de JOIN. */
const BASE2 =
  BASE +
  "\nCREATE TABLE reinos (nombre TEXT, region TEXT);\n" +
  "INSERT INTO reinos VALUES\n" +
  " ('Comarca','Norte'),('Gondor','Sur'),('Bosque','Norte'),\n" +
  " ('Erebor','Este'),('Valinor','Oeste'),('Lorien','Norte');";

const SCHEMA_ES =
  "Tabla `personajes(nombre, raza, poder, reino)`:\n" +
  "Frodo (hobbit, 20, Comarca) · Aragorn (humano, 80, Gondor) · Legolas (elfo, 75, Bosque) · Gimli (enano, 70, Erebor) · Gandalf (maia, 95, Valinor) · Sam (hobbit, 30, Comarca) · Boromir (humano, 65, Gondor) · Galadriel (elfo, 90, Lorien).";
const SCHEMA_EN =
  "Table `personajes(nombre, raza, poder, reino)`:\n" +
  "Frodo (hobbit, 20, Comarca) · Aragorn (humano, 80, Gondor) · Legolas (elfo, 75, Bosque) · Gimli (enano, 70, Erebor) · Gandalf (maia, 95, Valinor) · Sam (hobbit, 30, Comarca) · Boromir (humano, 65, Gondor) · Galadriel (elfo, 90, Lorien).";
const REINOS_ES =
  "\n\nTabla `reinos(nombre, region)`: Comarca→Norte, Gondor→Sur, Bosque→Norte, Erebor→Este, Valinor→Oeste, Lorien→Norte.";
const REINOS_EN =
  "\n\nTable `reinos(nombre, region)`: Comarca→Norte, Gondor→Sur, Bosque→Norte, Erebor→Este, Valinor→Oeste, Lorien→Norte.";

/** Instrucciones + recordatorio del esquema. */
const ins = (es: string, en: string) =>
  P(es + "\n\n" + SCHEMA_ES, en + "\n\n" + SCHEMA_EN);
const insJ = (es: string, en: string) =>
  P(es + "\n\n" + SCHEMA_ES + REINOS_ES, en + "\n\n" + SCHEMA_EN + REINOS_EN);

const START = "SELECT *\nFROM personajes;\n";

/* ===================================================================== *
 * Capítulo 1 · SELECT: elegir columnas
 * ===================================================================== */
const Q_SEL = { question: P("¿Qué hace `SELECT nombre FROM personajes`?", "What does `SELECT nombre FROM personajes` do?"),
  options: [P("Devuelve la columna `nombre` de todas las filas", "Returns the `nombre` column of every row"), P("Crea una columna", "Creates a column"), P("Borra la tabla", "Deletes the table"), P("Cuenta las filas", "Counts the rows")],
  correct: 0, explanation: P("`SELECT columnas FROM tabla` LEE datos: elige qué columnas devolver de qué tabla. Es la consulta fundamental de SQL.", "`SELECT columns FROM table` READS data: it picks which columns to return from which table. It's SQL's fundamental query.") };
const Q_STAR = { question: P("¿Qué devuelve `SELECT * FROM personajes`?", "What does `SELECT * FROM personajes` return?"),
  options: [P("TODAS las columnas de todas las filas", "ALL columns of every row"), P("Sólo la primera columna", "Only the first column"), P("El número de filas", "The row count"), P("Un error", "An error")],
  correct: 0, explanation: P("El asterisco `*` significa 'todas las columnas'. Útil para explorar, pero en producción se listan las columnas necesarias para no traer de más.", "The asterisk `*` means 'all columns'. Handy to explore, but in production you list the needed columns to avoid over-fetching.") };
const Q_COLS = { question: P("¿Cómo pides VARIAS columnas concretas?", "How do you ask for SEVERAL specific columns?"),
  options: [P("SELECT nombre, poder FROM personajes", "SELECT nombre, poder FROM personajes"), P("SELECT nombre AND poder", "SELECT nombre AND poder"), P("SELECT nombre + poder", "SELECT nombre + poder"), P("SELECT [nombre poder]", "SELECT [nombre poder]")],
  correct: 0, explanation: P("Separas las columnas con COMAS: `SELECT nombre, poder`. El orden en que las escribes es el orden en que salen.", "You separate columns with COMMAS: `SELECT nombre, poder`. The order you write them is the order they come out.") };
const Q_DISTINCT = { question: P("¿Qué hace `SELECT DISTINCT raza FROM personajes`?", "What does `SELECT DISTINCT raza FROM personajes` do?"),
  options: [P("Devuelve cada raza UNA sola vez (sin repetir)", "Returns each race ONCE (no repeats)"), P("Ordena las razas", "Sorts the races"), P("Cuenta las razas", "Counts the races"), P("Borra duplicados de la tabla", "Deletes duplicates from the table")],
  correct: 0, explanation: P("`DISTINCT` elimina las filas repetidas del resultado. `SELECT DISTINCT raza` da la lista de razas únicas, sin tocar la tabla.", "`DISTINCT` removes repeated rows from the result. `SELECT DISTINCT raza` gives the list of unique races, without touching the table.") };
const Q_CASE_INS = { question: P("¿SQL distingue mayúsculas en palabras clave como `select`?", "Does SQL care about case in keywords like `select`?"),
  options: [P("No: `select` y `SELECT` son iguales (se suele escribir en MAYÚSCULAS)", "No: `select` and `SELECT` are the same (usually written in UPPERCASE)"), P("Sí, deben ir en minúscula", "Yes, they must be lowercase"), P("Sí, deben ir en mayúscula", "Yes, they must be uppercase"), P("Sólo en tablas", "Only in tables")],
  correct: 0, explanation: P("Las palabras clave de SQL no distinguen mayúsculas, pero por convención se escriben en MAYÚSCULAS para separarlas de nombres de tablas y columnas.", "SQL keywords are case-insensitive, but by convention they're written in UPPERCASE to stand apart from table and column names.") };
const Q_SEMICOLON = { question: P("¿Para qué sirve el `;` al final de una consulta?", "What is the `;` at the end of a query for?"),
  options: [P("Marca el FIN de la sentencia", "Marks the END of the statement"), P("Es obligatorio en el SELECT", "It's required in the SELECT"), P("Ordena el resultado", "Sorts the result"), P("Comenta la línea", "Comments the line")],
  correct: 0, explanation: P("El punto y coma separa sentencias. Con una sola consulta suele ser opcional, pero es buena costumbre cerrarla con `;`.", "The semicolon separates statements. With a single query it's often optional, but it's good practice to close it with `;`.") };
const Q_ORDER_COLS = { question: P("¿Importa el ORDEN en que pones las columnas del SELECT?", "Does the ORDER of the SELECT columns matter?"),
  options: [P("Sí: salen en ese mismo orden", "Yes: they come out in that same order"), P("No, siempre alfabético", "No, always alphabetical"), P("No, orden aleatorio", "No, random order"), P("Sólo con *", "Only with *")],
  correct: 0, explanation: P("El resultado respeta el orden en que listas las columnas: `SELECT poder, nombre` las devuelve al revés que `SELECT nombre, poder`.", "The result respects the order you list the columns: `SELECT poder, nombre` returns them the opposite way to `SELECT nombre, poder`.") };
const Q_TABLE = { question: P("En `SELECT nombre FROM personajes`, ¿qué es `personajes`?", "In `SELECT nombre FROM personajes`, what is `personajes`?"),
  options: [P("La TABLA de la que se leen los datos", "The TABLE the data is read from"), P("Una columna", "A column"), P("Un valor", "A value"), P("Una función", "A function")],
  correct: 0, explanation: P("`FROM tabla` indica de dónde salen los datos. Una tabla es una rejilla de filas (registros) y columnas (campos).", "`FROM table` says where the data comes from. A table is a grid of rows (records) and columns (fields).") };
const Q_ROWS_COLS = { question: P("En una tabla, ¿qué es una FILA?", "In a table, what is a ROW?"),
  options: [P("Un registro: un personaje completo con todos sus campos", "A record: one whole character with all its fields"), P("Una columna", "A column"), P("El nombre de la tabla", "The table's name"), P("Una consulta", "A query")],
  correct: 0, explanation: P("Cada FILA es un registro (un personaje); cada COLUMNA es un campo (nombre, raza, poder…). SQL opera sobre conjuntos de filas.", "Each ROW is a record (a character); each COLUMN is a field (nombre, raza, poder…). SQL operates on sets of rows.") };

export const SYL_SQL_1: Syllabus = {
  c1_espia: { kind: "battle", questions: [Q_SEL, Q_STAR, Q_COLS] },
  c1_jinete_rastreador: { kind: "battle", questions: [Q_DISTINCT, Q_TABLE, Q_ROWS_COLS] },
  c1_perro_negro: { kind: "battle", questions: [Q_ORDER_COLS, Q_CASE_INS, Q_SEMICOLON] },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Jinete Negro", "The Black Rider"),
    lore_intro: P("El Nazgûl busca por RAZA. Dale la lista de razas distintas que habitan la tierra, sin repetir ninguna.", "The Nazgûl hunts by RACE. Give it the list of distinct races in the land, with none repeated."),
    challenge: {
      support_code: BASE,
      topic: P("SELECT DISTINCT", "SELECT DISTINCT"),
      instructions: ins("Escribe una consulta que devuelva la columna `raza` SIN repeticiones (usa `DISTINCT`).", "Write a query returning the `raza` column with NO repeats (use `DISTINCT`)."),
      starter_code: START,
      blocks: ["SELECT DISTINCT raza", "FROM personajes;", "SELECT raza"],
      hints: [P("`SELECT DISTINCT raza` quita las razas repetidas.", "`SELECT DISTINCT raza` removes repeated races."), P("No olvides `FROM personajes`.", "Don't forget `FROM personajes`.")],
      test_cases: [{ input: "razas únicas", expected: [["hobbit"],["humano"],["elfo"],["enano"],["maia"]], description: P("Cada raza una vez", "Each race once") }],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: P("El Pergamino de la Consulta", "The Scroll of the Query"),
    lore_intro: P("Un pergamino enseña a interrogar las tablas: SELECT.", "A scroll teaches how to question the tables: SELECT."),
    scroll: {
      topic: P("SQL: SELECT y columnas", "SQL: SELECT and columns"),
      sections: [
        { heading: P("Leer datos", "Reading data"), body: P("`SELECT columnas FROM tabla` devuelve filas. `SELECT *` trae todas las columnas; listar columnas concretas es lo habitual.", "`SELECT columns FROM table` returns rows. `SELECT *` brings all columns; listing specific columns is the norm."), code: "SELECT nombre, poder\nFROM personajes;" },
        { heading: P("Valores únicos", "Unique values"), body: P("`SELECT DISTINCT columna` elimina duplicados del resultado. Útil para ver qué categorías hay.", "`SELECT DISTINCT column` removes duplicates from the result. Handy to see which categories exist."), code: "SELECT DISTINCT raza\nFROM personajes;" },
        { heading: P("Convenciones", "Conventions"), body: P("Las palabras clave (SELECT, FROM) no distinguen mayúsculas, pero se escriben en MAYÚSCULAS. La sentencia se cierra con `;`.", "Keywords (SELECT, FROM) are case-insensitive, but written in UPPERCASE. The statement ends with `;`."), code: "SELECT *\nFROM personajes;" },
      ],
      keyTakeaway: P("SELECT columnas FROM tabla lee filas; * son todas las columnas; DISTINCT quita duplicados. Palabras clave en MAYÚSCULAS, sentencia con ;.", "SELECT columns FROM table reads rows; * is all columns; DISTINCT removes duplicates. Keywords in UPPERCASE, statement ends with ;."),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("El Sendero de la Comarca", "The Shire's Path"),
    lore_intro: P("Antes de partir, pasa lista: devuelve el nombre de cada personaje.", "Before setting out, take the roll: return each character's name."),
    challenge: {
      support_code: BASE,
      topic: P("Elegir una columna", "Selecting one column"),
      instructions: ins("Escribe una consulta que devuelva SÓLO la columna `nombre` de todos los personajes.", "Write a query returning ONLY the `nombre` column of every character."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes;", "SELECT raza"],
      hints: [P("`SELECT nombre FROM personajes;`.", "`SELECT nombre FROM personajes;`.")],
      test_cases: [{ input: "nombres", expected: [["Frodo"],["Aragorn"],["Legolas"],["Gimli"],["Gandalf"],["Sam"],["Boromir"],["Galadriel"]], description: P("Todos los nombres", "All names") }],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P("Mide el poder de cada uno junto a su nombre: dos columnas.", "Measure each one's power beside their name: two columns."),
    challenge: {
      support_code: BASE,
      topic: P("Varias columnas", "Several columns"),
      instructions: ins("Escribe una consulta que devuelva las columnas `nombre` y `poder` de todos los personajes, en ese orden.", "Write a query returning the `nombre` and `poder` columns of every character, in that order."),
      starter_code: START,
      blocks: ["SELECT nombre, poder", "FROM personajes;", "SELECT nombre AND poder"],
      hints: [P("Separa las columnas con una coma: `nombre, poder`.", "Separate columns with a comma: `nombre, poder`.")],
      test_cases: [{ input: "nombre y poder", expected: [["Frodo",20],["Aragorn",80],["Legolas",75],["Gimli",70],["Gandalf",95],["Sam",30],["Boromir",65],["Galadriel",90]], description: P("Nombre y poder", "Name and power") }],
    },
  },
};

/* ===================================================================== *
 * Capítulo 2 · WHERE: filtrar filas
 * ===================================================================== */
const Q_WHERE = { question: P("¿Para qué sirve `WHERE`?", "What is `WHERE` for?"),
  options: [P("Filtrar: quedarse sólo con las filas que cumplen una condición", "Filtering: keeping only the rows that meet a condition"), P("Ordenar", "Sorting"), P("Elegir columnas", "Picking columns"), P("Contar filas", "Counting rows")],
  correct: 0, explanation: P("`WHERE condición` deja pasar sólo las filas que la cumplen. Es el filtro de SQL: `WHERE poder > 50` se queda con los fuertes.", "`WHERE condition` lets through only the rows that satisfy it. It's SQL's filter: `WHERE poder > 50` keeps the strong ones.") };
const Q_WHERE_TEXT = { question: P("¿Cómo filtras por un texto exacto, p. ej. raza 'hobbit'?", "How do you filter by an exact text, e.g. race 'hobbit'?"),
  options: [P("WHERE raza = 'hobbit'", "WHERE raza = 'hobbit'"), P("WHERE raza == 'hobbit'", "WHERE raza == 'hobbit'"), P("WHERE raza = hobbit", "WHERE raza = hobbit"), P("WHERE raza LIKE hobbit", "WHERE raza LIKE hobbit")],
  correct: 0, explanation: P("Se compara con UN igual (`=`) y el texto va entre COMILLAS SIMPLES: `WHERE raza = 'hobbit'`. Sin comillas, SQL creería que `hobbit` es una columna.", "You compare with a SINGLE equals (`=`) and the text goes in SINGLE QUOTES: `WHERE raza = 'hobbit'`. Without quotes, SQL would think `hobbit` is a column.") };
const Q_WHERE_NUM = { question: P("¿Cómo te quedas con los personajes de `poder` mayor que 70?", "How do you keep characters with `poder` greater than 70?"),
  options: [P("WHERE poder > 70", "WHERE poder > 70"), P("WHERE poder => 70", "WHERE poder => 70"), P("WHERE poder > '70'", "WHERE poder > '70'"), P("IF poder > 70", "IF poder > 70")],
  correct: 0, explanation: P("Los números NO llevan comillas: `WHERE poder > 70`. Operadores: `>`, `<`, `>=`, `<=`, `=`, `<>` (distinto).", "Numbers take NO quotes: `WHERE poder > 70`. Operators: `>`, `<`, `>=`, `<=`, `=`, `<>` (not equal).") };
const Q_AND = { question: P("¿Cómo exiges DOS condiciones a la vez?", "How do you require TWO conditions at once?"),
  options: [P("WHERE raza = 'elfo' AND poder > 80", "WHERE raza = 'elfo' AND poder > 80"), P("WHERE raza = 'elfo' & poder > 80", "WHERE raza = 'elfo' & poder > 80"), P("WHERE raza = 'elfo', poder > 80", "WHERE raza = 'elfo', poder > 80"), P("WHERE raza = 'elfo' + poder > 80", "WHERE raza = 'elfo' + poder > 80")],
  correct: 0, explanation: P("`AND` exige que se cumplan ambas; `OR` con que se cumpla una. Se combinan con paréntesis para agrupar condiciones.", "`AND` requires both; `OR` just one. Combine them with parentheses to group conditions.") };
const Q_OR = { question: P("¿Qué devuelve `WHERE raza = 'elfo' OR raza = 'enano'`?", "What does `WHERE raza = 'elfo' OR raza = 'enano'` return?"),
  options: [P("Las filas que son elfo O enano", "The rows that are elf OR dwarf"), P("Sólo las que son ambas", "Only those that are both"), P("Ninguna", "None"), P("Todas", "All")],
  correct: 0, explanation: P("`OR` deja pasar si SE CUMPLE AL MENOS UNA condición. Para varias opciones de un mismo campo, `IN` es más limpio.", "`OR` lets through if AT LEAST ONE condition holds. For several options of the same field, `IN` is cleaner.") };
const Q_IN = { question: P("¿Qué hace `WHERE reino IN ('Gondor', 'Comarca')`?", "What does `WHERE reino IN ('Gondor', 'Comarca')` do?"),
  options: [P("Deja las filas cuyo reino es Gondor o Comarca", "Keeps rows whose reino is Gondor or Comarca"), P("Comprueba si existe el reino", "Checks if the reino exists"), P("Cuenta los reinos", "Counts the reinos"), P("Une dos tablas", "Joins two tables")],
  correct: 0, explanation: P("`IN (lista)` es un atajo de varios `OR`: la fila pasa si el valor está en la lista. Muy legible para filtrar por varias categorías.", "`IN (list)` is shorthand for several `OR`s: the row passes if the value is in the list. Very readable to filter by several categories.") };
const Q_BETWEEN = { question: P("¿Qué selecciona `WHERE poder BETWEEN 70 AND 90`?", "What does `WHERE poder BETWEEN 70 AND 90` select?"),
  options: [P("Los de poder entre 70 y 90, ambos incluidos", "Those with power between 70 and 90, both included"), P("Sólo 70 y 90", "Only 70 and 90"), P("Los menores de 70", "Those below 70"), P("Los mayores de 90", "Those above 90")],
  correct: 0, explanation: P("`BETWEEN a AND b` es un atajo de `>= a AND <= b`, con los extremos INCLUIDOS. Legible para rangos.", "`BETWEEN a AND b` is shorthand for `>= a AND <= b`, endpoints INCLUDED. Readable for ranges.") };
const Q_LIKE = { question: P("¿Qué hace `WHERE nombre LIKE 'G%'`?", "What does `WHERE nombre LIKE 'G%'` do?"),
  options: [P("Filas cuyo nombre EMPIEZA por G (`%` = cualquier resto)", "Rows whose name STARTS with G (`%` = any rest)"), P("Nombres iguales a 'G%'", "Names equal to 'G%'"), P("Nombres que contienen G en cualquier sitio sólo con G%", "Names containing G anywhere with just G%"), P("Da error", "Errors")],
  correct: 0, explanation: P("`LIKE` compara patrones: `%` es 'cualquier secuencia' y `_` 'un carácter'. `'G%'` = empieza por G; `'%o'` = acaba en o; `'%a%'` = contiene a.", "`LIKE` matches patterns: `%` is 'any sequence' and `_` 'one character'. `'G%'` = starts with G; `'%o'` = ends in o; `'%a%'` = contains a.") };
const Q_NOT = { question: P("¿Cómo NIEGAS una condición en WHERE?", "How do you NEGATE a condition in WHERE?"),
  options: [P("Con NOT o `<>`: `WHERE raza <> 'hobbit'`", "With NOT or `<>`: `WHERE raza <> 'hobbit'`"), P("Con `!raza`", "With `!raza`"), P("Con `-raza`", "With `-raza`"), P("No se puede negar", "You can't negate")],
  correct: 0, explanation: P("`<>` (o `!=`) es 'distinto de'; `NOT` niega una condición entera (`NOT (poder > 80)`). `NOT IN` y `NOT LIKE` también existen.", "`<>` (or `!=`) is 'not equal'; `NOT` negates a whole condition (`NOT (poder > 80)`). `NOT IN` and `NOT LIKE` also exist.") };

export const SYL_SQL_2: Syllabus = {
  c2_raiz: { kind: "battle", questions: [Q_WHERE, Q_WHERE_TEXT, Q_WHERE_NUM] },
  c2_niebla: { kind: "battle", questions: [Q_AND, Q_OR, Q_NOT] },
  c2_sauce: { kind: "battle", questions: [Q_IN, Q_BETWEEN, Q_LIKE] },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Rey de los Túmulos", "The Barrow-king"),
    lore_intro: P("El Tumulario sólo teme a los de poder medio-alto. Dame los nombres de poder entre 70 y 90.", "The Barrow-wight only fears the mid-high powers. Give me the names with power between 70 and 90."),
    challenge: {
      support_code: BASE,
      topic: P("WHERE ... BETWEEN", "WHERE ... BETWEEN"),
      instructions: ins("Devuelve el `nombre` de los personajes cuyo `poder` esté ENTRE 70 y 90 (ambos incluidos). Usa `BETWEEN`.", "Return the `nombre` of characters whose `poder` is BETWEEN 70 and 90 (both included). Use `BETWEEN`."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE poder BETWEEN 70 AND 90;", "WHERE poder BETWEEN 90 AND 70;"],
      hints: [P("`WHERE poder BETWEEN 70 AND 90`.", "`WHERE poder BETWEEN 70 AND 90`.")],
      test_cases: [{ input: "poder 70-90", expected: [["Aragorn"],["Legolas"],["Gimli"],["Galadriel"]], description: P("Poder medio-alto", "Mid-high power") }],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: P("El Pergamino del Filtro", "The Scroll of the Filter"),
    lore_intro: P("Un pergamino enseña a quedarse sólo con las filas que importan: WHERE.", "A scroll teaches how to keep only the rows that matter: WHERE."),
    scroll: {
      topic: P("SQL: filtrar con WHERE", "SQL: filtering with WHERE"),
      sections: [
        { heading: P("WHERE", "WHERE"), body: P("`WHERE condición` filtra filas. Texto entre comillas simples (`= 'hobbit'`), números sin comillas (`> 70`).", "`WHERE condition` filters rows. Text in single quotes (`= 'hobbit'`), numbers without quotes (`> 70`)."), code: "SELECT nombre\nFROM personajes\nWHERE poder > 70;" },
        { heading: P("Combinar condiciones", "Combining conditions"), body: P("`AND` exige ambas, `OR` una. `IN (...)` para varias opciones, `BETWEEN a AND b` para rangos, `<>` para distinto.", "`AND` requires both, `OR` one. `IN (...)` for several options, `BETWEEN a AND b` for ranges, `<>` for not-equal."), code: "WHERE raza IN ('elfo', 'enano')\nWHERE poder BETWEEN 70 AND 90" },
        { heading: P("Patrones de texto", "Text patterns"), body: P("`LIKE` con `%` (cualquier resto) busca patrones: `'G%'` empieza por G, `'%a%'` contiene a.", "`LIKE` with `%` (any rest) matches patterns: `'G%'` starts with G, `'%a%'` contains a."), code: "WHERE nombre LIKE 'G%';" },
      ],
      keyTakeaway: P("WHERE filtra filas; texto en comillas simples, números sin ellas. Combina con AND/OR; IN para listas, BETWEEN para rangos, LIKE para patrones, <> para distinto.", "WHERE filters rows; text in single quotes, numbers without. Combine with AND/OR; IN for lists, BETWEEN for ranges, LIKE for patterns, <> for not-equal."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("Las Raíces del Sauce", "The Willow's Roots"),
    lore_intro: P("El sauce sólo atrapa hobbits. Dame los nombres de raza 'hobbit'.", "The willow only snares hobbits. Give me the names of race 'hobbit'."),
    challenge: {
      support_code: BASE,
      topic: P("WHERE con texto", "WHERE with text"),
      instructions: ins("Devuelve el `nombre` de los personajes cuya `raza` sea exactamente `'hobbit'`.", "Return the `nombre` of characters whose `raza` is exactly `'hobbit'`."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE raza = 'hobbit';", "WHERE raza = 'elfo';"],
      hints: [P("Texto entre comillas simples: `= 'hobbit'`.", "Text in single quotes: `= 'hobbit'`.")],
      test_cases: [{ input: "hobbits", expected: [["Frodo"],["Sam"]], description: P("Los hobbits", "The hobbits") }],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Frío del Túmulo", "The Barrow's Cold"),
    lore_intro: P("Sólo los muy poderosos resisten el frío. Nombre y poder de los de poder mayor que 70.", "Only the very powerful resist the cold. Name and power of those with power over 70."),
    challenge: {
      support_code: BASE,
      topic: P("WHERE con número", "WHERE with a number"),
      instructions: ins("Devuelve `nombre` y `poder` de los personajes cuyo `poder` sea ESTRICTAMENTE MAYOR que 70.", "Return `nombre` and `poder` of characters whose `poder` is STRICTLY GREATER than 70."),
      starter_code: START,
      blocks: ["SELECT nombre, poder", "FROM personajes", "WHERE poder > 70;", "WHERE poder < 70;"],
      hints: [P("Números sin comillas: `WHERE poder > 70`.", "Numbers without quotes: `WHERE poder > 70`.")],
      test_cases: [{ input: "poder > 70", expected: [["Aragorn",80],["Legolas",75],["Gandalf",95],["Galadriel",90]], description: P("Los más fuertes", "The strongest") }],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Bombadil", "Bombadil's Song"),
    lore_intro: P("Tom canta para los de Gondor. Dame los nombres cuyo reino sea 'Gondor'.", "Tom sings for those of Gondor. Give me the names whose reino is 'Gondor'."),
    challenge: {
      support_code: BASE,
      topic: P("WHERE con texto", "WHERE with text"),
      instructions: ins("Devuelve el `nombre` de los personajes cuyo `reino` sea `'Gondor'`.", "Return the `nombre` of characters whose `reino` is `'Gondor'`."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE reino = 'Gondor';", "WHERE reino = Gondor;"],
      hints: [P("Comillas simples alrededor de Gondor.", "Single quotes around Gondor.")],
      test_cases: [{ input: "de Gondor", expected: [["Aragorn"],["Boromir"]], description: P("Los de Gondor", "Those of Gondor") }],
    },
  },
};


/* ===================================================================== *
 * Capítulo 3 · ORDER BY y LIMIT
 * ===================================================================== */
const Q_ORDER = { question: P("¿Qué hace `ORDER BY poder`?", "What does `ORDER BY poder` do?"),
  options: [P("Ordena las filas por la columna `poder` (ascendente)", "Sorts the rows by the `poder` column (ascending)"), P("Filtra por poder", "Filters by power"), P("Suma los poderes", "Sums the powers"), P("Elige la columna poder", "Picks the poder column")],
  correct: 0, explanation: P("`ORDER BY columna` ordena el resultado. Por defecto ascendente (menor a mayor). Es lo último que se aplica, sobre las filas ya filtradas.", "`ORDER BY column` sorts the result. Ascending by default (low to high). It's applied last, over the already-filtered rows.") };
const Q_DESC = { question: P("¿Cómo ordenas de MAYOR a menor?", "How do you sort from HIGHEST to lowest?"),
  options: [P("ORDER BY poder DESC", "ORDER BY poder DESC"), P("ORDER BY poder DOWN", "ORDER BY poder DOWN"), P("ORDER BY -poder", "ORDER BY -poder"), P("ORDER BY poder REVERSE", "ORDER BY poder REVERSE")],
  correct: 0, explanation: P("`DESC` invierte el orden (mayor a menor); `ASC` es el ascendente por defecto. `ORDER BY poder DESC` pone al más fuerte primero.", "`DESC` reverses the order (high to low); `ASC` is the default ascending. `ORDER BY poder DESC` puts the strongest first.") };
const Q_ORDER_MULTI = { question: P("¿Qué hace `ORDER BY raza, poder DESC`?", "What does `ORDER BY raza, poder DESC` do?"),
  options: [P("Ordena por raza y, dentro de cada raza, por poder descendente", "Sorts by race and, within each race, by descending power"), P("Ordena sólo por raza", "Sorts only by race"), P("Da error", "Errors"), P("Ordena por la suma", "Sorts by the sum")],
  correct: 0, explanation: P("Con varias columnas, ordena por la primera y usa la segunda para DESEMPATAR. Cada columna puede tener su ASC/DESC.", "With several columns, it sorts by the first and uses the second to BREAK TIES. Each column can have its own ASC/DESC.") };
const Q_LIMIT = { question: P("¿Qué hace `LIMIT 3`?", "What does `LIMIT 3` do?"),
  options: [P("Devuelve como mucho 3 filas", "Returns at most 3 rows"), P("Filtra poder = 3", "Filters power = 3"), P("Salta 3 filas", "Skips 3 rows"), P("Ordena 3 columnas", "Sorts 3 columns")],
  correct: 0, explanation: P("`LIMIT n` corta el resultado a n filas. Combinado con `ORDER BY`, da el 'top n' (los 3 más fuertes, etc.).", "`LIMIT n` cuts the result to n rows. Combined with `ORDER BY`, it gives the 'top n' (the 3 strongest, etc.).") };
const Q_TOPN = { question: P("¿Cómo obtienes los 3 personajes MÁS fuertes?", "How do you get the 3 STRONGEST characters?"),
  options: [P("ORDER BY poder DESC LIMIT 3", "ORDER BY poder DESC LIMIT 3"), P("LIMIT 3 ORDER BY poder", "LIMIT 3 ORDER BY poder"), P("WHERE poder = TOP 3", "WHERE poder = TOP 3"), P("MAX(poder, 3)", "MAX(poder, 3)")],
  correct: 0, explanation: P("El patrón 'top n' es ordenar descendente y limitar: `ORDER BY poder DESC LIMIT 3`. El orden importa: primero ORDER BY, luego LIMIT.", "The 'top n' pattern is sort descending and limit: `ORDER BY poder DESC LIMIT 3`. Order matters: ORDER BY first, then LIMIT.") };
const Q_OFFSET = { question: P("¿Qué hace `LIMIT 3 OFFSET 2`?", "What does `LIMIT 3 OFFSET 2` do?"),
  options: [P("Salta las 2 primeras filas y devuelve las 3 siguientes", "Skips the first 2 rows and returns the next 3"), P("Devuelve 5 filas", "Returns 5 rows"), P("Devuelve las 2 primeras", "Returns the first 2"), P("Da error", "Errors")],
  correct: 0, explanation: P("`OFFSET` salta filas antes de aplicar el `LIMIT`. Es la base de la PAGINACIÓN (página 2, 3…).", "`OFFSET` skips rows before applying the `LIMIT`. It's the basis of PAGINATION (page 2, 3…).") };
const Q_CLAUSE_ORDER = { question: P("¿En qué orden se escriben las cláusulas?", "In what order are the clauses written?"),
  options: [P("SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT", "SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT"), P("FROM ... SELECT ... LIMIT ... WHERE", "FROM ... SELECT ... LIMIT ... WHERE"), P("WHERE ... SELECT ... FROM", "WHERE ... SELECT ... FROM"), P("Da igual el orden", "Order doesn't matter")],
  correct: 0, explanation: P("El orden fijo es SELECT → FROM → WHERE → ORDER BY → LIMIT. Cambiarlo da error de sintaxis.", "The fixed order is SELECT → FROM → WHERE → ORDER BY → LIMIT. Changing it is a syntax error.") };
const Q_ORDER_NOTSEL = { question: P("¿Puedes ordenar por una columna que NO seleccionaste?", "Can you sort by a column you did NOT select?"),
  options: [P("Sí: `SELECT nombre ... ORDER BY poder` es válido", "Yes: `SELECT nombre ... ORDER BY poder` is valid"), P("No, debe estar en el SELECT", "No, it must be in the SELECT"), P("Sólo con *", "Only with *"), P("Sólo números", "Only numbers")],
  correct: 0, explanation: P("`ORDER BY` puede usar cualquier columna de la tabla, aunque no aparezca en el SELECT. Útil para ordenar por un campo sin mostrarlo.", "`ORDER BY` can use any column of the table, even if it's not in the SELECT. Handy to sort by a field without showing it.") };
const Q_ASC_DEFAULT = { question: P("Sin indicar nada, ¿en qué sentido ordena `ORDER BY nombre`?", "With nothing specified, which way does `ORDER BY nombre` sort?"),
  options: [P("Ascendente (A→Z / menor a mayor)", "Ascending (A→Z / low to high)"), P("Descendente", "Descending"), P("Aleatorio", "Random"), P("Por longitud", "By length")],
  correct: 0, explanation: P("Por defecto es ASC (ascendente): textos A→Z, números de menor a mayor. Escribe `DESC` para invertirlo.", "The default is ASC (ascending): text A→Z, numbers low to high. Write `DESC` to reverse it.") };

export const SYL_SQL_3: Syllabus = {
  c3_ferny: { kind: "battle", questions: [Q_ORDER, Q_DESC, Q_ASC_DEFAULT] },
  c3_espia_nazgul: { kind: "battle", questions: [Q_LIMIT, Q_TOPN, Q_OFFSET] },
  c3_montaraz_falso: { kind: "battle", questions: [Q_ORDER_MULTI, Q_CLAUSE_ORDER, Q_ORDER_NOTSEL] },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("Ordena a los elfos por poder, del más temible al menos. Sólo sus nombres.", "Rank the elves by power, from most fearsome to least. Just their names."),
    challenge: {
      support_code: BASE,
      topic: P("WHERE + ORDER BY DESC", "WHERE + ORDER BY DESC"),
      instructions: ins("Devuelve el `nombre` de los personajes de `raza` `'elfo'`, ordenados por `poder` de MAYOR a menor.", "Return the `nombre` of characters of `raza` `'elfo'`, sorted by `poder` from HIGHEST to lowest."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE raza = 'elfo'", "ORDER BY poder DESC;", "ORDER BY nombre DESC;"],
      hints: [P("Primero filtra (`WHERE`), luego ordena (`ORDER BY poder DESC`).", "First filter (`WHERE`), then sort (`ORDER BY poder DESC`).")],
      test_cases: [{ input: "elfos por poder", expected: [["Galadriel"],["Legolas"]], description: P("Elfos, más fuerte primero", "Elves, strongest first") }],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: P("El Pergamino del Orden", "The Scroll of Order"),
    lore_intro: P("Un pergamino enseña a ordenar y recortar el resultado.", "A scroll teaches how to sort and trim the result."),
    scroll: {
      topic: P("SQL: ORDER BY y LIMIT", "SQL: ORDER BY and LIMIT"),
      sections: [
        { heading: P("Ordenar", "Sorting"), body: P("`ORDER BY columna` ordena ascendente; añade `DESC` para descendente. Con varias columnas, la segunda desempata.", "`ORDER BY column` sorts ascending; add `DESC` for descending. With several columns, the second breaks ties."), code: "ORDER BY poder DESC\nORDER BY raza, poder DESC" },
        { heading: P("Recortar y top-N", "Trim and top-N"), body: P("`LIMIT n` deja n filas; `OFFSET` salta filas (paginación). `ORDER BY ... DESC LIMIT n` es el patrón 'top n'.", "`LIMIT n` keeps n rows; `OFFSET` skips rows (pagination). `ORDER BY ... DESC LIMIT n` is the 'top n' pattern."), code: "ORDER BY poder DESC\nLIMIT 3;" },
        { heading: P("Orden de cláusulas", "Clause order"), body: P("Se escriben SIEMPRE en este orden: SELECT, FROM, WHERE, ORDER BY, LIMIT.", "They're ALWAYS written in this order: SELECT, FROM, WHERE, ORDER BY, LIMIT."), code: "SELECT nombre FROM personajes\nWHERE poder > 50\nORDER BY poder DESC LIMIT 3;" },
      ],
      keyTakeaway: P("ORDER BY ordena (DESC para invertir; varias columnas desempatan); LIMIT recorta y con ORDER DESC da el top-N; OFFSET pagina. Orden fijo: SELECT/FROM/WHERE/ORDER BY/LIMIT.", "ORDER BY sorts (DESC to reverse; several columns break ties); LIMIT trims and with ORDER DESC gives top-N; OFFSET paginates. Fixed order: SELECT/FROM/WHERE/ORDER BY/LIMIT."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("La Cuenta del Poney", "The Pony's Tally"),
    lore_intro: P("Mantecona ordena a la clientela por su fuerza. Nombre y poder, del más fuerte al más débil.", "Butterbur ranks the patrons by their strength. Name and power, strongest to weakest."),
    challenge: {
      support_code: BASE,
      topic: P("ORDER BY DESC", "ORDER BY DESC"),
      instructions: ins("Devuelve `nombre` y `poder` de TODOS los personajes, ordenados por `poder` de MAYOR a menor.", "Return `nombre` and `poder` of ALL characters, sorted by `poder` from HIGHEST to lowest."),
      starter_code: START,
      blocks: ["SELECT nombre, poder", "FROM personajes", "ORDER BY poder DESC;", "ORDER BY poder ASC;"],
      hints: [P("`ORDER BY poder DESC`.", "`ORDER BY poder DESC`.")],
      test_cases: [{ input: "por poder desc", expected: [["Gandalf",95],["Galadriel",90],["Aragorn",80],["Legolas",75],["Gimli",70],["Boromir",65],["Sam",30],["Frodo",20]], description: P("De mayor a menor", "Highest to lowest") }],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas de los Túmulos", "The Barrow-blades"),
    lore_intro: P("Ordena los nombres alfabéticamente para inventariar las hojas.", "Sort the names alphabetically to inventory the blades."),
    challenge: {
      support_code: BASE,
      topic: P("ORDER BY ASC", "ORDER BY ASC"),
      instructions: ins("Devuelve el `nombre` de todos los personajes ordenados alfabéticamente (A→Z).", "Return the `nombre` of every character sorted alphabetically (A→Z)."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "ORDER BY nombre ASC;", "ORDER BY nombre DESC;"],
      hints: [P("`ORDER BY nombre` ya es ascendente; `ASC` lo hace explícito.", "`ORDER BY nombre` is already ascending; `ASC` makes it explicit.")],
      test_cases: [{ input: "alfabético", expected: [["Aragorn"],["Boromir"],["Frodo"],["Galadriel"],["Gandalf"],["Gimli"],["Legolas"],["Sam"]], description: P("A→Z", "A→Z") }],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P("Sólo los tres más poderosos suben a la cima. Dame el top 3 por poder.", "Only the three most powerful climb the hill. Give me the top 3 by power."),
    challenge: {
      support_code: BASE,
      topic: P("ORDER BY DESC + LIMIT", "ORDER BY DESC + LIMIT"),
      instructions: ins("Devuelve `nombre` y `poder` de los 3 personajes con MÁS poder (ordena descendente y limita a 3).", "Return `nombre` and `poder` of the 3 characters with the MOST power (sort descending and limit to 3)."),
      starter_code: START,
      blocks: ["SELECT nombre, poder", "FROM personajes", "ORDER BY poder DESC", "LIMIT 3;", "LIMIT 5;"],
      hints: [P("Primero `ORDER BY poder DESC`, luego `LIMIT 3`.", "First `ORDER BY poder DESC`, then `LIMIT 3`.")],
      test_cases: [{ input: "top 3", expected: [["Gandalf",95],["Galadriel",90],["Aragorn",80]], description: P("Los tres más fuertes", "The three strongest") }],
    },
  },
};

/* ===================================================================== *
 * Capítulo 4 · Expresiones, funciones y alias
 * ===================================================================== */
const Q_ARITH = { question: P("¿Qué devuelve la columna `poder * 2` en un SELECT?", "What does the column `poder * 2` return in a SELECT?"),
  options: [P("El poder de cada fila multiplicado por 2 (columna calculada)", "Each row's power times 2 (a computed column)"), P("Modifica la tabla", "It modifies the table"), P("Da error", "It errors"), P("Suma todos los poderes", "It sums all powers")],
  correct: 0, explanation: P("Puedes calcular columnas al vuelo: `poder * 2`, `poder + 10`… No cambian la tabla; sólo el resultado de la consulta.", "You can compute columns on the fly: `poder * 2`, `poder + 10`… They don't change the table; only the query result.") };
const Q_ALIAS = { question: P("¿Para qué sirve `AS` en `poder * 2 AS doble`?", "What is `AS` for in `poder * 2 AS doble`?"),
  options: [P("Da un NOMBRE (alias) a la columna del resultado", "Gives a NAME (alias) to the result column"), P("Multiplica por AS", "Multiplies by AS"), P("Filtra", "Filters"), P("Ordena", "Sorts")],
  correct: 0, explanation: P("`AS alias` renombra la columna en el resultado, útil para columnas calculadas. `poder * 2 AS doble` la titula 'doble'.", "`AS alias` renames the column in the result, handy for computed columns. `poder * 2 AS doble` titles it 'doble'.") };
const Q_UPPER = { question: P("¿Qué hace `UPPER(nombre)`?", "What does `UPPER(nombre)` do?"),
  options: [P("Devuelve el nombre en MAYÚSCULAS", "Returns the name in UPPERCASE"), P("Ordena el nombre", "Sorts the name"), P("Cuenta las letras", "Counts the letters"), P("Da error", "Errors")],
  correct: 0, explanation: P("`UPPER` pasa a mayúsculas y `LOWER` a minúsculas. Son funciones de texto que transforman cada valor de la columna.", "`UPPER` uppercases and `LOWER` lowercases. They're text functions that transform each column value.") };
const Q_LENGTH = { question: P("¿Qué devuelve `LENGTH(nombre)`?", "What does `LENGTH(nombre)` return?"),
  options: [P("El número de caracteres del nombre", "The number of characters in the name"), P("El nombre en mayúsculas", "The name in uppercase"), P("El número de filas", "The number of rows"), P("La primera letra", "The first letter")],
  correct: 0, explanation: P("`LENGTH(texto)` da su longitud en caracteres. Es una función escalar: se aplica fila a fila.", "`LENGTH(text)` gives its length in characters. It's a scalar function: applied row by row.") };
const Q_CONCAT = { question: P("¿Cómo unes dos textos, p. ej. nombre y reino?", "How do you join two texts, e.g. name and reino?"),
  options: [P("Con `||`: `nombre || ' de ' || reino`", "With `||`: `nombre || ' de ' || reino`"), P("Con `+`", "With `+`"), P("Con `&`", "With `&`"), P("Con `CONCAT()` sólo, nunca con ||", "With `CONCAT()` only, never with ||")],
  correct: 0, explanation: P("En SQL estándar (y SQLite), `||` concatena textos: `nombre || ' de ' || reino` → 'Aragorn de Gondor'. En otros motores existe `CONCAT()`.", "In standard SQL (and SQLite), `||` concatenates text: `nombre || ' de ' || reino` → 'Aragorn de Gondor'. Other engines have `CONCAT()`.") };
const Q_CASE = { question: P("¿Qué hace `CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END`?", "What does `CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END` do?"),
  options: [P("Devuelve 'alto' o 'normal' según el poder de cada fila", "Returns 'alto' or 'normal' based on each row's power"), P("Filtra por poder", "Filters by power"), P("Ordena por poder", "Sorts by power"), P("Da error", "Errors")],
  correct: 0, explanation: P("`CASE WHEN ... THEN ... ELSE ... END` es el 'if' de SQL dentro de una columna: clasifica cada fila. Puede tener varios `WHEN`.", "`CASE WHEN ... THEN ... ELSE ... END` is SQL's 'if' inside a column: it classifies each row. It can have several `WHEN`.") };
const Q_ROUND = { question: P("¿Qué hace `ROUND(poder / 3.0, 2)`?", "What does `ROUND(poder / 3.0, 2)` do?"),
  options: [P("Redondea el resultado a 2 decimales", "Rounds the result to 2 decimals"), P("Divide entre 2", "Divides by 2"), P("Cuenta 2 filas", "Counts 2 rows"), P("Ordena", "Sorts")],
  correct: 0, explanation: P("`ROUND(valor, n)` redondea a n decimales. Útil para presentar medias o divisiones sin colas de decimales.", "`ROUND(value, n)` rounds to n decimals. Handy to present averages or divisions without long decimal tails.") };
const Q_COMPUTED = { question: P("Una columna calculada como `poder * 2`, ¿cambia la tabla?", "Does a computed column like `poder * 2` change the table?"),
  options: [P("No: sólo afecta al RESULTADO de la consulta", "No: it only affects the query RESULT"), P("Sí, la modifica", "Yes, it modifies it"), P("Borra la columna original", "It deletes the original column"), P("Crea una tabla nueva", "It creates a new table")],
  correct: 0, explanation: P("`SELECT` sólo LEE. Las columnas calculadas viven en el resultado, no en la tabla. Para cambiar datos se usan UPDATE/INSERT.", "`SELECT` only READS. Computed columns live in the result, not the table. To change data you use UPDATE/INSERT.") };
const Q_ALIAS_WHERE = { question: P("¿Puedes usar un alias del SELECT dentro del WHERE?", "Can you use a SELECT alias inside the WHERE?"),
  options: [P("No: el WHERE se evalúa antes; repite la expresión", "No: WHERE is evaluated first; repeat the expression"), P("Sí, siempre", "Yes, always"), P("Sólo con AS", "Only with AS"), P("Sólo números", "Only numbers")],
  correct: 0, explanation: P("El `WHERE` se procesa antes de que existan los alias del SELECT, así que no puedes usarlos ahí (sí en ORDER BY). Repite la expresión en el WHERE.", "The `WHERE` runs before the SELECT aliases exist, so you can't use them there (you can in ORDER BY). Repeat the expression in the WHERE.") };

export const SYL_SQL_4: Syllabus = {
  c4_jinete_rezagado: { kind: "battle", questions: [Q_ARITH, Q_ALIAS, Q_COMPUTED] },
  c4_lobo: { kind: "battle", questions: [Q_UPPER, Q_LENGTH, Q_CONCAT] },
  c4_trasgo_montaraz: { kind: "battle", questions: [Q_CASE, Q_ROUND, Q_ALIAS_WHERE] },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("Los Nueve en el Vado", "The Nine at the Ford"),
    lore_intro: P("Forja el título de cada humano uniendo su nombre y su reino: 'Nombre de Reino'.", "Forge each human's title by joining their name and reino: 'Name of Reino'."),
    challenge: {
      support_code: BASE,
      topic: P("Concatenación con ||", "Concatenation with ||"),
      instructions: ins("Devuelve UNA columna `titulo` con el formato `nombre || ' de ' || reino` para los personajes de `raza` `'humano'`.", "Return ONE column `titulo` with the format `nombre || ' de ' || reino` for characters of `raza` `'humano'`."),
      starter_code: START,
      blocks: ["SELECT nombre || ' de ' || reino AS titulo", "FROM personajes", "WHERE raza = 'humano';", "SELECT nombre + ' de ' + reino AS titulo"],
      hints: [P("`||` une textos: `nombre || ' de ' || reino`.", "`||` joins text: `nombre || ' de ' || reino`."), P("Ponle alias con `AS titulo`.", "Alias it with `AS titulo`.")],
      test_cases: [{ input: "títulos", expected: [["Aragorn de Gondor"],["Boromir de Gondor"]], description: P("Nombre de Reino", "Name of Reino") }],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: P("El Pergamino de las Funciones", "The Scroll of Functions"),
    lore_intro: P("Un pergamino enseña a transformar y calcular columnas.", "A scroll teaches how to transform and compute columns."),
    scroll: {
      topic: P("SQL: expresiones y funciones", "SQL: expressions and functions"),
      sections: [
        { heading: P("Columnas calculadas y alias", "Computed columns and aliases"), body: P("Puedes calcular en el SELECT: `poder * 2`. Renómbralo con `AS`: `poder * 2 AS doble`. No cambia la tabla.", "You can compute in the SELECT: `poder * 2`. Rename it with `AS`: `poder * 2 AS doble`. It doesn't change the table."), code: "SELECT nombre, poder * 2 AS doble\nFROM personajes;" },
        { heading: P("Funciones de texto", "Text functions"), body: P("`UPPER`/`LOWER` cambian mayúsculas, `LENGTH` cuenta caracteres, `||` concatena.", "`UPPER`/`LOWER` change case, `LENGTH` counts characters, `||` concatenates."), code: "SELECT UPPER(nombre), LENGTH(nombre)\nFROM personajes;" },
        { heading: P("Condicional CASE", "Conditional CASE"), body: P("`CASE WHEN cond THEN a ELSE b END` clasifica cada fila. `ROUND(x, n)` redondea.", "`CASE WHEN cond THEN a ELSE b END` classifies each row. `ROUND(x, n)` rounds."), code: "SELECT nombre,\n  CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END AS nivel\nFROM personajes;" },
      ],
      keyTakeaway: P("Calcula columnas (poder*2) y nómbralas con AS; UPPER/LOWER/LENGTH y || transforman texto; CASE WHEN clasifica; ROUND redondea. SELECT sólo lee, no cambia la tabla.", "Compute columns (poder*2) and name them with AS; UPPER/LOWER/LENGTH and || transform text; CASE WHEN classifies; ROUND rounds. SELECT only reads, it doesn't change the table."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Carrera de Asfaloth", "Asfaloth's Race"),
    lore_intro: P("Grita en mayúsculas el nombre de cada humano al galopar.", "Shout each human's name in uppercase as you gallop."),
    challenge: {
      support_code: BASE,
      topic: P("UPPER", "UPPER"),
      instructions: ins("Devuelve el `nombre` en MAYÚSCULAS (`UPPER(nombre)`) de los personajes de `raza` `'humano'`.", "Return the `nombre` in UPPERCASE (`UPPER(nombre)`) of characters of `raza` `'humano'`."),
      starter_code: START,
      blocks: ["SELECT UPPER(nombre)", "FROM personajes", "WHERE raza = 'humano';", "SELECT LOWER(nombre)"],
      hints: [P("`UPPER(nombre)` pasa a mayúsculas.", "`UPPER(nombre)` uppercases.")],
      test_cases: [{ input: "humanos en mayúsculas", expected: [["ARAGORN"],["BOROMIR"]], description: P("Nombres en mayúsculas", "Uppercased names") }],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Count of the Nine"),
    lore_intro: P("Mide la longitud del nombre de cada hobbit.", "Measure each hobbit's name length."),
    challenge: {
      support_code: BASE,
      topic: P("LENGTH", "LENGTH"),
      instructions: ins("Devuelve `nombre` y `LENGTH(nombre)` de los personajes de `raza` `'hobbit'`.", "Return `nombre` and `LENGTH(nombre)` of characters of `raza` `'hobbit'`."),
      starter_code: START,
      blocks: ["SELECT nombre, LENGTH(nombre)", "FROM personajes", "WHERE raza = 'hobbit';", "SELECT nombre, COUNT(nombre)"],
      hints: [P("`LENGTH(nombre)` cuenta caracteres.", "`LENGTH(nombre)` counts characters.")],
      test_cases: [{ input: "longitud de hobbits", expected: [["Frodo",5],["Sam",3]], description: P("Nombre y longitud", "Name and length") }],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("La Crecida de Bruinen", "The Flood of Bruinen"),
    lore_intro: P("La riada dobla la fuerza de los de Gondor. Muestra su poder duplicado.", "The flood doubles the strength of those from Gondor. Show their power doubled."),
    challenge: {
      support_code: BASE,
      topic: P("Columna calculada + AS", "Computed column + AS"),
      instructions: ins("Devuelve `nombre` y `poder * 2` (con alias `doble`) de los personajes cuyo `reino` sea `'Gondor'`.", "Return `nombre` and `poder * 2` (aliased `doble`) of characters whose `reino` is `'Gondor'`."),
      starter_code: START,
      blocks: ["SELECT nombre, poder * 2 AS doble", "FROM personajes", "WHERE reino = 'Gondor';", "SELECT nombre, poder + 2 AS doble"],
      hints: [P("`poder * 2 AS doble`.", "`poder * 2 AS doble`.")],
      test_cases: [{ input: "poder doble", expected: [["Aragorn",160],["Boromir",130]], description: P("Poder duplicado", "Doubled power") }],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P("Marca cada personaje como 'alto' o 'normal' según su poder, con una runa condicional.", "Mark each character as 'alto' or 'normal' by their power, with a conditional rune."),
    challenge: {
      support_code: BASE,
      topic: P("CASE WHEN", "CASE WHEN"),
      instructions: ins("Devuelve `nombre` y una columna `nivel` que sea `'alto'` si `poder >= 80` o `'normal'` en caso contrario. Usa `CASE`.", "Return `nombre` and a column `nivel` that is `'alto'` if `poder >= 80` or `'normal'` otherwise. Use `CASE`."),
      starter_code: START,
      blocks: ["SELECT nombre, CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END AS nivel", "FROM personajes;", "SELECT nombre, IF(poder >= 80, 'alto', 'normal') AS nivel"],
      hints: [P("`CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END`.", "`CASE WHEN poder >= 80 THEN 'alto' ELSE 'normal' END`."), P("Ponle alias `AS nivel`.", "Alias it `AS nivel`.")],
      test_cases: [{ input: "nivel de cada uno", expected: [["Frodo","normal"],["Aragorn","alto"],["Legolas","normal"],["Gimli","normal"],["Gandalf","alto"],["Sam","normal"],["Boromir","normal"],["Galadriel","alto"]], description: P("Alto o normal", "High or normal") }],
    },
  },
};


/* ===================================================================== *
 * Capítulo 5 · Funciones de agregado
 * ===================================================================== */
const Q_COUNT = { question: P("¿Qué devuelve `SELECT COUNT(*) FROM personajes`?", "What does `SELECT COUNT(*) FROM personajes` return?"),
  options: [P("El NÚMERO de filas de la tabla", "The NUMBER of rows in the table"), P("La suma de los poderes", "The sum of powers"), P("Todas las filas", "All rows"), P("La primera fila", "The first row")],
  correct: 0, explanation: P("`COUNT(*)` cuenta filas. Es una función de AGREGADO: colapsa muchas filas en un único número resumen.", "`COUNT(*)` counts rows. It's an AGGREGATE function: it collapses many rows into a single summary number.") };
const Q_SUM = { question: P("¿Qué hace `SUM(poder)`?", "What does `SUM(poder)` do?"),
  options: [P("Suma todos los valores de la columna `poder`", "Adds up all values of the `poder` column"), P("Cuenta las filas", "Counts the rows"), P("Da el mayor poder", "Gives the highest power"), P("Ordena por poder", "Sorts by power")],
  correct: 0, explanation: P("`SUM(columna)` totaliza los valores numéricos. Como todo agregado, devuelve UNA fila resumen (o una por grupo con GROUP BY).", "`SUM(column)` totals the numeric values. Like every aggregate, it returns ONE summary row (or one per group with GROUP BY).") };
const Q_AVG = { question: P("¿Qué calcula `AVG(poder)`?", "What does `AVG(poder)` compute?"),
  options: [P("La media (promedio) de la columna `poder`", "The mean (average) of the `poder` column"), P("El máximo", "The maximum"), P("La suma", "The sum"), P("El número de filas", "The row count")],
  correct: 0, explanation: P("`AVG` da el promedio. Ojo: es sensible a valores extremos. Suele redondearse para presentarlo (`ROUND(AVG(poder), 2)`).", "`AVG` gives the average. Careful: it's sensitive to extremes. It's often rounded for display (`ROUND(AVG(poder), 2)`).") };
const Q_MAXMIN = { question: P("¿Qué devuelven `MAX(poder)` y `MIN(poder)`?", "What do `MAX(poder)` and `MIN(poder)` return?"),
  options: [P("El mayor y el menor valor de `poder`", "The largest and smallest `poder` value"), P("Sus posiciones", "Their positions"), P("La media y la suma", "The mean and the sum"), P("El número de filas", "The row count")],
  correct: 0, explanation: P("`MAX`/`MIN` dan los extremos. Funcionan también con texto (orden alfabético) y fechas. Son agregados: un valor por consulta o por grupo.", "`MAX`/`MIN` give the extremes. They also work on text (alphabetical) and dates. They're aggregates: one value per query or group.") };
const Q_AGG_COLLAPSE = { question: P("¿Qué tienen en común COUNT, SUM, AVG, MAX y MIN?", "What do COUNT, SUM, AVG, MAX and MIN have in common?"),
  options: [P("Resumen MUCHAS filas en UN valor (son agregados)", "They summarize MANY rows into ONE value (they're aggregates)"), P("Filtran filas", "They filter rows"), P("Ordenan filas", "They sort rows"), P("Crean columnas", "They create columns")],
  correct: 0, explanation: P("Los agregados colapsan un conjunto de filas en un resultado resumen. Sin GROUP BY, resumen TODA la tabla en una fila.", "Aggregates collapse a set of rows into a summary result. Without GROUP BY, they summarize the WHOLE table into one row.") };
const Q_COUNT_COL = { question: P("¿En qué se diferencia `COUNT(reino)` de `COUNT(*)`?", "How does `COUNT(reino)` differ from `COUNT(*)`?"),
  options: [P("COUNT(columna) NO cuenta los NULL de esa columna", "COUNT(column) does NOT count that column's NULLs"), P("Son idénticos siempre", "They're always identical"), P("COUNT(columna) cuenta el doble", "COUNT(column) counts double"), P("COUNT(*) ignora NULL", "COUNT(*) ignores NULL")],
  correct: 0, explanation: P("`COUNT(*)` cuenta TODAS las filas; `COUNT(columna)` cuenta sólo las que tienen valor NO nulo en esa columna. La diferencia importa con datos ausentes.", "`COUNT(*)` counts ALL rows; `COUNT(column)` counts only those with a NON-null value in that column. The difference matters with missing data.") };
const Q_AGG_WHOLE = { question: P("Sin `GROUP BY`, ¿sobre qué calcula `AVG(poder)`?", "Without `GROUP BY`, what does `AVG(poder)` compute over?"),
  options: [P("Sobre TODA la tabla (una sola fila resultado)", "Over the WHOLE table (a single result row)"), P("Sobre la primera fila", "Over the first row"), P("Sobre cada fila por separado", "Over each row separately"), P("Da error", "It errors")],
  correct: 0, explanation: P("Un agregado sin GROUP BY resume toda la tabla (o las filas que pase el WHERE) en una única fila.", "An aggregate without GROUP BY summarizes the whole table (or the rows the WHERE lets through) into a single row.") };
const Q_AGG_MIX = { question: P("¿Por qué falla `SELECT nombre, COUNT(*) FROM personajes` (sin GROUP BY)?", "Why does `SELECT nombre, COUNT(*) FROM personajes` (no GROUP BY) fail or misbehave?"),
  options: [P("Mezcla una columna por fila con un agregado de todas: no cuadra", "It mixes a per-row column with an aggregate over all: it doesn't fit"), P("COUNT no existe", "COUNT doesn't exist"), P("nombre no existe", "nombre doesn't exist"), P("Falta el FROM", "The FROM is missing")],
  correct: 0, explanation: P("Un agregado colapsa las filas en una; una columna normal tiene un valor por fila. Mezclarlas exige un `GROUP BY` que diga cómo agrupar.", "An aggregate collapses rows into one; a plain column has a value per row. Mixing them requires a `GROUP BY` saying how to group.") };
const Q_COUNT_DISTINCT = { question: P("¿Qué cuenta `COUNT(DISTINCT raza)`?", "What does `COUNT(DISTINCT raza)` count?"),
  options: [P("Cuántas razas DIFERENTES hay", "How many DIFFERENT races there are"), P("Todas las filas", "All rows"), P("Las filas con raza repetida", "Rows with a repeated race"), P("Da error", "It errors")],
  correct: 0, explanation: P("`COUNT(DISTINCT columna)` cuenta los valores distintos. Responde '¿cuántas categorías hay?' en una sola cifra.", "`COUNT(DISTINCT column)` counts the distinct values. It answers 'how many categories are there?' in a single number.") };

export const SYL_SQL_5: Syllabus = {
  c5_crebain: { kind: "battle", questions: [Q_COUNT, Q_SUM, Q_AVG] },
  c5_lobo_nieve: { kind: "battle", questions: [Q_MAXMIN, Q_AGG_COLLAPSE, Q_AGG_WHOLE] },
  c5_trasgo_montanes: { kind: "battle", questions: [Q_COUNT_COL, Q_COUNT_DISTINCT, Q_AGG_MIX] },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("El Cuerno de Caradhras", "The Horn of Caradhras"),
    lore_intro: P("Suma el poder combinado de toda la hueste de Gondor para vencer la ventisca.", "Sum the combined power of all of Gondor's host to beat the blizzard."),
    challenge: {
      support_code: BASE,
      topic: P("SUM con WHERE", "SUM with WHERE"),
      instructions: ins("Devuelve la SUMA del `poder` (`SUM(poder)`) de los personajes cuyo `reino` sea `'Gondor'`.", "Return the SUM of `poder` (`SUM(poder)`) of characters whose `reino` is `'Gondor'`."),
      starter_code: START,
      blocks: ["SELECT SUM(poder)", "FROM personajes", "WHERE reino = 'Gondor';", "SELECT TOTAL(poder) FROM personajes;"],
      hints: [P("`SUM(poder)` totaliza; filtra con `WHERE reino = 'Gondor'`.", "`SUM(poder)` totals; filter with `WHERE reino = 'Gondor'`.")],
      test_cases: [{ input: "suma Gondor", expected: [[145]], description: P("80 + 65", "80 + 65") }],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: P("El Pergamino del Resumen", "The Scroll of the Summary"),
    lore_intro: P("Un pergamino enseña a resumir muchas filas en una cifra.", "A scroll teaches how to summarize many rows into one number."),
    scroll: {
      topic: P("SQL: funciones de agregado", "SQL: aggregate functions"),
      sections: [
        { heading: P("Contar y totalizar", "Counting and totaling"), body: P("`COUNT(*)` cuenta filas, `SUM(col)` suma, `AVG(col)` promedia, `MAX`/`MIN` dan extremos. Resumen la tabla en una fila.", "`COUNT(*)` counts rows, `SUM(col)` totals, `AVG(col)` averages, `MAX`/`MIN` give extremes. They summarize the table into one row."), code: "SELECT COUNT(*), AVG(poder), MAX(poder)\nFROM personajes;" },
        { heading: P("Con filtro", "With a filter"), body: P("El `WHERE` se aplica ANTES de agregar: `SUM(poder) WHERE reino = 'Gondor'` suma sólo esas filas.", "The `WHERE` runs BEFORE aggregating: `SUM(poder) WHERE reino = 'Gondor'` sums only those rows."), code: "SELECT SUM(poder)\nFROM personajes\nWHERE reino = 'Gondor';" },
        { heading: P("Detalles", "Details"), body: P("`COUNT(columna)` ignora NULL; `COUNT(DISTINCT col)` cuenta valores distintos. Mezclar agregado y columna normal exige GROUP BY.", "`COUNT(column)` ignores NULL; `COUNT(DISTINCT col)` counts distinct values. Mixing an aggregate with a plain column requires GROUP BY."), code: "SELECT COUNT(DISTINCT raza)\nFROM personajes;" },
      ],
      keyTakeaway: P("COUNT/SUM/AVG/MAX/MIN resumen filas en un valor; WHERE filtra antes de agregar; COUNT(col) ignora NULL, COUNT(DISTINCT) cuenta categorías. Para mezclar con columnas, GROUP BY.", "COUNT/SUM/AVG/MAX/MIN summarize rows into one value; WHERE filters before aggregating; COUNT(col) ignores NULL, COUNT(DISTINCT) counts categories. To mix with columns, GROUP BY."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("El Recuento de Bill", "Bill's Count"),
    lore_intro: P("¿Cuántos viajeros carga Bill el Poney? Cuenta las filas.", "How many travelers does Bill the Pony carry? Count the rows."),
    challenge: {
      support_code: BASE,
      topic: P("COUNT(*)", "COUNT(*)"),
      instructions: ins("Devuelve el NÚMERO total de personajes con `COUNT(*)`.", "Return the total NUMBER of characters with `COUNT(*)`."),
      starter_code: START,
      blocks: ["SELECT COUNT(*)", "FROM personajes;", "SELECT SUM(*)"],
      hints: [P("`SELECT COUNT(*) FROM personajes;`.", "`SELECT COUNT(*) FROM personajes;`.")],
      test_cases: [{ input: "total", expected: [[8]], description: P("Ocho personajes", "Eight characters") }],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia Media", "The Average Resistance"),
    lore_intro: P("Calcula el poder MEDIO de los hobbits, la resistencia de la Comarca.", "Compute the AVERAGE power of the hobbits, the Shire's resistance."),
    challenge: {
      support_code: BASE,
      topic: P("AVG con WHERE", "AVG with WHERE"),
      instructions: ins("Devuelve la MEDIA del `poder` (`AVG(poder)`) de los personajes de `raza` `'hobbit'`.", "Return the AVERAGE `poder` (`AVG(poder)`) of characters of `raza` `'hobbit'`."),
      starter_code: START,
      blocks: ["SELECT AVG(poder)", "FROM personajes", "WHERE raza = 'hobbit';", "SELECT MEAN(poder)"],
      hints: [P("`AVG(poder)` con `WHERE raza = 'hobbit'`.", "`AVG(poder)` with `WHERE raza = 'hobbit'`.")],
      test_cases: [{ input: "media hobbits", expected: [[25]], description: P("(20 + 30) / 2", "(20 + 30) / 2") }],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("Los Extremos de la Montaña", "The Mountain's Extremes"),
    lore_intro: P("Halla el poder más alto y el más bajo de toda la Comunidad.", "Find the highest and lowest power in the whole Fellowship."),
    challenge: {
      support_code: BASE,
      topic: P("MAX y MIN", "MAX and MIN"),
      instructions: ins("Devuelve `MAX(poder)` y `MIN(poder)` de todos los personajes, en ese orden.", "Return `MAX(poder)` and `MIN(poder)` of all characters, in that order."),
      starter_code: START,
      blocks: ["SELECT MAX(poder), MIN(poder)", "FROM personajes;", "SELECT MAX(poder), MIN(poder) FROM personajes GROUP BY raza;"],
      hints: [P("`SELECT MAX(poder), MIN(poder) FROM personajes;`.", "`SELECT MAX(poder), MIN(poder) FROM personajes;`.")],
      test_cases: [{ input: "extremos", expected: [[95,20]], description: P("Máximo y mínimo", "Max and min") }],
    },
  },
};

/* ===================================================================== *
 * Capítulo 6 · GROUP BY y HAVING
 * ===================================================================== */
const Q_GROUP = { question: P("¿Qué hace `GROUP BY raza`?", "What does `GROUP BY raza` do?"),
  options: [P("Agrupa las filas por raza para agregar cada grupo", "Groups the rows by race to aggregate each group"), P("Ordena por raza", "Sorts by race"), P("Filtra por raza", "Filters by race"), P("Cuenta las razas", "Counts the races")],
  correct: 0, explanation: P("`GROUP BY` divide las filas en grupos según una columna; el agregado (COUNT, AVG…) se calcula POR grupo. Es dividir-agregar-combinar.", "`GROUP BY` splits the rows into groups by a column; the aggregate (COUNT, AVG…) is computed PER group. It's split-aggregate-combine.") };
const Q_GROUP_AGG = { question: P("¿Qué devuelve `SELECT raza, COUNT(*) FROM personajes GROUP BY raza`?", "What does `SELECT raza, COUNT(*) FROM personajes GROUP BY raza` return?"),
  options: [P("Cada raza con cuántos personajes tiene", "Each race with how many characters it has"), P("El total de personajes", "The total number of characters"), P("Una fila por personaje", "One row per character"), P("Sólo las razas", "Only the races")],
  correct: 0, explanation: P("Devuelve una fila por raza con su cuenta. La columna del GROUP BY (raza) y el agregado (COUNT) forman el resumen.", "It returns one row per race with its count. The GROUP BY column (raza) and the aggregate (COUNT) form the summary.") };
const Q_HAVING = { question: P("¿Para qué sirve `HAVING`?", "What is `HAVING` for?"),
  options: [P("Filtrar GRUPOS por su agregado (tras agrupar)", "Filtering GROUPS by their aggregate (after grouping)"), P("Filtrar filas antes de agrupar", "Filtering rows before grouping"), P("Ordenar grupos", "Sorting groups"), P("Crear grupos", "Creating groups")],
  correct: 0, explanation: P("`HAVING` filtra DESPUÉS de agrupar, usando el agregado: `HAVING COUNT(*) >= 2` deja sólo los grupos con 2+ filas.", "`HAVING` filters AFTER grouping, using the aggregate: `HAVING COUNT(*) >= 2` keeps only groups with 2+ rows.") };
const Q_WHERE_HAVING = { question: P("¿Cuál es la diferencia entre `WHERE` y `HAVING`?", "What's the difference between `WHERE` and `HAVING`?"),
  options: [P("WHERE filtra FILAS antes de agrupar; HAVING filtra GRUPOS después", "WHERE filters ROWS before grouping; HAVING filters GROUPS after"), P("Son iguales", "They're the same"), P("HAVING es más rápido", "HAVING is faster"), P("WHERE no existe con GROUP BY", "WHERE doesn't exist with GROUP BY")],
  correct: 0, explanation: P("`WHERE` actúa sobre filas individuales antes de agrupar; `HAVING` sobre los grupos ya formados (puede usar COUNT, SUM…). Se pueden usar los dos.", "`WHERE` acts on individual rows before grouping; `HAVING` on the formed groups (can use COUNT, SUM…). You can use both.") };
const Q_GROUP_KEY = { question: P("En `SELECT raza, COUNT(*) ... GROUP BY raza`, ¿por qué está `raza` en el SELECT?", "In `SELECT raza, COUNT(*) ... GROUP BY raza`, why is `raza` in the SELECT?"),
  options: [P("Es la clave de grupo: identifica a qué grupo pertenece cada cuenta", "It's the group key: it says which group each count belongs to"), P("Por decoración", "For decoration"), P("Para ordenar", "To sort"), P("No debería estar", "It shouldn't be there")],
  correct: 0, explanation: P("Se seleccionan la(s) columna(s) del GROUP BY y los agregados. Poner una columna normal que no esté en el GROUP BY es un error.", "You select the GROUP BY column(s) and the aggregates. Putting a plain column not in the GROUP BY is an error.") };
const Q_GROUP_MULTI = { question: P("¿Qué hace `GROUP BY reino, raza`?", "What does `GROUP BY reino, raza` do?"),
  options: [P("Agrupa por la COMBINACIÓN de reino y raza", "Groups by the COMBINATION of reino and raza"), P("Agrupa dos veces", "Groups twice"), P("Da error", "Errors"), P("Agrupa sólo por reino", "Groups only by reino")],
  correct: 0, explanation: P("Con varias columnas, cada grupo es una combinación única (reino, raza). Da resúmenes más finos: cuántos de cada raza EN cada reino.", "With several columns, each group is a unique (reino, raza) combination. It gives finer summaries: how many of each race IN each reino.") };
const Q_GROUP_ORDER = { question: P("¿Se puede ordenar el resultado de un GROUP BY?", "Can you sort a GROUP BY result?"),
  options: [P("Sí, con `ORDER BY` después (por la clave o por el agregado)", "Yes, with `ORDER BY` after (by the key or the aggregate)"), P("No", "No"), P("Sólo por la clave", "Only by the key"), P("Sólo con HAVING", "Only with HAVING")],
  correct: 0, explanation: P("`ORDER BY` va después del GROUP BY (y HAVING). Puedes ordenar por la columna de grupo o por el agregado: `ORDER BY COUNT(*) DESC`.", "`ORDER BY` comes after the GROUP BY (and HAVING). You can sort by the group column or the aggregate: `ORDER BY COUNT(*) DESC`.") };
const Q_HAVING_AGG = { question: P("¿Qué expresión suele ir en un `HAVING`?", "What kind of expression usually goes in a `HAVING`?"),
  options: [P("Un agregado: `HAVING SUM(poder) > 100`", "An aggregate: `HAVING SUM(poder) > 100`"), P("Una columna normal", "A plain column"), P("Un ORDER BY", "An ORDER BY"), P("Un JOIN", "A JOIN")],
  correct: 0, explanation: P("`HAVING` filtra por el resultado del agregado de cada grupo. Para filtrar por columnas normales de fila se usa `WHERE`.", "`HAVING` filters by each group's aggregate result. To filter by plain row columns you use `WHERE`.") };
const Q_GROUP_CONCEPT = { question: P("El patrón GROUP BY implementa…", "The GROUP BY pattern implements…"),
  options: [P("Dividir-aplicar-combinar: divide en grupos, agrega cada uno, combina", "Split-apply-combine: split into groups, aggregate each, combine"), P("Un bucle for", "A for loop"), P("Un JOIN", "A JOIN"), P("Una subconsulta", "A subquery")],
  correct: 0, explanation: P("Es el mismo patrón que en pandas: partir las filas por una clave, resumir cada partición y juntar los resúmenes en una tabla.", "It's the same pattern as in pandas: split the rows by a key, summarize each partition and combine the summaries into a table.") };

export const SYL_SQL_6: Syllabus = {
  c6_trasgo_explorador: { kind: "battle", questions: [Q_GROUP, Q_GROUP_AGG, Q_GROUP_CONCEPT] },
  c6_trol_cavernas: { kind: "battle", questions: [Q_HAVING, Q_WHERE_HAVING, Q_HAVING_AGG] },
  c6_capitan_trasgo: { kind: "battle", questions: [Q_GROUP_KEY, Q_GROUP_MULTI, Q_GROUP_ORDER] },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("Suma el poder por reino y quédate sólo con los reinos que superan 100: los que pueden plantar cara al Balrog.", "Sum power by reino and keep only the reinos above 100: those that can face the Balrog."),
    challenge: {
      support_code: BASE,
      topic: P("GROUP BY + HAVING", "GROUP BY + HAVING"),
      instructions: ins("Devuelve `reino` y `SUM(poder)` agrupando por `reino`, quedándote SÓLO con los grupos cuya suma sea MAYOR que 100 (`HAVING`). Ordena por `reino`.", "Return `reino` and `SUM(poder)` grouping by `reino`, keeping ONLY groups whose sum is GREATER than 100 (`HAVING`). Order by `reino`."),
      starter_code: START,
      blocks: ["SELECT reino, SUM(poder)", "FROM personajes", "GROUP BY reino", "HAVING SUM(poder) > 100", "ORDER BY reino;", "WHERE SUM(poder) > 100"],
      hints: [P("`GROUP BY reino`, luego `HAVING SUM(poder) > 100`.", "`GROUP BY reino`, then `HAVING SUM(poder) > 100`."), P("El filtro de grupo es HAVING, no WHERE.", "The group filter is HAVING, not WHERE.")],
      test_cases: [{ input: "reinos fuertes", expected: [["Gondor",145]], description: P("Suma > 100", "Sum > 100") }],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: P("El Pergamino del Grupo", "The Scroll of the Group"),
    lore_intro: P("Un pergamino enano enseña a resumir por categorías: GROUP BY.", "A dwarven scroll teaches how to summarize by category: GROUP BY."),
    scroll: {
      topic: P("SQL: GROUP BY y HAVING", "SQL: GROUP BY and HAVING"),
      sections: [
        { heading: P("Agrupar y agregar", "Group and aggregate"), body: P("`GROUP BY columna` forma grupos; el agregado se calcula por grupo. Selecciona la columna de grupo y el agregado.", "`GROUP BY column` forms groups; the aggregate is computed per group. Select the group column and the aggregate."), code: "SELECT raza, COUNT(*)\nFROM personajes\nGROUP BY raza;" },
        { heading: P("Filtrar grupos: HAVING", "Filtering groups: HAVING"), body: P("`WHERE` filtra filas ANTES de agrupar; `HAVING` filtra GRUPOS después, por su agregado.", "`WHERE` filters rows BEFORE grouping; `HAVING` filters GROUPS after, by their aggregate."), code: "GROUP BY reino\nHAVING SUM(poder) > 100;" },
        { heading: P("Ordenar el resumen", "Ordering the summary"), body: P("`ORDER BY` va al final; puedes ordenar por la clave o por el agregado (`ORDER BY COUNT(*) DESC`).", "`ORDER BY` comes last; you can sort by the key or the aggregate (`ORDER BY COUNT(*) DESC`)."), code: "GROUP BY raza\nORDER BY COUNT(*) DESC;" },
      ],
      keyTakeaway: P("GROUP BY agrega por categorías; WHERE filtra filas antes, HAVING filtra grupos después (por el agregado); ORDER BY al final. Selecciona la clave de grupo + el agregado.", "GROUP BY aggregates by category; WHERE filters rows before, HAVING filters groups after (by the aggregate); ORDER BY last. Select the group key + the aggregate."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("El Censo de Durin", "Durin's Census"),
    lore_intro: P("Cuenta cuántos personajes hay de cada raza.", "Count how many characters there are of each race."),
    challenge: {
      support_code: BASE,
      topic: P("GROUP BY + COUNT", "GROUP BY + COUNT"),
      instructions: ins("Devuelve `raza` y `COUNT(*)` agrupando por `raza`, ordenado por `raza`.", "Return `raza` and `COUNT(*)` grouping by `raza`, ordered by `raza`."),
      starter_code: START,
      blocks: ["SELECT raza, COUNT(*)", "FROM personajes", "GROUP BY raza", "ORDER BY raza;", "GROUP BY poder"],
      hints: [P("`GROUP BY raza` con `COUNT(*)`.", "`GROUP BY raza` with `COUNT(*)`.")],
      test_cases: [{ input: "por raza", expected: [["elfo",2],["enano",1],["hobbit",2],["humano",2],["maia",1]], description: P("Cuenta por raza", "Count per race") }],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Calcula el poder medio por reino.", "Compute the average power per reino."),
    challenge: {
      support_code: BASE,
      topic: P("GROUP BY + AVG", "GROUP BY + AVG"),
      instructions: ins("Devuelve `reino` y `AVG(poder)` agrupando por `reino`, ordenado por `reino`.", "Return `reino` and `AVG(poder)` grouping by `reino`, ordered by `reino`."),
      starter_code: START,
      blocks: ["SELECT reino, AVG(poder)", "FROM personajes", "GROUP BY reino", "ORDER BY reino;", "GROUP BY nombre"],
      hints: [P("`GROUP BY reino` con `AVG(poder)`.", "`GROUP BY reino` with `AVG(poder)`.")],
      test_cases: [{ input: "media por reino", expected: [["Bosque",75],["Comarca",25],["Erebor",70],["Gondor",72.5],["Lorien",90],["Valinor",95]], description: P("Media por reino", "Mean per reino") }],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Sólo pasan las razas con 2 o más miembros. Filtra los grupos con HAVING.", "Only races with 2 or more members pass. Filter the groups with HAVING."),
    challenge: {
      support_code: BASE,
      topic: P("GROUP BY + HAVING", "GROUP BY + HAVING"),
      instructions: ins("Devuelve `raza` y `COUNT(*)` agrupando por `raza`, quedándote sólo con las razas de 2 o más miembros (`HAVING COUNT(*) >= 2`). Ordena por `raza`.", "Return `raza` and `COUNT(*)` grouping by `raza`, keeping only races with 2 or more members (`HAVING COUNT(*) >= 2`). Order by `raza`."),
      starter_code: START,
      blocks: ["SELECT raza, COUNT(*)", "FROM personajes", "GROUP BY raza", "HAVING COUNT(*) >= 2", "ORDER BY raza;", "WHERE COUNT(*) >= 2"],
      hints: [P("El filtro de grupo va en `HAVING`, no en `WHERE`.", "The group filter goes in `HAVING`, not `WHERE`.")],
      test_cases: [{ input: "razas con 2+", expected: [["elfo",2],["hobbit",2],["humano",2]], description: P("2 o más", "2 or more") }],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Halla el poder MÁXIMO de cada raza.", "Find the MAX power of each race."),
    challenge: {
      support_code: BASE,
      topic: P("GROUP BY + MAX", "GROUP BY + MAX"),
      instructions: ins("Devuelve `raza` y `MAX(poder)` agrupando por `raza`, ordenado por `raza`.", "Return `raza` and `MAX(poder)` grouping by `raza`, ordered by `raza`."),
      starter_code: START,
      blocks: ["SELECT raza, MAX(poder)", "FROM personajes", "GROUP BY raza", "ORDER BY raza;", "GROUP BY poder"],
      hints: [P("`GROUP BY raza` con `MAX(poder)`.", "`GROUP BY raza` with `MAX(poder)`.")],
      test_cases: [{ input: "máximo por raza", expected: [["elfo",90],["enano",70],["hobbit",30],["humano",80],["maia",95]], description: P("Pico por raza", "Peak per race") }],
    },
  },
};


/* ===================================================================== *
 * Capítulo 7 · JOIN: cruzar tablas
 * ===================================================================== */
const Q_JOIN = { question: P("¿Qué hace un `JOIN`?", "What does a `JOIN` do?"),
  options: [P("Combina filas de DOS tablas emparejándolas por una columna común", "Combines rows from TWO tables matching them by a shared column"), P("Apila las filas de dos tablas", "Stacks the rows of two tables"), P("Ordena dos tablas", "Sorts two tables"), P("Borra una tabla", "Deletes a table")],
  correct: 0, explanation: P("`JOIN` cruza tablas: por cada fila de una, busca las que casan en la otra según una condición, y las une en una sola fila ancha.", "`JOIN` crosses tables: for each row of one, it finds the matches in the other by a condition, and merges them into one wide row.") };
const Q_ON = { question: P("¿Para qué sirve `ON` en `JOIN reinos ON personajes.reino = reinos.nombre`?", "What is `ON` for in `JOIN reinos ON personajes.reino = reinos.nombre`?"),
  options: [P("Indica la CONDICIÓN por la que se emparejan las filas", "It states the CONDITION by which rows are matched"), P("Ordena el resultado", "Sorts the result"), P("Filtra por reino", "Filters by reino"), P("Crea la tabla reinos", "Creates the reinos table")],
  correct: 0, explanation: P("`ON` dice cómo relacionar las tablas: casa cada personaje con el reino cuyo `nombre` coincide con su `reino`. Es la clave del cruce.", "`ON` says how to relate the tables: it matches each character with the reino whose `nombre` equals its `reino`. It's the crux of the join.") };
const Q_INNER = { question: P("¿Qué filas conserva un `INNER JOIN` (el JOIN normal)?", "Which rows does an `INNER JOIN` (the plain JOIN) keep?"),
  options: [P("Sólo las que TIENEN pareja en ambas tablas", "Only those that HAVE a match in both tables"), P("Todas las de la izquierda", "All left rows"), P("Todas las de la derecha", "All right rows"), P("Todas de ambas", "All of both")],
  correct: 0, explanation: P("El `INNER JOIN` (o simplemente `JOIN`) descarta las filas sin pareja. Para conservar las de un lado aunque no casen, se usa `LEFT JOIN`.", "The `INNER JOIN` (or just `JOIN`) drops rows without a match. To keep one side even when unmatched, use `LEFT JOIN`.") };
const Q_LEFT = { question: P("¿Qué hace un `LEFT JOIN`?", "What does a `LEFT JOIN` do?"),
  options: [P("Conserva TODAS las filas de la izquierda; pone NULL donde no casan", "Keeps ALL left rows; puts NULL where they don't match"), P("Sólo las que casan", "Only the matches"), P("Sólo la derecha", "Only the right side"), P("Ordena a la izquierda", "Sorts to the left")],
  correct: 0, explanation: P("`LEFT JOIN` garantiza que aparezcan todas las filas de la tabla izquierda; las columnas de la derecha van a NULL cuando no hay pareja.", "`LEFT JOIN` guarantees all left-table rows appear; the right columns are NULL when there's no match.") };
const Q_QUALIFY = { question: P("¿Por qué se escribe `personajes.nombre` con el nombre de la tabla delante?", "Why write `personajes.nombre` with the table name in front?"),
  options: [P("Para DESAMBIGUAR cuando una columna existe en ambas tablas", "To DISAMBIGUATE when a column exists in both tables"), P("Es obligatorio siempre", "It's always required"), P("Para ordenar", "To sort"), P("Es decorativo", "It's decorative")],
  correct: 0, explanation: P("Con un JOIN, dos tablas pueden tener columnas con el mismo nombre (`nombre`). `tabla.columna` deja claro cuál usas.", "With a JOIN, two tables can have columns with the same name (`nombre`). `table.column` makes clear which one you mean.") };
const Q_ALIAS_TABLE = { question: P("¿Qué son las `p` y `r` en `FROM personajes p JOIN reinos r`?", "What are the `p` and `r` in `FROM personajes p JOIN reinos r`?"),
  options: [P("Alias de tabla: nombres cortos para referirse a cada una", "Table aliases: short names to refer to each"), P("Columnas", "Columns"), P("Valores", "Values"), P("Funciones", "Functions")],
  correct: 0, explanation: P("Los alias de tabla acortan la escritura: `p.nombre`, `r.region`. Imprescindibles cuando los nombres de tabla son largos o se repiten.", "Table aliases shorten the writing: `p.nombre`, `r.region`. Essential when table names are long or repeated.") };
const Q_JOIN_KEY = { question: P("En el JOIN de personajes con reinos, ¿qué relaciona las tablas?", "In the join of personajes with reinos, what relates the tables?"),
  options: [P("El reino: `personajes.reino` coincide con `reinos.nombre`", "The reino: `personajes.reino` equals `reinos.nombre`"), P("El poder", "The power"), P("El id", "The id"), P("Nada, se combinan todas", "Nothing, all combine")],
  correct: 0, explanation: P("La condición del ON define la relación: el reino de cada personaje se enlaza con la fila de `reinos` que lo describe. Es una clave foránea en acción.", "The ON condition defines the relationship: each character's reino links to the `reinos` row describing it. It's a foreign key in action.") };
const Q_JOIN_THEN = { question: P("Tras un JOIN, ¿puedes filtrar, agrupar u ordenar?", "After a JOIN, can you filter, group or sort?"),
  options: [P("Sí: WHERE, GROUP BY y ORDER BY funcionan sobre el resultado del JOIN", "Yes: WHERE, GROUP BY and ORDER BY work on the JOIN's result"), P("No, el JOIN es lo último", "No, the JOIN is the last thing"), P("Sólo ORDER BY", "Only ORDER BY"), P("Sólo WHERE", "Only WHERE")],
  correct: 0, explanation: P("El JOIN produce una tabla ancha; sobre ella aplicas WHERE, GROUP BY, HAVING, ORDER BY como sobre cualquier tabla. Se combinan libremente.", "The JOIN produces a wide table; on it you apply WHERE, GROUP BY, HAVING, ORDER BY like on any table. They combine freely.") };
const Q_JOIN_VS_UNION = { question: P("¿En qué se diferencia `JOIN` de `UNION`?", "How does `JOIN` differ from `UNION`?"),
  options: [P("JOIN une por COLUMNAS (a lo ancho); UNION apila FILAS (a lo alto)", "JOIN joins by COLUMNS (widthwise); UNION stacks ROWS (heightwise)"), P("Son iguales", "They're the same"), P("JOIN apila filas", "JOIN stacks rows"), P("UNION necesita ON", "UNION needs ON")],
  correct: 0, explanation: P("`JOIN` añade columnas relacionando tablas; `UNION` junta resultados con las MISMAS columnas apilando filas. Responden a necesidades distintas.", "`JOIN` adds columns by relating tables; `UNION` combines results with the SAME columns by stacking rows. They serve different needs.") };

export const SYL_SQL_7: Syllabus = {
  c7_orco_explorador: { kind: "battle", questions: [Q_JOIN, Q_ON, Q_JOIN_KEY] },
  c7_trasgo_frontera: { kind: "battle", questions: [Q_INNER, Q_LEFT, Q_JOIN_VS_UNION] },
  c7_uruk_rastreador: { kind: "battle", questions: [Q_QUALIFY, Q_ALIAS_TABLE, Q_JOIN_THEN] },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de los Uruk-hai", "Uglúk of the Uruk-hai"),
    lore_intro: P("Cruza personajes con reinos y cuenta cuántos hay por REGIÓN. El informe de Uglúk.", "Cross characters with reinos and count how many per REGION. Uglúk's report."),
    challenge: {
      support_code: BASE2,
      topic: P("JOIN + GROUP BY", "JOIN + GROUP BY"),
      instructions: insJ("Cruza `personajes` (alias `p`) con `reinos` (alias `r`) por `p.reino = r.nombre`. Devuelve `r.region` y `COUNT(*)` agrupando por `r.region`, ordenado por `r.region`.", "Join `personajes` (alias `p`) with `reinos` (alias `r`) by `p.reino = r.nombre`. Return `r.region` and `COUNT(*)` grouping by `r.region`, ordered by `r.region`."),
      starter_code: START,
      blocks: ["SELECT r.region, COUNT(*)", "FROM personajes p", "JOIN reinos r ON p.reino = r.nombre", "GROUP BY r.region", "ORDER BY r.region;", "GROUP BY p.reino"],
      hints: [P("Une con `JOIN reinos r ON p.reino = r.nombre`.", "Join with `JOIN reinos r ON p.reino = r.nombre`."), P("Luego `GROUP BY r.region`.", "Then `GROUP BY r.region`.")],
      test_cases: [{ input: "por región", expected: [["Este",1],["Norte",4],["Oeste",1],["Sur",2]], description: P("Cuenta por región", "Count per region") }],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: P("El Pergamino del Cruce", "The Scroll of the Join"),
    lore_intro: P("Un pergamino enseña a combinar dos tablas: JOIN.", "A scroll teaches how to combine two tables: JOIN."),
    scroll: {
      topic: P("SQL: JOIN", "SQL: JOIN"),
      sections: [
        { heading: P("Unir por una clave", "Joining by a key"), body: P("`JOIN otra ON a.col = b.col` empareja filas de dos tablas por una columna común. El `INNER JOIN` conserva sólo las que casan.", "`JOIN other ON a.col = b.col` matches rows of two tables by a shared column. The `INNER JOIN` keeps only the matches."), code: "SELECT p.nombre, r.region\nFROM personajes p\nJOIN reinos r ON p.reino = r.nombre;" },
        { heading: P("Alias y desambiguar", "Aliases and disambiguation"), body: P("Da alias cortos a las tablas (`p`, `r`) y usa `tabla.columna` cuando una columna existe en ambas.", "Give tables short aliases (`p`, `r`) and use `table.column` when a column exists in both."), code: "FROM personajes p\nJOIN reinos r ON p.reino = r.nombre\nWHERE p.raza = 'elfo';" },
        { heading: P("LEFT JOIN y más", "LEFT JOIN and more"), body: P("`LEFT JOIN` conserva todas las filas de la izquierda (NULL donde no casan). Sobre el resultado puedes filtrar, agrupar y ordenar.", "`LEFT JOIN` keeps all left rows (NULL where unmatched). On the result you can filter, group and sort."), code: "FROM personajes p\nLEFT JOIN reinos r ON p.reino = r.nombre;" },
      ],
      keyTakeaway: P("JOIN ... ON cruza tablas por una clave común (INNER = sólo coincidencias, LEFT = todas las de la izquierda); usa alias y tabla.columna; sobre el resultado van WHERE/GROUP BY/ORDER BY.", "JOIN ... ON crosses tables by a shared key (INNER = matches only, LEFT = all left rows); use aliases and table.column; WHERE/GROUP BY/ORDER BY apply to the result."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "Galadriel's Phial"),
    lore_intro: P("Cruza cada hobbit con la región de su reino.", "Cross each hobbit with their reino's region."),
    challenge: {
      support_code: BASE2,
      topic: P("JOIN básico", "Basic JOIN"),
      instructions: insJ("Cruza `personajes` con `reinos` por `personajes.reino = reinos.nombre`. Devuelve `personajes.nombre` y `reinos.region` de los de `raza` `'hobbit'`.", "Join `personajes` with `reinos` by `personajes.reino = reinos.nombre`. Return `personajes.nombre` and `reinos.region` of those of `raza` `'hobbit'`."),
      starter_code: START,
      blocks: ["SELECT personajes.nombre, reinos.region", "FROM personajes", "JOIN reinos ON personajes.reino = reinos.nombre", "WHERE personajes.raza = 'hobbit';", "JOIN reinos ON personajes.nombre = reinos.nombre"],
      hints: [P("Empareja por `personajes.reino = reinos.nombre`.", "Match by `personajes.reino = reinos.nombre`.")],
      test_cases: [{ input: "hobbits y región", expected: [["Frodo","Norte"],["Sam","Norte"]], description: P("Nombre y región", "Name and region") }],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("Con alias de tabla, cruza cada elfo con la región de su reino.", "With table aliases, cross each elf with their reino's region."),
    challenge: {
      support_code: BASE2,
      topic: P("JOIN con alias", "JOIN with aliases"),
      instructions: insJ("Usa alias `p` y `r`. Cruza por `p.reino = r.nombre` y devuelve `p.nombre` y `r.region` de los de `raza` `'elfo'`.", "Use aliases `p` and `r`. Join by `p.reino = r.nombre` and return `p.nombre` and `r.region` of those of `raza` `'elfo'`."),
      starter_code: START,
      blocks: ["SELECT p.nombre, r.region", "FROM personajes p", "JOIN reinos r ON p.reino = r.nombre", "WHERE p.raza = 'elfo';", "JOIN reinos r ON p.region = r.region"],
      hints: [P("`FROM personajes p JOIN reinos r ON p.reino = r.nombre`.", "`FROM personajes p JOIN reinos r ON p.reino = r.nombre`.")],
      test_cases: [{ input: "elfos y región", expected: [["Legolas","Norte"],["Galadriel","Norte"]], description: P("Nombre y región", "Name and region") }],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("¿Quién vive en el Norte? Cruza y filtra por la región de la tabla reinos.", "Who lives in the North? Join and filter by the reinos table's region."),
    challenge: {
      support_code: BASE2,
      topic: P("JOIN + WHERE en la otra tabla", "JOIN + WHERE on the other table"),
      instructions: insJ("Cruza `p` y `r` por `p.reino = r.nombre`. Devuelve `p.nombre` de los personajes cuya `r.region` sea `'Norte'`, ordenado por `p.nombre`.", "Join `p` and `r` by `p.reino = r.nombre`. Return `p.nombre` of characters whose `r.region` is `'Norte'`, ordered by `p.nombre`."),
      starter_code: START,
      blocks: ["SELECT p.nombre", "FROM personajes p", "JOIN reinos r ON p.reino = r.nombre", "WHERE r.region = 'Norte'", "ORDER BY p.nombre;", "WHERE r.region = 'Sur'"],
      hints: [P("Filtra por `r.region = 'Norte'` (columna de la tabla reinos).", "Filter by `r.region = 'Norte'` (a reinos-table column).")],
      test_cases: [{ input: "del Norte", expected: [["Frodo"],["Galadriel"],["Legolas"],["Sam"]], description: P("Habitantes del Norte", "Northern dwellers") }],
    },
  },
};

/* ===================================================================== *
 * Capítulo 8 · Subconsultas (capstone)
 * ===================================================================== */
const Q_SUB = { question: P("¿Qué es una subconsulta?", "What is a subquery?"),
  options: [P("Una consulta DENTRO de otra, entre paréntesis", "A query INSIDE another, in parentheses"), P("Dos tablas unidas", "Two joined tables"), P("Un tipo de índice", "A kind of index"), P("Un comentario", "A comment")],
  correct: 0, explanation: P("Una subconsulta es un `SELECT` anidado entre paréntesis que produce un valor o un conjunto usado por la consulta externa (en WHERE, FROM…).", "A subquery is a nested `SELECT` in parentheses producing a value or set used by the outer query (in WHERE, FROM…).") };
const Q_SUB_SCALAR = { question: P("¿Qué hace `WHERE poder > (SELECT AVG(poder) FROM personajes)`?", "What does `WHERE poder > (SELECT AVG(poder) FROM personajes)` do?"),
  options: [P("Deja las filas con poder por encima de la MEDIA", "Keeps rows with power above the AVERAGE"), P("Ordena por media", "Sorts by mean"), P("Da error", "Errors"), P("Cuenta las filas", "Counts the rows")],
  correct: 0, explanation: P("La subconsulta escalar calcula UN valor (la media) que la consulta externa usa para comparar. Así comparas cada fila con un resumen del conjunto.", "The scalar subquery computes ONE value (the mean) the outer query uses to compare. That's how you compare each row against a summary of the set.") };
const Q_SUB_IN = { question: P("¿Qué hace `WHERE reino IN (SELECT reino FROM personajes WHERE raza = 'hobbit')`?", "What does `WHERE reino IN (SELECT reino FROM personajes WHERE raza = 'hobbit')` do?"),
  options: [P("Deja las filas cuyo reino está entre los reinos con hobbits", "Keeps rows whose reino is among the reinos that have hobbits"), P("Cuenta los hobbits", "Counts the hobbits"), P("Une dos tablas", "Joins two tables"), P("Da error", "Errors")],
  correct: 0, explanation: P("`IN (subconsulta)` compara con el CONJUNTO de valores que devuelve la subconsulta. Aquí, los reinos donde vive algún hobbit.", "`IN (subquery)` compares against the SET of values the subquery returns. Here, the reinos where some hobbit lives.") };
const Q_SUB_SET = { question: P("Una subconsulta usada con `IN`, ¿qué debe devolver?", "A subquery used with `IN` must return what?"),
  options: [P("Una sola COLUMNA (un conjunto de valores)", "A single COLUMN (a set of values)"), P("Varias columnas", "Several columns"), P("Una tabla entera", "A whole table"), P("Un número", "A number")],
  correct: 0, explanation: P("`IN (subconsulta)` espera una columna. Para comparar con `=` la subconsulta debe devolver un ÚNICO valor (escalar).", "`IN (subquery)` expects one column. To compare with `=` the subquery must return a SINGLE value (scalar).") };
const Q_SUB_EQ = { question: P("¿Qué hace `WHERE poder = (SELECT MAX(poder) FROM personajes)`?", "What does `WHERE poder = (SELECT MAX(poder) FROM personajes)` do?"),
  options: [P("Devuelve la(s) fila(s) con el poder MÁXIMO", "Returns the row(s) with the MAXIMUM power"), P("Ordena por poder", "Sorts by power"), P("Cuenta filas", "Counts rows"), P("Da error siempre", "Always errors")],
  correct: 0, explanation: P("La subconsulta da un único valor (el máximo) y el `=` selecciona la fila que lo iguala. Es la forma clásica de traer 'el registro del máximo'.", "The subquery gives a single value (the max) and `=` selects the row equal to it. It's the classic way to fetch 'the record of the maximum'.") };
const Q_SUB_FROM = { question: P("¿Se puede poner una subconsulta en el `FROM`?", "Can you put a subquery in the `FROM`?"),
  options: [P("Sí: es una 'tabla derivada' sobre la que consultas", "Yes: it's a 'derived table' you query over"), P("No, sólo en WHERE", "No, only in WHERE"), P("Sólo en SELECT", "Only in SELECT"), P("Nunca", "Never")],
  correct: 0, explanation: P("Una subconsulta en `FROM` produce una tabla temporal (derivada) a la que le pones alias y consultas como a una tabla normal.", "A subquery in `FROM` produces a temporary (derived) table you alias and query like a normal table.") };
const Q_SUB_VS_JOIN = { question: P("Muchas subconsultas se pueden reescribir como…", "Many subqueries can be rewritten as…"),
  options: [P("JOINs (suelen ser equivalentes y a veces más eficientes)", "JOINs (often equivalent and sometimes more efficient)"), P("Bucles for", "For loops"), P("Índices", "Indexes"), P("Comentarios", "Comments")],
  correct: 0, explanation: P("Un `IN (subconsulta)` a menudo equivale a un JOIN. La subconsulta es más legible en algunos casos; el JOIN suele optimizar mejor. Conviene conocer ambos.", "An `IN (subquery)` often equals a JOIN. The subquery is more readable in some cases; the JOIN often optimizes better. Know both.") };
const Q_SUB_EXISTS = { question: P("¿Qué comprueba `WHERE EXISTS (subconsulta)`?", "What does `WHERE EXISTS (subquery)` check?"),
  options: [P("Si la subconsulta devuelve AL MENOS una fila", "Whether the subquery returns AT LEAST one row"), P("El número exacto de filas", "The exact number of rows"), P("La media", "The average"), P("Un JOIN", "A JOIN")],
  correct: 0, explanation: P("`EXISTS` da verdadero si la subconsulta (normalmente correlacionada) produce alguna fila. Útil para '¿existe alguna relación?'.", "`EXISTS` is true if the subquery (usually correlated) produces any row. Handy for 'is there any related row?'.") };
const Q_SUB_ORDER = { question: P("En `... WHERE poder > (SELECT AVG(poder) ...) ORDER BY poder DESC`, ¿qué ocurre primero?", "In `... WHERE poder > (SELECT AVG(poder) ...) ORDER BY poder DESC`, what happens first?"),
  options: [P("Se filtra con la subconsulta y luego se ordena el resultado", "It filters with the subquery and then sorts the result"), P("Se ordena y luego se filtra", "It sorts and then filters"), P("Sólo ordena", "It only sorts"), P("Da error", "It errors")],
  correct: 0, explanation: P("Primero el WHERE (con su subconsulta) decide qué filas pasan; después el ORDER BY las ordena. Las cláusulas mantienen su orden habitual.", "First the WHERE (with its subquery) decides which rows pass; then ORDER BY sorts them. The clauses keep their usual order.") };

export const SYL_SQL_8: Syllabus = {
  c8_uruk_arquero: { kind: "battle", questions: [Q_SUB, Q_SUB_SCALAR, Q_SUB_SET] },
  c8_orco_saqueador: { kind: "battle", questions: [Q_SUB_IN, Q_SUB_EQ, Q_SUB_ORDER] },
  c8_uruk_espadachin: { kind: "battle", questions: [Q_SUB_FROM, Q_SUB_VS_JOIN, Q_SUB_EXISTS] },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("El informe final: entre los que superan la media de poder, cuenta cuántos hay de cada raza. Subconsulta + agrupación.", "The final report: among those above the average power, count how many of each race. Subquery + grouping."),
    challenge: {
      support_code: BASE,
      topic: P("Subconsulta + GROUP BY (capstone)", "Subquery + GROUP BY (capstone)"),
      instructions: ins("Devuelve `raza` y `COUNT(*)` de los personajes cuyo `poder` sea MAYOR que la media (`(SELECT AVG(poder) FROM personajes)`), agrupando por `raza` y ordenando por `raza`.", "Return `raza` and `COUNT(*)` of characters whose `poder` is GREATER than the average (`(SELECT AVG(poder) FROM personajes)`), grouping by `raza` and ordering by `raza`."),
      starter_code: START,
      blocks: ["SELECT raza, COUNT(*)", "FROM personajes", "WHERE poder > (SELECT AVG(poder) FROM personajes)", "GROUP BY raza", "ORDER BY raza;", "HAVING poder > (SELECT AVG(poder) FROM personajes)"],
      hints: [P("Filtra con la subconsulta en el `WHERE`, no en el HAVING.", "Filter with the subquery in the `WHERE`, not the HAVING."), P("Luego `GROUP BY raza`.", "Then `GROUP BY raza`.")],
      test_cases: [{ input: "sobre la media, por raza", expected: [["elfo",2],["enano",1],["humano",1],["maia",1]], description: P("Fuertes por raza", "Strong per race") }],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: P("El Pergamino de la Subconsulta", "The Scroll of the Subquery"),
    lore_intro: P("Un último pergamino enseña a anidar consultas dentro de consultas.", "A last scroll teaches how to nest queries inside queries."),
    scroll: {
      topic: P("SQL: subconsultas", "SQL: subqueries"),
      sections: [
        { heading: P("Subconsulta escalar", "Scalar subquery"), body: P("Un `SELECT` entre paréntesis que da UN valor, usado en el WHERE: comparar cada fila con un resumen del conjunto.", "A `SELECT` in parentheses giving ONE value, used in the WHERE: comparing each row against a set summary."), code: "WHERE poder > (SELECT AVG(poder) FROM personajes);" },
        { heading: P("Subconsulta de conjunto", "Set subquery"), body: P("`IN (subconsulta)` compara con el conjunto de valores que devuelve; `= (subconsulta)` exige que devuelva uno solo.", "`IN (subquery)` compares against the returned set; `= (subquery)` requires it to return exactly one."), code: "WHERE reino IN\n  (SELECT reino FROM personajes WHERE raza = 'hobbit');" },
        { heading: P("Combinar con todo", "Combining with everything"), body: P("La subconsulta se mezcla con GROUP BY, ORDER BY… Muchas equivalen a un JOIN; conviene conocer ambos caminos.", "Subqueries mix with GROUP BY, ORDER BY… Many equal a JOIN; it's good to know both paths."), code: "SELECT raza, COUNT(*)\nFROM personajes\nWHERE poder > (SELECT AVG(poder) FROM personajes)\nGROUP BY raza;" },
      ],
      keyTakeaway: P("Una subconsulta es un SELECT anidado: escalar (comparar con la media/máximo), o de conjunto con IN. Se combina con WHERE/GROUP BY/ORDER BY; muchas equivalen a un JOIN.", "A subquery is a nested SELECT: scalar (compare with the mean/max), or a set with IN. It combines with WHERE/GROUP BY/ORDER BY; many equal a JOIN."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P("Sólo tientan al Anillo los de poder por encima de la media. Ordénalos de mayor a menor.", "Only those above average power tempt the Ring. Rank them highest to lowest."),
    challenge: {
      support_code: BASE,
      topic: P("Subconsulta escalar (AVG)", "Scalar subquery (AVG)"),
      instructions: ins("Devuelve `nombre` y `poder` de los personajes cuyo `poder` sea MAYOR que la media de todos (`(SELECT AVG(poder) FROM personajes)`), ordenados por `poder` de mayor a menor.", "Return `nombre` and `poder` of characters whose `poder` is GREATER than everyone's average (`(SELECT AVG(poder) FROM personajes)`), sorted by `poder` highest to lowest."),
      starter_code: START,
      blocks: ["SELECT nombre, poder", "FROM personajes", "WHERE poder > (SELECT AVG(poder) FROM personajes)", "ORDER BY poder DESC;", "WHERE poder > AVG(poder)"],
      hints: [P("La media va en una subconsulta: `(SELECT AVG(poder) FROM personajes)`.", "The average goes in a subquery: `(SELECT AVG(poder) FROM personajes)`."), P("No puedes usar `AVG(poder)` suelto en el WHERE.", "You can't use bare `AVG(poder)` in the WHERE.")],
      test_cases: [{ input: "sobre la media", expected: [["Gandalf",95],["Galadriel",90],["Aragorn",80],["Legolas",75],["Gimli",70]], description: P("Poder > media", "Power > average") }],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("La visión muestra a quienes comparten reino con algún hobbit. Usa una subconsulta con IN.", "The vision shows those who share a reino with some hobbit. Use a subquery with IN."),
    challenge: {
      support_code: BASE,
      topic: P("Subconsulta con IN", "Subquery with IN"),
      instructions: ins("Devuelve el `nombre` de los personajes cuyo `reino` esté ENTRE los reinos donde vive algún hobbit (`reino IN (SELECT reino FROM personajes WHERE raza = 'hobbit')`), ordenado por `nombre`.", "Return the `nombre` of characters whose `reino` is AMONG the reinos where some hobbit lives (`reino IN (SELECT reino FROM personajes WHERE raza = 'hobbit')`), ordered by `nombre`."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE reino IN (SELECT reino FROM personajes WHERE raza = 'hobbit')", "ORDER BY nombre;", "WHERE reino = (SELECT reino FROM personajes WHERE raza = 'hobbit')"],
      hints: [P("`IN (subconsulta)` compara con un conjunto de reinos.", "`IN (subquery)` compares against a set of reinos.")],
      test_cases: [{ input: "reino con hobbits", expected: [["Frodo"],["Sam"]], description: P("Misma tierra que un hobbit", "Same land as a hobbit") }],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("¿Quién es el más poderoso de todos? Tráelo con una subconsulta del máximo.", "Who is the most powerful of all? Fetch them with a max subquery."),
    challenge: {
      support_code: BASE,
      topic: P("Subconsulta con = (MAX)", "Subquery with = (MAX)"),
      instructions: ins("Devuelve el `nombre` del personaje cuyo `poder` sea IGUAL al máximo (`poder = (SELECT MAX(poder) FROM personajes)`).", "Return the `nombre` of the character whose `poder` EQUALS the maximum (`poder = (SELECT MAX(poder) FROM personajes)`)."),
      starter_code: START,
      blocks: ["SELECT nombre", "FROM personajes", "WHERE poder = (SELECT MAX(poder) FROM personajes);", "WHERE poder = MAX(poder)"],
      hints: [P("El máximo va en subconsulta: `= (SELECT MAX(poder) FROM personajes)`.", "The max goes in a subquery: `= (SELECT MAX(poder) FROM personajes)`.")],
      test_cases: [{ input: "el más fuerte", expected: [["Gandalf"]], description: P("El de poder máximo", "The one with max power") }],
    },
  },
};
