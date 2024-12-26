package com.recipehub.auth_service.dto;

import com.recipehub.auth_service.Enum.MessageStatus;
import com.recipehub.auth_service.Enum.MessageType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class MessageDTO {
    private Long id;
    private String content;
    private MessageType type;
    private String fileUrl;
    private UserDto sender;
    private Long chatRoomId;
    private LocalDateTime timestamp;
    private MessageStatus status;
}
