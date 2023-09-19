import { createSlice } from "@reduxjs/toolkit";

const CommentSlice=createSlice({
    name:"comment",
    initialState:[
        {
            name: "String1",
            bookid:"String12",
            commentext: "String123",
        },
        
        {
            name: "String2",
            bookid:"String23",
            commentext: "String",
        }
    ],
    reducers: {
        setComment: (state, action) => {
        return action.payload;
    },
    },

})

export const {setComment} = CommentSlice.actions
export default CommentSlice.reducer