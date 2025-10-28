import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LegalDocumentService } from '../services/legal-document.service';
import type {
    CreateLegalDocumentRequest,
    UpdateLegalDocumentRequest,
    LegalDocumentFilters,
    LegalDocumentFormData
} from '../types';

// Hook for fetching legal documents list
export const useLegalDocuments = (filters: LegalDocumentFilters) => {
    return useQuery({
        queryKey: ['legal-documents', filters],
        queryFn: () => LegalDocumentService.getLegalDocuments(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for fetching single legal document
export const useLegalDocument = (id: string) => {
    return useQuery({
        queryKey: ['legal-document', id],
        queryFn: () => LegalDocumentService.getLegalDocumentById(id),
        enabled: !!id,
    });
};

// Hook for creating legal document
export const useCreateLegalDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateLegalDocumentRequest) =>
            LegalDocumentService.createLegalDocument(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
        },
    });
};

// Hook for updating legal document
export const useUpdateLegalDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateLegalDocumentRequest }) =>
            LegalDocumentService.updateLegalDocument(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
            queryClient.invalidateQueries({ queryKey: ['legal-document', id] });
        },
    });
};

// Hook for deleting legal document
export const useDeleteLegalDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => LegalDocumentService.deleteLegalDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
        },
    });
};

// Hook for file upload
export const useUploadFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, file }: { id: string; file: File }) =>
            LegalDocumentService.uploadFile(id, file),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['legal-document', id] });
        },
    });
};

// Hook for file download
export const useDownloadFile = () => {
    return useMutation({
        mutationFn: (id: string) => LegalDocumentService.downloadFile(id),
    });
};

// Hook for legal document form management
export const useLegalDocumentForm = (initialData?: Partial<LegalDocumentFormData>) => {
    const [formData, setFormData] = useState<LegalDocumentFormData>({
        documentNumber: '',
        documentType: '',
        name: '',
        issueDate: '',
        issueBody: '',
        effectiveDate: '',
        status: '',
        isActive: true,
        file: undefined,
        ...initialData,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LegalDocumentFormData, string>>>({});

    // Update form data when initialData changes (for edit mode)
    React.useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [initialData]);

    const updateField = useCallback((field: keyof LegalDocumentFormData, value: string | File | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<Record<keyof LegalDocumentFormData, string>> = {};

        if (!formData.documentNumber.trim()) {
            newErrors.documentNumber = 'Số văn bản là bắt buộc';
        }

        if (!formData.documentType) {
            newErrors.documentType = 'Loại văn bản là bắt buộc';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Tên văn bản là bắt buộc';
        }

        if (!formData.issueDate) {
            newErrors.issueDate = 'Ngày ban hành là bắt buộc';
        }

        if (!formData.issueBody.trim()) {
            newErrors.issueBody = 'Cơ quan ban hành là bắt buộc';
        }

        if (!formData.effectiveDate) {
            newErrors.effectiveDate = 'Ngày có hiệu lực là bắt buộc';
        }

        if (!formData.status) {
            newErrors.status = 'Trạng thái là bắt buộc';
        }

        // Validate date range
        if (formData.issueDate && formData.effectiveDate) {
            const issueDate = new Date(formData.issueDate);
            const effectiveDate = new Date(formData.effectiveDate);
            if (effectiveDate < issueDate) {
                newErrors.effectiveDate = 'Ngày có hiệu lực không được trước ngày ban hành';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const resetForm = useCallback(() => {
        setFormData({
            documentNumber: '',
            documentType: '',
            name: '',
            issueDate: '',
            issueBody: '',
            effectiveDate: '',
            status: '',
            isActive: true,
            file: undefined,
        });
        setErrors({});
    }, []);

    return {
        formData,
        errors,
        updateField,
        validateForm,
        resetForm,
        setFormData,
        setErrors,
    };
};

// Hook for legal document filters
export const useLegalDocumentFilters = () => {
    const [filters, setFilters] = useState<LegalDocumentFilters>({
        keyword: '',
        documentType: '',
        status: '',
        isActive: true,
        page: 1,
        size: 10,
    });

    const updateFilter = useCallback((field: keyof LegalDocumentFilters, value: string | boolean) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            keyword: '',
            documentType: '',
            status: '',
            isActive: true,
            page: 1,
            size: 10,
        });
    }, []);

    return {
        filters,
        updateFilter,
        resetFilters,
        setFilters,
    };
};
