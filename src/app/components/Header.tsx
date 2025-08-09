"use client";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const headerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Primary color and its variations
  const primaryColor = "#3AA7CE";
  const gradientColors = {
    light: "from-cyan-50 to-blue-50",
    medium: "from-cyan-100 to-blue-100",
    strong: "from-[#3AA7CE] to-[#2D8EB8]",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientColors.medium}`}
      style={{ "--primary-color": primaryColor } as React.CSSProperties}
    >
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3AA7CE]/20 rotate-45 transform-gpu"
          style={{
            transform: `rotate(${45 + scrollY * 0.02}deg) translateY(${
              scrollY * 0.1
            }px)`,
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-80 h-80 bg-[#3AA7CE]/15 transform-gpu"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 80%)",
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#3AA7CE]/10 rounded-full transform-gpu"
          style={{
            transform: `scale(${1 + scrollY * 0.0005}) translateY(${
              scrollY * 0.08
            }px)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${primaryColor}20, transparent)`,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status Badge */}
            <div
              className="inline-flex items-center"
              style={{ opacity: Math.max(0.7, 1 - scrollY / 600) }}
            >
              <div className="bg-[#3AA7CE] text-white px-6 py-3 rounded-full shadow-lg transform rotate-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">
                    نظام متطور لتتبع النقل المدرسي
                  </span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none text-gray-900">
                  <span className="block transform -rotate-2 origin-left">
                    بــاص
                  </span>
                  <span
                    className="block transform rotate-1 origin-right"
                    style={{ color: primaryColor }}
                  >
                    واي
                  </span>
                </h1>
                <div className="absolute -top-4 -right-4 text-6xl animate-bounce opacity-80">
                  🚌
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className="h-1 w-16 transform rotate-1"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-700 transform -rotate-1">
                  Busway
                </h2>
              </div>
            </div>

            {/* Subtitle */}
            <h3 className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed max-w-md transform rotate-1 bg-white/60 p-4 rounded-2xl shadow-sm">
              النظام الذكي لأمن وسلامة الطلاب في النقل المدرسي
            </h3>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              {[
                {
                  icon: "📍",
                  text: "تتبع فوري",
                  bgColor: "bg-[#3AA7CE]",
                },
                {
                  icon: "🔔",
                  text: "تنبيهات ذكية",
                  bgColor: "bg-[#3AA7CE]/90",
                },
                {
                  icon: "💬",
                  text: "تواصل مباشر",
                  bgColor: "bg-[#3AA7CE]/80",
                },
                {
                  icon: "🏫",
                  text: "لوحة التحكم",
                  bgColor: "bg-[#3AA7CE]/70",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`relative p-4 ${feature.bgColor} text-white rounded-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-2 shadow-lg`}
                  style={{
                    transform: `rotate(${
                      index % 2 === 0 ? "2deg" : "-1deg"
                    }) translateY(${scrollY * 0.01 * (index + 1)}px)`,
                  }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl">{feature.icon}</span>
                    <span className="text-sm font-semibold text-center">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="group relative px-8 py-4 text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-rotate-1 overflow-hidden"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="ml-3 text-2xl">📱</span>
                  تحميل التطبيق
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <button className="group px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1">
                <span className="flex items-center justify-center">
                  <span className="ml-3 text-2xl">▶️</span>
                  مشاهدة الفيديو
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - App Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative flex justify-center">
              {/* Floating elements around phone */}
              <div
                className="absolute -top-12 -left-8 text-white px-4 py-2 rounded-xl shadow-lg transform -rotate-12"
                style={{
                  backgroundColor: primaryColor,
                  transform: `rotate(-12deg) translateY(${scrollY * -0.02}px)`,
                }}
              >
                <div className="text-sm font-bold">🚀 جديد</div>
              </div>

              <div
                className="absolute top-1/4 -right-12 text-white px-3 py-2 rounded-full shadow-lg transform rotate-12"
                style={{
                  backgroundColor: primaryColor,
                  transform: `rotate(12deg) translateY(${scrollY * 0.03}px)`,
                }}
              >
                <div className="text-xs font-bold flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                  متصل
                </div>
              </div>

              <div
                className="absolute bottom-8 -left-16 text-white px-4 py-3 rounded-2xl shadow-lg transform rotate-6"
                style={{
                  backgroundColor: primaryColor,
                  transform: `rotate(6deg) translateY(${scrollY * 0.015}px)`,
                }}
              >
                <div className="text-sm font-bold">💯 آمان تام</div>
              </div>

              {/* Phone mockup */}
              <div
                className="relative transform transition-all duration-700 hover:scale-105"
                style={{ transform: `translateY(${scrollY * -0.1}px)` }}
              >
                <div className="relative">
                  {/* Phone shadow */}
                  <div
                    className="absolute inset-0 rounded-[3rem] blur-2xl scale-110 transform translate-y-8"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  ></div>

                  {/* Phone body */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-black p-3 rounded-[3rem] shadow-2xl transform rotate-3">
                    <div
                      className="p-1 rounded-[2.5rem]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <div className="bg-black rounded-[2.25rem] overflow-hidden">
                        {/* Screen content */}
                        <div className="w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-cyan-50 to-blue-50 flex flex-col items-center justify-center p-8">
                          <div className="text-6xl mb-4">🚌</div>
                          <div
                            className="text-lg font-bold mb-2"
                            style={{ color: primaryColor }}
                          >
                            Busway App
                          </div>
                          <div className="text-gray-600 text-sm text-center">
                            تطبيق تتبع الحافلات المدرسية
                          </div>

                          {/* Mini UI elements */}
                          <div className="mt-6 space-y-2 w-full">
                            <div
                              className="h-3 rounded-full w-3/4 mx-auto"
                              style={{ backgroundColor: `${primaryColor}30` }}
                            ></div>
                            <div
                              className="h-3 rounded-full w-1/2 mx-auto"
                              style={{ backgroundColor: `${primaryColor}30` }}
                            ></div>
                            <div
                              className="h-3 rounded-full w-2/3 mx-auto"
                              style={{ backgroundColor: `${primaryColor}30` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex items-center justify-center space-x-8 pt-16">
          {[
            { value: "100%", label: "آمان", color: primaryColor },
            { value: "24/7", label: "متابعة", color: primaryColor },
            { value: "1000+", label: "عائلة", color: primaryColor },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-all duration-300"
            >
              <div
                className="text-4xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom SVG Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-32 md:h-40"
          preserveAspectRatio="none"
        >
          <path
            fill={primaryColor}
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,149.3C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <div
          className="flex flex-col items-center text-gray-700 hover:text-[#3AA7CE] transition-all duration-300 cursor-pointer group"
          onClick={() =>
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-sm mb-3 font-medium">اكتشف المزيد</span>
          <div
            className="w-8 h-12 rounded-full flex justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-[#3AA7CE] border-2"
            style={{ borderColor: `${primaryColor}80` }}
          >
            <div
              className="w-1 h-4 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
