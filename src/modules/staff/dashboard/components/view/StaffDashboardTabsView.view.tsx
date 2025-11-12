'use client';

import React from 'react';

interface StaffDashboardTabsViewProps {
  children: React.ReactNode;
}

export const StaffDashboardTabsView: React.FC<StaffDashboardTabsViewProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

