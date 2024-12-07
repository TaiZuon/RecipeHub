package com.recipehub.recipe_service.repository.httpClient;

import com.recipehub.recipe_service.dto.request.IngredientCreationRequest;
import com.recipehub.recipe_service.dto.response.IngredientResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ingredient-service", url = "${app.services.ingredient}")
public interface IngredientClient {
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    IngredientResponse createIngredient(@RequestBody IngredientCreationRequest request);

}
