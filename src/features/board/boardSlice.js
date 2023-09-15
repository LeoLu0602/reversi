import { createSlice } from '@reduxjs/toolkit';

// board[i][j] === 0: row i col j is not occupied
// board[i][j] === 1: row i col j is occupied by player 1
// board[i][j] === 2: row i col j is occupied by player 2

export const boardSlice = createSlice({
    name: 'board',
    initialState: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    reducers: {
        click: (state, action) => {
            const turn = action.payload.turn;
            const [row, col] = action.payload.coordinate;
            const newState = JSON.parse(JSON.stringify(state));

            newState[row][col] = turn;
            
            return newState;
        }   
    }
});

export const { click } = boardSlice.actions;

export default boardSlice.reducer;