import { useState } from 'react';
import './App.css'

function App() {

  const api = ` https://pokeapi.co/api/v2/`
  const [pokemonArray, setPokemonArray] = useState([]);
    
  const getData = async () => {
    try {
      const response = await fetch(api);
      const json = await response.json();
      const pokemon = json.pokemon;
      const pokemonResponse = await fetch(pokemon);
      const pokemonJson = await pokemonResponse.json();
      const results = pokemonJson.results;

      for (let i = 0; i < 10; ++i) {
        const pokemon = results[i]
        const pokemonUrl = pokemon.url;
        const responsePokemonUrl = await fetch(pokemonUrl);
        const pokemonJson = await responsePokemonUrl.json();
        const pokemonName = pokemonJson.name;
        const pokemonImageUrl = pokemonJson.sprites.front_default;
        const newPokemonObject = {
          id: crypto.randomUUID,
          name: pokemonName,
          url: pokemonImageUrl
        }
        await setPokemonArray((prevPokemonArray) => ([...prevPokemonArray, newPokemonObject]));
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  getData();
  console.log(pokemonArray);
  return (
    <>
      {pokemonArray.map((pokemon) => {
        <div className='pokemon'>
          <img src={pokemon.url} alt="" />
          <p className="name">{pokemon.name}</p>
        </div>
      })}
    </>
  )
}

export default App
