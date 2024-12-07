package com.recipehub.category_service.dto;

import com.recipehub.category_service.Enum.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private UUID id;
    private CategoryType categoryType;
    private String description;
}
