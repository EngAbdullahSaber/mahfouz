"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useYouTubePlayer } from "./useYouTubePlayer";

// Dynamically import Lucide icons
const Play = dynamic(() => import("lucide-react").then((mod) => mod.Play), {
  ssr: false,
});
const Pause = dynamic(() => import("lucide-react").then((mod) => mod.Pause), {
  ssr: false,
});
const Volume2 = dynamic(
  () => import("lucide-react").then((mod) => mod.Volume2),
  { ssr: false }
);
const Volume1 = dynamic(
  () => import("lucide-react").then((mod) => mod.Volume1),
  { ssr: false }
);
const Volume = dynamic(() => import("lucide-react").then((mod) => mod.Volume), {
  ssr: false,
});
const VolumeX = dynamic(
  () => import("lucide-react").then((mod) => mod.VolumeX),
  { ssr: false }
);
const Maximize = dynamic(
  () => import("lucide-react").then((mod) => mod.Maximize),
  { ssr: false }
);
const Settings = dynamic(
  () => import("lucide-react").then((mod) => mod.Settings),
  { ssr: false }
);
const Captions = dynamic(
  () => import("lucide-react").then((mod) => mod.Captions),
  { ssr: false }
);
const PictureInPicture = dynamic(
  () => import("lucide-react").then((mod) => mod.PictureInPicture),
  { ssr: false }
);
const Star = dynamic(() => import("lucide-react").then((mod) => mod.Star), {
  ssr: false,
});
const Users = dynamic(() => import("lucide-react").then((mod) => mod.Users), {
  ssr: false,
});
const Shield = dynamic(() => import("lucide-react").then((mod) => mod.Shield), {
  ssr: false,
});

const COLORS = {
  primary: "#22488F",
  secondary: "#1A3A75",
  accent: "#2D5BA8",
  dark1: "#142A50",
  dark2: "#0A1F3E",
};

interface VideoPromoData {
  id: string;
  sectionName: string;
  pageName: string;
  title: { ar: string; en: string; tk: string };
  subTitle: { ar: string; en: string; tk: string };
  links: { promo: string };
  meta: {
    stats: {
      items: {
        key: string;
        label: { ar: string; en: string; tk: string };
        value: string;
        isActive: boolean;
      }[];
      isActive: boolean;
    };
    features: {
      items: {
        key: string;
        label: { ar: string; en: string; tk: string };
        isActive: boolean;
      }[];
      isActive: boolean;
    };
  };
  isActive: boolean;
}

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </div>
    </div>
  );
};

const VideoPromo = ({ data }: { data: VideoPromoData }) => {
  const t = useTranslations("VideoPromo");
  const { locale } = useParams();
  const [ui, setUi] = useState({
    isHovered: false,
    showControls: true,
  });
  const [activeFeature, setActiveFeature] = useState(0);
  const featureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extract YouTube video ID
  const youtubeId = useMemo(() => {
    if (!data?.links?.promo) return "DDop4xX7XZU";
    const url = new URL(data.links.promo);
    return url.searchParams.get("v") || "DDop4xX7XZU";
  }, [data?.links?.promo]);

  // YouTube player controls
  const {
    isPlaying,
    isMuted,
    duration,
    currentTime,
    volume,
    togglePlay,
    toggleMute,
    seekTo,
    changeVolume,
  } = useYouTubePlayer(youtubeId);

  // Format time helper
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Handle progress bar changes
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    seekTo(newTime);
  };

  // Handle volume changes
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    changeVolume(newVolume);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        changeVolume(Math.min(100, volume + 10));
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        changeVolume(Math.max(0, volume - 10));
      } else if (e.code === "KeyM") {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [volume, togglePlay, toggleMute, changeVolume]);
  // Memoized features
  const features = useMemo(() => {
    if (!data?.meta?.features?.items) return [];
    const featureIcons = ["🚌", "🔔", "🛡️", "⚡"];
    return data.meta.features.items
      .filter((feature) => feature.isActive)
      .map((feature, index) => ({
        id: feature.key,
        icon: featureIcons[index] || "⭐",
        title:
          locale === "en"
            ? feature.label.en
            : locale === "ar"
            ? feature.label.ar
            : feature.label.tk,
        color: `from-[${COLORS.primary}] to-[${
          index % 2 === 0 ? COLORS.accent : COLORS.secondary
        }]`,
      }));
  }, [data?.meta?.features?.items, locale]);
  // Feature rotation
  useEffect(() => {
    if (features.length === 0) return;

    const rotateFeature = () => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      featureTimeoutRef.current = setTimeout(rotateFeature, 3000);
    };

    featureTimeoutRef.current = setTimeout(rotateFeature, 3000);
    return () => {
      if (featureTimeoutRef.current) clearTimeout(featureTimeoutRef.current);
    };
  }, [features.length]);

  // Memoized stats
  const stats = useMemo(() => {
    if (!data?.meta?.stats?.items) return [];
    return data.meta.stats.items.filter((stat) => stat.isActive);
  }, [data?.meta?.stats?.items]);

  // Background elements
  const BackgroundElements = useMemo(
    () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,72,143,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,72,143,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-bl from-[#22488F]/20 to-[#1A3A75]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-tr from-[#22488F]/15 to-[#142A50]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    ),
    []
  );

  // Wave design
  const WaveDesign = useMemo(
    () => (
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
                style={{ stopColor: COLORS.primary, stopOpacity: 0.4 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: COLORS.secondary, stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: COLORS.dark1, stopOpacity: 0.4 }}
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
                style={{ stopColor: COLORS.secondary, stopOpacity: 0.6 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: COLORS.dark1, stopOpacity: 0.4 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: COLORS.dark2, stopOpacity: 0.6 }}
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
    ),
    []
  );

  if (!data || !data.isActive) return null;

  return (
    <section
      id="VideoPromo"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#0A1F3E] to-[#142A50] overflow-hidden"
      dir="rtl"
    >
      {BackgroundElements}

      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
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
              {t("header.tagline")}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#22488F] via-[#2D5BA8] to-[#1A3A75] bg-clip-text text-transparent animate-pulse">
              {locale == "en"
                ? data.title.en
                : locale == "ar"
                ? data.title.ar
                : data.title.tk}
            </span>
            <br />
            <span className="text-white/90 text-3xl sm:text-4xl lg:text-6xl  relative">
              {locale == "en"
                ? data.subTitle.en
                : locale == "ar"
                ? data.subTitle.ar
                : data.subTitle.tk}
              <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-[#22488F] via-[#2D5BA8] to-[#1A3A75] rounded-full" />
            </span>
          </h1>

          <p className="text-lg text-[#2D5BA8] opacity-90 flex items-center justify-center gap-4">
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t("header.benefits.safe")}
            </span>
            <span className="w-2 h-2 bg-[#22488F] rounded-full" />
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t("header.benefits.reliable")}
            </span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
          {/* Video Container */}
          <div className="xl:col-span-8">
            <div
              className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-700 ${
                ui.isHovered
                  ? "transform -translate-y-4 shadow-3xl bg-white/10 border-white/20"
                  : ""
              }`}
              onMouseEnter={() =>
                setUi((prev) => ({ ...prev, isHovered: true }))
              }
              onMouseLeave={() =>
                setUi((prev) => ({ ...prev, isHovered: false }))
              }
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black group">
                <div className="relative aspect-video">
                  <div id="youtube-player" className="w-full h-full" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button
                    onClick={togglePlay}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      isPlaying
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-32 h-32 border-4 border-white/30 rounded-full animate-ping" />
                      <div
                        className="absolute inset-2 w-28 h-28 border-2 border-white/20 rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div className="relative w-24 h-24 bg-gradient-to-r from-[#22488F] to-[#1A3A75] rounded-full flex items-center justify-center hover:from-[#22488F]/90 hover:to-[#1A3A75]/90 transition-all duration-300 transform hover:scale-110 shadow-2xl">
                        <Play className="w-10 h-10 text-white ml-1 drop-shadow-lg" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Video Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 transition-all duration-500 ${
                    ui.showControls || ui.isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
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
                          background: `linear-gradient(to right, #22488F 0%, #1A3A75 ${
                            (currentTime / duration) * 100
                          }%, rgba(255,255,255,0.2) ${
                            (currentTime / duration) * 100
                          }%, rgba(255,255,255,0.2) 100%)`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Tooltip
                        text={isPlaying ? "Pause (Space)" : "Play (Space)"}
                      >
                        <button
                          onClick={togglePlay}
                          className="w-14 h-14 bg-gradient-to-r from-[#22488F] to-[#1A3A75] hover:from-[#22488F]/90 hover:to-[#1A3A75]/90 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-0.5" />
                          )}
                        </button>
                      </Tooltip>

                      <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-base font-mono border border-white/20">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>

                      <div className="flex items-center gap-3">
                        <Tooltip text={isMuted ? "Unmute (M)" : "Mute (M)"}>
                          <button
                            onClick={toggleMute}
                            className="w-12 h-12 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : volume > 50 ? (
                              <Volume2 className="w-5 h-5 text-white" />
                            ) : volume > 0 ? (
                              <Volume1 className="w-5 h-5 text-white" />
                            ) : (
                              <Volume className="w-5 h-5 text-white" />
                            )}
                          </button>
                        </Tooltip>

                        <Tooltip text="Volume Down (↓)">
                          <button
                            onClick={() =>
                              changeVolume(Math.max(0, volume - 10))
                            }
                            className="w-12 h-12 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm"
                          >
                            <Volume className="w-5 h-5 text-white" />
                            <span className="text-xs">-</span>
                          </button>
                        </Tooltip>

                        <Tooltip text="Volume Up (↑)">
                          <button
                            onClick={() =>
                              changeVolume(Math.min(100, volume + 10))
                            }
                            className="w-12 h-12 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm"
                          >
                            <Volume2 className="w-5 h-5 text-white" />
                            <span className="text-xs">+</span>
                          </button>
                        </Tooltip>

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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            {data.meta.stats.isActive && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.key}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-3xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm ${
                        index % 2 === 0 ? "text-[#2D5BA8]" : "text-[#1A3A75]"
                      }`}
                    >
                      {locale == "en"
                        ? stat.label.en
                        : locale == "ar"
                        ? stat.label.ar
                        : stat.label.tk}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.meta.features.isActive && features.length > 0 && (
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                      activeFeature === index
                        ? "bg-white/15 border-white/30 shadow-2xl"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        feature.color
                      } opacity-10 ${
                        activeFeature === index ? "opacity-20" : ""
                      } transition-opacity duration-500`}
                    />
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {WaveDesign}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #22488f, #1a3a75);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 20px rgba(34, 72, 143, 0.5);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 25px rgba(34, 72, 143, 0.7);
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #22488f, #1a3a75);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 10px rgba(34, 72, 143, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #22488f, #1a3a75);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 20px rgba(34, 72, 143, 0.5);
        }
      `}</style>
    </section>
  );
};

export default VideoPromo;
