"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

interface PricingSectionProps {
  showFreePlans?: boolean; // Key to determine which plans to show
}

const PricingSection: React.FC<PricingSectionProps> = ({
  showFreePlans = false,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const primaryColor = "#22488F";
  const t = useTranslations("PricingSection");

  // Free plans data
  const freePlans = useMemo(
    () => [
      {
        name: t("plans.free.basic.name"),
        nameEn: t("plans.free.basic.nameEn"),
        icon: "🆓",
        description: t("plans.free.basic.description"),
        monthlyPrice: t("free"),
        yearlyPrice: t("free"),
        originalPrice: null,
        popular: true,
        features: [
          t("plans.free.basic.features.basicTracking"),
          t("plans.free.basic.features.limitedNotifications"),
          t("plans.free.basic.features.basicSupport"),
          t("plans.free.basic.features.oneRoute"),
          t("plans.free.basic.features.communityAccess"),
        ],
      },
      {
        name: t("plans.free.trial.name"),
        nameEn: t("plans.free.trial.nameEn"),
        icon: "🎯",
        description: t("plans.free.trial.description"),
        monthlyPrice: t("free"),
        yearlyPrice: t("free"),
        originalPrice: null,
        popular: false,
        features: [
          t("plans.free.trial.features.fullAccess"),
          t("plans.free.trial.features.allFeatures"),
          t("plans.free.trial.features.prioritySupport"),
          t("plans.free.trial.features.unlimited"),
          t("plans.free.trial.features.trialPeriod"),
        ],
      },
      {
        name: t("plans.free.community.name"),
        nameEn: t("plans.free.community.nameEn"),
        icon: "👥",
        description: t("plans.free.community.description"),
        monthlyPrice: t("free"),
        yearlyPrice: t("free"),
        originalPrice: null,
        popular: false,
        features: [
          t("plans.free.community.features.communitySupport"),
          t("plans.free.community.features.basicFeatures"),
          t("plans.free.community.features.openSource"),
          t("plans.free.community.features.documentation"),
          t("plans.free.community.features.updates"),
        ],
      },
    ],
    [t]
  );

  // Paid plans data (original)
  const paidPlans = useMemo(
    () => [
      {
        name: t("plans.parents.name"),
        nameEn: t("plans.parents.nameEn"),
        icon: "👨‍👩‍👧‍👦",
        description: t("plans.parents.description"),
        monthlyPrice: t("plans.parents.monthlyPrice"),
        yearlyPrice: t("plans.parents.yearlyPrice"),
        originalPrice: null,
        popular: false,
        features: [
          t("plans.parents.features.tracking"),
          t("plans.parents.features.notifications"),
          t("plans.parents.features.communication"),
          t("plans.parents.features.history"),
          t("plans.parents.features.mobileApp"),
          t("plans.parents.features.support"),
        ],
      },
      {
        name: t("plans.school.name"),
        nameEn: t("plans.school.nameEn"),
        icon: "🏫",
        description: t("plans.school.description"),
        monthlyPrice: "299",
        yearlyPrice: "2990",
        originalPrice: "3588",
        popular: true,
        features: [
          t("plans.school.features.dashboard"),
          t("plans.school.features.management"),
          t("plans.school.features.reports"),
          t("plans.school.features.driverSystem"),
          t("plans.school.features.parentNotifications"),
          t("plans.school.features.integration"),
          t("plans.school.features.dedicatedSupport"),
          t("plans.school.features.training"),
        ],
      },
      {
        name: t("plans.driver.name"),
        nameEn: t("plans.driver.nameEn"),
        icon: "🚌",
        description: t("plans.driver.description"),
        monthlyPrice: "99",
        yearlyPrice: "990",
        originalPrice: "1188",
        popular: false,
        features: [
          t("plans.driver.features.driverApp"),
          t("plans.driver.features.studentManagement"),
          t("plans.driver.features.attendance"),
          t("plans.driver.features.parentCommunication"),
          t("plans.driver.features.routeOptimization"),
          t("plans.driver.features.tripManagement"),
          t("plans.driver.features.ongoingSupport"),
        ],
      },
    ],
    [t]
  );

  // Select plans based on showFreePlans prop
  const plans = showFreePlans ? freePlans : paidPlans;

  // Memoized checkmark SVG to prevent re-creation
  const CheckmarkIcon = useMemo(
    () => (
      <svg
        className="w-3 h-3"
        fill="none"
        stroke={primaryColor}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    [primaryColor]
  );

  return (
    <section
      id="pricing"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#22488F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#22488F]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22488F]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center px-6 py-3 rounded-full border mb-6"
            style={{
              backgroundColor: `${primaryColor}15`,
              borderColor: `${primaryColor}30`,
            }}
          >
            <span
              className="font-semibold text-sm"
              style={{ color: primaryColor }}
            >
              {showFreePlans ? t("header.freeBadge") : t("header.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="bg-clip-text" style={{ color: primaryColor }}>
              {showFreePlans ? t("header.freeTitle") : t("header.title")}
            </span>
            <br />
            <span className="transform rotate-1 inline-block">
              {showFreePlans ? t("header.freeSubtitle") : t("header.subtitle")}
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {showFreePlans
              ? t("header.freeDescription")
              : t("header.description")}
          </p>

          {/* Annual/Monthly Toggle - Only show for paid plans */}
          {!showFreePlans && (
            <div className="flex items-center justify-center mt-8 p-2 bg-white rounded-2xl shadow-lg border border-gray-200 w-fit mx-auto">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !isAnnual
                    ? "text-white shadow-md"
                    : "text-gray-600 hover:text-[#22488F]"
                }`}
                style={{
                  backgroundColor: !isAnnual ? primaryColor : "transparent",
                }}
                aria-label={t("toggle.monthly")}
              >
                {t("toggle.monthly")}
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  isAnnual
                    ? "text-white shadow-md"
                    : "text-gray-600 hover:text-[#22488F]"
                }`}
                style={{
                  backgroundColor: isAnnual ? primaryColor : "transparent",
                }}
                aria-label={t("toggle.yearly")}
              >
                {t("toggle.yearly")}
                <span
                  className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full font-bold"
                  style={{ backgroundColor: "#FF9F1C" }}
                >
                  {t("toggle.discount")}
                </span>
              </button>
            </div>
          )}

          {/* Free Plans Notice */}
          {showFreePlans && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🎉</span>
                <span className="text-green-800 font-semibold">
                  {t("freeNotice.title")}
                </span>
              </div>
              <p className="text-green-700 text-sm mt-2">
                {t("freeNotice.description")}
              </p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={`${showFreePlans ? "free" : "paid"}-${index}`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative group cursor-pointer transition-all duration-500 ${
                plan.popular ? "lg:scale-105 lg:-translate-y-4" : ""
              } ${hoveredPlan === index ? "scale-105 -translate-y-2" : ""}`}
              aria-label={`${plan.name} pricing plan`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div
                    className="text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg"
                    style={{
                      backgroundColor: showFreePlans ? "#10B981" : primaryColor,
                    }}
                  >
                    {showFreePlans ? t("recommendedBadge") : t("popularBadge")}
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-3xl shadow-xl transition-all duration-500 border-2 ${
                  plan.popular
                    ? "bg-white shadow-2xl"
                    : "border-gray-200 bg-white hover:border-[#22488F]/30"
                } ${
                  hoveredPlan === index ? "shadow-2xl border-[#22488F]/50" : ""
                }`}
                style={{
                  borderColor: plan.popular
                    ? showFreePlans
                      ? "#10B981"
                      : `${primaryColor}50`
                    : "",
                }}
              >
                {/* Gradient Background */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    backgroundColor: showFreePlans
                      ? "#10B98110"
                      : `${primaryColor}10`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-600 mb-1">
                      {plan.nameEn}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    {plan.monthlyPrice === t("free") || showFreePlans ? (
                      <div className="space-y-2">
                        <div
                          className="text-4xl font-black mb-2"
                          style={{
                            color: showFreePlans ? "#10B981" : primaryColor,
                          }}
                        >
                          {t("free")}
                        </div>
                        {showFreePlans && (
                          <div className="text-sm text-gray-500">
                            {t("forever")}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-4xl font-black text-gray-900">
                            {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-xl text-gray-600 mr-2">
                            {t("currency")}
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {isAnnual ? t("yearly") : t("monthly")}
                        </div>
                        {isAnnual && plan.originalPrice && (
                          <div className="text-gray-400 text-sm line-through mt-1">
                            {plan.originalPrice} {t("currency")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-right">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ml-3 mt-0.5"
                          style={{
                            backgroundColor: showFreePlans
                              ? "#10B98130"
                              : `${primaryColor}30`,
                          }}
                        >
                          {CheckmarkIcon}
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white`}
                    style={{
                      backgroundColor: showFreePlans
                        ? plan.popular
                          ? "#10B981"
                          : "#6B7280"
                        : plan.popular
                        ? primaryColor
                        : "#2D3748",
                    }}
                  >
                    {showFreePlans
                      ? t("cta.getStarted")
                      : plan.monthlyPrice === t("free")
                      ? t("cta.startFree")
                      : t("cta.subscribeNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {showFreePlans
                ? t("upgradeSection.title")
                : t("customSolution.title")}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {showFreePlans
                ? t("upgradeSection.description")
                : t("customSolution.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                style={{
                  backgroundColor: showFreePlans ? "#10B981" : primaryColor,
                }}
              >
                {showFreePlans
                  ? t("upgradeSection.upgradeButton")
                  : t("customSolution.contactButton")}
              </button>
              <button
                className="px-8 py-3 border-2 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  borderColor: showFreePlans
                    ? "#10B98150"
                    : `${primaryColor}50`,
                  color: showFreePlans ? "#10B981" : primaryColor,
                }}
              >
                {showFreePlans
                  ? t("upgradeSection.learnMore")
                  : t("customSolution.scheduleButton")}
              </button>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee or Free Guarantee */}
        <div className="flex items-center justify-center mt-12 space-x-4 space-x-reverse">
          <div className="text-4xl">{showFreePlans ? "✅" : "💯"}</div>
          <div className="text-gray-600">
            <div className="font-semibold">
              {showFreePlans
                ? t("freeGuarantee.title")
                : t("moneyBackGuarantee.title")}
            </div>
            <div className="text-sm">
              {showFreePlans
                ? t("freeGuarantee.subtitle")
                : t("moneyBackGuarantee.subtitle")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
