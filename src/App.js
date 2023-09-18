import { useSelector } from 'react-redux';
import Cell from './components/Cell';
import styles from './app.module.css';

const App = () => {
    const turn = useSelector(state => state.game.turn);

    const table = [];

    for (let i = 0; i < 8; i++) {
        const row = [];

        for (let j = 0; j < 8; j++) {
            row.push(<Cell key={j} row={i} col={j} />);
        }

        table.push(<div key={i} className={styles.row}>{row}</div>);
    }

    return (
        <div className={styles.app}>
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