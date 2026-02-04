import { ColorDeCarta, type Carta } from "../../core/modelos/Carta";
import styles from "./CartaComponente.module.css";

const mapDeColores = new Map<ColorDeCarta, string>([
    [ColorDeCarta.AMARILLO, '#bdcf13'],
    [ColorDeCarta.AZUL, '#026ed3'],
    [ColorDeCarta.ROJO, '#a00e0e'],
    [ColorDeCarta.VERDE, '#07a714'],
]);

export default function CartaComponente({ carta }: { carta: Carta; }) {
    const { numero, efecto } = carta;
    return (
        <section className={styles.contenedor} style={{ cursor: "pointer" }}>
            <article className={styles.contenido} style={{ backgroundColor: `${mapDeColores.get(carta.color!) ? mapDeColores.get(carta.color!) : "grey"}` }}>
                {numero && <span>{numero}</span>}
                {efecto && <span style={{ fontSize: "1rem", stroke: "2px black" }}>{efecto}</span>}
            </article>
        </section>
    );
}