// import { useGlobalLoading } from "@core/patterns/SingletonHook";
import { ENV } from "@/core/config/env";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
// import { RestMany, RestOne, RestResponse } from "@/types/rest";


export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type AuthOptions =
    | false
    | {
        token?: string | null;
        header?: string; // default: Authorization
        scheme?: string; // default: Bearer
    };

export type HttpRequestOptions<TBody = unknown> = Omit<RequestInit, "body"> & {
    body?: TBody;
    baseUrl?: string;
    auth?: AuthOptions;
    skipLoading?: boolean; // Skip global loading indicator
    loadingKey?: string; // Custom loading key for specific operations
};

export interface HttpResponse<T> {
    data: T;
    status: number;
    headers: Headers;
    message?: string;
}

export interface HttpError {
    message: string;
    status?: number;
    data?: unknown;
}

// Request/Response interceptors
type RequestInterceptor = (config: HttpRequestOptions) => HttpRequestOptions | Promise<HttpRequestOptions>;
type ResponseInterceptor = <T>(response: HttpResponse<T>) => HttpResponse<T> | Promise<HttpResponse<T>>;
type ErrorInterceptor = (error: HttpError) => HttpError | Promise<HttpError>;

class HttpClient {
    private requestInterceptors: RequestInterceptor[] = [];
    private responseInterceptors: ResponseInterceptor[] = [];
    private errorInterceptors: ErrorInterceptor[] = [];
    private globalAuthConfig: Required<{
        getToken: () => string | null | undefined;
        header: string;
        scheme: string;
    }> = {
            getToken: () => {
                // Get token from auth store
                if (typeof window !== 'undefined') {
                    const authStore = useAuthStore.getState();
                    return authStore.token;
                }
                return null;
            },
            header: "Authorization",
            scheme: "Bearer",
        };

    // Interceptor management
    addRequestInterceptor(interceptor: RequestInterceptor) {
        this.requestInterceptors.push(interceptor);
        return () => {
            const index = this.requestInterceptors.indexOf(interceptor);
            if (index > -1) this.requestInterceptors.splice(index, 1);
        };
    }

    addResponseInterceptor(interceptor: ResponseInterceptor) {
        this.responseInterceptors.push(interceptor);
        return () => {
            const index = this.responseInterceptors.indexOf(interceptor);
            if (index > -1) this.responseInterceptors.splice(index, 1);
        };
    }

    addErrorInterceptor(interceptor: ErrorInterceptor) {
        this.errorInterceptors.push(interceptor);
        return () => {
            const index = this.errorInterceptors.indexOf(interceptor);
            if (index > -1) this.errorInterceptors.splice(index, 1);
        };
    }

    // Auth configuration
    configureAuth(config: {
        getToken?: () => string | null | undefined;
        header?: string;
        scheme?: string;
    }) {
        if (config.getToken) this.globalAuthConfig.getToken = config.getToken;
        if (config.header) this.globalAuthConfig.header = config.header;
        if (config.scheme) this.globalAuthConfig.scheme = config.scheme;
    }

    // Method to get current auth state
    getAuthState() {
        if (typeof window !== 'undefined') {
            const authStore = useAuthStore.getState();
            return {
                token: authStore.token,
                isAuthenticated: authStore.isAuthenticated,
                user: authStore.user,
                role: authStore.role
            };
        }
        return {
            token: null,
            isAuthenticated: false,
            user: null,
            role: null
        };
    }

    // Method to handle logout
    handleLogout(reason: string = 'manual') {
        if (typeof window !== 'undefined') {
            const authStore = useAuthStore.getState();
            authStore.clearCredentials();

            // Dispatch logout event
            window.dispatchEvent(new CustomEvent("auth-logout", {
                detail: { reason, message: 'User logged out' }
            }));

            // Redirect to login page
            window.location.href = '/login';
        }
    }

    protected getBaseUrl(): string {
        const baseUrl = ENV.API_BASE_URL || "/api";
        return baseUrl;
    }

    protected resolveAuthHeader(
        headers: HeadersInit | undefined,
        auth: AuthOptions | undefined
    ): Record<string, string> {
        if (auth === false) return {};

        const headerName = (auth && auth.header) || this.globalAuthConfig.header;
        const scheme = (auth && auth.scheme) || this.globalAuthConfig.scheme;
        const token = (auth && auth.token) ?? this.globalAuthConfig.getToken();

        if (!token) return {};

        // Check if auth header already exists (case-insensitive)
        const existingKey = headers
            ? Object.keys(typeof headers === "object" ? (headers as Record<string, string>) : {})
                .concat(Array.isArray(headers) ? headers.map(([k]) => k) : [])
                .some((k) => k.toLowerCase() === headerName.toLowerCase())
            : false;

        if (existingKey) return {};

        const value = scheme ? `${scheme} ${token}` : token;
        return { [headerName]: value };
    }

    protected async executeRequestInterceptors(config: HttpRequestOptions): Promise<HttpRequestOptions> {
        let finalConfig = config;
        for (const interceptor of this.requestInterceptors) {
            finalConfig = await interceptor(finalConfig);
        }
        return finalConfig;
    }

    protected async executeResponseInterceptors<T>(response: HttpResponse<T>): Promise<HttpResponse<T>> {
        let finalResponse = response;
        for (const interceptor of this.responseInterceptors) {
            finalResponse = await interceptor(finalResponse);
        }
        return finalResponse;
    }

    protected async executeErrorInterceptors(error: HttpError): Promise<HttpError> {
        let finalError = error;
        for (const interceptor of this.errorInterceptors) {
            finalError = await interceptor(finalError);
        }
        return finalError;
    }

    async request<TResponse, TBody = unknown>(
        url: string,
        method: HttpMethod,
        options: HttpRequestOptions<TBody> = {}
    ): Promise<HttpResponse<TResponse>> {
        // Execute request interceptors
        const processedOptions = await this.executeRequestInterceptors(options);

        const { body, headers, baseUrl, auth, skipLoading, loadingKey, ...rest } = processedOptions;
        const resolvedBase = baseUrl ?? this.getBaseUrl();

        // Handle loading state
        const loadingManager = this.getLoadingManager();
        const actualLoadingKey = loadingKey || `${method}:${url}`;

        if (!skipLoading) {
            loadingManager.setLoading(actualLoadingKey, true);
        }

        try {
            const authHeader = this.resolveAuthHeader(headers, auth);

            // Handle FormData vs JSON body
            const isFormData = body instanceof FormData;
            const fetchHeaders: HeadersInit = {
                ...(headers || {}),
                ...authHeader,
            };

            // Only set Content-Type for non-FormData requests
            if (!isFormData) {
                (fetchHeaders as Record<string, string>)["Content-Type"] = "application/json";
            }

            // Debug logging for FormData
            if (isFormData) {
                console.log('[HTTP Client] Sending FormData request to:', `${resolvedBase}${url}`);
                console.log('[HTTP Client] FormData entries:');
                for (const [key, value] of (body as FormData).entries()) {
                    console.log(`  ${key}:`, value);
                }
                console.log('[HTTP Client] Headers:', fetchHeaders);
            }

            const fetchInit: RequestInit = {
                ...rest,
                method,
                headers: fetchHeaders,
                body: body !== undefined ? (isFormData ? body : JSON.stringify(body)) : undefined,
            };

            // Remove Content-Type header for FormData to let browser set it with boundary
            if (isFormData && (fetchHeaders as Record<string, string>)['Content-Type']) {
                delete (fetchHeaders as Record<string, string>)['Content-Type'];
            }

            // Chỗ này chưa có API auth/me, lỗi ở đây
            const response = await fetch(`${resolvedBase}${url}`, fetchInit);

            const contentType = response.headers.get("content-type");
            const isJson = contentType && contentType.includes("application/json");

            let data: TResponse;
            if (isJson) {
                const text = await response.text();
                if (text.trim() === "") {
                    data = {} as TResponse; // Handle empty JSON responses
                } else {
                    try {
                        data = JSON.parse(text);
                    } catch {
                        console.warn("Failed to parse JSON response:", text);
                        data = text as TResponse;
                    }
                }
            } else {
                data = (await response.text()) as TResponse;
            }

            if (!response.ok) {
                // Try to extract error message from response data
                let errorMessage = `HTTP ${response.status}`;

                if (typeof data === "object" && data !== null) {
                    // Check for common error message fields
                    const errorObj = data as Record<string, unknown>;
                    errorMessage =
                        (typeof errorObj.message === "string" && errorObj.message) ||
                        (typeof errorObj.error === "string" && errorObj.error) ||
                        (typeof errorObj.errorMessage === "string" && errorObj.errorMessage) ||
                        JSON.stringify(data);
                } else if (typeof data === "string") {
                    errorMessage = data;
                } else {
                    errorMessage = JSON.stringify(data) || `HTTP ${response.status}`;
                }

                const error: HttpError = {
                    message: errorMessage,
                    status: response.status,
                    data,
                };

                const processedError = await this.executeErrorInterceptors(error);
                throw new Error(processedError.message);
            }

            const httpResponse: HttpResponse<TResponse> = {
                data,
                status: response.status,
                headers: response.headers,
            };

            // Execute response interceptors
            const finalResponse = await this.executeResponseInterceptors(httpResponse);
            return finalResponse;

        } catch (error) {
            const httpError: HttpError = {
                message: error instanceof Error ? error.message : "Unknown error",
                status: error instanceof Error && 'status' in error ? (error as { status: number }).status : undefined,
                data: error instanceof Error && 'data' in error ? (error as { data: unknown }).data : undefined,
            };

            const processedError = await this.executeErrorInterceptors(httpError);
            throw new Error(processedError.message);
        } finally {
            if (!skipLoading) {
                loadingManager.setLoading(actualLoadingKey, false);
            }
        }
    }

    private getLoadingManager() {
        // This will be used to manage loading states
        // We'll create a singleton loading manager
        return {
            setLoading: (key: string, loading: boolean) => {
                if (typeof window !== "undefined") {
                    // Dispatch custom event for loading state changes
                    window.dispatchEvent(new CustomEvent("http-loading-change", {
                        detail: { key, loading }
                    }));
                }
            }
        };
    }

    // HTTP methods
    get<T>(url: string, options?: HttpRequestOptions) {
        return this.request<T>(url, "GET", options);
    }

    post<T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) {
        return this.request<T, B>(url, "POST", { ...(options || {}), body });
    }

    put<T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) {
        return this.request<T, B>(url, "PUT", { ...(options || {}), body });
    }

    patch<T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) {
        return this.request<T, B>(url, "PATCH", { ...(options || {}), body });
    }

    delete<T>(url: string, options?: HttpRequestOptions) {
        return this.request<T>(url, "DELETE", options);
    }
}

// Create singleton instance
export const http = new HttpClient();

// Create HTTP client without loading functionality
class HttpClientNoLoading extends HttpClient {
    override async request<TResponse, TBody = unknown>(
        url: string,
        method: HttpMethod,
        options: HttpRequestOptions<TBody> = {}
    ): Promise<HttpResponse<TResponse>> {
        // Execute request interceptors
        const processedOptions = await this.executeRequestInterceptors(options);

        const { body, headers, baseUrl, auth, ...rest } = processedOptions;
        const resolvedBase = baseUrl ?? this.getBaseUrl();

        try {
            const authHeader = this.resolveAuthHeader(headers, auth);

            // Handle FormData vs JSON body
            const isFormData = body instanceof FormData;
            const fetchHeaders: HeadersInit = {
                ...(headers || {}),
                ...authHeader,
            };

            // Only set Content-Type for non-FormData requests
            if (!isFormData) {
                (fetchHeaders as Record<string, string>)["Content-Type"] = "application/json";
            }

            // Debug logging for FormData
            if (isFormData) {
                console.log('[HTTP Client] Sending FormData request to:', `${resolvedBase}${url}`);
                console.log('[HTTP Client] FormData entries:');
                for (const [key, value] of (body as FormData).entries()) {
                    console.log(`  ${key}:`, value);
                }
                console.log('[HTTP Client] Headers:', fetchHeaders);
            }

            const fetchInit: RequestInit = {
                ...rest,
                method,
                headers: fetchHeaders,
                body: body !== undefined ? (isFormData ? body : JSON.stringify(body)) : undefined,
            };

            // Remove Content-Type header for FormData to let browser set it with boundary
            if (isFormData && (fetchHeaders as Record<string, string>)['Content-Type']) {
                delete (fetchHeaders as Record<string, string>)['Content-Type'];
            }

            const response = await fetch(`${resolvedBase}${url}`, fetchInit);

            const contentType = response.headers.get("content-type");
            const isJson = contentType && contentType.includes("application/json");

            let data: TResponse;
            if (isJson) {
                const text = await response.text();
                if (text.trim() === "") {
                    data = {} as TResponse; // Handle empty JSON responses
                } else {
                    try {
                        data = JSON.parse(text);
                    } catch {
                        console.warn("Failed to parse JSON response:", text);
                        data = text as TResponse;
                    }
                }
            } else {
                data = (await response.text()) as TResponse;
            }

            if (!response.ok) {
                // Try to extract error message from response data
                let errorMessage = `HTTP ${response.status}`;

                if (typeof data === "object" && data !== null) {
                    // Check for common error message fields
                    const errorObj = data as Record<string, unknown>;
                    errorMessage =
                        (typeof errorObj.message === "string" && errorObj.message) ||
                        (typeof errorObj.error === "string" && errorObj.error) ||
                        (typeof errorObj.errorMessage === "string" && errorObj.errorMessage) ||
                        JSON.stringify(data);
                } else if (typeof data === "string") {
                    errorMessage = data;
                } else {
                    errorMessage = JSON.stringify(data) || `HTTP ${response.status}`;
                }

                const error: HttpError = {
                    message: errorMessage,
                    status: response.status,
                    data,
                };

                const processedError = await this.executeErrorInterceptors(error);
                throw new Error(processedError.message);
            }

            const httpResponse: HttpResponse<TResponse> = {
                data,
                status: response.status,
                headers: response.headers,
            };

            // Execute response interceptors
            const finalResponse = await this.executeResponseInterceptors(httpResponse);
            return finalResponse;

        } catch (error) {
            const httpError: HttpError = {
                message: error instanceof Error ? error.message : "Unknown error",
                status: error instanceof Error && 'status' in error ? (error as { status: number }).status : undefined,
                data: error instanceof Error && 'data' in error ? (error as { data: unknown }).data : undefined,
            };

            const processedError = await this.executeErrorInterceptors(httpError);
            throw new Error(processedError.message);
        }
    }
}

// Create singleton instance without loading
export const httpNoLoading = new HttpClientNoLoading();

// Setup default interceptors for httpNoLoading (same as http)
httpNoLoading.addRequestInterceptor(async (config) => {
    // Add request ID for tracking
    const requestId = Math.random().toString(36).substr(2, 9);
    console.log(`[HTTP Request ${requestId}]`, config);
    return {
        ...config,
        headers: {
            ...config.headers,
            'X-Request-ID': requestId,
        },
    };
});

httpNoLoading.addResponseInterceptor(async (response) => {
    const requestId = response.headers.get('X-Request-ID');
    console.log(`[HTTP Response ${requestId}]`, response);
    return response;
});

httpNoLoading.addErrorInterceptor(async (error) => {
    // Only log meaningful error information, skip network errors for mock app
    const errorInfo = {
        message: error.message || 'Unknown error',
        status: error.status || 404,
        data: error.data || null,
    };

    // Only log if it's not a network connection error (common in mock apps)
    if (error.status !== undefined || !error.message.includes('fetch')) {
        console.error('[HTTP Error]', errorInfo);
    }

    // Handle common error scenarios
    if (error.status === 401) {
        // Unauthorized - logout user and redirect to login
        console.warn('[HTTP Client] 401 Unauthorized:', error.message);

        if (typeof window !== "undefined") {
            // Use http client's logout method
            httpNoLoading.handleLogout('unauthorized');
        }
    }

    if (error.status === 403) {
        // Forbidden - show access denied message
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("access-denied", { detail: error }));
        }
    }

    if (error.status && error.status >= 500) {
        // Server error - show generic error message
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("server-error", { detail: error }));
        }
    }

    return error;
});

// Setup default interceptors
http.addRequestInterceptor(async (config) => {
    // Add request ID for tracking
    const requestId = Math.random().toString(36).substr(2, 9);
    console.log(`[HTTP Request ${requestId}]`, config);
    return {
        ...config,
        headers: {
            ...config.headers,
            'X-Request-ID': requestId,
        },
    };
});

http.addResponseInterceptor(async (response) => {
    const requestId = response.headers.get('X-Request-ID');
    console.log(`[HTTP Response ${requestId}]`, response);
    return response;
});

http.addErrorInterceptor(async (error) => {
    // Only log meaningful error information, skip network errors for mock app
    const errorInfo = {
        message: error.message || 'Unknown error',
        status: error.status || 404,
        data: error.data || null,
    };

    // Only log if it's not a network connection error (common in mock apps)
    if (error.status !== undefined || !error.message.includes('fetch')) {
        console.error('[HTTP Error]', errorInfo);
    }

    // Handle common error scenarios
    if (error.status === 401) {
        // Unauthorized - logout user and redirect to login
        console.warn('[HTTP Client] 401 Unauthorized:', error.message);

        if (typeof window !== "undefined") {
            // Use http client's logout method
            http.handleLogout('unauthorized');
        }
    }

    if (error.status === 403) {
        // Forbidden - show access denied message
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("access-denied", { detail: error }));
        }
    }

    if (error.status && error.status >= 500) {
        // Server error - show generic error message
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("server-error", { detail: error }));
        }
    }

    return error;
});

// Export types and utilities
export type { RequestInterceptor, ResponseInterceptor, ErrorInterceptor };