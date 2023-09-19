import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:[
        {
            name:"redux redux",
            email:"redux@redux.com",
            phone:97258369
        },
        {
            name:"reduxtoolkit",
            email:"sabri@redux.tn",
            phone:54879562
        }
    ],
    reducers: {
    
        setUser: (state, action) => {
        return action.payload;
        },
    },

})

export const {setUser} = userSlice.actions
export default userSlice.reducer