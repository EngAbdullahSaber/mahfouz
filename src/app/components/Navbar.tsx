"use client";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const primaryColor = "#3AA7CE";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "fixed bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50"
            : "relative bg-[#134c61c7]"
        }`}
        style={{ "--primary-color": primaryColor } as React.CSSProperties}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div
                  className={`h-12 lg:h-14 px-4 py-2 rounded-xl font-bold text-lg lg:text-xl transition-all duration-300 flex items-center ${
                    isScrolled
                      ? "text-white shadow-md"
                      : "text-white border border-white/30 shadow-lg"
                  }`}
                  style={{
                    backgroundColor: isScrolled
                      ? primaryColor
                      : "rgba(255, 255, 255, 0.15)",
                    backdropFilter: isScrolled ? "none" : "blur(10px)",
                  }}
                  onClick={() => scrollToSection("home")}
                >
                  <img
                    src="/logo white@3x 1 (1).png"
                    alt="شعار الشركة"
                    className="w-[90px] lg:w-[100px] h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 space-x-reverse">
              <ul className="flex items-center space-x-1 lg:space-x-2 space-x-reverse">
                {[
                  { href: "home", text: "الرئيسية" },
                  { href: "features", text: "مميزات التطبيق" },
                  { href: "pricing", text: "المستهدفون" },
                  { href: "download", text: "التحميل" },
                  { href: "video", text: "فيديو برومو" },
                ].map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-4 lg:px-6 py-2.5 lg:py-3 font-medium transition-all duration-300 rounded-lg group hover:scale-105 ${
                        isScrolled
                          ? "text-gray-700 hover:text-white hover:bg-[#3AA7CE] hover:shadow-md"
                          : "text-white/95 hover:text-white hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30"
                      }`}
                    >
                      {item.text}
                      <span
                        className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300 rounded-full ${
                          isScrolled ? "bg-[#3AA7CE]" : "bg-white"
                        }`}
                      ></span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Login Button */}
              <button
                className={`relative px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group ml-4`}
                style={{
                  backgroundColor: isScrolled ? primaryColor : "white",
                  color: isScrolled ? "white" : "rgb(55, 65, 81)",
                }}
              >
                <span className="relative z-10">الدخول</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-110"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-0.5" : "mb-1"
                  } ${isScrolled && !isMenuOpen ? "bg-gray-700" : "bg-white"}`}
                  style={{
                    backgroundColor: isMenuOpen ? primaryColor : "",
                    transformOrigin: "center",
                  }}
                />
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0 scale-0" : "mb-1"
                  } ${isScrolled && !isMenuOpen ? "bg-gray-700" : "bg-white"}`}
                />
                <div
                  className={`h-0.5 w-6 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
                  } ${isScrolled && !isMenuOpen ? "bg-gray-700" : "bg-white"}`}
                  style={{
                    backgroundColor: isMenuOpen ? primaryColor : "",
                    transformOrigin: "center",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 pb-6 translate-y-0"
              : "max-h-0 opacity-0 overflow-hidden -translate-y-4"
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
              {[
                { href: "home", text: "الرئيسية" },
                { href: "features", text: "مميزات التطبيق" },
                { href: "pricing", text: "المستهدفون" },
                { href: "download", text: "التحميل" },
                { href: "video", text: "فيديو برومو" },
                { href: "contact", text: "تواصل معنا" },
              ].map((item, index) => (
                <li
                  key={item.href}
                  className="transform transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`block font-medium py-3.5 px-5 rounded-xl transition-all duration-200 w-full text-right hover:scale-[1.02] active:scale-[0.98] ${
                      isScrolled
                        ? "text-gray-700 hover:text-white hover:bg-[#3AA7CE] hover:shadow-md border border-transparent hover:border-[#3AA7CE]/20"
                        : "text-gray-800 hover:text-[#3AA7CE] hover:bg-white/80 border border-gray-200/50 hover:border-[#3AA7CE]/30 hover:shadow-md"
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200/30">
                <button
                  className="block px-6 py-4 rounded-xl font-medium text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                  }}
                >
                  الدخول
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
