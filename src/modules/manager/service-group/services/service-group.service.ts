import { RestPaged, RestResponse } from "@/types/rest";
import { serviceGroupAPI } from "../api/service-group.api";
import { ImageUploadService } from "@/core/services/image-upload.service";
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
        // Step 1: Upload icon if exists
        let iconUrl = '';
        if (request.iconUrl) {
            console.log('[ServiceGroup Service] Uploading icon file...');
            const uploadResult = await ImageUploadService.uploadImage(new File([], request.iconUrl), 'service_groups');
            iconUrl = uploadResult.data.fileUrl;
        }
        const res = await serviceGroupAPI.createServiceGroup({
            ...request,
            iconUrl: iconUrl,
        } as CreateServiceGroupRequest);
        return res.data;
    },

    async updateServiceGroup(
        id: string,
        request: UpdateServiceGroupRequest
    ): Promise<RestResponse<ServiceGroup>> {
        // Step 1: Upload icon if exists
        let iconUrl = request.iconUrl || '';
        if (request.iconFile) {
            console.log('[ServiceGroup Service] Uploading new icon file...');
            const uploadResult = await ImageUploadService.uploadImage(request.iconFile, 'service_groups');
            iconUrl = uploadResult.data.fileUrl;
            console.log('[ServiceGroup Service] Icon uploaded, URL:', iconUrl);
        }

        // Step 2: Update service group with iconUrl
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

