import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState : {
        users : []
    },
    reducers: {
        getUsers (state,action ){
            state.users.push(action.payload)
        }
    }

})

export default userSlice.reducer
export const {getUsers} = userSlice.actions


export const fetchUsers = () =>{
    return async (dispatch) =>{
        const {data} = await axios(``)
        dispatch(getUsers(data))
    }
}

 
