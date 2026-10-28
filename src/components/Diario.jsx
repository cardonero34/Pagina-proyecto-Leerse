import "../stylesheets/Diario.css"
import "../stylesheets/Notify.css"
import { motion } from "motion/react"

import { useState } from "react"

const tabs = [
    {
        id: "opcion1",
        icono: "/iconos/icono-clip.png",
        titulo: "Función 1",
    },

    {
        id: "opcion3",
        icono: "/iconos/icono-guardado.png",
        titulo: "Función 3",
    },

    {
        id: "opcion4",
        icono: "/iconos/icono-creacion.png",
        titulo: "Función 4",
    },
]

export const Diario = ({ historialCultivox, historialReflexivox, historialPostip, historialCreaciones }) => {

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    return (
        <>
            <motion.div className="diario d-flex flex-column position-absolute bottom-0 end-0 rounded-3 pe-2"
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 40,
                }}

                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}

                exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 40,
                }}

                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                }}
            >
                <motion.div className="container-options d-flex justify-content-between position-relative px-5 pb-2 ">
                    {tabs.map((item) => (
                        <motion.div
                            key={item.id}
                            className="position-relative d-flex align-items-center justify-content-center"
                            onClick={() => setSelectedTab(item)}
                        >
                            {/* FONDO ANIMADO (selected) */}
                            {item.id === selectedTab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="selected position-absolute rounded-top-4"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                />
                            )}

                            {/* ICONO */}
                            <img
                                className="icono rounded-4 p-2"
                                src={item.icono}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* secciones para interfaz diario */}
                {/* sección 1 */}
                {selectedTab.id === "opcion1" && (
                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">
                        <div className="diario-content w-100 d-flex flex-column rounded-3 p-3">
                            <p className="sectDiaryName">Parcela Cultivox</p>
                            <div className="historial overflow-y-auto">
                                {
                                    historialCultivox.map((item) => (

                                        <motion.div
                                            key={item.id}
                                            className='notify d-flex flex-column justify-content-center '
                                            initial={{
                                                opacity: 0, y: -25, scale: 0.92
                                            }}
                                            animate={{
                                                opacity: 1, y: 0, scale: 1
                                            }}
                                            exit={{
                                                opacity: 0, y: -25, scale: 0.92, transition: { duration: 0.25, ease: "easeInOut" }
                                            }}
                                            transition={{
                                                duration: 0.35, ease: "easeOut"
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 0.95 }}
                                                whileTap={{ scale: 0.90 }}
                                                animate={{
                                                    scale: 1,
                                                    transition: { duration: 0.5 }
                                                }}
                                                className='type rounded-5 d-flex align-items-center justify-content-center mb-3'>
                                                <p className='m-1'>Cultivox</p>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ scale: 0.98 }}

                                                className='content d-flex align-items-center justify-content-center rounded-3 w-100'>
                                                <img src="/iconos/icono-comillas.png" className='comilla' />
                                                <p className='m-2 px-4'>
                                                    {item.texto}
                                                </p>
                                                <img src="/iconos/icono-comillas.png" className='comilla1' />
                                            </motion.div>

                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
                }
                {/* sección 3 */}
                {selectedTab.id === "opcion3" && (

                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">

                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3 p-3">

                            <p className="sectDiaryName">Reflexivox / Post its</p>

                            <div className="historial overflow-y-auto">

                                {historialReflexivox.map((item) => (

                                    <motion.div
                                        key={item.id}
                                        className="notify d-flex flex-column justify-content-center"
                                        initial={{
                                            opacity: 0,
                                            y: -25,
                                            scale: 0.92
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut"
                                        }}
                                    >

                                        <motion.div
                                            className="type rounded-5 d-flex align-items-center justify-content-center mb-3"
                                        >

                                            <p className="m-1">
                                                Reflexivox
                                            </p>

                                        </motion.div>

                                        <motion.div
                                            className="content d-flex flex-column align-items-center justify-content-center rounded-3 w-100"
                                        >

                                            <img
                                                src="/iconos/icono-comillas.png"
                                                className="comilla"
                                            />

                                            <p className="m-2 px-4">
                                                {item.texto}
                                            </p>

                                            <div className="w-100 px-4">

                                                <p className="mb-1">
                                                    <strong>Mi respuesta:</strong>
                                                </p>

                                                <p>
                                                    {item.respuesta}
                                                </p>

                                            </div>

                                            <img
                                                src="/iconos/icono-comillas.png"
                                                className="comilla1"
                                            />

                                        </motion.div>

                                    </motion.div>

                                ))}

                                {historialPostip.map((item) => (

                                    <motion.div
                                        key={item.id}
                                        className="notify d-flex flex-column justify-content-center"
                                        initial={{
                                            opacity: 0,
                                            y: -25,
                                            scale: 0.92
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut"
                                        }}
                                    >

                                        <motion.div
                                            className="type rounded-5 d-flex align-items-center justify-content-center mb-3"
                                        >

                                            <p className="m-1">
                                                Idea
                                            </p>

                                        </motion.div>

                                        <motion.div
                                            className="content d-flex flex-column align-items-center justify-content-center rounded-3 w-100"
                                        >

                                            <img
                                                src="/iconos/icono-comillas.png"
                                                className="comilla"
                                            />

                                            <p className="m-2 px-4">
                                                {item.texto}
                                            </p>

                                            <img
                                                src="/iconos/icono-comillas.png"
                                                className="comilla1"
                                            />

                                        </motion.div>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </div>
                )
                }
                {/* sección 4 */}
                {selectedTab.id === "opcion4" && (
                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">

                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3 p-3">

                            <p className="sectDiaryName">
                                Mural Crearsé
                            </p>

                            <div className="historial overflow-y-auto pt-2 ">

                                {historialCreaciones?.map((item) => (

                                    <motion.div
                                        key={item.id}
                                        className="notify d-flex flex-column justify-content-center"
                                        initial={{
                                            opacity: 0,
                                            y: -25,
                                            scale: 0.92
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -25,
                                            scale: 0.92,
                                            transition: {
                                                duration: 0.25,
                                                ease: "easeInOut"
                                            }
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut"
                                        }}
                                    >

                                        <motion.div
                                            whileHover={{ scale: 0.98 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="content d-flex flex-column align-items-center justify-content-center rounded-3 w-100 py-3"
                                            onClick={() => {
                                                if (!item.url) return;

                                                window.open(item.url, "_blank");
                                            }}
                                            style={{
                                                cursor: item.url ? "pointer" : "default"
                                            }}
                                        >
                                            <div className="type rounded-5 d-flex align-items-center justify-content-center mb-3">
                                                <p className="m-1">
                                                    {item.origen === "crearse" ? "Crearsé" : "Creación"}
                                                </p>
                                            </div>

                                            <img
                                                src={
                                                    item.icono ||
                                                    (item.formato === "texto"
                                                        ? "/iconos/icono-text.png"
                                                        : item.formato === "audio"
                                                            ? "/iconos/icono-audio.png"
                                                            : item.formato === "foto"
                                                                ? "/iconos/icono-foto.png"
                                                                : item.formato === "dibujo"
                                                                    ? "/iconos/icono-dibujo.png"
                                                                    : "/iconos/icono-text.png")
                                                }
                                                className={`icono-notivox ${item.origen === "crearse" ? "icono-crearse" : ""}`}
                                                alt={item.formato || "Creación"}
                                            />

                                            <p className="m-2 px-4">
                                                {item.descripcion || "Mi creación"}
                                            </p>

                                            <p className="m-2">
                                                {item.formato
                                                    ? item.formato.charAt(0).toUpperCase() + item.formato.slice(1)
                                                    : "Creación"}
                                                {" · "}
                                                {item.origen === "crearse" ? "Crearsé" : "Manual"}
                                            </p>
                                        </motion.div>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </div>
                )}

            </motion.div>
        </>
    )
}





