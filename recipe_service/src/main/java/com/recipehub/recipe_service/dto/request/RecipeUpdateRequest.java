package com.recipehub.recipe_service.dto.request;

import com.recipehub.recipe_service.dto.RecipeImageDto;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class RecipeUpdateRequest {
    private String title;
    private String description;
    private String instructions;

    private List<RecipeImageDto> recipeImages;
    private List<String> newImages;

    public boolean hasNewImages() {
        return newImages != null && newImages.isEmpty();
    }
}
