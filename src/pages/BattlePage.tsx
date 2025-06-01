import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import BattleArena from '../components/battle/BattleArena';
import { useRandomBattle } from '../hooks/useRandomBattle';
import { Loader2, Swords } from 'lucide-react';
import Button from '../components/ui/Button';

const BattlePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isRandom, setIsRandom] = useState(true);
  const { pokemon1, pokemon2, isLoading } = useRandomBattle();
  
  const handleNewBattle = () => {
    // Invalidate current random Pokemon queries to force new ones
    queryClient.invalidateQueries({ queryKey: ['randomPokemon1'] });
    queryClient.invalidateQueries({ queryKey: ['randomPokemon2'] });
  };
  
  if (isLoading || !pokemon1 || !pokemon2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-red-500 mb-4" />
        <p className="text-gray-600">Preparing for battle...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pokémon Battle</h1>
        <Button
          onClick={handleNewBattle}
          leftIcon={<Swords className="w-5 h-5" />}
        >
          New Random Battle
        </Button>
      </div>
      
      <BattleArena
        pokemon1={pokemon1}
        pokemon2={pokemon2}
      />
    </div>
  );
}

export default BattlePage;