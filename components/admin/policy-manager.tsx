"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Lock,
  AlertCircle,
  Save,
  RotateCcw,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { PolicyDocument, PolicySection, PolicyType, PoliciesMap } from "@/types";
import { DEFAULT_POLICIES } from "@/lib/policies-defaults";
import { PolicyModal } from "@/components/layout/policy-modal";
import Link from "next/link";

interface PolicyManagerProps {
  onNotify?: (message: string) => void;
}

export function PolicyManager({ onNotify }: PolicyManagerProps) {
  const [activePolicyType, setActivePolicyType] = useState<PolicyType>("terms");
  const [policies, setPolicies] = useState<PoliciesMap>(DEFAULT_POLICIES);
  const [originalPolicies, setOriginalPolicies] = useState<PoliciesMap>(DEFAULT_POLICIES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewPolicy, setPreviewPolicy] = useState<PolicyType | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Fetch policies on mount
  useEffect(() => {
    async function loadPolicies() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/policies");
        const data = await res.json();
        if (data.success && data.policies) {
          setPolicies(data.policies);
          setOriginalPolicies(data.policies);
        }
      } catch (err) {
        console.error("Failed to fetch policies:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPolicies();
  }, []);

  // Track unsaved changes for the active policy
  useEffect(() => {
    const current = JSON.stringify(policies[activePolicyType]);
    const original = JSON.stringify(originalPolicies[activePolicyType]);
    setHasUnsavedChanges(current !== original);
  }, [policies, originalPolicies, activePolicyType]);

  const currentPolicy = policies[activePolicyType] || DEFAULT_POLICIES[activePolicyType];

  // Helper to update current policy metadata
  const handleUpdateMeta = (field: keyof PolicyDocument, value: string) => {
    setPolicies((prev) => ({
      ...prev,
      [activePolicyType]: {
        ...prev[activePolicyType],
        [field]: value,
      },
    }));
  };

  // Helper to update a specific section
  const handleUpdateSection = (
    index: number,
    field: keyof PolicySection,
    value: string
  ) => {
    setPolicies((prev) => {
      const activeDoc = { ...prev[activePolicyType] };
      const updatedSections = [...activeDoc.sections];
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      };
      activeDoc.sections = updatedSections;
      return {
        ...prev,
        [activePolicyType]: activeDoc,
      };
    });
  };

  // Add new section
  const handleAddSection = () => {
    const newSection: PolicySection = {
      id: `${activePolicyType}-${Date.now()}`,
      title: `${currentPolicy.sections.length + 1}. New Policy Clause`,
      content: "Enter the detailed terms and conditions for this section here.",
      note: "",
    };

    setPolicies((prev) => {
      const activeDoc = { ...prev[activePolicyType] };
      activeDoc.sections = [...activeDoc.sections, newSection];
      return {
        ...prev,
        [activePolicyType]: activeDoc,
      };
    });
  };

  // Delete section
  const handleDeleteSection = (index: number) => {
    if (currentPolicy.sections.length <= 1) {
      alert("A policy must have at least one clause/section.");
      return;
    }

    setPolicies((prev) => {
      const activeDoc = { ...prev[activePolicyType] };
      const updatedSections = activeDoc.sections.filter((_, i) => i !== index);
      activeDoc.sections = updatedSections;
      return {
        ...prev,
        [activePolicyType]: activeDoc,
      };
    });
  };

  // Move section up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPolicies((prev) => {
      const activeDoc = { ...prev[activePolicyType] };
      const updatedSections = [...activeDoc.sections];
      const temp = updatedSections[index];
      updatedSections[index] = updatedSections[index - 1];
      updatedSections[index - 1] = temp;
      activeDoc.sections = updatedSections;
      return {
        ...prev,
        [activePolicyType]: activeDoc,
      };
    });
  };

  // Move section down
  const handleMoveDown = (index: number) => {
    if (index === currentPolicy.sections.length - 1) return;
    setPolicies((prev) => {
      const activeDoc = { ...prev[activePolicyType] };
      const updatedSections = [...activeDoc.sections];
      const temp = updatedSections[index];
      updatedSections[index] = updatedSections[index + 1];
      updatedSections[index + 1] = temp;
      activeDoc.sections = updatedSections;
      return {
        ...prev,
        [activePolicyType]: activeDoc,
      };
    });
  };

  // Save changes to backend
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy: currentPolicy }),
      });

      const data = await res.json();
      if (data.success && data.policy) {
        setPolicies((prev) => ({
          ...prev,
          [activePolicyType]: data.policy,
        }));
        setOriginalPolicies((prev) => ({
          ...prev,
          [activePolicyType]: data.policy,
        }));
        setHasUnsavedChanges(false);

        const msg = `"${currentPolicy.title}" successfully saved and updated live!`;
        setSaveSuccessNotice(msg);
        if (onNotify) onNotify(msg);
        setTimeout(() => setSaveSuccessNotice(null), 4000);
      } else {
        alert(data.error || "Failed to save policy.");
      }
    } catch (err) {
      console.error("Save policy error:", err);
      alert("Network error while saving policy.");
    } finally {
      setIsSaving(false);
    }
  };

  // Discard local unsaved edits
  const handleDiscardChanges = () => {
    setPolicies((prev) => ({
      ...prev,
      [activePolicyType]: originalPolicies[activePolicyType],
    }));
    setHasUnsavedChanges(false);
  };

  // Reset to factory defaults
  const handleResetToDefault = async () => {
    setIsResetting(true);
    try {
      const res = await fetch(`/api/policies?type=${activePolicyType}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success && data.policy) {
        setPolicies((prev) => ({
          ...prev,
          [activePolicyType]: data.policy,
        }));
        setOriginalPolicies((prev) => ({
          ...prev,
          [activePolicyType]: data.policy,
        }));
        setHasUnsavedChanges(false);
        setShowResetConfirm(false);

        const msg = `"${currentPolicy.title}" restored to standard factory default.`;
        setSaveSuccessNotice(msg);
        if (onNotify) onNotify(msg);
        setTimeout(() => setSaveSuccessNotice(null), 4000);
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Failed to reset policy.");
    } finally {
      setIsResetting(false);
    }
  };

  const policyTabs = [
    {
      id: "terms" as PolicyType,
      label: "Terms & Conditions",
      icon: FileText,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      id: "privacy" as PolicyType,
      label: "Privacy Policy",
      icon: Lock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      id: "cancellation" as PolicyType,
      label: "Cancellation Policy",
      icon: AlertCircle,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-12 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="h-8 w-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading Platform Policies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Policy Selector */}
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Platform Legal & Governance Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              Manage Platform Policies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Edit terms, cancellation rules, and privacy commitments. Edits sync instantly to the public modal, footer, and Terms page.
            </p>
          </div>

          {/* Quick links & public buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewPolicy(activePolicyType)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Eye className="h-4 w-4 text-violet-500" />
              <span>Preview Customer Modal</span>
            </button>

            <Link
              href="/terms"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              <span>Public /terms Page</span>
            </Link>
          </div>
        </div>

        {/* Policy Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {policyTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activePolicyType === tab.id;
            const doc = policies[tab.id];
            const sectionCount = doc?.sections?.length || 0;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (hasUnsavedChanges) {
                    if (
                      !confirm(
                        "You have unsaved changes on the current policy. Do you want to switch policies without saving?"
                      )
                    ) {
                      return;
                    }
                  }
                  setActivePolicyType(tab.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? "bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-500/20"
                    : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/10 hover:border-violet-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/20 text-white" : `${tab.bg} ${tab.color}`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {sectionCount} {sectionCount === 1 ? "Section" : "Sections"}
                  </span>
                </div>
                <div className="font-bold text-sm tracking-tight">{tab.label}</div>
                <div
                  className={`text-xs mt-0.5 truncate ${
                    isSelected ? "text-violet-100" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {doc?.title || tab.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Success Notification Alert */}
      {saveSuccessNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* 3. Floating / Top Save Bar when unsaved changes exist */}
      {hasUnsavedChanges && (
        <div className="sticky top-4 z-30 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 backdrop-blur-md shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Unsaved Changes Detected in &quot;{currentPolicy.title}&quot;</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-white/10 hover:bg-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Discard Edits
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{isSaving ? "Saving..." : "Save Policy"}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Policy Meta Details Form */}
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span>Header & Document Information</span>
          </h3>
          {currentPolicy.updatedAt && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>
                Last saved:{" "}
                {new Date(currentPolicy.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Policy Display Title
            </label>
            <input
              type="text"
              value={currentPolicy.title || ""}
              onChange={(e) => handleUpdateMeta("title", e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. TOURMATE RENTALS – TERMS & CONDITIONS"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Subtitle / Category Tag
            </label>
            <input
              type="text"
              value={currentPolicy.subtitle || ""}
              onChange={(e) => handleUpdateMeta("subtitle", e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. TourMate Rentals Sri Lanka"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Last Updated Date Text
            </label>
            <input
              type="text"
              value={currentPolicy.lastUpdated || ""}
              onChange={(e) => handleUpdateMeta("lastUpdated", e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. September 2026"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Introductory Notice / Agreement Banner
            </label>
            <textarea
              rows={2}
              value={currentPolicy.intro || ""}
              onChange={(e) => handleUpdateMeta("intro", e.target.value)}
              className="w-full px-4 py-2 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              placeholder="Introductory text shown at the top of the policy agreement."
            />
          </div>
        </div>
      </div>

      {/* 5. Policy Sections Editor */}
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
          <div>
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-500" />
              <span>Policy Clauses & Sections ({currentPolicy.sections.length})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Reorder, edit, add, or delete individual terms and conditions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSection}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Clause</span>
          </button>
        </div>

        {/* Section Cards List */}
        <div className="space-y-4">
          {currentPolicy.sections.map((sec, idx) => (
            <div
              key={sec.id || idx}
              className="p-5 rounded-2xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3.5 transition-colors hover:border-slate-300 dark:hover:border-white/20"
            >
              {/* Section Header with Actions */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="h-6 w-6 rounded-full bg-violet-600/10 text-violet-600 dark:text-violet-400 font-black text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => handleUpdateSection(idx, "title", e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white text-xs sm:text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Section Title (e.g. 1. About TourMate Rentals)"
                  />
                </div>

                {/* Section control buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    title="Move clause up"
                    className="h-8 w-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === currentPolicy.sections.length - 1}
                    title="Move clause down"
                    className="h-8 w-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteSection(idx)}
                    title="Delete clause"
                    className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Main Text Content */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Main Clause Statement
                </label>
                <textarea
                  rows={2}
                  value={sec.content}
                  onChange={(e) => handleUpdateSection(idx, "content", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y"
                  placeholder="Primary policy statement / rule text..."
                />
              </div>

              {/* Note / Disclaimer Text (Optional) */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Additional Note / Secondary Disclaimer (Optional)
                </label>
                <input
                  type="text"
                  value={sec.note || ""}
                  onChange={(e) => handleUpdateSection(idx, "note", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Optional disclaimer or sub-clause note..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Append Button */}
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Another Clause to {currentPolicy.title}</span>
        </button>
      </div>

      {/* 6. Footer Master Action Bar */}
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/5 dark:hover:bg-rose-950/30 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset {currentPolicy.title} to Default</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setPreviewPolicy(activePolicyType)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-black shadow-lg shadow-violet-500/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Policies...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save & Apply Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0f0f13] text-slate-900 dark:text-white rounded-[28px] border border-slate-200 dark:border-white/10 shadow-2xl p-6 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-950 dark:text-white">
                Restore Default Policy?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to reset &quot;{currentPolicy.title}&quot; back to the original TourMate default agreement? Any custom clauses you wrote will be overwritten.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleResetToDefault}
                disabled={isResetting}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {isResetting ? "Restoring..." : "Yes, Restore Default"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Preview Modal */}
      {previewPolicy && (
        <PolicyModal
          policy={previewPolicy}
          customPolicies={policies}
          onClose={() => setPreviewPolicy(null)}
        />
      )}
    </div>
  );
}
