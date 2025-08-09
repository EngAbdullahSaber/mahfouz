import React, { useState } from "react";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const primaryColor = "#3AA7CE";

  const plans = [
    {
      name: "للوالدين",
      nameEn: "Parents Plan",
      icon: "👨‍👩‍👧‍👦",
      description: "للعائلات التي تريد متابعة أطفالها",
      monthlyPrice: "مجاني",
      yearlyPrice: "مجاني",
      originalPrice: null,
      popular: false,
      features: [
        "تتبع موقع الطفل في الوقت الفعلي",
        "إشعارات وصول ومغادرة الطفل",
        "تواصل مباشر مع السائق",
        "تاريخ الرحلات",
        "تطبيق جوال سهل الاستخدام",
        "دعم فني 24/7",
      ],
    },
    {
      name: "للمدارس",
      nameEn: "School Plan",
      icon: "🏫",
      description: "للمدارس التي تريد إدارة أسطول النقل",
      monthlyPrice: "299",
      yearlyPrice: "2990",
      originalPrice: "3588",
      popular: true,
      features: [
        "لوحة تحكم شاملة للمدرسة",
        "إدارة جميع الحافلات والطلاب",
        "تقارير مفصلة ومتقدمة",
        "نظام إدارة السائقين",
        "إشعارات للوالدين تلقائياً",
        "تكامل مع أنظمة المدرسة",
        "دعم فني مخصص",
        "تدريب للفريق",
      ],
    },
    {
      name: "للسائقين",
      nameEn: "Driver Plan",
      icon: "🚌",
      description: "للسائقين المستقلين وشركات النقل",
      monthlyPrice: "99",
      yearlyPrice: "990",
      originalPrice: "1188",
      popular: false,
      features: [
        "تطبيق السائق المتخصص",
        "إدارة قائمة الطلاب",
        "نظام الحضور والغياب",
        "تواصل مع الوالدين",
        "تتبع المسار الأمثل",
        "إدارة الرحلات اليومية",
        "دعم فني مستمر",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-cyan-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3AA7CE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#3AA7CE]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3AA7CE]/5 rounded-full blur-3xl"></div>
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
              💰 خطط الاشتراك
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span
              className="bg-clip-text  "
              style={{
                color: `linear-gradient(to right, ${primaryColor}, #2D8EB8)`,
              }}
            >
              اختر الخطة
            </span>
            <br />
            <span className="transform rotate-1 inline-block">المناسبة لك</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            خطط مرنة تناسب احتياجات الجميع - من الوالدين إلى المدارس وشركات
            النقل
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center mt-8 p-2 bg-white rounded-2xl shadow-lg border border-gray-200 w-fit mx-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isAnnual
                  ? "text-white shadow-md"
                  : "text-gray-600 hover:text-[#3AA7CE]"
              }`}
              style={{
                backgroundColor: !isAnnual ? primaryColor : "transparent",
              }}
            >
              شهري
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isAnnual
                  ? "text-white shadow-md"
                  : "text-gray-600 hover:text-[#3AA7CE]"
              }`}
              style={{
                backgroundColor: isAnnual ? primaryColor : "transparent",
              }}
            >
              سنوي
              <span
                className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full font-bold"
                style={{ backgroundColor: "#FF9F1C" }}
              >
                وفر 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative group cursor-pointer transition-all duration-500 ${
                plan.popular ? "lg:scale-105 lg:-translate-y-4" : ""
              } ${hoveredPlan === index ? "scale-105 -translate-y-2" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div
                    className="text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    ⭐ الأكثر طلباً
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-3xl shadow-xl transition-all duration-500 border-2 ${
                  plan.popular
                    ? "bg-white shadow-2xl"
                    : "border-gray-200 bg-white hover:border-[#3AA7CE]/30"
                } ${
                  hoveredPlan === index ? "shadow-2xl border-[#3AA7CE]/50" : ""
                }`}
                style={{
                  borderColor: plan.popular ? `${primaryColor}50` : "",
                  backgroundColor: plan.popular ? "white" : "",
                }}
              >
                {/* Gradient Background */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{ backgroundColor: `${primaryColor}10` }}
                ></div>

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
                    {plan.monthlyPrice === "مجاني" ? (
                      <div
                        className="text-4xl font-black mb-2"
                        style={{ color: primaryColor }}
                      >
                        مجاني
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-4xl font-black text-gray-900">
                            {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-xl text-gray-600 mr-2">
                            ريال
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {isAnnual ? "سنوياً" : "شهرياً"}
                        </div>
                        {isAnnual && plan.originalPrice && (
                          <div className="text-gray-400 text-sm line-through mt-1">
                            {plan.originalPrice} ريال
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
                          style={{ backgroundColor: `${primaryColor}30` }}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke={primaryColor}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
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
                      backgroundColor: plan.popular ? primaryColor : "#2D3748",
                    }}
                  >
                    {plan.monthlyPrice === "مجاني"
                      ? "ابدأ مجاناً الآن"
                      : "اشترك الآن"}
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
              هل تحتاج حلول مخصصة؟
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نقدم حلول مخصصة للمؤسسات الكبيرة وشركات النقل مع أسعار خاصة وميزات
              إضافية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                تواصل للحصول على عرض مخصص
              </button>
              <button
                className="px-8 py-3 border-2 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  borderColor: `${primaryColor}50`,
                  color: primaryColor,
                }}
              >
                جدولة مكالمة مجانية
              </button>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="flex items-center justify-center mt-12 space-x-4 space-x-reverse">
          <div className="text-4xl">💯</div>
          <div className="text-gray-600">
            <div className="font-semibold">
              ضمان استرداد الأموال لمدة 30 يوم
            </div>
            <div className="text-sm">جرب الخدمة بدون مخاطر</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
