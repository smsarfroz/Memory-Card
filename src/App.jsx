import { useState } from 'react';
import './App.css'

function App() {

  const api = ` https://pokeapi.co/api/v2/`
  const [img, setImg] = useState('');
  setImg(api);
  fetch(api) 
    .then(response => response.json())
    .then(response => response.pokemon)
    .then(response => console.log(response.results))
  return (
    <>
      <img src={img} alt="" />
    </>
  )
}

export default App
