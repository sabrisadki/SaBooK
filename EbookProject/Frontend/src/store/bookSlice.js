import { createSlice } from "@reduxjs/toolkit";

const bookSlice=createSlice({
    name:"book",
    initialState:[
        {
            title:"redux",
            author:"redux redux",
            description: "bonjour c'est un livre trés agréable",
            pageCount: 1000,
            price:100
        },
        {
            title:"redux",
            author:"redux redux",
            description: "bonjour c'est un livre trés agréable",
            pageCount: 3000,
            price:300
        }
    ],
    reducers: {
        setBook: (state, action) => {
        return action.payload;
        },
    },

})

export const {setBook} = bookSlice.actions
export default bookSlice.reducer