package com.recipehub.category_service.service;

import com.recipehub.category_service.dto.request.CategoryRequest;
import com.recipehub.category_service.model.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    Category findById(Long id) throws Exception;

    Category createCategory(CategoryRequest request);

    List<Category> getAllCategories();

    Category updateCategory(Long categoryId, CategoryRequest updatedCategory) throws Exception;

    void deleteCategory(CategoryRequest request) throws Exception;
}
