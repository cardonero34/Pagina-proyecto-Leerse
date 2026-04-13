import "../stylesheets/Home.css"

export const Comentarios = ({ Comentario, Autor }) => {
    return (
        <>
            <div className="cardComent rounded-4 d-flex flex-column justify-content-between align-items-center text-center p-4">
                <p>{Comentario}</p>
                <h3>{Autor}</h3>
            </div>
        </>
    )
}
