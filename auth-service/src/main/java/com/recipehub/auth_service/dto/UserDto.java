package com.recipehub.auth_service.dto;

import com.recipehub.auth_service.Enum.UserRole;
import com.recipehub.auth_service.Enum.UserStatus;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String userName;
    private UserRole role;
    private UserStatus status;
}
