import { configureStore } from '@reduxjs/toolkit';
import turnReducer from '../features/turn/turnSlice';
import boardReducer from '../features/board/boardSlice';

export default configureStore({
    reducer: {
        turn: turnReducer,
        board: boardReducer
    }
});