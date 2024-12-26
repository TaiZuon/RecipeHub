package com.recipehub.comment_service.service.impl;

import com.recipehub.comment_service.dto.Request.CommentCreateRequest;
import com.recipehub.comment_service.dto.Request.UpdateCommentRequest;
import com.recipehub.comment_service.model.Comment;
import com.recipehub.comment_service.repository.CommentRepository;
import com.recipehub.comment_service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment don't existed"));
        return comment;
    }

    @Override
    public Comment addComment(CommentCreateRequest request) throws Exception {

        Comment comment = new Comment();
        comment.setUserId(request.getUserId());
        comment.setRecipeId(request.getRecipeId());
        comment.setContent(request.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    @Override
    public Page<Comment> getCommentsByRecipeId(Long recipeId, int size, int page, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return commentRepository.findAllByRecipeId(recipeId, pageable);
    }


    @Override
    public Comment updateComment(Long commentId, UpdateCommentRequest request) throws Exception {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        comment.setContent(request.getContent());
        comment.setUpdatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        commentRepository.delete(comment);
    }
}