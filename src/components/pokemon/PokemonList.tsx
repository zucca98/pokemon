import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonById } from '../../api/pokeapi';
import PokemonCard from './PokemonCard';
import { useFavorites } from '../../hooks/useFavorites';
import { Loader2 } from 'lucide-react';

const PokemonList: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { favorites } = useFavorites();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: async ({ pageParam = 0 }) => {
      const listResponse = await fetchPokemonList(20, pageParam);
      
      // Fetch detailed information for each Pokemon
      const detailedPokemon = await Promise.all(
        listResponse.results.map(async (pokemon) => {
          const details = await fetchPokemonById(pokemon.id);
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: details.types.map(t => t.type.name),
            imageUrl: details.sprites.other?.['official-artwork'].front_default || 
                     details.sprites.front_default || ''
          };
        })
      );
      
      return {
        ...listResponse,
        results: detailedPokemon
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return null;
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get('offset');
      return offset ? parseInt(offset) : null;
    }
  });
  
  const lastPokemonRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPage) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);
  
  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Failed to load Pokémon data. Please try again later.</p>
      </div>
    );
  }
  
  const allPokemon = data?.pages.flatMap(page => 
    page.results.map(pokemon => {
      const favorite = favorites.find(fav => fav.pokemonId === pokemon.id);
      
      return {
        ...pokemon,
        isFavorite: !!favorite,
        favoriteId: favorite?.id
      };
    })
  );
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {allPokemon?.map((pokemon, index) => (
        <div
          key={pokemon.id}
          ref={index === allPokemon.length - 1 ? lastPokemonRef : undefined}
        >
          <PokemonCard 
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            imageUrl={pokemon.imageUrl}
            isFavorite={pokemon.isFavorite}
            favoriteId={pokemon.favoriteId}
          />
        </div>
      ))}
      
      {isFetchingNextPage && (
        <div className="col-span-full flex justify-center py-4">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      )}
    </div>
  );
};

export default PokemonList;