import type { Carta } from "./Carta";

export class PilaDeDescarte {
    private cartas: Carta[] = [];

    get estaVacia(): boolean {
        return this.cartas.length === 0;
    }

    get cartaActual(): Carta | undefined {
        return this.cartas.at(-1);
    }

    get cantidadDeCartas(): number {
        return this.cartas.length;
    }

    agregarCarta(carta: Carta) {
        this.cartas.push(carta);
    }
}