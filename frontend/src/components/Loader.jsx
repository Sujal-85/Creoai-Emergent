import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }) {
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const wordRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const letters = wordRef.current?.querySelectorAll("span") || [];

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem("creoai_seen_loader", "1"); } catch {}
        onComplete && onComplete();
      },
    });

    gsap.set(letters, { yPercent: 120, opacity: 0 });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(letters, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" })
      .to(barRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          const p = Math.round(this.progress() * 100);
          setCount(p);
        },
      }, "-=0.2")
      .to(barRef.current, { width: "100vw", duration: 0.35, ease: "power2.inOut" }, "+=0.05")
      .to(wrap, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut" }, "+=0.05");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] bg-ink text-bone flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <div className="w-full max-w-[420px] px-6">
        <div className="flex items-end justify-between mb-5">
          <div ref={wordRef} className="font-mono text-[15px] tracking-[0.22em] uppercase overflow-hidden">
            {"CREOAI".split("").map((c, i) => (
              <span key={i} className="inline-block">{c}</span>
            ))}
          </div>
          <div ref={counterRef} className="font-mono text-[11px] tracking-[0.16em] text-fog">
            {String(count).padStart(2, "0")} <span className="text-steel">→</span> 100
          </div>
        </div>
        <div className="relative h-px w-full bg-graphite overflow-hidden">
          <div ref={barRef} className="absolute inset-y-0 left-0 w-full bg-bone" />
        </div>
        <div className="mt-4 font-mono text-[10px] tracking-[0.2em] text-steel uppercase">
          Loading · Creativity of AI
        </div>
      </div>
    </div>
  );
}
