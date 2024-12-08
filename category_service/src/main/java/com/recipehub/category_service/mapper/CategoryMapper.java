package com.recipehub.category_service.mapper;

import com.recipehub.category_service.dto.response.CategoryResponse;
import com.recipehub.category_service.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryResponse toCategoryResponse(Category category);
}