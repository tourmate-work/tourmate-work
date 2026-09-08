"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, UserProfile } from "@/lib/api-client";

export type AuthTab = "phone" | "gmail" | "email";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalDefaultTab: AuthTab;
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
  loginWithPhone: (data: { phone: string; name?: string }) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  sendPhoneOtp: (phone: string) => Promise<{ success: boolean; message?: string; devOtp?: string; error?: string }>;
  verifyPhoneOtp: (phone: string, code: string, name?: string) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  loginWithGoogle: (data: { email?: string; name?: string; avatarUrl?: string; credential?: string }) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  registerWithEmail: (data: { name: string; email: string; password: string; phone?: string }) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<AuthTab>("phone");

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.auth.me();
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openAuthModal = useCallback((tab: AuthTab = "phone") => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const loginWithPhone = async (data: { phone: string; name?: string }) => {
    try {
      const res = await api.auth.loginWithPhone(data);
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthModalOpen(false);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Failed to sign in with phone number." };
    } catch {
      return { success: false, error: "Network error during phone authentication." };
    }
  };

  const sendPhoneOtp = async (phone: string) => {
    try {
      const res = await api.auth.sendPhoneOtp(phone);
      return res;
    } catch {
      return { success: false, error: "Network error sending verification code." };
    }
  };

  const verifyPhoneOtp = async (phone: string, code: string, name?: string) => {
    try {
      const res = await api.auth.verifyPhoneOtp({ phone, code, name });
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthModalOpen(false);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Failed to verify phone code." };
    } catch {
      return { success: false, error: "Network error during verification." };
    }
  };

  const loginWithGoogle = async (data: { email?: string; name?: string; avatarUrl?: string; credential?: string }) => {
    try {
      const res = await api.auth.loginWithGoogle(data);
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthModalOpen(false);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Google authentication failed." };
    } catch {
      return { success: false, error: "Network error during Google login." };
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const res = await api.auth.login({ email, password });
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthModalOpen(false);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Invalid email or password." };
    } catch {
      return { success: false, error: "Network error during login." };
    }
  };

  const registerWithEmail = async (data: { name: string; email: string; password: string; phone?: string }) => {
    try {
      const res = await api.auth.register(data);
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthModalOpen(false);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Registration failed." };
    } catch {
      return { success: false, error: "Network error during registration." };
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalDefaultTab,
        openAuthModal,
        closeAuthModal,
        loginWithPhone,
        sendPhoneOtp,
        verifyPhoneOtp,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
