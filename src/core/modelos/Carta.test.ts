import { describe, it, expect } from 'vitest';
import { Carta, ColorDeCarta, TipoDeCarta } from './Carta';

describe("Carta", () => {
    it("Debe poder crearse una carta normal", () => {
        const cartaNormal = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.ROJO, 1);

        expect(cartaNormal.toString()).contain('rojo');
        expect(cartaNormal.tipo).toBe(TipoDeCarta.NORMAL);
        expect(cartaNormal.color).toBe(ColorDeCarta.ROJO);
        expect(cartaNormal.numero).greaterThanOrEqual(0);
        expect(cartaNormal.numero).lessThanOrEqual(9);
    });
});