import { authApi } from "../api/auth.api";
import type { LoginPayload, LoginResponse, User } from "../types";

/**
 * Auth Service - Business Logic Layer
 * Handles API calls, data transformation, and business rules
 */
export const authService = {
    // Login with business logic
    async login(credentials: LoginPayload): Promise<LoginResponse> {
        try {
            const response = await authApi.login(credentials);

            // Business logic: validate response
            if (!response.data.user || !response.data.token) {
                throw new Error("Invalid login response");
            }

            return response.data;
        } catch (error) {
            // Business logic: handle different error types
            if (error instanceof Error) {
                if (error.message.includes("401")) {
                    throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
                }
                if (error.message.includes("429")) {
                    throw new Error("Quá nhiều lần thử. Vui lòng thử lại sau");
                }
                if (error.message.includes("500")) {
                    throw new Error("Lỗi hệ thống. Vui lòng thử lại sau");
                }
            }
            throw error;
        }
    },

    // Logout with cleanup
    async logout(): Promise<void> {
        try {
            await authApi.logout();
        } catch (error) {
            console.warn("Logout API failed:", error);
        }
    },

    // Get profile
    async getProfile(): Promise<User> {
        const response = await authApi.getProfile();
        return response.data as User;
    },

    // Utility methods
    hasPermission(user: User | null, requiredRole: string | string[]): boolean {
        if (!user) return false;
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        return roles.includes(user.role);
    },

    getDisplayName(user: User | null): string {
        if (!user) return "Guest";
        return user.name || user.username || "Unknown User";
    },
}; 