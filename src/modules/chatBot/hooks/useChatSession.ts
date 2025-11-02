import { useState, useCallback, useEffect, useRef } from 'react';
import type { ChatMessage, ChatSession } from '../types';
import { INITIAL_MESSAGE } from '../constants';
import { getConversationId, removeConversationId, saveConversationId } from '../utils';
import { chatbotService } from '../services/chatbot.service';

interface UseChatSessionProps {
    initialMessages?: ChatMessage[];
}

export const useChatSession = ({ initialMessages }: UseChatSessionProps = {}) => {
    const [sessions, setSessions] = useState<ChatSession[]>([
        {
            id: '1',
            title: 'Cuộc trò chuyện mới',
            messages: initialMessages || [
                {
                    role: 'assistant',
                    content: INITIAL_MESSAGE,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
    const [currentSessionId, setCurrentSessionId] = useState('1');
    const [conversationId, setConversationId] = useState<string | null>(() => {
        return getConversationId();
    });
    const viewportRef = useRef<HTMLDivElement>(null);

    // Get current session
    const currentSession = sessions.find((s) => s.id === currentSessionId);
    const currentMessages = currentSession?.messages || [];

    // Create new session
    const createSession = useCallback(() => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: 'Cuộc trò chuyện mới',
            messages: [
                {
                    role: 'assistant',
                    content: INITIAL_MESSAGE,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setSessions((prev) => [...prev, newSession]);
        setCurrentSessionId(newSession.id);
        setConversationId(null);
        removeConversationId();

        return newSession;
    }, []);

    // Switch session
    const switchSession = useCallback((sessionId: string) => {
        setCurrentSessionId(sessionId);
    }, []);

    // Delete session
    const deleteSession = useCallback((sessionId: string) => {
        setSessions((prev) => {
            const filtered = prev.filter((s) => s.id !== sessionId);
            
            // If deleting current session, switch to another
            if (currentSessionId === sessionId) {
                const newCurrent = filtered[filtered.length - 1];
                if (newCurrent) {
                    setCurrentSessionId(newCurrent.id);
                } else {
                    // Create new session if no sessions left
                    const newSession: ChatSession = {
                        id: Date.now().toString(),
                        title: 'Cuộc trò chuyện mới',
                        messages: [
                            {
                                role: 'assistant',
                                content: INITIAL_MESSAGE,
                            },
                        ],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    return [newSession];
                }
            }
            
            return filtered.length > 0 ? filtered : prev;
        });
    }, [currentSessionId]);

    // Add message to current session
    const addMessage = useCallback(
        (message: ChatMessage) => {
            setSessions((prev) =>
                prev.map((session) =>
                    session.id === currentSessionId
                        ? {
                              ...session,
                              messages: [...session.messages, message],
                              updatedAt: new Date(),
                          }
                        : session
                )
            );
        },
        [currentSessionId]
    );

    // Update last message in current session
    const updateLastMessage = useCallback(
        (content: string) => {
            setSessions((prev) =>
                prev.map((session) =>
                    session.id === currentSessionId
                        ? {
                              ...session,
                              messages: session.messages.map((msg, idx) =>
                                  idx === session.messages.length - 1
                                      ? { ...msg, content }
                                      : msg
                              ),
                              updatedAt: new Date(),
                          }
                        : session
                )
            );
        },
        [currentSessionId]
    );

    // Update session title
    const updateSessionTitle = useCallback(
        (sessionId: string, title: string) => {
            setSessions((prev) =>
                prev.map((session) =>
                    session.id === sessionId
                        ? { ...session, title, updatedAt: new Date() }
                        : session
                )
            );
        },
        []
    );

    // Load messages from conversation
    const loadMessagesFromConversation = useCallback(
        async (convId: string) => {
            try {
                console.log('Fetching conversation:', convId);
                const conversation = await chatbotService.getConversation(convId);
                console.log('Conversation fetched:', conversation);
                
                if (conversation && conversation.messages?.$values) {
                    const messages: ChatMessage[] = conversation.messages.$values.map((msg) => ({
                        role: msg.role as 'user' | 'assistant',
                        content: msg.content,
                        id: msg.id,
                        createdAt: msg.createdAt,
                    }));

                    const newSession: ChatSession = {
                        id: conversation.id,
                        title: conversation.title,
                        messages: messages.length > 0 ? messages : [
                            {
                                role: 'assistant',
                                content: INITIAL_MESSAGE,
                            },
                        ],
                        createdAt: new Date(conversation.createdAt),
                        updatedAt: new Date(conversation.createdAt),
                    };

                    setSessions((prev) => {
                        const existingIndex = prev.findIndex((s) => s.id === conversation.id);
                        if (existingIndex >= 0) {
                            const updated = [...prev];
                            updated[existingIndex] = newSession;
                            return updated;
                        }
                        return [newSession, ...prev];
                    });

                    setCurrentSessionId(conversation.id);
                    setConversationId(conversation.id);
                    saveConversationId(conversation.id);

                    return newSession;
                }
                return null;
            } catch (error) {
                console.error('Failed to load messages from conversation:', error);
                throw error;
            }
        },
        []
    );

    // Load messages from conversationId on mount if exists
    const isInitialLoadRef = useRef(true);
    useEffect(() => {
        if (!isInitialLoadRef.current) return;
        isInitialLoadRef.current = false;

        const loadInitialConversation = async () => {
            if (conversationId && sessions.length > 0 && sessions[0].id === '1') {
                const existingSession = sessions.find((s) => s.id === conversationId);
                if (!existingSession) {
                    try {
                        console.log('Auto-loading conversation on mount:', conversationId);
                        await loadMessagesFromConversation(conversationId);
                    } catch (error) {
                        console.error('Failed to load initial conversation:', error);
                    }
                } else {
                    setCurrentSessionId(conversationId);
                }
            }
        };

        loadInitialConversation();
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (viewportRef.current) {
            setTimeout(() => {
                viewportRef.current?.scrollTo({
                    top: viewportRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [currentMessages]);

    return {
        sessions,
        currentSession,
        currentSessionId,
        currentMessages,
        conversationId,
        setConversationId,
        viewportRef,
        createSession,
        switchSession,
        deleteSession,
        addMessage,
        updateLastMessage,
        updateSessionTitle,
        loadMessagesFromConversation,
    };
};

