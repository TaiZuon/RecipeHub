package com.recipehub.comment_service.dto.Request;

import lombok.Data;

import java.util.UUID;

@Data
public class CommentCreateRequest {
    private Long userId;
    private Long recipeId;
    private String content;
}