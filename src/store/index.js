import { configureStore } from "@reduxjs/toolkit";
import accessSlice from "./reducers/access";
import isAuthSlice from "./reducers/isAuth";
import userDataSlice from "./reducers/userData";

export const store = configureStore({
  reducer: {
    accessToken: accessSlice,
    isAuth: isAuthSlice,
    userData: userDataSlice,
  },
});
