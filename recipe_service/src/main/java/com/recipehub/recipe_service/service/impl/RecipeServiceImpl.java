package com.recipehub.recipe_service.service.impl;

import com.recipehub.recipe_service.AWS.AmazonS3Service;
import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;
import com.recipehub.recipe_service.dto.response.UserResponse;
import com.recipehub.recipe_service.exception.AppException;
import com.recipehub.recipe_service.exception.ErrorCode;
import com.recipehub.recipe_service.mapper.RecipeMapper;
import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.model.RecipeImage;
import com.recipehub.recipe_service.repository.RecipeRepository;
import com.recipehub.recipe_service.repository.httpClient.AuthClient;
import com.recipehub.recipe_service.service.RecipeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;
    private final AmazonS3Service amazonS3Service;
    private final AuthClient authClient;

    @Override
    public RecipeDto getRecipe(Long id) throws Exception {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new Exception("Not exist recipe id: " + id));
        return recipeMapper.recipeToRecipeDto(recipe);
    }

    @Override
    public List<RecipeDto> getAllRecipe() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream()
                .map(recipe -> recipeMapper.recipeToRecipeDto(recipe))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RecipeDto createRecipe(RecipeCreateRequest request) throws Exception {
        UserResponse userResponse = authClient.getUserById(request.getCreatedBy());
        if (userResponse == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        Recipe recipe = recipeMapper.recipeCreateToRecipe(request);

        // Save recipe to get its id
        recipe = recipeRepository.save(recipe);

        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<RecipeImage> recipeImages = new ArrayList<>();
            for (int i = 0; i < request.getImageUrls().size(); i++) {
                RecipeImage recipeImage = new RecipeImage();
                recipeImage.setImageUrl(request.getImageUrls().get(i).getImageUrl());
                recipeImage.setPrimary(request.getImageUrls().get(i).getIsPrimary());
                recipeImage.setRecipe(recipe);
                recipeImages.add(recipeImage);
            }
            recipe.setRecipeImages(recipeImages);
        }


        return recipeMapper.recipeToRecipeDto(recipeRepository.save(recipe));
    }

    @Override
    @Transactional
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_FOUND));

//        if (recipe.getStatus() == RecipeStatus.ACTIVE) {
//            log.warn("Recipe is active so can't delete this recipe");
//            throw new AppException(ErrorCode.RECIPE_DELETION_FAILED);
//        }

        try {
            recipe.setStatus(RecipeStatus.REJECTED);
            recipeRepository.save(recipe);

            recipeRepository.delete(recipe);

            for (RecipeImage recipeImage : recipe.getRecipeImages()) {
                try {
                    amazonS3Service.deleteFile(recipeImage.getImageUrl());
                } catch (Exception e) {
                    log.error("Failed to delete image from S3: {}", recipeImage.getImageUrl(), e);
                }
            }
        } catch (Exception e) {
            compensateDeleteFailure(recipe);
            throw new AppException(ErrorCode.RECIPE_DELETION_FAILED);
        }
    }

    private void compensateDeleteFailure(Recipe recipe) {
        try {
            recipe.setStatus(RecipeStatus.REJECTED);
            recipeRepository.save(recipe);
        } catch (Exception e) {
            log.error("Failed to compensate for delete failure for recipe: {}", recipe.getId(), e);
        }
    }

    @Override
    @Transactional
    public RecipeDto updateRecipe(Long id, RecipeUpdateRequest request) {
        log.info("Updating recipe with id: {}", id);

        Recipe recipe = findRecipeById(id);
        validateRecipeStatus(recipe);

        updateBasicInfo(recipe, request);
        updateImages(recipe, request.getNewImages());
//        updateCategories(recipe, request.getCategories());

        Recipe updatedRecipe = recipeRepository.save(recipe);
        log.info("Successfully updated recipe with id: {}", id);
        return recipeMapper.recipeToRecipeDto(updatedRecipe);
    }

    private void updateBasicInfo(Recipe recipe, RecipeUpdateRequest request) {
        if (request.getTitle() != null) {
            recipe.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            recipe.setDescription(request.getDescription());
        }
    }

    private Recipe findRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_FOUND));
    }

    private void validateRecipeStatus(Recipe recipe) {
        if (recipe.getStatus() != RecipeStatus.PENDING) {
            throw new AppException(ErrorCode.RECIPE_UPDATE_FAILED);
        }
    }

//    private void updateCategories(Recipe recipe, Set<CategoryType> newCategoryTypes) {
//        if (newCategoryTypes != null && !newCategoryTypes.isEmpty()) {
//            Set<Category> currentCategories = recipe.getCategories();
//            Set<Category> newCategories = newCategoryTypes.stream()
//                    .map(categoryType -> categoryRepository.findByCategoryType(categoryType)
//                            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)))
//                    .collect(Collectors.toSet());
//
//            currentCategories.removeIf(existingCategory -> !newCategories.contains(existingCategory));
//            currentCategories.addAll(newCategories);
//        }
//    }

    private void updateImages(Recipe recipe, List<String> newImageUrls) {
        if (newImageUrls != null && !newImageUrls.isEmpty()) {
            List<RecipeImage> currentImages = recipe.getRecipeImages();
            currentImages.clear();

            for (int i = 0; i < newImageUrls.size(); i++) {
                RecipeImage newImage = new RecipeImage();
                newImage.setImageUrl(newImageUrls.get(i));
                newImage.setPrimary(i == 0);
                newImage.setRecipe(recipe);
                currentImages.add(newImage);
            }
        } else {
            log.info("No new images provided for recipe ID: {}", recipe.getId());
        }
    }

    @Override
    @Transactional
    public RecipeDto updateStatus(Long id, RecipeStatus status) throws Exception {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new Exception("Not exist recipe id " + id));
        recipe.setStatus(status);
        recipeRepository.save(recipe);
        return recipeMapper.recipeToRecipeDto(recipe);
    }

//    public Page<Recipe> searchRecipes(String name, CategoryType categoryType, RecipeStatus status,
//                                      int page, int size, String sortField, Sort.Direction sortDirection) {
//
//        Specification<Recipe> spec = Specification
//                .where(RecipeSpecification.hasName(name))
//                .and(RecipeSpecification.hasCategoryType(categoryType))
//                .and(RecipeSpecification.hasStatus(status));
//
//        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
//        return recipeRepository.findAll(spec, pageable);
//    }
}