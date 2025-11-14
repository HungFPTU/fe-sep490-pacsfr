import { PublicServiceNewsListView } from '@/modules/client/public-service-news';

export default function TinTucPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    <PublicServiceNewsListView />
                </div>
            </main>
        </div>
    );
}
