"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";

function GithubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("Connecting to Supabase and GitHub...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleAuthCallback() {
      // 1. Check for OAuth error in query string
      const oauthError = searchParams.get("error");
      const oauthErrorDescription = searchParams.get("error_description");
      if (oauthError) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage(
            oauthErrorDescription ||
              "GitHub authorization was declined or encountered an error."
          );
        }
        return;
      }

      try {
        if (isMounted) {
          setMessage("Exchanging authorization token...");
        }

        // 2. If PKCE code exists in searchParams, exchange it for session
        const code = searchParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.warn("PKCE code exchange error, will check existing session:", exchangeError);
          }
        }

        // 3. Retrieve Supabase session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(sessionError.message);
        }

        let currentSession = session;

        // Fallback: If session not immediately ready, wait for onAuthStateChange
        if (!currentSession) {
          currentSession = await new Promise((resolve) => {
            const { data: authListener } = supabase.auth.onAuthStateChange(
              (_event, newSession) => {
                if (newSession) {
                  authListener.subscription.unsubscribe();
                  resolve(newSession);
                }
              }
            );

            // Timeout after 6 seconds
            setTimeout(() => {
              authListener.subscription.unsubscribe();
              resolve(null);
            }, 6000);
          });
        }

        if (!currentSession || !currentSession.user) {
          throw new Error(
            "No active GitHub session detected. Please ensure GitHub OAuth is enabled in Supabase and try again."
          );
        }

        if (isMounted) {
          setMessage("Verifying Tourmate administrator credentials...");
        }

        const user = currentSession.user;
        const meta = user.user_metadata || {};

        // 4. Sync GitHub user with Tourmate backend
        const response = await fetch("/api/auth/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email || meta.email || null,
            name: meta.full_name || meta.name || meta.user_name || "Admin User",
            avatarUrl: meta.avatar_url || null,
            githubUsername: meta.user_name || meta.preferred_username || null,
            supabaseId: user.id,
            forAdmin: true,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to establish admin session.");
        }

        // 5. Grant local admin authorization flag
        if (typeof window !== "undefined") {
          localStorage.setItem("tourmate_admin_auth", "true");
        }

        if (isMounted) {
          setStatus("success");
          setMessage("Authentication successful! Welcome to the Admin Portal.");
        }

        // Redirect to admin portal
        setTimeout(() => {
          router.replace("/admin?tab=fleet");
        }, 1200);
      } catch (err: unknown) {
        console.error("GitHub auth callback error:", err);
        if (isMounted) {
          setStatus("error");
          setErrorMessage(
            err instanceof Error
              ? err.message
              : "Failed to complete GitHub authentication. Please try again."
          );
        }
      }
    }

    handleAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [searchParams, router]);

  return (
    <div className="w-full max-w-md bg-white dark:bg-[#0b0b0e] border border-slate-200/90 dark:border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
      {/* Visual Identity / Brand */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-14 w-14 rounded-2xl bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
        {/* GitHub Logo */}
        <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center shadow-inner">
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full">
          Supabase GitHub OAuth
        </span>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          Tourmate Admin Verification
        </h1>
      </div>

      {status === "processing" && (
        <div className="py-6 space-y-4">
          <div className="relative mx-auto w-12 h-12 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-violet-600 dark:text-violet-400 animate-spin" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            {message}
          </p>
          <p className="text-[11px] text-slate-400">
            Please wait while we complete your secure administrator sign-in.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="py-6 space-y-4 animate-in fade-in zoom-in-95">
          <div className="h-12 w-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {message}
          </p>
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <span>Redirecting to Fleet Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="py-4 space-y-5 animate-in fade-in">
          <div className="h-12 w-12 mx-auto rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
              Authentication Incomplete
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 px-2 leading-relaxed">
              {errorMessage}
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Return to Admin Portal & Try Again
            </Link>

            <Link
              href="/"
              className="block text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              ← Back to Tourmate Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminAuthCallbackPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="text-xs font-bold text-slate-400 animate-pulse">
            Processing GitHub authorization...
          </div>
        }
      >
        <GithubCallbackContent />
      </Suspense>
    </div>
  );
}
