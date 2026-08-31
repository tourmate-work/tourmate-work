export type CarCategory =
  | "Sedan"
  | "SUV"
  | "Luxury"
  | "Hatchback"
  | "Van"
  | "Electric"
  | "Convertible";

export type Transmission = "Automatic" | "Manual";

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export interface CarLocation {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  luggageCapacity: number;
  mileageLimit?: string;
  pricePerDay: number;
  depositAmount: number;
  imageUrl: string;
  galleryImages?: string[];
  features: string[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isAvailable: boolean;
  location: CarLocation;
}

export interface SearchFilters {
  pickupLocation?: string;
  pickupDate?: Date;
  returnDate?: Date;
  category?: CarCategory | "All";
  minPrice?: number;
  maxPrice?: number;
  transmission?: Transmission | "All";
  fuelType?: FuelType | "All";
  seats?: number;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  car: Vehicle;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalDays: number;
  dailyRate: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: "customer" | "admin" | "partner";
}
