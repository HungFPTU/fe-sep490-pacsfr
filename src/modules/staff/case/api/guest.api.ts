import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';

export interface GuestItem {
  id: string;
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email?: string;
}

export interface GuestResponse {
  $id?: string;
  success: boolean;
  message?: string;
  data?: {
    $id?: string;
    size?: number;
    page?: number;
    total?: number;
    items?: {
      $id?: string;
      $values?: GuestItem[];
    };
    $values?: GuestItem[];
  };
}

export const guestApi = {
  async getGuests(keyword?: string) {
    const params = new URLSearchParams();
    if (keyword) {
      params.append('keyword', keyword);
    }
    params.append('Page', '1');
    params.append('Size', '1000');

    const response = await http.get<GuestResponse>(
      `${API_PATH.QUEUE.STAFF.DASHBOARD.GET_GUESTS}?${params.toString()}`
    );
    return response.data;
  },
};
