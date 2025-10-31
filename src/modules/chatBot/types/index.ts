// Main ChatMessage entity type
export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

// ChatSession type for managing conversations
export type ChatSession = {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
};

// Request types
export type SendMessageRequest = {
    history: ChatMessage[];
    prompt: string;
};

export type CreateSessionRequest = {
    title?: string;
};

// Response types
export type ChatResponse = {
    content: string;
    model?: string;
    apiVersion?: string;
};

export type StreamChatResponse = ReadableStream<Uint8Array>;

// Filter types
export type ChatFilters = {
    sessionId?: string;
    keyword?: string;
};

