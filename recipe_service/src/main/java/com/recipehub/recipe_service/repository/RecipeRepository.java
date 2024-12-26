package com.recipehub.recipe_service.repository;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {
    Page<Recipe> findAll(Pageable pageable);
    List<Recipe> findByStatus(RecipeStatus status);

}
