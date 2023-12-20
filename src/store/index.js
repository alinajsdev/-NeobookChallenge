import { configureStore } from "@reduxjs/toolkit";
import isAuthSlice from "./reducers/isAuth";
import userDataSlice from "./reducers/userData";

export const store = configureStore({
  reducer: {

    isAuth: isAuthSlice,
    userData: userDataSlice,
  },
});
