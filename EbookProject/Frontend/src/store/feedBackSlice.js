import { createSlice } from "@reduxjs/toolkit";

const FeedBackSlice=createSlice({
    name:"feedback",
    initialState:[
        {
            name: "String",
            email: "String",
            phone:   1656983  ,
            message: "Hi",
        },
        {
            name: "redux",
            email: "redux@redux.x",
            phone:   1656983  ,
            message: "Hello",
        }
    ],
    reducers: {
        setFeedback: (state, action) => {
        return action.payload;
    },
    },

})

export const {setFeedback} = FeedBackSlice.actions
export default FeedBackSlice.reducer