package com.recipehub.ingredient_service.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recipehub.ingredient_service.Enum.UnitType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "ingredients")
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<IngredientImage> ingredientImages;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnitType unit;



}


