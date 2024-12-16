package com.recipehub.recipe_service.controller;

import com.recipehub.recipe_service.Enum.CategoryType;
import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;
import com.recipehub.recipe_service.dto.response.PageResponse;
import com.recipehub.recipe_service.dto.response.RecipeResponse;
import com.recipehub.recipe_service.mapper.RecipeMapper;
import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.repository.httpClient.AuthClient;
import com.recipehub.recipe_service.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Stream.builder;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;
    private final RecipeMapper recipeMapper;
    private final AuthClient authServiceClient;

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(recipeService.getRecipe(id));
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<RecipeResponse>> getAllRecipes(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(required = false) List<String> categoryType,
            @RequestParam(required = false) String title
            ) {
//        return ResponseEntity<PageResponse<RecipeResponse>>builder()
//                .result(recipeService.getAllRecipe(page, size))
//                .build();
        List<CategoryType> categoryTypeList = new ArrayList<>();
        if (categoryType != null) {
            categoryTypeList = categoryType.stream()
                    .map(CategoryType::valueOf).toList();
        }
        PageResponse<RecipeResponse> result = recipeService.getAllRecipe(page, size, categoryTypeList, title);
        return ResponseEntity.ok(result);
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
        RecipeDto createdRecipe = recipeService.createRecipe(request);
        return ResponseEntity.ok((createdRecipe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable Long id,
                                                  @Valid @RequestBody RecipeUpdateRequest request) throws Exception {
        return ResponseEntity.ok(recipeService.updateRecipe(id, request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RecipeDto> updateStatus(@PathVariable Long id, @RequestParam RecipeStatus newStatus)
            throws Exception {
        return ResponseEntity.ok(recipeService.updateStatus(id, newStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok("Successfully deleted recipe id " + id);
    }

    @PutMapping("/{recipeId}/approve")
    public ResponseEntity<String> approveRecipe(@PathVariable Long recipeId, @RequestHeader("userName") String userName) {
        // Xác minh quyền Admin từ AuthService
        String role = authServiceClient.getUserRoles(userName);
        if (!role.contains("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền thực hiện thao tác này.");
        }
        recipeService.approveRecipe(recipeId);
        return ResponseEntity.ok("Recipe đã được duyệt.");
    }

    @PutMapping("/{recipeId}/reject")
    public ResponseEntity<String> rejectRecipe(@PathVariable Long recipeId, @RequestHeader("userName") String userName) {
        // Xác minh quyền Admin từ AuthService
        String role = authServiceClient.getUserRoles(userName);
        if (!role.contains("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền thực hiện thao tác này.");
        }
        recipeService.rejectRecipe(recipeId);
        return ResponseEntity.ok("Recipe đã bị từ chối.");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/status")
    public ResponseEntity<List<RecipeResponse>> getRecipesByStatus(@RequestParam RecipeStatus status) {
        List<RecipeResponse> recipes = recipeService.getRecipesByStatus(status);
        return ResponseEntity.ok(recipes);
    }
}