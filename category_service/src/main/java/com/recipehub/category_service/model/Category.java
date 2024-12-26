package com.recipehub.category_service.model;

import com.recipehub.category_service.Enum.CategoryType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

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

    @Column(name = "name", nullable = false, length = 100)
    private String categoryType;

    @Column(name = "description", nullable = false, length = 10000)
    private String description;

}
