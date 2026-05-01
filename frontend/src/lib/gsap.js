import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !window.__gsapRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  // Safer defaults
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  window.__gsapRegistered = true;
}

export { gsap, ScrollTrigger };
