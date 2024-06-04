// hooks/usePokemon.js
import { useState, useEffect } from "react";
import axios from "axios";

// Cache to store Pokémon data
const pokemonCache = {};

// Custom hook to fetch Pokémon data
export const usePokemon = (idOrName) => {
  // States to manage the Pokémon data and error message
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setError(null); // Reset the error message
        // Check if the Pokémon data is already in the cache
        if (pokemonCache[idOrName]) {
          setPokemon(pokemonCache[idOrName]);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${idOrName}`
          );
          // Store the Pokémon data in the cache
          const data = response.data;
          console.log(data);
          pokemonCache[idOrName] = data;
          pokemonCache[data.id] = data; // Store by id
          pokemonCache[data.name] = data; // Store by name
          setPokemon(data);
        }
        // If the request fails, set an error message
      } catch (err) {
        setError("No Pokémon found with that number or name.");
      }
    };
    // Fetch the Pokémon data when the idOrName changes
    if (idOrName) {
      fetchPokemon();
    }
  }, [idOrName]);
  return { pokemon, error };
};

// Function to get Pokémon data from the cache
export const getPokemonFromCache = (idOrName) => {
  return pokemonCache[idOrName] || null;
};
