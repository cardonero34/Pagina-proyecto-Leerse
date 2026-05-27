import React from 'react'
import "../stylesheets/Notify.css"
import { motion } from "motion/react"

export const Notificacion = () => {
    return (
        <>
            <motion.div
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.90 }}
                animate={{
                    scale: 1,
                    transition: { duration: 0.5 }
                }}

                className='notify d-flex flex-column justify-content-center position-absolute top-0 start-0 '>
                <div className='type d-flex align-items-center justify-content-center rounded-4'>
                    <p>Notify</p>
                </div>
                <div className='content d-flex align-items-center justify-content-center rounded-4'>
                    <img src="/iconos/icono-comillas.png" className='comilla' />
                    <p> lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!
                    </p>
                    <img src="/iconos/icono-comillas.png" className='comilla1' />
                </div>
                <div className='option d-flex justify-content-center rounded-top-pill'>
                    <div className='container-icon d-flex align-items-center justify-content-center rounded-5 m-2'>
                        <img src="/iconos/icono-guardado.png" style={{ width: '20px' }} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}
