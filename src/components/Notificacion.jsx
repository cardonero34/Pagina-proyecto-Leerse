import "../stylesheets/Notify.css"
import { motion } from "motion/react"

export const Notificacion = () => {
    return (
        <>
            <div
                className='notify d-flex flex-column justify-content-center position-absolute top-0 start-0 '>
                <motion.div
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.90 }}
                    animate={{
                        scale: 1,
                        transition: { duration: 0.5 }
                    }}
                    className='type rounded-5 d-flex align-items-center justify-content-center mb-2'>
                    <p className='m-2'>Anotación</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    
                    className='content d-flex align-items-center justify-content-center rounded-3 w-100'>
                    <img src="/iconos/icono-comillas.png" className='comilla' />
                    <p className='mx-5 my-2'>
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate! adipisicing elit. Voluptas, voluptate!
                    </p>
                    <img src="/iconos/icono-comillas.png" className='comilla1' />
                </motion.div>
                <div className='option d-flex justify-content-center rounded-top-pill'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='container-icon d-flex align-items-center justify-content-center rounded-5 m-2'>
                        <img src="/iconos/icono-guardado.png" style={{ width: '20px' }} />
                    </motion.div>
                </div>
            </div>
        </>
    )
}
