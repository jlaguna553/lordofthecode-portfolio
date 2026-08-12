import type { Syllabus } from "@/lib/game/narrative";

/**
 * Temario de Docker sobre la narrativa compartida de la Comunidad. No hay Docker
 * real: el jugador escribe un Dockerfile y un SIMULADOR de build lo parsea y
 * produce una "imagen" (ver `lib/game/docker-evaluator.ts`). En los tests, `img`
 * es la imagen construida (img.from, img.workdir, img.env, img.copies, img.cmd,
 * img.expose, img.stages, img.capas…). Bilingüe ES/EN. ARCHIVO GENERADO (gen-docker).
 */

const P = (es: string, en: string) => ({ es, en });
const p = P;

export const SYL_DOCKER_1: Syllabus = {
  c1_espia: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es una imagen de Docker?", "What is a Docker image?"),
        options: [
          p("Una plantilla inmutable con todo lo necesario para ejecutar una app", "An immutable template with everything needed to run an app"),
          p("Una máquina virtual completa", "A full virtual machine"),
          p("Un archivo de logs", "A log file"),
          p("Una base de datos", "A database"),
        ],
        correct: 0,
        explanation: p("Una imagen empaqueta el sistema base, dependencias, código y config. Es inmutable; de ella se arrancan contenedores.", "An image packages the base system, dependencies, code and config. It's immutable; containers are started from it."),
      },
      {
        question: p("¿Para qué sirve un Dockerfile?", "What is a Dockerfile for?"),
        options: [
          p("Es la receta que describe cómo construir una imagen", "It's the recipe describing how to build an image"),
          p("Arranca un contenedor", "It starts a container"),
          p("Es un log", "It's a log"),
          p("Define una red", "It defines a network"),
        ],
        correct: 0,
        explanation: p("El Dockerfile lista instrucciones (FROM, COPY, RUN, CMD…) que `docker build` ejecuta para producir la imagen.", "The Dockerfile lists instructions (FROM, COPY, RUN, CMD…) that `docker build` runs to produce the image."),
      },
      {
        question: p("¿Con qué instrucción debe empezar (casi siempre) un Dockerfile?", "Which instruction must (almost always) start a Dockerfile?"),
        options: [
          p("`FROM`, que fija la imagen base", "`FROM`, which sets the base image"),
          p("`RUN`", "`RUN`"),
          p("`CMD`", "`CMD`"),
          p("`COPY`", "`COPY`"),
        ],
        correct: 0,
        explanation: p("`FROM imagen` es la base sobre la que se construye todo. Es la primera instrucción (salvo `ARG` previo).", "`FROM image` is the base everything builds on. It's the first instruction (except a preceding `ARG`)."),
      }
    ],
  },
  c1_jinete_rastreador: {
    kind: "battle",
    questions: [
      {
        question: p("En `FROM node:20`, ¿qué es `20`?", "In `FROM node:20`, what is `20`?"),
        options: [
          p("El TAG (versión) de la imagen", "The image TAG (version)"),
          p("El puerto", "The port"),
          p("El nombre del contenedor", "The container name"),
          p("El número de capas", "The layer count"),
        ],
        correct: 0,
        explanation: p("`imagen:tag` fija la versión. `node:20` es Node 20; sin tag se asume `latest` (poco recomendable en producción).", "`image:tag` pins the version. `node:20` is Node 20; with no tag `latest` is assumed (not recommended in production)."),
      },
      {
        question: p("¿Qué hace `WORKDIR /app`?", "What does `WORKDIR /app` do?"),
        options: [
          p("Fija el directorio de trabajo para las instrucciones siguientes", "Sets the working directory for the following instructions"),
          p("Copia /app", "Copies /app"),
          p("Borra /app", "Deletes /app"),
          p("Expone un puerto", "Exposes a port"),
        ],
        correct: 0,
        explanation: p("`WORKDIR` cambia el directorio actual (lo crea si no existe). COPY, RUN y CMD posteriores operan desde ahí.", "`WORKDIR` changes the current directory (creating it if missing). Later COPY, RUN and CMD operate from there."),
      },
      {
        question: p("¿Por qué es mejor fijar un tag concreto en vez de `latest`?", "Why pin a specific tag instead of `latest`?"),
        options: [
          p("Reproducibilidad: `latest` cambia con el tiempo", "Reproducibility: `latest` changes over time"),
          p("Es más rápido", "It's faster"),
          p("Ocupa menos", "It's smaller"),
          p("No importa", "It doesn't matter"),
        ],
        correct: 0,
        explanation: p("`latest` apunta a una imagen que evoluciona; fijar `node:20` garantiza builds reproducibles.", "`latest` points to an evolving image; pinning `node:20` guarantees reproducible builds."),
      }
    ],
  },
  c1_perro_negro: {
    kind: "battle",
    questions: [
      {
        question: p("Si haces dos `WORKDIR` relativos seguidos (`/srv` y luego `app`), ¿cuál es el resultado?", "With two relative WORKDIRs in a row (`/srv` then `app`), what's the result?"),
        options: [
          p("Se combinan: `/srv/app`", "They combine: `/srv/app`"),
          p("`/app`", "`/app`"),
          p("`/srv`", "`/srv`"),
          p("Error", "Error"),
        ],
        correct: 0,
        explanation: p("`WORKDIR` con ruta relativa se resuelve sobre el WORKDIR anterior. `/srv` + `app` = `/srv/app`.", "A relative `WORKDIR` resolves against the previous one. `/srv` + `app` = `/srv/app`."),
      },
      {
        question: p("¿Un contenedor y una imagen son lo mismo?", "Are a container and an image the same?"),
        options: [
          p("No: el contenedor es una instancia EN EJECUCIÓN de una imagen", "No: the container is a RUNNING instance of an image"),
          p("Sí", "Yes"),
          p("La imagen se ejecuta, el contenedor no", "The image runs, the container doesn't"),
          p("Son sinónimos exactos", "They're exact synonyms"),
        ],
        correct: 0,
        explanation: p("La imagen es la plantilla inmutable; el contenedor es una instancia viva creada a partir de ella.", "The image is the immutable template; the container is a live instance created from it."),
      },
      {
        question: p("¿Qué imágenes base suelen ser más pequeñas?", "Which base images tend to be smaller?"),
        options: [
          p("Las `alpine` o `-slim`", "The `alpine` or `-slim` ones"),
          p("Las `latest`", "The `latest` ones"),
          p("Todas igual", "All the same"),
          p("Las más nuevas", "The newest ones"),
        ],
        correct: 0,
        explanation: p("`alpine` (Linux minimalista) y las variantes `-slim` reducen mucho el tamaño frente a la imagen completa.", "`alpine` (minimal Linux) and `-slim` variants greatly reduce size versus the full image."),
      }
    ],
  },
  c1_jefe_nazgul: {
    kind: "challenge",
    title: P("El Rey Brujo de Angmar", "The Witch-king of Angmar"),
    lore_intro: P("Los WORKDIR relativos se combinan. Domina la ruta.", "Relative WORKDIRs combine. Master the path."),
    challenge: {
      topic: P("WORKDIR acumulativo", "Cumulative WORKDIR"),
      instructions: P("Escribe un Dockerfile con base `alpine`, luego `WORKDIR /srv` y después `WORKDIR app` (relativo). El directorio final debe quedar en `/srv/app`.", "Write a Dockerfile with base `alpine`, then `WORKDIR /srv` and then `WORKDIR app` (relative). The final directory must be `/srv/app`."),
      starter_code: "FROM alpine\n",
      blocks: [
        "FROM alpine",
        "WORKDIR /srv",
        "WORKDIR app",
        "WORKDIR /srv/app",
      ],
      hints: [
        P("Un `WORKDIR` relativo se resuelve sobre el anterior: `/srv` + `app` = `/srv/app`.", "A relative `WORKDIR` resolves against the previous: `/srv` + `app` = `/srv/app`."),
      ],
      test_cases: [
        { input: "img.from", expected: "alpine", description: P("Base alpine", "Base alpine"), raw: true },
        { input: "img.workdir", expected: "/srv/app", description: P("WORKDIR /srv/app", "WORKDIR /srv/app"), raw: true },
      ],
    },
  },
  pergamino_clases: {
    kind: "scroll",
    title: p("El Pergamino de la Imagen", "The Scroll of the Image"),
    lore_intro: p("Un pergamino enseña a elegir la base y el directorio de trabajo.", "A scroll teaches how to pick the base and working directory."),
    scroll: {
      topic: p("Docker: FROM y WORKDIR", "Docker: FROM and WORKDIR"),
      sections: [
        { heading: p("Imagen base", "Base image"), body: p("`FROM imagen:tag` fija la base. Usa un tag concreto (no `latest`) para builds reproducibles.", "`FROM image:tag` sets the base. Use a specific tag (not `latest`) for reproducible builds."), code: "FROM node:20" },
        { heading: p("Directorio de trabajo", "Working directory"), body: p("`WORKDIR` fija el directorio para COPY/RUN/CMD siguientes; con ruta relativa se combina con el anterior.", "`WORKDIR` sets the directory for later COPY/RUN/CMD; a relative path combines with the previous one."), code: "WORKDIR /app" },
        { heading: p("Imagen vs contenedor", "Image vs container"), body: p("La imagen es la plantilla inmutable; el contenedor es una instancia en ejecución. Elige bases pequeñas (`alpine`, `-slim`).", "The image is the immutable template; the container is a running instance. Pick small bases (`alpine`, `-slim`)."), code: "FROM python:3.12-slim" },
      ],
      keyTakeaway: p("`FROM imagen:tag` fija la base (tag concreto, base pequeña); `WORKDIR` fija el directorio de trabajo. La imagen es la plantilla; el contenedor, su instancia.", "`FROM image:tag` sets the base (specific tag, small base); `WORKDIR` sets the working directory. The image is the template; the container, its instance."),
    },
  },
  sendero_comarca: {
    kind: "challenge",
    title: P("Preparar la Huida", "Preparing the Flight"),
    lore_intro: P("Toda imagen parte de una base. Elige la tuya.", "Every image starts from a base. Choose yours."),
    challenge: {
      topic: P("Imagen base (FROM)", "Base image (FROM)"),
      instructions: P("Escribe un Dockerfile que use como base la imagen `node:20` (instrucción `FROM`).", "Write a Dockerfile using `node:20` as the base image (`FROM` instruction)."),
      starter_code: "# Escribe tu Dockerfile\n",
      blocks: [
        "FROM node:20",
        "FROM node:latest",
      ],
      hints: [
        P("`FROM imagen:tag`, p. ej. `FROM node:20`.", "`FROM image:tag`, e.g. `FROM node:20`."),
      ],
      test_cases: [
        { input: "img.from", expected: "node:20", description: P("Base node:20", "Base node:20"), raw: true },
      ],
    },
  },
  halito_negro: {
    kind: "challenge",
    title: P("El Hálito Negro", "The Black Breath"),
    lore_intro: P("Fija dónde vivirá tu app dentro de la imagen.", "Set where your app will live inside the image."),
    challenge: {
      topic: P("FROM + WORKDIR", "FROM + WORKDIR"),
      instructions: P("Escribe un Dockerfile con base `python:3.12` y directorio de trabajo `/app` (`WORKDIR`).", "Write a Dockerfile with base `python:3.12` and working directory `/app` (`WORKDIR`)."),
      starter_code: "FROM python:3.12\n",
      blocks: [
        "FROM python:3.12",
        "WORKDIR /app",
        "COPY . /app",
      ],
      hints: [
        P("Añade `WORKDIR /app` tras el `FROM`.", "Add `WORKDIR /app` after the `FROM`."),
      ],
      test_cases: [
        { input: "img.from", expected: "python:3.12", description: P("Base y WORKDIR", "Base and WORKDIR"), raw: true },
        { input: "img.workdir", expected: "/app", description: P("", ""), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_2: Syllabus = {
  c2_raiz: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué hace `COPY package.json .`?", "What does `COPY package.json .` do?"),
        options: [
          p("Copia el archivo del contexto a la imagen (en el WORKDIR)", "Copies the file from the build context into the image (at WORKDIR)"),
          p("Lo borra", "Deletes it"),
          p("Lo ejecuta", "Runs it"),
          p("Lo expone", "Exposes it"),
        ],
        correct: 0,
        explanation: p("`COPY origen destino` mete archivos del contexto de build en la imagen. El `.` es el WORKDIR actual.", "`COPY src dest` puts files from the build context into the image. The `.` is the current WORKDIR."),
      },
      {
        question: p("¿Qué hace `RUN npm install`?", "What does `RUN npm install` do?"),
        options: [
          p("Ejecuta un comando DURANTE el build y guarda el resultado en una capa", "Runs a command DURING the build and stores the result in a layer"),
          p("Lo ejecuta al arrancar el contenedor", "Runs it when the container starts"),
          p("Nada", "Nothing"),
          p("Copia archivos", "Copies files"),
        ],
        correct: 0,
        explanation: p("`RUN` ejecuta comandos en tiempo de BUILD (instalar deps, compilar). Su resultado queda en una capa de la imagen.", "`RUN` executes commands at BUILD time (install deps, compile). Its result is baked into an image layer."),
      },
      {
        question: p("Diferencia clave entre `RUN` y `CMD`:", "Key difference between `RUN` and `CMD`:"),
        options: [
          p("`RUN` ejecuta al construir; `CMD` define qué se ejecuta al arrancar", "`RUN` runs at build; `CMD` defines what runs at start"),
          p("Son iguales", "They're the same"),
          p("`CMD` construye", "`CMD` builds"),
          p("`RUN` arranca el contenedor", "`RUN` starts the container"),
        ],
        correct: 0,
        explanation: p("`RUN` es build-time (queda en la imagen); `CMD` es runtime (el proceso por defecto del contenedor).", "`RUN` is build-time (baked into the image); `CMD` is runtime (the container's default process)."),
      }
    ],
  },
  c2_niebla: {
    kind: "battle",
    questions: [
      {
        question: p("¿En qué se diferencian `COPY` y `ADD`?", "How do `COPY` and `ADD` differ?"),
        options: [
          p("`ADD` además descomprime tars y acepta URLs; `COPY` sólo copia", "`ADD` also unpacks tars and accepts URLs; `COPY` just copies"),
          p("Son idénticos", "They're identical"),
          p("`COPY` descomprime", "`COPY` unpacks"),
          p("`ADD` borra", "`ADD` deletes"),
        ],
        correct: 0,
        explanation: p("Se recomienda `COPY` por ser explícito; `ADD` tiene magia extra (descomprimir, descargar) que conviene evitar salvo que la necesites.", "`COPY` is recommended for being explicit; `ADD` has extra magic (unpack, download) best avoided unless needed."),
      },
      {
        question: p("¿Qué es el 'contexto de build'?", "What is the 'build context'?"),
        options: [
          p("El conjunto de archivos que se envían al construir (la carpeta del build)", "The set of files sent when building (the build folder)"),
          p("El contenedor", "The container"),
          p("La imagen base", "The base image"),
          p("La red", "The network"),
        ],
        correct: 0,
        explanation: p("`docker build .` envía esa carpeta como contexto; `COPY` sólo puede copiar de ahí. `.dockerignore` excluye archivos.", "`docker build .` sends that folder as the context; `COPY` can only copy from it. `.dockerignore` excludes files."),
      },
      {
        question: p("¿Cada `RUN` crea…?", "Each `RUN` creates…?"),
        options: [
          p("Una capa nueva en la imagen", "A new layer in the image"),
          p("Un contenedor", "A container"),
          p("Una red", "A network"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Cada instrucción RUN/COPY/ADD añade una capa. Menos capas y bien ordenadas = imágenes más pequeñas y mejor caché.", "Each RUN/COPY/ADD instruction adds a layer. Fewer, well-ordered layers = smaller images and better caching."),
      }
    ],
  },
  c2_sauce: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué archivo excluye ficheros del contexto de build?", "Which file excludes files from the build context?"),
        options: [
          p("`.dockerignore`", "`.dockerignore`"),
          p("`.gitignore`", "`.gitignore`"),
          p("`Dockerfile.ignore`", "`Dockerfile.ignore`"),
          p("`exclude.txt`", "`exclude.txt`"),
        ],
        correct: 0,
        explanation: p("`.dockerignore` evita enviar `node_modules`, `.git`, etc. al build: más rápido y evita copiar basura.", "`.dockerignore` avoids sending `node_modules`, `.git`, etc. to the build: faster and avoids copying junk."),
      },
      {
        question: p("`COPY . .` copia…", "`COPY . .` copies…"),
        options: [
          p("Todo el contexto al WORKDIR de la imagen", "The whole context into the image's WORKDIR"),
          p("Sólo un archivo", "Just one file"),
          p("Nada", "Nothing"),
          p("La imagen base", "The base image"),
        ],
        correct: 0,
        explanation: p("El primer `.` es el contexto (todo), el segundo es el destino (WORKDIR). Suele ir tras instalar dependencias.", "The first `.` is the context (everything), the second is the destination (WORKDIR). It usually goes after installing deps."),
      },
      {
        question: p("¿Por qué copiar primero `package.json` y luego el resto del código?", "Why copy `package.json` first and the rest of the code later?"),
        options: [
          p("Para aprovechar la caché: si el código cambia pero no las deps, no reinstala", "To leverage caching: if code changes but deps don't, it won't reinstall"),
          p("Por orden alfabético", "For alphabetical order"),
          p("Es obligatorio", "It's mandatory"),
          p("No influye", "It doesn't matter"),
        ],
        correct: 0,
        explanation: p("Docker cachea capas: si `package.json` no cambia, la capa de `npm install` se reutiliza aunque cambie tu código.", "Docker caches layers: if `package.json` is unchanged, the `npm install` layer is reused even when your code changes."),
      }
    ],
  },
  c2_jefe_tumulario: {
    kind: "challenge",
    title: P("El Señor de los Túmulos", "The Lord of the Barrows"),
    lore_intro: P("El flujo Python: requirements, install, código.", "The Python flow: requirements, install, code."),
    challenge: {
      topic: P("Flujo de build (Python)", "Build flow (Python)"),
      instructions: P("Sobre `python:3.12` con `WORKDIR /app`: copia `requirements.txt`, ejecuta `pip install -r requirements.txt`, y luego `COPY . .`.", "On `python:3.12` with `WORKDIR /app`: copy `requirements.txt`, run `pip install -r requirements.txt`, then `COPY . .`."),
      starter_code: "FROM python:3.12\nWORKDIR /app\n",
      blocks: [
        "FROM python:3.12",
        "WORKDIR /app",
        "COPY requirements.txt .",
        "RUN pip install -r requirements.txt",
        "COPY . .",
        "RUN pip install requirements.txt",
      ],
      hints: [
        P("Copia primero el `requirements.txt` para aprovechar la caché.", "Copy `requirements.txt` first to leverage the cache."),
      ],
      test_cases: [
        { input: "img.copies[0].src", expected: "requirements.txt", description: P("Copia requirements", "Copies requirements"), raw: true },
        { input: "img.runs[0]", expected: "pip install -r requirements.txt", description: P("pip install", "pip install"), raw: true },
        { input: "img.capas", expected: 3, description: P("3 capas", "3 layers"), raw: true },
      ],
    },
  },
  pergamino_ciclo_vida: {
    kind: "scroll",
    title: p("El Pergamino de la Carga", "The Scroll of the Load"),
    lore_intro: p("Un pergamino enseña a traer archivos y ejecutar pasos de build.", "A scroll teaches how to bring files and run build steps."),
    scroll: {
      topic: p("Docker: COPY y RUN", "Docker: COPY and RUN"),
      sections: [
        { heading: p("Copiar del contexto", "Copy from the context"), body: p("`COPY origen destino` mete archivos del contexto de build en la imagen. `.dockerignore` excluye lo que no debe ir.", "`COPY src dest` puts context files into the image. `.dockerignore` excludes what shouldn't go."), code: "COPY package.json ." },
        { heading: p("Ejecutar en build", "Run at build"), body: p("`RUN` ejecuta comandos al construir (instalar, compilar). Cada RUN/COPY añade una capa.", "`RUN` executes commands at build time (install, compile). Each RUN/COPY adds a layer."), code: "RUN npm install" },
        { heading: p("Orden para la caché", "Order for caching"), body: p("Copia primero las dependencias, instala, y luego el resto del código: así la caché de deps se reutiliza.", "Copy dependencies first, install, then the rest of the code: so the deps cache is reused."), code: "COPY package.json .\nRUN npm install\nCOPY . ." },
      ],
      keyTakeaway: p("`COPY` trae archivos del contexto; `RUN` ejecuta pasos de build (cada uno una capa). Copia deps antes que el código para aprovechar la caché. `COPY` mejor que `ADD`.", "`COPY` brings context files; `RUN` runs build steps (each a layer). Copy deps before code to leverage caching. Prefer `COPY` over `ADD`."),
    },
  },
  viejo_hombre_sauce: {
    kind: "challenge",
    title: P("El Viejo Hombre-Sauce", "Old Man Willow"),
    lore_intro: P("Trae el manifiesto de dependencias a la imagen.", "Bring the dependency manifest into the image."),
    challenge: {
      topic: P("COPY", "COPY"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`, copia `package.json` al directorio actual con `COPY package.json .`.", "On `node:20` with `WORKDIR /app`, copy `package.json` to the current directory with `COPY package.json .`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY package.json .",
        "ADD package.json .",
      ],
      hints: [
        P("`COPY origen destino`; el destino `.` es el WORKDIR.", "`COPY src dest`; the dest `.` is the WORKDIR."),
      ],
      test_cases: [
        { input: "img.copies[0].src", expected: "package.json", description: P("Copia package.json", "Copies package.json"), raw: true },
        { input: "img.copies[0].dest", expected: ".", description: P("", ""), raw: true },
      ],
    },
  },
  tumulo_espectro: {
    kind: "challenge",
    title: P("El Espectro del Túmulo", "The Barrow-wight"),
    lore_intro: P("Instala las dependencias durante el build.", "Install dependencies during the build."),
    challenge: {
      topic: P("RUN", "RUN"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`, ejecuta `npm install` en tiempo de build con `RUN`.", "On `node:20` with `WORKDIR /app`, run `npm install` at build time with `RUN`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "RUN npm install",
        "CMD npm install",
      ],
      hints: [
        P("`RUN npm install` ejecuta el comando al construir.", "`RUN npm install` runs the command at build."),
      ],
      test_cases: [
        { input: "img.runs", expected: ["npm install"], description: P("Instala deps", "Installs deps"), raw: true },
        { input: "img.runs.length", expected: 1, description: P("Una sola RUN", "A single RUN"), raw: true },
      ],
    },
  },
  canto_bombadil: {
    kind: "challenge",
    title: P("El Canto de Bombadil", "Bombadil's Song"),
    lore_intro: P("Copia, instala y trae el resto: el flujo básico.", "Copy, install and bring the rest: the basic flow."),
    challenge: {
      topic: P("COPY + RUN + COPY", "COPY + RUN + COPY"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`: copia `package.json`, ejecuta `npm install`, y luego copia todo con `COPY . .`.", "On `node:20` with `WORKDIR /app`: copy `package.json`, run `npm install`, then copy everything with `COPY . .`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY package.json .",
        "RUN npm install",
        "COPY . .",
        "COPY . ./todo",
      ],
      hints: [
        P("Primero `COPY package.json .`, luego `RUN npm install`, y al final `COPY . .`.", "First `COPY package.json .`, then `RUN npm install`, and finally `COPY . .`."),
      ],
      test_cases: [
        { input: "img.copies.length", expected: 2, description: P("Dos COPY", "Two COPYs"), raw: true },
        { input: "img.copies[1].src", expected: ".", description: P("Segundo COPY: `.`", "Second COPY: `.`"), raw: true },
        { input: "img.runs", expected: ["npm install"], description: P("Una RUN", "One RUN"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_3: Syllabus = {
  c3_ferny: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué hace `ENV PORT=3000`?", "What does `ENV PORT=3000` do?"),
        options: [
          p("Define una variable de entorno disponible en build y en runtime", "Defines an env var available at build and runtime"),
          p("Expone el puerto 3000", "Exposes port 3000"),
          p("Arranca en el 3000", "Starts on 3000"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`ENV` fija variables de entorno que persisten en la imagen y las ve el proceso del contenedor.", "`ENV` sets environment variables that persist in the image and are visible to the container's process."),
      },
      {
        question: p("¿Cuándo existe una variable `ARG`?", "When does an `ARG` variable exist?"),
        options: [
          p("Sólo durante el BUILD", "Only during the BUILD"),
          p("Sólo en runtime", "Only at runtime"),
          p("Siempre", "Always"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("`ARG` es un argumento de BUILD (se pasa con `--build-arg`); no está disponible cuando el contenedor corre.", "`ARG` is a BUILD argument (passed with `--build-arg`); it's not available when the container runs."),
      },
      {
        question: p("Diferencia entre `ENV` y `ARG`:", "Difference between `ENV` and `ARG`:"),
        options: [
          p("`ARG` es sólo build-time; `ENV` persiste en runtime", "`ARG` is build-time only; `ENV` persists at runtime"),
          p("Son iguales", "They're the same"),
          p("`ENV` es sólo build", "`ENV` is build only"),
          p("`ARG` persiste en runtime", "`ARG` persists at runtime"),
        ],
        correct: 0,
        explanation: p("Usa `ARG` para parámetros de construcción (versiones); `ENV` para config que el proceso necesita al ejecutarse.", "Use `ARG` for build parameters (versions); `ENV` for config the process needs at runtime."),
      }
    ],
  },
  c3_espia_nazgul: {
    kind: "battle",
    questions: [
      {
        question: p("¿Cómo defines varias variables en un solo `ENV`?", "How do you define several vars in one `ENV`?"),
        options: [
          p("`ENV A=1 B=2`", "`ENV A=1 B=2`"),
          p("`ENV A=1, B=2`", "`ENV A=1, B=2`"),
          p("`ENV [A=1 B=2]`", "`ENV [A=1 B=2]`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("Separas los pares por espacios: `ENV A=1 B=2`. Cada uno queda como variable de entorno.", "You separate pairs by spaces: `ENV A=1 B=2`. Each becomes an env var."),
      },
      {
        question: p("¿Se puede pasar un valor a `ARG` al construir?", "Can you pass a value to `ARG` at build time?"),
        options: [
          p("Sí, con `docker build --build-arg VERSION=2.0`", "Yes, with `docker build --build-arg VERSION=2.0`"),
          p("No", "No"),
          p("Sólo en runtime", "Only at runtime"),
          p("Sólo con ENV", "Only with ENV"),
        ],
        correct: 0,
        explanation: p("`ARG VERSION=1.0` da un valor por defecto que se puede sobreescribir con `--build-arg` al construir.", "`ARG VERSION=1.0` gives a default that can be overridden with `--build-arg` at build."),
      },
      {
        question: p("¿Puede un `ENV` usar el valor de un `ARG`?", "Can an `ENV` use an `ARG`'s value?"),
        options: [
          p("Sí: `ARG V` y luego `ENV VERSION=$V` lo fija en la imagen", "Yes: `ARG V` then `ENV VERSION=$V` bakes it into the image"),
          p("No", "No"),
          p("Sólo al revés", "Only the other way"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("Un patrón común: recibes un `ARG` de build y lo 'congelas' en un `ENV` para que exista en runtime.", "A common pattern: take a build `ARG` and 'freeze' it into an `ENV` so it exists at runtime."),
      }
    ],
  },
  c3_montaraz_falso: {
    kind: "battle",
    questions: [
      {
        question: p("Las variables de entorno de `ENV`, ¿las ve el proceso del contenedor?", "Are `ENV` variables visible to the container's process?"),
        options: [
          p("Sí", "Yes"),
          p("No", "No"),
          p("Sólo en build", "Only at build"),
          p("Sólo con --build-arg", "Only with --build-arg"),
        ],
        correct: 0,
        explanation: p("El proceso lee `ENV` como cualquier variable de entorno del sistema. Ideal para config (PORT, NODE_ENV…).", "The process reads `ENV` like any system env var. Ideal for config (PORT, NODE_ENV…)."),
      },
      {
        question: p("¿Conviene poner secretos (contraseñas) en `ENV` del Dockerfile?", "Should you put secrets (passwords) in the Dockerfile's `ENV`?"),
        options: [
          p("No: quedan en la imagen y en su historial", "No: they end up in the image and its history"),
          p("Sí, siempre", "Yes, always"),
          p("Sólo si son largos", "Only if they're long"),
          p("Da igual", "It doesn't matter"),
        ],
        correct: 0,
        explanation: p("Los valores de `ENV`/`ARG` quedan grabados en las capas; los secretos se pasan en runtime o con secret mounts.", "`ENV`/`ARG` values are baked into layers; secrets should be passed at runtime or via secret mounts."),
      },
      {
        question: p("`ENV NODE_ENV=production` sirve típicamente para…", "`ENV NODE_ENV=production` typically serves to…"),
        options: [
          p("Que la app y las libs se comporten en modo producción", "Make the app and libs behave in production mode"),
          p("Exponer un puerto", "Expose a port"),
          p("Crear un volumen", "Create a volume"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Muchas herramientas leen `NODE_ENV` para activar optimizaciones y desactivar avisos de desarrollo.", "Many tools read `NODE_ENV` to enable optimizations and disable dev warnings."),
      }
    ],
  },
  c3_jefe_reybrujo: {
    kind: "challenge",
    title: P("El Grito del Rey Brujo", "The Witch-king's Cry"),
    lore_intro: P("Combina un ARG de build con ENV de runtime.", "Combine a build ARG with runtime ENV."),
    challenge: {
      topic: P("ARG + ENV", "ARG + ENV"),
      instructions: P("Sobre `node:20`: declara `ARG VERSION=2.0`, y define dos variables de entorno: `APP_VERSION=produccion` y `PORT=3000`.", "On `node:20`: declare `ARG VERSION=2.0`, and define two env vars: `APP_VERSION=produccion` and `PORT=3000`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "ARG VERSION=2.0",
        "ENV APP_VERSION=produccion",
        "ENV PORT=3000",
        "ENV VERSION=2.0",
      ],
      hints: [
        P("`ARG` es build-time; `ENV` persiste en runtime.", "`ARG` is build-time; `ENV` persists at runtime."),
      ],
      test_cases: [
        { input: "img.args.VERSION", expected: "2.0", description: P("ARG VERSION", "ARG VERSION"), raw: true },
        { input: "img.env.APP_VERSION", expected: "produccion", description: P("APP_VERSION", "APP_VERSION"), raw: true },
        { input: "img.env.PORT", expected: "3000", description: P("PORT", "PORT"), raw: true },
      ],
    },
  },
  pergamino_herencia: {
    kind: "scroll",
    title: p("El Pergamino de las Variables", "The Scroll of Variables"),
    lore_intro: p("Un pergamino distingue lo que existe al construir de lo que persiste al ejecutar.", "A scroll distinguishes what exists at build from what persists at run."),
    scroll: {
      topic: p("Docker: ENV y ARG", "Docker: ENV and ARG"),
      sections: [
        { heading: p("ENV (runtime)", "ENV (runtime)"), body: p("`ENV clave=valor` define variables que persisten en la imagen y ve el proceso al ejecutarse.", "`ENV key=value` defines variables that persist in the image and the process sees at runtime."), code: "ENV NODE_ENV=production PORT=3000" },
        { heading: p("ARG (build-time)", "ARG (build-time)"), body: p("`ARG` es un argumento de construcción (se pasa con `--build-arg`); NO existe en runtime.", "`ARG` is a build argument (passed with `--build-arg`); it does NOT exist at runtime."), code: "ARG VERSION=1.0" },
        { heading: p("Sin secretos", "No secrets"), body: p("Los valores de ENV/ARG quedan en las capas: nunca metas contraseñas ahí; inyéctalas en runtime.", "ENV/ARG values stay in the layers: never put passwords there; inject them at runtime."), code: "# mal: ENV PASSWORD=1234" },
      ],
      keyTakeaway: p("`ARG` es sólo build-time (`--build-arg`); `ENV` persiste en runtime para la config del proceso. Nunca hornees secretos en la imagen.", "`ARG` is build-time only (`--build-arg`); `ENV` persists at runtime for process config. Never bake secrets into the image."),
    },
  },
  poney_pisador: {
    kind: "challenge",
    title: P("El Póney Pisador", "The Prancing Pony"),
    lore_intro: P("Configura el puerto con una variable de entorno.", "Configure the port with an environment variable."),
    challenge: {
      topic: P("ENV", "ENV"),
      instructions: P("Sobre `node:20`, define una variable de entorno `PORT` con valor `3000` (`ENV`).", "On `node:20`, define an environment variable `PORT` with value `3000` (`ENV`)."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "ENV PORT=3000",
        "ARG PORT=3000",
      ],
      hints: [
        P("`ENV PORT=3000`.", "`ENV PORT=3000`."),
      ],
      test_cases: [
        { input: "img.env.PORT", expected: "3000", description: P("PORT=3000", "PORT=3000"), raw: true },
      ],
    },
  },
  hojas_de_tumulo: {
    kind: "challenge",
    title: P("Las Hojas del Túmulo", "The Barrow Leaves"),
    lore_intro: P("Varias variables en una sola instrucción.", "Several variables in a single instruction."),
    challenge: {
      topic: P("ENV múltiple", "Multiple ENV"),
      instructions: P("Sobre `node:20`, define en un solo `ENV` dos variables: `HOST=localhost` y `PORT=8080`.", "On `node:20`, define two variables in a single `ENV`: `HOST=localhost` and `PORT=8080`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "ENV HOST=localhost PORT=8080",
        "ENV HOST=localhost, PORT=8080",
      ],
      hints: [
        P("Separa los pares por espacios: `ENV HOST=localhost PORT=8080`.", "Separate pairs by spaces: `ENV HOST=localhost PORT=8080`."),
      ],
      test_cases: [
        { input: "img.env.HOST", expected: "localhost", description: P("HOST", "HOST"), raw: true },
        { input: "img.env.PORT", expected: "8080", description: P("PORT", "PORT"), raw: true },
      ],
    },
  },
  cima_de_los_vientos: {
    kind: "challenge",
    title: P("La Cima de los Vientos", "Weathertop"),
    lore_intro: P("Un parámetro que sólo existe al construir.", "A parameter that exists only at build time."),
    challenge: {
      topic: P("ARG", "ARG"),
      instructions: P("Sobre `node:20`, declara un argumento de build `VERSION` con valor por defecto `1.0` (`ARG`).", "On `node:20`, declare a build argument `VERSION` with default value `1.0` (`ARG`)."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "ARG VERSION=1.0",
        "ENV VERSION=1.0",
      ],
      hints: [
        P("`ARG VERSION=1.0`.", "`ARG VERSION=1.0`."),
      ],
      test_cases: [
        { input: "img.args.VERSION", expected: "1.0", description: P("ARG VERSION=1.0", "ARG VERSION=1.0"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_4: Syllabus = {
  c4_jinete_rezagado: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué define `CMD`?", "What does `CMD` define?"),
        options: [
          p("El comando por defecto que ejecuta el contenedor al arrancar", "The default command the container runs at start"),
          p("Un comando de build", "A build command"),
          p("Una variable", "A variable"),
          p("Un puerto", "A port"),
        ],
        correct: 0,
        explanation: p("`CMD` es el proceso por defecto del contenedor. Se puede sobreescribir al hacer `docker run imagen otro-comando`.", "`CMD` is the container's default process. It can be overridden with `docker run image other-command`."),
      },
      {
        question: p("Forma EXEC vs forma SHELL de CMD:", "EXEC vs SHELL form of CMD:"),
        options: [
          p("Exec: `CMD [\"node\",\"app.js\"]` (array); shell: `CMD node app.js`", "Exec: `CMD [\"node\",\"app.js\"]` (array); shell: `CMD node app.js`"),
          p("Son iguales", "They're the same"),
          p("Exec usa comillas simples", "Exec uses single quotes"),
          p("Shell requiere JSON", "Shell requires JSON"),
        ],
        correct: 0,
        explanation: p("La forma exec (array JSON) no pasa por un shell y es la recomendada; la forma shell envuelve en `/bin/sh -c`.", "The exec form (JSON array) doesn't go through a shell and is recommended; the shell form wraps in `/bin/sh -c`."),
      },
      {
        question: p("¿Cuántos `CMD` efectivos tiene una imagen?", "How many effective `CMD`s does an image have?"),
        options: [
          p("Uno: si hay varios, sólo cuenta el último", "One: if there are several, only the last counts"),
          p("Todos", "All of them"),
          p("Ninguno", "None"),
          p("Dos", "Two"),
        ],
        correct: 0,
        explanation: p("Sólo el último `CMD` surte efecto. Para varios pasos, encadénalos o usa un script de arranque.", "Only the last `CMD` takes effect. For several steps, chain them or use a startup script."),
      }
    ],
  },
  c4_lobo: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué define `ENTRYPOINT`?", "What does `ENTRYPOINT` define?"),
        options: [
          p("El ejecutable fijo del contenedor (los args pueden venir de CMD)", "The container's fixed executable (args can come from CMD)"),
          p("Una variable", "A variable"),
          p("El puerto", "The port"),
          p("El build", "The build"),
        ],
        correct: 0,
        explanation: p("`ENTRYPOINT` fija el programa; se suele combinar con `CMD` para los argumentos por defecto.", "`ENTRYPOINT` fixes the program; it's often combined with `CMD` for default arguments."),
      },
      {
        question: p("Con `ENTRYPOINT [\"python\"]` y `CMD [\"app.py\"]`, ¿qué corre?", "With `ENTRYPOINT [\"python\"]` and `CMD [\"app.py\"]`, what runs?"),
        options: [
          p("`python app.py` (CMD son los args de ENTRYPOINT)", "`python app.py` (CMD is ENTRYPOINT's args)"),
          p("Sólo `python`", "Just `python`"),
          p("Sólo `app.py`", "Just `app.py`"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("En forma exec, `CMD` aporta los argumentos por defecto a `ENTRYPOINT`: juntos ejecutan `python app.py`.", "In exec form, `CMD` provides the default arguments to `ENTRYPOINT`: together they run `python app.py`."),
      },
      {
        question: p("Si haces `docker run img otracosa`, con ENTRYPOINT fijo…", "If you run `docker run img somethingelse`, with a fixed ENTRYPOINT…"),
        options: [
          p("`otracosa` reemplaza al CMD (los args), no al ENTRYPOINT", "`somethingelse` replaces CMD (the args), not the ENTRYPOINT"),
          p("Reemplaza al ENTRYPOINT", "It replaces the ENTRYPOINT"),
          p("Se ignora", "It's ignored"),
          p("Falla", "It fails"),
        ],
        correct: 0,
        explanation: p("Los argumentos de `docker run` sustituyen al `CMD`; el `ENTRYPOINT` sigue siendo el ejecutable fijo.", "`docker run` arguments replace the `CMD`; the `ENTRYPOINT` stays the fixed executable."),
      }
    ],
  },
  c4_trasgo_montaraz: {
    kind: "battle",
    questions: [
      {
        question: p("¿Por qué se prefiere la forma exec (array) para CMD/ENTRYPOINT?", "Why is the exec form (array) preferred for CMD/ENTRYPOINT?"),
        options: [
          p("El proceso recibe las señales (SIGTERM) directamente, sin shell intermedio", "The process receives signals (SIGTERM) directly, without an intermediate shell"),
          p("Es más corta", "It's shorter"),
          p("Permite comentarios", "It allows comments"),
          p("No hay diferencia", "There's no difference"),
        ],
        correct: 0,
        explanation: p("En forma shell, el proceso es hijo de `/bin/sh` y puede no recibir bien las señales de parada. La forma exec lo evita.", "In shell form, the process is a child of `/bin/sh` and may not receive stop signals well. Exec form avoids that."),
      },
      {
        question: p("Un contenedor 'termina' cuando…", "A container 'exits' when…"),
        options: [
          p("Su proceso principal (CMD/ENTRYPOINT) termina", "Its main process (CMD/ENTRYPOINT) finishes"),
          p("Pasa una hora", "An hour passes"),
          p("Se borra la imagen", "The image is deleted"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("El contenedor vive mientras viva su proceso principal (PID 1). Si ese proceso acaba, el contenedor se detiene.", "The container lives as long as its main process (PID 1) lives. If that process ends, the container stops."),
      },
      {
        question: p("¿`CMD` se puede sobreescribir al ejecutar?", "Can `CMD` be overridden at run time?"),
        options: [
          p("Sí, pasando otro comando a `docker run`", "Yes, by passing another command to `docker run`"),
          p("No, nunca", "No, never"),
          p("Sólo en build", "Only at build"),
          p("Sólo con ENV", "Only with ENV"),
        ],
        correct: 0,
        explanation: p("`CMD` es un DEFAULT; `docker run img comando` lo reemplaza. `ENTRYPOINT` en cambio es fijo (salvo `--entrypoint`).", "`CMD` is a DEFAULT; `docker run img command` replaces it. `ENTRYPOINT` is fixed instead (unless `--entrypoint`)."),
      }
    ],
  },
  c4_jefe_nueve: {
    kind: "challenge",
    title: P("El Señor de los Nueve", "The Lord of the Nine"),
    lore_intro: P("Una app Node completa: copia, instala, expone y arranca.", "A full Node app: copy, install, expose and start."),
    challenge: {
      topic: P("App Node básica", "Basic Node app"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`: `COPY . .`, `RUN npm install`, `EXPOSE 3000` y `CMD [\"node\", \"server.js\"]`.", "On `node:20` with `WORKDIR /app`: `COPY . .`, `RUN npm install`, `EXPOSE 3000` and `CMD [\"node\", \"server.js\"]`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY . .",
        "RUN npm install",
        "EXPOSE 3000",
        "CMD [\"node\", \"server.js\"]",
        "EXPOSE 3000/http",
      ],
      hints: [
        P("Copia el código, instala, expón el puerto y fija el CMD en forma exec.", "Copy the code, install, expose the port and set the CMD in exec form."),
      ],
      test_cases: [
        { input: "img.workdir", expected: "/app", description: P("WORKDIR", "WORKDIR"), raw: true },
        { input: "img.expose", expected: [3000], description: P("EXPOSE 3000", "EXPOSE 3000"), raw: true },
        { input: "img.cmd", expected: ["node","server.js"], description: P("CMD", "CMD"), raw: true },
        { input: "img.capas", expected: 2, description: P("2 capas", "2 layers"), raw: true },
      ],
    },
  },
  pergamino_estatico: {
    kind: "scroll",
    title: p("El Pergamino del Arranque", "The Scroll of the Startup"),
    lore_intro: p("Un pergamino enseña qué proceso corre al levantar el contenedor.", "A scroll teaches which process runs when the container starts."),
    scroll: {
      topic: p("Docker: CMD y ENTRYPOINT", "Docker: CMD and ENTRYPOINT"),
      sections: [
        { heading: p("CMD (por defecto)", "CMD (default)"), body: p("`CMD` define el comando por defecto; se sobreescribe con `docker run img otro`. Usa la forma exec (array).", "`CMD` sets the default command; it's overridden with `docker run img other`. Use the exec form (array)."), code: "CMD [\"node\", \"server.js\"]" },
        { heading: p("ENTRYPOINT (fijo)", "ENTRYPOINT (fixed)"), body: p("`ENTRYPOINT` fija el ejecutable; combinado con `CMD`, éste aporta los argumentos por defecto.", "`ENTRYPOINT` fixes the executable; combined with `CMD`, the latter provides default arguments."), code: "ENTRYPOINT [\"python\"]\nCMD [\"app.py\"]" },
        { heading: p("Forma exec vs shell", "Exec vs shell form"), body: p("La forma exec (array JSON) no pasa por un shell y recibe bien las señales de parada; es la recomendada.", "The exec form (JSON array) doesn't go through a shell and handles stop signals well; it's recommended."), code: "CMD [\"nginx\", \"-g\", \"daemon off;\"]" },
      ],
      keyTakeaway: p("`CMD` es el comando por defecto (sobreescribible); `ENTRYPOINT` es el ejecutable fijo (CMD son sus args). Prefiere la forma exec (array) para las señales.", "`CMD` is the default command (overridable); `ENTRYPOINT` is the fixed executable (CMD is its args). Prefer the exec form (array) for signals."),
    },
  },
  montura_asfaloth: {
    kind: "challenge",
    title: P("La Montura Asfaloth", "Asfaloth the Steed"),
    lore_intro: P("Define el comando de arranque en forma exec.", "Define the startup command in exec form."),
    challenge: {
      topic: P("CMD (forma exec)", "CMD (exec form)"),
      instructions: P("Sobre `node:20`, define el comando por defecto en forma exec: `CMD [\"node\", \"app.js\"]`.", "On `node:20`, define the default command in exec form: `CMD [\"node\", \"app.js\"]`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "CMD [\"node\", \"app.js\"]",
        "RUN node app.js",
      ],
      hints: [
        P("La forma exec es un array JSON: `CMD [\"node\", \"app.js\"]`.", "The exec form is a JSON array: `CMD [\"node\", \"app.js\"]`."),
      ],
      test_cases: [
        { input: "img.cmd", expected: ["node","app.js"], description: P("CMD como array", "CMD as array"), raw: true },
      ],
    },
  },
  recuento_de_los_nueve: {
    kind: "challenge",
    title: P("El Recuento de los Nueve", "The Count of the Nine"),
    lore_intro: P("La forma shell del comando de arranque.", "The shell form of the startup command."),
    challenge: {
      topic: P("CMD (forma shell)", "CMD (shell form)"),
      instructions: P("Sobre `node:20`, define el comando por defecto en forma shell: `CMD node server.js`.", "On `node:20`, define the default command in shell form: `CMD node server.js`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "CMD node server.js",
        "ENTRYPOINT node server.js",
      ],
      hints: [
        P("La forma shell es texto plano: `CMD node server.js`.", "The shell form is plain text: `CMD node server.js`."),
      ],
      test_cases: [
        { input: "img.cmd", expected: "node server.js", description: P("CMD como string", "CMD as string"), raw: true },
      ],
    },
  },
  vado_de_bruinen: {
    kind: "challenge",
    title: P("El Vado de Bruinen", "The Ford of Bruinen"),
    lore_intro: P("Fija el ejecutable del contenedor con ENTRYPOINT.", "Fix the container's executable with ENTRYPOINT."),
    challenge: {
      topic: P("ENTRYPOINT", "ENTRYPOINT"),
      instructions: P("Sobre `python:3.12`, fija el ejecutable con `ENTRYPOINT [\"python\"]`.", "On `python:3.12`, fix the executable with `ENTRYPOINT [\"python\"]`."),
      starter_code: "FROM python:3.12\n",
      blocks: [
        "FROM python:3.12",
        "ENTRYPOINT [\"python\"]",
        "CMD [\"python\"]",
      ],
      hints: [
        P("`ENTRYPOINT [\"python\"]` fija el programa (forma exec).", "`ENTRYPOINT [\"python\"]` fixes the program (exec form)."),
      ],
      test_cases: [
        { input: "img.entrypoint", expected: ["python"], description: P("ENTRYPOINT python", "ENTRYPOINT python"), raw: true },
      ],
    },
  },
  c4_runas_del_vado: {
    kind: "challenge",
    title: P("Las Runas del Vado", "The Runes of the Ford"),
    lore_intro: P("ENTRYPOINT fija el programa; CMD sus argumentos.", "ENTRYPOINT fixes the program; CMD its arguments."),
    challenge: {
      topic: P("ENTRYPOINT + CMD", "ENTRYPOINT + CMD"),
      instructions: P("Sobre `python:3.12`: fija `ENTRYPOINT [\"python\"]` y da como argumento por defecto `CMD [\"app.py\"]` (juntos ejecutan `python app.py`).", "On `python:3.12`: fix `ENTRYPOINT [\"python\"]` and give the default argument `CMD [\"app.py\"]` (together they run `python app.py`)."),
      starter_code: "FROM python:3.12\n",
      blocks: [
        "FROM python:3.12",
        "ENTRYPOINT [\"python\"]",
        "CMD [\"app.py\"]",
        "CMD python app.py",
      ],
      hints: [
        P("`CMD` aporta los argumentos por defecto de `ENTRYPOINT`.", "`CMD` provides `ENTRYPOINT`'s default arguments."),
      ],
      test_cases: [
        { input: "img.entrypoint", expected: ["python"], description: P("ENTRYPOINT python", "ENTRYPOINT python"), raw: true },
        { input: "img.cmd", expected: ["app.py"], description: P("CMD app.py", "CMD app.py"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_5: Syllabus = {
  c5_crebain: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué hace `EXPOSE 3000`?", "What does `EXPOSE 3000` do?"),
        options: [
          p("Documenta que el contenedor escucha en ese puerto", "Documents that the container listens on that port"),
          p("Abre el puerto en el host automáticamente", "Automatically opens the port on the host"),
          p("Arranca en el 3000", "Starts on 3000"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`EXPOSE` es informativo: declara el puerto. Para publicarlo de verdad usas `docker run -p 3000:3000`.", "`EXPOSE` is informational: it declares the port. To actually publish it you use `docker run -p 3000:3000`."),
      },
      {
        question: p("¿Qué hace `USER node`?", "What does `USER node` do?"),
        options: [
          p("Ejecuta las instrucciones siguientes y el contenedor como ese usuario", "Runs the following instructions and the container as that user"),
          p("Crea un usuario nuevo", "Creates a new user"),
          p("Borra root", "Deletes root"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`USER` cambia el usuario. Correr como no-root es una buena práctica de seguridad.", "`USER` switches the user. Running as non-root is a security best practice."),
      },
      {
        question: p("¿Para qué sirve `LABEL`?", "What is `LABEL` for?"),
        options: [
          p("Añadir metadatos a la imagen (autor, versión, descripción)", "Add metadata to the image (author, version, description)"),
          p("Ejecutar código", "Run code"),
          p("Exponer puertos", "Expose ports"),
          p("Copiar archivos", "Copy files"),
        ],
        correct: 0,
        explanation: p("`LABEL clave=valor` añade metadatos consultables con `docker inspect`. Útil para organizar y documentar.", "`LABEL key=value` adds metadata queryable with `docker inspect`. Useful to organize and document."),
      }
    ],
  },
  c5_lobo_nieve: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué declara `VOLUME [\"/data\"]`?", "What does `VOLUME [\"/data\"]` declare?"),
        options: [
          p("Un punto de montaje para datos persistentes fuera de la imagen", "A mount point for persistent data outside the image"),
          p("Un puerto", "A port"),
          p("Una variable", "A variable"),
          p("Un usuario", "A user"),
        ],
        correct: 0,
        explanation: p("`VOLUME` marca una ruta cuyos datos viven fuera del ciclo de vida del contenedor (persistencia).", "`VOLUME` marks a path whose data lives outside the container's lifecycle (persistence)."),
      },
      {
        question: p("Correr como root dentro del contenedor es…", "Running as root inside the container is…"),
        options: [
          p("Un riesgo de seguridad que conviene evitar con `USER`", "A security risk best avoided with `USER`"),
          p("Obligatorio", "Mandatory"),
          p("Más rápido", "Faster"),
          p("Recomendado", "Recommended"),
        ],
        correct: 0,
        explanation: p("Por defecto el proceso corre como root; si se compromete, el impacto es mayor. `USER` reduce el riesgo.", "By default the process runs as root; if compromised, the impact is bigger. `USER` reduces the risk."),
      },
      {
        question: p("`EXPOSE 80 443` declara…", "`EXPOSE 80 443` declares…"),
        options: [
          p("Dos puertos (80 y 443)", "Two ports (80 and 443)"),
          p("El rango 80 a 443", "The range 80 to 443"),
          p("Un puerto", "One port"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Puedes listar varios puertos separados por espacios. Sigue siendo documentación; publicar es cosa de `-p`.", "You can list several ports separated by spaces. It's still documentation; publishing is `-p`'s job."),
      }
    ],
  },
  c5_trasgo_montanes: {
    kind: "battle",
    questions: [
      {
        question: p("¿Los datos de un `VOLUME` sobreviven a borrar el contenedor?", "Does `VOLUME` data survive deleting the container?"),
        options: [
          p("Sí: viven en el volumen, aparte del contenedor", "Yes: it lives in the volume, apart from the container"),
          p("No", "No"),
          p("Sólo una hora", "Only an hour"),
          p("Sólo si es root", "Only if root"),
        ],
        correct: 0,
        explanation: p("Los volúmenes desacoplan los datos del contenedor: puedes recrear el contenedor sin perder la base de datos.", "Volumes decouple data from the container: you can recreate the container without losing the database."),
      },
      {
        question: p("¿`EXPOSE` publica el puerto al mundo?", "Does `EXPOSE` publish the port to the world?"),
        options: [
          p("No: sólo lo documenta; publicar es `-p host:contenedor`", "No: it only documents it; publishing is `-p host:container`"),
          p("Sí", "Yes"),
          p("Sólo en producción", "Only in production"),
          p("Sólo el 80", "Only port 80"),
        ],
        correct: 0,
        explanation: p("Un error común: creer que `EXPOSE` abre el puerto. Para acceder desde el host hace falta `-p`.", "A common mistake: thinking `EXPOSE` opens the port. To reach it from the host you need `-p`."),
      },
      {
        question: p("Buenas prácticas de una imagen de producción incluyen…", "Production image best practices include…"),
        options: [
          p("Usuario no-root, imagen base pequeña y tags fijos", "Non-root user, small base image and pinned tags"),
          p("Correr como root y usar latest", "Running as root and using latest"),
          p("Muchas capas sueltas", "Many loose layers"),
          p("Meter secretos en ENV", "Putting secrets in ENV"),
        ],
        correct: 0,
        explanation: p("Seguridad y tamaño: `USER` no-root, base `alpine`/`-slim`, tags concretos y sin secretos horneados.", "Security and size: non-root `USER`, `alpine`/`-slim` base, specific tags and no baked-in secrets."),
      }
    ],
  },
  c5_jefe_caradhras: {
    kind: "challenge",
    title: P("La Furia de Caradhras", "The Wrath of Caradhras"),
    lore_intro: P("Puertos, datos, usuario y metadatos, todo junto.", "Ports, data, user and metadata, all together."),
    challenge: {
      topic: P("EXPOSE + VOLUME + USER + LABEL", "EXPOSE + VOLUME + USER + LABEL"),
      instructions: P("Sobre `nginx`: añade `LABEL maintainer=\"gandalf@mordor.me\"`, expón los puertos `80` y `443` en un solo `EXPOSE`, declara `VOLUME [\"/data\"]` y corre como `USER nginx`.", "On `nginx`: add `LABEL maintainer=\"gandalf@mordor.me\"`, expose ports `80` and `443` in a single `EXPOSE`, declare `VOLUME [\"/data\"]` and run as `USER nginx`."),
      starter_code: "FROM nginx\n",
      blocks: [
        "FROM nginx",
        "LABEL maintainer=\"gandalf@mordor.me\"",
        "EXPOSE 80 443",
        "VOLUME [\"/data\"]",
        "USER nginx",
        "EXPOSE 80-443",
      ],
      hints: [
        P("`EXPOSE 80 443` lista dos puertos. `VOLUME [\"/data\"]` persiste datos.", "`EXPOSE 80 443` lists two ports. `VOLUME [\"/data\"]` persists data."),
      ],
      test_cases: [
        { input: "img.expose", expected: [80,443], description: P("Dos puertos", "Two ports"), raw: true },
        { input: "img.volumes", expected: ["/data"], description: P("VOLUME /data", "VOLUME /data"), raw: true },
        { input: "img.user", expected: "nginx", description: P("USER nginx", "USER nginx"), raw: true },
        { input: "img.labels.maintainer", expected: "gandalf@mordor.me", description: P("LABEL", "LABEL"), raw: true },
      ],
    },
  },
  pergamino_hielo: {
    kind: "scroll",
    title: p("El Pergamino de los Puertos", "The Scroll of Ports"),
    lore_intro: p("Un pergamino enseña a declarar puertos, usuario y datos.", "A scroll teaches how to declare ports, user and data."),
    scroll: {
      topic: p("Docker: EXPOSE, USER, VOLUME", "Docker: EXPOSE, USER, VOLUME"),
      sections: [
        { heading: p("EXPOSE (documenta)", "EXPOSE (documents)"), body: p("`EXPOSE` declara el puerto en el que escucha el contenedor. Publicarlo de verdad es con `docker run -p`.", "`EXPOSE` declares the port the container listens on. Actually publishing it is done with `docker run -p`."), code: "EXPOSE 3000" },
        { heading: p("USER (seguridad)", "USER (security)"), body: p("`USER` cambia el usuario que ejecuta el proceso. Correr como no-root es una buena práctica de seguridad.", "`USER` changes the user running the process. Running as non-root is a security best practice."), code: "USER node" },
        { heading: p("VOLUME y LABEL", "VOLUME and LABEL"), body: p("`VOLUME` marca datos persistentes fuera del contenedor; `LABEL` añade metadatos (autor, versión).", "`VOLUME` marks persistent data outside the container; `LABEL` adds metadata (author, version)."), code: "VOLUME [\"/data\"]\nLABEL version=\"1.0\"" },
      ],
      keyTakeaway: p("`EXPOSE` documenta el puerto (publicar es `-p`); `USER` corre como no-root (seguridad); `VOLUME` persiste datos; `LABEL` añade metadatos.", "`EXPOSE` documents the port (publishing is `-p`); `USER` runs as non-root (security); `VOLUME` persists data; `LABEL` adds metadata."),
    },
  },
  carga_de_bill: {
    kind: "challenge",
    title: P("La Carga de Bill el Póney", "Bill the Pony's Load"),
    lore_intro: P("Declara el puerto en el que escucha la imagen.", "Declare the port the image listens on."),
    challenge: {
      topic: P("EXPOSE", "EXPOSE"),
      instructions: P("Sobre `nginx`, declara que el contenedor escucha en el puerto `8080` con `EXPOSE`.", "On `nginx`, declare that the container listens on port `8080` with `EXPOSE`."),
      starter_code: "FROM nginx\n",
      blocks: [
        "FROM nginx",
        "EXPOSE 8080",
        "ENV PORT=8080",
      ],
      hints: [
        P("`EXPOSE 8080` (documenta; publicar es cosa de `-p`).", "`EXPOSE 8080` (documents; publishing is `-p`'s job)."),
      ],
      test_cases: [
        { input: "img.expose", expected: [8080], description: P("EXPOSE 8080", "EXPOSE 8080"), raw: true },
      ],
    },
  },
  resistencia_comunidad: {
    kind: "challenge",
    title: P("La Resistencia de la Comunidad", "The Fellowship's Resilience"),
    lore_intro: P("No corras como root: cambia de usuario.", "Don't run as root: switch user."),
    challenge: {
      topic: P("USER", "USER"),
      instructions: P("Sobre `node:20`, haz que el contenedor corra como el usuario `node` con `USER`.", "On `node:20`, make the container run as the `node` user with `USER`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "USER node",
        "RUN useradd node",
      ],
      hints: [
        P("`USER node`. Correr como no-root es más seguro.", "`USER node`. Running as non-root is safer."),
      ],
      test_cases: [
        { input: "img.user", expected: "node", description: P("USER node", "USER node"), raw: true },
      ],
    },
  },
  temperatura_montana: {
    kind: "challenge",
    title: P("La Temperatura de la Montaña", "The Mountain's Temperature"),
    lore_intro: P("Etiqueta la imagen con metadatos.", "Tag the image with metadata."),
    challenge: {
      topic: P("LABEL", "LABEL"),
      instructions: P("Sobre `node:20`, añade una etiqueta `version` con valor `\"1.0\"` usando `LABEL`.", "On `node:20`, add a `version` label with value `\"1.0\"` using `LABEL`."),
      starter_code: "FROM node:20\n",
      blocks: [
        "FROM node:20",
        "LABEL version=\"1.0\"",
        "ENV version=1.0",
      ],
      hints: [
        P("`LABEL version=\"1.0\"`.", "`LABEL version=\"1.0\"`."),
      ],
      test_cases: [
        { input: "img.labels.version", expected: "1.0", description: P("LABEL version", "LABEL version"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_6: Syllabus = {
  c6_trasgo_explorador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué instrucciones crean capas en la imagen?", "Which instructions create image layers?"),
        options: [
          p("`RUN`, `COPY` y `ADD`", "`RUN`, `COPY` and `ADD`"),
          p("Sólo `FROM`", "Only `FROM`"),
          p("`ENV` y `EXPOSE`", "`ENV` and `EXPOSE`"),
          p("Ninguna", "None"),
        ],
        correct: 0,
        explanation: p("`RUN`/`COPY`/`ADD` crean capas (contenido del sistema de archivos). `ENV`, `EXPOSE`, `CMD`… sólo ajustan metadatos.", "`RUN`/`COPY`/`ADD` create layers (filesystem content). `ENV`, `EXPOSE`, `CMD`… only tweak metadata."),
      },
      {
        question: p("¿Cómo reduces el número de capas de instalación?", "How do you reduce the number of install layers?"),
        options: [
          p("Encadenando comandos con `&&` en un solo `RUN`", "Chaining commands with `&&` in a single `RUN`"),
          p("Con muchos `RUN` separados", "With many separate `RUN`s"),
          p("Con `COPY`", "With `COPY`"),
          p("No se puede", "You can't"),
        ],
        correct: 0,
        explanation: p("`RUN apt-get update && apt-get install -y curl` es UNA capa; separarlo en dos `RUN` crea dos.", "`RUN apt-get update && apt-get install -y curl` is ONE layer; splitting it into two `RUN`s creates two."),
      },
      {
        question: p("¿Por qué importa el ORDEN de las instrucciones?", "Why does instruction ORDER matter?"),
        options: [
          p("Por la caché: lo que cambia poco va arriba para reutilizar capas", "Because of caching: what rarely changes goes on top to reuse layers"),
          p("Por estética", "For aesthetics"),
          p("No importa", "It doesn't matter"),
          p("Por el tamaño del texto", "For text size"),
        ],
        correct: 0,
        explanation: p("Docker cachea hasta la primera capa que cambia. Poner deps antes que el código evita reinstalar en cada cambio.", "Docker caches up to the first changed layer. Putting deps before code avoids reinstalling on every change."),
      }
    ],
  },
  c6_trol_cavernas: {
    kind: "battle",
    questions: [
      {
        question: p("Si cambias una línea, ¿qué capas se reconstruyen?", "If you change a line, which layers are rebuilt?"),
        options: [
          p("Esa y TODAS las siguientes", "That one and ALL the following"),
          p("Sólo esa", "Only that one"),
          p("Ninguna", "None"),
          p("Las anteriores", "The previous ones"),
        ],
        correct: 0,
        explanation: p("La caché se invalida desde el primer cambio hacia abajo. Por eso el orden es clave para builds rápidos.", "The cache is invalidated from the first change downward. That's why order is key for fast builds."),
      },
      {
        question: p("¿Por qué limpiar en el MISMO `RUN` (`rm -rf /var/lib/apt/lists/*`)?", "Why clean up in the SAME `RUN` (`rm -rf /var/lib/apt/lists/*`)?"),
        options: [
          p("Si limpias en otra capa, el peso ya quedó grabado en la anterior", "If you clean in another layer, the weight is already baked into the previous one"),
          p("Por costumbre", "By habit"),
          p("Es obligatorio", "It's mandatory"),
          p("No sirve", "It's useless"),
        ],
        correct: 0,
        explanation: p("Las capas son aditivas: borrar en una capa posterior no reduce el tamaño de la anterior. Limpia en el mismo `RUN`.", "Layers are additive: deleting in a later layer doesn't shrink the earlier one. Clean in the same `RUN`."),
      },
      {
        question: p("Menos capas y bien ordenadas suele dar…", "Fewer, well-ordered layers usually gives…"),
        options: [
          p("Imágenes más pequeñas y builds con mejor caché", "Smaller images and better-cached builds"),
          p("Imágenes más grandes", "Bigger images"),
          p("Builds más lentos siempre", "Always slower builds"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Agrupar comandos relacionados y limpiar en la misma capa reduce tamaño; ordenar por estabilidad mejora la caché.", "Grouping related commands and cleaning in the same layer reduces size; ordering by stability improves caching."),
      }
    ],
  },
  c6_capitan_trasgo: {
    kind: "battle",
    questions: [
      {
        question: p("`COPY package.json .` antes de `RUN npm install` busca…", "`COPY package.json .` before `RUN npm install` aims to…"),
        options: [
          p("Cachear las dependencias mientras el código cambia", "Cache dependencies while the code changes"),
          p("Ahorrar líneas", "Save lines"),
          p("Nada", "Nothing"),
          p("Exponer un puerto", "Expose a port"),
        ],
        correct: 0,
        explanation: p("Si sólo cambia tu código (no `package.json`), la capa de `npm install` se reutiliza: build mucho más rápido.", "If only your code changes (not `package.json`), the `npm install` layer is reused: much faster build."),
      },
      {
        question: p("¿`ENV` o `EXPOSE` invalidan capas de RUN posteriores por su peso?", "Do `ENV` or `EXPOSE` invalidate later RUN layers by their weight?"),
        options: [
          p("No añaden peso; sólo metadatos (aunque cambiarlos rompe la caché siguiente)", "They add no weight; just metadata (though changing them breaks the following cache)"),
          p("Sí, mucho peso", "Yes, lots of weight"),
          p("Borran capas", "They delete layers"),
          p("Crean contenedores", "They create containers"),
        ],
        correct: 0,
        explanation: p("No pesan, pero un cambio en cualquier instrucción invalida la caché de lo que va debajo.", "They don't weigh, but changing any instruction invalidates the cache of what's below."),
      },
      {
        question: p("Una imagen final más pequeña ayuda a…", "A smaller final image helps to…"),
        options: [
          p("Desplegar más rápido y reducir superficie de ataque", "Deploy faster and reduce attack surface"),
          p("Nada", "Nothing"),
          p("Gastar más disco", "Use more disk"),
          p("Ir más lento", "Go slower"),
        ],
        correct: 0,
        explanation: p("Menos tamaño = descargas y arranques más rápidos y menos software que pueda tener vulnerabilidades.", "Less size = faster pulls and starts and less software that could have vulnerabilities."),
      }
    ],
  },
  c6_jefe_balrog: {
    kind: "challenge",
    title: P("El Balrog de Moria", "The Balrog of Moria"),
    lore_intro: P("El build óptimo: deps cacheadas, luego build.", "The optimal build: cached deps, then build."),
    challenge: {
      topic: P("Build óptimo con caché", "Optimal cached build"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`: `COPY package.json package-lock.json ./`, `RUN npm ci`, `COPY . .` y `RUN npm run build`.", "On `node:20` with `WORKDIR /app`: `COPY package.json package-lock.json ./`, `RUN npm ci`, `COPY . .` and `RUN npm run build`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY package.json package-lock.json ./",
        "RUN npm ci",
        "COPY . .",
        "RUN npm run build",
        "COPY package.json .",
      ],
      hints: [
        P("Copia primero los manifiestos a `./`, instala, luego el resto y compila.", "Copy the manifests to `./` first, install, then the rest and build."),
      ],
      test_cases: [
        { input: "img.copies[0].dest", expected: "./", description: P("Manifiestos a ./", "Manifests to ./"), raw: true },
        { input: "img.copies[1].src", expected: ".", description: P("Luego COPY .", "Then COPY ."), raw: true },
        { input: "img.runs", expected: ["npm ci","npm run build"], description: P("npm ci + build", "npm ci + build"), raw: true },
        { input: "img.capas", expected: 4, description: P("4 capas", "4 layers"), raw: true },
      ],
    },
  },
  pergamino_contratos: {
    kind: "scroll",
    title: p("El Pergamino de las Capas", "The Scroll of Layers"),
    lore_intro: p("Un pergamino desvela cómo la caché y las capas moldean la imagen.", "A scroll reveals how caching and layers shape the image."),
    scroll: {
      topic: p("Docker: capas y caché", "Docker: layers and caching"),
      sections: [
        { heading: p("Qué crea capas", "What creates layers"), body: p("`RUN`, `COPY` y `ADD` crean capas (contenido); `ENV`, `EXPOSE`, `CMD` sólo ajustan metadatos.", "`RUN`, `COPY` and `ADD` create layers (content); `ENV`, `EXPOSE`, `CMD` only tweak metadata."), code: "RUN apt-get update && apt-get install -y curl" },
        { heading: p("Encadenar y limpiar", "Chain and clean"), body: p("Agrupa comandos con `&&` en un `RUN` y limpia en la MISMA capa: las capas son aditivas, borrar después no adelgaza.", "Group commands with `&&` in one `RUN` and clean in the SAME layer: layers are additive, deleting later doesn't slim down."), code: "RUN apt-get update && apt-get install -y git \\\n    && rm -rf /var/lib/apt/lists/*" },
        { heading: p("Orden por estabilidad", "Order by stability"), body: p("La caché se invalida desde el primer cambio hacia abajo. Pon lo estable (deps) arriba y lo volátil (código) abajo.", "The cache is invalidated from the first change downward. Put stable things (deps) on top and volatile ones (code) below."), code: "COPY package.json .\nRUN npm install\nCOPY . ." },
      ],
      keyTakeaway: p("RUN/COPY/ADD crean capas; encadena con `&&` y limpia en la misma capa; ordena de estable a volátil para reutilizar la caché. Menos capas = imágenes más pequeñas.", "RUN/COPY/ADD create layers; chain with `&&` and clean in the same layer; order stable-to-volatile to reuse the cache. Fewer layers = smaller images."),
    },
  },
  puertas_de_durin: {
    kind: "challenge",
    title: P("Las Puertas de Durin", "The Doors of Durin"),
    lore_intro: P("Dos comandos, una sola capa: encadena con &&.", "Two commands, one layer: chain with &&."),
    challenge: {
      topic: P("Minimizar capas (&&)", "Minimize layers (&&)"),
      instructions: P("Sobre `debian`, instala curl en UNA sola capa encadenando: `RUN apt-get update && apt-get install -y curl`.", "On `debian`, install curl in ONE layer by chaining: `RUN apt-get update && apt-get install -y curl`."),
      starter_code: "FROM debian\n",
      blocks: [
        "FROM debian",
        "RUN apt-get update && apt-get install -y curl",
        "RUN apt-get install -y curl",
      ],
      hints: [
        P("Une los comandos con `&&` dentro de un único `RUN`.", "Join the commands with `&&` inside a single `RUN`."),
      ],
      test_cases: [
        { input: "img.runs.length", expected: 1, description: P("Una RUN", "One RUN"), raw: true },
        { input: "img.capas", expected: 1, description: P("1 capa", "1 layer"), raw: true },
      ],
    },
  },
  camara_mazarbul: {
    kind: "challenge",
    title: P("La Cámara de Mazarbul", "The Chamber of Mazarbul"),
    lore_intro: P("Ordena para la caché: dependencias antes que el código.", "Order for caching: dependencies before code."),
    challenge: {
      topic: P("Orden para la caché", "Order for caching"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`, ordena las capas para aprovechar la caché: `COPY package.json .`, `RUN npm install`, y sólo después `COPY . .`.", "On `node:20` with `WORKDIR /app`, order the layers to leverage caching: `COPY package.json .`, `RUN npm install`, and only then `COPY . .`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY package.json .",
        "RUN npm install",
        "COPY . .",
        "RUN npm run dev",
      ],
      hints: [
        P("El primer `COPY` es `package.json`; el segundo, `.` (todo).", "The first `COPY` is `package.json`; the second, `.` (everything)."),
      ],
      test_cases: [
        { input: "img.copies[0].src", expected: "package.json", description: P("Deps primero", "Deps first"), raw: true },
        { input: "img.copies[1].src", expected: ".", description: P("Código después", "Code after"), raw: true },
      ],
    },
  },
  puente_khazad_dum: {
    kind: "challenge",
    title: P("El Puente de Khazad-dûm", "The Bridge of Khazad-dûm"),
    lore_intro: P("Cuenta las capas que crea tu Dockerfile.", "Count the layers your Dockerfile creates."),
    challenge: {
      topic: P("Contar capas", "Counting layers"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`: `COPY . .`, `RUN npm ci` y `RUN npm run build`. Debe crear exactamente 3 capas (COPY + RUN + RUN).", "On `node:20` with `WORKDIR /app`: `COPY . .`, `RUN npm ci` and `RUN npm run build`. It must create exactly 3 layers (COPY + RUN + RUN)."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY . .",
        "RUN npm ci",
        "RUN npm run build",
        "ENV BUILD=1",
      ],
      hints: [
        P("Cada RUN/COPY añade una capa: aquí COPY + 2 RUN = 3.", "Each RUN/COPY adds a layer: here COPY + 2 RUN = 3."),
      ],
      test_cases: [
        { input: "img.capas", expected: 3, description: P("3 capas", "3 layers"), raw: true },
      ],
    },
  },
  c6_galeria_de_mazarbul: {
    kind: "challenge",
    title: P("La Galería de Mazarbul", "The Gallery of Mazarbul"),
    lore_intro: P("Instala y limpia en la MISMA capa para no cargar peso.", "Install and clean in the SAME layer to avoid weight."),
    challenge: {
      topic: P("Instalar y limpiar en una capa", "Install and clean in one layer"),
      instructions: P("Sobre `debian`, en UN solo `RUN` encadenado: actualiza, instala `curl` y `git`, y limpia con `rm -rf /var/lib/apt/lists/*`.", "On `debian`, in ONE chained `RUN`: update, install `curl` and `git`, and clean with `rm -rf /var/lib/apt/lists/*`."),
      starter_code: "FROM debian\n",
      blocks: [
        "FROM debian",
        "RUN apt-get update && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*",
        "RUN rm -rf /var/lib/apt/lists/*",
      ],
      hints: [
        P("Encadena todo con `&&` en un único `RUN` (incluida la limpieza).", "Chain everything with `&&` in a single `RUN` (cleanup included)."),
      ],
      test_cases: [
        { input: "img.capas", expected: 1, description: P("1 capa", "1 layer"), raw: true },
        { input: "img.runs.length", expected: 1, description: P("Una RUN", "One RUN"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_7: Syllabus = {
  c7_orco_explorador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué es un build multi-stage?", "What is a multi-stage build?"),
        options: [
          p("Varios `FROM` en un Dockerfile; el último es la imagen final", "Several `FROM`s in one Dockerfile; the last is the final image"),
          p("Varios Dockerfiles", "Several Dockerfiles"),
          p("Varios contenedores", "Several containers"),
          p("Un bucle", "A loop"),
        ],
        correct: 0,
        explanation: p("Cada `FROM` abre una ETAPA. Compilas en una etapa 'builder' y copias sólo el resultado a una imagen final ligera.", "Each `FROM` opens a STAGE. You build in a 'builder' stage and copy only the result into a light final image."),
      },
      {
        question: p("¿Para qué se nombra una etapa (`FROM node AS builder`)?", "Why name a stage (`FROM node AS builder`)?"),
        options: [
          p("Para poder copiar de ella con `COPY --from=builder`", "So you can copy from it with `COPY --from=builder`"),
          p("Por estética", "For aesthetics"),
          p("Para exponerla", "To expose it"),
          p("No sirve", "It's useless"),
        ],
        correct: 0,
        explanation: p("El nombre permite referenciar la etapa: `COPY --from=builder /app/dist .` trae artefactos sin arrastrar el toolchain.", "The name lets you reference the stage: `COPY --from=builder /app/dist .` brings artifacts without dragging the toolchain."),
      },
      {
        question: p("¿Qué imagen es la final en un multi-stage?", "Which image is final in a multi-stage build?"),
        options: [
          p("La de la ÚLTIMA etapa `FROM`", "The one from the LAST `FROM` stage"),
          p("La primera", "The first"),
          p("La más grande", "The biggest"),
          p("Todas", "All of them"),
        ],
        correct: 0,
        explanation: p("El resultado es la última etapa. Las anteriores sólo sirven para construir y se descartan.", "The result is the last stage. The earlier ones only serve to build and are discarded."),
      }
    ],
  },
  c7_trasgo_frontera: {
    kind: "battle",
    questions: [
      {
        question: p("¿Qué ventaja principal da multi-stage?", "What's the main advantage of multi-stage?"),
        options: [
          p("Imagen final pequeña: sin compiladores ni deps de build", "Small final image: no compilers or build deps"),
          p("Más capas", "More layers"),
          p("Más lento", "Slower"),
          p("Ninguna", "None"),
        ],
        correct: 0,
        explanation: p("Compilas con todo el toolchain en 'builder' y la imagen final sólo lleva el binario/artefacto: mucho más ligera.", "You build with the full toolchain in 'builder' and the final image only carries the binary/artifact: much lighter."),
      },
      {
        question: p("`COPY --from=builder /app/dist /html` copia…", "`COPY --from=builder /app/dist /html` copies…"),
        options: [
          p("Desde la etapa builder, no desde el contexto", "From the builder stage, not from the context"),
          p("Desde tu carpeta", "From your folder"),
          p("Desde internet", "From the internet"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`--from=etapa` cambia el origen del COPY a otra etapa del build en vez del contexto local.", "`--from=stage` changes the COPY source to another build stage instead of the local context."),
      },
      {
        question: p("En la imagen final multi-stage, ¿queda el compilador de la etapa builder?", "In the final multi-stage image, does the builder's compiler remain?"),
        options: [
          p("No: sólo lo que copias explícitamente con --from", "No: only what you explicitly copy with --from"),
          p("Sí, todo", "Yes, everything"),
          p("A veces", "Sometimes"),
          p("Sólo las deps", "Only the deps"),
        ],
        correct: 0,
        explanation: p("La etapa builder se descarta; en la final sólo está la base elegida más lo que copiaste. De ahí el ahorro.", "The builder stage is discarded; the final one has only the chosen base plus what you copied. Hence the savings."),
      }
    ],
  },
  c7_uruk_rastreador: {
    kind: "battle",
    questions: [
      {
        question: p("Un patrón típico multi-stage para una SPA es…", "A typical multi-stage pattern for a SPA is…"),
        options: [
          p("Compilar con Node y servir el `dist` con nginx", "Build with Node and serve the `dist` with nginx"),
          p("Compilar y servir con Node siempre", "Build and serve with Node always"),
          p("Usar sólo alpine", "Use only alpine"),
          p("No usar FROM", "Not using FROM"),
        ],
        correct: 0,
        explanation: p("Etapa 1: `node` compila a `dist`. Etapa 2: `nginx` sirve esos estáticos. La final no lleva Node.", "Stage 1: `node` builds `dist`. Stage 2: `nginx` serves those statics. The final one has no Node."),
      },
      {
        question: p("¿Se puede copiar de una etapa a otra varias veces?", "Can you copy from one stage to another multiple times?"),
        options: [
          p("Sí, tantos `COPY --from` como necesites", "Yes, as many `COPY --from` as you need"),
          p("No, sólo una", "No, only one"),
          p("Sólo dos", "Only two"),
          p("Nunca", "Never"),
        ],
        correct: 0,
        explanation: p("Puedes traer varios artefactos (binario, assets, node_modules) con múltiples `COPY --from`.", "You can bring several artifacts (binary, assets, node_modules) with multiple `COPY --from`."),
      },
      {
        question: p("Multi-stage ayuda sobre todo con…", "Multi-stage mostly helps with…"),
        options: [
          p("Tamaño y seguridad de la imagen final", "The final image's size and security"),
          p("La velocidad de red", "Network speed"),
          p("El nombre del contenedor", "The container name"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("Menos software en la imagen final: pesa menos y tiene menos superficie de ataque. Es una práctica estándar hoy.", "Less software in the final image: it weighs less and has less attack surface. It's a standard practice today."),
      }
    ],
  },
  c7_jefe_ugluk: {
    kind: "challenge",
    title: P("Uglúk de Isengard", "Uglúk of Isengard"),
    lore_intro: P("El pipeline SPA: build con Node, sirve con nginx.", "The SPA pipeline: build with Node, serve with nginx."),
    challenge: {
      topic: P("Multi-stage completo (SPA)", "Full multi-stage (SPA)"),
      instructions: P("Etapa builder (`node:20 AS builder`, `WORKDIR /app`, `COPY package.json .`, `RUN npm ci`, `COPY . .`, `RUN npm run build`). Etapa runtime (`nginx AS runtime`, `COPY --from=builder /app/dist /usr/share/nginx/html`, `EXPOSE 80`, `CMD [\"nginx\", \"-g\", \"daemon off;\"]`).", "Builder stage (`node:20 AS builder`, `WORKDIR /app`, `COPY package.json .`, `RUN npm ci`, `COPY . .`, `RUN npm run build`). Runtime stage (`nginx AS runtime`, `COPY --from=builder /app/dist /usr/share/nginx/html`, `EXPOSE 80`, `CMD [\"nginx\", \"-g\", \"daemon off;\"]`)."),
      starter_code: "FROM node:20 AS builder\nWORKDIR /app\n",
      blocks: [
        "FROM node:20 AS builder",
        "WORKDIR /app",
        "COPY package.json .",
        "RUN npm ci",
        "COPY . .",
        "RUN npm run build",
        "FROM nginx AS runtime",
        "COPY --from=builder /app/dist /usr/share/nginx/html",
        "EXPOSE 80",
        "CMD [\"nginx\", \"-g\", \"daemon off;\"]",
        "COPY /app/dist /usr/share/nginx/html",
      ],
      hints: [
        P("Compila en builder y sirve el `dist` desde nginx con `COPY --from`.", "Build in builder and serve the `dist` from nginx with `COPY --from`."),
      ],
      test_cases: [
        { input: "img.stages", expected: ["builder","runtime"], description: P("Dos etapas", "Two stages"), raw: true },
        { input: "img.from", expected: "nginx", description: P("Final nginx", "Final nginx"), raw: true },
        { input: "img.copies[0].from", expected: "builder", description: P("from builder", "from builder"), raw: true },
        { input: "img.expose", expected: [80], description: P("EXPOSE 80", "EXPOSE 80"), raw: true },
        { input: "img.cmd", expected: ["nginx","-g","daemon off;"], description: P("CMD nginx", "CMD nginx"), raw: true },
      ],
    },
  },
  pergamino_dones: {
    kind: "scroll",
    title: p("El Pergamino de las Etapas", "The Scroll of Stages"),
    lore_intro: p("Un pergamino enseña a compilar en una etapa y desplegar en otra.", "A scroll teaches how to build in one stage and ship in another."),
    scroll: {
      topic: p("Docker: multi-stage", "Docker: multi-stage"),
      sections: [
        { heading: p("Varias etapas", "Several stages"), body: p("Cada `FROM` abre una etapa; nómbralas con `AS`. La imagen final es la de la última etapa.", "Each `FROM` opens a stage; name them with `AS`. The final image is the last stage's."), code: "FROM node:20 AS builder\n# ...\nFROM nginx AS runtime" },
        { heading: p("Copiar entre etapas", "Copy between stages"), body: p("`COPY --from=builder` trae artefactos de otra etapa sin arrastrar el compilador ni las deps de build.", "`COPY --from=builder` brings artifacts from another stage without dragging the compiler or build deps."), code: "COPY --from=builder /app/dist /usr/share/nginx/html" },
        { heading: p("Imagen final ligera", "Light final image"), body: p("Compilas con todo el toolchain en 'builder' y la final sólo lleva el resultado: más pequeña y segura.", "You build with the full toolchain in 'builder' and the final one carries only the result: smaller and safer."), code: "CMD [\"nginx\", \"-g\", \"daemon off;\"]" },
      ],
      keyTakeaway: p("Multi-stage: varias etapas con `FROM ... AS`; compilas en 'builder' y con `COPY --from` traes sólo el artefacto a una imagen final pequeña y segura.", "Multi-stage: several stages with `FROM ... AS`; you build in 'builder' and with `COPY --from` bring only the artifact into a small, secure final image."),
    },
  },
  frasco_de_galadriel: {
    kind: "challenge",
    title: P("El Frasco de Galadriel", "The Phial of Galadriel"),
    lore_intro: P("Dos etapas nombradas: builder y runtime.", "Two named stages: builder and runtime."),
    challenge: {
      topic: P("Multi-stage: etapas", "Multi-stage: stages"),
      instructions: P("Escribe un Dockerfile con DOS etapas: `FROM node:20 AS builder` y `FROM nginx AS runtime`. La imagen final es la de `nginx`.", "Write a Dockerfile with TWO stages: `FROM node:20 AS builder` and `FROM nginx AS runtime`. The final image is `nginx`."),
      starter_code: "# Dos etapas con FROM ... AS\n",
      blocks: [
        "FROM node:20 AS builder",
        "FROM nginx AS runtime",
        "FROM node:20 AS nginx",
      ],
      hints: [
        P("Cada `FROM ... AS nombre` abre una etapa; la última es la final.", "Each `FROM ... AS name` opens a stage; the last is the final one."),
      ],
      test_cases: [
        { input: "img.stages", expected: ["builder","runtime"], description: P("Dos etapas", "Two stages"), raw: true },
        { input: "img.from", expected: "nginx", description: P("Final nginx", "Final nginx"), raw: true },
      ],
    },
  },
  capas_elficas: {
    kind: "challenge",
    title: P("Las Capas Élficas", "The Elven Cloaks"),
    lore_intro: P("Trae el artefacto de la etapa builder.", "Bring the artifact from the builder stage."),
    challenge: {
      topic: P("COPY --from", "COPY --from"),
      instructions: P("Etapa `FROM node:20 AS builder` con `RUN npm run build`; luego `FROM nginx` y trae el resultado con `COPY --from=builder /app/dist /usr/share/nginx/html`.", "Stage `FROM node:20 AS builder` with `RUN npm run build`; then `FROM nginx` and bring the result with `COPY --from=builder /app/dist /usr/share/nginx/html`."),
      starter_code: "FROM node:20 AS builder\nRUN npm run build\nFROM nginx\n",
      blocks: [
        "FROM node:20 AS builder",
        "RUN npm run build",
        "FROM nginx",
        "COPY --from=builder /app/dist /usr/share/nginx/html",
        "COPY /app/dist /usr/share/nginx/html",
      ],
      hints: [
        P("`COPY --from=builder origen destino` copia de otra etapa.", "`COPY --from=builder src dest` copies from another stage."),
      ],
      test_cases: [
        { input: "img.copies[0].from", expected: "builder", description: P("from builder", "from builder"), raw: true },
        { input: "img.copies[0].src", expected: "/app/dist", description: P("origen /app/dist", "src /app/dist"), raw: true },
        { input: "img.copies[0].dest", expected: "/usr/share/nginx/html", description: P("destino nginx", "dest nginx"), raw: true },
      ],
    },
  },
  dones_de_lorien: {
    kind: "challenge",
    title: P("Los Dones de Lórien", "The Gifts of Lórien"),
    lore_intro: P("Compila un binario Go y sírvelo desde alpine.", "Build a Go binary and serve it from alpine."),
    challenge: {
      topic: P("Multi-stage (Go → alpine)", "Multi-stage (Go → alpine)"),
      instructions: P("Etapa `FROM golang:1.22 AS compilar` con `WORKDIR /src` y `RUN go build -o app`; luego `FROM alpine`, trae el binario con `COPY --from=compilar /src/app /app` y `CMD [\"/app\"]`.", "Stage `FROM golang:1.22 AS compilar` with `WORKDIR /src` and `RUN go build -o app`; then `FROM alpine`, bring the binary with `COPY --from=compilar /src/app /app` and `CMD [\"/app\"]`."),
      starter_code: "FROM golang:1.22 AS compilar\nWORKDIR /src\nRUN go build -o app\nFROM alpine\n",
      blocks: [
        "FROM golang:1.22 AS compilar",
        "WORKDIR /src",
        "RUN go build -o app",
        "FROM alpine",
        "COPY --from=compilar /src/app /app",
        "CMD [\"/app\"]",
        "COPY --from=alpine /src/app /app",
      ],
      hints: [
        P("La imagen final es `alpine`; trae sólo el binario con `--from=compilar`.", "The final image is `alpine`; bring only the binary with `--from=compilar`."),
      ],
      test_cases: [
        { input: "img.from", expected: "alpine", description: P("Final alpine", "Final alpine"), raw: true },
        { input: "img.copies[0].from", expected: "compilar", description: P("from compilar", "from compilar"), raw: true },
        { input: "img.cmd", expected: ["/app"], description: P("CMD /app", "CMD /app"), raw: true },
      ],
    },
  },
};

export const SYL_DOCKER_8: Syllabus = {
  c8_uruk_arquero: {
    kind: "battle",
    questions: [
      {
        question: p("Para una imagen de producción Node, ¿qué base es preferible?", "For a Node production image, which base is preferable?"),
        options: [
          p("Una pequeña como `node:20-alpine`", "A small one like `node:20-alpine`"),
          p("`node:latest`", "`node:latest`"),
          p("`ubuntu`", "`ubuntu`"),
          p("La más grande", "The biggest"),
        ],
        correct: 0,
        explanation: p("`-alpine`/`-slim` reducen tamaño y superficie. Con un tag fijo, además, el build es reproducible.", "`-alpine`/`-slim` reduce size and surface. With a pinned tag, the build is also reproducible."),
      },
      {
        question: p("`npm ci --omit=dev` en producción sirve para…", "`npm ci --omit=dev` in production serves to…"),
        options: [
          p("Instalar sólo dependencias de producción, de forma reproducible", "Install only production dependencies, reproducibly"),
          p("Instalar todo", "Install everything"),
          p("Borrar node_modules", "Delete node_modules"),
          p("Nada", "Nothing"),
        ],
        correct: 0,
        explanation: p("`npm ci` usa el lockfile (reproducible) y `--omit=dev` excluye devDependencies: imagen más pequeña.", "`npm ci` uses the lockfile (reproducible) and `--omit=dev` excludes devDependencies: smaller image."),
      },
      {
        question: p("Combinar buenas prácticas significa…", "Combining best practices means…"),
        options: [
          p("Base pequeña + tags fijos + no-root + multi-stage + orden de caché", "Small base + pinned tags + non-root + multi-stage + cache ordering"),
          p("Sólo una de ellas", "Only one of them"),
          p("Ninguna", "None"),
          p("Usar root y latest", "Using root and latest"),
        ],
        correct: 0,
        explanation: p("Una imagen sólida junta varias prácticas: tamaño, reproducibilidad, seguridad y velocidad de build.", "A solid image combines several practices: size, reproducibility, security and build speed."),
      }
    ],
  },
  c8_orco_saqueador: {
    kind: "battle",
    questions: [
      {
        question: p("¿Por qué fijar `WORKDIR` antes de COPY/RUN?", "Why set `WORKDIR` before COPY/RUN?"),
        options: [
          p("Para tener rutas claras y evitar copiar a `/`", "To have clear paths and avoid copying into `/`"),
          p("Por estética", "For aesthetics"),
          p("Es obligatorio", "It's mandatory"),
          p("No sirve", "It's useless"),
        ],
        correct: 0,
        explanation: p("`WORKDIR /app` da un directorio de trabajo predecible; COPY/RUN operan ahí en vez de la raíz.", "`WORKDIR /app` gives a predictable working directory; COPY/RUN operate there instead of the root."),
      },
      {
        question: p("¿Dónde deberían ir los secretos de producción?", "Where should production secrets go?"),
        options: [
          p("En runtime (variables/secret mounts), NO horneados en la imagen", "At runtime (env/secret mounts), NOT baked into the image"),
          p("En un `ENV` del Dockerfile", "In a Dockerfile `ENV`"),
          p("En un `LABEL`", "In a `LABEL`"),
          p("En un `RUN echo`", "In a `RUN echo`"),
        ],
        correct: 0,
        explanation: p("Todo lo horneado queda en las capas y en el historial. Los secretos se inyectan al ejecutar, no al construir.", "Anything baked stays in the layers and history. Secrets are injected at run, not at build."),
      },
      {
        question: p("Una app que escucha en 8080 debería…", "An app listening on 8080 should…"),
        options: [
          p("Declararlo con `EXPOSE 8080` y publicarse con `-p` al correr", "Declare it with `EXPOSE 8080` and be published with `-p` at run"),
          p("Sólo `EXPOSE` basta para acceder", "`EXPOSE` alone is enough to reach it"),
          p("No declarar nada", "Declare nothing"),
          p("Usar root", "Use root"),
        ],
        correct: 0,
        explanation: p("`EXPOSE` documenta el 8080; el acceso real desde el host llega con `docker run -p 8080:8080`.", "`EXPOSE` documents 8080; real host access comes with `docker run -p 8080:8080`."),
      }
    ],
  },
  c8_uruk_espadachin: {
    kind: "battle",
    questions: [
      {
        question: p("El proceso principal del contenedor lo define…", "The container's main process is defined by…"),
        options: [
          p("`CMD`/`ENTRYPOINT`", "`CMD`/`ENTRYPOINT`"),
          p("`FROM`", "`FROM`"),
          p("`COPY`", "`COPY`"),
          p("`LABEL`", "`LABEL`"),
        ],
        correct: 0,
        explanation: p("Es lo que corre como PID 1. En producción, forma exec para recibir bien las señales de parada.", "It's what runs as PID 1. In production, use the exec form to receive stop signals properly."),
      },
      {
        question: p("Un Dockerfile de producción completo suele terminar con…", "A complete production Dockerfile usually ends with…"),
        options: [
          p("`USER` no-root, `EXPOSE` y `CMD` en forma exec", "Non-root `USER`, `EXPOSE` and `CMD` in exec form"),
          p("Un `RUN` gigante", "A giant `RUN`"),
          p("Nada", "Nothing"),
          p("`FROM latest`", "`FROM latest`"),
        ],
        correct: 0,
        explanation: p("El cierre típico: cambiar a usuario no-root, declarar el puerto y fijar el comando de arranque en forma exec.", "The typical closing: switch to non-root user, declare the port and set the startup command in exec form."),
      },
      {
        question: p("Juntar FROM pequeño, multi-stage, caché, no-root, ENV y EXPOSE demuestra…", "Combining a small FROM, multi-stage, caching, non-root, ENV and EXPOSE shows…"),
        options: [
          p("Que sabes escribir un Dockerfile de producción sólido", "That you can write a solid production Dockerfile"),
          p("Sólo teoría", "Only theory"),
          p("Nada práctico", "Nothing practical"),
          p("Una sola instrucción", "A single instruction"),
        ],
        correct: 0,
        explanation: p("El objetivo final: una imagen pequeña, reproducible, segura y con buena caché. Ésa es la prueba de maestría.", "The end goal: a small, reproducible, secure, well-cached image. That's the mastery test."),
      }
    ],
  },
  c8_jefe_lurtz: {
    kind: "challenge",
    title: P("Lurtz, Capitán Uruk-hai", "Lurtz, Uruk-hai Captain"),
    lore_intro: P("La obra maestra: multi-stage con todas las prácticas.", "The masterpiece: multi-stage with every best practice."),
    challenge: {
      topic: P("Dockerfile de producción (todo)", "Production Dockerfile (everything)"),
      instructions: P("Builder: `FROM node:20 AS builder`, `WORKDIR /app`, `COPY package.json package-lock.json ./`, `RUN npm ci`, `COPY . .`, `RUN npm run build`. Runtime: `FROM node:20-alpine AS runtime`, `WORKDIR /app`, `ENV NODE_ENV=production`, `COPY --from=builder /app/dist ./dist`, `COPY --from=builder /app/node_modules ./node_modules`, `USER node`, `EXPOSE 8080`, `CMD [\"node\", \"dist/index.js\"]`.", "Builder: `FROM node:20 AS builder`, `WORKDIR /app`, `COPY package.json package-lock.json ./`, `RUN npm ci`, `COPY . .`, `RUN npm run build`. Runtime: `FROM node:20-alpine AS runtime`, `WORKDIR /app`, `ENV NODE_ENV=production`, `COPY --from=builder /app/dist ./dist`, `COPY --from=builder /app/node_modules ./node_modules`, `USER node`, `EXPOSE 8080`, `CMD [\"node\", \"dist/index.js\"]`."),
      starter_code: "FROM node:20 AS builder\nWORKDIR /app\n",
      blocks: [
        "FROM node:20 AS builder",
        "WORKDIR /app",
        "COPY package.json package-lock.json ./",
        "RUN npm ci",
        "COPY . .",
        "RUN npm run build",
        "FROM node:20-alpine AS runtime",
        "WORKDIR /app",
        "ENV NODE_ENV=production",
        "COPY --from=builder /app/dist ./dist",
        "COPY --from=builder /app/node_modules ./node_modules",
        "USER node",
        "EXPOSE 8080",
        "CMD [\"node\", \"dist/index.js\"]",
        "COPY /app/dist ./dist",
      ],
      hints: [
        P("Compila en builder; en runtime alpine copia dist y node_modules con `--from`, corre como `node` y arranca en forma exec.", "Build in builder; in alpine runtime copy dist and node_modules with `--from`, run as `node` and start in exec form."),
      ],
      test_cases: [
        { input: "img.stages", expected: ["builder","runtime"], description: P("Dos etapas", "Two stages"), raw: true },
        { input: "img.from", expected: "node:20-alpine", description: P("Final alpine", "Final alpine"), raw: true },
        { input: "img.env.NODE_ENV", expected: "production", description: P("NODE_ENV", "NODE_ENV"), raw: true },
        { input: "img.copies.length", expected: 2, description: P("Dos COPY --from", "Two COPY --from"), raw: true },
        { input: "img.copies[0].from", expected: "builder", description: P("USER node", "USER node"), raw: true },
        { input: "img.user", expected: "node", description: P("EXPOSE 8080", "EXPOSE 8080"), raw: true },
        { input: "img.expose", expected: [8080], description: P("CMD", "CMD"), raw: true },
        { input: "img.cmd", expected: ["node","dist/index.js"], description: P("", ""), raw: true },
      ],
    },
  },
  pergamino_fallos: {
    kind: "scroll",
    title: p("El Pergamino de la Maestría", "The Scroll of Mastery"),
    lore_intro: p("Un pergamino reúne todas las buenas prácticas en una imagen sólida.", "A scroll gathers all best practices into a solid image."),
    scroll: {
      topic: p("Docker: buenas prácticas", "Docker: best practices"),
      sections: [
        { heading: p("Pequeña y fija", "Small and pinned"), body: p("Base pequeña con tag concreto: `node:20-alpine`. Reproducible y ligera.", "Small base with a specific tag: `node:20-alpine`. Reproducible and light."), code: "FROM node:20-alpine" },
        { heading: p("Caché y prod", "Cache and prod"), body: p("Copia deps y usa `npm ci --omit=dev`; luego el código. Rápido de construir y sólo con lo necesario.", "Copy deps and use `npm ci --omit=dev`; then the code. Fast to build and only what's needed."), code: "COPY package.json package-lock.json ./\nRUN npm ci --omit=dev\nCOPY . ." },
        { heading: p("Seguridad y arranque", "Security and startup"), body: p("Cambia a usuario no-root, declara el puerto y fija el comando en forma exec.", "Switch to a non-root user, declare the port and set the command in exec form."), code: "USER node\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]" },
      ],
      keyTakeaway: p("Imagen de producción: base pequeña con tag fijo, caché de deps (npm ci), multi-stage, usuario no-root, EXPOSE y CMD en forma exec. Pequeña, reproducible y segura.", "Production image: small pinned base, deps caching (npm ci), multi-stage, non-root user, EXPOSE and exec-form CMD. Small, reproducible and secure."),
    },
  },
  tentacion_de_boromir: {
    kind: "challenge",
    title: P("La Tentación de Boromir", "Boromir's Temptation"),
    lore_intro: P("Un Dockerfile de app completo y ordenado.", "A complete, well-ordered app Dockerfile."),
    challenge: {
      topic: P("Dockerfile de app completo", "Complete app Dockerfile"),
      instructions: P("Sobre `node:20` con `WORKDIR /app`: `COPY package.json .`, `RUN npm install`, `COPY . .`, `EXPOSE 3000` y `CMD [\"node\", \"index.js\"]`.", "On `node:20` with `WORKDIR /app`: `COPY package.json .`, `RUN npm install`, `COPY . .`, `EXPOSE 3000` and `CMD [\"node\", \"index.js\"]`."),
      starter_code: "FROM node:20\nWORKDIR /app\n",
      blocks: [
        "FROM node:20",
        "WORKDIR /app",
        "COPY package.json .",
        "RUN npm install",
        "COPY . .",
        "EXPOSE 3000",
        "CMD [\"node\", \"index.js\"]",
        "CMD node index.js",
      ],
      hints: [
        P("Deps primero (caché), luego el código, expón y arranca en forma exec.", "Deps first (cache), then code, expose and start in exec form."),
      ],
      test_cases: [
        { input: "img.from", expected: "node:20", description: P("Base node:20", "Base node:20"), raw: true },
        { input: "img.workdir", expected: "/app", description: P("WORKDIR", "WORKDIR"), raw: true },
        { input: "img.copies.length", expected: 2, description: P("Dos COPY", "Two COPYs"), raw: true },
        { input: "img.expose", expected: [3000], description: P("EXPOSE 3000", "EXPOSE 3000"), raw: true },
        { input: "img.cmd", expected: ["node","index.js"], description: P("CMD", "CMD"), raw: true },
      ],
    },
  },
  solio_de_la_vision: {
    kind: "challenge",
    title: P("El Solio de la Visión", "The Seat of Seeing"),
    lore_intro: P("Multi-stage Python: dependencias aparte, imagen slim.", "Python multi-stage: deps apart, slim image."),
    challenge: {
      topic: P("Multi-stage (Python slim)", "Multi-stage (Python slim)"),
      instructions: P("Etapa `FROM python:3.12 AS builder` (`WORKDIR /app`, `COPY requirements.txt .`, `RUN pip install --target=/deps -r requirements.txt`). Etapa `FROM python:3.12-slim`: `COPY --from=builder /deps /usr/lib/python3.12/site-packages`, `COPY . /app`, `WORKDIR /app`, `CMD [\"python\", \"main.py\"]`.", "Stage `FROM python:3.12 AS builder` (`WORKDIR /app`, `COPY requirements.txt .`, `RUN pip install --target=/deps -r requirements.txt`). Stage `FROM python:3.12-slim`: `COPY --from=builder /deps /usr/lib/python3.12/site-packages`, `COPY . /app`, `WORKDIR /app`, `CMD [\"python\", \"main.py\"]`."),
      starter_code: "FROM python:3.12 AS builder\nWORKDIR /app\n",
      blocks: [
        "FROM python:3.12 AS builder",
        "WORKDIR /app",
        "COPY requirements.txt .",
        "RUN pip install --target=/deps -r requirements.txt",
        "FROM python:3.12-slim",
        "COPY --from=builder /deps /usr/lib/python3.12/site-packages",
        "COPY . /app",
        "WORKDIR /app",
        "CMD [\"python\", \"main.py\"]",
        "FROM python:3.12-slim AS builder",
      ],
      hints: [
        P("Instala las deps con `--target` en builder y cópialas a la imagen slim.", "Install deps with `--target` in builder and copy them into the slim image."),
      ],
      test_cases: [
        { input: "img.stages", expected: ["builder"], description: P("Etapa builder", "Builder stage"), raw: true },
        { input: "img.from", expected: "python:3.12-slim", description: P("Final slim", "Final slim"), raw: true },
        { input: "img.copies[0].from", expected: "builder", description: P("from builder", "from builder"), raw: true },
        { input: "img.workdir", expected: "/app", description: P("WORKDIR", "WORKDIR"), raw: true },
        { input: "img.cmd", expected: ["python","main.py"], description: P("CMD", "CMD"), raw: true },
      ],
    },
  },
  hueste_de_isengard: {
    kind: "challenge",
    title: P("La Hueste de Isengard", "The Host of Isengard"),
    lore_intro: P("Producción segura: alpine, prod deps y no-root.", "Secure production: alpine, prod deps and non-root."),
    challenge: {
      topic: P("Imagen de producción segura", "Secure production image"),
      instructions: P("Sobre `node:20-alpine` con `WORKDIR /app`: `ENV NODE_ENV=production`, `COPY package.json .`, `RUN npm ci --omit=dev`, `COPY . .`, `USER node`, `EXPOSE 3000` y `CMD [\"node\", \"server.js\"]`.", "On `node:20-alpine` with `WORKDIR /app`: `ENV NODE_ENV=production`, `COPY package.json .`, `RUN npm ci --omit=dev`, `COPY . .`, `USER node`, `EXPOSE 3000` and `CMD [\"node\", \"server.js\"]`."),
      starter_code: "FROM node:20-alpine\nWORKDIR /app\n",
      blocks: [
        "FROM node:20-alpine",
        "WORKDIR /app",
        "ENV NODE_ENV=production",
        "COPY package.json .",
        "RUN npm ci --omit=dev",
        "COPY . .",
        "USER node",
        "EXPOSE 3000",
        "CMD [\"node\", \"server.js\"]",
        "RUN npm install",
      ],
      hints: [
        P("`npm ci --omit=dev` sólo instala prod; `USER node` evita root.", "`npm ci --omit=dev` installs prod only; `USER node` avoids root."),
      ],
      test_cases: [
        { input: "img.env.NODE_ENV", expected: "production", description: P("NODE_ENV", "NODE_ENV"), raw: true },
        { input: "img.user", expected: "node", description: P("USER node", "USER node"), raw: true },
        { input: "img.expose", expected: [3000], description: P("EXPOSE 3000", "EXPOSE 3000"), raw: true },
        { input: "img.runs", expected: ["npm ci --omit=dev"], description: P("npm ci prod", "npm ci prod"), raw: true },
      ],
    },
  },
};
