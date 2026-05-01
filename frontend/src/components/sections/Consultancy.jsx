import React from "react";
import { Gift, Crown, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const FREE = [
  "1 session per month (30 min)",
  "Async Q&A in Slack/Email",
  "Stack recommendations",
  "Recorded recap",
];
const PRO = [
  "Unlimited sessions",
  "Priority response < 4h",
  "Architecture & code reviews",
  "On-call for critical launches",
  "Private repo collaboration",
];

export default function Consultancy() {
  return (
    <section id="consultancy" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow="— 07 / CONSULTANCY" title="Two ways to work with our senior engineers." className="max-w-3xl" />
          <Link to="/consultancy" className="inline-flex items-center gap-1 text-sm text-fog hover:text-bone transition-colors">Compare in detail <ArrowUpRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="relative border border-graphite bg-obsidian p-8 md:p-10">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full border border-graphite flex items-center justify-center text-bone">
                <Gift className="w-5 h-5" />
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">TIER · FREE</div>
            </div>
            <h3 className="mt-10 text-display-3 font-display font-semibold tracking-tight text-bone">Starter</h3>
            <div className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fog">$0 / month</div>
            <ul className="mt-8 space-y-3">
              {FREE.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-fog"><Check className="w-4 h-4 text-bone" /> {f}</li>
              ))}
            </ul>
            <Link to="/contact" data-testid="consult-free-cta" className="mt-10 inline-flex items-center gap-2 px-5 h-11 rounded-full border border-graphite text-bone text-sm hover:border-bone transition-colors">
              Apply for free tier <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pro */}
          <div className="relative border border-graphite bg-obsidian p-8 md:p-10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-lime" />
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full border border-lime text-lime flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-lime">TIER · PRO</div>
            </div>
            <h3 className="mt-10 text-display-3 font-display font-semibold tracking-tight text-bone">Partner</h3>
            <div className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fog">From $2,400 / month</div>
            <ul className="mt-8 space-y-3">
              {PRO.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-fog"><Check className="w-4 h-4 text-lime" /> {f}</li>
              ))}
            </ul>
            <Link to="/contact" data-testid="consult-pro-cta" className="mt-10 inline-flex items-center gap-2 px-5 h-11 rounded-full bg-lime text-ink text-sm font-medium hover:brightness-95 transition">
              Start Pro engagement <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
