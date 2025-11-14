/**
 * FAQ Hooks
 * React Query hooks for FAQ data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { faqClientService } from '../services/faq.service';
import { FAQ_QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { FaqFilters, FaqCategoryFilters } from '../types';

/**
 * Get FAQs list hook
 */
export const useFaqList = (filters: FaqFilters) => {
    return useQuery({
        queryKey: FAQ_QUERY_KEYS.FAQ_LIST(filters),
        queryFn: () => faqClientService.getFaqList(filters),
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

/**
 * Get FAQ detail hook
 */
export const useFaqDetail = (id: string) => {
    return useQuery({
        queryKey: FAQ_QUERY_KEYS.FAQ_DETAIL(id),
        queryFn: () => faqClientService.getFaqById(id),
        enabled: !!id,
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

/**
 * Get FAQ categories list hook
 */
export const useFaqCategoryList = (filters: FaqCategoryFilters) => {
    return useQuery({
        queryKey: FAQ_QUERY_KEYS.FAQ_CATEGORY_LIST(filters),
        queryFn: () => faqClientService.getFaqCategoryList(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Get FAQ category detail hook
 */
export const useFaqCategoryDetail = (id: string) => {
    return useQuery({
        queryKey: FAQ_QUERY_KEYS.FAQ_CATEGORY_DETAIL(id),
        queryFn: () => faqClientService.getFaqCategoryById(id),
        enabled: !!id,
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

