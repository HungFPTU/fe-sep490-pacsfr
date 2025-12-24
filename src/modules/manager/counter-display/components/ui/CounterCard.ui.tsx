'use client';

import React from 'react';
import { User } from 'lucide-react';
import type { CounterDisplayItem } from '../../types';

interface CounterCardProps {
    counter: CounterDisplayItem;
}

export const CounterCard: React.FC<CounterCardProps> = ({ counter }) => {
    const isActive = counter.status === 'active' || counter.status === 'busy';
    
    const formatQueueNumber = (num: number | null): string => {
        if (num === null) return '----';
        return num.toString().padStart(4, '0');
    };

    return (
        <div
            className={`
                rounded-lg border overflow-hidden
                ${isActive 
                    ? 'bg-white border-slate-200' 
                    : 'bg-slate-50 border-slate-100'
                }
            `}
        >
            <div className="flex items-stretch">
                {/* Counter Name - Left side */}
                <div 
                    className={`
                        w-28 flex items-center justify-center px-4 py-6
                        ${isActive 
                            ? 'bg-[#BB141A] text-white' 
                            : 'bg-slate-300 text-slate-500'
                        }
                    `}
                >
                    <span className="font-bold text-sm uppercase tracking-wide">
                        {counter.counterName}
                    </span>
                </div>
                
                {/* Queue Number - Right side */}
                <div className="flex-1 flex items-center justify-center px-6 py-6">
                    <span 
                        className={`
                            font-mono font-extrabold text-5xl tracking-wider
                            ${isActive ? 'text-slate-800' : 'text-slate-300'}
                        `}
                    >
                        {formatQueueNumber(counter.currentQueueNumber)}
                    </span>
                </div>
                
                {/* Staff indicator */}
                {isActive && counter.staffName && (
                    <div className="flex items-center px-4 text-slate-400">
                        <User className="w-4 h-4" />
                    </div>
                )}
            </div>
        </div>
    );
};
