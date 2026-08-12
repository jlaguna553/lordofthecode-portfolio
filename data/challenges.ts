import type { PooChallenge } from "@/lib/lpc/export";

/**
 * Catálogo de acertijos de POO en PHP para el Episodio 1 (Moria).
 * Cada arquetipo de la Comunidad o de la Sombra se vincula a un concepto de POO.
 */
export interface ChallengeEntry extends PooChallenge {
  id: string;
  title: string;
}

export const CHALLENGES: ChallengeEntry[] = [
  // ---------- La Comunidad ----------
  {
    id: "aragorn_herencia",
    title: "Aragorn — Herencia",
    topic: "Herencia",
    prompt:
      "Aragorn es heredero de Isildur. Crea la clase Montaraz que herede de Humano y añada el método reclamarTrono(): string.",
    code_template:
      "<?php\n\nclass Humano {\n    public function __construct(protected string $nombre) {}\n}\n\nclass Montaraz extends Humano {\n    // Añade reclamarTrono()\n}\n",
  },
  {
    id: "gandalf_abstract",
    title: "Gandalf — Clases Abstractas",
    topic: "Clases Abstractas",
    prompt:
      "Define la clase abstracta Mago con el método abstracto lanzarHechizo(): string y haz que GandalfElGris la implemente ('¡No puedes pasar!').",
    code_template:
      "<?php\n\nabstract class Mago {\n    abstract public function lanzarHechizo(): string;\n}\n\nclass GandalfElGris extends Mago {\n    // Implementa lanzarHechizo()\n}\n",
  },
  {
    id: "frodo_encapsulamiento",
    title: "Frodo — Encapsulamiento",
    topic: "Encapsulamiento",
    prompt:
      "Frodo guarda el Anillo Único. En la clase Frodo protege la propiedad $anillo (private) y expón ocultarAnillo() y mostrarAnillo(): bool.",
    code_template:
      "<?php\n\nclass Frodo {\n    private bool $anillo = true;\n    private bool $oculto = false;\n\n    // Añade ocultarAnillo() y mostrarAnillo()\n}\n",
  },
  {
    id: "sam_composicion",
    title: "Sam — Composición",
    topic: "Composición",
    prompt:
      "Sam nunca abandona a Frodo. Modela la clase Sam que CONTENGA un objeto Provisiones y delegue racionar(): int en él.",
    code_template:
      "<?php\n\nclass Provisiones {\n    public function racionar(): int { return 2; }\n}\n\nclass Sam {\n    // Compón un objeto Provisiones y delega racionar()\n}\n",
  },
  {
    id: "merry_parametros",
    title: "Merry — Métodos y parámetros",
    topic: "Métodos / Parámetros",
    prompt:
      "En la clase Merry crea el método explorar(string $lugar, int $pasos): string que devuelva una descripción combinando ambos parámetros.",
    code_template:
      "<?php\n\nclass Merry {\n    // Crea explorar(string $lugar, int $pasos): string\n}\n",
  },
  {
    id: "pippin_constructor",
    title: "Pippin — Constructores",
    topic: "Constructores",
    prompt:
      "Pippin siempre causa problemas. Crea la clase Pippin con un constructor que reciba $curiosidad (int) y guárdela; añade tocarLaCampana(): string.",
    code_template:
      "<?php\n\nclass Pippin {\n    // Constructor con $curiosidad y método tocarLaCampana()\n}\n",
  },
  {
    id: "gimli_static",
    title: "Gimli — Métodos estáticos",
    topic: "Static / Contadores",
    prompt:
      "Cuenta las bajas de Gimli. Añade una propiedad estática $enemigos y el método estático contar(): int que la incremente y devuelva.",
    code_template:
      "<?php\n\nclass Gimli {\n    private static int $enemigos = 0;\n\n    // Añade el método estático contar()\n}\n",
  },
  {
    id: "legolas_interface",
    title: "Legolas — Interfaces",
    topic: "Interfaces",
    prompt:
      "Define la interfaz Arquero con disparar(int $distancia): bool y haz que Legolas la implemente (acierta si distancia <= 100).",
    code_template:
      "<?php\n\ninterface Arquero {\n    public function disparar(int $distancia): bool;\n}\n\nclass Legolas implements Arquero {\n    // Implementa disparar()\n}\n",
  },
  {
    id: "boromir_excepciones",
    title: "Boromir — Excepciones",
    topic: "Excepciones",
    prompt:
      "Boromir sucumbe al Anillo. Crea la excepción CaidaException y un método resistir(int $tentacion) que la lance si tentacion > 80.",
    code_template:
      "<?php\n\nclass CaidaException extends Exception {}\n\nclass Boromir {\n    // resistir(int $tentacion): void — lanza CaidaException si > 80\n}\n",
  },

  {
    id: "bombadil_destructor",
    title: "Tom Bombadil — Destructores",
    topic: "Destructores (__destruct)",
    prompt:
      "Crea EfectoHechizo cuyo constructor reciba un Personaje y cuyo __destruct() lo libere (paralizado = false). En TomBombadil::cantarConjuro() créalo en una variable local.",
    code_template:
      "<?php\n\nclass EfectoHechizo {\n    public function __construct(private Personaje $objetivo) {}\n\n    // Implementa __destruct()\n}\n",
  },

  // ---------- La Sombra ----------
  {
    id: "tumulario_metodos",
    title: "Tumulario — Métodos y estado",
    topic: "Métodos y lógica de estado",
    prompt:
      "Crea la clase Tumulario con constructor $frio y el método drenar(int $vida): int, que reste el frío sin bajar nunca de 0.",
    code_template:
      "<?php\n\nclass Tumulario {\n    public function __construct(private int $frio) {}\n\n    // Implementa drenar(int $vida): int\n}\n",
  },
  {
    id: "nazgul_visibilidad",
    title: "Nazgûl — Visibilidad (public/private/protected)",
    topic: "Visibilidad de propiedades",
    prompt:
      "El Jinete Negro percibe lo que está expuesto. En la clase Nazgul deja $percepcion como private, expón getPercepcion(): int y añade protected $montura para que solo las subclases la usen.",
    code_template:
      "<?php\n\nclass Nazgul {\n    private int $percepcion = 50;\n    protected string $montura = 'caballo negro';\n\n    // Expón getPercepcion(): int\n}\n",
  },
  {
    id: "orco_herencia",
    title: "Orco — Herencia",
    topic: "Herencia",
    prompt:
      "Crea la clase Orco que herede de Criatura e implemente atacar(): int devolviendo su daño base.",
    code_template:
      "<?php\n\nclass Criatura {\n    public function __construct(protected int $vida = 30) {}\n}\n\nclass Orco extends Criatura {\n    // Implementa atacar()\n}\n",
  },
  {
    id: "trasgo_arrays",
    title: "Trasgo — Arrays de objetos",
    topic: "Colecciones de objetos",
    prompt:
      "Los trasgos atacan en horda. Crea la clase Horda que almacene un array de Trasgo y sume el daño total con dañoTotal(): int.",
    code_template:
      "<?php\n\nclass Trasgo {\n    public int $danio = 3;\n}\n\nclass Horda {\n    private array $trasgos = [];\n    // Añade agregar(Trasgo $t) y danioTotal()\n}\n",
  },
  {
    id: "uruk_polimorfismo",
    title: "Uruk-hai — Polimorfismo",
    topic: "Polimorfismo / Override",
    prompt:
      "El Uruk-hai es un orco mejorado. Haz que UrukHai extienda Orco y sobrescriba atacar() devolviendo el doble del daño.",
    code_template:
      "<?php\n\nclass Orco {\n    public function atacar(): int { return 5; }\n}\n\nclass UrukHai extends Orco {\n    // Sobrescribe atacar()\n}\n",
  },
  {
    id: "gollum_estado",
    title: "Gollum — Estado mutable",
    topic: "Estado / Máquina de estados",
    prompt:
      "Gollum alterna entre Sméagol y Gollum. Modela cambiarPersonalidad() que conmute la propiedad $modo entre 'smeagol' y 'gollum'.",
    code_template:
      "<?php\n\nclass Gollum {\n    private string $modo = 'smeagol';\n\n    // cambiarPersonalidad(): void y quienEres(): string\n}\n",
  },
  {
    id: "troll_abstract",
    title: "Troll de las Cavernas — Método abstracto",
    topic: "Clases Abstractas",
    prompt:
      "Define la clase abstracta Bestia con abstract public function embestir(): int y crea TrollDeLasCavernas que devuelva 20 de daño.",
    code_template:
      "<?php\n\nabstract class Bestia {\n    abstract public function embestir(): int;\n}\n\nclass TrollDeLasCavernas extends Bestia {\n    // Implementa embestir()\n}\n",
  },
  {
    id: "balrog_singleton",
    title: "Balrog — Singleton",
    topic: "Patrón Singleton / Clase final",
    prompt:
      "Sólo hay un Daño de Durin. Implementa Balrog como Singleton (final): constructor privado y despertar(): Balrog que devuelva siempre la misma instancia.",
    code_template:
      "<?php\n\nfinal class Balrog {\n    private static ?Balrog $instancia = null;\n    private function __construct() {}\n\n    // Implementa despertar()\n}\n",
  },
];

export function findChallenge(id: string): ChallengeEntry | undefined {
  return CHALLENGES.find((c) => c.id === id);
}
