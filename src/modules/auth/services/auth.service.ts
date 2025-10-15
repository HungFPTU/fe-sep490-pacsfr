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
    ApiLoginData,
    AuthTokens
} from "../types";

/**
 * Transform API auth data to internal format (old format)
 */
function transformApiAuthData(apiData: ApiAuthData): { user: User; tokens: AuthTokens, role: UserRole } {
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

    const role = apiData.role as UserRole;

    return { user, tokens, role };
}

/**
 * Transform new API login data to internal format
 */
function transformLoginData(apiData: ApiLoginData): { user: User; tokens: AuthTokens, role: UserRole } {
    // Transform API data to internal User format
    const user: User = {
        id: apiData.username, // Use username as ID
        username: apiData.username,
        email: "", // Not provided in login response
        name: apiData.fullName,
        phone: "", // Not provided in login response
        role: apiData.role as UserRole,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Transform API token data to internal AuthTokens format
    const tokens: AuthTokens = {
        accessToken: apiData.token,
        expiresIn: 12 * 60 * 60 * 1000 // 12 hours from JWT
    };

    const role = apiData.role as UserRole;

    return { user, tokens, role };
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
            // New API returns direct data without wrapper
            if (!response.data || !response.data.token) {
                throw new Error("Invalid login response");
            }

            // Transform API response to internal format
            const { user, tokens, role } = transformLoginData(response.data);

            return {
                user,
                tokens,
                role,
                message: "Đăng nhập thành công"
            };
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

    // Register with business logic and validation
    async register(payload: RegisterApiPayload): Promise<RegisterResponse> {
        try {
            // Note: confirmPassword validation is handled in the frontend
            // The payload here should not contain confirmPassword

            if (payload.password.length < 5) {
                throw new Error("Mật khẩu phải có ít nhất 5 ký tự");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(payload.email)) {
                throw new Error("Email không hợp lệ");
            }

            const response = await authApi.register(payload);

            // Business logic: validate response structure
            if (!response.data.isSuccess || !response.data.data) {
                throw new Error(response.data.message || "Invalid register response");
            }

            // Transform API response to internal format
            const { user, tokens } = transformApiAuthData(response.data.data);

            return {
                user,
                tokens,
                role: user.role,
                message: response.data.message
            };
        } catch (error) {
            // Business logic: handle different error types
            if (error instanceof Error) {
                if (error.message.includes("409")) {
                    throw new Error("Tên đăng nhập hoặc email đã tồn tại");
                }
                if (error.message.includes("422")) {
                    throw new Error("Thông tin đăng ký không hợp lệ");
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