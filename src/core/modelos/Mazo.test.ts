import { describe, it, expect, beforeEach } from "vitest";
import { Mazo } from "./Mazo";
import { ColorDeCarta, TipoDeCarta } from "./Carta";
import { CANTIDAD_DE_CARTAS_TOTALES } from "./constantes";

describe("Mazo", () => {
    let mazo: Mazo;

    beforeEach(() => {
        mazo = new Mazo;
    });

    describe("Al crear un mazo desde cero", () => {
        it("Dene contener 80 cartas normales", () => {
            expect(mazo.obtenerCopiaDeMazo.filter(c => c.tipo === TipoDeCarta.NORMAL)).toHaveLength(80);
        });

        it("Debe contener 20 cartas rojas normales", () => {
            expect(mazo.obtenerCopiaDeMazo.filter(c => c.color === ColorDeCarta.ROJO).filter(c => c.tipo === TipoDeCarta.NORMAL)).toHaveLength(20);
        });

        it("Deben crearse 24 cartas de accion", () => {
            expect(mazo.obtenerCopiaDeMazo.filter(c => c.tipo === TipoDeCarta.ACCION)).toHaveLength(24);
        });

        it("Debe tener 8 cartas comodin", () => {
            expect(mazo.obtenerCopiaDeMazo.filter(c => c.tipo === TipoDeCarta.COMODIN)).toHaveLength(8);
        });

        it("Debe tenere un total de 112 cartas", () => {
            expect(mazo.cantidadDeCartas).toBe(CANTIDAD_DE_CARTAS_TOTALES);
        });
    });

    describe("Robar del mazo", () => {
        it("Se debe poder robar una carta del mazo", () => {
            expect(mazo.cantidadDeCartas).toBe(CANTIDAD_DE_CARTAS_TOTALES);

            mazo.robar();

            expect(mazo.cantidadDeCartas).toBe(CANTIDAD_DE_CARTAS_TOTALES - 1);
        });

        it("Se deben poder robar varias cartas del mazo", () => {
            expect(mazo.cantidadDeCartas).toBe(CANTIDAD_DE_CARTAS_TOTALES);
            mazo.robar(12);
            expect(mazo.cantidadDeCartas).toBe(100);
        });
    });
});