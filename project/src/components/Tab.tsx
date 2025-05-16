import React from 'react';

interface TabProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

export const Tab: React.FC<TabProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 font-medium text-sm transition-all duration-200 ${
        active
          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};