"use client";

import { LoginForm } from "@/modules/auth/components/login/LoginForm";
import { useAuth } from "@/modules/auth/hooks";
import { UserRole } from "@/modules/auth/enums";
import { LoginPayload } from "@/modules/auth/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { APP_CONFIG } from "@/core";

// Simple decryption for URL params
const decrypt = (encrypted: string): string => {
    try {
        return decodeURIComponent(atob(encrypted));
    } catch {
        return '';
    }
};

function doRedirect(href: string) {
    if (typeof window !== "undefined" && window.location) {
        window.location.href = href;
    }
}

export default function LoginPage() {
    const { login, isLoading, isAuthenticated, role } = useAuth();
    const searchParams = useSearchParams();

    // Memoized state to prevent unnecessary re-renders
    const [intendedRole, setIntendedRole] = useState<UserRole | null>(null);
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    // Parse encrypted URL params - memoized to prevent re-parsing
    const urlParams = useMemo(() => {
        const roleParam = searchParams.get('r');
        const urlParam = searchParams.get('u');

        return {
            role: roleParam ? decrypt(roleParam) : null,
            url: urlParam ? decrypt(urlParam) : null
        };
    }, [searchParams]);

    // Update state when URL params change
    useEffect(() => {
        if (urlParams.role && Object.values(UserRole).includes(urlParams.role as UserRole)) {
            setIntendedRole(urlParams.role as UserRole);
        }
        if (urlParams.url) {
            setReturnUrl(urlParams.url);
        }
    }, [urlParams]);

    // Memoized login handler to prevent unnecessary re-renders
    const handleLogin = useCallback(async (credentials: LoginPayload) => {
        try {
            const result = await login(credentials);
            console.log('[Login] Login successful, redirecting based on role:', role);

            // Wait for cookie to be set before redirect
            setTimeout(() => {
                // Use returnUrl if available, otherwise redirect based on role
                if (returnUrl) {
                    console.log('[Login] Post-login redirecting to returnUrl:', returnUrl);
                    doRedirect(returnUrl);
                } else if (role === UserRole.MANAGER) {
                    console.log('[Login] Post-login redirecting Manager to /manager');
                    doRedirect('/manager');
                } else if (role === UserRole.STAFF) {
                    console.log('[Login] Post-login redirecting Staff to /staff/dashboard');
                    doRedirect('/staff/dashboard');
                } else {
                    console.log('[Login] Post-login redirecting to home');
                    doRedirect('/');
                }
            }, 1000); // 1 second delay to ensure state is stable

            return result;
        } catch (error) {
            console.error('[Login] Login failed:', error);
            throw error;
        }
    }, [login, role, returnUrl]);

    // Redirect if already authenticated - memoized to prevent unnecessary re-renders
    useEffect(() => {
        if (isAuthenticated && role) {
            console.log('[Login Page] User already authenticated with role:', role);

            // Add delay to prevent redirect loop
            const timeoutId = setTimeout(() => {
                // Check if user role matches intended role
                if (intendedRole && role !== intendedRole) {
                    console.warn('[Login] Role mismatch. Expected:', intendedRole, 'Got:', role);
                    // Still redirect but log the mismatch
                }

                // Use returnUrl if available, otherwise redirect based on role
                if (returnUrl) {
                    console.log('[Login] Redirecting to returnUrl:', returnUrl);
                    doRedirect(returnUrl);
                } else if (role === UserRole.MANAGER) {
                    console.log('[Login] Redirecting Manager to /manager');
                    doRedirect('/manager');
                } else if (role === UserRole.STAFF) {
                    console.log('[Login] Redirecting Staff to /staff/dashboard');
                    doRedirect('/staff/dashboard');
                } else {
                    console.log('[Login] Redirecting to home');
                    doRedirect('/');
                }
            }, 1000); // 1 second delay to ensure state is stable

            return () => clearTimeout(timeoutId);
        }

        // Return undefined for non-authenticated case
        return undefined;
    }, [isAuthenticated, role, intendedRole, returnUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center mb-8">
                            <Link href="/" className="inline-flex items-center space-x-3 group">
                                <Image src={APP_CONFIG.LOGO} width={48} height={48} alt="Logo PASCS" />
                                <div className="text-left">
                                    <h1 className="text-2xl font-bold text-gray-900">PASCS</h1>
                                    <p className="text-sm text-gray-500">Dịch vụ hành chính công</p>
                                </div>
                            </Link>
                            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                        </div>
                    </div>
                    <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}