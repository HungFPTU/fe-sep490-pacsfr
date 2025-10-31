"use client";

import React, { useState } from 'react';
import { SidebarProvider } from '@/shared/components/layout/manager/ui/sidebar';
import { useSendMessage } from '../../hooks';
import { useChatSession } from '../../hooks/useChatSession';
import { useChatForm } from '../../hooks/useChatForm';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import {
    ChatMessageBubble,
    ChatInput,
    ChatHeader,
    ChatBackground,
    ChatbotSidebar,
    ChatFooter,
} from '../ui';
import type { ChatMessage } from '../../types';

export const ChatBotPage: React.FC = () => {
    // Chat session management
    const {
        currentMessages,
        conversationId,
        setConversationId,
        viewportRef,
        createSession,
        addMessage,
        updateLastMessage,
    } = useChatSession();

    // Backend API hook
    const { sendMessage, isSending } = useSendMessage();
    const { addToast } = useGlobalToast();

    // Abort controller for cancelling requests
    const [controller, setController] = useState<AbortController | null>(null);

    // Handle message submission
    const handleSubmit = async (prompt: string) => {
        if (isSending) return;

        // Add user message
        const userMessage: ChatMessage = { role: 'user', content: prompt };
        addMessage(userMessage);

        // Add placeholder for assistant response
        const assistantPlaceholder: ChatMessage = { role: 'assistant', content: '' };
        addMessage(assistantPlaceholder);

        // Create abort controller
        const aborter = new AbortController();
        setController(aborter);

        try {
            // Send message to backend API
            // TODO: Get userId from auth store
            const userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // Temporary - replace with real userId
            
            const response = await sendMessage(
                conversationId,
                prompt,
                userId,
                'string',
                aborter.signal
            );

            // Update conversationId if this is first message
            if (!conversationId && response.data.conversationId) {
                setConversationId(response.data.conversationId);
            }

            // Update assistant message with response
            updateLastMessage(response.data.assistantMessage.content);

        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi';
                updateLastMessage(`Lỗi: ${errorMessage}`);
                addToast({ 
                    message: 'Không thể gửi tin nhắn. Vui lòng thử lại.', 
                    type: 'error' 
                });
            }
        } finally {
            setController(null);
        }
    };

    // Form management
    const {
        input,
        inputRef,
        handleInputChange,
        handleSubmit: handleFormSubmit,
    } = useChatForm({
        onSubmit: handleSubmit,
        disabled: isSending,
    });

    // Stop request
    const handleStop = () => {
        controller?.abort();
    };

    // Handle new chat
    const handleNewChat = () => {
        if (controller) {
            controller.abort();
        }
        setConversationId(null); // Reset conversation ID for new chat
        createSession();
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50">
                <ChatbotSidebar onNewChat={handleNewChat} />

                <div className="flex-1 flex flex-col h-screen">
                    <ChatHeader />

                    <div className="relative flex-1 flex flex-col overflow-hidden">
                        <ChatBackground />

                        {/* Messages container with explicit scrollbar - FULL WIDTH */}
                        <div
                            ref={viewportRef}
                            className="relative z-10 flex-1 w-full overflow-y-scroll overflow-x-hidden scrollbar-thin min-h-0 py-4 md:py-6"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#fca5a5 #fef3c7'
                            }}
                        >
                            {/* Content wrapper with max-width */}
                            <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
                                {currentMessages.map((message, index) => (
                                    <ChatMessageBubble
                                        key={`${index}-${message.role}`}
                                        message={message}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Input area */}
                        <div className="relative z-10 w-full flex-shrink-0 py-5">
                            <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
                                <ChatInput
                                    value={input}
                                    onChange={handleInputChange}
                                    onSubmit={handleFormSubmit}
                                    disabled={isSending}
                                    loading={isSending}
                                    onStop={handleStop}
                                    inputRef={inputRef}
                                />
                                <ChatFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

