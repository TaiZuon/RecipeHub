package com.recipehub.auth_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeCreationRequest {
    Long userId;
    private String title;
    private String description;
    private String instructions;
    private List<String> imageUrls;
}