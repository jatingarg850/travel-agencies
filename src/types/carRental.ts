export interface CarRental {
  id: number;
  name: string;
  type: 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury' | 'van';
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  pricePerDay: number;
  transmission: 'manual' | 'automatic';
  fuelType: string;
  seats: number;
  doors: number;
  luggage: number;
  features: string[];
  rating: number;
  totalReviews: number;
  available: number;
  insuranceIncluded: boolean;
  mileageLimit: string;
}

export interface CarRentalSearchParams {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  driverAge: number;
}

export interface CarRentalBooking {
  id: string;
  carId: number;
  searchParams: CarRentalSearchParams;
  driverInfo: DriverInfo;
  insurance: InsuranceOption;
  totalPrice: number;
  numberOfDays: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface DriverInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dateOfBirth: string;
}

export interface InsuranceOption {
  type: 'basic' | 'standard' | 'premium';
  price: number;
  coverage: string;
}
