import fileUtils from '../utils/fileUtils'
import axios from 'axios';
const API_BASE_URL = "http://localhost:8080";


export const chatService = {
    getRooms: async (userId) => {
        try {
            console.log("hihih" +userId);
            const response = await axios.get(`${API_BASE_URL}/api/chat/rooms`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    getOrCreateRoom: async (userId, otherUserId) => {
        try {
            console.log(userId, otherUserId);
            const response = await axios.post(`${API_BASE_URL}/api/chat/get-or-create-room`, {
                params: {userId, otherUserId }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting or creating room:', error);
            throw error;
        }
    },

    deleteRoom: async (roomId, userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/chat/room/${roomId}`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting room:', error);
            throw error;
        }
    },

    updateMessageStatus: async (roomId, messageIds, status, userId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat/room/${roomId}/messages/status`, {
                messageIds,
                status
            }, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating message status:', error);
            throw error;
        }
    },

    markMessagesAsRead: async (roomId, messages, userId) => {
        try {
            const unreadMessages = messages.filter(msg => msg.status !== 'READ');
            if (unreadMessages.length === 0) return;

            const messageIds = unreadMessages.map(msg => msg.id);
            await chatService.updateMessageStatus(roomId, messageIds, 'READ', userId);
        } catch (error) {
            console.error('Error marking messages as read:', error);
            throw error;
        }
    },

    getMessages: async (roomId, userId, page = 0, size = 20) => {
        try {
            console.log("hihi" + userId)
            const response = await axios.get(`${API_BASE_URL}/api/chat/room/${roomId}/messages`, {
                params: { userId, page, size }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },

    sendMessage: async (roomId, userId, message) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat/room/${roomId}/message`, , {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    sendFileMessage: async (roomId, userId, { file, type }) => {
        try {
            let fileUrl;
            if (type === 'IMAGE') {
                fileUrl = await fileUtils.uploadImage(file, 'chat');
            } else {
                fileUrl = await fileUtils.uploadFile(file, 'chat/files', {
                    maxSize: 20 * 1024 * 1024, // 20MB
                });            }

            return await chatService.sendMessage(roomId, userId, {
                content: file.name,
                type: type,
                fileUrl: fileUrl
            });
        } catch (error) {
            console.error('Error sending file message:', error);
            throw error;
        }
    }
};