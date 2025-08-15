"use client";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Phone, Mail, MapPin, ExternalLink, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

interface SocialLinks {
  whatsapp?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  region?: string;
}

interface DownloadLinks {
  appStore?: string;
  googlePlay?: string;
}

interface MetaData {
  social?: SocialLinks;
  contact?: ContactInfo;
}

interface SectionData {
  id: string;
  sectionName: string;
  title: {
    en: string;
    ar: string;
    tk: string;
  };
  subTitle: {
    en: string;
    ar: string;
    tk: string;
  };
  links?: DownloadLinks;
  meta?: MetaData;
}

interface ResponseData {
  data?: SectionData[];
}

// Memoized Wave component for better performance
const WaveBackground = ({ primaryColor }: { primaryColor: any }) => (
  <svg
    className="absolute top-0 left-0 w-full h-20 pointer-events-none"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style={{ stopColor: `${primaryColor}`, stopOpacity: 0.1 }}
        />
        <stop
          offset="50%"
          style={{ stopColor: `${primaryColor}`, stopOpacity: 0.2 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: `${primaryColor}`, stopOpacity: 0.1 }}
        />
      </linearGradient>
    </defs>
    <path
      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
      fill="url(#wave-gradient)"
      className="animate-pulse"
      style={{ animationDuration: "4s" }}
    />
  </svg>
);

// Memoized Social Icon component
const SocialIcon = ({
  social,
  primaryColor,
}: {
  social: any;
  primaryColor: any;
}) => (
  <Link
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative overflow-hidden"
    aria-label={social.name}
  >
    <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center text-slate-300 transition-all duration-300 hover:scale-110 hover:border-slate-500 hover:-translate-y-1 hover:shadow-lg">
      {/* Animated background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
        style={{ backgroundColor: social.bgColor || primaryColor }}
      />
      {/* Icon */}
      <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {social.icon}
      </div>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"
        style={{ backgroundColor: social.bgColor || primaryColor }}
      />
    </div>
  </Link>
);

const FooterSection = ({ data }: ResponseData) => {
  const primaryColor = "#22488F";
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = useTranslations("FooterSection");
  const { locale } = useParams();
  const downloadSection = useMemo(
    () => data?.find((section) => section.sectionName === "footer"),
    [data]
  );

  // Optimized social links with better colors
  const socialLinks = useMemo(
    () => [
      {
        name: "WhatsApp",
        url: `https://api.whatsapp.com/send?phone=${
          downloadSection?.meta?.social?.whatsapp || "966555227377"
        }`,
        bgColor: "#25D366",
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
          </svg>
        ),
      },
      {
        name: "Twitter",
        url:
          downloadSection?.meta?.social?.twitter ||
          "https://mobile.twitter.com/",
        bgColor: "#1DA1F2",
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        ),
      },
      {
        name: "Facebook",
        url: downloadSection?.meta?.social?.facebook || "#",
        bgColor: "#4267B2",
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        ),
      },
      {
        name: "Instagram",
        url:
          downloadSection?.meta?.social?.instagram ||
          "https://www.instagram.com/",
        bgColor: "#E4405F",
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 7.999.01 6.756.048 5.517.087 4.668.222 3.935.42a5.88 5.88 0 0 0-2.134 1.39A5.888 5.888 0 0 0 .42 3.946C.222 4.68.087 5.527.048 6.766.008 8.008 0 8.405 0 12.017c0 3.611.008 4.008.048 5.25.039 1.24.174 2.087.372 2.82.196.792.512 1.513 1.38 2.134a5.888 5.888 0 0 0 2.135 1.38c.733.198 1.58.333 2.819.372 1.242.04 1.639.048 5.251.048 3.611 0 4.008-.008 5.25-.048 1.24-.039 2.087-.174 2.82-.372.792-.196 1.513-.512 2.134-1.38a5.888 5.888 0 0 0 1.38-2.135c.198-.733.333-1.58.372-2.819.04-1.242.048-1.639.048-5.251 0-3.611-.008-4.008-.048-5.25-.039-1.24-.174-2.087-.372-2.82a5.888 5.888 0 0 0-1.38-2.134A5.888 5.888 0 0 0 20.054.42c-.733-.198-1.58-.333-2.819-.372C16.008.008 15.611 0 12.017 0zM12.017 2.167c3.555 0 3.98.014 5.384.052 1.298.06 2.005.278 2.476.46.622.242 1.065.532 1.531.998.466.466.756.909.998 1.531.182.471.4 1.178.46 2.476.038 1.404.052 1.829.052 5.384 0 3.555-.014 3.98-.052 5.384-.06 1.298-.278 2.005-.46 2.476-.242.622-.532 1.065-.998 1.531-.466.466-.909.756-1.531.998-.471.182-1.178.4-2.476.46-1.404.038-1.829.052-5.384.052-3.555 0-3.98-.014-5.384-.052-1.298-.06-2.005-.278-2.476-.46-.622-.242-1.065-.532-1.531-.998-.466-.466-.756-.909-.998-1.531-.182-.471-.4-1.178-.46-2.476C2.181 15.997 2.167 15.572 2.167 12.017c0-3.555.014-3.98.052-5.384.06-1.298.278-2.005.46-2.476.242-.622.532-1.065.998-1.531.466-.466.909-.756 1.531-.998.471-.182 1.178-.4 2.476-.46 1.404-.038 1.829-.052 5.384-.052z" />
            <path d="M12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
            <circle cx="18.406" cy="5.594" r="1.44" />
          </svg>
        ),
      },
    ],
    [downloadSection]
  );

  // Optimized contact info
  const contactInfo = useMemo(
    () => [
      {
        icon: <Phone className="w-5 h-5" />,
        label: t("contact.phone.label"),
        value:
          downloadSection?.meta?.contact?.phone || t("contact.phone.value"),
        href: `tel:${downloadSection?.meta?.contact?.phone || "+966555227377"}`,
        color: "text-blue-400",
      },
      {
        icon: <Mail className="w-5 h-5" />,
        label: t("contact.email.label"),
        value:
          downloadSection?.meta?.contact?.email || t("contact.email.value"),
        href: `mailto:${
          downloadSection?.meta?.contact?.email || "masarksa707@gmail.com"
        }`,
        color: "text-green-400",
      },
      {
        icon: <MapPin className="w-5 h-5" />,
        label: t("contact.address.label"),
        value:
          downloadSection?.meta?.contact?.region || t("contact.address.value"),
        href: "#",
        color: "text-purple-400",
      },
    ],
    [t, downloadSection]
  );

  // Optimized scroll handling
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.pageYOffset > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Optimized Background Effects */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating orbs with CSS animations */}
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: `${primaryColor}15`,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: `${primaryColor}10`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: `${primaryColor}08`,
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Wave Background */}
      <WaveBackground primaryColor={primaryColor} />

      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Container with glass effect */}
        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="text-center py-16 px-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition-all duration-500"
              style={{ backgroundColor: primaryColor }}
            >
              <Image
                width={100}
                height={60}
                src="/logo white@3x 1 (1).png"
                alt="Company Logo"
                className="w-[100px] h-[60px]"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {locale == "en"
                ? downloadSection?.title.en
                : locale == "ar"
                ? downloadSection?.title.ar
                : downloadSection?.title.tk}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {locale == "en"
                ? downloadSection?.subTitle.en
                : locale == "ar"
                ? downloadSection?.subTitle.ar
                : downloadSection?.subTitle.tk}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Download Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center lg:text-left mb-6">
                {t("downloadTitle")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* App Store Button */}
                <Link
                  href={downloadSection?.links?.appStore || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden"
                >
                  <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 rounded-2xl p-4 transition-all duration-300 hover:from-slate-600 hover:to-slate-700 hover:border-slate-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">
                          {t("download.on")}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {t("download.appStore")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Play Store Button */}
                <Link
                  href={downloadSection?.links?.googlePlay || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden"
                >
                  <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 rounded-2xl p-4 transition-all duration-300 hover:from-slate-600 hover:to-slate-700 hover:border-slate-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">
                          {t("download.get")}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {t("download.playStore")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center lg:text-left mb-6">
                {t("contact.title")}
              </h3>

              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex items-center space-x-4 p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl hover:bg-slate-600/40 hover:border-slate-500/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg bg-slate-600/50 border border-slate-500/50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-400">
                        {item.label}
                      </p>
                      <p className="text-white font-semibold group-hover:text-blue-200 transition-colors flex items-center">
                        {item.value}
                        {item.href !== "#" && (
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-slate-700/50 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              {t("social.title")}
            </h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  social={social}
                  primaryColor={primaryColor}
                />
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700/50 px-8 py-6 bg-slate-800/30">
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                {t("copyright")}
                <span className="text-red-400 mx-2">♥</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 text-white rounded-xl shadow-lg transition-all duration-300 z-50 backdrop-blur-sm border border-slate-600/50 ${
          showScrollTop
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-2 pointer-events-none"
        }`}
        style={{ backgroundColor: primaryColor }}
        aria-label={t("scrollToTop")}
      >
        <ChevronUp className="w-5 h-5 mx-auto" />
      </button>

      {/* CSS Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;
