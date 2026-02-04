import { describe, it, expect, beforeEach } from "vitest";
import { ControlaldorDeJuego, EstadoDelJuego, SentidoDeLaRonda } from "./ControladorDeJuego";
import type { IJugador } from "../modelos/Jugador";
import { CANTIDAD_DE_CARTAS_TOTALES } from "../modelos/constantes";

describe("Controlador de Juego", () => {
    let controlador: ControlaldorDeJuego;

    beforeEach(() => {
        const jugador1: IJugador = { nombre: "Mario", esBoot: false };
        const jugador2: IJugador = { nombre: "Luigi", esBoot: true };
        controlador = new ControlaldorDeJuego([jugador1, jugador2]);
    });

    describe("Antes de empezar el juego", () => {
        it("El mazo debe tener 112 cartas", () => {
            expect(controlador.mazo.estaVacio).toBeFalsy();
            expect(controlador.pilaDeDescarte.estaVacia).toBeTruthy();
            expect(controlador.jugadores[0].cantidadDeCartas).toBe(0);
            expect(controlador.jugadores).toHaveLength(2);
        });
    });

    describe("Partida comenzada", () => {
        beforeEach(() => {
            controlador.empezarJuego();
        });

        it("Cada jugador debe tener 7 cartas en su mano", () => {
            expect(controlador.jugadores[0].cantidadDeCartas).toBe(7);
            expect(controlador.jugadores[1].cantidadDeCartas).toBe(7);
        });

        it("La pila de descarte deberia tener una carta", () => {
            expect(controlador.pilaDeDescarte.estaVacia).toBeFalsy();
            expect(controlador.pilaDeDescarte.cantidadDeCartas).toBe(1);
        });

        it("La cantidad total de cartas en el mazo deberia ser: 112 - 7 - 7 - 1", () => {
            expect(controlador.mazo.cantidadDeCartas).toBe(CANTIDAD_DE_CARTAS_TOTALES - 7 - 7 - 1);
        });

        it("Deben estar establcido el sentido de la ronda", () => {
            expect(controlador.sentidoDeLaRonda).toBe(SentidoDeLaRonda.HORARIO);
        });

        it("Eln estado del juego debe ser COMENZADO", () => {
            expect(controlador.estado).toBe(EstadoDelJuego.COMENZADO);
        });

        it("Debe estar establecido el jugador actual", () => {
            expect(controlador.jugadorActual).toBe(controlador.jugadores.at(0));
        });

        it("Si avanzamos el turnou, debe ser el turno del siguiente jugador", () => {
            expect(controlador.jugadorActual?.nombre).toBe("Mario");
            controlador.avanzarTurno();
            expect(controlador.jugadorActual?.nombre).toBe("Luigi");
            controlador.avanzarTurno();
            expect(controlador.jugadorActual?.nombre).toBe("Mario");
            controlador.avanzarTurno();
            controlador.avanzarTurno();
            expect(controlador.jugadorActual?.nombre).toBe("Mario");
        });
    });

    describe("Robar cartas del mazo", () => {
        beforeEach(() => controlador.empezarJuego());

        it("El jugador actual debe poder robar una carta del mazo", () => {
            const jugadorQueRoba = controlador.jugadorActual;

            const cartasEnMazo = controlador.mazo.cantidadDeCartas;
            expect(jugadorQueRoba?.cantidadDeCartas).toBe(7);
            controlador.robarDelMazo();
            expect(jugadorQueRoba?.cantidadDeCartas).toBe(8);
            expect(controlador.mazo.cantidadDeCartas).toBe(cartasEnMazo - 1);
        });
    });
});