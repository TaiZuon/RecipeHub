package com.recipehub.recipe_service.dto.request;

import lombok.Data;
import java.util.UUID;

@Data
public class RecipeRequest {
    private String title;
    private String description;
    private String instructions;
    private String profileImageUrl;
    private UUID createdBy;
}