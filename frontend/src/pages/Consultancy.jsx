import React from "react";
import { Gift, Crown, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/MagneticButton";

const FEATURES = [
  { label: "Monthly sessions", free: "1 · 30 min", pro: "Unlimited" },
  { label: "Response SLA", free: "Best-effort", pro: "< 4 hours" },
  { label: "Architecture reviews", free: "—", pro: "Included" },
  { label: "Code reviews & PRs", free: "—", pro: "Included" },
  { label: "On-call for launches", free: "—", pro: "Included" },
  { label: "Private Slack channel", free: "—", pro: "Included" },
  { label: "Quarterly strategy", free: "—", pro: "Included" },
  { label: "Recorded recaps", free: "Included", pro: "Included" },
];

export default function ConsultancyPage() {
  return (
    <main className="pt-[72px] bg-ink">
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="eyebrow mb-6">— CONSULTANCY</div>
        <h1 className="font-display font-semibold text-bone tracking-tightest text-display-1 text-balance max-w-[22ch]">Senior engineers, on retainer or on call.</h1>
        <p className="mt-8 text-fog text-body-lg max-w-2xl">Pair with our team to level up architecture, ship safer deploys, and make the right calls at the right moment.</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-graphite bg-obsidian p-8 md:p-10">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full border border-graphite flex items-center justify-center text-bone"><Gift className="w-5 h-5" /></div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">FREE</div>
            </div>
            <h3 className="mt-10 text-display-3 font-display font-semibold text-bone">Starter</h3>
            <div className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fog">$0 / month</div>
            <p className="mt-4 text-fog text-sm max-w-sm">For indie developers and small teams figuring out their stack, stage or launch plan.</p>
            <MagneticButton as={Link} to="/contact" className="mt-10 inline-flex items-center gap-2 h-12 px-5 rounded-full border border-graphite text-bone text-sm hover:border-bone transition-colors">
              Apply <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          <div className="relative border border-graphite bg-obsidian p-8 md:p-10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-lime" />
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full border border-lime text-lime flex items-center justify-center"><Crown className="w-5 h-5" /></div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-lime">PRO</div>
            </div>
            <h3 className="mt-10 text-display-3 font-display font-semibold text-bone">Partner</h3>
            <div className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fog">From $2,400 / month</div>
            <p className="mt-4 text-fog text-sm max-w-sm">For teams shipping production, where speed, taste and reliability compound every week.</p>
            <MagneticButton as={Link} to="/contact" className="mt-10 inline-flex items-center gap-2 h-12 px-5 rounded-full bg-lime text-ink text-sm font-medium">
              Start <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-20">
          <div className="eyebrow mb-6">— Feature comparison</div>
          <div className="border border-graphite">
            <div className="grid grid-cols-3 font-mono text-[11px] tracking-[0.18em] uppercase text-steel">
              <div className="p-5 border-b border-graphite">Feature</div>
              <div className="p-5 border-b border-l border-graphite">Starter</div>
              <div className="p-5 border-b border-l border-graphite text-lime">Partner</div>
            </div>
            {FEATURES.map((f, i) => (
              <div key={i} className="grid grid-cols-3 text-sm">
                <div className="p-5 border-b border-graphite text-bone">{f.label}</div>
                <div className="p-5 border-b border-l border-graphite text-fog">{f.free === "Included" ? <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-bone" /> Included</span> : f.free}</div>
                <div className="p-5 border-b border-l border-graphite text-fog">{f.pro === "Included" ? <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-lime" /> Included</span> : f.pro}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
