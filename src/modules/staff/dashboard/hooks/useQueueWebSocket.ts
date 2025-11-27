import { useEffect, useRef, useCallback } from 'react';
import type { QueueStatus } from '../types';

interface WebSocketMessage {
    type: 'queue_update' | 'ticket_called' | 'ticket_completed' | 'status_changed';
    data: any;
    timestamp: string;
}

interface UseQueueWebSocketProps {
    serviceGroupId: string | null;
    onQueueUpdate?: (status: QueueStatus) => void;
    onTicketCalled?: (data: any) => void;
    onTicketCompleted?: (ticketNumber: string) => void;
    onStatusChanged?: (ticketNumber: string, status: string) => void;
    enabled?: boolean;
}

export const useQueueWebSocket = ({
    serviceGroupId,
    onQueueUpdate,
    onTicketCalled,
    onTicketCompleted,
    onStatusChanged,
    enabled = true,
}: UseQueueWebSocketProps) => {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000; // 3 seconds

    const getWebSocketUrl = useCallback((groupId: string) => {
        // Get the WebSocket URL from environment or construct it
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        // Adjust the path based on your API structure
        return `${protocol}//${host}/api/ws/queue/${groupId}`;
    }, []);

    const handleMessage = useCallback((event: MessageEvent) => {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            
            switch (message.type) {
                case 'queue_update':
                    onQueueUpdate?.(message.data);
                    break;
                case 'ticket_called':
                    onTicketCalled?.(message.data);
                    break;
                case 'ticket_completed':
                    onTicketCompleted?.(message.data.ticketNumber);
                    break;
                case 'status_changed':
                    onStatusChanged?.(message.data.ticketNumber, message.data.status);
                    break;
                default:
                    console.log('Unknown WebSocket message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    }, [onQueueUpdate, onTicketCalled, onTicketCompleted, onStatusChanged]);

    const handleError = useCallback(() => {
        console.error('WebSocket error');
        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            reconnectTimeoutRef.current = setTimeout(() => {
                if (serviceGroupId && enabled) {
                    connectWebSocket(serviceGroupId);
                }
            }, reconnectDelay * reconnectAttemptsRef.current);
        }
    }, [serviceGroupId, enabled]);

    const handleClose = useCallback(() => {
        console.log('WebSocket closed');
        wsRef.current = null;
    }, []);

    const handleOpen = useCallback(() => {
        console.log('WebSocket connected');
        reconnectAttemptsRef.current = 0;
        
        // Send initial subscription message
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({
                type: 'subscribe',
                serviceGroupId: serviceGroupId
            }));
        }
    }, [serviceGroupId]);

    const connectWebSocket = useCallback((groupId: string) => {
        if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
            return; // Already connected or connecting
        }

        try {
            const url = getWebSocketUrl(groupId);
            wsRef.current = new WebSocket(url);
            
            wsRef.current.addEventListener('open', handleOpen);
            wsRef.current.addEventListener('message', handleMessage);
            wsRef.current.addEventListener('error', handleError);
            wsRef.current.addEventListener('close', handleClose);
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            handleError();
        }
    }, [getWebSocketUrl, handleOpen, handleMessage, handleError, handleClose]);

    const disconnectWebSocket = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        
        if (wsRef.current) {
            wsRef.current.removeEventListener('open', handleOpen);
            wsRef.current.removeEventListener('message', handleMessage);
            wsRef.current.removeEventListener('error', handleError);
            wsRef.current.removeEventListener('close', handleClose);
            wsRef.current.close();
            wsRef.current = null;
        }
    }, [handleOpen, handleMessage, handleError, handleClose]);

    useEffect(() => {
        if (!serviceGroupId || !enabled) {
            disconnectWebSocket();
            return;
        }

        connectWebSocket(serviceGroupId);

        return () => {
            disconnectWebSocket();
        };
    }, [serviceGroupId, enabled, connectWebSocket, disconnectWebSocket]);

    return {
        isConnected: wsRef.current?.readyState === WebSocket.OPEN,
        disconnect: disconnectWebSocket,
    };
};
