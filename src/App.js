import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from './features/game/gameSlice';
import Cell from './components/Cell';
import GameOver from './components/GameOver';
import styles from './app.module.css';

const App = () => {
    const [gameOverMsgShown, setGameOverMsgShown] = useState(false);

    const turn = useSelector(state => state.game.turn);
    const isGameEnd = useSelector(state => state.game.isGameEnd);

    const dispatch = useDispatch();

    const table = [];

    for (let i = 0; i < 8; i++) {
        const row = [];

        for (let j = 0; j < 8; j++) {
            row.push (<Cell key={j} row={i} col={j} />);
        }

        table.push(<div key={i} className={styles.row}>{row}</div>);
    }

    const restart = () => {
        const modal = document.querySelector('.GameOver_modal__IdKYN');

        modal.style.display = 'none';
        setGameOverMsgShown(false);
        dispatch(reset());
    };

    const handleGameOver = () => {
        const modal = document.querySelector('.GameOver_modal__IdKYN');

        setGameOverMsgShown(true);
        modal.style.display = 'flex';
    };

    useEffect(() => {
        if (isGameEnd && !gameOverMsgShown) handleGameOver(); 
    }, [isGameEnd]);

    return (
        <div className={styles.app}>
            <GameOver restart={restart} />
            <h1 className={styles.header}>Reversi</h1>
            <div>{table}</div>
            {
                turn === 1
                ? <h1>Black's Turn</h1>
                : <h1 className={styles.white}>White's Turn</h1>
            }               
        </div>
    );
};

export default App;