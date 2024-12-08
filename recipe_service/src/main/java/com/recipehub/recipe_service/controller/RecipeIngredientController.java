package com.recipehub.recipe_service.controller;

import com.recipehub.recipe_service.model.RecipeIngredient;
import com.recipehub.recipe_service.service.RecipeIngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe_ingredients")
@RequiredArgsConstructor
public class RecipeIngredientController {
    private final RecipeIngredientService recipeIngredientService;

    @PostMapping
    public ResponseEntity<RecipeIngredient> createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        return ResponseEntity.ok(recipeIngredientService.createRecipeIngredient(recipeIngredient));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeIngredient> getRecipeIngredientById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeIngredientService.getRecipeIngredientById(id));
    }

    @GetMapping
    public ResponseEntity<List<RecipeIngredient>> getAllRecipeIngredients() {
        return ResponseEntity.ok(recipeIngredientService.getAllRecipeIngredients());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeIngredient> updateRecipeIngredient(@PathVariable Long id, @RequestBody RecipeIngredient recipeIngredient) {
        return ResponseEntity.ok(recipeIngredientService.updateRecipeIngredient(id, recipeIngredient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipeIngredient(@PathVariable Long id) {
        recipeIngredientService.deleteRecipeIngredient(id);
        return ResponseEntity.noContent().build();
    }
}