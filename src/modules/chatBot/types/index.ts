// Main ChatMessage entity type
export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
    id?: string;
    createdAt?: string;
};

// ChatSession type for managing conversations
export type ChatSession = {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
};

// Backend API Request types
export type SendMessageRequest = {
    conversationId?: string;
    message: string;
    userId: string;
    userType: string;
};

export type CreateSessionRequest = {
    title?: string;
};

// Backend API Response types
export type BackendChatMessage = {
    $id: string;
    id: string;
    role: string;
    content: string;
    createdAt: string;
};

export type BackendAssistantMessage = {
    $id: string;
    id: string;
    role: string;
    content: string;
    createdAt: string;
    sourceIds: {
        $id: string;
        $values: unknown[];
    };
};

export type ChatResponseData = {
    $id: string;
    conversationId: string;
    userMessage: BackendChatMessage;
    assistantMessage: BackendAssistantMessage;
    sources: {
        $id: string;
        $values: unknown[];
    };
};

export type ChatResponse = {
    $id: string;
    isSuccess: boolean;
    message: string;
    data: ChatResponseData;
};

export type StreamChatResponse = ReadableStream<Uint8Array>;

// Filter types
export type ChatFilters = {
    sessionId?: string;
    keyword?: string;
};

