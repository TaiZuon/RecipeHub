package com.recipehub.comment_service.service.impl;

import com.recipehub.comment_service.dto.Request.CommentCreateRequest;
import com.recipehub.comment_service.dto.Request.UpdateCommentRequest;
import com.recipehub.comment_service.model.Recipe;
import com.recipehub.comment_service.model.Comment;
import com.recipehub.comment_service.model.User;
import com.recipehub.comment_service.repository.RecipeRepository;
import com.recipehub.comment_service.repository.CommentRepository;
import com.recipehub.comment_service.repository.UserRepository;
import com.recipehub.comment_service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Comment getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment don't existed"));
        return comment;
    }

    @Override
    public Comment addComment(CommentCreateRequest request) throws Exception {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Recipe recipe = recipeRepository.findById(request.getRecipeId())
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setRecipe(recipe);
        comment.setContent(request.getContent());

        return commentRepository.save(comment);
    }

    @Override
    public Page<Comment> getCommentsByRecipeId(Long recipeId, int size, int page, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return commentRepository.findAllByRecipeId(recipeId, pageable);
    }

    @Override
    public List<Comment> getCommentsByUser(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return commentRepository.findAllByUser(user);
    }

    @Override
    public Comment updateComment(Long commentId, UpdateCommentRequest request) throws Exception {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        commentRepository.delete(comment);
    }
}