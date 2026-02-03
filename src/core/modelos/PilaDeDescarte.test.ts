import { beforeEach, describe, expect, it } from "vitest";
import { PilaDeDescarte } from "./PilaDeDescarte";
import { Carta, ColorDeCarta, EfectoDeCarta, TipoDeCarta } from "./Carta";

describe("Pila de Cartas", () => {
    let pila: PilaDeDescarte;

    beforeEach(() => {
        pila = new PilaDeDescarte();
    });

    it("Se debe poder agregar una carta y leerla en el tope", () => {
        expect(pila.estaVacia).toBeTruthy();

        const carta = new Carta(TipoDeCarta.ACCION, ColorDeCarta.ROJO, undefined, EfectoDeCarta.INVERTIR);
        pila.agregarCarta(carta);

        expect(pila.estaVacia).toBeFalsy();
        expect(pila.cartaActual?.id).toBe(carta.id);
    });

    it("Se debe mostrar como carta acutla la ultima carta agregada", () => {
        const carta1 = new Carta(TipoDeCarta.COMODIN);
        const carta2 = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.AMARILLO, 1);
        const carta3 = new Carta(TipoDeCarta.ACCION, ColorDeCarta.AMARILLO, undefined, EfectoDeCarta.INVERTIR);

        pila.agregarCarta(carta1);
        pila.agregarCarta(carta2);
        pila.agregarCarta(carta3);

        expect(pila.cartaActual?.id).toBe(carta3.id);
    });
});