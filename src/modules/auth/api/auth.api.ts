import { http } from "@core/http/client";
import type { LoginPayload, LoginResponse } from "@modules/auth/types";
import { API_PATH } from "@shared/const/api.path";

export const authApi = {
    async login(payload: LoginPayload) {
        return http.post<LoginResponse, LoginPayload>(API_PATH.AUTH.LOGIN, payload, {
            loadingKey: "auth-login"
        });
    },

    async logout() {
        return http.post(API_PATH.AUTH.LOGOUT, {}, {
            loadingKey: "auth-logout"
        });
    },

    async getProfile() {
        return http.get(API_PATH.AUTH.ME, {
            loadingKey: "auth-profile"
        });
    },

    async updateProfile(updates: Record<string, unknown>) {
        return http.put(API_PATH.AUTH.UPDATE_PROFILE, updates, {
            loadingKey: "auth-update-profile"
        });
    },

    async refreshToken() {
        return http.post(API_PATH.AUTH.REFRESH_TOKEN, {}, {
            loadingKey: "auth-refresh"
        });
    },
}; 