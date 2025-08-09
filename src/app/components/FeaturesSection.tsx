"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      id: 1,
      title: "تسجيل غياب",
      subtitle: "Easy Absence Registration",
      description:
        "بكل سهولة يستطيع ولي الأمر أو الطالب تسجيل غياب من خلال التطبيق في حالة عدم رغبتة بالذهاب بالباص المدرسي لأي يوم من الأسبوع.",
      color: "from-red-500 to-pink-500",
      accentColor: "red",
      gradient: "from-red-50 to-pink-50",
      icon: "📋",
    },
    {
      id: 2,
      title: "تتبع الباص المدرسي",
      subtitle: "Real-time Bus Tracking",
      description:
        "مع خدمة التتبع اللحظية من تطبيق باص واي، يمكن للمستفيد من الخدمة معرفة الموقع الفعلي للباص المدرسي ومعرفة موقع الطالب بعد صعوده للباص المدرسي.",
      color: "from-blue-500 to-indigo-500",
      accentColor: "blue",
      gradient: "from-blue-50 to-indigo-50",
      icon: "📍",
    },
    {
      id: 3,
      title: "إشعارات لكل شئ",
      subtitle: "Smart Notifications",
      description:
        "مع خدمة الإشعارات الفورية بنغمتها المميزة، تكون على اطلاع مستمر على كل ما يطرأ على حركة الباص المدرسي، مع وصول تنبيهات آلية متزامنة مع الموقع الفعلي للباص المدرسي.",
      color: "from-yellow-500 to-orange-500",
      accentColor: "yellow",
      gradient: "from-yellow-50 to-orange-50",
      icon: "🔔",
    },
    {
      id: 4,
      title: "تواصل مع المدرسة",
      subtitle: "Direct School Communication",
      description:
        "مع خدمة الرسائل الفورية، يستطيع الطالب وولي الأمر التواصل مباشرة مع المدرسة من خلال التطبيق مما يوفر بيئة تواصل مميزة وفعالة.",
      color: "from-green-500 to-emerald-500",
      accentColor: "green",
      gradient: "from-green-50 to-emerald-50",
      icon: "💬",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-pink-200/10 to-orange-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 md:mb-24 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/30 text-blue-600 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            مميزات متقدمة
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              تقنية متطورة
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            نعمل في باص واي بكل شغف لأجل توفير وسيلة تتبع وتواصل مناسبة بين مقدم
            الخدمة والمستفيد من الخدمة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                activeFeature === index
                  ? `bg-gradient-to-r ${feature.gradient} shadow-lg border-${feature.accentColor}-200 scale-105`
                  : "bg-white shadow-sm border border-gray-200 hover:shadow-md"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div
                className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-1 mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center text-2xl">
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
                <div className="absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
              )}
            </div>
          ))}
        </div>

        <div
          className={`mt-16 bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`h-2 bg-gradient-to-r ${features[activeFeature].color}`}
          ></div>
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${features[activeFeature].color} mr-3`}
              ></div>
              <h3 className="text-xl font-bold text-gray-900">
                {features[activeFeature].title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {features[activeFeature].description}
            </p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { number: "1000+", label: "عائلة مستفيدة", icon: "👨‍👩‍👧‍👦" },
            { number: "50+", label: "مدرسة شريكة", icon: "🏫" },
            { number: "24/7", label: "خدمة متواصلة", icon: "⏰" },
            { number: "99.9%", label: "وقت التشغيل", icon: "🚀" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 md:p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-500 transform hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105">
            <span className="relative z-10 flex items-center justify-center">
              <span className="ml-2 text-xl">🚀</span>
              جرب جميع المميزات الآن
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          preserveAspectRatio="none"
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
