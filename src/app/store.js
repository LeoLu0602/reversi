import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';

export default configureStore({
    reducer: {
        game: gameReducer
    }
});