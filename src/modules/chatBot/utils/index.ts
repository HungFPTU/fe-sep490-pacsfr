/**
 * Utility functions for chatbot module
 */
import type { ConversationItem } from '../types';

/**
 * Format date to readable string
 */
export const formatChatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ngày trước`;
    }
    if (hours > 0) {
        return `${hours} giờ trước`;
    }
    if (minutes > 0) {
        return `${minutes} phút trước`;
    }
    return 'Vừa xong';
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
    return input.trim().replace(/\s+/g, ' ');
};

/**
 * Check if message is empty
 */
export const isEmptyMessage = (content: string): boolean => {
    return !content || content.trim().length === 0;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const CONVERSATION_ID_STORAGE_KEY = 'chatbot_conversation_id';

/**
 * Save conversationId to localStorage
 */
export const saveConversationId = (conversationId: string): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, conversationId);
        }
    } catch (error) {
        console.error('Failed to save conversationId to localStorage:', error);
    }
};

/**
 * Get conversationId from localStorage
 */
export const getConversationId = (): string | null => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(CONVERSATION_ID_STORAGE_KEY);
        }
    } catch (error) {
        console.error('Failed to get conversationId from localStorage:', error);
    }
    return null;
};

/**
 * Remove conversationId from localStorage
 */
export const removeConversationId = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CONVERSATION_ID_STORAGE_KEY);
        }
    } catch (error) {
        console.error('Failed to remove conversationId from localStorage:', error);
    }
};

const CONVERSATIONS_STORAGE_KEY = 'chatbot_conversations';

/**
 * Save conversation item to conversations list in localStorage
 */
export const saveConversation = (conversation: ConversationItem): void => {
    try {
        if (typeof window !== 'undefined') {
            const conversations = getConversations();
            const existingIndex = conversations.findIndex(
                (c) => c.conversationId === conversation.conversationId
            );
            
            if (existingIndex >= 0) {
                conversations[existingIndex] = conversation;
            } else {
                conversations.unshift(conversation);
            }
            
            const sorted = conversations.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            
            localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(sorted));
            
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('conversationSaved', { 
                    detail: { conversation } 
                }));
            }
        }
    } catch (error) {
        console.error('Failed to save conversation to localStorage:', error);
    }
};

/**
 * Get all conversations from localStorage
 */
export const getConversations = (): ConversationItem[] => {
    try {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        }
    } catch (error) {
        console.error('Failed to get conversations from localStorage:', error);
    }
    return [];
};

/**
 * Remove conversation from conversations list
 */
export const removeConversation = (conversationId: string): void => {
    try {
        if (typeof window !== 'undefined') {
            const conversations = getConversations();
            const filtered = conversations.filter((c) => c.conversationId !== conversationId);
            localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(filtered));
        }
    } catch (error) {
        console.error('Failed to remove conversation from localStorage:', error);
    }
};

/**
 * Clear all conversations from localStorage
 */
export const clearConversations = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CONVERSATIONS_STORAGE_KEY);
        }
    } catch (error) {
        console.error('Failed to clear conversations from localStorage:', error);
    }
};

/**
 * Parse title to extract date and time
 * Example: "Cuộc hội thoại 02/11/2025 08:01" -> { date: "02/11/2025", time: "08:01" }
 */
export const parseConversationTitle = (title: string): { date: string; time: string } => {
    const match = title.match(/(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2})/);
    if (match) {
        return {
            date: match[1],
            time: match[2],
        };
    }
    
    return {
        date: title,
        time: '',
    };
};

