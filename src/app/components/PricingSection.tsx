"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface LocalizedContent {
  ar: string;
  en: string;
  tk: string;
}

interface SubscriptionFeature {
  key: string;
  label: LocalizedContent;
}

interface SubscriptionSection {
  id: string;
  sectionName: string;
  title: LocalizedContent;
  subTitle: LocalizedContent;
  meta: {
    features: SubscriptionFeature[];
  };
  isActive: boolean;
}

interface PricingSectionProps {
  showFreePlans?: boolean;
  data?: SubscriptionSection[];
}

const PricingSection: React.FC<PricingSectionProps> = ({
  showFreePlans = false,
  data,
}) => {
  const [hoveredCard, setHoveredCard] = useState(false);
  const primaryColor = "#22488F";
  const freeColor = "#10B981";
  const t = useTranslations("PricingSection");
  const { locale } = useParams();

  // Memoized subscription section to avoid recalculation
  const subscriptionSection = useMemo(
    () => data?.find((section) => section.sectionName === "subscription"),
    [data]
  );

  // Optimized localized content helper with proper typing
  const getLocalizedContent = useCallback(
    (
      content: LocalizedContent | null | undefined,
      fallback: string
    ): string => {
      if (!content) return fallback;
      const currentLocale = locale as keyof LocalizedContent;
      return content[currentLocale] || content.en || fallback;
    },
    [locale]
  );

  // Memoized CheckmarkIcon to prevent re-renders
  const CheckmarkIcon = useMemo(
    () => (
      <svg
        className="w-5 h-5 text-current"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    []
  );

  // Memoized features list to prevent recalculation
  const freeFeatures = useMemo(() => {
    if (subscriptionSection?.meta?.features) {
      return subscriptionSection.meta.features.map((feature) =>
        getLocalizedContent(feature.label, feature.key)
      );
    }

    return [
      t("features.realTimeTracking") || "Real-time bus tracking",
      t("features.notifications") || "Instant notifications",
      t("features.safetyAlerts") || "Safety alerts & updates",
      t("features.routeInfo") || "Route information",
      t("features.studentManagement") || "Student attendance",
      t("features.parentPortal") || "Parent communication portal",
      t("features.driverApp") || "Driver mobile application",
      t("features.support") || "24/7 customer support",
    ];
  }, [subscriptionSection, t, getLocalizedContent]);

  // Optimized event handlers
  const handleMouseEnter = useCallback(() => setHoveredCard(true), []);
  const handleMouseLeave = useCallback(() => setHoveredCard(false), []);

  // Memoized background decorations
  const BackgroundDecorations = useMemo(
    () => (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 to-green-300/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    ),
    []
  );

  return (
    <section
      id="pricing"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 min-h-screen flex items-center"
    >
      {BackgroundDecorations}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge with improved styling */}
          <div
            className="inline-flex items-center px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: `${primaryColor}12`,
              borderColor: `${primaryColor}25`,
            }}
          >
            <span
              className="font-semibold text-sm tracking-wide"
              style={{ color: primaryColor }}
            >
              {t("header.badge") || "💎 Premium Features"}
            </span>
          </div>

          {/* Enhanced Title with improved typography */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
            <span
              className="bg-clip-text text-transparent animate-gradient"
              style={{
                backgroundImage: `linear-gradient(45deg, ${primaryColor}, ${freeColor}, ${primaryColor})`,
                backgroundSize: "200% 200%",
              }}
            >
              {getLocalizedContent(
                subscriptionSection?.title,
                t("header.title") || "Simple Pricing"
              )}
            </span>
          </h2>

          {/* Improved Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {getLocalizedContent(
              subscriptionSection?.subTitle,
              t("header.description") || "Start free, upgrade when you're ready"
            )}
          </p>
        </div>

        {/* Enhanced Main Pricing Card */}
        <div className="flex justify-center mb-16">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative group cursor-pointer max-w-2xl w-full transform transition-all duration-700 ease-out will-change-transform ${
              hoveredCard
                ? "scale-105 -translate-y-6"
                : "scale-100 translate-y-0"
            }`}
          >
            {/* Enhanced Card with better shadows and borders */}
            <div
              className={`relative h-full p-8 sm:p-10 rounded-3xl transition-all duration-700 border-2 bg-white/80 backdrop-blur-sm will-change-transform ${
                hoveredCard
                  ? "shadow-2xl border-blue-300 bg-white/95"
                  : "shadow-xl border-gray-200/50"
              }`}
            >
              {/* Improved gradient overlay on hover */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 ${
                  hoveredCard ? "opacity-5" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}10, ${freeColor}10)`,
                }}
              />

              {/* Content with improved spacing */}
              <div className="relative z-10 space-y-8">
                {/* Header with better icon treatment */}
                <div className="text-center space-y-4">
                  <div className="text-6xl sm:text-7xl mb-4 transform transition-transform duration-500 hover:scale-110">
                    🚌
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                    {t("plans.free.name") || "Free Plan"}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 font-light max-w-md mx-auto">
                    {t("plans.free.description") ||
                      "Everything you need to get started"}
                  </p>
                </div>

                {/* Enhanced Pricing Display */}
                <div className="text-center space-y-2">
                  <div className="text-5xl sm:text-6xl font-black text-green-600 tracking-tight">
                    {t("free") || "FREE"}
                  </div>
                  <div className="text-gray-500 text-lg font-medium">
                    {t("forever") || "Forever"}
                  </div>
                </div>

                {/* Enhanced Features List */}
                <div className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 group/feature transition-all duration-300 hover:translate-x-1"
                    >
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover/feature:scale-110"
                        style={{
                          backgroundColor: `${freeColor}20`,
                          color: freeColor,
                        }}
                      >
                        {CheckmarkIcon}
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <button
                  className="w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 text-white relative overflow-hidden group/button focus:outline-none focus:ring-4 focus:ring-green-300/50"
                  style={{
                    backgroundColor: freeColor,
                  }}
                >
                  {/* Button gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10">
                    {t("cta.getStarted") || "Get Started Free"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
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

        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
