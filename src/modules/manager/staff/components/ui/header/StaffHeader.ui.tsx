'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus, Users } from 'lucide-react';

interface StaffHeaderProps {
    onCreateClick: () => void;
}

export function StaffHeader({ onCreateClick }: StaffHeaderProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Quản lý nhân viên</h1>
                    <p className="text-sm text-muted-foreground">Quản lý thông tin nhân viên và phân quyền</p>
                </div>
            </div>

            <Button
                onClick={onCreateClick}
                size="default"
                className="whitespace-nowrap"
            >
                <Plus className="h-4 w-4" />
                Tạo nhân viên mới
            </Button>
        </div>
    );
}

