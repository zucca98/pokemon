import axios from 'axios';
import { z } from 'zod';
import { FavoriteSchema, NoteSchema, Favorite, Note } from '../types/pokemon';

const api = axios.create({
  baseURL: '/api-local'
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

// Favorites API
export const fetchFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await api.get('/favorites');
    return z.array(FavoriteSchema).parse(response.data);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Failed to fetch favorites');
  }
};

export const addFavorite = async (pokemonId: number, pokemonName: string): Promise<Favorite> => {
  try {
    const newFavorite = {
      pokemonId,
      pokemonName,
      addedAt: new Date().toISOString()
    };
    
    const response = await api.post('/favorites', newFavorite);
    return validateResponse(FavoriteSchema, response.data);
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw new Error('Failed to add favorite');
  }
};

export const removeFavorite = async (id: string): Promise<void> => {
  try {
    await api.delete(`/favorites/${id}`);
  } catch (error) {
    console.error(`Error removing favorite ${id}:`, error);
    throw new Error(`Failed to remove favorite ${id}`);
  }
};

// Notes API
export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get('/notes');
    return z.array(NoteSchema).parse(response.data);
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Failed to fetch notes');
  }
};

export const fetchNotesByPokemonId = async (pokemonId: number): Promise<Note[]> => {
  try {
    const response = await api.get(`/notes?pokemonId=${pokemonId}`);
    return z.array(NoteSchema).parse(response.data);
  } catch (error) {
    console.error(`Error fetching notes for Pokemon ${pokemonId}:`, error);
    throw new Error(`Failed to fetch notes for Pokemon ${pokemonId}`);
  }
};

export const addNote = async (pokemonId: number, content: string): Promise<Note> => {
  try {
    const now = new Date().toISOString();
    const newNote = {
      pokemonId,
      content,
      createdAt: now,
      updatedAt: now
    };
    
    const response = await api.post('/notes', newNote);
    return validateResponse(NoteSchema, response.data);
  } catch (error) {
    console.error('Error adding note:', error);
    throw new Error('Failed to add note');
  }
};

export const updateNote = async (id: string, content: string): Promise<Note> => {
  try {
    const response = await api.patch(`/notes/${id}`, {
      content,
      updatedAt: new Date().toISOString()
    });
    return validateResponse(NoteSchema, response.data);
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw new Error(`Failed to update note ${id}`);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw new Error(`Failed to delete note ${id}`);
  }
};