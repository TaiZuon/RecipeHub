package com.recipehub.auth_service.dto.response;

import java.time.LocalDate;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
    Long id;
    Long userId;
    String fullName;
    LocalDate dob;
    String city;
}