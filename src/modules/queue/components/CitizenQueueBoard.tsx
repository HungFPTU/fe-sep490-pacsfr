"use client";

import React from "react";
import type { Counter } from "@modules/queue/types";
import { queueService } from "@modules/queue/services/queue.service";
import { Container } from "@shared/components/layout/Container";
import Image, { StaticImageData } from "next/image";
import staffFallback from "@/assets/kaka.jpg";

function Avatar({ src, alt }: { src?: string | null; alt: string }) {
    const [error, setError] = React.useState(false);
    const finalSrc: string | StaticImageData = !src || error ? staffFallback : src;
    return (
        <Image
            src={finalSrc}
            alt={alt}
            fill
            className="rounded-full object-cover"
            onError={() => setError(true)}
        />
    );
}

function usePolling<T>(fetcher: () => Promise<T>, intervalMs: number) {
    const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        let mounted = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timer: any;
        const run = async () => {
            try {
                const res = await fetcher();
                if (mounted) setData(res);
                setError(null);
            } catch (e) {
                if (mounted) setError((e as Error).message);
            } finally {
                if (mounted) timer = setTimeout(run, intervalMs);
            }
        };
        run();
        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        };
    }, [fetcher, intervalMs]);
    return { data, error } as const;
}

function CounterCard({ counter }: { counter: Counter }) {
    const minutes = queueService.getElapsedMinutes(counter.startedServingAt);
    const isClosed = !!counter.isClosed;
    const isServing = counter.current?.status === "serving" && !isClosed;
    // const isWaiting = !isClosed && counter.current?.status === "waiting";
    return (
        <div className="h-full rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md text-center">
            <div className="relative mx-auto mb-4 w-1/3 aspect-square min-w-24">
                <Avatar src={counter.staffAvatarUrl} alt={counter.staffName || "staff"} />
            </div>
            <div className="text-base font-semibold mb-1">{counter.name}</div>
            <div className="text-xs opacity-60 mb-3">{counter.serviceTypes.join(", ")}</div>
            <div className={isClosed ? "inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-3 py-1 text-sm mb-2" : isServing ? "inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm mb-2" : "inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-sm mb-2"}>
                <span className={isClosed ? "inline-block h-2 w-2 rounded-full bg-red-500" : isServing ? "inline-block h-2 w-2 rounded-full bg-green-500" : "inline-block h-2 w-2 rounded-full bg-slate-500"} />
                <span>{isClosed ? "Đang đóng" : isServing ? "Đang phục vụ" : "Đang chờ"}</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight mb-2">{counter.current?.number ?? (isClosed ? "--" : "--")}</div>
            {counter.staffName && !isClosed && (
                <div className="text-xs opacity-70 mb-2">Nhân viên: <strong>{counter.staffName}</strong></div>
            )}
            {isServing && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-sm">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                    <span>Thời gian đang phục vụ: <strong>{minutes} phút</strong></span>
                </div>
            )}
        </div>
    );
}

export function CitizenQueueBoard() {
    const { data: overview } = usePolling(queueService.getOverview, 5000);

    return (
        <Container className="py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Bảng hàng đợi</h1>
                <p className="text-sm opacity-70">Trạng thái các quầy theo thời gian thực</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {overview?.counters.map((c) => (
                    <CounterCard key={c.id} counter={c} />
                ))}
            </div>
        </Container>
    );
}


