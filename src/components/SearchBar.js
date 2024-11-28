import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPokemonFromCache } from "../hooks/usePokemon";
import { TextField, Button, Box, Paper, List, ListItem, ListItemText } from "@mui/material";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (input) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1118`);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input) {
      setError("Please enter a Pokémon name or id.");
      return;
    }
    const cachedPokemon = getPokemonFromCache(input.toLowerCase());
    if (cachedPokemon) {
      onSearch(cachedPokemon.id);
    } else {
      onSearch(input);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="Search Pokémon"
        variant="outlined"
        color="#3c5aa6"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        error={!!error}
        helperText={error}
        style={{ backgroundColor: '#3c5aa6', color: '#fff' , marginTop: "1rem" }}
      
      />
      <Button
      type="submit" 
      variant="contained"
      fullWidth
      startIcon={<img src="https://img.icons8.com/ios/50/000000/pokeball--v1.png" alt="pokeball" />}
      
      style={{ marginTop: "1rem", color: 'black' , backgroundColor: '#ffcb05' }} /* Pokémon Yellow with Dark Blue text */
      >
      </Button>
      {suggestions.length > 0 && (
        <Paper style={{ marginTop: "1rem", backgroundColor: '#2a75bb', color: '#fff' }}>
          <List>
            {suggestions.map((suggestion) => (
              <ListItem button key={suggestion} onClick={() => setInput(suggestion)}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default SearchBar;