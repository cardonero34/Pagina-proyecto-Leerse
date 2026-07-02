import "../stylesheets/Animation.css"
import { Notificacion } from '../components/Notificacion'
import { Diario } from '../components/Diario'
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Herramientas from '../components/Herramientas'

import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';
import { VideoLasMalas } from "../components/VideoLasMalas"
import { Interacciones } from "../components/Interacciones"
import { Guia } from "../components/Guia"

// #region frases para notivox ========================================>>>>>>>>>>
const anotaciones = [

    {
        id: 1,
        texto: "Las calles siempre parecen distintas cuando cae la noche."
    },

    {
        id: 2,
        texto: "La oscuridad también puede sentirse como un refugio."
    },

    {
        id: 3,
        texto: "Hay personas que sólo existen cuando nadie las observa."
    },

    {
        id: 4,
        texto: "Nunca había sentido tanto silencio entre tanta gente."
    }

]

/* momentos donde aparece la notificación */
const eventosCapitulo1 = [

    {
        tiempo: 7,
        anotacion: 1
    },

    {
        tiempo: 18,
        anotacion: 3
    },

    {
        tiempo: 35,
        anotacion: 2
    },

    {
        tiempo: 60,
        anotacion: 4
    }

]; 
// #endregion frases ========================================>>>>>>>>>>

/* >=============== ( Archivos de video ) ===============< */

const videos = [
    "/Animación/Cap1/Cielo.mp4",
    "/Animación/Cap1/Cap_1.mp4",
    "/Animación/Cap1/Escena3.mp4"
]

export const Animation = () => {

    // #region tutorial y banner de navegación ========================================>>>>>>>>>>
    const [mostrarTutorial, setMostrarTutorial] = useState(true);

    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {

        const handleMouseMove = (e) => {

            // Si el mouse está cerca arriba
            if (e.clientX <= 120) {
                setShowBanner(true)
            } else {
                setShowBanner(false)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }

    }, [])
    // #endregion tutorial y banner de navegación ========================================>>>>>>>>>>

    // #region Capitulos ========================================>>>>>>>>>>
    const [videoActual, setVideoActual] = useState(0)

    const cambiarVideo = (indice) => {

        setFadeVideo(true);

        setTimeout(() => {

            setNotify(false);
            setProgress(0);
            setCurrentTime(0);
            setEventosMostrados([]);
            setVideoActual(indice);

        }, 700);

    }
    // #endregion Capitulos ========================================>>>>>>>>>>

    // #region notificaciones ========================================>>>>>>>>>>
    /* frase elegida */
    const [anotacionActual, setAnotacionActual] = useState(null);

    /* ramdomizador de elección ___________________________________________!importante para despues */
   /*  const seleccionarAnotacionRandom = () => {
        const indice = Math.floor(
            Math.random() * anotaciones.length
        );
        setAnotacionActual(
            anotaciones[indice]
        );
    } */

    /*_________________________________________ Guardado __________________________________ */
    const [historial, setHistorial] = useState([]);

    const guardarAnotacion = () => {

        if (!anotacionActual) return;

        const existe = historial.some(

            item => item.id === anotacionActual.id

        );

        if (existe) return;

        setHistorial(prev => [

            ...prev,

            anotacionActual

        ]);

        setNotify(false);   // ← cerrar la notificación

    }
    // #endregion notificaciones ========================================>>>>>>>>>>

    // #region VideoCode ========================================>>>>>>>>>>
    /* fade negro  */
    const [fadeVideo, setFadeVideo] = useState(false);

    const videoRef = useRef(null)

    // ================== Estado y funciones de reproducción ==================
    const [playing, setPlaying] = useState(false)

    const handlePlay = () => {
        videoRef.current.play()
    }

    const handlePause = () => {
        videoRef.current.pause()
    }

    /* despausar (boton lila con fondo oscuro) */
    const handleTogglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    }
    // ================== Fin reproducción ==================


    // ================== Estado y funciones de mute/volumen ==================
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(1)

    const handleToggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted
        setMuted(videoRef.current.muted)
    }

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value)
        videoRef.current.volume = val
        setVolume(val)
        if (val === 0) {
            videoRef.current.muted = true
            setMuted(true)
        } else {
            videoRef.current.muted = false
            setMuted(false)
        }
    }

    const volIcon = muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'
    // ================== Fin mute/volumen ==================


    // ================== Estado y funciones de tiempo/progreso ==================
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const handleAvanzar = () => {
        videoRef.current.currentTime = 6
    }

    const handleProgressChange = (e) => {
        const val = parseFloat(e.target.value)
        if (videoRef.current.duration) {
            videoRef.current.currentTime = (val / 100) * videoRef.current.duration
        }
    }

    /* Notificación/mensaje __________________________(ANOTACION)*/

    const handleTimeUpdate = () => {
        const vid = videoRef.current
        if (!vid) return
        setCurrentTime(vid.currentTime)
        if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100)

        // Lógica original: detener en seg 5
        const evento = eventosCapitulo1.find(

            (item) =>

                vid.currentTime >= item.tiempo &&
                !eventosMostrados.includes(item.tiempo)

        );
        if (
            videoActual === 1 &&
            evento
        ) {
            vid.pause();
            const anotacion = anotaciones.find(

                item => item.id === evento.anotacion

            );

            setAnotacionActual(anotacion);
            setNotify(true);

            setEventosMostrados(prev => [
                ...prev,
                evento.tiempo

            ]);
        }
    }

    /* actualizacion del estado del componente de reproduccion del video */
    const handleLoadedMetadata = () => {

        const video = videoRef.current;
        if (!video) return;
        setDuration(video.duration);
        setProgress(0);
        setCurrentTime(0);
        video.currentTime = 0;
        video.play();
        setFadeVideo(false);

    }
    // ================== Fin tiempo/progreso ==================


    // ================== Estado y funciones de velocidad ==================
    const [speed, setSpeed] = useState(1)

    const handleSpeedChange = (e) => {
        const val = parseFloat(e.target.value)
        videoRef.current.playbackRate = val
        setSpeed(val)
    }
    // ================== Fin velocidad ==================


    // ================== Estado y funciones de mensaje/continuar (((((((((((((("notivox"))))))))))))))) ==================
    const [Notify, setNotify] = useState(false)
    const [eventosMostrados, setEventosMostrados] = useState([]);

    const handleContinuar = () => {
        setNotify(false)
        videoRef.current.play()
        setPlaying(true);
    }
    // ================== Fin mensaje/continuar ==================


    // ================== Funciones de pantalla completa ==================
    const handleFullscreen = () => {
        const box = videoRef.current
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            box.requestFullscreen && box.requestFullscreen()
        }
    }
    // ================== Fin pantalla completa ==================
    // #endregion VideoCode ========================================>>>>>>>>>>

    // #region Funcionalidades ========================================>>>>>>>>>>

    /* diario */
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

    /* Herramientas de reproducción */

    const [openHerrRep, setOpenHerrRep] = useState(false)
    const HerrRepRef = useRef(null)

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                HerrRepRef.current &&
                !HerrRepRef.current.contains(event.target)
            ) {

                setOpenHerrRep(false)
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


    // #endregion Funcionalidades ========================================>>>>>>>>>>

    return (
        <>
            <div className="animation-container d-flex align-items-center justify-content-center">

                {/* tutorial inicial____________ */}
                {mostrarTutorial && (
                    <div className="tutorial-container position-absolute top-0 start-50 translate-middle-x d-flex align-items-center justify-content-center">

                        {/* Botón omitir */}
                        <div
                            className="tutorial-skip position-absolute top-0 end-0 m-3 p-2 rounded-3 text-white cursor-pointer"
                            onClick={() => setMostrarTutorial(false)}
                        >
                            cerrar ✕
                        </div>

                        <Guia />

                    </div>
                )}

                {/* contenido de la animación */}
                <div className="animation-content d-flex align-items-center justify-content-center">

                    {/* nav de pagina */}
                    <motion.div
                        animate={{
                            left: showBanner ? 45 : -65,
                            scale: showBanner ? 1.1 : 1
                        }}
                        initial={{
                            transition: { duration: 0.4 },
                            opacity: 0,
                            left: -20,
                        }}
                        whileInView={{
                            opacity: 100,
                        }}
                        whileHover={{
                            transition: { duration: 0.4 },
                        }}
                        transition={{ duration: 0.4 }}

                        className="banner d-flex flex-column align-items-center justify-content-center rounded-4 gap-3">
                        <motion.div
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 1 }}
                            className="logo-container d-flex align-items-center justify-content-center rounded-4 shadow">
                            <a href="/">
                                <img className='p-3' src="/Logo.png" style={{ width: '80px' }} />
                            </a>
                        </motion.div>
                        <motion.div

                            className="user-container d-flex align-items-center justify-content-center rounded-4 shadow">
                            <img className='p-2' src="/iconos/icono-perfil.png" style={{ width: '80px' }} />
                        </motion.div>
                        <div

                            className="links-container d-flex flex-column align-items-center justify-content-center rounded-4 shadow">
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 1 }} className='p-2' src="/iconos/icono-animacion.png" style={{ width: '80px' }} />
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 1 }} className='p-2' src="/iconos/icono-massobreleerse.png" style={{ width: '80px' }} />
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 1 }} className='p-2' src="/iconos/icono-info.png" style={{ width: '80px' }} />
                        </div>
                    </motion.div>


                    <div className="content d-flex flex-column align-items-center justify-content-center gap-4">

                        {/* barra de progreso */}
                        <div className="progress-container shadow d-flex flex-column align-items-center justify-content-center position-relative">
                            <div className="progress p-1"
                                role="progressbar"
                                aria-label="Example with label"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100">
                                <div className="progress-bar rounded" style={{ width: `${progress}%` }}>capitulo</div>
                            </div>

                            {/* control progreso */}
                            <div className="progressRow position-absolute z-3 w-100">
                                <input
                                    type="range"
                                    className="progressInput w-100"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={progress}
                                    onChange={handleProgressChange}
                                />
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

                        <div className="reproductor d-flex align-items-center justify-content-center rounded-4 mt-2 shadow">
                            <div className="containerVideo position-relative w-100 h-100 d-flex align-items-center justify-content-center rounded-4 p-3 overflow-hidden">


                                {/* aqui va el archivo mp4 */}
                                <VideoLasMalas
                                    videoRef={videoRef}
                                    src={videos[videoActual]}
                                    handleTimeUpdate={handleTimeUpdate}
                                    handleLoadedMetadata={handleLoadedMetadata}
                                    setPlaying={setPlaying}
                                />

                                {/* herramientas superpuestas */}
                                <div className='video-container d-flex align-items-center justify-content-center position-relative'>

                                    <Interacciones
                                        onMoonClick={() => cambiarVideo(1)}
                                    ></Interacciones>

                                    {/* play */}
                                    {playing ? (
                                        <motion.div />
                                    ) : (
                                        <motion.div className="play d-flex justify-content-center align-items-center position-absolute"
                                            onClick={Notify ? handleContinuar : handleTogglePlay}
                                            key="play"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <motion.img
                                                className="icon-play z-3"
                                                whileHover={{ scale: 0.95 }}
                                                whileTap={{ scale: 0.90 }}
                                                animate={{ scale: 1, transition: { duration: 0.5 } }}
                                                src="/iconos/icono-play.png"
                                                alt="Play"
                                            />
                                        </motion.div>
                                    )}


                                    {/* notify */}
                                    <AnimatePresence>
                                        {
                                            Notify && (
                                                <Notificacion
                                                    texto={anotacionActual?.texto}
                                                    onGuardar={guardarAnotacion}
                                                ></Notificacion>
                                            )
                                        }
                                    </AnimatePresence>

                                    {/* herramientas funcionalidades */}
                                    <Herramientas></Herramientas>

                                    {/* herramientas de reproducción */}

                                    <AnimatePresence>
                                        {!openHerrRep && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, }}
                                                animate={{ opacity: 1, scale: 1, }}
                                                exit={{ opacity: 0, scale: 0.5, }}
                                                transition={{ duration: 0.2, }}
                                                onClick={() => setOpenHerrRep(true)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className='btn-HerrRep position-absolute top-0 start-50 translate-middle d-flex align-items-end justify-content-center rounded-bottom-pill z-2'>
                                                <img src="/iconos/icono-HerrRep.png" style={{ width: '60px' }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {openHerrRep && (
                                            <motion.div
                                                ref={HerrRepRef}
                                                className="container-HerrRep position-absolute top-0 start-50 translate-middle-x rounded-4 p-2 d-flex gap-2 z-3"
                                            >

                                                {/* volumen */}
                                                <div className="volumen rounded-3 d-flex justify-content-center aling-items-center gap-2 p-1">
                                                    <button className="iconS rounded-3 d-flex justify-content-center aling-items-center" onClick={handleToggleMute} title="Silenciar">
                                                        {volIcon}
                                                    </button>
                                                    <input
                                                        type="range"
                                                        className="volInput"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={muted ? 0 : volume}
                                                        onChange={handleVolumeChange}
                                                    />
                                                    <span className="volLabel pt-1">{Math.round(muted ? 0 : volume * 100)}%</span>
                                                </div>

                                                {/* pausar */}
                                                <div
                                                    className="pause rounded-3 d-flex justify-content-center aling-items-center"
                                                    onClick={handleTogglePlay}>
                                                    <img className="w-100" src="/iconos/icono-pause.png" alt="" />
                                                </div>

                                                {/* pantalla expandida */}
                                                <div onClick={handleFullscreen} className="expandir rounded-3 d-flex justify-content-center aling-items-center">⛶</div>

                                                {/* velocidad */}
                                                <select
                                                    className="velocidad rounded-3 d-flex justify-content-center aling-items-center"
                                                    value={speed}
                                                    onChange={handleSpeedChange}
                                                >
                                                    <option value={0.5}>0.5×</option>
                                                    <option value={0.75}>0.75×</option>
                                                    <option value={1}>1×</option>
                                                    <option value={1.25}>1.25×</option>
                                                    <option value={1.5}>1.5×</option>
                                                    <option value={2}>2×</option>
                                                </select>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>


                                    {/* Diario */}
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
                                                className='btn-diario position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded-4 z-3'>
                                                <img src="/iconos/icono-diario.png" style={{ width: '60px' }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {openDiary && (
                                            <motion.div
                                                ref={diaryRef}
                                            >
                                                <Diario
                                                    historial={historial}
                                                ></Diario>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* fade negro */}
                                <AnimatePresence>
                                    {fadeVideo && (
                                        <motion.div
                                            className="videoFade z-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7 }}
                                        />
                                    )}
                                </AnimatePresence>

                            </div>
                        </div>
                        <div className="sinopsis shadow d-flex align-items-center justify-content-center rounded-4 p-5">
                            <p>En Cordoba, en el parque Sarmiento, nocturno y marginal, Camila, una mujer trans de unos inciertos 20 anos recien llegada de su pueblo, busca un lugar donde pertenecer.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
