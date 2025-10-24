'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { OrgUnitForm } from './OrgUnitForm.ui';
import { useOrgUnitForm } from '../../../hooks/useOrgUnitForm';
import type { OrgUnit } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: OrgUnit | null;
    onSuccess?: () => void;
}

export const CreateOrgUnitModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading, handleSubmit } = useOrgUnitForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật cơ quan' : 'Tạo cơ quan mới'}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
        >
            <OrgUnitForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

