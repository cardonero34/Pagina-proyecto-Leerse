import React from 'react'
import { color, motion } from "motion/react"
import "../stylesheets/Tutorial.css"

const cardVariants = {
    offscreen: { y: 200, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 1,
        },
    },
}

export const Tutorial = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>  {/* ← overflow aquí, en el wrapper raíz */}

            <div className="tutorial-container d-flex justify-content-center align-items-center">

                <motion.div
                    className="card"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={cardVariants}
                    style={{
                        width: '100%', maxWidth: '420px', border: '24px solid #e0d0ec',
                        borderRadius: '14px',
                    }}>

                    <div className="card-body p-4">
                        <h5 className="card-title text-center fw-bold mb-3" style={{ color: '#000000', fontSize: '1.05rem' }}>
                            Bienvenido al interior<br />de Leersé
                        </h5>
                        <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: '1.75' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn px-5 py-2" style={{ backgroundColor: '#8c030e', color: '#e0d0ec', border: 'none', borderRadius: '6px' }}>
                                comenzar
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>


            <div className='tutorial-container d-flex justify-content-center align-items-center'>

                <div className="card" role="alert" aria-live="assertive" aria-atomic="true" style={{ width: '100%', maxWidth: '420px', border: '24px solid #e0d0ec', borderRadius: '14px' }}>

                    <div className="card-body p-4">
                        Hello, world! This is a toast message.

                        <div className="mt-2 pt-2 border-top ">
                            <button type="button" className="btn btn-primary btn-sm">Take action</button>
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Tarjeta 2 - Decisiones */}
            <div className="tutorial-container d-flex justify-content-center align-items-center">
                <div
                    className="card"
                    style={{ width: '100%', maxWidth: '420px', border: '24px solid #e0d0ec', borderRadius: '14px' }}>
                    <div className="card-body p-4">

                        <div className="d-flex align-items-center gap-2 mb-1">
                            <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />

                            <span className="fw-bold" style={{ color: '#000000', fontSize: '0.95rem' }}>Desición 1</span>
                        </div>

                        <div className=' d-flex flex-column justify-content-center position-absolute top-0 start-0 '
                            style={{ backgroundColor: '#e0d0ec', margin:'2em', }}>

                            <motion.div
                                whileHover={{ scale: 0.95 }}
                                whileTap={{ scale: 0.90 }}
                                animate={{
                                    scale: 1,
                                    transition: { duration: 0.5 }
                                }}
                                className='type rounded-5 d-flex align-items-center justify-content-center mb-2'>
                                <p className='m-2 p-1'>Anotación</p>
                            </motion.div>
                        </div>

                        <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        <div className="d-flex align-items-center gap-2 mb-1 mt-3">
                            <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />
                            <span className="fw-bold" style={{ color: '#000000', fontSize: '0.95rem' }}>Desición 2</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65' }}>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <div className="d-flex align-items-center gap-2 mb-1 mt-3">
                            <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />
                            <span className="fw-bold" style={{ color: '#000000', fontSize: '0.95rem' }}>Desición 3</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65', margin: 0 }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}