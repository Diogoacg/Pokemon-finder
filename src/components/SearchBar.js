// components/SearchBar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPokemonFromCache } from "../hooks/usePokemon";

function SearchBar({ onSearch }) {
  // States to manage the input value, error message, and suggestions
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch Pokémon list from the API and filter suggestions based on the input
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (input) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=1118`
          );
          const filteredSuggestions = response.data.results
            .map((pokemon) => pokemon.name)
            .filter((name) => name.startsWith(input.toLowerCase()));
          setSuggestions(filteredSuggestions);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        setError("Failed to fetch Pokémon list.");
      }
    };

    fetchSuggestions();
  }, [input]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if no input, show an error message
    if (!input) {
      setError("Please enter a Pokémon name or id.");
      return;
    }
    // Check if the input is a cached Pokémon name
    const cachedPokemon = getPokemonFromCache(input.toLowerCase());
    if (cachedPokemon) {
      onSearch(cachedPokemon.id);
    } else {
      onSearch(input);
    }
  };

  // Render the search bar with input, suggestions, and error message
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="suggestion"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SearchBar;
