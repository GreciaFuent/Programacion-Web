import { useState } from 'react'

import "../styles/card.css"

function Card() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='card'>
        <img src="#" alt="" className='img'/>
        <h2 className='name-pokemon' >nombre</h2>
        <h3 className='type'>Grass</h3>
        <ul className='info'>
            <li><span>Height:</span> 2'</li>
            <li><span>Weight:</span> 15.2 lbs</li>
        </ul>
        <ul className='stadistics'>
            <li className="stadictic"><span>HP:</span> 45</li>
            <li className="stadictic"><span>Attack:</span> 49</li>
            <li className="stadictic"><span>Defence:</span> 49</li>
        </ul>
      </div>
    </>
  )
}

export default Card