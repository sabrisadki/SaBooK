import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name:"account",
    initialState:[{
        name:"redux account",
        email:"redux@gmail.com",
        phone: 321654987,
        password:"reduxjvkhvjv",
        role:"admin"
    }],
    reducers:{
        setAccount:(state,action)=>{
            return action.payload
        }
    }
})

export const {setAccount} = accountSlice.actions
export default accountSlice.reducer
