"use client";

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatbotService } from '../services/chatbot.service';
import { QUERY_KEYS } from '../constants';
import type { ChatResponse } from '../types';

// Re-export custom hooks
export { useChatForm } from './useChatForm';
export { useChatSession } from './useChatSession';
export { useChatSubmit } from './useChatSubmit';

/**
 * Hook for sending messages to backend
 */
export const useSendMessage = () => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const queryClient = useQueryClient();

    const sendMessage = useCallback(
        async (
            conversationId: string | null,
            message: string,
            userId: string,
            userType: string = 'string',
            signal?: AbortSignal
        ): Promise<ChatResponse> => {
            setIsSending(true);
            setError(null);

            try {
                const response = await chatbotService.sendMessage(
                    conversationId,
                    message,
                    userId,
                    userType,
                    signal
                );
                
                // Invalidate chat history
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.CHAT_HISTORY,
                });

                return response;
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                throw error;
            } finally {
                setIsSending(false);
            }
        },
        [queryClient]
    );

    return {
        sendMessage,
        isSending,
        error,
    };
};

/**
 * Hook for sending messages (React Query mutation)
 */
export const useSendMessageMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            conversationId,
            message,
            userId,
            userType,
            signal,
        }: {
            conversationId: string | null;
            message: string;
            userId: string;
            userType?: string;
            signal?: AbortSignal;
        }) => {
            return await chatbotService.sendMessage(
                conversationId,
                message,
                userId,
                userType || 'string',
                signal
            );
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

