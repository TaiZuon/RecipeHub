package com.recipehub.auth_service.service;

import com.recipehub.auth_service.Enum.MessageStatus;
import com.recipehub.auth_service.dto.ChatRoomDTO;
import com.recipehub.auth_service.dto.MessageDTO;
import com.recipehub.auth_service.dto.request.MessageRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatService {

    List<ChatRoomDTO> getUserRooms(String username);

    Page<MessageDTO> getRoomMessages(Long roomId, String username, int page, int size);

    Page<MessageDTO> getMessagesBefore(Long roomId, String username, LocalDateTime timestamp, int page, int size);

    MessageDTO sendMessage(String username, Long roomId, @Valid MessageRequest message);

    void updateMessageStatus(Long roomId, String userId, List<Long> messageIds, MessageStatus status);

    ChatRoomDTO getOrCreateRoom(String userId, String otherUserId);

    void deleteRoom(Long roomId, String userId);
}