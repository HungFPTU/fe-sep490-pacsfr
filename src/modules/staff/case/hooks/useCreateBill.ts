import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '../api/payment.api';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { CreateBillRequest } from '../types/payment';

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  const { addToast } = useGlobalToast();

  return useMutation({
    mutationFn: (data: CreateBillRequest) => paymentApi.createBill(data),
    onSuccess: (response) => {
      if (response.success) {
        addToast({
          message: response.message || 'Tạo hóa đơn thành công!',
          type: 'success',
        });
        
        // Invalidate case detail to refresh payment status
        queryClient.invalidateQueries({ queryKey: ['case-detail'] });
      } else {
        addToast({
          message: response.message || 'Tạo hóa đơn thất bại!',
          type: 'error',
        });
      }
    },
    onError: (error: Error) => {
      console.error('[useCreateBill] Error:', error);
      addToast({
        message: error.message || 'Có lỗi xảy ra khi tạo hóa đơn!',
        type: 'error',
      });
    },
  });
};
