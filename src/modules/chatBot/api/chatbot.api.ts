import { httpNoLoading } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { SendMessageRequest, ChatResponse, ConversationDetail } from '../types';

export const chatbotApi = {
    /**
     * Send a message to the chatbot backend API
     * @param conversationId - Optional conversation ID (null for new conversation)
     * @param message - User message content
     * @param userId - User ID
     * @param userType - User type (e.g., "string")
     * @param signal - Optional AbortSignal for cancellation
     * @returns ChatResponse with conversationId and messages
     */
    sendMessage: async (
        conversationId: string | null,
        message: string,
        userId: string,
        userType: string,
        signal?: AbortSignal
    ): Promise<ChatResponse> => {
        const requestData: SendMessageRequest = {
            conversationId: conversationId || undefined,
            message: message.trim(),
            userId,
            userType,
        };

        const response = await httpNoLoading.post<{
            $id: string;
            isSuccess: boolean;
            message: string;
            data: ChatResponse;
        }>(
            API_PATH.CHATBOT.SEND_MESSAGE,
            requestData,
            { signal }
        );

        if (!response.data.isSuccess || !response.data.data) {
            throw new Error(response.data.message || 'Failed to send message');
        }

        return response.data.data;
    },

    /**
     * Get conversation by ID
     */
    getConversation: async (conversationId: string) => {
        console.log('API: Getting conversation', conversationId);
        const url = API_PATH.CHATBOT.GET_CONVERSATION(conversationId);
        console.log('API: URL', url);

        const response = await httpNoLoading.get<{
            $id: string;
            isSuccess: boolean;
            message: string;
            data: ConversationDetail;
        }>(url);

        console.log('API: Response', response);

        if (!response.data.isSuccess || !response.data.data) {
            throw new Error(response.data.message || 'Failed to get conversation');
        }

        return response.data;
    },

    /**
     * Get chat history
     */
    // getHistory: async () => {
    //     const response = await http.get<RestResponse<Record<string, unknown>>>(
    //         API_PATH.CHATBOT.GET_HISTORY
    //     );

    //     return response.data;
    // },
};

