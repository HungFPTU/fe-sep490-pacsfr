import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { Queue } from "../types";

export const queuesAPI = {
  async getAllQueuesStatus() {
        return http.get<Queue[]>(API_PATH.MANAGER.QUEUES.STATUS);
  },
  async getAllQueueStatistics() {
        return http.get<Queue[]>(API_PATH.MANAGER.QUEUES.STATISTICS);
    },
};


