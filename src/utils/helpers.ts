import { Pokemon } from '../types/pokemon';

// Format Pokemon ID to display with leading zeros (e.g., #001, #025)
export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, '0')}`;
};

// Format Pokemon height from decimeters to meters
export const formatHeight = (height: number): string => {
  const heightInMeters = height / 10;
  return `${heightInMeters.toFixed(1)} m`;
};

// Format Pokemon weight from hectograms to kilograms
export const formatWeight = (weight: number): string => {
  const weightInKg = weight / 10;
  return `${weightInKg.toFixed(1)} kg`;
};

// Get a color based on Pokemon type for styling
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
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
  
  return typeColors[type.toLowerCase()] || '#CCCCCC';
};

// Format stat name for better display
export const formatStatName = (stat: string): string => {
  const statNames: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  
  return statNames[stat.toLowerCase()] || stat;
};

// Get the English description from flavor_text_entries
export const getEnglishDescription = (flavorTexts: any[]): string => {
  const englishEntry = flavorTexts.find(
    entry => entry.language.name === 'en'
  );
  
  return englishEntry ? 
    englishEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') : 
    'No description available.';
};

// Get the primary type of a Pokemon (first in the list)
export const getPrimaryType = (pokemon: Pokemon): string => {
  return pokemon.types[0]?.type.name || 'normal';
};

// Calculate the percentage for a stat (based on max value of 255)
export const calculateStatPercentage = (value: number): number => {
  const MAX_STAT_VALUE = 255;
  return (value / MAX_STAT_VALUE) * 100;
};