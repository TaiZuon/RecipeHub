package com.recipehub.category_service.dto.response;

import com.recipehub.category_service.Enum.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private CategoryType categoryType;
    private String name;
    private String description;

}
