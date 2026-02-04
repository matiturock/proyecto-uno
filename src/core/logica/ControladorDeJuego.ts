import { TipoDeCarta, type Carta, type ColorDeCarta } from "../modelos/Carta";
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

export class ControlaldorDeJuego {
    public readonly jugadores: Jugador[] = [];
    public readonly mazo: Mazo;
    public readonly pilaDeDescarte: PilaDeDescarte;
    public _sentidoDeLaRonda: SentidoDeLaRonda;
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
}