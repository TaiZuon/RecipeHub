package com.recipehub.recipe_service.model;

import com.recipehub.recipe_service.Enum.CategoryType;
import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@Entity
@Builder
@Table(name = "categories")
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false, length = 100)
    private CategoryType categoryType;

    @Column(name = "description", nullable = false, length = 10000)
    private String description;

}
