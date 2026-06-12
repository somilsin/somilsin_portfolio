import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { StatusBar } from "@/components/StatusBar";
import { ChaptersGallery } from "@/components/ChaptersGallery";
import { ResearchProjects } from "@/components/ResearchProjects";
import { PhoneMockup } from "@/components/PhoneMockup";
import { MethodologySection } from "@/components/MethodologySection";
import { EntryLog } from "@/components/EntryLog";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Somil Singh — Engineer of agentic systems & cosmic curiosities" },
      { name: "description", content: "Associate Software Engineer at Oracle. RAG, agentic AI, full-stack craft, satellite payload electronics. State-level footballer, ELO 1340 chess player, guitarist." },
      { property: "og:title", content: "Somil Singh — Portfolio" },
      { property: "og:description", content: "Oracle ASE. Agentic AI, RAG & context engineering. Six chapters across engineering, sport, music and the cosmos." },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(true);
  const [showBoot, setShowBoot] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("somil-booted")) return;
    sessionStorage.setItem("somil-booted", "1");
    setBooted(false);
    setShowBoot(true);
  }, []);
  return (
    <>
      {showBoot && !booted && <BootSequence onDone={() => setBooted(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <StatusBar />
      <main>
        <Hero />
        <ChaptersGallery />
        <PhoneMockup />
        <MethodologySection />
        <EntryLog />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
