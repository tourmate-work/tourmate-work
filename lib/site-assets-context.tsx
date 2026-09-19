"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface SiteAssetRecord {
  id: string;
  title: string;
  description?: string | null;
  section: string;
  url: string;
  fallbackUrl: string;
}

export const FALLBACK_SITE_ASSETS: Record<string, string> = {
  home_hero: "/images/hero-sri-lanka.png",
  home_why_choose_us: "/images/car-fleet.jpg",
  about_hero: "/images/hero-sri-lanka.jpg",
  about_fleet: "/images/car-fleet.jpg",
  about_mission: "/images/car-side.jpg",
  contact_showcase: "/images/hero-sri-lanka.jpg",
  logo_dark: "/images/logo-transparent.png",
  logo_light: "/images/logo-white-bg.png",
  logo_footer: "/images/logo.png",
};

interface SiteAssetsContextType {
  assets: Record<string, string>;
  rawAssets: SiteAssetRecord[];
  isLoading: boolean;
  getAsset: (key: string, customFallback?: string) => string;
  refreshAssets: () => Promise<void>;
  updateAsset: (id: string, url: string) => Promise<boolean>;
  resetAsset: (id: string) => Promise<boolean>;
  resetAllAssets: () => Promise<boolean>;
}

const SiteAssetsContext = createContext<SiteAssetsContextType>({
  assets: FALLBACK_SITE_ASSETS,
  rawAssets: [],
  isLoading: false,
  getAsset: (key: string, customFallback?: string) => customFallback || FALLBACK_SITE_ASSETS[key] || "",
  refreshAssets: async () => {},
  updateAsset: async () => false,
  resetAsset: async () => false,
  resetAllAssets: async () => false,
});

export function SiteAssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, string>>(FALLBACK_SITE_ASSETS);
  const [rawAssets, setRawAssets] = useState<SiteAssetRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/site-assets");
      const data = await res.json();
      if (data.success && data.assetsMap) {
        setAssets((prev) => ({
          ...prev,
          ...data.assetsMap,
        }));
        if (Array.isArray(data.assets)) {
          setRawAssets(data.assets);
        }
      }
    } catch (err) {
      console.warn("Failed to load dynamic site assets:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const getAsset = useCallback(
    (key: string, customFallback?: string): string => {
      if (assets[key] && typeof assets[key] === "string" && assets[key].trim()) {
        return assets[key];
      }
      if (customFallback) return customFallback;
      return FALLBACK_SITE_ASSETS[key] || "";
    },
    [assets]
  );

  const updateAsset = useCallback(async (id: string, url: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/site-assets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, url }),
      });
      const data = await res.json();
      if (data.success) {
        setAssets((prev) => ({ ...prev, [id]: url }));
        setRawAssets((prev) =>
          prev.map((a) => (a.id === id ? { ...a, url } : a))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update site asset:", err);
      return false;
    }
  }, []);

  const resetAsset = useCallback(async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/site-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset", id }),
      });
      const data = await res.json();
      if (data.success && data.asset) {
        setAssets((prev) => ({ ...prev, [id]: data.asset.url }));
        setRawAssets((prev) =>
          prev.map((a) => (a.id === id ? { ...a, url: data.asset.url } : a))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to reset site asset:", err);
      return false;
    }
  }, []);

  const resetAllAssets = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/site-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAssets();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to reset all site assets:", err);
      return false;
    }
  }, [fetchAssets]);

  return (
    <SiteAssetsContext.Provider
      value={{
        assets,
        rawAssets,
        isLoading,
        getAsset,
        refreshAssets: fetchAssets,
        updateAsset,
        resetAsset,
        resetAllAssets,
      }}
    >
      {children}
    </SiteAssetsContext.Provider>
  );
}

export function useSiteAssets() {
  return useContext(SiteAssetsContext);
}
