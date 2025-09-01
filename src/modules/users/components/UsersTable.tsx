"use client";

import React from "react";
import type { PaginatedResponse, UserSummary, UsersQuery } from "@modules/users/types";
import { usersService } from "@modules/users/services/users.service";
import { Container } from "@shared/components/layout/Container";
import { Button } from "@shared/components/ui/button.ui";
import { cn, debounce, formatDate } from "@shared/lib/utils";

type TableState = {
    data: PaginatedResponse<UserSummary> | null;
    query: Required<Pick<UsersQuery, "page" | "pageSize">> & Omit<UsersQuery, "page" | "pageSize">;
    loading: boolean;
};

const initialQuery: Required<Pick<UsersQuery, "page" | "pageSize">> & Omit<UsersQuery, "page" | "pageSize"> = {
    page: 1,
    pageSize: 10,
    search: "",
    role: "all",
    status: "all",
};

export function UsersTable() {
    const [state, setState] = React.useState<TableState>({ data: null, query: initialQuery, loading: false });

    const fetchData = React.useCallback(async (q: UsersQuery) => {
        setState((s) => ({ ...s, loading: true }));
        try {
            const data = await usersService.searchUsers(q);
            setState((s) => ({ ...s, data }));
        } finally {
            setState((s) => ({ ...s, loading: false }));
        }
    }, []);

    React.useEffect(() => {
        fetchData(state.query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const debouncedSearch = React.useMemo(
        () =>
            debounce((...args: unknown[]) => {
                const value = String(args[0]);
                const q = { ...state.query, page: 1, search: value };
                setState((s) => ({ ...s, query: q }));
                fetchData(q);
            }, 400),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.query]
    );

    const onChangePage = (page: number) => {
        const q = { ...state.query, page };
        setState((s) => ({ ...s, query: q }));
        fetchData(q);
    };

    const onChangeFilter = (key: "role" | "status", value: string) => {
        const q = { ...state.query, page: 1, [key]: value } as TableState["query"];
        setState((s) => ({ ...s, query: q }));
        fetchData(q);
    };

    const totalPages = state.data ? Math.max(1, Math.ceil(state.data.total / state.query.pageSize)) : 1;

    return (
        <Container className="py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
                <p className="text-sm opacity-70">Trang quản trị người dùng hệ thống</p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between mb-4">
                    <div className="relative w-full md:max-w-sm group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email..."
                            defaultValue={state.query.search}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none transition-all duration-300 group-hover:shadow focus:shadow focus:border-blue-400"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={state.query.role}
                            onChange={(e) => onChangeFilter("role", e.target.value)}
                            className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:shadow transition-all"
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="admin">Quản trị</option>
                            <option value="staff">Nhân viên</option>
                            <option value="citizen">Công dân</option>
                        </select>
                        <select
                            value={state.query.status}
                            onChange={(e) => onChangeFilter("status", e.target.value)}
                            className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:shadow transition-all"
                        >
                            <option value="all">Trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Ngưng</option>
                            <option value="locked">Khóa</option>
                        </select>
                        <Button className="group">
                            <span>Tạo người dùng</span>
                            <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600">
                                <th className="px-4 py-3 text-left font-medium">Người dùng</th>
                                <th className="px-4 py-3 text-left font-medium">Vai trò</th>
                                <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                                <th className="px-4 py-3 text-left font-medium">Ngày tạo</th>
                                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.loading && (!state.data || state.data.items.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">Đang tải...</td>
                                </tr>
                            )}
                            {state.data && state.data.items.length === 0 && !state.loading && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">Không có dữ liệu</td>
                                </tr>
                            )}
                            {state.data?.items.map((u) => (
                                <tr key={u.id} className={cn(
                                    "group/row border-t border-black/5 transition-colors",
                                    "hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-purple-50/60"
                                )}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold shadow-sm group-hover/row:shadow transition-all">
                                                {u.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{u.fullName}</div>
                                                <div className="text-xs text-slate-500">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn(
                                            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                                            u.role === "admin" && "bg-purple-100 text-purple-700",
                                            u.role === "staff" && "bg-blue-100 text-blue-700",
                                            u.role === "citizen" && "bg-slate-100 text-slate-700"
                                        )}>
                                            <span className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                u.role === "admin" && "bg-purple-600",
                                                u.role === "staff" && "bg-blue-600",
                                                u.role === "citizen" && "bg-slate-600"
                                            )} />
                                            {u.role === "admin" ? "Quản trị" : u.role === "staff" ? "Nhân viên" : "Công dân"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn(
                                            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                                            u.status === "active" && "bg-green-100 text-green-700",
                                            u.status === "inactive" && "bg-yellow-100 text-yellow-700",
                                            u.status === "locked" && "bg-red-100 text-red-700"
                                        )}>
                                            <span className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                u.status === "active" && "bg-green-600",
                                                u.status === "inactive" && "bg-yellow-600",
                                                u.status === "locked" && "bg-red-600"
                                            )} />
                                            {u.status === "active" ? "Hoạt động" : u.status === "inactive" ? "Ngưng" : "Khóa"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{formatDate(u.createdAt)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                                                Sửa
                                            </Button>
                                            <Button variant="ghost" size="sm" className="hover:bg-red-50">
                                                Xóa
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-slate-600">
                        Trang {state.query.page} / {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={state.query.page <= 1}
                            onClick={() => onChangePage(state.query.page - 1)}
                            className="group"
                        >
                            <svg className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            Trước
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={state.query.page >= totalPages}
                            onClick={() => onChangePage(state.query.page + 1)}
                            className="group"
                        >
                            Sau
                            <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}


