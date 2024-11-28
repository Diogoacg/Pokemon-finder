import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Container, Box, Link } from "@mui/material";
import SearchBar from "./components/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay";
import PokemonDetails from "./components/PokemonDetails";
import "./styles.css";
import "./styles/App.css"; // Importar o novo arquivo CSS

function App() {
  const [pokemonId, setPokemonId] = useState(null);
  const location = useLocation();

  const handleSearch = (searchInput) => {
    setPokemonId(searchInput);
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "2rem" }}>
      {location.pathname === "/" && (
        <h1 className="pokemon-finder-title">
          Pokémon Finder
        </h1>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Box mt={4}>
                <SearchBar onSearch={handleSearch} />
              </Box>
              {pokemonId && (
                <Box mt={4}>
                  <PokemonDisplay pokemonId={pokemonId} />
                </Box>
              )}
            </>
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
      <Box mt={4}>
        <p className="footer">
          Made by{" "}
          <Link color="inherit" href="https://github.com/Diogoacg" target="_blank" rel="noreferrer">
            Diogoacg
          </Link>
        </p>
      </Box>
    </Container>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;