import React from "react";

export default function VisionMission() {
  return (
    <section id="about" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="eyebrow mb-6">— 06 / VISION</div>
            <h2 className="text-display-3 font-display font-semibold tracking-tight text-bone text-balance">
              Make AI genuinely creative — and ship standard-setting applications to developers and small businesses.
            </h2>
          </div>

          <div className="md:col-span-2 flex md:justify-center">
            <div className="w-full h-px md:h-full md:w-px bg-graphite" />
          </div>

          <div className="md:col-span-5">
            <div className="eyebrow mb-6">— MISSION</div>
            <h2 className="text-display-3 font-display font-semibold tracking-tight text-bone text-balance">
              We build the automation layer between human ambition and machine execution — compressing months of engineering into days.
            </h2>
          </div>
        </div>

        <figure className="mt-20 md:mt-28 max-w-4xl mx-auto text-center">
          <blockquote className="font-display font-semibold tracking-tighter text-bone text-display-2 text-balance">
            “Every pixel has a reason. Every line has intent.”
          </blockquote>
          <figcaption className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-steel">— Creoai manifesto</figcaption>
        </figure>
      </div>
    </section>
  );
}
