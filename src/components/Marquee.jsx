import "../stylesheets/Marquee.css";

const cardsData = [
    {
        titulo: "- Anónimo",
        descripcion:
            "Me hizo pensar en la diferencia entre pertenecer y simplemente estar.",
    },

    {
        titulo: "- Valentina",
        descripcion:
            "No esperaba que una historia pudiera hacerme cuestionar cosas de mi propia vida.",
    },

    {
        titulo: "- Andrés",
        descripcion:
            "Gracias por abrir espacios para historias que normalmente no se cuentan.",
    },

    {
        titulo: "- Sofi",
        descripcion:
            "La experiencia es hermosa, pero algunas partes me dejaron con muchas preguntas.",
    },

    {
        titulo: "- Xiaolong",
        descripcion:
            "Me encantó poder crear y dejar algo mio dentro de la historia. Se siente personal.",
    },

    {
        titulo: "- Alexander",
        descripcion:
            "Me hizo pensar que una historia no tiene que parecerse a mi vida para hacerme sentir identificado con ella.",
    },

    {
        titulo: "- Kevin",
        descripcion:
            "La experiencia me dejó con ganas de conocer más sobre las historias y personas que normalmente no vemos.",
    },

    {
        titulo: "- Salvador",
        descripcion:
            "Me gustó que no sintiera que tenía que responder correctamente. Pude simplemente pensar y dejarme llevar por lo que me hizo sentir.",
    },
];

const Card = ({ titulo, descripcion }) => {
    return (
        <div
            className="marquee-card"
            role="button"
            tabIndex="0"
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }}
        >
            <div className="marquee-card-content d-flex flex-column justify-content-center align-items-center text-center h-100 px-4 my-2">
                <p>{descripcion}</p>
                <h3>{titulo}</h3>
            </div>
        </div>
    );
};

export const Marquee = () => {

    const cards = cardsData.map((card, index) => (
        <Card
            key={index}
            titulo={card.titulo}
            descripcion={card.descripcion}
        />
    ));

    return (
        <section
            className="marquee-section pb-5"
        >
            <div className="marquee-wrapper">

                {/* FILA 1 */}
                <div className="marquee">
                    <div className="marquee__group">
                        {cards}
                    </div>

                    <div
                        className="marquee__group"
                    >
                        {cards}
                    </div>
                </div>

                {/* FILA 2 */}
                <div className="marquee marquee--reverse">
                    <div className="marquee__group">
                        {cards}
                    </div>

                    <div
                        className="marquee__group"
                    >
                        {cards}
                    </div>
                </div>

            </div>
        </section>
    );
};