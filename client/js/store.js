import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../src/slices/apiSlice.js';
import cartSliceReducer from '../src/slices/cartSlice.js';
import authSliceReducer from '../src/slices/authSlice.js';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;