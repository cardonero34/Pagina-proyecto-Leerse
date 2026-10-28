import "../stylesheets/Notify.css"
import { motion } from "motion/react"

const labels = {
    cultivox: "Cultivox",
    reflexivox: "Reflexivox",
    crearse: "Crearsé",
    pausavox: "Pausa",
    diariovox: "Diario",
}

export const Notificacion = ({ notivox, onGuardar, onAccion, onContinuar }) => {
    if (!notivox) return null

    const esCultivox = notivox.tipo === "cultivox"
    const manejarAccion = notivox.tipo === "pausavox" ? onContinuar : onAccion
    const descripcionAccion = {
        reflexivox: "Responder en el post-it",
        crearse: `Abrir herramienta de ${notivox.formato || "creación"}`,
        pausavox: "Reanudar capítulo",
        diariovox: "Abrir diario",
    }[notivox.tipo] || "Abrir acción"

    return (
        <motion.div
            className="notify d-flex flex-column justify-content-center position-absolute top-0 start-0"
            initial={{ opacity: 0, y: -25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
                opacity: 0,
                y: -25,
                scale: 0.92,
                transition: { duration: 0.25, ease: "easeInOut" },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <motion.div
                whileHover={{ scale: 0.98 }}
                className="type rounded-5 d-flex align-items-center justify-content-center mb-3"
            >
                <p className="m-1">{labels[notivox.tipo] || "Notivox"}</p>
            </motion.div>

            <div className={`option d-flex align-items-center justify-content-center ${esCultivox ? "option--cultivox" : "option--single"}`} aria-label="Acciones de Notivox">
                {esCultivox ? (
                    <>
                        <motion.a
                            href={notivox.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={notivox.fuente ? `Abrir ${notivox.fuente}` : "Abrir recurso externo"}
                            aria-label="Abrir recurso Cultivox en una pestaña nueva"
                            className="container-icon container-icon--action d-flex align-items-center justify-content-center rounded-5"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <img src={notivox.icono || "/entrar.png"} alt="" />
                        </motion.a>
                        <motion.button
                            type="button"
                            onClick={onGuardar}
                            title="Guardar en el diario"
                            aria-label="Guardar Cultivox en el diario"
                            className="container-icon container-icon--save d-flex align-items-center justify-content-center rounded-5"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <img src="/iconos/icono-guardado.png" alt="" />
                        </motion.button>
                    </>
                ) : (
                    <motion.button
                        type="button"
                        onClick={manejarAccion}
                        title={descripcionAccion}
                        aria-label={descripcionAccion}
                        className="container-icon container-icon--action d-flex align-items-center justify-content-center rounded-5"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src={notivox.icono} alt="" />
                    </motion.button>
                )}
            </div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="content d-flex flex-column align-items-center justify-content-center rounded-3 w-100 py-3"
            >
                <img src="/iconos/icono-comillas.png" className="comilla" alt="" aria-hidden="true" />
                <p className="m-2 px-4">{notivox.texto}</p>
                <img src="/iconos/icono-comillas.png" className="comilla1" alt="" aria-hidden="true" />
            </motion.div>
        </motion.div>
    )
}