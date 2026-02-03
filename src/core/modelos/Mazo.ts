import { Carta, ColorDeCarta, EfectoDeCarta, TipoDeCarta } from "./Carta";

export class Mazo {
    private cartas: Carta[] = [];
    constructor(desde: Carta[] = []) {
        if (desde.length === 0) {
            this.crearMazo();
        } else {
            this.cartas = desde;
        }
        this.mezclar();
    }

    get cantidadDeCartas(): number {
        return this.cartas.length;
    }

    get estaVacio(): boolean {
        return this.cartas.length === 0;
    }

    get obtenerCopiaDeMazo(): Carta[] {
        return [...this.cartas];
    }

    private crearMazo(): void {
        for (const color of Object.values(ColorDeCarta)) {
            for (const numero of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
                const cartaNormal1 = new Carta(TipoDeCarta.NORMAL, color, numero);
                const cartaNormal2 = new Carta(TipoDeCarta.NORMAL, color, numero);

                this.cartas.push(cartaNormal1);
                this.cartas.push(cartaNormal2);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of [1, 2]) {
                const cartaMasDos = new Carta(TipoDeCarta.ACCION, color, undefined, EfectoDeCarta.MAS_DOS);
                const cartaInvertir = new Carta(TipoDeCarta.ACCION, color, undefined, EfectoDeCarta.INVERTIR);
                const cartaSaltar = new Carta(TipoDeCarta.ACCION, color, undefined, EfectoDeCarta.SALTAR);

                this.cartas.push(cartaMasDos);
                this.cartas.push(cartaInvertir);
                this.cartas.push(cartaSaltar);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of [1]) {
                const cartaMasCuatro = new Carta(TipoDeCarta.COMODIN, undefined, undefined, EfectoDeCarta.MAS_CUATRO);
                const cartaCambiarColor = new Carta(TipoDeCarta.COMODIN, undefined, undefined, EfectoDeCarta.CAMBIAR_COLOR);

                this.cartas.push(cartaMasCuatro);
                this.cartas.push(cartaCambiarColor);
            }

        }
    };

    mezclar(): void {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    robar(cantidad: number = 1): Carta[] {
        if (this.estaVacio)
            return [];
        return this.cartas.splice(0, cantidad);
    }

    devolverCarta(carta: Carta) {
        this.cartas.push(carta);
        this.mezclar();
    }
}