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
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeHero } from "../../types/home";

interface HeroSectionProps {
  hero: HomeHero | null;
  loading: boolean;
}

export default function HeroSection({ hero, loading }: HeroSectionProps) {
  if (loading) {
    return (
      <section className="relative min-h-[60vh] bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin" />
      </section>
    );
  }

  if (!hero) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center bg-slate-950 px-4">
        <p className="text-slate-400 text-lg font-medium">
          Unable to load banner.
        </p>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden text-white bg-slate-950 py-16 sm:py-24 lg:py-32 flex items-center"
      aria-labelledby="hero-heading"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/80 z-10" />

      {/* Modern ambient glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-linear-to-tr from-blue-600/30 via-indigo-500/20 to-purple-500/20 blur-[120px] rounded-full opacity-70" />
      </div>

      {/* Background Image */}
      {hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* LIVE BADGE */}
            {hero.liveBadge?.enabled && (
              <div className="inline-flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-700/80 shadow-md">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{hero.liveBadge.text}</span>
              </div>
            )}

            {/* MAIN HEADLINE */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white"
            >
              {hero.headline}
              {hero.gradientHeadline && (
                <>
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300">
                    {hero.gradientHeadline}
                  </span>
                </>
              )}
            </h1>

            {/* SUB HEADLINE */}
            {hero.subheadline && (
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-[720px] mx-auto leading-relaxed">
                {hero.subheadline}
              </p>
            )}

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
              <a
                href={hero.primaryCTA.link}
                className="w-full sm:w-auto group relative rounded-xl bg-white px-8 py-4 text-base sm:text-lg font-bold text-slate-950 flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-[0.98] transition duration-200 shadow-lg shadow-white/5"
              >
                {hero.primaryCTA.text}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-slate-950" />
              </a>

              {hero.secondaryCTA && (
                <a
                  href={hero.secondaryCTA.link}
                  className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-md px-8 py-4 text-base sm:text-lg font-semibold text-slate-200 hover:bg-slate-800 hover:text-white active:scale-[0.98] transition-all duration-200"
                >
                  {hero.secondaryCTA.text}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
