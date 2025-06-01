import React from 'react';
import PokemonList from '../components/pokemon/PokemonList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>
      <PokemonList />
    </div>
  );
};

export default HomePage;