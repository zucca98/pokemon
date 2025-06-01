import React, { useEffect, useRef } from 'react';

interface BattleLogProps {
  messages: string[];
}

const BattleLog: React.FC<BattleLogProps> = ({ messages }) => {
  const logRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div
      ref={logRef}
      className="bg-gray-100 rounded-lg p-4 h-48 overflow-y-auto"
    >
      {messages.map((message, index) => (
        <p
          key={index}
          className="mb-1 last:mb-0 text-sm font-medium"
        >
          {message}
        </p>
      ))}
    </div>
  );
};

export default BattleLog;