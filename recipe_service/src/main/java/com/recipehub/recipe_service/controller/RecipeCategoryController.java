package com.recipehub.recipe_service.controller;

import com.recipehub.recipe_service.model.RecipeCategory;
import com.recipehub.recipe_service.service.RecipeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipe-categories")
@RequiredArgsConstructor
public class RecipeCategoryController {
    private final RecipeCategoryService recipeCategoryService;

    @PostMapping
    public ResponseEntity<RecipeCategory> createRecipeCategory(@RequestBody RecipeCategory recipeCategory) {
        return ResponseEntity.ok(recipeCategoryService.createRecipeCategory(recipeCategory));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeCategory> getRecipeCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeCategoryService.getRecipeCategoryById(id));
    }

    @GetMapping
    public ResponseEntity<List<RecipeCategory>> getAllRecipeCategories() {
        return ResponseEntity.ok(recipeCategoryService.getAllRecipeCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeCategory> updateRecipeCategory(@PathVariable Long id, @RequestBody RecipeCategory recipeCategory) {
        return ResponseEntity.ok(recipeCategoryService.updateRecipeCategory(id, recipeCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipeCategory(@PathVariable Long id) {
        recipeCategoryService.deleteRecipeCategory(id);
        return ResponseEntity.noContent().build();
    }
}