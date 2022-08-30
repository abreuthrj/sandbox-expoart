import { createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

const initialState: Partial<User> = {
  name: null,
  access_token: null,
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStoreSignin: (state, { payload }: { payload: User }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.access_token = payload.access_token;
      state.id = payload.id;
    },

    userStoreSignout: (state) => {
      state = { ...initialState };
    },
  },
});

export const { userStoreSignin, userStoreSignout } = userSlice.actions;
export default userSlice.reducer;
