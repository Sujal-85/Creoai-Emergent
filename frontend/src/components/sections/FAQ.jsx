import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const FAQS = [
  { q: "What does engagement look like?", a: "We scope in discovery, design and build in sprints, then automate for compounding gains. Weekly async updates and live reviews." },
  { q: "How fast can you ship?", a: "Marketing sites in 1–2 weeks, apps and automations in 3–6 weeks depending on integrations. We commit to dates, not wishes." },
  { q: "Do you offer equity-based partnerships?", a: "For select seed/Series A teams where the thesis is strong and velocity matters, yes." },
  { q: "What's the free consultancy tier?", a: "One 30-minute session per month + async Q&A for indie devs and small teams. Apply via the form." },
  { q: "Do you own the IP?", a: "You do. You get clean code, clean commits, and full handover from day one." },
  { q: "Where are you based?", a: "A small, distributed team across three time zones. Primary overlap 9–3 UTC." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="— 09 / FAQ" title="Commonly asked, clearly answered." />
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-graphite">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className="border-b border-graphite">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      data-testid={`faq-toggle-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="text-bone font-display text-xl md:text-2xl tracking-tight font-medium">{f.q}</span>
                      <span className="w-9 h-9 rounded-full border border-graphite flex items-center justify-center text-bone">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="pb-6 pr-10 text-fog text-body leading-relaxed max-w-2xl">{f.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
