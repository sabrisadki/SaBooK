import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchOrders} from '../api/orderApi'
import { patchOrder } from "../api/orderApi";

export const updateOrderStatusAsync = createAsyncThunk(
"order/updateStatus",
async ({ el, newStatus }) => {
    try {
    const response = await patchOrder(el._id, newStatus);
    return response.data; // You can modify this to match your API response
    } catch (error) {
    throw error;
    }
}
);
// Define an async thunk to fetch order data from the API
export const fetchOrdersAsync = createAsyncThunk("order/fetchOrders", async () => {
    const response = await fetchOrders(); // Replace with your API call to fetch orders
    return response;
});

const orderSlice=createSlice({
    name:"order",
    initialState:[
        {
            norder: "redux redux",
            bookid: "redux redux",
            userid: "redux redux",
            quantity: 3000,
            status:"Open"
        },
        {
            norder: "redux redux",
            bookid: "redux redux",
            userid: "redux redux",
            quantity: 2000,
            status:"Close"
        }
    ],
    reducers: {
        setOrder: (state, action) => {
        return action.payload;
    },
    },
    extraReducers: (builder) => {
        // Add a reducer for the fetchOrdersAsync action
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    }

})

export const {setOrder} = orderSlice.actions
export default orderSlice.reducer




