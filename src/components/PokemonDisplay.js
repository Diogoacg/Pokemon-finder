// components/PokemonDisplay.js
import React from "react";
import { usePokemon } from "../hooks/usePokemon";

function PokemonDisplay({ pokemonId, onNavigate }) {
  const { pokemon, error } = usePokemon(pokemonId);

  if (!pokemon && !error) return null;

  return (
    <div style={{ textAlign: "center" }}>
      {pokemon && (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>
            <button
              onClick={() => onNavigate(pokemon.id - 1)}
              disabled={pokemon.id === 1}
            >
              Previous
            </button>
            <button onClick={() => onNavigate(pokemon.id + 1)}>Next</button>
          </div>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PokemonDisplay;
