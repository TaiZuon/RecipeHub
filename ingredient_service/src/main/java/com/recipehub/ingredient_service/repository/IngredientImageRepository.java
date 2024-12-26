package com.recipehub.ingredient_service.repository;

import com.recipehub.ingredient_service.model.IngredientImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IngredientImageRepository extends JpaRepository<IngredientImage, Long> {
}
