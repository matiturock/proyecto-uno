import { render, screen } from "@testing-library/react";
import CartaComponente from "../components/CartaComponente";
import { describe, expect, it } from "vitest";
import { Carta, ColorDeCarta, TipoDeCarta } from "../../core/modelos/Carta";

describe("CartaUI", () => {
    it("Debe mostrar el numero y colore correctos de la carta", () => {
        const carta7Rojo = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.ROJO, 7, undefined);
        render(<CartaComponente carta={carta7Rojo} />);

        const $carta = screen.getByText("7");

        expect($carta).toBeInTheDocument();
    });
});