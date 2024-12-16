package com.recipehub.comment_service.dto.Response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    UUID id;
    UUID recipeId;
    UUID userId;
    String userName;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
