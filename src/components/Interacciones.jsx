import LottieModule from "lottie-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "../stylesheets/interacciones.css"

/* >========== Assets interactivos ==========< */
import Luna from '../assets/Animacion/Cap1/luna.json'
import Nubes from '../assets/Animacion/Cap1/nubes.json'

const Lottie = LottieModule.default;

export const Interacciones = ({ onMoonClick }) => {

    const lunaRef = useRef()
    const nubesRef = useRef()
    // estado para controlar la animación en Y
    const [moverLuna, setMoverLuna] = useState(false)
    const [moverNubes, setMoverNubes] = useState(false)

    const playCap1 = () => {

        setMoverNubes(true);
        setMoverLuna(true);
        nubesRef.current?.play();

        setTimeout(() => {
            onMoonClick?.();
        }, 3500);

    }

    return (
        <>
            <div className="container position-absolute top-50 start-50 translate-middle d-flex falign-items-center justify-content-center">

                {/* Luna con animación */}
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 90, transition: { duration: 0.5 } }}
                    whileTap={{ scale: 0.8, rotate: -360, transition: { duration: 0.2 } }}
                    onClick={playCap1}
                    animate={moverLuna ? { y: -1000, scale: 7 } : { y: 350, scale: 1 }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="luna">
                    <Lottie
                        lottieRef={lunaRef}
                        animationData={Luna}
                        loop={true}
                        autoplay={true}
                    />
                </motion.div>

                <motion.div
                    animate={moverNubes ? { y: [500, -500, -550, -1000], scale: [1, 1.5, 2, 0.5] } : { y: 500, scale: 1 }}
                    transition={{
                        duration: 8,          // duración total
                        times: [0, 0.3, 0.5, 1], // momentos relativos de cada keyframe
                        ease: "easeInOut"
                    }}
                    className="nubes "
                >
                    <Lottie
                        lottieRef={nubesRef}
                        animationData={Nubes}
                        loop={false}
                        autoplay={false}
                    />
                </motion.div>

            </div>
        </>
    )
}
