"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/shared/components/layout/manager/ui/sidebar';
import { BaseModal } from '@/shared/components/manager/features/modal';
import { getConversations, removeConversation, removeConversationId, parseConversationTitle, formatChatDate } from '../../../utils';
import type { ConversationItem } from '../../../types';

interface ChatbotSidebarProps {
    onNewChat: () => void;
    onSelectConversation: (conversationId: string) => void;
    selectedConversationId?: string | null;
}

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MessageIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MoreIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
);

export const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({
    onNewChat,
    onSelectConversation,
    selectedConversationId
}) => {
    const [conversations, setConversations] = useState<ConversationItem[]>([]);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const loadConversations = () => {
            const loaded = getConversations();
            setConversations(loaded);
        };

        loadConversations();

        const handleStorageChange = () => {
            loadConversations();
        };

        const handleConversationSaved = () => {
            loadConversations();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('conversationSaved', handleConversationSaved);

        const interval = setInterval(loadConversations, 500);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('conversationSaved', handleConversationSaved);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId && menuRefs.current[openMenuId]) {
                if (!menuRefs.current[openMenuId]?.contains(event.target as Node)) {
                    setOpenMenuId(null);
                }
            }
        };

        if (openMenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    const handleMenuClick = (e: React.MouseEvent, conversationId: string) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === conversationId ? null : conversationId);
    };

    const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
        e.stopPropagation();
        setOpenMenuId(null);
        setDeleteConfirmId(conversationId);
    };

    const handleConfirmDelete = () => {
        if (deleteConfirmId) {
            removeConversation(deleteConfirmId);

            if (selectedConversationId === deleteConfirmId) {
                removeConversationId();
                if (onNewChat) {
                    onNewChat();
                }
            }

            setDeleteConfirmId(null);
            const loaded = getConversations();
            setConversations(loaded);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmId(null);
    };

    return (
        <Sidebar className="bg-yellow-50/80 backdrop-blur-xl border-red-200/60">
            <SidebarHeader className="p-4 bg-white/50 backdrop-blur-sm border-b border-red-200/60">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-md text-white cursor-pointer hover:opacity-80 transition-opacity">
                            <MessageIcon />
                        </div>
                    </Link>
                    <h2 className="text-lg font-bold text-red-800">PASCS Chat</h2>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3">
                <div className="mb-3">
                    <button
                        onClick={onNewChat}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 font-semibold text-sm shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <PlusIcon />
                        <span>Cuộc trò chuyện mới</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                    {conversations.length === 0 ? (
                        <div className="text-center py-12 px-4 h-full flex flex-col justify-center items-center bg-gradient-to-br from-yellow-100/60 to-yellow-50/40 rounded-2xl border-2 border-dashed border-yellow-300/60 shadow-inner">
                            <div className="w-20 h-20 mb-5 rounded-2xl bg-gradient-to-br from-yellow-200 to-yellow-100 flex items-center justify-center text-yellow-700 shadow-md">
                                <MessageIcon />
                            </div>
                            <p className="text-yellow-900/90 text-sm font-semibold mb-1.5">Lịch sử trò chuyện</p>
                            <p className="text-yellow-800/70 text-xs leading-relaxed max-w-[180px]">
                                Các cuộc hội thoại của bạn sẽ được hiển thị ở đây.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.conversationId}
                                    className={`relative rounded-xl transition-all duration-200 group ${selectedConversationId === conversation.conversationId
                                        ? 'bg-gradient-to-r from-red-100 to-red-50 shadow-md shadow-red-500/10 border border-red-200/50'
                                        : 'bg-white/60 hover:bg-yellow-50/80 hover:shadow-md border border-transparent hover:border-yellow-200/50'
                                        }`}
                                >
                                    <button
                                        onClick={() => onSelectConversation(conversation.conversationId)}
                                        className="w-full text-left px-3.5 py-3"
                                    >
                                        <div className="flex items-start gap-2.5">
                                            <div className="flex-1 min-w-0">
                                                {(() => {
                                                    const { date, time } = parseConversationTitle(conversation.title);
                                                    return (
                                                        <>
                                                            <p className={`text-sm truncate ${selectedConversationId === conversation.conversationId ? 'font-semibold text-red-900' : 'font-medium text-slate-700'}`}>
                                                                {date}
                                                            </p>
                                                            {time && (
                                                                <p className={`text-xs ${selectedConversationId === conversation.conversationId ? 'font-semibold text-red-900' : 'font-medium text-slate-700'}`}>Vào lúc :
                                                                    {time}
                                                                </p>
                                                            )}
                                                            <p className={`text-xs ${selectedConversationId === conversation.conversationId ? 'text-red-700/70' : 'text-slate-500'}`}>
                                                                {formatChatDate(new Date(conversation.createdAt))}
                                                            </p>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </button>
                                    <div className="absolute top-2 right-2 z-10" ref={(el) => { menuRefs.current[conversation.conversationId] = el; }}>
                                        <button
                                            onClick={(e) => handleMenuClick(e, conversation.conversationId)}
                                            className={`p-1.5 rounded-lg hover:bg-red-100/50 text-slate-600 hover:text-red-700 transition-all ${openMenuId === conversation.conversationId || selectedConversationId === conversation.conversationId
                                                ? 'opacity-100'
                                                : 'opacity-0 group-hover:opacity-100'
                                                }`}
                                        >
                                            <MoreIcon />
                                        </button>
                                        {openMenuId === conversation.conversationId && (
                                            <div className="absolute right-0 top-9 z-[100] w-40 bg-white rounded-lg shadow-xl border border-red-200/50 py-1 overflow-hidden">
                                                <button
                                                    onClick={(e) => handleDeleteClick(e, conversation.conversationId)}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                                                >
                                                    Xóa đoạn chat
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SidebarContent>

            <SidebarFooter className="p-4 bg-white/50 backdrop-blur-sm border-b border-red-200/60">
                <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">P</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">PASCS AI</p>
                        <p className="text-xs text-slate-500">Trợ lý ảo thông minh</p>
                    </div>
                </div>
            </SidebarFooter>

            <BaseModal
                open={!!deleteConfirmId}
                onClose={handleCancelDelete}
                title="Xác nhận xóa"
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Có"
                cancelText="Không"
                size="small"
                centered
            >
                <p className="text-slate-700">Bạn có chắc chắn muốn xóa đoạn chat này?</p>
            </BaseModal>
        </Sidebar>
    );
};

