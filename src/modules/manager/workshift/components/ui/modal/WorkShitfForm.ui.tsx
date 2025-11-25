'use client';

import React from 'react';
import {
  SelectField,
  DateField,
  TimeField,
} from '@/shared/components/layout/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { WorkShiftFormValues } from '../../../hooks/useWorkShiftForm';
import { WORKSHIFT_TYPE_OPTIONS } from '../../../constants';
import {
  validateShiftDate,
  validateStartTimeRequired,
  validateEndTimeRequired,
  validateShiftTypeRequired,
} from '../../../utils/validation';

interface FormProps {
  form: FormApiOf<WorkShiftFormValues>;
  isLoading: boolean;
  isEdit: boolean;
}

export function WorkShiftForm({ form, isLoading }: FormProps) {
  return (
    <div className="space-y-4">
      {/* Shift Date */}
      <form.Field
        name="shiftDate"
        validators={{
          onChange: ({ value }) => validateShiftDate(value),
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
            onChange: ({ value }) => validateStartTimeRequired(value),
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
            onChange: ({ value }) => validateEndTimeRequired(value),
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
          onChange: ({ value }) => validateShiftTypeRequired(value),
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
