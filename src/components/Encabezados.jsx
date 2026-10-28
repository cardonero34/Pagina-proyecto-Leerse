import "../stylesheets/Home.css"
import HalftoneReveal from "./REACTBITS/HalftoneReveal";

export const Encabezados = ({ titulo, descripcion, efectoHalftone = false }) => {
    const mostrarDescripcion =
        typeof descripcion === "string"
            ? descripcion.trim().length > 0
            : Boolean(descripcion);
    return (
        <>
            <div className="encabezado w-75 d-flex flex-column justify-content-center align-items-center text-center gap-4">
                <h2>{titulo}</h2>
                {mostrarDescripcion && (
                    <div className={`descripcion w-100 d-flex flex-column justify-content-center align-items-center text-center p-5 rounded-4${efectoHalftone ? " descripcion-halftone" : ""}`}>
                        {efectoHalftone && (
                            <HalftoneReveal
                                className="descripcion-halftone__efecto"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 0,
                                }}
                                src="./LILA.png"
                                wander
                                misregistration={0.3}
                                mode="mono"
                                shape="doted"
                                cellSize={5}
                                angle={30}
                                dotScale={1}
                                inkColor="#dfd2b8"
                                accentColor="#dfd2b8"
                                paperColor="#dfd2b8"
                                contrast={1.1}
                                brightness={0}
                                roughness={0}
                                revealRadius={200}
                                softness={10}
                                linger={7}
                                reverse
                                clickBurst
                                intro
                            />
                        )}
                        <p className={efectoHalftone ? "descripcion-halftone__texto" : ""}>{descripcion}</p>
                    </div>
                )}
            </div>
        </>
    )
}
