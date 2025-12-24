'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FaqAccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

/**
 * FAQ Accordion UI Component
 * Simple accordion for FAQ question/answer display
 */
export function FaqAccordion({ question, answer, defaultOpen = false }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-800 text-sm">{question}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500 shrink-0" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <p className="text-gray-600 text-sm whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}
