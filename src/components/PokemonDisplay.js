import React from "react";
import { usePokemon } from "../hooks/usePokemon";
import { Box, Typography, Button, Paper } from "@mui/material";

function PokemonDisplay({ pokemonId, onNavigate }) {
  const { pokemon, error } = usePokemon(pokemonId);

  if (!pokemon && !error) return null;

  return (
    <Paper elevation={3} style={{ padding: "2rem", textAlign: "center", backgroundColor: '#3c5aa6', color: '#fff' }}> 
      {pokemon && (
        <>
          <Typography variant="h4" component="h2">
            {pokemon.name.toUpperCase()}
          </Typography>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ marginTop: "1rem" }} />
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={() => onNavigate(pokemon.id - 1)}
              disabled={pokemon.id === 1}
              style={{ marginRight: "1rem", backgroundColor: '#ffcb05', color: '#3c5aa6', fontWeight: 'bold' }} /* Pokémon Yellow with Dark Blue text */
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => onNavigate(pokemon.id + 1)}
              disabled={pokemon.id === 1025}
              style={{ backgroundColor: '#ffcb05', color: '#3c5aa6', fontWeight: 'bold' }} /* Pokémon Yellow with Dark Blue text */
            >
              Next
            </Button>
          </Box>
        </>
      )}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}

export default PokemonDisplay;