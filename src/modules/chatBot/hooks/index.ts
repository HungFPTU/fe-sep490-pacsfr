"use client";

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { chatbotService } from '../services/chatbot.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { getConversationId } from '../utils';
import type { ChatResponse, ConversationDetail } from '../types';

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

/**
 * Hook for getting conversation by ID
 * Uses conversationId from localStorage if not provided
 */
export const useGetConversation = (conversationId?: string | null) => {
    const storedConversationId = getConversationId();
    const targetConversationId = conversationId ?? storedConversationId;

    return useQuery({
        queryKey: [...QUERY_KEYS.CHATBOT_BASE, 'conversation', targetConversationId],
        queryFn: async () => {
            if (!targetConversationId) {
                throw new Error('Conversation ID is required');
            }
            return await chatbotService.getConversation(targetConversationId);
        },
        enabled: !!targetConversationId,
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

