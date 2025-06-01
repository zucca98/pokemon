import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavorites, addFavorite, removeFavorite } from '../api/local';
import { Favorite } from '../types/pokemon';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: ({ pokemonId, pokemonName }: { pokemonId: number, pokemonName: string }) => 
      addFavorite(pokemonId, pokemonName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const isFavorite = (pokemonId: number): boolean => {
    return favorites.some((favorite: Favorite) => favorite.pokemonId === pokemonId);
  };

  const getFavoriteId = (pokemonId: number): string | undefined => {
    const favorite = favorites.find((fav: Favorite) => fav.pokemonId === pokemonId);
    return favorite?.id;
  };

  return {
    favorites,
    isLoading,
    error,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isFavorite,
    getFavoriteId,
  };
};