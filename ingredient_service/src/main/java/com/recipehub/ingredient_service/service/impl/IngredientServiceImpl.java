package com.recipehub.ingredient_service.service.impl;

import com.recipehub.ingredient_service.AWS.AmazonS3Service;
import com.recipehub.ingredient_service.dto.IngredientDto;
import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.request.IngredientUpdateRequest;
import com.recipehub.ingredient_service.exception.AppException;
import com.recipehub.ingredient_service.exception.ErrorCode;
import com.recipehub.ingredient_service.mapper.IngredientMapper;
import com.recipehub.ingredient_service.model.Ingredient;
import com.recipehub.ingredient_service.model.IngredientImage;
import com.recipehub.ingredient_service.repository.IngredientRepository;

import com.recipehub.ingredient_service.service.IngredientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientServiceImpl implements IngredientService {
    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;
    private final AmazonS3Service amazonS3Service;

    @Override
    public IngredientDto getIngredient(UUID id) throws Exception {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new Exception("Not exist ingredient id: " + id));
        return ingredientMapper.ingredientToIngredientDto(ingredient);
    }

    @Override
    public List<IngredientDto> getAllIngredients() {
        List<Ingredient> ingredients = ingredientRepository.findAll();
        return ingredients.stream()
                .map(ingredient -> ingredientMapper.ingredientToIngredientDto(ingredient))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Ingredient createIngredient(IngredientRequest request) throws Exception {
        Ingredient ingredient = ingredientMapper.ingredientCreateToIngredient(request);

        // Save ingredient to get its id
        ingredient = ingredientRepository.save(ingredient);

        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<IngredientImage> ingredientImages = new ArrayList<>();
            for (int i = 0; i < request.getImageUrls().size(); i++) {
                IngredientImage ingredientImage = new IngredientImage();
                ingredientImage.setImageUrl(request.getImageUrls().get(i).getImageUrl());
                ingredientImage.setPrimary(request.getImageUrls().get(i).getIsPrimary());
                ingredientImage.setIngredient(ingredient);
                ingredientImages.add(ingredientImage);
            }
            ingredient.setIngredientImages(ingredientImages);
        }

        return ingredientRepository.save(ingredient);
    }

    @Override
    public void deleteIngredient(UUID ingredientId) {
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        ingredientRepository.deleteById(ingredientId);
    }

    @Override
    @Transactional
    public IngredientDto updateIngredient(UUID id, IngredientUpdateRequest request) {
        log.info("Updating ingredient with id: {}", id);

        Ingredient ingredient = findIngredientById(id);

        updateBasicInfo(ingredient, request);
        updateImages(ingredient, request.getNewImages());

        Ingredient updatedIngredient = ingredientRepository.save(ingredient);
        log.info("Successfully updated ingredient with id: {}", id);
        return ingredientMapper.ingredientToIngredientDto(updatedIngredient);
    }

    private void updateBasicInfo(Ingredient ingredient, IngredientUpdateRequest request) {
        if (request.getName() != null) {
            ingredient.setName(request.getName());
        }
        if (request.getUnit() != null) {
            ingredient.setUnit(request.getUnit());
        }
    }

    private Ingredient findIngredientById(UUID id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_NOT_FOUND));
    }


    private void updateImages(Ingredient ingredient, List<String> newImageUrls) {
        if (newImageUrls != null && !newImageUrls.isEmpty()) {
            List<IngredientImage> currentImages = ingredient.getIngredientImages();
            currentImages.clear();

            for (int i = 0; i < newImageUrls.size(); i++) {
                IngredientImage newImage = new IngredientImage();
                newImage.setImageUrl(newImageUrls.get(i));
                newImage.setPrimary(i == 0);
                newImage.setIngredient(ingredient);
                currentImages.add(newImage);
            }
        } else {
            log.info("No new images provided for ingredient ID: {}", ingredient.getId());
        }
    }

}