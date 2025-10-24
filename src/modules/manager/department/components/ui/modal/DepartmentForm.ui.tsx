'use client';

import React from 'react';
import { InputField, TextareaField, CheckboxField, SelectField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { DEPARTMENT_LEVELS } from '../../../enums';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage, RestPaged } from '@/types/rest';
import { ServiceGroup } from '@/modules/manager/service-group/types';

type FormValues = {
    serviceGroupId: string;
    code: string;
    name: string;
    description: string;
    levelOrder: number;
    isActive: boolean;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const DepartmentForm: React.FC<Props> = ({ form, isEdit }) => {
    // Fetch service groups for dropdown
    const { data: serviceGroupsData } = useServiceGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as RestPaged<ServiceGroup>) : null;
    const serviceGroups = pageResult?.items || [];

    const serviceGroupOptions = serviceGroups.map((sg: ServiceGroup) => ({
        value: sg.id,
        label: sg.groupName,
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
                name="serviceGroupId"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Nhóm dịch vụ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="serviceGroupId"
                        label="Nhóm dịch vụ"
                        required
                        options={serviceGroupOptions}
                        placeholder="Chọn nhóm dịch vụ"
                    />
                )}
            </form.Field>

            <form.Field
                name="code"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Mã phòng ban là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="code"
                        label="Mã phòng ban"
                        required
                        placeholder="Nhập mã phòng ban"
                        disabled={isEdit}
                    />
                )}
            </form.Field>

            <form.Field
                name="name"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Tên phòng ban là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="name"
                        label="Tên phòng ban"
                        required
                        placeholder="Nhập tên phòng ban"
                    />
                )}
            </form.Field>

            <form.Field
                name="levelOrder"
                validators={{
                    onChange: ({ value }: { value: number }) =>
                        value === undefined || value === null ? 'Cấp độ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="levelOrder"
                        label="Cấp độ"
                        required
                        options={DEPARTMENT_LEVELS.map((level) => ({
                            value: level.value.toString(),
                            label: level.label,
                        }))}
                        placeholder="Chọn cấp độ"
                    />
                )}
            </form.Field>

            <div className="flex items-end pb-2">
                <CheckboxField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="isActive"
                    label="Kích hoạt"
                />
            </div>

            <TextareaField<FormValues>
                className="md:col-span-2"
                form={form as FormApiOf<FormValues>}
                name="description"
                label="Mô tả"
                placeholder="Nhập mô tả phòng ban"
                rows={3}
            />
        </div>
    );
};

