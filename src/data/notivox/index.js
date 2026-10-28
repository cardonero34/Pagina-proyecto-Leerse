import { cultivox } from "./cultivox";
import { reflexivox } from "./reflexivox";
import { crearse } from "./crearse";

export const pausavox = [
    {
        id: "cap4-pausa-invitacion",
        capitulo: 4,
        tipo: "pausavox",
        texto: "Este capítulo puede doler. Respira y continúa solo cuando te sientas preparada.",
        icono: "/iconos/icono-play.png",
        accion: "continuar"
    }
];

export const diariovox = [
    {
        id: "cap6-diario-cierre",
        capitulo: 6,
        tipo: "diariovox",
        texto: "Leer-Ser-Leerse. Mira todo lo que creaste: está guardado en tu panel.",
        icono: "/iconos/icono-diario.png",
        accion: "diario"
    }
];

export { cultivox, reflexivox, crearse };

export const notivox = [
    ...cultivox,
    ...reflexivox,
    ...crearse,
    ...pausavox,
    ...diariovox
];