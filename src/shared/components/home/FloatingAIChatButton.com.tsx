'use client';

import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export  function FloatingAIChatButton() {
  return (
    <Link
      href="/chatBot"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Chat với AI ngay"
    >
      {/* Desktop: Pill-shaped with Avatar + Text */}
      <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200">
        {/* AI Avatar */}
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>

        {/* Text */}
        <span className="font-medium text-sm whitespace-nowrap">
          Chat với AI ngay
        </span>
      </div>

      {/* Mobile: Circle with Icon only */}
      <div className="md:hidden w-14 h-14 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center">
        <Bot className="w-6 h-6" />
      </div>
    </Link>
  );
}

