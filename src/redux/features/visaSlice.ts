import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Visa, VisaApplication } from '@/types/visa';

interface VisaState {
  visas: Visa[];
  visa: Visa | null;
  applications: VisaApplication[];
  loading: boolean;
  error: string | null;
}

const initialState: VisaState = {
  visas: [],
  visa: null,
  applications: [],
  loading: false,
  error: null,
};

export const visaSlice = createSlice({
  name: 'visas',
  initialState,
  reducers: {
    setVisas: (state, action: PayloadAction<Visa[]>) => {
      state.visas = action.payload;
    },
    setSingleVisa: (state, action: PayloadAction<Visa>) => {
      state.visa = action.payload;
    },
    addVisaApplication: (state, action: PayloadAction<VisaApplication>) => {
      state.applications.push(action.payload);
    },
    removeVisaApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter(a => a.id !== action.payload);
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
  setVisas,
  setSingleVisa,
  addVisaApplication,
  removeVisaApplication,
  setLoading,
  setError,
} = visaSlice.actions;

export const selectVisas = (state: { visas: VisaState }) => state.visas.visas;
export const selectSingleVisa = (state: { visas: VisaState }) => state.visas.visa;
export const selectVisaApplications = (state: { visas: VisaState }) => state.visas.applications;

export default visaSlice.reducer;
