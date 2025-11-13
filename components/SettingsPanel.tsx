"use client";

import { GenerationSettings } from "@/lib/types";
import clsx from "clsx";

interface SettingsPanelProps {
  settings: GenerationSettings;
  onChange: (value: GenerationSettings) => void;
}

const INTENSITY_OPTIONS: Array<{ value: GenerationSettings["intensity"]; label: string; hint: string }> = [
  { value: "dreamy", label: "Dreamy", hint: "Soft, poetic, atmospheric" },
  { value: "grounded", label: "Grounded", hint: "Raw, intimate realism" },
  { value: "epic", label: "Epic", hint: "Grand, high-stakes energy" },
];

const ERA_OPTIONS: Array<{ value: GenerationSettings["era"]; label: string; hint: string }> = [
  { value: "contemporary", label: "Contemporary", hint: "Modern-day aesthetic" },
  { value: "futuristic", label: "Futuristic", hint: "Forward-looking worlds" },
  { value: "period", label: "Period", hint: "Historically grounded" },
];

const LENGTH_OPTIONS: Array<{ value: GenerationSettings["targetLength"]; label: string; hint: string }> = [
  { value: "short", label: "Short", hint: "5-12 minute arc" },
  { value: "feature", label: "Feature", hint: "90-120 minute journey" },
  { value: "series", label: "Series", hint: "Multi-episode runway" },
];

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  function updateSetting<Key extends keyof GenerationSettings>(key: Key, value: GenerationSettings[Key]) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Tone dial
      </h2>
      <div className="mt-4 space-y-4">
        <OptionGroup
          label="Intensity"
          value={settings.intensity}
          options={INTENSITY_OPTIONS}
          onSelect={(val) => updateSetting("intensity", val)}
        />
        <OptionGroup
          label="Era"
          value={settings.era}
          options={ERA_OPTIONS}
          onSelect={(val) => updateSetting("era", val)}
        />
        <OptionGroup
          label="Format"
          value={settings.targetLength}
          options={LENGTH_OPTIONS}
          onSelect={(val) => updateSetting("targetLength", val)}
        />
      </div>
    </div>
  );
}

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  options: Array<{ value: T; label: string; hint: string }>;
  onSelect: (value: T) => void;
}

function OptionGroup<T extends string>({ label, value, options, onSelect }: OptionGroupProps<T>) {
  return (
    <fieldset>
      <legend className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={clsx(
              "rounded-lg border px-3 py-2 text-left transition",
              value === option.value
                ? "border-primary-300 bg-primary-500/20 text-white shadow-inner"
                : "border-white/10 bg-black/20 text-white/70 hover:border-white/20 hover:bg-white/10"
            )}
          >
            <p className="text-sm font-medium">{option.label}</p>
            <p className="text-[11px] text-white/50">{option.hint}</p>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
