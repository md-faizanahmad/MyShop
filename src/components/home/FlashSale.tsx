import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export default function FlashSale() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-8 md:p-16">
        {/* Background Tech Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] -translate-y-1/2 translate-x-1/4" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
              <Zap size={14} className="fill-blue-400" />
              Flash Sale Live
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              NEXT-GEN <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                LAPTOP DEALS
              </span>
            </h2>

            <div className="flex gap-4">
              {[
                { label: "Hrs", value: "08" },
                { label: "Min", value: "42" },
                { label: "Sec", value: "19" },
              ].map((time) => (
                <div
                  key={time.label}
                  className="flex flex-col items-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[70px]"
                >
                  <span className="text-2xl font-black text-white">
                    {time.value}
                  </span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 max-w-sm">
              <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase">
                <span>Stock Remaining</span>
                <span className="text-blue-400">12 Units Left</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  className="h-full bg-linear-to-r from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>

            <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95">
              Claim Discount <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors" />
            <img
              src="https://images.unsplash.com/photo-1517336712461-481bf771df49?q=80&w=1000&auto=format&fit=crop"
              alt="Laptop Deal"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
