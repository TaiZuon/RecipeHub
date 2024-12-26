package com.recipehub.auth_service.dto.response;

import com.recipehub.auth_service.Enum.UserRole;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String username;
    UserRole role;
}