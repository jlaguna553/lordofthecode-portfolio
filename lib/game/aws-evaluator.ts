import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de AWS. No hay nube real: el jugador escribe (a) documentos de
 * política IAM como objetos JS y (b) código JS contra un SDK de AWS SIMULADO en
 * memoria (S3, DynamoDB, SQS, SNS). El entorno se recrea limpio en cada ejecución.
 *
 * En los retos el jugador dispone de:
 * - `s3`  · putObject/getObject/deleteObject/listObjectsV2/createBucket (async)
 * - `ddb` · put/get/delete/scan (DocumentClient; clave de partición `id`)
 * - `sqs` · sendMessage/receiveMessage   · `sns` · publish
 * - `simular(politica, { action, resource })` → "Allow" | "Deny" (motor IAM real:
 *   deny explícito gana, si no un Allow que case, si no denegación por defecto;
 *   comodines `*` en Action y Resource).
 *
 * Y en los tests, además, helpers de inspección: `verObjeto`, `verClaves`,
 * `verItem`, `verItems`, `verCola`, `verTopico`.
 *
 * Todo es JS puro: funciona en el navegador y en Node (para validar).
 */

// Prelude inyectado antes del support_code y del código del jugador. Define el
// entorno simulado y los clientes. Exportado para reutilizarlo tal cual al validar.
export const AWS_PRELUDE = `
const __env = { buckets: {}, tables: {}, queues: {}, topics: {}, tableKeys: {} };
// Cada test corre contra un entorno LIMPIO (se resiembra el support antes de cada uno),
// para que los casos sean independientes aunque muten estado.
function __reset() { __env.buckets = {}; __env.tables = {}; __env.queues = {}; __env.topics = {}; __env.tableKeys = {}; }
const __clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

function __bucket(b) { if (!__env.buckets[b]) __env.buckets[b] = {}; return __env.buckets[b]; }
const s3 = {
  async createBucket({ Bucket }) { __bucket(Bucket); return {}; },
  async putObject({ Bucket, Key, Body }) { __bucket(Bucket)[Key] = Body; return {}; },
  async getObject({ Bucket, Key }) {
    const o = __env.buckets[Bucket];
    if (!o || !(Key in o)) { const e = new Error('NoSuchKey: ' + Key); e.code = 'NoSuchKey'; throw e; }
    return { Body: o[Key] };
  },
  async deleteObject({ Bucket, Key }) { const o = __env.buckets[Bucket]; if (o) delete o[Key]; return {}; },
  async listObjectsV2({ Bucket, Prefix }) {
    const o = __env.buckets[Bucket] || {};
    let keys = Object.keys(o);
    if (Prefix) keys = keys.filter((k) => k.startsWith(Prefix));
    keys.sort();
    return { Contents: keys.map((Key) => ({ Key })), KeyCount: keys.length };
  },
};
s3.listObjects = s3.listObjectsV2;

function __table(t) { if (!__env.tables[t]) __env.tables[t] = []; return __env.tables[t]; }
const __pk = (t) => __env.tableKeys[t] || 'id';
const ddb = {
  async put({ TableName, Item }) {
    const t = __table(TableName), k = __pk(TableName);
    const i = t.findIndex((x) => x[k] === Item[k]);
    if (i >= 0) t[i] = __clone(Item); else t.push(__clone(Item));
    return {};
  },
  async get({ TableName, Key }) {
    const t = __table(TableName), k = __pk(TableName);
    const it = t.find((x) => x[k] === Key[k]);
    return { Item: it ? __clone(it) : undefined };
  },
  async delete({ TableName, Key }) {
    const t = __table(TableName), k = __pk(TableName);
    const i = t.findIndex((x) => x[k] === Key[k]);
    if (i >= 0) t.splice(i, 1);
    return {};
  },
  async scan({ TableName }) { return { Items: __table(TableName).map(__clone) }; },
};

function __queue(q) { if (!__env.queues[q]) __env.queues[q] = []; return __env.queues[q]; }
const sqs = {
  async sendMessage({ QueueUrl, MessageBody }) { const q = __queue(QueueUrl); q.push(MessageBody); return { MessageId: 'm' + q.length }; },
  async receiveMessage({ QueueUrl }) { const q = __queue(QueueUrl); const b = q.shift(); return { Messages: b === undefined ? [] : [{ Body: b }] }; },
};

function __topic(t) { if (!__env.topics[t]) __env.topics[t] = []; return __env.topics[t]; }
const sns = {
  async publish({ TopicArn, Message }) { const t = __topic(TopicArn); t.push(Message); return { MessageId: 'n' + t.length }; },
};

function __wild(pattern, value) {
  const rx = new RegExp('^' + String(pattern).split('*').map((s) => s.replace(/[.+?^\${}()|[\\]\\\\]/g, '\\\\$&')).join('.*') + '$');
  return rx.test(String(value));
}
const __arr = (x) => (Array.isArray(x) ? x : x == null ? [] : [x]);
function __stmtMatches(stmt, action, resource) {
  const a = __arr(stmt.Action).some((x) => __wild(x, action));
  const r = __arr(stmt.Resource).some((x) => __wild(x, resource));
  return a && r;
}
function simular(politicaOPoliticas, req) {
  const stmts = __arr(politicaOPoliticas).flatMap((p) => __arr(p && p.Statement));
  let allow = false;
  for (const s of stmts) {
    if (!s || !__stmtMatches(s, req.action, req.resource)) continue;
    if (s.Effect === 'Deny') return 'Deny';
    if (s.Effect === 'Allow') allow = true;
  }
  return allow ? 'Allow' : 'Deny';
}

// Helpers de inspección para los tests.
const verObjeto = async (b, k) => { try { return (await s3.getObject({ Bucket: b, Key: k })).Body; } catch { return null; } };
const verClaves = async (b) => (await s3.listObjectsV2({ Bucket: b })).Contents.map((c) => c.Key);
const verItem = async (t, id) => (await ddb.get({ TableName: t, Key: { id } })).Item ?? null;
const verItems = async (t) => (await ddb.scan({ TableName: t })).Items;
const verCola = (q) => [...(__env.queues[q] || [])];
const verTopico = (t) => [...(__env.topics[t] || [])];
`;

export function awsSupported(): boolean {
  return true;
}
export function warmupAws(): void {
  /* no requiere runtime externo */
}

function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Serialización estable (claves ordenadas) para comparar sin depender del orden. */
function stableStringify(v: unknown): string {
  if (v === undefined) return "null";
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v as Record<string, unknown>).sort();
  return (
    "{" +
    keys
      .map((k) => JSON.stringify(k) + ":" + stableStringify((v as Record<string, unknown>)[k]))
      .join(",") +
    "}"
  );
}

interface RawResult {
  ok: boolean;
  value?: unknown;
  error?: string;
}
interface HarnessOut {
  results: RawResult[];
}

function buildBody(playerCode: string, c: PooChallenge): string {
  const lines: string[] = [
    AWS_PRELUDE,
    "async function __seed() {\n" + (c.support_code ?? "") + "\n}",
    "const __out = { results: [] };",
    stripFences(playerCode),
  ];
  c.test_cases.forEach((t, i) => {
    lines.push(
      `__reset(); await __seed();\n` +
        `try { __out.results[${i}] = { ok: true, value: await (${t.input}) }; }` +
        ` catch (e) { __out.results[${i}] = { ok: false, error: String((e && e.message) || e) }; }`,
    );
  });
  lines.push("return __out;");
  return lines.join("\n");
}

function parseOutput(out: HarnessOut, challenge: PooChallenge): EvalResult {
  const results: TestResult[] = challenge.test_cases.map((t, i) => {
    const r = out.results[i];
    const expected = stableStringify(t.expected);
    const got = !r
      ? "<sin salida>"
      : r.ok
        ? stableStringify(r.value)
        : "⚠ " + r.error;
    return {
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: Boolean(r) && r.ok === true && stableStringify(r.value) === expected,
    };
  });
  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results };
}

const AsyncFunction = Object.getPrototypeOf(async function () {})
  .constructor as new (...args: string[]) => (...a: unknown[]) => Promise<unknown>;

/** Ejecuta el código del jugador (política IAM y/o SDK simulado) contra los tests. */
export async function runAwsChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  try {
    const fn = new AsyncFunction(buildBody(playerCode, challenge));
    const out = (await fn()) as HarnessOut;
    return parseOutput(out, challenge);
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }
}
