import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { scrollTo } from "@/lib/lenis";

export default function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const goToSection = (id) => {
    if (loc.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) scrollTo(el, { offset: -80 });
    setOpen(false);
  };

  const Links = ({ mobile = false, onNavigate }) => (
    <>
      {[
        { label: "Services", id: "services" },
        { label: "Product", id: "product" },
        { label: "Work", id: "work" },
        { label: "About", id: "about" },
      ].map((l) => (
        <button
          key={l.id}
          data-testid={`nav-${l.id}`}
          data-cursor-label={l.label}
          onClick={() => onNavigate ? onNavigate(l.id) : goToSection(l.id)}
          className={`${mobile ? "block text-5xl font-display font-semibold tracking-tighter text-bone py-3" : "text-sm text-fog hover:text-bone transition-colors"}`}
        >
          {l.label}
        </button>
      ))}
      <Link to="/consultancy" data-testid="nav-consultancy" className={mobile ? "block text-5xl font-display font-semibold tracking-tighter text-bone py-3" : "text-sm text-fog hover:text-bone transition-colors"}>
        Consultancy
      </Link>
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? "bg-obsidian/80 backdrop-blur-md border-b border-graphite" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="max-w-[1440px] mx-auto h-[72px] px-6 md:px-10 flex items-center justify-between">
          <Link to="/" data-testid="nav-home" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span className="font-display text-[17px] font-semibold tracking-tight text-bone">Creoai</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-steel uppercase ml-2 hidden sm:inline">v1.0</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Links />
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              data-testid="nav-theme-toggle"
              className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center text-fog hover:text-bone hover:border-bone transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <MagneticButton as="button" className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-bone text-ink text-sm font-medium tracking-tight hover:bg-white transition-colors" data-testid="nav-book-call" onClick={() => { window.location.href = "/contact"; }}>
              Book a Call <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button aria-label="Toggle theme" onClick={toggleTheme} data-testid="nav-theme-toggle-mobile" className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center text-fog">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button aria-label="Open menu" data-testid="nav-menu-open" onClick={() => setOpen(true)} className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center">
              <Menu className="w-5 h-5 text-bone" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-ink text-bone transition-[clip-path] duration-500 ${open ? "" : "pointer-events-none"}`}
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-graphite">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span className="font-display text-[17px] font-semibold tracking-tight text-bone">Creoai</span>
          </div>
          <button aria-label="Close menu" data-testid="nav-menu-close" onClick={() => setOpen(false)} className="w-10 h-10 rounded-full border border-graphite flex items-center justify-center">
            <X className="w-5 h-5 text-bone" />
          </button>
        </div>
        <div className="px-6 pt-10 pb-16 flex flex-col gap-2">
          <Links mobile onNavigate={(id) => { setOpen(false); setTimeout(() => goToSection(id), 300); }} />
          <Link to="/contact" data-testid="nav-contact-mobile" className="mt-6 inline-flex items-center justify-between px-5 py-4 rounded-full bg-bone text-ink text-sm font-medium tracking-tight">Book a Call <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </>
  );
}
