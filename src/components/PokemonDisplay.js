// components/PokemonDisplay.js
import React from "react";
import { usePokemon } from "../hooks/usePokemon";

function PokemonDisplay({ pokemonId, onNavigate }) {
  // Use the custom hook to fetch the Pokémon data
  const { pokemon, error } = usePokemon(pokemonId);

  // If there's no Pokémon data or an error, return null
  if (!pokemon && !error) return null;

  // Render the Pokémon data, navigation buttons, and error message
  return (
    <div style={{ textAlign: "center" }}>
      {pokemon && (
        <>
          <h1>{pokemon.name.toUpperCase()}</h1>

          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{"ID " + pokemon.id}</h3>
          <div>
            <button
              onClick={() => onNavigate(pokemon.id - 1)}
              disabled={pokemon.id === 1}
            >
              Previous
            </button>
            <button
              onClick={() => onNavigate(pokemon.id + 1)}
              disabled={pokemon.id === 1025}
            >
              Next
            </button>
          </div>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PokemonDisplay;
