# Chatbot Module

## Overview

Module quản lý chatbot AI của hệ thống PASCS. Sử dụng Google Gemini API để cung cấp trải nghiệm trò chuyện thông minh với người dùng.

## Architecture

Module này tuân theo cấu trúc chuẩn của PASCS, với các layer rõ ràng:

```
modules/chatbot/
├── api/                    # Raw HTTP calls to chat API
├── services/               # Business logic layer
├── hooks/                  # React Query + Custom hooks
├── types/                  # TypeScript definitions
├── constants/              # Configuration constants
├── enums/                  # Enumerations
├── components/             # UI Components
│   ├── view/              # Main page component
│   └── ui/                # Sub-components
│       ├── message/       # Message bubble
│       ├── input/         # Chat input
│       ├── header/        # Chat header
│       ├── sidebar/       # Sidebar
│       ├── background/    # Background
│       └── footer/        # Footer hints
├── utils/                  # Utility functions
└── index.ts               # Module exports
```

## Features

- ✅ Real-time streaming responses from Gemini AI
- ✅ Multi-session chat management
- ✅ Message history
- ✅ Abort/Cancel ongoing requests
- ✅ Auto-scroll to latest message
- ✅ Responsive design
- ✅ Vietnamese UI
- ✅ Markdown support in messages
- ✅ Type-safe implementation

## Usage

### Basic Usage

```tsx
import { ChatBotPage } from '@/modules/chatbot';

export default function Page() {
    return <ChatBotPage />;
}
```

### Using Hooks

```tsx
import { useSendMessageStream, useChatSession } from '@/modules/chatbot';

function CustomChatComponent() {
    const { currentMessages, addMessage } = useChatSession();
    const { sendMessage, isStreaming } = useSendMessageStream();
    
    const handleSend = async (prompt: string) => {
        await sendMessage(
            currentMessages,
            prompt,
            (chunk) => {
                // Handle streaming chunk
                console.log(chunk);
            }
        );
    };
    
    return (
        // Your custom UI
    );
}
```

### Using Service Layer

```tsx
import { chatbotService } from '@/modules/chatbot';

// Send message with streaming
const stream = await chatbotService.sendMessageStream(history, prompt);

// Send message without streaming
const response = await chatbotService.sendMessage(history, prompt);

// Generate session title
const title = chatbotService.generateSessionTitle('First message');
```

## Components

### Main Page

**`ChatBotPage`** - Main chatbot page component

```tsx
<ChatBotPage />
```

### UI Components

**`ChatMessageBubble`** - Display individual message

```tsx
<ChatMessageBubble message={{ role: 'user', content: 'Hello' }} />
```

**`ChatInput`** - Input field with send/stop buttons

```tsx
<ChatInput
    value={input}
    onChange={setInput}
    onSubmit={handleSubmit}
    loading={isLoading}
    onStop={handleStop}
/>
```

**`ChatHeader`** - Header with sidebar trigger

```tsx
<ChatHeader title="PASCS Chatbot" />
```

**`ChatbotSidebar`** - Sidebar with chat history

```tsx
<ChatbotSidebar onNewChat={handleNewChat} />
```

**`ChatBackground`** - Background image component

```tsx
<ChatBackground imageSrc="/path/to/image.jpg" />
```

**`ChatFooter`** - Footer with hints

```tsx
<ChatFooter hints={['Hint 1', 'Hint 2']} />
```

## Hooks

### `useSendMessageStream`

Send messages with streaming response.

```tsx
const { sendMessage, isStreaming, error } = useSendMessageStream();

await sendMessage(
    history,
    prompt,
    (chunk) => {
        // Handle each chunk
    },
    abortSignal
);
```

### `useChatSession`

Manage chat sessions and messages.

```tsx
const {
    sessions,
    currentMessages,
    currentSessionId,
    viewportRef,
    createSession,
    addMessage,
    updateLastMessage,
} = useChatSession();
```

### `useChatForm`

Handle chat input form.

```tsx
const {
    input,
    inputRef,
    isValid,
    handleInputChange,
    handleSubmit,
    clear,
} = useChatForm({
    onSubmit: handleSubmit,
    disabled: isLoading,
});
```

## Types

### `ChatMessage`

```typescript
type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};
```

### `ChatSession`

```typescript
type ChatSession = {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
};
```

### `SendMessageRequest`

```typescript
type SendMessageRequest = {
    history: ChatMessage[];
    prompt: string;
};
```

## Configuration

### Constants

```typescript
// constants/index.ts
export const CHAT_CONFIG = {
    MAX_HISTORY_LENGTH: 100,
    MAX_MESSAGE_LENGTH: 5000,
    TYPING_INDICATOR_DELAY: 300,
    AUTO_SCROLL_DELAY: 100,
};
```

### Query Keys

```typescript
export const QUERY_KEYS = {
    CHATBOT_BASE: ['chatbot'],
    CHAT_SESSIONS: ['chatbot', 'sessions'],
    CHAT_MESSAGES: (sessionId: string) => ['chatbot', 'messages', sessionId],
};
```

## API Integration

Module kết nối với `/api/chat` endpoint:

```typescript
// API Layer
POST /api/chat
{
    history: ChatMessage[],
    prompt: string
}

Response: Stream or complete text
```

## Error Handling

```typescript
try {
    await sendMessage(history, prompt, onChunk, signal);
} catch (error) {
    if (error.name === 'AbortError') {
        // Request was cancelled
    } else {
        // Other errors
    }
}
```

## Best Practices

1. **Always use hooks for state management**
   - `useChatSession` for message management
   - `useSendMessageStream` for sending messages
   - `useChatForm` for input handling

2. **Handle abort signals properly**
   - Create AbortController for each request
   - Cancel on component unmount
   - Cancel when starting new session

3. **Limit history length**
   - Service automatically limits to `MAX_HISTORY_LENGTH`
   - Prevents API payload from being too large

4. **Validate user input**
   - Check for empty messages
   - Enforce maximum message length
   - Sanitize input before sending

5. **Provide visual feedback**
   - Show loading states
   - Display typing indicators
   - Auto-scroll to latest message

## Future Enhancements

- [ ] Persist chat history to database
- [ ] Support for file attachments
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Custom AI model selection
- [ ] Export chat history
- [ ] Search within conversations
- [ ] Favorite/pin messages

## Related Modules

- `@/shared/components/layout/manager` - Sidebar components
- `@/types/rest` - REST API types
- `@core/patterns/SingletonHook` - Toast notifications

## License

Internal use only - PASCS Project

