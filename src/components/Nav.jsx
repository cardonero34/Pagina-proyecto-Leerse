import "../stylesheets/Nav.css"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import SpecularButton from "./REACTBITS/SpecularButton"

export const Nav = ({ onProblemaClick, onPropuestaClick, onAnimacionClick, onBeneficiosClick, onComunidadClick }) => {
    const [showNav, setShowNav] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [peekNav, setPeekNav] = useState(false)

    useEffect(() => {
        const compactScreen = window.matchMedia("(max-width: 991.98px)")
        const coarsePointer = window.matchMedia("(pointer: coarse)")

        const keepVisibleOnSmallScreens = () => {
            if (compactScreen.matches || coarsePointer.matches) setShowNav(true)
        }
        const handleMouseMove = (event) => {
            if (compactScreen.matches || coarsePointer.matches) return
            setShowNav(event.clientY <= 120)
        }

        keepVisibleOnSmallScreens()
        window.addEventListener("mousemove", handleMouseMove)
        compactScreen.addEventListener("change", keepVisibleOnSmallScreens)
        coarsePointer.addEventListener("change", keepVisibleOnSmallScreens)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            compactScreen.removeEventListener("change", keepVisibleOnSmallScreens)
            coarsePointer.removeEventListener("change", keepVisibleOnSmallScreens)
        }
    }, [])

    useEffect(() => {
        if (showNav || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPeekNav(false)
            return undefined
        }

        let resetPeekTimeout
        const peekInterval = window.setInterval(() => {
            setPeekNav(true)
            window.clearTimeout(resetPeekTimeout)
            resetPeekTimeout = window.setTimeout(() => setPeekNav(false), 1000)
        }, 2000)

        return () => {
            window.clearInterval(peekInterval)
            window.clearTimeout(resetPeekTimeout)
        }
    }, [showNav])
    useEffect(() => {
        if (!menuOpen) return undefined
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setMenuOpen(false)
        }
        window.addEventListener("keydown", closeOnEscape)
        return () => window.removeEventListener("keydown", closeOnEscape)
    }, [menuOpen])

    const runNavigation = (action) => {
        action?.()
        setMenuOpen(false)
    }

    return (
        <motion.div
            className="nav-motion-shell"
            initial={{ y: 0 }}
            animate={{ y: showNav ? 0 : peekNav ? [-140, -112, -130, -118, -134, -140] : -140 }}
            transition={peekNav ? { duration: 1.1, times: [0, 0.25, 0.46, 0.65, 0.82, 1], ease: "easeInOut" } : { duration: 0.5, ease: "easeInOut" }}
        >
            <div className="nav-shell">
                <SpecularButton
                    as="div"
                    size="md"
                    radius={16}
                    tintOpacity={0}
                    lineColor="#9C030E"
                    baseColor="#9C030E"
                    textColor="#1e1e1e"
                    intensity={1.2}
                    idleIntensity={0.4}
                    shineSize={9}
                    shineFade={28}
                    thickness={2.6}
                    glow={1.15}
                    speed={0.22}
                    followMouse
                    autoAnimate
                    className="nav-specular-frame"
                >
                    <div className="nav-bar cont">
                        <a className="nav-logo" href="/" aria-label="Volver al inicio de Leersé">
                            <img src="/Logo.png" alt="Leersé" />
                        </a>

                        <button
                            className="nav-toggle"
                            type="button"
                            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={menuOpen}
                            aria-controls="mainNav"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span className={`nav-toggle-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>

                        <nav id="mainNav" className={`nav-menu${menuOpen ? " is-open" : ""}`} aria-label="Navegación principal">
                            <ul className="nav-links">
                                <li><button className="nav-link" type="button" onClick={() => runNavigation(onProblemaClick)}>El reto</button></li>
                                <li><button className="nav-link" type="button" onClick={() => runNavigation(onPropuestaClick)}>Esencia</button></li>
                                <li><button className="nav-link" type="button" onClick={() => runNavigation(onBeneficiosClick)}>La obra</button></li>
                                <li><button className="nav-link" type="button" onClick={() => runNavigation(onAnimacionClick)}>Experiencia</button></li>
                                <li><button className="nav-link" type="button" onClick={() => runNavigation(onComunidadClick)}>Universo</button></li>
                                <li className="nav-login-mobile">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="nav-login-button">Ingresar</button>
                                </li>
                            </ul>
                        </nav>

                        <div className="nav-login-desktop">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="nav-login-button">Ingresar</button>
                        </div>
                    </div>
                </SpecularButton>
            </div>
        </motion.div>
    )
}