import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchPokemon } from '../api/pokeapi';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/search/SearchBar';
import { useFavorites } from '../hooks/useFavorites';
import { Loader2 } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useFavorites();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);
  
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['searchPokemon', searchQuery],
    queryFn: () => searchQuery ? searchPokemon(searchQuery) : Promise.resolve({ results: [], count: 0, next: null, previous: null }),
    enabled: !!searchQuery,
  });
  
  const renderResults = () => {
    if (!searchQuery) {
      return (
        <div className="text-center text-gray-500 my-12">
          <p>Enter a Pokémon name to search</p>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center my-12">
          <Loader2 className="w-10 h-10 animate-spin text-red-500" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">An error occurred while searching. Please try again.</p>
        </div>
      );
    }
    
    if (data?.results.length === 0) {
      return (
        <div className="text-center text-gray-600 my-12">
          <p>No Pokémon found for "{searchQuery}"</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results.map(pokemon => {
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]);
          
          const favorite = favorites.find(fav => fav.pokemonId === id);
          
          return (
            <PokemonCard
              key={id}
              id={id}
              name={pokemon.name}
              types={[]} // We'll fetch types when we get details
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              isFavorite={!!favorite}
              favoriteId={favorite?.id}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Search Pokémon</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {renderResults()}
    </div>
  );
};

export default SearchPage;