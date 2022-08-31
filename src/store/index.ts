import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import User from "./reducers/User";

const store = configureStore({
  reducer: {
    User,
  },
});

export type StoreCustomType = ReturnType<typeof store.getState>;
export type DispatchCustomType = typeof store.dispatch;
export const useStoreDispatch: () => DispatchCustomType = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreCustomType> =
  useSelector;
export default store;
