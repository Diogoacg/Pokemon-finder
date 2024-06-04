// SearchBar.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("text-based search feature", async () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);

  const input = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button", { name: /search/i });

  fireEvent.change(input, { target: { value: "pikachu" } });
  fireEvent.click(searchButton);

  await waitFor(() => expect(onSearchMock).toHaveBeenCalled());
});
