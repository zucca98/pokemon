import React from 'react';
import { BattlePokemon } from '../../types/battle';
import { cn } from '../../utils/cn';

interface BattlePokemonViewProps {
  pokemon: BattlePokemon;
  isActive: boolean;
}

const BattlePokemonView: React.FC<BattlePokemonViewProps> = ({ pokemon, isActive }) => {
  const hpPercentage = (pokemon.currentHp / pokemon.stats.hp) * 100;
  const hpColor = hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className={cn(
      "p-4 rounded-lg transition-all",
      isActive ? "bg-blue-50 shadow-lg scale-105" : "bg-gray-50"
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
        <div className="flex gap-1">
          {pokemon.types.map(type => (
            <span
              key={type}
              className="px-2 py-1 text-xs font-semibold text-white rounded-full capitalize"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>HP</span>
          <span>{pokemon.currentHp} / {pokemon.stats.hp}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all", hpColor)}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">Attack:</span>
          <span className="ml-1 font-medium">{pokemon.stats.attack}</span>
        </div>
        <div>
          <span className="text-gray-600">Defense:</span>
          <span className="ml-1 font-medium">{pokemon.stats.defense}</span>
        </div>
        <div>
          <span className="text-gray-600">Sp. Atk:</span>
          <span className="ml-1 font-medium">{pokemon.stats.specialAttack}</span>
        </div>
        <div>
          <span className="text-gray-600">Sp. Def:</span>
          <span className="ml-1 font-medium">{pokemon.stats.specialDefense}</span>
        </div>
        <div>
          <span className="text-gray-600">Speed:</span>
          <span className="ml-1 font-medium">{pokemon.stats.speed}</span>
        </div>
      </div>
    </div>
  );
};

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
  
  return colors[type.toLowerCase()] || '#CCCCCC';
};

export default BattlePokemonView;