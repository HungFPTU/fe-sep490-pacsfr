"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "../services/department.service";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import { useFormDataStore } from "@/shared/stores";
import type { CreateDepartmentRequest, UpdateDepartmentRequest, DepartmentFilters } from "../types";

// Re-export custom hooks
export { useDepartmentForm } from './useDepartmentForm';

// GET list hook
export const useDepartments = (filters: DepartmentFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.DEPARTMENT_LIST(filters),
        queryFn: () => departmentService.getDepartmentList(filters),
        gcTime: CACHE_TIME.SHORT,
        staleTime: STALE_TIME.MEDIUM,
    });
};

// GET detail hook
export const useDepartmentDetail = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.DEPARTMENT_DETAIL(id),
        queryFn: () => departmentService.getDepartmentById(id),
        enabled: !!id,
    });
};

// CREATE mutation
export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateDepartmentRequest) => departmentService.createDepartment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DEPARTMENT_BASE
            });
            invalidateDropdown('department');
        },
    });
};

// UPDATE mutation
export const useUpdateDepartment = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateDepartmentRequest }) =>
            departmentService.updateDepartment(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DEPARTMENT_BASE
            });
            invalidateDropdown('department');
        },
    });
};

// DELETE mutation
export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => departmentService.deleteDepartment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DEPARTMENT_BASE
            });
            invalidateDropdown('department');
        },
    });
};
