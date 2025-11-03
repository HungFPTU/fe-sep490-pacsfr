"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { UserPlus, FileText } from "lucide-react";

interface ModeSelectorProps {
    onSelectCreateGuest: () => void;
    onSelectCreateCase: () => void;
}

export function ModeSelector({ onSelectCreateGuest, onSelectCreateCase }: ModeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create Guest Card */}
            <Card 
                className="p-8 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
                onClick={onSelectCreateGuest}
            >
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo khách hàng mới</h2>
                    <p className="text-gray-600">
                        Tạo thông tin khách hàng mới vào hệ thống
                    </p>
                </div>
            </Card>

            {/* Create Case Card */}
            <Card 
                className="p-8 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
                onClick={onSelectCreateCase}
            >
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo hồ sơ mới</h2>
                    <p className="text-gray-600">
                        Tạo hồ sơ cho khách hàng đã có trong hệ thống
                    </p>
                </div>
            </Card>
        </div>
    );
}

