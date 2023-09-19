import { configureStore } from "@reduxjs/toolkit";
import bookSlice from './bookSlice'
import accountSlice from "./accountSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import FeedBackSlice from "./feedBackSlice";
import CommentSlice from "./commentSlice"
import invoiceSlice from "./invoiceSlice";
import selectedUserIdSlice from './selectedUserIdSlice'
import auth0Slice from "./auth0Slice";
import unibookSlice from "./unibookSlice";

export default configureStore({
    reducer:{
        book : bookSlice,
        account : accountSlice,
        order: orderSlice,
        user: userSlice,
        feedback:FeedBackSlice,
        comment: CommentSlice,
        invoice:invoiceSlice,
        selectedUserId:selectedUserIdSlice,
        users:auth0Slice,
        unibook : unibookSlice,
    }
})