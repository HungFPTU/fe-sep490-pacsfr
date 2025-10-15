import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { Services } from "../types";

export const servicesAPI = {
  async getAllServices() {
        return http.get<Services[]>(API_PATH.MANAGER.SERVICES.ALL);
    },
};


