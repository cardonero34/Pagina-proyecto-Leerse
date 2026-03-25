export const Header = () => {
    return (
        <>
            <div className="m-5">
                <div className="row p-4 rounded-4 d-flex justify-content-center align-items-center" style={{backgroundColor: "#E0D0EC"}}>
                    <div className="col-1 d-flex align-items-center">
                        <div className="Logo w-50 d-flex justify-content-center align-items-center">
                            <img className="w-100" src="/Logo.png" alt="Logo" />
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <ul className="navbar-nav display-flex flex-row gap-5">
                            <li className="nav-item"><a className="nav-link" href="/about">El problema</a></li>
                            <li className="nav-item"><a className="nav-link" href="/about">Acerca de</a></li>
                            <li className="nav-item"><a className="nav-link" href="/about">Animación</a></li>
                            <li className="nav-item"><a className="nav-link" href="/about">Beneficios</a></li>
                            <li className="nav-item"><a className="nav-link" href="/about">Comunidad</a></li>
                        </ul>
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <button type="button" class="btn">Inicia sesión</button>
                    </div>
                </div>
            </div>
        </>
    )
}
