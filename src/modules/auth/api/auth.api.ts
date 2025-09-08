import { http } from "@core/http/client";
import type {
    LoginPayload,
    RegisterApiPayload,
    ApiLoginResponse,
    ApiRegisterResponse
} from "@modules/auth/types";
import { API_PATH } from "@/core/config/api.path";

export const authApi = {
    async login(payload: LoginPayload) {
        return http.post<ApiLoginResponse, LoginPayload>(API_PATH.AUTH.LOGIN, payload, {
            loadingKey: "auth-login"
        });
    },

    async register(payload: RegisterApiPayload) {
        return http.post<ApiRegisterResponse, RegisterApiPayload>(API_PATH.CITIZEN.BASE, payload, {
            loadingKey: "auth-citizen-register"
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