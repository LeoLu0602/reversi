import { useSelector, useDispatch } from 'react-redux';
import { click } from '../features/board/boardSlice';
import { toggleTurn } from '../features/turn/turnSlice';
import styles from './Cell.module.css';

const Cell = ({ row, col }) => {
    const turn = useSelector(state => state.turn);
    const cellStatus = useSelector(state => state.board[row][col]);
    const dispatch = useDispatch();

    const handleCellClick = () => {
        dispatch(click({
            turn: turn,
            coordinate: [row, col]
        }));

        dispatch(toggleTurn());
    };

    return (
        <div 
            className={styles.cell} 
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