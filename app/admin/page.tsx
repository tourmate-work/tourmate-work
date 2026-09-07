import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdminPortalContent } from "@/components/admin/admin-portal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Tourmate Rentals Sri Lanka",
  description:
    "Tourmate fleet administration and vehicle listing portal. Only authorized administrators can add, update, and manage rental fleet inventory.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-violet-600 selection:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center text-sm font-bold text-slate-400">
              Loading Admin Portal...
            </div>
          }
        >
          <AdminPortalContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
