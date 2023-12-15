import { createSlice } from "@reduxjs/toolkit";

export const accessSlice = createSlice({
  name: "access",
  initialState: {
    access: null,
  },
  reducers: {
    getAccess(state, action) {
      state.access = action.payload;
    },
  },
});

export default accessSlice.reducer;
export const { getAccess } = accessSlice.actions;
