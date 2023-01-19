import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/slices/authSlice";
// import orderReducer from "./src/slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // order: orderReducer,
  },
});
