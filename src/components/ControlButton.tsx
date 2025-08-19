import React from 'react';

interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  children,
}) => {
  const baseClasses =
    'px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 w-32';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};
