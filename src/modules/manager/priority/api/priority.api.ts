import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { PriorityCaseResponse, PriorityCaseFilters, UpdatePriorityRequest } from '../types';

export const priorityApi = {
    getCaseList: (filters: PriorityCaseFilters) => {
        const params = new URLSearchParams();
        
        if (filters.caseCode) params.append('CaseCode', filters.caseCode);
        if (filters.guestId) params.append('GuestId', filters.guestId);
        if (filters.serviceId) params.append('ServiceId', filters.serviceId);
        if (filters.staffId) params.append('StaffId', filters.staffId);
        if (filters.priorityLevel !== undefined) params.append('PriorityLevel', filters.priorityLevel.toString());
        if (filters.caseStatus) params.append('CurrentStatus', filters.caseStatus);
        if (filters.fromDate) params.append('FromDate', filters.fromDate);
        if (filters.toDate) params.append('ToDate', filters.toDate);
        params.append('Page', filters.page.toString());
        params.append('Size', filters.size.toString());

        return http.get<RestResponse<PriorityCaseResponse>>(
            `${API_PATH.CASE.GET_ALL}?${params.toString()}`
        );
    },

    updatePriority: (data: UpdatePriorityRequest) => {
        return http.post<RestResponse<Record<string, never>>>(
            API_PATH.MANAGER_DASHBOARD.UPDATE_PRIORITY,
            data
        );
    },
};

