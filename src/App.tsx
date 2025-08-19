import React, { useState, useEffect } from 'react';
import { useStopwatch } from './hooks/useStopwatch';
import { StopwatchDisplay } from './components/StopwatchDisplay';
import { ControlButton } from './components/ControlButton';

// Interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const centiseconds = Math.floor((time / 10) % 100).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
};

const App: React.FC = () => {
  const { time, isRunning, start, stop, reset } = useStopwatch();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setInstallPrompt(null);
  };

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

        {installPrompt && (
          <div className="mt-8">
            <button
              onClick={handleInstallClick}
              className="w-full px-6 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 animate-pulse"
            >
              Instalar Aplicación
            </button>
          </div>
        )}
      </div>
       <footer className="text-center mt-8 text-gray-500">
            <p>Creado con React y Tailwind CSS.</p>
        </footer>
    </div>
  );
};

export default App;
