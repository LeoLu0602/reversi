import { useSelector } from 'react-redux';
import styles from './GameOver.module.css';

const GameOver = ({ restart }) => {
    const [blackScore, whiteScore] = useSelector(state => state.game.scores);

    return (
        <div className={styles.modal}>
            <div className={styles.box}>
                {
                    blackScore > whiteScore
                    ? <div className={styles.result}>Black Wins</div>
                    : whiteScore > blackScore 
                    ? <div className={styles.result}>White Wins</div>
                    : <div className={styles.result}>Draw</div>
                }
                <button onClick={restart}>Restart</button>
            </div>
        </div>
    );
};

export default GameOver;