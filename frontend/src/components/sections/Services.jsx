import React, { useEffect, useRef } from "react";
import { Code2, Smartphone, Workflow, TrendingUp, Megaphone, LineChart, MessageCircle, LifeBuoy, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const SERVICES = [
  { n: "01", Icon: Code2, title: "Website Development", desc: "Production-grade marketing sites, web apps and design systems — built with Next.js, React and Tailwind." },
  { n: "02", Icon: Smartphone, title: "Mobile App Development", desc: "Cross-platform apps with React Native and Expo. Native feel, shared code, shipped fast." },
  { n: "03", Icon: Workflow, title: "n8n Automation Workflows", desc: "Self-hosted automations that connect your stack. APIs, CRMs, and AI in a single pipeline." },
  { n: "04", Icon: TrendingUp, title: "SEO Optimization", desc: "Technical and content SEO built into the code. Core Web Vitals, schema, and topical authority." },
  { n: "05", Icon: Megaphone, title: "Meta Business Platform", desc: "End-to-end Meta Ads management — pixel, events, catalog, creative, and performance." },
  { n: "06", Icon: LineChart, title: "AI Business Marketing", desc: "Google Ads and AI-assisted campaigns with full attribution and reporting." },
  { n: "07", Icon: MessageCircle, title: "WhatsApp Automations", desc: "Conversational flows on WhatsApp Cloud API — support, sales and operations." },
  { n: "08", Icon: LifeBuoy, title: "Developer Consultancy", desc: "Architecture reviews, code audits and pairing sessions. Free tier available.", badge: "Free tier available" },
];

export default function Services() {
  const gridRef = useRef(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll("[data-service-card]") || [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.set(items, { y: 40, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => gsap.to(items, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out" }),
    });
    return () => st.kill();
  }, []);

  return (
    <section id="services" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <SectionHeading
            eyebrow="— 02 / SERVICES"
            title="Eight disciplines. One operating layer for growth."
            className="max-w-3xl"
          />
          <p className="text-fog text-body max-w-sm">We compress months of engineering into days — across web, mobile, automations, ads and advisory.</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-graphite">
          {SERVICES.map((s, i) => (
            <article
              key={i}
              data-service-card
              data-cursor-label={`→ ${s.title}`}
              className="group relative border-b md:border-b-0 md:border-r border-graphite last:border-r-0 p-8 md:p-10 bg-ink hover:bg-obsidian transition-colors duration-500 overflow-hidden"
              style={{ borderRightStyle: (i + 1) % 4 === 0 ? "none" : undefined }}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center text-bone group-hover:border-lime group-hover:text-lime transition-colors duration-300">
                  <s.Icon className="w-4 h-4" />
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">{s.n}</div>
              </div>
              <h3 className="mt-10 text-display-3 font-display font-semibold tracking-tight text-bone">{s.title}</h3>
              <p className="mt-3 text-sm text-fog leading-relaxed">{s.desc}</p>
              {s.badge && (
                <div className="mt-5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-lime/40 text-lime font-mono text-[10px] tracking-[0.18em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" /> {s.badge}
                </div>
              )}
              <div className="mt-10 flex items-center gap-1 text-sm text-fog group-hover:text-bone transition-colors">
                Learn more <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-lime transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
