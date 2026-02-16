import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarRental, CarRentalBooking } from '@/types/carRental';

interface CarRentalState {
  cars: CarRental[];
  car: CarRental | null;
  bookings: CarRentalBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: CarRentalState = {
  cars: [],
  car: null,
  bookings: [],
  loading: false,
  error: null,
};

export const carRentalSlice = createSlice({
  name: 'carRentals',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<CarRental[]>) => {
      state.cars = action.payload;
    },
    setSingleCar: (state, action: PayloadAction<CarRental>) => {
      state.car = action.payload;
    },
    addCarRentalBooking: (state, action: PayloadAction<CarRentalBooking>) => {
      state.bookings.push(action.payload);
    },
    removeCarRentalBooking: (state, action: PayloadAction<string>) => {
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
  setCars,
  setSingleCar,
  addCarRentalBooking,
  removeCarRentalBooking,
  setLoading,
  setError,
} = carRentalSlice.actions;

export const selectCars = (state: { carRentals: CarRentalState }) => state.carRentals.cars;
export const selectSingleCar = (state: { carRentals: CarRentalState }) => state.carRentals.car;
export const selectCarRentalBookings = (state: { carRentals: CarRentalState }) => state.carRentals.bookings;

export default carRentalSlice.reducer;
