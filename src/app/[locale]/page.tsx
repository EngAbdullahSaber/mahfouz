// app/[locale]/page.tsx (Server Component)
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import DownloadSection from "../components/DownloadSection";
import VideoPromo from "../components/VideoPromo";
import FooterSection from "../components/FooterSection";
// import ScrollManager from "../components/ScrollManager";
// import NavigationBullets from "../components/NavigationBullets";

// Server Component - No JavaScript sent to client for static content
export default function Page() {
  // Section configuration - this runs on the server
  const sections = [
    { id: "header", name: "Header" },
    { id: "features", name: "Features" },
    { id: "pricing", name: "Pricing" },
    { id: "download", name: "Download" },
    { id: "video", name: "Video" },
    { id: "footer", name: "Footer" },
  ];

  return (
    <>
      {/* Client component for navigation bullets */}
      {/* <NavigationBullets sections={sections} /> */}

      {/* Client component for scroll management */}
      {/* <ScrollManager sections={sections} /> */}

      {/* Main container - Server rendered */}
      <div className="overflow-x-hidden scroll-smooth">
        {/* Navbar with Suspense boundary */}
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>

        {/* Server-rendered sections */}
        <section id="header" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <Header />
          </Suspense>
        </section>

        <section id="features" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <FeaturesSection />
          </Suspense>
        </section>

        <section id="pricing" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <PricingSection showFreePlans={true} />
          </Suspense>
        </section>

        <section id="download" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <DownloadSection />
          </Suspense>
        </section>

        <section id="video" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <VideoPromo />
          </Suspense>
        </section>

        <section id="footer" className="min-h-screen w-full relative">
          <Suspense fallback={<SectionSkeleton />}>
            <FooterSection />
          </Suspense>
        </section>
      </div>
    </>
  );
}

// Loading skeletons - Server Components
function NavbarSkeleton() {
  return (
    <div className="h-16 bg-[#22488F] animate-pulse">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="h-8 w-24 bg-white/20 rounded"></div>
        <div className="hidden md:flex space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-16 bg-white/20 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto p-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
