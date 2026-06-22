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
        <div style={{ overflowX: 'hidden' }}>

            {/* Tarjeta 1 */}

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
                        <h5 className="card-title text-center fw-bold mb-3" style={{ color: '#8c030e', fontSize: '1.05rem' }}>
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
                            <div className="d-flex justify-content-center mt-4">
                                <motion.button
                                    className="btn px-5 py-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: '#8c030e',
                                        color: '#e0d0ec',
                                        border: 'none',
                                        borderRadius: '6px'
                                    }}>
                                    comenzar
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Tarjeta 2 - Decisiones */}
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

                    <div
                        className="card">
                        <div className="card-body p-4">

                            {/* Decisión 1 */}
                            <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                                <div className="d-flex align-items-center gap-2">
                                    <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />
                                    <span className="fw-bold" style={{ color: '#8c030e', fontSize: '0.95rem' }}>Desición 1</span>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 0.95 }}
                                    whileTap={{ scale: 0.90 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    className='type rounded-5 d-flex align-items-center justify-content-center'
                                    style={{ backgroundColor: '#526b2d' }}>
                                    <p className='m-2 p-1' style={{ color: '#ffffff' }}>Instinto</p>
                                </motion.div>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>

                            {/* Decisión 2 */}
                            <div className="d-flex align-items-center justify-content-between gap-2 mb-1 mt-3">
                                <div className="d-flex align-items-center gap-2">
                                    <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />
                                    <span className="fw-bold" style={{ color: '#8c030e', fontSize: '0.95rem' }}>Desición 2</span>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 0.95 }}
                                    whileTap={{ scale: 0.90 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    className='type rounded-5 d-flex align-items-center justify-content-center'
                                    style={{ backgroundColor: '#526b2d' }}>
                                    <p className='m-2 p-1' style={{ color: '#ffffff' }}>Miedo</p>
                                </motion.div>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65' }}>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>

                            {/* Decisión 3 */}
                            <div className="d-flex align-items-center justify-content-between gap-2 mb-1 mt-3">
                                <div className="d-flex align-items-center gap-2">
                                    <img src="checkIcon.png" style={{ width: '45px', height: '45px' }} />
                                    <span className="fw-bold" style={{ color: '#8c030e', fontSize: '0.95rem' }}>Desición 3</span>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 0.95 }}
                                    whileTap={{ scale: 0.90 }}
                                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                                    className='type rounded-5 d-flex align-items-center justify-content-center'
                                    style={{ backgroundColor: '#526b2d' }}>
                                    <p className='m-2 p-1' style={{ color: '#ffffff' }}>Deseo</p>
                                </motion.div>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#000000', lineHeight: '1.65', margin: 0 }}>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>

                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tarjeta 3 - Post its */}
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
                        <h5 className="fw-bold mb-3" style={{ color: '#8c030e', fontSize: '1.05rem' }}>
                            Post its
                        </h5>

                        {/* Post it 1 - Pregunta */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-3">

                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold" style={{ color: '#526b2d', fontSize: '0.88rem' }}>Pregunta 1</span>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ fontSize: '0.78rem', color: '#000000' }}>Cap 2 (E - 5), 00 : 35</span>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-BasuraV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-CompartirV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-LapizV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 position-relative"
                                style={{ border: '1px dashed #526b2d', borderRadius: '6px', minHeight: '70px' }}>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', top: '6px', left: '6px' }} />
                                <p style={{ fontSize: '0.78rem', color: '#000000', lineHeight: '1.6', margin: '18px 8px 18px 20px' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', bottom: '6px', right: '6px', transform: 'scaleX(-1)' }} />
                            </div>
                        </motion.div>

                        {/* Post it 2 - Anotación */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mb-3">

                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold" style={{ color: '#8c030e', fontSize: '0.88rem' }}>Anotación 2</span>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ fontSize: '0.78rem', color: '#000000' }}>Cap 2 (E - 5), 00 : 35</span>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-BasuraR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-CompartirR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-LapizR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 position-relative"
                                style={{ border: '1px dashed #8c030e', borderRadius: '6px', minHeight: '70px' }}>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', top: '6px', left: '6px' }} />
                                <p style={{ fontSize: '0.78rem', color: '#000000', lineHeight: '1.6', margin: '18px 8px 18px 20px' }}>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                </p>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', bottom: '6px', right: '6px', transform: 'scaleX(-1)' }} />
                            </div>
                        </motion.div>

                        {/* Post it 3 - Pregunta */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="mb-3">

                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold" style={{ color: '#526b2d', fontSize: '0.88rem' }}>Pregunta 2</span>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ fontSize: '0.78rem', color: '#000000' }}>Cap 2 (E - 5), 00 : 35</span>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-BasuraV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-CompartirV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-LapizV.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 position-relative"
                                style={{ border: '1px dashed #526b2d', borderRadius: '6px', minHeight: '70px' }}>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', top: '6px', left: '6px' }} />
                                <p style={{ fontSize: '0.78rem', color: '#000000', lineHeight: '1.6', margin: '18px 8px 18px 20px' }}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse.
                                </p>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', bottom: '6px', right: '6px', transform: 'scaleX(-1)' }} />
                            </div>
                        </motion.div>

                        {/* Post it 4 - Anotación */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}>

                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold" style={{ color: '#8c030e', fontSize: '0.88rem' }}>Anotación 2</span>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ fontSize: '0.78rem', color: '#000000' }}>Cap 2 (E - 5), 00 : 35</span>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-BasuraR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-CompartirR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button className="btn p-0 border-0 bg-transparent">
                                        <img src="/public/iconos/Icono-LapizR.png" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 position-relative"
                                style={{ border: '1px dashed #8c030e', borderRadius: '6px', minHeight: '70px' }}>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', top: '6px', left: '6px' }} />
                                <p style={{ fontSize: '0.78rem', color: '#000000', lineHeight: '1.6', margin: '18px 8px 18px 20px' }}>
                                    Excepteur sint occaecat cupidatat non proident deserunt mollit.
                                </p>
                                <img src="/public/iconos/icono-comillas.png" style={{ width: '16px', position: 'absolute', bottom: '6px', right: '6px', transform: 'scaleX(-1)' }} />
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>

            {/* Tarjeta 4 - Guardados */}
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
                        <h5 className="fw-bold mb-3" style={{ color: '#8c030e', fontSize: '1.05rem' }}>
                            Guardados
                        </h5>

                        <div className="row g-3">

                            {/* Tablero 1 */}
                            <div className="col-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}>
                                    <div style={{ backgroundColor: '#e0d0ec', borderRadius: '10px', padding: '8px' }}>
                                        <img src="/public/iconos/icono-degradado1.png" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#8c030e' }}>Tablero 1</span>
                                </motion.div>
                            </div>

                            {/* Tablero 2 */}
                            <div className="col-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}>
                                    <div style={{ backgroundColor: '#e0d0ec', borderRadius: '10px', padding: '8px' }}>
                                        <img src="/public/iconos/icono-degradado2.png" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#8c030e' }}>Tablero 2</span>
                                </motion.div>
                            </div>

                            {/* Tablero 3 */}
                            <div className="col-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}>
                                    <div style={{ backgroundColor: '#e0d0ec', borderRadius: '10px', padding: '8px' }}>
                                        <img src="/public/iconos/icono-degradado3.png" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#8c030e' }}>Tablero 3</span>
                                </motion.div>
                            </div>

                            {/* Botón Nuevo */}
                            <div className="col-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}>
                                    <button className="btn p-0 border-0 bg-transparent w-100" style={{ display: 'block' }}>
                                        <div style={{ backgroundColor: '#e0d0ec', borderRadius: '10px', padding: '8px' }}>
                                            <motion.img
                                                src="/public/iconos/icono-guardar.png"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                                        </div>
                                    </button>
                                    <span style={{ fontSize: '0.85rem', color: '#526b2d', fontWeight: '600' }}>Nuevo</span>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tarjeta 5 - Archivo creativo */}
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
                        <h5 className="fw-bold mb-3" style={{ color: '#8c030e', fontSize: '1.05rem' }}>
                            Archivo creativo
                        </h5>

                        {/* scroll interno */}
                        <div style={{
                            overflowY: 'auto',
                            maxHeight: '380px',
                            paddingRight: '4px',
                        }}>

                            {/* Fila 1 - dos imágenes grandes */}
                            <div className="d-flex gap-2 mb-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/imgeGrande1.png"
                                        style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/ImgDibujos1.png"
                                        style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                                </motion.div>
                            </div>

                            {/* Fila 2  */}
                            <div className="d-flex gap-2 mb-2 align-items-center">

                                {/* T */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                    <img src="/public/tarjetas/t1.png"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <span style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '1.6rem', fontWeight: 'bold', color: '#ffffff',
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                    }}>T</span>
                                </motion.div>

                                {/* Audio  */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/AudioR.png"
                                        style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
                                </motion.div>

                                {/* T 2 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                    <img src="/public/tarjetas/t.png"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <span style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '1.6rem', fontWeight: 'bold', color: '#ffffff',
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                    }}>T</span>
                                </motion.div>
                            </div>

                            {/* Fila 3 */}
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/AudioV.png"
                                        style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/ImgDibujos2.png"
                                        style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                                </motion.div>
                            </div>

                            {/* Fila 4  */}
                            <div className="d-flex gap-2 mb-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.7 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/ImgePequeña1.png"
                                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.8 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/ImgePequeña2.png"
                                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
                                </motion.div>
                            </div>

                            {/* Fila 5 r */}
                            <div className="d-flex gap-2 mb-2 align-items-center">

                                {/* T */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                    <img src="/public/tarjetas/t1.png"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <span style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '1.6rem', fontWeight: 'bold', color: '#ffffff',
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                    }}>T</span>
                                </motion.div>

                                {/* Audio  */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    style={{ flex: 1 }}>
                                    <img src="/public/tarjetas/AudioR.png"
                                        style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
                                </motion.div>

                                {/* T 2 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                    <img src="/public/tarjetas/t.png"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <span style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '1.6rem', fontWeight: 'bold', color: '#ffffff',
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                    }}>T</span>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    )
}