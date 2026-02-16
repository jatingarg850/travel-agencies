import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { hydrateCart } from "./features/cartSlice";
import productSlice from "./features/productSlice";
import wishlistSlice from "./features/wishlistSlice";
import flightSlice from "./features/flightSlice";
import hotelSlice from "./features/hotelSlice";
import carRentalSlice from "./features/carRentalSlice";
import transferSlice from "./features/transferSlice";
import holidaySlice from "./features/holidaySlice";
import visaSlice from "./features/visaSlice";
import esimSlice from "./features/esimSlice";

const store = configureStore({
   reducer: {
      products: productSlice,
      cart: cartSlice,
      wishlist: wishlistSlice,
      flights: flightSlice,
      hotels: hotelSlice,
      carRentals: carRentalSlice,
      transfers: transferSlice,
      holidays: holidaySlice,
      visas: visaSlice,
      esims: esimSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

store.dispatch(hydrateCart());
export type RootState = ReturnType<typeof store.getState>;

export default store;