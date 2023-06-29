import React, { Dispatch } from 'react';

interface RoundInputProps {
  inputId: string;
  ariaLabel: string;
  placeholder: string;
  width: '1/2' | '1/3' | '1/4' | '2/3' | 'full'
  currentValue: string;
  setCurrentValue: Dispatch<React.SetStateAction<string>>;
}

const RoundInput: React.FC<RoundInputProps> = ({ inputId, ariaLabel, placeholder, width, currentValue, setCurrentValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setCurrentValue(e.target.value);
  }

  return (
    <input
      id={inputId}
      type="text"
      value={currentValue}
      onChange={handleChange}
      aria-labelledby={ariaLabel}
      className={`rounded-lg px-4 py-2 border-t border-b border-l text-gray-800 border-gray-200 bg-white w-${width}`}
      placeholder={placeholder}
    />
  )
}

export default RoundInput;