/**
 * Payment and Bill types
 */

export interface CreateBillRequest {
  caseId: string;
  qrCodeUrl: string;
  paymentMethod: string;
}

export interface BillData {
  billCode: string;
  amount: number;
  billUrl: string;
  paymentStatus: string;
  qrCodeUrl: string;
}

export interface CreateBillResponse {
  $id: string;
  success: boolean;
  message: string;
  data: BillData;
  timestamp: string;
}

export enum PaymentMethod {
  DIRECT = "Trực tiếp",
  ONLINE = "Trực tuyến"
}
