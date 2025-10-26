/**
 * Loading Redirect Component
 * 
 * Shows loading while redirecting instead of 403 page
 */

'use client';

import React from 'react';

interface LoadingRedirectProps {
    message?: string;
}

export function LoadingRedirect({
    message = "Đang chuyển hướng..."
}: LoadingRedirectProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Loading Card */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100 p-8 text-center">
                    {/* Loading Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                            <div className="w-8 h-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        </div>
                    </div>

                    {/* Loading Message */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Đang xử lý...</h2>
                        <p className="text-slate-600">
                            {message}
                        </p>
                    </div>

                    {/* Loading Animation */}
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Hệ thống PASCS - Dịch vụ hành chính công
                    </div>
                </div>
            </div>
        </div>
    );
}
