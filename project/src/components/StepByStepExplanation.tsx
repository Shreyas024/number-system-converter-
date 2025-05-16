import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Step {
  title: string;
  explanation: string;
}

interface StepByStepExplanationProps {
  steps: Step[];
}

const StepByStepExplanation: React.FC<StepByStepExplanationProps> = ({ steps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div 
        className="bg-slate-50 dark:bg-slate-800 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <BookOpen size={20} className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Step-by-Step Explanation
          </h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
          {steps.map((step, index) => (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <h4 className="text-md font-medium text-slate-800 dark:text-white mb-2">
                {index + 1}. {step.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{step.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepByStepExplanation;