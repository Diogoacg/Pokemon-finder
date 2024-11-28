import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import { Box, Typography, Button, Paper } from "@mui/material";

function PokemonDisplay({ pokemonId }) {
  const { pokemon, error } = usePokemon(pokemonId);
  const navigate = useNavigate();

  if (!pokemon && !error) return null;

  return (
    <Paper elevation={3} style={{ padding: "2rem", textAlign: "center", backgroundColor: '#3c5aa6', color: '#fff' }}>
      {pokemon && (
        <>
          <Typography variant="h4" component="h2">
            {pokemon.name.toUpperCase()}
          </Typography>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ marginTop: "1rem", cursor: "pointer" }}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
              disabled={pokemon.id === 1}
              style={{ marginRight: "1rem", backgroundColor: '#ffcb05', color: '#3c5aa6', fontWeight: 'bold' }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
              disabled={pokemon.id === 1025}
              style={{ backgroundColor: '#ffcb05', color: '#3c5aa6', fontWeight: 'bold' }}
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