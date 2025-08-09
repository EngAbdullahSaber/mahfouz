"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const FooterSection = () => {
  const primaryColor = "#3AA7CE";
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://api.whatsapp.com/send?phone=966555227377",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
        </svg>
      ),
      color: "hover:bg-green-400/20 hover:shadow-green-400/25",
    },
    {
      name: "Twitter",
      url: "https://mobile.twitter.com/BusWay_sa",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "hover:bg-blue-400/20 hover:shadow-blue-400/25",
    },
    {
      name: "LinkedIn",
      url: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:bg-blue-600/20 hover:shadow-blue-600/25",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/busway_sa/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.999.01 6.756.048 5.517.087 4.668.222 3.935.42a5.88 5.88 0 0 0-2.134 1.39A5.888 5.888 0 0 0 .42 3.946C.222 4.68.087 5.527.048 6.766.008 8.008 0 8.405 0 12.017c0 3.611.008 4.008.048 5.25.039 1.24.174 2.087.372 2.82.196.792.512 1.513 1.38 2.134a5.888 5.888 0 0 0 2.135 1.38c.733.198 1.58.333 2.819.372 1.242.04 1.639.048 5.251.048 3.611 0 4.008-.008 5.25-.048 1.24-.039 2.087-.174 2.82-.372.792-.196 1.513-.512 2.134-1.38a5.888 5.888 0 0 0 1.38-2.135c.198-.733.333-1.58.372-2.819.04-1.242.048-1.639.048-5.251 0-3.611-.008-4.008-.048-5.25-.039-1.24-.174-2.087-.372-2.82a5.888 5.888 0 0 0-1.38-2.134A5.888 5.888 0 0 0 20.054.42c-.733-.198-1.58-.333-2.819-.372C16.008.008 15.611 0 12.017 0zM12.017 2.167c3.555 0 3.98.014 5.384.052 1.298.06 2.005.278 2.476.46.622.242 1.065.532 1.531.998.466.466.756.909.998 1.531.182.471.4 1.178.46 2.476.038 1.404.052 1.829.052 5.384 0 3.555-.014 3.98-.052 5.384-.06 1.298-.278 2.005-.46 2.476-.242.622-.532 1.065-.998 1.531-.466.466-.909.756-1.531.998-.471.182-1.178.4-2.476.46-1.404.038-1.829.052-5.384.052-3.555 0-3.98-.014-5.384-.052-1.298-.06-2.005-.278-2.476-.46-.622-.242-1.065-.532-1.531-.998-.466-.466-.756-.909-.998-1.531-.182-.471-.4-1.178-.46-2.476C2.181 15.997 2.167 15.572 2.167 12.017c0-3.555.014-3.98.052-5.384.06-1.298.278-2.005.46-2.476.242-.622.532-1.065.998-1.531.466-.466.909-.756 1.531-.998.471-.182 1.178-.4 2.476-.46 1.404-.038 1.829-.052 5.384-.052z" />
          <path d="M12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          <circle cx="18.406" cy="5.594" r="1.44" />
        </svg>
      ),
      color: "hover:bg-pink-400/20 hover:shadow-pink-400/25",
    },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "هاتف",
      value: "0555227377",
      href: "tel:+966555227377",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "جوال",
      value: "0555227377",
      href: "tel:+966555227377",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "البريد الإلكتروني",
      value: "masarksa707@gmail.com",
      href: "mailto:masarksa707@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "العنوان",
      value: "المملكة العربية السعودية - القصيم",
      href: "#",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer
      className="relative bg-slate-900 overflow-hidden"
      style={{ "--primary-color": primaryColor } as React.CSSProperties}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: `${primaryColor}20` }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: `${primaryColor}20` }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${primaryColor}10` }}
        ></div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-slate-900/50">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
            style={{ color: `${primaryColor}20` }}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
            style={{ color: `${primaryColor}30` }}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
            style={{ color: `${primaryColor}40` }}
          ></path>
        </svg>
      </div>

      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Main Content Container */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-blue-500/25"
              style={{ backgroundColor: primaryColor }}
            >
              <svg
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Busway
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              تطبيق باص واي لتتبع الباصات المدرسية - نحو رحلة آمنة ومريحة
              لأطفالكم
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* App Download Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white text-center lg:text-right mb-8">
                حمل التطبيق الآن
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-black/30 to-gray-900/30 hover:from-black/50 hover:to-gray-900/50 border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300">
                        Download on the
                      </div>
                      <div className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                        App Store
                      </div>
                    </div>
                  </div>
                </button>

                <button className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-black/30 to-gray-900/30 hover:from-black/50 hover:to-gray-900/50 border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300">Get it on</div>
                      <div className="text-base font-semibold text-white group-hover:text-green-200 transition-colors">
                        Google Play
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white text-center lg:text-right mb-8">
                معلومات التواصل
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="group flex items-center space-x-4 p-5 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl hover:from-white/10 hover:to-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10"
                      style={{ backgroundColor: `${primaryColor}20` }}
                    >
                      <div
                        className="group-hover:text-blue-300 transition-colors"
                        style={{ color: primaryColor }}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm font-medium text-gray-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-white font-semibold group-hover:text-blue-200 transition-colors flex items-center">
                        {item.value}
                        {item.href !== "#" && (
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        )}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-white/10 pt-12 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">
                تابعنا على وسائل التواصل الاجتماعي
              </h3>

              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:shadow-xl ${social.color}`}
                    aria-label={social.name}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-500/10 group-hover:to-blue-500/10 transition-all duration-300"
                      style={{
                        backgroundImage: `linear-gradient(${primaryColor}00, ${primaryColor}10)`,
                      }}
                    ></div>
                    <div className="relative z-10">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-right">
                جميع الحقوق محفوظة © 2025 Busway - تطوير وتصميم بكل
                <span className="text-red-400 mx-1">❤️</span>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                  style={{ textDecorationColor: primaryColor }}
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                  style={{ textDecorationColor: primaryColor }}
                >
                  شروط الاستخدام
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                  style={{ textDecorationColor: primaryColor }}
                >
                  الأسئلة الشائعة
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 left-8 w-14 h-14 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 backdrop-blur-sm border border-white/20"
        style={{ backgroundColor: primaryColor }}
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default FooterSection;
