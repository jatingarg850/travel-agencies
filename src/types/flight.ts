export interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  totalReviews: number;
  amenities: string[];
  baggage: string;
  mealIncluded: boolean;
  seatClass: 'economy' | 'business' | 'first';
  available: number;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  seatClass: 'economy' | 'business' | 'first';
}

export interface FlightBooking {
  id: string;
  flightId: number;
  searchParams: FlightSearchParams;
  passengers: PassengerInfo[];
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PassengerInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passport?: string;
  nationality: string;
}
