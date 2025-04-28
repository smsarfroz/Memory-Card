import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const api = ` https://pokeapi.co/api/v2/`
  
  useEffect(() => {
    fetch(api) 
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
  return (
    <>
    </>
  )
}

export default App
