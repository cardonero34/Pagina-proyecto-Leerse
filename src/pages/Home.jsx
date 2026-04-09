import { Encabezados } from "../components/Encabezados"
import { Nav } from "../components/Nav"
import "../stylesheets/Home.css"

export const Home = () => {
    return (
        <>
            <div className="position-fixed w-100 z-1">
                <Nav />
            </div>

            <section className="portada">
                <img className="img-fluid" src="/imgportada.jpg" alt="" />
                <div className="position-absolute top-50 start-50 translate-middle w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <div>
                        <p className="text-center">Leersé: una experiencia de lectura expandida que conecta emociones, pensamiento crítico y comunidad.</p>
                    </div>
                    <div className="w-50 d-flex gap-5">
                        <button type="button" className="btn2 rounded-3">Explora la animación</button>
                        <button type="button" className="btn3 rounded-3">Conoce más</button>
                    </div>
                </div>

                <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                    <svg className="separador w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>

            </section>

            <section className="problema d-flex justify-content-center align-items-center">
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

            <section className="propuesta position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                    <svg className="separador2 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <Encabezados titulo={"Nuestra propuesta ¿Qué es Leersé?"} descripcion={"Leersé es una plataforma cultural digital que reimagina la lectura, convirtiéndola en un viaje personal y colectivo. Fusionamos lo poético con lo crítico, lo íntimo con lo compartido, para que cada texto se convierta en una puerta a nuevas emociones y pensamientos."} />
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-5 mt-5">
                        <h2>Con Leersé, podrás:</h2>
                        <div className="contP w-50 row row-gap-4">
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Lectura fragmenta e inmersiva, adaptada a tu ritmo.</p>
                            </div>
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Experiencia audiovisual qur complementa el texto.</p>
                            </div>
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Diario personal para reflexiones y apuntes.</p>
                            </div>
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Comunidad crítica y empática para el diálogo.</p>
                            </div>
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Conectar con diversas perspectivas y expandir tu visión.</p>
                            </div>
                            <div className="col-lg-6 d-flex ">
                                <img className="icon me-4" src="/checkIcon.png" alt="" />
                                <p>Superar las barreras y redescubrir el placer de leer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                    <svg className="separador3 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
            </section>

            <section className="funciones d-flex justify-content-center align-items-center">
                <div className="w-75 d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <Encabezados titulo={"Cómo funciona: Nuestros 3 pilares"} />
                    </div>
                    <div className="cardsF row d-flex justify-content-center align-items-center text-center mt-5">
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

            <section className="demo position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                    <svg className="separador4 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <Encabezados titulo={"Demo interactivo: Explora una microescena"} descripcion={"Sumérgete en la historia de Las Malas con elementos multimedia y preguntas que te harán reflexionar."} />
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <p></p>
                        <div className="w-50 d-flex gap-5">
                            <button type="button" className="btn2 rounded-3">Explora la animación</button>
                            <button type="button" className="btn3 rounded-3">Conoce más</button>
                        </div>
                    </div>
                </div>
                <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                    <svg className="separador5 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
            </section>

            <section className="beneficios d-flex justify-content-center align-items-center">
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <Encabezados titulo={"Beneficios e impacto esperado"} descripcion={"Leersé no es solo una plataforma, es un manifiesto por una lectura má libre, profunda y conectada."} />
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </section>

            <section className="comunidad position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                    <svg className="separador6 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <Encabezados titulo={"Comunidad: Nuestro mural de voces"} descripcion={"Explora lo que nuestrxs usuarixs piensan y sienten. Tu voz también tiene un lugar aquí."} />
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
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
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
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
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="w-100 position-absolute bottom-0 start-50 translate-middle-x">
                    <svg className="separador9 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
            </section>

            <section className="registro d-flex justify-content-center align-items-center">
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <p>Nuestra propuesta ¿Qué es Leersé?</p>
                    <p>Leersé es una plataforma cultural digital que reimagina la lectura, convirtiéndola en un viaje personal y colectivo. Fusionamos lo poético con lo crítico, lo íntimo con lo compartido, para que cada texto se convierta en una puerta a nuevas emociones y pensamientos.</p>
                </div>
            </section>

            <section className="footer position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                    <svg className="separador10 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <p>Nuestra propuesta ¿Qué es Leersé?</p>
                    <p>Leersé es una plataforma cultural digital que reimagina la lectura, convirtiéndola en un viaje personal y colectivo. Fusionamos lo poético con lo crítico, lo íntimo con lo compartido, para que cada texto se convierta en una puerta a nuevas emociones y pensamientos.</p>
                </div>
            </section>
        </>
    )
}
