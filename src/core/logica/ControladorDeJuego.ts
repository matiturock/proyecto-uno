import { EfectoDeCarta, TipoDeCarta, type Carta, type ColorDeCarta } from "../modelos/Carta";
import { Jugador, type IJugador } from "../modelos/Jugador";
import { Mazo } from "../modelos/Mazo";
import { PilaDeDescarte } from "../modelos/PilaDeDescarte";

export enum EstadoDelJuego {
    SIN_COMENZAR, COMENZADO, TERMINADO
}

export enum SentidoDeLaRonda {
    HORARIO = 1,
    ANTI_HORARIO = -1
}

type AccionEfecto = (controlador: ControlaldorDeJuego) => void;

const MAPA_EFECTOS: Record<EfectoDeCarta, AccionEfecto> = {
    [EfectoDeCarta.SALTAR]: (ctrl: ControlaldorDeJuego) => ctrl.saltarTurno(),
    [EfectoDeCarta.INVERTIR]: (ctrl: ControlaldorDeJuego) => ctrl.invertirSentidoDeRonda(),
    [EfectoDeCarta.MAS_DOS]: (ctrl: ControlaldorDeJuego) => ctrl.masDos(),
    [EfectoDeCarta.MAS_CUATRO]: (ctrl: ControlaldorDeJuego) => ctrl.masCuatro(),
    [EfectoDeCarta.CAMBIAR_COLOR]: (ctrl: ControlaldorDeJuego) => ctrl.cambiarColor()
};

export class ControlaldorDeJuego {
    public readonly jugadores: Jugador[] = [];
    public readonly mazo: Mazo;
    public readonly pilaDeDescarte: PilaDeDescarte;
    private _sentidoDeLaRonda: SentidoDeLaRonda;
    get sentidoDeLaRonda() {
        return this._sentidoDeLaRonda;
    }
    get colorActual(): ColorDeCarta | undefined {
        return this.pilaDeDescarte.cartaActual?.color;
    }
    get cartaTop(): Carta | undefined {
        return this.pilaDeDescarte.cartaActual;
    }
    public _estado: EstadoDelJuego;
    private turno: number = 0;
    get estado() {
        return this._estado;
    }

    constructor(nuevosJugadores: IJugador[]) {
        nuevosJugadores.forEach(j => this.jugadores.push(new Jugador(j.nombre, j.esBoot)));
        this.mazo = new Mazo();
        this.pilaDeDescarte = new PilaDeDescarte();
        this._sentidoDeLaRonda = SentidoDeLaRonda.HORARIO;
        this._estado = EstadoDelJuego.SIN_COMENZAR;
    }

    get jugadorActual() {
        return this.jugadores.at(this.turno);
    }

    empezarJuego(): void {
        this.repartirCartasAJugadores();
        this.ponerPrimerCartaEnPilaDeDescarte();
        this._estado = EstadoDelJuego.COMENZADO;
    }

    private repartirCartasAJugadores() {
        this.jugadores.forEach(j => {
            const cartasRobadas = this.mazo.robar(7);
            j.agregarCartas(cartasRobadas);
        });
    }

    private ponerPrimerCartaEnPilaDeDescarte(): void {
        let cartaRobadaParaPila: Carta | undefined = undefined;
        do {
            cartaRobadaParaPila = this.mazo.robar().at(0);
            if (cartaRobadaParaPila?.tipo === TipoDeCarta.COMODIN) {
                this.mazo.devolverCarta(cartaRobadaParaPila!);
            }
        } while (cartaRobadaParaPila!.tipo === TipoDeCarta.COMODIN);

        this.pilaDeDescarte.agregarCarta(cartaRobadaParaPila!);
    }

    avanzarTurno() {
        this.turno = (this.turno + 1) % this.cantidadDeJugadores;
    }

    get cantidadDeJugadores(): number {
        return this.jugadores.length;
    }

    robarDelMazo(): void {
        const cartaRobada = this.mazo.robar();
        this.jugadorActual?.agregarCartas(cartaRobada);
        this.avanzarTurno();
    }

    jugarCarta(carta: Carta, cartaTop: Carta | undefined = this.cartaTop): void {
        if (this.esJugadaValida(carta, cartaTop)) {
            this.pilaDeDescarte.agregarCarta(carta);
            this.jugadorActual?.removerCarta(carta.id);

            this.ejecutarEfecto(carta);

            this.avanzarTurno();
        }
    }
    ejecutarEfecto(carta: Carta) {
        if (!carta.efecto) return;

        const efectoFuncion = MAPA_EFECTOS[carta.efecto];

        if (efectoFuncion) {
            console.log(`Ejecutnado efecto ${carta.efecto}`);
            efectoFuncion(this);
        } else {
            console.log(`No se encontro ningun efecto: ${carta.efecto}`);
        }
    }

    esJugadaValida(carta: Carta, cartaAComparar: Carta | undefined = this.cartaTop): boolean {
        if (carta.tipo === TipoDeCarta.COMODIN) {
            return true;
        }

        if (carta.tipo === TipoDeCarta.NORMAL || carta.tipo === TipoDeCarta.ACCION) {
            if (carta.color === cartaAComparar?.color) {
                return true;
            }
        }

        if (carta.tipo === TipoDeCarta.NORMAL) {
            if (carta.numero === cartaAComparar?.numero) {
                return true;
            }
        }

        return false;
    }

    saltarTurno(): void {
        this.avanzarTurno();
    }

    invertirSentidoDeRonda(): void {
        if (this._sentidoDeLaRonda === SentidoDeLaRonda.HORARIO) {
            this._sentidoDeLaRonda = SentidoDeLaRonda.ANTI_HORARIO;
        } else {
            this._sentidoDeLaRonda = SentidoDeLaRonda.HORARIO;
        }
    }

    masDos(): void {
        this.avanzarTurno();
        const cartasRobadas = this.mazo.robar(2);
        this.jugadorActual?.agregarCartas(cartasRobadas);
    }

    masCuatro(): void {
        this.avanzarTurno();
        const cartasRobadas = this.mazo.robar(4);
        this.jugadorActual?.agregarCartas(cartasRobadas);
    }

    cambiarColor(): void {
        throw new Error("Accion no implementada");
    }
}