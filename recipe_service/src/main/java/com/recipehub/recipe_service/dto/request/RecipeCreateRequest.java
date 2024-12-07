package com.recipehub.recipe_service.dto.request;

import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class RecipeCreateRequest {
    private String title;
    private String description;
    private String instructions;
    private UUID createdBy;
    private List<String> imageUrls;
}
