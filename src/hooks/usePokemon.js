// hooks/usePokemon.js
import { useState, useEffect } from "react";
import axios from "axios";

const pokemonCache = {};

export const usePokemon = (idOrName) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setError(null); // Resetar o erro antes de fazer uma nova requisição
        if (pokemonCache[idOrName]) {
          setPokemon(pokemonCache[idOrName]);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${idOrName}`
          );
          const data = response.data;
          console.log(data);
          pokemonCache[idOrName] = data;
          pokemonCache[data.id] = data; // Armazenar pelo ID
          pokemonCache[data.name] = data; // Armazenar pelo nome
          setPokemon(data);
        }
      } catch (err) {
        setError("No Pokémon found with that number or name.");
      }
    };

    if (idOrName) {
      fetchPokemon();
    }
  }, [idOrName]);

  return { pokemon, error };
};

export const getPokemonFromCache = (idOrName) => {
  return pokemonCache[idOrName] || null;
};
