import { usePilaDeDescarte } from "../../store/storeJuego";
import CartaComponente from "./CartaComponente";

export default function PilaDeDescarteComponente() {
    const { cantidadDeCartas, estaVacia, cartaActual } = usePilaDeDescarte();

    if (estaVacia) return (
        <div>
            <p>Sin cartas en la pila</p>
        </div>
    );

    return (
        <div>
            <CartaComponente carta={cartaActual!} />
            <p>Cantidad: {cantidadDeCartas}</p>
        </div>
    );
}