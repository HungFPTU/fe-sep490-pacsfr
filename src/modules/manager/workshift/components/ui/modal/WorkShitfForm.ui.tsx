'use client';

import React from 'react';
import {
  DateField,
  TimeField,
} from '@/shared/components/layout/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { WorkShiftFormValues } from '../../../hooks/useWorkShiftForm';
import { SHIFT_TYPE_TIMES } from '../../../constants';
import {
  validateShiftDate,
  validateStartTimeRequired,
  validateEndTimeRequired,
  validateShiftTypeRequired,
} from '../../../utils/validation';
import { ShiftTypeSelect } from './ShiftTypeSelect.ui';

// Helper to get first error from field
function getFirstError(field: {
  state: {
    meta: {
      touchedErrors?: Array<string | undefined>;
      errors?: Array<string | undefined>;
      isTouched?: boolean;
    };
  };
}): string | null {
  const te = field.state.meta.touchedErrors;
  const e = field.state.meta.errors;
  const isTouched = field.state.meta.isTouched;

  const arr = isTouched
    ? Array.isArray(e) && e.length
      ? e
      : []
    : Array.isArray(te) && te.length
    ? te
    : [];

  const first = (arr as Array<string | undefined>).find(
    (m): m is string => typeof m === 'string' && m.length > 0,
  );
  return first ?? null;
}

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

      {/* Start / End Time - Disabled */}
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
              disabled={true}
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
              disabled={true}
            />
          )}
        </form.Field>
      </div>

      {/* Shift Type - Custom Select */}
      <form.Field
        name="shiftType"
        validators={{
          onChange: ({ value }) => validateShiftTypeRequired(value),
        }}
      >
        {(field) => {
          const error = getFirstError(field);

          const handleShiftTypeChange = (shiftType: string) => {
            field.handleChange(shiftType);
            const times = SHIFT_TYPE_TIMES[shiftType];
            if (times) {
              form.setFieldValue('startTime', times.startTime);
              form.setFieldValue('endTime', times.endTime);
            }
          };

          return (
            <ShiftTypeSelect
              value={field.state.value}
              onChange={handleShiftTypeChange}
              disabled={isLoading}
              placeholder="Chọn loại ca làm việc"
              error={error}
              label="Loại ca"
              required
            />
          );
        }}
      </form.Field>
    </div>
  );
}
