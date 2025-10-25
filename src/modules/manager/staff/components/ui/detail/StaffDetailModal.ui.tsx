'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useStaffDetail } from '../../../hooks';
import { Chip } from '@heroui/react';
import { ROLE_TYPE_LABELS } from '../../../enums';
import { formatDateVN } from '@core/utils/date';
import { LoadingSpinner } from '@/shared/components/common';
import { getOne } from '@/types/rest';
import { StaffDetail } from '../../../types';

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
                    {/* Basic Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin cơ bản</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Mã nhân viên" value={staff.staffCode} />
                            <InfoItem label="Họ và tên" value={staff.fullName} />
                            <InfoItem label="Tên đăng nhập" value={staff.username} />
                            <InfoItem label="Email" value={staff.email} />
                            <InfoItem label="Số điện thoại" value={staff.phone} />
                            <InfoItem label="Chức vụ" value={staff.position} />
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Vai trò</p>
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    color={
                                        staff.roleType === 'ADMIN'
                                            ? 'danger'
                                            : staff.roleType === 'MANAGER'
                                                ? 'warning'
                                                : 'primary'
                                    }
                                >
                                    {ROLE_TYPE_LABELS[staff.roleType as keyof typeof ROLE_TYPE_LABELS] ||
                                        staff.roleType}
                                </Chip>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Trạng thái</p>
                                <Chip size="sm" variant="flat" color={staff.isActive ? 'success' : 'default'}>
                                    {staff.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                                </Chip>
                            </div>
                        </div>
                    </div>

                    {/* Organization Info */}
                    {staff.orgUnit && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin cơ quan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Tên cơ quan" value={staff.orgUnit.unitName} />
                                <InfoItem label="Mã cơ quan" value={staff.orgUnit.unitCode} />
                            </div>
                        </div>
                    )}

                    {/* Department Info */}
                    {staff.department && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin phòng ban</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Tên phòng ban" value={staff.department.name} />
                                <InfoItem label="Mã phòng ban" value={staff.department.code} />
                            </div>
                        </div>
                    )}

                    {/* Work Shift Info */}
                    {staff.workShift && (
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin ca làm việc</h3>
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
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin bổ sung</h3>
                            <InfoItem label="Chuyên môn" value={staff.specialization} />
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900">Thông tin hệ thống</h3>
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

function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="text-sm text-gray-900">{value || '-'}</p>
        </div>
    );
}

