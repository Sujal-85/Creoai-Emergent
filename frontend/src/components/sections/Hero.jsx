import React, { lazy, Suspense, useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const LOGOS = ["Next.js", "n8n", "Meta", "Google", "WhatsApp", "Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function Hero() {
  const headRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const split = new SplitType(headRef.current, { types: "words", tagName: "span" });
    gsap.set(split.words, { yPercent: 115, opacity: 0 });
    gsap.set(subRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaRef.current?.children || [], { y: 18, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(split.words, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 1.1, ease: "power4.out" })
      .to(subRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .to(ctaRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 }, "-=0.5");

    return () => { tl.kill(); split.revert(); };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100vh] w-full bg-ink overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0 opacity-60">
        <Suspense fallback={<div className="absolute inset-0" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Top eyebrow + meta */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-[96px] md:pt-[120px]">
        <div className="flex items-center justify-between">
          <div className="eyebrow flex items-center gap-3">
            <span className="dot" /> Creativity of AI
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-steel">
            <span>LAT 37.77°N</span><span className="opacity-40">//</span><span>LONG 122.42°W</span>
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-10 md:pt-16">
        <h1 ref={headRef} className="font-display font-semibold text-bone text-display-1 tracking-tightest text-balance max-w-[18ch]" style={{ overflow: "hidden" }}>
          We build the automation layer for the modern web.
        </h1>
        <p ref={subRef} className="mt-8 md:mt-10 text-fog text-body-lg max-w-[58ch]">
          Creoai partners with developers and small businesses to ship production-grade websites, apps, and AI workflows — faster than humanly reasonable.
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton as="a" href="/contact" data-testid="hero-cta-primary" className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-bone text-ink text-sm font-medium tracking-tight">
            Start a project <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
          <a href="#services" data-testid="hero-cta-secondary" className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-graphite text-bone text-sm font-medium tracking-tight hover:border-bone transition-colors">
            Explore Services <ArrowRight className="w-4 h-4" />
          </a>
          <div className="ml-0 md:ml-4 hidden md:flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-steel">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" /> Available for 2 projects
          </div>
        </div>
      </div>

      {/* Side meta */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 flex-col gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-steel writing-mode" style={{ writingMode: "vertical-rl" }}>
        <span>— 01 / HERO</span>
        <span>CREOAI STUDIO</span>
      </div>

      {/* Bottom logo marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-graphite bg-ink/70 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex items-center gap-6">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel whitespace-nowrap">— Stack we trust</div>
          <div className="relative flex-1 overflow-hidden mask-fade-edge">
            <div className="flex gap-10 animate-marquee whitespace-nowrap">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <span key={i} className="font-mono text-sm tracking-tight text-fog">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade-edge {
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
