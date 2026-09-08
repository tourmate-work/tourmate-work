import { Car, Users, Calendar, Gauge } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function StatsSection() {
  const stats = [
    {
      icon: Car,
      value: "100+",
      label: "Premium Cars",
    },
    {
      icon: Users,
      value: "1,000+",
      label: "Happy Clients",
    },
    {
      icon: Calendar,
      value: "5+ Years",
      label: "Industry Trust",
    },
    {
      icon: Gauge,
      value: "50,000+",
      label: "Safe KM Driven",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Container */}
      <div className="stripe-glass rounded-[28px] sm:rounded-[30px] p-5 sm:p-12 lg:p-14 text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full mb-3">
          <span>Tourmate Track Record</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white mb-4">
          Facts In Numbers
        </h2>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 sm:mb-10 font-normal">
          From executive airport pickups to adventurous family round-tours across Sri Lanka, our fleet standards deliver unmatched reliability and safety.
        </p>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={index} delay={index * 80} direction="up">
                <div className="w-full bg-slate-950 dark:bg-[#111116] border border-slate-800 dark:border-white/10 text-white rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 shadow-xl card-hover-lift flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 transition-all">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400 backdrop-blur-sm flex-shrink-0">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-lg sm:text-2xl font-black block leading-tight text-white">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-slate-300 dark:text-slate-400 block mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

