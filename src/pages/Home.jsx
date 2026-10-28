import { CardPersonajes } from "../components/CardPersonajes"
import { Encabezados } from "../components/Encabezados"
import { Footer } from "../components/Footer"
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "../components/Nav"
import { Galeria } from "../components/Galeria";
import "../stylesheets/Home.css"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { Marquee } from "../components/Marquee";

// #region REACTBITS ==>>
import SplitTextEffect from "../components/REACTBITS/SplitText";
import GradualBlur from "../components/REACTBITS/GradualBlur";
import Noise from "../components/REACTBITS/Noise";
import GhostCursor from "../components/REACTBITS/GhostCursor";
import TearTicket from "../components/REACTBITS/TearTicket";
import Particles from "../components/REACTBITS/Particles";
import FlexCarousel from "../components/REACTBITS/FlexCarousel";
import CircularCarousel from "../components/REACTBITS/CircularCarousel";
import TextType from "../components/REACTBITS/TextType";
import HalftoneReveal from "../components/REACTBITS/HalftoneReveal";
import ChromaVideo from "../components/REACTBITS/ChromaVideo";
import FolderFloat from "../components/REACTBITS/FolderFloat";
import HoloCard from "../components/REACTBITS/HoloCard";
import ImageTrail from "../components/REACTBITS/ImageTrail";
// #endregion REACTBITS ==>>

gsap.registerPlugin(SplitText);

const nubesActyrec = ["/nube3.png", "/nube1.png", "/nube2.png", "/nube2.png", "/nube1.png", "/nube3.png", "/nube3.png", "/nube1.png", "/nube2.png", "/nube2.png", "/nube1.png", "/nube3.png",];

export const Home = () => {

    /* para cerrar modal y eliminar bug de renderizado al cambio de pagina */

    const navigate = useNavigate();

    const entrarAnimacion = () => {
        const modalElement = document.getElementById("loginModal");
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

        modalElement.addEventListener(
            "hidden.bs.modal",
            () => {

                // Eliminar cualquier backdrop que haya quedado
                document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

                // Limpiar clases del body
                document.body.classList.remove("modal-open");
                document.body.style.removeProperty("padding-right");
                document.body.style.removeProperty("overflow");

                navigate("/animacion");
            },
            { once: true }
        );

        modal.hide();
    };

    const irACapitulo = (indice) => {
        if (preparandoCapitulo) return;

        setPreparandoCapitulo(true);

        window.setTimeout(() => {
            navigate("/animacion", {
                state: { capitulo: indice + 1 },
            });
        }, 1000);
    };

    /* pantalla de carga */
    const [homeReady, setHomeReady] = useState(false);
    const [particlesReady, setParticlesReady] = useState(false);
    const [preparandoCapitulo, setPreparandoCapitulo] = useState(false);
    const [categoriaComentario, setCategoriaComentario] = useState("");
    const [estadoComentario, setEstadoComentario] = useState("");
    const [enviandoComentario, setEnviandoComentario] = useState(false);

    const handleEnviarComentario = async (event) => {
        event.preventDefault();
        if (enviandoComentario) return;

        if (!categoriaComentario) {
            setEstadoComentario("Selecciona qué tipo de huella quieres dejar.");
            return;
        }

        const form = event.currentTarget;
        const datos = new FormData(form);
        const comentario = String(datos.get("comentario") || "").trim();
        const nombre = String(datos.get("nombre") || "").trim();
        const correo = String(datos.get("correo") || "").trim();

        if (!comentario || !correo) {
            setEstadoComentario("Completa tu mensaje y tu correo para poder enviarlo.");
            return;
        }

        const fechaHora = new Intl.DateTimeFormat("es-CO", {
            timeZone: "America/Bogota",
            dateStyle: "full",
            timeStyle: "medium",
        }).format(new Date());
        const asunto = `Huella Leersé · ${categoriaComentario}`;

        setEnviandoComentario(true);
        setEstadoComentario("Enviando tu huella...");

        try {
            const respuesta = await fetch("https://formsubmit.co/ajax/produccionmultimediaemanuel@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: nombre || "Anónimo",
                    email: correo,
                    _replyto: correo,
                    _subject: asunto,
                    tipo: categoriaComentario,
                    fecha_hora: fechaHora,
                    message: comentario,
                }),
            });
            const resultado = await respuesta.json().catch(() => null);
            const envioConfirmado = resultado?.success === true || resultado?.success === "true";

            if (!respuesta.ok || !envioConfirmado) {
                const detalle = resultado?.message || resultado?.error || `El servicio respondió con estado ${respuesta.status}.`;
                throw new Error(detalle);
            }

            form.reset();
            setCategoriaComentario("");
            setEstadoComentario("¡Gracias por dejar tu huella! Tu mensaje fue enviado al equipo de Leersé. Si es el primer envío, confirma la activación desde el correo que recibirá esta bandeja.");
        } catch (error) {
            console.error("Error al enviar la huella a FormSubmit:", error);
            const detalle = error instanceof TypeError
                ? "No se pudo conectar con el servicio de correo. Revisa la conexión o inténtalo más tarde."
                : error?.message || "Inténtalo de nuevo en unos minutos.";
            setEstadoComentario(`No se pudo enviar tu huella. ${detalle}`);
        } finally {
            setEnviandoComentario(false);
        }
    };    useEffect(() => {
        let activo = true;

        const prepararPortada = async () => {
            const imagenPortada = new Image();
            imagenPortada.src = "/imgportada.jpg";

            await Promise.all([
                document.fonts.load("700 70px Crimson").catch(() => { }),
                document.fonts.load("300 italic 30px Lato").catch(() => { }),
                imagenPortada.decode().catch(() => { }),
            ]);

            await new Promise((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
            });

            if (activo) setHomeReady(true);
        };

        prepararPortada();

        return () => {
            activo = false;
        };
    }, []);

    useEffect(() => {
        if (!homeReady) return;

        const section = animacionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            setParticlesReady(true);
            observer.disconnect();
        }, { rootMargin: "200px 0px" });

        observer.observe(section);
        return () => observer.disconnect();
    }, [homeReady]);

    /* secciones */
    const problemaRef = useRef(null);
    const acercadeRef = useRef(null);
    const animacionRef = useRef(null);
    const capitulosRef = useRef(null);
    const beneficiosRef = useRef(null);
    const comunidadRef = useRef(null);

    const scrollToProblema = () => {
        problemaRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToAcercade = () => acercadeRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToAnimacion = () => animacionRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToCapitulos = () => capitulosRef.current?.scrollIntoView({ behavior: "smooth" });
    const scrollToBeneficios = () => beneficiosRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToComunidad = () => comunidadRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToPropuesta = () => propuestaRef.current?.scrollIntoView({ behavior: "smooth" });
    /* puntero polillas  */

    const polillasRef = useRef(null);

    useEffect(() => {
        const polillas = polillasRef.current;

        // Centrar el flair
        gsap.set(polillas, { xPercent: -50, yPercent: -50 });

        // Crear funciones rápidas para mover en X e Y
        const xTo = gsap.quickTo(polillas, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(polillas, "y", { duration: 0.6, ease: "power3" });

        // Listener de mousemove
        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup al desmontar
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    /* texto animado */

    /* const charsRef = useRef(null); */
    const chars2Ref = useRef(null);
    /* const wordsRef = useRef(null); */
    const linesRef = useRef(null);

    useEffect(() => {

        // --- Animación por caracteres 2 ---
        const splitChars2 = new SplitText(chars2Ref.current, { type: "chars,words,lines", charsClass: "title" });

        gsap.from(splitChars2.chars, {
            y: 100,
            color: "#ffffff",
            opacity: 0,
            delay: 1,
            stagger: 0.02,
        })

        // --- Animación por líneas ---
        const splitLines = new SplitText(linesRef.current, { type: "lines", charsClass: "parraf" });
        gsap.from(splitLines.lines, {
            rotationX: -100,
            transformOrigin: "50% 50% -160px",
            opacity: 0,
            duration: 0.8,
            ease: "power3",
            stagger: 0.25,
        });

        // Limpieza al desmontar
        return () => {
            /* splitChars.revert(); */
            splitChars2.revert();
            /* splitWords.revert(); */
            splitLines.revert();
        };
    }, []);

    const [ticketIndex, setTicketIndex] = useState(0);
    const [ticketCycle, setTicketCycle] = useState(0);
    const ticketTimerRef = useRef(null);
    const hasEnteredProblemaRef = useRef(false);

    const avanzarTarjeta = () => {
        ticketTimerRef.current = window.setTimeout(() => {
            setTicketIndex((index) =>
                Math.min(index + 1, tarjetasProblema.length - 1)
            );
            ticketTimerRef.current = null;
        }, 800);
    };

    /* tarjetas del problema */

    const tarjetasProblema = [
        {
            image: "./img4-problema.png",
            kicker: "Queremos encontrar nuevas ",
            title: "formas de hacer que una",
            text: "Historia llegue hasta ti",
            stubTitle: "Leersé",
            stubText: "Desprende para continuar",
        },
        {
            image: "./imgT2.png",
            kicker: "",
            title: "No buscamos",
            text: "Reemplazar los libros.",
            stubTitle: "Leersé",
            stubText: "Sigue desprendiendo",
        },
        {
            image: "./imgT1.png",
            kicker: "Queremos abrir",
            title: "nuevas puertas.",
            text: "hacia la lectura.",
            stubTitle: "Leersé",
            stubText: "Sigue desprendiendo",
        },
        {
            image: "./img3-problema.png",
            kicker: "No buscamos",
            title: "convertirt la lectura.",
            text: "En una pantalla.",
            stubTitle: "Leersé",
            stubText: "Sigue desprendiendo",
        },
        {
            image: "./img1-problema.png",
            kicker: "Queremos explorar",
            title: "qué puede construirse cuando la literatura",
            text: "encuentra nuevos lenguajes",
            stubTitle: "Leersé",
            stubText: "Sigue desprendiendo",
        },
        {
            image: "./imgT7.png",
            kicker: "No buscamos",
            title: "que superficialmente te resguardes limitandote a",
            text: "ser expectador de una historia.",
            stubTitle: "Leersé",
            stubText: "Sigue desprendiendo",
        },
        {
            image: "./imagina.png",
            kicker: "Queremos que",
            title: "te permitas",
            text: "interpretar, responder y crear",
            stubTitle: "Leersé",
            stubText: "Desprende la última tarjeta",
        },

    ];

    const tarjeta = tarjetasProblema[
        Math.min(ticketIndex, tarjetasProblema.length - 1)
    ];

    useEffect(() => {
        const section = problemaRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                hasEnteredProblemaRef.current = true;
                return;
            }

            if (!hasEnteredProblemaRef.current) return;

            hasEnteredProblemaRef.current = false;
            window.clearTimeout(ticketTimerRef.current);
            ticketTimerRef.current = null;

            setTicketIndex(0);
            setTicketCycle((cycle) => cycle + 1);
        }, { threshold: 0 });

        observer.observe(section);

        return () => {
            observer.disconnect();
            window.clearTimeout(ticketTimerRef.current);
        };
    }, []);

    /* carrusel con escenarios */

    const imagenesComunidad = [
        { src: "./images/Escenarios/ESCENARY1.webp", alt: "Imagen 1", title: "Escenario 1" },
        { src: "./images/Escenarios/ESCENARY2.webp", alt: "Imagen 2", title: "Escenario 2" },
        { src: "./images/Escenarios/ESCENARY3.webp", alt: "Imagen 3", title: "Escenario 3" },
        { src: "./images/Escenarios/ESCENARY4.webp", alt: "Imagen 4", title: "Escenario 4" },
        { src: "./images/Escenarios/ESCENARY5.webp", alt: "Imagen 5", title: "Escenario 5" },
        { src: "./images/Escenarios/ESCENARY6.webp", alt: "Imagen 6", title: "Escenario 6" },
        { src: "./images/Escenarios/ESCENARY7.webp", alt: "Imagen 7", title: "Escenario 7" },
        { src: "./images/Escenarios/ESCENARY8.webp", alt: "Imagen 8", title: "Escenario 8" },
        { src: "./images/Escenarios/ESCENARY9.webp", alt: "Imagen 9", title: "Escenario 9" },
        { src: "./images/Escenarios/ESCENARY10.webp", alt: "Imagen 10", title: "Escenario 10" },
        { src: "./images/Escenarios/ESCENARY11.webp", alt: "Imagen 11", title: "Escenario 11" },
        { src: "./images/Escenarios/ESCENARY12.webp", alt: "Imagen 12", title: "Escenario 12" },
        { src: "./images/Escenarios/ESCENARY13.webp", alt: "Imagen 13", title: "Escenario 13" },
        { src: "./images/Escenarios/ESCENARY14.webp", alt: "Imagen 14", title: "Escenario 14" },
        { src: "./images/Escenarios/ESCENARY15.webp", alt: "Imagen 15", title: "Escenario 15" },
    ];

    const [carouselCycle, setCarouselCycle] = useState(0);
    const [carouselReady, setCarouselReady] = useState(false);
    const carouselSlotRef = useRef(null);
    const hasEnteredComunidadRef = useRef(false);

    useEffect(() => {
        const slot = carouselSlotRef.current;
        if (!slot) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                hasEnteredComunidadRef.current = true;
                setCarouselReady(true);
                return;
            }

            if (!hasEnteredComunidadRef.current) return;

            hasEnteredComunidadRef.current = false;
            setCarouselReady(false);
            setCarouselCycle((cycle) => cycle + 1);
        }, { rootMargin: "3500px 0px", threshold: 0 });

        observer.observe(slot);
        return () => observer.disconnect();
    }, []);

    /* carrusel con Capitulos */

    const imagenesCapitulos = [
        { src: "./images/PORTADAS_C/ROTULO1.webp", alt: "Imagen 1", title: "CAPITULO 1" },
        { src: "./images/PORTADAS_C/ROTULO2.webp", alt: "Imagen 2", title: "CAPITULO 2" },
        { src: "./images/PORTADAS_C/ROTULO3.webp", alt: "Imagen 3", title: "CAPITULO 3" },
        { src: "./images/PORTADAS_C/ROTULO4.webp", alt: "Imagen 4", title: "CAPITULO 4" },
        { src: "./images/PORTADAS_C/ROTULO5.webp", alt: "Imagen 5", title: "CAPITULO 5" },
        { src: "./images/PORTADAS_C/ROTULO6.webp", alt: "Imagen 6", title: "CAPITULO 6" },
    ];

    const registroCarruselRef = useRef(null);
    const [registroCarruselActivo, setRegistroCarruselActivo] = useState(false);

    useEffect(() => {
        const contenedor = registroCarruselRef.current;
        if (!contenedor) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setRegistroCarruselActivo(
                    entry.isIntersecting && entry.intersectionRatio >= 0.1
                );
            },
            { threshold: [0, 0.1], rootMargin: "0px" }
        );

        observer.observe(contenedor);
        return () => observer.disconnect();
    }, []);

    /* Parrafo de propuesta */

    const propuestaRef = useRef(null);
    const [acercadeEnVista, setAcercadeEnVista] = useState(false);
    const comentariosRef = useRef(null);
    const [comentariosEnVista, setComentariosEnVista] = useState(false);

    useEffect(() => {
        const seccion = propuestaRef.current;
        if (!seccion) return;

        const observer = new IntersectionObserver(
            ([entry]) => setAcercadeEnVista(entry.isIntersecting),
            { threshold: 0.15 }
        );

        observer.observe(seccion);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const seccion = comentariosRef.current;
        if (!seccion) return;

        const observer = new IntersectionObserver(
            ([entry]) => setComentariosEnVista(entry.isIntersecting),
            { threshold: 0.15 }
        );

        observer.observe(seccion);
        return () => observer.disconnect();
    }, []);
    /* items de las formas de Leersé  */

    const personajesFolderItems = [
        { label: "Entrar", value: "entrar", icon: "/play.png" },
        { label: "Historia", value: "historia", icon: "/iconB(3).png" },
        { label: "Explorar", value: "explorar", icon: "/iconos/icono-foto.png" },
        { label: "Interactuar", value: "interactuar", icon: "/iconB(1).png" },
        { label: "Reflexionar", value: "reflexionar", icon: "/iconB(6).png" },
        { label: "Crear", value: "crear", icon: "/iconos/crear.png" },
        { label: "Guardar", value: "guardar", icon: "/iconos/Guardado.png" },
        { label: "Diario", value: "diario", icon: "/iconos/diario.png" },
    ];

    return (
        <>
            <div>
                {(!homeReady || preparandoCapitulo) && (
                    <div className="home-preloader" role="status" aria-live="polite">
                        Preparando Leersé…
                    </div>
                )}

                {/* Modal de ingreso*/}
                <div className="contM">
                    <div
                        className="modal fade"
                        id="loginModal"
                        tabIndex="-1"
                        data-bs-backdrop="true"   // 👈 permite cerrar al hacer clic fuera
                        data-bs-keyboard="true"   // 👈 permite cerrar con la tecla Esc
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">

                                {/* Header con X */}
                                <div className="modal-header d-flex justify-content-center align-items-center">
                                    <h5 className="modal-title" id="loginModalLabel">Inicio de sesión</h5>
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0 m-3"
                                        data-bs-dismiss="modal"
                                        aria-label="Cerrar"
                                    ></button>
                                </div>

                                {/* Body */}
                                <div className="modal-body">
                                    <div className="w-100 d-flex flex-column gap-4">
                                        <div className="form-floating campoF">
                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Tu nombre" />
                                            <label className="leb" htmlFor="floatingPassword">Tu nombre</label>
                                        </div>
                                        <div className="form-floating campoF">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label className="leb" htmlFor="floatingInput">Tu correo electrónico</label>
                                        </div>

                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="modal-footer d-flex align-items-center justify-content-center gap-4">
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="button"
                                            className="btn1 rounded-3"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancelar
                                        </button>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn2 rounded-3"
                                            onClick={entrarAnimacion}
                                        >
                                            Entrar a Leersé
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* icono de seguimiento de mouse */}

                <div className="position-fixed z-3" style={{ pointerEvents: "none" }}>
                    <img style={{ width: "200px" }} ref={polillasRef} src="/polillas.png" />
                </div>

                <GradualBlur
                    position="top"
                    target="page"
                    height="12rem"
                    strength={2}
                    zIndex={2}
                />

                <GradualBlur
                    position="bottom"
                    target="page"
                    height="12rem"
                    strength={2}
                    zIndex={2}
                />

                <Noise
                    fixed
                    opacity={0.1}
                    flicker={0.5}
                    scratches={0.25}
                    scanlines={0.1}
                    dust={0.1}
                    zIndex={2}
                    fps={14}
                />

                <GhostCursor
                    color="#dfd2b8"
                    size={55}
                    turbulence={0.8}
                    bloomStrength={0.8}
                    detail={0.75}
                    brightness={0.2}
                    fadeDurationMs={1000}
                    grainIntensity={0.4}
                    inertia={0.7}
                    trailLength={18}
                    fadeDelayMs={0}
                    bloomRadius={0.8}
                    drift={0.05}
                    zIndex={2}
                    maxDevicePixelRatio={1.25}
                    targetPixels={400000}
                />

                {/* barra de navegación */}
                <motion.div
                    initial={{
                        scale: 0.5,
                        transition: { duration: 0.4 },
                        opacity: 0,
                        y: -50,
                    }}
                    whileInView={{
                        opacity: 100,
                        y: -10,
                        scale: 1
                    }}
                    whileHover={{
                        transition: { duration: 0.4 }
                    }}
                    transition={{ duration: 0.4 }}

                    className="position-fixed start-0 top-0 w-100 z-3">
                    <Nav
                        onProblemaClick={scrollToProblema}
                        onPropuestaClick={scrollToPropuesta}
                        onAnimacionClick={scrollToAnimacion}
                        onBeneficiosClick={scrollToBeneficios}
                        onComunidadClick={scrollToComunidad}
                    />
                </motion.div>

                {/* portada */}
                <section className="portada position-relative d-flex justify-content-center align-items-center over overflow-hidden z-1">
                    {/* fondo img */}
                    <motion.img
                        initial={{ opacity: 0, y: -300, scale: 1.4 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src="/imgportada.jpg"
                        className="object-fit-cover position-absolute w-100 h-100"
                    />

                    {/* texto y botones */}
                    <div className="position-absolute top-50 start-50 translate-middle w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <h1 ref={chars2Ref} className="title" >¿Y si leer no fuera solamente leer?</h1>
                            <p ref={linesRef} className="parraf">Una historia puede comenzar en una página. Lo que sucede después depende de ti.</p>
                        </div>

                        <div className="row w-75 d-flex justify-content-center align-items-center mb-5">
                            <div className="col-lg-6 col-md-8 my-2">
                                <motion.button
                                    initial={{ scale: 1.1, opacity: 0 }}
                                    whileHover={{ scale: 1.05, }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: { duration: 0.5 }
                                    }}
                                    type="button" className="btn2 rounded-3 shadow"
                                    onClick={scrollToCapitulos}>Entrar a Leersé</motion.button>
                            </div>
                            <div className="col-lg-6 col-md-8 my-2">
                                <motion.button
                                    initial={{ scale: 1.1, opacity: 0 }}
                                    whileHover={{ scale: 1.05, }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: { duration: 0.5 }
                                    }}
                                    type="button" className="btn3 rounded-3 shadow"
                                    onClick={scrollToAcercade}>Saber más</motion.button>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>

                </section>

                {/* Pregunta */}
                <section id="acercade" ref={acercadeRef} className="pregunta position-relative d-flex justify-content-center align-items-center overflow-visible z-1">
                    <motion.img
                        className="DECORS libro-1"
                        src="/SVG/Lampara (1).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: -90, y: 35, scaleX: -1 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scaleX: -1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.img
                        className="DECORS libro-2"
                        src="/SVG/Lampara (1).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 90, scaleY: -1 }}
                        whileInView={{ opacity: 1, x: 0, scaleY: -1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                    />
                    <img className="decor-1 opacity-50 " src="/formas-decorativas-03.png" alt="" />
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5 z-0">
                        <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
                            <Encabezados
                                titulo={<SplitTextEffect
                                    text={"¿Cuándo fue la última vez que una historia se quedó contigo?"}
                                    effect="blur"
                                    ease="bounce.out"
                                    color="#E0D0EC"
                                    tag="span"
                                    trigger="hover"
                                    hoverEffect="lift"
                                />}
                                descripcion="No hablamos solamente de terminar un libro. Hablamos de aquello que permanece después."
                                efectoHalftone
                            />
                        </div>

                        <h2 className="subProp text-center">La lectura puede continuar después <br /> de la última página.</h2>

                    </div>
                    <img className="decor0 opacity-50" src="/formas-decorativas-03.png" alt="" />
                </section>

                {/* problema */}
                <section id="problema" ref={problemaRef} className="problema position-relative d-flex justify-content-center align-items-center">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador0 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center ">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={<SplitTextEffect
                                text={"No queremos hacerte leer más."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}
                                descripcion={""} />
                        </div>
                        <div className="w-100 d-flex flex-row justify-content-center align-items-center py-5 problema-nubes">
                            <motion.img
                                className="nube nube-1"
                                src="/nube3.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut" } }}
                                decoding="async"
                                loading="lazy"
                            />
                            <motion.img
                                className="nube nube-2"
                                src="/nube2.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut", delay: 0.15 } }}
                                decoding="async"
                                loading="lazy"
                            />
                            <motion.img
                                className="nube nube-3"
                                src="/nube1.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut", delay: 0.3 } }}
                                decoding="async"
                                loading="lazy"
                            />
                            <motion.img
                                className="nube nube-4"
                                src="/nube3.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut" } }}
                                decoding="async"
                                loading="lazy"
                            />
                            <motion.img
                                className="nube nube-5"
                                src="/nube2.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut", delay: 0.15 } }}
                                decoding="async"
                                loading="lazy"
                            />
                            <motion.img
                                className="nube nube-6"
                                src="/nube1.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ opacity: { duration: 0.8, ease: "easeOut", delay: 0.3 } }}
                                decoding="async"
                                loading="lazy"
                            />

                            <div className="w-50 problema-ticket-area">
                                <div className="problema-ticket-wrap">
                                    <AnimatePresence initial={false}>
                                        <motion.div
                                            key={`${ticketCycle}-${ticketIndex}`}
                                            className="problema-ticket-slide"
                                            initial={{ x: "110%", opacity: 0, }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: "-110%", opacity: 0 }}
                                            transition={{ duration: 0.7, ease: "easeInOut" }}
                                        >
                                            <TearTicket
                                                image={tarjeta.image}
                                                imageRadius={8}
                                                onTear={avanzarTarjeta}
                                                scrim
                                                holes={17}
                                                holeSize={3.8}
                                                background="#526b2d"
                                                stubSize={200}
                                                height={420}
                                                width={590}
                                                tilt
                                                tiltMax={14}
                                                parallax={30}
                                                perspective={1400}
                                                rotate={ticketIndex % 2 === 0 ? 3 : -3}
                                                color="#E0D0EC"
                                                ariaLabel="Desprende la pestaña de la tarjeta"
                                                stub={
                                                    <div className="problema-ticket-stub h-100 d-flex flex-column justify-content-between align-items-center">
                                                        <span>{tarjeta.stubTitle}</span>
                                                        <img
                                                            className="problema-ticket-personaje"
                                                            src="/mariposas.gif"
                                                            alt=""
                                                            aria-hidden="true"
                                                            draggable={false}
                                                        />
                                                        <small>{tarjeta.stubText}</small>
                                                    </div>
                                                }
                                            >
                                                <div className="problema-ticket-copy">
                                                    <span className="problema-ticket-kicker">{tarjeta.kicker}</span>
                                                    <h3>{tarjeta.title}</h3>
                                                    <p>{tarjeta.text}</p>
                                                </div>
                                            </TearTicket>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        <h2 className="subProp text-center pt-5">Esto es <span>Leersé. </span>Un espacio para<span> Ser </span> <br />en la historia.</h2>
                        <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                            <svg className="separador2 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                                <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Acerca de */}
                <section id="propuesta" ref={propuestaRef} className="propuesta position-relative d-flex justify-content-center align-items-center overflow-hidden">
                    <img className="decor1 opacity-50" src="/formas-decorativas-03.png" alt="" />
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5 pb-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={<SplitTextEffect
                                text={"Una nueva forma de entrar en una historia."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}

                                descripcion={
                                    <TextType
                                        text={"Leersé es una plataforma digital de narrativa expandida que transforma la experiencia de acercarse a una obra literaria en un recorrido inmersivo, interactivo, crítico y emocional.\n\nA través de animación, interacción y herramientas de participación, la plataforma propone nuevas maneras de relacionarse con una historia: observarla, recorrerla, cuestionarla, interpretarla y continuarla desde la propia experiencia."}
                                        as="span"
                                        className="descripcion-acercade-typed"
                                        active={acercadeEnVista}
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
                                }
                            />
                        </div>
                        <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-5">
                            <div className="contProp w-75 row row-gap-4 d-flex justify-content-between align-items-center text-center">
                                <div className="col-lg-2 col-md-12 d-flex flex-column align-items-center px-4 ">
                                    <motion.div
                                        className="icono-entrada"
                                        initial={{ opacity: 0, scale: 0.65 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileInView={{ y: [0, -12, 0] }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 1,
                                            }}
                                        >
                                            <img className="icon mb-3" src="/farol1.png" alt="" />
                                        </motion.div>
                                    </motion.div>
                                    <p>Literatura</p>
                                </div>
                                <div className="col-lg-2 col-md-12 d-flex flex-column align-items-center px-4 ">
                                    <motion.div
                                        className="icono-entrada"
                                        initial={{ opacity: 0, scale: 0.65 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileInView={{ y: [0, -12, 0] }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 0.5,
                                            }}
                                        >
                                            <img className="icon mb-3" src="/farol3.png" alt="" />
                                        </motion.div>
                                    </motion.div>
                                    <p>Animación</p>
                                </div>
                                <div className="col-lg-2 col-md-12 d-flex flex-column align-items-center px-4 ">
                                    <motion.div
                                        className="icono-entrada"
                                        initial={{ opacity: 0, scale: 0.65 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileInView={{ y: [0, -12, 0] }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 0,
                                            }}
                                        >
                                            <img className="icon mb-3" src="/farol2.png" alt="" />
                                        </motion.div>
                                    </motion.div>
                                    <p>Interacción</p>
                                </div>
                                <div className="col-lg-2 col-md-12 d-flex flex-column align-items-center px-4 ">
                                    <motion.div
                                        className="icono-entrada"
                                        initial={{ opacity: 0, scale: 0.65 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileInView={{ y: [0, -12, 0] }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 0.5,
                                            }}
                                        >
                                            <img className="icon mb-3" src="/farol3.png" alt="" />
                                        </motion.div>
                                    </motion.div>
                                    <p>Reflexión</p>
                                </div>
                                <div className="col-lg-2 col-md-12 d-flex flex-column align-items-center px-4 ">
                                    <motion.div
                                        className="icono-entrada"
                                        initial={{ opacity: 0, scale: 0.65 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileInView={{ y: [0, -12, 0] }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 1,
                                            }}
                                        >
                                            <img className="icon mb-3" src="/farol1.png" alt="" />
                                        </motion.div>
                                    </motion.div>
                                    <p>Creación</p>
                                </div>
                            </div>
                            <div className="cardProp cardProp-halftone w-75 d-flex justify-content-center align-items-center rounded-4">
                                <HalftoneReveal
                                    className="cardProp-halftone__efecto"
                                    style={{ position: "absolute", inset: 0, zIndex: 0 }}
                                    src="./LILA.png"
                                    wander
                                    misregistration={0.3}
                                    mode="mono"
                                    shape="doted"
                                    cellSize={5}
                                    angle={30}
                                    dotScale={1}
                                    inkColor="#dfd2b8"
                                    accentColor="#dfd2b8"
                                    paperColor="#dfd2b8"
                                    contrast={1.1}
                                    brightness={0}
                                    roughness={0}
                                    revealRadius={200}
                                    softness={10}
                                    linger={7}
                                    reverse
                                    clickBurst
                                    intro
                                />

                                <h2 className="subProp m-4 text-center">
                                    Cinco lenguajes. Una experiencia narrativa.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <img className="decor2 opacity-50" src="/formas-decorativas-03.png" alt="" />
                </section>

                {/* Funciones */}
                <section className="funciones d-flex justify-content-center align-items-center position-relative">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador3 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <motion.img
                        className="DECORS Lampara-1"
                        src="/SVG/Lampara (2).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 90, y: 120, scaleX: -0.9, scaleY: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scaleX: -1, scaleY: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.img
                        className="DECORS Lampara-2"
                        src="/SVG/Lampara (2).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: -90, y: -120, scaleX: 0.9, scaleY: -0.9 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: -1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center contF">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Encabezados titulo={<SplitTextEffect
                                text={"No vienes solamente a leer. Vienes a recorrer."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}
                                descripcion={""} />
                        </div>
                        <div className="cardsF row d-flex justify-content-center align-items-start text-center mt-5">
                            <div className="card1 col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center rounded-4 gap-4">
                                <ChromaVideo
                                    src="./tarjetas/FUNC/img1.webm"
                                    className="imgWebm"
                                    radius={500}
                                />
                                <h3>Explorar</h3>
                                <p>Descubre la historia a través de animaciones y escenarios.</p>
                            </div>
                            <div className="card1 col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center rounded-4 gap-4">
                                <ChromaVideo
                                    src="./tarjetas/FUNC/img2.webm"
                                    className="imgWebm"
                                    radius={500}
                                />
                                <h3>Interactuar</h3>
                                <p>La narrativa responde a tus acciones.</p>
                            </div>
                            <div className="card1 col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center rounded-4 gap-4">
                                <ChromaVideo
                                    src="./tarjetas/FUNC/img3.webm"
                                    className="imgWebm"
                                    radius={500}
                                />
                                <h3>Reflexionar</h3>
                                <p>Algunas historias también hacen preguntas.</p>
                            </div>
                            <div className="card1 col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center rounded-4 gap-4">
                                <ChromaVideo
                                    src="./tarjetas/FUNC/img4.webm"
                                    className="imgWebm"
                                    radius={500}
                                />
                                <h3>Crear</h3>
                                <p>Tu interpretación también puede convertirse en una expresión.</p>
                            </div>
                            <div className="card1 col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center rounded-4 gap-4">
                                <ChromaVideo
                                    src="./tarjetas/FUNC/img5.webm"
                                    className="imgWebm"
                                    radius={500}
                                />
                                <h3>Recordar</h3>
                                <p>Guarda aquello que quieras llevar contigo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador4 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                {/* Herramientas */}
                <section id="animacion" ref={animacionRef} className="demo position-relative d-flex justify-content-center align-items-center">
                    <div className="animacion-particles-layer" aria-hidden="true">
                        {particlesReady && (
                            <Particles
                                particleColors={["#8c030e", "#E0D0EC", "#526b2d"]}
                                particleCount={200}
                                particleSpread={15}
                                speed={0.26}
                                particleBaseSize={160}
                                glow={1}
                                twinkle={1}
                                moveParticlesOnHover
                                hoverEffect="parallax"
                                sizeRandomness={2}
                                shape="sparkle"
                                depthOfField={0}
                                connections={false}
                                connectionDistance={110}
                                particleHoverFactor={3}
                                hoverRadius={140}
                                drift="none"
                                driftSpeed={1}
                                alphaParticles={false}
                                disableRotation={false}
                                cameraDistance={37}
                                variation={5}
                                opacity={1}
                                clickBurst
                                intro
                                lightMode={false}
                            />
                        )}
                    </div>
                    <div className="contD w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <Encabezados titulo={<SplitTextEffect
                                text={"La historia no termina en la animación."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}
                                descripcion={"Sumérgete en la historia de Las Malas a traves de:"}
                            />
                        </div>
                        <div className="contP w-100 row rounded-4 mt-5 p-4">

                            <div className="tP col-lg-3 col-md-6 order-lg-6 order-md-6 order-sm-6 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Cultivox</h5>
                                <p> Cultiva tu curiosidad. </p>
                                <p> Encuentra recomendaciones y contenidos que amplían aquello que acabas de descubrir. </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-7 order-md-1 order-sm-1 p-4">
                                <img src="/img1-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-1 order-md-3 order-sm-2 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Reflexivox</h5>
                                <p> Mírate dentro de la historia. </p>
                                <p> Preguntas que transforman la experiencia narrativa en una oportunidad para pensar, interpretar y cuestionar. </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-2 order-md-4 order-sm-5 p-4">
                                <img src="/img2-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-3 order-md-8 order-sm-7 p-4">
                                <img src="/img3-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-4 order-md-2 order-sm-8 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Crearsé</h5>
                                <p> Devuelve algo a la historia. </p>
                                <p> Expresa aquello que la narrativa despertó en ti mediante diferentes lenguajes creativos. </p>
                                <p> Audio · Fotografía · Dibujo </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-5 order-md-7 order-sm-3 p-4">
                                <img src="/img4-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-8 order-md-5 order-sm-4 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Diario</h5>
                                <p> Lo que decides conservar también cuenta una historia. </p>
                                <p> Guarda aquello que encontraste, pensaste o quisiste volver a visitar. </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Libro */}
                <section id="beneficios" ref={beneficiosRef} className="beneficios d-flex justify-content-center align-items-center position-relative overflow-hidden">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador5 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5 py-5">
                        <div className="d-flex justify-content-center align-items-center w-100 pt-4">
                            <Encabezados titulo={<SplitTextEffect
                                text={"Todo comienza con una historia."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}
                                descripcion={""} />
                        </div>

                        <div className="cardLibro w-100 row d-flex justify-content-center align-items-center">
                            <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                                <HoloCard
                                    className="holo-libro"
                                    image="./libro.jpg"
                                    width={320}
                                    radius={20}
                                    intensity={0}
                                    edgeSparkle={0}
                                    frame={4}
                                    glare={0.2}
                                    tiltMax={10}
                                    hoverScale={1.04}
                                    style={{ width: "75%", maxWidth: "100%", rotate: "-5deg" }}
                                />
                            </div>
                            <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-start">
                                <h2>Las malas</h2>
                                <h3>Camila Sosa Villada</h3>
                                <p>Una obra atravesada por identidad, marginalidad, comunidad, exclusión, resistencia y deseo.
                                    <br /><br />  Leersé toma esta obra como punto de partida para explorar qué sucede cuando una narrativa literaria encuentra nuevos lenguajes.
                                </p>
                            </div>
                        </div>

                        <div className="itemsB w-100 row d-flex justify-content-center align-items-start text-center mt-5 z-1">
                            <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconos/icono-num1.png" alt="" />
                                <p>Libro</p>
                            </div>
                            <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconos/icono-num2.png" alt="" />
                                <p>Animación</p>
                            </div>
                            <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconos/icono-num3.png" alt="" />
                                <p>Interacción</p>
                            </div>
                            <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconos/icono-num4.png" alt="" />
                                <p>Experiencia</p>
                            </div>
                        </div>

                        <h2 className="subProp2 text-center w-75">No adaptamos solamente una historia. Exploramos nuevas maneras de experimentarla.</h2>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador6 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                {/* Universo */}
                <section id="comunidad" ref={comunidadRef} className="comunidad position-relative d-flex justify-content-center align-items-center">
                    <div className="contU w-100 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="tC d-flex justify-content-center align-items-center w-100">
                            <Encabezados titulo={"Una historia también puede tener textura."} descripcion={""} />
                        </div>
                        <Galeria />
                        <h2 className="subProp text-center w-75 pt-5">Cada personaje tiene su propio universo</h2>
                        <div
                            ref={carouselSlotRef}
                            className="comunidad-carousel-slot"
                        >
                            {carouselReady && (
                                <FlexCarousel
                                    items={imagenesComunidad}
                                    radius={10}
                                    gap={20}
                                    autoplay
                                    squeeze={0.3}
                                    dispersion={0}
                                    tilt={-51}
                                    interval={3.5}
                                    liquid={0.8}
                                    lensWidth={1.3}
                                    reach={0.7}
                                    cardHeight={0.35}
                                    lensHeight={1.8}
                                    bend={1.2}
                                    style={{ width: "100%", height: "min(75vh, 700px)", minHeight: "320px" }}
                                />
                            )}
                        </div>
                        <h2 className="subProp text-center w-75 pt-5">Cada escenario cuenta su propia historia</h2>
                    </div>
                </section>

                {/* mapa */}
                <section className="personajes d-flex justify-content-center align-items-center position-relative">
                    <motion.img
                        className="DECORS libro-1"
                        src="/SVG/Lampara (1).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: -90, y: 35, scaleX: -1 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scaleX: -1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.img
                        className="DECORS libro-2"
                        src="/SVG/Lampara (1).svg"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 90, scaleY: -1 }}
                        whileInView={{ opacity: 1, x: 0, scaleY: -1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                    />
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador7 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="contR w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center w-75">
                            <Encabezados titulo={<SplitTextEffect
                                text={"Tu recorrido comienza aquí."}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}
                                descripcion={"No existe una única forma de recorrer \n una historia."}
                                efectoHalftone
                            />
                        </div>
                        <div className="FolderFloat w-100 d-flex justify-content-center align-items-center">
                            <FolderFloat
                                items={personajesFolderItems}
                                trigger="click"
                                label="Ábreme!!"
                                sublabel="Leersé"
                                width={380}
                                height={280}
                                radius={14}
                                spread={280}
                                lift={26}
                                folderColor="#526b2d"
                                frontColor="#7a0808"
                                paperColor="#dfd2b8"
                                itemColor="#e0d0ec"
                                itemTextColor="#526b2d"
                                labelColor="#fff"
                                closeOnSelect
                                physics
                                drift={0.5}
                            />
                        </div>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador8 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                {/* Leersé */}
                <section className="actyrec position-relative d-flex justify-content-center align-items-center">
                    <ImageTrail
                        items={nubesActyrec}
                        className="actyrec-image-trail"
                        size={190}
                        aspectRatio={1.1}
                        radius={15}
                        threshold={80}
                        lifetime={0.6}
                        appearScale={0}
                        exitScale={1}
                        zoom={1}
                        flash={0}
                        drift={0.8}
                        rotation={7}
                        sizeVariance={0.5}
                        alignToMotion={false}
                        stack={0}
                        tilt={40}
                    />
                    <div className="contL w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={<SplitTextEffect
                                text={"Leersé"}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />
                            }
                                descripcion={<>BrandDNA: <span>El código vital</span> que revela la esencia de leer una historia, reconocerse en ella y descubrir la posibilidad de ser en{" "}<span>Leersé</span> {" "}</>
                                } />
                        </div>
                        <div className="w-100 row align-items-center justify-content-center text-center">
                            {[
                                {
                                    titulo: "Leer",
                                    descripcion: <>El acto de aproximarse <br /> a una historia.</>,
                                },
                                {
                                    titulo: "Sé",
                                    descripcion: "La posibilidad de ser, interpretar y construir significado.",
                                },
                                {
                                    titulo: "Leerse",
                                    descripcion: "El encuentro y reflexión con uno mismo.",
                                },
                            ].map((recurso) => (
                                <div
                                    key={recurso.titulo}
                                    className="col-lg-4 col-md-12 p-5"
                                >
                                    <HoloCard
                                        className="holo-recursos"
                                        contentClassName="cardRecursos d-flex flex-column justify-content-between align-items-center gap-4"
                                        width={300}
                                        radius={10}
                                        intensity={0}
                                        edgeSparkle={0}
                                        frame={4}
                                        glare={0.2}
                                        tiltMax={10}
                                        hoverScale={1.04}
                                        style={{
                                            "--hc-w": "100%",
                                            "--hc-ratio": "1.2",
                                            width: "100%",
                                            aspectRatio: "1",
                                        }}
                                    >
                                        <div className="btnSec rounded-3">{recurso.titulo}</div>
                                        <p>{recurso.descripcion}</p>
                                    </HoloCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* proposito */}
                <section id="capitulos" ref={capitulosRef} className="registro d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador9 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="d-flex justify-content-center align-items-center w-75">
                        <Encabezados
                            titulo={<SplitTextEffect
                                text={"¿Por qué existe Leersé?"}
                                effect="blur"
                                ease="bounce.out"
                                color="#8c030e"
                                tag="span"
                                trigger="hover"
                                hoverEffect="lift"
                            />}

                            descripcion={"Crear experiencias capaces de acercar a las personas a narrativas que puedan interpelarlas, cuestionarlas y acompañarlas más allá de la última página."} />
                    </div>
                    <div className="w-75 row d-flex justify-content-center align-items-start text-center mt-5">
                        <div className="cardP col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-center gap-4 p-5">
                            <h3>Acceso</h3>
                            <p>Nuevas puertas de entrada a la literatura.</p>
                        </div>
                        <div className="cardP col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-center gap-4 p-5">
                            <h3>Participación</h3>
                            <p>El usuario deja de ser únicamente receptor.</p>
                        </div>
                        <div className="cardP col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-center gap-4 p-5">
                            <h3>Transformación</h3>
                            <p>La experiencia continúa después de la historia.</p>
                        </div>
                    </div>

                    <div
                        ref={registroCarruselRef}
                        className="registro-carrusel w-100 mt-5"
                    >
                        {registroCarruselActivo && (
                            <CircularCarousel
                                items={imagenesCapitulos}
                                preset="orbit"
                                intro="spin"
                                tilt={-12}
                                perspective={800}
                                curve={0}
                                aspectRatio={1.83}
                                gap={0}
                                parallax={1}
                                momentum={0.5}
                                innerShade={1}
                                cornerRadius={30}
                                depthFade={0.8}
                                stretch={0.7}
                                speed={10}
                                autoplay="drift"
                                cardWidth={1000}
                                focusOnClick={false}
                                onItemClick={(_, indice) => irACapitulo(indice)}
                            />
                        )}
                    </div>
                    <h2 className="subProp text-center w-75 pt-5">Encuentrate con cada uno de los capítulos <br />de nuestra animación</h2>

                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador10 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section >

                {/* comentarios */}
                <section ref={comentariosRef} className="comentarios d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden gap-5">
                    <div className="d-flex justify-content-center align-items-center w-75">
                        <Encabezados titulo={<SplitTextEffect
                            text={"¿Qué quedó contigo?"}
                            effect="blur"
                            ease="bounce.out"
                            color="#8c030e"
                            tag="span"
                            trigger="hover"
                            hoverEffect="lift"
                        />
                        }

                            descripcion={
                                <TextType
                                    text={"Una historia puede terminar, pero lo que despierta en nosotros puede quedarse un poco más.\n\nEscribe aquello que quieras dejar aquí, no tiene que ser una opinión, ni una respuesta correcta, puede ser una idea, una pregunta, una sensación, una crítica, un recuerdo o simplemente algo que quieras decir."}
                                    as="span"
                                    className="descripcion-comentarios-typed"
                                    active={comentariosEnVista}
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
                            }
                        />
                    </div>
                    <form onSubmit={handleEnviarComentario} className="cotainerR w-75 d-flex flex-column justify-content-center align-items-center text-center gap-4 rounded-4 px-5 pt-5 mt-5">
                        <div className="w-100 d-flex flex-column gap-4 align-items-start">
                            <h3 className="m-0">¿Qué quieres dejar?</h3>
                            <div className="campoF w-100">
                                <textarea className="contT altY form-control" id="comentarioHuella" name="comentario" placeholder="Escribe aquí lo que quieras compartir..." required></textarea>
                            </div>
                            <div className="campoF categorias-comentario w-100 d-flex flex-wrap align-items-center" role="group" aria-label="Tipo de comentario">
                                {[
                                    { simbolo: "✦", texto: "Una idea" },
                                    { simbolo: "♡", texto: "Una emoción" },
                                    { simbolo: "?", texto: "Una pregunta" },
                                    { simbolo: "◯", texto: "Una crítica" },
                                    { simbolo: "✧", texto: "Una experiencia" },
                                    { simbolo: "⌕", texto: "Una sugerencia" },
                                    { simbolo: "•••", texto: "Algo más" },
                                ].map((opcion) => (
                                    <button
                                        key={opcion.texto}
                                        type="button"
                                        className={`contT rounded-3 ${categoriaComentario === opcion.texto ? "seleccionada" : ""}`}
                                        aria-pressed={categoriaComentario === opcion.texto}
                                        onClick={() => {
                                            setCategoriaComentario(opcion.texto);
                                            setEstadoComentario("");
                                        }}
                                    >
                                        <span aria-hidden="true">{opcion.simbolo}</span>
                                        {opcion.texto}
                                    </button>
                                ))}
                            </div>
                            <h3 className="m-0">¿Quieres dejar tu nombre? (opcional)</h3>
                            <div className="form-floating campoF w-100">
                                <input type="text" className="form-control rounded-3" id="nombreHuella" name="nombre" placeholder="Tu nombre o seudónimo" />
                                <label className="leb d-flex align-items-center" htmlFor="nombreHuella">Tu nombre o seudónimo</label>
                            </div>
                            <div className="form-floating campoF w-100">
                                <input type="email" className="form-control rounded-3" id="correoHuella" name="correo" placeholder="tu@correo.com" autoComplete="email" required />
                                <label className="leb d-flex align-items-center" htmlFor="correoHuella">Tu correo electrónico</label>
                            </div>
                            <div className="campoF d-flex flex-column justify-content-center align-items-center pt-4 w-100 gap-4">
                                <button type="submit" className="btn3 rounded-3" disabled={enviandoComentario}>{enviandoComentario ? "Enviando…" : "Dejar mi huella"}</button>
                                <p className="mb-5" role="status" aria-live="polite">{estadoComentario || "Tu mensaje llegará al equipo de Leersé. Déjanos tu correo para que podamos responderte."}</p>
                            </div>
                        </div>
                    </form>
                    <h2 className="subProp text-center w-75 pt-5">Tu comentario <span>viaja </span>y se convierte en parte brde esto que <span> construimos juntxs.</span></h2>
                </section >

                {/* mensajes */}
                <section className="registro d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador11 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="d-flex justify-content-center align-items-center w-75 pb-5">
                        <Encabezados titulo={<SplitTextEffect
                            text={"Lo que otros dejaron"}
                            effect="blur"
                            ease="bounce.out"
                            color="#8c030e"
                            tag="span"
                            trigger="hover"
                            hoverEffect="lift"
                        />
                        }
                            descripcion={"Tu voz también construye la historia. Gracias por ser parte de Leersé."} />
                    </div>
                    <div className="py-5">
                        <Marquee ></Marquee>
                    </div>

                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador12 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section >

                <Footer
                    onProblemaClick={scrollToProblema}
                    onPropuestaClick={scrollToPropuesta}
                    onBeneficiosClick={scrollToBeneficios}
                    onAnimacionClick={scrollToAnimacion}
                    onComunidadClick={scrollToComunidad}
                />
            </div >
        </>
    )
}
