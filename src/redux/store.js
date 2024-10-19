import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    notification: notificationReducer,
  },
});

export default store;
