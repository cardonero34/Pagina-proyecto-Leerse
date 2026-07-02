import "../stylesheets/Nav.css"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

export const Nav = ({ onProblemaClick, onAcercadeClick, onAnimacionClick, onBeneficiosClick, onComunidadClick }) => {

    const [showNav, setShowNav] = useState(true)

    useEffect(() => {

        const handleMouseMove = (e) => {

            // Si el mouse está cerca arriba
            if (e.clientY <= 120) {
                setShowNav(true)
            } else {
                setShowNav(false)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }

    }, [])

    return (
        <>
            <motion.div
                className="my-5"
                initial={{ y: 0 }}
                animate={{
                    y: showNav ? 0 : -140
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}

            >
                <div className="w-75 mx-auto">
                    <div className="navbar navbar-expand-lg cont row p-4 rounded-4 d-flex justify-content-between align-items-center shadow-lg">

                        {/* LOGO */}
                        <div className="col-1 d-flex align-items-center">
                            <div className="logo d-flex justify-content-center align-items-center">
                                <a href="/">
                                    <img className="w-100" src="/Logo.png" alt="Logo" />
                                </a>
                            </div>
                        </div>

                        {/* BOTÓN HAMBURGUESA */}
                        <div className="col-1 d-lg-none m-0 p-0">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#mainNav"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        {/* opciones */}
                        <div className="col-8 collapse navbar-collapse justify-content-center align-items-center m-0 p-0" id="mainNav">
                            <div className="d-lg-none pt-5"></div>
                            <ul className="nav nav-underline d-flex flex-column flex-lg-row ">
                                <li className="nav-item px-1"><a className="nav-link" onClick={onProblemaClick}>El problema</a></li>
                                <li className="nav-item px-1"><a className="nav-link" onClick={onAcercadeClick}>Acerca de</a></li>
                                <li className="nav-item px-1"><a className="nav-link" onClick={onAnimacionClick}>Animación</a></li>
                                <li className="nav-item px-1"><a className="nav-link" onClick={onBeneficiosClick}>Beneficios</a></li>
                                <li className="nav-item px-1"><a className="nav-link" onClick={onComunidadClick}>Comunidad</a></li>
                                <li className="nav-item px-1 d-lg-none">
                                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="btn1 rounded-3 shadow">Ingresar</button>
                                </li>
                            </ul>
                        </div>

                        {/* BOTÓN DERECHA */}
                        <div className="col-3 d-none d-lg-flex col-3 justify-content-end align-items-center">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn1 rounded-3 shadow">Ingresar</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
