import { createSlice } from "@reduxjs/toolkit";

export const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    getIsAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export default isAuthSlice.reducer;
export const { getIsAuth } = isAuthSlice.actions;