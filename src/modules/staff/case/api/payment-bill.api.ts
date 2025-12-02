import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { PaymentBillResponse } from '../types/payment-bill';

interface PrintBillRequest {
  caseId: string;
  qrCodeUrl: string;
}

export const paymentBillApi = {
  /**
   * Get payment bill by case code
   */
  getByCaseCode: (caseCode: string) => {
    return http.get<PaymentBillResponse>(
      API_PATH.PAYMENT.GET_BY_CASE_CODE(caseCode)
    );
  },

  /**
   * Print bill and generate PDF
   */
  printBill: (request: PrintBillRequest) => {
    return http.post<PaymentBillResponse>(
      API_PATH.PAYMENT.PRINT_BILL,
      request
    );
  },
};
