package com.recipehub.comment_service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
@Getter
@Setter
public class CommentDto {
    Long id;
    Long recipeId;
    Long userId;
    String content;
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
