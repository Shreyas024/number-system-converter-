import React from 'react';
import { ChevronsUpDown, AlertCircle } from 'lucide-react';

type NumberBase = 'binary' | 'decimal' | 'octal' | 'hexadecimal';
type NumberType = 'unsigned' | 'signed' | 'twos-complement';

interface NumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  base: NumberBase;
  onBaseChange: (base: NumberBase) => void;
  numberType: NumberType;
  onNumberTypeChange: (type: NumberType) => void;
  error: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  base,
  onBaseChange,
  numberType,
  onNumberTypeChange,
  error
}) => {
  const baseOptions: {value: NumberBase; label: string; description: string}[] = [
    { value: 'binary', label: 'Binary', description: 'Base 2 (0,1)' },
    { value: 'decimal', label: 'Decimal', description: 'Base 10 (0-9)' },
    { value: 'octal', label: 'Octal', description: 'Base 8 (0-7)' },
    { value: 'hexadecimal', label: 'Hexadecimal', description: 'Base 16 (0-9,A-F)' }
  ];

  const typeOptions: {value: NumberType; label: string; description: string}[] = [
    { value: 'unsigned', label: 'Unsigned', description: 'Positive numbers only' },
    { value: 'signed', label: 'Signed', description: 'With 1\'s complement' },
    { value: 'twos-complement', label: 'Two\'s Complement', description: 'Common in computing' }
  ];

  const getPlaceholder = () => {
    switch (base) {
      case 'binary': return 'Enter a binary number (e.g., 1010)';
      case 'decimal': return 'Enter a decimal number (e.g., 42)';
      case 'octal': return 'Enter an octal number (e.g., 52)';
      case 'hexadecimal': return 'Enter a hexadecimal number (e.g., 2A)';
      default: return 'Enter a number';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="number-input" className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">
          Number Input
        </label>
        <div className="relative">
          <input
            id="number-input"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={getPlaceholder()}
            className={`w-full px-4 py-3 rounded-lg border ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
            } focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition-all duration-200`}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div>
        <label className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">
          Number Base
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {baseOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onBaseChange(option.value)}
              className={`px-4 py-3 rounded-lg text-center transition-all duration-200 ${
                base === option.value
                  ? 'bg-blue-500 text-white font-medium shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <div className="font-semibold">{option.label}</div>
              <div className="text-xs mt-1 opacity-80">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">
          Number Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {typeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onNumberTypeChange(option.value)}
              className={`px-4 py-3 rounded-lg text-center transition-all duration-200 ${
                numberType === option.value
                  ? 'bg-teal-500 text-white font-medium shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <div className="font-semibold">{option.label}</div>
              <div className="text-xs mt-1 opacity-80">{option.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberInput;