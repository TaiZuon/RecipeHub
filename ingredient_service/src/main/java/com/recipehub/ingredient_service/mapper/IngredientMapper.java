package com.recipehub.ingredient_service.mapper;


import com.recipehub.ingredient_service.dto.IngredientDto;
import com.recipehub.ingredient_service.dto.IngredientImageDto;
import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.model.Ingredient;
import com.recipehub.ingredient_service.model.IngredientImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class IngredientMapper {

    public IngredientImage ingredientImageDtoToIngredientImage(IngredientImageDto ingredientImageDto) {
        IngredientImage ingredientImage = new IngredientImage();
        ingredientImage.setImageUrl(ingredientImageDto.getImageUrl());
        ingredientImage.setPrimary(ingredientImageDto.getIsPrimary());

        return ingredientImage;
    }
    public IngredientImageDto ingredientImageToIngredientImageDto(IngredientImage ingredientImage) {
        return IngredientImageDto.builder()
                .imageUrl(ingredientImage.getImageUrl())
                .isPrimary(ingredientImage.isPrimary())
                .build();
    }


    public Ingredient ingredientCreateToIngredient(IngredientRequest request) {
//        User seller = userRepository.findById(request.getSellerId())
//                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Ingredient ingredient = new Ingredient();
        ingredient.setName(request.getName());
        ingredient.setUnit(request.getUnit());

        return ingredient;
    }


    public IngredientDto ingredientToIngredientDto(Ingredient ingredient) {
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setId(ingredient.getId());
        ingredientDto.setName(ingredient.getName());
        ingredientDto.setUnit(ingredient.getUnit());


        List<IngredientImage> ingredientImages = ingredient.getIngredientImages();
        if (ingredientImages != null && !ingredientImages.isEmpty()) {
            List<IngredientImageDto> ingredientImageDtoList = ingredientImages.stream()
                    .map(this::ingredientImageToIngredientImageDto)
                    .collect(Collectors.toList());
            ingredientDto.setIngredientImages(ingredientImageDtoList);
        }

        return ingredientDto;
    }

}
