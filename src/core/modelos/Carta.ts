export enum TipoDeCarta {
    NORMAL = 'normal',
    ACCION = 'accion',
    COMODIN = 'comodin'
}

export enum ColorDeCarta {
    ROJO = 'rojo',
    AMARILLO = 'amarillo',
    VERDE = 'verde',
    AZUL = 'azul'
}

export enum EfectoDeCarta {
    SALTAR = 'saltar',
    INVERTIR = 'invertir',
    MAS_DOS = 'mas_dos',
    MAS_CUATRO = 'mas_cuatro',
    CAMBIAR_COLOR = 'cambiar_color'
}

export class Carta {
    public readonly id: `${string}-${string}-${string}-${string}-${string}`;

    constructor(
        public readonly tipo: TipoDeCarta,
        public readonly color?: ColorDeCarta,
        public readonly numero?: number,
        public readonly efecto?: EfectoDeCarta
    ) {
        this.id = crypto.randomUUID();
    }

    toString(): string {
        return `Carta-${this.tipo} ( color: ${this.color} | numero: ${this.numero} | efecto: ${this.efecto} )`;
    }
}