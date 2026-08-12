import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de AWS sobre la narrativa compartida de la Comunidad. No hay nube real:
 * los retos se EJECUTAN contra un SDK de AWS SIMULADO en memoria (S3, DynamoDB,
 * SQS, SNS) y un motor de IAM que evalúa políticas, todo en JS (ver
 * `lib/game/aws-evaluator.ts`). El jugador escribe políticas IAM como objetos JS
 * (`simular(politica, req)` → "Allow"/"Deny") y código contra `s3`/`ddb`/`sqs`/
 * `sns` (async). En los tests dispone de helpers de inspección: `verObjeto`,
 * `verClaves`, `verItem`, `verItems`, `verCola`, `verTopico`. Cada test corre
 * contra un entorno limpio. Bilingüe ES/EN. ARCHIVO GENERADO (gen-aws en scratchpad).
 */

const P = (es: string, en: string) => ({ es, en });
const p = P;

export const SYL_AWS_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué guarda Amazon S3?", "What does Amazon S3 store?"),
        options: [
          p("Objetos (archivos) en buckets", "Objects (files) in buckets"),
          p("Filas de una base de datos", "Rows of a database"),
          p("Máquinas virtuales", "Virtual machines"),
          p("Funciones", "Functions"),
        ],
        correct: 0,
        explanation: p("S3 (Simple Storage Service) es almacenamiento de OBJETOS: guardas archivos (objetos) dentro de contenedores llamados buckets.", "S3 (Simple Storage Service) is OBJECT storage: you keep files (objects) inside containers called buckets."),
      },
      {
        question: p("¿Qué es un bucket?", "What is a bucket?"),
        options: [
          p("Un contenedor con nombre único donde viven los objetos", "A uniquely named container where objects live"),
          p("Un tipo de servidor", "A kind of server"),
          p("Una fila", "A row"),
          p("Una política", "A policy"),
        ],
        correct: 0,
        explanation: p("Un bucket es el contenedor de S3. Su nombre es único globalmente y dentro guardas objetos identificados por una clave.", "A bucket is the S3 container. Its name is globally unique and inside you keep objects identified by a key."),
      },
      {
        question: p("¿Cómo se identifica un objeto dentro de un bucket?", "How is an object identified inside a bucket?"),
        options: [
          p("Por su clave (Key)", "By its key (Key)"),
          p("Por su color", "By its color"),
          p("Por su tamaño", "By its size"),
          p("Por la fecha", "By the date"),
        ],
        correct: 0,
        explanation: p("Cada objeto tiene una CLAVE (Key) única en el bucket, como `mapas/rohan.png`. Bucket + Key localizan el objeto.", "Each object has a unique KEY within the bucket, like `mapas/rohan.png`. Bucket + Key locate the object."),
      }
    ],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué operación sube un objeto a S3?", "Which operation uploads an object to S3?"),
        options: [
          p("putObject", "putObject"),
          p("insertRow", "insertRow"),
          p("upload()", "upload()"),
          p("saveFile", "saveFile"),
        ],
        correct: 0,
        explanation: p("`s3.putObject({ Bucket, Key, Body })` guarda un objeto. En este simulador devuelve una promesa (usa `await`).", "`s3.putObject({ Bucket, Key, Body })` stores an object. In this simulator it returns a promise (use `await`)."),
      },
      {
        question: p("¿Qué devuelve `getObject`?", "What does `getObject` return?"),
        options: [
          p("Un objeto con la propiedad `Body`", "An object with a `Body` property"),
          p("Sólo texto", "Just text"),
          p("Un número", "A number"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`s3.getObject({ Bucket, Key })` devuelve `{ Body }` con el contenido. Si la clave no existe, lanza un error.", "`s3.getObject({ Bucket, Key })` returns `{ Body }` with the content. If the key doesn't exist, it throws."),
      },
      {
        question: p("¿Las llamadas al SDK son asíncronas?", "Are SDK calls asynchronous?"),
        options: [
          p("Sí: devuelven promesas, se usan con `await`", "Yes: they return promises, used with `await`"),
          p("No, son instantáneas", "No, they're instant"),
          p("Sólo putObject", "Only putObject"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("Las operaciones de red son asíncronas: devuelven promesas. Por eso las funciones que las usan son `async` y llevan `await`.", "Network operations are asynchronous: they return promises. That's why functions using them are `async` and use `await`."),
      }
    ],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué hace `listObjectsV2` con un `Prefix`?", "What does `listObjectsV2` do with a `Prefix`?"),
        options: [
          p("Lista sólo las claves que empiezan por ese prefijo", "Lists only keys starting with that prefix"),
          p("Borra objetos", "Deletes objects"),
          p("Crea un bucket", "Creates a bucket"),
          p("Ordena al azar", "Sorts randomly"),
        ],
        correct: 0,
        explanation: p("`listObjectsV2({ Bucket, Prefix })` devuelve `{ Contents }` con las claves que empiezan por el prefijo: simula 'carpetas'.", "`listObjectsV2({ Bucket, Prefix })` returns `{ Contents }` with keys starting with the prefix: it simulates 'folders'."),
      },
      {
        question: p("¿S3 tiene carpetas de verdad?", "Does S3 have real folders?"),
        options: [
          p("No: son un espejismo de las claves con `/`", "No: they're an illusion from keys with `/`"),
          p("Sí, como un disco", "Yes, like a disk"),
          p("Sólo en la consola", "Only in the console"),
          p("Sí, obligatorias", "Yes, mandatory"),
        ],
        correct: 0,
        explanation: p("S3 es plano: `mapas/rohan` es sólo una clave. El `/` y los prefijos SIMULAN carpetas, pero no existen como tales.", "S3 is flat: `mapas/rohan` is just a key. The `/` and prefixes SIMULATE folders, but they don't exist as such."),
      },
      {
        question: p("¿Qué devuelve `deleteObject` si la clave no existe?", "What does `deleteObject` return if the key doesn't exist?"),
        options: [
          p("Termina sin error (idempotente)", "Completes without error (idempotent)"),
          p("Lanza siempre", "Always throws"),
          p("Crea la clave", "Creates the key"),
          p("Devuelve el objeto", "Returns the object"),
        ],
        correct: 0,
        explanation: p("Borrar en S3 es idempotente: borrar algo que no está no falla. `getObject`, en cambio, sí lanza si falta la clave.", "Deleting in S3 is idempotent: deleting something absent doesn't fail. `getObject`, in contrast, throws if the key is missing."),
      }
    ],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("El Nazgûl rebusca en el archivo: lista las claves que empiezan por un prefijo.", "The Nazgûl searches the archive: list the keys starting with a prefix."),
    challenge: {
      topic: P("S3: listObjectsV2 con Prefix", "S3: listObjectsV2 with Prefix"),
      instructions: P("Escribe `async function listar(bucket, prefijo)` que devuelva un array con las claves cuyo nombre empieza por `prefijo`. `s3.listObjectsV2({ Bucket, Prefix })` devuelve `{ Contents: [{ Key }] }`.", "Write `async function listar(bucket, prefijo)` returning an array of the keys starting with `prefijo`. `s3.listObjectsV2({ Bucket, Prefix })` returns `{ Contents: [{ Key }] }`."),
      starter_code: "async function listar(bucket, prefijo) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'archivo', Key: 'mapas/rohan' });\nawait s3.putObject({ Bucket: 'archivo', Key: 'mapas/eriador' });\nawait s3.putObject({ Bucket: 'archivo', Key: 'cartas/gandalf' });",
      blocks: [
        "async function listar(bucket, prefijo) {",
        "  const r = await s3.listObjectsV2({ Bucket: bucket, Prefix: prefijo });",
        "  return r.Contents.map(c => c.Key);",
        "}",
        "  return r.Contents;",
      ],
      hints: [
        P("`const r = await s3.listObjectsV2({ Bucket: bucket, Prefix: prefijo });` y `return r.Contents.map(c => c.Key);`.", "`const r = await s3.listObjectsV2({ Bucket: bucket, Prefix: prefijo });` then `return r.Contents.map(c => c.Key);`."),
      ],
      test_cases: [
        { input: "listar('archivo', 'mapas/')", expected: ["mapas/eriador","mapas/rohan"], description: P("Prefijo mapas/", "Prefix mapas/"), raw: true },
        { input: "listar('archivo', 'cartas/')", expected: ["cartas/gandalf"], description: P("Prefijo cartas/", "Prefix cartas/"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: p("El Pergamino de S3", "The Scroll of S3"),
    lore_intro: p("Un pergamino enseña a guardar y recuperar objetos en la nube.", "A scroll teaches how to store and retrieve objects in the cloud."),
    scroll: {
      topic: p("AWS: Amazon S3", "AWS: Amazon S3"),
      sections: [
        { heading: p("Buckets y objetos", "Buckets and objects"), body: p("S3 guarda objetos en buckets. Cada objeto tiene una clave (Key) única.", "S3 stores objects in buckets. Each object has a unique key (Key)."), code: "await s3.putObject({ Bucket: 'comarca', Key: 'anillo', Body: 'oro' });" },
        { heading: p("Leer", "Read"), body: p("`getObject` devuelve `{ Body }`; lanza si la clave no existe.", "`getObject` returns `{ Body }`; it throws if the key doesn't exist."), code: "const r = await s3.getObject({ Bucket: 'comarca', Key: 'anillo' });\nr.Body; // 'oro'" },
        { heading: p("Listar por prefijo", "List by prefix"), body: p("`listObjectsV2` con `Prefix` filtra las claves. S3 es plano: el `/` simula carpetas.", "`listObjectsV2` with `Prefix` filters keys. S3 is flat: `/` simulates folders."), code: "const r = await s3.listObjectsV2({ Bucket: 'archivo', Prefix: 'mapas/' });\nr.Contents.map(c => c.Key);" },
      ],
      keyTakeaway: p("S3 guarda objetos (Bucket+Key). putObject sube, getObject lee (lanza si falta), listObjectsV2 con Prefix filtra. Todo async.", "S3 stores objects (Bucket+Key). putObject uploads, getObject reads (throws if missing), listObjectsV2 with Prefix filters. All async."),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing the Flight"),
    lore_intro: P("Guarda los enseres en la nube antes de partir: sube un objeto a S3.", "Store your belongings in the cloud before leaving: upload an object to S3."),
    challenge: {
      topic: P("S3: putObject", "S3: putObject"),
      instructions: P("Escribe `async function guardar(bucket, clave, contenido)` que suba un objeto a S3 con `s3.putObject({ Bucket, Key, Body })` (Body = contenido).", "Write `async function guardar(bucket, clave, contenido)` that uploads an object to S3 with `s3.putObject({ Bucket, Key, Body })` (Body = contenido)."),
      starter_code: "async function guardar(bucket, clave, contenido) {\n\n}\n",
      blocks: [
        "async function guardar(bucket, clave, contenido) {",
        "  await s3.putObject({ Bucket: bucket, Key: clave, Body: contenido });",
        "}",
        "  s3.putObject({ Bucket: bucket, Key: clave, Body: contenido });",
      ],
      hints: [
        P("Recuerda el `await`: `await s3.putObject({ Bucket: bucket, Key: clave, Body: contenido });`.", "Remember the `await`: `await s3.putObject({ Bucket: bucket, Key: clave, Body: contenido });`."),
      ],
      test_cases: [
        { input: "(async () => { await guardar('comarca', 'anillo', 'oro'); return verObjeto('comarca', 'anillo'); })()", expected: "oro", description: P("Guarda 'oro'", "Stores 'oro'"), raw: true },
        { input: "(async () => { await guardar('comarca', 'mapa', 'norte'); return verObjeto('comarca', 'mapa'); })()", expected: "norte", description: P("Guarda 'norte'", "Stores 'norte'"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P("Recupera un mensaje guardado en la nube: lee un objeto de S3.", "Retrieve a message stored in the cloud: read an object from S3."),
    challenge: {
      topic: P("S3: getObject", "S3: getObject"),
      instructions: P("Escribe `async function leer(bucket, clave)` que devuelva el `Body` del objeto (`s3.getObject` devuelve `{ Body }`).", "Write `async function leer(bucket, clave)` returning the object's `Body` (`s3.getObject` returns `{ Body }`)."),
      starter_code: "async function leer(bucket, clave) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'comarca', Key: 'carta', Body: 'querido Frodo' });\nawait s3.putObject({ Bucket: 'comarca', Key: 'lista', Body: 'pan, queso' });",
      blocks: [
        "async function leer(bucket, clave) {",
        "  const r = await s3.getObject({ Bucket: bucket, Key: clave });",
        "  return r.Body;",
        "}",
        "  return await s3.getObject({ Bucket: bucket, Key: clave });",
      ],
      hints: [
        P("`const r = await s3.getObject({ Bucket: bucket, Key: clave }); return r.Body;`.", "`const r = await s3.getObject({ Bucket: bucket, Key: clave }); return r.Body;`."),
      ],
      test_cases: [
        { input: "leer('comarca', 'carta')", expected: "querido Frodo", description: P("Lee la carta", "Reads the letter"), raw: true },
        { input: "leer('comarca', 'lista')", expected: "pan, queso", description: P("Lee la lista", "Reads the list"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_2: Syllabus = {
  c2_raiz: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué controla IAM?", "What does IAM control?"),
        options: [
          p("Quién puede hacer qué sobre qué recurso", "Who can do what on which resource"),
          p("El almacenamiento", "Storage"),
          p("La red", "The network"),
          p("El precio", "The price"),
        ],
        correct: 0,
        explanation: p("IAM (Identity and Access Management) gestiona permisos: define qué acciones se permiten o niegan sobre qué recursos.", "IAM (Identity and Access Management) manages permissions: it defines which actions are allowed or denied on which resources."),
      },
      {
        question: p("¿Qué tres campos tiene un `Statement` básico?", "What three fields does a basic `Statement` have?"),
        options: [
          p("Effect, Action y Resource", "Effect, Action and Resource"),
          p("Name, Type y Value", "Name, Type and Value"),
          p("User, Pass y Host", "User, Pass and Host"),
          p("Bucket, Key y Body", "Bucket, Key and Body"),
        ],
        correct: 0,
        explanation: p("Un statement de política tiene `Effect` (Allow/Deny), `Action` (qué operación) y `Resource` (sobre qué ARN).", "A policy statement has `Effect` (Allow/Deny), `Action` (which operation) and `Resource` (on which ARN)."),
      },
      {
        question: p("Si NINGÚN statement casa, ¿qué pasa?", "If NO statement matches, what happens?"),
        options: [
          p("Se deniega (denegación por defecto)", "It's denied (default deny)"),
          p("Se permite", "It's allowed"),
          p("Error", "Error"),
          p("Depende del día", "Depends on the day"),
        ],
        correct: 0,
        explanation: p("AWS deniega por defecto: sin un Allow explícito que case, la acción se rechaza. Hay que conceder permisos a propósito.", "AWS denies by default: without an explicit matching Allow, the action is rejected. You must grant permissions on purpose."),
      }
    ],
  },
  c2_niebla: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es un ARN?", "What is an ARN?"),
        options: [
          p("El identificador único de un recurso de AWS", "The unique identifier of an AWS resource"),
          p("Una contraseña", "A password"),
          p("Un tipo de bucket", "A kind of bucket"),
          p("Una región", "A region"),
        ],
        correct: 0,
        explanation: p("Un ARN (Amazon Resource Name) identifica un recurso, p. ej. `arn:aws:s3:::comarca/mapa.png`. Se usa en `Resource`.", "An ARN (Amazon Resource Name) identifies a resource, e.g. `arn:aws:s3:::comarca/mapa.png`. It's used in `Resource`."),
      },
      {
        question: p("¿Qué formato tiene una `Action`?", "What format does an `Action` have?"),
        options: [
          p("`servicio:Operación`, p. ej. `s3:GetObject`", "`service:Operation`, e.g. `s3:GetObject`"),
          p("Sólo el verbo", "Just the verb"),
          p("Una URL", "A URL"),
          p("Un número", "A number"),
        ],
        correct: 0,
        explanation: p("Las acciones son `servicio:Operación`: `s3:GetObject`, `dynamodb:PutItem`. El prefijo dice el servicio.", "Actions are `service:Operation`: `s3:GetObject`, `dynamodb:PutItem`. The prefix names the service."),
      },
      {
        question: p("¿Puede `Effect` ser algo distinto de Allow/Deny?", "Can `Effect` be anything other than Allow/Deny?"),
        options: [
          p("No: sólo `Allow` o `Deny`", "No: only `Allow` or `Deny`"),
          p("Sí, también `Maybe`", "Yes, also `Maybe`"),
          p("Sí, cualquier texto", "Yes, any text"),
          p("Sólo `Allow`", "Only `Allow`"),
        ],
        correct: 0,
        explanation: p("`Effect` es exactamente `Allow` o `Deny`. No hay término medio; lo que no se permite queda denegado.", "`Effect` is exactly `Allow` or `Deny`. There's no middle ground; whatever isn't allowed stays denied."),
      }
    ],
  },
  c2_sauce: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué significa `Action: 's3:*'`?", "What does `Action: 's3:*'` mean?"),
        options: [
          p("Todas las acciones de S3", "All S3 actions"),
          p("Sólo GetObject", "Only GetObject"),
          p("Ninguna", "None"),
          p("Sólo lectura", "Read only"),
        ],
        correct: 0,
        explanation: p("El comodín `*` cubre todo: `s3:*` son TODAS las operaciones de S3. `s3:Get*` sería todas las que empiezan por Get.", "The wildcard `*` covers everything: `s3:*` is ALL S3 operations. `s3:Get*` would be all starting with Get."),
      },
      {
        question: p("¿Qué cubre `Resource: 'arn:aws:s3:::comarca/*'`?", "What does `Resource: 'arn:aws:s3:::comarca/*'` cover?"),
        options: [
          p("Cualquier objeto dentro del bucket comarca", "Any object inside the comarca bucket"),
          p("Sólo el bucket, no los objetos", "Only the bucket, not the objects"),
          p("Todos los buckets", "All buckets"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("El `*` final abarca todas las claves del bucket: `comarca/*` = cualquier objeto en comarca.", "The trailing `*` spans all keys in the bucket: `comarca/*` = any object in comarca."),
      },
      {
        question: p("¿El comodín funciona en Action y en Resource?", "Does the wildcard work in Action and Resource?"),
        options: [
          p("Sí, en ambos", "Yes, in both"),
          p("Sólo en Action", "Only in Action"),
          p("Sólo en Resource", "Only in Resource"),
          p("En ninguno", "In neither"),
        ],
        correct: 0,
        explanation: p("`*` se puede usar tanto en `Action` (`s3:*`) como en `Resource` (`.../*`) para abarcar conjuntos.", "`*` can be used in both `Action` (`s3:*`) and `Resource` (`.../*`) to span sets."),
      }
    ],
  },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Señor de los Túmulos", "The Lord of the Barrows"),
    lore_intro: P("Concede leer Y escribir, pero nada más, con una lista de acciones.", "Grant read AND write, but nothing else, with a list of actions."),
    challenge: {
      topic: P("IAM: lista de acciones", "IAM: list of actions"),
      instructions: P("Define `const politica` que PERMITA las acciones `s3:GetObject` y `s3:PutObject` (un array) sobre `arn:aws:s3:::comarca/*`.", "Define `const politica` that ALLOWS the actions `s3:GetObject` and `s3:PutObject` (an array) on `arn:aws:s3:::comarca/*`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: ['s3:GetObject', 's3:PutObject'], Resource: 'arn:aws:s3:::comarca/*' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::comarca/*' }",
      ],
      hints: [
        P("`Action` puede ser un array: `Action: ['s3:GetObject', 's3:PutObject']`.", "`Action` can be an array: `Action: ['s3:GetObject', 's3:PutObject']`."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/x' })", expected: "Allow", description: P("Get: Allow", "Get: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:PutObject', resource: 'arn:aws:s3:::comarca/x' })", expected: "Allow", description: P("Put: Allow", "Put: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:DeleteObject', resource: 'arn:aws:s3:::comarca/x' })", expected: "Deny", description: P("Delete: Deny", "Delete: Deny"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: p("El Pergamino de IAM", "The Scroll of IAM"),
    lore_intro: p("Un pergamino revela quién puede hacer qué en la nube.", "A scroll reveals who can do what in the cloud."),
    scroll: {
      topic: p("AWS: IAM y políticas", "AWS: IAM and policies"),
      sections: [
        { heading: p("Statement", "Statement"), body: p("Una política tiene statements con Effect, Action y Resource.", "A policy has statements with Effect, Action and Resource."), code: "{ Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/mapa.png' }" },
        { heading: p("Comodines", "Wildcards"), body: p("`*` abarca conjuntos: `s3:*` toda acción de S3, `comarca/*` todo objeto del bucket.", "`*` spans sets: `s3:*` every S3 action, `comarca/*` every object in the bucket."), code: "{ Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::comarca/*' }" },
        { heading: p("Denegación por defecto", "Default deny"), body: p("Sin un Allow que case, se deniega. Simula con `simular(politica, req)`.", "Without a matching Allow, it's denied. Simulate with `simular(politica, req)`."), code: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/x' }); // 'Allow'|'Deny'" },
      ],
      keyTakeaway: p("Una política concede/niega con Effect+Action+Resource. `*` abarca conjuntos. Sin Allow explícito, denegación por defecto.", "A policy grants/denies with Effect+Action+Resource. `*` spans sets. Without an explicit Allow, default deny."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre-Sauce", "Old Man Willow"),
    lore_intro: P("Concede el permiso justo: leer un objeto concreto de S3.", "Grant exactly one permission: read a specific S3 object."),
    challenge: {
      topic: P("IAM: Allow básico", "IAM: basic Allow"),
      instructions: P("Define `const politica` (con `Version` y `Statement`) que PERMITA `s3:GetObject` sobre el recurso `arn:aws:s3:::comarca/mapa.png` y nada más.", "Define `const politica` (with `Version` and `Statement`) that ALLOWS `s3:GetObject` on the resource `arn:aws:s3:::comarca/mapa.png` and nothing else."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/mapa.png' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:*', Resource: '*' }",
      ],
      hints: [
        P("Un statement: `{ Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/mapa.png' }`.", "One statement: `{ Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/mapa.png' }`."),
        P("Lo que no se permite queda denegado por defecto.", "Whatever isn't allowed is denied by default."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/mapa.png' })", expected: "Allow", description: P("Permite el Get exacto", "Allows the exact Get"), raw: true },
        { input: "simular(politica, { action: 's3:PutObject', resource: 'arn:aws:s3:::comarca/mapa.png' })", expected: "Deny", description: P("Otra acción: Deny", "Another action: Deny"), raw: true },
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::mordor/mapa.png' })", expected: "Deny", description: P("Otro recurso: Deny", "Another resource: Deny"), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Espectro del Túmulo", "The Barrow-wight"),
    lore_intro: P("Abre todas las acciones sobre un mismo objeto con un comodín.", "Open all actions on a single object with a wildcard."),
    challenge: {
      topic: P("IAM: comodín en Action", "IAM: wildcard in Action"),
      instructions: P("Define `const politica` que PERMITA CUALQUIER acción de S3 (`s3:*`) sobre `arn:aws:s3:::comarca/mapa.png`.", "Define `const politica` that ALLOWS ANY S3 action (`s3:*`) on `arn:aws:s3:::comarca/mapa.png`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::comarca/mapa.png' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/mapa.png' }",
      ],
      hints: [
        P("El comodín `*` en la acción: `Action: 's3:*'`.", "The wildcard `*` in the action: `Action: 's3:*'`."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/mapa.png' })", expected: "Allow", description: P("Get: Allow", "Get: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:PutObject', resource: 'arn:aws:s3:::comarca/mapa.png' })", expected: "Allow", description: P("Put: Allow", "Put: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::mordor/x' })", expected: "Deny", description: P("Otro recurso: Deny", "Another resource: Deny"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Bombadil", "Bombadil's Song"),
    lore_intro: P("Permite leer cualquier objeto del bucket con un comodín en el recurso.", "Allow reading any object in the bucket with a wildcard in the resource."),
    challenge: {
      topic: P("IAM: comodín en Resource", "IAM: wildcard in Resource"),
      instructions: P("Define `const politica` que PERMITA `s3:GetObject` sobre CUALQUIER objeto del bucket comarca: `arn:aws:s3:::comarca/*`.", "Define `const politica` that ALLOWS `s3:GetObject` on ANY object in the comarca bucket: `arn:aws:s3:::comarca/*`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca/*' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::comarca' }",
      ],
      hints: [
        P("El `*` final abarca todas las claves: `Resource: 'arn:aws:s3:::comarca/*'`.", "The trailing `*` spans all keys: `Resource: 'arn:aws:s3:::comarca/*'`."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/mapa.png' })", expected: "Allow", description: P("Un objeto: Allow", "One object: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/cartas/1' })", expected: "Allow", description: P("Otro objeto: Allow", "Another object: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::mordor/mapa.png' })", expected: "Deny", description: P("Otro bucket: Deny", "Another bucket: Deny"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_3: Syllabus = {
  c3_ferny: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué tipo de base de datos es DynamoDB?", "What kind of database is DynamoDB?"),
        options: [
          p("NoSQL de clave-valor / documentos", "NoSQL key-value / document"),
          p("Relacional (SQL)", "Relational (SQL)"),
          p("Un fichero CSV", "A CSV file"),
          p("Una cola", "A queue"),
        ],
        correct: 0,
        explanation: p("DynamoDB es NoSQL gestionada: guarda ITEMS (documentos) en TABLAS, identificados por una clave de partición.", "DynamoDB is managed NoSQL: it stores ITEMS (documents) in TABLES, identified by a partition key."),
      },
      {
        question: p("En estas tablas, ¿cuál es la clave de partición?", "In these tables, what is the partition key?"),
        options: [
          p("El atributo `id`", "The `id` attribute"),
          p("El primero por orden alfabético", "The first alphabetically"),
          p("No hay", "There isn't one"),
          p("`nombre`", "`nombre`"),
        ],
        correct: 0,
        explanation: p("Aquí la clave de partición es `id`. `get`/`delete` reciben `Key: { id }`, y `put` reemplaza el item con ese `id`.", "Here the partition key is `id`. `get`/`delete` take `Key: { id }`, and `put` replaces the item with that `id`."),
      },
      {
        question: p("¿Qué hace `put` si ya existe un item con ese `id`?", "What does `put` do if an item with that `id` already exists?"),
        options: [
          p("Lo reemplaza por completo (upsert)", "It replaces it entirely (upsert)"),
          p("Lanza un error", "Throws an error"),
          p("Crea un duplicado", "Creates a duplicate"),
          p("Lo ignora", "Ignores it"),
        ],
        correct: 0,
        explanation: p("`put` es un upsert: si la clave existe, sobreescribe el item entero; si no, lo crea. No duplica.", "`put` is an upsert: if the key exists it overwrites the whole item; otherwise it creates it. No duplicates."),
      }
    ],
  },
  c3_espia_nazgul: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué devuelve `get` si no encuentra el item?", "What does `get` return if it doesn't find the item?"),
        options: [
          p("`{ Item: undefined }`", "`{ Item: undefined }`"),
          p("Lanza", "Throws"),
          p("`{ Item: null }` siempre", "`{ Item: null }` always"),
          p("`[]`", "`[]`"),
        ],
        correct: 0,
        explanation: p("`get` no lanza si falta: devuelve `{ Item: undefined }`. Conviene comprobar `if (!r.Item)`.", "`get` doesn't throw when missing: it returns `{ Item: undefined }`. Best to check `if (!r.Item)`."),
      },
      {
        question: p("¿Qué devuelve `scan`?", "What does `scan` return?"),
        options: [
          p("`{ Items }` con TODOS los items de la tabla", "`{ Items }` with ALL the table's items"),
          p("Un solo item", "A single item"),
          p("El número de items", "The item count"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`scan({ TableName })` recorre toda la tabla y devuelve `{ Items }`. Luego filtras en JS lo que necesites.", "`scan({ TableName })` reads the whole table and returns `{ Items }`. Then you filter in JS as needed."),
      },
      {
        question: p("Para quedarte con los items que cumplen algo tras un scan, usas…", "To keep the items matching a condition after a scan, you use…"),
        options: [
          p("`Items.filter(...)` en JS", "`Items.filter(...)` in JS"),
          p("otro `get`", "another `get`"),
          p("`put`", "`put`"),
          p("nada", "nothing"),
        ],
        correct: 0,
        explanation: p("Tras `scan`, filtras el array `Items` con `.filter` como cualquier lista de JS.", "After `scan`, you filter the `Items` array with `.filter` like any JS list."),
      }
    ],
  },
  c3_montaraz_falso: {
    kind: "battle",
    questions: [
      {
        question: p("El patrón leer-modificar-escribir consiste en…", "The read-modify-write pattern is…"),
        options: [
          p("`get`, cambiar el item y volver a `put`", "`get`, change the item and `put` it back"),
          p("borrar y recrear siempre", "always delete and recreate"),
          p("sólo `scan`", "just `scan`"),
          p("no tocar la tabla", "not touching the table"),
        ],
        correct: 0,
        explanation: p("Para actualizar campos: lees con `get`, fusionas los cambios (`{ ...r.Item, ...cambios }`) y guardas con `put`.", "To update fields: read with `get`, merge changes (`{ ...r.Item, ...cambios }`) and save with `put`."),
      },
      {
        question: p("¿Cómo fusionas cambios sobre un item existente?", "How do you merge changes onto an existing item?"),
        options: [
          p("Con el spread: `{ ...item, ...cambios }`", "With spread: `{ ...item, ...cambios }`"),
          p("Concatenando strings", "Concatenating strings"),
          p("Con `push`", "With `push`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("El spread crea un objeto nuevo con los campos del original y los cambios encima: `{ ...item, ...cambios }`.", "Spread builds a new object with the original fields and the changes on top: `{ ...item, ...cambios }`."),
      },
      {
        question: p("¿`delete` sobre una clave inexistente falla?", "Does `delete` on a missing key fail?"),
        options: [
          p("No: no hace nada (idempotente)", "No: it does nothing (idempotent)"),
          p("Sí, lanza", "Yes, it throws"),
          p("Crea el item", "Creates the item"),
          p("Borra toda la tabla", "Deletes the whole table"),
        ],
        correct: 0,
        explanation: p("`delete` es idempotente: si la clave no está, simplemente no borra nada y no falla.", "`delete` is idempotent: if the key is absent, it just deletes nothing and doesn't fail."),
      }
    ],
  },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Rey Brujo Resurgido", "The Witch-king Reborn"),
    lore_intro: P("Actualiza un personaje sin perder sus otros campos: leer-modificar-escribir.", "Update a character without losing its other fields: read-modify-write."),
    challenge: {
      topic: P("DynamoDB: leer-modificar-escribir", "DynamoDB: read-modify-write"),
      instructions: P("Escribe `async function fusionar(id, cambios)` que lea el item por `id`, le aplique `cambios` (sin perder los demás campos) y lo vuelva a guardar con `put`.", "Write `async function fusionar(id, cambios)` that reads the item by `id`, applies `cambios` (keeping the other fields) and saves it back with `put`."),
      starter_code: "async function fusionar(id, cambios) {\n\n}\n",
        support_code: "await ddb.put({ TableName: 'personajes', Item: { id: '1', nombre: 'Frodo', poder: 20 } });",
      blocks: [
        "async function fusionar(id, cambios) {",
        "  const r = await ddb.get({ TableName: 'personajes', Key: { id } });",
        "  const actualizado = { ...r.Item, ...cambios };",
        "  await ddb.put({ TableName: 'personajes', Item: actualizado });",
        "}",
        "  await ddb.put({ TableName: 'personajes', Item: cambios });",
      ],
      hints: [
        P("Lee: `const r = await ddb.get({ TableName: 'personajes', Key: { id } });`.", "Read: `const r = await ddb.get({ TableName: 'personajes', Key: { id } });`."),
        P("Fusiona con spread y guarda: `await ddb.put({ TableName: 'personajes', Item: { ...r.Item, ...cambios } });`.", "Merge with spread and save: `await ddb.put({ TableName: 'personajes', Item: { ...r.Item, ...cambios } });`."),
      ],
      test_cases: [
        { input: "(async () => { await fusionar('1', { poder: 99 }); return verItem('personajes', '1'); })()", expected: {"id":"1","nombre":"Frodo","poder":99}, description: P("Sube el poder a 99", "Raises power to 99"), raw: true },
        { input: "(async () => { await fusionar('1', { poder: 50 }); return (await verItems('personajes')).length; })()", expected: 1, description: P("Sigue habiendo 1 item", "Still 1 item"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: p("El Pergamino de DynamoDB", "The Scroll of DynamoDB"),
    lore_intro: p("Un pergamino enseña la base de datos NoSQL de la nube.", "A scroll teaches the cloud's NoSQL database."),
    scroll: {
      topic: p("AWS: DynamoDB", "AWS: DynamoDB"),
      sections: [
        { heading: p("Items y clave", "Items and key"), body: p("DynamoDB guarda items en tablas, identificados por la clave de partición (`id`).", "DynamoDB stores items in tables, identified by the partition key (`id`)."), code: "await ddb.put({ TableName: 'personajes', Item: { id: '1', nombre: 'Frodo' } });" },
        { heading: p("Leer", "Read"), body: p("`get` por Key devuelve `{ Item }` (o `Item: undefined` si falta).", "`get` by Key returns `{ Item }` (or `Item: undefined` if missing)."), code: "const r = await ddb.get({ TableName: 'personajes', Key: { id: '1' } });\nr.Item;" },
        { heading: p("Recorrer y actualizar", "Scan and update"), body: p("`scan` da todos los items; leer-modificar-escribir actualiza campos.", "`scan` returns all items; read-modify-write updates fields."), code: "const it = (await ddb.get({ TableName: 't', Key: { id } })).Item;\nawait ddb.put({ TableName: 't', Item: { ...it, poder: 99 } });" },
      ],
      keyTakeaway: p("DynamoDB: items por clave `id`. put (upsert), get (Item o undefined), scan (todos). Actualiza con leer-modificar-escribir.", "DynamoDB: items by `id` key. put (upsert), get (Item or undefined), scan (all). Update via read-modify-write."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("El Póney Pisador", "The Prancing Pony"),
    lore_intro: P("Registra a un personaje en el libro de la posada: guarda un item.", "Register a character in the inn's ledger: store an item."),
    challenge: {
      topic: P("DynamoDB: put", "DynamoDB: put"),
      instructions: P("Escribe `async function guardar(item)` que inserte `item` en la tabla `personajes` con `ddb.put({ TableName, Item })`.", "Write `async function guardar(item)` that inserts `item` into the `personajes` table with `ddb.put({ TableName, Item })`."),
      starter_code: "async function guardar(item) {\n\n}\n",
      blocks: [
        "async function guardar(item) {",
        "  await ddb.put({ TableName: 'personajes', Item: item });",
        "}",
        "  await ddb.put({ TableName: 'personajes', Item: { item } });",
      ],
      hints: [
        P("`await ddb.put({ TableName: 'personajes', Item: item });`.", "`await ddb.put({ TableName: 'personajes', Item: item });`."),
      ],
      test_cases: [
        { input: "(async () => { await guardar({ id: '1', nombre: 'Frodo' }); return verItem('personajes', '1'); })()", expected: {"id":"1","nombre":"Frodo"}, description: P("Guarda a Frodo", "Stores Frodo"), raw: true },
        { input: "(async () => { await guardar({ id: '2', nombre: 'Sam' }); return verItem('personajes', '2'); })()", expected: {"id":"2","nombre":"Sam"}, description: P("Guarda a Sam", "Stores Sam"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas del Túmulo", "The Barrow Leaves"),
    lore_intro: P("Busca a un personaje por su identificador.", "Look up a character by its identifier."),
    challenge: {
      topic: P("DynamoDB: get", "DynamoDB: get"),
      instructions: P("Escribe `async function buscar(id)` que devuelva el item de la tabla `personajes` con esa clave. `ddb.get({ TableName, Key })` devuelve `{ Item }`.", "Write `async function buscar(id)` returning the item from the `personajes` table with that key. `ddb.get({ TableName, Key })` returns `{ Item }`."),
      starter_code: "async function buscar(id) {\n\n}\n",
        support_code: "await ddb.put({ TableName: 'personajes', Item: { id: '1', nombre: 'Frodo', poder: 20 } });",
      blocks: [
        "async function buscar(id) {",
        "  const r = await ddb.get({ TableName: 'personajes', Key: { id } });",
        "  return r.Item;",
        "}",
        "  return await ddb.get({ TableName: 'personajes', Key: { id } });",
      ],
      hints: [
        P("La clave es `{ id }`: `const r = await ddb.get({ TableName: 'personajes', Key: { id } }); return r.Item;`.", "The key is `{ id }`: `const r = await ddb.get({ TableName: 'personajes', Key: { id } }); return r.Item;`."),
      ],
      test_cases: [
        { input: "buscar('1')", expected: {"id":"1","nombre":"Frodo","poder":20}, description: P("Encuentra a Frodo", "Finds Frodo"), raw: true },
        { input: "buscar('99')", expected: null, description: P("Id ausente: null", "Missing id: null"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P("Reúne a los más poderosos: recorre la tabla y filtra por poder.", "Gather the mightiest: scan the table and filter by power."),
    challenge: {
      topic: P("DynamoDB: scan + filter", "DynamoDB: scan + filter"),
      instructions: P("Escribe `async function fuertes(minimo)` que devuelva los NOMBRES de los personajes con `poder >= minimo`. Usa `ddb.scan({ TableName })` → `{ Items }` y filtra en JS.", "Write `async function fuertes(minimo)` returning the NAMES of characters with `poder >= minimo`. Use `ddb.scan({ TableName })` → `{ Items }` and filter in JS."),
      starter_code: "async function fuertes(minimo) {\n\n}\n",
        support_code: "await ddb.put({ TableName: 'personajes', Item: { id: '1', nombre: 'Frodo', poder: 20 } });\nawait ddb.put({ TableName: 'personajes', Item: { id: '2', nombre: 'Aragorn', poder: 80 } });\nawait ddb.put({ TableName: 'personajes', Item: { id: '3', nombre: 'Gandalf', poder: 95 } });",
      blocks: [
        "async function fuertes(minimo) {",
        "  const r = await ddb.scan({ TableName: 'personajes' });",
        "  return r.Items.filter(p => p.poder >= minimo).map(p => p.nombre);",
        "}",
        "  return r.Items.filter(p => p.poder >= minimo);",
      ],
      hints: [
        P("`const r = await ddb.scan({ TableName: 'personajes' });`.", "`const r = await ddb.scan({ TableName: 'personajes' });`."),
        P("`return r.Items.filter(p => p.poder >= minimo).map(p => p.nombre);`.", "`return r.Items.filter(p => p.poder >= minimo).map(p => p.nombre);`."),
      ],
      test_cases: [
        { input: "fuertes(70)", expected: ["Aragorn","Gandalf"], description: P("poder ≥ 70", "power ≥ 70"), raw: true },
        { input: "fuertes(10)", expected: ["Frodo","Aragorn","Gandalf"], description: P("poder ≥ 10", "power ≥ 10"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_4: Syllabus = {
  c4_jinete_rezagado: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es AWS Lambda?", "What is AWS Lambda?"),
        options: [
          p("Cómputo serverless: tu función corre sin gestionar servidores", "Serverless compute: your function runs without managing servers"),
          p("Una base de datos", "A database"),
          p("Un bucket", "A bucket"),
          p("Una red", "A network"),
        ],
        correct: 0,
        explanation: p("Lambda ejecuta tu función bajo demanda, sin que gestiones servidores. Pagas por invocación y tiempo de ejecución.", "Lambda runs your function on demand, without you managing servers. You pay per invocation and execution time."),
      },
      {
        question: p("¿Qué recibe un handler de Lambda?", "What does a Lambda handler receive?"),
        options: [
          p("Un `event` con los datos de entrada", "An `event` with the input data"),
          p("Nada", "Nothing"),
          p("El bucket entero", "The whole bucket"),
          p("La región", "The region"),
        ],
        correct: 0,
        explanation: p("El handler recibe `event` (y `context`): `function handler(event) { ... }`. En `event` vienen los datos del disparador.", "The handler receives `event` (and `context`): `function handler(event) { ... }`. The trigger's data comes in `event`."),
      },
      {
        question: p("¿Qué hace un handler con su valor de retorno?", "What does a handler do with its return value?"),
        options: [
          p("Es la respuesta de la invocación", "It's the invocation's response"),
          p("Se ignora", "It's ignored"),
          p("Se guarda en S3", "It's saved to S3"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Lo que el handler devuelve es la respuesta de la Lambda: p. ej. `{ statusCode: 200, ... }`.", "Whatever the handler returns is the Lambda's response: e.g. `{ statusCode: 200, ... }`."),
      }
    ],
  },
  c4_lobo: {
    kind: "battle",
    questions: [
      {
        question: p("¿Puede una Lambda usar otros servicios (S3, DynamoDB)?", "Can a Lambda use other services (S3, DynamoDB)?"),
        options: [
          p("Sí: llama a sus SDK con `await`", "Yes: it calls their SDKs with `await`"),
          p("No, está aislada", "No, it's isolated"),
          p("Sólo S3", "Only S3"),
          p("Sólo si es SQL", "Only if it's SQL"),
        ],
        correct: 0,
        explanation: p("Una Lambda suele orquestar: lee/escribe en S3, DynamoDB, publica en SNS… todo con `await` a los clientes.", "A Lambda usually orchestrates: it reads/writes S3, DynamoDB, publishes to SNS… all with `await` on the clients."),
      },
      {
        question: p("Si el handler usa `await`, debe ser…", "If the handler uses `await`, it must be…"),
        options: [
          p("`async`", "`async`"),
          p("`static`", "`static`"),
          p("`private`", "`private`"),
          p("una clase", "a class"),
        ],
        correct: 0,
        explanation: p("`await` sólo vale dentro de funciones `async`. Un handler que llama al SDK es `async function handler(event)`.", "`await` only works inside `async` functions. A handler calling the SDK is `async function handler(event)`."),
      },
      {
        question: p("¿Cómo se suele indicar éxito en la respuesta?", "How is success usually indicated in the response?"),
        options: [
          p("Con `statusCode: 200`", "With `statusCode: 200`"),
          p("Con `ok: 'sí'`", "With `ok: 'sí'`"),
          p("No se indica", "It isn't indicated"),
          p("Con un color", "With a color"),
        ],
        correct: 0,
        explanation: p("Por convención (sobre todo tras API Gateway) se devuelve `{ statusCode: 200, ... }` en éxito, o 400/404/500 en error.", "By convention (especially behind API Gateway) you return `{ statusCode: 200, ... }` on success, or 400/404/500 on error."),
      }
    ],
  },
  c4_trasgo_montaraz: {
    kind: "battle",
    questions: [
      {
        question: p("Para validar la entrada, el handler…", "To validate input, the handler…"),
        options: [
          p("Comprueba `event` y devuelve 400 si falta algo", "Checks `event` and returns 400 if something's missing"),
          p("Confía siempre", "Always trusts it"),
          p("Borra el bucket", "Deletes the bucket"),
          p("No puede", "Can't"),
        ],
        correct: 0,
        explanation: p("Un buen handler valida: `if (!event.nombre) return { statusCode: 400 }`. Nunca confíes ciegamente en la entrada.", "A good handler validates: `if (!event.nombre) return { statusCode: 400 }`. Never blindly trust the input."),
      },
      {
        question: p("¿Cómo manejas un `getObject` que puede fallar?", "How do you handle a `getObject` that may fail?"),
        options: [
          p("Con `try/catch` y devolver 404", "With `try/catch` and returning 404"),
          p("Ignorando el error", "Ignoring the error"),
          p("Con un bucle", "With a loop"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("Envuelve la llamada en `try/catch`: si `getObject` lanza (clave ausente), devuelves `{ statusCode: 404 }`.", "Wrap the call in `try/catch`: if `getObject` throws (missing key), you return `{ statusCode: 404 }`."),
      },
      {
        question: p("¿Es buena idea que el handler sea idempotente?", "Is it good for the handler to be idempotent?"),
        options: [
          p("Sí: reintentar no debe romper nada", "Yes: retrying shouldn't break anything"),
          p("No importa", "Doesn't matter"),
          p("No, cuantos más efectos mejor", "No, the more side effects the better"),
          p("Sólo en S3", "Only in S3"),
        ],
        correct: 0,
        explanation: p("En sistemas con reintentos, la idempotencia evita duplicar efectos si la misma invocación se repite.", "In systems with retries, idempotency avoids duplicating effects if the same invocation repeats."),
      }
    ],
  },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("El Señor de los Nueve", "The Lord of the Nine"),
    lore_intro: P("El handler busca al héroe; si no existe, responde 404.", "The handler looks up the hero; if it doesn't exist, it responds 404."),
    challenge: {
      topic: P("Lambda: get + 404", "Lambda: get + 404"),
      instructions: P("Escribe `async function handler(event)` que lea de la tabla `heroes` por `event.id`. Si no hay item, devuelve `{ statusCode: 404 }`; si lo hay, `{ statusCode: 200, nombre: <nombre del item> }`.", "Write `async function handler(event)` that reads from the `heroes` table by `event.id`. If there's no item, return `{ statusCode: 404 }`; if there is, `{ statusCode: 200, nombre: <item's nombre> }`."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await ddb.put({ TableName: 'heroes', Item: { id: '1', nombre: 'Aragorn' } });",
      blocks: [
        "async function handler(event) {",
        "  const r = await ddb.get({ TableName: 'heroes', Key: { id: event.id } });",
        "  if (!r.Item) return { statusCode: 404 };",
        "  return { statusCode: 200, nombre: r.Item.nombre };",
        "}",
        "  if (r.Item) return { statusCode: 404 };",
      ],
      hints: [
        P("`const r = await ddb.get({ TableName: 'heroes', Key: { id: event.id } });`.", "`const r = await ddb.get({ TableName: 'heroes', Key: { id: event.id } });`."),
        P("`if (!r.Item) return { statusCode: 404 };` y luego `return { statusCode: 200, nombre: r.Item.nombre };`.", "`if (!r.Item) return { statusCode: 404 };` then `return { statusCode: 200, nombre: r.Item.nombre };`."),
      ],
      test_cases: [
        { input: "handler({ id: '1' })", expected: {"statusCode":200,"nombre":"Aragorn"}, description: P("Existe: 200 + nombre", "Exists: 200 + name"), raw: true },
        { input: "handler({ id: '9' })", expected: {"statusCode":404}, description: P("No existe: 404", "Missing: 404"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: p("El Pergamino de Lambda", "The Scroll of Lambda"),
    lore_intro: p("Un pergamino muestra el cómputo sin servidores.", "A scroll shows serverless compute."),
    scroll: {
      topic: p("AWS: Lambda", "AWS: Lambda"),
      sections: [
        { heading: p("Handler", "Handler"), body: p("La función recibe `event` y devuelve la respuesta.", "The function receives `event` and returns the response."), code: "function handler(event) {\n  return { statusCode: 200, nombre: event.nombre };\n}" },
        { heading: p("Orquestar servicios", "Orchestrate services"), body: p("Con `await` llama a otros servicios; por eso es `async`.", "With `await` it calls other services; that's why it's `async`."), code: "async function handler(event) {\n  await ddb.put({ TableName: 'reg', Item: { id: event.id } });\n  return { statusCode: 200 };\n}" },
        { heading: p("Validar y manejar errores", "Validate and handle errors"), body: p("Comprueba la entrada y envuelve lo que pueda fallar en `try/catch`.", "Check the input and wrap what may fail in `try/catch`."), code: "if (!event.id) return { statusCode: 400 };\ntry { /* getObject */ } catch { return { statusCode: 404 }; }" },
      ],
      keyTakeaway: p("Lambda: handler(event) devuelve la respuesta; async+await para orquestar servicios; valida la entrada y maneja errores.", "Lambda: handler(event) returns the response; async+await to orchestrate services; validate input and handle errors."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Montura Asfaloth", "Asfaloth the Steed"),
    lore_intro: P("Tu primer handler: saluda a quien llega en el evento.", "Your first handler: greet whoever arrives in the event."),
    challenge: {
      topic: P("Lambda: handler y event", "Lambda: handler and event"),
      instructions: P("Escribe `function handler(event)` que devuelva `{ mensaje: 'Hola, ' + event.nombre }`.", "Write `function handler(event)` returning `{ mensaje: 'Hola, ' + event.nombre }`."),
      starter_code: "function handler(event) {\n\n}\n",
      blocks: [
        "function handler(event) {",
        "  return { mensaje: 'Hola, ' + event.nombre };",
        "}",
        "  return { mensaje: 'Hola, ' + nombre };",
      ],
      hints: [
        P("Lee la entrada del `event`: `event.nombre`.", "Read the input from `event`: `event.nombre`."),
      ],
      test_cases: [
        { input: "handler({ nombre: 'Frodo' })", expected: {"mensaje":"Hola, Frodo"}, description: P("Saluda a Frodo", "Greets Frodo"), raw: true },
        { input: "handler({ nombre: 'Sam' })", expected: {"mensaje":"Hola, Sam"}, description: P("Saluda a Sam", "Greets Sam"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Count of the Nine"),
    lore_intro: P("El handler anota el dato en la base de datos.", "The handler records the datum in the database."),
    challenge: {
      topic: P("Lambda + DynamoDB", "Lambda + DynamoDB"),
      instructions: P("Escribe `async function handler(event)` que guarde en la tabla `registros` el item `{ id: event.id, dato: event.dato }` y devuelva `{ statusCode: 200 }`.", "Write `async function handler(event)` that stores in the `registros` table the item `{ id: event.id, dato: event.dato }` and returns `{ statusCode: 200 }`."),
      starter_code: "async function handler(event) {\n\n}\n",
      blocks: [
        "async function handler(event) {",
        "  await ddb.put({ TableName: 'registros', Item: { id: event.id, dato: event.dato } });",
        "  return { statusCode: 200 };",
        "}",
        "  ddb.put({ TableName: 'registros', Item: { id: event.id, dato: event.dato } });",
      ],
      hints: [
        P("`await ddb.put({ TableName: 'registros', Item: { id: event.id, dato: event.dato } });` y luego `return { statusCode: 200 };`.", "`await ddb.put({ TableName: 'registros', Item: { id: event.id, dato: event.dato } });` then `return { statusCode: 200 };`."),
      ],
      test_cases: [
        { input: "handler({ id: 'a', dato: 7 })", expected: {"statusCode":200}, description: P("Devuelve 200", "Returns 200"), raw: true },
        { input: "(async () => { await handler({ id: 'b', dato: 9 }); return verItem('registros', 'b'); })()", expected: {"id":"b","dato":9}, description: P("Guarda el registro", "Stores the record"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P("El handler lee un objeto de S3 y mide su longitud.", "The handler reads an S3 object and measures its length."),
    challenge: {
      topic: P("Lambda + S3", "Lambda + S3"),
      instructions: P("Escribe `async function handler(event)` que lea de S3 el objeto `{ bucket: event.bucket, clave: event.clave }` y devuelva `{ longitud: <largo del Body> }`.", "Write `async function handler(event)` that reads from S3 the object `{ bucket: event.bucket, clave: event.clave }` and returns `{ longitud: <Body length> }`."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'datos', Key: 'nota', Body: 'hola!' });",
      blocks: [
        "async function handler(event) {",
        "  const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });",
        "  return { longitud: r.Body.length };",
        "}",
        "  return { longitud: r.length };",
      ],
      hints: [
        P("`const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });` y `return { longitud: r.Body.length };`.", "`const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });` then `return { longitud: r.Body.length };`."),
      ],
      test_cases: [
        { input: "handler({ bucket: 'datos', clave: 'nota' })", expected: {"longitud":5}, description: P("'hola!' → 5", "'hola!' → 5"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P("Valida la entrada: sin nombre, rechaza con 400.", "Validate the input: no name, reject with 400."),
    challenge: {
      topic: P("Lambda: validación", "Lambda: validation"),
      instructions: P("Escribe `function handler(event)` que, si NO hay `event.nombre`, devuelva `{ statusCode: 400 }`; y si lo hay, `{ statusCode: 200, nombre: event.nombre }`.", "Write `function handler(event)` that, if there's NO `event.nombre`, returns `{ statusCode: 400 }`; and if there is, `{ statusCode: 200, nombre: event.nombre }`."),
      starter_code: "function handler(event) {\n\n}\n",
      blocks: [
        "function handler(event) {",
        "  if (!event.nombre) return { statusCode: 400 };",
        "  return { statusCode: 200, nombre: event.nombre };",
        "}",
        "  if (event.nombre) return { statusCode: 400 };",
      ],
      hints: [
        P("Comprueba primero: `if (!event.nombre) return { statusCode: 400 };`.", "Check first: `if (!event.nombre) return { statusCode: 400 };`."),
      ],
      test_cases: [
        { input: "handler({ nombre: 'Frodo' })", expected: {"statusCode":200,"nombre":"Frodo"}, description: P("Con nombre: 200", "With name: 200"), raw: true },
        { input: "handler({})", expected: {"statusCode":400}, description: P("Sin nombre: 400", "No name: 400"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_5: Syllabus = {
  c5_crebain: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es SQS?", "What is SQS?"),
        options: [
          p("Una cola de mensajes (uno los envía, otro los procesa)", "A message queue (one sends, another processes)"),
          p("Una base de datos", "A database"),
          p("Un bucket", "A bucket"),
          p("Una función", "A function"),
        ],
        correct: 0,
        explanation: p("SQS (Simple Queue Service) es una COLA: los productores encolan mensajes y los consumidores los procesan a su ritmo.", "SQS (Simple Queue Service) is a QUEUE: producers enqueue messages and consumers process them at their own pace."),
      },
      {
        question: p("¿Qué operación encola un mensaje en SQS?", "Which operation enqueues a message in SQS?"),
        options: [
          p("`sendMessage`", "`sendMessage`"),
          p("`publish`", "`publish`"),
          p("`putObject`", "`putObject`"),
          p("`put`", "`put`"),
        ],
        correct: 0,
        explanation: p("`sqs.sendMessage({ QueueUrl, MessageBody })` añade un mensaje al final de la cola.", "`sqs.sendMessage({ QueueUrl, MessageBody })` adds a message to the end of the queue."),
      },
      {
        question: p("¿En qué orden se consumen los mensajes aquí?", "In what order are messages consumed here?"),
        options: [
          p("El primero que entra es el primero que sale (FIFO)", "First in, first out (FIFO)"),
          p("El último primero", "Last first"),
          p("Al azar", "Randomly"),
          p("Todos a la vez", "All at once"),
        ],
        correct: 0,
        explanation: p("`receiveMessage` entrega el mensaje más antiguo primero. Consumir uno lo saca de la cola.", "`receiveMessage` delivers the oldest message first. Consuming one removes it from the queue."),
      }
    ],
  },
  c5_lobo_nieve: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué devuelve `receiveMessage` si la cola está vacía?", "What does `receiveMessage` return if the queue is empty?"),
        options: [
          p("`{ Messages: [] }`", "`{ Messages: [] }`"),
          p("Lanza", "Throws"),
          p("`null`", "`null`"),
          p("El último mensaje", "The last message"),
        ],
        correct: 0,
        explanation: p("Con la cola vacía, `Messages` es un array vacío. Por eso compruebas `r.Messages.length` antes de leer.", "With an empty queue, `Messages` is an empty array. That's why you check `r.Messages.length` before reading."),
      },
      {
        question: p("¿Qué es SNS?", "What is SNS?"),
        options: [
          p("Un servicio de notificaciones publicar/suscribir (tópicos)", "A pub/sub notification service (topics)"),
          p("Una cola", "A queue"),
          p("Una base de datos", "A database"),
          p("Un bucket", "A bucket"),
        ],
        correct: 0,
        explanation: p("SNS (Simple Notification Service) es publicar/suscribir: publicas en un TÓPICO y todos los suscriptores lo reciben.", "SNS (Simple Notification Service) is pub/sub: you publish to a TOPIC and all subscribers receive it."),
      },
      {
        question: p("¿Qué operación publica en un tópico SNS?", "Which operation publishes to an SNS topic?"),
        options: [
          p("`publish`", "`publish`"),
          p("`sendMessage`", "`sendMessage`"),
          p("`putObject`", "`putObject`"),
          p("`emit`", "`emit`"),
        ],
        correct: 0,
        explanation: p("`sns.publish({ TopicArn, Message })` envía un mensaje al tópico, que llega a todos los suscriptores.", "`sns.publish({ TopicArn, Message })` sends a message to the topic, reaching all subscribers."),
      }
    ],
  },
  c5_trasgo_montanes: {
    kind: "battle",
    questions: [
      {
        question: p("Diferencia clave entre SQS y SNS:", "Key difference between SQS and SNS:"),
        options: [
          p("SQS: un consumidor procesa cada mensaje; SNS: muchos lo reciben", "SQS: one consumer processes each message; SNS: many receive it"),
          p("Son idénticos", "They're identical"),
          p("SNS guarda archivos", "SNS stores files"),
          p("SQS es una BD", "SQS is a DB"),
        ],
        correct: 0,
        explanation: p("SQS reparte trabajo (1 mensaje → 1 consumidor). SNS difunde (1 mensaje → N suscriptores). Distintos patrones.", "SQS distributes work (1 message → 1 consumer). SNS broadcasts (1 message → N subscribers). Different patterns."),
      },
      {
        question: p("El desacoplamiento con colas sirve para…", "Decoupling with queues serves to…"),
        options: [
          p("Que productor y consumidor no dependan del ritmo del otro", "Let producer and consumer not depend on each other's pace"),
          p("Ahorrar disco", "Save disk"),
          p("Cifrar datos", "Encrypt data"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("La cola amortigua: el productor encola aunque el consumidor esté ocupado; se procesa cuando se puede. Desacopla.", "The queue buffers: the producer enqueues even if the consumer is busy; it's processed when possible. It decouples."),
      },
      {
        question: p("Un patrón fan-out se logra con…", "A fan-out pattern is achieved with…"),
        options: [
          p("SNS: un `publish` llega a varios destinos", "SNS: one `publish` reaches several destinations"),
          p("Un solo `get`", "A single `get`"),
          p("Un bucle infinito", "An infinite loop"),
          p("Borrando la cola", "Deleting the queue"),
        ],
        correct: 0,
        explanation: p("El fan-out difunde un evento a múltiples consumidores. SNS (o SNS+SQS) es el mecanismo típico.", "Fan-out broadcasts an event to multiple consumers. SNS (or SNS+SQS) is the typical mechanism."),
      }
    ],
  },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Furia de Caradhras", "The Wrath of Caradhras"),
    lore_intro: P("Lanza varias alertas seguidas por el tópico.", "Fire several alerts in a row to the topic."),
    challenge: {
      topic: P("SNS: publicar en bucle", "SNS: publish in a loop"),
      instructions: P("Escribe `async function difundir(topico, mensajes)` que publique en el tópico cada mensaje del array `mensajes`, en orden.", "Write `async function difundir(topico, mensajes)` that publishes to the topic each message of the `mensajes` array, in order."),
      starter_code: "async function difundir(topico, mensajes) {\n\n}\n",
      blocks: [
        "async function difundir(topico, mensajes) {",
        "  for (const m of mensajes) {",
        "    await sns.publish({ TopicArn: topico, Message: m });",
        "  }",
        "}",
        "  mensajes.forEach(m => sns.publish({ TopicArn: topico, Message: m }));",
      ],
      hints: [
        P("Recorre con `for...of` y `await` cada `publish`: `for (const m of mensajes) { await sns.publish({ TopicArn: topico, Message: m }); }`.", "Loop with `for...of` and `await` each `publish`: `for (const m of mensajes) { await sns.publish({ TopicArn: topico, Message: m }); }`."),
      ],
      test_cases: [
        { input: "(async () => { await difundir('t', ['a', 'b', 'c']); return verTopico('t'); })()", expected: ["a","b","c"], description: P("['a','b','c']", "['a','b','c']"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: p("El Pergamino de la Mensajería", "The Scroll of Messaging"),
    lore_intro: p("Un pergamino desacopla a quien produce de quien consume.", "A scroll decouples producer from consumer."),
    scroll: {
      topic: p("AWS: SQS y SNS", "AWS: SQS and SNS"),
      sections: [
        { heading: p("SQS (colas)", "SQS (queues)"), body: p("Un productor encola; un consumidor procesa (FIFO).", "A producer enqueues; a consumer processes (FIFO)."), code: "await sqs.sendMessage({ QueueUrl: 'tareas', MessageBody: 'cargar' });\nconst r = await sqs.receiveMessage({ QueueUrl: 'tareas' });" },
        { heading: p("SNS (tópicos)", "SNS (topics)"), body: p("Publicas en un tópico y todos los suscriptores lo reciben (fan-out).", "You publish to a topic and all subscribers receive it (fan-out)."), code: "await sns.publish({ TopicArn: 'avisos', Message: 'nieve' });" },
        { heading: p("Cola vacía", "Empty queue"), body: p("`receiveMessage` en cola vacía devuelve `{ Messages: [] }`.", "`receiveMessage` on an empty queue returns `{ Messages: [] }`."), code: "if (r.Messages.length) { /* procesar r.Messages[0].Body */ }" },
      ],
      keyTakeaway: p("SQS reparte trabajo (1→1, FIFO); SNS difunde (1→N, fan-out). receiveMessage en cola vacía da Messages: [].", "SQS distributes work (1→1, FIFO); SNS broadcasts (1→N, fan-out). receiveMessage on empty queue gives Messages: []."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Póney", "Bill the Pony's Load"),
    lore_intro: P("Encola una tarea para más tarde.", "Enqueue a task for later."),
    challenge: {
      topic: P("SQS: sendMessage", "SQS: sendMessage"),
      instructions: P("Escribe `async function encolar(cola, mensaje)` que envíe `mensaje` a la cola con `sqs.sendMessage({ QueueUrl, MessageBody })`.", "Write `async function encolar(cola, mensaje)` that sends `mensaje` to the queue with `sqs.sendMessage({ QueueUrl, MessageBody })`."),
      starter_code: "async function encolar(cola, mensaje) {\n\n}\n",
      blocks: [
        "async function encolar(cola, mensaje) {",
        "  await sqs.sendMessage({ QueueUrl: cola, MessageBody: mensaje });",
        "}",
        "  await sqs.sendMessage({ QueueUrl: cola, Message: mensaje });",
      ],
      hints: [
        P("`await sqs.sendMessage({ QueueUrl: cola, MessageBody: mensaje });`.", "`await sqs.sendMessage({ QueueUrl: cola, MessageBody: mensaje });`."),
      ],
      test_cases: [
        { input: "(async () => { await encolar('tareas', 'cargar'); return verCola('tareas'); })()", expected: ["cargar"], description: P("Encola una", "Enqueue one"), raw: true },
        { input: "(async () => { await encolar('tareas', 'a'); await encolar('tareas', 'b'); return verCola('tareas'); })()", expected: ["a","b"], description: P("Encola dos (orden)", "Enqueue two (order)"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Resilience"),
    lore_intro: P("Consume el siguiente mensaje de la cola.", "Consume the next message from the queue."),
    challenge: {
      topic: P("SQS: receiveMessage", "SQS: receiveMessage"),
      instructions: P("Escribe `async function siguiente(cola)` que devuelva el `Body` del siguiente mensaje, o `null` si la cola está vacía. `sqs.receiveMessage` devuelve `{ Messages }`.", "Write `async function siguiente(cola)` returning the next message's `Body`, or `null` if the queue is empty. `sqs.receiveMessage` returns `{ Messages }`."),
      starter_code: "async function siguiente(cola) {\n\n}\n",
        support_code: "await sqs.sendMessage({ QueueUrl: 'cola', MessageBody: 'primero' });\nawait sqs.sendMessage({ QueueUrl: 'cola', MessageBody: 'segundo' });",
      blocks: [
        "async function siguiente(cola) {",
        "  const r = await sqs.receiveMessage({ QueueUrl: cola });",
        "  return r.Messages.length ? r.Messages[0].Body : null;",
        "}",
        "  return r.Messages[0].Body;",
      ],
      hints: [
        P("`const r = await sqs.receiveMessage({ QueueUrl: cola });`.", "`const r = await sqs.receiveMessage({ QueueUrl: cola });`."),
        P("`return r.Messages.length ? r.Messages[0].Body : null;`.", "`return r.Messages.length ? r.Messages[0].Body : null;`."),
      ],
      test_cases: [
        { input: "siguiente('cola')", expected: "primero", description: P("Saca el primero (FIFO)", "Takes the first (FIFO)"), raw: true },
        { input: "(async () => { await siguiente('cola'); return siguiente('cola'); })()", expected: "segundo", description: P("Luego el segundo", "Then the second"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("La Temperatura de la Montaña", "The Mountain's Temperature"),
    lore_intro: P("Difunde una alerta por el tópico.", "Broadcast an alert to the topic."),
    challenge: {
      topic: P("SNS: publish", "SNS: publish"),
      instructions: P("Escribe `async function alertar(topico, mensaje)` que publique `mensaje` en el tópico con `sns.publish({ TopicArn, Message })`.", "Write `async function alertar(topico, mensaje)` that publishes `mensaje` to the topic with `sns.publish({ TopicArn, Message })`."),
      starter_code: "async function alertar(topico, mensaje) {\n\n}\n",
      blocks: [
        "async function alertar(topico, mensaje) {",
        "  await sns.publish({ TopicArn: topico, Message: mensaje });",
        "}",
        "  await sns.publish({ TopicArn: topico, MessageBody: mensaje });",
      ],
      hints: [
        P("`await sns.publish({ TopicArn: topico, Message: mensaje });`.", "`await sns.publish({ TopicArn: topico, Message: mensaje });`."),
      ],
      test_cases: [
        { input: "(async () => { await alertar('avisos', 'nieve'); return verTopico('avisos'); })()", expected: ["nieve"], description: P("Publica 'nieve'", "Publishes 'nieve'"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_6: Syllabus = {
  c6_trasgo_explorador: {
    kind: "battle",
    questions: [
      {
        question: p("Si un statement Allow y otro Deny casan la misma petición, ¿qué gana?", "If an Allow and a Deny statement match the same request, which wins?"),
        options: [
          p("El Deny (el deny explícito siempre gana)", "The Deny (explicit deny always wins)"),
          p("El Allow", "The Allow"),
          p("El primero", "The first one"),
          p("Ninguno", "Neither"),
        ],
        correct: 0,
        explanation: p("La regla de oro de IAM: un Deny explícito SIEMPRE prevalece sobre cualquier Allow. La seguridad es lo primero.", "IAM's golden rule: an explicit Deny ALWAYS beats any Allow. Security comes first."),
      },
      {
        question: p("El orden de evaluación de IAM es…", "IAM's evaluation order is…"),
        options: [
          p("Deny explícito → Allow → denegación por defecto", "Explicit Deny → Allow → default deny"),
          p("Allow siempre primero", "Allow always first"),
          p("Aleatorio", "Random"),
          p("Por orden alfabético", "Alphabetical"),
        ],
        correct: 0,
        explanation: p("Primero, ¿hay un Deny que case? Deniega. Si no, ¿hay un Allow? Permite. Si nada casa, denegación por defecto.", "First, is there a matching Deny? Deny. Otherwise, is there an Allow? Allow. If nothing matches, default deny."),
      },
      {
        question: p("¿Un Deny puede aplicarse a un subconjunto más específico?", "Can a Deny apply to a more specific subset?"),
        options: [
          p("Sí: Allow amplio + Deny concreto es un patrón común", "Yes: broad Allow + specific Deny is a common pattern"),
          p("No", "No"),
          p("Sólo con `*`", "Only with `*`"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("Permitir `datos/*` pero denegar `datos/secreto/*` restringe una parte. El Deny concreto recorta el Allow amplio.", "Allowing `datos/*` but denying `datos/secreto/*` restricts a part. The specific Deny carves out the broad Allow."),
      }
    ],
  },
  c6_trol_cavernas: {
    kind: "battle",
    questions: [
      {
        question: p("¿Se puede evaluar una petición contra VARIAS políticas?", "Can a request be evaluated against SEVERAL policies?"),
        options: [
          p("Sí: se unen todos sus statements", "Yes: all their statements are combined"),
          p("No, sólo una", "No, only one"),
          p("Sólo dos", "Only two"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("En la práctica se combinan varias políticas (de usuario, de rol, de recurso). El simulador acepta un array de políticas.", "In practice several policies combine (user, role, resource). The simulator accepts an array of policies."),
      },
      {
        question: p("Con un array de políticas, un Deny en CUALQUIERA…", "With an array of policies, a Deny in ANY of them…"),
        options: [
          p("Deniega la petición entera", "Denies the whole request"),
          p("Se ignora", "Is ignored"),
          p("Sólo cuenta en la primera", "Only counts in the first"),
          p("Permite igualmente", "Allows anyway"),
        ],
        correct: 0,
        explanation: p("Un solo Deny que case, en cualquier política, basta para denegar. El deny explícito atraviesa todo.", "A single matching Deny, in any policy, is enough to deny. Explicit deny cuts through everything."),
      },
      {
        question: p("Un statement puede tener…", "A statement can have…"),
        options: [
          p("Varias Action y varios Resource (arrays)", "Several Action and Resource (arrays)"),
          p("Sólo una Action", "Only one Action"),
          p("Sólo un Resource", "Only one Resource"),
          p("Ni Action ni Resource", "Neither Action nor Resource"),
        ],
        correct: 0,
        explanation: p("`Action` y `Resource` pueden ser un valor o un array. `['s3:GetObject','s3:PutObject']` casa con cualquiera de los dos.", "`Action` and `Resource` can be a value or an array. `['s3:GetObject','s3:PutObject']` matches either."),
      }
    ],
  },
  c6_capitan_trasgo: {
    kind: "battle",
    questions: [
      {
        question: p("El principio de mínimo privilegio dice…", "The principle of least privilege says…"),
        options: [
          p("Concede sólo los permisos necesarios, nada más", "Grant only the permissions needed, nothing more"),
          p("Concede todo por comodidad", "Grant everything for convenience"),
          p("Niega todo siempre", "Deny everything always"),
          p("Da igual", "It doesn't matter"),
        ],
        correct: 0,
        explanation: p("Mínimo privilegio: cada identidad recibe exactamente los permisos que necesita. Reduce el riesgo si algo se compromete.", "Least privilege: each identity gets exactly the permissions it needs. It reduces risk if something is compromised."),
      },
      {
        question: p("Una política de sólo lectura permite Get/List pero…", "A read-only policy allows Get/List but…"),
        options: [
          p("Deniega Put/Delete", "Denies Put/Delete"),
          p("Permite todo", "Allows everything"),
          p("No permite nada", "Allows nothing"),
          p("Borra el bucket", "Deletes the bucket"),
        ],
        correct: 0,
        explanation: p("Sólo lectura: `Allow` a las acciones de lectura y `Deny` (o simplemente no conceder) a las de escritura/borrado.", "Read-only: `Allow` the read actions and `Deny` (or simply don't grant) the write/delete ones."),
      },
      {
        question: p("¿Por qué preferir Deny explícito para escritura en un bucket de archivo?", "Why prefer an explicit Deny for writes on an archive bucket?"),
        options: [
          p("Blinda contra permisos amplios que se cuelen", "It hardens against broad permissions slipping in"),
          p("Es más bonito", "It's prettier"),
          p("Ahorra dinero", "It saves money"),
          p("No sirve", "It's useless"),
        ],
        correct: 0,
        explanation: p("Un Deny explícito de escritura garantiza que ni un `s3:*` concedido en otra política podrá escribir. Cinturón y tirantes.", "An explicit write Deny guarantees that not even an `s3:*` granted elsewhere can write. Belt and suspenders."),
      }
    ],
  },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("La biblioteca es de sólo lectura: permite todo salvo escribir o borrar.", "The library is read-only: allow everything except writing or deleting."),
    challenge: {
      topic: P("IAM: sólo lectura", "IAM: read-only"),
      instructions: P("Define `const politica` con dos statements: uno PERMITE `s3:*` sobre `arn:aws:s3:::biblioteca/*`, y otro DENIEGA las acciones `s3:PutObject` y `s3:DeleteObject` (array) sobre `arn:aws:s3:::biblioteca/*`.", "Define `const politica` with two statements: one ALLOWS `s3:*` on `arn:aws:s3:::biblioteca/*`, and another DENIES the actions `s3:PutObject` and `s3:DeleteObject` (array) on `arn:aws:s3:::biblioteca/*`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::biblioteca/*' },",
        "    { Effect: 'Deny', Action: ['s3:PutObject', 's3:DeleteObject'], Resource: 'arn:aws:s3:::biblioteca/*' }",
        "  ]",
        "};",
        "    { Effect: 'Deny', Action: 's3:*', Resource: 'arn:aws:s3:::biblioteca/*' }",
      ],
      hints: [
        P("El Deny con un array de acciones recorta el Allow amplio: patrón de sólo lectura.", "The Deny with an array of actions carves out the broad Allow: a read-only pattern."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::biblioteca/tomo' })", expected: "Allow", description: P("Get: Allow", "Get: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:PutObject', resource: 'arn:aws:s3:::biblioteca/tomo' })", expected: "Deny", description: P("Put: Deny", "Put: Deny"), raw: true },
        { input: "simular(politica, { action: 's3:DeleteObject', resource: 'arn:aws:s3:::biblioteca/tomo' })", expected: "Deny", description: P("Delete: Deny", "Delete: Deny"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: p("El Pergamino del Deny Explícito", "The Scroll of Explicit Deny"),
    lore_intro: p("Un pergamino desvela la regla de oro de los permisos.", "A scroll reveals the golden rule of permissions."),
    scroll: {
      topic: p("AWS: IAM avanzado", "AWS: advanced IAM"),
      sections: [
        { heading: p("El Deny gana", "Deny wins"), body: p("Un Deny explícito prevalece sobre cualquier Allow.", "An explicit Deny beats any Allow."), code: "// Allow s3:* + Deny s3:DeleteObject → DeleteObject se deniega" },
        { heading: p("Recortar un Allow amplio", "Carve out a broad Allow"), body: p("Allow `datos/*` + Deny `datos/secreto/*` protege una parte.", "Allow `datos/*` + Deny `datos/secreto/*` protects a subset."), code: "[{ Effect:'Allow', Action:'s3:GetObject', Resource:'arn:aws:s3:::datos/*' },\n { Effect:'Deny', Action:'s3:GetObject', Resource:'arn:aws:s3:::datos/secreto/*' }]" },
        { heading: p("Varias políticas", "Several policies"), body: p("Se combinan; un Deny en cualquiera deniega. Arrays en Action/Resource.", "They combine; a Deny in any denies. Arrays in Action/Resource."), code: "simular([politicaA, politicaB], req);" },
      ],
      keyTakeaway: p("Deny explícito SIEMPRE gana; recorta Allow amplios con Deny concretos; varias políticas se combinan; usa arrays y mínimo privilegio.", "Explicit Deny ALWAYS wins; carve broad Allows with specific Denies; policies combine; use arrays and least privilege."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P("Permite todo en la mina, salvo borrar: el Deny explícito manda.", "Allow everything in the mine, except deleting: explicit Deny rules."),
    challenge: {
      topic: P("IAM: deny explícito", "IAM: explicit deny"),
      instructions: P("Define `const politica` con DOS statements: uno PERMITE `s3:*` sobre `arn:aws:s3:::mina/*`, y otro DENIEGA `s3:DeleteObject` sobre `arn:aws:s3:::mina/*`.", "Define `const politica` with TWO statements: one ALLOWS `s3:*` on `arn:aws:s3:::mina/*`, and another DENIES `s3:DeleteObject` on `arn:aws:s3:::mina/*`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::mina/*' },",
        "    { Effect: 'Deny', Action: 's3:DeleteObject', Resource: 'arn:aws:s3:::mina/*' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:DeleteObject', Resource: 'arn:aws:s3:::mina/*' }",
      ],
      hints: [
        P("El Deny explícito gana aunque el Allow sea `s3:*`.", "The explicit Deny wins even if the Allow is `s3:*`."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::mina/oro' })", expected: "Allow", description: P("Get: Allow", "Get: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:DeleteObject', resource: 'arn:aws:s3:::mina/oro' })", expected: "Deny", description: P("Delete: Deny", "Delete: Deny"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Permite leer los datos, pero blinda la carpeta secreta.", "Allow reading the data, but seal off the secret folder."),
    challenge: {
      topic: P("IAM: recortar un Allow amplio", "IAM: carve out a broad Allow"),
      instructions: P("Define `const politica` que PERMITA `s3:GetObject` sobre `arn:aws:s3:::datos/*` pero DENIEGUE `s3:GetObject` sobre `arn:aws:s3:::datos/secreto/*`.", "Define `const politica` that ALLOWS `s3:GetObject` on `arn:aws:s3:::datos/*` but DENIES `s3:GetObject` on `arn:aws:s3:::datos/secreto/*`."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::datos/*' },",
        "    { Effect: 'Deny', Action: 's3:GetObject', Resource: 'arn:aws:s3:::datos/secreto/*' }",
        "  ]",
        "};",
        "    { Effect: 'Deny', Action: 's3:GetObject', Resource: 'arn:aws:s3:::datos/*' }",
      ],
      hints: [
        P("Dos statements: un Allow amplio y un Deny más específico.", "Two statements: a broad Allow and a more specific Deny."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::datos/publico' })", expected: "Allow", description: P("datos/publico: Allow", "datos/publico: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::datos/secreto/mapa' })", expected: "Deny", description: P("datos/secreto: Deny", "datos/secreto: Deny"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Combina dos políticas: una abre, otra cierra Mordor.", "Combine two policies: one opens, the other closes Mordor."),
    challenge: {
      topic: P("IAM: varias políticas", "IAM: several policies"),
      instructions: P("Define `const politicas` (un ARRAY de dos políticas): la primera PERMITE `s3:GetObject` sobre `*`; la segunda DENIEGA `s3:GetObject` sobre `arn:aws:s3:::mordor/*`.", "Define `const politicas` (an ARRAY of two policies): the first ALLOWS `s3:GetObject` on `*`; the second DENIES `s3:GetObject` on `arn:aws:s3:::mordor/*`."),
      starter_code: "const politicas = [\n\n];\n",
      blocks: [
        "const politicas = [",
        "  { Statement: [{ Effect: 'Allow', Action: 's3:GetObject', Resource: '*' }] },",
        "  { Statement: [{ Effect: 'Deny', Action: 's3:GetObject', Resource: 'arn:aws:s3:::mordor/*' }] }",
        "];",
        "  { Statement: [{ Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::mordor/*' }] }",
      ],
      hints: [
        P("Cada elemento es una política con su `Statement`. `simular` acepta el array.", "Each element is a policy with its `Statement`. `simular` accepts the array."),
        P("Un Deny en cualquiera de las dos deniega.", "A Deny in either one denies."),
      ],
      test_cases: [
        { input: "simular(politicas, { action: 's3:GetObject', resource: 'arn:aws:s3:::comarca/x' })", expected: "Allow", description: P("comarca: Allow", "comarca: Allow"), raw: true },
        { input: "simular(politicas, { action: 's3:GetObject', resource: 'arn:aws:s3:::mordor/x' })", expected: "Deny", description: P("mordor: Deny", "mordor: Deny"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Concede varias acciones sobre varias tablas de una vez.", "Grant several actions on several tables at once."),
    challenge: {
      topic: P("IAM: arrays en Action y Resource", "IAM: arrays in Action and Resource"),
      instructions: P("Define `const politica` que PERMITA las acciones `dynamodb:GetItem` y `dynamodb:PutItem` sobre los recursos `arn:aws:dynamodb:::table/heroes` y `arn:aws:dynamodb:::table/reinos` (ambos arrays).", "Define `const politica` that ALLOWS the actions `dynamodb:GetItem` and `dynamodb:PutItem` on the resources `arn:aws:dynamodb:::table/heroes` and `arn:aws:dynamodb:::table/reinos` (both arrays)."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    {",
        "      Effect: 'Allow',",
        "      Action: ['dynamodb:GetItem', 'dynamodb:PutItem'],",
        "      Resource: ['arn:aws:dynamodb:::table/heroes', 'arn:aws:dynamodb:::table/reinos']",
        "    }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 'dynamodb:*', Resource: '*' }",
      ],
      hints: [
        P("Tanto `Action` como `Resource` pueden ser arrays en el mismo statement.", "Both `Action` and `Resource` can be arrays in the same statement."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 'dynamodb:GetItem', resource: 'arn:aws:dynamodb:::table/heroes' })", expected: "Allow", description: P("GetItem/heroes: Allow", "GetItem/heroes: Allow"), raw: true },
        { input: "simular(politica, { action: 'dynamodb:PutItem', resource: 'arn:aws:dynamodb:::table/reinos' })", expected: "Allow", description: P("PutItem/reinos: Allow", "PutItem/reinos: Allow"), raw: true },
        { input: "simular(politica, { action: 'dynamodb:DeleteItem', resource: 'arn:aws:dynamodb:::table/heroes' })", expected: "Deny", description: P("DeleteItem: Deny", "DeleteItem: Deny"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_7: Syllabus = {
  c7_orco_explorador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es una arquitectura orientada a eventos?", "What is an event-driven architecture?"),
        options: [
          p("Un evento (p. ej. subir a S3) dispara una función que actúa", "An event (e.g. an S3 upload) triggers a function that acts"),
          p("Todo corre en un servidor fijo", "Everything runs on a fixed server"),
          p("No hay funciones", "There are no functions"),
          p("Sólo bases de datos", "Only databases"),
        ],
        correct: 0,
        explanation: p("En event-driven, los eventos disparan procesamiento: subes un objeto a S3 → se invoca una Lambda → escribe en DynamoDB.", "In event-driven, events trigger processing: you upload an object to S3 → a Lambda is invoked → it writes to DynamoDB."),
      },
      {
        question: p("Un evento de S3 típico trae…", "A typical S3 event carries…"),
        options: [
          p("El bucket y la clave del objeto afectado", "The bucket and key of the affected object"),
          p("La región y nada más", "Just the region"),
          p("El precio", "The price"),
          p("Un color", "A color"),
        ],
        correct: 0,
        explanation: p("El evento incluye qué bucket y qué clave provocaron el disparo, para que la Lambda sepa qué procesar.", "The event includes which bucket and key triggered it, so the Lambda knows what to process."),
      },
      {
        question: p("Componer S3 + Lambda + DynamoDB permite…", "Composing S3 + Lambda + DynamoDB lets you…"),
        options: [
          p("Reaccionar a subidas y guardar metadatos automáticamente", "React to uploads and store metadata automatically"),
          p("Nada útil", "Nothing useful"),
          p("Sólo almacenar", "Only store"),
          p("Sólo consultar", "Only query"),
        ],
        correct: 0,
        explanation: p("Es un pipeline clásico: objeto subido → Lambda lo procesa → índice/metadatos en DynamoDB. Sin servidores fijos.", "It's a classic pipeline: object uploaded → Lambda processes it → index/metadata in DynamoDB. No fixed servers."),
      }
    ],
  },
  c7_trasgo_frontera: {
    kind: "battle",
    questions: [
      {
        question: p("En el pipeline, ¿quién orquesta las llamadas a S3 y DynamoDB?", "In the pipeline, who orchestrates the S3 and DynamoDB calls?"),
        options: [
          p("La Lambda (el handler)", "The Lambda (the handler)"),
          p("El bucket", "The bucket"),
          p("La cola", "The queue"),
          p("Nadie", "No one"),
        ],
        correct: 0,
        explanation: p("La Lambda es el pegamento: recibe el evento, llama a S3 para leer, a DynamoDB para escribir, etc.", "The Lambda is the glue: it receives the event, calls S3 to read, DynamoDB to write, etc."),
      },
      {
        question: p("¿Por qué guardar metadatos en DynamoDB y el archivo en S3?", "Why store metadata in DynamoDB and the file in S3?"),
        options: [
          p("Cada servicio brilla en lo suyo: objetos grandes en S3, consultas en DynamoDB", "Each service shines at its job: large objects in S3, queries in DynamoDB"),
          p("Por capricho", "On a whim"),
          p("Es lo mismo", "It's the same"),
          p("Para gastar más", "To spend more"),
        ],
        correct: 0,
        explanation: p("Patrón habitual: el binario pesado vive en S3 (barato) y los metadatos consultables en DynamoDB (rápido de buscar).", "Common pattern: the heavy binary lives in S3 (cheap) and the queryable metadata in DynamoDB (fast to look up)."),
      },
      {
        question: p("El fan-out con SNS dentro de una Lambda sirve para…", "Fan-out with SNS inside a Lambda serves to…"),
        options: [
          p("Notificar a varios sistemas de un mismo hecho", "Notify several systems of the same fact"),
          p("Borrar datos", "Delete data"),
          p("Leer de S3", "Read from S3"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Tras procesar, la Lambda publica en SNS para avisar a los interesados (correo, otra cola, otra Lambda…).", "After processing, the Lambda publishes to SNS to notify interested parties (email, another queue, another Lambda…)."),
      }
    ],
  },
  c7_uruk_rastreador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué ventaja da que la Lambda sólo reaccione a eventos?", "What's the advantage of the Lambda only reacting to events?"),
        options: [
          p("Escala sola y no paga cuando no hay trabajo", "It scales on its own and doesn't pay when idle"),
          p("Corre siempre gastando", "Runs always, spending"),
          p("No escala", "Doesn't scale"),
          p("Necesita un servidor 24/7", "Needs a 24/7 server"),
        ],
        correct: 0,
        explanation: p("Serverless: la Lambda se invoca sólo cuando hay un evento, escala con la demanda y no cobras en reposo.", "Serverless: the Lambda is invoked only on an event, scales with demand, and you don't pay while idle."),
      },
      {
        question: p("¿Conviene que cada paso del pipeline haga una sola cosa?", "Should each pipeline step do one thing?"),
        options: [
          p("Sí: funciones pequeñas y componibles", "Yes: small, composable functions"),
          p("No, una función gigante", "No, one giant function"),
          p("Da igual", "It doesn't matter"),
          p("Cuantos más efectos mejor", "The more side effects the better"),
        ],
        correct: 0,
        explanation: p("Funciones pequeñas y enfocadas se prueban, reutilizan y componen mejor que un monolito que lo hace todo.", "Small, focused functions test, reuse and compose better than a monolith that does everything."),
      },
      {
        question: p("Al componer servicios, los datos fluyen…", "When composing services, data flows…"),
        options: [
          p("Del evento hacia los servicios de destino", "From the event toward the target services"),
          p("Al azar", "Randomly"),
          p("Sólo hacia atrás", "Only backward"),
          p("Sin dirección", "Directionless"),
        ],
        correct: 0,
        explanation: p("El evento entra en la Lambda y ésta empuja los datos a S3/DynamoDB/SNS según el flujo diseñado.", "The event enters the Lambda and it pushes data to S3/DynamoDB/SNS along the designed flow."),
      }
    ],
  },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de Isengard", "Uglúk of Isengard"),
    lore_intro: P("El pipeline completo: lee de S3, procesa y guarda en DynamoDB.", "The full pipeline: read from S3, process and store in DynamoDB."),
    challenge: {
      topic: P("Event-driven: S3 → Lambda → DynamoDB", "Event-driven: S3 → Lambda → DynamoDB"),
      instructions: P("Escribe `async function handler(event)` que lea de S3 `{ bucket, clave }`, guarde en la tabla `procesados` el item `{ id: event.clave, contenido: <Body> }` y devuelva `{ statusCode: 200, clave: event.clave }`.", "Write `async function handler(event)` that reads from S3 `{ bucket, clave }`, stores in the `procesados` table the item `{ id: event.clave, contenido: <Body> }` and returns `{ statusCode: 200, clave: event.clave }`."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'entrada', Key: 'orden', Body: 'atacad' });",
      blocks: [
        "async function handler(event) {",
        "  const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });",
        "  await ddb.put({ TableName: 'procesados', Item: { id: event.clave, contenido: r.Body } });",
        "  return { statusCode: 200, clave: event.clave };",
        "}",
        "  return { statusCode: 200, clave: r.Body };",
      ],
      hints: [
        P("Encadena get + put + return, todo con `await`.", "Chain get + put + return, all with `await`."),
        P("`const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });`.", "`const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });`."),
      ],
      test_cases: [
        { input: "handler({ bucket: 'entrada', clave: 'orden' })", expected: {"statusCode":200,"clave":"orden"}, description: P("Devuelve 200 + clave", "Returns 200 + key"), raw: true },
        { input: "(async () => { await handler({ bucket: 'entrada', clave: 'orden' }); return verItem('procesados', 'orden'); })()", expected: {"id":"orden","contenido":"atacad"}, description: P("Guarda el contenido", "Stores the content"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: p("El Pergamino de la Composición", "The Scroll of Composition"),
    lore_intro: p("Un pergamino une los servicios en un flujo de eventos.", "A scroll unites the services into an event flow."),
    scroll: {
      topic: p("AWS: arquitectura event-driven", "AWS: event-driven architecture"),
      sections: [
        { heading: p("Disparo por evento", "Event trigger"), body: p("Un evento (subida a S3) invoca una Lambda con el bucket y la clave.", "An event (S3 upload) invokes a Lambda with the bucket and key."), code: "async function handler(event) {\n  // event.bucket, event.clave\n}" },
        { heading: p("Pipeline S3→Lambda→DynamoDB", "Pipeline S3→Lambda→DynamoDB"), body: p("La Lambda lee de S3 y guarda metadatos en DynamoDB.", "The Lambda reads from S3 and stores metadata in DynamoDB."), code: "const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });\nawait ddb.put({ TableName: 'meta', Item: { id: event.clave, tam: r.Body.length } });" },
        { heading: p("Fan-out con SNS", "Fan-out with SNS"), body: p("Tras procesar, publica en SNS para avisar a otros sistemas.", "After processing, publish to SNS to notify other systems."), code: "await sns.publish({ TopicArn: event.topico, Message: 'procesado:' + event.clave });" },
      ],
      keyTakeaway: p("Event-driven: un evento dispara la Lambda, que orquesta S3 (leer), DynamoDB (guardar) y SNS (avisar). Servicios pequeños y componibles.", "Event-driven: an event triggers the Lambda, which orchestrates S3 (read), DynamoDB (store) and SNS (notify). Small, composable services."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P("Cuando llega un objeto a S3, la Lambda lo indexa en DynamoDB.", "When an object lands in S3, the Lambda indexes it in DynamoDB."),
    challenge: {
      topic: P("Event-driven: indexar", "Event-driven: index"),
      instructions: P("Escribe `async function handler(event)` que guarde en la tabla `indice` el item `{ id: event.clave, bucket: event.bucket }` y devuelva `{ statusCode: 200 }`.", "Write `async function handler(event)` that stores in the `indice` table the item `{ id: event.clave, bucket: event.bucket }` and returns `{ statusCode: 200 }`."),
      starter_code: "async function handler(event) {\n\n}\n",
      blocks: [
        "async function handler(event) {",
        "  await ddb.put({ TableName: 'indice', Item: { id: event.clave, bucket: event.bucket } });",
        "  return { statusCode: 200 };",
        "}",
        "  await ddb.put({ TableName: 'indice', Item: { id: event.bucket, bucket: event.clave } });",
      ],
      hints: [
        P("`await ddb.put({ TableName: 'indice', Item: { id: event.clave, bucket: event.bucket } });`.", "`await ddb.put({ TableName: 'indice', Item: { id: event.clave, bucket: event.bucket } });`."),
      ],
      test_cases: [
        { input: "(async () => { await handler({ bucket: 'fotos', clave: 'estrella.png' }); return verItem('indice', 'estrella.png'); })()", expected: {"id":"estrella.png","bucket":"fotos"}, description: P("Indexa la clave", "Indexes the key"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("La Lambda lee el objeto de S3 y guarda su tamaño en DynamoDB.", "The Lambda reads the S3 object and stores its size in DynamoDB."),
    challenge: {
      topic: P("Event-driven: S3 → metadatos", "Event-driven: S3 → metadata"),
      instructions: P("Escribe `async function handler(event)` que lea de S3 el objeto `{ bucket, clave }`, guarde en la tabla `meta` el item `{ id: event.clave, tam: <largo del Body> }` y devuelva `{ statusCode: 200 }`.", "Write `async function handler(event)` that reads from S3 the object `{ bucket, clave }`, stores in the `meta` table the item `{ id: event.clave, tam: <Body length> }` and returns `{ statusCode: 200 }`."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'ropa', Key: 'capa', Body: 'lorien' });",
      blocks: [
        "async function handler(event) {",
        "  const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });",
        "  await ddb.put({ TableName: 'meta', Item: { id: event.clave, tam: r.Body.length } });",
        "  return { statusCode: 200 };",
        "}",
        "  await ddb.put({ TableName: 'meta', Item: { id: event.clave, tam: r.length } });",
      ],
      hints: [
        P("Lee y luego guarda: `const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });`.", "Read then store: `const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });`."),
        P("`await ddb.put({ TableName: 'meta', Item: { id: event.clave, tam: r.Body.length } });`.", "`await ddb.put({ TableName: 'meta', Item: { id: event.clave, tam: r.Body.length } });`."),
      ],
      test_cases: [
        { input: "(async () => { await handler({ bucket: 'ropa', clave: 'capa' }); return verItem('meta', 'capa'); })()", expected: {"id":"capa","tam":6}, description: P("'lorien' → tam 6", "'lorien' → size 6"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("Reparte el aviso a muchos: fan-out con SNS.", "Spread the notice to many: fan-out with SNS."),
    challenge: {
      topic: P("Event-driven: fan-out SNS", "Event-driven: SNS fan-out"),
      instructions: P("Escribe `async function handler(event)` que publique en `event.topico` cada destinatario de `event.destinatarios` (array) y devuelva `{ statusCode: 200, enviados: <cuántos> }`.", "Write `async function handler(event)` that publishes to `event.topico` each recipient of `event.destinatarios` (array) and returns `{ statusCode: 200, enviados: <how many> }`."),
      starter_code: "async function handler(event) {\n\n}\n",
      blocks: [
        "async function handler(event) {",
        "  for (const d of event.destinatarios) {",
        "    await sns.publish({ TopicArn: event.topico, Message: d });",
        "  }",
        "  return { statusCode: 200, enviados: event.destinatarios.length };",
        "}",
        "  return { statusCode: 200, enviados: event.destinatarios };",
      ],
      hints: [
        P("Recorre y publica: `for (const d of event.destinatarios) { await sns.publish({ TopicArn: event.topico, Message: d }); }`.", "Loop and publish: `for (const d of event.destinatarios) { await sns.publish({ TopicArn: event.topico, Message: d }); }`."),
        P("`return { statusCode: 200, enviados: event.destinatarios.length };`.", "`return { statusCode: 200, enviados: event.destinatarios.length };`."),
      ],
      test_cases: [
        { input: "handler({ topico: 't', destinatarios: ['Frodo', 'Sam'] })", expected: {"statusCode":200,"enviados":2}, description: P("Devuelve enviados: 2", "Returns enviados: 2"), raw: true },
        { input: "(async () => { await handler({ topico: 'u', destinatarios: ['a', 'b', 'c'] }); return verTopico('u'); })()", expected: ["a","b","c"], description: P("Publica a,b,c", "Publishes a,b,c"), raw: true },
      ],
    },
  },
};

export const SYL_AWS_8: Syllabus = {
  c8_uruk_arquero: {
    kind: "battle",
    questions: [
      {
        question: p("Un consumidor de cola que la vacía debe…", "A queue consumer draining it should…"),
        options: [
          p("Recibir en bucle hasta que no haya mensajes", "Receive in a loop until there are no messages"),
          p("Recibir una vez y parar", "Receive once and stop"),
          p("Borrar la cola", "Delete the queue"),
          p("Ignorar los mensajes", "Ignore the messages"),
        ],
        correct: 0,
        explanation: p("Para procesar todo, recibes en bucle mientras `Messages.length` sea mayor que 0; cada recepción saca un mensaje.", "To process everything, you receive in a loop while `Messages.length` is greater than 0; each receive removes a message."),
      },
      {
        question: p("Una política que autoriza 'exactamente el pipeline' aplica…", "A policy authorizing 'exactly the pipeline' applies…"),
        options: [
          p("Mínimo privilegio: sólo las acciones que usa", "Least privilege: only the actions it uses"),
          p("Todos los permisos", "All permissions"),
          p("Ninguno", "None"),
          p("Sólo Deny", "Only Deny"),
        ],
        correct: 0,
        explanation: p("Concedes justo `s3:GetObject` sobre la entrada y `dynamodb:PutItem` sobre la salida; nada más. Mínimo privilegio.", "You grant exactly `s3:GetObject` on the input and `dynamodb:PutItem` on the output; nothing more. Least privilege."),
      },
      {
        question: p("Manejar errores en el handler evita…", "Handling errors in the handler avoids…"),
        options: [
          p("Que un fallo tumbe la invocación sin respuesta útil", "A failure crashing the invocation with no useful response"),
          p("Que escale", "It scaling"),
          p("Que cobre", "It billing"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Con `try/catch` devuelves una respuesta controlada (404, 500) en vez de dejar que la Lambda lance sin más.", "With `try/catch` you return a controlled response (404, 500) instead of letting the Lambda throw unchecked."),
      }
    ],
  },
  c8_orco_saqueador: {
    kind: "battle",
    questions: [
      {
        question: p("Un sistema completo suele encadenar…", "A complete system usually chains…"),
        options: [
          p("Almacenamiento, cómputo, base de datos y notificación", "Storage, compute, database and notification"),
          p("Sólo un servicio", "Only one service"),
          p("Nada", "Nothing"),
          p("Sólo IAM", "Only IAM"),
        ],
        correct: 0,
        explanation: p("Un flujo real toca varios servicios: S3 (guardar), Lambda (procesar), DynamoDB (registrar), SNS (avisar).", "A real flow touches several services: S3 (store), Lambda (process), DynamoDB (record), SNS (notify)."),
      },
      {
        question: p("¿Por qué registrar en DynamoDB Y notificar por SNS tras procesar?", "Why record in DynamoDB AND notify via SNS after processing?"),
        options: [
          p("Persistir el resultado y avisar a otros a la vez", "To persist the result and alert others at once"),
          p("Por duplicar por duplicar", "To duplicate for its own sake"),
          p("Para gastar", "To spend"),
          p("No tiene sentido", "It makes no sense"),
        ],
        correct: 0,
        explanation: p("Registras para consultar después y publicas para desencadenar otros procesos. Persistencia + integración.", "You record to query later and publish to trigger other processes. Persistence + integration."),
      },
      {
        question: p("¿Qué hace robusto a un pipeline serverless?", "What makes a serverless pipeline robust?"),
        options: [
          p("Idempotencia, validación y mínimo privilegio", "Idempotency, validation and least privilege"),
          p("Ignorar errores", "Ignoring errors"),
          p("Permisos amplios", "Broad permissions"),
          p("Un solo intento", "A single attempt"),
        ],
        correct: 0,
        explanation: p("Buenas prácticas: valida la entrada, sé idempotente frente a reintentos y concede sólo los permisos necesarios.", "Best practices: validate input, be idempotent against retries, and grant only the necessary permissions."),
      }
    ],
  },
  c8_uruk_espadachin: {
    kind: "battle",
    questions: [
      {
        question: p("El valor de retorno del handler final del pipeline suele resumir…", "The final pipeline handler's return value usually summarizes…"),
        options: [
          p("El resultado (statusCode y datos clave)", "The result (statusCode and key data)"),
          p("Todo el bucket", "The whole bucket"),
          p("La política IAM", "The IAM policy"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Se devuelve un resumen del resultado: `{ statusCode: 200, clave }`, para que quien invoque sepa qué pasó.", "You return a summary of the result: `{ statusCode: 200, clave }`, so the caller knows what happened."),
      },
      {
        question: p("¿Los efectos (put, publish) deben ocurrir antes de devolver?", "Should side effects (put, publish) happen before returning?"),
        options: [
          p("Sí: con `await` antes del `return`", "Yes: with `await` before the `return`"),
          p("No, después da igual", "No, afterwards is fine"),
          p("Nunca", "Never"),
          p("Sólo el put", "Only the put"),
        ],
        correct: 0,
        explanation: p("Debes `await` los efectos antes de devolver; si no, la Lambda podría terminar antes de completarlos.", "You must `await` the side effects before returning; otherwise the Lambda might finish before they complete."),
      },
      {
        question: p("Juntar S3, Lambda, DynamoDB, SNS e IAM demuestra…", "Combining S3, Lambda, DynamoDB, SNS and IAM demonstrates…"),
        options: [
          p("Que sabes construir un sistema serverless completo", "That you can build a full serverless system"),
          p("Sólo teoría", "Only theory"),
          p("Nada práctico", "Nothing practical"),
          p("Un solo servicio", "A single service"),
        ],
        correct: 0,
        explanation: p("Integrar almacenamiento, cómputo, datos, mensajería y permisos es la prueba de fuego de una arquitectura en la nube.", "Integrating storage, compute, data, messaging and permissions is the acid test of a cloud architecture."),
      }
    ],
  },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("La prueba final: lee de S3, registra en DynamoDB, avisa por SNS.", "The final trial: read from S3, record in DynamoDB, notify via SNS."),
    challenge: {
      topic: P("Sistema completo S3+DynamoDB+SNS", "Complete system S3+DynamoDB+SNS"),
      instructions: P("Escribe `async function handler(event)` que: (1) lea de S3 `{ bucket, clave }`; (2) guarde en la tabla `registro` el item `{ id: event.clave, contenido: <Body> }`; (3) publique en `event.topico` el mensaje `'procesado:' + event.clave`; (4) devuelva `{ statusCode: 200, clave: event.clave }`.", "Write `async function handler(event)` that: (1) reads from S3 `{ bucket, clave }`; (2) stores in the `registro` table the item `{ id: event.clave, contenido: <Body> }`; (3) publishes to `event.topico` the message `'procesado:' + event.clave`; (4) returns `{ statusCode: 200, clave: event.clave }`."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'in', Key: 'anillo', Body: 'uno para gobernarlos' });",
      blocks: [
        "async function handler(event) {",
        "  const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });",
        "  await ddb.put({ TableName: 'registro', Item: { id: event.clave, contenido: r.Body } });",
        "  await sns.publish({ TopicArn: event.topico, Message: 'procesado:' + event.clave });",
        "  return { statusCode: 200, clave: event.clave };",
        "}",
        "  return { statusCode: 200, clave: r.Body };",
      ],
      hints: [
        P("Encadena, con `await` en cada paso: getObject → ddb.put → sns.publish → return.", "Chain, with `await` at each step: getObject → ddb.put → sns.publish → return."),
        P("El mensaje es `'procesado:' + event.clave`.", "The message is `'procesado:' + event.clave`."),
      ],
      test_cases: [
        { input: "handler({ bucket: 'in', clave: 'anillo', topico: 'av' })", expected: {"statusCode":200,"clave":"anillo"}, description: P("Devuelve 200 + clave", "Returns 200 + key"), raw: true },
        { input: "(async () => { await handler({ bucket: 'in', clave: 'anillo', topico: 'av' }); return verItem('registro', 'anillo'); })()", expected: {"id":"anillo","contenido":"uno para gobernarlos"}, description: P("Registra el contenido", "Records the content"), raw: true },
        { input: "(async () => { await handler({ bucket: 'in', clave: 'anillo', topico: 'av' }); return verTopico('av'); })()", expected: ["procesado:anillo"], description: P("Publica el aviso", "Publishes the notice"), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: p("El Pergamino del Sistema Completo", "The Scroll of the Complete System"),
    lore_intro: p("Un pergamino cierra el círculo: todos los servicios juntos.", "A scroll closes the circle: all services together."),
    scroll: {
      topic: p("AWS: integración y buenas prácticas", "AWS: integration and best practices"),
      sections: [
        { heading: p("Vaciar una cola", "Drain a queue"), body: p("Recibe en bucle hasta que `Messages` quede vacío.", "Receive in a loop until `Messages` is empty."), code: "let r = await sqs.receiveMessage({ QueueUrl: cola });\nwhile (r.Messages.length) { /* procesar */ r = await sqs.receiveMessage({ QueueUrl: cola }); }" },
        { heading: p("Mínimo privilegio", "Least privilege"), body: p("La política autoriza sólo lo que el pipeline usa.", "The policy authorizes only what the pipeline uses."), code: "[{ Effect:'Allow', Action:'s3:GetObject', Resource:'arn:aws:s3:::entrada/*' },\n { Effect:'Allow', Action:'dynamodb:PutItem', Resource:'arn:aws:dynamodb:::table/salida' }]" },
        { heading: p("Robustez", "Robustness"), body: p("Valida, sé idempotente y `await` los efectos antes de responder.", "Validate, be idempotent and `await` side effects before responding."), code: "const r = await s3.getObject(...);\nawait ddb.put(...);\nawait sns.publish(...);\nreturn { statusCode: 200 };" },
      ],
      keyTakeaway: p("Sistema completo: consume colas en bucle, concede mínimo privilegio, valida, sé idempotente y await los efectos antes de devolver.", "Complete system: drain queues in a loop, grant least privilege, validate, be idempotent and await side effects before returning."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P("Vacía la cola de trabajo procesando cada mensaje.", "Drain the work queue by processing each message."),
    challenge: {
      topic: P("SQS: vaciar la cola", "SQS: drain the queue"),
      instructions: P("Escribe `async function procesar(cola)` que reciba mensajes en bucle hasta vaciar la cola y devuelva un array con todos los `Body` procesados, en orden.", "Write `async function procesar(cola)` that receives messages in a loop until the queue is empty and returns an array with all the processed `Body`s, in order."),
      starter_code: "async function procesar(cola) {\n\n}\n",
        support_code: "await sqs.sendMessage({ QueueUrl: 'trabajo', MessageBody: 'a' });\nawait sqs.sendMessage({ QueueUrl: 'trabajo', MessageBody: 'b' });\nawait sqs.sendMessage({ QueueUrl: 'trabajo', MessageBody: 'c' });",
      blocks: [
        "async function procesar(cola) {",
        "  const hechos = [];",
        "  let r = await sqs.receiveMessage({ QueueUrl: cola });",
        "  while (r.Messages.length) {",
        "    hechos.push(r.Messages[0].Body);",
        "    r = await sqs.receiveMessage({ QueueUrl: cola });",
        "  }",
        "  return hechos;",
        "}",
        "  const r = await sqs.receiveMessage({ QueueUrl: cola }); return [r.Messages[0].Body];",
      ],
      hints: [
        P("Recibe en bucle mientras haya mensajes: `while (r.Messages.length) { ... r = await sqs.receiveMessage(...); }`.", "Receive in a loop while there are messages: `while (r.Messages.length) { ... r = await sqs.receiveMessage(...); }`."),
        P("Acumula `r.Messages[0].Body` en un array.", "Accumulate `r.Messages[0].Body` in an array."),
      ],
      test_cases: [
        { input: "procesar('trabajo')", expected: ["a","b","c"], description: P("Procesa a,b,c", "Processes a,b,c"), raw: true },
        { input: "(async () => { await procesar('trabajo'); return verCola('trabajo'); })()", expected: [], description: P("Deja la cola vacía", "Leaves the queue empty"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("Autoriza EXACTAMENTE el pipeline: leer de la entrada, escribir en la salida.", "Authorize EXACTLY the pipeline: read from input, write to output."),
    challenge: {
      topic: P("IAM: mínimo privilegio", "IAM: least privilege"),
      instructions: P("Define `const politica` con dos statements Allow: `s3:GetObject` sobre `arn:aws:s3:::entrada/*` y `dynamodb:PutItem` sobre `arn:aws:dynamodb:::table/salida`. Nada más.", "Define `const politica` with two Allow statements: `s3:GetObject` on `arn:aws:s3:::entrada/*` and `dynamodb:PutItem` on `arn:aws:dynamodb:::table/salida`. Nothing else."),
      starter_code: "const politica = {\n  Version: '2012-10-17',\n  Statement: [\n\n  ]\n};\n",
      blocks: [
        "const politica = {",
        "  Version: '2012-10-17',",
        "  Statement: [",
        "    { Effect: 'Allow', Action: 's3:GetObject', Resource: 'arn:aws:s3:::entrada/*' },",
        "    { Effect: 'Allow', Action: 'dynamodb:PutItem', Resource: 'arn:aws:dynamodb:::table/salida' }",
        "  ]",
        "};",
        "    { Effect: 'Allow', Action: 's3:*', Resource: '*' }",
      ],
      hints: [
        P("Sólo las dos acciones del pipeline; el resto queda denegado por defecto.", "Only the two pipeline actions; the rest is denied by default."),
      ],
      test_cases: [
        { input: "simular(politica, { action: 's3:GetObject', resource: 'arn:aws:s3:::entrada/x' })", expected: "Allow", description: P("s3:GetObject entrada: Allow", "s3:GetObject entrada: Allow"), raw: true },
        { input: "simular(politica, { action: 'dynamodb:PutItem', resource: 'arn:aws:dynamodb:::table/salida' })", expected: "Allow", description: P("dynamodb:PutItem salida: Allow", "dynamodb:PutItem salida: Allow"), raw: true },
        { input: "simular(politica, { action: 's3:DeleteObject', resource: 'arn:aws:s3:::entrada/x' })", expected: "Deny", description: P("s3:DeleteObject: Deny", "s3:DeleteObject: Deny"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("El handler resiste el fallo: si el objeto no está, responde 404.", "The handler withstands failure: if the object is missing, it responds 404."),
    challenge: {
      topic: P("Lambda: try/catch → 404", "Lambda: try/catch → 404"),
      instructions: P("Escribe `async function handler(event)` que intente leer de S3 `{ bucket, clave }`: si existe, devuelve `{ statusCode: 200, body: <Body> }`; si `getObject` lanza, devuelve `{ statusCode: 404 }` (usa `try/catch`).", "Write `async function handler(event)` that tries to read from S3 `{ bucket, clave }`: if it exists, return `{ statusCode: 200, body: <Body> }`; if `getObject` throws, return `{ statusCode: 404 }` (use `try/catch`)."),
      starter_code: "async function handler(event) {\n\n}\n",
        support_code: "await s3.putObject({ Bucket: 'saco', Key: 'joya', Body: 'silmaril' });",
      blocks: [
        "async function handler(event) {",
        "  try {",
        "    const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave });",
        "    return { statusCode: 200, body: r.Body };",
        "  } catch (e) {",
        "    return { statusCode: 404 };",
        "  }",
        "}",
        "  const r = await s3.getObject({ Bucket: event.bucket, Key: event.clave }); return { statusCode: 200, body: r.Body };",
      ],
      hints: [
        P("Envuelve la lectura: `try { const r = await s3.getObject(...); return { statusCode: 200, body: r.Body }; } catch (e) { return { statusCode: 404 }; }`.", "Wrap the read: `try { const r = await s3.getObject(...); return { statusCode: 200, body: r.Body }; } catch (e) { return { statusCode: 404 }; }`."),
      ],
      test_cases: [
        { input: "handler({ bucket: 'saco', clave: 'joya' })", expected: {"statusCode":200,"body":"silmaril"}, description: P("Existe: 200 + body", "Exists: 200 + body"), raw: true },
        { input: "handler({ bucket: 'saco', clave: 'inexistente' })", expected: {"statusCode":404}, description: P("No existe: 404", "Missing: 404"), raw: true },
      ],
    },
  },
};
