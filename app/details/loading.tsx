import { LottieLoader } from "@/components/ui/lottie-loader";

export default function DetailsLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center max-w-7xl mx-auto px-4 py-16">
      <LottieLoader
        title="Loading Vehicle Specifications..."
        subtitle="Retrieving vehicle details, features, and rates across Sri Lanka"
      />
    </div>
  );
}
