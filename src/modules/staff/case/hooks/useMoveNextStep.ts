'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { caseDetailApi } from '../api/case-detail.api';
import type { MoveNextStepRequest } from '../types/case-search';
import { useGlobalToast } from '@core/patterns/SingletonHook';

export const useMoveNextStep = () => {
    const queryClient = useQueryClient();
    const { addToast } = useGlobalToast();

    return useMutation({
        mutationFn: (data: MoveNextStepRequest) => caseDetailApi.moveNextStep(data),
        onSuccess: (response) => {
            if (response.data?.success) {
                addToast({
                    message: 'Chuyển bước thành công',
                    type: 'success',
                });
                // Invalidate case detail queries to refresh data
                queryClient.invalidateQueries({ queryKey: ['case-detail'] });
                // Invalidate case search/list queries to sync data in case list page
                queryClient.invalidateQueries({ queryKey: ['case-search'] });
            } else {
                addToast({
                    message: response.data?.message || 'Chuyển bước thất bại',
                    type: 'error',
                });
            }
        },
        onError: (error: any) => {
            console.error('Move next step error:', error);
            addToast({
                message: error?.response?.data?.message || 'Đã xảy ra lỗi khi chuyển bước',
                type: 'error',
            });
        },
    });
};
