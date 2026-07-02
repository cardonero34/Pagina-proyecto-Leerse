import "../stylesheets/Diario.css"
import "../stylesheets/Notify.css"
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

export const Diario = ({ historial }) => {

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
                <motion.div className="container-options d-flex justify-content-between position-relative px-2 pb-2 ">
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
                        <div className="diario-content w-100 h-100 d-flex flex-column rounded-3 p-3">
                            <p className="sectDiaryName">Post Its</p>
                            <div className="historial overflow-y-auto overflow-x-visible">
                                {
                                    historial.map((item) => (

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
                                                whileHover={{ scale: 1.03 }}

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
                            <div c>

                            </div>
                        </div>
                    </div>
                )
                }

            </motion.div>
        </>
    )
}





