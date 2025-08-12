import { http } from "@core/http/client";
import type { LoginPayload, LoginResponse } from "@modules/auth/types";
import { API_PATH } from "@shared/const/api.path";

export const authApi = {
    async login(payload: LoginPayload) {
        return http.post<LoginResponse, LoginPayload>(API_PATH.AUTH.LOGIN, payload);
    },
}; 