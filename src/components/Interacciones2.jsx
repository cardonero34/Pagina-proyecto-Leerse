import LottieModule from "lottie-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "../stylesheets/interacciones.css"

/* >========== Assets interactivos ==========< */
import Luna from '../assets/Animacion/Cap2/luciernaga 1.webm'
import Luciernaga2 from '../assets/Animacion/Cap2/luciernaga 2.webm'
import Arbusto from '../assets/Animacion/Cap2/arbusto.webm'

const Lottie = LottieModule.default;

export const Interacciones2 = ({ onLuciernagaClick }) => {

    const lunaRef = useRef()
    const nubesRef = useRef()

    // estado para controlar la animación en Y
    const [moverLuna, setMoverLuna] = useState(false)
    const [moverArbusto, setMoverArbusto] = useState(false)

    const playCap2 = () => {

        setMoverArbusto(true);
        setMoverLuna(true);
        nubesRef.current?.play();

        setTimeout(() => {
            onLuciernagaClick?.();
        }, 1500);

    }

    return (
        <>
            <div className="container position-absolute top-50 start-50 translate-middle d-flex falign-items-center justify-content-center">

                {/* Lucienaga 1 con animación */}
                <motion.div
                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.8, transition: { duration: 0.2 } }}
                    onClick={playCap2}
                    animate={moverLuna ? { y: -1000, scale: 7, x: 0, transition: { duration: 4, ease: "easeInOut" } } : { y: 300, scale: 1, x: -850, transition: { duration: 5, ease: "easeInOut" } }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className="containerL1 d-flex falign-items-center justify-content-center"
                >
                    <video
                        className="luciernaga"
                        src={Luciernaga2}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

                {/* Luciernaga 2 con animación */}
                <motion.div

                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.8, transition: { duration: 0.2 } }}
                    onClick={playCap2}
                    animate={moverLuna ? { y: -1000, scale: 7, x: 0, transition: { duration: 4, ease: "easeInOut" } } : { y: -70, scale: 1, x: 850, transition: { duration: 5, ease: "easeInOut" } }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className="containerL2 d-flex falign-items-center justify-content-center"
                >
                    <video
                        className="luciernaga2"
                        src={Luna}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

                {/* arbustos */}
                <motion.div
                    animate={moverArbusto ? { y: [80, 50, 300], scale: [1, 2, 0.5] } : { y: [300, 20, 50], scale: [1.5, 1.3, 1] }}
                    transition={{
                        duration: 6,          // duración total
                        times: [0, 0.3, 1], // momentos relativos de cada keyframe
                        ease: "easeInOut"
                    }}
                    className="containerArb d-flex falign-items-center justify-content-center"
                >
                    <video
                        className="arbusto"
                        src={Arbusto}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

                <motion.div
                    animate={moverArbusto ? { y: [80, 50, 300], scale: [1, 2, 0.5] } : { y: [300, 20, 50], scale: [1.5, 1.3, 1] }}
                    transition={{
                        duration: 6,          // duración total
                        times: [0, 0.3, 1], // momentos relativos de cada keyframe
                        ease: "easeInOut"
                    }}
                    className="containerArb2 d-flex falign-items-center justify-content-center"
                >
                    <video
                        className="arbusto2"
                        src={Arbusto}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

                <motion.div
                    animate={moverArbusto ? { y: [80, 50, 300], scale: [1, 2, 0.5] } : { y: [300, 20, 50], scale: [1.5, 1.3, 1] }}
                    transition={{
                        duration: 6,          // duración total
                        times: [0, 0.3, 1], // momentos relativos de cada keyframe
                        ease: "easeInOut"
                    }}
                    className="containerArb3 d-flex falign-items-center justify-content-center"
                >
                    <video
                        className="arbusto3"
                        src={Arbusto}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

            </div>
        </>
    )
}
