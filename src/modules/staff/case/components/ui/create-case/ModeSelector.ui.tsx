"use client";

import React from "react";
import { UserPlus, FileText, ArrowRight } from "lucide-react";

interface ModeSelectorProps {
    onSelectCreateGuest: () => void;
    onSelectCreateCase: () => void;
}

export function ModeSelector({ onSelectCreateGuest, onSelectCreateCase }: ModeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Create Guest Card */}
            <button 
                onClick={onSelectCreateGuest}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
            >
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <UserPlus className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                            Tạo khách hàng mới
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </h2>
                        <p className="text-sm text-gray-500">
                            Nhập thông tin công dân mới vào hệ thống và tạo hồ sơ
                        </p>
                    </div>
                </div>
            </button>

            {/* Create Case Card */}
            <button 
                onClick={onSelectCreateCase}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
            >
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <FileText className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                            Tạo hồ sơ mới
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </h2>
                        <p className="text-sm text-gray-500">
                            Tạo hồ sơ cho khách hàng đã có trong hệ thống
                        </p>
                    </div>
                </div>
            </button>
        </div>
    );
}
