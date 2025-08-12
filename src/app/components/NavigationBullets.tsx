// components/NavigationBullets.tsx (Client Component)
"use client";
import { useState, useEffect, useCallback } from "react";

interface Section {
  id: string;
  name: string;
}

interface NavigationBulletsProps {
  sections: Section[];
}

export default function NavigationBullets({
  sections,
}: NavigationBulletsProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Handle section activation from ScrollManager
  const handleSectionActive = useCallback(
    (event: CustomEvent) => {
      const { index } = event.detail;
      if (index !== -1 && index !== activeSection) {
        setActiveSection(index);
      }
    },
    [activeSection]
  );

  // Handle scroll visibility (hide bullets when scrolling fast)
  const handleOptimizedScroll = useCallback(() => {
    setIsVisible(false);

    // Show bullets again after scrolling stops
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section handler
  const scrollToSection = useCallback(
    (index: number) => {
      const sectionId = sections[index]?.id;
      if (sectionId) {
        const event = new CustomEvent("scrollToSection", {
          detail: { sectionId },
        });
        window.dispatchEvent(event);
        setActiveSection(index);
      }
    },
    [sections]
  );

  useEffect(() => {
    // Listen to section activation events
    window.addEventListener(
      "sectionActive",
      handleSectionActive as EventListener
    );

    // Listen to scroll events for visibility optimization
    window.addEventListener(
      "optimizedScroll",
      handleOptimizedScroll as EventListener
    );

    return () => {
      window.removeEventListener(
        "sectionActive",
        handleSectionActive as EventListener
      );
      window.removeEventListener(
        "optimizedScroll",
        handleOptimizedScroll as EventListener
      );
    };
  }, [handleSectionActive, handleOptimizedScroll]);

  return (
    <div
      className={`fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-5 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-70 -translate-x-2"
      }`}
      role="navigation"
      aria-label="Page navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
            activeSection === index
              ? "bg-blue-600 scale-125 ring-2 ring-blue-400 shadow-lg"
              : "bg-gray-300 hover:bg-gray-400 hover:shadow-md"
          }`}
          aria-label={`Go to ${section.name} section`}
          aria-current={activeSection === index ? "true" : "false"}
        >
          {activeSection === index && (
            <span
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              aria-hidden="true"
            />
          )}
        </button>
      ))}

      {/* Progress indicator */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-px h-12 bg-gray-300 relative">
          <div
            className="w-px bg-blue-600 absolute top-0 left-0 transition-all duration-500 ease-out"
            style={{
              height: `${((activeSection + 1) / sections.length) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs text-gray-500 mt-2 font-medium">
          {activeSection + 1}/{sections.length}
        </span>
      </div>
    </div>
  );
}
