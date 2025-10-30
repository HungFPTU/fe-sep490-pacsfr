'use client';

import React from 'react';
import {
  SelectField,
  DateField,
  TimeField,
} from '@/shared/components/layout/manager/form/BaseForm';
import { getValues, getValuesPage, RestMany, RestPaged } from '@/types/rest';
import { FormApiOf } from '@/types/types';
import { WorkShiftFormValues } from '../../../hooks/useWorkShiftForm';
import { WORKSHIFT_TYPE_OPTIONS } from '../../../constants';
import { Staff, useCounters, useStaffs } from '@/modules/manager/staff';
import { Counter } from '../../../types';

interface FormProps {
  form: FormApiOf<WorkShiftFormValues>;
  isLoading: boolean;
  isEdit: boolean;
}

export function WorkShiftForm({ form, isLoading }: FormProps) {
  // Fetch org units for dropdown
  const { data: orgStaffData } = useStaffs({ PageSize: 100 });
  const { data: orgCounterData } = useCounters();

  const orgStaff = getValuesPage(orgStaffData as RestPaged<Staff>);
  const orgCounters = getValues(orgCounterData as RestMany<Counter>);

  const StaffOptions = orgStaff?.items?.map((staff: Staff) => ({
    value: staff.id as string,
    label: staff.fullName,
  })) as { value: string; label: string }[];

  const counterOptions = orgCounters?.map((counter: Counter) => ({
    value: counter.id,
    label: counter.counterName,
  })) as { value: string; label: string }[];

  return (
    <div className="space-y-4">
      {/* Counter */}
      <form.Field
        name="counterId"
        validators={{
          onChange: ({ value }) => (!value ? 'Quầy làm việc là bắt buộc' : undefined),
        }}
      >
        {() => (
          <SelectField<WorkShiftFormValues>
            form={form}
            name="counterId"
            label="Quầy làm việc"
            required
            options={counterOptions}
            placeholder="Chọn quầy làm việc"
            disabled={isLoading}
          />
        )}
      </form.Field>

      {/* Staff */}
      <form.Field
        name="staffId"
        validators={{
          onChange: ({ value }) => (!value ? 'Nhân viên là bắt buộc' : undefined),
        }}
      >
        {() => (
          <SelectField<WorkShiftFormValues>
            form={form}
            name="staffId"
            label="Nhân viên"
            required
            options={StaffOptions}
            placeholder="Chọn nhân viên"
            disabled={isLoading}
          />
        )}
      </form.Field>

      {/* Shift Date */}
      <form.Field
        name="shiftDate"
        validators={{
          onChange: ({ value }) => (!value ? 'Ngày làm việc là bắt buộc' : undefined),
        }}
      >
        {() => (
          <DateField<WorkShiftFormValues>
            form={form}
            name="shiftDate"
            label="Ngày làm việc"
            required
            placeholder="Chọn ngày"
            disabled={isLoading}
          />
        )}
      </form.Field>

      {/* Start / End Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field
          name="startTime"
          validators={{
            onChange: ({ value }) => (!value ? 'Giờ bắt đầu là bắt buộc' : undefined),
          }}
        >
          {() => (
            <TimeField<WorkShiftFormValues>
              form={form}
              name="startTime"
              label="Giờ bắt đầu"
              required
              placeholder="Chọn giờ bắt đầu"
              disabled={isLoading}
            />
          )}
        </form.Field>

        <form.Field
          name="endTime"
          validators={{
            onChange: ({ value }) => (!value ? 'Giờ kết thúc là bắt buộc' : undefined),
          }}
        >
          {() => (
            <TimeField<WorkShiftFormValues>
              form={form}
              name="endTime"
              label="Giờ kết thúc"
              required
              placeholder="Chọn giờ kết thúc"
              disabled={isLoading}
            />
          )}
        </form.Field>
      </div>

      {/* Shift Type */}
      <form.Field
        name="shiftType"
        validators={{
          onChange: ({ value }) => (!value ? 'Loại ca là bắt buộc' : undefined),
        }}
      >
        {() => (
          <SelectField<WorkShiftFormValues>
            form={form}
            name="shiftType"
            label="Loại ca"
            required
            options={WORKSHIFT_TYPE_OPTIONS}
            placeholder="Chọn loại ca làm việc"
            disabled={isLoading}
          />
        )}
      </form.Field>
    </div>
  );
}
