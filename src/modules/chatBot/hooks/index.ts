"use client";

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatbotService } from '../services/chatbot.service';
import { QUERY_KEYS } from '../constants';
import type { ChatMessage } from '../types';

// Re-export custom hooks
export { useChatForm } from './useChatForm';
export { useChatSession } from './useChatSession';

/**
 * Hook for health check
 */
export const useChatHealth = () => {
    return useQuery({
        queryKey: QUERY_KEYS.CHATBOT_BASE,
        queryFn: () => chatbotService.checkHealth(),
        staleTime: 60000, // 1 minute
        retry: 3,
    });
};

/**
 * Hook for sending messages with streaming
 */
export const useSendMessageStream = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const queryClient = useQueryClient();

    const sendMessage = useCallback(
        async (
            history: ChatMessage[],
            prompt: string,
            onChunk: (text: string) => void,
            signal?: AbortSignal
        ): Promise<string> => {
            setIsStreaming(true);
            setError(null);

            try {
                const stream = await chatbotService.sendMessageStream(history, prompt, signal);
                const fullResponse = await chatbotService.processStream(stream, onChunk, signal);
                
                // Invalidate chat history
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.CHAT_HISTORY,
                });

                return fullResponse;
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                throw error;
            } finally {
                setIsStreaming(false);
            }
        },
        [queryClient]
    );

    return {
        sendMessage,
        isStreaming,
        error,
    };
};

/**
 * Hook for sending messages (non-streaming)
 */
export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            history,
            prompt,
            signal,
        }: {
            history: ChatMessage[];
            prompt: string;
            signal?: AbortSignal;
        }) => {
            return await chatbotService.sendMessage(history, prompt, signal);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CHAT_HISTORY,
            });
        },
    });
};

/**
 * Hook for generating session title
 */
export const useGenerateTitle = () => {
    return useCallback((firstMessage: string) => {
        return chatbotService.generateSessionTitle(firstMessage);
    }, []);
};

