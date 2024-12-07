package com.recipehub.category_service.repository;

import com.recipehub.category_service.Enum.CategoryType;
import com.recipehub.category_service.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findByCategoryType(String categoryType);
}
