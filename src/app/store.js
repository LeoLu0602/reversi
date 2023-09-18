import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

export default configureStore({
    reducer: {
        board: boardReducer
    }
});