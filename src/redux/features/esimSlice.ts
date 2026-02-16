import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Esim, EsimPurchase } from '@/types/esim';

interface EsimState {
  esims: Esim[];
  esim: Esim | null;
  purchases: EsimPurchase[];
  loading: boolean;
  error: string | null;
}

const initialState: EsimState = {
  esims: [],
  esim: null,
  purchases: [],
  loading: false,
  error: null,
};

export const esimSlice = createSlice({
  name: 'esims',
  initialState,
  reducers: {
    setEsims: (state, action: PayloadAction<Esim[]>) => {
      state.esims = action.payload;
    },
    setSingleEsim: (state, action: PayloadAction<Esim>) => {
      state.esim = action.payload;
    },
    addEsimPurchase: (state, action: PayloadAction<EsimPurchase>) => {
      state.purchases.push(action.payload);
    },
    removeEsimPurchase: (state, action: PayloadAction<string>) => {
      state.purchases = state.purchases.filter(p => p.id !== action.payload);
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
  setEsims,
  setSingleEsim,
  addEsimPurchase,
  removeEsimPurchase,
  setLoading,
  setError,
} = esimSlice.actions;

export const selectEsims = (state: { esims: EsimState }) => state.esims.esims;
export const selectSingleEsim = (state: { esims: EsimState }) => state.esims.esim;
export const selectEsimPurchases = (state: { esims: EsimState }) => state.esims.purchases;

export default esimSlice.reducer;
