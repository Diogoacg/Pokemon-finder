import React, { useState } from "react";
import { Container, Box, Link } from "@mui/material";
import SearchBar from "./components/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay";
import "./styles.css";
import "./styles/App.css"; // Importar o novo arquivo CSS

function App() {
  const [pokemonId, setPokemonId] = useState(null);

  const handleSearch = (searchInput) => {
    setPokemonId(searchInput);
  };

  const handleNavigate = (id) => {
    setPokemonId(id);
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1 className="pokemon-finder-title">
        Pokémon Finder
      </h1>
      <Box mt={4}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      {pokemonId && (
        <Box mt={4}>
          <PokemonDisplay pokemonId={pokemonId} onNavigate={handleNavigate} />
        </Box>
      )}
      <Box mt={4}>
        <p 
        className="footer"
        >
          Made by{" "}
          <Link 
          color="inherit"
          href="https://github.com/Diogoacg" target="_blank" rel="noreferrer"
          >
            Diogoacg
          </Link>
        </p>
      </Box>
    </Container>
  );
}

export default App;