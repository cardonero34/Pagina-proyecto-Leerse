import "../stylesheets/Footer.css"

export const Footer = () => {
    return (
        <>
            <section className="footer position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 position-absolute top-0 start-50 translate-middle-x">
                    <svg className="separador10 w-100" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100.94">
                        <path d="M700,0v100.94L298.06,36.68c-90.63-14.49-183.52,1.57-264.04,45.63L0,100.94V0h700Z" />
                    </svg>
                </div>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-4">
                    <div className="w-25 ">
                        <img className="img-fluid" src="/Logo.png" />
                    </div>
                    <div>
                        <div className="d-flex justify-content-center align-items-center">
                            <ul className="navbar-nav display-flex flex-row">
                                <li className="nav-item px-3"><a className="nav-link" href="/about">El problema</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Acerca de</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Animación</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Beneficios</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Comunidad</a></li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                            <img src="/red1.png" alt="" />
                            <img src="/red2.png" alt="" />
                            <img src="/red3.png" alt="" />
                            <img src="/red4.png" alt="" />
                            <img src="/red5.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}