import { MapPin, Car, Wallet } from "lucide-react";

export function FeaturePillars() {
  const features = [
    {
      icon: MapPin,
      title: "Availability",
      description:
        "Find and reserve your ideal rental car anytime, anywhere with ease.",
    },
    {
      icon: Car,
      title: "Comfort",
      description:
        "Enjoy a smooth and comfortable journey with clean vehicles and premium service.",
    },
    {
      icon: Wallet,
      title: "Savings",
      description:
        "Premium services at affordable prices, helping you make the most of every trip.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 text-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-2 sm:p-4 md:p-6 rounded-2xl transition-all duration-200 hover:bg-slate-50 group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-violet-100 group-hover:text-violet-700 transition-all shadow-sm flex-shrink-0">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.75} />
              </div>
              <h3 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 max-w-xs leading-tight sm:leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
