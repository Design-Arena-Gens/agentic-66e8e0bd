"use client";

import { useCallback } from "react";
import clsx from "clsx";
import { ALL_SECTIONS, SECTION_LABELS } from "@/lib/generator";
import { ContentSection } from "@/lib/types";

interface SectionSelectorProps {
  selected: ContentSection[];
  onChange: (sections: ContentSection[]) => void;
}

export function SectionSelector({ selected, onChange }: SectionSelectorProps) {
  const toggleSection = useCallback(
    (section: ContentSection) => {
      const set = new Set(selected);
      if (set.has(section)) {
        set.delete(section);
      } else {
        set.add(section);
      }
      if (set.size === 0) {
        // Always keep at least one section active.
        set.add(section);
      }
      onChange(Array.from(set));
    },
    [selected, onChange]
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
          Output palette
        </h2>
        <button
          type="button"
          onClick={() => onChange([...ALL_SECTIONS])}
          className="text-xs font-medium text-primary-300 hover:text-primary-100"
        >
          Select all
        </button>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {ALL_SECTIONS.map((section) => {
          const isSelected = selected.includes(section);
          return (
            <button
              key={section}
              type="button"
              onClick={() => toggleSection(section)}
              className={clsx(
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition",
                isSelected
                  ? "border-primary-400/80 bg-primary-400/10 text-white shadow-lg shadow-primary-500/20"
                  : "border-white/10 bg-black/20 text-white/70 hover:border-white/20 hover:bg-white/10"
              )}
            >
              <span className="text-sm font-medium">
                {SECTION_LABELS[section]}
              </span>
              <span
                className={clsx(
                  "inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
                  isSelected
                    ? "border-primary-200 bg-primary-400/40 text-primary-50"
                    : "border-white/20 text-white/40"
                )}
              >
                {isSelected ? "✓" : "+"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
