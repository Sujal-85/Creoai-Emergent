import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`; }
      if (label) { label.style.transform = `translate3d(${mx + 18}px, ${my + 14}px, 0)`; }
    };

    const loop = () => {
      const ease = reduced ? 1 : 0.18;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      if (ring) ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [data-cursor], input, textarea, [role='button'], select");
      const enter = (e) => {
        ring?.classList.add("is-active");
        dot?.classList.add("is-active");
        const labelText = e.currentTarget?.dataset?.cursorLabel;
        if (labelText && label) {
          label.textContent = labelText;
          label.classList.add("is-visible");
        }
      };
      const leave = () => {
        ring?.classList.remove("is-active");
        dot?.classList.remove("is-active");
        label?.classList.remove("is-visible");
      };
      els.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
      return () => { els.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); }); };
    };

    let cleanupHover = addHoverListeners();
    // Rewire hovers when DOM changes (simple interval; cheap)
    const iv = setInterval(() => { cleanupHover && cleanupHover(); cleanupHover = addHoverListeners(); }, 2000);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearInterval(iv);
      cleanupHover && cleanupHover();
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[80] w-8 h-8 rounded-full border border-bone/70 transition-[width,height,opacity,background] duration-200 ease-out mix-blend-difference" style={{ willChange: "transform" }} />
      <div ref={dotRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[81] w-2 h-2 rounded-full bg-lime" style={{ willChange: "transform" }} />
      <div ref={labelRef} aria-hidden="true" className="cc-label pointer-events-none fixed top-0 left-0 z-[82] font-mono text-[11px] tracking-[0.18em] uppercase text-ink bg-lime px-2 py-1 rounded-sm opacity-0 transition-opacity duration-150" style={{ willChange: "transform" }}>LABEL</div>
      <style>{`
        .cc-label.is-visible { opacity: 1; }
        [class*="cursor-ring"] { transition: transform 0.08s linear; }
      `}</style>
    </>
  );
}
