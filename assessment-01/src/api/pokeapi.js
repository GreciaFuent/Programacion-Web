const API = "https://pokeapi.co/api/v2";

export async function listPokemon() {
  const res = await fetch(`${API}/pokemon`);
  if (!res.ok) throw new Error("No se pudo obtener la lista");
  return res.json();
}

export async function getPokemon(idOrNameOrUrl) {
  const url =
    typeof idOrNameOrUrl === "string" && idOrNameOrUrl.startsWith("http")
      ? idOrNameOrUrl
      : `${API}/pokemon/${idOrNameOrUrl}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener el Pokémon");
  const d = await res.json();

  return {
    id: d.id,
    name: d.name,
    image: d?.sprites?.other?.["official-artwork"]?.front_default ?? null,
    types: d.types.map((t) => t.type.name),
    height_m: d.height / 10,
    weight_kg: d.weight / 10,
    stats: Object.fromEntries(d.stats.map((s) => [s.stat.name, s.base_stat])),
  };
}

export async function getPokemonBatch() {
  const list = await listPokemon();
  const details = await Promise.all(list.results.map((p) => getPokemon(p.url)));
  return details; // la info
}
