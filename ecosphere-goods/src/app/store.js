import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import shoppingCartReducer from '../features/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: shoppingCartReducer,
  },
});
