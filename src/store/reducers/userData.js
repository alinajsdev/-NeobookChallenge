import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null,
  },
  reducers: {
    getUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export default userDataSlice.reducer;
export const { getUserData } = userDataSlice.actions;