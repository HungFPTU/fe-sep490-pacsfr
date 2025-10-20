'use client'

import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('@/modules/manager/dashboard/components/dashboard/page'), { ssr: false });

export default function Page() {
  return <DashboardPage />;
}