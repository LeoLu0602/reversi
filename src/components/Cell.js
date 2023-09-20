import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { place, nextPlayer } from '../features/game/gameSlice';
import styles from './Cell.module.css';

const Cell = ({ row, col }) => {
    const [isLegal, setIsLegal] = useState(false);

    const cellStatus = useSelector(state => state.game.board[row][col]);
    const legalMoves = useSelector(state => state.game.legalMoves);
    
    const dispatch = useDispatch();

    const handleCellClick = () => {
        if (!isLegal) return;

        dispatch(place({
            coordinate: [row, col]
        }));
        
        dispatch(nextPlayer());
    };

    useEffect(() => {
        const legalMovesSet = new Set(legalMoves);

        setIsLegal(legalMovesSet.has(row * 8 + col));
    }, [legalMoves]);

    return (
        <div 
            className={`${styles.cell} ${isLegal ? styles.legal : ''}`}
            onClick={handleCellClick}
        >
            {
                cellStatus === 1
                ? <div className={styles.black} />
                : cellStatus === 2
                ? <div className={styles.white} />
                : <div />
            }
        </div>
    );
};

export default Cell;