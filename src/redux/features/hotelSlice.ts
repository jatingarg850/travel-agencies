import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel, HotelBooking } from '@/types/hotel';

interface HotelState {
  hotels: Hotel[];
  hotel: Hotel | null;
  bookings: HotelBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  hotels: [],
  hotel: null,
  bookings: [],
  loading: false,
  error: null,
};

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    setSingleHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotel = action.payload;
    },
    addHotelBooking: (state, action: PayloadAction<HotelBooking>) => {
      state.bookings.push(action.payload);
    },
    removeHotelBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setHotels,
  setSingleHotel,
  addHotelBooking,
  removeHotelBooking,
  setLoading,
  setError,
} = hotelSlice.actions;

export const selectHotels = (state: { hotels: HotelState }) => state.hotels.hotels;
export const selectSingleHotel = (state: { hotels: HotelState }) => state.hotels.hotel;
export const selectHotelBookings = (state: { hotels: HotelState }) => state.hotels.bookings;

export default hotelSlice.reducer;
