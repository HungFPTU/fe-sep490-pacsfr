import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { Department } from "../types";
import { RestPaged } from "@/types/rest";

export const departmentsAPI = {
  async getAllDepartments(Keyword: string, OrgUnitId: string, IsActive: boolean, Page: number, PageSize: number) {
        return http.get<RestPaged<Department>>(API_PATH.MANAGER.DEPARTMENTS.GET_ALL(Keyword, IsActive, Page, PageSize));
      },
};