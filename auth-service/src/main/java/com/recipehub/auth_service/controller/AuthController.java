package com.recipehub.auth_service.controller;

import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.dto.response.UserResponse;
import com.recipehub.auth_service.entity.User;
import com.recipehub.auth_service.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.recipehub.auth_service.security.JwtUtil;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCreationRequest request) {

        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username, Password là bắt buộc");
        }

        boolean success = userService.registerUser(request);
        if (!success) {
            return ResponseEntity.badRequest().body("Username đã tồn tại hoặc Role không hợp lệ");
        }

        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username và Password là bắt buộc");
        }

        boolean valid = userService.validateUser(username, password);
        if (!valid) {
            return ResponseEntity.status(401).body("Thông tin đăng nhập không hợp lệ");
        }

        // Lấy thông tin user (ví dụ: userId, username, role)
        String userId = userService.getUserId(username); // Giả sử userService có phương thức này
        String role = userService.getUserRole(username); // Giả sử userService có phương thức này
        String status = userService.getUserStatus(username);
        // Tạo JWT token với userId, username và role
        String token = jwtUtil.generateToken(userId, username, role, status);

        return ResponseEntity.ok(Map.of("message", "Đăng nhập thành công", "token", token));
    }

    // Phương thức để cấm người dùng
    @PutMapping("/ban/{username}")
    public ResponseEntity<?> banUser(@PathVariable String username) {
        boolean success = userService.banUser(username);
        if (success) {
            return ResponseEntity.ok("Người dùng đã bị cấm");
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy người dùng");
        }
    }

    // Phương thức để kích hoạt người dùng
    @PutMapping("/activate/{username}")
    public ResponseEntity<?> activateUser(@PathVariable String username) {
        boolean success = userService.activateUser(username);
        if (success) {
            return ResponseEntity.ok("Người dùng đã được kích hoạt");
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy người dùng");
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public UserResponse getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
