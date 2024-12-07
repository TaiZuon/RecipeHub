package com.recipehub.recipe_service.repository;

import com.recipehub.recipe_service.model.RecipeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecipeCategoryRepository extends JpaRepository<RecipeCategory, UUID> {
}