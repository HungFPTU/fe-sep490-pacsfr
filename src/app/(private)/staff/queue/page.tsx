"use client";

import React from "react";
import { StaffQueuePanel } from "@modules/queue/components/StaffQueuePanel";

export default function StaffQueuePage() {
    // For now, choose a default counter id. Later this can come from staff profile or URL param.
    const [counterId] = React.useState("1");
    return <StaffQueuePanel counterId={counterId} />;
}


