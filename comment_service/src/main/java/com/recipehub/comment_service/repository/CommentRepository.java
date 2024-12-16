package com.recipehub.comment_service.repository;

import com.recipehub.comment_service.model.Comment;
import com.recipehub.comment_service.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByUser(User user);
    Page<Comment> findAllByRecipeId(Long recipeId, Pageable pageable);
}
