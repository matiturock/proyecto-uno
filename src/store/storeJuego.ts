import { create } from "zustand";
import { ControlaldorDeJuego, SentidoDeLaRonda, type EstadoDelJuego } from "../core/logica/ControladorDeJuego";
import type { IJugador, Jugador } from "../core/modelos/Jugador";
import type { Mazo } from "../core/modelos/Mazo";
import { PilaDeDescarte } from "../core/modelos/PilaDeDescarte";
import type { Carta, ColorDeCarta } from "../core/modelos/Carta";
import { devtools } from "zustand/middleware";

type JuegoEstado = {
    controlador: ControlaldorDeJuego;
    jugadores: Jugador[];
    jugadorActual: Jugador;
    mazo: Mazo;
    pilaDeDescarte: PilaDeDescarte;
    sentidoDeLaRonda: SentidoDeLaRonda;
    cartaTop: Carta;
    colorActual: ColorDeCarta;
    estado: EstadoDelJuego;
};

type JuegoAcciones = {
    acciones: {
        crearMesa: (nuevosJugadores: IJugador[]) => void;
        empezarJuego: () => void;
        robarCartaDelMazo: () => void;
        jugarCarta: (carta: Carta) => void;
    };
};


const useStoreJuego = create<JuegoEstado & JuegoAcciones>()(
    devtools((set, get) => {
        return {
            controlador: null,
            jugadores: null,
            jugadorActual: null,
            mazo: null,
            pilaDeDescarte: null,
            sentidoDeLaRonda: null,
            cartaTop: null,
            colorActual: null,
            estado: null,

            acciones: {
                crearMesa: (ijugadores: IJugador[]) => {
                    const nuevoControlador = new ControlaldorDeJuego(ijugadores);

                    set({
                        controlador: nuevoControlador,
                        jugadores: nuevoControlador.jugadores,
                        jugadorActual: nuevoControlador.jugadorActual,
                        mazo: nuevoControlador.mazo,
                        pilaDeDescarte: nuevoControlador.pilaDeDescarte,
                        sentidoDeLaRonda: nuevoControlador.sentidoDeLaRonda,
                        cartaTop: nuevoControlador.cartaTop,
                        colorActual: nuevoControlador.colorActual,
                        estado: nuevoControlador.estado
                    });
                },

                empezarJuego: () => {
                    const { controlador } = get();

                    if (!controlador) return;

                    controlador.empezarJuego();
                    set({
                        jugadores: [...controlador.jugadores],
                        jugadorActual: { ...controlador.jugadorActual } as unknown as Jugador,
                        mazo: { ...controlador.mazo } as unknown as Mazo,
                        pilaDeDescarte: controlador.pilaDeDescarte,
                        sentidoDeLaRonda: controlador.sentidoDeLaRonda,
                        cartaTop: { ...controlador.cartaTop } as unknown as Carta,
                        colorActual: controlador.colorActual,
                        estado: controlador.estado
                    });
                },

                robarCartaDelMazo: () => {
                    const { controlador } = get();

                    if (!controlador) return;

                    controlador.robarDelMazo();

                    set({
                        jugadores: [...controlador.jugadores],
                        jugadorActual: { ...controlador.jugadorActual } as unknown as Jugador,
                        mazo: { ...controlador.mazo } as unknown as Mazo
                    });
                },

                jugarCarta: (carta: Carta) => {
                    const { controlador } = get();

                    if (!controlador) return;

                    controlador.jugarCarta(carta);

                    set({
                        jugadores: [...controlador.jugadores],
                        jugadorActual: { ...controlador.jugadorActual } as unknown as Jugador,
                        pilaDeDescarte: controlador.pilaDeDescarte
                    });
                }
            }
        };
    }
    ));


export const useAcciones = () => useStoreJuego(state => state.acciones);
export const useControlador = () => useStoreJuego((state) => state.controlador);
export const useJugadores = () => useStoreJuego(state => state.jugadores);
export const useMazo = () => useStoreJuego(state => state.mazo);
export const usePilaDeDescarte = () => useStoreJuego(state => state.pilaDeDescarte);
export const useJugadorActual = () => useStoreJuego(state => state.jugadorActual);
export const useColorActual = () => useStoreJuego(state => state.colorActual);
export const useSentidoDeLaRonda = () => useStoreJuego(state => state.sentidoDeLaRonda);
