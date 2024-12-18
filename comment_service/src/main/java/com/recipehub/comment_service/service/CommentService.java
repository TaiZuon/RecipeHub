package com.recipehub.comment_service.service;

import com.recipehub.comment_service.dto.Request.CommentCreateRequest;
import com.recipehub.comment_service.dto.Request.UpdateCommentRequest;
import com.recipehub.comment_service.model.Comment;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CommentService {
    Comment getCommentById(Long id);
    Comment addComment(CommentCreateRequest request) throws Exception;
    public Page<Comment> getCommentsByRecipeId(Long auctionId, int size, int page, String sortBy, String sortDirection);
//    List<Comment> getCommentsByUser(Long userId) throws Exception;
    Comment updateComment(Long commentId, UpdateCommentRequest request) throws Exception;
    void deleteComment(Long commentId);
}