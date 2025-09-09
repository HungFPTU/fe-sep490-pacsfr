import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { Acccount } from "../types";

export const accountsAPI = {
  async getAllAccounts() {
        return http.get<Acccount[]>(API_PATH.MANAGER.ACCOUNTS.ALL);
  },
  async getAllPermissions() {
        return http.get<Acccount[]>(API_PATH.MANAGER.ACCOUNTS.PERMISSIONS);
    },
};


