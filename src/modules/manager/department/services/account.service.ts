import { Department } from "../types";
import { departmentsAPI } from "../api/deparment.api";
import { RestPaged } from "@/types/rest";

export const departmentApiService = {
    async getDataDepartments(Keyword: string, OrgUnitId: string, IsActive: boolean, Page: number, PageSize: number): Promise<RestPaged<Department>> {
    const res = await departmentsAPI.getAllDepartments(Keyword, OrgUnitId, IsActive, Page, PageSize);
    return res.data;
  },
};
