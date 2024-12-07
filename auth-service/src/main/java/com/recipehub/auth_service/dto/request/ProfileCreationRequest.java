package com.recipehub.auth_service.dto.request;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileCreationRequest {
    Long userId;
    String fullName;
    LocalDateTime dob;
    String city;
}
