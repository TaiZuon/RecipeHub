package com.recipehub.auth_service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ChatRoomDTO {
    private Long id;
    private UserDto user1;
    private UserDto user2;
    private MessageDTO lastMessage;
}