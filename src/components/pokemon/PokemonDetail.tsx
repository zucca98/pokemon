import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Heart } from 'lucide-react';
import { fetchPokemonByName, fetchPokemonSpecies } from '../../api/pokeapi';
import { useFavorites } from '../../hooks/useFavorites';
import { 
  formatPokemonId, 
  getTypeColor, 
  formatHeight, 
  formatWeight,
  formatStatName,
  calculateStatPercentage,
  getEnglishDescription 
} from '../../utils/helpers';
import Button from '../ui/Button';
import PokemonNotes from './PokemonNotes';

interface PokemonDetailProps {
  pokemonName: string;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemonName }) => {
  const { 
    isFavorite, 
    getFavoriteId,
    addFavorite: addToFavorites,
    removeFavorite: removeFromFavorites
  } = useFavorites();
  
  const { 
    data: pokemon, 
    isLoading: isPokemonLoading,
    error: pokemonError
  } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonByName(pokemonName),
  });
  
  const { 
    data: species, 
    isLoading: isSpeciesLoading,
    error: speciesError
  } = useQuery({
    queryKey: ['species', pokemonName],
    queryFn: () => fetchPokemonSpecies(pokemonName),
    enabled: !!pokemon,
  });
  
  const isLoading = isPokemonLoading || isSpeciesLoading;
  const hasError = pokemonError || speciesError;
  
  const handleFavoriteToggle = () => {
    if (!pokemon) return;
    
    if (isFavorite(pokemon.id)) {
      const favoriteId = getFavoriteId(pokemon.id);
      if (favoriteId) {
        removeFromFavorites(favoriteId);
      }
    } else {
      addToFavorites({ pokemonId: pokemon.id, pokemonName: pokemon.name });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
      </div>
    );
  }
  
  if (hasError || !pokemon) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Failed to load Pokémon data. Please try again later.</p>
      </div>
    );
  }
  
  const favorited = isFavorite(pokemon.id);
  const description = species ? getEnglishDescription(species.flavor_text_entries) : 'Loading description...';
  const mainType = pokemon.types[0].type.name;
  const mainTypeColor = getTypeColor(mainType);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-6 flex flex-col md:flex-row items-center"
        style={{ backgroundColor: `${mainTypeColor}33` }}
      >
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default || ''}
            alt={pokemon.name}
            className="w-48 h-48 object-contain filter drop-shadow-md"
          />
        </div>
        
        <div className="md:w-2/3 md:pl-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold capitalize">
              {pokemon.name.replace(/-/g, ' ')}
            </h1>
            <span className="text-2xl font-mono text-gray-500">{formatPokemonId(pokemon.id)}</span>
          </div>
          
          <div className="flex gap-2 mb-4">
            {pokemon.types.map(typeInfo => (
              <span
                key={typeInfo.type.name}
                className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
              >
                {typeInfo.type.name.toUpperCase()}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 mb-4">{description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-semibold">Height</h3>
              <p className="text-lg">{formatHeight(pokemon.height)}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase font-semibold">Weight</h3>
              <p className="text-lg">{formatWeight(pokemon.weight)}</p>
            </div>
          </div>
          
          <Button
            onClick={handleFavoriteToggle}
            variant={favorited ? 'danger' : 'primary'}
            leftIcon={<Heart className={favorited ? 'fill-white' : ''} />}
          >
            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Base Stats</h2>
        <div className="space-y-3">
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="flex items-center">
              <div className="w-24 font-semibold text-gray-700">
                {formatStatName(stat.stat.name)}
              </div>
              <div className="w-12 text-right mr-2">{stat.base_stat}</div>
              <div className="flex-1 h-4 bg-gray-200 rounded overflow-hidden">
                <div 
                  className="h-full rounded"
                  style={{ 
                    width: `${calculateStatPercentage(stat.base_stat)}%`,
                    backgroundColor: mainTypeColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-xl font-bold mt-8 mb-4">Abilities</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities.map(ability => (
            <div 
              key={ability.ability.name}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {ability.ability.name.replace(/-/g, ' ')}
              {ability.is_hidden && (
                <span className="ml-1 text-xs text-gray-500">(Hidden)</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 border-t">
        <PokemonNotes pokemonId={pokemon.id} />
      </div>
    </div>
  );
};

export default PokemonDetail;