import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const useWebSocket = (userId, onMessageReceived, onChatMessageReceived) => {
    const clientRef = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const subscribeToTopics = (client) => {
            // Đăng ký nhận tin nhắn riêng tư
            client.subscribe('/user/queue/messages', (message) => {
                try {
                    const chatMessage = JSON.parse(message.body);
                    onChatMessageReceived(chatMessage);
                } catch (error) {
                    console.error("[WebSocket] Failed to parse message:", error);
                }
            });

            // Đăng ký nhận thông báo
            client.subscribe('/user/queue/notifications', (message) => {
                try {
                    const notification = JSON.parse(message.body);
                    onMessageReceived(notification);
                } catch (error) {
                    console.error("[WebSocket] Failed to parse notification:", error);
                }
            });
        };

        const connect = () => {
            if (!userId) {
                console.warn("WebSocket connection aborted: Missing userId");
                return;
            }

            const token = localStorage.getItem('authToken');
            if (!token) {
                console.warn("WebSocket connection aborted: Missing token");
                return;
            }

            if (clientRef.current?.connected) {
                console.log("WebSocket already connected");
                return;
            }

            const socket = new SockJS(process.env.REACT_APP_WS_URL);
            const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                    'userId': userId
                },
                debug: (str) => console.log("[WebSocket Debug]", str),
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    if (!mountedRef.current) return;
                    console.log("[WebSocket] Connected. Subscribing to topics...");
                    subscribeToTopics(client);
                },
                onStompError: (frame) => {
                    console.error("[WebSocket] STOMP error:", frame);
                }
            });

            clientRef.current = client;
            client.activate();
        };

        connect();

        return () => {
            mountedRef.current = false;
            clientRef.current?.deactivate();
            console.log("[WebSocket] Disconnected.");
        };
    }, [userId, onMessageReceived, onChatMessageReceived]);
};
