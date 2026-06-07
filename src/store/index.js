import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from "./shopApi";
import cartReducer from "./cartSlice";

export default configureStore({
    reducer: {
        [shopApi.reducerPath]: shopApi.reducer,
        cart: cartReducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(shopApi.middleware);
    }
});