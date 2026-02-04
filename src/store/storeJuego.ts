import { create } from "zustand";
import { ControlaldorDeJuego, SentidoDeLaRonda, type EstadoDelJuego } from "../core/logica/ControladorDeJuego";
import type { IJugador, Jugador } from "../core/modelos/Jugador";
import type { Mazo } from "../core/modelos/Mazo";
import type { PilaDeDescarte } from "../core/modelos/PilaDeDescarte";
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
    };
};

type JuegoStore = JuegoEstado & JuegoAcciones;

const useStoreJuego = create<JuegoStore>()(
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
                        jugadores: controlador.jugadores,
                        jugadorActual: controlador.jugadorActual,
                        mazo: controlador.mazo,
                        pilaDeDescarte: controlador.pilaDeDescarte,
                        sentidoDeLaRonda: controlador.sentidoDeLaRonda,
                        cartaTop: controlador.cartaTop,
                        colorActual: controlador.colorActual,
                        estado: controlador.estado
                    });
                },

                robarCartaDelMazo: () => {
                    const { controlador } = get();

                    if (!controlador) return;

                    controlador.robarDelMazo();

                    set({
                        jugadores: controlador.jugadores,
                        jugadorActual: controlador.jugadorActual,
                        mazo: controlador.mazo,
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
