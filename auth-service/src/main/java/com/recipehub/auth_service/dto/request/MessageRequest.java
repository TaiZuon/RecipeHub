package com.recipehub.auth_service.dto.request;

import com.recipehub.auth_service.Enum.MessageType;
import lombok.Data;

@Data
public class MessageRequest {
    private String content;
    private MessageType type;
    private String fileUrl;
}