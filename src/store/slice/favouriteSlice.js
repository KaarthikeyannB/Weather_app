import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const cityName = action.payload?.location?.name;
      const existingIndex = state.findIndex(
        (item) => item?.location?.name === cityName
      );

      if (existingIndex === -1 && action.payload) {
        state.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      const cityName = action.payload?.location?.name || action.payload;
      return state.filter((item) => item?.location?.name !== cityName);
    },
    clearFavourites: () => {
      return [];
    },
  },
});

export default favouriteSlice.reducer;
export const { addFavourite, removeFavourite, clearFavourites } =
  favouriteSlice.actions;
