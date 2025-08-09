"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import DownloadSection from "./components/DownloadSection";
import VideoPromo from "./components/VideoPromo";
import FooterSection from "./components/FooterSection";

export default function Home() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Section data
  const sections = [
    { id: "header", component: <Header /> },
    { id: "features", component: <FeaturesSection /> },
    { id: "pricing", component: <PricingSection /> },
    { id: "download", component: <DownloadSection /> },
    { id: "video", component: <VideoPromo /> },
    { id: "footer", component: <FooterSection /> },
  ];

  // Handle scroll events for section detection
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 0;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.3;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          const scrollPosition = window.scrollY;

          if (
            scrollPosition >= sectionTop - threshold &&
            scrollPosition < sectionBottom - threshold
          ) {
            currentSection = index;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section using native smooth scroll
  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Navigation bullets */}
      <div
        ref={bulletsRef}
        className="fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-5"
      >
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
              activeSection === index
                ? "bg-blue-600 scale-125 ring-2 ring-blue-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to section ${index + 1}`}
          >
            {activeSection === index && (
              <span className="absolute w-2 h-2 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Main container */}
      <div className="overflow-x-hidden scroll-smooth">
        <Navbar />

        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionsRef.current[index] = el;
            }}
            id={section.id}
            className={`min-h-screen w-full relative ${
              index !== sections.length - 1 ? "pb-20" : ""
            }`}
          >
            {section.component}
          </section>
        ))}
      </div>
    </>
  );
}
