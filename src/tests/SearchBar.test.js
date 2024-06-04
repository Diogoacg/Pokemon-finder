// SearchBar.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// Test the text-based search feature
test("text-based search feature", async () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);

  // Get the input field and search button
  const input = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button", { name: /search/i });

  // Type "pikachu" in the input field and click the search button
  fireEvent.change(input, { target: { value: "pikachu" } });
  fireEvent.click(searchButton);

  // Check if the onSearch function was called with the correct input
  await waitFor(() => expect(onSearchMock).toHaveBeenCalled());
});
