import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight, FlightBooking } from '@/types/flight';

interface FlightState {
  flights: Flight[];
  flight: Flight | null;
  bookings: FlightBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: [],
  flight: null,
  bookings: [],
  loading: false,
  error: null,
};

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
    },
    setSingleFlight: (state, action: PayloadAction<Flight>) => {
      state.flight = action.payload;
    },
    addFlightBooking: (state, action: PayloadAction<FlightBooking>) => {
      state.bookings.push(action.payload);
    },
    removeFlightBooking: (state, action: PayloadAction<string>) => {
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
  setFlights,
  setSingleFlight,
  addFlightBooking,
  removeFlightBooking,
  setLoading,
  setError,
} = flightSlice.actions;

export const selectFlights = (state: { flights: FlightState }) => state.flights.flights;
export const selectSingleFlight = (state: { flights: FlightState }) => state.flights.flight;
export const selectFlightBookings = (state: { flights: FlightState }) => state.flights.bookings;

export default flightSlice.reducer;
