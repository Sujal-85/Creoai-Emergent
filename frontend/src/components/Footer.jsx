import React from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-graphite bg-ink text-bone">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-lime" />
              <span className="font-display text-xl font-semibold tracking-tight">Creoai</span>
            </div>
            <p className="text-fog max-w-sm text-body leading-relaxed">Creativity of AI. We build the automation layer between human ambition and machine execution.</p>
            <div className="flex items-center gap-3 mt-8">
              {[
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} aria-label={label} data-cursor-label={label} className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center text-fog hover:text-bone hover:border-bone transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Services", links: ["Websites", "Apps", "Automations", "SEO", "Ads", "Consultancy"] },
            { title: "Company", links: ["About", "Work", "Careers", "Press"] },
            { title: "Resources", links: ["Blog", "Guides", "Changelog", "Status"] },
          ].map((col, idx) => (
            <div key={idx}>
              <div className="eyebrow mb-5">— {col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={i}><a href="#" className="text-sm text-fog hover:text-bone transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Huge outlined CREOAI wordmark */}
        <div className="mt-20 select-none" aria-hidden="true">
          <svg viewBox="0 0 1600 220" className="w-full h-auto">
            <text x="50%" y="82%" textAnchor="middle" fill="none" stroke="#1C1C1F" strokeWidth="2" fontFamily="Geist, Inter, sans-serif" fontWeight="700" fontSize="260" letterSpacing="-8">CREOAI</text>
          </svg>
        </div>

        <div className="mt-10 pt-6 border-t border-graphite flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-steel">© 2025 Creoai · Built with intent</div>
          <div className="flex items-center gap-5 text-xs text-fog">
            <a href="#" className="hover:text-bone transition-colors">Privacy</a>
            <a href="#" className="hover:text-bone transition-colors">Terms</a>
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-bone transition-colors">hello@creoai.studio <ArrowUpRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
