"use client";
import React, { useMemo, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

interface DownloadSectionData {
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
  description: null;
  subDescription: null;
  image: string;
  images: never[];
  links: {
    appStore: string;
    googlePlay: string;
  };
  meta: null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DownloadSectionProps {
  data: DownloadSectionData;
}

const DownloadSection = ({ data }: DownloadSectionProps) => {
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const t = useTranslations("DownloadSection");
  const { locale } = useParams();

  const primaryColor = "#22488F";
  const secondaryColor = "#3A6FD8";
  const darkColor = "#1A3C7A";

  // Optimized localized content helper
  const getLocalizedContent = useCallback(
    (content: { ar: string; en: string; tk: string } | null): string => {
      if (!content) return "";
      const currentLocale = locale as keyof typeof content;
      return content[currentLocale] || content.en || "";
    },
    [locale]
  );

  // Memoized styles and gradients for better performance
  const styles = useMemo(
    () => ({
      gradients: {
        mainBg: `linear-gradient(135deg, ${darkColor} 0%, ${primaryColor} 50%, ${secondaryColor} 100%)`,
        orb1: `linear-gradient(45deg, ${secondaryColor}40, ${primaryColor}40)`,
        orb2: `linear-gradient(45deg, ${secondaryColor}20, ${primaryColor}20)`,
        textGradient: `linear-gradient(45deg, ${secondaryColor}, ${primaryColor})`,
        buttonOverlay: `linear-gradient(45deg, ${secondaryColor}30, ${primaryColor}30)`,
        phoneGlow: `linear-gradient(45deg, ${secondaryColor}50, ${primaryColor}50)`,
      },
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        dark: darkColor,
      },
    }),
    [primaryColor, secondaryColor, darkColor]
  );

  // Optimized image URL function
  const getImageUrl = useCallback((imagePath: string) => {
    return `https://mahfouzapp.com${imagePath}`;
  }, []);

  // Event handlers
  const handlePhoneMouseEnter = useCallback(() => setPhoneHovered(true), []);
  const handlePhoneMouseLeave = useCallback(() => setPhoneHovered(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  // Memoized background decorations
  const BackgroundDecorations = useMemo(
    () => (
      <div className="absolute inset-0 overflow-hidden">
        {/* Optimized floating orbs */}
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full blur-2xl animate-float opacity-60"
          style={{ background: styles.gradients.orb1 }}
        />
        <div
          className="absolute bottom-32 right-20 w-24 h-24 rounded-full blur-xl animate-float-delayed opacity-50"
          style={{
            background: styles.gradients.orb2,
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-lg animate-pulse opacity-40"
          style={{
            background: styles.gradients.orb2,
            animationDelay: "1s",
          }}
        />

        {/* Optimized grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: styles.gradients.orb2 }}
        />
      </div>
    ),
    [styles.gradients]
  );

  // Memoized floating features
  const FloatingFeatures = useMemo(
    () => (
      <>
        <div className="absolute -top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-float border border-white/50">
          <span className="flex items-center gap-2">
            <span className="text-blue-500">🛰️</span>
            {t("floating.realTime") || "Real-time Tracking"}
          </span>
        </div>
        <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-float-delayed border border-white/50">
          <span className="flex items-center gap-2">
            <span className="text-green-500">🔔</span>
            {t("floating.notifications") || "Smart Notifications"}
          </span>
        </div>
      </>
    ),
    [t]
  );

  // Memoized phone decorations
  const PhoneDecorations = useMemo(
    () => (
      <>
        <div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-2xl opacity-80 rotate-12 animate-bounce-slow flex items-center justify-center shadow-lg"
          style={{ background: styles.gradients.textGradient }}
        >
          <span className="text-2xl">📱</span>
        </div>
        <div
          className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full opacity-70 animate-bounce flex items-center justify-center shadow-lg"
          style={{
            background: styles.gradients.textGradient,
            animationDelay: "1s",
          }}
        >
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <div
          className="absolute top-1/2 -left-12 w-8 h-8 rounded-lg opacity-60 animate-pulse"
          style={{
            background: styles.gradients.textGradient,
            animationDelay: "1.5s",
          }}
        />
      </>
    ),
    [styles.gradients]
  );

  return (
    <section
      id="download"
      className="relative py-20 overflow-hidden min-h-screen flex items-center"
      style={{ background: styles.gradients.mainBg }}
    >
      {BackgroundDecorations}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Enhanced Mobile Mockup Section */}
          <div className="lg:w-2/5 flex justify-center">
            <div
              className="relative"
              onMouseEnter={handlePhoneMouseEnter}
              onMouseLeave={handlePhoneMouseLeave}
            >
              {PhoneDecorations}

              {/* Main Phone Container with enhanced styling */}
              <div
                className={`relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl transition-all duration-700 ease-out ${
                  phoneHovered ? "scale-105 -translate-y-2" : "scale-100"
                }`}
              >
                {data?.image ? (
                  <div className="relative">
                    <Image
                      src={getImageUrl(data.image)}
                      alt="Mahfouz App"
                      width={300}
                      height={600}
                      className={`w-full max-w-sm mx-auto rounded-2xl shadow-2xl transition-all duration-700 ease-out ${
                        imageLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      } ${phoneHovered ? "scale-105" : "scale-100"}`}
                      priority
                      onLoad={handleImageLoad}
                    />
                    {/* Loading placeholder */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center animate-pulse">
                        <div className="text-center text-gray-600">
                          <div className="text-4xl mb-2">📱</div>
                          <div className="text-sm">Loading...</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-6xl mb-4 animate-bounce">📱</div>
                      <div className="text-lg font-bold">Mahfouz App</div>
                    </div>
                  </div>
                )}

                {/* Enhanced glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 ${
                    phoneHovered ? "opacity-80" : "opacity-40"
                  }`}
                  style={{ background: styles.gradients.phoneGlow }}
                />
              </div>

              {FloatingFeatures}
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="lg:w-3/5 text-center lg:text-right space-y-8">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium shadow-lg hover:bg-white/30 transition-all duration-300">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
              <span className="text-sm lg:text-base">
                {t("availability") || "Available Now"}
              </span>
            </div>

            {/* Enhanced Main Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent animate-shimmer">
                  {getLocalizedContent(data?.title)}
                </span>
                <span
                  className="block bg-clip-text text-transparent mt-2 animate-gradient"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${styles.colors.secondary}, ${styles.colors.primary}, ${styles.colors.secondary})`,
                    backgroundSize: "200% 200%",
                  }}
                >
                  Mahfouz
                </span>
              </h2>
            </div>

            {/* Enhanced Description Card */}
            <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:bg-white/20 transition-all duration-300">
              <p className="text-lg lg:text-xl text-white/95 leading-relaxed font-light mb-6">
                {getLocalizedContent(data?.subTitle)}
              </p>

              {/* Enhanced Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <span className="text-blue-300 text-lg">📱</span>
                  <span className="text-sm font-medium text-white">
                    {t("platforms") || "iOS & Android"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <span className="text-green-300 text-lg">🆓</span>
                  <span className="text-sm font-medium text-white">
                    {t("freeLabel") || "Free"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <span className="text-yellow-300 text-lg">🔒</span>
                  <span className="text-sm font-medium text-white">
                    {t("security") || "Secure"}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6">
              {/* App Store Button */}
              {data?.links?.appStore && (
                <a
                  href={data.links.appStore}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-black/90 backdrop-blur-sm text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 min-w-[220px] border border-white/10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    t("downloadFromAppStore") || "Download from App Store"
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      🍎
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300 font-medium">
                        {t("downloadFrom") || "Download from"}
                      </div>
                      <div className="text-lg font-bold">
                        {t("appStore") || "App Store"}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              )}

              {/* Google Play Button */}
              {data?.links?.googlePlay && (
                <a
                  href={data.links.googlePlay}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 min-w-[220px] border border-white/20"
                  style={{ background: styles.gradients.textGradient }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    t("downloadFromPlayStore") || "Download from Google Play"
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      📱
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-white/80 font-medium">
                        {t("downloadFrom") || "Get it on"}
                      </div>
                      <div className="text-lg font-bold">
                        {t("playStore") || "Google Play"}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-20 opacity-20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 0.1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "white", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "white", stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,0V60c240,30 480,30 600,0s360-30 600,0V0H0Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-8px) rotate(18deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default DownloadSection;
