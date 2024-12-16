package com.recipehub.auth_service.controller;

import com.recipehub.auth_service.AWS.AmazonS3Service;
import com.recipehub.auth_service.dto.ChatRoomDTO;
import com.recipehub.auth_service.dto.MessageDTO;
import com.recipehub.auth_service.dto.MessageStatusRequest;
import com.recipehub.auth_service.dto.request.MessageRequest;
import com.recipehub.auth_service.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final ChatService chatService;
    private final AmazonS3Service s3Service;

    private static final Long DEFAULT_USER_ID = 1L; // Use a valid default user ID

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomDTO>> getUserRooms(@RequestParam Long userId) {
        return ResponseEntity.ok(chatService.getUserRooms(userId.toString()));
    }

    @PostMapping("/get-or-create-room")
    public ResponseEntity<ChatRoomDTO> getOrCreateRoom(@RequestParam Long userId,@RequestParam Long otherUserId) {
        ChatRoomDTO room = chatService.getOrCreateRoom(userId.toString(), otherUserId.toString());
        return ResponseEntity.ok(room);
    }

    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<Page<MessageDTO>> getRoomMessages(
            @PathVariable Long roomId,
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(chatService.getRoomMessages(
                roomId,
                userId.toString(),
                page,
                size
        ));
    }

    @PostMapping("/room/{roomId}/message")
    public ResponseEntity<MessageDTO> sendMessage(
            @PathVariable Long roomId,
            @RequestParam Long userId,
            @Valid @RequestBody MessageRequest message) {
        return ResponseEntity.ok(chatService.sendMessage(
                userId.toString(),
                roomId,
                message
        ));
    }

    @PostMapping("/room/{roomId}/messages/status")
    public ResponseEntity<Void> updateMessageStatus(
            @PathVariable Long roomId,
            @RequestParam Long userId,
            @RequestBody MessageStatusRequest request) {
        chatService.updateMessageStatus(
                roomId,
                userId.toString(),
                request.getMessageIds(),
                request.getStatus()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/room/{roomId}/messages/before")
    public ResponseEntity<Page<MessageDTO>> getMessagesBefore(
            @PathVariable Long roomId,
            @RequestParam Long userId,
            @RequestParam LocalDateTime timestamp,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(chatService.getMessagesBefore(
                roomId,
                userId.toString(),
                timestamp,
                page,
                size
        ));
    }

    @DeleteMapping("/room/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long roomId, @RequestParam Long userId) {
        chatService.deleteRoom(roomId, userId.toString());
        return ResponseEntity.ok("Chatroom deleted");
    }
}