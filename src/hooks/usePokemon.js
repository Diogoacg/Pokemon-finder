// hooks/usePokemon.js
import { useState, useEffect } from "react";
import axios from "axios";

const pokemonCache = {};

export const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setError(null); // Resetar o erro antes de fazer uma nova requisição
        if (pokemonCache[id]) {
          setPokemon(pokemonCache[id]);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          pokemonCache[id] = response.data;
          setPokemon(response.data);
        }
      } catch (err) {
        setError("No Pokémon found with that number or name.");
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return { pokemon, error };
};
