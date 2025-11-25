import { paymentBillApi } from '../api/payment-bill.api';
import type { PaymentBill } from '../types/payment-bill';

export const paymentBillService = {
  /**
   * Get payment bill by case code
   */
  async getBillByCaseCode(caseCode: string): Promise<PaymentBill | null> {
    try {
      const response = await paymentBillApi.getByCaseCode(caseCode);
      
      if (!response.data?.success || !response.data?.data) {
        return null;
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error getting payment bill:', error);
      return null;
    }
  },
};
