import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const PROJECTS = [
  { tag: "Web", client: "North Harbor", title: "Marketing site + headless CMS", meta: "2025 · Next.js", size: "tall" },
  { tag: "Mobile", client: "Axon", title: "Field ops app", meta: "2025 · Expo", size: "wide" },
  { tag: "Automation", client: "Relay", title: "n8n sales pipeline", meta: "2024 · n8n", size: "sq" },
  { tag: "Ads", client: "Ember", title: "Meta + Google performance", meta: "2024 · Meta", size: "sq" },
  { tag: "Web", client: "Quant", title: "Investor dashboard", meta: "2025 · React", size: "wide" },
  { tag: "AI", client: "Signal", title: "Support copilot", meta: "2025 · LLM", size: "tall" },
];

export default function Work() {
  return (
    <section id="work" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow="— 05 / SELECTED WORK" title="A small, opinionated portfolio." className="max-w-3xl" />
          <a href="#" className="inline-flex items-center gap-1 text-sm text-fog hover:text-bone transition-colors" data-cursor-label="Index">
            Full index <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href="#"
              data-cursor-label="View case →"
              className={
                "group relative block border border-graphite bg-obsidian overflow-hidden " +
                (p.size === "tall"
                  ? "col-span-12 md:col-span-4 aspect-[3/4]"
                  : p.size === "wide"
                  ? "col-span-12 md:col-span-8 aspect-[16/9]"
                  : "col-span-12 md:col-span-4 aspect-square")
              }
            >
              {/* Placeholder visual: low-poly lines + flat block */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-ink" />
                <div className="absolute inset-0 opacity-60" style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(250,250,247,0.05) 0 1px, transparent 1px 14px)",
                }} />
                <div className="absolute right-6 bottom-6 w-24 h-24 border border-graphite" />
                <div className="absolute left-6 top-6 w-10 h-10 border border-lime/40" />
              </div>
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">{p.tag}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">0{i + 1}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-fog">{p.client}</div>
                  <div className="mt-1.5 text-xl md:text-2xl font-display font-semibold tracking-tight text-bone text-balance">
                    {p.title}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-steel">{p.meta}</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-lime transition-all duration-700 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
