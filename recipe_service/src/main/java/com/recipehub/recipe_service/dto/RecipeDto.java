package com.recipehub.recipe_service.dto;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {
    private UUID id;
    private String title;
    private String description;
    private String instructions;
    private RecipeStatus status;
    private UUID createdBy;
    private List<RecipeImageDto> recipeImages;
}
