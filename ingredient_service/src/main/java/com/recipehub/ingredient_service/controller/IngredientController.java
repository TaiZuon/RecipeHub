package com.recipehub.ingredient_service.controller;

import com.recipehub.ingredient_service.dto.IngredientDto;
import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.request.IngredientUpdateRequest;
import com.recipehub.ingredient_service.mapper.IngredientMapper;
import com.recipehub.ingredient_service.model.Ingredient;
import com.recipehub.ingredient_service.service.IngredientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;
    private final IngredientMapper ingredientMapper;

    private static final Logger logger = LoggerFactory.getLogger(IngredientController.class);

    @GetMapping("/{id}")
    public ResponseEntity<IngredientDto> getIngredient(@PathVariable UUID id) throws Exception {
        return ResponseEntity.ok(ingredientService.getIngredient(id));
    }

    @GetMapping
    public ResponseEntity<List<IngredientDto>> getAllIngredients() {
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }

//    @GetMapping("/search")
//    public PaginatedResponse<IngredientDto> searchIngredients(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) CategoryType categoryType,
//            @RequestParam(required = false) IngredientStatus status,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "createdAt") String sortField,
//            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {
//
//        Page<Ingredient> ingredientPage = ingredientService.searchIngredients(name, categoryType, status, page, size, sortField, sortDirection);
//        List<IngredientDto> content = ingredientPage.getContent().stream()
//                .map(ingredientMapper::ingredientToIngredientDto)
//                .toList();
//        return new PaginatedResponse<>(
//                ingredientPage.getNumber(),
//                ingredientPage.getSize(),
//                ingredientPage.getTotalElements(),
//                ingredientPage.getTotalPages(),
//                ingredientPage.isLast(),
//                ingredientPage.isFirst(),
//                content
//        );
//    }

    @PostMapping
    public ResponseEntity<?> createIngredient(@Valid @RequestBody IngredientRequest request) throws Exception {
        logger.info("Received request to create ingredient: {}", request);
        Ingredient createdIngredient = ingredientService.createIngredient(request);
        return ResponseEntity.ok(ingredientMapper.ingredientToIngredientDto(createdIngredient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredientDto> updateIngredient(@PathVariable UUID id,
                                                          @Valid @RequestBody IngredientUpdateRequest request) throws Exception {
        return ResponseEntity.ok(ingredientService.updateIngredient(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIngredient(@PathVariable UUID id) {
        ingredientService.deleteIngredient(id);
        return ResponseEntity.ok("Successfully deleted ingredient id " + id);
    }
}