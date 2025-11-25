"use client";

import { useMemo, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { Select } from '@/shared/components/ui/select.ui';
import type { PaknCategoryOption, PaknOrgUnitOption } from '../../../types/response';
import type { PaknSubmitPayload } from '../../../types/request';
import { executeRecaptcha } from '@/shared/lib/recaptcha';
import { ENV } from '@core/config/env';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useVietnamAddress } from '@/shared/hooks/useVietnamAddress';
import { FileUp, MapPin, ShieldCheck, UserRound } from 'lucide-react';

interface PaknSubmitFormProps {
    categories: PaknCategoryOption[];
    orgUnits: PaknOrgUnitOption[];
    isSubmitting: boolean;
    onSubmit: (payload: PaknSubmitPayload) => Promise<void> | void;
}

const DEFAULT_VALUES: PaknSubmitPayload = {
    title: '',
    content: '',
    citizenName: '',
    city: '',
    district: '',
    streetAddress: '',
    phone: '',
    email: '',
    paknCategoryId: '',
    orgUnitId: '',
    captchaToken: '',
};

export const PaknSubmitForm: React.FC<PaknSubmitFormProps> = ({
    categories,
    orgUnits,
    isSubmitting,
    onSubmit,
}) => {
    const [attachments, setAttachments] = useState<File[]>([]);
    const { addToast } = useGlobalToast();
    const {
        provinces,
        provinceOptions,
        getDistrictOptions,
        getDistrictsByProvince,
        isLoading: isAddressLoading,
        isError: isAddressError,
        refetch: refetchAddress,
    } = useVietnamAddress();

    const form = useForm({
        defaultValues: DEFAULT_VALUES,
        onSubmit: async ({ value }) => {
            try {
                const token = await executeRecaptcha(
                    ENV.RECAPTCHA_SITE_KEY ?? '',
                    'pakn_submit',
                );

                // Map city and district codes to names
                const province = provinces.find((p) => p.code === value.city);
                const cityName = province?.name ?? value.city;

                const districts = getDistrictsByProvince(value.city);
                const district = districts.find((d) => d.code === value.district);
                const districtName = district?.name ?? value.district;

                await onSubmit({
                    ...value,
                    city: cityName,
                    district: districtName,
                    captchaToken: token,
                    attachments
                });
                setAttachments([]);
            } catch (error) {
                console.error(error);
                addToast({
                    message: error instanceof Error ? error.message : 'Không thể xác thực reCAPTCHA. Vui lòng thử lại.',
                    type: 'error',
                });
            }
        },
    });

    const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt'];

    const [selectedProvince, setSelectedProvince] = useState<string>(DEFAULT_VALUES.city ?? '');

    const availableDistrictOptions = useMemo(() => {
        return getDistrictOptions(selectedProvince);
    }, [getDistrictOptions, selectedProvince]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        const validFiles: File[] = [];
        const invalidFiles: string[] = [];

        files.forEach((file) => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            if (ext && ALLOWED_EXTENSIONS.includes(ext)) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file.name);
            }
        });

        if (invalidFiles.length > 0) {
            addToast({
                message: `Các file không hợp lệ đã bị bỏ qua: ${invalidFiles.join(', ')}`,
                type: 'warning',
            });
        }

        setAttachments(validFiles);
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, idx) => idx !== index));
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-8"
        >
            <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg ring-1 ring-black/5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Bước 1</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">Thông tin người gửi</h3>
                        <p className="text-sm text-slate-500">Chúng tôi chỉ sử dụng dữ liệu này để liên hệ phản hồi kết quả xử lý.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1 text-xs font-semibold text-red-600">
                        <UserRound className="h-4 w-4" />
                        Bắt buộc
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form.Field name="citizenName" validators={{
                        onChange: ({ value }) => (!value?.trim() ? 'Vui lòng nhập họ tên' : undefined),
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Họ và tên *</label>
                                <Input
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập tên người phản ánh"
                                    disabled={isSubmitting}
                                />
                                {field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="phone" validators={{
                        onBlur: ({ value }) => {
                            if (!value) return undefined;
                            const phoneRegex = /^[0-9+\-\s()]{9,15}$/;
                            return phoneRegex.test(value) ? undefined : 'Số điện thoại không hợp lệ';
                        },
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Số điện thoại</label>
                                <Input
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    placeholder="Nhập số điện thoại"
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="email" validators={{
                        onBlur: ({ value }) => {
                            if (!value) return undefined;
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            return emailRegex.test(value) ? undefined : 'Email không hợp lệ';
                        },
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Email</label>
                                <Input
                                    type="email"
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    placeholder="Nhập email"
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {isAddressError && (
                    <div className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 md:flex-row md:items-center md:justify-between">
                        <span>Không thể tải danh sách tỉnh/thành. Vui lòng kiểm tra kết nối và thử lại.</span>
                        <Button type="button" size="sm" variant="ghost" onClick={() => refetchAddress()}>
                            Thử lại
                        </Button>
                    </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form.Field name="city" validators={{
                        onChange: ({ value }) => (!value ? 'Vui lòng chọn tỉnh/thành phố' : undefined),
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Tỉnh / Thành phố *</label>
                                <Select
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.handleChange(value as never);
                                        setSelectedProvince(value);
                                        form.setFieldValue('district', '' as never);
                                    }}
                                    options={[
                                        { value: '', label: isAddressLoading ? 'Đang tải...' : 'Chọn tỉnh/thành phố' },
                                        ...provinceOptions,
                                    ]}
                                    disabled={isAddressLoading || isSubmitting}
                                />
                                {isAddressLoading && (
                                    <p className="text-xs text-slate-500">Đang tải danh sách tỉnh/thành...</p>
                                )}
                                {field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="district" validators={{
                        onChange: ({ value }) => (!value ? 'Vui lòng chọn quận/huyện' : undefined),
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Quận / Huyện *</label>
                                <Select
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.handleChange(value as never);
                                    }}
                                    options={[
                                        {
                                            value: '',
                                            label:
                                                !selectedProvince
                                                    ? 'Vui lòng chọn tỉnh/thành trước'
                                                    : availableDistrictOptions.length === 0
                                                        ? 'Không có dữ liệu quận/huyện'
                                                        : 'Chọn quận/huyện',
                                        },
                                        ...availableDistrictOptions,
                                    ]}
                                    disabled={
                                        isAddressLoading ||
                                        !selectedProvince ||
                                        availableDistrictOptions.length === 0 ||
                                        isSubmitting
                                    }
                                />
                                {field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                </div>

                <form.Field name="streetAddress" validators={{
                    onChange: ({ value }) => (!value?.trim() ? 'Vui lòng nhập địa chỉ chi tiết' : undefined),
                }}>
                    {(field) => (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-800">Địa chỉ chi tiết *</label>
                            <textarea
                                className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={(field.state.value as string) ?? ''}
                                onChange={(event) => field.handleChange(event.target.value as never)}
                                placeholder="Số nhà, thôn xóm..."
                                disabled={isSubmitting}
                            />
                        </div>
                    )}
                </form.Field>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg ring-1 ring-black/5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Bước 2</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">Thông tin phản ánh - kiến nghị</h3>
                        <p className="text-sm text-slate-500">Vui lòng mô tả chi tiết vấn đề để cơ quan chức năng xử lý chính xác.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-700">
                        <MapPin className="h-4 w-4" />
                        Nội dung chính
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form.Field name="paknCategoryId" validators={{
                        onChange: ({ value }) => (!value ? 'Vui lòng chọn danh mục' : undefined),
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Chủ đề PAKN *</label>
                                <Select
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    options={[
                                        { value: '', label: 'Chọn chủ đề' },
                                        ...categories.map((category) => ({
                                            value: category.id,
                                            label: category.categoryName,
                                        })),
                                    ]}
                                />
                                {field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="orgUnitId" validators={{
                        onChange: ({ value }) => (!value ? 'Vui lòng chọn đơn vị tiếp nhận' : undefined),
                    }}>
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Đơn vị tiếp nhận *</label>
                                <Select
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    onBlur={field.handleBlur}
                                    options={[
                                        { value: '', label: 'Chọn đơn vị' },
                                        ...orgUnits.map((unit) => ({
                                            value: unit.id,
                                            label: unit.unitName ?? unit.name ?? 'Không xác định',
                                        })),
                                    ]}
                                    disabled={isSubmitting}
                                />
                                {field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                <form.Field name="title" validators={{
                    onChange: ({ value }) => {
                        if (!value?.trim()) return 'Vui lòng nhập tiêu đề';
                        if (value.trim().length < 10) return 'Tiêu đề phải có ít nhất 10 ký tự';
                        return undefined;
                    },
                }}>
                    {(field) => (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-800">PAKN về việc *</label>
                            <Input
                                value={(field.state.value as string) ?? ''}
                                onChange={(event) => field.handleChange(event.target.value as never)}
                                placeholder="Nhập tiêu đề"
                                disabled={isSubmitting}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="content" validators={{
                    onChange: ({ value }) => {
                        if (!value?.trim()) return 'Vui lòng nhập nội dung';
                        if (value.trim().length < 20) return 'Nội dung phải có ít nhất 20 ký tự';
                        return undefined;
                    },
                }}>
                    {(field) => (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-800">Nội dung phản ánh *</label>
                            <textarea
                                className="min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={(field.state.value as string) ?? ''}
                                onChange={(event) => field.handleChange(event.target.value as never)}
                                placeholder="Nhập nội dung phản ánh"
                                disabled={isSubmitting}
                            />
                            <p className="text-xs italic text-amber-600">
                                * Nội dung này sẽ được công khai. Vui lòng không ghi chi tiết thông tin cá nhân!
                            </p>
                            {field.state.meta.errors?.[0] && (
                                <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                </form.Field>

            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg ring-1 ring-black/5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                        <FileUp className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">Tài liệu & xác thực</h3>
                        <p className="text-sm text-slate-500">Đính kèm minh chứng (nếu có) và đảm bảo gửi đúng người thật.</p>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="text-sm font-medium text-slate-800">Tài liệu đính kèm (không bắt buộc)</label>
                        <span className="text-xs text-slate-500">Hỗ trợ: {ALLOWED_EXTENSIONS.join(', ').toUpperCase()}</span>
                    </div>
                    <input
                        id="pakn-attachments"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        disabled={isSubmitting}
                    />
                    <label
                        htmlFor="pakn-attachments"
                        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-4 py-6 text-center text-sm text-slate-600 transition hover:border-red-300 hover:bg-white"
                    >
                        <FileUp className="h-8 w-8 text-red-500" />
                        <div>
                            <p className="font-medium text-slate-800">Chọn tệp hoặc kéo thả vào đây</p>
                            <p className="text-xs text-slate-500">Tối đa 5MB / tệp</p>
                        </div>
                    </label>
                    {attachments.length > 0 && (
                        <ul className="space-y-2 rounded-xl border border-slate-200 bg-white/90 p-3 text-sm shadow-inner">
                            {attachments.map((file, index) => (
                                <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                                    <span className="truncate font-medium text-slate-800">{file.name}</span>
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-red-600 hover:underline"
                                        onClick={() => removeAttachment(index)}
                                    >
                                        Gỡ
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-600">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p>
                        Mã bảo mật (Google reCAPTCHA) sẽ tự động sinh khi bạn nhấn gửi. Vui lòng không chặn script từ Google để quá trình
                        xác thực diễn ra suôn sẻ.
                    </p>
                </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                    type="reset"
                    variant="outline"
                    onClick={() => {
                        form.reset(DEFAULT_VALUES as never);
                        setSelectedProvince('');
                    }}
                    disabled={isSubmitting}
                >
                    Nhập lại
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi phản ánh'}
                </Button>
            </div>
        </form>
    );
};

