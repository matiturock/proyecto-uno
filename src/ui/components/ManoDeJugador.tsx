import type { Jugador } from "../../core/modelos/Jugador";
import CartaComponente from "./CartaComponente";

export default function ManoDeJugador({ jugador }: { jugador: Jugador; }) {

    const { nombre, esBoot, cartas } = jugador;


    return (
        <div>
            <div>
                <p>Nombre: {nombre} <span>{`${esBoot ? "🤖" : "🧑"}`}</span></p>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                {/* Cartas del jugador */}
                {cartas && cartas.map(c => <CartaComponente key={c.id} carta={c} />)}
            </div>
        </div>
    );
}