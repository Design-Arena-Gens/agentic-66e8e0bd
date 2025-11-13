"use client";

import { FormEvent, useMemo, useState } from "react";
import { SectionSelector } from "@/components/SectionSelector";
import { SettingsPanel } from "@/components/SettingsPanel";
import { GeneratedSection } from "@/components/GeneratedSection";
import { ALL_SECTIONS, SECTION_LABELS, generateMovieContent } from "@/lib/generator";
import { ContentSection, GeneratedMovieContent, GenerationSettings } from "@/lib/types";
import clsx from "clsx";

const DEFAULT_SETTINGS: GenerationSettings = {
  intensity: "epic",
  era: "futuristic",
  targetLength: "feature",
};

const INITIAL_CONCEPT = "a synesthetic cartographer who maps human emotions";

export default function HomePage() {
  const [concept, setConcept] = useState(INITIAL_CONCEPT);
  const [sections, setSections] = useState<ContentSection[]>([...ALL_SECTIONS]);
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedMovieContent | null>(() =>
    generateMovieContent(INITIAL_CONCEPT, DEFAULT_SETTINGS)
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generated = generateMovieContent(concept, settings);
      setResult(generated);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Unable to generate content.");
    } finally {
      setLoading(false);
    }
  }

  const filteredSections = useMemo(() => {
    if (!result) return [] as Array<{ key: ContentSection; label: string; content: JSX.Element; copy: string }>;
    return sections.map((section) => ({
      key: section,
      label: SECTION_LABELS[section],
      content: renderSection(section, result),
      copy: copySection(section, result),
    }));
  }, [result, sections]);

  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="space-y-6">
          <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-6 shadow-xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary-200/80">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary-300" />
              Cinematic Muse Studio
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Translate any idea into a production-ready cinematic blueprint.
            </h1>
            <p className="mt-3 text-sm text-white/70">
              Feed the studio an idea and receive story concepts, scene beats, camera plans, prompts, and social rollout guidance—crafted for AI tools, writers, and directors alike.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <label htmlFor="concept" className="text-xs uppercase tracking-[0.3em] text-white/50">
                Concept
              </label>
              <textarea
                id="concept"
                value={concept}
                onChange={(event) => setConcept(event.target.value)}
                rows={5}
                className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white shadow-inner shadow-black/40 transition focus:border-primary-400 focus:bg-black/20"
                placeholder="Example: a community of lighthouse keepers who exchange memories through light"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
                <span>Describe characters, worlds, conflicts, or moods. The richer the idea, the deeper the render.</span>
                <button
                  type="button"
                  onClick={() => setConcept(INITIAL_CONCEPT)}
                  className="font-medium text-primary-300 hover:text-primary-100"
                >
                  Use sample
                </button>
              </div>
            </div>

            <SettingsPanel settings={settings} onChange={setSettings} />

            <SectionSelector selected={sections} onChange={setSections} />

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full rounded-full border px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition",
                loading
                  ? "border-primary-400/60 bg-primary-500/30 text-white/60"
                  : "border-primary-400 bg-primary-500/70 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-400"
              )}
            >
              {loading ? "Rendering..." : "Generate cinematic blueprint"}
            </button>

            {error ? (
              <p className="text-sm text-rose-300">{error}</p>
            ) : null}
          </form>
        </div>

        <div className="space-y-6">
          {filteredSections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-white/40">
              Choose output sections to see your cinematic blueprint.
            </div>
          ) : (
            filteredSections.map((section) => (
              <GeneratedSection
                key={section.key}
                id={section.key}
                title={section.label}
                copyText={section.copy}
              >
                {section.content}
              </GeneratedSection>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function renderSection(section: ContentSection, content: GeneratedMovieContent): JSX.Element {
  switch (section) {
    case "storyIdeas":
      return (
        <div className="space-y-4">
          {content.storyIdeas.map((idea, index) => (
            <div key={idea.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Concept {index + 1}</p>
              <h4 className="mt-1 text-lg font-semibold text-white">{idea.title}</h4>
              <p className="mt-2 text-sm text-white/80">
                <span className="font-semibold text-primary-200">Logline:</span> {idea.logline}
              </p>
              <p className="mt-2 text-sm text-white/70">{idea.summary}</p>
            </div>
          ))}
        </div>
      );
    case "scriptWriting":
      return (
        <div className="space-y-6">
          {content.scriptWriting.map((beat, index) => (
            <article key={`${beat.slugline}-${index}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <header>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Scene {index + 1}</p>
                <h4 className="mt-1 font-semibold text-white">{beat.slugline}</h4>
              </header>
              <p className="mt-3 text-sm text-white/70">{beat.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
                Emotional pulse: {beat.emotionalBeat}
              </p>
              <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-[13px] text-white/80">
                {beat.dialogue.map((line, lineIndex) => (
                  <div key={`${line.character}-${lineIndex}`}>
                    <span className="font-semibold text-primary-200">{line.character}:</span> {line.line}
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-white/40">
                      Subtext — {line.subtext}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      );
    case "visualPlanning":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {content.visualPlanning.map((card) => (
            <div key={card.frame} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{card.frame}</p>
              <p className="mt-2 text-sm text-white/80">{card.description}</p>
              <p className="mt-3 text-xs text-white/60"><span className="font-semibold text-primary-200">Camera:</span> {card.camera}</p>
              <p className="text-xs text-white/60"><span className="font-semibold text-primary-200">Lighting:</span> {card.lighting}</p>
              <p className="text-xs text-white/60"><span className="font-semibold text-primary-200">Mood:</span> {card.mood}</p>
            </div>
          ))}
        </div>
      );
    case "shotList":
      return (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-xs text-white/70">
            <thead className="bg-white/5 text-[11px] uppercase tracking-[0.3em] text-white/50">
              <tr>
                <th className="px-3 py-2">Shot</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Movement</th>
                <th className="px-3 py-2 text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {content.shotList.map((shot) => (
                <tr key={shot.id} className="odd:bg-white/5">
                  <td className="px-3 py-3 font-semibold text-white/80">{shot.id}</td>
                  <td className="px-3 py-3">{shot.shotType}</td>
                  <td className="px-3 py-3 text-white/80">{shot.subject}</td>
                  <td className="px-3 py-3">{shot.movement}</td>
                  <td className="px-3 py-3 text-right font-mono">{shot.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "voiceover":
      return (
        <div className="space-y-3 text-base leading-relaxed text-white/80">
          {content.voiceover.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    case "posterPrompts":
      return (
        <ul className="space-y-3 text-sm text-white/80">
          {content.posterPrompts.map((prompt, index) => (
            <li key={index} className="rounded-lg border border-white/10 bg-black/20 p-3">
              {prompt}
            </li>
          ))}
        </ul>
      );
    case "videoPrompts":
      return (
        <div className="space-y-4">
          {content.videoPrompts.map((prompt) => (
            <div key={prompt.scene} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{prompt.scene}</p>
              <p className="mt-2 text-sm text-white/80">Palette: {prompt.visualPalette}</p>
              <p className="text-sm text-white/80">Camera: {prompt.cameraDirection}</p>
              <p className="text-sm text-white/80">Lighting: {prompt.lighting}</p>
              <p className="text-sm text-white/80">Motion: {prompt.motionPrompt}</p>
              <p className="mt-3 rounded-lg border border-primary-300/30 bg-primary-500/10 p-3 text-xs text-primary-100">
                {prompt.aiPrompt}
              </p>
            </div>
          ))}
        </div>
      );
    case "social":
      return (
        <div className="space-y-4 text-sm text-white/80">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/40">Titles</h4>
            <ul className="mt-2 space-y-2">
              {content.social.titles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/40">Captions</h4>
            <ul className="mt-2 space-y-2">
              {content.social.captions.map((caption) => (
                <li key={caption}>{caption}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/40">Tags</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {content.social.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return <p className="text-sm text-white/60">Unsupported section.</p>;
  }
}

function copySection(section: ContentSection, content: GeneratedMovieContent): string {
  switch (section) {
    case "storyIdeas":
      return content.storyIdeas
        .map(
          (idea, index) =>
            `Concept ${index + 1}: ${idea.title}\nLogline: ${idea.logline}\nSummary: ${idea.summary}`
        )
        .join("\n\n");
    case "scriptWriting":
      return content.scriptWriting
        .map(
          (beat, index) =>
            `Scene ${index + 1}: ${beat.slugline}\nDescription: ${beat.description}\nEmotional pulse: ${beat.emotionalBeat}\nDialogue:\n${beat.dialogue
              .map((line) => `${line.character}: ${line.line} [Subtext: ${line.subtext}]`)
              .join("\n")}`
        )
        .join("\n\n");
    case "visualPlanning":
      return content.visualPlanning
        .map(
          (card) =>
            `${card.frame}: ${card.description}\nCamera: ${card.camera}\nLighting: ${card.lighting}\nMood: ${card.mood}`
        )
        .join("\n\n");
    case "shotList":
      return content.shotList
        .map(
          (shot) =>
            `${shot.id} | ${shot.shotType} | ${shot.subject} | ${shot.movement} | ${shot.duration}`
        )
        .join("\n");
    case "voiceover":
      return content.voiceover.join("\n\n");
    case "posterPrompts":
      return content.posterPrompts.join("\n\n");
    case "videoPrompts":
      return content.videoPrompts
        .map(
          (prompt) =>
            `${prompt.scene}\nPalette: ${prompt.visualPalette}\nCamera: ${prompt.cameraDirection}\nLighting: ${prompt.lighting}\nMotion: ${prompt.motionPrompt}\nAI Prompt: ${prompt.aiPrompt}`
        )
        .join("\n\n");
    case "social":
      return [
        "Titles:",
        ...content.social.titles,
        "",
        "Captions:",
        ...content.social.captions,
        "",
        "Tags:",
        content.social.tags.join(" "),
      ].join("\n");
    default:
      return "";
  }
}
