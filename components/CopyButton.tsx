"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-primary-300/60 hover:bg-primary-500/10"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-primary-200" />
      ) : (
        <ClipboardIcon className="h-4 w-4 text-primary-200" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
