export interface Hotel {
  id: number;
  name: string;
  location: string;
  city: string;
  country: string;
  image: string;
  images?: string[];
  rating: number;
  totalReviews: number;
  price: number;
  originalPrice?: number;
  pricePerNight: number;
  amenities: string[];
  roomTypes: RoomType[];
  description: string;
  latitude?: number;
  longitude?: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
}

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  image: string;
  available: number;
}

export interface HotelSearchParams {
  location: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
}

export interface HotelBooking {
  id: string;
  hotelId: number;
  roomTypeId: string;
  searchParams: HotelSearchParams;
  guestInfo: GuestInfo;
  totalPrice: number;
  numberOfNights: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}
