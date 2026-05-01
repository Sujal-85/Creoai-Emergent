import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Compass, Pencil, Hammer, Zap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const STEPS = [
  { n: "01", t: "Discover", Icon: Compass, d: "We audit your product, ops, and growth to identify the highest-leverage surface to automate." },
  { n: "02", t: "Design", Icon: Pencil, d: "Editorial, system-first interfaces and architectures — no fluff, no decorative noise." },
  { n: "03", t: "Build", Icon: Hammer, d: "Typed code, tested pipelines, observable deploys. Ship to production in days." },
  { n: "04", t: "Automate", Icon: Zap, d: "AI workflows, CRMs and analytics that compound — so the system improves as you grow." },
];

export default function Process() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMd = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !isMd) return;

    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth + 40;

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      scrub: 1,
      animation: tween,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });
    return () => { st.kill(); tween.kill(); };
  }, []);

  return (
    <section id="process" ref={wrapRef} className="relative bg-ink border-t border-graphite overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow="— 04 / PROCESS" title="A four-step operating model, repeatable at scale." className="max-w-3xl" />
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-steel">Discover · Design · Build · Automate</div>
        </div>
      </div>

      <div className="relative">
        <div ref={trackRef} className="flex gap-6 md:gap-10 pl-6 md:pl-10 pr-10 pb-24 will-change-transform">
          {STEPS.map((s, i) => (
            <article key={i} className="shrink-0 w-[86vw] md:w-[62vw] lg:w-[46vw] border border-graphite bg-obsidian p-8 md:p-12 flex flex-col justify-between min-h-[420px]">
              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">STEP {s.n}</div>
                <div className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center text-bone">
                  <s.Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-display font-semibold text-bone text-[clamp(5rem,9vw,8rem)] leading-none tracking-tightest">{s.n}</div>
                <h3 className="mt-4 text-display-3 font-display font-semibold tracking-tight text-bone">{s.t}</h3>
                <p className="mt-3 text-fog max-w-md text-body leading-relaxed">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
