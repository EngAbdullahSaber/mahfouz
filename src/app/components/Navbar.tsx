"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const primaryColor = "#22488F";
  const t = useTranslations("NavBar");
  const { locale } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Memoized language options to prevent re-creation
  const languages = useMemo(
    () => [
      { code: "ar", name: "العربية", flag: "🇸🇦" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "tk", name: "Türkçe", flag: "🇹🇷" },
    ],
    []
  );

  // Memoized navigation items
  const navItems = useMemo(
    () => [
      { href: "home", text: "home" },
      { href: "features", text: "features" },
      { href: "pricing", text: "pricing" },
      { href: "download", text: "download" },
      { href: "video", text: "video" },
    ],
    []
  );

  const currentLanguage = useMemo(
    () => languages.find((lang) => lang.code === locale) || languages[0],
    [locale, languages]
  );

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 50;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  }, [isScrolled]);

  // Throttled scroll event listener
  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Optimized click outside handler
  useEffect(() => {
    if (!isMenuOpen && !isLanguageDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
      if (isLanguageDropdownOpen && !target.closest(".language-dropdown")) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, { passive: true });
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, isLanguageDropdownOpen]);

  // Optimized callbacks
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageDropdownOpen((prev) => !prev);
  }, []);

  const changeLanguage = useCallback(
    (langCode: string) => {
      const currentPath = pathname.replace(`/${locale}`, "");
      router.push(`/${langCode}${currentPath}`);
      setIsLanguageDropdownOpen(false);
      setIsMenuOpen(false);
    },
    [pathname, locale, router]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  }, []);

  const closeBackdrop = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoized styles
  const navbarClasses = useMemo(
    () =>
      `top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "fixed bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50"
          : "relative bg-[#22488F]"
      }`,
    [isScrolled]
  );

  const logoClasses = useMemo(
    () =>
      `h-12 lg:h-14 px-4 py-2 rounded-xl font-bold text-lg lg:text-xl transition-all duration-300 flex items-center cursor-pointer transform hover:scale-105 active:scale-95 ${
        isScrolled
          ? "text-white shadow-lg hover:shadow-xl"
          : "text-white border border-white/30 shadow-lg hover:shadow-2xl"
      }`,
    [isScrolled]
  );

  const logoStyle = useMemo(
    () => ({
      backgroundColor: isScrolled ? primaryColor : "rgba(255, 255, 255, 0.15)",
      backdropFilter: isScrolled ? "none" : "blur(10px)",
    }),
    [isScrolled]
  );

  return (
    <>
      {/* Optimized backdrop with CSS animation */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeBackdrop}
      />

      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className={logoClasses}
                style={logoStyle}
                onClick={() => scrollToSection("home")}
              >
                <Image
                  width={100}
                  height={70}
                  src="/logo white@3x 1 (1).png"
                  alt="شعار الشركة"
                  className="w-[90px] lg:w-[100px] h-auto"
                  priority
                  quality={85}
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 space-x-reverse">
              <ul className="flex items-center space-x-1 lg:space-x-2 space-x-reverse">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-4 lg:px-6 py-2.5 lg:py-3 font-medium transition-all duration-200 ease-out rounded-lg group transform hover:scale-105 active:scale-95 ${
                        isScrolled
                          ? "text-gray-700 hover:text-white hover:bg-[#22488F] hover:shadow-md"
                          : "text-white/95 hover:text-white hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30"
                      }`}
                    >
                      {t(item.text)}
                      <span
                        className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full transform -translate-x-1/2 ${
                          isScrolled ? "bg-[#22488F]" : "bg-white"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Language Switcher - Desktop */}
              <div className="relative language-dropdown">
                <button
                  onClick={toggleLanguageDropdown}
                  className={`flex items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 group ${
                    isScrolled
                      ? "text-gray-700 hover:text-white hover:bg-[#22488F] hover:shadow-md"
                      : "text-white/95 hover:text-white hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30"
                  }`}
                >
                  <span className="text-lg mr-2">{currentLanguage.flag}</span>
                  <span className="hidden lg:inline">
                    {currentLanguage.name}
                  </span>
                  <span className="lg:hidden">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                      isLanguageDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Language Dropdown with improved animation */}
                <div
                  className={`absolute top-full mt-2 ${
                    locale === "ar" ? "left-0" : "right-0"
                  } w-48 rounded-xl shadow-lg border transition-all duration-200 ease-out transform origin-top ${
                    isLanguageDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  } ${
                    isScrolled
                      ? "bg-white/98 backdrop-blur-sm border-gray-200/80"
                      : "bg-white/95 backdrop-blur-lg border-white/30"
                  }`}
                >
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-[#22488F] hover:text-white transition-all duration-150 ease-out first:rounded-t-xl last:rounded-b-xl transform hover:scale-[1.02] active:scale-[0.98] ${
                        lang.code === locale
                          ? "bg-[#22488F]/10 text-[#22488F] font-medium"
                          : ""
                      }`}
                      style={{
                        transitionDelay: isLanguageDropdownOpen
                          ? `${index * 30}ms`
                          : "0ms",
                      }}
                    >
                      <span className="text-lg mr-3">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {lang.code === locale && (
                        <svg
                          className="w-4 h-4 ml-auto animate-in fade-in duration-200"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Improved Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none p-2 rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:scale-110 active:scale-90 focus:ring-2 focus:ring-white/50"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-out ${
                    isMenuOpen ? "rotate-45 translate-y-0.5" : "mb-1"
                  }`}
                  style={{
                    backgroundColor: isMenuOpen
                      ? primaryColor
                      : isScrolled
                      ? "#374151"
                      : "white",
                    transformOrigin: "center",
                  }}
                />
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-out ${
                    isMenuOpen ? "opacity-0 scale-0" : "mb-1"
                  }`}
                  style={{
                    backgroundColor: isScrolled ? "#374151" : "white",
                  }}
                />
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
                  }`}
                  style={{
                    backgroundColor: isMenuOpen
                      ? primaryColor
                      : isScrolled
                      ? "#374151"
                      : "white",
                    transformOrigin: "center",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Improved Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-400 ease-out overflow-hidden ${
            isMenuOpen
              ? "max-h-[600px] opacity-100 pb-6 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div
            className={`rounded-2xl p-6 mx-2 mt-2 border shadow-2xl transition-all duration-300 ${
              isScrolled
                ? "bg-white/98 backdrop-blur-sm border-gray-200/80"
                : "bg-white/95 backdrop-blur-lg border-white/30"
            }`}
          >
            <ul className="flex flex-col space-y-1 text-right">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className="transform transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: isMenuOpen
                      ? "translateX(0) translateY(0)"
                      : "translateX(-10px) translateY(-5px)",
                  }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`block font-medium py-3.5 px-5 rounded-xl transition-all duration-200 ease-out w-full text-right transform hover:scale-[1.02] active:scale-[0.98] ${
                      isScrolled
                        ? "text-gray-700 hover:text-white hover:bg-[#22488F] hover:shadow-md border border-transparent hover:border-[#22488F]/20"
                        : "text-gray-800 hover:text-[#22488F] hover:bg-white/80 border border-gray-200/50 hover:border-[#22488F]/30 hover:shadow-md"
                    }`}
                  >
                    {t(item.text)}
                  </button>
                </li>
              ))}

              {/* Language Switcher - Mobile */}
              <li className="pt-4 border-t border-gray-200/30">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3 px-2 font-medium">
                    {t("Language") || "اللغة"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang, index) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 ease-out border transform hover:scale-[1.02] active:scale-[0.98] ${
                          lang.code === locale
                            ? "bg-[#22488F] text-white border-[#22488F] shadow-md"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-[#22488F]/10 hover:border-[#22488F]/30"
                        }`}
                        style={{
                          transitionDelay: isMenuOpen
                            ? `${(navItems.length + index) * 50}ms`
                            : "0ms",
                        }}
                      >
                        <span className="text-lg mr-2">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </li>

              <li
                className="transform transition-all duration-300 ease-out"
                style={{
                  transitionDelay: isMenuOpen
                    ? `${(navItems.length + languages.length) * 50}ms`
                    : "0ms",
                }}
              ></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
