import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lettuce: [1],
    tomato: [1],
    onion: [1],
    cheese: [1],
    beef: [1],
    addCheckOutDetails: {lettuce: 0,
        tomato: 0,
        onion: 0,
        cheese: 0,
        beef: 0,
    totalprice:45
},
    check:0
};

const BurgerSlice = createSlice({
    name: "Burger",
    initialState,
    reducers: {
        addBurgerItems: (state, { payload }) => {
            state[payload.fruits].push(payload.count)
        },
        removeBurgerItems: (state, { payload }) => {
            state[payload.fruits].pop()
        },
        addCheckOutDetails: (state, action) => {state.addCheckOutDetails=action.payload},
        reset:(state,{payload})=>{
            state.lettuce.length=0;
            state.onion.length=0;
            state.tomato.length=0;
            state.cheese.length=0;
            state.beef.length=0
        }
          
       

    },
});

export const { addBurgerItems, removeBurgerItems, addCheckOutDetails,reset } = BurgerSlice.actions;

export default BurgerSlice.reducer;
