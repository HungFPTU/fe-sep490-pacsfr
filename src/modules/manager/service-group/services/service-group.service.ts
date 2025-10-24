import { RestPaged, RestResponse } from "@/types/rest";
import { serviceGroupAPI } from "../api/service-group.api";
import { CreateServiceGroupRequest, ServiceGroup, UpdateServiceGroupRequest } from "../types";

export const serviceGroupService = {
    async getServiceGroups(
        keyword: string = "",
        isActive: boolean = true,
        page: number = 1,
        size: number = 10
    ): Promise<RestPaged<ServiceGroup>> {
        const res = await serviceGroupAPI.getAllServiceGroups(keyword, isActive, page, size);
        return res.data;
    },

    async getServiceGroupById(id: string): Promise<RestResponse<ServiceGroup>> {
        const res = await serviceGroupAPI.getServiceGroupById(id);
        return res.data;
    },

    async createServiceGroup(request: CreateServiceGroupRequest): Promise<RestResponse<ServiceGroup>> {
        const res = await serviceGroupAPI.createServiceGroup(request);
        return res.data;
    },

    async updateServiceGroup(
        id: string,
        request: UpdateServiceGroupRequest
    ): Promise<RestResponse<ServiceGroup>> {
        const res = await serviceGroupAPI.updateServiceGroup(id, request);
        return res.data;
    },

    async deleteServiceGroup(id: string): Promise<void> {
        await serviceGroupAPI.deleteServiceGroup(id);
    },
};

