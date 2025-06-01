# Pokédex App

A modern, accessible, and feature-rich Pokémon application built with React, TypeScript, and Vite. This application consumes data from the PokeAPI and stores user preferences in a local json-server.

## Features

- Infinite scroll Pokémon listing with efficient data fetching
- Detailed Pokémon pages showing stats, abilities, and evolutions
- Search and filtering system by name
- Persistent favorites management with local JSON server
- Personal notes system for each Pokémon
- Responsive design following WCAG 2.2 AA accessibility standards
- Type-safe data handling with TypeScript and Zod validation

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router v6
- TanStack Query (React Query)
- Tailwind CSS
- Zod for validation
- JSON Server for local data persistence
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the App

1. Start the JSON Server (local database):

```bash
npm run dev
```

2. In a separate terminal, start the development server:

```bash
npm run dev
```

3. Open your browser to the local development server URL (typically http://localhost:5173)

## Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory and can be served by any static file server.

## Project Structure

```
/src
 ├─ api/          # API clients for PokeAPI and local JSON server
 ├─ components/   # React components organized by feature
 ├─ hooks/        # Custom React hooks
 ├─ pages/        # Page components for routing
 ├─ types/        # TypeScript type definitions
 ├─ utils/        # Utility functions
 ├─ App.tsx       # Main application component with routes
 └─ main.tsx      # Application entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Data provided by [PokéAPI](https://pokeapi.co/)
- Icons from [Lucide React](https://lucide.dev/)