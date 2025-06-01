import React, { useState, useCallback } from 'react';
import { BattlePokemon, Move, BattleState } from '../../types/battle';
import { calculateDamage, getEffectivenessMessage, formatMoveName } from '../../utils/battle';
import BattlePokemonView from './BattlePokemonView';
import MoveSelector from './MoveSelector';
import BattleLog from './BattleLog';

interface BattleArenaProps {
  pokemon1: BattlePokemon;
  pokemon2: BattlePokemon;
}

const BattleArena: React.FC<BattleArenaProps> = ({ pokemon1: initialPokemon1, pokemon2: initialPokemon2 }) => {
  const [battleState, setBattleState] = useState<BattleState>({
    pokemon1: { ...initialPokemon1, currentHp: initialPokemon1.stats.hp },
    pokemon2: { ...initialPokemon2, currentHp: initialPokemon2.stats.hp },
    turn: 1,
    isPlayer1Turn: initialPokemon1.stats.speed >= initialPokemon2.stats.speed,
    battleLog: ['Battle starts!'],
    winner: null
  });
  
  const executeMove = useCallback((move: Move) => {
    setBattleState(prevState => {
      if (prevState.winner) return prevState;
      
      const attacker = prevState.isPlayer1Turn ? prevState.pokemon1 : prevState.pokemon2;
      const defender = prevState.isPlayer1Turn ? prevState.pokemon2 : prevState.pokemon1;
      
      const { damage, effectiveness, isCritical } = calculateDamage({
        attacker,
        defender,
        move
      });
      
      const newDefenderHp = Math.max(0, defender.currentHp - damage);
      const effectivenessMessage = getEffectivenessMessage(effectiveness);
      
      const newLogs = [
        `${attacker.name} used ${formatMoveName(move.name)}!`,
        isCritical ? 'A critical hit!' : '',
        effectivenessMessage,
        `${defender.name} took ${damage} damage!`
      ].filter(Boolean);
      
      const updatedDefender = { ...defender, currentHp: newDefenderHp };
      const winner = newDefenderHp === 0 ? attacker : null;
      
      if (winner) {
        newLogs.push(`${winner.name} wins the battle!`);
      }
      
      return {
        pokemon1: prevState.isPlayer1Turn ? attacker : updatedDefender,
        pokemon2: prevState.isPlayer1Turn ? updatedDefender : attacker,
        turn: prevState.turn + 1,
        isPlayer1Turn: !prevState.isPlayer1Turn,
        battleLog: [...prevState.battleLog, ...newLogs],
        winner
      };
    });
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <BattlePokemonView
          pokemon={battleState.pokemon1}
          isActive={battleState.isPlayer1Turn}
        />
        <BattlePokemonView
          pokemon={battleState.pokemon2}
          isActive={!battleState.isPlayer1Turn}
        />
      </div>
      
      {!battleState.winner && (
        <MoveSelector
          moves={battleState.isPlayer1Turn ? battleState.pokemon1.moves : battleState.pokemon2.moves}
          onSelectMove={executeMove}
          disabled={!!battleState.winner}
        />
      )}
      
      <BattleLog messages={battleState.battleLog} />
    </div>
  );
};

export default BattleArena;