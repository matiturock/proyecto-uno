import MazoComponente from "./MazoComponente";
import Pila from "./Pila";
import styles from "./Tablero.module.css";

export default function Tablero() {
    return (
        <main>
            {/* Fila de mazo y pila de descarte */}
            <div className={styles.fila}>
                <MazoComponente />
                <Pila />
            </div>
        </main>
    );

}