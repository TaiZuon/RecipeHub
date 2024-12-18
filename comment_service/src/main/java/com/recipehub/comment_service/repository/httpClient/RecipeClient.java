package com.recipehub.comment_service.repository.httpClient;

import com.recipehub.comment_service.dto.RecipeDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(name = "recipe-service", url = "${app.services.recipe}")
public interface RecipeClient {
    @GetMapping("api/recipes/{id}")
    RecipeDto getRecipe(@PathVariable Long id);
}
