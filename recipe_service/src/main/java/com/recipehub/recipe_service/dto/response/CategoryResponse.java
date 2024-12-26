package com.recipehub.recipe_service.dto.response;

import com.recipehub.recipe_service.Enum.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private Long id;
    private CategoryType categoryType;
    private String description;
}
