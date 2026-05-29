import "../stylesheets/Diario.css"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import { useState } from "react"

const tabs = [
    {
        id: "opcion1",
        icono: "/iconos/icono-clip.png",
        titulo: "Función 1",
    },

    {
        id: "opcion2",
        icono: "/iconos/icono-desicion.png",
        titulo: "Función 2",
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

export const Diario = () => {

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
                <motion.div className="container-options d-flex justify-content-between position-relative">
                    {tabs.map((item) => (
                        <motion.div
                            key={item.id}
                            className="position-relative d-flex align-items-center justify-content-center"
                            onClick={() => setSelectedTab(item)}
                        >
                            {/* FONDO ANIMADO */}
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
                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3">
                            <p>Titulo función 1</p>
                            <div>

                            </div>
                        </div>
                    </div>
                )
                }
                {/* sección 2 */}
                {selectedTab.id === "opcion2" && (
                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">
                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3">
                            <p>Titulo función 2</p>
                            <div>

                            </div>
                        </div>
                    </div>
                )
                }
                {/* sección 3 */}
                {selectedTab.id === "opcion3" && (
                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">
                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3">
                            <p>Titulo función 3</p>
                            <div>

                            </div>
                        </div>
                    </div>
                )
                }
                {/* sección 4 */}
                {selectedTab.id === "opcion4" && (
                    <div className="container-diario d-flex align-items-center justify-content-center rounded-4 p-3">
                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3">
                            <p>Titulo función 4</p>
                            <div>

                            </div>
                        </div>
                    </div>
                )
                }

            </motion.div>
        </>
    )
}





