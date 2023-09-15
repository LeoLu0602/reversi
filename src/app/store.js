import { configureStore } from '@reduxjs/toolkit';
import turnReducer from '../features/turn/turnSlice';
import boardReducer from '../features/board/boardSlice';
import legalMovesSlice from '../features/legalMoves/legalMovesSlice';

export default configureStore({
    reducer: {
        turn: turnReducer,
        board: boardReducer,
        legalMoves: legalMovesSlice
    }
});