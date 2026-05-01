import React, { useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Clock } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const setField = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setStatus("idle"); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Valid email";
    if (!form.message.trim() || form.message.trim().length < 12) e.message = "Tell us a bit more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) { setStatus("error"); return; }
    try {
      const list = JSON.parse(localStorage.getItem("creoai_inquiries") || "[]");
      list.push({ ...form, ts: Date.now(), source: "contact-page" });
      localStorage.setItem("creoai_inquiries", JSON.stringify(list));
    } catch {}
    setStatus("success");
    setForm({ name: "", email: "", company: "", budget: "", message: "" });
  };

  const Field = ({ id, label, ...rest }) => (
    <div>
      <label htmlFor={id} className="eyebrow block mb-3">— {label}</label>
      <input id={id} {...rest} className={`w-full h-14 px-4 bg-transparent border rounded-none text-bone placeholder:text-steel text-sm font-mono outline-none transition-colors ${errors[id] ? "border-err" : "border-graphite focus:border-bone"}`} />
      {errors[id] && <div className="mt-2 text-[11px] font-mono text-err">{errors[id]}</div>}
    </div>
  );

  return (
    <main className="pt-[72px] bg-ink">
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="eyebrow mb-6">— CONTACT</div>
        <h1 className="font-display font-semibold text-bone tracking-tightest text-display-1 text-balance max-w-[22ch]">Tell us what you're building.</h1>
        <p className="mt-8 text-fog text-body-lg max-w-2xl">We reply within one business day with a direct, honest take — and a plan when we can help.</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="contact-form">
              <Field id="name" label="Name" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Ada Lovelace" data-testid="contact-name" />
              <Field id="email" label="Email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="ada@company.com" data-testid="contact-email" />
              <Field id="company" label="Company" value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder="Optional" data-testid="contact-company" />
              <div>
                <label htmlFor="budget" className="eyebrow block mb-3">— Budget</label>
                <select id="budget" value={form.budget} onChange={(e) => setField("budget", e.target.value)} data-testid="contact-budget" className="w-full h-14 px-4 bg-transparent border border-graphite rounded-none text-bone text-sm font-mono outline-none focus:border-bone transition-colors">
                  <option value="">Select range</option>
                  <option>$5k – $15k</option>
                  <option>$15k – $50k</option>
                  <option>$50k – $150k</option>
                  <option>$150k+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="eyebrow block mb-3">— Project brief</label>
                <textarea id="message" rows={6} value={form.message} onChange={(e) => setField("message", e.target.value)} data-testid="contact-message" placeholder="What are we solving? Timeline, constraints, success metrics." className={`w-full px-4 py-4 bg-transparent border rounded-none text-bone placeholder:text-steel text-sm font-mono outline-none transition-colors resize-none ${errors.message ? "border-err" : "border-graphite focus:border-bone"}`} />
                {errors.message && <div className="mt-2 text-[11px] font-mono text-err">{errors.message}</div>}
              </div>
              <div className="md:col-span-2 flex items-center gap-4 mt-2">
                <MagneticButton as="button" type="submit" data-testid="contact-submit" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-lime text-ink font-medium tracking-tight text-sm">
                  Send inquiry <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
                <div className="text-xs font-mono text-steel">
                  {status === "success" && <span className="text-ok inline-flex items-center gap-1" data-testid="contact-success"><Check className="w-3.5 h-3.5" /> Received. We'll be in touch.</span>}
                  {status === "error" && <span className="text-err">Fix highlighted fields.</span>}
                  {status === "idle" && <span>We read every message personally.</span>}
                </div>
              </div>
            </form>
          </div>
          <aside className="md:col-span-4 border-t md:border-t-0 md:border-l border-graphite md:pl-10 pt-10 md:pt-0">
            <div className="space-y-8">
              <div>
                <div className="eyebrow mb-3">— Direct</div>
                <a href="mailto:hello@creoai.studio" className="inline-flex items-center gap-2 text-bone hover:text-lime transition-colors"><Mail className="w-4 h-4" /> hello@creoai.studio</a>
              </div>
              <div>
                <div className="eyebrow mb-3">— Studio</div>
                <div className="inline-flex items-center gap-2 text-bone"><MapPin className="w-4 h-4" /> Remote · Global</div>
              </div>
              <div>
                <div className="eyebrow mb-3">— Response time</div>
                <div className="inline-flex items-center gap-2 text-bone"><Clock className="w-4 h-4" /> Within 24 hours</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
