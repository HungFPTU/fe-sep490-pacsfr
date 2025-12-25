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
        fullName: 'Họ và tên',
        email: 'Email',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
        dateOfBirth: 'Ngày sinh',
        gender: 'Giới tính',
        nationality: 'Quốc tịch',
        idCard: 'Số CMND/CCCD',
        priority: 'Ưu tiên',
        notes: 'Ghi chú',
        remark: 'Nhận xét',
        description: 'Mô tả',
        title: 'Tiêu đề',
        name: 'Tên',
        staffId: 'Mã nhân viên',
        staffName: 'Tên nhân viên',
        departmentId: 'Mã phòng ban',
        organizationId: 'Mã tổ chức',
        processedAt: 'Thời gian xử lý',
        handlerName: 'Người xử lý',
        stepName: 'Tên bước',
        stepOrder: 'Thứ tự bước',
        order: 'Thứ tự',
        priorityLevel: 'Mức ưu tiên',
        totalFee: 'Tổng phí',
        isPayment: 'Đã thanh toán',
        submissionMethod: 'Hình thức nộp',
        currentStep: 'Bước hiện tại',
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

    // Skip id fields (not needed for user display)
    if (key === 'id' || key === 'guestId' || key === 'serviceId' || key === 'receivedBy') return false;
    
    // Skip variations of these fields
    if (key.toLowerCase().includes('guestid') || key.toLowerCase().includes('serviceid') || key.toLowerCase().includes('receivedby')) {
        return false;
    }

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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-6 border-b border-slate-200 pb-4">
                <h3 className="text-2xl font-bold text-slate-900">Thông tin chi tiết</h3>
                <p className="mt-1 text-sm text-slate-600">
                    Toàn bộ chi tiết hồ sơ và dữ liệu xử lý
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <tbody className="divide-y divide-slate-200">
                        {fields.map((field, index) => (
                            <tr key={field.key} className={`hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                <td className="w-1/3 px-6 py-4 text-sm font-semibold text-slate-700 border-r border-slate-200">
                                    {field.label}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-900">
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

