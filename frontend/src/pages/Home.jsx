import React from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FlagshipProduct from "@/components/sections/FlagshipProduct";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import VisionMission from "@/components/sections/VisionMission";
import Consultancy from "@/components/sections/Consultancy";
import Stats from "@/components/sections/Stats";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <FlagshipProduct />
      <Process />
      <Work />
      <VisionMission />
      <Consultancy />
      <Stats />
      <FAQ />
      <CTA />
    </main>
  );
}
