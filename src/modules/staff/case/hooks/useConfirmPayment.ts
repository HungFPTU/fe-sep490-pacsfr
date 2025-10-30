'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { casePaymentService } from '../services/case-payment.service';
import { useGlobalToast } from '@core/patterns/SingletonHook';

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  const { addToast } = useGlobalToast();

  return useMutation({
    mutationFn: (caseId: string) => casePaymentService.confirmPayment(caseId),
    onSuccess: (data, caseId) => {
      // Invalidate and refetch case detail query
      queryClient.invalidateQueries({ queryKey: ['case-detail', caseId] });
      
      // Invalidate and refetch case search list to refresh all search results
      queryClient.invalidateQueries({ queryKey: ['case-search'] });
      
      addToast({
        message: 'Xác nhận thanh toán thành công!',
        type: 'success',
      });
    },
    onError: (error) => {
      console.error('Error confirming payment:', error);
      addToast({
        message: 'Không thể xác nhận thanh toán. Vui lòng thử lại.',
        type: 'error',
      });
    },
  });
};

