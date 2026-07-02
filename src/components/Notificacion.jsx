import "../stylesheets/Notify.css"
import { motion } from "motion/react"

export const Notificacion = ({ texto, onGuardar }) => {
    return (
        <>
            <motion.div
                className='notify d-flex flex-column justify-content-center position-absolute top-0 start-0 '
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
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.90 }}
                    animate={{
                        scale: 1,
                        transition: { duration: 0.5 }
                    }}
                    className='type rounded-5 d-flex align-items-center justify-content-center mb-3'>
                    <p className='m-1'>Anotación</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.03 }}

                    className='content d-flex align-items-center justify-content-center rounded-3 w-100'>
                    <img src="/iconos/icono-comillas.png" className='comilla' />
                    <p className='m-2 px-4'>
                        {texto}
                    </p>
                    <img src="/iconos/icono-comillas.png" className='comilla1' />
                </motion.div>
                <div className='option d-flex justify-content-center rounded-top-pill'>
                    <motion.div
                        onClick={onGuardar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='container-icon d-flex align-items-center justify-content-center rounded-5 m-2'>
                        <img src="/iconos/icono-guardado.png" style={{ width: '20px' }} />
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}
