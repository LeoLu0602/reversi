import { createSlice } from '@reduxjs/toolkit';

export const legalMovesSlice = createSlice({
    name: 'legalMoves',
    initialState: [[2, 4], [3, 5], [4, 2], [5, 3]],
    reducers: {
        updateLegalMoves: (state, action) => {
            
        }     
    }
});

export const { updateLegalMoves } = legalMovesSlice.actions;

export default legalMovesSlice.reducer;