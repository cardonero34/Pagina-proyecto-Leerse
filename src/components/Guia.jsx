import React from 'react'
import { motion } from "motion/react"
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

const SECCIONES_ORDEN = ['postit', 'decisiones', 'guardados', 'archivoC', 'crearse']

export const Guia = () => {

    const [seccionActiva, setSeccionActiva] = React.useState(null)
    const [recorridoTerminado, setRecorridoTerminado] = React.useState(false)

    const secciones = {
        postit: {
            titulo: 'Post its',
            icono: '/public/tutorial/icono-postit.png',
            descripcion: <>Aquí encontrarás todos los momentos que decidiste guardar durante tu recorrido por <strong>Leer(sé)</strong>. Tus preguntas, anotaciones, reflexiones y fragmentos favoritos de la animación se almacenarán automáticamente en este espacio.<br /><br />Además, podrás <strong>editar</strong>, <strong>seguir escribiendo</strong>, <strong>compartir</strong> o <strong>eliminar</strong> tus notas utilizando los íconos de la parte superior.</>,
            imagen: '/public/tarjetas/ejemploPostit.png',
        },
        decisiones: {
            titulo: 'Decisiones',
            icono: '/public/tutorial/icono-decisiones.png',
            descripcion: <>Aquí encontrarás todas las <strong>decisiones</strong> que tomaste a lo largo de la animación, junto con el tipo de impulso que las motivó.</>,
            imagen: '/public/tarjetas/ejemploDecisiones.png',
        },
        guardados: {
            titulo: 'Guardados',
            icono: '/public/tutorial/icono-guardados.png',
            descripcion: <>Aquí están las <strong>escenas y momentos</strong> que guardaste durante tu experiencia en Leersé.</>,
            imagen: '/public/tarjetas/ejemploGuardados.png',
        },
        archivoC: {
            titulo: 'Archivo creativo',
            icono: '/public/tutorial/icono-archivoC.png',
            descripcion: <>Tu <strong>mosaico emocional</strong>: fotos, audios, textos e ilustraciones que creaste durante tu recorrido.</>,
            imagen: '/public/tarjetas/ejemploArchivo.png',
        },
        crearse: {
            titulo: 'Crear(se)',
            icono: '/public/tutorial/icono-crearse.png',
            descripcion: <>Un espacio para <strong>transformar tu experiencia</strong> en una creación propia dentro de Leersé.</>,
            imagen: '/public/tarjetas/ejemploCrearse.png',
        },
    }

    const indexActual = SECCIONES_ORDEN.indexOf(seccionActiva)
    const esUltima = indexActual === SECCIONES_ORDEN.length - 1
    const esPrimera = indexActual === 0

    const irA = (id) => setSeccionActiva(id)
    const siguiente = () => !esUltima && setSeccionActiva(SECCIONES_ORDEN[indexActual + 1])
    const anterior = () => !esPrimera && setSeccionActiva(SECCIONES_ORDEN[indexActual - 1])

    if (recorridoTerminado) {
        return (
            <div className="tutorial-container d-flex justify-content-center align-items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="card"
                    style={{
                        width: '100%', maxWidth: '420px', border: '24px solid #e0d0ec',
                        borderRadius: '14px', backgroundColor: '#e0d0ec',
                    }}>
                    <div className="card-body p-4 text-center">
                        <h5 className="fw-bold mb-3" style={{ color: '#000000', fontSize: '1.1rem' }}>
                            ¡Ya conoces Leersé!
                        </h5>
                        <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: '1.7' }}>
                            Ahora estás list@ para comenzar tu experiencia de lectura.
                        </p>
                        <button
                            className="btn px-4 py-2 mt-2"
                            onClick={() => { setRecorridoTerminado(false); setSeccionActiva(null) }}
                            style={{ backgroundColor: '#8c030e', color: '#e0d0ec', border: 'none', borderRadius: '6px', fontSize: '0.88rem' }}>
                            Volver al inicio
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div style={{ overflowX: 'hidden' }}>
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
                        borderRadius: '14px', backgroundColor: '#e0d0ec',
                    }}>

                    <div className="card-body p-4">

                        {!seccionActiva ? (
                            <>
                                <h5 className="fw-bold text-center mb-4" style={{ color: '#000000', fontSize: '1.1rem' }}>
                                    Bienvenid@ a la<br />navegación de leersé
                                </h5>

                                {[
                                    { icono: '/public/tutorial/icono-menu.png', texto: <>En este menú podrás encontrar:</>, rojo: true, id: null },
                                    { icono: '/public/tutorial/icono-postit.png', texto: <>Tus <strong>Post it</strong>, capturados en tus momentos favoritos</>, id: 'postit' },
                                    { icono: '/public/tutorial/icono-decisiones.png', texto: <>Tus <strong>Decisiones</strong>, tomadas a lo largo de la animación</>, id: 'decisiones' },
                                    { icono: '/public/tutorial/icono-guardados.png', texto: <>Tus <strong>Guardados</strong>, los que capturan tus escenas favoritas</>, id: 'guardados' },
                                    { icono: '/public/tutorial/icono-archivoC.png', texto: <>Tu <strong>Archivo creativo</strong>, tu mosaico emocional hecho en leersé.</>, id: 'archivoC' },
                                    { icono: '/public/tutorial/icono-crearse.png', texto: <><strong>Crear(se)</strong>, un espacio para transformar tu experiencia en una creación propia.</>, verde: true, id: 'crearse' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="d-flex align-items-center gap-3 mb-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        whileHover={item.id ? { scale: 1.04 } : {}}
                                        style={{ cursor: item.id ? 'pointer' : 'default' }}
                                        onClick={() => item.id && setSeccionActiva(item.id)}>

                                        <img src={item.icono}
                                            style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0 }} />

                                        <span style={{ fontSize: '0.88rem', color: item.rojo ? '#8c030e' : '#000000', lineHeight: '1.5', flex: 1 }}>
                                            {item.texto}
                                        </span>

                                        {item.id && (
                                            <img src="/public/iconos/icono-siguiente.png"
                                                style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                                        )}
                                    </motion.div>
                                ))}

                                <motion.hr
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    style={{ border: 'none', borderTop: '3px solid #8c030e', transformOrigin: 'left', margin: '0' }} />
                            </>
                        ) : (
                            <motion.div
                                key={seccionActiva}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}>

                                {/* Botón volver al menú */}
                                <button
                                    className="btn p-0 border-0 bg-transparent mb-3 d-flex align-items-center gap-2"
                                    onClick={() => setSeccionActiva(null)}>
                                    <span style={{ fontSize: '0.85rem', color: '#8c030e' }}>← Volver al menú</span>
                                </button>

                                {/* Encabezado */}
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <img src={secciones[seccionActiva]?.icono}
                                        style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0 }} />
                                    <h5 className="fw-bold m-0" style={{ color: '#000000', fontSize: '1.05rem' }}>
                                        {secciones[seccionActiva]?.titulo}
                                    </h5>
                                </div>

                                {/* Descripción */}
                                <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: '1.7' }}>
                                    {secciones[seccionActiva]?.descripcion}
                                </p>

                                {/* Imagen de ejemplo */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="mb-4">
                                    <img src={secciones[seccionActiva]?.imagen}
                                        style={{ width: '100%', borderRadius: '10px', display: 'block' }} />
                                </motion.div>

                                {/* Indicadores de puntos */}
                                <div className="d-flex justify-content-center gap-2 mb-3">
                                    {SECCIONES_ORDEN.map((id) => (
                                        <motion.div
                                            key={id}
                                            onClick={() => irA(id)}
                                            whileHover={{ scale: 1.2 }}
                                            animate={{ backgroundColor: id === seccionActiva ? '#8c030e' : '#e0d0ec' }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                width: '12px', height: '12px',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                border: '2px solid #8c030e',
                                            }} />
                                    ))}
                                </div>

                                {/* Botones anterior / siguiente */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn px-3 py-1"
                                        onClick={anterior}
                                        disabled={esPrimera}
                                        style={{
                                            backgroundColor: esPrimera ? 'transparent' : '#e0d0ec',
                                            color: '#8c030e',
                                            border: '2px solid #8c030e',
                                            borderRadius: '6px',
                                            fontSize: '0.82rem',
                                            opacity: esPrimera ? 0.3 : 1,
                                        }}>
                                        ← Anterior
                                    </button>

                                    {esUltima ? (
                                        <button
                                            className="btn px-3 py-1"
                                            onClick={() => setRecorridoTerminado(true)}
                                            style={{
                                                backgroundColor: '#8c030e',
                                                color: '#e0d0ec',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '0.82rem',
                                            }}>
                                            Finalizar recorrido ✓
                                        </button>
                                    ) : (
                                        <button
                                            className="btn px-3 py-1"
                                            onClick={siguiente}
                                            style={{
                                                backgroundColor: '#e0d0ec',
                                                color: '#8c030e',
                                                border: '2px solid #8c030e',
                                                borderRadius: '6px',
                                                fontSize: '0.82rem',
                                            }}>
                                            Siguiente →
                                        </button>
                                    )}
                                </div>

                            </motion.div>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    )
}