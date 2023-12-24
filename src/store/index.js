import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./reducers/userData";
import isUpadetSlice  from "./reducers/isUpdate";
import isAuthSlice from "./reducers/isAuth";

export const store = configureStore({
  reducer: {
    isAuth : isAuthSlice, 
    userData: userDataSlice,
    isUpdate : isUpadetSlice
  },
});
