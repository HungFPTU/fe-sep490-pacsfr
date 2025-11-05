export const QUERY_KEYS = {
    CHATBOT_BASE: ['chatbot'] as const,
    CHAT_SESSIONS: ['chatbot', 'sessions'] as const,
    CHAT_MESSAGES: (sessionId: string) => ['chatbot', 'messages', sessionId] as const,
    CHAT_HISTORY: ['chatbot', 'history'] as const,
};

export const CACHE_TIME = 10 * 60 * 1000; // 10 minutes
export const STALE_TIME = 5 * 60 * 1000; // 5 minutes

// Chat configuration
export const INITIAL_MESSAGE = "Chào bạn! Mình là chatbot AI của PASCS. Hãy hỏi mình bất kỳ điều gì 👋";

export const CHAT_CONFIG = {
    MAX_HISTORY_LENGTH: 100,
    MAX_MESSAGE_LENGTH: 5000,
    TYPING_INDICATOR_DELAY: 300, // ms
    AUTO_SCROLL_DELAY: 100, // ms
} as const;

