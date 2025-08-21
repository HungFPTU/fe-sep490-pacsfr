export interface LoginPayload {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    role: "admin" | "staff" | "citizen";
    name: string;
    avatar?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
} 