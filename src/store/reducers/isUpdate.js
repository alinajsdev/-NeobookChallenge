import { createSlice } from "@reduxjs/toolkit";

export const isUpadetSlice = createSlice({
  name: "isUpdate",
  initialState: {
    isUpdate: false,
  },
  reducers: {
    getUserUpdate(state, action) {
      state.isUpdate = action.payload;
    },
  },
});

export default isUpadetSlice.reducer;
export const { getUserUpdate } = isUpadetSlice.actions;