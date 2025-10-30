'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useStaffDetail } from '../../../hooks';
import { formatDateVN } from '@core/utils/date';
import { LoadingSpinner } from '@/shared/components/common';
import { getOne } from '@/types/rest';
import { StaffDetail } from '../../../types';
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const staff = getOne(data as any) as StaffDetail | undefined;

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
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {staff.fullName.charAt(0).toUpperCase()}
                                </span>
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

