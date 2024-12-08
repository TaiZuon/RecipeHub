package com.recipehub.recipe_service.dto.request;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeImageDto;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class RecipeCreateRequest {
    private String title;
    private String description;
    private Long createdBy;
    private RecipeStatus status;
    private List<RecipeImageDto> imageUrls;
}
