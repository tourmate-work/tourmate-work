import { Car, Users, Calendar, Gauge } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Car,
      value: "100+",
      label: "Cars",
    },
    {
      icon: Users,
      value: "1000 +",
      label: "Customers",
    },
    {
      icon: Calendar,
      value: "1 +",
      label: "Years",
    },
    {
      icon: Gauge,
      value: "10,000 +",
      label: "KM's",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Light Green Container */}
      <div className="bg-[#eafbf0] border border-emerald-100 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Facts In Numbers
        </h2>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed mb-12 font-normal">
          A beautiful place awaits you. With carefully designed spaces and
          thoughtful details, we provide a comfortable and enjoyable experience.
          Every detail is designed to create a seamless and memorable journey.
        </p>

        {/* 4 Green Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                {/* 3 small dots header */}
                <div className="flex items-center gap-1 text-slate-400 mb-3 opacity-60">
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                </div>

                {/* Card */}
                <div className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl p-5 shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-xl sm:text-2xl font-black block leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium text-emerald-100 block">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
