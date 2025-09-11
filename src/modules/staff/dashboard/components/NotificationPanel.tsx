"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { useStaffDashboardStore } from "../stores/useStaffDashboardStore";
import type { Notification } from "../types";
import { Bell, User, FileText, CheckCircle, AlertTriangle } from "lucide-react";

interface NotificationPanelProps {
    notifications: Notification[];
}

export function NotificationPanel({ notifications }: NotificationPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const { markNotificationAsRead } = useStaffDashboardStore();

    useEffect(() => {
        const unread = notifications.filter(n => !n.isRead).length;
        setUnreadCount(unread);
    }, [notifications]);

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            markNotificationAsRead(notificationId);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const unreadNotifications = notifications.filter(n => !n.isRead);
            for (const notification of unreadNotifications) {
                await markNotificationAsRead(notification.id);
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'new_citizen':
                return <User className="w-5 h-5 text-blue-600" />;
            case 'turn_ready':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'status_update':
                return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'document_uploaded':
                return <FileText className="w-5 h-5 text-purple-600" />;
            default:
                return <Bell className="w-5 h-5 text-gray-600" />;
        }
    };

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Vừa xong';
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} giờ trước`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} ngày trước`;
    };

    return (
        <div className="relative">
            {/* Notification Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                size="sm"
                className="relative"
            >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {/* Notification Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                                Thông báo ({notifications.length})
                            </h3>
                            {unreadCount > 0 && (
                                <Button
                                    onClick={handleMarkAllAsRead}
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                >
                                    Đánh dấu tất cả đã đọc
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">Không có thông báo nào</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 ${
                                            !notification.isRead ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-gray-500">
                                                        {getTimeAgo(notification.timestamp)}
                                                    </span>
                                                    {!notification.isRead && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(notification.id)}
                                                            className="text-xs text-blue-600 hover:text-blue-700"
                                                        >
                                                            Đánh dấu đã đọc
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-gray-200">
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="ghost"
                            size="sm"
                            className="w-full text-sm"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            )}

            {/* Overlay to close panel when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
