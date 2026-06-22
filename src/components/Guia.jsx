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

export const Guia = () => {

    const [seccionActiva, setSeccionActiva] = React.useState(null)

    const secciones = {
        postit: {
            titulo: 'Post its',
            descripcion: <>Aquí encontrarás todos los momentos que decidiste guardar durante tu recorrido por <strong>Leer(sé)</strong>. Tus preguntas, anotaciones, reflexiones y fragmentos favoritos de la animación se almacenarán automáticamente en este espacio.<br /><br />Además, podrás <strong>editar</strong>, <strong>seguir escribiendo</strong>, <strong>compartir</strong> o <strong>eliminar</strong> tus notas utilizando los íconos de la parte superior.</>,
            imagen: '/public/iconos/ejemplo-postit.png',
        },

        decisiones: {
            titulo: 'Decisiones',
            descripcion: <>Aquí encontrarás todas las <strong>decisiones</strong> que tomaste a lo largo de la animación, junto con el tipo de impulso que las motivó.</>,
            imagen: '/public/iconos/ejemplo-decisiones.png',
        },
        guardados: {
            titulo: 'Guardados',
            descripcion: <>Aquí están las <strong>escenas y momentos</strong> que guardaste durante tu experiencia en Leersé.</>,
            imagen: '/public/iconos/ejemplo-guardados.png',
        },
        archivo: {
            titulo: 'Archivo creativo',
            descripcion: <>Tu <strong>mosaico emocional</strong>: fotos, audios, textos e ilustraciones que creaste durante tu recorrido.</>,
            imagen: '/public/iconos/ejemplo-archivo.png',
        },
        crear: {
            titulo: 'Crear(se)',
            descripcion: <>Un espacio para <strong>transformar tu experiencia</strong> en una creación propia dentro de Leersé.</>,
            imagen: '/public/iconos/ejemplo-crear.png',
        },
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
                                    { icono: '/public/iconos/nav-libro.png', texto: <>En este menú podrás encontrar:</>, rojo: true, id: null },
                                    { icono: '/public/iconos/nav-postit.png', texto: <>Tus <strong>Post it</strong>, capturados en tus momentos favoritos</>, id: 'postit' },
                                    { icono: '/public/iconos/nav-decisiones.png', texto: <>Tus <strong>Decisiones</strong>, tomadas a lo largo de la animación</>, id: 'decisiones' },
                                    { icono: '/public/iconos/nav-guardados.png', texto: <>Tus <strong>Guardados</strong>, los que capturan tus escenas favoritas</>, id: 'guardados' },
                                    { icono: '/public/iconos/nav-archivo.png', texto: <>Tu <strong>Archivo creativo</strong>, tu mosaico emocional hecho en leersé.</>, id: 'archivo' },
                                    { icono: '/public/iconos/nav-crear.png', texto: <>Crear(se), un espacio para transformar tu experiencia en una creación propia.</>, verde: true, id: 'crear' },
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

                                        <span style={{
                                            fontSize: '0.88rem',
                                            color: item.rojo ? '#8c030e' : '#000000',
                                            lineHeight: '1.5', flex: 1
                                        }}>
                                            {item.texto}
                                        </span>

                                        {item.id && (
                                            <img src="/public/iconos/flecha-der.png"
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

                                <button
                                    className="btn p-0 border-0 bg-transparent mb-3 d-flex align-items-center gap-2"
                                    onClick={() => setSeccionActiva(null)}>
                                    <img src="/public/iconos/flecha-izq.png" style={{ width: '18px', height: '18px' }} />
                                    <span style={{ fontSize: '0.85rem', color: '#8c030e' }}>Volver</span>
                                </button>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <img src={`/public/iconos/nav-${seccionActiva}.png`}
                                        style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0 }} />
                                    <h5 className="fw-bold m-0" style={{ color: '#000000', fontSize: '1.05rem' }}>
                                        {secciones[seccionActiva]?.titulo}
                                    </h5>
                                </div>

                                <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: '1.7' }}>
                                    {secciones[seccionActiva]?.descripcion}
                                </p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}>
                                    <img src={secciones[seccionActiva]?.imagen}
                                        style={{ width: '100%', borderRadius: '10px', display: 'block' }} />
                                </motion.div>

                            </motion.div>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    )
}