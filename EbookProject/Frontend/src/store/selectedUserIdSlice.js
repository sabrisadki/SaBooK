import { createSlice } from "@reduxjs/toolkit";

const selectedUserIdSlice=createSlice({
    name:"selectedUserId",
    initialState:{
        selectedUserId: null,
    },
    reducers: {
    

        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload;
        },
    },

})

export const {setSelectedUserId} = selectedUserIdSlice.actions
export default selectedUserIdSlice.reducer