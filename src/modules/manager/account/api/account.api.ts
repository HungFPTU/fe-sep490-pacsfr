import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import { Account, AssignDepartmentAccountRequest, CreateAccountRequest, OrgUnit, UpdateAccountRequest } from "../types";
import { RestPaged, RestResponse } from "@/types/rest";

export const accountsAPI = {
  async getAllAccounts() {
        return http.get<RestResponse<Account>>(API_PATH.MANAGER.ACCOUNTS.GET_ALL);
      },
      async getAccountById(id: string) {
        return http.get<RestResponse<Account>>(API_PATH.MANAGER.ACCOUNTS.GET_BY_ID(id));
      },
      async createAccount(request: CreateAccountRequest) {
        return http.post<RestResponse<Account>>(API_PATH.MANAGER.ACCOUNTS.POST, request);
      },
      async updateAccount(id: string, request: UpdateAccountRequest) {
        return http.put<RestResponse<Account>>(API_PATH.MANAGER.ACCOUNTS.PUT(id), request);
      },
      async assignDepartment(id: string, request: AssignDepartmentAccountRequest ) {
        return http.post<RestResponse<Account>>(API_PATH.MANAGER.ACCOUNTS.ASSIGN(id), request);
      },
      async deleteAccount(id: string) {
        return http.delete<void>(API_PATH.MANAGER.ACCOUNTS.DELETE(id));
      },
      async getAllPermissions() {
        return http.get<RestResponse<Account[]>>(API_PATH.MANAGER.ACCOUNTS.GET_ALL);
      },
      async getAllOrgUnits(Keyword: string, IsActive: boolean, Page: number, PageSize: number) {
        return http.get<RestPaged<OrgUnit>>(API_PATH.MANAGER.ORG_UNIT.GET_ALL(Keyword, IsActive, Page, PageSize));
  }
};