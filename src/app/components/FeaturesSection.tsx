"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("FeaturesSection");

  // Memoized features data
  const features = useMemo(
    () => [
      {
        id: 1,
        title: t("features.absence.title"),
        subtitle: t("features.absence.subtitle"),
        description: t("features.absence.description"),
        color: "from-[#22488F] to-[#3A6FD8]",
        accentColor: "blue-600",
        gradient: "from-blue-50 to-indigo-50",
        icon: "📋",
      },
      {
        id: 2,
        title: t("features.tracking.title"),
        subtitle: t("features.tracking.subtitle"),
        description: t("features.tracking.description"),
        color: "from-[#1A3C7A] to-[#22488F]",
        accentColor: "blue-700",
        gradient: "from-blue-100 to-blue-50",
        icon: "📍",
      },
      {
        id: 3,
        title: t("features.notifications.title"),
        subtitle: t("features.notifications.subtitle"),
        description: t("features.notifications.description"),
        color: "from-[#22488F] to-[#4A90E2]",
        accentColor: "blue-500",
        gradient: "from-blue-50 to-sky-50",
        icon: "🔔",
      },
      {
        id: 4,
        title: t("features.communication.title"),
        subtitle: t("features.communication.subtitle"),
        description: t("features.communication.description"),
        color: "from-[#1A3C7A] to-[#3A6FD8]",
        accentColor: "blue-800",
        gradient: "from-blue-50 to-indigo-100",
        icon: "💬",
      },
    ],
    [t]
  );

  // Memoized stats data
  const stats = useMemo(
    () => [
      { number: "1000+", label: t("stats.families"), icon: "👨‍👩‍👧‍👦" },
      { number: "50+", label: t("stats.schools"), icon: "🏫" },
      { number: "24/7", label: t("stats.service"), icon: "⏰" },
      { number: "99.9%", label: t("stats.uptime"), icon: "🚀" },
    ],
    [t]
  );

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px", // slight optimization
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Animation with GSAP
  useEffect(() => {
    if (isVisible && sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll(".feature-card"), {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(sectionRef.current.querySelectorAll(".stats-card"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        delay: 0.6,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#22488F]/10 to-[#3A6FD8]/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-[#22488F]/10 to-[#4A90E2]/10 rounded-full blur-3xl will-change-transform" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#22488F]/10 to-[#3A6FD8]/10 backdrop-blur-sm border border-[#22488F]/30 text-[#22488F] text-sm font-medium mb-6 will-change-transform">
            <div className="w-2 h-2 bg-[#22488F] rounded-full mr-2 animate-pulse" />
            {t("header.badge")}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-[#22488F] to-[#3A6FD8] bg-clip-text text-transparent will-change-transform">
              {t("header.title")}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed will-change-transform">
            {t("header.description")}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-card group relative p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 will-change-transform ${
                activeFeature === index
                  ? `bg-gradient-to-r ${feature.gradient} shadow-lg border-${feature.accentColor} scale-105`
                  : "bg-white shadow-sm border border-gray-200 hover:shadow-md"
              }`}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
              aria-label={feature.title}
            >
              <div
                className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-1 mb-6 transition-transform duration-300 group-hover:scale-110 will-change-transform`}
              >
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center text-2xl will-change-transform">
                  {feature.icon}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  {feature.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {activeFeature === index && (
                <div className="absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 will-change-transform" />
              )}
            </div>
          ))}
        </div>

        {/* Active feature details */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto will-change-transform">
          <div
            className={`h-2 bg-gradient-to-r ${features[activeFeature].color} will-change-transform`}
          />
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${features[activeFeature].color} mr-3 will-change-transform`}
              />
              <h3 className="text-xl font-bold text-gray-900">
                {features[activeFeature].title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {features[activeFeature].description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stats-card text-center p-4 md:p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-500 transform hover:scale-105 will-change-transform`}
            >
              <div className="text-2xl md:text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#22488F] to-[#3A6FD8] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            className="relative px-8 py-4 bg-gradient-to-r from-[#22488F] to-[#3A6FD8] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105 will-change-transform"
            aria-label={t("cta")}
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="ml-2 text-xl">🚀</span>
              {t("cta")}
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300 will-change-opacity" />
          </button>
        </div>
      </div>

      {/* Optimized SVG wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#fff"
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            fill="#fff"
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path
            fill="#fff"
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default FeaturesSection;
