package com.recipehub.auth_service.dto;

import com.recipehub.auth_service.Enum.MessageStatus;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class MessageStatusRequest {
    private Long roomId;
    private Long userId;
    private List<Long> messageIds;
    private MessageStatus status;
}
