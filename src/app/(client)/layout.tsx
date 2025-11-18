import { GovernmentFooter, GovernmentHeader } from "@/shared/components/home";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader showBreadcrumb />
            {children}
            <GovernmentFooter />
        </div>
    );
}
