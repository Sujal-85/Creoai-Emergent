import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance = null;

export function initLenis() {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenisInstance = new Lenis({
    duration: prefersReduced ? 0 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
    smoothTouch: false,
    touchMultiplier: 1.4,
  });

  // GSAP ticker sync
  const onRaf = (time) => lenisInstance && lenisInstance.raf(time * 1000);
  gsap.ticker.add(onRaf);
  gsap.ticker.lagSmoothing(0);

  // ScrollTrigger integration
  lenisInstance.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && lenisInstance) lenisInstance.scrollTo(value, { immediate: true });
      return lenisInstance ? lenisInstance.scroll : 0;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });
  ScrollTrigger.defaults({ scroller: document.documentElement });
  ScrollTrigger.refresh();

  // Cleanup helper
  lenisInstance.__onRaf = onRaf;
  return lenisInstance;
}

export function destroyLenis() {
  if (!lenisInstance) return;
  try {
    gsap.ticker.remove(lenisInstance.__onRaf);
    lenisInstance.destroy();
  } catch (e) { /* noop */ }
  lenisInstance = null;
}

export function getLenis() { return lenisInstance; }

export function scrollTo(target, opts = {}) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(target, { duration: 1.1, ...opts });
}
