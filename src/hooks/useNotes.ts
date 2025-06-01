import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotesByPokemonId, addNote, updateNote, deleteNote } from '../api/local';

export const useNotes = (pokemonId: number) => {
  const queryClient = useQueryClient();
  
  const { 
    data: notes = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['notes', pokemonId],
    queryFn: () => fetchNotesByPokemonId(pokemonId),
  });
  
  const addNoteMutation = useMutation({
    mutationFn: (content: string) => addNote(pokemonId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', pokemonId] });
    }
  });
  
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => 
      updateNote(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', pokemonId] });
    }
  });
  
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', pokemonId] });
    }
  });
  
  return {
    notes,
    isLoading,
    error,
    addNote: (content: string) => addNoteMutation.mutate(content),
    updateNote: (id: string, content: string) => 
      updateNoteMutation.mutate({ id, content }),
    deleteNote: (id: string) => deleteNoteMutation.mutate(id),
  };
};