import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import { Box, Typography, Button, Paper } from "@mui/material";

function PokemonDisplay({ pokemonId }) {
  const [currentPokemonId, setCurrentPokemonId] = useState(pokemonId);
  const { pokemon, error } = usePokemon(currentPokemonId);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('pokemonId:', pokemonId);
    setCurrentPokemonId(pokemonId);
  }, [pokemonId]);

  const handlePrevious = () => {
    console.log('currentPokemonId:', currentPokemonId);
    if (currentPokemonId > 1) {
      setCurrentPokemonId(currentPokemonId - 1);
    }
  };

  const handleNext = () => {
    console.log('currentPokemonId:', currentPokemonId);
    setCurrentPokemonId(currentPokemonId + 1);
  };

  if (!pokemon && !error) return null;

  return (
    <Paper elevation={3} style={{ padding: "2rem", textAlign: "center", backgroundColor: '#3c5aa6', color: '#fff' }}>
      {pokemon && (
        <>
          <Typography variant="h4" component="h2">
            {pokemon.name.toUpperCase()}
          </Typography>
          <Typography variant="body1" component="p">
            {pokemon.id}
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
              onClick={handlePrevious}
              disabled={currentPokemonId === 1}
              style={{ marginRight: "1rem", backgroundColor: '#ffcb05', color: '#3c5aa6', fontWeight: 'bold' }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentPokemonId === 1025}
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