import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Extract search query from URL if on search page
    if (location.pathname === '/search') {
      const searchParams = new URLSearchParams(location.search);
      const q = searchParams.get('q') || '';
      setQuery(q);
    } else {
      setQuery('');
    }
  }, [location]);
  
  useEffect(() => {
    // Auto focus the input when on search page
    if (location.pathname === '/search' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.pathname]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
    
    if (location.pathname === '/search') {
      navigate('/search');
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pokémon by name..."
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Search Pokémon"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;