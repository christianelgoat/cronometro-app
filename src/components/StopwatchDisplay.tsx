import React from 'react';

interface StopwatchDisplayProps {
  time: string;
}

export const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ time }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
      <p className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold tracking-widest text-cyan-300 select-none">
        {time}
      </p>
    </div>
  );
};
