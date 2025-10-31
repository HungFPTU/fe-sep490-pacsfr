import { chatbotApi } from '../api/chatbot.api';
import type { ChatMessage, ChatResponse } from '../types';
import { CHAT_CONFIG } from '../constants';

export const chatbotService = {
    /**
     * Send a message to backend API
     * @param conversationId - Optional conversation ID (null for new conversation)
     * @param message - User message
     * @param userId - User ID
     * @param userType - User type
     * @param signal - Optional AbortSignal
     */
    async sendMessage(
        conversationId: string | null,
        message: string,
        userId: string,
        userType: string = 'string',
        signal?: AbortSignal
    ): Promise<ChatResponse> {
        // Validate input
        if (!message.trim()) {
            throw new Error('Message cannot be empty');
        }

        if (message.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
            throw new Error(`Message too long. Maximum ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters`);
        }

        const response = await chatbotApi.sendMessage(
            conversationId,
            message.trim(),
            userId,
            userType,
            signal
        );

        return response;
    },

    /**
     * Get conversation by ID
     */
    async getConversation(conversationId: string) {
        return await chatbotApi.getConversation(conversationId);
    },

    /**
     * Get chat history
     */
    // async getHistory() {
    //     return await chatbotApi.getHistory();
    // },

    /**
     * Generate session title from first message
     */
    generateSessionTitle(firstMessage: string): string {
        const maxLength = 50;
        const cleaned = firstMessage.trim();
        
        if (cleaned.length <= maxLength) {
            return cleaned;
        }

        return cleaned.substring(0, maxLength) + '...';
    },

    /**
     * Format message for display
     */
    formatMessage(message: ChatMessage): ChatMessage {
        return {
            role: message.role,
            content: message.content.trim(),
            id: message.id,
            createdAt: message.createdAt,
        };
    },

    /**
     * Convert backend message to ChatMessage
     */
    convertBackendMessage(backendMessage: {
        id: string;
        role: string;
        content: string;
        createdAt: string;
    }): ChatMessage {
        return {
            role: backendMessage.role as 'user' | 'assistant',
            content: backendMessage.content,
            id: backendMessage.id,
            createdAt: backendMessage.createdAt,
        };
    },
};

