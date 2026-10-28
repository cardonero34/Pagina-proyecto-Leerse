import "../stylesheets/Animation.css"
import { Notificacion } from '../components/Notificacion'
import { Diario } from '../components/Diario'
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Herramientas from '../components/Herramientas'
import TextType from '../components/REACTBITS/TextType'

import '@videojs/react/video/skin.css';
import { VideoLasMalas } from "../components/VideoLasMalas"
import { Guia } from "../components/Guia"
import { useLocation } from "react-router-dom";

/* import de interacciones lottie */
import { Interacciones } from "../components/Interacciones"
import { Interacciones2 } from "../components/Interacciones2"

/* notivox */
import { cultivox, reflexivox, crearse, pausavox, diariovox, notivox } from "../data/notivox";

console.log("CULTIVOX:", cultivox);
console.log("REFLEXIVOX:", reflexivox);
console.log("CREARSÉ:", crearse);
console.log("PAUSAVOX:", pausavox);
console.log("DIARIOVOX:", diariovox);
console.log("TODAS:", notivox);

// #region datos para notivox ========================================>>>>>>>>>>

/*
 * Cada evento indica:
 * - en qué segundo aparece
 * - qué Notivox debe mostrarse
 *
 * El contenido real de cada Notivox
 * está almacenado en src/data/notivox/
 */

const eventosCapitulo1 = [
    { progreso: 0.04, notivoxId: "cap1-reflex-umbral" },
    { progreso: 0.24, notivoxId: "cap1-crearse-miedo" },
    { progreso: 0.48, notivoxId: "cap1-reflex-miedo" },
    { progreso: 0.76, notivoxId: "cap1-cultivox-camila" },
    { progreso: 0.93, notivoxId: "cap1-reflex-cierre" },
];

const eventosCapitulo2 = [
    { progreso: 0.04, notivoxId: "cap2-cultivox-lohana" },
    { progreso: 0.24, notivoxId: "cap2-crearse-casa" },
    { progreso: 0.48, notivoxId: "cap2-reflex-hogar" },
    { progreso: 0.72, notivoxId: "cap2-crearse-refugio" },
    { progreso: 0.93, notivoxId: "cap2-reflex-puerta" },
];

const eventosCapitulo3 = [
    { progreso: 0.04, notivoxId: "cap3-reflex-aula" },
    { progreso: 0.24, notivoxId: "cap3-crearse-codigo" },
    { progreso: 0.48, notivoxId: "cap3-reflex-normas" },
    { progreso: 0.76, notivoxId: "cap3-cultivox-revuelo" },
    { progreso: 0.93, notivoxId: "cap3-reflex-pertenecer" },
];

const eventosCapitulo4 = [
    { progreso: 0.03, notivoxId: "cap4-pausa-invitacion" },
    { progreso: 0.24, notivoxId: "cap4-reflex-acompanar" },
    { progreso: 0.48, notivoxId: "cap4-crearse-herida" },
    { progreso: 0.72, notivoxId: "cap4-reflex-silencio" },
    { progreso: 0.93, notivoxId: "cap4-cultivox-todo-cambia" },
];

const eventosCapitulo5 = [
    { progreso: 0.04, notivoxId: "cap5-crearse-infancia" },
    { progreso: 0.24, notivoxId: "cap5-reflex-juego" },
    { progreso: 0.48, notivoxId: "cap5-cultivox-novia-sandro" },
    { progreso: 0.72, notivoxId: "cap5-reflex-infancia" },
    { progreso: 0.93, notivoxId: "cap5-crearse-carta" },
];

const eventosCapitulo6 = [
    { progreso: 0.04, notivoxId: "cap6-reflex-memoria" },
    { progreso: 0.24, notivoxId: "cap6-crearse-luz" },
    { progreso: 0.48, notivoxId: "cap6-cultivox-antologia" },
    { progreso: 0.72, notivoxId: "cap6-reflex-cambio" },
    { progreso: 0.93, notivoxId: "cap6-diario-cierre" },
];
const eventosPorCapitulo = {
    1: eventosCapitulo1,
    2: eventosCapitulo2,
    3: eventosCapitulo3,
    4: eventosCapitulo4,
    5: eventosCapitulo5,
    6: eventosCapitulo6,
};

// #endregion datos para notivox =========================================

/* >=============== ( Archivos de video ) ===============< */

const MEDIA_RELEASE_BASE = "https://github.com/cardonero34/Pagina-proyecto-Leerse/releases/download/media-v1";

const videos = [
    `${MEDIA_RELEASE_BASE}/Cap1-Cielo.mp4`,
]

// #region Archivos fuente de Capitulos ===>>>
const secuenciaCapitulos = [
    { intro: `${MEDIA_RELEASE_BASE}/Cap1-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap1-Capitulo.mp4` },
    { intro: `${MEDIA_RELEASE_BASE}/Cap2-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap2-Capitulo.mp4` },
    { intro: `${MEDIA_RELEASE_BASE}/Cap3-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap3-Capitulo.mp4` },
    { intro: `${MEDIA_RELEASE_BASE}/Cap4-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap4-Capitulo.mp4` },
    { intro: `${MEDIA_RELEASE_BASE}/Cap5-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap5-Capitulo.mp4` },
    { intro: `${MEDIA_RELEASE_BASE}/Cap6-Intro.mp4`, capitulo: `${MEDIA_RELEASE_BASE}/Cap6-Capitulo.mp4` },
];

const sinopsisCapitulos = [
    { titulo: "El umbral", texto: "Una noche fría, sola en una banca del Parque Sarmiento, Camila sabe que no puede volver atrás. Cuando un grupo de travestis emerge bajo un farol, debe elegir entre acercarse, huir o quedarse mirando." },
    { titulo: "Las malas", texto: "Guiada por quienes no le hacen preguntas, Camila llega a la Pensión Rosa y conoce a la Tía Encarna. Entre risas y música descubre que el refugio también se construye con quienes conocen las mismas heridas." },
    { titulo: "Aprender a vivir", texto: "La calle se vuelve escuela: códigos que nadie enseña, decisiones en segundos y un cuidado que se aprende en compañía. Sobrevivir deja de ser un acto solitario para convertirse en algo compartido." },
    { titulo: "La herida", texto: "Cuando Camila cree haber encontrado un lugar donde existir sin esconderse, la violencia irrumpe. Entre sonidos y fragmentos, la pérdida se vuelve memoria de toda una comunidad." },
    { titulo: "La niña", texto: "Las calles de Córdoba dan paso a los recuerdos de una infancia hecha de silencio. Entre objetos y escenas pequeñas, tú decides qué conservar para entender cómo comenzó todo." },
    { titulo: "La luz", texto: "Frente a un cuaderno en blanco, Camila mira su historia desde la calma y comprende que escribir es resistir. Lo que cada usuario decide guardar es lo que mantiene viva la luz, como una luciérnaga en la noche." },
];

const videoConclusion = `${MEDIA_RELEASE_BASE}/Cap6-Conclusion.mp4`;

const interaccionesPorCapitulo = {
    1: { Componente: Interacciones, callback: "onMoonClick" },
    2: { Componente: Interacciones2, callback: "onLuciernagaClick" },
    3: { Componente: Interacciones, callback: "onMoonClick" },
    4: { Componente: Interacciones2, callback: "onLuciernagaClick" },
    5: { Componente: Interacciones, callback: "onMoonClick" },
    6: { Componente: Interacciones2, callback: "onLuciernagaClick" },
};
// #endregion Archivos fuente de Capitulos ===>>>

export const Animation = () => {

    // #region tutorial y banner de navegación ========================================>>>>>>>>>>
    const [mostrarTutorial, setMostrarTutorial] = useState(true);

    useEffect(() => {
        if (!mostrarTutorial) return;

        const html = document.documentElement;
        const body = document.body;
        const overflowHtmlAnterior = html.style.overflow;
        const overflowBodyAnterior = body.style.overflow;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            html.style.overflow = overflowHtmlAnterior;
            body.style.overflow = overflowBodyAnterior;
        };
    }, [mostrarTutorial]);

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


    /* capitulo recibido para las tarjet de home */

    const location = useLocation();
    const capituloRecibido = Number(location.state?.capitulo);

    const capituloInicial =
        Number.isInteger(capituloRecibido) &&
            capituloRecibido >= 1 &&
            capituloRecibido <= 6
            ? capituloRecibido
            : 0;

    // #region Capitulos
    const [capituloActual, setCapituloActual] = useState(capituloInicial);
    const [etapa, setEtapa] = useState("interaccion");
    const [srcVideoActual, setSrcVideoActual] = useState(videos[0]);

    const cambiarFuente = (src, nuevaEtapa) => {
        videoRef.current?.pause();
        setPlaying(false);
        setFadeVideo(true);
        setTimeout(() => {
            setNotify(false);
            setProgress(0);
            setCurrentTime(0);
            setEventosMostrados([]);
            setEtapa(nuevaEtapa);
            setSrcVideoActual(src);
        }, 700);
    };

    const iniciarCapitulo = (numeroCapitulo) => {
        const capitulo = secuenciaCapitulos[numeroCapitulo - 1];

        if (!capitulo || !capitulo.intro || capitulo.intro === "#") return;

        setCapituloActual(numeroCapitulo);
        setEtapa("intro");
        cambiarFuente(capitulo.intro, "intro");
    };

    const iniciarConclusion = () => {
        if (videoConclusion === "#") return;
        cambiarFuente(videoConclusion, "conclusion");
    };

    const numeroCapituloInteraccion =
        capituloActual === 0 ? 1 : capituloActual;

    const renderInteraccionCapitulo = () => {
        const configuracion =
            interaccionesPorCapitulo[numeroCapituloInteraccion];

        if (!configuracion) return null;

        const ComponenteInteraccion = configuracion.Componente;

        return (
            <ComponenteInteraccion
                {...{
                    [configuracion.callback]: () =>
                        iniciarCapitulo(numeroCapituloInteraccion),
                }}
            />
        );
    };

    // #endregion Capitulos

    // #region notificaciones ========================================>>>>>>>>>>

    /* Notivox actualmente visible */
    const [notivoxActual, setNotivoxActual] = useState(null);

    const [postipAbierto, setPostipAbierto] = useState(false);
    const [reflexivoxSeleccionado, setReflexivoxSeleccionado] = useState(null);

    const [crearseSeleccionado, setCrearseSeleccionado] = useState(null);
    const [crearseDesdeNotivox, setCrearseDesdeNotivox] = useState(false);

    /*_________________________________________ Historial Diario __________________________________ */

    const [historialCultivox, setHistorialCultivox] = useState([]);
    const [historialReflexivox, setHistorialReflexivox] = useState([]);
    const [historialPostip, setHistorialPostip] = useState([]);
    const [historialCreaciones, setHistorialCreaciones] = useState([]);

    const guardarCultivox = () => {
        if (!notivoxActual) return;

        setHistorialCultivox(prev => {
            const existe = prev.some(item => item.id === notivoxActual.id);
            return existe ? prev : [...prev, notivoxActual];
        });

        setNotify(false);
    };

    const responderReflexivox = () => {
        if (!notivoxActual) return;

        setReflexivoxSeleccionado(notivoxActual);
        setPostipAbierto(true);
        setNotify(false);
    }

    const cerrarPostip = () => {
        setPostipAbierto(false);
        setReflexivoxSeleccionado(null);
    };

    const abrirCrearse = () => {
        if (!notivoxActual) return;

        setCrearseSeleccionado(notivoxActual);
        setCrearseDesdeNotivox(true);
        setNotify(false);
    };

    const manejarAccionNotivox = () => {
        if (!notivoxActual) return;

        if (notivoxActual.tipo === "reflexivox") {
            responderReflexivox();
            return;
        }

        if (notivoxActual.tipo === "crearse") {
            abrirCrearse();
            return;
        }

        if (notivoxActual.tipo === "diariovox") {
            setOpenDiary(true);
            setNotify(false);
        }
    };

    const recibirRespuestaPostip = (respuesta) => {

        console.log("RESPUESTA RECIBIDA DESDE POSTIP:", respuesta);

        // Si la respuesta corresponde a un Reflexivox
        if (reflexivoxSeleccionado) {

            const nuevaRespuesta = {
                ...reflexivoxSeleccionado,
                respuesta: respuesta
            };

            setHistorialReflexivox(prev => [
                ...prev,
                nuevaRespuesta
            ]);

        } else {

            // Si no hay Reflexivox seleccionado,
            // se trata como un Postip libre
            const nuevoPostip = {
                id: `postip-${Date.now()}`,
                texto: respuesta
            };

            setHistorialPostip(prev => [
                ...prev,
                nuevoPostip
            ]);
        }

        setPostipAbierto(false);
        setReflexivoxSeleccionado(null);
    };

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

    // ================== Estado y funciones de finalización de video==================
    const handleVideoEnded = () => {
        if (etapa === "intro") {
            const capitulo = secuenciaCapitulos[capituloActual - 1];
            if (!capitulo) return;
            cambiarFuente(capitulo.capitulo, "capitulo");
            return;
        }

        if (etapa === "capitulo") {
            if (capituloActual < 6) {
                setCapituloActual(capituloActual + 1);
                cambiarFuente(videos[0], "interaccion");
            } else {
                cambiarFuente(videos[0], "interaccionFinal");
            }
            return;
        }

        if (etapa === "conclusion") {
            setCapituloActual(0);
            cambiarFuente(videos[0], "interaccion");
        }
    };

    // ================== Fin finalización de video ==================

    // ================== Estado y funciones de mute/volumen ==================
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(1)

    const handleToggleMute = () => {
        const nuevoMuted = !videoRef.current.muted;
        videoRef.current.muted = nuevoMuted;
        setMuted(nuevoMuted);
        setSilencioUsuario(nuevoMuted);
    };

    const [silencioUsuario, setSilencioUsuario] = useState(false);

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value)
        videoRef.current.volume = val
        setVolume(val)
        if (val === 0) {
            videoRef.current.muted = true;
            setMuted(true);
            setSilencioUsuario(true);
        } else {
            videoRef.current.muted = false;
            setMuted(false);
            setSilencioUsuario(false);
        }
    }

    const volIcon = muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'
    // ================== Fin mute/volumen ==================


    // ================== Estado y funciones de tiempo/progreso ==================
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const progresoRecorrido =
        etapa === "interaccionFinal" || etapa === "conclusion"
            ? 100
            : capituloActual === 0
                ? 0
                : ((capituloActual - 1 + (etapa === "capitulo" ? progress / 100 : 0)) / 6) * 100;

    const etapaFinalizada =
        etapa === "interaccionFinal" || etapa === "conclusion";

    const progresoAnteriorAlCapitulo =
        etapaFinalizada
            ? (5 / 6) * 100
            : Math.max(0, ((capituloActual - 1) / 6) * 100);

    const mostrarFraccionActivaVerde =
        etapa === "capitulo" || etapaFinalizada;

    const handleAvanzar = () => {
        videoRef.current.currentTime = 6
    }

    const handleProgressChange = (e) => {
        const video = videoRef.current;

        if (etapa !== "capitulo" || !video?.duration) return;

        const progresoCapitulo = parseFloat(e.target.value);

        setProgress(progresoCapitulo);
        video.currentTime = (progresoCapitulo / 100) * video.duration;
    };

    /* Notificación/mensaje __________________________(ANOTACION) "Estado de recorrido de video"*/

    const handleTimeUpdate = () => {
        const vid = videoRef.current
        if (!vid) return

        setCurrentTime(vid.currentTime);
        if (etapa !== "capitulo") return;
        if (vid.duration) {
            setProgress((vid.currentTime / vid.duration) * 100);
        }

        // Las Notivox se programan proporcionalmente a la duración de cada capítulo.
        const eventosDelCapitulo = eventosPorCapitulo[capituloActual] ?? [];

        const evento = eventosDelCapitulo.find(
            (item) =>
                vid.duration &&
                vid.currentTime >= vid.duration * item.progreso &&
                !eventosMostrados.includes(item.notivoxId)
        );

        if (evento) {

            vid.pause();

            /*
             * Buscamos el Notivox correspondiente
             * dentro de la base general.
             */
            const notivoxEncontrado = notivox.find(

                item => item.id === evento.notivoxId

            );
            console.log("NOTIVOX MOSTRADA:", notivoxEncontrado);

            if (!notivoxEncontrado) {
                console.warn(
                    "No se encontró el Notivox:",
                    evento.notivoxId
                );

                return;
            }

            setNotivoxActual(notivoxEncontrado);

            setNotify(true);

            setEventosMostrados(prev => [...prev, evento.notivoxId]);
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

        const esInterfaz =
            etapa === "interaccion" || etapa === "interaccionFinal";
        video.loop = esInterfaz;

        const silenciarVideo =
            esInterfaz || silencioUsuario || volume === 0;

        video.muted = silenciarVideo;
        setMuted(silenciarVideo);

        video.play().catch((error) => {
            if (error.name !== "NotAllowedError") {
                console.error("No se pudo reproducir el video:", error);
            }
            setPlaying(false);
        });

        setFadeVideo(false);
    };
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

    useEffect(() => {
        const manejarEspacio = (event) => {
            if (event.code !== "Space" && event.key !== " ") return;

            const elemento = event.target;
            if (
                elemento instanceof HTMLElement &&
                elemento.closest("input, textarea, select, button, a, [contenteditable='true']")
            ) {
                return;
            }

            if (!["intro", "capitulo", "conclusion"].includes(etapa)) return;

            event.preventDefault();
            if (event.repeat) return;

            const video = videoRef.current;
            if (!video) return;

            if (video.paused) {
                if (Notify) setNotify(false);

                video.play().catch(() => {
                    setPlaying(false);
                });
            } else {
                video.pause();
            }
        };

        window.addEventListener("keydown", manejarEspacio);

        return () => {
            window.removeEventListener("keydown", manejarEspacio);
        };
    }, [etapa, Notify]);

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
                    <div className="tutorial-overlay position-fixed top-0 start-50 translate-middle-x d-flex align-items-center justify-content-center">

                        {/* Botón omitir */}
                        <button
                            type="button"
                            className="tutorial-skip position-absolute top-0 end-0 m-3 p-2 rounded-3 text-white border-0"
                            onClick={() => setMostrarTutorial(false)}
                            aria-label="Cerrar tutorial"
                        >
                            cerrar ✕
                        </button>

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

                        style={{ top: "50vh", y: "-50%" }}
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
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 1 }}
                            className="user-container d-flex align-items-center justify-content-center rounded-4 shadow">
                            <a href="/modelo-3d" aria-label="Abrir el visor del modelo 3D">
                                <img className='p-2' src="/iconos/icono-perfil.png" alt="Modelo 3D" style={{ width: '80px' }} />
                            </a>
                        </motion.div>
                        <div

                            className="links-container d-flex flex-column align-items-center justify-content-center rounded-4 shadow">
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 1 }} className='p-2' src="/iconos/icono-animacion.png" style={{ width: '80px' }} />
                            <a
                                href="https://cardonero34.github.io/revistaleerse/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Abrir Revista Leersé en una pestaña nueva"
                            >
                                <motion.img
                                    whileHover={{ scale: 0.9 }}
                                    whileTap={{ scale: 1 }}
                                    className='p-2'
                                    src="/iconos/icono-massobreleerse.png"
                                    alt="Revista Leersé"
                                    style={{ width: '80px', cursor: 'pointer' }}
                                />
                            </a>
                            <a
                                href="https://canva.link/manual-maestro-leerse"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Abrir el manual maestro de Leersé en una pestaña nueva"
                            >
                                <motion.img
                                    whileHover={{ scale: 0.9 }}
                                    whileTap={{ scale: 1 }}
                                    className='p-2'
                                    src="/iconos/icono-info.png"
                                    alt="Información"
                                    style={{ width: '80px', cursor: 'pointer' }}
                                />
                            </a>
                        </div>
                    </motion.div>


                    <div className="content d-flex flex-column align-items-center justify-content-center gap-4">

                        {/* barra de progreso */}
                        <div className="progress-container shadow d-flex flex-column align-items-center justify-content-center position-relative">
                            <div className="progress p-1"
                                role="progressbar"
                                aria-label="Example with label"
                                aria-valuenow={progresoRecorrido}
                                aria-valuemin="0"
                                aria-valuemax="100">
                                <div
                                    className="progress p-1 position-relative"
                                    role="progressbar"
                                    aria-label="Progreso de capítulos"
                                    aria-valuenow={progresoRecorrido}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div
                                        className="progress-bar rounded"
                                        style={{ width: `${progresoAnteriorAlCapitulo}%` }}
                                    />

                                    {mostrarFraccionActivaVerde && (
                                        <div
                                            className="progress-bar-current rounded"
                                            style={{
                                                left: `${progresoAnteriorAlCapitulo}%`,
                                                width: `${Math.max(
                                                    0,
                                                    progresoRecorrido - progresoAnteriorAlCapitulo
                                                )}%`,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* control progreso */}
                            <div
                                className="progressRow position-absolute z-3"
                                style={{
                                    left: etapa === "capitulo"
                                        ? `${((capituloActual - 1) / 6) * 100}%`
                                        : "0%",
                                    width: etapa === "capitulo" ? `${100 / 6}%` : "0%",
                                }}
                            >
                                <input
                                    type="range"
                                    className="progressInput w-100"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={progress}
                                    disabled={etapa !== "capitulo"}
                                    aria-label={`Buscar dentro del capítulo ${capituloActual}`}
                                    onChange={handleProgressChange}
                                />
                            </div>

                            <div className="capitulos position-absolute d-flex align-items-center justify-content-between w-100">
                                {Array.from({ length: 6 }, (_, indice) => {
                                    const numero = indice + 1;

                                    return (
                                        <button
                                            key={numero}
                                            type="button"
                                            className="chapterMarker containerNum rounded-5 d-flex align-items-center justify-content-center"
                                            onClick={() => iniciarCapitulo(numero)}
                                            aria-label={`Ir al inicio del capítulo ${numero}`}
                                            title={`Ir al capítulo ${numero}`}
                                        >
                                            <img
                                                src={`/iconos/icono-num${numero}.png`}
                                                style={{ width: "30px" }}
                                                alt=""
                                            />
                                        </button>
                                    );
                                })}
                                <div
                                    className="containerNum rounded-5 d-flex align-items-center justify-content-center"
                                    aria-label="Culminación"
                                    title="Culminación"
                                >
                                    <span role="img" aria-label="Completado" style={{ fontSize: "24px", fontWeight: "bold" }}>
                                        ✓
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="reproductor d-flex align-items-center justify-content-center rounded-4 mt-2 shadow">
                            <div className="containerVideo position-relative w-100 h-100 d-flex align-items-center justify-content-center rounded-4 p-3 overflow-hidden">


                                {/* aqui va el archivo mp4 */}
                                <VideoLasMalas
                                    videoRef={videoRef}
                                    src={srcVideoActual}
                                    handleTimeUpdate={handleTimeUpdate}
                                    handleLoadedMetadata={handleLoadedMetadata}
                                    handleVideoEnded={handleVideoEnded}
                                    setPlaying={setPlaying}
                                />

                                {/* herramientas superpuestas */}
                                <div className='video-container d-flex align-items-center justify-content-center position-relative'>

                                    {etapa === "interaccion" && renderInteraccionCapitulo()}

                                    {etapa === "interaccionFinal" && (
                                        <Interacciones2
                                            onLuciernagaClick={iniciarConclusion}
                                        />
                                    )}

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
                                                    notivox={notivoxActual}
                                                    onGuardar={guardarCultivox}
                                                    onAccion={manejarAccionNotivox}
                                                    onContinuar={handleContinuar}
                                                >
                                                </Notificacion>
                                            )
                                        }
                                    </AnimatePresence>

                                    {/* herramientas funcionalidades */}
                                    <Herramientas
                                        postipAbierto={postipAbierto}
                                        reflexivoxSeleccionado={reflexivoxSeleccionado}
                                        crearseSeleccionado={crearseSeleccionado}
                                        crearseDesdeNotivox={crearseDesdeNotivox}
                                        onEnviarPostip={recibirRespuestaPostip}
                                        onAbrirCrearse={abrirCrearse}
                                        onCerrarPostip={cerrarPostip}
                                        onGuardarCreacion={(creacion) => {
                                            console.log("CREACIÓN RECIBIDA EN ANIMATION:", creacion);

                                            const nuevaCreacion = {
                                                ...creacion,
                                                id: creacion.id || `creacion-${Date.now()}`,
                                                tipo: "creacion",
                                                origen: creacion.origen || (crearseDesdeNotivox ? "crearse" : "manual"),
                                                notivoxId: crearseSeleccionado?.id || null,
                                                formato: creacion.formato || crearseSeleccionado?.formato || "texto",
                                                descripcion:
                                                    creacion.descripcion ||
                                                    crearseSeleccionado?.texto ||
                                                    "Creación realizada por el usuario."
                                            };

                                            setHistorialCreaciones(prev => [
                                                ...prev,
                                                nuevaCreacion
                                            ]);

                                            console.log("HISTORIAL DE CREACIONES:", nuevaCreacion);

                                            setCrearseSeleccionado(null);
                                            setCrearseDesdeNotivox(false);
                                        }}
                                    />

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
                                                className="container-HerrRep position-absolute top-0 start-50 translate-middle-x rounded-4 p-2 d-flex gap-2 z-3 d-flex align-items-center justify-content-center"
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
                                                <div onClick={handleFullscreen} className="expandir rounded-3 d-flex justify-content-center aling-items-center pt-1">⛶</div>

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
                                                    historialCultivox={historialCultivox}
                                                    historialReflexivox={historialReflexivox}
                                                    historialPostip={historialPostip}
                                                    historialCreaciones={historialCreaciones}
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
                            <div className="sinopsis-contenido w-100">
                                <h3 className="sinopsis-titulo mb-3">
                                    Capítulo {capituloActual || 1}: {sinopsisCapitulos[(capituloActual || 1) - 1].titulo}
                                </h3>
                                <TextType
                                    key={capituloActual || 1}
                                    text={sinopsisCapitulos[(capituloActual || 1) - 1].texto}
                                    as="span"
                                    className="sinopsis-texto"
                                    active={true}
                                    startOnVisible={false}
                                    loop={false}
                                    typingSpeed={1}
                                    deletingSpeed={10}
                                    pauseDuration={2000}
                                    typeEffect="blur"
                                    cursorBlinkDuration={0.6}
                                    cursorStyle="character"
                                    preset="editor"
                                    deleteMode="select"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
