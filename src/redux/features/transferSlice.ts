import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transfer, TransferBooking } from '@/types/transfer';

interface TransferState {
  transfers: Transfer[];
  transfer: Transfer | null;
  bookings: TransferBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: TransferState = {
  transfers: [],
  transfer: null,
  bookings: [],
  loading: false,
  error: null,
};

export const transferSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    setTransfers: (state, action: PayloadAction<Transfer[]>) => {
      state.transfers = action.payload;
    },
    setSingleTransfer: (state, action: PayloadAction<Transfer>) => {
      state.transfer = action.payload;
    },
    addTransferBooking: (state, action: PayloadAction<TransferBooking>) => {
      state.bookings.push(action.payload);
    },
    removeTransferBooking: (state, action: PayloadAction<string>) => {
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
  setTransfers,
  setSingleTransfer,
  addTransferBooking,
  removeTransferBooking,
  setLoading,
  setError,
} = transferSlice.actions;

export const selectTransfers = (state: { transfers: TransferState }) => state.transfers.transfers;
export const selectSingleTransfer = (state: { transfers: TransferState }) => state.transfers.transfer;
export const selectTransferBookings = (state: { transfers: TransferState }) => state.transfers.bookings;

export default transferSlice.reducer;
