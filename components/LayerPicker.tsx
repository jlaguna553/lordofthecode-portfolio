"use client";

import type { LpcCategory, Selection } from "@/lib/lpc/types";

interface Props {
  categories: LpcCategory[];
  selection: Selection;
  /** bodyType actualmente elegido; filtra las capas ajustadas al cuerpo. */
  bodyType: string | null;
  onChange: (categoryId: string, optionId: string | null) => void;
}

/**
 * Panel de selección de capas (paperdoll). Las categorías se muestran en orden
 * de zPos y, para las capas ajustadas al cuerpo (bodyType != null), sólo se
 * ofrecen las opciones compatibles con el cuerpo seleccionado.
 */
export default function LayerPicker({
  categories,
  selection,
  bodyType,
  onChange,
}: Props) {
  return (
    <div className="space-y-5">
      {categories.map((category) => {
        const options = category.options.filter(
          (o) => o.bodyType === null || o.bodyType === bodyType,
        );
        const current = selection[category.id] ?? null;

        return (
          <fieldset key={category.id}>
            <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
              {category.name}
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                z{category.zPos}
              </span>
            </legend>

            <div className="flex flex-wrap gap-1.5">
              {category.optional && (
                <Chip
                  active={current === null}
                  onClick={() => onChange(category.id, null)}
                >
                  ∅ Ninguno
                </Chip>
              )}
              {options.map((option) => (
                <Chip
                  key={option.id}
                  active={current === option.id}
                  onClick={() => onChange(category.id, option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-lg px-2.5 py-1 text-xs font-medium transition " +
        (active
          ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700")
      }
    >
      {children}
    </button>
  );
}
