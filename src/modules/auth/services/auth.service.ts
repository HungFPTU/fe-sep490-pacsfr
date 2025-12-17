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
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
// import { AUTH_ROUTES } from "@/modules/auth/consts";

/**
 * Transform API auth data to internal format (old format)
 */
function transformApiAuthData(apiData: ApiAuthData): { user: User; tokens: AuthTokens, role: UserRole } {
    // Transform API data to internal User format
    const user: User = {
        id: apiData.userId,
        username: apiData.username, // Use phone as username since old API doesn't return username
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
    console.log('[Auth Service] Raw API data:', apiData);
    console.log('[Auth Service] API role:', apiData.role, 'type:', typeof apiData.role);

    // Map API role to UserRole enum first
    let role: UserRole;
    if (apiData.role === 'Manager') {
        role = UserRole.MANAGER;
    } else if (apiData.role === 'Staff') {
        role = UserRole.STAFF;
    } else {
        role = UserRole.GUEST;
    }

    console.log('[Auth Service] Mapped role:', apiData.role, '->', role);

    // Transform API data to internal User format
    const user: User = {
        id: apiData.username, // Use username as ID
        username: apiData.username,
        email: "", // Not provided in login response
        name: apiData.fullName,
        phone: "", // Not provided in login response
        role: role, // ✅ Use mapped role
        roleType: apiData.role, // ✅ Store original API role
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    console.log('[Auth Service] Transformed user:', user);

    // Transform API token data to internal AuthTokens format
    const tokens: AuthTokens = {
        accessToken: apiData.token,
        expiresIn: 12 * 60 * 60 * 1000 // 12 hours from JWT
    };


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
                // Extract message from error (already extracted by http client from API response)
                const errorMessage = error.message;

                // Map common HTTP status codes to user-friendly messages
                if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
                    throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
                }
                if (errorMessage.includes("429")) {
                    throw new Error("Quá nhiều lần thử. Vui lòng thử lại sau");
                }
                if (errorMessage.includes("500")) {
                    throw new Error("Lỗi hệ thống. Vui lòng thử lại sau");
                }

                // If error message is already user-friendly (from API), use it directly
                // Otherwise throw with the original message
                throw error;
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
                // Extract message from API response if available
                const apiResponse = response.data as { message?: string; isSuccess: boolean };
                const errorMessage = apiResponse?.message || "Invalid register response";
                throw new Error(errorMessage);
            }

            // Transform API response to internal format
            const { user, tokens } = transformApiAuthData(response.data.data as ApiAuthData);

            return {
                user,
                tokens,
                role: user.role,
                message: response.data.message
            };
        } catch (error) {
            // Business logic: handle different error types
            if (error instanceof Error) {
                // Extract message from error (already extracted by http client from API response)
                const errorMessage = error.message;

                // Map common HTTP status codes to user-friendly messages
                if (errorMessage.includes("409") || errorMessage.includes("đã tồn tại")) {
                    throw new Error("Tên đăng nhập hoặc email đã tồn tại");
                }
                if (errorMessage.includes("422")) {
                    throw new Error("Thông tin đăng ký không hợp lệ");
                }
                if (errorMessage.includes("500")) {
                    throw new Error("Lỗi hệ thống. Vui lòng thử lại sau");
                }

                // If error message is already user-friendly (from API), use it directly
                throw error;
            }
            throw error;
        }
    },

    // Logout with cleanup
    async logout(): Promise<void> {
        try {
            // Clear credentials first
            const authStore = useAuthStore.getState();
            authStore.clearCredentials();

            // Longer delay to ensure state is cleared and prevent 403 flash
            setTimeout(() => {
                window.location.href = '/login';
            }, 300);
        } catch (error) {
            console.warn("Logout API failed:", error);
            throw error;
        }
    },

    // Get profile and update store
    async getProfile(): Promise<User> {
        const response = await authApi.getProfile();
        const profileData = response.data as User;
        
        // Update auth store with latest profile data
        const authStore = useAuthStore.getState();
        if (authStore.user && authStore.token && authStore.role) {
            authStore.setCredentials(
                profileData,
                authStore.token,
                authStore.role,
                authStore.rememberMe
            );
        }
        
        return profileData;
    },

    // Utility methods using ROLES constants
    hasPermission(user: User | null, requiredRole: UserRole): boolean {
        if (!user) return false;

        // Convert normalized role back to enum for permission checking
        const userRole = user.role === UserRole.MANAGER ? UserRole.MANAGER :
            user.role === UserRole.STAFF ? UserRole.STAFF :
                UserRole.GUEST;

        return hasRoleLevel(userRole, requiredRole);
    },

    getDisplayName(user: User | null): string {
        if (!user) return "Guest";
        return user.name || user.username || "Unknown User";
    },
}; 