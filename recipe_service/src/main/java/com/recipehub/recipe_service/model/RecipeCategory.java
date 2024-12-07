package com.recipehub.recipe_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "recipe_category")
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "recipe_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID recipeId;

    @Column(name = "category_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID categoryId;
}