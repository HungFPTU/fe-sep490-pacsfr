'use client';

import { FormApiOf } from '@/types/types';
import {
  Updater,
} from '@tanstack/react-form';
import * as React from 'react';
import { useId } from 'react';

type Size = 'sm' | 'md' | 'lg';

export type CommonProps<TFormData> = {
  label?: React.ReactNode;
  name: keyof TFormData & string;
  required?: boolean;
  help?: React.ReactNode;
  size?: Size;
  disabled?: boolean;
  className?: string;
};

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(' ');
}

function sizeClass(size: Size = 'md') {
  switch (size) {
    case 'sm':
      return 'h-9 px-3 text-sm';
    case 'lg':
      return 'h-12 px-4 text-base';
    default:
      return 'h-10 px-3 text-sm';
  }
}

export function FormItem({
  label,
  required,
  help,
  error,
  inputId,
  children,
  className,
}: {
  label?: React.ReactNode;
  required?: boolean;
  help?: React.ReactNode;
  error?: string | null;
  inputId?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1 inline-block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {children}
      {help && !error && <div className="mt-1 text-xs text-slate-500">{help}</div>}
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}

type FieldMetaErrors = Array<string | undefined> | undefined;
function getFirstError(field: { state: { meta: { touchedErrors?: FieldMetaErrors; errors?: FieldMetaErrors } } }) {
  const te = field.state.meta.touchedErrors;
  const e = field.state.meta.errors;
  const arr = (Array.isArray(te) && te.length ? te : Array.isArray(e) ? e : []);
  const first = (arr as Array<string | undefined>).find((m): m is string => typeof m === 'string' && m.length > 0);
  return first ?? null;
}

const toStr = (v: unknown): string =>
    v === undefined || v === null ? '' : String(v);

/** Input */
export function InputField<TFormData>({
  form,
  name,
  label,
  required,
  help,
  size = 'md',
  disabled,
  className,
  type = 'text',
  placeholder,
}: CommonProps<TFormData> & {
  form: FormApiOf<TFormData>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <form.Field name={name}>
      {(field) => {
        const error = getFirstError(field);
        return (
          <FormItem label={label} required={required} help={help} error={error} inputId={id} className={className}>
            <input
              id={id}
              type={type}
              disabled={disabled}
              value={(field.state.value as string | number | readonly string[] | undefined) ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.currentTarget.value as unknown as Updater<typeof field.state.value>)}
              placeholder={placeholder}
              className={cx(
                'w-full rounded-xl border bg-white outline-none transition',
                'border-slate-300 focus:border-slate-500',
                !!error && 'border-red-400 focus:border-red-500',
                disabled && 'bg-slate-100 cursor-not-allowed',
                sizeClass(size)
              )}
            />
          </FormItem>
        );
      }}
    </form.Field>
  );
}

/** Textarea */
export function TextareaField<TFormData>({
  form,
  name,
  label,
  required,
  help,
  size = 'md',
  disabled,
  className,
  placeholder,
  rows = 4,
}: CommonProps<TFormData> & {
  form: FormApiOf<TFormData>;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <form.Field name={name}>
      {(field) => {
        const error = getFirstError(field);
        return (
          <FormItem label={label} required={required} help={help} error={error} inputId={id} className={className}>
            <textarea
              id={id}
              disabled={disabled}
              value={(field.state.value as string | undefined) ?? ''}
              onBlur={field.handleBlur}
               onChange={(e) => field.handleChange(e.currentTarget.value as unknown as Updater<typeof field.state.value>)}
              placeholder={placeholder}
              rows={rows}
              className={cx(
                'w-full rounded-xl border bg-white outline-none transition',
                'border-slate-300 focus:border-slate-500',
                !!error && 'border-red-400 focus:border-red-500',
                disabled && 'bg-slate-100 cursor-not-allowed',
                size === 'sm' ? 'p-2 text-sm' : size === 'lg' ? 'p-4 text-base' : 'p-3 text-sm'
              )}
            />
          </FormItem>
        );
      }}
    </form.Field>
  );
}

/** Select (native) */
export function SelectField<TFormData,
  TValue extends string | number | boolean = string>({
  form,
  name,
  label,
  required,
  help,
  size = 'md',
  disabled,
  className,
  placeholder = '— Chọn —',
  options,
}: CommonProps<TFormData> & {
  form: FormApiOf<TFormData>;
  options: Array<{ label: React.ReactNode; value: TValue; disabled?: boolean }>;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <form.Field name={name}>
      {(field) => {
        const error = getFirstError(field);
        return (
          <FormItem label={label} required={required} help={help} error={error} inputId={id} className={className}>
            <select
              id={id}
              disabled={disabled}
              value={(field.state.value as string | number | readonly string[] | undefined) ?? ''}
              onBlur={field.handleBlur}
               onChange={(e) => {
                const raw = (e.currentTarget as HTMLSelectElement).value;
                const cur = field.state.value;

                // Convert string -> kiểu thực tế của field (boolean/number/string)
                let next: unknown = raw;
                if (typeof cur === 'boolean') {
                  next = raw === 'true';
                } else if (typeof cur === 'number') {
                  const n = Number(raw);
                  next = Number.isNaN(n) ? cur : n;
                } // else: string giữ nguyên

                field.handleChange(next as Updater<typeof cur>); // ✅ khớp kiểu Updater
              }}
              className={cx(
                'w-full rounded-xl border bg-white outline-none transition',
                'border-slate-300 focus:border-slate-500',
                !!error && 'border-red-400 focus:border-red-500',
                disabled && 'bg-slate-100 cursor-not-allowed',
                sizeClass(size)
              )}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={String(opt.value)} value={toStr(opt.value)} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormItem>
        );
      }}
    </form.Field>
  );
}

/** Switch (boolean) */
export function SwitchField<TFormData>({
  form,
  name,
  label,
  help,
  disabled,
  className,
}: CommonProps<TFormData> & { form: FormApiOf<TFormData> }) {
  return (
    <form.Field name={name}>
      {(field) => {
        const error = getFirstError(field);
        const checked = Boolean(field.state.value);
        return (
          <FormItem label={label} help={help} error={error} className={className}>
            <button
              type="button"
              aria-pressed={checked}
              onBlur={field.handleBlur}
              onClick={() =>  field.handleChange((checked as unknown as Updater<typeof field.state.value>))}
              disabled={disabled}
              className={cx(
                'relative inline-flex w-12 items-center rounded-full transition',
                checked ? 'bg-slate-900' : 'bg-slate-300',
                disabled && 'opacity-60 cursor-not-allowed',
                'h-6'
              )}
            >
              <span
                className={cx(
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow transition',
                  checked ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </FormItem>
        );
      }}
    </form.Field>
  );
}

/** Checkbox (boolean) */
export function CheckboxField<TFormData>({
  form,
  name,
  label,
  help,
  disabled,
  className
}: CommonProps<TFormData> & { form: FormApiOf<TFormData> }) {
  const id = useId();
  return (
    <form.Field name={name}>
      {(field) => {
        const error = getFirstError(field);
        const checked = !!field.state.value;
        return (
          <FormItem help={help} error={error} inputId={id} className={className}>
            <label htmlFor={id} className={cx('inline-flex items-center gap-2', disabled && 'opacity-60')}>
              <input
                id={id}
                type="checkbox"
                checked={checked}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.currentTarget.checked as unknown as Updater<typeof field.state.value>)}
                disabled={disabled}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-500"
              />
              <span className="text-sm text-slate-700">{label}</span>
            </label>
            {help && <div className="mt-1 text-xs text-slate-500">{help}</div>}
          </FormItem>
        );
      }}
    </form.Field>
  );
}
