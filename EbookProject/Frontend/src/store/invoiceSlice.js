import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice=createSlice({
    name:"invoice",
    initialState:[
        {
            ninvoice:"redux",
            norder:"redux redux",
            book: "bonjour c'est un livre trés agréable",
            quatity: 1000,
            price:100
        },
        {
            ninvoice:"redux",
            norder:"redux redux",
            book: "bonjour c'est un livre trés agréable",
            quatity: 1000,
            price:100
        }
    ],
    reducers: {
        setInvoice: (state, action) => {
        return action.payload;
        },
    },

})

export const {setInvoice} = invoiceSlice.actions
export default invoiceSlice.reducer