import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

// board[i][j] === 0: row i col j is not occupied
// board[i][j] === 1: row i col j is occupied by player 1
// board[i][j] === 2: row i col j is occupied by player 2

enableMapSet();

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

    results = Array.from(results);

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
        legalMoves: [20, 29, 34, 43],
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

            // another player has legal moves

            const anotherPlayerLegalMoves = calculateLegalMoves(newState.board, oppositeTurn);

            if (anotherPlayerLegalMoves.length > 0) {
                newState.legalMoves = anotherPlayerLegalMoves;
                newState.turn = oppositeTurn;

                return newState;
            }

            // another player does not have legal moves
            // current player has legal moves

            const currentPlayerLegalMoves = calculateLegalMoves(newState.board, newState.turn);

            if (currentPlayerLegalMoves.length > 0) {
                newState.legalMoves = currentPlayerLegalMoves;
                
                return newState;
            }

            // no player has legal moves
            // game over

            newState.legalMoves = [];
            newState.isGameEnd = true;

            return newState;
        },
        reset: state => {
            const newState = JSON.parse(JSON.stringify(state));
            
            newState.board = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];

            newState.legalMoves = [20, 29, 34, 43];
            newState.turn = 1;
            newState.isGameEnd = false;
            
            return newState;
        }, 
    }
});

export const { place, nextPlayer, reset } = gameSlice.actions;

export default gameSlice.reducer;