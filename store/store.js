import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Configure persist options for cart
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items']
};

// Create persisted cart reducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configure store
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persisted store
export const persistor = persistStore(store);