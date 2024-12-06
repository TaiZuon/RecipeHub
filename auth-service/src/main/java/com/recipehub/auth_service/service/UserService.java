package com.recipehub.auth_service.service;

import com.recipehub.auth_service.entity.User;
import com.recipehub.auth_service.entity.UserRole;
import com.recipehub.auth_service.repository.UserRepository;
import com.recipehub.auth_service.entity.UserStatus; // Import enum UserStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean registerUser(String username, String password, String role) {
        if (userRepository.findByUsername(username) != null) {
            return false; // Username đã tồn tại
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        try {
            user.setRole(UserRole.valueOf(role.toUpperCase())); // Chuyển đổi chuỗi role thành UserRole enum
        } catch (IllegalArgumentException e) {
            return false; // Nếu chuỗi không hợp lệ, trả về false
        }
        user.setStatus(UserStatus.ACTIVE); // Mặc định người dùng có trạng thái là ACTIVE
        userRepository.save(user);
        return true;
    }

    public boolean validateUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // Phương thức getUserId thêm vào
    public String getUserId(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? String.valueOf(user.getId()) : null;  // Chuyển đổi Long thành String
    }

    // Phương thức lấy thông tin role của người dùng
    public String getUserRole(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? user.getRole().name() : null; // Trả về tên của enum dưới dạng chuỗi
    }


    // Phương thức cấm người dùng
    public boolean banUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setStatus(UserStatus.BANNED); // Cập nhật trạng thái thành BANNED
            userRepository.save(user);
            return true;
        }
        return false; // Không tìm thấy người dùng
    }

    // Phương thức kích hoạt người dùng
    public boolean activateUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setStatus(UserStatus.ACTIVE); // Cập nhật trạng thái thành ACTIVE
            userRepository.save(user);
            return true;
        }
        return false; // Không tìm thấy người dùng
    }

    // Liệt kê tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
