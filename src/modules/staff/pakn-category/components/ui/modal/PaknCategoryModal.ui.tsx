'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { usePaknCategoryForm } from '../../../hooks/usePaknCategoryForm';
import type { PaknCategory } from '../../../types/response';
import { ToggleSwitch } from '@/shared/components/manager/ui/toggle-switch';

interface PaknCategoryModalProps {
    open: boolean;
    onClose: () => void;
    initialData?: PaknCategory | null;
    onSuccess?: () => void;
}

export const PaknCategoryModal: React.FC<PaknCategoryModalProps> = ({
    open,
    onClose,
    initialData,
    onSuccess,
}) => {
    const { form, isSubmitting, handleSubmit } = usePaknCategoryForm({
        initData: initialData,
        open,
        onClose,
        onSuccess,
    });

    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Cập nhật thông tin danh mục phản ánh kiến nghị.' : 'Nhập thông tin danh mục phản ánh kiến nghị mới.'}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field name="categoryName" validators={{
                        onChange: ({ value }: { value: string }) => {
                            if (!value?.trim()) {
                                return 'Tên danh mục không được để trống';
                            }
                            if (value.trim().length < 3) {
                                return 'Tên phải có ít nhất 3 ký tự';
                            }
                            return undefined;
                        },
                    }}>
                        {(field) => {
                            const error = field.state.meta.errors?.[0];
                            return (
                                <div className="space-y-1.5">
                                    <label htmlFor="categoryName" className="text-sm font-medium text-slate-800">
                                        Tên danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="categoryName"
                                        value={(field.state.value as string) ?? ''}
                                        onChange={(event) => field.handleChange(event.target.value as never)}
                                        onBlur={field.handleBlur}
                                        placeholder="Nhập tên danh mục"
                                        disabled={isSubmitting}
                                    />
                                    {error && <p className="text-xs text-red-500">{error}</p>}
                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field name="description">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label htmlFor="description" className="text-sm font-medium text-slate-800">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    className="min-h-[90px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={(field.state.value as string) ?? ''}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Mô tả ngắn gọn..."
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="isActive">
                        {(field) => (
                            <ToggleSwitch
                                checked={Boolean(field.state.value)}
                                onChange={(value) => field.handleChange(value as never)}
                                label="Hiển thị danh mục"
                                description={
                                    field.state.value
                                        ? 'Danh mục sẽ xuất hiện trong danh sách chọn'
                                        : 'Ẩn khỏi danh sách, chỉ lưu trữ nội bộ'
                                }
                                disabled={isSubmitting}
                            />
                        )}
                    </form.Field>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {initialData ? 'Lưu thay đổi' : 'Tạo danh mục'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

