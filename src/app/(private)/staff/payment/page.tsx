"use client";

import { StaffDashboardTabsView } from "@modules/staff/dashboard/components/view/StaffDashboardTabsView.view";
import { PaymentQRUpload } from "@/modules/staff/payment/components/PaymentQRUpload";

export default function PaymentQRPage() {
    return (
        <StaffDashboardTabsView>
            <PaymentQRUpload />
        </StaffDashboardTabsView>
    );
}
