const DownloadSection = () => {
  return (
    <section
      id="download"
      className="relative py-20 bg-gradient-to-br from-[#0F4C75] via-[#1E5F7A] to-[#3AA7CE] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#3AA7CE]/30 to-[#2E86AB]/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-[#3AA7CE]/20 to-[#1E5F7A]/20 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-[#3AA7CE]/25 to-[#2E86AB]/25 rounded-full blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7CE]/30 to-[#1E5F7A]/30"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[600px] gap-12">
          {/* Mobile Mockup Section */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative">
              {/* Floating Elements around phone */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#3AA7CE] to-[#2E86AB] rounded-2xl opacity-80 rotate-12 animate-pulse flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#3AA7CE] to-[#1E5F7A] rounded-full opacity-70 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              </div>
              <div
                className="absolute top-1/2 -left-12 w-8 h-8 bg-gradient-to-br from-[#3AA7CE] to-[#0F4C75] rounded-lg opacity-60 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>

              {/* Main Phone Container */}
              <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
                <img
                  src="/a84bab02-f90e-4b47-b962-eae18e3ffc7b.png"
                  alt="Busway App Interface"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7CE]/20 to-[#2E86AB]/20 rounded-3xl blur-2xl -z-10 opacity-80"></div>
              </div>

              {/* Floating Features */}
              <div className="absolute -top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-pulse">
                تتبع فوري 🛰️
              </div>
              <div
                className="absolute -bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-bold text-gray-800 shadow-lg animate-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                إشعارات ذكية 🔔
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-3/5 text-center lg:text-right">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
                <span className="w-2 h-2 bg-[#3AA7CE] rounded-full mr-2 animate-pulse"></span>
                متاح للتحميل الآن
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-white to-[#3AA7CE]/80 bg-clip-text text-transparent">
                    حمل التطبيق
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] bg-clip-text text-transparent">
                    الآن مجاناً
                  </span>
                </h2>

                <div className="flex items-center justify-center lg:justify-end space-x-2 text-[#3AA7CE]">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span className="text-white mr-2 text-lg font-medium">
                    4.8
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-lg text-[#3AA7CE]/90 leading-relaxed">
                  متوفر على متجر أبل ستور وقوقل بلاي. احصل على اسم المستخدم
                  وكلمة المرور الخاصة بك من خلال المدرسة أو المركز أو الشركة
                  التابع لها.
                </p>

                <div className="mt-4 flex items-center justify-center lg:justify-end space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#3AA7CE]">📱</span>
                    <span className="text-sm">iOS & Android</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#2E86AB]">🆓</span>
                    <span className="text-sm">مجاني تماماً</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#1E5F7A]">🔒</span>
                    <span className="text-sm">آمان عالي</span>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
                {/* App Store Button */}
                <a
                  href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1504782177"
                  className="group relative inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 min-w-[200px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🍎</div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300">حمل من</div>
                      <div className="text-lg font-bold">App Store</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7CE]/20 to-[#2E86AB]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.busway"
                  className="group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 min-w-[200px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div className="text-right">
                      <div className="text-xs text-[#3AA7CE]/90">حمل من</div>
                      <div className="text-lg font-bold">Google Play</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-[#3AA7CE]/20 to-[#2E86AB]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#3AA7CE]/30">
                <div className="flex items-center justify-center lg:justify-end space-x-2 text-[#3AA7CE]">
                  <span className="text-lg">🎉</span>
                  <span className="font-medium">أكثر من 10,000 تحميل</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V60c240,30 480,30 600,0s360-30 600,0V0H0Z"
            fill="white"
            opacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default DownloadSection;
