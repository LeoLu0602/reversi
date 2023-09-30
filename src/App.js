import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from './features/game/gameSlice';
import Cell from './components/Cell';
import GameOver from './components/GameOver';
import styles from './app.module.css';

const App = () => {
    const turn = useSelector(state => state.game.turn);
    const isGameEnd = useSelector(state => state.game.isGameEnd);
    const scores = useSelector(state => state.game.scores);

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
        dispatch(reset());
    };

    const handleGameOver = () => {
        const modal = document.querySelector('.GameOver_modal__IdKYN');
        modal.style.display = 'flex';
    };

    useEffect(() => {
        const black = document.querySelector('.app_scoresBar__VAvbB div:nth-child(1)');
        const white = document.querySelector('.app_scoresBar__VAvbB div:nth-child(2)');

        black.style.width = `${scores[0] / 64 * 100}%`;
        white.style.width = `${scores[1] / 64 * 100}%`;
    }, [scores]);

    useEffect(() => {
        if (isGameEnd) handleGameOver(); 
    }, [isGameEnd]);

    return (
        <div className={styles.app}>
            <GameOver restart={restart} />

            <div className={`${styles.headerFooter} ${styles.white}`}>Reversi</div>

            <div className={styles.container}>
                <div className={styles.score}>
                    {scores[0]}
                </div>

                <div className={styles.scoresBar}>
                    <div className={styles.blackBar} />
                    <div className={styles.whiteBar} />
                </div>

                <div className={`${styles.score} ${styles.white}`}>
                    {scores[1]}
                </div>
            </div>

            <div className={styles.board}>{table}</div>

            {
                turn === 1
                ? <div className={styles.headerFooter}>Black's Turn</div>
                : <div className={`${styles.headerFooter} ${styles.white}`}>White's Turn</div>
            }               
        </div>
    );
};

export default App;