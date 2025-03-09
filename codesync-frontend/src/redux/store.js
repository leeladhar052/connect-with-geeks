import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice"; // Ensure this exists

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export default store;
