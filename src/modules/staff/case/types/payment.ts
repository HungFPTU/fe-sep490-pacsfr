// Payment creation types for staff case management

export interface CreatePaymentRequest {
  caseId: string;
  qrCodeUrl: string;
  paymentMethod: string;
}

export interface CreatePaymentResponse {
  billCode: string;
  amount: number;
  billUrl: string;
  paymentStatus: string;
  qrCodeUrl: string;
  description: string;
}

export interface CreatePaymentApiResponse {
  $id?: string;
  success: boolean;
  message: string;
  data: CreatePaymentResponse;
  timestamp: string;
}
