package com.recipehub.comment_service.mapper;

import com.recipehub.comment_service.dto.CommentDto;
import com.recipehub.comment_service.dto.Response.CommentResponse;
import com.recipehub.comment_service.model.Comment;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CommentMapper {
    public static CommentDto commentToCommentDto(Comment comment){
        return CommentDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .auctionId(comment.getRecipe().getId())
                .content(comment.getContent())
                .createAt(comment.getCreatedAt())
                .updateAt(comment.getUpdatedAt())
                .build();
    }

    public static CommentResponse commentToCommentResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .auctionId(comment.getRecipe().getId())
                .userId(comment.getUser().getId())
                .userName(comment.getUser().getUserName)
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}