// App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay";

function App() {
  const [pokemonId, setPokemonId] = useState(null);

  const handleSearch = (searchInput) => {
    setPokemonId(searchInput);
  };

  const handleNavigate = (id) => {
    setPokemonId(id);
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header>
        <h1>Pokémon Finder</h1>
      </header>
      <main style={{ marginTop: "2rem" }}>
        <SearchBar onSearch={handleSearch} />
        {pokemonId && (
          <PokemonDisplay pokemonId={pokemonId} onNavigate={handleNavigate} />
        )}
      </main>
      <footer>
        <p>
          Made by{" "}
          <a
            href="https://github.com/Diogoacg"
            target="_blank"
            rel="noreferrer"
          >
            Diogoacg
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
