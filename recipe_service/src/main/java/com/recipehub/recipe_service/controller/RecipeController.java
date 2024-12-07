package com.recipehub.recipe_service.controller;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;
import com.recipehub.recipe_service.mapper.RecipeMapper;
import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;
    private final RecipeMapper recipeMapper;

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable UUID id) throws Exception {
        return ResponseEntity.ok(recipeService.getRecipe(id));
    }

    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipe());
    }

//    @GetMapping("/search")
//    public PaginatedResponse<RecipeDto> searchRecipes(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) CategoryType categoryType,
//            @RequestParam(required = false) RecipeStatus status,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "createdAt") String sortField,
//            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {
//
//        Page<Recipe> recipePage = recipeService.searchRecipes(name, categoryType, status, page, size, sortField, sortDirection);
//        List<RecipeDto> content = recipePage.getContent().stream()
//                .map(recipeMapper::recipeToRecipeDto)
//                .toList();
//        return new PaginatedResponse<>(
//                recipePage.getNumber(),
//                recipePage.getSize(),
//                recipePage.getTotalElements(),
//                recipePage.getTotalPages(),
//                recipePage.isLast(),
//                recipePage.isFirst(),
//                content
//        );
//    }

    @PostMapping
    public ResponseEntity<?> createRecipe(@Valid @RequestBody RecipeCreateRequest request) throws Exception {
        logger.info("Received request to create recipe: {}", request);
        Recipe createdRecipe = recipeService.createRecipe(request);
        return ResponseEntity.ok(recipeMapper.recipeToRecipeDto(createdRecipe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable UUID id,
                                                  @Valid @RequestBody RecipeUpdateRequest request) throws Exception {
        return ResponseEntity.ok(recipeService.updateRecipe(id, request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RecipeDto> updateStatus(@PathVariable UUID id, @RequestParam RecipeStatus newStatus)
            throws Exception {
        return ResponseEntity.ok(recipeService.updateStatus(id, newStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable UUID id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok("Successfully deleted recipe id " + id);
    }
}