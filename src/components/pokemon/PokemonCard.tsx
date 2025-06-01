import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPokemonId, getTypeColor } from '../../utils/helpers';
import { addFavorite, removeFavorite } from '../../api/local';
import { Favorite } from '../../types/pokemon';
import { cn } from '../../utils/cn';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  isFavorite?: boolean;
  favoriteId?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  id, 
  name, 
  types, 
  imageUrl, 
  isFavorite = false,
  favoriteId
}) => {
  const queryClient = useQueryClient();
  
  const formattedName = name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const primaryType = types[0] || 'normal';
  const backgroundColor = getTypeColor(primaryType);
  
  const addToFavorites = useMutation({
    mutationFn: () => addFavorite(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  const removeFromFavorites = useMutation({
    mutationFn: () => {
      if (!favoriteId) throw new Error('Favorite ID is required for removal');
      return removeFavorite(favoriteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite && favoriteId) {
      removeFromFavorites.mutate();
    } else {
      addToFavorites.mutate();
    }
  };
  
  return (
    <Link 
      to={`/pokemon/${name}`}
      className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div 
        className="p-4 h-40 flex flex-col justify-between transition-transform group-hover:scale-105 duration-300"
        style={{ backgroundColor: `${backgroundColor}33` }}
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="text-gray-700 font-mono">{formatPokemonId(id)}</span>
            <h2 className="text-lg font-bold text-gray-900 capitalize">{formattedName}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {types.map(type => (
                <span 
                  key={type}
                  className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleFavoriteToggle}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            )}
            aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          >
            <Heart className={cn(
              "w-5 h-5",
              isFavorite ? "fill-current" : ""
            )} />
          </button>
        </div>
      </div>
      
      <div className="bg-white p-4 flex justify-center">
        <img 
          src={imageUrl} 
          alt={name}
          className="h-24 w-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default PokemonCard;