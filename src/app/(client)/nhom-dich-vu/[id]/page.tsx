'use client';

import { useParams } from 'next/navigation';
import { ServiceGroupDetailView } from '@/modules/client/service';

export default function ServiceGroupDetailPage() {
    const params = useParams();
    const serviceGroupId = params?.id as string;

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceGroupDetailView serviceGroupId={serviceGroupId} />
        </div>
    );
}

