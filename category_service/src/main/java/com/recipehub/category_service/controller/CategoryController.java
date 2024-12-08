package com.recipehub.category_service.controller;

import com.recipehub.category_service.dto.request.CategoryRequest;
import com.recipehub.category_service.dto.response.CategoryResponse;
import com.recipehub.category_service.mapper.CategoryMapper;
import com.recipehub.category_service.model.Category;
import com.recipehub.category_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
        try {
            Category category = categoryService.findById(id);
            CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);

            return ResponseEntity.ok(categoryResponse);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest request) {
        Category category = categoryService.createCategory(request);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody CategoryRequest updatedCategory) {
        try {
            Category category = categoryService.updateCategory(id, updatedCategory);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}