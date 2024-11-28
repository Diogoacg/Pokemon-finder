// hooks/usePokemon.js
import { useState, useEffect } from "react";
import axios from "axios";

// Cache to store Pokémon data
const pokemonCache = {};

// Custom hook to fetch Pokémon data
export const usePokemon = (idOrName) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setError(null);
        if (pokemonCache[idOrName]) {
          setPokemon(pokemonCache[idOrName]);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${idOrName}`
          );
          const data = response.data;
          pokemonCache[idOrName] = data;
          pokemonCache[data.id] = data;
          pokemonCache[data.name] = data;
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

export const usePokemonSpecies = (idOrName) => {
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [errorSpecies, setErrorSpecies] = useState(null);

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      try {
        setErrorSpecies(null);
        if (pokemonCache[`species_${idOrName}`]) {
          setPokemonSpecies(pokemonCache[`species_${idOrName}`]);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
          );
          const data = response.data;
          pokemonCache[`species_${idOrName}`] = data;
          pokemonCache[`species_${data.id}`] = data;
          pokemonCache[`species_${data.name}`] = data;
          setPokemonSpecies(data);
        }
      } catch (err) {
        setErrorSpecies("No Pokémon species found with that number or name.");
      }
    };
    if (idOrName) {
      fetchPokemonSpecies();
    }
  }, [idOrName]);
  return { pokemonSpecies, errorSpecies };
};

export const getPokemonFromCache = (idOrName) => {
  return pokemonCache[idOrName] || null;
};