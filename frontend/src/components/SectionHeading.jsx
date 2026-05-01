import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SectionHeading({ eyebrow, title, align = "left", className = "", as: Tag = "h2", size = "display-2" }) {
  const headRef = useRef(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const split = new SplitType(el, { types: "words, lines", tagName: "span" });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(split.words, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.9, ease: "power3.out" });
      },
    });

    return () => {
      st.kill();
      split.revert();
    };
  }, [title]);

  return (
    <div className={className} style={{ textAlign: align }}>
      {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
      <Tag ref={headRef} className={`font-display font-semibold text-bone tracking-tighter text-${size} text-balance`} style={{ overflow: "hidden" }}>
        {title}
      </Tag>
    </div>
  );
}
