import type { PooChallenge } from "@/lib/game/types";

/**
 * Variantes por lenguaje de los retos de «Patrones de Diseño». Sólo cambian las
 * partes ejecutables (support_code, starter_code, blocks, test_cases); las
 * preguntas, pergaminos, instrucciones y títulos se comparten con la versión
 * TypeScript (los nombres de clases/métodos coinciden).
 */
export type ChallengeOverride = Pick<PooChallenge, "support_code" | "starter_code" | "blocks" | "test_cases">;

export const DP_PHP_1: Record<string, ChallengeOverride> = {
    sendero_comarca: {
      support_code: "interface Arma { public function danio(): int; }\nclass Espada implements Arma { public function danio(): int { return 10; } }\nclass Hacha implements Arma { public function danio(): int { return 15; } }",
      starter_code: "function crearArma(string $tipo): Arma {\n}\n",
      blocks: [
        "function crearArma(string $tipo): Arma {",
        "    if ($tipo === 'espada') return new Espada();",
        "    return new Hacha();",
        "}",
        "    return new Arma();",
      ],
      test_cases: [
        { input: "crearArma('espada')->danio()", expected: 10, raw: true },
        { input: "crearArma('hacha')->danio()", expected: 15, raw: true },
      ],
    },
    halito_negro: {
      support_code: "interface Arma { public function danio(): int; }\nclass Espada implements Arma { public function danio(): int { return 10; } }\nclass Hacha implements Arma { public function danio(): int { return 15; } }",
      starter_code: "function crearArma(string $tipo): Arma {\n}\n",
      blocks: [
        "function crearArma(string $tipo): Arma {",
        "    if ($tipo === 'espada') return new Espada();",
        "    if ($tipo === 'hacha') return new Hacha();",
        "    throw new Exception('arma desconocida');",
        "}",
        "    return new Espada();",
      ],
      test_cases: [
        { input: "crearArma('hacha')->danio()", expected: 15, raw: true },
        { input: "(function() { try { crearArma('daga'); return false; } catch (Exception $e) { return true; } })()", expected: true, raw: true },
      ],
    },
    c1_jefe_nazgul: {
      support_code: "interface Arma { public function danio(): int; }\nclass Espada implements Arma { public function danio(): int { return 10; } }\nclass Hacha implements Arma { public function danio(): int { return 15; } }\nfunction crearArma(string $tipo): Arma { if ($tipo === 'espada') return new Espada(); return new Hacha(); }",
      starter_code: "function poderTotal(array $tipos): int {\n}\n",
      blocks: [
        "function poderTotal(array $tipos): int {",
        "    return array_sum(array_map(fn($t) => crearArma($t)->danio(), $tipos));",
        "}",
        "    return array_sum($tipos);",
      ],
      test_cases: [
        { input: "poderTotal(['espada','hacha','espada'])", expected: 35, raw: true },
        { input: "poderTotal([])", expected: 0, raw: true },
      ],
    },
};

export const DP_PHP_2: Record<string, ChallengeOverride> = {
    viejo_hombre_sauce: {
      support_code: "",
      starter_code: "function atacar(int $base, callable $estrategia): int {\n}\n",
      blocks: [
        "function atacar(int $base, callable $estrategia): int {",
        "    return $estrategia($base);",
        "}",
        "    return $base;",
      ],
      test_cases: [
        { input: "atacar(10, fn($b) => $b * 2)", expected: 20, raw: true },
        { input: "atacar(5, fn($b) => $b + 3)", expected: 8, raw: true },
      ],
    },
    tumulo_espectro: {
      support_code: "",
      starter_code: "$agresiva = fn($b) => $b * 2;\n}\n",
      blocks: [
        "$agresiva = fn($b) => $b * 2;",
        "$cauta = fn($b) => max(0, $b - 5);",
        "function usar(int $base, callable $e): int {",
        "    return $e($base);",
        "}",
        "$cauta = fn($b) => $b - 5;",
      ],
      test_cases: [
        { input: "usar(10, $agresiva)", expected: 20, raw: true },
        { input: "usar(3, $cauta)", expected: 0, raw: true },
      ],
    },
    canto_bombadil: {
      support_code: "",
      starter_code: "class Guerrero {\n}\n",
      blocks: [
        "class Guerrero {",
        "    private $estrategia;",
        "    public function __construct(callable $e) { $this->estrategia = $e; }",
        "    public function setEstrategia(callable $e): void { $this->estrategia = $e; }",
        "    public function atacar(int $base): int { return ($this->estrategia)($base); }",
        "}",
        "    public function atacar(int $base): int { return $base; }",
      ],
      test_cases: [
        { input: "(new Guerrero(fn($b) => $b * 2))->atacar(10)", expected: 20, raw: true },
        { input: "(function() { $g = new Guerrero(fn($b) => $b); $g->setEstrategia(fn($b) => $b * 3); return $g->atacar(10); })()", expected: 30, raw: true },
      ],
    },
    c2_jefe_tumulario: {
      support_code: "",
      starter_code: "class Guerrero {\n}\n",
      blocks: [
        "class Guerrero {",
        "    public function __construct(private $e) {}",
        "    public function cambiar(callable $e): void { $this->e = $e; }",
        "    public function golpear(array $bases): int {",
        "        return array_sum(array_map($this->e, $bases));",
        "    }",
        "}",
        "        return count($bases);",
      ],
      test_cases: [
        { input: "(new Guerrero(fn($b) => $b * 2))->golpear([1,2,3])", expected: 12, raw: true },
        { input: "(function() { $g = new Guerrero(fn($b) => $b); $g->cambiar(fn($b) => $b * 2); return $g->golpear([5]); })()", expected: 10, raw: true },
      ],
    },
};

export const DP_PHP_3: Record<string, ChallengeOverride> = {
    poney_pisador: {
      support_code: "",
      starter_code: "class Sujeto {\n}\n",
      blocks: [
        "class Sujeto {",
        "    private array $obs = [];",
        "    public function suscribir(callable $o): int {",
        "        $this->obs[] = $o;",
        "        return count($this->obs);",
        "    }",
        "}",
        "        return $this->obs;",
      ],
      test_cases: [
        { input: "(function() { $s = new Sujeto(); $s->suscribir(fn() => null); return $s->suscribir(fn() => null); })()", expected: 2, raw: true },
      ],
    },
    hojas_de_tumulo: {
      support_code: "",
      starter_code: "class Sujeto {\n}\n",
      blocks: [
        "class Sujeto {",
        "    private array $obs = [];",
        "    public function suscribir(callable $o): void { $this->obs[] = $o; }",
        "    public function notificar(int $valor): void {",
        "        foreach ($this->obs as $o) $o($valor);",
        "    }",
        "}",
        "        $this->obs[] = $valor;",
      ],
      test_cases: [
        { input: "(function() { $total = 0; $s = new Sujeto(); $s->suscribir(function($v) use (&$total) { $total += $v; }); $s->suscribir(function($v) use (&$total) { $total += $v; }); $s->notificar(5); return $total; })()", expected: 10, raw: true },
      ],
    },
    cima_de_los_vientos: {
      support_code: "",
      starter_code: "function crearAcumulador(): array {\n}\n",
      blocks: [
        "function crearAcumulador(): array {",
        "    $suma = 0;",
        "    return [",
        "        'recibir' => function($v) use (&$suma) { $suma += $v; },",
        "        'total' => function() use (&$suma) { return $suma; },",
        "    ];",
        "}",
        "    return ['recibir' => fn($v) => $v, 'total' => fn() => 0];",
      ],
      test_cases: [
        { input: "(function() { $a = crearAcumulador(); $a['recibir'](3); $a['recibir'](4); return $a['total'](); })()", expected: 7, raw: true },
      ],
    },
    c3_jefe_reybrujo: {
      support_code: "",
      starter_code: "class Sujeto {\n}\n",
      blocks: [
        "class Sujeto {",
        "    private array $obs = [];",
        "    public function suscribir(callable $o): void { $this->obs[] = $o; }",
        "    public function notificar(int $valor): void {",
        "        foreach ($this->obs as $o) $o($valor);",
        "    }",
        "}",
        "        $this->obs[0]($valor);",
      ],
      test_cases: [
        { input: "(function() { $a = 0; $b = 0; $s = new Sujeto(); $s->suscribir(function($v) use (&$a) { $a += $v; }); $s->suscribir(function($v) use (&$b) { $b += $v * 2; }); $s->notificar(10); return [$a, $b]; })()", expected: [10, 20], raw: true },
      ],
    },
};

export const DP_PHP_4: Record<string, ChallengeOverride> = {
    montura_asfaloth: {
      support_code: "",
      starter_code: "class Registro {\n}\n",
      blocks: [
        "class Registro {",
        "    private static $inst;",
        "    public static function instancia(): Registro {",
        "        if (!self::$inst) self::$inst = new Registro();",
        "        return self::$inst;",
        "    }",
        "}",
        "        return new Registro();",
      ],
      test_cases: [
        { input: "Registro::instancia() === Registro::instancia()", expected: true, raw: true },
      ],
    },
    recuento_de_los_nueve: {
      support_code: "",
      starter_code: "class Contador {\n}\n",
      blocks: [
        "class Contador {",
        "    private static $inst;",
        "    private int $n = 0;",
        "    public static function instancia(): Contador {",
        "        if (!self::$inst) self::$inst = new Contador();",
        "        return self::$inst;",
        "    }",
        "    public function sumar(): int { $this->n++; return $this->n; }",
        "}",
        "    public function sumar(): int { return 1; }",
      ],
      test_cases: [
        { input: "(function() { Contador::instancia()->sumar(); Contador::instancia()->sumar(); return Contador::instancia()->sumar(); })()", expected: 3, raw: true },
      ],
    },
    vado_de_bruinen: {
      support_code: "",
      starter_code: "class Config {\n}\n",
      blocks: [
        "class Config {",
        "    private static $inst = null;",
        "    public int $valor = 42;",
        "    private function __construct() {}",
        "    public static function instancia(): Config {",
        "        if (self::$inst === null) self::$inst = new Config();",
        "        return self::$inst;",
        "    }",
        "}",
        "    public function __construct() {}",
      ],
      test_cases: [
        { input: "Config::instancia()->valor", expected: 42, raw: true },
        { input: "Config::instancia() === Config::instancia()", expected: true, raw: true },
      ],
    },
    c4_runas_del_vado: {
      support_code: "",
      starter_code: "class Estado {\n}\n",
      blocks: [
        "class Estado {",
        "    private static $inst;",
        "    private int $v = 0;",
        "    public static function instancia(): Estado {",
        "        if (!self::$inst) self::$inst = new Estado();",
        "        return self::$inst;",
        "    }",
        "    public function set(int $x): void { $this->v = $x; }",
        "    public function get(): int { return $this->v; }",
        "}",
        "    public function get(): int { return 0; }",
      ],
      test_cases: [
        { input: "(function() { Estado::instancia()->set(7); return Estado::instancia()->get(); })()", expected: 7, raw: true },
      ],
    },
    c4_jefe_nueve: {
      support_code: "",
      starter_code: "class Banco {\n}\n",
      blocks: [
        "class Banco {",
        "    private static $inst;",
        "    private int $total = 0;",
        "    public static function instancia(): Banco {",
        "        if (!self::$inst) self::$inst = new Banco();",
        "        return self::$inst;",
        "    }",
        "    public function depositar(int $n): void { $this->total += $n; }",
        "    public function saldo(): int { return $this->total; }",
        "}",
        "        return new Banco();",
      ],
      test_cases: [
        { input: "(function() { Banco::instancia()->depositar(10); Banco::instancia()->depositar(5); return Banco::instancia()->saldo(); })()", expected: 15, raw: true },
      ],
    },
};

export const DP_PHP_5: Record<string, ChallengeOverride> = {
    carga_de_bill: {
      support_code: "interface Componente { public function costo(): int; }",
      starter_code: "class Base implements Componente {\n}\n",
      blocks: [
        "class Base implements Componente {",
        "    public function costo(): int {",
        "        return 10;",
        "    }",
        "}",
        "    public function costo(): string { return '10'; }",
      ],
      test_cases: [
        { input: "(new Base())->costo()", expected: 10, raw: true },
      ],
    },
    resistencia_comunidad: {
      support_code: "interface Componente { public function costo(): int; }\nclass Base implements Componente { public function costo(): int { return 10; } }",
      starter_code: "class ConEscudo implements Componente {\n}\n",
      blocks: [
        "class ConEscudo implements Componente {",
        "    public function __construct(private Componente $c) {}",
        "    public function costo(): int {",
        "        return $this->c->costo() + 5;",
        "    }",
        "}",
        "        return 5;",
      ],
      test_cases: [
        { input: "(new ConEscudo(new Base()))->costo()", expected: 15, raw: true },
      ],
    },
    temperatura_montana: {
      support_code: "interface Componente { public function costo(): int; }\nclass Base implements Componente { public function costo(): int { return 10; } }\nclass ConEscudo implements Componente { public function __construct(private Componente $c) {} public function costo(): int { return $this->c->costo() + 5; } }",
      starter_code: "class ConFilo implements Componente {\n}\n",
      blocks: [
        "class ConFilo implements Componente {",
        "    public function __construct(private Componente $c) {}",
        "    public function costo(): int {",
        "        return $this->c->costo() + 3;",
        "    }",
        "}",
        "        return $this->c->costo();",
      ],
      test_cases: [
        { input: "(new ConFilo(new ConEscudo(new Base())))->costo()", expected: 18, raw: true },
      ],
    },
    c5_jefe_caradhras: {
      support_code: "interface Componente { public function costo(): int; }\nclass Base implements Componente { public function costo(): int { return 10; } }",
      starter_code: "class Doblado implements Componente {\n}\n",
      blocks: [
        "class Doblado implements Componente {",
        "    public function __construct(private Componente $c) {}",
        "    public function costo(): int {",
        "        return $this->c->costo() * 2;",
        "    }",
        "}",
        "        return 2;",
      ],
      test_cases: [
        { input: "(new Doblado(new Base()))->costo()", expected: 20, raw: true },
        { input: "(new Doblado(new Doblado(new Base())))->costo()", expected: 40, raw: true },
      ],
    },
};

export const DP_PHP_6: Record<string, ChallengeOverride> = {
    puertas_de_durin: {
      support_code: "interface Nuevo { public function poder(): int; }\nclass Viejo { public function valorViejo(): int { return 42; } }",
      starter_code: "class Adaptador implements Nuevo {\n}\n",
      blocks: [
        "class Adaptador implements Nuevo {",
        "    public function __construct(private Viejo $v) {}",
        "    public function poder(): int {",
        "        return $this->v->valorViejo();",
        "    }",
        "}",
        "        return $this->v->poder();",
      ],
      test_cases: [
        { input: "(new Adaptador(new Viejo()))->poder()", expected: 42, raw: true },
      ],
    },
    camara_mazarbul: {
      support_code: "class Celsius { public function grados(): int { return 100; } }",
      starter_code: "class AFahrenheit {\n}\n",
      blocks: [
        "class AFahrenheit {",
        "    public function __construct(private Celsius $c) {}",
        "    public function fahrenheit(): int {",
        "        return (int)($this->c->grados() * 9 / 5 + 32);",
        "    }",
        "}",
        "        return $this->c->grados();",
      ],
      test_cases: [
        { input: "(new AFahrenheit(new Celsius()))->fahrenheit()", expected: 212, raw: true },
      ],
    },
    puente_khazad_dum: {
      support_code: "class Metros { public function valor(): int { return 3; } }",
      starter_code: "class AKm {\n}\n",
      blocks: [
        "class AKm {",
        "    public function __construct(private Metros $m) {}",
        "    public function km(): float {",
        "        return $this->m->valor() / 1000;",
        "    }",
        "}",
        "        return $this->m->valor() * 1000;",
      ],
      test_cases: [
        { input: "(new AKm(new Metros()))->km()", expected: 0.003, raw: true },
      ],
    },
    c6_galeria_de_mazarbul: {
      support_code: "class Motor { public function fuerza(int $x): int { return $x * 10; } }",
      starter_code: "class Adaptado {\n}\n",
      blocks: [
        "class Adaptado {",
        "    public function __construct(private Motor $m) {}",
        "    public function empujar(int $x): int {",
        "        return $this->m->fuerza($x);",
        "    }",
        "}",
        "        return $this->m->empujar($x);",
      ],
      test_cases: [
        { input: "(new Adaptado(new Motor()))->empujar(5)", expected: 50, raw: true },
      ],
    },
    c6_jefe_balrog: {
      support_code: "interface Objetivo { public function golpear(): int; }\nclass Legado { public function ataque(): int { return 100; } }",
      starter_code: "class AdaptadorBalrog implements Objetivo {\n}\n",
      blocks: [
        "class AdaptadorBalrog implements Objetivo {",
        "    public function __construct(private Legado $l) {}",
        "    public function golpear(): int {",
        "        return $this->l->ataque();",
        "    }",
        "}",
        "        return $this->l->golpear();",
      ],
      test_cases: [
        { input: "(new AdaptadorBalrog(new Legado()))->golpear()", expected: 100, raw: true },
      ],
    },
};

export const DP_PHP_7: Record<string, ChallengeOverride> = {
    frasco_de_galadriel: {
      support_code: "interface Comando { public function ejecutar(): int; }",
      starter_code: "class Encender implements Comando {\n}\n",
      blocks: [
        "class Encender implements Comando {",
        "    public function ejecutar(): int {",
        "        return 1;",
        "    }",
        "}",
        "        return 0;",
      ],
      test_cases: [
        { input: "(new Encender())->ejecutar()", expected: 1, raw: true },
      ],
    },
    capas_elficas: {
      support_code: "interface Comando { public function ejecutar(): int; }\nclass Encender implements Comando { public function ejecutar(): int { return 1; } }",
      starter_code: "class Invocador {\n}\n",
      blocks: [
        "class Invocador {",
        "    public function __construct(private Comando $c) {}",
        "    public function correr(): int {",
        "        return $this->c->ejecutar();",
        "    }",
        "}",
        "        return 1;",
      ],
      test_cases: [
        { input: "(new Invocador(new Encender()))->correr()", expected: 1, raw: true },
      ],
    },
    dones_de_lorien: {
      support_code: "interface Comando { public function ejecutar(): int; }",
      starter_code: "class Sumar implements Comando {\n}\n",
      blocks: [
        "class Sumar implements Comando {",
        "    public function __construct(private int $n) {}",
        "    public function ejecutar(): int {",
        "        return $this->n + 1;",
        "    }",
        "}",
        "        return $this->n;",
      ],
      test_cases: [
        { input: "(new Sumar(10))->ejecutar()", expected: 11, raw: true },
      ],
    },
    c7_jefe_ugluk: {
      support_code: "interface Comando { public function ejecutar(): int; }\nclass Valor implements Comando { public function __construct(private int $n) {} public function ejecutar(): int { return $this->n; } }",
      starter_code: "class Cola {\n}\n",
      blocks: [
        "class Cola {",
        "    private array $cmds = [];",
        "    public function agregar(Comando $c): void { $this->cmds[] = $c; }",
        "    public function ejecutarTodo(): int {",
        "        return array_sum(array_map(fn($c) => $c->ejecutar(), $this->cmds));",
        "    }",
        "}",
        "        return count($this->cmds);",
      ],
      test_cases: [
        { input: "(function() { $q = new Cola(); $q->agregar(new Valor(3)); $q->agregar(new Valor(4)); return $q->ejecutarTodo(); })()", expected: 7, raw: true },
      ],
    },
};

export const DP_PHP_8: Record<string, ChallengeOverride> = {
    tentacion_de_boromir: {
      support_code: "interface Nodo { public function total(): int; }",
      starter_code: "class Hoja implements Nodo {\n}\n",
      blocks: [
        "class Hoja implements Nodo {",
        "    public function __construct(private int $v) {}",
        "    public function total(): int {",
        "        return $this->v;",
        "    }",
        "}",
        "        return 0;",
      ],
      test_cases: [
        { input: "(new Hoja(5))->total()", expected: 5, raw: true },
      ],
    },
    solio_de_la_vision: {
      support_code: "interface Nodo { public function total(): int; }\nclass Hoja implements Nodo { public function __construct(private int $v) {} public function total(): int { return $this->v; } }",
      starter_code: "class Grupo implements Nodo {\n}\n",
      blocks: [
        "class Grupo implements Nodo {",
        "    private array $hijos = [];",
        "    public function agregar(Nodo $n): void { $this->hijos[] = $n; }",
        "    public function total(): int {",
        "        return array_sum(array_map(fn($h) => $h->total(), $this->hijos));",
        "    }",
        "}",
        "        return count($this->hijos);",
      ],
      test_cases: [
        { input: "(function() { $g = new Grupo(); $g->agregar(new Hoja(3)); $g->agregar(new Hoja(4)); return $g->total(); })()", expected: 7, raw: true },
      ],
    },
    hueste_de_isengard: {
      support_code: "interface Nodo { public function total(): int; }\nclass Hoja implements Nodo { public function __construct(private int $v) {} public function total(): int { return $this->v; } }\nclass Grupo implements Nodo { private array $hijos = []; public function agregar(Nodo $n): void { $this->hijos[] = $n; } public function total(): int { return array_sum(array_map(fn($h) => $h->total(), $this->hijos)); } }",
      starter_code: "function ejercito(array $valores): int {\n}\n",
      blocks: [
        "function ejercito(array $valores): int {",
        "    $g = new Grupo();",
        "    foreach ($valores as $v) $g->agregar(new Hoja($v));",
        "    return $g->total();",
        "}",
        "    return count($valores);",
      ],
      test_cases: [
        { input: "ejercito([1,2,3,4])", expected: 10, raw: true },
      ],
    },
    c8_jefe_lurtz: {
      support_code: "interface Nodo { public function total(): int; }\nclass Hoja implements Nodo { public function __construct(private int $v) {} public function total(): int { return $this->v; } }",
      starter_code: "class Grupo implements Nodo {\n}\n",
      blocks: [
        "class Grupo implements Nodo {",
        "    private array $hijos = [];",
        "    public function agregar(Nodo $n): static { $this->hijos[] = $n; return $this; }",
        "    public function total(): int {",
        "        return array_sum(array_map(fn($h) => $h->total(), $this->hijos));",
        "    }",
        "}",
        "        return count($this->hijos);",
      ],
      test_cases: [
        { input: "(function() { $raiz = new Grupo(); $sub = new Grupo(); $sub->agregar(new Hoja(2))->agregar(new Hoja(3)); $raiz->agregar(new Hoja(1))->agregar($sub); return $raiz->total(); })()", expected: 6, raw: true },
      ],
    },
};

