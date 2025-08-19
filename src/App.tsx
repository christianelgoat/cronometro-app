import React from 'react';
import { useStopwatch } from './hooks/useStopwatch';
import { StopwatchDisplay } from './components/StopwatchDisplay';
import { ControlButton } from './components/ControlButton';

const formatTime = (time: number): string => {
  const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const centiseconds = Math.floor((time / 10) % 100).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
};

const App: React.FC = () => {
  const { time, isRunning, start, stop, reset } = useStopwatch();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto text-center border border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-cyan-400 tracking-wider">Cronómetro</h1>
        <StopwatchDisplay time={formatTime(time)} />
        <div className="flex justify-center space-x-4 mt-8">
            {!isRunning ? (
                <ControlButton onClick={start} className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
                    Iniciar
                </ControlButton>
            ) : (
                <ControlButton onClick={stop} className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
                    Detener
                </ControlButton>
            )}
            <ControlButton 
              onClick={reset} 
              disabled={time === 0 && !isRunning} 
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none focus:ring-gray-500"
            >
                Reiniciar
            </ControlButton>
        </div>
      </div>
       <footer className="text-center mt-8 text-gray-500">
            <p>Creado con React y Tailwind CSS.</p>
        </footer>
    </div>
  );
};

export default App;
