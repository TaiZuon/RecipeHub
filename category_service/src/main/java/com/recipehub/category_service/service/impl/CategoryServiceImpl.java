package com.recipehub.category_service.service.impl;

import com.recipehub.category_service.dto.request.CategoryRequest;
import com.recipehub.category_service.model.Category;
import com.recipehub.category_service.repository.CategoryRepository;
import com.recipehub.category_service.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category findByCategoryType(String categoryType) throws Exception {
        return categoryRepository.findByCategoryType(categoryType)
                .orElseThrow(() -> new Exception("Category not found for type: " + categoryType));
    }

    @Override
    public Category createCategory(CategoryRequest request) {
        Optional<Category> categoryOptional = categoryRepository.findByCategoryType(request.getCategoryType());
        if (categoryOptional.isPresent()){
            log.info(request + " already exists");
            return categoryOptional.get();
        } else {
            Category category = Category.builder()
                    .categoryType(request.getCategoryType())
                    .description(request.getDescription())
                    .build();
            return categoryRepository.save(category);
        }
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(UUID categoryId, CategoryRequest updatedCategory) throws Exception {
        return categoryRepository.findById(categoryId)
                .map(category -> {
                    category.setCategoryType(updatedCategory.getCategoryType());
                    category.setDescription(updatedCategory.getDescription());
                    return categoryRepository.save(category);
                })
                .orElseThrow(() -> new Exception("Category not found for id: " + categoryId));
    }

    @Override
    public void deleteCategory(CategoryRequest request) throws Exception {
        Category category = categoryRepository.findByCategoryType(request.getCategoryType())
                .orElseThrow(() -> new Exception("Category not found for Category Type: " + request.getCategoryType()));
        categoryRepository.delete(category);
    }
}