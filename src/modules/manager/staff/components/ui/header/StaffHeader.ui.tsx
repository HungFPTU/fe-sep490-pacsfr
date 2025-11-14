'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Plus, Users } from 'lucide-react';

interface StaffHeaderProps {
    onCreateClick: () => void;
}

export function StaffHeader({ onCreateClick }: StaffHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý nhân viên</h1>
                    <p className="text-sm text-gray-500">Quản lý thông tin nhân viên và phân quyền</p>
                </div>
            </div>

            <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onCreateClick}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                Tạo nhân viên mới
            </Button>
        </div>
    );
}

