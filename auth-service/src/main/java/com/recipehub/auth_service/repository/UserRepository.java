package com.recipehub.auth_service.repository;

import com.recipehub.auth_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm kiếm người dùng theo username
    Optional<User> findByUsername(String username);

    // Liệt kê tất cả người dùng (đã có phương thức này trong JpaRepository)
    List<User> findAll();  // Không cần thêm gì vì JpaRepository đã cung cấp phương thức này
}
