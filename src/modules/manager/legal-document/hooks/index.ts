import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LegalDocumentService } from '../services/legal-document.service';
import { CACHE_TIME, STALE_TIME } from '../constants';
import type {
    CreateLegalDocumentRequest,
    UpdateLegalDocumentRequest,
    LegalDocumentFilters,
} from '../types';

// Hook for fetching legal documents list
export const useLegalDocuments = (filters: LegalDocumentFilters) => {
    return useQuery({
        queryKey: ['legal-documents', filters],
        queryFn: () => LegalDocumentService.getLegalDocuments(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
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

// Export the new form hook from useLegalDocumentForm.ts
export { useLegalDocumentForm } from './useLegalDocumentForm';

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
