export interface Transfer {
  id: number;
  name: string;
  vehicleType: 'sedan' | 'suv' | 'van' | 'bus' | 'luxury';
  image: string;
  price: number;
  originalPrice?: number;
  capacity: number;
  from: string;
  to: string;
  estimatedDuration: string;
  distance: string;
  features: string[];
  rating: number;
  totalReviews: number;
  available: number;
  driverIncluded: boolean;
  luggage: number;
}

export interface TransferSearchParams {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  returnTransfer?: boolean;
  returnDate?: string;
  returnTime?: string;
}

export interface TransferBooking {
  id: string;
  transferId: number;
  searchParams: TransferSearchParams;
  passengerInfo: PassengerInfo;
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}
