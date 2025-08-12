export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
}

export interface LoginResponse {
    user: AuthUser;
    token: string;
} 