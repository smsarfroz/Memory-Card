import { useEffect, useState } from 'react';
import './App.css'

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

        const pokemons = await Promise.all(results.slice(0, 12).map(async (pokemon) => {
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
    <div className='page'>
      <div className="header">
        <div className="left">
          <h1>Pokemon Memory Card Game</h1>
          <p>Get points by clicking on pokemons, but don't click on the same pokemon twice!</p>
        </div>
        <div className="right">
          <p>Score: </p>
          <p>Best Score: </p>
        </div>
      </div>
      <div className='container'>
        {pokemonArray.map((pokemon) => {
          return (  
            <div className='pokemon' key={pokemon.id}>
              <img src={pokemon.url} alt="" />
              <p className="name">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
