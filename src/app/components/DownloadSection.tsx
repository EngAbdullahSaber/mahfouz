"use client";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DownloadSection = () => {
  const t = useTranslations("DownloadSection");
  const primaryColor = "#22488F";
  const secondaryColor = "#3A6FD8";
  const darkColor = "#1A3C7A";

  // Memoized color gradients to prevent recalculation
  const gradients = useMemo(
    () => ({
      mainBg: `from-[${darkColor}] via-[${primaryColor}] to-[${secondaryColor}]`,
      orb1: `from-[${secondaryColor}/30] to-[${primaryColor}/30]`,
      orb2: `from-[${secondaryColor}/20] to-[${primaryColor}/20]`,
      textGradient: `from-[${secondaryColor}] to-[${primaryColor}]`,
      buttonOverlay: `from-[${secondaryColor}/20] to-[${primaryColor}/20]`,
    }),
    [primaryColor, secondaryColor, darkColor]
  );

  return (
    <section
      id="download"
      className={`relative py-20 bg-gradient-to-br ${gradients.mainBg} overflow-hidden`}
    >
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden will-change-transform">
        {/* Floating Orbs - Reduced blur values for performance */}
        <div
          className={`absolute top-20 left-10 w-32 h-32 bg-gradient-to-r ${gradients.orb1} rounded-full blur-lg animate-pulse will-change-transform`}
        />
        <div
          className={`absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-r ${gradients.orb2} rounded-full blur-md animate-bounce will-change-transform`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r ${gradients.orb2} rounded-full blur-sm animate-pulse will-change-transform`}
          style={{ animationDelay: "2s" }}
        />

        {/* Optimized Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
            willChange: "transform, opacity",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradients.orb2} will-change-opacity`}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[600px] gap-12">
          {/* Mobile Mockup Section */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative will-change-transform">
              {/* Floating Elements around phone */}
              <div
                className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br ${gradients.textGradient} rounded-2xl opacity-80 rotate-12 animate-pulse flex items-center justify-center will-change-transform`}
              >
                <span className="text-2xl">📱</span>
              </div>
              <div
                className={`absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br ${gradients.textGradient} rounded-full opacity-70 animate-bounce will-change-transform`}
                style={{ animationDelay: "1s" }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              </div>
              <div
                className={`absolute top-1/2 -left-12 w-8 h-8 bg-gradient-to-br ${gradients.textGradient} rounded-lg opacity-60 animate-pulse will-change-transform`}
                style={{ animationDelay: "1.5s" }}
              />

              {/* Main Phone Container */}
              <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl will-change-transform">
                <Image
                  src="/a84bab02-f90e-4b47-b962-eae18e3ffc7b.png"
                  alt={t("appImageAlt")}
                  width={300}
                  height={600}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                  priority
                />

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${gradients.buttonOverlay} rounded-3xl blur-xl -z-10 opacity-80 will-change-transform`}
                />
              </div>

              {/* Floating Features */}
              <div className="absolute -top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-pulse will-change-transform">
                {t("floating.realTime")} 🛰️
              </div>
              <div
                className="absolute -bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-pulse will-change-transform"
                style={{ animationDelay: "0.5s" }}
              >
                {t("floating.notifications")} 🔔
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-3/5 text-center lg:text-right">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium will-change-transform">
                <span className="w-2 h-2 bg-[#3A6FD8] rounded-full mr-2 animate-pulse"></span>
                {t("availability")}
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span
                    className={`bg-gradient-to-r from-white to-[${secondaryColor}]/80 bg-clip-text text-transparent will-change-transform`}
                  >
                    {t("title.download")}
                  </span>
                  <br />
                  <span
                    className={`bg-gradient-to-r ${gradients.textGradient} bg-clip-text text-transparent will-change-transform`}
                  >
                    {t("title.free")}
                  </span>
                </h2>

                <div className="flex items-center justify-center lg:justify-end space-x-2 text-[#3A6FD8]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span className="text-white mr-2 text-lg font-medium">
                    4.8
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 will-change-transform">
                <p
                  className={`text-lg text-[${secondaryColor}]/90 leading-relaxed`}
                >
                  {t("description")}
                </p>

                <div className="mt-4 flex items-center justify-center lg:justify-end space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[${secondaryColor}]`}>📱</span>
                    <span className="text-sm">{t("platforms")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[${primaryColor}]`}>🆓</span>
                    <span className="text-sm">{t("freeLabel")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[${darkColor}]`}>🔒</span>
                    <span className="text-sm">{t("security")}</span>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
                {/* App Store Button */}
                <a
                  href={t("appStoreLink")}
                  className="group relative inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 min-w-[200px] will-change-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("downloadFromAppStore")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🍎</div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300">
                        {t("downloadFrom")}
                      </div>
                      <div className="text-lg font-bold">{t("appStore")}</div>
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients.buttonOverlay} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity`}
                  />
                </a>

                {/* Google Play Button */}
                <a
                  href={t("playStoreLink")}
                  className={`group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r ${gradients.textGradient} text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 min-w-[200px] will-change-transform`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("downloadFromPlayStore")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div className="text-right">
                      <div className={`text-xs text-[${secondaryColor}]/90`}>
                        {t("downloadFrom")}
                      </div>
                      <div className="text-lg font-bold">{t("playStore")}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity" />
                </a>
              </div>

              {/* Additional Info */}
              <div
                className={`bg-gradient-to-r ${gradients.buttonOverlay} backdrop-blur-sm rounded-2xl p-4 border border-[${secondaryColor}]/30 will-change-transform`}
              >
                <div className="flex items-center justify-center lg:justify-end space-x-2 text-[#3A6FD8]">
                  <span className="text-lg">🎉</span>
                  <span className="font-medium">{t("downloadsCount")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Optimized SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0V60c240,30 480,30 600,0s360-30 600,0V0H0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default DownloadSection;
