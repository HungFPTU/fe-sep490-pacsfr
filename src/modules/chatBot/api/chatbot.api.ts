import type { SendMessageRequest, ChatResponse, StreamChatResponse } from '../types';

export const chatbotApi = {
    /**
     * Send a message to the chatbot API and get streaming response
     */
    sendMessageStream: async (
        data: SendMessageRequest,
        signal?: AbortSignal
    ): Promise<StreamChatResponse> => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal,
        });

        if (!response.ok) {
            throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error('No response body from chat API');
        }

        return response.body;
    },

    /**
     * Send a message to the chatbot API and get complete response
     */
    sendMessage: async (
        data: SendMessageRequest,
        signal?: AbortSignal
    ): Promise<ChatResponse> => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal,
        });

        if (!response.ok) {
            throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
        }

        const content = await response.text();
        const model = response.headers.get('x-gemini-model') || undefined;
        const apiVersion = response.headers.get('x-gemini-api-version') || undefined;

        return {
            content,
            model,
            apiVersion,
        };
    },

    /**
     * Health check for chat API
     */
    healthCheck: async (): Promise<boolean> => {
        try {
            const response = await fetch('/api/chat', {
                method: 'GET',
            });
            return response.ok;
        } catch {
            return false;
        }
    },
};

