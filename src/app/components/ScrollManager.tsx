// // components/ScrollManager.tsx (Client Component)
// "use client";
// import { useEffect, useRef, useCallback } from "react";

// interface Section {
//   id: string;
//   name: string;
// }

// interface ScrollManagerProps {
//   sections: Section[];
// }

// export default function ScrollManager({ sections }: ScrollManagerProps) {
//   const scrollTimeoutRef = useRef<NodeJS.Timeout>();
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

//   // Optimized intersection observer
//   const initializeObserver = useCallback(() => {
//     // Clean up existing observer
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const sectionId = entry.target.id;
//           const sectionElement = entry.target as HTMLElement;

//           if (entry.isIntersecting) {
//             // Update active section in navigation bullets
//             const event = new CustomEvent("sectionActive", {
//               detail: {
//                 sectionId,
//                 index: sections.findIndex((s) => s.id === sectionId),
//               },
//             });
//             window.dispatchEvent(event);

//             // Add visible class for animations
//             sectionElement.classList.add("section-visible");
//           } else {
//             sectionElement.classList.remove("section-visible");
//           }
//         });
//       },
//       {
//         threshold: [0.1, 0.3, 0.5],
//         rootMargin: "-10% 0px -10% 0px",
//       }
//     );

//     // Observe all sections
//     sections.forEach((section) => {
//       const element = document.getElementById(section.id);
//       if (element) {
//         sectionsRef.current.set(section.id, element);
//         observerRef.current?.observe(element);
//       }
//     });
//   }, [sections]);

//   // Throttled scroll handler for additional performance optimizations
//   const handleScroll = useCallback(() => {
//     if (scrollTimeoutRef.current) {
//       clearTimeout(scrollTimeoutRef.current);
//     }

//     scrollTimeoutRef.current = setTimeout(() => {
//       // Additional scroll-based optimizations can go here
//       // For example, lazy loading images, animations, etc.

//       // Dispatch custom event for other components to listen to
//       const event = new CustomEvent("optimizedScroll", {
//         detail: { scrollY: window.scrollY },
//       });
//       window.dispatchEvent(event);
//     }, 16); // ~60fps throttling
//   }, []);

//   // Smooth scroll utility
//   const scrollToSection = useCallback((sectionId: string) => {
//     const element = sectionsRef.current.get(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, []);

//   // Initialize on mount
//   useEffect(() => {
//     // Wait for DOM to be ready
//     const timer = setTimeout(() => {
//       initializeObserver();
//     }, 100);

//     // Add scroll listener
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     // Add custom event listener for scroll-to-section requests
//     const handleScrollRequest = (event: CustomEvent) => {
//       scrollToSection(event.detail.sectionId);
//     };
//     window.addEventListener(
//       "scrollToSection",
//       handleScrollRequest as EventListener
//     );

//     return () => {
//       clearTimeout(timer);
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener(
//         "scrollToSection",
//         handleScrollRequest as EventListener
//       );
//       sectionsRef.current.clear();
//     };
//   }, [initializeObserver, handleScroll, scrollToSection]);

//   // This component doesn't render anything visible
//   return null;
// }
