import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      
      <div className="mb-8">
        <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        <p className="text-gray-600 mt-2">Maybe this Pokémon is still undiscovered!</p>
      </div>
      
      <Link to="/">
        <Button leftIcon={<Home className="w-4 h-4" />}>
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;