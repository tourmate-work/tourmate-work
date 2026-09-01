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
                href="tel:+5375476401"
                className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-0.5 block"
              >
                +537 547-6401
              </a>
            </div>
          </div>
        </div>

        {/* Main Content: Description, Links, Vehicles */}
        <div className="pt-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Description & Socials */}
          <div className="lg:col-span-6 space-y-8 pr-0 lg:pr-8">
            <p className="text-neutral-300 text-sm md:text-[15px] leading-relaxed">
              A range of features and services designed to meet your needs. A strong
              and reliable solution that brings everything together in one place.
              Simple, efficient, and easy to use. Designed to provide you with a smooth
              experience while giving you the flexibility and support you need. Built
              with quality, reliability, and convenience in mind.
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
                aria-label="X (formerly Twitter)"
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
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base md:text-lg mb-5">
              Useful links
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link href="#about" className="hover:text-amber-400 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-amber-400 transition-colors">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicles */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base md:text-lg mb-5">
              Vehicles
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  Cabriolet
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  Pickup
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  Minivan
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-amber-400 transition-colors">
                  SUV
                </Link>
              </li>
            </ul>
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
