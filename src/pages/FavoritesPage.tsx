import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById } from '../api/pokeapi';
import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/pokemon/PokemonCard';
import { Loader2 } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading: isFavoritesLoading } = useFavorites();
  
  // Fetch details for each favorite Pokemon
  const { data: pokemonDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['favoritePokemons', favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      
      const details = await Promise.all(
        favorites.map(async (favorite) => {
          const pokemon = await fetchPokemonById(favorite.pokemonId);
          return {
            ...pokemon,
            favoriteId: favorite.id
          };
        })
      );
      
      return details;
    },
    enabled: favorites.length > 0 && !isFavoritesLoading,
  });
  
  const isLoading = isFavoritesLoading || isDetailsLoading;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
      </div>
    );
  }
  
  if (favorites.length === 0) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
        <p className="text-gray-600 mb-6">You haven't added any Pokémon to your favorites yet.</p>
        <p className="text-gray-500">Explore the Pokédex and click the heart icon to add Pokémon to your favorites!</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">My Favorites</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonDetails?.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types.map(t => t.type.name)}
            imageUrl={pokemon.sprites.other?.['official-artwork'].front_default || 
                    pokemon.sprites.front_default || ''}
            isFavorite={true}
            favoriteId={pokemon.favoriteId}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;