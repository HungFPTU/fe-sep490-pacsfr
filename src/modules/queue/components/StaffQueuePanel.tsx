"use client";

import React from "react";
import { Button } from "@shared/components/ui/Button";
import { Container } from "@shared/components/layout/Container";
import { queueService } from "@modules/queue/services/queue.service";
import type { StaffQueueState } from "@modules/queue/types";
import Image from "next/image";

export function StaffQueuePanel({ counterId }: { counterId: string }) {
    const [state, setState] = React.useState<StaffQueueState>({ counterId, current: null });
    const [loading, setLoading] = React.useState(false);
    const [waitingStartedAt, setWaitingStartedAt] = React.useState<string | null>(null);

    const refresh = React.useCallback(async () => {
        const s = await queueService.getStaffState(counterId);
        setState(s);
    }, [counterId]);

    React.useEffect(() => {
        refresh();
        const t = setInterval(refresh, 5000);
        return () => clearInterval(t);
    }, [refresh]);

    const act = async (fn: (id: string) => Promise<StaffQueueState>) => {
        setLoading(true);
        try {
            const s = await fn(counterId);
            setState(s);
            if (fn === queueService.callNext) {
                setWaitingStartedAt(new Date().toISOString());
            }
        } finally {
            setLoading(false);
        }
    };

    // auto-skip after 120s if still waiting
    React.useEffect(() => {
        const interval = setInterval(async () => {
            if (state.current?.status === "waiting" && waitingStartedAt) {
                const waited = queueService.getElapsedSeconds(waitingStartedAt);
                if (waited >= 120) {
                    const s = await queueService.skipCurrent(counterId);
                    setState(s);
                    setWaitingStartedAt(null);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [state, waitingStartedAt, counterId]);

    const startServing = () => {
        if (!state.current) return;
        setState({ ...state, current: { ...state.current, status: "serving" } });
        setWaitingStartedAt(null);
    };

    return (
        <Container className="py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Quản lý hàng đợi</h1>
                <p className="text-sm opacity-70">Quầy {counterId}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 opacity-60">
                            <Image src="/file.svg" alt="icon" width={40} height={40} />
                        </div>
                        <div>
                            {state.current ? (
                                state.current.status === "serving" ? (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm mb-2">
                                        <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                                        <span>Trạng thái: Đang phục vụ</span>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-sm mb-2">
                                        <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
                                        <span>Trạng thái: Đang chờ số</span>
                                    </div>
                                )
                            ) : (
                                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-sm mb-2">
                                    <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
                                    <span>Chưa có số</span>
                                </div>
                            )}
                            <div className="text-xs opacity-60">Số hiện tại</div>
                            <div className="text-6xl font-extrabold tracking-tight">
                                {state.current?.number ?? "--"}
                            </div>
                            {state.current?.status === "waiting" && waitingStartedAt && (
                                <div className="mt-2 text-sm opacity-70">Thời gian chờ: <strong>{Math.floor(queueService.getElapsedSeconds(waitingStartedAt))}s</strong></div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {state.current?.status === "waiting" && (
                            <Button disabled={loading} onClick={startServing} variant="primary">Bắt đầu phục vụ</Button>
                        )}
                        {state.current?.status === "serving" && (
                            <Button disabled={loading} onClick={() => act(queueService.completeCurrent)} variant="secondary">Hoàn tất</Button>
                        )}
                        {!state.current && (
                            <Button disabled={loading} onClick={() => act(queueService.callNext)}>Gọi số tiếp theo</Button>
                        )}
                        {state.current && state.current.status !== "serving" && (
                            <Button disabled={loading} onClick={() => act(queueService.skipCurrent)} variant="secondary">Bỏ qua</Button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}


