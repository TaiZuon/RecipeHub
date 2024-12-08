package com.recipehub.recipe_service.repository.httpClient;

import com.recipehub.recipe_service.dto.IngredientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ingredient", url = "${app.services.ingredient}")
public interface IngredientClient {
    @GetMapping("/api/ingredients/{ingredientId}")
    IngredientDto getIngredient(@PathVariable("ingredientId") Long ingredientId);
}
