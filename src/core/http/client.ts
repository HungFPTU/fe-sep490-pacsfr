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
};

export interface HttpResponse<T> {
    data: T;
    status: number;
}

function getBaseUrl(): string {
    if (typeof window === "undefined") {
        return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

// Global auth configuration
type AuthConfig = {
    getToken?: () => string | null | undefined;
    header?: string;
    scheme?: string;
};

const globalAuthConfig: Required<AuthConfig> = {
    getToken: () => undefined,
    header: "Authorization",
    scheme: "Bearer",
};

export function configureHttpAuth(config: AuthConfig) {
    if (config.getToken) globalAuthConfig.getToken = config.getToken;
    if (config.header) globalAuthConfig.header = config.header;
    if (config.scheme) globalAuthConfig.scheme = config.scheme;
}

export function setHttpAuthTokenGetter(getToken: () => string | null | undefined) {
    globalAuthConfig.getToken = getToken;
}

function resolveAuthHeader(
    headers: HeadersInit | undefined,
    auth: AuthOptions | undefined
): Record<string, string> {
    if (auth === false) return {};

    const headerName = (auth && auth.header) || globalAuthConfig.header;
    const scheme = (auth && auth.scheme) || globalAuthConfig.scheme;
    const token = (auth && auth.token) ?? globalAuthConfig.getToken();

    if (!token) return {};

    // Do not override if caller already provided an auth header (case-insensitive)
    const existingKey = headers
        ? Object.keys(typeof headers === "object" ? (headers as Record<string, string>) : {})
            .concat(Array.isArray(headers) ? headers.map(([k]) => k) : [])
            .some((k) => k.toLowerCase() === headerName.toLowerCase())
        : false;

    if (existingKey) return {};

    const value = scheme ? `${scheme} ${token}` : token;
    return { [headerName]: value };
}

async function request<TResponse, TBody = unknown>(
    url: string,
    method: HttpMethod,
    options: HttpRequestOptions<TBody> = {}
): Promise<HttpResponse<TResponse>> {
    const { body, headers, baseUrl, auth, ...rest } = options;
    const resolvedBase = baseUrl ?? getBaseUrl();

    const authHeader = resolveAuthHeader(headers, auth);

    const fetchInit: RequestInit = {
        ...rest,
        method,
        headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
            ...authHeader,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${resolvedBase}${url}`, fetchInit);

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = (isJson ? await response.json() : await response.text()) as TResponse;

    if (!response.ok) {
        throw new Error(
            typeof data === "string" ? data : (JSON.stringify(data) || `HTTP ${response.status}`)
        );
    }

    return { data, status: response.status };
}

export const http = {
    get: <T>(url: string, options?: HttpRequestOptions) => request<T>(url, "GET", options),
    post: <T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) =>
        request<T, B>(url, "POST", { ...(options || {}), body }),
    put: <T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) =>
        request<T, B>(url, "PUT", { ...(options || {}), body }),
    patch: <T, B = unknown>(url: string, body?: B, options?: HttpRequestOptions<B>) =>
        request<T, B>(url, "PATCH", { ...(options || {}), body }),
    delete: <T>(url: string, options?: HttpRequestOptions) => request<T>(url, "DELETE", options),
}; 