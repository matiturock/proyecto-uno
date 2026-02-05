import { describe, it, expect, beforeEach } from "vitest";
import { ControlaldorDeJuego, EstadoDelJuego, SentidoDeLaRonda } from "./ControladorDeJuego";
import type { IJugador } from "../modelos/Jugador";
import { CANTIDAD_DE_CARTAS_TOTALES } from "../modelos/constantes";
import { Carta, ColorDeCarta, EfectoDeCarta, TipoDeCarta } from "../modelos/Carta";

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

    describe("Jugar carta y validar jugada", () => {
        beforeEach(() => controlador.empezarJuego());

        it("Debe poder jugarse una carta del mismo color", () => {
            const cartaEnMano = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.AMARILLO, 1, undefined);
            const cartaTop = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.AMARILLO, 2, undefined);

            controlador.jugarCarta(cartaEnMano, cartaTop);

            expect(controlador.cartaTop?.id).toBe(cartaEnMano.id);
        });

        it("Debe poder jugarse una carta del mismo numero", () => {
            const cartaEnMano = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.ROJO, 3, undefined);
            const cartaTop = new Carta(TipoDeCarta.NORMAL, ColorDeCarta.AMARILLO, 3, undefined);

            controlador.jugarCarta(cartaEnMano, cartaTop);

            expect(controlador.cartaTop?.id).toBe(cartaEnMano.id);
        });

        it("Debe poder jugarse un comodin", () => {
            const cartaEnMano = new Carta(TipoDeCarta.COMODIN, undefined, undefined, EfectoDeCarta.CAMBIAR_COLOR);
            const cartaTop = new Carta(TipoDeCarta.COMODIN, undefined, undefined, EfectoDeCarta.MAS_CUATRO);

            controlador.jugarCarta(cartaEnMano, cartaTop);

            expect(controlador.cartaTop?.id).toBe(cartaEnMano.id);
        });
    });


});

describe("Efectos de cartas", () => {
    let controlador: ControlaldorDeJuego;

    beforeEach(() => {
        const jugador1: IJugador = { nombre: "Mario", esBoot: false };
        const jugador2: IJugador = { nombre: "Luigi", esBoot: true };
        const jugador3: IJugador = { nombre: "Wario", esBoot: true };
        controlador = new ControlaldorDeJuego([jugador1, jugador2, jugador3]);

        controlador.empezarJuego();
    });

    it("La carta SALTAR debe omitir un turno", () => {
        const cartaSaltar = new Carta(TipoDeCarta.ACCION, ColorDeCarta.ROJO, undefined, EfectoDeCarta.SALTAR);

        const jugardor1 = controlador.jugadorActual;
        const jugadoar3 = controlador.jugadores.at(2);
        expect(jugardor1).toBe(controlador.jugadorActual);

        controlador.jugarCarta(cartaSaltar, new Carta(TipoDeCarta.NORMAL, ColorDeCarta.ROJO, 7, undefined));

        expect(jugadoar3).toBe(controlador.jugadorActual);
    });

    it("La carta de invetir sentido de la ronda, debe cambiar el sentido de la ronda", () => {
        const cartaInvertir = new Carta(TipoDeCarta.ACCION, ColorDeCarta.AMARILLO, undefined, EfectoDeCarta.INVERTIR);

        expect(controlador.sentidoDeLaRonda).toBe(SentidoDeLaRonda.HORARIO);
        controlador.jugarCarta(cartaInvertir, new Carta(TipoDeCarta.NORMAL, ColorDeCarta.AMARILLO, 1, undefined));
        expect(controlador.sentidoDeLaRonda).toBe(SentidoDeLaRonda.ANTI_HORARIO);
    });

    it("La corta de roba 2 debe hacer levantar 2 cartas al siguiente jugador", () => {
        const cartaMasDos = new Carta(TipoDeCarta.ACCION, ColorDeCarta.ROJO, undefined, EfectoDeCarta.MAS_DOS);

        const jugadorAfectado = controlador.jugadores.at(1);

        expect(jugadorAfectado?.cantidadDeCartas).toBe(7);
        expect(controlador.jugadorActual).toBe(controlador.jugadores.at(0));

        controlador.jugarCarta(cartaMasDos, new Carta(TipoDeCarta.NORMAL, ColorDeCarta.ROJO, 1, undefined));

        expect(jugadorAfectado?.cantidadDeCartas).toBe(9);
        expect(controlador.jugadorActual).toBe(controlador.jugadores.at(2));
    });
});