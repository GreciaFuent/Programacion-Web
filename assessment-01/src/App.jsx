import { useState } from 'react'
import Card from './components/card'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='pokedex-div'>
        <h1 className='title'>Pokédex</h1>
        <p className='description'>Bienvenid@ a la Pokédex: una galería interactiva donde puedes explorar tus Pokémon favoritos. Cada tarjeta muestra su nombre, la imagen oficial y características como tipos y peso, obtenidas en tiempo real desde la PokeAPI.</p>
        <div className="div-cards">
           <Card />
        </div>
        <footer><h6>parcial 1 Grecia</h6></footer>
      </div>
    </>
  )
}

export default App
