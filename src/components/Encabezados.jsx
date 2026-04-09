import "../stylesheets/Home.css"

export const Encabezados = ({ titulo, descripcion }) => {
    return (
        <>
            <div className="encabezado w-75 d-flex flex-column justify-content-center align-items-center text-center gap-4">
                <h2>{titulo}</h2>
                <p>{descripcion}</p>
            </div>
        </>
    )
}
