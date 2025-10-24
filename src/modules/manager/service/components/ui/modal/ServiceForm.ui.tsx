'use client';

import React from 'react';
import { InputField, TextareaField, CheckboxField, SelectField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { SERVICE_TYPES, EXECUTION_LEVELS, SERVICE_FIELDS } from '../../../enums';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage } from '@/types/rest';

type FormValues = {
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const ServiceForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Fetch service groups for dropdown
    const { data: serviceGroupsData } = useServiceGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as any) : null;
    const serviceGroups = pageResult?.items || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceGroupOptions = serviceGroups.map((group: any) => ({
        value: group.id,
        label: group.groupName,
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="serviceGroupId"
                label="Nhóm dịch vụ"
                required
                options={serviceGroupOptions}
                placeholder="Chọn nhóm dịch vụ"
                disabled={isLoading}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="serviceCode"
                label="Mã dịch vụ"
                required
                placeholder="Nhập mã dịch vụ"
                disabled={isEdit || isLoading}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="serviceName"
                label="Tên dịch vụ"
                required
                placeholder="Nhập tên dịch vụ"
                disabled={isLoading}
            />

            <SelectField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="serviceType"
                label="Loại dịch vụ"
                required
                options={Array.from(SERVICE_TYPES)}
                placeholder="Chọn loại dịch vụ"
                disabled={isLoading}
            />

            <SelectField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="executionLevel"
                label="Cấp thực hiện"
                required
                options={Array.from(EXECUTION_LEVELS)}
                placeholder="Chọn cấp thực hiện"
                disabled={isLoading}
            />

            <SelectField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="field"
                label="Lĩnh vực"
                required
                options={Array.from(SERVICE_FIELDS)}
                placeholder="Chọn lĩnh vực"
                disabled={isLoading}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="decisionNumber"
                label="Số quyết định"
                placeholder="Nhập số quyết định"
                disabled={isLoading}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="resultDocument"
                label="Kết quả giải quyết"
                placeholder="Nhập kết quả giải quyết"
                disabled={isLoading}
            />

            <div className="md:col-span-2">
                <TextareaField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả chi tiết về dịch vụ"
                    rows={3}
                    disabled={isLoading}
                />
            </div>

            <CheckboxField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="isOnlineAvailable"
                label="Hỗ trợ trực tuyến"
                disabled={isLoading}
            />

            <CheckboxField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="isActive"
                label="Kích hoạt"
                disabled={isLoading}
            />
        </div>
    );
};

