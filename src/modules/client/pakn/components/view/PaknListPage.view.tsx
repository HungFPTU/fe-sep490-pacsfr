"use client";

import { PaknLookupCard } from '../ui';
import { Search, Zap, Lock, CheckCircle2 } from 'lucide-react';


export const PaknListPageView: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
                <div className="text-center space-y-3">
                    <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Tra cứu phản ánh kiến nghị
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tra cứu nhanh PAKN của bạn</h1>
                    <p className="text-slate-600">Nhập mã PAKN hoặc tên người gửi để xem thông tin phản ánh và tải tài liệu đính kèm.</p>
                </div>

                {/* Step by Step Guide */}
                <div className="w-full">
                    <h2 className="text-center text-2xl font-bold text-slate-900 mb-8">Cách tra cứu PAKN</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-blue-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4 mx-auto">
                                    1
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Nhập mã PAKN</h3>
                                <div className="flex justify-center mb-3">
                                    <Search className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Tìm và nhập mã PAKN của bạn</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-blue-300" />
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-purple-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-4 mx-auto">
                                    2
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Gửi OTP</h3>
                                <div className="flex justify-center mb-3">
                                    <Zap className="h-8 w-8 text-purple-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Nhấn gửi mã OTP để xác thực</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-purple-500 to-purple-300" />
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-green-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg mb-4 mx-auto">
                                    3
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Nhập mã OTP</h3>
                                <div className="flex justify-center mb-3">
                                    <Lock className="h-8 w-8 text-green-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Nhập mã OTP được gửi đến email/SMS</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-green-500 to-green-300" />
                        </div>

                        {/* Step 4 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-red-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 font-bold text-lg mb-4 mx-auto">
                                    ✓
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Tải tài liệu</h3>
                                <div className="flex justify-center mb-3">
                                    <CheckCircle2 className="h-8 w-8 text-red-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Xem thông tin và tải file PAKN</p>
                            </div>
                        </div>
                    </div>
                </div>

                <PaknLookupCard className="w-full" />
            </div>
        </div>
    );
};

