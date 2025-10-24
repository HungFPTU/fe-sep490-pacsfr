'use client';

import React from 'react';
import { InputField, TextareaField, CheckboxField } from '@/shared/components/manager/form/BaseForm';
import { ImageUpload } from '@/shared/components/common/ImageUpload';
import { FormApiOf } from '@/types/types';
import { AWS_CONFIG } from '@core/config/aws.config';

type FormValues = {
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const ServiceGroupForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="groupCode"
                label="Mã nhóm"
                required
                placeholder="Nhập mã nhóm dịch vụ"
                disabled={isEdit}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="groupName"
                label="Tên nhóm"
                required
                placeholder="Nhập tên nhóm dịch vụ"
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="displayOrder"
                label="Thứ tự hiển thị"
                type="number"
                placeholder="0"
            />

            <div className="md:col-span-2">
                <form.Field name="iconUrl">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => (
                        <ImageUpload
                            value={field.state.value as string}
                            onChange={(url) => field.handleChange(url as never)}
                            folder={AWS_CONFIG.FOLDERS.SERVICE_GROUP_ICONS}
                            label="Icon nhóm dịch vụ"
                            required
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>

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
                placeholder="Nhập mô tả nhóm dịch vụ"
                rows={4}
            />
        </div>
    );
};

