import React, { lazy, Suspense, useState } from "react";
import { ArrowRight, Check, Sparkle, Box, Terminal, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const ProductScene = lazy(() => import("@/components/three/ProductScene"));

export default function FlagshipProduct() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setError("Enter a valid email address");
      setStatus("error");
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem("creoai_waitlist") || "[]");
      if (!list.includes(v)) list.push(v);
      localStorage.setItem("creoai_waitlist", JSON.stringify(list));
      localStorage.setItem("creoai_waitlist_last", v);
    } catch {}
    setStatus("success");
    setError("");
  };

  return (
    <section id="product" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-5">— 03 / FLAGSHIP</div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/40 text-lime font-mono text-[10px] tracking-[0.2em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" /> Coming soon
            </div>
            <h2 className="text-display-2 font-display font-semibold tracking-tighter text-bone text-balance">
              Creoai Studio — a website automation platform for developers.
            </h2>
            <p className="mt-6 text-fog text-body-lg max-w-xl">
              Design, build and deploy production websites with an AI-native workflow. Visual flows meet deterministic code — no lock-in, no magic.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                { Icon: Box, t: "Visual workflow → code", d: "Compose flows that output clean, typed, editable components." },
                { Icon: Sparkle, t: "AI-assisted components", d: "Generate, refactor and review with a model that understands your design system." },
                { Icon: Rocket, t: "One-click deploy", d: "Branch-aware deploys, previews, and instant rollback on a global edge." },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 w-9 h-9 rounded-full border border-graphite flex items-center justify-center text-bone">
                    <f.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-bone font-medium tracking-tight">{f.t}</div>
                    <div className="text-sm text-fog">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={submit} className="mt-10 max-w-md" data-testid="waitlist-form">
              <label className="eyebrow block mb-3">— Join the waitlist</label>
              <div className={`flex items-center gap-2 border ${status === "error" ? "border-err" : "border-graphite focus-within:border-bone"} rounded-full px-2 pl-5 h-14 bg-obsidian transition-colors`}>
                <Terminal className="w-4 h-4 text-steel" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent outline-none text-bone placeholder:text-steel text-sm font-mono"
                  data-testid="waitlist-email"
                />
                <button type="submit" data-testid="waitlist-submit" className="inline-flex items-center gap-1 h-10 px-4 rounded-full bg-lime text-ink text-sm font-medium tracking-tight hover:brightness-95 transition">
                  {status === "success" ? "Added" : "Join"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 min-h-[20px] text-xs font-mono tracking-wide">
                {status === "error" && <span className="text-err">{error}</span>}
                {status === "success" && (
                  <span className="text-ok inline-flex items-center gap-1" data-testid="waitlist-success"><Check className="w-3.5 h-3.5" /> You're on the list. We'll be in touch.</span>
                )}
                {status === "idle" && <span className="text-steel">No spam. Unsubscribe anytime.</span>}
              </div>
            </form>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full border border-graphite bg-obsidian overflow-hidden">
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-b border-graphite">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">creoai-studio // preview</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">v0.0.1</span>
              </div>
              <Suspense fallback={<div className="absolute inset-0" />}>
                <ProductScene />
              </Suspense>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-t border-graphite font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-steel">rotate · scroll</span>
                <span className="text-lime">READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
