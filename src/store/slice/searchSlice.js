import { createSlice } from "@reduxjs/toolkit";


const initialState = "chennai";

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearch: (state, action) => {
            return action.payload;
        },
    },
})

export default searchSlice.reducer;
export const { setSearch } = searchSlice.actions;