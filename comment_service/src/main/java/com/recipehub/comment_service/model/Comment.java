package com.recipehub.comment_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "comments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recipe_id", nullable = false)
    private Long recipeId; // Chỉ lưu recipeId từ Recipe Service

    @Column(name = "user_id", nullable = false)
    private Long userId; // Chỉ lưu userId từ User Service

    @Column(nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PreUpdate
    void preUpdate(){
        updatedAt = LocalDateTime.now();
    }

    @PrePersist
    void preCreate(){
        createdAt = LocalDateTime.now();
    }
}
