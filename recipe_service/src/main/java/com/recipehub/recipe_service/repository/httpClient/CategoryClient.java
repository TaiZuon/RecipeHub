package com.recipehub.recipe_service.repository.httpClient;

import com.recipehub.recipe_service.dto.response.CategoryResponse;
import com.recipehub.recipe_service.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "category", url = "${app.services.category}")
public interface CategoryClient {
    @GetMapping("/api/categories/{id}")
    CategoryResponse getCategoryById(@PathVariable("id") Long id);
}
