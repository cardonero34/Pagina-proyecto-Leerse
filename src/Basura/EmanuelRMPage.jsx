import { useEffect, useState } from "react";

export const EmanuelRMPage = () => {

    const [characters, setCharacters] = useState([])
    const [pokemons, setPokemons] = useState([])

    const getCharacters = async () => {
        const res = await fetch("https://rickandmortyapi.com/api/character")
        const data = await res.json()

        setCharacters(data.results)
        console.log(data)

    }

    const getPokemons = async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
        const data = await res.json()

        const detailsPokemon = await Promise.all(

            data.results.map(async (pokemon) => {

                const res = await fetch(pokemon.url)
                const details = await res.json()
                return {
                    id: details.id,
                    name: details.name,
                    image: details.sprites.other["official-artwork"].front_default,
                    type: details.types[0].type.name
                }

            }))

        setPokemons(detailsPokemon)
        console.log(data)

    }

    useEffect(() => {
        getCharacters()
        getPokemons()
        return () => { }
    }, [])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Personajes de Rick and Morty</h1>

                <div className="m-5 row row-cols-4 gap-4 justify-content-center">
                    {characters.map((char, index) => (
                        <div key={index} className="card col" style={{ width: "18rem" }}>
                            <img src={char.image} className="card-img-top" alt={char.name} />
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <p className="card-text">status: {char.status}</p>
                                <p className="card-text">species: {char.species}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Tarjetas pokemon  {/* Emanuel */}</h2>

                <div className="m-5 row row-cols-4 gap-4 justify-content-center">
                    {pokemons.map((poke, index) => (
                        <div key={poke.id} className="card col" style={{ width: "18rem" }}>
                            <img src={poke.image} className="card-img-top " alt={poke.name} />
                            <div className="card-body">
                                <h5 className="card-title">{poke.name}</h5>
                                <p className="card-text">type: {poke.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
