import "../stylesheets/Nav.css"

export const Nav = () => {
    return (
        <>
            <div className="my-5">
                <div className=" w-75 mx-auto">
                    <div className="cont row p-4 rounded-4 d-flex justify-content-between align-items-center shadow-lg">
                        <div className="col-1 d-flex align-items-center">
                            <div className="logo d-flex justify-content-center align-items-center">
                                <img className="w-100" src="/Logo.png" alt="Logo" />
                            </div>
                        </div>
                        <div className="col-8 d-flex justify-content-center align-items-center">
                            <ul className="nav nav-underline display-flex flex-row">
                                <li className="nav-item px-3"><a className="nav-link" href="/about">El problema</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Acerca de</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Animación</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Beneficios</a></li>
                                <li className="nav-item px-3"><a className="nav-link" href="/about">Comunidad</a></li>
                            </ul>
                        </div>
                        <div className="col-3 d-flex justify-content-end align-items-center">
                            <button type="button" className="btn1 rounded-3 shadow">Inicia sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
