/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { accountApiService } from '../../services/account.service';
import { getValuesPage } from '@/types/rest';
import type { OrgUnit, Account, CreateAccountRequest, UpdateAccountRequest, AccountLogin } from '../../types';
import { InputField, SelectField, TextareaField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';

type FormValues = {
  orgUnitId: string;
  staffCode: string;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  position: string;
  roleType: string;
  specialization: string;
  isActive?: boolean | string;
  createdBy: string;
  note: string;
  modifiedBy?: string;
};

const ROLE_OPTIONS = [
  { label: 'Quản trị viên', value: 'admin' },
  { label: 'Nhân viên', value: 'staff' },
];

interface Props {
  onClose: () => void;
  fetch: () => void;
  initData: Account | null | undefined;
  currentAccount: AccountLogin | null;
}

const CreateModal: React.FC<Props> = ({ onClose, fetch, initData, currentAccount }) => {
  const [orgUnitOptions, setOrgUnitOptions] = useState<{ label: string; value: string }[]>([]);

  const toFormValues = (acc?: Partial<FormValues> | null): FormValues => ({
  orgUnitId: acc?.orgUnitId ?? '',
  staffCode: acc?.staffCode ?? '',
  fullName: acc?.fullName ?? '',
  username: acc?.username ?? '',
  isActive: acc?.isActive ?? true,
  password: '',
  email: acc?.email ?? '',
  phone: acc?.phone ?? '',
  position: acc?.position ?? '',
  roleType: acc?.roleType ?? 'staff',
  specialization: acc?.specialization ?? '',
  createdBy: currentAccount?.subject ?? '',
  modifiedBy: currentAccount?.subject ?? '',
  note: acc?.note ?? '',
});

  const form = useForm({
    defaultValues: toFormValues(initData ?? null),
    onSubmit: async ({ value }) => {
      try {
        if (initData?.id) {
          const normalizedValue = { ...value } as FormValues;
          if (normalizedValue.isActive === 'true') {
            normalizedValue.isActive = true;
          } else if (normalizedValue.isActive === 'false') {
            normalizedValue.isActive = false;
          }
          normalizedValue.modifiedBy = currentAccount?.subject || '';
          normalizedValue.createdBy = currentAccount?.subject || '';
          const { password, ...rest } = normalizedValue as UpdateAccountRequest & { password?: string };
          const payload: UpdateAccountRequest = password ? (normalizedValue as UpdateAccountRequest) : (rest as UpdateAccountRequest);
          
          const res = await accountApiService.updateAccount(initData.id, payload);
          if (res?.success) fetch();
        } else {
          const res = await accountApiService.createAccount(value as CreateAccountRequest);
          if (res?.success) fetch();
        }
        onClose();
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    form.reset(toFormValues(initData ?? null));
  }, [initData?.id, currentAccount]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await accountApiService.getAllOrgUnits('', true, 1, 100);
        if (cancelled) return;
        if (res?.success) {
          const page = getValuesPage<OrgUnit>(res);
          const options = page.items.map((ou) => ({ label: ou.unitName, value: ou.id }));
          setOrgUnitOptions(options);
        } else {
          setOrgUnitOptions([]);
        }
      } catch (err) {
        if (!cancelled) setOrgUnitOptions([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleOk = () => form.handleSubmit();

  return (
    <BaseModal
      open
      onClose={onClose}
      title={initData?.id ? 'Cập nhật tài khoản' : 'Tạo tài khoản'}
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
        <InputField<FormValues> form={form} name="fullName" label="Họ tên" required />
        {!initData?.id && <InputField<FormValues> form={form} name="username" label="Tên đăng nhập" required />}
        {!initData?.id && <InputField<FormValues> form={form} name="staffCode" label="Mã nhân sự" required />}
        {!initData?.id && <InputField<FormValues> form={form} name="password" label="Mật khẩu" type="password" placeholder="••••••" />}
        <InputField<FormValues> form={form} name="email" label="Email" type="email" required />
        <InputField<FormValues> form={form} name="phone" label="Số điện thoại" />
        <InputField<FormValues> form={form} name="position" label="Chức vụ" />
        {!initData?.id && <SelectField<FormValues, string>
          form={form as FormApiOf<FormValues>}
          name="orgUnitId"
          label="Đơn vị"
          required
          options={orgUnitOptions}
        />}
        <SelectField<FormValues, string>
          form={form}
          name="roleType"
          label="Vai trò"
          required
          options={ROLE_OPTIONS}
        />
        {initData?.id && <SelectField<FormValues, boolean>
          form={form}
          name="isActive"
          label="Trạng thái"
          required
          options={[
            { label: 'Kích hoạt', value: true },
            { label: 'Ngừng kích hoạt', value: false },
          ]}
        />}
        <InputField<FormValues> form={form} name="specialization" label="Chuyên môn" />
        {initData?.id ? <InputField<FormValues> className="md:col-span-1" form={form} name="modifiedBy" label="Người chỉnh sửa"/> : <InputField<FormValues> className="md:col-span-2" form={form} name="createdBy" label="Người tạo"/>}
        <TextareaField<FormValues>
          className="md:col-span-2"
          form={form}
          name="note"
          label="Ghi chú (tuỳ chọn)"
          rows={4}
        />
      </div>
    </BaseModal>
  );
};

export default CreateModal;
