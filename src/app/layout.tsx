import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/shared/providers/AppProviders";
import { GlobalLoadingOverlay } from "@/shared/components/common/GlobalLoadingOverlay";
import { GlobalToast } from "@/shared/components/GlobalToast.com";

export const metadata: Metadata = {
  title: "Cổng Dịch vụ công quốc gia - PASCS",
  description: "Cổng Dịch vụ công quốc gia - PASCS",
};

// Force dynamic rendering for the root layout
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AppProviders>
          <GlobalLoadingOverlay />
          <GlobalToast />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}