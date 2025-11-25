import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { CreatePaymentRequest, CreatePaymentApiResponse } from '../types/payment';

export const caseCreatePaymentApi = {
  /**
   * Create payment invoice for a case
   * @param request - Payment creation request with caseId, qrCodeUrl, and paymentMethod
   */
  create: (request: CreatePaymentRequest) => {
    return http.post<CreatePaymentApiResponse>(
      API_PATH.PAYMENT.CREATE,
      request
    );
  },
};
