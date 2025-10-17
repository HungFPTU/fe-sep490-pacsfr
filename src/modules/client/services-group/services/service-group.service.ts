import { ServiceGroupApi } from "../api/service-group.api";
import type { ServiceGroup, ServiceGroupDetailResponse, ServiceGroupListResponse } from "../types";

export class ServiceGroupService {
    // Get service group by ID
    static async getServiceGroupById(id: string): Promise<ServiceGroupDetailResponse> {
        try {
            return await ServiceGroupApi.getServiceGroupById(id);
        } catch (error) {
            console.error("Error fetching service group detail:", error);
            throw error;
        }
    }

    // Get all service groups
    static async getServiceGroups(): Promise<ServiceGroupListResponse> {
        try {
            return await ServiceGroupApi.getServiceGroups();
        } catch (error) {
            console.error("Error fetching service groups:", error);
            throw error;
        }
    }

    // Format service group name for display
    static formatServiceGroupName(group: ServiceGroup): string {
        return `${group.groupCode} - ${group.groupName}`;
    }

    // Check if service group is active
    static isServiceGroupActive(group: ServiceGroup): boolean {
        return group.isActive;
    }
}
