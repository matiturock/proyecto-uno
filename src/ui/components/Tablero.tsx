import { useEffect } from "react";
import MazoComponente from "./MazoComponente";
import PilaDeDescarteComponente from "./PilaDeDescarteComponente";
import styles from "./Tablero.module.css";
import { useAcciones, useControlador, useJugadores } from "../../store/storeJuego";
import type { IJugador } from "../../core/modelos/Jugador";
import ManoDeJugador from "./ManoDeJugador";
import StatusBar from "./StatusBar";

const newJugadores: IJugador[] = [
    { nombre: "Mario", esBoot: false },
    { nombre: "Luigi", esBoot: true },
    { nombre: "Wario", esBoot: true },
];

export default function Tablero() {

    const controlador = useControlador();
    const acciones = useAcciones();
    const jugadores = useJugadores();

    useEffect(() => {
        if (!controlador) {
            acciones.crearMesa(newJugadores);
        }
        acciones.empezarJuego();
    }, []);

    if (!controlador) return <p>Cargando juego...</p>;

    return (
        <main>
            <div className={styles.fila}>
                <StatusBar />
            </div>
            <div className={styles.fila}>
                <MazoComponente />
                <PilaDeDescarteComponente />
            </div>
            <div className={styles.fila} style={{ flexDirection: "column" }}>
                {jugadores && jugadores.map(j => <ManoDeJugador key={j.id} jugador={j} />)}
            </div>
        </main>
    );

}