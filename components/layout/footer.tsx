import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 font-extrabold text-2xl tracking-tight text-white">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <span className="font-black text-sm">T</span>
              </div>
              <span>
                tour<span className="text-emerald-400">mate</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier car rental companion across Sri Lanka. Providing
              reliable, transparent, and luxury vehicle solutions for airport
              transfers, city tours, and island-wide explorations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-emerald-400 transition-colors">
                  Our Vehicles
                </Link>
              </li>
              <li>
                <Link href="#details" className="hover:text-emerald-400 transition-colors">
                  Rental Details & Perks
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-emerald-400 transition-colors">
                  About Tourmate
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Fleet Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#vehicles" className="hover:text-emerald-400 transition-colors">
                  Luxury Sedans
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-emerald-400 transition-colors">
                  Family SUVs & Crossovers
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-emerald-400 transition-colors">
                  KDH Vans & Passenger Vans
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="hover:text-emerald-400 transition-colors">
                  Hybrid & Fuel-Efficient Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white mb-4">Contact & Support</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+94703236834" className="hover:text-white transition-colors">
                  +94 70 323 6834
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>support@tourmate.lk</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Colombo & Bandaranaike International Airport (CMB), Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tourmate Car Rental. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#terms" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
