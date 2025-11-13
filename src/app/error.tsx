'use client';

import { useEffect } from 'react';
import { Button } from '@/shared/components/ui/button.ui';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Application error:', error);
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Đã xảy ra lỗi
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    {error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'}
                </p>

                <div className="flex gap-3 justify-center">
                    <Button
                        onClick={reset}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                    >
                        Thử lại
                    </Button>
                    <Button
                        onClick={() => (window.location.href = '/')}
                        variant="outline"
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Về trang chủ
                    </Button>
                </div>

                {process.env.NODE_ENV === 'development' && error.digest && (
                    <p className="mt-4 text-xs text-gray-400">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}

