package com.recipehub.recipe_service.repository;

import com.recipehub.recipe_service.model.RecipeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecipeImageRepository extends JpaRepository<RecipeImage, Long> {
}
