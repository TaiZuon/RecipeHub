package com.recipehub.auth_service.dto.request;


import com.recipehub.auth_service.entity.UserRole;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    String username;
    String password;
    String fullName;
    UserRole role;
    LocalDate dob;
    String city;
}