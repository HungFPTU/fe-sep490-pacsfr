"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Card } from "@/shared/components/ui/card.ui";
import { staffDashboardService } from "../services/staff-dashboard.service";
import type { CitizenFeedback } from "../types";
import { Star, MessageSquare, CheckCircle } from "lucide-react";

interface FeedbackFormProps {
    citizenId: string;
    existingFeedback?: CitizenFeedback;
}

export function FeedbackForm({ citizenId, existingFeedback }: FeedbackFormProps) {
    const [rating, setRating] = useState<number>(existingFeedback?.rating || 0);
    const [comment, setComment] = useState<string>(existingFeedback?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert('Vui lòng chọn số sao đánh giá');
            return;
        }

        setIsSubmitting(true);

        try {
            const feedbackData = {
                citizenId,
                rating: rating as 1 | 2 | 3 | 4 | 5,
                comment: comment.trim() || undefined,
                staffId: 'staff_001', // In real app, get from current user context
            };

            // In real app, this would call the API
            await staffDashboardService.submitFeedback(feedbackData);

            setIsSubmitted(true);
            alert('Gửi phản hồi thành công!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Có lỗi xảy ra khi gửi phản hồi');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    if (isSubmitted) {
        return (
            <Card className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Phản hồi đã được gửi thành công!
                </h3>
                <p className="text-gray-600">
                    Cảm ơn bạn đã dành thời gian để đánh giá dịch vụ.
                </p>
            </Card>
        );
    }

    if (existingFeedback) {
        return (
            <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Phản hồi đã có
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Đánh giá
                        </label>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${
                                        star <= existingFeedback.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                                {existingFeedback.rating}/5 sao
                            </span>
                        </div>
                    </div>

                    {existingFeedback.comment && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhận xét
                            </label>
                            <div className="bg-gray-50 rounded-md p-3">
                                <p className="text-sm text-gray-700">
                                    {existingFeedback.comment}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="text-xs text-gray-500">
                        Đã gửi vào: {new Date(existingFeedback.submittedAt).toLocaleString('vi-VN')}
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                    Ghi nhận phản hồi từ công dân
                </h3>
            </div>

            <div className="space-y-6">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Đánh giá chất lượng dịch vụ
                    </label>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Rất tệ</span>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRatingClick(star)}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                >
                                    <Star
                                        className={`w-8 h-8 transition-colors ${
                                            star <= rating
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300 hover:text-yellow-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">Tuyệt vời</span>
                    </div>
                    {rating > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                            Bạn đã chọn: {rating} sao
                        </p>
                    )}
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhận xét (không bắt buộc)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Hãy chia sẻ cảm nhận của công dân về chất lượng dịch vụ..."
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {comment.length}/500 ký tự
                    </p>
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Đang gửi...
                        </>
                    ) : (
                        <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Gửi phản hồi
                        </>
                    )}
                </Button>
            </div>
        </Card>
    );
}
