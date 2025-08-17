import "../styles/card.css"

function Card({img, name, type, height, weight, hp, attack, defence}) {

  return (
    <>
      <div className='card'>
        <img src={img} alt="" className='img'/>
        <h2 className='name-pokemon' >Nombre: {name}</h2>
        <h3 className='type'>Tipo: {type}</h3>
        <ul className='info'>
            <li><span>Altura:</span> {height}</li>
            <li><span>Peso:</span> {weight}</li>
        </ul>
        <ul className='stadistics'>
            <li className="stadictic"><span>HP:</span> {hp}</li>
            <li className="stadictic"><span>Attack:</span> {attack}</li>
            <li className="stadictic"><span>Defence:</span> {defence}</li>
        </ul>
      </div>
    </>
  )
}

export default Card