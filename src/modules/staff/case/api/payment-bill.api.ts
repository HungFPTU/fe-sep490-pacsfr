import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { PaymentBillResponse } from '../types/payment-bill';

export const paymentBillApi = {
  /**
   * Get payment bill by case code
   */
  getByCaseCode: (caseCode: string) => {
    return http.get<PaymentBillResponse>(
      API_PATH.PAYMENT.GET_BY_CASE_CODE(caseCode)
    );
  },
};
