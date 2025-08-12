"use client";

import React, { useState } from "react";
import { Button } from "@shared/components/ui/Button";
import type { LoginPayload } from "@modules/auth/types";
import { authService } from "@modules/auth/services/auth.service";

export function LoginForm() {
    const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const res = await authService.login(form);
            setMessage(`Welcome ${res.user.email}`);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    if (!mounted) {
        return (
            <form className="flex flex-col gap-4 w-full max-w-sm">
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-background"
                        value=""
                        readOnly
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-background"
                        value=""
                        readOnly
                        required
                    />
                </div>
                <Button type="submit" disabled>
                    Sign in
                </Button>
            </form>
        );
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                    type="email"
                    className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-background"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                />
            </div>
            <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                    type="password"
                    className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-background"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    required
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </Button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}
        </form>
    );
} 