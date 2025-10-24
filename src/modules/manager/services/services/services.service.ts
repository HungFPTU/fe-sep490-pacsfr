import { RestPaged, RestResponse } from "@/types/rest";
import { servicesApi } from "../api/services.api";
import { LegalBasis, ServiceGroupResponse, Services, ServicesRequest } from "../types";

export const serviceAPI = {
    async getAllService(Keyword: string, ServiceGroupId: string, legalBasisId: string, isActive: boolean, Page: number, Size: number): Promise<RestPaged<Services>> {
    const res = await servicesApi.getAllServices(Keyword, ServiceGroupId, legalBasisId, isActive, Page, Size);
    return res.data;
  },

  async getServiceById(id: string): Promise<RestResponse<Services>> {
    const res = await servicesApi.getServiceById(id);
    return res.data;
  },

  async createService(request: ServicesRequest): Promise<RestResponse<Services>> {
    const res = await servicesApi.createService(request);
    return res.data;
  },

  async updateService(id: string, request: ServicesRequest): Promise<RestResponse<Services>> {
    const res = await servicesApi.updateService(id, request);
    return res.data;
  },

  async deleteService(id: string): Promise<void> {
    await servicesApi.deleteService(id);
  },

  async getAllServiceGroups(Keyword: string, isActive: boolean, Page: number, Size: number): Promise<RestPaged<ServiceGroupResponse>  > {
    const res = await servicesApi.getAllServiceGroups(Keyword, isActive, Page, Size);
    return res.data;
  },

  async getAllLegalBasics(Keyword: string, isActive: boolean, Page: number, Size: number): Promise<RestPaged<LegalBasis>  > {
    const res = await servicesApi.getAllLegalBasic(Keyword, isActive, Page, Size);
    return res.data;
  },


};