import { GovernmentFooter } from "@/shared/components/home/GovernmentFooter.com";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {children}
            <GovernmentFooter />
        </div>
    );
}
