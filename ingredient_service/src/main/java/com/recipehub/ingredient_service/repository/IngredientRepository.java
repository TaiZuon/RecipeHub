package com.recipehub.ingredient_service.repository;

import com.recipehub.ingredient_service.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface IngredientRepository extends JpaRepository<Ingredient, UUID> {
    boolean existsByName(String name);
}
