import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paknCategoryService } from '../services/pakn-category.service';
import { PAKN_CATEGORY_QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type {
    CreatePaknCategoryRequest,
    UpdatePaknCategoryRequest,
    PaknCategoryFilters,
} from '../types/request';

export { usePaknCategoryForm } from './usePaknCategoryForm';

export const usePaknCategoryList = (filters: PaknCategoryFilters) => {
    return useQuery({
        queryKey: PAKN_CATEGORY_QUERY_KEYS.LIST(filters),
        queryFn: () => paknCategoryService.getCategories(filters),
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

export const usePaknCategoryDetail = (id: string | undefined, enabled = false) => {
    return useQuery({
        queryKey: id ? PAKN_CATEGORY_QUERY_KEYS.DETAIL(id) : ['pakn-category', 'detail', 'unknown'],
        queryFn: () => paknCategoryService.getCategoryById(id as string),
        enabled: Boolean(id) && enabled,
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

export const useCreatePaknCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreatePaknCategoryRequest) => paknCategoryService.createCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PAKN_CATEGORY_QUERY_KEYS.BASE });
        },
    });
};

export const useUpdatePaknCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePaknCategoryRequest }) =>
            paknCategoryService.updateCategory(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: PAKN_CATEGORY_QUERY_KEYS.BASE });
            queryClient.invalidateQueries({ queryKey: PAKN_CATEGORY_QUERY_KEYS.DETAIL(variables.id) });
        },
    });
};

export const useDeletePaknCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => paknCategoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PAKN_CATEGORY_QUERY_KEYS.BASE });
        },
    });
};

