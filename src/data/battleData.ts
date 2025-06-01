import { BattlePokemon } from '../types/battle';

export const battleData: {
  difficulty: number;
  pokemon1: BattlePokemon;
  pokemon2: BattlePokemon;
  description: string;
}[] = [
  // Easy Battles (1-5)
  {
    difficulty: 1,
    description: "A basic matchup between starter Pokémon",
    pokemon1: {
      id: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
      moves: [
        { name: 'vine-whip', type: 'grass', power: 45, accuracy: 100, category: 'physical' },
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100, category: 'physical' },
        { name: 'razor-leaf', type: 'grass', power: 55, accuracy: 95, category: 'physical' },
        { name: 'poison-powder', type: 'poison', power: 0, accuracy: 75, category: 'special' }
      ],
      currentHp: 45
    },
    pokemon2: {
      id: 4,
      name: 'Charmander',
      types: ['fire'],
      stats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
      moves: [
        { name: 'ember', type: 'fire', power: 40, accuracy: 100, category: 'special' },
        { name: 'scratch', type: 'normal', power: 40, accuracy: 100, category: 'physical' },
        { name: 'dragon-breath', type: 'dragon', power: 60, accuracy: 100, category: 'special' },
        { name: 'smokescreen', type: 'normal', power: 0, accuracy: 100, category: 'special' }
      ],
      currentHp: 39
    }
  },
  {
    difficulty: 2,
    description: "A battle between evolved forms",
    pokemon1: {
      id: 25,
      name: 'Pikachu',
      types: ['electric'],
      stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
      moves: [
        { name: 'thunderbolt', type: 'electric', power: 90, accuracy: 100, category: 'special' },
        { name: 'quick-attack', type: 'normal', power: 40, accuracy: 100, category: 'physical' },
        { name: 'iron-tail', type: 'steel', power: 100, accuracy: 75, category: 'physical' },
        { name: 'thunder-wave', type: 'electric', power: 0, accuracy: 90, category: 'special' }
      ],
      currentHp: 35
    },
    pokemon2: {
      id: 133,
      name: 'Eevee',
      types: ['normal'],
      stats: { hp: 55, attack: 55, defense: 50, specialAttack: 45, specialDefense: 65, speed: 55 },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100, category: 'physical' },
        { name: 'swift', type: 'normal', power: 60, accuracy: 100, category: 'special' },
        { name: 'bite', type: 'dark', power: 60, accuracy: 100, category: 'physical' },
        { name: 'sand-attack', type: 'ground', power: 0, accuracy: 100, category: 'special' }
      ],
      currentHp: 55
    }
  },
  // Medium Battles (6-10)
  {
    difficulty: 6,
    description: "A challenging match between fully evolved starters",
    pokemon1: {
      id: 6,
      name: 'Charizard',
      types: ['fire', 'flying'],
      stats: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
      moves: [
        { name: 'flamethrower', type: 'fire', power: 90, accuracy: 100, category: 'special' },
        { name: 'air-slash', type: 'flying', power: 75, accuracy: 95, category: 'special' },
        { name: 'dragon-claw', type: 'dragon', power: 80, accuracy: 100, category: 'physical' },
        { name: 'earthquake', type: 'ground', power: 100, accuracy: 100, category: 'physical' }
      ],
      currentHp: 78
    },
    pokemon2: {
      id: 9,
      name: 'Blastoise',
      types: ['water'],
      stats: { hp: 79, attack: 83, defense: 100, specialAttack: 85, specialDefense: 105, speed: 78 },
      moves: [
        { name: 'hydro-pump', type: 'water', power: 110, accuracy: 80, category: 'special' },
        { name: 'ice-beam', type: 'ice', power: 90, accuracy: 100, category: 'special' },
        { name: 'flash-cannon', type: 'steel', power: 80, accuracy: 100, category: 'special' },
        { name: 'aqua-tail', type: 'water', power: 90, accuracy: 90, category: 'physical' }
      ],
      currentHp: 79
    }
  },
  // Hard Battles (11-15)
  {
    difficulty: 11,
    description: "An intense battle featuring powerful Pokémon",
    pokemon1: {
      id: 149,
      name: 'Dragonite',
      types: ['dragon', 'flying'],
      stats: { hp: 91, attack: 134, defense: 95, specialAttack: 100, specialDefense: 100, speed: 80 },
      moves: [
        { name: 'outrage', type: 'dragon', power: 120, accuracy: 100, category: 'physical' },
        { name: 'hurricane', type: 'flying', power: 110, accuracy: 70, category: 'special' },
        { name: 'thunder-punch', type: 'electric', power: 75, accuracy: 100, category: 'physical' },
        { name: 'ice-punch', type: 'ice', power: 75, accuracy: 100, category: 'physical' }
      ],
      currentHp: 91
    },
    pokemon2: {
      id: 248,
      name: 'Tyranitar',
      types: ['rock', 'dark'],
      stats: { hp: 100, attack: 134, defense: 110, specialAttack: 95, specialDefense: 100, speed: 61 },
      moves: [
        { name: 'stone-edge', type: 'rock', power: 100, accuracy: 80, category: 'physical' },
        { name: 'crunch', type: 'dark', power: 80, accuracy: 100, category: 'physical' },
        { name: 'earthquake', type: 'ground', power: 100, accuracy: 100, category: 'physical' },
        { name: 'ice-punch', type: 'ice', power: 75, accuracy: 100, category: 'physical' }
      ],
      currentHp: 100
    }
  },
  // Expert Battles (16-20)
  {
    difficulty: 16,
    description: "A legendary confrontation",
    pokemon1: {
      id: 150,
      name: 'Mewtwo',
      types: ['psychic'],
      stats: { hp: 106, attack: 110, defense: 90, specialAttack: 154, specialDefense: 90, speed: 130 },
      moves: [
        { name: 'psychic', type: 'psychic', power: 90, accuracy: 100, category: 'special' },
        { name: 'aura-sphere', type: 'fighting', power: 80, accuracy: 100, category: 'special' },
        { name: 'ice-beam', type: 'ice', power: 90, accuracy: 100, category: 'special' },
        { name: 'thunderbolt', type: 'electric', power: 90, accuracy: 100, category: 'special' }
      ],
      currentHp: 106
    },
    pokemon2: {
      id: 384,
      name: 'Rayquaza',
      types: ['dragon', 'flying'],
      stats: { hp: 105, attack: 150, defense: 90, specialAttack: 150, specialDefense: 90, speed: 95 },
      moves: [
        { name: 'dragon-ascent', type: 'flying', power: 120, accuracy: 100, category: 'physical' },
        { name: 'outrage', type: 'dragon', power: 120, accuracy: 100, category: 'physical' },
        { name: 'v-create', type: 'fire', power: 180, accuracy: 95, category: 'physical' },
        { name: 'extreme-speed', type: 'normal', power: 80, accuracy: 100, category: 'physical' }
      ],
      currentHp: 105
    }
  }
];