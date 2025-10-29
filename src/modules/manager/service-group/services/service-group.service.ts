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
        console.log('[ServiceGroup Service] Creating service group with request:', request);

        // Step 1: Upload icon if exists
        let iconUrl = request.iconUrl || '';
        console.log('[ServiceGroup Service] Icon check:', {
            // hasIconFile: !!request.iconFile,
            hasIconUrl: !!request.iconUrl,
            iconUrl: request.iconUrl
        });

        if (request.iconUrl) {
            console.log('[ServiceGroup Service] Uploading new icon file...');
            try {
                const uploadResult = await ImageUploadService.uploadImage(new File([], ''), 'service_groups');
                iconUrl = uploadResult.data.fileUrl;
                console.log('[ServiceGroup Service] Icon uploaded successfully, URL:', iconUrl);
            } catch (error) {
                console.error('[ServiceGroup Service] Icon upload failed:', error);
                throw new Error('Upload icon thất bại. Vui lòng thử lại.');
            }
        } else if (request.iconUrl) {
            console.log('[ServiceGroup Service] Using existing iconUrl (no upload needed):', request.iconUrl);
            iconUrl = request.iconUrl;
        } else {
            console.log('[ServiceGroup Service] No icon provided');
        }

        // Step 2: Create service group with iconUrl
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

