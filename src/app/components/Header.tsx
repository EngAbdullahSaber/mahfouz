"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

interface HeroData {
  id: string;
  sectionName: string;
  pageName: string;
  title: {
    ar: string;
    en: string;
    tk: string;
  };
  subTitle: {
    ar: string;
    en: string;
    tk: string;
  };
  description: {
    ar: string;
    en: string;
    tk: string;
  };
  subDescription: null;
  image: string;
  images: never[];
  links: null;
  meta: null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeaderProps {
  data: HeroData[];
}

const Header = ({ data }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const t = useTranslations("Header");
  const { locale } = useParams();

  // Get current locale as string, with fallback
  const currentLocale = useMemo(
    () => (Array.isArray(locale) ? locale[0] : locale || "en"),
    [locale]
  );

  // Color definitions - memoized
  const primaryColor = "#22488F";
  const gradientColors = useMemo(
    () => ({
      light: "from-blue-50 to-indigo-50",
      medium: "from-blue-100 to-indigo-100",
      strong: `from-[#22488F] to-[#1A3A75]`,
    }),
    []
  );

  // Find hero section data - memoized
  const heroSection = useMemo(
    () => data?.find((section) => section.sectionName === "hero"),
    [data]
  );

  // Helper function to get localized content - memoized
  const getLocalizedContent = useCallback(
    (content: { ar: string; en: string; tk: string }) => {
      if (!content) return "";
      return content[currentLocale as keyof typeof content] || content.en || "";
    },
    [currentLocale]
  );

  // Optimized scroll handler with intersection observer fallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;

    // Only update if scroll difference is significant (reduces renders)
    if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;

      // Optimize visibility for performance
      setIsVisible(currentScrollY < window.innerHeight * 1.5);
    });
  }, []);

  useEffect(() => {
    // Passive scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        handleScroll();
        ticking = false;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Intersection Observer for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  // Memoized feature cards
  const featureCards = useMemo(
    () => [
      {
        icon: "📍",
        text: t("features.realTimeTracking"),
        bgColor: "bg-[#22488F]",
        delay: 0,
      },
      {
        icon: "🔔",
        text: t("features.smartAlerts"),
        bgColor: "bg-[#22488F]/90",
        delay: 100,
      },
      {
        icon: "💬",
        text: t("features.directCommunication"),
        bgColor: "bg-[#22488F]/80",
        delay: 200,
      },
      {
        icon: "🏫",
        text: t("features.dashboard"),
        bgColor: "bg-[#22488F]/70",
        delay: 300,
      },
    ],
    [t]
  );

  // Memoized stats data
  const statsData = useMemo(
    () => [
      { value: "100%", label: t("stats.safety"), color: primaryColor },
      { value: "24/7", label: t("stats.monitoring"), color: primaryColor },
      { value: "1000+", label: t("stats.families"), color: primaryColor },
    ],
    [t]
  );

  // Memoized title processing
  const titleData = useMemo(() => {
    const titleText = getLocalizedContent(
      heroSection?.title || { ar: "", en: "Mahfouz", tk: "" }
    );
    const titleParts = titleText.split("—").map((part) => part.trim());
    return { titleText, titleParts };
  }, [heroSection?.title, getLocalizedContent]);

  // Memoized transform calculations for performance
  const transforms = useMemo(
    () => ({
      backgroundElements: {
        element1: `rotate(${45 + scrollY * 0.02}deg) translateY(${
          scrollY * 0.1
        }px)`,
        element2: `translateY(${scrollY * -0.05}px)`,
        element3: `scale(${1 + scrollY * 0.0005}) translateY(${
          scrollY * 0.08
        }px)`,
        element4: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`,
      },
      statusBadge: Math.max(0.7, 1 - scrollY / 600),
      phoneContainer: `translateY(${scrollY * -0.1}px)`,
    }),
    [scrollY]
  );

  // Scroll to next section
  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      ref={headerRef}
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientColors.medium}`}
      style={{ "--primary-color": primaryColor } as React.CSSProperties}
    >
      {/* Optimized Background Elements - Only render when visible */}
      {isVisible && (
        <div className="absolute inset-0 will-change-transform">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-[#22488F]/20 rotate-45 transform-gpu"
            style={{ transform: transforms.backgroundElements.element1 }}
          />
          <div
            className="absolute top-1/4 right-0 w-80 h-80 bg-[#22488F]/15 transform-gpu"
            style={{
              clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 80%)",
              transform: transforms.backgroundElements.element2,
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#22488F]/10 rounded-full transform-gpu"
            style={{ transform: transforms.backgroundElements.element3 }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${primaryColor}20, transparent)`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: transforms.backgroundElements.element4,
            }}
          />
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content Section */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            {/* Status Badge */}
            <div
              className="inline-flex items-center animate-slide-in-right"
              style={{
                opacity: transforms.statusBadge,
                animationDelay: "0.2s",
              }}
            >
              <div className="bg-[#22488F] text-white px-6 py-3 rounded-full shadow-lg transform hover:rotate-3 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">
                    {titleData.titleParts[1] || "Safer, Smarter School Rides"}
                  </span>
                </div>
              </div>
            </div>

            {/* Optimized Title Section */}
            <div
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none text-gray-900">
                  {titleData.titleParts.length > 1 ? (
                    <>
                      <span
                        className="block transform hover:rotate-2 transition-transform duration-300 origin-right"
                        style={{ color: primaryColor }}
                      >
                        {titleData.titleParts[0]}
                      </span>
                      <span className="block transform text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl hover:-rotate-2 transition-transform duration-300 origin-left">
                        {titleData.titleParts[1]}
                      </span>
                    </>
                  ) : (
                    <span className="block transform hover:-rotate-3 transition-transform duration-300 origin-left">
                      {titleData.titleText}
                    </span>
                  )}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className="h-1 w-16 transform hover:w-24 transition-all duration-300 hover:rotate-2"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>

            {/* Description */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 leading-relaxed max-w-2xl transform hover:rotate-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md">
                {getLocalizedContent(
                  heroSection?.description || { ar: "", en: "", tk: "" }
                )}
              </h3>
            </div>

            {/* Feature Cards - Using memoized data with staggered animation */}
            <div
              className="grid grid-cols-2 gap-4 max-w-lg animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              {featureCards.map((feature, index) => (
                <div
                  key={index}
                  className={`relative p-4 ${feature.bgColor} text-white rounded-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-3 shadow-lg hover:shadow-xl will-change-transform animate-fade-in-up`}
                  style={{
                    transform: `rotate(${
                      index % 2 === 0 ? "2deg" : "-1deg"
                    }) translateY(${scrollY * 0.01 * (index + 1)}px)`,
                    animationDelay: `${0.9 + index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl sm:text-3xl transform hover:scale-125 transition-transform duration-200">
                      {feature.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-center">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-up"
              style={{ animationDelay: "1.3s" }}
            >
              <button
                className="group relative px-6 sm:px-8 py-4 text-white font-bold rounded-2xl text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-rotate-1 overflow-hidden will-change-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-xl sm:text-2xl">📱</span>
                  {t("buttons.download")}
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              <button className="group px-6 sm:px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1 will-change-transform hover:border-[#22488F]">
                <span className="flex items-center justify-center">
                  <span className="mr-3 text-xl sm:text-2xl">▶️</span>
                  {t("buttons.watchVideo")}
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - App Preview */}
          <div
            className="lg:col-span-5 relative animate-fade-in-left"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative flex justify-center will-change-transform">
              {/* Floating elements around phone - optimized */}
              {isVisible && (
                <>
                  <div
                    className="absolute -top-8 sm:-top-12 -left-4 sm:-left-8 text-white px-3 sm:px-4 py-2 rounded-xl shadow-lg transform will-change-transform animate-float"
                    style={{
                      backgroundColor: primaryColor,
                      transform: `rotate(-12deg) translateY(${
                        scrollY * -0.02
                      }px)`,
                      animationDelay: "1.5s",
                    }}
                  >
                    <div className="text-xs sm:text-sm font-bold">
                      {t("floating.new")}
                    </div>
                  </div>
                  <div
                    className="absolute top-1/4 -right-8 sm:-right-12 text-white px-2 sm:px-3 py-2 rounded-full shadow-lg transform will-change-transform animate-float"
                    style={{
                      backgroundColor: primaryColor,
                      transform: `rotate(12deg) translateY(${
                        scrollY * 0.03
                      }px)`,
                      animationDelay: "1.7s",
                    }}
                  >
                    <div className="text-xs font-bold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 sm:mr-2 animate-ping" />
                      {t("floating.connected")}
                    </div>
                  </div>
                  <div
                    className="absolute bottom-8 -left-12 sm:-left-16 text-white px-3 sm:px-4 py-3 rounded-2xl shadow-lg transform will-change-transform animate-float"
                    style={{
                      backgroundColor: primaryColor,
                      transform: `rotate(6deg) translateY(${
                        scrollY * 0.015
                      }px)`,
                      animationDelay: "1.9s",
                    }}
                  >
                    <div className="text-xs sm:text-sm font-bold">
                      {t("floating.safety")}
                    </div>
                  </div>
                </>
              )}

              {/* Phone mockup - optimized */}
              <div
                className="relative transform transition-all duration-700 hover:scale-105 will-change-transform animate-fade-in-up"
                style={{
                  transform: transforms.phoneContainer,
                  animationDelay: "1s",
                }}
              >
                <div className="relative">
                  {/* Phone shadow - optimized */}
                  <div
                    className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] blur-2xl scale-110 transform translate-y-6 sm:translate-y-8 will-change-transform opacity-30"
                    style={{ backgroundColor: `${primaryColor}` }}
                  />

                  {/* Phone body */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-black p-2 sm:p-3 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl transform hover:rotate-6 transition-transform duration-500 will-change-transform">
                    <div
                      className="p-1 rounded-[2rem] sm:rounded-[2.5rem]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <div className="bg-black rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden">
                        {/* Screen content */}
                        {heroSection?.image ? (
                          <div className="w-full max-w-xs sm:max-w-sm aspect-[9/16] relative">
                            <img
                              src={`https://mahfouzapp.com${heroSection.image}`}
                              alt={getLocalizedContent(heroSection.title)}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/images/fallback-hero.jpg";
                              }}
                            />
                            {/* Overlay with app name */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                              <div className="text-white text-center">
                                <div className="text-base sm:text-lg font-bold">
                                  {getLocalizedContent(heroSection.title)}
                                </div>
                                <div className="text-xs sm:text-sm opacity-80">
                                  {getLocalizedContent(heroSection.subTitle)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Fallback content
                          <div className="w-full max-w-xs sm:max-w-sm aspect-[9/16] bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 sm:p-8">
                            <div className="text-4xl sm:text-6xl mb-4 animate-bounce">
                              🚌
                            </div>
                            <div
                              className="text-base sm:text-lg font-bold mb-2 text-center"
                              style={{ color: primaryColor }}
                            >
                              {titleData.titleParts[0] || "Mahfouz"}
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm text-center">
                              {getLocalizedContent(
                                heroSection?.subTitle || {
                                  ar: "",
                                  en: "School Transport",
                                  tk: "",
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - optimized with staggered animation */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-12 sm:pt-16 animate-fade-in-up"
          style={{ animationDelay: "1.4s" }}
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-all duration-300 will-change-transform animate-fade-in-up"
              style={{ animationDelay: `${1.5 + index * 0.1}s` }}
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom SVG Wave - optimized */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-24 sm:h-32 md:h-40"
          preserveAspectRatio="none"
        >
          <path
            fill={primaryColor}
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,149.3C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Scroll Indicator - enhanced */}
      <div
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in-up"
        style={{ animationDelay: "2s" }}
      >
        <div
          className="flex flex-col items-center text-gray-700 hover:text-[#22488F] transition-all duration-300 cursor-pointer group will-change-transform"
          onClick={scrollToFeatures}
        >
          <span className="text-xs sm:text-sm mb-2 sm:mb-3 font-medium">
            {t("scrollIndicator")}
          </span>
          <div
            className="w-6 sm:w-8 h-10 sm:h-12 rounded-full flex justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-[#22488F] border-2 group-hover:scale-110"
            style={{ borderColor: `${primaryColor}80` }}
          >
            <div
              className="w-0.5 sm:w-1 h-3 sm:h-4 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-10px) rotate(var(--rotation, 0deg));
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
