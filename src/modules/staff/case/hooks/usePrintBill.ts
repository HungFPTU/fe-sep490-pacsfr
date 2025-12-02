'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentBillService } from '../services/payment-bill.service';
import { useGlobalToast } from '@core/patterns/SingletonHook';

export const usePrintBill = () => {
  const queryClient = useQueryClient();
  const { addToast } = useGlobalToast();

  return useMutation({
    mutationFn: async ({ caseId, qrCodeUrl }: { caseId: string; qrCodeUrl: string }) => {
      return paymentBillService.printBill(caseId, qrCodeUrl);
    },
    onSuccess: (data, variables) => {
      // Invalidate payment bill queries to fetch updated bill with billUrl
      queryClient.invalidateQueries({ queryKey: ['payment-bill'] });

      // Invalidate case detail to show updated payment status
      queryClient.invalidateQueries({ queryKey: ['case-detail'] });

      // Invalidate case search to refresh table
      queryClient.invalidateQueries({ queryKey: ['case-search'] });

      addToast({
        message: 'In hóa đơn thành công!',
        type: 'success',
      });
    },
    onError: (error) => {
      console.error('Error printing bill:', error);
      addToast({
        message: error instanceof Error ? error.message : 'Lỗi khi in hóa đơn',
        type: 'error',
      });
    },
  });
};
