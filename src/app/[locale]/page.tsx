// app/[locale]/page.tsx (Server Component)
import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import DownloadSection from "../components/DownloadSection";
import VideoPromo from "../components/VideoPromo";
import FooterSection from "../components/FooterSection";

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(
    "https://mahfouzapp.com/dashboard/landing-page/pages/home",
    { cache: "default" }
  );
  const data = await res.json();

  // Find the header section for metadata content
  const headerSection = data?.data?.find(
    (section: any) => section.sectionName === "header"
  );

  return {
    title: "Mahfouz - Safe & Reliable School Transportation",
    description:
      "Mahfouz connects families with trusted school transport. Join organized groups, follow every ride on a live map, and get instant notifications at pickup, drop-off, and delays—peace of mind from home to school and back",
    keywords: [
      "school transportation",
      "student transport",
      "bus tracking",
      "school bus app",
      "child safety",
      "parent communication",
      "real-time tracking",
    ],
    openGraph: {
      title: headerSection?.title?.en || "Mahfouz - Safe School Transport",
      description:
        headerSection?.subTitle?.en ||
        "Peace of mind from home to school and back",
      url: "https://mahfouzapp.com",
      siteName: "Mahfouz",
      images: [
        {
          url: "/og-image.jpg", // Replace with your actual OG image
          width: 1200,
          height: 630,
          alt: "Mahfouz School Transportation",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: headerSection?.title?.en || "Mahfouz - Safe School Transport",
      description:
        headerSection?.subTitle?.en ||
        "Peace of mind from home to school and back",
      images: ["/twitter-image.jpg"], // Replace with your actual Twitter image
    },
    alternates: {
      canonical: "https://mahfouzapp.com",
      languages: {
        en: "https://mahfouzapp.com/en",
        ar: "https://mahfouzapp.com/ar",
        tk: "https://mahfouzapp.com/tk",
      },
    },
  };
}

export default async function Page() {
  // Section configuration - this runs on the server
  const sections = [
    { id: "header", name: "Header" },
    { id: "features", name: "Features" },
    { id: "pricing", name: "Pricing" },
    { id: "download", name: "Download" },
    { id: "video", name: "Video" },
    { id: "footer", name: "Footer" },
  ];

  const [res, res1] = await Promise.all([
    fetch("https://mahfouzapp.com/dashboard/landing-page/pages/home", {
      cache: "no-store",
    }),
    fetch("https://mahfouzapp.com/dashboard/landing-page/features", {
      cache: "no-store",
    }),
  ]);

  if (!res.ok || !res1.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const featureData = await res1.json();

  // Find the header section for structured data
  const headerSection = data?.data?.find(
    (section: any) => section.sectionName === "header"
  );

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mahfouz",
    description:
      "Mahfouz connects families with trusted school transport. Join organized groups, follow every ride on a live map, and get instant notifications at pickup, drop-off, and delays—peace of mind from home to school and back",
    applicationCategory: "Transportation",
    operatingSystem: "Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main container */}
      <div className="overflow-x-hidden scroll-smooth">
        {/* Navigation */}
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>

        {/* Content sections */}
        <section id="header" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <Header data={data.data} />
          </Suspense>
        </section>

        <section id="features" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <FeaturesSection
              featureData={featureData.data}
              data={data.data?.find(
                (section: any) => section.sectionName === "feature"
              )}
            />
          </Suspense>
        </section>

        <section id="pricing" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <PricingSection showFreePlans={true} data={data.data} />
          </Suspense>
        </section>

        <section id="download" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <DownloadSection
              data={data.data?.find(
                (section: any) => section.sectionName === "download"
              )}
            />
          </Suspense>
        </section>

        <section id="video" className="min-h-screen w-full relative pb-20">
          <Suspense fallback={<SectionSkeleton />}>
            <VideoPromo
              data={data.data?.find(
                (section: any) => section.sectionName === "videoPromo"
              )}
            />
          </Suspense>
        </section>

        <section id="footer" className="min-h-screen w-full relative">
          <Suspense fallback={<SectionSkeleton />}>
            <FooterSection data={data.data} />
          </Suspense>
        </section>
      </div>
    </>
  );
}

// Loading skeletons remain the same...

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
