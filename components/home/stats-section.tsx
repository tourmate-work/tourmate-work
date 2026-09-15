"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Car, Users, Calendar, Gauge } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Stats {
  vehicleCount: number;
  clientCount: number;
  yearsInBusiness: number;
  totalKmDriven: number;
}

const FALLBACK_STATS: Stats = {
  vehicleCount: 0,
  clientCount: 0,
  yearsInBusiness: 1,
  totalKmDriven: 0,
};

/**
 * Format a number with commas: 50000 → "50,000"
 */
function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Animated counter hook — counts from 0 to `target` over `duration` ms.
 */
function useAnimatedCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || target === 0) {
      setCount(target);
      return;
    }

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    }

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, start]);

  return count;
}

function AnimatedStat({
  target,
  suffix,
  loaded,
}: {
  target: number;
  suffix: string;
  loaded: boolean;
}) {
  const count = useAnimatedCounter(target, 1800, loaded);
  return (
    <span className="text-lg sm:text-2xl font-black block leading-tight text-white">
      {loaded ? `${formatNumber(count)}${suffix}` : (
        <span className="inline-block w-16 h-6 rounded bg-white/10 animate-pulse" />
      )}
    </span>
  );
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>(FALLBACK_STATS);
  const [loaded, setLoaded] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.warn("Failed to fetch live stats, using fallback values.", err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      icon: Car,
      target: stats.vehicleCount,
      suffix: "+",
      label: "Premium Cars",
    },
    {
      icon: Users,
      target: stats.clientCount,
      suffix: "+",
      label: "Happy Clients",
    },
    {
      icon: Calendar,
      target: stats.yearsInBusiness,
      suffix: "+ Years",
      label: "Industry Trust",
    },
    {
      icon: Gauge,
      target: stats.totalKmDriven,
      suffix: "+",
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
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={index} delay={index * 80} direction="up">
                <div className="w-full bg-slate-950 dark:bg-[#111116] border border-slate-800 dark:border-white/10 text-white rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 shadow-xl card-hover-lift flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 transition-all">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400 backdrop-blur-sm flex-shrink-0">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-center sm:text-left">
                    <AnimatedStat
                      target={stat.target}
                      suffix={stat.suffix}
                      loaded={loaded}
                    />
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
