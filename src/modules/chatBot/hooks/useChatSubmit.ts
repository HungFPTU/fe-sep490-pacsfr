"use client";

import { useCallback } from 'react';
import { useSendMessage } from './index';
import { saveConversationId, saveConversation } from '../utils';
import type { ChatMessage, ChatResponse } from '../types';

interface UseChatSubmitProps {
    conversationId: string | null;
    onConversationIdChange: (id: string) => void;
    onAddMessage: (message: ChatMessage) => void;
    onUpdateLastMessage: (content: string) => void;
    onError: (message: string) => void;
}

export const useChatSubmit = ({
    conversationId,
    onConversationIdChange,
    onAddMessage,
    onUpdateLastMessage,
    onError,
}: UseChatSubmitProps) => {
    const { sendMessage, isSending } = useSendMessage();
    
    const fetchAndSaveConversation = useCallback(async (convId: string, fallbackTitle?: string) => {
        try {
            const { chatbotService } = await import('../services/chatbot.service');
            const conversation = await chatbotService.getConversation(convId);
            
            if (conversation) {
                saveConversation({
                    conversationId: conversation.id,
                    title: conversation.title,
                    createdAt: conversation.createdAt,
                });
            }
        } catch (error) {
            console.error('Failed to fetch conversation details:', error);
            
            if (fallbackTitle || convId) {
                saveConversation({
                    conversationId: convId,
                    title: fallbackTitle || 'Cuộc trò chuyện mới',
                    createdAt: new Date().toISOString(),
                });
            }
        }
    }, []);

    const submitMessage = useCallback(
        async (prompt: string, userId: string, signal?: AbortSignal): Promise<ChatResponse | null> => {
            if (isSending) return null;

            const userMessage: ChatMessage = { role: 'user', content: prompt };
            onAddMessage(userMessage);

            const assistantPlaceholder: ChatMessage = { role: 'assistant', content: '' };
            onAddMessage(assistantPlaceholder);

            try {
                const response = await sendMessage(
                    conversationId,
                    prompt,
                    userId,
                    'string',
                    signal
                );

                if (!conversationId && response.conversationId) {
                    onConversationIdChange(response.conversationId);
                    saveConversationId(response.conversationId);
                    fetchAndSaveConversation(response.conversationId, prompt.substring(0, 50));
                } else if (response.conversationId) {
                    saveConversationId(response.conversationId);
                    if (conversationId !== response.conversationId) {
                        fetchAndSaveConversation(response.conversationId, prompt.substring(0, 50));
                    }
                }

                const content = response.assistantMessage?.content || 'Không có phản hồi';
                onUpdateLastMessage(content);

                return response;
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi';
                    onUpdateLastMessage(`Lỗi: ${errorMessage}`);
                    onError('Không thể gửi tin nhắn. Vui lòng thử lại.');
                }
                return null;
            }
        },
        [conversationId, isSending, sendMessage, onConversationIdChange, onAddMessage, onUpdateLastMessage, onError, fetchAndSaveConversation]
    );

    return {
        submitMessage,
        isSending,
    };
};

