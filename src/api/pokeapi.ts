/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { z } from 'zod';
import { 
  PokemonSchema, 
  PokemonListResponseSchema,
  PokemonSpeciesSchema,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies
} from '../types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Helper function to parse and validate responses
const validateResponse = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error('Data validation error:', error);
    throw new Error('Failed to validate API response');
  }
};

export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    const data = response.data;

    // Transform the response to include id from URL
    const resultsWithId = data.results.map((pokemon: any) => {
      const urlParts = pokemon.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      return {
        ...pokemon,
        id
      };
    });

    return validateResponse(PokemonListResponseSchema, {
      ...data,
      results: resultsWithId
    });
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw new Error('Failed to fetch Pokemon list');
  }
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const response = await api.get(`/pokemon/${name}`);
    return validateResponse(PokemonSchema, response.data);
  } catch (error) {
    console.error(`Error fetching Pokemon ${name}:`, error);
    throw new Error(`Failed to fetch Pokemon ${name}`);
  }
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return validateResponse(PokemonSchema, response.data);
  } catch (error) {
    console.error(`Error fetching Pokemon #${id}:`, error);
    throw new Error(`Failed to fetch Pokemon #${id}`);
  }
};

export const fetchPokemonSpecies = async (nameOrId: string | number): Promise<PokemonSpecies> => {
  try {
    const response = await api.get(`/pokemon-species/${nameOrId}`);
    return validateResponse(PokemonSpeciesSchema, response.data);
  } catch (error) {
    console.error(`Error fetching Pokemon species ${nameOrId}:`, error);
    throw new Error(`Failed to fetch Pokemon species ${nameOrId}`);
  }
};

export const fetchPokemonByType = async (typeId: number): Promise<PokemonListResponse> => {
  try {
    const response = await api.get(`/type/${typeId}`);
    
    // Transform the type response into a format compatible with PokemonListResponse
    const transformedData = {
      count: response.data.pokemon.length,
      next: null,
      previous: null,
      results: response.data.pokemon.map((p: any) => {
        const urlParts = p.pokemon.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
        return {
          ...p.pokemon,
          id
        };
      })
    };
    
    return validateResponse(PokemonListResponseSchema, transformedData);
  } catch (error) {
    console.error(`Error fetching Pokemon by type ${typeId}:`, error);
    throw new Error(`Failed to fetch Pokemon by type ${typeId}`);
  }
};

export const fetchPokemonByGeneration = async (genId: number): Promise<PokemonListResponse> => {
  try {
    const response = await api.get(`/generation/${genId}`);
    
    // Transform the generation response into a format compatible with PokemonListResponse
    const transformedData = {
      count: response.data.pokemon_species.length,
      next: null,
      previous: null,
      results: response.data.pokemon_species.map((p: any) => {
        const urlParts = p.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
        return {
          ...p,
          id
        };
      })
    };
    
    return validateResponse(PokemonListResponseSchema, transformedData);
  } catch (error) {
    console.error(`Error fetching Pokemon by generation ${genId}:`, error);
    throw new Error(`Failed to fetch Pokemon by generation ${genId}`);
  }
};

export const searchPokemon = async (query: string): Promise<PokemonListResponse> => {
  try {
    // First get a larger list to search from
    const response = await api.get('/pokemon?limit=100');
    const data = response.data;
    
    // Transform results to include id
    const resultsWithId = data.results.map((pokemon: any) => {
      const urlParts = pokemon.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      return {
        ...pokemon,
        id
      };
    });
    
    // Filter results by name containing the query
    const filteredResults = resultsWithId.filter((pokemon: any) => 
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return validateResponse(PokemonListResponseSchema, {
      count: filteredResults.length,
      next: null,
      previous: null,
      results: filteredResults
    });
  } catch (error) {
    console.error(`Error searching Pokemon with query "${query}":`, error);
    throw new Error(`Failed to search Pokemon with query "${query}"`);
  }
};