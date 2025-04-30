import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api = ` https://pokeapi.co/api/v2/`;
  const [pokemonArray, setPokemonArray] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);
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

        const pokemons = await Promise.all(
          results.slice(0, 12).map(async (pokemon) => {
            const pokemonUrl = pokemon.url;
            const responsePokemonUrl = await fetch(pokemonUrl);
            const pokemonJson = await responsePokemonUrl.json();
            const pokemonName = pokemonJson.name;
            const pokemonImageUrl = pokemonJson.sprites.front_default;
            return {
              id: crypto.randomUUID(),
              name: pokemonName,
              url: pokemonImageUrl,
              seen: false,
            };
          })
        );
        if (!ignore) {
          setPokemonArray(pokemons);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();

    return () => {
      ignore = true;
    };
  }, []);

  function resetSeenStatus() {
    const updatedPokemonArray = pokemonArray.map((pokemon) => {
      return {
        ...pokemon,
        seen: false,
      };
    });
    setPokemonArray(updatedPokemonArray);
  }
  function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // function RandomizeArray() {
  //   const shuffleArray = (array) => {
  //     for (let i = 0; i < array.length - 1; ++i) {
  //       const j = getRandomIntInRange(i + 1, array.length - 1);
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //     return array;
  //   };
  //   setPokemonArray((pokemonArray) => shuffleArray([...pokemonArray]));
  // }
  function handleClick(seen, id) {
    console.log(seen, id);
    if (seen) {
      if (score > bestScore) {
        console.log(score, bestScore);
        setbestScore(score);
      }
      setScore(0);
      resetSeenStatus();
    } else {
      setScore((score) => score + 1);
      const updatedPokemonArray = pokemonArray.map((pokemon) => {
        if (pokemon.id === id) {
          return {
            ...pokemon,
            seen: !pokemon.seen,
          };
        } else {
          return pokemon;
        }
      });
      setPokemonArray(updatedPokemonArray);
    }
    // RandomizeArray();
    const shuffleArray = (array) => {
      for (let i = 0; i < array.length - 1; ++i) {
        const j = getRandomIntInRange(i + 1, array.length - 1);
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    setPokemonArray((pokemonArray) => shuffleArray([...pokemonArray]));
  }
  return (
    <div className="page">
      <div className="header">
        <div className="left">
          <h1>Pokemon Memory Card Game</h1>
          <p>
            Get points by clicking on pokemons, but don't click on the same
            pokemon twice!
          </p>
        </div>
        <div className="right">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <div className="container">
        {pokemonArray.map((pokemon) => {
          return (
            <div
              className="pokemon"
              key={pokemon.id}
              onClick={() => handleClick(pokemon.seen, pokemon.id)}
            >
              <img src={pokemon.url} alt="" />
              <p className="name">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
