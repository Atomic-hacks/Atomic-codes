"use client";
import Approach from "@/components/Approach";
import PortfolioDescription from "@/components/Description";
import { Hero } from "@/components/Hero";
import ProjectsComponent from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed background image with low opacity */}
      <div
        className="fixed inset-0 bg-blend-hard-light bg-cover bg-center bg-no-repeat bg-fixed opacity-30 -z-10"
        style={{
          backgroundImage: "url('/nois.jpg')",
        }}
      />

      {/* Scrollable content with navigation sections */}
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen">
        <PortfolioDescription />
      </section>

      {/* Work/Projects Section */}
      <section id="work" className="min-h-screen">
        <ProjectsComponent />
      </section>

      {/* Approach Section */}
      <section id="approach" className="min-h-screen">
        <Approach />
      </section>
    </main>
  );
}