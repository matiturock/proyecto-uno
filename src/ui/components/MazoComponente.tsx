import { useAcciones, useMazo } from "../../store/storeJuego";
import styles from "./CartaComponente.module.css";

export default function MazoComponente() {
    const { cantidadDeCartas, estaVacio } = useMazo();
    const { robarCartaDelMazo } = useAcciones();

    if (estaVacio) return (
        <div>
            <p>El mazo esta vacio</p>
            <button>Toca para recargar el mazo</button>
        </div>
    );

    return (
        <div>
            <button onClick={() => robarCartaDelMazo()} className={styles.dorso}>
                Mazo
            </button>
            <p>Cantidad: {cantidadDeCartas}</p>
        </div>
    );
}