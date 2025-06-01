import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Swords } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-xl font-bold text-red-500 flex items-center"
          >
            <span className="text-2xl">PokéDex</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-red-500 transition-colors ${isActive ? 'font-bold text-red-500' : ''}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `text-gray-700 hover:text-red-500 transition-colors ${isActive ? 'font-bold text-red-500' : ''}`
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/battle"
            className={({ isActive }) =>
              `text-gray-700 hover:text-red-500 transition-colors ${isActive ? 'font-bold text-red-500' : ''}`
            }
          >
            Battle
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/search" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </Link>
          <Link
            to="/battle"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Battle"
          >
            <Swords className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;