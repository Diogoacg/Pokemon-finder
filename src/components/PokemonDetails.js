import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "../hooks/usePokemon";
import { Container, Typography, Box, Paper, Grid2, CircularProgress } from "@mui/material";

function PokemonDetails() {
  const { id } = useParams();
  const { pokemon, error } = usePokemon(id);
  const { pokemonSpecies, errorSpecies } = usePokemonSpecies(id);
  const [loading, setLoading] = useState(true);

  
  if (!pokemon && !error) return null;
  // if (!pokemonSpecies && !errorSpecies) retorna um erro e volta para a página inicial
  if (!pokemonSpecies && !errorSpecies) {
    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
            <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
                {errorSpecies}
            </Typography>
        </Container>
    );
    }
  
  const normalizeText = (text) => {
    return text
      .replace(/\n/g, ' ') // Substitui quebras de linha por espaços
      .replace(/[^\x20-\x7E]/g, ' ') // Remove caracteres não imprimíveis
      .toLowerCase()
      .replace(/(^\w|\.\s*\w)/g, (c) => c.toUpperCase()); // Capitaliza a primeira letra de cada sentença
  };
  
  console.log('pokemonSpecies:', pokemonSpecies);

  // Encontra a entrada de texto em inglês se nao encontrar retorna vazio
  
  const flavorText = pokemonSpecies.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
    )?.flavor_text;
    
  
  console.log('flavorText:', flavorText);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
      {pokemon && (
        <>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ marginTop: "1rem" }} />
          <Box mt={2} style={{ textAlign: 'center' }}>
            <Grid2 container spacing={2} justifyContent="center">
              <Grid2 item xs={6}>
                <Paper elevation={1} style={{ padding: "1rem", backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" component="p">
                    <strong>Height:</strong> {pokemon.height} dm
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 item xs={6}>
                <Paper elevation={1} style={{ padding: "1rem", backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" component="p">
                    <strong>Weight:</strong> {pokemon.weight} hg
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 item xs={12}>
                <Paper elevation={1} style={{ padding: "1rem", backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" component="p">
                    <strong>Types:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 item xs={12}>
                <Paper elevation={1} style={{ padding: "1rem", backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" component="p">
                    <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 item xs={12}>
                <Paper elevation={1} style={{ padding: "1rem", backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" component="p" style={{ fontStyle: 'italic' }}>
                    {flavorText && normalizeText(flavorText)}
                  </Typography>
                </Paper>
              </Grid2>
            </Grid2>
          </Box>
        </>
      )}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
    </Container>
  );
}

export default PokemonDetails;