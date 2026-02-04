import type { Carta } from "./Carta";

export interface IJugador {
    nombre: string,
    esBoot: boolean;
}

export class Jugador {
    public readonly id: string;
    private mano: Carta[] = [];
    constructor(public readonly nombre: string, public readonly esBoot: boolean) {
        this.id = `${esBoot ? 'boot' : 'jugador'}-${nombre}`;
    }

    get cartas(): Carta[] {
        return this.mano;
    }

    get cantidadDeCartas() {
        return this.mano.length;
    }

    get tieneCartas(): boolean {
        return this.mano.length !== 0;
    }


    agregarCartas(cartas: Carta[]): void {
        cartas.forEach(c => this.mano.push(c));
    }

    removerCarta(cartaId: string): void {
        const indice = this.mano.findIndex(c => c.id === cartaId);

        if (indice !== -1) {
            this.mano.splice(indice, 1);
        }
    }
}