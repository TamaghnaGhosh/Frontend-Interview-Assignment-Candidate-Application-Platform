import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./appSlice";

const store = configureStore({
  reducer: {
    jobinfo: jobReducer,
  },
});

export default store;
