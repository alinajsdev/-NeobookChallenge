import { configureStore } from "@reduxjs/toolkit";
import  accessSlice  from "./reducers/access";

export const store = configureStore({
    reducer :{
        accessToken : accessSlice
    }
})