package com.recipehub.ingredient_service.controller;

import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.response.IngredientResponse;
import com.recipehub.ingredient_service.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {
    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/getAll")
    public List<IngredientResponse> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public IngredientResponse getIngredientById(@PathVariable UUID id) {
        return ingredientService.getIngredientById(id);
    }

    @PostMapping("create")
    public IngredientResponse createIngredient(@RequestBody IngredientRequest request) {
        return ingredientService.createIngredient(request);
    }

    @PutMapping("/{id}")
    public IngredientResponse updateIngredient(@PathVariable UUID id, @RequestBody IngredientRequest request) {
        return ingredientService.updateIngredient(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable UUID id) {
        ingredientService.deleteIngredient(id);
    }
}
