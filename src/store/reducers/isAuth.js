import { createSlice } from "@reduxjs/toolkit";

// Получаем значение из localStorage
const storedIsAuth = JSON.parse(localStorage.getItem('isAuth')) || false;

export const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: {
    isAuth: storedIsAuth,
  },
  reducers: {
    getIsAuth(state, action) {
      // Обновляем значение и в localStorage
      state.isAuth = action.payload;
      localStorage.setItem('isAuth', JSON.stringify(action.payload));
    },
  },
});

export default isAuthSlice.reducer;
export const { getIsAuth } = isAuthSlice.actions;