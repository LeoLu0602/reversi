import styles from './GameOver.module.css';

const GameOver = ({ restart }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.box}>
                <div className={styles.result}>White Wins</div>
                <button onClick={restart}>Restart</button>
            </div>
        </div>
    );
};

export default GameOver;