import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';

interface UpdatePaymentRequest {
  isPaid: boolean;
}

interface UpdatePaymentResponse {
  success: boolean;
  message: string;
}

export const casePaymentApi = {
  confirmPayment: (caseId: string) => {
    const requestBody: UpdatePaymentRequest = {
      isPaid: true,
    };
    
    return http.put<RestResponse<UpdatePaymentResponse>>(
      API_PATH.STAFF.CASE.UPDATE_PAYMENT(caseId),
      requestBody
    );
  },
};

