'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useStaffDetail, useServiceGroups, useAssignServiceGroups } from '../../../hooks';
import { formatDateVN } from '@core/utils/date';
import { LoadingSpinner } from '@/shared/components/common';
import { getOne } from '@/types/rest';
import { StaffDetail } from '../../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import {
    getRoleTypeLabel,
    getStatusLabel,
    getPositionLabel,
    getBadgeStyle,
    getRoleTypeStyle,
    getStatusStyle,
    formatPhoneNumber,
    formatEmail
} from '../../../utils';

interface StaffDetailModalProps {
    open: boolean;
    onClose: () => void;
    staffId: string | null;
}

export function StaffDetailModal({ open, onClose, staffId }: StaffDetailModalProps) {
    const { data, isLoading } = useStaffDetail(staffId || '', {
        enabled: !!staffId && open,
    });
    const { data: serviceGroupsData, isLoading: isLoadingServiceGroups } = useServiceGroups();
    const assignServiceGroupsMutation = useAssignServiceGroups();
    const { addToast } = useGlobalToast();
    const [selectedServiceGroupId, setSelectedServiceGroupId] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const staff = getOne(data as any) as StaffDetail | undefined;

    const serviceGroups = serviceGroupsData || [];

    const handleAddServiceGroup = async () => {
        if (!staffId || !selectedServiceGroupId) {
            addToast({
                message: 'Vui lòng chọn nhóm dịch vụ',
                type: 'error',
            });
            return;
        }

        try {
            await assignServiceGroupsMutation.mutateAsync({
                staffId,
                data: {
                    serviceGroups: [
                        {
                            serviceGroupId: selectedServiceGroupId,
                            isActive: true,
                        },
                    ],
                },
            });

            addToast({
                message: 'Thêm chuyên môn thành công',
                type: 'success',
            });

            setSelectedServiceGroupId('');
            // Refetch staff detail to show updated service groups
            // The query will automatically refetch due to invalidation in the mutation
        } catch (error) {
            console.error('Error assigning service group:', error);
            addToast({
                message: 'Thêm chuyên môn thất bại',
                type: 'error',
            });
        }
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Chi tiết nhân viên"
            footer={null}
            centered
            size="large"
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                </div>
            ) : staff ? (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                {staff.avatarUrl ? (
                                    <Image
                                        src={staff.avatarUrl}
                                        alt={staff.fullName}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-blue-600">
                                        {staff.fullName.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{staff.fullName}</h2>
                                <p className="text-sm text-gray-600">{staff.staffCode} • {staff.position}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className={`${getBadgeStyle()} ${getRoleTypeStyle(staff.roleType)}`}>
                                        {getRoleTypeLabel(staff.roleType)}
                                    </span>
                                    <span className={`${getBadgeStyle()} ${getStatusStyle(staff.isActive)}`}>
                                        {getStatusLabel(staff.isActive)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            Thông tin cơ bản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Mã nhân viên" value={staff.staffCode} />
                            <InfoItem label="Họ và tên" value={staff.fullName} />
                            <InfoItem label="Tên đăng nhập" value={staff.username} />
                            <InfoItem label="Email" value={formatEmail(staff.email)} />
                            <InfoItem label="Số điện thoại" value={formatPhoneNumber(staff.phone)} />
                            <InfoItem label="Chức vụ" value={getPositionLabel(staff.position)} />
                            {staff.avatarUrl && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Ảnh đại diện</p>
                                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={staff.avatarUrl}
                                            alt={staff.fullName}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Vai trò</p>
                                <span className={`${getBadgeStyle()} ${getRoleTypeStyle(staff.roleType)}`}>
                                    {getRoleTypeLabel(staff.roleType)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Trạng thái</p>
                                <span className={`${getBadgeStyle()} ${getStatusStyle(staff.isActive)}`}>
                                    {getStatusLabel(staff.isActive)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Organization Info */}
                    {(staff.orgUnit || staff.orgUnitName) && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                Thông tin cơ quan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem
                                    label="Tên cơ quan"
                                    value={staff.orgUnit?.unitName || staff.orgUnitName || 'Chưa có'}
                                />
                                <InfoItem
                                    label="Mã cơ quan"
                                    value={staff.orgUnit?.unitCode || 'Chưa có'}
                                />
                            </div>
                        </div>
                    )}

                    {/* Department Info */}
                    {staff.department && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                Thông tin phòng ban
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Tên phòng ban" value={staff.department.name} />
                                <InfoItem label="Mã phòng ban" value={staff.department.code} />
                            </div>
                        </div>
                    )}

                    {/* Work Shift Info */}
                    {staff.workShift && (
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                Thông tin ca làm việc
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Tên ca" value={staff.workShift.shiftName} />
                                <InfoItem
                                    label="Thời gian"
                                    value={`${staff.workShift.startTime} - ${staff.workShift.endTime}`}
                                />
                            </div>
                        </div>
                    )}

                    {/* Additional Info */}
                    {staff.specialization && (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                Thông tin bổ sung
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <InfoItem label="Chuyên môn" value={staff.specialization} />
                            </div>
                        </div>
                    )}

                    {/* Service Groups Info */}
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                                Thông tin chuyên môn
                            </h3>
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedServiceGroupId}
                                    onChange={(e) => setSelectedServiceGroupId(e.target.value)}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    disabled={isLoadingServiceGroups || assignServiceGroupsMutation.isPending}
                                >
                                    <option value="">Thêm chuyên môn cho Staff</option>
                                    {serviceGroups.map((sg) => (
                                        <option key={sg.id} value={sg.id}>
                                            {sg.groupName}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    onClick={handleAddServiceGroup}
                                    disabled={!selectedServiceGroupId || assignServiceGroupsMutation.isPending}
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Thêm chuyên môn
                                </Button>
                            </div>
                        </div>
                        {staff.serviceGroups?.$values && staff.serviceGroups.$values.length > 0 ? (
                            <div className="space-y-4">
                                {staff.serviceGroups.$values.map((sg, index) => (
                                    <div
                                        key={sg.id || index}
                                        className="bg-white rounded-lg border border-orange-200 p-4 space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex rounded bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                                                    {sg.serviceGroupName}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ({sg.serviceGroupCode})
                                                </span>
                                            </div>
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    sg.proficiencyLevel === 'Expert'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : sg.proficiencyLevel === 'Advanced'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : sg.proficiencyLevel === 'Intermediate'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {sg.proficiencyLevel}
                                            </span>
                                        </div>
                                        {sg.notes && (
                                            <div className="pt-2 border-t border-orange-100">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Ghi chú: </span>
                                                    {sg.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-orange-200 p-4 text-center text-sm text-gray-500">
                                Chưa có chuyên môn nào được gán
                            </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            Thông tin hệ thống
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Ngày tạo" value={formatDateVN(staff.createdAt)} />
                            <InfoItem label="Người tạo" value={staff.createdBy} />
                            {staff.modifiedAt && (
                                <>
                                    <InfoItem label="Ngày cập nhật" value={formatDateVN(staff.modifiedAt)} />
                                    {staff.modifiedBy && <InfoItem label="Người cập nhật" value={staff.modifiedBy} />}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">Không tìm thấy thông tin nhân viên</p>
                </div>
            )}
        </BaseModal>
    );
}

function InfoItem({ label, value, className = "" }: { label: string; value?: string; className?: string }) {
    return (
        <div className={`space-y-1 ${className}`}>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-sm text-gray-900 font-medium">{value || '-'}</p>
        </div>
    );
}

