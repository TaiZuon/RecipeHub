package com.recipehub.auth_service.entity;

import jakarta.persistence.*;

import com.recipehub.auth_service.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Sử dụng kiểu Long thay vì String
    private String username;
    private String password;
    private UserRole role;
    private UserStatus status;
}
