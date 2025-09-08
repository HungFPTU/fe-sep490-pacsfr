import { authApi } from "../api/auth.api";
import { UserRole } from "../enums";
import { hasRoleLevel } from "../utils/role.utils";
import type {
    LoginPayload,
    LoginResponse,
    RegisterApiPayload,
    RegisterResponse,
    User,
    ApiAuthData,
    AuthTokens
} from "../types";

/**
 * Transform API auth data to internal format
 */
function transformApiAuthData(apiData: ApiAuthData): { user: User; tokens: AuthTokens } {
    // Transform API data to internal User format
    const user: User = {
        id: apiData.userId,
        username: apiData.phone, // Use phone as username since API doesn't return username
        email: "", // Will need to be fetched separately if needed
        name: apiData.fullName,
        phone: apiData.phone,
        role: apiData.role as UserRole,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Transform API token data to internal AuthTokens format
    const tokens: AuthTokens = {
        accessToken: apiData.token,
        expiresIn: new Date(apiData.expiration).getTime() - Date.now()
    };

    return { user, tokens };
}

/**
 * Auth Service - Business Logic Layer
 * Handles API calls, data transformation, and business rules
 */
export const authService = {
    // Login with business logic
    async login(credentials: LoginPayload): Promise<LoginResponse> {
        try {
            const response = await authApi.login(credentials);

            // Business logic: validate response structure
            if (!response.data.isSuccess || !response.data.data) {
                throw new Error(response.data.message || "Invalid login response");
            }

            // Transform API response to internal format
            const { user, tokens } = transformApiAuthData(response.data.data);

            return {
                user,
                tokens,
                message: response.data.message
            };
        } catch (error) {
            throw error;
        }
    },

    // Register with business logic and validation
    async register(payload: RegisterApiPayload): Promise<RegisterResponse> {
        try {
            if (payload.password.length < 6) {
                throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(payload.email)) {
                throw new Error("Email không hợp lệ");
            }

            // Ensure date format aligns with API expectation (ISO string)
            const normalizedPayload: RegisterApiPayload = {
                ...payload,
                dayOfBirth: new Date(payload.dayOfBirth).toISOString(),
            };

            const response = await authApi.register(normalizedPayload);

            const okFlag = (response.data as unknown as { isSuccess?: boolean; success?: boolean }).isSuccess ?? (response.data as unknown as { isSuccess?: boolean; success?: boolean }).success;
            if (!okFlag || !response.data.data) {
                throw new Error(response.data.message || "Invalid register response");
            }

            return {
                citizen: response.data.data,
                message: response.data.message
            };
        } catch (error) {
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

    // Utility methods using ROLES constants
    hasPermission(user: User | null, requiredRole: UserRole): boolean {
        if (!user) return false;

        // Convert normalized role back to enum for permission checking
        const userRole = user.role === UserRole.ADMIN ? UserRole.ADMIN :
            user.role === UserRole.STAFF ? UserRole.STAFF :
                UserRole.CITIZEN;

        return hasRoleLevel(userRole, requiredRole);
    },

    getDisplayName(user: User | null): string {
        if (!user) return "Guest";
        return user.name || user.username || "Unknown User";
    },
}; 