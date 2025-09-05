import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";

export const queuesAPI = {
  async getAllQueuesStatus() {
        return http.get<any>(API_PATH.SYSTEM.QUEUES.STATUS);
  },
  async getAllQueueStatistics() {
        return http.get<any>(API_PATH.SYSTEM.QUEUES.STATISTICS);
    },
};


