import { casePaymentApi } from '../api/case-payment.api';

export const casePaymentService = {
  async confirmPayment(caseId: string) {
    try {
      const response = await casePaymentApi.confirmPayment(caseId);
      return response.data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  },
};

