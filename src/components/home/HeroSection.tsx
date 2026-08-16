// import { ArrowRight, Package, Shield, Truck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// interface HeroData {
//   liveBadge?: { enabled: boolean; text: string };
//   headline: string;
//   gradientHeadline: string;
//   subheadline: string;
//   primaryCTA: { text: string; link: string };
//   secondaryCTA?: { text: string; link: string };
//   saleBadge?: { enabled: boolean; text: string };
//   backgroundImage?: string;
// }

// export default function CompactHero() {
//   const {
//     data: hero,
//     isLoading,
//     isError,
//   } = useQuery<HeroData>({
//     queryKey: ["hero-banner"],
//     queryFn: async () => {
//       const res = await axios.get<{ hero: HeroData }>(`${API_URL}/v1/hero`);
//       return res.data.hero;
//     },
//     staleTime: 5 * 60 * 1000,
//     retry: 2,
//   });

//   if (isLoading) {
//     return (
//       <section
//         className="relative overflow-hidden text-white bg-linear-to-br from-slate-900 via-blue-900 to-slate-900
//                    min-h-[60vh] lg:min-h-screen flex items-center"
//       >
//         <div className="absolute inset-0 z-10 bg-black/50" />
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="animate-pulse space-y-8 py-16 md:py-20 lg:py-24">
//             <div className="h-8 bg-white/20 rounded-full w-48 mx-auto lg:mx-0" />
//             <div className="h-16 bg-white/10 rounded-lg w-full max-w-2xl mx-auto lg:mx-0" />
//             <div className="h-16 bg-white/10 rounded-lg w-full max-w-2xl mx-auto lg:mx-0" />
//             <div className="flex justify-center lg:justify-start gap-4">
//               <div className="h-12 bg-white/30 rounded-full w-40" />
//               <div className="h-12 bg-white/20 rounded-full w-40" />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isError || !hero) {
//     return (
//       <section
//         className="relative overflow-hidden text-white bg-linear-to-br from-slate-900 via-blue-900 to-slate-900
//                    min-h-[50vh] lg:min-h-[60vh] flex items-center"
//       >
//         <div className="absolute inset-0 z-10 bg-black/50" />
//         <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
//           <p className="text-xl">
//             Unable to load banner. Please try again later.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="relative overflow-hidden text-white bg-linear-to-br from-slate-900 via-blue-900 to-slate-900
//                  min-h-[60vh] lg:min-h-screen flex items-center"
//       aria-labelledby="hero-heading"
//     >
//       {/* Overlay above background, behind content */}
//       <div className="absolute inset-0 z-10 bg-black/50" />

//       {/* Background image (purely decorative) */}
//       {hero.backgroundImage && (
//         <div
//           className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
//           style={{ backgroundImage: `url(${hero.backgroundImage})` }}
//           aria-hidden="true"
//         />
//       )}

//       <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16 lg:py-0">
//           {/* Left: Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7 }}
//             className="text-center lg:text-left space-y-6"
//           >
//             {/* Live Badge */}
//             {hero.liveBadge?.enabled && (
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-xs font-bold uppercase border border-white/20">
//                 <span className="relative flex h-2 w-2" aria-hidden="true">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//                 </span>
//                 <span>{hero.liveBadge.text}</span>
//               </div>
//             )}

//             {/* Headline */}
//             <h1
//               id="hero-heading"
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
//             >
//               {hero.headline}
//               <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-blue-400 to-amber-100 animate-gradient-x">
//                 {hero.gradientHeadline}
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="text-base md:text-lg text-gray-200 font-medium max-w-[720px] mx-auto lg:mx-0">
//               {hero.subheadline}
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
//               <a
//                 href={hero.primaryCTA.link}
//                 className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200"
//               >
//                 {hero.primaryCTA.text}
//                 <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               {hero.secondaryCTA && (
//                 <a
//                   href={hero.secondaryCTA.link}
//                   className="rounded-full border-2 border-white/70 bg-transparent px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-200"
//                 >
//                   {hero.secondaryCTA.text}
//                 </a>
//               )}
//             </div>

//             {/* Trust Icons */}
//             <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 text-sm">
//               <div className="flex items-center gap-2">
//                 <Truck className="h-6 w-6 text-green-400" />
//                 <span className="font-medium">Free Delivery</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Shield className="h-6 w-6 text-green-400" />
//                 <span className="font-medium">Secure Payment</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Package className="h-6 w-6 text-green-400" />
//                 <span className="font-medium">Easy Returns</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right side left intentionally empty for future image/illustration */}
//           <div aria-hidden="true" />
//         </div>
//       </div>
//     </section>
//   );
// }

////////////// new update
// src/components/home/HeroSection.tsx
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import type { HomeHero } from "../../types/home";

// interface HeroSectionProps {
//   hero: HomeHero | null;
//   loading: boolean;
// }

// export default function HeroSection({ hero, loading }: HeroSectionProps) {
//   if (loading) {
//     return (
//       <section className="relative min-h-[60vh] bg-gray-200 animate-pulse" />
//     );
//   }

//   if (!hero) {
//     return (
//       <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-100">
//         <p className="text-gray-700 text-lg">Unable to load banner.</p>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="relative overflow-hidden text-white min-h-[60vh] lg:min-h-screen flex items-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900"
//       aria-labelledby="hero-heading"
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/50" />

//       {/* Background Image */}
//       {hero.backgroundImage && (
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-30"
//           style={{ backgroundImage: `url(${hero.backgroundImage})` }}
//           aria-hidden="true"
//         />
//       )}

//       <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16 lg:py-0">
//           {/* LEFT COLUMN */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center lg:text-left space-y-6"
//           >
//             {/* LIVE BADGE */}
//             {hero.liveBadge?.enabled && (
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-xs font-bold uppercase border border-white/20">
//                 <span className="relative flex h-2 w-2" aria-hidden="true">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//                 </span>
//                 <span>{hero.liveBadge.text}</span>
//               </div>
//             )}

//             {/* MAIN HEADLINE */}
//             <h1
//               id="hero-heading"
//               className="text-3xl sm:text-2xl md:text-5xl lg:text-6xl font-black leading-tight"
//             >
//               {hero.headline}
//               <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-blue-400 to-amber-100 animate-gradient-x">
//                 {hero.gradientHeadline}
//               </span>
//             </h1>

//             {/* SUB HEADLINE */}
//             <p className="text-base md:text-lg text-gray-200 font-medium max-w-[720px] mx-auto lg:mx-0">
//               {hero.subheadline}
//             </p>

//             {/* CTA BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
//               <a
//                 href={hero.primaryCTA.link}
//                 className="group relative rounded-full bg-white px-8 py-4 text-lg font-bold text-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition duration-200"
//               >
//                 {hero.primaryCTA.text}
//                 <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               {hero.secondaryCTA && (
//                 <a
//                   href={hero.secondaryCTA.link}
//                   className="rounded-full border-2 border-white/70 bg-transparent px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-all duration-200"
//                 >
//                   {hero.secondaryCTA.text}
//                 </a>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

////////////////////////22072026
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import type { HomeHero } from "../../types/home";

// interface HeroSectionProps {
//   hero: HomeHero | null;
//   loading: boolean;
// }

// export default function HeroSection({ hero, loading }: HeroSectionProps) {
//   if (loading) {
//     return (
//       <section className="relative h-[180px] sm:h-[300px] md:min-h-[500px] bg-slate-900 animate-pulse flex items-center justify-center">
//         <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin" />
//       </section>
//     );
//   }

//   if (!hero) {
//     return (
//       <section className="relative h-[150px] sm:h-[220px] flex items-center justify-center bg-slate-950 px-4">
//         <p className="text-slate-400 text-xs font-medium">
//           Unable to load banner.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="relative isolate flex min-h-[205px] xs:min-h-[220px] sm:min-h-[340px] md:min-h-[500px] items-center overflow-hidden bg-neutral-950 py-4 m-1 sm:py-10 md:py-16 text-white"
//       aria-labelledby="hero-heading"
//     >
//       {/* Dark gradient overlay tailored for mobile readability */}
//       <div className="absolute inset-0 z-10 bg-linear-to-r from-black/90 via-black/65 to-transparent md:bg-linear-to-b md:from-black/50 md:via-black/70 md:to-neutral-950" />

//       {/* Modern ambient glow backdrop */}
//       <div className="pointer-events-none absolute inset-0" aria-hidden="true">
//         <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[20px_20px] sm:bg-size-[48px_48px]" />
//         <div className="absolute left-1/3 top-0 h-[150px] sm:h-[350px] w-[150px] sm:w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-xl sm:blur-3xl" />
//       </div>

//       {/* Background Image */}
//       {hero.backgroundImage && (
//         <div
//           className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-45 md:opacity-30 transition-all"
//           style={{ backgroundImage: `url(${hero.backgroundImage})` }}
//           aria-hidden="true"
//         />
//       )}

//       <div className="relative z-20 mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
//         <div className="max-w-[88%] xs:max-w-[80%] sm:max-w-xl md:max-w-4xl md:mx-auto text-left md:text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35 }}
//             className="space-y-1.5 xs:space-y-2.5 sm:space-y-4 md:space-y-6"
//           >
//             {/* LIVE BADGE */}
//             {hero.liveBadge?.enabled && (
//               <div className="inline-flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-700/80 shadow-xs">
//                 <span
//                   className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2"
//                   aria-hidden="true"
//                 >
//                   <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sky-500 opacity-75" />
//                   <span className="relative inline-flex h-full w-full rounded-full bg-white" />
//                 </span>
//                 <span className="truncate max-w-[180px] xs:max-w-none">
//                   {hero.liveBadge.text}
//                 </span>
//               </div>
//             )}

//             {/* MAIN HEADLINE */}
//             <h2
//               id="hero-heading"
//               className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-[1.15] sm:leading-tight tracking-tight text-white"
//             >
//               {hero.headline}
//               {hero.gradientHeadline && (
//                 <>
//                   <span className="hidden xs:inline">
//                     <br />
//                   </span>{" "}
//                   <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300">
//                     {hero.gradientHeadline}
//                   </span>
//                 </>
//               )}
//             </h2>

//             {/* SUB HEADLINE */}
//             {hero.subheadline && (
//               <p className="text-xs xs:text-sm sm:text-base md:text-xl text-slate-300 font-medium leading-[1.85] sm:leading-relaxed line-clamp-2 md:line-clamp-none max-w-[95%] md:max-w-[720px] md:mx-auto">
//                 {hero.subheadline}
//               </p>
//             )}

//             {/* CTA BUTTONS */}
//             <div className="flex flex-row gap-2 sm:gap-3 pt-1 sm:pt-2 md:justify-center items-center ]">
//               <a
//                 href={hero.primaryCTA.link}
//                 className="group relative rounded-lg sm:rounded-xl bg-white px-3.5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs xs:text-sm sm:text-base font-bold text-slate-950 flex items-center justify-center gap-1 hover:bg-slate-100 active:scale-[0.98] transition duration-200 shadow-sm shrink-0"
//               >
//                 <span>{hero.primaryCTA.text}</span>
//                 <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-0.5 transition-transform text-slate-950" />
//               </a>

//               {hero.secondaryCTA && (
//                 <a
//                   href={hero.secondaryCTA.link}
//                   className="rounded-lg sm:rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs xs:text-sm sm:text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white active:scale-[0.98] transition-all duration-200 truncate"
//                 >
//                   {hero.secondaryCTA.text}
//                 </a>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

/////////////////////////////////////// 16-08-2026
// import { useEffect, useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import type { HomeHero } from "@/types/home";

// interface HeroSectionProps {
//   heroes: HomeHero[];
//   loading: boolean;
// }

// export default function HeroSection({ heroes, loading }: HeroSectionProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const hero = heroes[currentIndex];

//   // Keep index valid when banners are removed/changed
//   useEffect(() => {
//     if (currentIndex >= heroes.length) {
//       setCurrentIndex(Math.max(heroes.length - 1, 0));
//     }
//   }, [heroes.length, currentIndex]);

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? heroes.length - 1 : prev - 1));
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
//   };

//   if (loading) {
//     return (
//       <section className="relative m-1 flex h-[205px] items-center justify-center overflow-hidden rounded-xl bg-slate-900 animate-pulse xs:h-[220px] sm:h-[300px] md:h-[500px]">
//         <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin sm:h-8 sm:w-8" />
//       </section>
//     );
//   }

//   if (!heroes.length) {
//     return (
//       <section className="relative m-1 flex h-[150px] items-center justify-center rounded-xl bg-slate-950 px-4 sm:h-[220px]">
//         <p className="text-xs font-medium text-slate-400">
//           Unable to load banner.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="relative isolate m-1 min-h-[205px] overflow-hidden rounded-xl bg-neutral-950 text-white xs:min-h-[220px] sm:min-h-[340px] md:min-h-[500px]"
//       aria-label="Featured banners"
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={hero._id}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="absolute inset-0"
//         >
//           {/* Background image */}
//           <picture>
//             {hero.mobileBackgroundImage && (
//               <source
//                 media="(max-width: 639px)"
//                 srcSet={hero.mobileBackgroundImage}
//               />
//             )}

//             {hero.backgroundImage && (
//               <img
//                 src={hero.backgroundImage}
//                 alt=""
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//                 aria-hidden="true"
//               />
//             )}
//           </picture>

//           {/* Overlay */}
//           <div className="absolute inset-0 z-10 bg-linear-to-r from-black/90 via-black/60 to-black/20 md:bg-linear-to-b md:from-black/45 md:via-black/65 md:to-neutral-950/80" />

//           {/* Ambient background */}
//           <div
//             className="pointer-events-none absolute inset-0 z-10"
//             aria-hidden="true"
//           >
//             <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[20px_20px] sm:bg-size-[48px_48px]" />

//             <div className="absolute left-1/3 top-0 h-[150px] w-[150px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-xl sm:h-[350px] sm:w-[350px] sm:blur-3xl" />
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Content */}
//       <div className="relative z-20 mx-auto flex min-h-[205px] w-full max-w-7xl items-center px-3.5 py-5 xs:min-h-[220px] sm:min-h-[340px] sm:px-6 sm:py-10 md:min-h-[500px] md:px-8 md:py-16">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={hero._id}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.3 }}
//             className="w-full"
//           >
//             <div className="max-w-[88%] text-left xs:max-w-[80%] sm:max-w-xl md:mx-auto md:max-w-4xl md:text-center">
//               <div className="space-y-1.5 xs:space-y-2.5 sm:space-y-4 md:space-y-6">
//                 {/* LIVE BADGE */}
//                 {hero.liveBadge?.enabled && (
//                   <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-200 shadow-xs backdrop-blur-md sm:px-3 sm:py-1 sm:text-xs">
//                     <span
//                       className="relative flex h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2"
//                       aria-hidden="true"
//                     >
//                       <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sky-500 opacity-75" />

//                       <span className="relative inline-flex h-full w-full rounded-full bg-white" />
//                     </span>

//                     <span className="truncate">{hero.liveBadge.text}</span>
//                   </div>
//                 )}

//                 {/* HEADLINE */}
//                 <h2 className="text-xl font-black leading-[1.15] tracking-tight text-white xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
//                   {hero.headline}

//                   {hero.gradientHeadline && (
//                     <>
//                       <span className="hidden xs:inline">
//                         <br />
//                       </span>{" "}
//                       <span className="bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
//                         {hero.gradientHeadline}
//                       </span>
//                     </>
//                   )}
//                 </h2>

//                 {/* SUBHEADLINE */}
//                 {hero.subheadline && (
//                   <p className="line-clamp-2 max-w-[95%] text-xs font-medium leading-[1.7] text-slate-300 xs:text-sm sm:text-base sm:leading-relaxed md:mx-auto md:max-w-[720px] md:text-xl md:line-clamp-none">
//                     {hero.subheadline}
//                   </p>
//                 )}

//                 {/* CTA */}
//                 <div className="flex items-center gap-2 pt-1 sm:gap-3 sm:pt-2 md:justify-center">
//                   {hero.primaryCTA?.text && (
//                     <a
//                       href={hero.primaryCTA.link}
//                       className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm transition duration-200 hover:bg-slate-100 active:scale-[0.98] xs:text-sm sm:rounded-xl sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
//                     >
//                       <span>{hero.primaryCTA.text}</span>

//                       <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
//                     </a>
//                   )}

//                   {hero.secondaryCTA?.text && (
//                     <a
//                       href={hero.secondaryCTA.link}
//                       className="inline-flex max-w-[45%] shrink-0 items-center justify-center truncate rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:bg-slate-800 hover:text-white active:scale-[0.98] xs:text-sm sm:rounded-xl sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
//                     >
//                       {hero.secondaryCTA.text}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Navigation — only when multiple banners */}
//       {heroes.length > 1 && (
//         <>
//           {/* Desktop / tablet arrows */}
//           <button
//             type="button"
//             onClick={goToPrevious}
//             aria-label="Previous banner"
//             className="absolute left-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 sm:flex"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>

//           <button
//             type="button"
//             onClick={goToNext}
//             aria-label="Next banner"
//             className="absolute right-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 sm:flex"
//           >
//             <ArrowRight className="h-4 w-4" />
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-4">
//             {heroes.map((banner, index) => (
//               <button
//                 key={banner._id}
//                 type="button"
//                 onClick={() => setCurrentIndex(index)}
//                 aria-label={`Go to banner ${index + 1}`}
//                 aria-current={index === currentIndex}
//                 className={`h-1.5 rounded-full transition-all ${
//                   index === currentIndex
//                     ? "w-5 bg-white"
//                     : "w-1.5 bg-white/45 hover:bg-white/70"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

///////////////// ABoave all single Banners ,down many banners
import { useEffect, useState } from "react";
import type { HomeHero } from "@/types/home";
import DesktopHero from "../Hero/DesktopHero";
import MobileHero from "../Hero/MobileHero";

interface HeroSectionProps {
  heroes: HomeHero[];
  loading: boolean;
}

export default function HeroSection({ heroes, loading }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hero = heroes[currentIndex];

  // Keep index valid when banners change
  useEffect(() => {
    if (currentIndex >= heroes.length) {
      setCurrentIndex(Math.max(heroes.length - 1, 0));
    }
  }, [heroes.length, currentIndex]);

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroes.length]);
  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <section
        className="relative m-1 flex h-[235px] items-center justify-center overflow-hidden rounded-xl bg-slate-900 animate-pulse sm:h-[340px] md:h-[500px]"
        aria-label="Loading hero banners"
      >
        <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin sm:h-8 sm:w-8" />
      </section>
    );
  }

  /* ---------------- EMPTY ---------------- */

  if (!heroes.length || !hero) {
    return (
      <section
        className="relative m-1 flex h-[150px] items-center justify-center overflow-hidden rounded-xl bg-slate-950 px-4 sm:h-[220px]"
        aria-label="Hero banner unavailable"
      >
        <p className="text-xs font-medium text-slate-400">
          Unable to load banner.
        </p>
      </section>
    );
  }

  return (
    <section className="relative" aria-label="Featured banners">
      {/* =====================================================
          DESKTOP / TABLET
          ===================================================== */}
      <div className="hidden sm:block">
        <DesktopHero hero={hero} showNavigation={heroes.length > 1} />
      </div>

      {/* =====================================================
          MOBILE
          ===================================================== */}
      <div className="block sm:hidden">
        <MobileHero hero={hero} />
      </div>

      {/* =====================================================
          MOBILE CAROUSEL DOTS
          ===================================================== */}
      {heroes.length > 1 && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-3 z-40 flex justify-center sm:bottom-4"
          aria-label="Hero banner navigation"
        >
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-sm">
            {heroes.map((banner, index) => (
              <button
                key={banner._id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
