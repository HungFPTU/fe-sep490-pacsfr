import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { CreateServiceGroupRequest, ServiceGroup, UpdateServiceGroupRequest } from "../types";
import { RestPaged, RestResponse } from "@/types/rest";

export const serviceGroupAPI = {
    async getAllServiceGroups(keyword: string, isActive: boolean, page: number, size: number) {
        return http.get<RestPaged<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.GET_ALL(keyword, isActive, page, size)
        );
    },

    async getServiceGroupById(id: string) {
        return http.get<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.GET_BY_ID(id)
        );
    },

    async createServiceGroup(request: CreateServiceGroupRequest) {
        return http.post<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.POST,
            request
        );
    },

    async updateServiceGroup(id: string, request: UpdateServiceGroupRequest) {
        return http.put<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.PUT(id),
            request
        );
    },

    async deleteServiceGroup(id: string) {
        return http.delete<void>(API_PATH.MANAGER.SERVICE_GROUP.DELETE(id));
    },
};

