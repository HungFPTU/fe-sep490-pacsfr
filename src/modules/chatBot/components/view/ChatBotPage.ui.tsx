"use client";

import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/shared/components/layout/manager/ui/sidebar';
import { useChatSession, useChatForm, useChatSubmit } from '../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import {
    ChatMessageBubble,
    ChatInput,
    ChatHeader,
    ChatBackground,
    ChatbotSidebar,
    ChatFooter,
} from '../ui';

export const ChatBotPage: React.FC = () => {
    const {
        currentMessages,
        conversationId,
        setConversationId,
        viewportRef,
        createSession,
        addMessage,
        updateLastMessage,
        loadMessagesFromConversation,
    } = useChatSession();

    const { addToast } = useGlobalToast();

    const { submitMessage, isSending } = useChatSubmit({
        conversationId,
        onConversationIdChange: setConversationId,
        onAddMessage: addMessage,
        onUpdateLastMessage: updateLastMessage,
        onError: (message) => addToast({ message, type: 'error' }),
    });

    const [controller, setController] = useState<AbortController | null>(null);

    const handleSubmit = async (prompt: string) => {
        const aborter = new AbortController();
        setController(aborter);

        const userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        await submitMessage(prompt, userId, aborter.signal);
        
        setController(null);
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

    const handleNewChat = () => {
        if (controller) {
            controller.abort();
        }
        setConversationId(null);
        createSession();
    };

    const handleSelectConversation = async (convId: string) => {
        if (controller) {
            controller.abort();
            setController(null);
        }
        
        try {
            console.log('Loading conversation:', convId);
            await loadMessagesFromConversation(convId);
            console.log('Conversation loaded successfully');
        } catch (error) {
            console.error('Failed to load conversation:', error);
            addToast({ 
                message: 'Không thể tải cuộc trò chuyện. Vui lòng thử lại.', 
                type: 'error' 
            });
        }
    };

    // Auto-load conversation on mount if conversationId exists
    useEffect(() => {
        const loadInitialConversation = async () => {
            if (conversationId) {
                try {
                    console.log('Page mount: Auto-loading conversation:', conversationId);
                    await loadMessagesFromConversation(conversationId);
                } catch (error) {
                    console.error('Failed to load initial conversation:', error);
                }
            }
        };

        loadInitialConversation();
    }, []);

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50">
                <ChatbotSidebar 
                    onNewChat={handleNewChat} 
                    onSelectConversation={handleSelectConversation}
                    selectedConversationId={conversationId}
                />

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

