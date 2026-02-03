import { Carta, ColorDeCarta, EfectoDeCarta, TipoDeCarta } from "../../core/modelos/Carta";
import CartaComponente from "./CartaComponente";

export default function Pila() {
    const cartaDePila = new Carta(TipoDeCarta.ACCION, ColorDeCarta.AZUL, undefined, EfectoDeCarta.INVERTIR);

    return (
        <CartaComponente carta={cartaDePila} />
    );
}