import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/counter/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice
  },
});
