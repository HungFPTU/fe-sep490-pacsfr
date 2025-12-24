/**
 * FAQ Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { faqService } from '../services/faq.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateFaqRequest, UpdateFaqRequest, FaqFilters } from '../types/request';

// Re-export custom form hook
export { useFaqForm } from './useFaqForm';

/**
 * Hook for getting FAQs list with filters
 */
export const useFaqs = (filters: FaqFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.FAQ_LIST(filters),
        queryFn: () => faqService.getFaqs(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting FAQ by ID
 */
export const useFaq = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.FAQ_DETAIL(id),
        queryFn: () => faqService.getFaqById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating FAQ
 */
export const useCreateFaq = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateFaqRequest) =>
            faqService.createFaq(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_ALL(),
            });
            invalidateDropdown('faq');
        },
    });
};

/**
 * Hook for updating FAQ
 */
export const useUpdateFaq = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateFaqRequest }) =>
            faqService.updateFaq(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_ALL(),
            });
            invalidateDropdown('faq');
        },
    });
};

/**
 * Hook for deleting FAQ
 */
export const useDeleteFaq = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => faqService.deleteFaq(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_ALL(),
            });
            invalidateDropdown('faq');
        },
    });
};
