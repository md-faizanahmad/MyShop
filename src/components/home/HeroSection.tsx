// // components/CompactHero.tsx
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

// const defaultHeroData: HeroData = {
//   liveBadge: { enabled: true, text: "Winter Sale Coming Soon Off!" },
//   headline: "Elevate Your Style",
//   gradientHeadline: "Without Breaking the Bank",
//   subheadline: "Free Shipping ₹999+ • 30-Day Returns • Secure Checkout",
//   primaryCTA: { text: "Shop Now", link: "/" },
//   secondaryCTA: { text: "View Offers", link: "/" },
//   saleBadge: { enabled: true, text: "Coming Soon" },
//   backgroundImage: "",
// };

// export default function CompactHero() {
//   const { data: hero = defaultHeroData } = useQuery({
//     queryKey: ["hero-banner"],
//     queryFn: async () => {
//       try {
//         const res = await axios.get<{ hero: HeroData }>(`${API_URL}/v1/hero`);
//         return res.data.hero;
//       } catch {
//         return defaultHeroData;
//       }
//     },
//     staleTime: 5 * 60 * 1000,
//   });

//   return (
//     <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
//       {/* Background */}
//       <div className="absolute inset-0 bg-black/50" />
//       {hero.backgroundImage && (
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-30"
//           style={{ backgroundImage: `url(${hero.backgroundImage})` }}
//         />
//       )}

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Compact Grid */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 md:py-20 lg:py-24">
//           {/* Left: Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-center lg:text-left space-y-5"
//           >
//             {/* Live Badge */}
//             {hero.liveBadge?.enabled && (
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-xs font-bold uppercase border border-white/20">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//                 </span>
//                 {hero.liveBadge.text}
//               </div>
//             )}

//             {/* Headline */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
//               {hero.headline}
//               <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-blue-400 to-amber-100 animate-gradient-x">
//                 {hero.gradientHeadline}
//               </span>
//             </h1>

//             {/* Compact Subheadline */}
//             <p className="text-base md:text-lg text-gray-200 font-medium">
//               {hero.subheadline}
//             </p>

//             {/* Compact CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
//               <a
//                 href={hero.primaryCTA.link}
//                 className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
//               >
//                 {hero.primaryCTA.text}
//                 <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               {hero.secondaryCTA && (
//                 <a
//                   href={hero.secondaryCTA.link}
//                   className="rounded-full border-2 border-white/70 bg-transparent px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-black transition-all"
//                 >
//                   {hero.secondaryCTA.text}
//                 </a>
//               )}
//             </div>

//             {/* Compact Trust Icons */}
//             <div className="flex justify-center lg:justify-start gap-6 pt-6 text-sm">
//               {[Truck, Shield, Package].map((Icon, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <Icon className="h-6 w-6 text-green-400" />
//                   <span className="font-medium">
//                     {["Free Delivery", "Secure Payment", "Easy Returns"][i]}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right: Compact Hero Visual */}
//         </div>
//       </div>

//       {/* Animated gradient text */}
//     </section>
//   );
// }
///////////////////////////////////////////////////////27-11
// components/CompactHero.tsx
import { ArrowRight, Package, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface HeroData {
  liveBadge?: { enabled: boolean; text: string };
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  primaryCTA: { text: string; link: string };
  secondaryCTA?: { text: string; link: string };
  saleBadge?: { enabled: boolean; text: string };
  backgroundImage?: string;
}

export default function CompactHero() {
  const {
    data: hero,
    isLoading,
    isError,
  } = useQuery<HeroData>({
    queryKey: ["hero-banner"],
    queryFn: async () => {
      const res = await axios.get<{ hero: HeroData }>(`${API_URL}/v1/hero`);
      return res.data.hero;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Optional: Show skeleton or minimal loader while fetching
  if (isLoading) {
    return (
      <section className="relative bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/20 rounded-full w-48 mx-auto lg:mx-0" />
            <div className="h-16 bg-white/10 rounded-lg w-full max-w-2xl mx-auto lg:mx-0" />
            <div className="h-16 bg-white/10 rounded-lg w-full max-w-2xl mx-auto lg:mx-0" />
            <div className="flex justify-center lg:justify-start gap-4">
              <div className="h-12 bg-white/30 rounded-full w-40" />
              <div className="h-12 bg-white/20 rounded-full w-40" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Optional: Show error state (or fallback UI)
  if (isError || !hero) {
    return (
      <section className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl">
            Unable to load banner. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 md:py-20 lg:py-24">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left space-y-6"
          >
            {/* Live Badge */}
            {hero.liveBadge?.enabled && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-xs font-bold uppercase border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {hero.liveBadge.text}
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              {hero.headline}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-blue-400 to-amber-100 animate-gradient-x">
                {hero.gradientHeadline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-gray-200 font-medium max-w-2xl">
              {hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href={hero.primaryCTA.link}
                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {hero.primaryCTA.text}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {hero.secondaryCTA && (
                <a
                  href={hero.secondaryCTA.link}
                  className="rounded-full border-2 border-white/70 bg-transparent px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-200"
                >
                  {hero.secondaryCTA.text}
                </a>
              )}
            </div>

            {/* Trust Icons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-green-400" />
                <span className="font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-green-400" />
                <span className="font-medium">Easy Returns</span>
              </div>
            </div>
          </motion.div>

          {/* Right side can be used for image/illustration later if needed */}
        </div>
      </div>
    </section>
  );
}
