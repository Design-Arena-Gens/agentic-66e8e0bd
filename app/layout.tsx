import "./globals.css";
import type { Metadata } from "next";
import { dmSans, fanders } from "@/lib/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Cinematic Muse Studio",
  description:
    "Generate cinematic movie concepts, scripts, storyboards, and prompts from a single idea.",
  metadataBase: new URL("https://agentic-66e8e0bd.vercel.app"),
  openGraph: {
    title: "Cinematic Muse Studio",
    description:
      "Generate cinematic movie concepts, scripts, storyboards, and prompts from a single idea.",
    url: "https://agentic-66e8e0bd.vercel.app",
    siteName: "Cinematic Muse Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinematic Muse Studio",
    description:
      "Generate cinematic movie concepts, scripts, storyboards, and prompts from a single idea.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(dmSans.variable, fanders.variable)}>
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-500/30 blur-3xl" />
            <div className="absolute left-1/3 top-2/3 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-sky-500/10 blur-[120px]" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
