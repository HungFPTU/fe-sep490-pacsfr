import { useState, useCallback, useEffect, useRef } from 'react';
import type { ChatMessage, ChatSession } from '../types';
import { INITIAL_MESSAGE } from '../constants';

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
        viewportRef,
        createSession,
        switchSession,
        deleteSession,
        addMessage,
        updateLastMessage,
        updateSessionTitle,
    };
};

