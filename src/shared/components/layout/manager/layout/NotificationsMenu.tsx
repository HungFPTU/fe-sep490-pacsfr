'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}

// Mock data - replace with real data from API
const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Nhân viên mới được tạo',
        message: 'Nhân viên Nguyễn Văn A đã được thêm vào hệ thống',
        time: '5 phút trước',
        read: false,
        type: 'success',
    },
    {
        id: '2',
        title: 'Cập nhật dịch vụ',
        message: 'Dịch vụ "Cấp giấy phép kinh doanh" đã được cập nhật',
        time: '1 giờ trước',
        read: false,
        type: 'info',
    },
    {
        id: '3',
        title: 'Phòng ban mới',
        message: 'Phòng ban "Phòng Kế hoạch" đã được tạo',
        time: '2 giờ trước',
        read: true,
        type: 'info',
    },
];

export function NotificationsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const menuRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-600';
            case 'warning':
                return 'bg-yellow-100 text-yellow-600';
            case 'error':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-blue-100 text-blue-600';
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                title="Thông báo"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border border-slate-200 bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 p-4">
                        <h3 className="font-semibold text-slate-900">Thông báo</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                Đánh dấu tất cả đã đọc
                            </button>
                        )}
                    </div>

                    {/* Notifications list */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                <Bell className="mb-2 h-12 w-12" />
                                <p className="text-sm">Không có thông báo mới</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`group relative p-4 transition-colors hover:bg-slate-50 ${!notification.read ? 'bg-blue-50/50' : ''
                                            }`}
                                    >
                                        <div className="flex gap-3">
                                            <div
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getTypeColor(
                                                    notification.type
                                                )}`}
                                            >
                                                <Bell className="h-4 w-4" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-sm font-medium text-slate-900">
                                                        {notification.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeNotification(notification.id)}
                                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-sm text-slate-600">
                                                    {notification.message}
                                                </p>
                                                <div className="mt-2 flex items-center gap-3">
                                                    <span className="text-xs text-slate-400">
                                                        {notification.time}
                                                    </span>
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                                                        >
                                                            <Check className="h-3 w-3" />
                                                            Đánh dấu đã đọc
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {!notification.read && (
                                            <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="border-t border-slate-100 p-2">
                            <button className="w-full rounded-md py-2 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                                Xem tất cả thông báo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

