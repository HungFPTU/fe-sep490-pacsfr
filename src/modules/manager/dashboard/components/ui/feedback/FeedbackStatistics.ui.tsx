'use client';

import React from 'react';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
// import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import type { FeedbackStatistics } from '../../../types';

interface Props {
    data: FeedbackStatistics;
}

export const FeedbackStatisticsSection: React.FC<Props> = ({ data }) => {
    const ratingData = [
        { stars: 5, count: data.rating5Count, color: 'bg-green-500' },
        { stars: 4, count: data.rating4Count, color: 'bg-lime-500' },
        { stars: 3, count: data.rating3Count, color: 'bg-yellow-500' },
        { stars: 2, count: data.rating2Count, color: 'bg-orange-500' },
        { stars: 1, count: data.rating1Count, color: 'bg-red-500' },
    ];

    const maxCount = Math.max(...ratingData.map((r) => r.count), 1);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Thống kê phản hồi khách hàng
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Đánh giá và phản hồi từ người dùng
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-600">
                        {data.totalFeedbacks} phản hồi
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">
                            Đánh giá trung bình
                        </h3>
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="text-5xl font-bold text-amber-600">
                            {data.averageRating.toFixed(1)}
                        </div>
                        <div className="mb-2 flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    className={`h-6 w-6 ${star <= Math.round(data.averageRating)
                                            ? 'text-amber-400'
                                            : 'text-slate-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        {ratingData.map((rating) => (
                            <div key={rating.stars} className="flex items-center gap-3">
                                <div className="flex w-12 items-center gap-0.5">
                                    <span className="text-xs font-medium text-slate-600">
                                        {rating.stars}
                                    </span>
                                    <StarIcon className="h-3 w-3 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full ${rating.color} transition-all duration-500`}
                                            style={{
                                                width: `${(rating.count / maxCount) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="w-12 text-right text-xs font-medium text-slate-600">
                                    {rating.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <h3 className="mb-3 text-sm font-semibold text-slate-700">
                            Trạng thái phản hồi
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-yellow-600">
                                    {data.pendingCount}
                                </div>
                                <div className="text-xs text-slate-600">Chờ duyệt</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-green-600">
                                    {data.approvedCount}
                                </div>
                                <div className="text-xs text-slate-600">Đã duyệt</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-red-600">
                                    {data.canceledCount}
                                </div>
                                <div className="text-xs text-slate-600">Từ chối</div>
                            </div>
                        </div>
                    </div>

                    {data.serviceRatings.length > 0 && (
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h3 className="mb-3 text-sm font-semibold text-slate-700">
                                Top dịch vụ được đánh giá
                            </h3>
                            <div className="space-y-3">
                                {data.serviceRatings.slice(0, 3).map((service, index) => (
                                    <div
                                        key={service.serviceId}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm text-slate-700">
                                                {service.serviceName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <StarIcon className="h-4 w-4 text-amber-400" />
                                            <span className="text-sm font-semibold text-slate-900">
                                                {service.averageRating.toFixed(1)}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                ({service.totalRatings})
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
