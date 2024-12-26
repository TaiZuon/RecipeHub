package com.recipehub.recipe_service.service;


import com.recipehub.recipe_service.Enum.CategoryType;

import com.recipehub.recipe_service.model.Category;
import com.recipehub.recipe_service.model.Recipe;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class RecipeSpecification {

    public static Specification<Recipe> hasCategoryTypes(List<CategoryType> categoryTypes) {
        return (root, query, criteriaBuilder) -> {
            if (categoryTypes == null || categoryTypes.isEmpty()) {
                return null;
            }
            Join<Recipe, Category> categoryJoin = root.join("categories");

            // Duyệt qua từng categoryType trong danh sách
            Predicate[] predicates = new Predicate[categoryTypes.size()];
            for (int i = 0; i < categoryTypes.size(); i++) {
                predicates[i] = criteriaBuilder.equal(categoryJoin.get("categoryType"), categoryTypes.get(i));
            }

            // Sử dụng `criteriaBuilder.and` để yêu cầu tất cả danh mục đều phải khớp
            return criteriaBuilder.or(predicates);
        };
    }
    public static Specification<Recipe> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                title == null ? null : criteriaBuilder.like(root.get("title"), "%" + title.trim() + "%");
    }

}