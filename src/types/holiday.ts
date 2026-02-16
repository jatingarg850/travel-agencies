export interface Holiday {
  id: number;
  title: string;
  destination: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  duration: number;
  startDate?: string;
  endDate?: string;
  rating: number;
  totalReviews: number;
  description: string;
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  accommodation: string;
  meals: string;
  groupSize: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestTime: string;
  highlights: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string;
  accommodation: string;
}

export interface HolidaySearchParams {
  destination: string;
  startDate: string;
  duration: number;
  travelers: number;
  budget: {
    min: number;
    max: number;
  };
}

export interface HolidayBooking {
  id: string;
  holidayId: number;
  searchParams: HolidaySearchParams;
  travelers: TravelerInfo[];
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface TravelerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  roomPreference?: string;
}
