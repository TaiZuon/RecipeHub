package com.recipehub.recipe_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.recipehub.recipe_service.Enum.UnitType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference
    private Recipe recipe;

    @Column(name = "ingredient_id", nullable = false)
    private Long ingredientId;

}