'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requiredDocumentService } from '../services/required-document.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type {
    CreateRequiredDocumentRequest,
    UpdateRequiredDocumentRequest,
    RequiredDocumentFilters,
} from '../types/request';

export { useRequiredDocumentForm } from './useRequiredDocumentForm';

export const useRequiredDocuments = (filters: RequiredDocumentFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_LIST(filters),
        queryFn: () => requiredDocumentService.getRequiredDocuments(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

export const useRequiredDocument = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_DETAIL(id),
        queryFn: () => requiredDocumentService.getRequiredDocumentById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

export const useCreateRequiredDocument = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateRequiredDocumentRequest) =>
            requiredDocumentService.createRequiredDocument(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_BASE,
            });
            invalidateDropdown('requiredDocument');
        },
    });
};

export const useUpdateRequiredDocument = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateRequiredDocumentRequest }) =>
            requiredDocumentService.updateRequiredDocument(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_BASE,
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_DETAIL(variables.id),
            });
            invalidateDropdown('requiredDocument');
        },
    });
};

export const useDeleteRequiredDocument = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => requiredDocumentService.deleteRequiredDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REQUIRED_DOCUMENT_BASE,
            });
            invalidateDropdown('requiredDocument');
        },
    });
};
