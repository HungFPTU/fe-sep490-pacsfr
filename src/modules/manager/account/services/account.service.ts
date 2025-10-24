import { RestPaged, RestResponse } from "@/types/rest";
import { accountsAPI } from "../api/account.api";
import { Account, AssignDepartmentAccountRequest, CreateAccountRequest, OrgUnit, UpdateAccountRequest } from "../types";

export const accountApiService = {
    async getDataAccounts(): Promise<RestResponse<Account>> {
    const res = await accountsAPI.getAllAccounts();
    return res.data;
  },

  async createAccount(request: CreateAccountRequest): Promise<RestResponse<Account>> {
    const res = await accountsAPI.createAccount(request);
    return res.data;
  },

  async getAccountById(id: string): Promise<RestResponse<Account>> {
    const res = await accountsAPI.getAccountById(id);
    return res.data;
  },

  async assignDepartment(id: string, request: AssignDepartmentAccountRequest): Promise<RestResponse<Account>> {
    const res = await accountsAPI.assignDepartment(id, request);
    return res.data;
  },

  async updateAccount(id: string, request: UpdateAccountRequest): Promise<RestResponse<Account>> {
    const res = await accountsAPI.updateAccount(id, request);
    return res.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await accountsAPI.deleteAccount(id);
  },

  // Để tạm vào đây, sau chuyển qua orgunit service
  async getAllOrgUnits(Keyword: string, IsActive: boolean, Page: number, PageSize: number): Promise<RestPaged<OrgUnit>> {
    const res = await accountsAPI.getAllOrgUnits(Keyword, IsActive, Page, PageSize);
    return res.data;
  },
};

export const rolesData = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getDataPermissions(): Promise<RestResponse<Account[]>> {
        try {
            const res = await accountsAPI.getAllPermissions();
            return res.data;
        } catch {
            throw new Error('Failed to fetch permissions');
        }
    },
};
