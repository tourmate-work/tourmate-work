import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tourmate | Premium Car Rental & Travel Experience",
  description:
    "Rent premium vehicles, SUVs, and luxury cars with ease. Your trusted companion for unforgettable road trips and business travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('tourmate-theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-violet-600 selection:text-white transition-colors duration-300 pb-16 md:pb-0">
        <ThemeProvider>
          {children}
          <MobileBottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
