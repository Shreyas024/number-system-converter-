import React from 'react';
import { Clipboard, Check } from 'lucide-react';

type NumberBase = 'binary' | 'decimal' | 'octal' | 'hexadecimal';

interface ConversionResultProps {
  base: NumberBase;
  value: string;
  isSource: boolean;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ base, value, isSource }) => {
  const [copied, setCopied] = React.useState(false);

  const baseInfo = {
    binary: { label: 'Binary', prefix: '0b', color: 'from-blue-500 to-blue-600' },
    decimal: { label: 'Decimal', prefix: '', color: 'from-purple-500 to-purple-600' },
    octal: { label: 'Octal', prefix: '0o', color: 'from-teal-500 to-teal-600' },
    hexadecimal: { label: 'Hexadecimal', prefix: '0x', color: 'from-orange-500 to-orange-600' }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDisplayValue = (val: string, base: NumberBase) => {
    if (!val) return '';
    
    if (base === 'binary') {
      // Group binary in sets of 4 for readability
      return val.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
    }
    if (base === 'hexadecimal') {
      // Group hexadecimal in sets of 2 for readability
      return val.replace(/\B(?=(\w{2})+(?!\w))/g, ' ').toUpperCase();
    }
    
    return val;
  };

  return (
    <div className={`p-4 rounded-lg border ${
      isSource 
        ? 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
    } transition-all duration-200`}>
      <div className="flex justify-between items-center mb-2">
        <div className={`text-sm font-medium bg-gradient-to-r ${baseInfo[base].color} bg-clip-text text-transparent`}>
          {baseInfo[base].label}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Clipboard size={16} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
          )}
        </button>
      </div>
      <div className="font-mono text-lg text-slate-800 dark:text-slate-200 break-all min-h-[32px]">
        {baseInfo[base].prefix && value && (
          <span className="text-slate-500 dark:text-slate-400 mr-1">{baseInfo[base].prefix}</span>
        )}
        {formatDisplayValue(value, base)}
      </div>
    </div>
  );
};

export default ConversionResult;