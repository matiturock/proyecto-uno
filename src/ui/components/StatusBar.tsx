import { EstadoDelJuego, SentidoDeLaRonda } from "../../core/logica/ControladorDeJuego";
import { useControlador, useJugadorActual } from "../../store/storeJuego";
import styles from "./StatusBar.module.css";

export default function StatusBar() {
    const { nombre } = useJugadorActual();
    const { estado, sentidoDeLaRonda, } = useControlador();
    return (
        <header style={{ display: "flex", gap: "0.5rem" }}>
            <span className={styles.chip}>Jugador actual: {nombre}</span>
            <span className={styles.chip}>Sentid de la ronda: {SentidoDeLaRonda[sentidoDeLaRonda]}</span>
            {/* <span>Color actual: {color}</span> */}
            <span className={styles.chip}>Status: {EstadoDelJuego[estado]}</span>
        </header>
    );
}