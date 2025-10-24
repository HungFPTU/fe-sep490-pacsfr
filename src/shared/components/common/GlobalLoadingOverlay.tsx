'use client';

import React from 'react';
import { useHttpLoading } from '@shared/hooks';
import { APP_CONFIG } from '@/core/config/constants';
import Image from 'next/image';

export function GlobalLoadingOverlay() {
    const { isLoading } = useHttpLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center">
            {/* Background overlay - Mờ đục */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />

            <div className="relative z-10">
                <div className="absolute inset-0 rounded-full animate-spin-slow">
                    <svg className="w-40 h-40" viewBox="0 0 160 160">
                        <defs>
                            <linearGradient id="vietnam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#DA251D" />
                                <stop offset="50%" stopColor="#FFCD00" />
                                <stop offset="100%" stopColor="#DA251D" />
                            </linearGradient>
                            <linearGradient id="vietnam-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFCD00" />
                                <stop offset="50%" stopColor="#DA251D" />
                                <stop offset="100%" stopColor="#FFCD00" />
                            </linearGradient>
                        </defs>
                        {/* Outer spinning ring - Full circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#vietnam-gradient-1)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="439.8 439.8"
                            strokeDashoffset="109.95"
                            className="animate-shimmer"
                        />
                        {/* Inner spinning ring (opposite direction) - Full circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="65"
                            fill="none"
                            stroke="url(#vietnam-gradient-2)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="408.4 408.4"
                            strokeDashoffset="102.1"
                            className="animate-shimmer-reverse"
                            opacity="0.7"
                        />
                    </svg>
                </div>

                {/* Logo in center with shimmer effect */}
                <div className="relative z-10 w-40 h-40 flex items-center justify-center">
                    <div className="relative animate-pulse-soft">
                        <Image
                            src={APP_CONFIG.LOGO}
                            alt={`Logo ${APP_CONFIG.NAME}`}
                            width={100}
                            height={100}
                            className="drop-shadow-2xl"
                            priority
                        />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
                    </div>
                </div>

                {/* Decorative stars around logo - Màu vàng ngôi sao */}
                <div className="absolute inset-0 animate-rotate-slow">
                    {[0, 72, 144, 216, 288].map((angle, index) => (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 w-2 h-2"
                            style={{
                                transform: `rotate(${angle}deg) translateY(-85px)`,
                                transformOrigin: '0 0',
                            }}
                        >
                            <div
                                className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-twinkle"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes rotate-slow {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes shimmer {
                    0% {
                        stroke-dashoffset: 109.95;
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    100% {
                        stroke-dashoffset: -329.85;
                        opacity: 1;
                    }
                }

                @keyframes shimmer-reverse {
                    0% {
                        stroke-dashoffset: 102.1;
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        stroke-dashoffset: -306.3;
                        opacity: 0.7;
                    }
                }

                @keyframes shimmer-sweep {
                    0% {
                        transform: translateX(-100%) rotate(-10deg);
                    }
                    100% {
                        transform: translateX(200%) rotate(-10deg);
                    }
                }

                @keyframes pulse-soft {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.9;
                        transform: scale(1.02);
                    }
                }

                @keyframes twinkle {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(0.8);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }

                .animate-rotate-slow {
                    animation: rotate-slow 10s linear infinite;
                }

                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }

                .animate-shimmer-reverse {
                    animation: shimmer-reverse 2s ease-in-out infinite;
                }

                .animate-shimmer-sweep {
                    animation: shimmer-sweep 3s ease-in-out infinite;
                }

                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
                }

                .animate-twinkle {
                    animation: twinkle 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

