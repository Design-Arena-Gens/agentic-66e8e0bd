import { ReactNode } from "react";
import { CopyButton } from "./CopyButton";

type GeneratedSectionProps = {
  id: string;
  title: string;
  copyText?: string;
  children: ReactNode;
};

export function GeneratedSection({ id, title, copyText, children }: GeneratedSectionProps) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur"
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs uppercase tracking-wide text-white/50">Cinematic draft</p>
        </div>
        {copyText ? <CopyButton text={copyText} label="Copy all" /> : null}
      </header>
      <div className="space-y-4 text-sm leading-relaxed text-white/80">
        {children}
      </div>
    </section>
  );
}
