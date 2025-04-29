import { useEffect, useState } from 'react';
import './App.css'
import { transformWithEsbuild } from 'vite';

function App() {

  const api = ` https://pokeapi.co/api/v2/`
  const [pokemonArray, setPokemonArray] = useState([]);
  useEffect(() => {
    let ignore = false; 
    const getData = async () => {
      try {
        const response = await fetch(api);
        const json = await response.json();
        const pokemon = json.pokemon;
        const pokemonResponse = await fetch(pokemon);
        const pokemonJson = await pokemonResponse.json();
        const results = pokemonJson.results;

        // for (let i = 0; i < 10; ++i) {
        //   const pokemon = results[i];
        //   const pokemonUrl = pokemon.url;
        //   const responsePokemonUrl = await fetch(pokemonUrl);
        //   const pokemonJson = await responsePokemonUrl.json();
        //   const pokemonName = pokemonJson.name;
        //   const pokemonImageUrl = pokemonJson.sprites.front_default;
        //   const newPokemonObject = {
        //     id: crypto.randomUUID(),
        //     name: pokemonName,
        //     url: pokemonImageUrl
        //   }
        //   setPokemonArray((prevPokemonArray) => [...prevPokemonArray, newPokemonObject]);
        // }

        const pokemons = await Promise.all(results.slice(0, 10).map(async (pokemon) => {
          const pokemonUrl = pokemon.url;
          const responsePokemonUrl = await fetch(pokemonUrl);
          const pokemonJson = await responsePokemonUrl.json();
          const pokemonName = pokemonJson.name;
          const pokemonImageUrl = pokemonJson.sprites.front_default;
          return {
            id: crypto.randomUUID(),
            name: pokemonName,
            url: pokemonImageUrl
          }
        }))
        if (!ignore) {
          setPokemonArray(pokemons);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();

    return () => {
      ignore = true;
    }
  }, []);
  return (
    <>
      {pokemonArray.map((pokemon) => {
        return (  
          <div className='pokemon' key={pokemon.id}>
            <img src={pokemon.url} alt="" />
            <p className="name">{pokemon.name}</p>
          </div>
        );
      })}
    </>
  )
}

export default App
