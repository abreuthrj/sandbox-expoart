import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/User";

const store = configureStore({
  reducer: {
    User,
  },
});

export default store;
