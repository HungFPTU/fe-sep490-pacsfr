'use client';

import { useParams } from 'next/navigation';
import { PublicServiceNewsDetailView } from '@/modules/client/public-service-news';

export default function PublicServiceNewsDetailPage() {
    const params = useParams();
    const newsId = params?.id as string;

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="mx-auto max-w-4xl">
                    <PublicServiceNewsDetailView newsId={newsId} />
                </div>
            </main>
        </div>
    );
}

