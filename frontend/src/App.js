import React, { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Consultancy from "@/pages/Consultancy";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import { initLenis, destroyLenis, scrollTo } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

function AppShell({ theme, toggleTheme }) {
  const loc = useLocation();

  // Scroll to top (or #hash) on route change
  useEffect(() => {
    if (loc.hash) {
      const id = loc.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => scrollTo(el, { offset: -80, immediate: false }), 300);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
    // Refresh triggers on route change
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [loc.pathname, loc.hash]);

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(() => {
    try { return sessionStorage.getItem("creoai_seen_loader") === "1"; } catch { return false; }
  });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("creoai_theme") || "dark"; } catch { return "dark"; }
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(theme);
    try { localStorage.setItem("creoai_theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    // Init Lenis only after loader completes to avoid fighting with mask animations
    if (!loaderDone) return;
    initLenis();
    // Ensure ScrollTrigger recomputes after init
    setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => { destroyLenis(); };
  }, [loaderDone]);

  return (
    <div className="App grain relative min-h-screen">
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <CustomCursor />
      <BrowserRouter>
        <AppShell theme={theme} toggleTheme={toggleTheme} />
      </BrowserRouter>
    </div>
  );
}
