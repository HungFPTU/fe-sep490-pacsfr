// Payment bill types

export interface PaymentBill {
  billCode: string;
  amount: number;
  billUrl: string;
  paymentMethod: string;
  paymentStatus: string;
  qrCodeUrl: string;
  description: string;
  createdAt: string;
}

export interface PaymentBillResponse {
  $id?: string;
  success: boolean;
  message: string;
  data: PaymentBill;
  timestamp: string;
}
