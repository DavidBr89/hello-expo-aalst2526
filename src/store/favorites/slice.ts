import { createSlice } from "@reduxjs/toolkit";


const initialState: Parking[] = [];

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        // TODO:  Reducers afwerken - Typing klopt
    }
})

const {reducer, actions} = favoritesSlice;
export default reducer;
// TODO: Actions gaan exporteren