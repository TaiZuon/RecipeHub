package com.recipehub.recipe_service.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recipehub.recipe_service.Enum.RecipeStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "recipes")
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "instructions", nullable = false, columnDefinition = "TEXT")
    private String instructions;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RecipeImage> recipeImages;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RecipeStatus status;

    @Column(name = "created_by", nullable = false, columnDefinition = "BINARY(16)")
    private UUID createdBy;

//    @OneToMany(mappedBy = "recipeId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    private List<RecipeCategory> recipeCategories;
//
//    @OneToMany(mappedBy = "recipeId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    private List<RecipeIngredient> recipeIngredients;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}