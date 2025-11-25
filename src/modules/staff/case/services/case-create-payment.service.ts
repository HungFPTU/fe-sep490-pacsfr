import { caseCreatePaymentApi } from '../api/case-create-payment.api';
import type { CreatePaymentRequest, CreatePaymentResponse } from '../types/payment';

export const caseCreatePaymentService = {
  /**
   * Create payment invoice for a case
   */
  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      const response = await caseCreatePaymentApi.create(request);
      
      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to create payment');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },
};
