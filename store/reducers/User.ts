import { createSlice } from "@reduxjs/toolkit";

export type UserStoreType = {
  name?: string;
};

const initialState: UserStoreType = {
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStoreSignin: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export default userSlice.reducer;
