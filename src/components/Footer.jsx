import "../stylesheets/Footer.css"

export const Footer = ({
    onProblemaClick,
    onPropuestaClick,
    onBeneficiosClick,
    onAnimacionClick,
    onComunidadClick,
}) => {
    return (
        <>
            <section className="footer position-relative d-flex justify-content-center align-items-center">
                <div className="contF w-75 d-flex flex-column justify-content-center align-items-center">
                    <div className="w-25 ">
                        <a href="/" aria-label="Volver al inicio de Leersé">
                            <img className="img-fluid" src="/Logo.png" alt="Leersé" />
                        </a>
                    </div>
                    <div>
                        <div className="d-flex justify-content-center align-items-center">
                            <ul className="navbar-nav display-flex flex-row">
                                <li className="nav-item px-3"><a className="nav-link" href="#problema" onClick={(event) => { event.preventDefault(); onProblemaClick?.(); }}>El reto</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="#propuesta" onClick={(event) => { event.preventDefault(); onPropuestaClick?.(); }}>Esencia</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="#beneficios" onClick={(event) => { event.preventDefault(); onBeneficiosClick?.(); }}>La obra</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="#animacion" onClick={(event) => { event.preventDefault(); onAnimacionClick?.(); }}>Experiencia</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="#comunidad" onClick={(event) => { event.preventDefault(); onComunidadClick?.(); }}>Universo</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}