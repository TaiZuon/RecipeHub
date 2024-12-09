package com.recipehub.recipe_service.dto.response;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeImageDto;
import com.recipehub.recipe_service.model.RecipeImage;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class RecipeResponse {
    private Long recipeId;
    private String title;
    private String description;
    private List<RecipeImageDto> recipeImages;
    private RecipeStatus status;
    private Long createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
