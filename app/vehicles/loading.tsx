import { LottieLoader } from "@/components/ui/lottie-loader";

export default function VehiclesLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center max-w-7xl mx-auto px-4 py-16">
      <LottieLoader
        title="Loading TourMate Fleet..."
        subtitle="Finding available sedans, SUVs, luxury cars, and vans across Sri Lanka"
      />
    </div>
  );
}
