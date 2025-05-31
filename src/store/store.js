import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slice/searchSlice";
import favouriteReducer from "./slice/favouriteSlice";
import { favouritesLoadState, favouritesSaveState, loadState, saveState } from "../middleware/searchMiddleware";



const store = configureStore({
    reducer:{
        search:searchReducer,
        favourites:favouriteReducer,
    },
    preloadedState:{
        search: loadState(),
        favourites: favouritesLoadState(),
    },

});

store.subscribe(() => {
    saveState(store.getState().search);
    favouritesSaveState(store.getState().favourites);
});


export default store;