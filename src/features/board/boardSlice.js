import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

// board[i][j] === 0: row i col j is not occupied
// board[i][j] === 1: row i col j is occupied by player 1
// board[i][j] === 2: row i col j is occupied by player 2

const toggleTurn = turn => turn === 1 ? 2 : 1;

const search = (board, i, j, turn) => {
    const oppositeTurn = toggleTurn(turn);
    const results = new Set();

    // ↑
    for (let k = 1; i - k >= 0; k++) {
        const current = board[i - k][j];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i - 1][j] === oppositeTurn) {
            results.add((i - k) * 8 + j);
        }

        break;
    }

    // ↗
    for (let k = 1; i - k >= 0 && j + k < 8; k++) {
        const current = board[i - k][j + k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i - 1][j + 1] === oppositeTurn) {
            results.add((i - k) * 8 + (j + k));
        }

        break;
    }

    // →
    for (let k = 1; j + k < 8; k++) {
        const current = board[i][j + k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i][j + 1] === oppositeTurn) {
            results.add(i * 8 + (j + k));
        }

        break;
    }

    // ↘
    for (let k = 1; i + k < 8 && j + k < 8; k++) {
        const current = board[i + k][j + k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i + 1][j + 1] === oppositeTurn) {
            results.add((i + k) * 8 + (j + k));
        }

        break;
    }

    // ↓
    for (let k = 1; i + k < 8; k++) {
        const current = board[i + k][j];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i + 1][j] === oppositeTurn) {
            results.add((i + k) * 8 + j);
        }

        break;
    }

    // ↙
    for (let k = 1; i + k < 8 && j - k >= 0; k++) {
        const current = board[i + k][j - k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i + 1][j - 1] === oppositeTurn) {
            results.add((i + k) * 8 + (j - k));
        }

        break;
    }

    // ←
    for (let k = 1; j - k >= 0; k++) {
        const current = board[i][j - k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i][j - 1] === oppositeTurn) {
            results.add(i * 8 + (j - k));
        }

        break;
    }

    // ↖
    for (let k = 1; i - k >= 0 && j - k >= 0; k++) {
        const current = board[i - k][j - k];

        if (current === oppositeTurn) continue;
        
        if (current === 0 && board[i - 1][j - 1] === oppositeTurn) {
            results.add((i - k) * 8 + (j - k));
        }

        break;
    }

    return results;
};

const calculateLegalMoves = (board, turn) => {
    let results = new Set();
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== turn) continue;

            results = new Set([
                ...results, 
                ...search(board, i, j, turn)
            ]);
        }
    }

    return results;
};

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        board:
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        legalMoves: new Set([20, 29, 34, 43]),
        turn: 1
    },
    reducers: {
        place: (state, action) => {
            const newState = JSON.parse(JSON.stringify(state));
            const [row, col] = action.payload.coordinate;

            newState.board[row][col] = state.turn;
            
            return newState;
        },
        nextPlayer: state => {
            const newState = JSON.parse(JSON.stringify(state));
            const oppositeTurn = toggleTurn(newState.turn);

            newState.legalMoves = calculateLegalMoves(newState.board, oppositeTurn);
            newState.turn = oppositeTurn;

            return newState;
        } 
    }
});

export const { place, nextPlayer } = boardSlice.actions;

export default boardSlice.reducer;