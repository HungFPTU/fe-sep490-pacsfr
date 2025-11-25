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
      // Step 1: Create payment invoice
      const paymentData = await caseCreatePaymentService.createPayment(request);
      
      // Step 2: Auto-confirm payment status
      try {
        await casePaymentService.confirmPayment(request.caseId);
      } catch (confirmError) {
        console.error('Warning: Failed to auto-confirm payment, but invoice was created:', confirmError);
        // Don't throw error here - invoice was created successfully
        // Staff can manually confirm if needed
      }
      
      return paymentData;
    },
    onSuccess: (data, request) => {
      // Invalidate and refetch case detail query
      queryClient.invalidateQueries({ queryKey: ['case-detail', request.caseId] });
      
      // Invalidate and refetch case search list
      queryClient.invalidateQueries({ queryKey: ['case-search'] });
      
      addToast({
        message: 'Tạo hóa đơn và cập nhật trạng thái thanh toán thành công!',
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
