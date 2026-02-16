import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Holiday, HolidayBooking } from '@/types/holiday';

interface HolidayState {
  holidays: Holiday[];
  holiday: Holiday | null;
  bookings: HolidayBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: HolidayState = {
  holidays: [],
  holiday: null,
  bookings: [],
  loading: false,
  error: null,
};

export const holidaySlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {
    setHolidays: (state, action: PayloadAction<Holiday[]>) => {
      state.holidays = action.payload;
    },
    setSingleHoliday: (state, action: PayloadAction<Holiday>) => {
      state.holiday = action.payload;
    },
    addHolidayBooking: (state, action: PayloadAction<HolidayBooking>) => {
      state.bookings.push(action.payload);
    },
    removeHolidayBooking: (state, action: PayloadAction<string>) => {
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
  setHolidays,
  setSingleHoliday,
  addHolidayBooking,
  removeHolidayBooking,
  setLoading,
  setError,
} = holidaySlice.actions;

export const selectHolidays = (state: { holidays: HolidayState }) => state.holidays.holidays;
export const selectSingleHoliday = (state: { holidays: HolidayState }) => state.holidays.holiday;
export const selectHolidayBookings = (state: { holidays: HolidayState }) => state.holidays.bookings;

export default holidaySlice.reducer;
