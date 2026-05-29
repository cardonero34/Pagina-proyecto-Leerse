import React from 'react'
import "../stylesheets/Animation.css"
import { Notificacion } from '../components/Notificacion'
import { Diario } from '../components/Diario'
import FloatingActionButton from '../components/FloatingActionButton'
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"

export const Animation = () => {

    const [openDiary, setOpenDiary] = useState(false)
    const diaryRef = useRef(null)

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                diaryRef.current &&
                !diaryRef.current.contains(event.target)
            ) {

                setOpenDiary(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }

    }, [])

    return (
        <>
            <div className="animation-container d-flex align-items-center justify-content-center">
                <div className="animation-content d-flex align-items-center justify-content-center">
                    <div className="banner d-flex flex-column align-items-center justify-content-center rounded-4 gap-3">
                        <div className="logo-container d-flex align-items-center justify-content-center rounded-4">
                            <img className='p-3' src="/Logo.png" style={{ width: '80px' }} />
                        </div>
                        <div className="user-container d-flex align-items-center justify-content-center rounded-4">
                            <img className='p-2' src="/iconos/icono-perfil.png" style={{ width: '80px' }} />
                        </div>
                        <div className="links-container d-flex flex-column align-items-center justify-content-center rounded-4 ">
                            <img className='p-2' src="/iconos/icono-animacion.png" style={{ width: '80px' }} />
                            <img className='p-2' src="/iconos/icono-massobreleerse.png" style={{ width: '80px' }} />
                            <img className='p-2' src="/iconos/icono-info.png" style={{ width: '80px' }} />
                        </div>
                    </div>

                    <div className="content d-flex flex-column align-items-center justify-content-center gap-4">
                        <div className="progress-container d-flex align-items-center justify-content-center position-relative">
                            <div className="progress p-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar rounded" style={{ width: '50%' }}></div>
                            </div>
                            <div className="capitulos position-absolute d-flex align-items-center justify-content-between w-100">
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num1.png" style={{ width: '30px' }} />
                                </div>
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num2.png" style={{ width: '30px' }} />
                                </div>
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num3.png" style={{ width: '30px' }} />
                                </div>
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num4.png" style={{ width: '30px' }} />
                                </div>
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num5.png" style={{ width: '30px' }} />
                                </div>
                                <div className="containerNum rounded-5 d-flex align-items-center justify-content-center">
                                    <img src="/iconos/icono-num6.png" style={{ width: '30px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="reproductor d-flex align-items-center justify-content-center rounded-4 mt-2">
                            <div className="video w-100 h-100 d-flex align-items-center justify-content-center rounded-4 p-3">
                                <div className='video-container d-flex align-items-center justify-content-center position-relative'>
                                    <motion.img
                                        whileHover={{ scale: 0.95 }}
                                        whileTap={{ scale: 0.90 }}
                                        animate={{
                                            scale: 1,
                                            transition: { duration: 0.5 }
                                        }}
                                        src="/iconos/icono-play.png"
                                        style={{ width: '100px' }} />
                                    <Notificacion></Notificacion>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className='herramientas position-absolute bottom-0 start-0 d-flex align-items-center justify-content-center rounded-4'>
                                        <img src="/iconos/icono-herramientas.png" style={{ width: '60px' }} />
                                    </motion.div>
                                    <AnimatePresence>
                                        {!openDiary && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, }}
                                                animate={{ opacity: 1, scale: 1, }}
                                                exit={{ opacity: 0, scale: 0.5, }}
                                                transition={{ duration: 0.2, }}
                                                onClick={() => setOpenDiary(true)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className='btn-diario position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded-4'>
                                                <img src="/iconos/icono-diario.png" style={{ width: '60px' }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {openDiary && (
                                            <motion.div
                                                ref={diaryRef}
                                            >
                                                <Diario></Diario>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/*  <FloatingActionButton></FloatingActionButton> */}
                                </div>
                            </div>
                        </div>
                        <div className="sinopsis d-flex align-items-center justify-content-center rounded-4">
                            <p>lol lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
