'use client';

import React from 'react';
import type { CaseProgressRaw } from '../../../types';
import { formatDate } from '@/shared/lib/utils';

interface CaseProgressDetailTableProps {
    rawData: CaseProgressRaw | null;
}

/**
 * Format field label to Vietnamese
 */
const getFieldLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
        caseCode: 'Mã số hồ sơ',
        code: 'Mã hồ sơ',
        serviceName: 'Tên thủ tục hành chính',
        service: 'Thủ tục hành chính',
        currentStatus: 'Trạng thái hiện tại',
        status: 'Trạng thái',
        statusName: 'Tên trạng thái',
        statusDescription: 'Mô tả trạng thái',
        createdAt: 'Ngày tạo',
        createdDate: 'Ngày tạo',
        submitDate: 'Ngày nộp hồ sơ',
        updatedAt: 'Ngày cập nhật',
        lastUpdated: 'Ngày cập nhật cuối',
        estimatedCompletionDate: 'Ngày dự kiến hoàn thành',
        expectedCompletion: 'Ngày dự kiến hoàn thành',
        progressPercentage: 'Tiến độ xử lý',
        assignedStaffName: 'Cán bộ phụ trách',
        processingAgency: 'Cơ quan xử lý',
        departmentName: 'Tên phòng ban',
        organizationName: 'Tên tổ chức',
        receivedChannel: 'Hình thức tiếp nhận',
        applicantName: 'Tên người nộp hồ sơ',
        guestName: 'Tên khách hàng',
        citizenName: 'Tên công dân',
    };

    return labelMap[key] || key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

/**
 * Format field value to readable format
 */
const formatFieldValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined) {
        return '-';
    }

    // Format dates
    if (key.includes('Date') || key.includes('At') || key === 'createdAt' || key === 'updatedAt' || key === 'submitDate') {
        if (typeof value === 'string') {
            try {
                return formatDate(value);
            } catch {
                return value;
            }
        }
    }

    // Format percentage
    if (key === 'progressPercentage' && typeof value === 'number') {
        return `${value}%`;
    }

    // Format boolean
    if (typeof value === 'boolean') {
        return value ? 'Có' : 'Không';
    }

    // Format number
    if (typeof value === 'number') {
        return value.toLocaleString('vi-VN');
    }

    // Format string
    if (typeof value === 'string') {
        return value.trim() || '-';
    }

    // Skip complex objects and arrays (they're handled separately)
    if (typeof value === 'object') {
        return '-';
    }

    return String(value);
};

/**
 * Check if field should be displayed
 */
const shouldDisplayField = (key: string, value: unknown): boolean => {
    // Skip internal fields
    if (key.startsWith('$')) return false;

    // Skip id field (not needed for user display)
    if (key === 'id') return false;

    // Skip complex objects and arrays (they're handled in timeline)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Only skip if it's a complex nested object (not a simple value)
        if (key === 'statusHistory' || key === 'progressSteps' || key === 'steps' || key === 'histories' || key === 'timeline') {
            return false;
        }
    }

    // Skip empty values
    if (value === null || value === undefined || value === '') {
        return false;
    }

    return true;
};

export const CaseProgressDetailTable: React.FC<CaseProgressDetailTableProps> = ({ rawData }) => {
    if (!rawData) {
        return null;
    }

    // Extract fields to display
    const fields = Object.entries(rawData)
        .filter(([key, value]) => shouldDisplayField(key, value))
        .map(([key, value]) => ({
            key,
            label: getFieldLabel(key),
            value: formatFieldValue(key, value),
        }))
        .sort((a, b) => {
            // Sort by priority: important fields first
            const priority: Record<string, number> = {
                caseCode: 1,
                serviceName: 2,
                currentStatus: 3,
                status: 4,
                createdAt: 5,
                submitDate: 6,
                updatedAt: 7,
                estimatedCompletionDate: 8,
                progressPercentage: 9,
                assignedStaffName: 10,
                processingAgency: 11,
            };
            const aPriority = priority[a.key] || 99;
            const bPriority = priority[b.key] || 99;
            return aPriority - bPriority;
        });

    if (fields.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900">Thông tin chi tiết</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Thông tin đầy đủ về hồ sơ được hiển thị dưới dạng bảng để tiện theo dõi.
                </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Thông tin
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Giá trị
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {fields.map((field) => (
                            <tr key={field.key} className="transition-colors hover:bg-gray-50">
                                <td className="w-1/3 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                                    {field.label}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="break-words">
                                        {field.value}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

