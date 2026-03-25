
// Counter slice of counter rayon

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        // { type: "counter/increment", payload: 5}
        increment: (state, action: PayloadAction<number>) => {
            return state + action.payload
        },
        // { type: "counter/incrementByOne" }
        incrementByOne: (state) => {
            return state + 1;
        },
        // { type: "counter/decrement", payload: 5}
        decrement: (state, action: PayloadAction<number>) => {
            return state - action.payload
        },
         // { type: "counter/decrementByOne" }
        decrementByOne: (state) => {
            return state - 1;
        }
    }
})

const { reducer, actions } = counterSlice;
export default reducer;
export const { increment, incrementByOne, decrement, decrementByOne } = actions;