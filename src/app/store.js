import { configureStore } from '@reduxjs/toolkit';
import BurgerSlice from '../features/BurgerSlice'
export const store = configureStore({
  reducer: {
    burger:BurgerSlice,
  },
});
