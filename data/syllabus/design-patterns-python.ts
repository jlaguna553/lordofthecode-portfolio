import type { ChallengeOverride } from "./design-patterns-php";

/**
 * Variante Python de los retos de «Patrones de Diseño» (mismos node_id que la
 * versión TypeScript; sólo cambian las partes ejecutables). Se comparten
 * preguntas, pergaminos e instrucciones. Los nombres coinciden con la versión TS
 * para reutilizar los enunciados.
 */

export const DP_PY_1: Record<string, ChallengeOverride> = {
    sendero_comarca: {
      support_code: "class Espada:\n    def danio(self):\n        return 10\nclass Hacha:\n    def danio(self):\n        return 15",
      starter_code: "def crearArma(tipo):\n    pass\n",
      blocks: [
        "def crearArma(tipo):",
        "    if tipo == 'espada':",
        "        return Espada()",
        "    return Hacha()",
        "    return Arma()",
      ],
      test_cases: [
        { input: "crearArma('espada').danio()", expected: 10, raw: true },
        { input: "crearArma('hacha').danio()", expected: 15, raw: true },
      ],
    },
    halito_negro: {
      support_code: "class Espada:\n    def danio(self):\n        return 10\nclass Hacha:\n    def danio(self):\n        return 15\ndef _lanza(f):\n    try:\n        f()\n        return False\n    except Exception:\n        return True",
      starter_code: "def crearArma(tipo):\n    pass\n",
      blocks: [
        "def crearArma(tipo):",
        "    if tipo == 'espada':",
        "        return Espada()",
        "    if tipo == 'hacha':",
        "        return Hacha()",
        "    raise ValueError('arma desconocida')",
        "    return Espada()",
      ],
      test_cases: [
        { input: "crearArma('hacha').danio()", expected: 15, raw: true },
        { input: "_lanza(lambda: crearArma('daga'))", expected: true, raw: true },
      ],
    },
    c1_jefe_nazgul: {
      support_code: "class Espada:\n    def danio(self):\n        return 10\nclass Hacha:\n    def danio(self):\n        return 15\ndef crearArma(tipo):\n    if tipo == 'espada':\n        return Espada()\n    return Hacha()",
      starter_code: "def poderTotal(tipos):\n    pass\n",
      blocks: [
        "def poderTotal(tipos):",
        "    return sum(crearArma(t).danio() for t in tipos)",
        "    return sum(tipos)",
      ],
      test_cases: [
        { input: "poderTotal(['espada','hacha','espada'])", expected: 35, raw: true },
        { input: "poderTotal([])", expected: 0, raw: true },
      ],
    },
};

export const DP_PY_2: Record<string, ChallengeOverride> = {
    viejo_hombre_sauce: {
      support_code: "",
      starter_code: "def atacar(base, estrategia):\n    pass\n",
      blocks: [
        "def atacar(base, estrategia):",
        "    return estrategia(base)",
        "    return base",
      ],
      test_cases: [
        { input: "atacar(10, lambda b: b * 2)", expected: 20, raw: true },
        { input: "atacar(5, lambda b: b + 3)", expected: 8, raw: true },
      ],
    },
    tumulo_espectro: {
      support_code: "",
      starter_code: "agresiva = lambda b: b * 2\n    pass\n",
      blocks: [
        "agresiva = lambda b: b * 2",
        "cauta = lambda b: max(0, b - 5)",
        "def usar(base, e):",
        "    return e(base)",
        "cauta = lambda b: b - 5",
      ],
      test_cases: [
        { input: "usar(10, agresiva)", expected: 20, raw: true },
        { input: "usar(3, cauta)", expected: 0, raw: true },
      ],
    },
    canto_bombadil: {
      support_code: "",
      starter_code: "class Guerrero:\n    pass\n",
      blocks: [
        "class Guerrero:",
        "    def __init__(self, e):",
        "        self.estrategia = e",
        "    def setEstrategia(self, e):",
        "        self.estrategia = e",
        "    def atacar(self, base):",
        "        return self.estrategia(base)",
        "        return base",
      ],
      test_cases: [
        { input: "Guerrero(lambda b: b * 2).atacar(10)", expected: 20, raw: true },
        { input: "(lambda g: (g.setEstrategia(lambda b: b * 3), g.atacar(10))[1])(Guerrero(lambda b: b))", expected: 30, raw: true },
      ],
    },
    c2_jefe_tumulario: {
      support_code: "",
      starter_code: "class Guerrero:\n    pass\n",
      blocks: [
        "class Guerrero:",
        "    def __init__(self, e):",
        "        self.e = e",
        "    def cambiar(self, e):",
        "        self.e = e",
        "    def golpear(self, bases):",
        "        return sum(self.e(b) for b in bases)",
        "        return len(bases)",
      ],
      test_cases: [
        { input: "Guerrero(lambda b: b * 2).golpear([1, 2, 3])", expected: 12, raw: true },
        { input: "(lambda g: (g.cambiar(lambda b: b * 2), g.golpear([5]))[1])(Guerrero(lambda b: b))", expected: 10, raw: true },
      ],
    },
};

export const DP_PY_3: Record<string, ChallengeOverride> = {
    poney_pisador: {
      support_code: "",
      starter_code: "class Sujeto:\n    pass\n",
      blocks: [
        "class Sujeto:",
        "    def __init__(self):",
        "        self.obs = []",
        "    def suscribir(self, o):",
        "        self.obs.append(o)",
        "        return len(self.obs)",
        "        return self.obs",
      ],
      test_cases: [
        { input: "(lambda s: (s.suscribir(lambda: None), s.suscribir(lambda: None))[1])(Sujeto())", expected: 2, raw: true },
      ],
    },
    hojas_de_tumulo: {
      support_code: "",
      starter_code: "class Sujeto:\n    pass\n",
      blocks: [
        "class Sujeto:",
        "    def __init__(self):",
        "        self.obs = []",
        "    def suscribir(self, o):",
        "        self.obs.append(o)",
        "    def notificar(self, valor):",
        "        for o in self.obs:",
        "            o(valor)",
        "        self.obs.append(valor)",
      ],
      test_cases: [
        { input: "(lambda s, t: (s.suscribir(lambda v: t.append(v)), s.suscribir(lambda v: t.append(v)), s.notificar(5), sum(t))[3])(Sujeto(), [])", expected: 10, raw: true },
      ],
    },
    cima_de_los_vientos: {
      support_code: "",
      starter_code: "def crearAcumulador():\n    pass\n",
      blocks: [
        "def crearAcumulador():",
        "    estado = {'suma': 0}",
        "    def recibir(v):",
        "        estado['suma'] += v",
        "    def total():",
        "        return estado['suma']",
        "    return {'recibir': recibir, 'total': total}",
        "    return {'recibir': lambda v: v, 'total': lambda: 0}",
      ],
      test_cases: [
        { input: "(lambda a: (a['recibir'](3), a['recibir'](4), a['total']())[2])(crearAcumulador())", expected: 7, raw: true },
      ],
    },
    c3_jefe_reybrujo: {
      support_code: "",
      starter_code: "class Sujeto:\n    pass\n",
      blocks: [
        "class Sujeto:",
        "    def __init__(self):",
        "        self.obs = []",
        "    def suscribir(self, o):",
        "        self.obs.append(o)",
        "    def notificar(self, valor):",
        "        for o in self.obs:",
        "            o(valor)",
        "        self.obs[0](valor)",
      ],
      test_cases: [
        { input: "(lambda s, a, b: (s.suscribir(lambda v: a.append(v)), s.suscribir(lambda v: b.append(v * 2)), s.notificar(10), [sum(a), sum(b)])[3])(Sujeto(), [], [])", expected: [10, 20], raw: true },
      ],
    },
};

export const DP_PY_4: Record<string, ChallengeOverride> = {
    montura_asfaloth: {
      support_code: "",
      starter_code: "class Registro:\n    pass\n",
      blocks: [
        "class Registro:",
        "    _inst = None",
        "    @staticmethod",
        "    def instancia():",
        "        if Registro._inst is None:",
        "            Registro._inst = Registro()",
        "        return Registro._inst",
        "        return Registro()",
      ],
      test_cases: [
        { input: "Registro.instancia() is Registro.instancia()", expected: true, raw: true },
      ],
    },
    recuento_de_los_nueve: {
      support_code: "",
      starter_code: "class Contador:\n    pass\n",
      blocks: [
        "class Contador:",
        "    _inst = None",
        "    def __init__(self):",
        "        self.n = 0",
        "    @staticmethod",
        "    def instancia():",
        "        if Contador._inst is None:",
        "            Contador._inst = Contador()",
        "        return Contador._inst",
        "    def sumar(self):",
        "        self.n += 1",
        "        return self.n",
        "        return 1",
      ],
      test_cases: [
        { input: "(Contador.instancia().sumar(), Contador.instancia().sumar(), Contador.instancia().sumar())[2]", expected: 3, raw: true },
      ],
    },
    vado_de_bruinen: {
      support_code: "",
      starter_code: "class Config:\n    pass\n",
      blocks: [
        "class Config:",
        "    _inst = None",
        "    def __init__(self):",
        "        self.valor = 42",
        "    @staticmethod",
        "    def instancia():",
        "        if Config._inst is None:",
        "            Config._inst = Config()",
        "        return Config._inst",
        "        return Config()",
      ],
      test_cases: [
        { input: "Config.instancia().valor", expected: 42, raw: true },
        { input: "Config.instancia() is Config.instancia()", expected: true, raw: true },
      ],
    },
    c4_runas_del_vado: {
      support_code: "",
      starter_code: "class Estado:\n    pass\n",
      blocks: [
        "class Estado:",
        "    _inst = None",
        "    def __init__(self):",
        "        self.v = 0",
        "    @staticmethod",
        "    def instancia():",
        "        if Estado._inst is None:",
        "            Estado._inst = Estado()",
        "        return Estado._inst",
        "    def set(self, x):",
        "        self.v = x",
        "    def get(self):",
        "        return self.v",
        "        return 0",
      ],
      test_cases: [
        { input: "(Estado.instancia().set(7), Estado.instancia().get())[1]", expected: 7, raw: true },
      ],
    },
    c4_jefe_nueve: {
      support_code: "",
      starter_code: "class Banco:\n    pass\n",
      blocks: [
        "class Banco:",
        "    _inst = None",
        "    def __init__(self):",
        "        self.total = 0",
        "    @staticmethod",
        "    def instancia():",
        "        if Banco._inst is None:",
        "            Banco._inst = Banco()",
        "        return Banco._inst",
        "    def depositar(self, n):",
        "        self.total += n",
        "    def saldo(self):",
        "        return self.total",
        "        return Banco()",
      ],
      test_cases: [
        { input: "(Banco.instancia().depositar(10), Banco.instancia().depositar(5), Banco.instancia().saldo())[2]", expected: 15, raw: true },
      ],
    },
};

export const DP_PY_5: Record<string, ChallengeOverride> = {
    carga_de_bill: {
      support_code: "",
      starter_code: "class Base:\n    pass\n",
      blocks: [
        "class Base:",
        "    def costo(self):",
        "        return 10",
        "        return '10'",
      ],
      test_cases: [
        { input: "Base().costo()", expected: 10, raw: true },
      ],
    },
    resistencia_comunidad: {
      support_code: "class Base:\n    def costo(self):\n        return 10",
      starter_code: "class ConEscudo:\n    pass\n",
      blocks: [
        "class ConEscudo:",
        "    def __init__(self, c):",
        "        self.c = c",
        "    def costo(self):",
        "        return self.c.costo() + 5",
        "        return 5",
      ],
      test_cases: [
        { input: "ConEscudo(Base()).costo()", expected: 15, raw: true },
      ],
    },
    temperatura_montana: {
      support_code: "class Base:\n    def costo(self):\n        return 10\nclass ConEscudo:\n    def __init__(self, c):\n        self.c = c\n    def costo(self):\n        return self.c.costo() + 5",
      starter_code: "class ConFilo:\n    pass\n",
      blocks: [
        "class ConFilo:",
        "    def __init__(self, c):",
        "        self.c = c",
        "    def costo(self):",
        "        return self.c.costo() + 3",
        "        return self.c.costo()",
      ],
      test_cases: [
        { input: "ConFilo(ConEscudo(Base())).costo()", expected: 18, raw: true },
      ],
    },
    c5_jefe_caradhras: {
      support_code: "class Base:\n    def costo(self):\n        return 10",
      starter_code: "class Doblado:\n    pass\n",
      blocks: [
        "class Doblado:",
        "    def __init__(self, c):",
        "        self.c = c",
        "    def costo(self):",
        "        return self.c.costo() * 2",
        "        return 2",
      ],
      test_cases: [
        { input: "Doblado(Base()).costo()", expected: 20, raw: true },
        { input: "Doblado(Doblado(Base())).costo()", expected: 40, raw: true },
      ],
    },
};

export const DP_PY_6: Record<string, ChallengeOverride> = {
    puertas_de_durin: {
      support_code: "class Viejo:\n    def valorViejo(self):\n        return 42",
      starter_code: "class Adaptador:\n    pass\n",
      blocks: [
        "class Adaptador:",
        "    def __init__(self, v):",
        "        self.v = v",
        "    def poder(self):",
        "        return self.v.valorViejo()",
        "        return self.v.poder()",
      ],
      test_cases: [
        { input: "Adaptador(Viejo()).poder()", expected: 42, raw: true },
      ],
    },
    camara_mazarbul: {
      support_code: "class Celsius:\n    def grados(self):\n        return 100",
      starter_code: "class AFahrenheit:\n    pass\n",
      blocks: [
        "class AFahrenheit:",
        "    def __init__(self, c):",
        "        self.c = c",
        "    def fahrenheit(self):",
        "        return int(self.c.grados() * 9 / 5 + 32)",
        "        return self.c.grados()",
      ],
      test_cases: [
        { input: "AFahrenheit(Celsius()).fahrenheit()", expected: 212, raw: true },
      ],
    },
    puente_khazad_dum: {
      support_code: "class Metros:\n    def valor(self):\n        return 3",
      starter_code: "class AKm:\n    pass\n",
      blocks: [
        "class AKm:",
        "    def __init__(self, m):",
        "        self.m = m",
        "    def km(self):",
        "        return self.m.valor() / 1000",
        "        return self.m.valor() * 1000",
      ],
      test_cases: [
        { input: "AKm(Metros()).km()", expected: 0.003, raw: true },
      ],
    },
    c6_galeria_de_mazarbul: {
      support_code: "class Motor:\n    def fuerza(self, x):\n        return x * 10",
      starter_code: "class Adaptado:\n    pass\n",
      blocks: [
        "class Adaptado:",
        "    def __init__(self, m):",
        "        self.m = m",
        "    def empujar(self, x):",
        "        return self.m.fuerza(x)",
        "        return self.m.empujar(x)",
      ],
      test_cases: [
        { input: "Adaptado(Motor()).empujar(5)", expected: 50, raw: true },
      ],
    },
    c6_jefe_balrog: {
      support_code: "class Legado:\n    def ataque(self):\n        return 100",
      starter_code: "class AdaptadorBalrog:\n    pass\n",
      blocks: [
        "class AdaptadorBalrog:",
        "    def __init__(self, l):",
        "        self.l = l",
        "    def golpear(self):",
        "        return self.l.ataque()",
        "        return self.l.golpear()",
      ],
      test_cases: [
        { input: "AdaptadorBalrog(Legado()).golpear()", expected: 100, raw: true },
      ],
    },
};

export const DP_PY_7: Record<string, ChallengeOverride> = {
    frasco_de_galadriel: {
      support_code: "",
      starter_code: "class Encender:\n    pass\n",
      blocks: [
        "class Encender:",
        "    def ejecutar(self):",
        "        return 1",
        "        return 0",
      ],
      test_cases: [
        { input: "Encender().ejecutar()", expected: 1, raw: true },
      ],
    },
    capas_elficas: {
      support_code: "class Encender:\n    def ejecutar(self):\n        return 1",
      starter_code: "class Invocador:\n    pass\n",
      blocks: [
        "class Invocador:",
        "    def __init__(self, c):",
        "        self.c = c",
        "    def correr(self):",
        "        return self.c.ejecutar()",
        "        return 1",
      ],
      test_cases: [
        { input: "Invocador(Encender()).correr()", expected: 1, raw: true },
      ],
    },
    dones_de_lorien: {
      support_code: "",
      starter_code: "class Sumar:\n    pass\n",
      blocks: [
        "class Sumar:",
        "    def __init__(self, n):",
        "        self.n = n",
        "    def ejecutar(self):",
        "        return self.n + 1",
        "        return self.n",
      ],
      test_cases: [
        { input: "Sumar(10).ejecutar()", expected: 11, raw: true },
      ],
    },
    c7_jefe_ugluk: {
      support_code: "class Valor:\n    def __init__(self, n):\n        self.n = n\n    def ejecutar(self):\n        return self.n",
      starter_code: "class Cola:\n    pass\n",
      blocks: [
        "class Cola:",
        "    def __init__(self):",
        "        self.cmds = []",
        "    def agregar(self, c):",
        "        self.cmds.append(c)",
        "    def ejecutarTodo(self):",
        "        return sum(c.ejecutar() for c in self.cmds)",
        "        return len(self.cmds)",
      ],
      test_cases: [
        { input: "(lambda q: (q.agregar(Valor(3)), q.agregar(Valor(4)), q.ejecutarTodo())[2])(Cola())", expected: 7, raw: true },
      ],
    },
};

export const DP_PY_8: Record<string, ChallengeOverride> = {
    tentacion_de_boromir: {
      support_code: "",
      starter_code: "class Hoja:\n    pass\n",
      blocks: [
        "class Hoja:",
        "    def __init__(self, v):",
        "        self.v = v",
        "    def total(self):",
        "        return self.v",
        "        return 0",
      ],
      test_cases: [
        { input: "Hoja(5).total()", expected: 5, raw: true },
      ],
    },
    solio_de_la_vision: {
      support_code: "class Hoja:\n    def __init__(self, v):\n        self.v = v\n    def total(self):\n        return self.v",
      starter_code: "class Grupo:\n    pass\n",
      blocks: [
        "class Grupo:",
        "    def __init__(self):",
        "        self.hijos = []",
        "    def agregar(self, n):",
        "        self.hijos.append(n)",
        "    def total(self):",
        "        return sum(h.total() for h in self.hijos)",
        "        return len(self.hijos)",
      ],
      test_cases: [
        { input: "(lambda g: (g.agregar(Hoja(3)), g.agregar(Hoja(4)), g.total())[2])(Grupo())", expected: 7, raw: true },
      ],
    },
    hueste_de_isengard: {
      support_code: "class Hoja:\n    def __init__(self, v):\n        self.v = v\n    def total(self):\n        return self.v\nclass Grupo:\n    def __init__(self):\n        self.hijos = []\n    def agregar(self, n):\n        self.hijos.append(n)\n    def total(self):\n        return sum(h.total() for h in self.hijos)",
      starter_code: "def ejercito(valores):\n    pass\n",
      blocks: [
        "def ejercito(valores):",
        "    g = Grupo()",
        "    for v in valores:",
        "        g.agregar(Hoja(v))",
        "    return g.total()",
        "    return len(valores)",
      ],
      test_cases: [
        { input: "ejercito([1, 2, 3, 4])", expected: 10, raw: true },
      ],
    },
    c8_jefe_lurtz: {
      support_code: "class Hoja:\n    def __init__(self, v):\n        self.v = v\n    def total(self):\n        return self.v",
      starter_code: "class Grupo:\n    pass\n",
      blocks: [
        "class Grupo:",
        "    def __init__(self):",
        "        self.hijos = []",
        "    def agregar(self, n):",
        "        self.hijos.append(n)",
        "        return self",
        "    def total(self):",
        "        return sum(h.total() for h in self.hijos)",
        "        return len(self.hijos)",
      ],
      test_cases: [
        { input: "(lambda raiz, sub: (sub.agregar(Hoja(2)).agregar(Hoja(3)), raiz.agregar(Hoja(1)).agregar(sub), raiz.total())[2])(Grupo(), Grupo())", expected: 6, raw: true },
      ],
    },
};

