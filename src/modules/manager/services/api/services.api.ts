import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { LegalBasis, ServiceGroupResponse, Services, ServicesRequest } from "../types";
import { RestPaged, RestResponse } from "@/types/rest";

export const servicesApi = {
  async getAllServices(Keyword: string, ServiceGroupId: string, legalBasisId: string, isActive: boolean, Page: number, Size: number) {
      return http.get<RestPaged<Services>>(API_PATH.MANAGER.SERVICES.GET_ALL(Keyword, ServiceGroupId, legalBasisId, isActive, Page, Size));
  },
  async createService(data: ServicesRequest) {
      return http.post<RestResponse<Services>>(API_PATH.MANAGER.SERVICES.POST, data);
    },
    async updateService(id: string, data: ServicesRequest) {
        return http.put<RestResponse<Services>>(API_PATH.MANAGER.SERVICES.PUT(id), data);
    },
    async getServiceById(id: string) {
        return http.get<RestResponse<Services>>(API_PATH.MANAGER.SERVICES.GET_BY_ID(id));
    },
    async deleteService(id: string) {
        return http.delete<void>(API_PATH.MANAGER.SERVICES.DELETE(id));
    },
    async getAllLegalBasic(Keyword: string, isActive: boolean, Page: number, Size: number) {
        return http.get<RestPaged<LegalBasis>>(API_PATH.MANAGER.LEGALBASIS.GET_ALL(Keyword, isActive, Page, Size));
    },
    async getAllServiceGroups(Keyword: string, isActive: boolean, Page: number, Size: number) {
        return http.get<RestPaged<ServiceGroupResponse>>(API_PATH.MANAGER.SERVICES.GET_ALL_GROUP(Keyword, isActive, Page, Size));
  },
};


