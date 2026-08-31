import Image from "next/image";

export function WhyChooseUs() {
  const points = [
    {
      num: "1",
      title: "Easy car rentals",
      description:
        "Find the perfect car for your journey with our simple and convenient rental process.",
    },
    {
      num: "2",
      title: "A wide range of vehicles",
      description:
        "Choose from a variety of vehicles, from stylish cars and family-friendly SUVs and sedans.",
    },
    {
      num: "3",
      title: "Reliable & Convenient Service",
      description:
        "Enjoy a hassle-free rental experience with well-maintained cars and friendly service.",
    },
    {
      num: "4",
      title: "Travel Your Way",
      description:
        "Whether you're exploring the city or travelling across Sri Lanka, we have the right car for you.",
    },
  ];

  return (
    <section id="details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Image of Fleet */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
            <Image
              src="/images/car-fleet.jpg"
              alt="Tourmate luxury and commercial rental vehicle fleet in Sri Lanka"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right 4 Steps / Points */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
          </div>

          <div className="space-y-6">
            {points.map((point) => (
              <div key={point.num} className="flex items-start gap-4 group">
                {/* Purple circle number */}
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-violet-600 text-white font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-violet-700 transition-all mt-0.5">
                  {point.num}
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {point.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
