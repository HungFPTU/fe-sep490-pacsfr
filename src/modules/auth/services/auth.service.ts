import { authApi } from "@modules/auth/api/auth.api";
import type { LoginPayload, LoginResponse } from "@modules/auth/types";

export const authService = {
    async login(payload: LoginPayload): Promise<LoginResponse> {
        const { data } = await authApi.login(payload);
        return data;
    },
}; 