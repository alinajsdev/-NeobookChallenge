import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./reducers/userData";
import isUpadetSlice  from "./reducers/isUpdate";

export const store = configureStore({
  reducer: {


    userData: userDataSlice,
    isUpdate : isUpadetSlice
  },
});
