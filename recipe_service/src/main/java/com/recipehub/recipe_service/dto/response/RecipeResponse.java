package com.recipehub.recipe_service.dto.response;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RecipeResponse {
    private UUID recipeId;
    private String title;
    private String description;
    private String instructions;
    private String profileImageUrl;
    private RecipeStatus status;
    private UUID createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
