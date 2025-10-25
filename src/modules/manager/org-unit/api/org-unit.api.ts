import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { OrgUnit, CreateOrgUnitRequest, UpdateOrgUnitRequest, OrgUnitFilters } from '../types';

export const orgUnitApi = {
    // GET list với filters
    getList: (filters: OrgUnitFilters) => {
        return http.get<RestMany<OrgUnit>>(
            API_PATH.MANAGER.ORG_UNIT.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page || 1,
                filters.size || 10
            )
        );
    },

    // GET detail by ID
    getById: (id: string) => {
        return http.get<RestResponse<OrgUnit>>(
            API_PATH.MANAGER.ORG_UNIT.GET_BY_ID(id)
        );
    },

    // POST create
    create: (data: CreateOrgUnitRequest) => {
        return http.post<RestResponse<OrgUnit>>(
            API_PATH.MANAGER.ORG_UNIT.POST,
            data
        );
    },

    // PUT update
    update: (id: string, data: UpdateOrgUnitRequest) => {
        return http.put<RestResponse<OrgUnit>>(
            API_PATH.MANAGER.ORG_UNIT.PUT(id),
            data
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.ORG_UNIT.DELETE(id)
        );
    },
};

