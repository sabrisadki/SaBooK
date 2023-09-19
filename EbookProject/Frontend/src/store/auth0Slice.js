import { createSlice } from "@reduxjs/toolkit";

const auth0Slice = createSlice({
    name:"users",
    initialState:[],
    reducers:{
        setUser:(state,action)=>{
            return action.payload
        }
    }
})

export const {setUser} = auth0Slice.actions
export default auth0Slice.reducer
