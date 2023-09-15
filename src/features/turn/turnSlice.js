import { createSlice } from '@reduxjs/toolkit';

// 1 for player1, 2 for player 2
// player 1 uses black pieces
// player 2 uses white pieces

export const turnSlice = createSlice({
    name: 'turn',
    initialState: 1, 
    reducers: {
        toggleTurn: state => state === 1 ? 2 : 1
    }
});

export const { toggleTurn } = turnSlice.actions;

export default turnSlice.reducer;