import { CardPersonajes } from "../components/CardPersonajes"
import { CardRecursos } from "../components/CardRecursos"
import { Comentarios } from "../components/Comentarios"
import { Encabezados } from "../components/Encabezados"
import { Footer } from "../components/Footer"
import { motion } from "framer-motion";
import { Nav } from "../components/Nav"
import "../stylesheets/Home.css"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

gsap.registerPlugin(SplitText);

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

    /* secciones */
    const problemaRef = useRef(null);
    const acercadeRef = useRef(null);
    const animacionRef = useRef(null);
    const beneficiosRef = useRef(null);
    const comunidadRef = useRef(null);

    const scrollToProblema = () => {
        problemaRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToAcercade = () => acercadeRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToAnimacion = () => animacionRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToBeneficios = () => beneficiosRef.current.scrollIntoView({ behavior: "smooth" });
    const scrollToComunidad = () => comunidadRef.current.scrollIntoView({ behavior: "smooth" });

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
        /* // --- Animación por caracteres ---
        const splitChars = new SplitText(charsRef.current, { type: "chars" });
        gsap.from(splitChars.chars, {
            x: 150,
            opacity: 0,
            duration: 0.7,
            ease: "power4",
            stagger: 0.04,
        }); */

        // --- Animación por caracteres 2 ---
        const splitChars2 = new SplitText(chars2Ref.current, { type: "chars,words,lines", charsClass: "title" });

        gsap.from(splitChars2.chars, {
            y: 100,
            color: "#ffffff",
            opacity: 0,
            delay: 1,
            stagger: 0.02,
        })

        /* // --- Animación por palabras ---
        const splitWords = new SplitText(wordsRef.current, { type: "words" });
        gsap.from(splitWords.words, {
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 0.7,
            ease: "back",
            stagger: 0.15,
        });
 */
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

    return (
        <>
            <div>
                {/* Modal de ingreso*/}
                <div>
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
                                            Unirme a la comunidad
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

                    className="position-fixed w-100 z-3">
                    <Nav
                        onProblemaClick={scrollToProblema}
                        onAcercadeClick={scrollToAcercade}
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
                        className="object-fit-cover position-absolute w-100 h-100" src="/imgportada.jpg"
                    />

                    {/* texto y botones */}
                    <div className="position-absolute top-50 start-50 translate-middle w-75 d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center pt-5">
                            <h1 ref={chars2Ref} className="title" >Leersé: una experiencia de lectura expandida</h1>
                            <p ref={linesRef} className="parraf">conecta emociones, pensamiento crítico y comunidad.</p>
                        </div>

                        <div className="row w-75 d-flex d-flex justify-content-center align-items-center g-5 mt-lg-4 mt-md-0">
                            <div className="col-lg-6 col-md-8">
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
                                    onClick={scrollToAnimacion}>Explora la animación</motion.button>
                            </div>
                            <div className="col-lg-6 col-md-8">
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
                                    onClick={scrollToAcercade}>Conoce más</motion.button>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>

                </section>

                {/* problema */}
                <section id="problema" ref={problemaRef} className="problema d-flex justify-content-center align-items-center">
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"El problema que resolvemos"} descripcion={"En un mundo que nos empuja a la lectura superficial, muchos encuentran barreras emocionales, simbolicas y culturales que dificultan una conexión profunda con los libros. Leerse nace para ransformar esa experiencia"} />
                        </div>
                        <div className="contP w-100 row rounded-4 mt-5 p-4">

                            <div className="tP col-lg-3 col-md-6 order-lg-6 order-md-6 order-sm-6 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Abandono de <br /> lecturas</h5>
                                <p>
                                    La dificultad para mantener el ritmo o encontrar resonancia personal lleva al abandono.
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-7 order-md-1 order-sm-1 p-4">
                                <img src="/img1-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-1 order-md-3 order-sm-2 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Barreras <br /> emocionales</h5>
                                <p>
                                    Miedo a la crítica, a no “entender” o a no conectar con el mensaje profundo de una obra.
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-2 order-md-4 order-sm-5 p-4">
                                <img src="/img2-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-3 order-md-8 order-sm-7 p-4">
                                <img src="/img3-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-4 order-md-2 order-sm-8 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Exclusión <br /> cultural</h5>
                                <p>
                                    La lectura puede sentirse como una actividad solitaria o elitista, desconectando a muchos.
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 order-lg-5 order-md-7 order-sm-3 p-4">
                                <img src="/img4-problema.png" className="img-fluid rounded-4" />
                            </div>

                            <div className="tP col-lg-3 col-md-6 order-lg-8 order-md-5 order-sm-4 text-center d-flex flex-column justify-content-center p-4">
                                <h5>Desconexión <br /> libro - digital</h5>
                                <p>
                                    Brecha entre la experiencia tradicional del libro y las posibilidades del formato digital.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Acerca de */}
                <section id="acercade" ref={acercadeRef} className="propuesta position-relative d-flex justify-content-center align-items-center overflow-hidden">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador2 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <img className="decor1 opacity-50" src="/formas-decorativas-03.png" alt="" />
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5 py-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Nuestra propuesta ¿Qué es Leersé?"} descripcion={"Leersé es una plataforma cultural digital que reimagina la lectura, convirtiéndola en un viaje personal y colectivo. Fusionamos lo poético con lo crítico, lo íntimo con lo compartido, para que cada texto se convierta en una puerta a nuevas emociones y pensamientos."} />
                        </div>
                        <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-5 mt-5">
                            <h2 className="subProp">Con Leersé, podrás:</h2>
                            <div className="contProp w-75 row row-gap-4">
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Lectura fragmenta e inmersiva, adaptada a tu ritmo.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Experiencia audiovisual qur complementa el texto.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Diario personal para reflexiones y apuntes.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Comunidad crítica y empática para el diálogo.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Conectar con diversas perspectivas y expandir tu visión.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 d-flex align-items-center px-4 ">
                                    <img className="icon me-4" src="/checkIcon.png" alt="" />
                                    <p>Superar las barreras y redescubrir el placer de leer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="decor2 opacity-50" src="/formas-decorativas-03.png" alt="" />
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador3 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                {/* Funciones */}
                <section className="funciones d-flex justify-content-center align-items-center">
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Cómo funciona: Nuestros 3 pilares"} />
                        </div>
                        <div className="cardsF row d-flex justify-content-center align-items-start text-center mt-5">
                            <div className="col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center gap-4">
                                <h3>Microescenas inmersivas</h3>
                                <p>Fragmentos de lectura que se adaptan a tu ritmo, sin perder profundidad de la obra, potenciados con audio, visuales y preguntas que invitan a la introspección, para sumérgirte en la historia</p>
                            </div>
                            <div className="col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center gap-4">
                                <h3>Bitácora personal</h3>
                                <p>Un espacio seguro para tus notas, poemas, dibujos y reacciones. Tu diálogo íntimo con la obra y contigo mismx mientras lees, convirtiendo la experiencia en un viaje interior.</p>
                            </div>
                            <div className="col-lg-4 col-md-12 px-5 mb-5 d-flex flex-column align-items-center gap-4">
                                <h3>Comunidad viva</h3>
                                <p>Conéctate con otrxs lectorxs. Comparte, debate y construye conocimiento colectivo de manera respetuosa e inclusiva para transformar la lectura en acción colectiva.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Animación */}
                <section id="animacion" ref={animacionRef} className="demo position-relative d-flex justify-content-center align-items-center">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador4 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Demo interactivo: Explora una microescena"} descripcion={"Sumérgete en la historia de Las Malas con elementos multimedia y preguntas que te harán reflexionar."} />
                        </div>
                        <div className="text-center d-flex flex-column justify-content-center align-items-center gap-5">
                            <div className="w-100 d-flex justify-content-center align-items-center">
                                <img src="/demoImg.png" className="w-100 rounded-5" alt="Demo" />
                            </div>
                            <div className="contDemo p-5 d-flex justify-content-center align-items-center rounded-4">
                                <p className=" m-0">En Cordoba, en el parque Sarmiento, nocturno y marginal, Camila, una mujer trans de unos inciertos 20 años recien llegada de su pueblo, busca un lugar donde pertenecer.</p>
                            </div>
                            <p className="w-75 m-0">Regístrate o inicia sesión para desbloquear la historia completa y explorar cada rincón del universo Leersé.</p>
                            <div className=" row w-75 d-flex justify-content-center align-items-center gy-4">
                                <div className="col-lg-5 col-md-8">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn2 rounded-3">Inicia sesión</button>
                                </div>
                                <div className="col-lg-5 col-md-8">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn3 rounded-3">Registrarse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador5 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                <section id="beneficios" ref={beneficiosRef} className="beneficios d-flex justify-content-center align-items-center position-relative overflow-hidden">
                    <img className="decor3 opacity-50" src="/formas-decorativas-02.png" alt="" />
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4 pb-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Beneficios e impacto esperado"} descripcion={"Leersé no es solo una plataforma, es un manifiesto por una lectura má libre, profunda y conectada."} />
                        </div>
                        <div className="itemsB w-100 row d-flex justify-content-center align-items-start text-center mt-5">
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(1).png" alt="" />
                                <p>¡Libera tu voz! Exprésate sin juicios en tu bitácora personal.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(2).png" alt="" />
                                <p>¡Despierta tu mente! Desarrolla un pensamiénto crítico único</p>
                            </div>
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(3).png" alt="" />
                                <p>¡Rompe el aislamiento! Conéctate con una comunidad vibrante.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(4).png" alt="" />
                                <p>¡Expande tu universo! Viaja por culturas y perspectivas diversas.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(5).png" alt="" />
                                <p>¡Crece con cada página! Cultiva la empatía y la comprensión.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
                                <img className="w-25" src="/iconB(6).png" alt="" />
                                <p>¡Encuentra tu refugio! La lectura como espacio de bienestar.</p>
                            </div>
                        </div>
                    </div>
                    <img className="decor4 opacity-50" src="/formas-decorativas-02.png" alt="" />
                </section>

                <section id="comunidad" ref={comunidadRef} className="comunidad position-relative d-flex justify-content-center align-items-center">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador6 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="tC d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Comunidad: Nuestro mural de voces"} descripcion={"Explora lo que nuestrxs usuarixs piensan y sienten. Tu voz también tiene un lugar aquí."} />
                        </div>
                        <div className="w-100 row align-items-start text-center">
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“Leersé me devolvió el placer de leer. Cada microescena es un viaje.”"} Autor={"- Aurora R, Lectora -"} />
                            </div>
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“La bitácora es mi confesionario literario. Increiblemente liberador”"} Autor={"- Elias A, Escritor amateur -"} />
                            </div>
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“Debatir con otras personas sobre textos que amamos es una experiencia brutal”"} Autor={"- Sofía P, Mediadora -"} />
                            </div>
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“Escribí en el diario y terminé llorando. No pensé que un libro pudiera abrirme así, como si me hablara al oído.”"} Autor={"- Ana M, Lectora -"} />
                            </div>
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“Con cada microescena recordé a mis amigas de adolescencia, las que me salvaron sin saberlo. Esta lectura me devolvió pedacitos de mi historia.”"} Autor={"- Dua L, Lectora -"} />
                            </div>
                            <div className="col-lg-4 col-md-6 p-3 h-100">
                                <Comentarios Comentario={"“Leer fragmentos me hizo sentir menos sola. Es como si alguien hubiera puesto en palabras lo que nunca me atreví a decir.”"} Autor={"- Manu G, Lectora -"} />
                            </div>

                        </div>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador7 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                <section className="personajes d-flex justify-content-center align-items-center">
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Voces y rostros de Leersé"} descripcion={"Conoce a algunos de los personajes que viven en la historia de leersé."} />
                        </div>
                        <div className="w-100 row align-items-start text-center">
                            <div className="col-lg-4 p-4">
                                <CardPersonajes nombre={"Camila"}
                                    img={"/pers1.png"} descripcion={"Soy Camila, travesti, escritora y sobreviviente. En mi piel llevo la memoria de una infancia marcada por la soledad y la vergüenza, pero también por la rebeldía de no dejarme borrar. Escribo para que nuestra voz arda y no se apague nunca. Si me lees, ya no estoy sola."} />
                            </div>
                            <div className="col-lg-4 p-4">
                                <CardPersonajes nombre={"Amiga"}
                                    img={"/pers2.png"} descripcion={"Soy Claudia, travesti como mis hermanas, aunque a veces me siento más invisible que ellas. He aprendido a reír fuerte para que no se note el miedo, y a maquillarme como armadura contra el desprecio del mundo. Sueño con un futuro distinto, pero mientras llega, bailo, amo y sigo viva."} />
                            </div>
                            <div className="col-lg-4 p-4">
                                <CardPersonajes nombre={"Tía Encarna"}
                                    img={"/pers3.png"} descripcion={"Dicen que soy vieja, pero yo me digo sabia. Soy la madre travesti de todas, la que acoge, la que alimenta, la que enseña que el dolor también se puede compartir. Abrí mi casa para que nadie durmiera en la calle, y aunque mis huesos crujan, sigo de pie, sosteniéndonos."} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="actyrec position-relative d-flex justify-content-center align-items-center">
                    <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                        <svg className="separador8 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                    <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <Encabezados titulo={"Activismo y recursos"} descripcion={"Creemos en el poder transformador de la lectura y la colaboración."} />
                        </div>
                        <div className="w-100 row align-items-start text-center">
                            <div className="col-lg-4 col-md-12 p-5">
                                <CardRecursos titulo={"Lecturas recomendadas"} descripcion={"Una curaduría de obras que expandirán tu mente y tu corazón. Desde clasicos hasta joyas contemporáneas."} boton={"Explorar lecturas"} />
                            </div>
                            <div className="col-lg-4 col-md-12 p-5">
                                <CardRecursos titulo={"Mapa de colectivos aliados"} descripcion={"Descubre organizaciones y grupos culturales con los que compartimos visión y valores en tu ciudad y región."} boton={"Ver mapa."} />
                            </div>
                            <div className="col-lg-4 col-md-12 p-5">
                                <CardRecursos titulo={"Biblioteca de recursos descargables"} descripcion={"Guías, plantillas de bitácora, fondos e illustraciónes poéticas y más para llevar la experiencia Leersé contigo."} boton={"Ver biblioteca"} />
                            </div>
                        </div>
                    </div>
                    <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                        <svg className="separador9 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                            <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                        </svg>
                    </div>
                </section>

                <section className="registro d-flex justify-content-center align-items-center position-relative overflow-hidden">
                    <img className="decor5 opacity-50" src="/formas-decorativas-01.png" alt="" />
                    <div className="cotainerR w-50 d-flex flex-column justify-content-center align-items-center text-center gap-4">
                        <p>La literatura no termina en las páginas: empieza cuando la habitamos juntxs.</p>
                        <div className="w-100 d-flex flex-column gap-4">
                            <div className="form-floating campoF">
                                <input type="text" className="form-control" id="floatingPassword" placeholder="Tu nombre" />
                                <label className="leb" htmlFor="floatingPassword">Tu nombre</label>
                            </div>
                            <div className="form-floating campoF">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label className="leb" htmlFor="floatingInput">Tu correo electrónico</label>
                            </div>
                            <div className="form-floating campoF">
                                <select defaultValue="select" className="form-select rounded-3">
                                    <option value="select">Selecciona tu rol</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center pt-4">
                                <button type="button" className="btn3 rounded-3">Unirme a la comunidad</button>
                            </div>
                        </div>
                    </div>
                    <img className="decor6 opacity-50" src="/formas-decorativas-01.png" alt="" />
                </section >

                <div className="w-100">
                    <Footer />
                </div>
            </div >
        </>
    )
}
