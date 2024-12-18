package com.recipehub.comment_service.dto;

import com.recipehub.comment_service.Enum.RecipeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {
    private Long id;
    private String title;
    private String description;
    private RecipeStatus status;
    private Long createdBy;
    private List<RecipeImageDto> recipeImages;
}
