"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Upload,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Link2,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import { useSiteAssets, SiteAssetRecord, FALLBACK_SITE_ASSETS } from "@/lib/site-assets-context";

interface SiteMediaManagerProps {
  onNotify?: (message: string) => void;
}

export function SiteMediaManager({ onNotify }: SiteMediaManagerProps) {
  const { rawAssets, assets, updateAsset, resetAsset, resetAllAssets, refreshAssets } = useSiteAssets();
  const [activeSection, setActiveSection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [isResettingAll, setIsResettingAll] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const showNotification = (msg: string) => {
    setNotice(msg);
    if (onNotify) onNotify(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  // Fallback asset list if database hasn't populated yet
  const assetList: SiteAssetRecord[] =
    rawAssets.length > 0
      ? rawAssets
      : [
          {
            id: "home_hero",
            title: "Home Hero Main Background",
            description: "Primary visual graphic behind the hero search widget on the home page",
            section: "Home Page",
            url: assets.home_hero || FALLBACK_SITE_ASSETS.home_hero,
            fallbackUrl: FALLBACK_SITE_ASSETS.home_hero,
          },
          {
            id: "home_why_choose_us",
            title: "Why Choose Us Fleet Showcase",
            description: "Showcase fleet photo in the Why Choose Tourmate section on the home page",
            section: "Home Page",
            url: assets.home_why_choose_us || FALLBACK_SITE_ASSETS.home_why_choose_us,
            fallbackUrl: FALLBACK_SITE_ASSETS.home_why_choose_us,
          },
          {
            id: "about_hero",
            title: "About Us Story & Video Banner",
            description: "Top scenic road trip video preview banner on the About page",
            section: "About Page",
            url: assets.about_hero || FALLBACK_SITE_ASSETS.about_hero,
            fallbackUrl: FALLBACK_SITE_ASSETS.about_hero,
          },
          {
            id: "about_fleet",
            title: "About Page Fleet Standards",
            description: "Fleet standards and customer experience photo on the About page",
            section: "About Page",
            url: assets.about_fleet || FALLBACK_SITE_ASSETS.about_fleet,
            fallbackUrl: FALLBACK_SITE_ASSETS.about_fleet,
          },
          {
            id: "about_mission",
            title: "About Page Driven by Excellence",
            description: "Vehicle showcase in the Driven by Excellence section on the About page",
            section: "About Page",
            url: assets.about_mission || FALLBACK_SITE_ASSETS.about_mission,
            fallbackUrl: FALLBACK_SITE_ASSETS.about_mission,
          },
          {
            id: "contact_showcase",
            title: "Contact Us Showcase Banner",
            description: "Scenic fleet showcase banner on the Contact page beside the message form",
            section: "Contact Page",
            url: assets.contact_showcase || FALLBACK_SITE_ASSETS.contact_showcase,
            fallbackUrl: FALLBACK_SITE_ASSETS.contact_showcase,
          },
          {
            id: "logo_dark",
            title: "Transparent Header Logo",
            description: "Site brand logo used on dark headers, hero sections, and transparent navigation bars",
            section: "Branding & Logos",
            url: assets.logo_dark || FALLBACK_SITE_ASSETS.logo_dark,
            fallbackUrl: FALLBACK_SITE_ASSETS.logo_dark,
          },
          {
            id: "logo_light",
            title: "Light / Scrolled Header Logo",
            description: "Site brand logo used when navigation bar is scrolled down with white background",
            section: "Branding & Logos",
            url: assets.logo_light || FALLBACK_SITE_ASSETS.logo_light,
            fallbackUrl: FALLBACK_SITE_ASSETS.logo_light,
          },
          {
            id: "logo_footer",
            title: "Footer Brand Logo",
            description: "Site brand logo in the footer section across all pages",
            section: "Branding & Logos",
            url: assets.logo_footer || FALLBACK_SITE_ASSETS.logo_footer,
            fallbackUrl: FALLBACK_SITE_ASSETS.logo_footer,
          },
        ];

  const filteredAssets = assetList.filter((a) => {
    if (activeSection !== "all" && a.section.toLowerCase() !== activeSection.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        (a.description && a.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleFileUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert("File size exceeds 15MB limit.");
      return;
    }

    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success || !uploadData.url) {
        throw new Error(uploadData.error || "Upload failed");
      }

      // Save to SiteAsset in DB
      const ok = await updateAsset(id, uploadData.url);
      if (ok) {
        showNotification(`Updated "${id}" with new uploaded picture successfully!`);
      } else {
        throw new Error("Failed to save image reference to database");
      }
    } catch (err: unknown) {
      console.error("Image upload failed:", err);
      alert(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploadingId(null);
      if (e.target) e.target.value = "";
    }
  };

  const handleApplyUrl = async (id: string) => {
    if (!urlInput.trim()) return;
    setUploadingId(id);
    try {
      const ok = await updateAsset(id, urlInput.trim());
      if (ok) {
        showNotification(`Applied image URL to "${id}"!`);
        setEditingUrlId(null);
        setUrlInput("");
      } else {
        throw new Error("Failed to update asset URL");
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to update image URL.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleResetSingle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to reset "${title}" to its original default graphic?`)) return;
    setUploadingId(id);
    try {
      const ok = await resetAsset(id);
      if (ok) {
        showNotification(`Reset "${title}" back to default stock image.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingId(null);
    }
  };

  const handleResetAll = async () => {
    if (
      !confirm(
        "Are you sure you want to restore ALL website images and logos to their factory defaults? Any custom uploaded pictures will be unlinked."
      )
    ) {
      return;
    }
    setIsResettingAll(true);
    try {
      const ok = await resetAllAssets();
      if (ok) {
        showNotification("All website images and logos have been restored to defaults.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsResettingAll(false);
    }
  };

  const getPageLink = (slotId: string): string => {
    if (slotId.startsWith("home_")) return "/";
    if (slotId.startsWith("about_")) return "/about";
    if (slotId.startsWith("contact_")) return "/contact";
    return "/";
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Site Media Customizer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
            Main Site Pictures & Branding Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Change, replace, or update any image, hero background, or brand logo appearing on the main website.
            Upload custom graphics or restore factory stock defaults with a single click.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => refreshAssets()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            disabled={isResettingAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-300 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{isResettingAll ? "Restoring..." : "Restore All Defaults"}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0b0b0e] p-4 sm:p-5 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search image slot by name, key, or page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Pictures" },
            { id: "Home Page", label: "Home Page" },
            { id: "About Page", label: "About Page" },
            { id: "Contact Page", label: "Contact Page" },
            { id: "Branding & Logos", label: "Logos & Branding" },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSection === sec.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const currentUrl = assets[asset.id] || asset.url || asset.fallbackUrl;
          const isCustom = currentUrl !== asset.fallbackUrl;
          const isUploadingThis = uploadingId === asset.id;
          const isEditingThisUrl = editingUrlId === asset.id;
          const isLogo = asset.section === "Branding & Logos";

          return (
            <div
              key={asset.id}
              className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-5 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                {/* Header: Section & Status Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {asset.section}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCustom ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <Sparkles className="h-3 w-3" />
                        Custom
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Preview Box */}
                <div
                  className={`relative w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 ${
                    isLogo ? "h-36 bg-slate-900/90 p-4 flex items-center justify-center" : "h-48 bg-slate-100 dark:bg-white/5"
                  }`}
                >
                  {currentUrl ? (
                    <Image
                      src={currentUrl}
                      alt={asset.title}
                      fill
                      unoptimized
                      className={`${isLogo ? "object-contain p-3" : "object-cover"} group-hover:scale-105 transition-transform duration-500`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                      <AlertCircle className="h-6 w-6" />
                      <span className="text-xs">No image set</span>
                    </div>
                  )}

                  {/* Loading Overlay */}
                  {isUploadingThis && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20 gap-2">
                      <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                      <span className="text-xs font-bold">Uploading & saving...</span>
                    </div>
                  )}

                  {/* Slot Key Badge */}
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono font-black uppercase bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {asset.id}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-950 dark:text-white line-clamp-1">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {asset.description || "Website display graphic."}
                  </p>
                </div>

                {/* Direct URL Input Row (Toggleable) */}
                {isEditingThisUrl && (
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl space-y-2 border border-slate-200 dark:border-white/10 animate-in fade-in">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">
                      Direct Image Web Link
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyUrl(asset.id)}
                        disabled={!urlInput.trim() || isUploadingThis}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer"
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUrlId(null);
                          setUrlInput("");
                        }}
                        className="px-2 py-1.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  {/* Hidden Native File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => {
                      fileInputRefs.current[asset.id] = el;
                    }}
                    onChange={(e) => handleFileUpload(asset.id, e)}
                    className="hidden"
                  />

                  {/* Upload Picture Button */}
                  <button
                    type="button"
                    disabled={isUploadingThis}
                    onClick={() => fileInputRefs.current[asset.id]?.click()}
                    className="flex-1 py-2 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload Picture</span>
                  </button>

                  {/* URL Input Button */}
                  <button
                    type="button"
                    title="Paste direct image link"
                    onClick={() => {
                      if (isEditingThisUrl) {
                        setEditingUrlId(null);
                      } else {
                        setEditingUrlId(asset.id);
                        setUrlInput(currentUrl.startsWith("http") ? currentUrl : "");
                      }
                    }}
                    className={`p-2 rounded-full border text-xs transition-all cursor-pointer ${
                      isEditingThisUrl
                        ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <Link2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Reset to Stock Default Button */}
                  {isCustom && (
                    <button
                      type="button"
                      title="Reset to default image"
                      disabled={isUploadingThis}
                      onClick={() => handleResetSingle(asset.id, asset.title)}
                      className="p-2 rounded-full border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {/* Preview on live page link */}
                  <Link
                    href={getPageLink(asset.id)}
                    target="_blank"
                    title="View live page"
                    className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
