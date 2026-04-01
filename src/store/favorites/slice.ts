import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Parking[] = [];

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<Parking>) => {
            if(state.some(f => f.id === action.payload.id)) {
                return state.filter(f => f.id !== action.payload.id)
            } 
            return [...state, action.payload];
        },
    }
})

const {reducer, actions} = favoritesSlice;
export default reducer;
export const { toggle } = actions;