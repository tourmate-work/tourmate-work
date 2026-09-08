import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button";

const sansFont = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tourmate | Premium Car Rental & Travel Experience",
  description:
    "Rent premium vehicles, SUVs, and luxury cars with ease. Your trusted companion for unforgettable road trips and business travel.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sansFont.variable} suppressHydrationWarning>
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
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-violet-600 selection:text-white transition-colors duration-300 pb-24 md:pb-0">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <FloatingWhatsAppButton />
            <MobileBottomBar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
