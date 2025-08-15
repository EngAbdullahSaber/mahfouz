"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// Define types for the feature data
interface FeatureTitle {
  ar: string;
  en: string;
  tk: string;
}

interface FeatureData {
  id: string;
  title: FeatureTitle;
  subTitle: FeatureTitle;
  description: FeatureTitle;
  createdAt: string;
  updatedAt: string;
}

interface FeaturesSectionProps {
  featureData: FeatureData[];
  data: any; // The section data from the parent component
}

const FeaturesSection = ({ featureData, data }: FeaturesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const t = useTranslations("FeaturesSection");
  const { locale } = useParams();

  // Helper function to get localized text - memoized
  const getLocalizedText = useCallback(
    (textObj: FeatureTitle) => {
      if (!textObj) return "";
      const currentLocale = Array.isArray(locale) ? locale[0] : locale || "en";
      return textObj[currentLocale as keyof FeatureTitle] || textObj.en || "";
    },
    [locale]
  );

  // Memoized features data with enhanced styling
  const features = useMemo(() => {
    const colorSchemes = [
      {
        color: "from-[#22488F] to-[#3A6FD8]",
        accentColor: "#22488F",
        gradient: "from-blue-50 to-indigo-50",
        hoverGradient: "from-blue-100 to-indigo-100",
        icon: "📋",
        shadowColor: "shadow-blue-500/20",
        glowColor: "before:bg-blue-500/10",
      },
      {
        color: "from-[#1A3C7A] to-[#22488F]",
        accentColor: "#1A3C7A",
        gradient: "from-blue-100 to-blue-50",
        hoverGradient: "from-blue-200 to-blue-100",
        icon: "📍",
        shadowColor: "shadow-blue-700/20",
        glowColor: "before:bg-blue-700/10",
      },
      {
        color: "from-[#22488F] to-[#4A90E2]",
        accentColor: "#4A90E2",
        gradient: "from-blue-50 to-sky-50",
        hoverGradient: "from-blue-100 to-sky-100",
        icon: "🔔",
        shadowColor: "shadow-sky-500/20",
        glowColor: "before:bg-sky-500/10",
      },
      {
        color: "from-[#1A3C7A] to-[#3A6FD8]",
        accentColor: "#3A6FD8",
        gradient: "from-blue-50 to-indigo-100",
        hoverGradient: "from-blue-100 to-indigo-200",
        icon: "💬",
        shadowColor: "shadow-indigo-500/20",
        glowColor: "before:bg-indigo-500/10",
      },
    ];

    return (
      featureData?.map((feature, index) => ({
        id: feature.id,
        title: getLocalizedText(feature.title),
        subtitle: getLocalizedText(feature.subTitle),
        description: getLocalizedText(feature.description),
        ...colorSchemes[index % colorSchemes.length],
      })) || []
    );
  }, [featureData, getLocalizedText]);

  // Memoized stats data with enhanced icons
  const stats = useMemo(
    () => [
      {
        number: "1000+",
        label: t("stats.families"),
        icon: "👨‍👩‍👧‍👦",
        color: "#22488F",
        delay: "0s",
      },
      {
        number: "50+",
        label: t("stats.schools"),
        icon: "🏫",
        color: "#1A3C7A",
        delay: "0.1s",
      },
      {
        number: "24/7",
        label: t("stats.service"),
        icon: "⏰",
        color: "#4A90E2",
        delay: "0.2s",
      },
      {
        number: "99.9%",
        label: t("stats.uptime"),
        icon: "🚀",
        color: "#3A6FD8",
        delay: "0.3s",
      },
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
        threshold: 0.2,
        rootMargin: "50px",
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

  // Auto-rotate active feature
  useEffect(() => {
    if (features.length === 0) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  // Optimized event handlers
  const handleFeatureClick = useCallback((index: number) => {
    setActiveFeature(index);
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Loading state
  if (!data || !featureData) {
    return (
      <section
        id="features"
        className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50/30"
    >
      {/* Optimized Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#22488F]/8 to-[#3A6FD8]/8 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-[#22488F]/8 to-[#4A90E2]/8 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-[#22488F]/5 via-transparent to-[#3A6FD8]/5 rounded-full blur-2xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section header */}
        <div
          className={`text-center mb-16 md:mb-24 max-w-4xl mx-auto transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#22488F]/10 to-[#3A6FD8]/10 backdrop-blur-sm border border-[#22488F]/20 text-[#22488F] text-sm font-semibold mb-8 hover:scale-105 transition-transform duration-300 shadow-lg">
            <div className="w-2 h-2 bg-[#22488F] rounded-full mr-3 animate-pulse" />
            {t("header.badge")}
            <div className="ml-2 text-xs opacity-75">✨</div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-[#22488F] to-[#3A6FD8] bg-clip-text text-transparent hover:scale-105 inline-block transition-transform duration-300">
              {getLocalizedText(data.title)}
            </span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {getLocalizedText(data.subTitle)}
          </p>
        </div>

        {/* Enhanced Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative p-6 md:p-8 rounded-3xl transition-all duration-500 cursor-pointer transform-gpu will-change-transform ${
                activeFeature === index
                  ? `bg-gradient-to-br ${feature.hoverGradient} shadow-2xl ${feature.shadowColor} scale-105 border-2`
                  : hoveredCard === index
                  ? `bg-gradient-to-br ${feature.gradient} shadow-xl hover:shadow-2xl scale-102 border border-gray-200`
                  : "bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-100 hover:scale-102"
              }`}
              style={{
                borderColor:
                  activeFeature === index ? feature.accentColor : undefined,
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => handleFeatureClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              aria-label={feature.title}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.glowColor} blur-xl`}
                style={{ zIndex: -1 }}
              />

              {/* Icon container with enhanced styling */}
              <div className="relative mb-6">
                <div
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${feature.color} p-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                >
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-inner">
                    <span className="transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                  </div>
                </div>

                {/* Active indicator */}
                {activeFeature === index && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm md:text-base font-medium text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {feature.subtitle}
                </p>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  feature.color
                } rounded-b-3xl transition-all duration-500 ${
                  activeFeature === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-60"
                }`}
              />

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <div className="w-8 h-8 border-2 border-dashed border-current rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Active feature details */}
        {features.length > 0 && (
          <div
            className="max-w-5xl mx-auto mb-16 transform transition-all duration-700"
            key={activeFeature} // Force re-render for smooth transitions
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Gradient top bar */}
              <div
                className={`h-2 bg-gradient-to-r ${features[activeFeature].color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${features[activeFeature].color} mr-4 animate-pulse`}
                  />
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {features[activeFeature].title}
                  </h3>
                  <div className="ml-4 px-4 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold rounded-full">
                    Active
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-6">
                  {features[activeFeature].description}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">💡</span>
                  <span>
                    Feature {activeFeature + 1} of {features.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced SVG wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22488F" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3A6FD8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4A90E2" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".3"
          />
          <path
            fill="#fff"
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".7"
          />
          <path
            fill="#fff"
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .scale-102 {
          transform: scale(1.02);
        }

        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
