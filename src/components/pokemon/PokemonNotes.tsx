import React, { useState } from 'react';
import { useNotes } from '../../hooks/useNotes';
import Button from '../ui/Button';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

interface PokemonNotesProps {
  pokemonId: number;
}

const PokemonNotes: React.FC<PokemonNotesProps> = ({ pokemonId }) => {
  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotes(pokemonId);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<{ id: string, content: string } | null>(null);
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote.trim());
      setNewNote('');
    }
  };
  
  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote && editingNote.content.trim()) {
      updateNote(editingNote.id, editingNote.content.trim());
      setEditingNote(null);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingNote(null);
  };
  
  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Notes</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
        </div>
      ) : (
        <>
          {notes.length === 0 ? (
            <p className="text-gray-500 italic">No notes yet. Add your first note below!</p>
          ) : (
            <ul className="space-y-3">
              {notes.map(note => (
                <li key={note.id} className="bg-gray-50 p-4 rounded-md">
                  {editingNote && editingNote.id === note.id ? (
                    <form onSubmit={handleUpdateNote} className="space-y-2">
                      <textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <Button type="submit" size="sm">Save</Button>
                        <Button type="button" variant="outline" size="sm" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setEditingNote({ id: note.id, content: note.content })}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          aria-label="Edit note"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Last updated: {new Date(note.updatedAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          <form onSubmit={handleAddNote} className="mt-4 space-y-2">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-red-300"
              rows={3}
            />
            <Button
              type="submit"
              disabled={!newNote.trim()}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Note
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default PokemonNotes;