"use client";

import StaffDashboard from "@/modules/staff/dashboard/components/StaffDashboard";
import React from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function StaffDashboardPage() {
    return <StaffDashboard />;
}
