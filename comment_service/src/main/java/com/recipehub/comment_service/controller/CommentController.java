package com.recipehub.comment_service.controller;

import com.recipehub.comment_service.SearchService.PaginatedResponse;
import com.recipehub.comment_service.dto.CommentEvent;
import com.recipehub.comment_service.dto.Request.CommentCreateRequest;
import com.recipehub.comment_service.dto.Request.UpdateCommentRequest;
import com.recipehub.comment_service.dto.Response.CommentResponse;
import com.recipehub.comment_service.mapper.CommentMapper;
import com.recipehub.comment_service.model.Comment;
import com.recipehub.comment_service.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("")
    public ResponseEntity<CommentResponse> addNewComment(@RequestBody CommentCreateRequest comment) throws Exception {
        try {
            Comment savedComment = commentService.addComment(comment);
            CommentResponse commentResponse = CommentMapper.commentToCommentResponse(savedComment);
            messagingTemplate.convertAndSend("/topic/recipe-comments/" + comment.getRecipeId(),
                    new CommentEvent("create", commentResponse));
            return ResponseEntity.ok(commentResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/recipe/{recipeId}")
    public PaginatedResponse<CommentResponse> getCommentsByRecipe(
            @PathVariable Long recipeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {
        Page<Comment> commentPage = commentService.getCommentsByRecipeId(recipeId, size, page, sortBy, sortDirection);
        List<CommentResponse> content = commentPage.getContent().stream()
                .map(CommentMapper::commentToCommentResponse)
                .toList();
        return new PaginatedResponse<>(
                commentPage.getNumber(),
                commentPage.getSize(),
                commentPage.getTotalElements(),
                commentPage.getTotalPages(),
                commentPage.isLast(),
                commentPage.isFirst(),
                content
        );
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody UpdateCommentRequest request) {
        try {
            Comment newComment = commentService.updateComment(commentId, request);

            messagingTemplate.convertAndSend("/topic/recipe-comments/" + newComment.getRecipeId(),
                    new CommentEvent("update", CommentMapper.commentToCommentResponse(newComment)));
            return ResponseEntity.ok("Update comment successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        Long recipeId = commentService.getCommentById(commentId).getRecipeId();
        commentService.deleteComment(commentId);
        // Phát sự kiện "delete" qua WebSocket
        messagingTemplate.convertAndSend("/topic/recipe-comments/" + recipeId,
                new CommentEvent("delete", commentId));
    }


}