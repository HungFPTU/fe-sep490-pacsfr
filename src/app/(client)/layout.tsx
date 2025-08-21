import { MainLayout } from "@/shared/components/layout/main/Main.layout";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
