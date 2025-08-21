import { MainLayout } from "@/shared/components/layout/main/Main.layout";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
