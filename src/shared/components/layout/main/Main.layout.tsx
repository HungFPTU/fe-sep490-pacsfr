import { Header } from "./partials/Header.com";
import { Footer } from "./partials/Footer.com";

interface MainLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

export function MainLayout({
    children,
    showHeader = true,
    showFooter = true
}: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {showHeader && <Header />}
            <main className="flex-1">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}