import type { Adventure } from "@/lib/game/adventure";
import { allChapters } from "@/lib/game/adventure";
import { BOOK_FELLOWSHIP, BOOK_APPENDICES } from "@/lib/game/book";
import {
  CHAPTER_SOLID,
  CHAPTER_ALGOS,
  CHAPTER_ALGOS_2,
  CHAPTER_ALGOS_3,
  CHAPTER_LOGICA,
  CHAPTER_CALENTAMIENTO,
} from "./chapters";
import {
  buildChapter,
  applyVariantOverrides,
  mergeOverrides,
} from "@/lib/game/narrative";
import {
  DP_PHP_1,
  DP_PHP_2,
  DP_PHP_3,
  DP_PHP_4,
  DP_PHP_5,
  DP_PHP_6,
  DP_PHP_7,
  DP_PHP_8,
} from "./syllabus/design-patterns-php";
import {
  DP_PY_1,
  DP_PY_2,
  DP_PY_3,
  DP_PY_4,
  DP_PY_5,
  DP_PY_6,
  DP_PY_7,
  DP_PY_8,
} from "./syllabus/design-patterns-python";
import {
  NARR_COMMUNITY_1,
  NARR_COMMUNITY_2,
  NARR_COMMUNITY_3,
  NARR_COMMUNITY_4,
  NARR_COMMUNITY_5,
  NARR_COMMUNITY_6,
  NARR_COMMUNITY_7,
  NARR_COMMUNITY_8,
} from "./narrative/community";
import {
  SYL_PHP_COMMUNITY_1,
  SYL_PHP_COMMUNITY_2,
  SYL_PHP_COMMUNITY_3,
  SYL_PHP_COMMUNITY_4,
  SYL_PHP_COMMUNITY_5,
  SYL_PHP_COMMUNITY_6,
  SYL_PHP_COMMUNITY_7,
  SYL_PHP_COMMUNITY_8,
} from "./syllabus/community-php";
import {
  SYL_JS_COMMUNITY_1,
  SYL_JS_COMMUNITY_2,
  SYL_JS_COMMUNITY_3,
  SYL_JS_COMMUNITY_4,
  SYL_JS_COMMUNITY_5,
  SYL_JS_COMMUNITY_6,
  SYL_JS_COMMUNITY_7,
  SYL_JS_COMMUNITY_8,
} from "./syllabus/community-js";
import {
  SYL_TS_COMMUNITY_1,
  SYL_TS_COMMUNITY_2,
  SYL_TS_COMMUNITY_3,
  SYL_TS_COMMUNITY_4,
  SYL_TS_COMMUNITY_5,
  SYL_TS_COMMUNITY_6,
  SYL_TS_COMMUNITY_7,
  SYL_TS_COMMUNITY_8,
} from "./syllabus/community-ts";
import {
  SYL_GO_COMMUNITY_1,
  SYL_GO_COMMUNITY_2,
  SYL_GO_COMMUNITY_3,
  SYL_GO_COMMUNITY_4,
  SYL_GO_COMMUNITY_5,
  SYL_GO_COMMUNITY_6,
  SYL_GO_COMMUNITY_7,
  SYL_GO_COMMUNITY_8,
} from "./syllabus/community-go";
import {
  SYL_REACT_COMMUNITY_1,
  SYL_REACT_COMMUNITY_2,
  SYL_REACT_COMMUNITY_3,
  SYL_REACT_COMMUNITY_4,
  SYL_REACT_COMMUNITY_5,
  SYL_REACT_COMMUNITY_6,
  SYL_REACT_COMMUNITY_7,
  SYL_REACT_COMMUNITY_8,
} from "./syllabus/community-react";
import {
  SYL_PY_COMMUNITY_1,
  SYL_PY_COMMUNITY_2,
  SYL_PY_COMMUNITY_3,
  SYL_PY_COMMUNITY_4,
  SYL_PY_COMMUNITY_5,
  SYL_PY_COMMUNITY_6,
  SYL_PY_COMMUNITY_7,
  SYL_PY_COMMUNITY_8,
} from "./syllabus/community-python";
import {
  SYL_DATA_1,
  SYL_DATA_2,
  SYL_DATA_3,
  SYL_DATA_4,
  SYL_DATA_5,
  SYL_DATA_6,
  SYL_DATA_7,
  SYL_DATA_8,
} from "./syllabus/data-python";
import {
  SYL_MPL_1,
  SYL_MPL_2,
  SYL_MPL_3,
  SYL_MPL_4,
  SYL_MPL_5,
  SYL_MPL_6,
  SYL_MPL_7,
  SYL_MPL_8,
} from "./syllabus/matplotlib-python";
import {
  SYL_SQL_1,
  SYL_SQL_2,
  SYL_SQL_3,
  SYL_SQL_4,
  SYL_SQL_5,
  SYL_SQL_6,
  SYL_SQL_7,
  SYL_SQL_8,
} from "./syllabus/sql";
import {
  SYL_DP_1,
  SYL_DP_2,
  SYL_DP_3,
  SYL_DP_4,
  SYL_DP_5,
  SYL_DP_6,
  SYL_DP_7,
  SYL_DP_8,
} from "./syllabus/design-patterns";
import {
  DP_PHP_C_1,
  DP_PHP_C_2,
  DP_PHP_C_3,
  DP_PHP_C_4,
  DP_PHP_C_5,
  DP_PHP_C_6,
  DP_PHP_C_7,
  DP_PHP_C_8,
} from "./syllabus/design-patterns-php-content";
import {
  DP_PY_C_1,
  DP_PY_C_2,
  DP_PY_C_3,
  DP_PY_C_4,
  DP_PY_C_5,
  DP_PY_C_6,
  DP_PY_C_7,
  DP_PY_C_8,
} from "./syllabus/design-patterns-python-content";
import {
  SYL_VUE_1,
  SYL_VUE_2,
  SYL_VUE_3,
  SYL_VUE_4,
  SYL_VUE_5,
  SYL_VUE_6,
  SYL_VUE_7,
  SYL_VUE_8,
} from "./syllabus/vue";
import {
  SYL_AWS_1,
  SYL_AWS_2,
  SYL_AWS_3,
  SYL_AWS_4,
  SYL_AWS_5,
  SYL_AWS_6,
  SYL_AWS_7,
  SYL_AWS_8,
} from "./syllabus/aws";
import {
  SYL_DOCKER_1,
  SYL_DOCKER_2,
  SYL_DOCKER_3,
  SYL_DOCKER_4,
  SYL_DOCKER_5,
  SYL_DOCKER_6,
  SYL_DOCKER_7,
  SYL_DOCKER_8,
} from "./syllabus/docker";

// Capítulo 1 de la Comunidad, construido fundiendo la MISMA narrativa con el
// temario de cada lenguaje.
const PHP_COMMUNITY_1 = buildChapter(
  NARR_COMMUNITY_1,
  SYL_PHP_COMMUNITY_1,
  "php",
);
const JS_COMMUNITY_1 = buildChapter(
  NARR_COMMUNITY_1,
  SYL_JS_COMMUNITY_1,
  "javascript",
);
const PHP_COMMUNITY_2 = buildChapter(
  NARR_COMMUNITY_2,
  SYL_PHP_COMMUNITY_2,
  "php",
);
const JS_COMMUNITY_2 = buildChapter(
  NARR_COMMUNITY_2,
  SYL_JS_COMMUNITY_2,
  "javascript",
);
const PHP_COMMUNITY_3 = buildChapter(NARR_COMMUNITY_3, SYL_PHP_COMMUNITY_3, "php");
const JS_COMMUNITY_3 = buildChapter(NARR_COMMUNITY_3, SYL_JS_COMMUNITY_3, "javascript");
const PHP_COMMUNITY_4 = buildChapter(NARR_COMMUNITY_4, SYL_PHP_COMMUNITY_4, "php");
const JS_COMMUNITY_4 = buildChapter(NARR_COMMUNITY_4, SYL_JS_COMMUNITY_4, "javascript");
const PHP_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_PHP_COMMUNITY_5, "php");
const JS_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_JS_COMMUNITY_5, "javascript");
const PHP_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_PHP_COMMUNITY_6, "php");
const JS_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_JS_COMMUNITY_6, "javascript");
const PHP_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_PHP_COMMUNITY_7, "php");
const JS_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_JS_COMMUNITY_7, "javascript");
const PHP_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_PHP_COMMUNITY_8, "php");
const JS_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_JS_COMMUNITY_8, "javascript");
const TS_COMMUNITY_1 = buildChapter(NARR_COMMUNITY_1, SYL_TS_COMMUNITY_1, "typescript");
const TS_COMMUNITY_2 = buildChapter(NARR_COMMUNITY_2, SYL_TS_COMMUNITY_2, "typescript");
const TS_COMMUNITY_3 = buildChapter(NARR_COMMUNITY_3, SYL_TS_COMMUNITY_3, "typescript");
const TS_COMMUNITY_4 = buildChapter(NARR_COMMUNITY_4, SYL_TS_COMMUNITY_4, "typescript");
const TS_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_TS_COMMUNITY_5, "typescript");
const TS_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_TS_COMMUNITY_6, "typescript");
const TS_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_TS_COMMUNITY_7, "typescript");
const TS_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_TS_COMMUNITY_8, "typescript");
const GO_COMMUNITY_1 = buildChapter(NARR_COMMUNITY_1, SYL_GO_COMMUNITY_1, "go");
const GO_COMMUNITY_2 = buildChapter(NARR_COMMUNITY_2, SYL_GO_COMMUNITY_2, "go");
const GO_COMMUNITY_3 = buildChapter(NARR_COMMUNITY_3, SYL_GO_COMMUNITY_3, "go");
const GO_COMMUNITY_4 = buildChapter(NARR_COMMUNITY_4, SYL_GO_COMMUNITY_4, "go");
const GO_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_GO_COMMUNITY_5, "go");
const GO_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_GO_COMMUNITY_6, "go");
const GO_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_GO_COMMUNITY_7, "go");
const GO_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_GO_COMMUNITY_8, "go");
const PY_COMMUNITY_1 = buildChapter(NARR_COMMUNITY_1, SYL_PY_COMMUNITY_1, "python");
const PY_COMMUNITY_2 = buildChapter(NARR_COMMUNITY_2, SYL_PY_COMMUNITY_2, "python");
const PY_COMMUNITY_3 = buildChapter(NARR_COMMUNITY_3, SYL_PY_COMMUNITY_3, "python");
const PY_COMMUNITY_4 = buildChapter(NARR_COMMUNITY_4, SYL_PY_COMMUNITY_4, "python");
const PY_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_PY_COMMUNITY_5, "python");
const PY_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_PY_COMMUNITY_6, "python");
const PY_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_PY_COMMUNITY_7, "python");
const PY_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_PY_COMMUNITY_8, "python");
const DATA_1 = buildChapter(NARR_COMMUNITY_1, SYL_DATA_1, "python");
const DATA_2 = buildChapter(NARR_COMMUNITY_2, SYL_DATA_2, "python");
const DATA_3 = buildChapter(NARR_COMMUNITY_3, SYL_DATA_3, "python");
const DATA_4 = buildChapter(NARR_COMMUNITY_4, SYL_DATA_4, "python");
const DATA_5 = buildChapter(NARR_COMMUNITY_5, SYL_DATA_5, "python");
const DATA_6 = buildChapter(NARR_COMMUNITY_6, SYL_DATA_6, "python");
const DATA_7 = buildChapter(NARR_COMMUNITY_7, SYL_DATA_7, "python");
const DATA_8 = buildChapter(NARR_COMMUNITY_8, SYL_DATA_8, "python");
const MPL_1 = buildChapter(NARR_COMMUNITY_1, SYL_MPL_1, "python");
const MPL_2 = buildChapter(NARR_COMMUNITY_2, SYL_MPL_2, "python");
const MPL_3 = buildChapter(NARR_COMMUNITY_3, SYL_MPL_3, "python");
const MPL_4 = buildChapter(NARR_COMMUNITY_4, SYL_MPL_4, "python");
const MPL_5 = buildChapter(NARR_COMMUNITY_5, SYL_MPL_5, "python");
const MPL_6 = buildChapter(NARR_COMMUNITY_6, SYL_MPL_6, "python");
const MPL_7 = buildChapter(NARR_COMMUNITY_7, SYL_MPL_7, "python");
const MPL_8 = buildChapter(NARR_COMMUNITY_8, SYL_MPL_8, "python");
const SQL_1 = buildChapter(NARR_COMMUNITY_1, SYL_SQL_1, "sql");
const SQL_2 = buildChapter(NARR_COMMUNITY_2, SYL_SQL_2, "sql");
const SQL_3 = buildChapter(NARR_COMMUNITY_3, SYL_SQL_3, "sql");
const SQL_4 = buildChapter(NARR_COMMUNITY_4, SYL_SQL_4, "sql");
const SQL_5 = buildChapter(NARR_COMMUNITY_5, SYL_SQL_5, "sql");
const SQL_6 = buildChapter(NARR_COMMUNITY_6, SYL_SQL_6, "sql");
const SQL_7 = buildChapter(NARR_COMMUNITY_7, SYL_SQL_7, "sql");
const SQL_8 = buildChapter(NARR_COMMUNITY_8, SYL_SQL_8, "sql");
const DP_1 = buildChapter(NARR_COMMUNITY_1, SYL_DP_1, "typescript");
const DP_2 = buildChapter(NARR_COMMUNITY_2, SYL_DP_2, "typescript");
const DP_3 = buildChapter(NARR_COMMUNITY_3, SYL_DP_3, "typescript");
const DP_4 = buildChapter(NARR_COMMUNITY_4, SYL_DP_4, "typescript");
const DP_5 = buildChapter(NARR_COMMUNITY_5, SYL_DP_5, "typescript");
const DP_6 = buildChapter(NARR_COMMUNITY_6, SYL_DP_6, "typescript");
const DP_7 = buildChapter(NARR_COMMUNITY_7, SYL_DP_7, "typescript");
const DP_8 = buildChapter(NARR_COMMUNITY_8, SYL_DP_8, "typescript");
// Variante PHP: mismos node_id y narrativa, pero con retos, preguntas,
// pergaminos e instrucciones propios del lenguaje (código + contenido por idioma).
const DPP_1 = buildChapter(NARR_COMMUNITY_1, applyVariantOverrides(SYL_DP_1, mergeOverrides(DP_PHP_1, DP_PHP_C_1)), "php");
const DPP_2 = buildChapter(NARR_COMMUNITY_2, applyVariantOverrides(SYL_DP_2, mergeOverrides(DP_PHP_2, DP_PHP_C_2)), "php");
const DPP_3 = buildChapter(NARR_COMMUNITY_3, applyVariantOverrides(SYL_DP_3, mergeOverrides(DP_PHP_3, DP_PHP_C_3)), "php");
const DPP_4 = buildChapter(NARR_COMMUNITY_4, applyVariantOverrides(SYL_DP_4, mergeOverrides(DP_PHP_4, DP_PHP_C_4)), "php");
const DPP_5 = buildChapter(NARR_COMMUNITY_5, applyVariantOverrides(SYL_DP_5, mergeOverrides(DP_PHP_5, DP_PHP_C_5)), "php");
const DPP_6 = buildChapter(NARR_COMMUNITY_6, applyVariantOverrides(SYL_DP_6, mergeOverrides(DP_PHP_6, DP_PHP_C_6)), "php");
const DPP_7 = buildChapter(NARR_COMMUNITY_7, applyVariantOverrides(SYL_DP_7, mergeOverrides(DP_PHP_7, DP_PHP_C_7)), "php");
const DPP_8 = buildChapter(NARR_COMMUNITY_8, applyVariantOverrides(SYL_DP_8, mergeOverrides(DP_PHP_8, DP_PHP_C_8)), "php");
// Variante Python.
const DPY_1 = buildChapter(NARR_COMMUNITY_1, applyVariantOverrides(SYL_DP_1, mergeOverrides(DP_PY_1, DP_PY_C_1)), "python");
const DPY_2 = buildChapter(NARR_COMMUNITY_2, applyVariantOverrides(SYL_DP_2, mergeOverrides(DP_PY_2, DP_PY_C_2)), "python");
const DPY_3 = buildChapter(NARR_COMMUNITY_3, applyVariantOverrides(SYL_DP_3, mergeOverrides(DP_PY_3, DP_PY_C_3)), "python");
const DPY_4 = buildChapter(NARR_COMMUNITY_4, applyVariantOverrides(SYL_DP_4, mergeOverrides(DP_PY_4, DP_PY_C_4)), "python");
const DPY_5 = buildChapter(NARR_COMMUNITY_5, applyVariantOverrides(SYL_DP_5, mergeOverrides(DP_PY_5, DP_PY_C_5)), "python");
const DPY_6 = buildChapter(NARR_COMMUNITY_6, applyVariantOverrides(SYL_DP_6, mergeOverrides(DP_PY_6, DP_PY_C_6)), "python");
const DPY_7 = buildChapter(NARR_COMMUNITY_7, applyVariantOverrides(SYL_DP_7, mergeOverrides(DP_PY_7, DP_PY_C_7)), "python");
const DPY_8 = buildChapter(NARR_COMMUNITY_8, applyVariantOverrides(SYL_DP_8, mergeOverrides(DP_PY_8, DP_PY_C_8)), "python");
const VUE_1 = buildChapter(NARR_COMMUNITY_1, SYL_VUE_1, "vue");
const VUE_2 = buildChapter(NARR_COMMUNITY_2, SYL_VUE_2, "vue");
const VUE_3 = buildChapter(NARR_COMMUNITY_3, SYL_VUE_3, "vue");
const VUE_4 = buildChapter(NARR_COMMUNITY_4, SYL_VUE_4, "vue");
const VUE_5 = buildChapter(NARR_COMMUNITY_5, SYL_VUE_5, "vue");
const VUE_6 = buildChapter(NARR_COMMUNITY_6, SYL_VUE_6, "vue");
const VUE_7 = buildChapter(NARR_COMMUNITY_7, SYL_VUE_7, "vue");
const VUE_8 = buildChapter(NARR_COMMUNITY_8, SYL_VUE_8, "vue");
const AWS_1 = buildChapter(NARR_COMMUNITY_1, SYL_AWS_1, "aws");
const AWS_2 = buildChapter(NARR_COMMUNITY_2, SYL_AWS_2, "aws");
const AWS_3 = buildChapter(NARR_COMMUNITY_3, SYL_AWS_3, "aws");
const AWS_4 = buildChapter(NARR_COMMUNITY_4, SYL_AWS_4, "aws");
const AWS_5 = buildChapter(NARR_COMMUNITY_5, SYL_AWS_5, "aws");
const AWS_6 = buildChapter(NARR_COMMUNITY_6, SYL_AWS_6, "aws");
const AWS_7 = buildChapter(NARR_COMMUNITY_7, SYL_AWS_7, "aws");
const AWS_8 = buildChapter(NARR_COMMUNITY_8, SYL_AWS_8, "aws");
const DOCKER_1 = buildChapter(NARR_COMMUNITY_1, SYL_DOCKER_1, "docker");
const DOCKER_2 = buildChapter(NARR_COMMUNITY_2, SYL_DOCKER_2, "docker");
const DOCKER_3 = buildChapter(NARR_COMMUNITY_3, SYL_DOCKER_3, "docker");
const DOCKER_4 = buildChapter(NARR_COMMUNITY_4, SYL_DOCKER_4, "docker");
const DOCKER_5 = buildChapter(NARR_COMMUNITY_5, SYL_DOCKER_5, "docker");
const DOCKER_6 = buildChapter(NARR_COMMUNITY_6, SYL_DOCKER_6, "docker");
const DOCKER_7 = buildChapter(NARR_COMMUNITY_7, SYL_DOCKER_7, "docker");
const DOCKER_8 = buildChapter(NARR_COMMUNITY_8, SYL_DOCKER_8, "docker");
const REACT_COMMUNITY_1 = buildChapter(
  NARR_COMMUNITY_1,
  SYL_REACT_COMMUNITY_1,
  "react",
);
const REACT_COMMUNITY_2 = buildChapter(
  NARR_COMMUNITY_2,
  SYL_REACT_COMMUNITY_2,
  "react",
);
const REACT_COMMUNITY_3 = buildChapter(
  NARR_COMMUNITY_3,
  SYL_REACT_COMMUNITY_3,
  "react",
);
const REACT_COMMUNITY_4 = buildChapter(
  NARR_COMMUNITY_4,
  SYL_REACT_COMMUNITY_4,
  "react",
);
const REACT_COMMUNITY_5 = buildChapter(NARR_COMMUNITY_5, SYL_REACT_COMMUNITY_5, "react");
const REACT_COMMUNITY_6 = buildChapter(NARR_COMMUNITY_6, SYL_REACT_COMMUNITY_6, "react");
const REACT_COMMUNITY_7 = buildChapter(NARR_COMMUNITY_7, SYL_REACT_COMMUNITY_7, "react");
const REACT_COMMUNITY_8 = buildChapter(NARR_COMMUNITY_8, SYL_REACT_COMMUNITY_8, "react");

/**
 * Catálogo de aventuras. Las `available` son jugables; las `soon` aparecen en
 * el selector como "próximamente". Se irán activando por fases, empezando por
 * las que ejecutan código en el navegador (JavaScript, TypeScript, SQL).
 */
export const ADVENTURES: Adventure[] = [
  {
    id: "php",
    category: "languages",
    tech: "PHP",
    icon: "🐘",
    accent: "violet",
    status: "available",
    name: { es: "PHP", en: "PHP" },
    blurb: {
      es: "Programación orientada a objetos en PHP, de las clases a los patrones. La campaña original.",
      en: "Object-oriented programming in PHP, from classes to design patterns. The original campaign.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          PHP_COMMUNITY_1,
          PHP_COMMUNITY_2,
          PHP_COMMUNITY_3,
          PHP_COMMUNITY_4,
          PHP_COMMUNITY_5,
          PHP_COMMUNITY_6,
          PHP_COMMUNITY_7,
          PHP_COMMUNITY_8,
        ],
      },
      {
        book: BOOK_APPENDICES,
        chapters: [
          CHAPTER_SOLID,
          CHAPTER_ALGOS,
          CHAPTER_ALGOS_2,
          CHAPTER_ALGOS_3,
          CHAPTER_LOGICA,
          CHAPTER_CALENTAMIENTO,
        ],
      },
    ],
  },
  {
    id: "python",
    category: "languages",
    tech: "Python",
    icon: "🐍",
    accent: "sky",
    status: "available",
    name: { es: "Python", en: "Python" },
    blurb: {
      es: "Python desde cero: variables, control de flujo, funciones, colecciones, clases, herencia y excepciones.",
      en: "Python from scratch: variables, control flow, functions, collections, classes, inheritance and exceptions.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          PY_COMMUNITY_1,
          PY_COMMUNITY_2,
          PY_COMMUNITY_3,
          PY_COMMUNITY_4,
          PY_COMMUNITY_5,
          PY_COMMUNITY_6,
          PY_COMMUNITY_7,
          PY_COMMUNITY_8,
        ],
      },
    ],
  },
  {
    id: "javascript",
    category: "languages",
    tech: "JavaScript",
    icon: "🟨",
    accent: "amber",
    status: "available",
    name: { es: "JavaScript", en: "JavaScript" },
    blurb: {
      es: "El lenguaje de la web, ejecutándose de verdad en tu navegador. Bilingüe.",
      en: "The language of the web, running for real in your browser. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          JS_COMMUNITY_1,
          JS_COMMUNITY_2,
          JS_COMMUNITY_3,
          JS_COMMUNITY_4,
          JS_COMMUNITY_5,
          JS_COMMUNITY_6,
          JS_COMMUNITY_7,
          JS_COMMUNITY_8,
        ],
      },
    ],
  },
  {
    id: "typescript",
    category: "languages",
    tech: "TypeScript",
    icon: "🔷",
    accent: "sky",
    status: "available",
    name: { es: "TypeScript", en: "TypeScript" },
    blurb: {
      es: "JavaScript con tipos: seguridad y tooling para proyectos serios. Se transpila y ejecuta en tu navegador. Bilingüe.",
      en: "JavaScript with types: safety and tooling for serious projects. Transpiled and run in your browser. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          TS_COMMUNITY_1,
          TS_COMMUNITY_2,
          TS_COMMUNITY_3,
          TS_COMMUNITY_4,
          TS_COMMUNITY_5,
          TS_COMMUNITY_6,
          TS_COMMUNITY_7,
          TS_COMMUNITY_8,
        ],
      },
    ],
  },
  {
    id: "sql",
    category: "languages",
    tech: "SQL",
    icon: "🗄️",
    accent: "emerald",
    status: "available",
    name: { es: "SQL", en: "SQL" },
    blurb: {
      es: "Consultas a bases de datos con SQLite en el navegador: de SELECT y WHERE a GROUP BY, JOIN y subconsultas.",
      en: "Querying databases with SQLite in the browser: from SELECT and WHERE to GROUP BY, JOIN and subqueries.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [SQL_1, SQL_2, SQL_3, SQL_4, SQL_5, SQL_6, SQL_7, SQL_8],
      },
    ],
  },
  {
    id: "java",
    category: "languages",
    tech: "Java",
    icon: "☕",
    accent: "orange",
    status: "soon",
    name: { es: "Java", en: "Java" },
    blurb: {
      es: "El clásico de la industria: tipado fuerte y orientación a objetos.",
      en: "The industry classic: strong typing and object orientation.",
    },
    books: [],
  },
  {
    id: "csharp",
    category: "languages",
    tech: "C#",
    icon: "#️⃣",
    accent: "violet",
    status: "soon",
    name: { es: "C#", en: "C#" },
    blurb: {
      es: "El lenguaje de .NET: orientación a objetos moderna, LINQ, async y tipado fuerte.",
      en: "The .NET language: modern object orientation, LINQ, async and strong typing.",
    },
    books: [],
  },
  {
    id: "react",
    category: "frameworks",
    tech: "React",
    icon: "⚛️",
    accent: "cyan",
    status: "available",
    name: { es: "React", en: "React" },
    blurb: {
      es: "Interfaces con componentes, props y JSX, renderizadas de verdad en tu navegador. Bilingüe.",
      en: "Interfaces with components, props and JSX, truly rendered in your browser. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          REACT_COMMUNITY_1,
          REACT_COMMUNITY_2,
          REACT_COMMUNITY_3,
          REACT_COMMUNITY_4,
          REACT_COMMUNITY_5,
          REACT_COMMUNITY_6,
          REACT_COMMUNITY_7,
          REACT_COMMUNITY_8,
        ],
      },
    ],
  },
  {
    id: "nextjs",
    category: "frameworks",
    tech: "Next.js",
    icon: "▲",
    accent: "slate",
    status: "soon",
    name: { es: "Next.js", en: "Next.js" },
    blurb: {
      es: "El framework de React para producción: rutas, renderizado y datos.",
      en: "The React framework for production: routing, rendering and data.",
    },
    books: [],
  },
  {
    id: "go",
    category: "languages",
    tech: "Go",
    icon: "🐹",
    accent: "cyan",
    status: "available",
    name: { es: "Go", en: "Go" },
    blurb: {
      es: "El lenguaje de Google: simple y compilado. Interpretado de verdad en tu navegador (Yaegi → WASM). Bilingüe.",
      en: "Google's language: simple and compiled. Truly interpreted in your browser (Yaegi → WASM). Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          GO_COMMUNITY_1,
          GO_COMMUNITY_2,
          GO_COMMUNITY_3,
          GO_COMMUNITY_4,
          GO_COMMUNITY_5,
          GO_COMMUNITY_6,
          GO_COMMUNITY_7,
          GO_COMMUNITY_8,
        ],
      },
    ],
  },
  {
    id: "aws",
    category: "cloud",
    tech: "AWS",
    icon: "☁️",
    accent: "amber",
    status: "available",
    name: { es: "AWS", en: "AWS" },
    blurb: {
      es: "La nube de Amazon ejecutable de verdad: S3, IAM, DynamoDB, Lambda, SQS y SNS contra un SDK simulado y un motor de políticas. Bilingüe.",
      en: "Amazon's cloud, truly executable: S3, IAM, DynamoDB, Lambda, SQS and SNS against a simulated SDK and a policy engine. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [AWS_1, AWS_2, AWS_3, AWS_4, AWS_5, AWS_6, AWS_7, AWS_8],
      },
    ],
  },
  {
    id: "cloud",
    category: "cloud",
    tech: "Cloud",
    icon: "🌩️",
    accent: "sky",
    status: "soon",
    name: { es: "Fundamentos Cloud", en: "Cloud Fundamentals" },
    blurb: {
      es: "Conceptos de nube agnósticos: IaaS/PaaS/SaaS, regiones, escalado y coste.",
      en: "Vendor-agnostic cloud concepts: IaaS/PaaS/SaaS, regions, scaling and cost.",
    },
    books: [],
  },
  {
    id: "docker",
    category: "devops",
    tech: "Docker",
    icon: "🐳",
    accent: "sky",
    status: "available",
    name: { es: "Docker", en: "Docker" },
    blurb: {
      es: "Contenedores desde cero: escribe Dockerfiles y un simulador de build los ejecuta —FROM, COPY, RUN, ENV, CMD, capas y multi-stage. Bilingüe.",
      en: "Containers from scratch: write Dockerfiles and a build simulator runs them —FROM, COPY, RUN, ENV, CMD, layers and multi-stage. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [DOCKER_1, DOCKER_2, DOCKER_3, DOCKER_4, DOCKER_5, DOCKER_6, DOCKER_7, DOCKER_8],
      },
    ],
  },
  {
    id: "cicd",
    category: "devops",
    tech: "CI/CD",
    icon: "🔁",
    accent: "emerald",
    status: "soon",
    name: { es: "CI/CD", en: "CI/CD" },
    blurb: {
      es: "Integración y entrega continuas: pipelines, pruebas automáticas y despliegue.",
      en: "Continuous integration and delivery: pipelines, automated tests and deployment.",
    },
    books: [],
  },
  {
    id: "architecture",
    category: "architecture",
    tech: "Arquitectura",
    icon: "🏛️",
    accent: "indigo",
    status: "soon",
    name: { es: "Arquitectura de Software", en: "Software Architecture" },
    blurb: {
      es: "Patrones y decisiones: capas, hexagonal, microservicios, DDD y trade-offs.",
      en: "Patterns and decisions: layers, hexagonal, microservices, DDD and trade-offs.",
    },
    books: [],
  },
  {
    id: "design-patterns",
    category: "architecture",
    tech: "Patrones",
    icon: "♟️",
    accent: "rose",
    status: "available",
    name: { es: "Patrones de Diseño", en: "Design Patterns" },
    blurb: {
      es: "Patrones de la Banda de los Cuatro en TypeScript, ejecutables: Factory, Strategy, Observer, Singleton, Decorator, Adapter, Command y Composite.",
      en: "Gang of Four patterns in TypeScript, executable: Factory, Strategy, Observer, Singleton, Decorator, Adapter, Command and Composite.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [DP_1, DP_2, DP_3, DP_4, DP_5, DP_6, DP_7, DP_8],
      },
    ],
    variants: [
      {
        lang: "typescript",
        label: "TypeScript",
        icon: "🔷",
        books: [
          {
            book: BOOK_FELLOWSHIP,
            chapters: [DP_1, DP_2, DP_3, DP_4, DP_5, DP_6, DP_7, DP_8],
          },
        ],
      },
      {
        lang: "php",
        label: "PHP",
        icon: "🐘",
        books: [
          {
            book: BOOK_FELLOWSHIP,
            chapters: [DPP_1, DPP_2, DPP_3, DPP_4, DPP_5, DPP_6, DPP_7, DPP_8],
          },
        ],
      },
      {
        lang: "python",
        label: "Python",
        icon: "🐍",
        books: [
          {
            book: BOOK_FELLOWSHIP,
            chapters: [DPY_1, DPY_2, DPY_3, DPY_4, DPY_5, DPY_6, DPY_7, DPY_8],
          },
        ],
      },
    ],
  },
  {
    id: "react-native",
    category: "frameworks",
    tech: "React Native",
    icon: "📱",
    accent: "cyan",
    status: "soon",
    name: { es: "React Native", en: "React Native" },
    blurb: {
      es: "Apps móviles nativas con React: componentes, navegación y estilos.",
      en: "Native mobile apps with React: components, navigation and styles.",
    },
    books: [],
  },
  {
    id: "vue",
    category: "frameworks",
    tech: "Vue",
    icon: "💚",
    accent: "emerald",
    status: "available",
    name: { es: "Vue.js", en: "Vue.js" },
    blurb: {
      es: "El framework progresivo: componentes, reactividad, directivas y composición, ejecutados de verdad en tu navegador. Bilingüe.",
      en: "The progressive framework: components, reactivity, directives and composition, truly running in your browser. Bilingual.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [VUE_1, VUE_2, VUE_3, VUE_4, VUE_5, VUE_6, VUE_7, VUE_8],
      },
    ],
  },
  {
    id: "dotnet",
    category: "frameworks",
    tech: ".NET",
    icon: "🟣",
    accent: "violet",
    status: "soon",
    name: { es: ".NET", en: ".NET" },
    blurb: {
      es: "La plataforma de Microsoft: ASP.NET Core, Entity Framework e inyección de dependencias.",
      en: "Microsoft's platform: ASP.NET Core, Entity Framework and dependency injection.",
    },
    books: [],
  },
  {
    id: "symfony",
    category: "frameworks",
    tech: "Symfony",
    icon: "🎼",
    accent: "slate",
    status: "soon",
    name: { es: "Symfony", en: "Symfony" },
    blurb: {
      es: "El framework PHP para empresas: servicios, rutas y Doctrine.",
      en: "The enterprise PHP framework: services, routing and Doctrine.",
    },
    books: [],
  },
  {
    id: "laravel",
    category: "frameworks",
    tech: "Laravel",
    icon: "🔺",
    accent: "rose",
    status: "soon",
    name: { es: "Laravel", en: "Laravel" },
    blurb: {
      es: "PHP elegante: Eloquent, Blade, rutas y colas.",
      en: "Elegant PHP: Eloquent, Blade, routing and queues.",
    },
    books: [],
  },
  {
    id: "django",
    category: "frameworks",
    tech: "Django",
    icon: "🎸",
    accent: "emerald",
    status: "soon",
    name: { es: "Django", en: "Django" },
    blurb: {
      es: "El framework Python «con baterías incluidas»: ORM, vistas y admin.",
      en: "Python's \"batteries-included\" framework: ORM, views and admin.",
    },
    books: [],
  },
  {
    id: "flask",
    category: "frameworks",
    tech: "Flask",
    icon: "🧪",
    accent: "sky",
    status: "soon",
    name: { es: "Flask", en: "Flask" },
    blurb: {
      es: "Microframework Python: rutas, plantillas y APIs ligeras.",
      en: "Python microframework: routing, templates and lightweight APIs.",
    },
    books: [],
  },
  {
    id: "kubernetes",
    category: "devops",
    tech: "Kubernetes",
    icon: "☸️",
    accent: "indigo",
    status: "soon",
    name: { es: "Kubernetes", en: "Kubernetes" },
    blurb: {
      es: "Orquestación de contenedores: pods, deployments, services e ingress.",
      en: "Container orchestration: pods, deployments, services and ingress.",
    },
    books: [],
  },
  {
    id: "data-analyst-python",
    category: "data",
    tech: "Data Analyst",
    icon: "🐼",
    accent: "emerald",
    status: "available",
    name: {
      es: "Analista de Datos con Python",
      en: "Data Analyst with Python",
    },
    blurb: {
      es: "Análisis de datos con Python: NumPy, pandas, filtrado, agrupación, limpieza y análisis.",
      en: "Data analysis with Python: NumPy, pandas, filtering, grouping, cleaning and analysis.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [
          DATA_1,
          DATA_2,
          DATA_3,
          DATA_4,
          DATA_5,
          DATA_6,
          DATA_7,
          DATA_8,
        ],
      },
    ],
  },
  {
    id: "matplotlib-python",
    category: "data",
    tech: "Matplotlib",
    icon: "📈",
    accent: "cyan",
    status: "available",
    name: {
      es: "Visualización con Matplotlib",
      en: "Visualization with Matplotlib",
    },
    blurb: {
      es: "Visualización de datos con Python: figuras y ejes, líneas, barras, estilo y anotaciones con Matplotlib.",
      en: "Data visualization with Python: figures and axes, lines, bars, styling and annotations with Matplotlib.",
    },
    books: [
      {
        book: BOOK_FELLOWSHIP,
        chapters: [MPL_1, MPL_2, MPL_3, MPL_4, MPL_5, MPL_6, MPL_7, MPL_8],
      },
    ],
  },
];

export const DEFAULT_ADVENTURE = "php";

export function getAdventure(id: string): Adventure | undefined {
  return ADVENTURES.find((a) => a.id === id);
}

/** Aventura que contiene un capítulo con ese número (para migrar progreso). */
export function adventureOfChapter(chapterNum: number): Adventure | undefined {
  return ADVENTURES.find((a) =>
    allChapters(a).some((c) => c.chapter === chapterNum),
  );
}
