import { createSlice } from "@reduxjs/toolkit";

const unibookSlice=createSlice({
    name:"unibook",
    initialState:[
        {
            title:"redux",
            author:"redux redux",
            description: "bonjour c'est un livre trés agréable",
            pageCount: 1000,
            price:100
        }
    ],
    reducers: {
        setUniBook: (state, action) => {
        return action.payload;
        },
    },

})

export const {setUniBook} = unibookSlice.actions
export default unibookSlice.reducer