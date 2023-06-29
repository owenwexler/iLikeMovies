import React from 'react';

interface RoundButtonProps {
  buttonId: string;
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}

const RoundButton: React.FC<RoundButtonProps> = ({ buttonId, ariaLabel, onClick, children }) => {
  return (
    <button
      id={buttonId}
      aria-labelledby={ariaLabel}
      className={`rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default RoundButton;