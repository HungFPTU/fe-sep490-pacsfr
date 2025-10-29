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
        console.log('[ServiceGroup Service] Creating service group with request:', request);

        // Use the provided iconUrl directly - no need to re-upload
        // The image was already uploaded when user selected it in the form
        const iconUrl = request.iconUrl || '';
        console.log('[ServiceGroup Service] Using provided iconUrl:', iconUrl);

        // Create service group with iconUrl
        const serviceGroupData = {
            groupCode: request.groupCode,
            groupName: request.groupName,
            description: request.description,
            iconUrl: iconUrl,
            displayOrder: Number(request.displayOrder) || 0,
            isActive: request.isActive,
        };

        console.log('[ServiceGroup Service] Creating service group with data:', serviceGroupData);
        const res = await serviceGroupAPI.createServiceGroup(serviceGroupData);
        return res.data;
    },

    async updateServiceGroup(
        id: string,
        request: UpdateServiceGroupRequest
    ): Promise<RestResponse<ServiceGroup>> {
        // Use the provided iconUrl directly - no need to re-upload
        // The image was already uploaded when user selected it in the form
        const iconUrl = request.iconUrl || '';
        console.log('[ServiceGroup Service] Using provided iconUrl for update:', iconUrl);

        // Update service group with iconUrl
        const res = await serviceGroupAPI.updateServiceGroup(request.id, {
            ...request,
            iconUrl: iconUrl,
        } as UpdateServiceGroupRequest);
        return res.data;
    },

    async deleteServiceGroup(id: string): Promise<void> {
        await serviceGroupAPI.deleteServiceGroup(id);
    },
};

