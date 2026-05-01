import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
  { v: 120, s: "+", label: "Projects shipped" },
  { v: 40, s: "+", label: "Automations deployed" },
  { v: 15, s: "+", label: "Countries" },
  { v: 99, s: "%", label: "Client retention" },
];

export default function Stats() {
  const wrap = useRef(null);

  useEffect(() => {
    const nums = wrap.current?.querySelectorAll("[data-num]");
    if (!nums) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        nums.forEach((n) => {
          const end = parseFloat(n.dataset.num);
          if (reduced) { n.textContent = String(end); return; }
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => { n.textContent = Math.round(o.v); },
          });
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section className="relative bg-ink border-t border-graphite">
      <div ref={wrap} className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="eyebrow mb-10">— 08 / NUMBERS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-8">
          {STATS.map((s, i) => (
            <div key={i} className="border-t border-graphite pt-6 pr-4">
              <div className="flex items-end gap-1">
                <span data-num={s.v} className="font-display font-semibold tracking-tightest text-bone text-[clamp(3rem,6vw,5.5rem)] leading-none">0</span>
                <span className="font-display font-semibold tracking-tightest text-lime text-[clamp(2rem,4vw,4rem)] leading-[1.1]">{s.s}</span>
              </div>
              <div className="mt-3 text-sm text-fog">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
