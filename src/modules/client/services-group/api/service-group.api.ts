import { API_PATH } from "@/core/config";
import { httpNoLoading } from "@core/http/client";
import type { ServiceGroupDetailResponse, ServiceGroupListResponse } from "../types";

export class ServiceGroupApi {

    // Get service group by ID
    static async getServiceGroupById(id: string): Promise<ServiceGroupDetailResponse> {
        const response = await httpNoLoading.get<ServiceGroupDetailResponse>(API_PATH.CLIENT.SERVICE_GROUPS.BY_ID(id));
        return response.data;
    }

    // Get all service groups
    static async getServiceGroups(): Promise<ServiceGroupListResponse> {
        const response = await httpNoLoading.get<ServiceGroupListResponse>(API_PATH.CLIENT.SERVICE_GROUPS.ALL);
        return response.data;
    }
}

export const serviceGroupApi = new ServiceGroupApi();
