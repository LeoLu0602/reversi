import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { click } from '../features/board/boardSlice';
import { toggleTurn } from '../features/turn/turnSlice';
import styles from './Cell.module.css';

const Cell = ({ row, col }) => {
    const [isLegal, setIsLegal] = useState(false);

    const turn = useSelector(state => state.turn);
    const cellStatus = useSelector(state => state.board[row][col]);
    const legalMoves = useSelector(state => state.legalMoves);
    const dispatch = useDispatch();

    const handleCellClick = () => {
        dispatch(click({
            turn: turn,
            coordinate: [row, col]
        }));

        dispatch(toggleTurn());
    };

    const checkIsLegal = () => {
        for (let i = 0; i < legalMoves.length; i++) {
            if (legalMoves[i][0] === row && legalMoves[i][1] === col) return true;
        }

        return false;
    };

    useEffect(() => {
        setIsLegal(checkIsLegal());
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