import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";

export const accountsAPI = {
  async getAllAccounts() {
        return http.get<any>(API_PATH.SYSTEM.ACCOUNTS.ALL);
  },
  async getAllPermissions() {
        return http.get<any>(API_PATH.SYSTEM.ACCOUNTS.PERMISSIONS);
    },
};


