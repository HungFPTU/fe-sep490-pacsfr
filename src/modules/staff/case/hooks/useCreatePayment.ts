'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { caseCreatePaymentService } from '../services/case-create-payment.service';
import { casePaymentService } from '../services/case-payment.service';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { CreatePaymentRequest } from '../types/payment';

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const { addToast } = useGlobalToast();

  return useMutation({
    mutationFn: async (request: CreatePaymentRequest) => {
      // Create payment invoice only
      const paymentData = await caseCreatePaymentService.createPayment(request);
      return paymentData;
    },
    onSuccess: (data, request) => {
      // Invalidate and refetch case detail query
      queryClient.invalidateQueries({ queryKey: ['case-detail', request.caseId] });
      
      // Invalidate and refetch case search list
      queryClient.invalidateQueries({ queryKey: ['case-search'] });
      
      // Invalidate and refetch payment bill query
      queryClient.invalidateQueries({ queryKey: ['payment-bill'] });
      
      addToast({
        message: 'Tạo hóa đơn thành công!',
        type: 'success',
      });
    },
    onError: (error) => {
      console.error('Error creating payment:', error);
      addToast({
        message: error instanceof Error ? error.message : 'Lỗi khi tạo hóa đơn',
        type: 'error',
      });
    },
  });
};
