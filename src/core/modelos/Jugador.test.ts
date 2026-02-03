import { beforeEach, describe, expect, it } from "vitest";
import { Jugador } from "./Jugador";
import { Carta, TipoDeCarta } from "./Carta";

describe("Jugador", () => {
    let jugador: Jugador;

    beforeEach(() => {
        jugador = new Jugador("Mario", false);
    });

    it("El id debe contener el nombre mario", () => {
        expect(jugador.id).toContain("Mario");
    });

    it("Debe sumar una carta a la mano", () => {
        const carta = new Carta(TipoDeCarta.COMODIN);

        expect(jugador.cantidadDeCartas).toBe(0);
        jugador.agregarCartas([carta]);
        expect(jugador.cantidadDeCartas).toBe(1);
    });

    it("Debe poder removerse una carta por su id", () => {
        const carta = new Carta(TipoDeCarta.COMODIN);

        expect(jugador.cantidadDeCartas).toBe(0);
        jugador.agregarCartas([carta]);
        expect(jugador.cantidadDeCartas).toBe(1);

        const cartaId = carta.id;

        jugador.removerCarta(cartaId);
        expect(jugador.cantidadDeCartas).toBe(0);
    });

    it("Debe poder agregarse 3 cartas, y borrar 2, que quede 1 en la mano", () => {
        const carta1 = new Carta(TipoDeCarta.COMODIN);
        const carta2 = new Carta(TipoDeCarta.COMODIN);
        const carta3 = new Carta(TipoDeCarta.COMODIN);

        expect(jugador.cantidadDeCartas).toBe(0);
        jugador.agregarCartas([carta1, carta2, carta3]);
        expect(jugador.cantidadDeCartas).toBe(3);

        jugador.removerCarta(carta1.id);
        expect(jugador.cantidadDeCartas).toBe(2);
    });
});