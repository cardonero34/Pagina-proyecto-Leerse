import "../stylesheets/Home.css"

export const CardPersonajes = ({ nombre, img, descripcion }) => {
    return (
        <>
            <div className="containerPerson text-center d-flex flex-column justify-content-center align-items-center gap-4">
                <h3>{nombre}</h3>
                <div className="cardPersonaje rounded-4 d-flex flex-column justify-content-between align-items-center">
                    <div>
                        <img src={img} alt="" />
                    </div>
                    <div className="p-5">
                        <p>{descripcion}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
