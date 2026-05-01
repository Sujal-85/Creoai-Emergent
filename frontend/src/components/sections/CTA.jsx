import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import SectionHeading from "@/components/SectionHeading";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus("error"); return; }
    try {
      const list = JSON.parse(localStorage.getItem("creoai_inquiries") || "[]");
      list.push({ email: email.trim(), msg: msg.trim(), ts: Date.now(), source: "cta-home" });
      localStorage.setItem("creoai_inquiries", JSON.stringify(list));
    } catch {}
    setStatus("success");
  };

  return (
    <section id="contact" className="relative bg-ink border-t border-graphite">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="eyebrow mb-8">— 10 / CONTACT</div>
        <SectionHeading
          title={"Let\u2019s build something inevitable."}
          className="max-w-5xl"
          size="display-1"
        />
        <p className="mt-8 text-fog text-body-lg max-w-2xl">Tell us what you're shipping. We'll come back within one business day with a sharp point of view — or a polite decline.</p>

        <form onSubmit={submit} className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-4xl" data-testid="cta-form">
          <div className="md:col-span-5">
            <label className="eyebrow block mb-3">— Email</label>
            <input
              type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
              data-testid="cta-email"
              placeholder="you@company.com"
              className="w-full h-14 px-4 bg-transparent border border-graphite rounded-none text-bone placeholder:text-steel text-sm font-mono outline-none focus:border-bone transition-colors"
            />
          </div>
          <div className="md:col-span-7">
            <label className="eyebrow block mb-3">— Project brief</label>
            <input
              type="text" value={msg} onChange={(e) => setMsg(e.target.value)}
              data-testid="cta-brief"
              placeholder="e.g. Rebuild marketing site + automate leads"
              className="w-full h-14 px-4 bg-transparent border border-graphite rounded-none text-bone placeholder:text-steel text-sm font-mono outline-none focus:border-bone transition-colors"
            />
          </div>
          <div className="md:col-span-12 flex items-center gap-4 mt-2">
            <MagneticButton as="button" type="submit" data-testid="cta-submit" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-lime text-ink font-medium tracking-tight text-sm">
              Send inquiry <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <div className="text-xs font-mono text-steel">
              {status === "success" && <span className="text-ok inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Received. We'll be in touch.</span>}
              {status === "error" && <span className="text-err">Enter a valid email.</span>}
              {status === "idle" && <span>Or email hello@creoai.studio</span>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
