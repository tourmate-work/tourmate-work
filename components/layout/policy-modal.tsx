"use client";

import { useState, useEffect } from "react";
import { X, FileText, Lock, AlertCircle } from "lucide-react";
import { PoliciesMap, PolicyType as PolicyKey } from "@/types";
import { DEFAULT_POLICIES } from "@/lib/policies-defaults";

export type PolicyType = PolicyKey | null;

interface PolicyModalProps {
  policy: PolicyType;
  customPolicies?: PoliciesMap;
  onClose: () => void;
}

export function PolicyModal({ policy, customPolicies, onClose }: PolicyModalProps) {
  const [policies, setPolicies] = useState<PoliciesMap>(customPolicies || DEFAULT_POLICIES);

  // If customPolicies prop changes (e.g. live preview in admin dashboard)
  useEffect(() => {
    if (customPolicies) {
      setPolicies(customPolicies);
    }
  }, [customPolicies]);

  // Fetch latest policies from API if not explicitly passed
  useEffect(() => {
    if (!customPolicies && policy) {
      let isMounted = true;
      fetch("/api/policies")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.success && data.policies) {
            setPolicies(data.policies);
          }
        })
        .catch((err) => console.warn("Using fallback policies:", err));
      return () => {
        isMounted = false;
      };
    }
  }, [customPolicies, policy]);

  if (!policy) return null;

  const currentDoc = policies[policy] || DEFAULT_POLICIES[policy];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f13] text-slate-900 dark:text-white rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* TERMS & CONDITIONS */}
        {policy === "terms" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  {currentDoc.title}
                </h3>
                {currentDoc.lastUpdated && (
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                    Last Updated: {currentDoc.lastUpdated}
                  </p>
                )}
              </div>
            </div>

            {currentDoc.intro && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 font-medium">
                {currentDoc.intro}
              </p>
            )}

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {currentDoc.sections.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1"
                >
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                    {sec.title}
                  </h4>
                  <p>{sec.content}</p>
                  {sec.note && (
                    <p className="text-slate-500 dark:text-slate-400 text-xs pt-0.5">
                      {sec.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {policy === "privacy" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  {currentDoc.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentDoc.subtitle || "TourMate Rentals Sri Lanka"}
                  {currentDoc.lastUpdated ? ` • ${currentDoc.lastUpdated}` : ""}
                </p>
              </div>
            </div>

            {currentDoc.intro && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/30 font-medium">
                {currentDoc.intro}
              </p>
            )}

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              {currentDoc.sections.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {sec.title}
                  </h4>
                  <p>{sec.content}</p>
                  {sec.note && (
                    <p className="text-slate-500 dark:text-slate-400 text-xs pt-0.5">
                      {sec.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CANCELLATION POLICY */}
        {policy === "cancellation" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  {currentDoc.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentDoc.subtitle || "TourMate Rentals Sri Lanka"}
                  {currentDoc.lastUpdated ? ` • ${currentDoc.lastUpdated}` : ""}
                </p>
              </div>
            </div>

            {currentDoc.intro && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 font-medium">
                {currentDoc.intro}
              </p>
            )}

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              {currentDoc.sections.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {sec.title}
                  </h4>
                  <p>{sec.content}</p>
                  {sec.note && (
                    <p className="text-slate-500 dark:text-slate-400 text-xs pt-0.5">
                      {sec.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 dark:border-white/10 mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
