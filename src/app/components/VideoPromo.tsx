"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Captions,
  PictureInPicture,
  Download,
  Star,
  Users,
  Shield,
} from "lucide-react";

const VideoPromo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const videoRef = useRef(null);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: any) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e: any) => {
    setCurrentTime(e.target.value);
  };

  const features = [
    {
      icon: "🚌",
      title: "Real-time GPS Tracking",
      desc: "تتبع مباشر ودقيق",
      color: "from-[#3AA7CE] to-[#3AA7CE]/80",
    },
    {
      icon: "🔔",
      title: "Parent Notifications",
      desc: "إشعارات فورية للوالدين",
      color: "from-[#3AA7CE] to-[#2E86AB]",
    },
    {
      icon: "🛡️",
      title: "Safety First",
      desc: "الأمان أولاً",
      color: "from-[#3AA7CE] to-[#1E5F7A]",
    },
    {
      icon: "⚡",
      title: "Route Optimization",
      desc: "تحسين المسارات",
      color: "from-[#3AA7CE] to-[#0F4C75]",
    },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(featureInterval);
  }, []);

  return (
    <section
      id="VideoPromo"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#0F4C75] to-[#1E5F7A] overflow-hidden"
      dir="rtl"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,167,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(58,167,206,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-[#3AA7CE]/20 to-[#2E86AB]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-r from-[#3AA7CE]/15 to-[#1E5F7A]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2E86AB]/10 to-[#0F4C75]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Geometric Shapes */}
        <div
          className="absolute top-40 left-20 w-16 h-16 border-2 border-[#3AA7CE]/30 rounded-2xl rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-40 right-32 w-12 h-12 bg-[#3AA7CE]/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-8 h-20 bg-gradient-to-b from-[#3AA7CE]/30 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8">
            <div className="flex gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
              <Star
                className="w-4 h-4 text-yellow-400 fill-current animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <Star
                className="w-4 h-4 text-yellow-400 fill-current animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">
              الحل الأمثل للنقل المدرسي
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#3AA7CE] via-[#3AA7CE]/90 to-[#2E86AB] bg-clip-text text-transparent animate-pulse">
              Busway
            </span>
            <br />
            <span className="text-white/90 relative">
              School Tracker
              <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-[#3AA7CE] via-[#3AA7CE]/90 to-[#2E86AB] rounded-full"></div>
            </span>
          </h1>

          <p className="text-2xl text-[#3AA7CE]/90 font-light mb-4 leading-relaxed">
            تطبيق باص واي لتتبع الباص المدرسي
          </p>
          <p className="text-lg text-[#3AA7CE]/90 opacity-90 flex items-center justify-center gap-4">
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safe
            </span>
            <span className="w-2 h-2 bg-[#3AA7CE] rounded-full"></span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Reliable
            </span>
            <span className="w-2 h-2 bg-[#2E86AB] rounded-full"></span>
            <span>Real-time Tracking</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
          {/* Video Container - Left Side */}
          <div className="xl:col-span-8">
            <div
              className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-700 ${
                isHovered
                  ? "transform -translate-y-4 shadow-3xl bg-white/10 border-white/20"
                  : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#3AA7CE]/20 to-[#2E86AB]/20 rounded-2xl blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-[#3AA7CE]/20 to-[#1E5F7A]/20 rounded-2xl blur-xl"></div>

              {/* Video Player with Enhanced Shape */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black group">
                {/* Video Container with Custom Shape */}
                <div className="relative aspect-video">
                  <iframe
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src="https://www.youtube.com/embed/dbwIKgG16Cs?autoplay=0&controls=0&disablekb=1&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1"
                    title="Busway School Bus Tracking App"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner Decorations */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3AA7CE]/30 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#2E86AB]/30 to-transparent rounded-tr-full"></div>

                  {/* Enhanced Play Button */}
                  <button
                    onClick={togglePlay}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      isPlaying
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <div className="relative">
                      {/* Pulse Rings */}
                      <div className="absolute inset-0 w-32 h-32 border-4 border-white/30 rounded-full animate-ping"></div>
                      <div
                        className="absolute inset-2 w-28 h-28 border-2 border-white/20 rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      ></div>

                      {/* Main Button */}
                      <div className="relative w-24 h-24 bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] rounded-full flex items-center justify-center hover:from-[#3AA7CE]/90 hover:to-[#2E86AB]/90 transition-all duration-300 transform hover:scale-110 shadow-2xl">
                        <Play className="w-10 h-10 text-white ml-1 drop-shadow-lg" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Enhanced Video Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 transition-all duration-500 ${
                    showControls || isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(to right, #3AA7CE 0%, #2E86AB ${
                            (currentTime / duration) * 100
                          }%, rgba(255,255,255,0.2) ${
                            (currentTime / duration) * 100
                          }%, rgba(255,255,255,0.2) 100%)`,
                        }}
                      />
                      {/* Progress Indicator */}
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] rounded-full shadow-lg border-2 border-white"
                        style={{
                          left: `${(currentTime / duration) * 100}%`,
                          marginLeft: "-8px",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="w-14 h-14 bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] hover:from-[#3AA7CE]/90 hover:to-[#2E86AB]/90 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        )}
                      </button>

                      {/* Time Display */}
                      <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-base font-mono border border-white/20">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className="w-12 h-12 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-2 bg-white/20 rounded-full appearance-none cursor-pointer hidden sm:block volume-slider"
                        />
                      </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      {[Captions, Settings, PictureInPicture, Maximize].map(
                        (Icon, idx) => (
                          <button
                            key={idx}
                            className="w-12 h-12 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm hover:border-white/30"
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Sidebar - Right Side */}
          <div className="xl:col-span-4 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black text-white mb-2">10K+</div>
                <div className="text-[#3AA7CE]/90 text-sm">مستخدم نشط</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black text-white mb-2">99.9%</div>
                <div className="text-[#2E86AB]/90 text-sm">معدل الأمان</div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                    activeFeature === index
                      ? "bg-white/15 border-white/30 shadow-2xl"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      feature.color
                    } opacity-10 ${
                      activeFeature === index ? "opacity-20" : ""
                    } transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${
                        feature.color
                      } flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                        activeFeature === index ? "scale-110" : ""
                      }`}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[#3AA7CE]/90 text-sm opacity-90">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7CE]/10 via-[#2E86AB]/10 to-[#1E5F7A]/10 rounded-3xl"></div>

            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-[#3AA7CE]/20 to-[#2E86AB]/20 rounded-full blur-2xl animate-pulse"></div>
            <div
              className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-[#3AA7CE]/20 to-[#1E5F7A]/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-6 mb-8">
                <span className="text-5xl animate-bounce">🚌</span>
                <span
                  className="text-5xl animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  📱
                </span>
                <span
                  className="text-5xl animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  🛡️
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#3AA7CE] via-[#3AA7CE]/90 to-[#2E86AB] bg-clip-text text-transparent mb-6 leading-tight">
                مع باص واي ... كن مطمئن
              </h3>

              <p className="text-xl text-[#3AA7CE]/90 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                انضم إلى آلاف المستخدمين الذين يثقون في باص واي لضمان سلامة
                وراحة أطفالهم
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-[#3AA7CE] to-[#2E86AB] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 text-lg border border-white/20">
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2E86AB] to-[#1E5F7A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex items-center gap-4">
                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                    <span>تحميل التطبيق الآن</span>
                    <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
                  </div>
                </button>

                <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105 text-lg">
                  مشاهدة العرض التوضيحي
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-[#3AA7CE]/90 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3AA7CE] rounded-full animate-pulse"></div>
                  متوفر على iOS
                </span>
                <span className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-[#3AA7CE] rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  متوفر على Android
                </span>
                <span className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-[#2E86AB] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  مجاني للتحميل
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Wave Design */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="waveGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#3AA7CE", stopOpacity: 0.4 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#2E86AB", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#1E5F7A", stopOpacity: 0.4 }}
              />
            </linearGradient>
            <linearGradient
              id="waveGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#2E86AB", stopOpacity: 0.6 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#1E5F7A", stopOpacity: 0.4 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0F4C75", stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C240,80 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z"
            fill="url(#waveGradient1)"
            className="animate-pulse"
          />
          <path
            d="M0,60 C360,20 720,100 1080,40 C1200,20 1320,60 1440,40 L1440,120 L0,120 Z"
            fill="url(#waveGradient2)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3aa7ce, #2e86ab);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 20px rgba(58, 167, 206, 0.5);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 25px rgba(58, 167, 206, 0.7);
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3aa7ce, #2e86ab);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 10px rgba(58, 167, 206, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3aa7ce, #2e86ab);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 20px rgba(58, 167, 206, 0.5);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default VideoPromo;
