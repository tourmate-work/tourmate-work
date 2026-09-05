import { Vehicle, UserProfile } from "@/types";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface VehiclesResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  vehicles: Vehicle[];
}

export interface SellerAnalytics {
  totalEarnings: number;
  totalFleet: number;
  availableCount: number;
  onRentalCount: number;
  maintenanceCount: number;
  totalTrips: number;
  activeBookingsCount: number;
  occupancyRate: number;
  avgRating: number;
  monthlyEarnings: Array<{ month: string; earnings: number; trips: number }>;
}

export const api = {
  // Auth
  auth: {
    async register(data: { name: string; email: string; password: string; phone?: string; role?: string }) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    async login(data: { email: string; password: string }) {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    async me(): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
      const res = await fetch("/api/auth/me");
      return res.json();
    },
    async logout() {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      return res.json();
    },
  },

  // Vehicles
  vehicles: {
    async getAll(filters?: {
      category?: string;
      transmission?: string;
      fuelType?: string;
      seats?: number;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
      location?: string;
      isFeatured?: boolean;
      sortBy?: string;
      page?: number;
      limit?: number;
    }): Promise<VehiclesResponse> {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            params.append(key, String(val));
          }
        });
      }
      const res = await fetch(`/api/vehicles?${params.toString()}`);
      return res.json();
    },

    async getById(id: string) {
      const res = await fetch(`/api/vehicles/${id}`);
      return res.json();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async create(data: any) {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async update(id: string, data: any) {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },

    async delete(id: string) {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
  },

  // Bookings
  bookings: {
    async create(data: {
      carId: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      pickupDate: string;
      returnDate: string;
      pickupLocation?: string;
      returnLocation?: string;
      specialRequests?: string;
    }) {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },

    async getAll(filters?: { userId?: string; carId?: string; sellerId?: string; status?: string }) {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, val]) => {
          if (val) params.append(key, String(val));
        });
      }
      const res = await fetch(`/api/bookings?${params.toString()}`);
      return res.json();
    },

    async updateStatus(id: string, status: string) {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
  },

  // Seller Portal
  seller: {
    async getAnalytics(sellerId?: string): Promise<{ success: boolean; analytics: SellerAnalytics }> {
      const url = sellerId ? `/api/seller/analytics?sellerId=${sellerId}` : "/api/seller/analytics";
      const res = await fetch(url);
      return res.json();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getVehicles(sellerId?: string): Promise<{ success: boolean; fleet: any[] }> {
      const url = sellerId ? `/api/seller/vehicles?sellerId=${sellerId}` : "/api/seller/vehicles";
      const res = await fetch(url);
      return res.json();
    },

    async updateVehicleStatus(id: string, status: "Available" | "On Rental" | "Maintenance") {
      const res = await fetch(`/api/seller/vehicles/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
  },

  // Reviews
  reviews: {
    async getByCarId(carId: string) {
      const res = await fetch(`/api/reviews?carId=${carId}`);
      return res.json();
    },

    async submit(data: { carId: string; rating: number; comment: string; userName?: string }) {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  },

  // Contact & Inquiries
  contact: {
    async submit(data: {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
      date?: string;
      carModel?: string;
    }) {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },

    async getAll() {
      const res = await fetch("/api/contact");
      return res.json();
    },
  },
};
