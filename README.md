**Pokémon Finder App**

Welcome to the Pokémon Finder App! This simple web application allows you to search for Pokémon by name or ID and view their details.

### Features

- **Search Bar**: Use the search bar to enter a Pokémon name or ID and find the Pokémon you're looking for.
- **Pokémon Display**: View detailed information about the Pokémon you searched for, including its name, image, and navigation buttons to browse through other Pokémon.
- **Error Handling**: If there's an issue fetching Pokémon data, the app will display an error message to notify you.

### Technologies Used

- **React**: Frontend library for building user interfaces.
- **Axios**: Promise-based HTTP client for making requests to the Pokémon API.
- **Testing Library (React Testing Library)**: Used for testing React components and user interactions.

### Decisions Made

- **Caching Pokémon Data**: To optimize performance and reduce API calls, Pokémon data fetched from the API is cached locally using an in-memory cache implemented in the `usePokemon` hook. This cache stores Pokémon data both by ID and name for efficient retrieval.
- **Error Handling**: Error handling is implemented both in the `usePokemon` hook and the `SearchBar` component. If there's an error fetching Pokémon data, an error message is displayed to the user, providing feedback on what went wrong.

- **Testing**: Unit tests are written for key components such as `PokemonDisplay` and `SearchBar` using React Testing Library. These tests ensure that components render correctly and user interactions behave as expected.

### Getting Started

To run this app locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone https://github.com/Diogoacg/Apprenticeship-Developer---Coding-Challenge
   ```

2. **Install Dependencies**: Navigate into the cloned repository and install the required dependencies using npm or yarn.

   ```bash
   cd pokemon-finder
   npm install
   ```

3. **Run the App**: Start the development server to run the app locally.

   ```bash
   npm start
   ```

4. **Open in Browser**: Once the server is running, open your web browser and navigate to `http://localhost:3000` to view the app.

### Testing

To run the tests for this app, you can use the following command:

```bash
npm test
```

### Feedback and Contributions

Feedback and contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on GitHub.

### License

This project is licensed under the [MIT License](LICENSE).
