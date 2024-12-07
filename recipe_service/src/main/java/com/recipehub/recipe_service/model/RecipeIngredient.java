package com.recipehub.recipe_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "recipe_ingredient")
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "recipe_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID recipeId;

    @Column(name = "ingredient_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID ingredientId;

    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @Column(name = "unit_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID unitId;
}