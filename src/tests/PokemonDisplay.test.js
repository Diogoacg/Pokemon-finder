// tests/PokemonDisplay.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonDisplay from "../components/PokemonDisplay";
import * as usePokemonHook from "../hooks/usePokemon";

jest.mock("../hooks/usePokemon");

test("previous and next buttons", async () => {
  const onNavigateMock = jest.fn();
  const pokemon = {
    id: 25,
    name: "pikachu",
    sprites: { front_default: "image.png" },
  };

  // Mock the hook to return the pokemon data
  usePokemonHook.usePokemon.mockReturnValue({
    pokemon,
    error: null,
  });

  render(<PokemonDisplay pokemonId={pokemon.id} onNavigate={onNavigateMock} />);

  const previousButton = screen.getByRole("button", { name: /previous/i });
  const nextButton = screen.getByRole("button", { name: /next/i });

  // Simulate clicking the 'Next' button
  userEvent.click(nextButton);
  await waitFor(() =>
    expect(onNavigateMock).toHaveBeenCalledWith(pokemon.id + 1)
  );

  // Simulate clicking the 'Previous' button
  userEvent.click(previousButton);
  await waitFor(() =>
    expect(onNavigateMock).toHaveBeenCalledWith(pokemon.id - 1)
  );
});
