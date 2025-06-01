import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById } from '../api/pokeapi';
import { BattlePokemon, Move, MoveCategory } from '../types/battle';

// List of common moves with their properties
const movePool: Move[] = [
  { name: 'tackle', type: 'normal', power: 40, accuracy: 100, category: MoveCategory.PHYSICAL },
  { name: 'quick-attack', type: 'normal', power: 40, accuracy: 100, category: MoveCategory.PHYSICAL },
  { name: 'slam', type: 'normal', power: 80, accuracy: 75, category: MoveCategory.PHYSICAL },
  { name: 'hyper-beam', type: 'normal', power: 150, accuracy: 90, category: MoveCategory.SPECIAL },
  { name: 'flamethrower', type: 'fire', power: 90, accuracy: 100, category: MoveCategory.SPECIAL },
  { name: 'fire-blast', type: 'fire', power: 110, accuracy: 85, category: MoveCategory.SPECIAL },
  { name: 'hydro-pump', type: 'water', power: 110, accuracy: 80, category: MoveCategory.SPECIAL },
  { name: 'surf', type: 'water', power: 90, accuracy: 100, category: MoveCategory.SPECIAL },
  { name: 'thunderbolt', type: 'electric', power: 90, accuracy: 100, category: MoveCategory.SPECIAL },
  { name: 'thunder', type: 'electric', power: 110, accuracy: 70, category: MoveCategory.SPECIAL },
  { name: 'psychic', type: 'psychic', power: 90, accuracy: 100, category: MoveCategory.SPECIAL },
  { name: 'ice-beam', type: 'ice', power: 90, accuracy: 100, category: MoveCategory.SPECIAL },
  { name: 'earthquake', type: 'ground', power: 100, accuracy: 100, category: MoveCategory.PHYSICAL },
  { name: 'stone-edge', type: 'rock', power: 100, accuracy: 80, category: MoveCategory.PHYSICAL },
  { name: 'close-combat', type: 'fighting', power: 120, accuracy: 100, category: MoveCategory.PHYSICAL },
  { name: 'dragon-claw', type: 'dragon', power: 80, accuracy: 100, category: MoveCategory.PHYSICAL }
];

// Get random moves based on Pokémon type
const getRandomMoves = (types: string[]): Move[] => {
  const moves: Move[] = [];
  const typePool = [...movePool];
  
  // First, try to get STAB moves
  for (let i = 0; i < 2 && typePool.length > 0; i++) {
    const stabMoves = typePool.filter(move => types.includes(move.type));
    if (stabMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * stabMoves.length);
      moves.push(stabMoves[randomIndex]);
      typePool.splice(typePool.indexOf(stabMoves[randomIndex]), 1);
    }
  }
  
  // Fill remaining slots with random moves
  while (moves.length < 4 && typePool.length > 0) {
    const randomIndex = Math.floor(Math.random() * typePool.length);
    moves.push(typePool[randomIndex]);
    typePool.splice(randomIndex, 1);
  }
  
  return moves;
};

// Convert API Pokemon to Battle Pokemon
const convertToBattlePokemon = (pokemon: any): BattlePokemon => {
  const types = pokemon.types.map((t: any) => t.type.name);
  
  return {
    id: pokemon.id,
    name: pokemon.name,
    types,
    stats: {
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      specialAttack: pokemon.stats[3].base_stat,
      specialDefense: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat
    },
    moves: getRandomMoves(types),
    currentHp: pokemon.stats[0].base_stat
  };
};

export const useRandomBattle = () => {
  // Generate two different random Pokemon IDs
  const generateRandomIds = () => {
    const id1 = Math.floor(Math.random() * 898) + 1; // Max Pokemon ID is 898
    let id2;
    do {
      id2 = Math.floor(Math.random() * 898) + 1;
    } while (id2 === id1);
    
    return [id1, id2];
  };
  
  const [pokemon1Id, pokemon2Id] = generateRandomIds();
  
  const { data: pokemon1, isLoading: isLoading1 } = useQuery({
    queryKey: ['randomPokemon1', pokemon1Id],
    queryFn: () => fetchPokemonById(pokemon1Id).then(convertToBattlePokemon)
  });
  
  const { data: pokemon2, isLoading: isLoading2 } = useQuery({
    queryKey: ['randomPokemon2', pokemon2Id],
    queryFn: () => fetchPokemonById(pokemon2Id).then(convertToBattlePokemon)
  });
  
  return {
    pokemon1,
    pokemon2,
    isLoading: isLoading1 || isLoading2
  };
};