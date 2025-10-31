import { chatbotApi } from '../api/chatbot.api';
import type { SendMessageRequest, ChatMessage, ChatResponse } from '../types';
import { CHAT_CONFIG } from '../constants';

export const chatbotService = {
    /**
     * Send a message and get streaming response
     */
    async sendMessageStream(
        history: ChatMessage[],
        prompt: string,
        signal?: AbortSignal
    ): Promise<ReadableStream<Uint8Array>> {
        // Validate input
        if (!prompt.trim()) {
            throw new Error('Prompt cannot be empty');
        }

        if (prompt.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
            throw new Error(`Message too long. Maximum ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters`);
        }

        // Limit history length
        const limitedHistory = history.slice(-CHAT_CONFIG.MAX_HISTORY_LENGTH);

        const request: SendMessageRequest = {
            history: limitedHistory,
            prompt: prompt.trim(),
        };

        return await chatbotApi.sendMessageStream(request, signal);
    },

    /**
     * Send a message and get complete response
     */
    async sendMessage(
        history: ChatMessage[],
        prompt: string,
        signal?: AbortSignal
    ): Promise<ChatResponse> {
        // Validate input
        if (!prompt.trim()) {
            throw new Error('Prompt cannot be empty');
        }

        if (prompt.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
            throw new Error(`Message too long. Maximum ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters`);
        }

        // Limit history length
        const limitedHistory = history.slice(-CHAT_CONFIG.MAX_HISTORY_LENGTH);

        const request: SendMessageRequest = {
            history: limitedHistory,
            prompt: prompt.trim(),
        };

        return await chatbotApi.sendMessage(request, signal);
    },

    /**
     * Process streaming response and extract text
     */
    async processStream(
        stream: ReadableStream<Uint8Array>,
        onChunk: (text: string) => void,
        signal?: AbortSignal
    ): Promise<string> {
        const reader = stream.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulated = '';

        try {
            while (true) {
                // Check if aborted
                if (signal?.aborted) {
                    reader.cancel();
                    throw new Error('Request aborted');
                }

                const { value, done } = await reader.read();
                
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                onChunk(chunk);
            }

            return accumulated;
        } catch (error) {
            reader.cancel();
            throw error;
        }
    },

    /**
     * Health check
     */
    async checkHealth(): Promise<boolean> {
        return await chatbotApi.healthCheck();
    },

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
        };
    },
};

