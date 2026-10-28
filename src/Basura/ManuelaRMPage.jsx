import { useEffect, useState } from 'react'

export const ManuelaRMPage = () => {

    const [characters, setCharacters] = useState([])

    const getCharacters = async () => {
        const res = await fetch("https://rickandmortyapi.com/api/character")
        const data = await res.json()

        setCharacters(data.results)

        console.log(data)
    }

    useEffect(() => {
        getCharacters()

        return () => { }
    }, [])



    const [pokemons, setPokemons] = useState([])

    const getPokemons = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
        const data = await res.json()

        const detallesPokemon = await Promise.all(

            data.results.map(async (pokemons) => {

                const res = await fetch(pokemons.url)
                const detalles = await res.json()

                return {
                    id: detalles.id,
                    name: detalles.name,
                    image: detalles.sprites.other["official-artwork"].front_default,
                    types: detalles.types[0].type.name

                }
            })
        )

        setPokemons(detallesPokemon)

        console.log(data)
    }

    useEffect(() => {
        getPokemons()

        return () => { }
    }, [])


    return (
        <>
            <h1 className='text-center' >Personajes de Rick and Morty</h1>

            <div className='d-flex flex-wrap justify-content-center gap-3 m-5' style={{backgroundColor: '#1e3b7a9d'}}>

                {characters.map((char, index) => (

                    <div key={index} className="card" style={{ width: "18rem" }}>
                        <img src={char.image} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{char.name}</h5>
                            <p className="card-text">Status: {char.status}</p>
                            <p className="card-text">Especies: {char.species}</p>
                        </div>
                    </div>

                ))}

            </div>


            <h1 className='text-center'>Pokémons Manuela </h1>
            <div className='d-flex flex-wrap justify-content-center gap-3 m-5' style={{backgroundColor: '#1272269d'}}>

                {pokemons.map((poke, index) => (
                    <div key={poke.id} className="card" style={{ width: "18rem" }}>
                        <img src={poke.image} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{poke.name}</h5>
                            <p className="card-text">Tipo: {poke.types}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

