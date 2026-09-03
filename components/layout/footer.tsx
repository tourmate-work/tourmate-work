import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function AppleLogoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.64-1.24z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3.609 1.814L13.792 12 3.61 22.186c-.365-.366-.61-.884-.61-1.464V3.278c0-.58.245-1.098.61-1.464zm11.235 11.238l2.586 2.586-12.012 6.95 9.426-9.536zm0-2.104L5.418 1.412l12.012 6.95-2.586 2.586zm1.485 1.052l4.062 2.35c1.17.677 1.17 1.782 0 2.458l-4.062 2.35-2.67-2.67 2.67-2.488z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-14 pb-8 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 items-center">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-white rounded-2xl p-2 h-16 w-16 flex items-center justify-center shadow-md flex-shrink-0 hover:opacity-95 transition-opacity"
            >
              <Image
                src="/images/logo.png"
                alt="Tourmate Rentals"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </Link>
            <span className="text-white font-medium text-lg tracking-tight">
              Tourmate rentals
            </span>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-full bg-[#f39c12] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <MapPin className="h-5 w-5 fill-white text-[#f39c12]" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 leading-tight">Address</p>
              <p className="text-sm font-bold text-white mt-0.5">
                Wennapuwa, srilanka
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-full bg-[#f39c12] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Mail className="h-5 w-5 fill-white text-[#f39c12]" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 leading-tight">Email</p>
              <a
                href="mailto:tourmaterentals@gmail.com"
                className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5 block break-all"
              >
                tourmaterentals@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-full bg-[#f39c12] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Phone className="h-5 w-5 fill-white text-[#f39c12]" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 leading-tight">Phone</p>
              <a
                href="tel:+94772973530"
                className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5 block"
              >
                +94 (77) 297 3530
              </a>
            </div>
          </div>
        </div>

        {/* Main Content: Description, Links, Vehicles, Download App */}
        <div className="pt-8 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Description & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-neutral-300 text-sm leading-relaxed">
              Tourmate Rentals provides premier self-drive and chauffeur-driven car hire services across Sri Lanka. Enjoy reliable vehicles, transparent pricing, and 24/7 road support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-5">
              Useful links
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link href="/seller" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span>Seller Portal</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-full">Host</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-amber-400 transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicles */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-5">
              Vehicles
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  Cabriolet
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  Pickup
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  Minivan
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-amber-400 transition-colors">
                  SUV
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-base mb-5">
              Download App
            </h4>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2.5 rounded-xl transition-all w-fit"
              >
                <AppleLogoIcon className="h-6 w-6 text-white" />
                <div className="text-left">
                  <span className="text-[10px] text-neutral-400 block leading-tight">
                    Download on the
                  </span>
                  <span className="text-xs font-bold text-white block leading-tight">
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2.5 rounded-xl transition-all w-fit"
              >
                <GooglePlayIcon className="h-6 w-6 text-white" />
                <div className="text-left">
                  <span className="text-[10px] text-neutral-400 block leading-tight">
                    GET IT ON
                  </span>
                  <span className="text-xs font-bold text-white block leading-tight">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-900 text-center">
          <p className="text-xs text-neutral-500">
            © Copyright Tourmate rentals 2026. Design by . MSP Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
