import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateLegalDocument, useUpdateLegalDocument } from './index';
import type { LegalDocument, CreateLegalDocumentRequest } from '../types';
import type { DocumentType, DocumentStatus } from '../types';

// Type for form values
type FormValues = {
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string;
    issueBody: string;
    effectiveDate: string;
    status: string;
    isActive: boolean;
    file?: File;
    fileUrl: string;
};

interface UseLegalDocumentFormProps {
    initData?: LegalDocument | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useLegalDocumentForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseLegalDocumentFormProps) => {
    const createMutation = useCreateLegalDocument();
    const updateMutation = useUpdateLegalDocument();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<LegalDocument> | null): FormValues => {
        const formatDate = (date: string | Date | undefined): string => {
            if (!date) return '';
            if (typeof date === 'string') {
                return date.split('T')[0];
            }
            return new Date(date).toISOString().split('T')[0];
        };

        return {
            documentNumber: data?.documentNumber ?? '',
            documentType: data?.documentType ?? '',
            name: data?.name ?? '',
            issueDate: formatDate(data?.issueDate),
            issueBody: data?.issueBody ?? '',
            effectiveDate: formatDate(data?.effectiveDate),
            status: data?.status ?? '',
            isActive: data?.isActive ?? true,
            file: undefined,
            fileUrl: data?.fileUrl ?? '',
        };
    };

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            console.log('[useLegalDocumentForm] Form submit triggered');
            console.log('[useLegalDocumentForm] Form values:', value);

            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                console.log('[useLegalDocumentForm] Already submitting, ignoring duplicate call');
                return;
            }

            // Final validation before submit
            if (!value.documentNumber?.trim()) {
                addToast({ message: 'Vui lòng nhập số văn bản', type: 'error' });
                return;
            }
            if (!value.documentType?.trim()) {
                addToast({ message: 'Vui lòng chọn loại văn bản', type: 'error' });
                return;
            }
            if (!value.name?.trim()) {
                addToast({ message: 'Vui lòng nhập tên văn bản', type: 'error' });
                return;
            }
            if (!value.issueDate?.trim()) {
                addToast({ message: 'Vui lòng chọn ngày ban hành', type: 'error' });
                return;
            }
            if (!value.issueBody?.trim()) {
                addToast({ message: 'Vui lòng nhập cơ quan ban hành', type: 'error' });
                return;
            }
            if (!value.effectiveDate?.trim()) {
                addToast({ message: 'Vui lòng chọn ngày có hiệu lực', type: 'error' });
                return;
            }
            if (!value.status?.trim()) {
                addToast({ message: 'Vui lòng chọn trạng thái', type: 'error' });
                return;
            }

            try {
                console.log('[useLegalDocumentForm] Form values before submit:', value);
                console.log('[useLegalDocumentForm] File check:', {
                    hasFile: !!value.file,
                    hasFileUrl: !!value.fileUrl,
                    fileUrl: value.fileUrl,
                });

                const request: CreateLegalDocumentRequest = {
                    documentNumber: value.documentNumber.trim(),
                    documentType: value.documentType as DocumentType,
                    name: value.name.trim(),
                    issueDate: new Date(value.issueDate),
                    issueBody: value.issueBody.trim(),
                    effectiveDate: new Date(value.effectiveDate),
                    status: value.status as DocumentStatus,
                    isActive: value.isActive,
                    file: value.file,
                    fileUrl: value.fileUrl.trim(),
                };

                console.log('[useLegalDocumentForm] Request data:', request);

                let res;
                if (initData?.id) {
                    // Update existing legal document
                    res = await updateMutation.mutateAsync({
                        id: initData.id,
                        data: {
                            ...request,
                            id: initData.id,
                        },
                    });
                } else {
                    // Create new legal document
                    res = await createMutation.mutateAsync(request);
                }

                // Always close and reset on success
                if (res?.success) {
                    addToast({
                        message: initData?.id ? 'Cập nhật văn bản pháp luật thành công' : 'Tạo văn bản pháp luật thành công',
                        type: 'success'
                    });
                    onSuccess?.();
                    onClose();
                    // Reset form after successful submit
                    setTimeout(() => {
                        form.reset(toFormValues(null));
                    }, 100);
                } else {
                    addToast({
                        message: initData?.id ? 'Cập nhật văn bản pháp luật thất bại' : 'Tạo văn bản pháp luật thất bại',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('Error saving legal document:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'Đã xảy ra lỗi khi lưu văn bản pháp luật';

                addToast({ message: errorMessage, type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            // Always reset with current initData when modal opens
            const formValues = toFormValues(initData);
            console.log('[useLegalDocumentForm] Resetting form with values:', formValues);
            form.reset(formValues);
        } else {
            // Clear form when modal closes
            form.reset(toFormValues(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id, initData?.fileUrl]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return {
        form,
        isLoading,
        handleSubmit: () => form.handleSubmit(),
    };
};
