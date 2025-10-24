'use client';

import React, { useEffect, useState } from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import {
  SelectField,
} from '@/shared/components/manager/form/BaseForm';
import { useForm } from '@tanstack/react-form';
import { accountApiService } from '../../services/account.service';
import { Account, AssignDepartmentAccountRequest } from '../../types';
import { departmentApiService } from '@/modules/manager/department/services/account.service';
import { getValuesPage } from '@/types/rest';
import { Department } from '@/modules/manager/department';

interface Props {
  onClose: () => void;
  fetch: () => void;
  initData: Account | null | undefined;
}

type FormValues = {
  departmentId: string;
};

const toFormValues = (acc?: Partial<FormValues> | null): FormValues => ({
  departmentId: acc?.departmentId ?? '',
});

const AssignModal: React.FC<Props> = ({ onClose, fetch, initData }) => {
  const [departmentOptions, setDepartmentOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await departmentApiService.getDataDepartments('', '', true, 1, 100);
        if (cancelled) return;
  
        if (res?.success) {
          const options  =
            (getValuesPage<Department>(res)?.items ?? [])?.map((ou) => ({
              label: ou.name,
              value: ou.id,
            }));
          setDepartmentOptions(options);
        } else {
          setDepartmentOptions([]);
        }
      } catch (err) {
        console.error(err);
        if (cancelled) return;
        setDepartmentOptions([]);
      }
    })();
  
    return () => { cancelled = true; };
  }, []);
  
  const form = useForm({
    defaultValues: toFormValues(null),
    onSubmit: async ({ value }) => {
      if (!value) return;
      try {
        if (initData?.id) {
          const res = await accountApiService.assignDepartment(initData.id, value as AssignDepartmentAccountRequest);
          if (res?.success) {
            fetch();
          }
        }
      } catch (err) {
        console.error('Create account failed', err);
      } finally {
         onClose();
      }
    },
  })

  const handleOk = () => form.handleSubmit();

  return (
    <BaseModal
      open={true}
      onClose={onClose}
      title="Tạo tài khoản"
      onOk={handleOk}
      onCancel={onClose}
      okText="Lưu"
      cancelText="Hủy"
      confirmLoading={false}
      centered
      size="large"
      maskClosable
      keyboard
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <SelectField<FormValues, string>
          form={form}
          name="departmentId"
          label="Chọn phòng ban"
          required
          options={departmentOptions}
        />
      </div>
    </BaseModal>
  );
};

export default AssignModal;
