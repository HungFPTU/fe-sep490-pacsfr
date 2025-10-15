import React from "react";
import { useFormik } from "formik";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as yup from "yup";
import { z } from "zod";

// Yup validation schemas for common forms
export const validationSchemas = {
    // Login form
    login: yup.object({
        username: yup
            .string()
            .required("Tên đăng nhập là bắt buộc")
            .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
        password: yup
            .string()
            .required("Mật khẩu là bắt buộc")
            .min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
    }),

    // Contact form
    contact: yup.object({
        name: yup.string().required("Họ tên là bắt buộc"),
        email: yup
            .string()
            .email("Email không hợp lệ")
            .required("Email là bắt buộc"),
        phone: yup
            .string()
            .matches(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ")
            .required("Số điện thoại là bắt buộc"),
        message: yup
            .string()
            .required("Nội dung là bắt buộc")
            .min(10, "Nội dung phải có ít nhất 10 ký tự"),
    }),
};

// Zod validation schemas
export const zodSchemas = {
    // Login form
    login: z.object({
        username: z
            .string()
            .min(1, "Tên đăng nhập là bắt buộc")
            .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
        password: z
            .string()
            .min(1, "Mật khẩu là bắt buộc")
            .min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
    }),

    // Contact form
    contact: z.object({
        name: z.string().min(1, "Họ tên là bắt buộc"),
        email: z
            .string()
            .min(1, "Email là bắt buộc")
            .email("Email không hợp lệ"),
        phone: z
            .string()
            .min(1, "Số điện thoại là bắt buộc")
            .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ"),
        message: z
            .string()
            .min(1, "Nội dung là bắt buộc")
            .min(10, "Nội dung phải có ít nhất 10 ký tự"),
    }),
};

// Type definitions
export type LoginFormData = z.infer<typeof zodSchemas.login>;
export type ContactFormData = z.infer<typeof zodSchemas.contact>;

// Formik hook wrapper
export function useFormikForm<T extends Record<string, unknown>>(
    initialValues: T,
    validationSchema: yup.ObjectSchema<T>,
    onSubmit: (values: T) => void | Promise<void>
) {
    return useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });
}

// React Hook Form wrapper with Zod
export function useZodForm<T extends Record<string, unknown>>(
    schema: z.ZodSchema<T>,
    options?: Omit<UseFormProps<T>, "resolver">
) {
    return useForm<T>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(schema as any),
        mode: "onBlur",
        ...options,
    } as UseFormProps<T>);
}

// Custom validation hook for complex scenarios
export function useCustomValidation<T extends Record<string, unknown>>(
    initialValues: T,
    validator: (values: T) => Record<string, string>
) {
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});

    const validateField = (name: string, value: unknown) => {
        const newValues = { ...values, [name]: value };
        const newErrors = validator(newValues);
        setErrors(prev => ({ ...prev, [name]: newErrors[name] || "" }));
    };

    const handleChange = (name: string, value: unknown) => {
        setValues(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (name: string) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, values[name]);
    };

    const validate = () => {
        const newErrors = validator(values);
        setErrors(newErrors);
        setTouched(
            Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        return Object.keys(newErrors).length === 0;
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        reset,
        isValid: Object.keys(errors).length === 0,
    };
}
