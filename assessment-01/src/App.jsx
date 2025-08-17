import { useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";
import { getPokemonBatch } from "./api/pokeapi"; 

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await getPokemonBatch();
        console.log("BATCH OK:", items);
        setPokemons(items);
      } catch (e) {
        console.error("BATCH ERROR:", e);
        setErr(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="pokedex-div">
        <h1 className="title">Pokédex</h1>
        <div className="div-cards">
          {pokemons.map((p) => (
            <Card
              key={p.id}
              img={p.image}          
              name={p.name}
              type={p.types.join(", ")}                     
              height={`${p.height_m} m`}         
              weight={`${p.weight_kg} kg`}
              hp={p.stats.hp}
              attack={p.stats.attack}
              defence={p.stats.defense}               
            />
          ))}
        </div>

        <footer>
          <h6>Parcial 1 Grecia</h6>
        </footer>
      </div>
    </>
  );
}

