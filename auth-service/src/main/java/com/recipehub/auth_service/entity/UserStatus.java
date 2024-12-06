package com.recipehub.auth_service.entity;

public enum UserStatus {
    ACTIVE,        // Người dùng hoạt động bình thường
    BANNED,        // Người dùng bị cấm
    PENDING        // Người dùng đang chờ xét duyệt
}
