export const CardRecursos = ({ titulo, descripcion, boton }) => {
    return (
        <>
            <div className="cardRecursos d-flex flex-column justify-content-between align-items-center gap-4">
                <h3 className="pb-3 mx-4">{titulo}</h3>
                <p>{descripcion}</p>
                <button type="button" class="btn2 rounded-3">{boton}</button>
            </div>
        </>
    )
}
