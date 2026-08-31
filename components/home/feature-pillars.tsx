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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl transition-all duration-200 hover:bg-slate-50 group"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4 group-hover:scale-110 group-hover:bg-violet-100 group-hover:text-violet-700 transition-all shadow-sm">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
