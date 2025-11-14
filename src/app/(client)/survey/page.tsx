"use client";

import { useEffect } from "react";

export default function SurveyPage() {
    useEffect(() => {
        // Redirect to Google Form after 2 seconds
        const timer = setTimeout(() => {
            window.open("https://forms.gle/example-survey-form", "_blank");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                        <div className="mb-6">
                            <svg className="w-16 h-16 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-2xl font-bold text-blue-800 mb-2">
                                Khảo sát ý kiến người dân
                            </h1>
                            <p className="text-blue-700">
                                Chúng tôi đang chuyển hướng bạn đến form khảo sát...
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="text-blue-600 font-medium">Đang chuyển hướng...</span>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-blue-200">
                                <p className="text-gray-700 mb-4">
                                    Nếu không tự động chuyển hướng, vui lòng click vào link bên dưới:
                                </p>
                                <a
                                    href="https://forms.gle/example-survey-form"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Mở form khảo sát
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-600">
                            <p>Form khảo sát sẽ mở trong tab mới</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
