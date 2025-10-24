/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { InputField, SelectField, TextareaField } from '@/shared/components/manager/form/BaseForm';
import type { FormApiOf } from '@/types/types';
import type { LegalBasis, ServiceGroupResponse, Services, ServicesRequest } from '../../types';
import { serviceAPI } from '../../services/services.service';
import { getValuesPage } from '@/types/rest';

type FormValues = {
  id?: string;
  serviceGroupId: string;
  legalBasisId: string;
  serviceName: string;
  serviceCode: string;
  description: string;
  serviceType: string;
  processingTime: string;
  feeAmount: number | string;
  resultDocument: string;
  isOnlineAvailable: boolean;
  isActive: boolean; 
};

interface Props {
  onClose: () => void;
  fetch: () => void;
  initData: Services | null | undefined;
}

const SERVICE_TYPE_OPTIONS = [
  { label: 'Trực tiếp', value: 'Trực tiếp' },
  { label: 'Trực tuyến', value: 'Trực tuyến' },
];

const BOOL_OPTIONS = [
  { label: 'Có', value: true },
  { label: 'Không', value: false },
];

const toFormValues = (s?: Partial<Services> | null): FormValues => ({
  id: s?.id,
  serviceGroupId: s?.serviceGroupId ?? '',
  legalBasisId: s?.legalBasisId ?? '',
  serviceName: s?.serviceName ?? '',
  serviceCode: s?.serviceCode ?? '',
  description: s?.description ?? '',
  serviceType: s?.serviceType ?? '',
  processingTime: s?.processingTime ?? '',
  feeAmount: typeof s?.feeAmount === 'number' ? s!.feeAmount : (s?.feeAmount) ?? 0,
  resultDocument: s?.resultDocument ?? '',
  isOnlineAvailable: s?.isOnlineAvailable ?? true,
  isActive: s?.isActive ?? true,
});

const ServiceUpsertModal: React.FC<Props> = ({ onClose, fetch, initData }) => {
  const [serviceGroupOptions, setServiceGroupOptions] = useState<{ label: string; value: string }[]>([]);
  const [legalBasisOptions, setLegalBasisOptions] = useState<{ label: string; value: string }[]>([]); 
  const isEdit = !!initData?.id;

  const form = useForm({
    defaultValues: toFormValues(initData ?? null),
    onSubmit: async ({ value }) => {
      try {
        const feeAmountNum = typeof value.feeAmount === 'string' ? Number(value.feeAmount) : value.feeAmount;
        const normalized = { ...value } as FormValues;
        normalized.id = initData!.id as string;
        normalized.feeAmount = feeAmountNum as number;
         const { ...rest } = normalized as ServicesRequest;
         const payload: ServicesRequest = (rest as ServicesRequest);

        if (isEdit) {
          const res = await serviceAPI.updateService(initData!.id, payload);
          if (res?.success) fetch();
        } else {
          const res = await serviceAPI.createService(payload);
          if (res?.success) fetch();
        }
        onClose();
      } catch (e) {
        console.error('Upsert service failed', e);
      }
    },
  });

  useEffect(() => {
    form.reset(toFormValues(initData ?? null));
  }, [initData?.id]);

  useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const res = await serviceAPI.getAllLegalBasics('', true, 1, 100);
          const res2 = await serviceAPI.getAllServiceGroups('', true, 1, 100);
          if (cancelled) return;
          if (res?.success) {
            const page = getValuesPage<LegalBasis>(res);
            const page2 = getValuesPage<ServiceGroupResponse>(res2);
            const options = page.items.map((ou) => ({ label: ou.name, value: ou.id }));
            const options2 = page2.items.map((ou) => ({ label: ou.groupName, value: ou.id }));
            setLegalBasisOptions(options);
            setServiceGroupOptions(options2);
          } else {
            setLegalBasisOptions([]);
            setServiceGroupOptions([]);
          }
        } catch (err) {
          console.error(err);
          if (!cancelled) { 
            setLegalBasisOptions([]);
            setServiceGroupOptions([]);
          } 
        }
      })();
      return () => { cancelled = true; };
    }, []);

  const handleOk = () => form.handleSubmit();

  return (
    <BaseModal
      open
      onClose={onClose}
      title={isEdit ? 'Cập nhật dịch vụ' : 'Tạo dịch vụ'}
      onOk={handleOk}
      onCancel={onClose}
      okText="Lưu"
      cancelText="Hủy"
      centered
      size="large"
      maskClosable
      keyboard
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Thông tin chính */}
        <InputField<FormValues> form={form} name="serviceName" label="Tên dịch vụ" required />
        <InputField<FormValues> form={form} name="serviceCode" label="Mã dịch vụ" required />

        <SelectField<FormValues, string>
          form={form as FormApiOf<FormValues>}
          name="serviceGroupId"
          label="Nhóm dịch vụ"
          required
          options={serviceGroupOptions}
          placeholder="— Chọn nhóm dịch vụ —"
        />

        <SelectField<FormValues, string>
          form={form as FormApiOf<FormValues>}
          name="legalBasisId"
          label="Căn cứ pháp lý"
          required
          options={legalBasisOptions}
          placeholder="— Chọn căn cứ pháp lý —"
        />

        <SelectField<FormValues, string>
          form={form as FormApiOf<FormValues>}
          name="serviceType"
          label="Hình thức"
          required
          options={SERVICE_TYPE_OPTIONS}
          placeholder="— Chọn hình thức —"
        />

        <InputField<FormValues> form={form} name="processingTime" label="Thời gian xử lý" placeholder="VD: 6 ngày" />

        <InputField<FormValues>
          form={form}
          name="feeAmount"
          label="Phí (VND)"
          type="number"
          placeholder="VD: 100000"
        />

        <InputField<FormValues> form={form} name="resultDocument" label="Tài liệu kết quả" />

        <SelectField<FormValues, boolean>
          form={form}
          name="isOnlineAvailable"
          label="Hỗ trợ trực tuyến"
          required
          options={BOOL_OPTIONS}
        />

        <SelectField<FormValues, boolean>
          form={form}
          name="isActive"
          label="Trạng thái"
          required
          options={[
            { label: 'Đang hoạt động', value: true },
            { label: 'Ngừng hoạt động', value: false },
          ]}
        />

        <TextareaField<FormValues>
          className="md:col-span-2"
          form={form}
          name="description"
          label="Mô tả"
          rows={4}
        />
      </div>
    </BaseModal>
  );
};

export default ServiceUpsertModal;
