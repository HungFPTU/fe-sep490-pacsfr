import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";

export const servicesAPI = {
  async getAllServices() {
        return http.get<any>(API_PATH.SYSTEM.SERVICES.ALL);
    },
};


