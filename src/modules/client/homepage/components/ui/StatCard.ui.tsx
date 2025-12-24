'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  colorClass?: string;
}

/**
 * Statistics Card UI Component
 * Simple card for displaying a single statistic
 */
export function StatCard({ label, value, subLabel, colorClass = 'text-red-600' }: StatCardProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString('vi-VN') 
    : value;

  return (
    <div className="text-center p-4">
      <div className={`text-2xl font-bold ${colorClass}`}>{formattedValue}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
      {subLabel && (
        <div className="text-gray-500 text-xs mt-1">{subLabel}</div>
      )}
    </div>
  );
}
