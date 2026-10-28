import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ModelViewer from "../components/REACTBITS/ModelViewer";
import MODEL_URL from "../assets/personaje/personaje.glb?url";
import "../stylesheets/ModelViewerPage.css";


export const ModelViewerPage = () => {
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const handleMouseMove = (event) => setShowBanner(event.clientX <= 120);
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <main className="model-page">
            <motion.nav
                className="model-banner d-flex flex-column align-items-center justify-content-center rounded-4 gap-3"
                initial={{ opacity: 0, left: -20 }}
                animate={{ opacity: 1, left: showBanner ? 45 : -65, scale: showBanner ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
                style={{ top: "50vh", y: "-50%" }}
                aria-label="Navegación de Leersé"
            >
                <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1 }} className="model-banner-logo d-flex align-items-center justify-content-center rounded-4 shadow">
                    <a href="/" aria-label="Ir al inicio de Leersé">
                        <img src="/Logo.png" alt="Leersé" />
                    </a>
                </motion.div>

                <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1 }} className="model-banner-profile d-flex align-items-center justify-content-center rounded-4 shadow">
                    <a href="/modelo-3d" aria-label="Abrir el visor del modelo 3D">
                        <img src="/iconos/icono-perfil.png" alt="Modelo 3D" />
                    </a>
                </motion.div>

                <div className="model-banner-links d-flex flex-column align-items-center justify-content-center rounded-4 shadow">
                    <a href="/animacion" aria-label="Ir a la experiencia de animación">
                        <motion.img whileHover={{ scale: 0.9 }} whileTap={{ scale: 1 }} src="/iconos/icono-animacion.png" alt="Animación" />
                    </a>
                    <a href="https://cardonero34.github.io/revistaleerse/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Revista Leersé en una pestaña nueva">
                        <motion.img whileHover={{ scale: 0.9 }} whileTap={{ scale: 1 }} src="/iconos/icono-massobreleerse.png" alt="Revista Leersé" />
                    </a>
                    <a href="https://canva.link/manual-maestro-leerse" target="_blank" rel="noopener noreferrer" aria-label="Abrir el manual maestro de Leersé en una pestaña nueva">
                        <motion.img whileHover={{ scale: 0.9 }} whileTap={{ scale: 1 }} src="/iconos/icono-info.png" alt="Información" />
                    </a>
                </div>
            </motion.nav>

            <section className="model-page-content" aria-label="Visor tridimensional">
                <div className="model-viewer-frame">
                    <div className="model-viewer-stage">
                        {MODEL_URL ? (
                            <ModelViewer
                                url={MODEL_URL}
                                width="100%"
                                height="100%"
                                environment="night"
                                environmentIntensity={1.5}
                                exposure={1.15}
                                startAngle={-25}
                                tilt={10}
                                intro="rise"
                                autoRotate
                                autoRotateSpeed={0.25}
                                fit={0.78}
                                className="model-viewer-canvas"
                            />
                        ) : (
                            <p className="model-viewer-empty">
                                Agrega tu archivo <code>.glb</code> en <code>public/modelos</code> y asígnalo en <code>MODEL_URL</code>.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};