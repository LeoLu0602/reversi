import Cell from './components/Cell';
import styles from './app.module.css';

const App = () => {
    const table = [];

    for (let i = 0; i < 8; i++) {
        const row = [];

        for (let j = 0; j < 8; j++) {
            row.push(<Cell key={j} row={i} col={j} />);
        }

        table.push(<tr key={i}>{row}</tr>);
    }

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Reversi</h1>
            <table className={styles.board}>
                <tbody>{table}</tbody>
            </table>
        </div>
    );
};

export default App;