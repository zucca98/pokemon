import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PokemonDetail from '../components/pokemon/PokemonDetail';
import Button from '../components/ui/Button';

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  
  if (!name) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">No Pokémon specified. Please return to the home page.</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        Back
      </Button>
      
      <PokemonDetail pokemonName={name} />
    </div>
  );
};

export default PokemonDetailPage;