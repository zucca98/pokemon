import { BattlePokemon, Move, BattleAction } from '../types/battle';

// Type effectiveness chart
const typeChart: Record<string, Record<string, number>> = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5
  }
};

export const calculateTypeEffectiveness = (moveType: string, defenderTypes: string[]): number => {
  let effectiveness = 1;
  
  defenderTypes.forEach(type => {
    if (typeChart[moveType]?.[type]) {
      effectiveness *= typeChart[moveType][type];
    }
  });
  
  return effectiveness;
};

export const calculateDamage = (action: BattleAction): { 
  damage: number;
  effectiveness: number;
  isCritical: boolean;
} => {
  const { attacker, defender, move } = action;
  
  // Base damage formula
  const level = 50; // Fixed level for simplicity
  
  // Get attack and defense stats based on move category
  const attack = move.category === 'physical' ? attacker.stats.attack : attacker.stats.specialAttack;
  const defense = move.category === 'physical' ? defender.stats.defense : defender.stats.specialDefense;
  
  // Calculate type effectiveness
  const effectiveness = calculateTypeEffectiveness(move.type, defender.types);
  
  // Critical hit chance (6.25%)
  const isCritical = Math.random() < 0.0625;
  const criticalMultiplier = isCritical ? 1.5 : 1;
  
  // Random factor between 0.85 and 1.00
  const random = 0.85 + (Math.random() * 0.15);
  
  // STAB (Same Type Attack Bonus)
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  
  // Calculate final damage
  const damage = Math.floor(
    ((((2 * level / 5 + 2) * move.power * attack / defense) / 50) + 2) *
    criticalMultiplier *
    random *
    stab *
    effectiveness
  );
  
  return {
    damage,
    effectiveness,
    isCritical
  };
};

export const getEffectivenessMessage = (effectiveness: number): string => {
  if (effectiveness > 2) return "It's super effective!";
  if (effectiveness > 1) return "It's super effective!";
  if (effectiveness === 0) return "It had no effect...";
  if (effectiveness < 1) return "It's not very effective...";
  return "";
};

export const formatMoveName = (name: string): string => {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};