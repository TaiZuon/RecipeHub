import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const useWebSocket = (userId, onMessageReceived, onChatMessageReceived) => {
    const clientRef = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const connect = () => {
            if (!userId) {
                console.warn("ws connection aborted: Missing userId");
                return;
            }
            console.log("[WebSocket] Connected successfully. User:", userId);

            const token = localStorage.getItem('authToken');
            if (!token) {
                console.warn("ws connection aborted: Missing token");
                return;
            }

            const socket = new SockJS(process.env.REACT_APP_WS_URL);
            const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                    'userId': userId
                },
                debug: console.log,
                reconnectDelay: 5000,
                onConnect: () => {
                    console.log("[WebSocket] Connected");

                    // Subscribe to messages
                    client.subscribe('/user/queue/messages', (message) => {
                        try {
                            console.log("[WebSocket] Chat message received:", message.body);
                            const chatMessage = JSON.parse(message.body);
                            if (typeof onChatMessageReceived === 'function') {
                                onChatMessageReceived(chatMessage);
                            } else {
                                console.error("[WebSocket] onChatMessageReceived is not a function");
                            }
                        } catch (error) {
                            console.error("[WebSocket] Failed to process message:", error);
                        }
                    });
                },
                onStompError: (frame) => {
                    console.error("ws STOMP error:", frame);
                },
            });

            client.activate();
            clientRef.current = client;
        };

        connect();

        return () => {
            mountedRef.current = false;
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, [userId, onMessageReceived, onChatMessageReceived]);

    return clientRef.current;
};