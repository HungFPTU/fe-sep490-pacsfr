import { http } from "@core/http/client";
import type { CreateBillRequest, CreateBillResponse } from "../types/payment";

export const paymentApi = {
  /**
   * Create a bill for a case
   * @param data - Bill creation data
   */
  async createBill(data: CreateBillRequest): Promise<CreateBillResponse> {
    console.log("[PaymentAPI] Creating bill:", data);

    const response = await http.post<CreateBillResponse>(
      "/Payment/create",
      data
    );

    console.log("[PaymentAPI] Create bill response:", response.data);

    return response.data;
  }
};
