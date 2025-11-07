import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { QueueMonitoringData } from '../types';

export const queueApi = {
    getQueueMonitoring: () => {
        return http.get<RestResponse<QueueMonitoringData>>(
            API_PATH.MANAGER_DASHBOARD.QUEUE_MONITORING
        );
    },
};

