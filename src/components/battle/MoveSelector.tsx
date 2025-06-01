import React from 'react';
import { Move } from '../../types/battle';
import { formatMoveName } from '../../utils/battle';
import { cn } from '../../utils/cn';

interface MoveSelectorProps {
  moves: Move[];
  onSelectMove: (move: Move) => void;
  disabled?: boolean;
}

const MoveSelector: React.FC<MoveSelectorProps> = ({ moves, onSelectMove, disabled }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {moves.map((move, index) => (
        <button
          key={index}
          onClick={() => onSelectMove(move)}
          disabled={disabled}
          className={cn(
            "p-4 rounded-lg text-left transition-colors",
            "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            move.category === 'physical' ? "bg-red-100" : "bg-purple-100"
          )}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">{formatMoveName(move.name)}</span>
            <span className="text-sm px-2 py-1 rounded capitalize bg-white bg-opacity-50">
              {move.type}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Power:</span>
              <span className="ml-1">{move.power}</span>
            </div>
            <div>
              <span className="text-gray-600">Accuracy:</span>
              <span className="ml-1">{move.accuracy}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MoveSelector;