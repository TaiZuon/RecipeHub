package com.recipehub.ingredient_service.service.impl;

import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.response.IngredientResponse;
import com.recipehub.ingredient_service.mapper.IngredientMapper;
import com.recipehub.ingredient_service.model.Ingredient;
import com.recipehub.ingredient_service.repository.IngredientRepository;
import com.recipehub.ingredient_service.service.IngredientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {
    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;


    @Override
    public List<IngredientResponse> getAllIngredients() {
        return ingredientRepository.findAll().stream()
                .map(ingredientMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public IngredientResponse getIngredientById(UUID id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        return ingredientMapper.toResponse(ingredient);
    }

    @Override
    public IngredientResponse createIngredient(IngredientRequest request) {
        if (ingredientRepository.existsByName(request.getName())) {
            throw new RuntimeException("Ingredient with the same name already exists");
        }
        Ingredient ingredient = ingredientMapper.toEntity(request);
        ingredientRepository.save(ingredient);
        return ingredientMapper.toResponse(ingredient);
    }

    @Override
    @Transactional
    public IngredientResponse updateIngredient(UUID id, IngredientRequest request) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        ingredient.setName(request.getName());
        ingredient.setQuantity(request.getQuantity());
        ingredient.setUnit(request.getUnit());
        ingredientRepository.save(ingredient);
        return ingredientMapper.toResponse(ingredient);
    }

    @Override
    public void deleteIngredient(UUID id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        ingredientRepository.deleteById(id);
    }
}
