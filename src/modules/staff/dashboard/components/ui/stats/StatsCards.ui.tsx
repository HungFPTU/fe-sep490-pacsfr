"use client";

import React from "react";
import type { DashboardStats, QueueStatus } from "../../../types";

interface StatsCardsProps {
    stats: DashboardStats | null;
    queueStatus: QueueStatus | null;
}

export function StatsCards({ stats, queueStatus }: StatsCardsProps) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>;
}

