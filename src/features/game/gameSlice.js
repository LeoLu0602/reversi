import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

// board[i][j] === 0: row i col j is not occupied
// board[i][j] === 1: row i col j is occupied by player 1
// board[i][j] === 2: row i col j is occupied by player 2

const toggleTurn = turn => turn === 1 ? 2 : 1;

const searchLegalMoves = (board, i, j, turn) => {
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
                ...searchLegalMoves(board, i, j, turn)
            ]);
        }
    }

    return results;
};

const flipPieces = (board, move, turn) => {
    const [i, j] = move;
    const newBoard = board.slice();
    const oppositeTurn = toggleTurn(turn);
    let piecesToFlip = [];
    let tmp = []; // stores pieces that might be flipped

    newBoard[i][j] = turn;

    // ↑
    for (let k = 1; i - k >= 0; k++) {
        const current = newBoard[i - k][j];
        
        if (current === oppositeTurn) {
            tmp.push([i - k, j]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ↗
    tmp = [];

    for (let k = 1; i - k >= 0 && j + k < 8; k++) {
        const current = newBoard[i - k][j + k];
        
        if (current === oppositeTurn) {
            tmp.push([i - k, j + k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // →
    tmp = [];

    for (let k = 1; j + k < 8; k++) {
        const current = newBoard[i][j + k];
        
        if (current === oppositeTurn) {
            tmp.push([i, j + k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ↘
    tmp = [];

    for (let k = 1; i + k < 8 && j + k < 8; k++) {
        const current = newBoard[i + k][j + k];
        
        if (current === oppositeTurn) {
            tmp.push([i + k, j + k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ↓
    tmp = [];

    for (let k = 1; i + k < 8; k++) {
        const current = newBoard[i + k][j];
        
        if (current === oppositeTurn) {
            tmp.push([i + k, j]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ↙
    tmp = [];

    for (let k = 1; i + k < 8 && j - k >= 0; k++) {
        const current = newBoard[i + k][j - k];
        
        if (current === oppositeTurn) {
            tmp.push([i + k, j - k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ←
    tmp = [];

    for (let k = 1; j - k >= 0; k++) {
        const current = newBoard[i][j - k];
        
        if (current === oppositeTurn) {
            tmp.push([i, j - k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    // ↖
    tmp = [];

    for (let k = 1; i - k >= 0 && j - k >= 0; k++) {
        const current = newBoard[i - k][j - k];
        
        if (current === oppositeTurn) {
            tmp.push([i - k, j - k]);
            continue;
        }
         
        if (current === turn) piecesToFlip = [...piecesToFlip, ...tmp];

        break;
    }

    piecesToFlip.forEach(([row, col]) => {
        newBoard[row][col] = turn;
    });

    return newBoard;
};

export const gameSlice = createSlice({
    name: 'game',
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
        turn: 1,
        isGameEnd: false
    },
    reducers: {
        place: (state, action) => {
            const newState = JSON.parse(JSON.stringify(state));
            const [row, col] = action.payload.coordinate;

            newState.board = flipPieces(newState.board, [row, col], newState.turn);
            
            return newState;
        },
        nextPlayer: state => {
            const newState = JSON.parse(JSON.stringify(state));
            const oppositeTurn = toggleTurn(newState.turn);
            const currentPlayerLegalMoves = calculateLegalMoves(newState.board, newState.turn);
            const anotherPlayerLegalMoves = calculateLegalMoves(newState.board, oppositeTurn);

            if (
                currentPlayerLegalMoves.size === 0 && 
                anotherPlayerLegalMoves.size === 0
            ) {
                newState.legalMoves = currentPlayerLegalMoves;
                newState.isGameEnd = true;

                return newState;
            }

            if (anotherPlayerLegalMoves.size > 0) newState.turn = oppositeTurn;

            newState.legalMoves = anotherPlayerLegalMoves.size > 0 
                                    ? anotherPlayerLegalMoves 
                                    : currentPlayerLegalMoves;

            return newState;
        } 
    }
});

export const { place, nextPlayer } = gameSlice.actions;

export default gameSlice.reducer;