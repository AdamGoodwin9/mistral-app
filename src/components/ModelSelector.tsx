import { useState } from 'react';

const MODELS = [
  { id: 'mistral-tiny', name: 'Mistral Tiny' },
  { id: 'mistral-small', name: 'Mistral Small' },
  { id: 'mistral-medium', name: 'Mistral Medium' },
  { id: 'mistral-large-latest', name: 'Mistral Large' },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="relative w-48">
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="w-full appearance-none bg-white dark:bg-gray-700 border dark:border-gray-600 
                   text-gray-900 dark:text-gray-100 py-2 px-4 pr-8 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                   cursor-pointer shadow-sm hover:border-blue-500 dark:hover:border-blue-400
                   transition-colors duration-200"
      >
        {MODELS.map((model) => (
          <option 
            key={model.id} 
            value={model.id}
            className="py-2"
          >
            {model.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-400 dark:text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}