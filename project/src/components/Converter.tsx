import React, { useState } from 'react';
import NumberInput from './NumberInput';
import ConversionResult from './ConversionResult';
import StepByStepExplanation from './StepByStepExplanation';
import { Tab } from './Tab';
import { convertNumber, getConversionSteps } from '../utils/conversionUtils';
import { validateInput } from '../utils/validationUtils';
import PracticalApplications from './PracticalApplications';

type NumberBase = 'binary' | 'decimal' | 'octal' | 'hexadecimal';
type NumberType = 'unsigned' | 'signed' | 'twos-complement';

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState<NumberBase>('decimal');
  const [numberType, setNumberType] = useState<NumberType>('unsigned');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('converter');
  const [conversionResults, setConversionResults] = useState<{
    binary: string;
    decimal: string;
    octal: string;
    hexadecimal: string;
  }>({
    binary: '',
    decimal: '',
    octal: '',
    hexadecimal: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Validate input based on selected base
    const validationError = validateInput(value, inputBase);
    setError(validationError);

    // Only perform conversion if input is valid
    if (!validationError && value) {
      try {
        const results = convertNumber(value, inputBase, numberType);
        setConversionResults(results);
      } catch (err) {
        setError('Invalid input for conversion');
      }
    } else if (!value) {
      // Clear results if input is empty
      setConversionResults({
        binary: '',
        decimal: '',
        octal: '',
        hexadecimal: ''
      });
    }
  };

  const handleBaseChange = (base: NumberBase) => {
    setInputBase(base);
    setError('');
    // Validate the current input with the new base
    if (inputValue) {
      const validationError = validateInput(inputValue, base);
      setError(validationError);
      
      if (!validationError) {
        try {
          const results = convertNumber(inputValue, base, numberType);
          setConversionResults(results);
        } catch (err) {
          setError('Invalid input for conversion');
        }
      }
    }
  };

  const handleNumberTypeChange = (type: NumberType) => {
    setNumberType(type);
    // Recalculate conversion with new number type
    if (inputValue && !error) {
      try {
        const results = convertNumber(inputValue, inputBase, type);
        setConversionResults(results);
      } catch (err) {
        setError('Invalid input for conversion');
      }
    }
  };

  // Get conversion steps for explanation
  const steps = getConversionSteps(inputValue, inputBase, numberType);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
          Number System Converter
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Convert between binary, decimal, octal, and hexadecimal number systems with
          step-by-step explanations.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex">
            <Tab 
              active={activeTab === 'converter'} 
              onClick={() => setActiveTab('converter')}
              label="Converter"
            />
            <Tab 
              active={activeTab === 'applications'} 
              onClick={() => setActiveTab('applications')}
              label="Practical Applications"
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'converter' ? (
            <>
              <NumberInput 
                value={inputValue}
                onChange={handleInputChange}
                base={inputBase}
                onBaseChange={handleBaseChange}
                numberType={numberType}
                onNumberTypeChange={handleNumberTypeChange}
                error={error}
              />

              {!error && inputValue && (
                <>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                      Conversion Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(conversionResults).map(([base, value]) => (
                        <ConversionResult 
                          key={base}
                          base={base as NumberBase}
                          value={value}
                          isSource={base === inputBase}
                        />
                      ))}
                    </div>
                  </div>

                  <StepByStepExplanation steps={steps} />
                </>
              )}
            </>
          ) : (
            <PracticalApplications />
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;