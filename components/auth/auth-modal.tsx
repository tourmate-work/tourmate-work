"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  User,
} from "lucide-react";
import { useAuth, AuthTab } from "./auth-context";
import Link from "next/link";

const COUNTRY_CODES = [
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", placeholder: "77 123 4567" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸", placeholder: "555 123 4567" },
  { code: "+44", country: "UK", flag: "🇬🇧", placeholder: "7911 123456" },
  { code: "+971", country: "UAE", flag: "🇦🇪", placeholder: "50 123 4567" },
  { code: "+61", country: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "+91", country: "India", flag: "🇮🇳", placeholder: "98765 43210" },
  { code: "+49", country: "Germany", flag: "🇩🇪", placeholder: "151 12345678" },
];

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalDefaultTab,
    closeAuthModal,
    loginWithPhone,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>(authModalDefaultTab);

  // Sync tab with default requested tab
  useEffect(() => {
    setActiveTab(authModalDefaultTab);
  }, [authModalDefaultTab]);

  // Reset states when modal closes or opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setError("");
      setSuccess("");
    }
  }, [isAuthModalOpen]);

  // General state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Phone Auth State
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneUserName, setPhoneUserName] = useState("");

  // Gmail / Email Auth State
  const [emailAddress, setEmailAddress] = useState("");
  const [emailUserName, setEmailUserName] = useState("");

  // Email & Password State (Optional Tab)
  const [emailMode, setEmailMode] = useState<"login" | "register">("login");
  const [passwordEmail, setPasswordEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordName, setPasswordName] = useState("");

  if (!isAuthModalOpen) return null;

  // --- Handlers ---

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fullPhone = `${selectedCountry.code}${phoneNumber.replace(/^0+/, "").trim()}`;
    const cleanDigits = fullPhone.replace(/\D/g, "");

    if (cleanDigits.length < 8) {
      setError("Please enter a valid mobile phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithPhone({
        phone: fullPhone,
        name: phoneUserName.trim() || undefined,
      });

      if (res.success) {
        setSuccess("Signed in successfully!");
      } else {
        setError(res.error || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOneClick = async () => {
    setError("");
    setLoading(true);
    try {
      const promptEmail = emailAddress.trim() || "user@gmail.com";
      const res = await loginWithGoogle({
        email: promptEmail.includes("@") ? promptEmail : `${promptEmail}@gmail.com`,
        name: emailUserName.trim() || "Tourmate Member",
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          emailUserName || "Google User"
        )}&backgroundColor=7c3aed`,
      });

      if (!res.success) {
        setError(res.error || "Google authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = emailAddress.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. yourname@gmail.com).");
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithGoogle({
        email: trimmedEmail,
        name: emailUserName.trim() || undefined,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          emailUserName || trimmedEmail
        )}&backgroundColor=7c3aed`,
      });

      if (res.success) {
        setSuccess("Signed in successfully!");
      } else {
        setError(res.error || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (emailMode === "login") {
        const res = await loginWithEmail(passwordEmail, password);
        if (!res.success) setError(res.error || "Invalid email or password.");
      } else {
        if (!passwordName) {
          setError("Name is required.");
          setLoading(false);
          return;
        }
        const res = await registerWithEmail({
          name: passwordName,
          email: passwordEmail,
          password,
        });
        if (!res.success) setError(res.error || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in-0 duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#111116] border border-slate-200/90 dark:border-white/10 rounded-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Gradient Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-500" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Tourmate Account
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Sign in or create your account to book vehicles, track requests, and access instant partner rates.
          </p>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("phone");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "phone"
                  ? "bg-white dark:bg-[#1c1c24] text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>Phone</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("gmail");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "gmail"
                  ? "bg-white dark:bg-[#1c1c24] text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Gmail / Email</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("email");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "email"
                  ? "bg-white dark:bg-[#1c1c24] text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Mail className="h-3.5 w-3.5 text-slate-500" />
              <span>Password</span>
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium animate-in fade-in duration-150">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium animate-in fade-in duration-150">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 1: PHONE NUMBER AUTHENTICATION                   */}
          {/* ==================================================== */}
          {activeTab === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="flex rounded-2xl border border-slate-200 dark:border-white/15 overflow-hidden focus-within:ring-2 focus-within:ring-violet-600 bg-slate-50 dark:bg-white/5 transition-all">
                  {/* Country code selector */}
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="bg-transparent text-xs font-bold text-slate-900 dark:text-white px-3 py-3 border-r border-slate-200 dark:border-white/10 outline-none cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code + c.country} value={c.code} className="dark:bg-[#1c1c24] text-slate-900 dark:text-white">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={selectedCountry.placeholder}
                    className="w-full bg-transparent px-3 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-slate-400 font-normal">(Optional for new accounts)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={phoneUserName}
                    onChange={(e) => setPhoneUserName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-violet-500/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In with Phone Number</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ==================================================== */}
          {/* TAB 2: GMAIL / EMAIL AUTHENTICATION                  */}
          {/* ==================================================== */}
          {activeTab === "gmail" && (
            <div className="space-y-4">
              {/* 1-Click Continue with Google Button */}
              <button
                type="button"
                onClick={handleGoogleOneClick}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#181820] hover:bg-slate-50 dark:hover:bg-[#20202a] text-slate-800 dark:text-white font-bold text-sm shadow-sm transition-all active:scale-[0.98] cursor-pointer group"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center my-3">
                <span className="h-px w-full bg-slate-200 dark:bg-white/10" />
                <span className="absolute bg-white dark:bg-[#111116] px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Or enter Email
                </span>
              </div>

              {/* Direct Email / Gmail Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={emailUserName}
                      onChange={(e) => setEmailUserName(e.target.value)}
                      placeholder="e.g. Dilshan Perera"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In with Email</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: STANDARD EMAIL & PASSWORD                     */}
          {/* ==================================================== */}
          {activeTab === "email" && (
            <form onSubmit={handlePasswordAuth} className="space-y-3">
              {emailMode === "register" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={passwordName}
                      onChange={(e) => setPasswordName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={passwordEmail}
                    onChange={(e) => setPasswordEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-2xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-950 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-violet-500/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>{emailMode === "login" ? "Sign In" : "Create Account"}</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmailMode(emailMode === "login" ? "register" : "login");
                    setError("");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  {emailMode === "login" ? (
                    <>
                      Don&apos;t have an account? <span className="font-bold text-violet-600">Register</span>
                    </>
                  ) : (
                    <>
                      Already have an account? <span className="font-bold text-violet-600">Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Legal Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              By continuing, you agree to TourMate&apos;s{" "}
              <Link
                href="/terms"
                onClick={closeAuthModal}
                className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
