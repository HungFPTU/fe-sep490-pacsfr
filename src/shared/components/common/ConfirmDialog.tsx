'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export function ConfirmDialog({
    open,
    title = 'Xác nhận',
    message,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    type = 'danger',
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmDialogProps) {
    const getIconColor = () => {
        switch (type) {
            case 'danger':
                return 'text-red-600';
            case 'warning':
                return 'text-yellow-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <BaseModal
            open={open}
            onClose={onCancel}
            title={title}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={confirmText}
            cancelText={cancelText}
            confirmLoading={loading}
            centered
            size="small"
            maskClosable={!loading}
            keyboard={!loading}
        >
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${getIconColor()}`}>
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {message}
                    </p>
                </div>
            </div>
        </BaseModal>
    );
}

